<script setup lang="ts">
interface IMonacoEditorProps {
  modelValue?: string;
  language?: 'sql' | 'msdax';
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
  supportedLanguages: () => ['sql', 'msdax'],
  // supportedThemes: () => ['vs-dark', 'vs-light', 'hc-black'],
});

const tabs = ["Code Editor", "Visual Editor"];
const currentTab = ref(0);
const selectedLanguage = ref(props.language);
// const selectedTheme = ref(props.theme);

const initEditor = async () => {
  if (editorContainer.value) {
    const container = editorContainer.value;

    editorInstance = monaco?.editor?.create(container, {
      // ...props.editorOptions,
      value: props.modelValue,
      language: props.language,
      // theme: props.theme,
      automaticLayout: true,
      suggestOnTriggerCharacters: true,
      quickSuggestions: { other: true, comments: true, strings: true },
      wordBasedSuggestions: 'currentDocument',
      parameterHints: { enabled: true },
      snippetSuggestions: 'top',
    });

    // monaco.editor.setTheme(selectedTheme.value);

    editorInstance.onDidChangeModelContent(() => {
      if (typeof editorInstance?.getValue() === 'string') {
        emit('update:modelValue', editorInstance.getValue());
      }
    });
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


watch(currentTab, async (newTab) => {
  if (newTab === 0) {
    await nextTick();
    initEditor();
  }
});

onBeforeUnmount(() => {
  disposeEditor();
});

watch(() => selectedLanguage.value, (newLang) => {
  const model = editorInstance?.getModel();
  if (editorInstance && model) {
    monaco.editor.setModelLanguage(model, newLang);
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
  <va-tabs v-model="currentTab" hidePagination color="info">
    <template #tabs>
      <va-tab v-for="tab in tabs" :key="tab">
        {{ tab }}
      </va-tab>
    </template>
    <template v-if="currentTab === 0">
      <div class="editor-page">
        <div class="toolbar">
          <va-select v-model="selectedLanguage" label="Language:" :options="supportedLanguages" />
          <!-- <va-select class="ml-3" v-model="selectedTheme" label="Theme:" :options="supportedThemes" /> -->
        </div>
        <div ref="editorContainer" class="monaco-editor mt-2"></div>
      </div>
    </template>
    <template v-else-if="currentTab === 1">
      <div class="visual-editor-container">Visual Editor</div>
    </template>
  </va-tabs>
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