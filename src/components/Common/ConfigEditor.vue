<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import appConfig from "@/appConfig.json";
import runtimeConfig from "@/runtimeConfig.json";
import { useAppConfig } from "@/composables/dashboard/appConfig";
import { useRuntimeConfig } from "@/composables/dashboard/runtimeConfig";

interface ConfigEntry {
    id: string;
    key: string;
    value: string;
};

type ConfigType = 'appConfig' | 'runtimeConfig';

const tabs = ["App Config", "Runtime Config"];
const currentTab = ref(0);
const emit = defineEmits(["save", "cancel"]);
const appConfigArray = ref<ConfigEntry[]>([]);
const runtimeConfigArray = ref<ConfigEntry[]>([]);

const { appConfigState, getAppConfigState, setAppConfigState } = useAppConfig(appConfig);
const { runtimeState, getRuntimeState, setRuntimeState } = useRuntimeConfig(runtimeConfig);

onMounted(() => {
    getAppConfigState();
    getRuntimeState();

    appConfigArray.value = Object.entries(appConfigState.value).map(([key, value]) => ({ id: key + `${Date.now()}`, key, value: String(value) }));
    runtimeConfigArray.value = Object.entries(runtimeState.value).map(([key, value]) => ({ id: key + `${Date.now()}`, key, value: String(value) }));
});

const deleteEntry = (configType: ConfigType, index: number) => {
    if (configType === 'appConfig') {
        appConfigArray.value.splice(index, 1);
    } else {
        runtimeConfigArray.value.splice(index, 1);
    }
};

const addEmptyEntry = (configType: ConfigType) => {
    const newEntry = { id: `${Date.now()}`, key: '', value: '' }
    if (configType === 'appConfig') {
        appConfigArray.value.push(newEntry);
    } else {
        runtimeConfigArray.value.push(newEntry);
    }
};

const saveConfig = (type: ConfigType) => {
    const configArray = type === 'appConfig' ? appConfigArray.value : runtimeConfigArray.value;
    const setState = type === 'appConfig' ? setAppConfigState : setRuntimeState;

    const configObject = configArray.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
    }, {});

    setState(configObject);
    emit('save', { [type]: configObject });
};

const cancel = () => {
  emit('cancel');
}
</script>

<template>
    <va-tabs v-model="currentTab" hidePagination color="info">
        <template #tabs>
            <va-tab v-for="tab in tabs" :key="tab">
                {{ tab }}
            </va-tab>
        </template>
        <template v-if="currentTab === 0">
            <va-button class="mb-3" icon="add" @click="addEmptyEntry('appConfig')">Add New</va-button>
            <div class="m-4">
                <div class="config-table">
                    <div v-for="(entry, index) in appConfigArray" :key="entry.id" class="config-row mb-2">
                        <va-input v-model="entry.key" class="config-key mr-2" placeholder="Key" />
                        <va-input v-model="entry.value" class="config-value mr-2" placeholder="Value" />
                        <va-button class="dlt-btn"  icon="delete" color="danger" @click="deleteEntry('appConfig', index)"></va-button>
                    </div>
                </div>
            </div>
        <div class="btn-container">
            <va-button class="save-btn" icon="save" @click="saveConfig('appConfig')">Save</va-button>
            <va-button class="ml-2 save-btn" icon="close" @click="cancel">Cancel</va-button>
        </div>
        </template>
        <template v-else-if="currentTab === 1">
            <va-button class="mb-3" icon="add" @click="addEmptyEntry('runtimeConfig')">Add New</va-button>
            <div class="m-4">
                <div class="config-table">
                    <div v-for="(entry, index) in runtimeConfigArray" :key="entry.id" class="config-row mb-2">
                        <va-input v-model="entry.key" class="config-key mr-2" placeholder="Key" />
                        <va-input v-model="entry.value" class="config-value mr-2" placeholder="Value" />
                        <va-button class="dlt-btn"  icon="delete" color="danger" @click="deleteEntry('runtimeConfig', index)"></va-button>
                    </div>
                </div>
            </div>
            <div class="btn-container">
                <va-button class="save-btn" icon="save" @click="saveConfig('runtimeConfig')">Save</va-button>
                <va-button class="ml-2 save-btn" icon="close" @click="cancel">Cancel</va-button>
            </div>
        </template>
    </va-tabs>
</template>

<style scoped lang="scss">
.btn-container {
    display: flex;
    justify-content: end;
}
</style>
