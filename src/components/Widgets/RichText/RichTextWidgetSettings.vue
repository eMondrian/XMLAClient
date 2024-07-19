<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->
<script lang="ts" setup>
export interface IRichTextEditorSettings {
    editor: string;
}

export interface IRichTextEditorComponent {
    store: Store | XMLAStore;
    settings: IRichTextEditorSettings;
    setSetting: (key: string, value: any) => void;
    setStore: (store: Store | XMLAStore) => void;
}

import { ref, onMounted, watch, type Ref } from "vue";
import { useStoreManager } from "@/composables/storeManager";
import type { Store } from "@/stores/Widgets/Store";
// import type { Editor } from "tiptap";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import Strike from "@tiptap/extension-strike";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Underline from "@tiptap/extension-underline";
import type { XMLAStore } from "@/stores/Widgets/XMLAStore";
import type { CollapseState } from "@/@types/widgets";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { component } = defineProps<{ component: IRichTextEditorComponent }>();

const opened: Ref<CollapseState> = ref({
    widgetSection: false,
    storeSection: false,
});

const currentSelectNode = ref("");
const storeManager = useStoreManager();
let stores = ref([]) as Ref<any[]>;

const requestResult = ref("");

const getStores = () => {
    const storeList = storeManager.getStoreList();

    stores.value = Array.from(storeList.value, function (entry) {
        return { ...entry[1] };
    });
};

const getData = async () => {
    const store = component.store as Store;

    const data = await store.getData();
    requestResult.value = JSON.stringify(data, null, 2);
};

const updateStore = (storeId) => {
    const store = storeManager.getStore(storeId) as Store;
    component.setStore(store);
    getData();
};

onMounted(() => {
    getStores();
    if (component.store) {
        getData();
    }
});

const editor = useEditor({
    extensions: [
        StarterKit,
        Bold.configure({
            HTMLAttributes: {
                class: "custom-bold",
            },
        }),
        Italic.configure({
            HTMLAttributes: {
                class: "custom-italic",
            },
        }),
        Strike.configure({
            HTMLAttributes: {
                class: "custom-strike",
            },
        }),
        Heading.configure({
            levels: [1, 2, 3, 4, 5, 6],
        }),
        OrderedList.configure({
            HTMLAttributes: {
                class: "custom-ordered-list",
            },
        }),
        BulletList.configure({
            HTMLAttributes: {
                class: "custom-bullet-list",
            },
        }),
        Code.configure({
            HTMLAttributes: {
                class: "custom-code",
            },
        }),
        CodeBlock.configure({
            HTMLAttributes: {
                class: "custom-code-block",
            },
        }),
        Blockquote.configure({
            HTMLAttributes: {
                class: "custom-blockquote",
            },
        }),
        HorizontalRule.configure({
            HTMLAttributes: {
                class: "custom-horizontal-rule",
            },
        }),
        Underline.configure({
            HTMLAttributes: {
                class: "custom-underline",
            },
        }),
    ],
});

watch(
    () => editor.value?.getHTML(),
    (newValue) => {
        component.setSetting("editor", newValue);
    },
);

const handleSelectChange = (value) => {
    if (!editor.value) return;
    
    if (value === 'Paragraph') {
        editor.value.chain().focus().setParagraph().run();
    } else if (value.includes('Header')) {
        editor?.value.chain().focus().toggleHeading({ level: parseInt(value.split(' ')[1]) }).run();
    }
};

const updateSelectNode = () => {
  if (!editor.value) return;

  const isActive = (level) => editor?.value.isActive('heading', { level });
  if (isActive(1)) {
    currentSelectNode.value = 'Header 1';
  } else if (isActive(2)) {
    currentSelectNode.value = 'Header 2';
  } else if (isActive(3)) {
    currentSelectNode.value = 'Header 3';
  } else if (isActive(4)) {
    currentSelectNode.value = 'Header 4';
  } else if (isActive(5)) {
    currentSelectNode.value = 'Header 5';
  } else if (isActive(6)) {
    currentSelectNode.value = 'Header 6';
  } else {
    currentSelectNode.value = 'Paragraph';
  }
};

onMounted(() => {
  if (editor.value) {
    editor.value.on('transaction', updateSelectNode);
  }
});

watch(editor, (newEditor, oldEditor) => {
  if (oldEditor) {
    oldEditor.off('transaction', updateSelectNode);
  }
  if (newEditor) {
    newEditor.on('transaction', updateSelectNode);
  }
});
</script>

<template>
    <va-collapse
        v-model="opened.widgetSection"
        :header="t('RichTextWidget.title')"
    >
        <div class="settings-container">
            <div v-if="editor">
                <div class="marks-block">
                    <va-button
                        class="editor-btn editor-button--color"
                        icon="undo"
                        icon-color="#000000"
                        @click="editor.chain().focus().undo().run()"
                        :disabled="!editor.can().chain().focus().undo().run()"
                    >
                        <!-- {{ t("RichTextWidget.undo") }} -->
                    </va-button>
                    <va-button
                        class="editor-btn editor-button--color"
                        icon="redo"
                        icon-color="#000000"
                        @click="editor.chain().focus().redo().run()"
                        :disabled="!editor.can().chain().focus().redo().run()"
                    >
                        <!-- {{ t("RichTextWidget.redo") }} -->
                    </va-button>
                    <va-button
                        class="editor-btn editor-button--color"
                        icon="format_bold"
                        icon-color="#000000"
                        @click="editor.chain().focus().toggleBold().run()"
                        :disabled="!editor.can().chain().focus().toggleBold().run()"
                        :class="{ 'is-active': editor.isActive('bold') }"
                    >
                        <!-- {{ t("RichTextWidget.bold") }} -->
                    </va-button>
                    <va-button
                        class="editor-btn editor-button--color"
                        icon="format_italic"
                        icon-color="#000000"
                        @click="editor.chain().focus().toggleItalic().run()"
                        :disabled="
                            !editor.can().chain().focus().toggleItalic().run()
                        "
                        :class="{ 'is-active': editor.isActive('italic') }"
                    >
                        <!-- {{ t("RichTextWidget.italic") }} -->
                    </va-button>
                    <va-button
                        class="editor-btn editor-button--color"
                        icon="format_strikethrough"
                        icon-color="#000000"
                        @click="editor.chain().focus().toggleStrike().run()"
                        :disabled="
                            !editor.can().chain().focus().toggleStrike().run()
                        "
                        :class="{ 'is-active': editor.isActive('strike') }"
                    >
                        <!-- {{ t("RichTextWidget.strike") }} -->
                    </va-button>
                    <va-button
                        class="editor-btn editor-button--color"
                        icon="format_underlined"
                        icon-color="#000000"
                        @click="editor.chain().focus().toggleUnderline().run()"
                        :disabled="
                            !editor.can().chain().focus().toggleUnderline().run()
                        "
                        :class="{ 'is-active': editor.isActive('underline') }"
                    >
                        <!-- {{ t("RichTextWidget.underline") }} -->
                    </va-button>
                    <va-button
                        class="editor-btn editor-button--color"
                        icon="code"
                        icon-color="#000000"
                        @click="editor.chain().focus().toggleCode().run()"
                        :disabled="!editor.can().chain().focus().toggleCode().run()"
                        :class="{ 'is-active': editor.isActive('code') }"
                    >
                        <!-- {{ t("RichTextWidget.code") }} -->
                    </va-button>
                    <!-- <va-button
                        class="editor-btn"
                        @click="editor.chain().focus().unsetAllMarks().run()"
                    >
                        {{ t("RichTextWidget.clearMarks") }}
                    </va-button> -->
                    <va-select
                        class="select-node"
                        :model-value="currentSelectNode"
                        :options="['Paragraph', 'Header 1', 'Header 2', 'Header 3', 'Header 4', 'Header 5', 'Header 6']"
                        @update:model-value="handleSelectChange"
                    >
                    </va-select>
                </div>
                <div class="nodes-block">
                    <!-- <va-button
                        class="editor-btn"
                        @click="editor.chain().focus().setParagraph().run()"
                        :class="{ 'is-active': editor.isActive('paragraph') }"
                    >
                        {{ t("RichTextWidget.paragraph") }}P
                    </va-button>
                    <va-button
                        class="editor-btn"
                        @click="
                            editor.chain().focus().toggleHeading({ level: 1 }).run()
                        "
                        :class="{
                            'is-active': editor.isActive('heading', { level: 1 }),
                        }"
                    >
                        H1
                    </va-button>
                    <va-button
                        class="editor-btn"
                        @click="
                            editor.chain().focus().toggleHeading({ level: 2 }).run()
                        "
                        :class="{
                            'is-active': editor.isActive('heading', { level: 2 }),
                        }"
                    >
                        H2
                    </va-button>
                    <va-button
                        class="editor-btn"
                        @click="
                            editor.chain().focus().toggleHeading({ level: 3 }).run()
                        "
                        :class="{
                            'is-active': editor.isActive('heading', { level: 3 }),
                        }"
                    >
                        H3
                    </va-button>
                    <va-button
                        class="editor-btn"
                        @click="
                            editor.chain().focus().toggleHeading({ level: 4 }).run()
                        "
                        :class="{
                            'is-active': editor.isActive('heading', { level: 4 }),
                        }"
                    >
                        H4
                    </va-button>
                    <va-button
                        class="editor-btn"
                        @click="
                            editor.chain().focus().toggleHeading({ level: 5 }).run()
                        "
                        :class="{
                            'is-active': editor.isActive('heading', { level: 5 }),
                        }"
                    >
                        H5
                    </va-button>
                    <va-button
                        class="editor-btn"
                        @click="
                            editor.chain().focus().toggleHeading({ level: 6 }).run()
                        "
                        :class="{
                            'is-active': editor.isActive('heading', { level: 6 }),
                        }"
                    >
                        H6
                    </va-button> -->
                    <va-button
                        class="editor-btn editor-button--color"
                        icon="format_list_bulleted"
                        icon-color="#000000"
                        @click="editor.chain().focus().toggleBulletList().run()"
                        :class="{ 'is-active': editor.isActive('bulletList') }"
                    >
                        <!-- {{ t("RichTextWidget.bulletList") }} -->
                    </va-button>
                    <va-button
                        class="editor-btn editor-button--color"
                        icon="format_list_numbered"
                        icon-color="#000000"
                        @click="editor.chain().focus().toggleOrderedList().run()"
                        :class="{ 'is-active': editor.isActive('orderedList') }"
                    >
                        <!-- {{ t("RichTextWidget.orderedList") }} -->
                    </va-button>
                    <va-button
                        class="editor-btn editor-button--color"
                        icon="integration_instructions"
                        icon-color="#000000"
                        @click="editor.chain().focus().toggleCodeBlock().run()"
                        :class="{ 'is-active': editor.isActive('codeBlock') }"
                    >
                        <!-- {{ t("RichTextWidget.codeBlock") }} -->
                    </va-button>
                    <va-button
                        class="editor-btn editor-button--color"
                        icon="format_quote"
                        icon-color="#000000"
                        @click="editor.chain().focus().toggleBlockquote().run()"
                        :class="{ 'is-active': editor.isActive('blockquote') }"
                    >
                        <!-- {{ t("RichTextWidget.blockQuote") }} -->
                    </va-button>
                    <va-button
                        class="editor-btn editor-button--color"
                        icon="horizontal_rule"
                        icon-color="#000000"
                        @click="editor.chain().focus().setHorizontalRule().run()"
                    >
                        <!-- {{ t("RichTextWidget.horizontalRule") }} -->
                    </va-button>
                    <va-button
                        class="editor-btn editor-button--color"
                        icon="wrap_text"
                        icon-color="#000000"
                        @click="editor.chain().focus().setHardBreak().run()"
                    >
                        <!-- {{ t("RichTextWidget.hardBreak") }} -->
                    </va-button>
                    <!-- <va-button
                        class="editor-btn"
                        @click="editor.chain().focus().clearNodes().run()"
                    >
                        {{ t("RichTextWidget.clearNodes") }}
                    </va-button> -->
                </div>
            </div>
            <div class="editor">
                <editor-content :editor="editor" />
            </div>
        </div>
    </va-collapse>
    <va-collapse
        v-model="opened.storeSection"
        :header="t('Widgets.storeSettingsTitle')"
    >
        <div class="settings-container">
            <div class="settings-container">
                <div>
                    <h3 class="mb-2">{{ t("Widgets.selectStore") }}</h3>
                    <div class="mb-2" v-for="store in stores" :key="store.id">
                        <va-radio
                            :model-value="component.store?.id"
                            @update:model-value="updateStore"
                            :option="{
                                text: `${store.caption} ${store.id}`,
                                id: store.id,
                            }"
                            value-by="id"
                            name="store-radio-group"
                        />
                    </div>
                </div>
            </div>
        </div>
    </va-collapse>
</template>

<style lang="scss">
.settings-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
}

.editor {
    border: 1px solid rgb(168, 157, 157);
    height: 200px;
    padding: 10px;
    overflow: auto;
}

.custom-ordered-list {
    list-style: auto;
}

.custom-bullet-list {
    list-style: unset;
}

.tiptap h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.tiptap h2 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
}

.tiptap h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.tiptap h4 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
}

.tiptap h5 {
    font-size: 1.11rem;
    margin-bottom: 1rem;
}

.tiptap h6 {
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

.custom-bold {
    font-weight: bold;
}

.custom-italic {
    font-weight: unset;
}

.custom-strike {
    font-weight: unset;
}

.custom-code {
    font-size: 0.9rem;
    padding: 0.25em;
    border-radius: 0.25em;
    background-color: rgba(97, 97, 97, 0.2);
    color: #616161;
}

.custom-code-block {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
    }
}

.custom-blockquote {
    padding-left: 1rem;
    border-left: 3px solid rgba(#0d0d0d, 0.1);
}

.custom-horizontal-rule {
    border-top: 1px solid #68cef8;
}

.custom-underline {
    font-weight: unset;
}

.editor-btn {
    margin: 0 4px 4px 0;
    border: 2px solid transparent;

    --va-background-color: var(--app-button-with-icon) !important;

    &:hover {
        --va-background-color: rgb(122, 143, 184) !important;
    }

}

.is-active {
    border: 2px solid rgb(22, 253, 22) !important;
}

.select-node {
    width: 120px;
}
</style>
