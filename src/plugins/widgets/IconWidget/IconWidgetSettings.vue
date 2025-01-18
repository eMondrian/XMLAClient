<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->
<script lang="ts" setup>
import type { IIconSettings, MaterialIcon } from "@/types/Widgets";
import { computed, onMounted, ref, type Ref } from "vue";
import MaterialIcons from "@/assets/icons/MaterialIcons.json";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const opened = ref({
    widgetSection: false,
    storeSection: false,
});
const widgetSettings = defineModel<IIconSettings>({ required: true });

const isDarkTheme: Ref<boolean> = ref(
    JSON.parse(localStorage.getItem("isDarkTheme")) || false,
);

const iconsList: Ref<MaterialIcon[]> = ref([]);
const searchQuery: Ref<string> = ref("");

function filterUniqueIcons(icons: MaterialIcon[]) {
    const uniqueNames: Set<string> = new Set();
    return icons.filter((icon: MaterialIcon) => {
        if (!uniqueNames.has(icon.name)) {
            uniqueNames.add(icon.name);
            return true;
        }
        return false;
    });
}

const filteredIcons = computed(() => {
    return iconsList.value.filter((icon: MaterialIcon) =>
        icon.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
});

const handleIconClick = (icon: MaterialIcon) => {
    if (icon) widgetSettings.value.currentIcon = icon.name;
};

onMounted(() => {
    iconsList.value = filterUniqueIcons(MaterialIcons);
});

const fontColor = computed(() => {
    return isDarkTheme.value ? "#ffffff" : "";
});
</script>

<template>
    <va-collapse v-model="opened.widgetSection" :header="t('IconWidget.title')">
        <div class="settings-container">
            <va-input v-model="searchQuery" placeholder="Search icon..." :label="t('IconWidget.iconSearch')" />
            <div class="icons-container" style="
          font-variation-settings:
          &quot;FILL&quot; 0,
          &quot;wght&quot; 200,
          &quot;GRAD&quot; 100,
          &quot;opsz&quot; 48;
        ">
                <span v-for="icon in filteredIcons" :key="icon.name + icon.version" @click="handleIconClick(icon)"
                    :class="{
                        'active-icon':
                            icon.name === widgetSettings.currentIcon,
                    }" class="material-symbols-outlined">
                    {{ icon.name }}
                </span>
            </div>
            <va-checkbox v-model="widgetSettings.isIconFilled" :label="t('IconWidget.iconFilled')" />
            <va-color-input v-model="widgetSettings.iconColor" :label="t('IconWidget.iconColor')" />
            <va-input v-model="widgetSettings.iconSize" :label="t('IconWidget.iconSize')" />
            <va-slider class="slider" :label-color="fontColor" v-model="widgetSettings.strokeWeight" track-label-visible
                :min="100" :max="700" :step="100" :label="t('IconWidget.strokeWeight')" />
            <va-slider class="slider" :label-color="fontColor" v-model="widgetSettings.opticSize" track-label-visible
                :min="20" :max="48" :label="t('IconWidget.opticSize')" />
            <va-slider class="slider" :label-color="fontColor" v-model="widgetSettings.grade" track-label-visible
                :min="-25" :max="200" :step="15" :label="t('IconWidget.grade')" />
        </div>
    </va-collapse>
</template>
<style lang="scss" scoped>
.settings-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
}

.icons-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    max-height: 220px;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    cursor: pointer;
    padding: 10px;
}

.material-symbols-outlined {
    font-family: "Material Symbols Outlined";
    font-weight: normal;
    font-style: inherit;
    font-size: 40px;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    border: 2px solid transparent;
    border-radius: 5px;
    transition:
        border-color 0.5s ease,
        transform 0.5s ease;

    &:hover {
        transform: scale(1.1);
    }
}

.active-icon {
    border: 2px solid rgb(0, 121, 0);
}

.slider {
    padding: 0 10px;
}
</style>