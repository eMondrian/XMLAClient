/*
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

*/
<script setup lang="ts">
interface IMonacoEditorProps {
    modelValue?: string;
    language?: 'sql' | 'msdax' | 'mdx';
    theme?: 'vs-dark' | 'vs-light' | 'hc-black';
    supportedLanguages?: string[];
    // supportedThemes?: string[];
    // editorOptions?: monaco.editor.IStandaloneEditorConstructionOptions;
}

import * as monaco from 'monaco-editor';
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import "@/components/common/monacoEditor/autoCompletion";

const editorContainer = ref<HTMLDivElement | null>(null);
let editorInstance: monaco.editor.IStandaloneCodeEditor | null = null;
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const props = withDefaults(defineProps<IMonacoEditorProps>(), {
    modelValue: '',
    language: 'sql',
    theme: 'vs-dark',
    supportedLanguages: () => ['sql', 'msdax', 'mdx'],
    // supportedThemes: () => ['vs-dark', 'vs-light', 'hc-black'],
});

const selectedLanguage = ref(props.language);
// const selectedTheme = ref(props.theme);

const initEditor = async () => {
    try {
        if (editorContainer.value && !editorInstance) {
            const container = editorContainer.value;

            console.log(monaco.languages.getLanguages());

            monaco.languages.setMonarchTokensProvider('mdx', {
                // (1) Ignore case when matching tokens
                ignoreCase: true,

                // (2) Suffix for token CSS classes (optional)
                tokenPostfix: '.mdx',

                // (3) Keywords taken from your JavaCC grammar
                //     Feel free to remove or add more as needed
                keywords: [
                    'ALL','ALLMEMBERS','ANCESTOR','ANCESTORS','AND','AS','ASC','AXIS','CASE',
                    'CALCULATION','CAST','CELL','CHAPTERS','COLUMNS','CUBE','CURRENTCUBE','DIMENSION',
                    'DRILLTHROUGH','ELSE','EMPTY','END','EXISTING','EXPLAIN','FIRSTROWSET','FOR','FROM',
                    'IN','IS','MATCHES','MAXROWS','MEASURE','MEMBER','NON','NOT','NULL','ON','OR','PAGES',
                    'PLAN','PROPERTIES','REFRESH','UPDATE','RETURN','ROWS','SECTIONS','SELECT','SET','THEN',
                    'WHEN','WHERE','XOR','WITH','USE_EQUAL_ALLOCATION','USE_EQUAL_INCREMENT',
                    'USE_WEIGHTED_ALLOCATION','USE_WEIGHTED_INCREMENT','BY','$SYSTEM'
                ],

                // (4) Operators extracted from the grammar (including "<>", "||", etc.)
                operators: [
                    '=', '<>', '<', '>', '<=', '>=', '+', '-', '*', '/', '||', ':', '!'
                ],

                // (5) Brackets
                brackets: [
                    ['{', '}', 'delimiter.curly'],
                    ['[', ']', 'delimiter.square'],
                    ['(', ')', 'delimiter.parenthesis']
                ],

                // (6) Symbols used to match operators
                symbols: /[=><!~?:&|+\-*/^%]+/,

                // (7) The main tokenizer definition
                tokenizer: {
                    // --- root state ---
                    root: [
                    // (a) Comments
                    //     Single-line: //..., --...
                    //     Multi-line:  /* ... */
                    //     We use additional states for multi-line.

                    // Single-line comments:
                    [/(\/\/|--).*$/, 'comment'],

                    // Multi-line comment start: enter @commentBlock
                    [/(\/\*)/, { token: 'comment', next: '@commentBlock' }],

                    // (b) Whitespace
                    { include: '@whitespace' },

                    // (c) Numeric literals
                    //     Covers integer, decimal, or exponent notation
                    [/\d+(\.\d+)?([eE][+\-]?\d+)?/, 'number'],

                    // (d) Strings
                    //     Single-quoted and double-quoted, allowing escaped quotes
                    [/'([^']|'')*'/, 'string'],  
                    [/\"([^"]|\"\")*\"/, 'string'],

                    // (e) Bracketed (quoted) identifiers
                    //     Including "[&something]" or "[something]"
                    [/\[&[^\]]*\]/, 'identifier.amp-quoted'], // e.g., &[xyz]
                    [/\[[^\]]*\]/,  'identifier.quoted'],     // e.g., [xyz]

                    // (f) Operators and special symbols
                    [
                        /@symbols/,
                        {
                        cases: {
                            '@operators': 'operator',
                            '@default': ''
                        }
                        }
                    ],

                    // (g) Brackets (parentheses, curly, square)
                    [/[{}()\[\]]/, '@brackets'],

                    // (h) Punctuation (comma, semicolon, period, etc.)
                    [/[;,.:]/, 'delimiter'],

                    // (i) Identifiers or Keywords
                    //     This includes things like @ID, &ID, etc.
                    [
                        /[a-zA-Z_@$&][\w$]*/,
                        {
                        cases: {
                            '@keywords': 'keyword',
                            '@default': 'identifier'
                        }
                        }
                    ]
                    ],

                    // --- commentBlock state for multi-line comments ---
                    commentBlock: [
                    // End of multi-line comment
                    [/\*\//, { token: 'comment', next: '@pop' }],
                    // Everything else remains in comment
                    [/./, 'comment']
                    ],

                    // --- Whitespace ---
                    whitespace: [
                    [/[ \t\r\n\f]+/, 'white']
                ]
                }
            });

            editorInstance = monaco?.editor?.create(container, {
                // ...props.editorOptions,
                value: props.modelValue,
                language: props.language,
                wordWrap: 'on',
                // wordWrapColumn: 80,
                // theme: props.theme,
                automaticLayout: true,
                dropIntoEditor: {
                    enabled: true,
                },
                suggestOnTriggerCharacters: true,
                quickSuggestions: { other: true, comments: true, strings: true },
                wordBasedSuggestions: 'currentDocument',
                parameterHints: { enabled: true },
                snippetSuggestions: 'top',
            });

            container.addEventListener('dragover', (event) => {
                event.preventDefault();
            });

            container.addEventListener('drop', (event) => {
                event.preventDefault();
                const text = event.dataTransfer?.getData('text/plain');

                if (text && editorInstance) {
                    const position = editorInstance.getPosition();

                    if (position) {
                        const range = new monaco.Range(
                            position.lineNumber,
                            position.column,
                            position.lineNumber,
                            position.column
                        );

                        editorInstance.executeEdits('', [
                            {
                                range,
                                text,
                            },
                        ]);
                    }
                }
            });

            // monaco.editor.setTheme(selectedTheme.value);
            editorInstance.onDidChangeModelContent((e) => {
                if (typeof editorInstance?.getValue() === 'string') {
                    emit('update:modelValue', editorInstance.getValue());
                }
            });
        }
    } catch (e) {
        console.error('Error initializing Monaco editor:', e);
    }

};


const disposeEditor = () => {
    if (editorInstance) {
        editorInstance.dispose();
        editorInstance = null;
    }
};

onMounted(() => {
    initEditor();
});

onBeforeUnmount(() => {
    disposeEditor();
});

watch(() => selectedLanguage.value, (newLang) => {
    if (editorInstance) {
        const model = editorInstance.getModel();
        if (model) {
            monaco.editor.setModelLanguage(model, newLang);
        }
    }
});

// watch(() => selectedTheme.value, (newTheme) => {
//   if (editorInstance) {
//     monaco.editor.setTheme(newTheme);
//   }
// });

watch(() => props.modelValue, (newValue) => {
    if (editorInstance && editorInstance.getValue() !== newValue) {
        editorInstance.setValue(newValue);
    }
});
</script>

<template>
    <div class="editor-page">
        <div class="toolbar">
            <va-select v-model="selectedLanguage" label="Language:" :options="supportedLanguages" />
            <!-- <va-select class="ml-3" v-model="selectedTheme" label="Theme:" :options="supportedThemes" /> -->
        </div>
        <div ref="editorContainer" class="monaco-editor mt-2"></div>
    </div>
</template>

<style scoped>
.editor-page {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.monaco-editor {
    height: 100%;
    border: 1px solid #ccc;
}

.visual-editor-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.toolbar {
    margin-bottom: 10px;
}
</style>
