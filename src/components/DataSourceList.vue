<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { useDataSourcesStore } from "@/plugins/data/DatasourcePinia";

const { dataSources, createDataSource, removeDataSource } = useDataSourcesStore();
const instance = getCurrentInstance();

const availableDatasources = Object.keys(instance?.appContext.config.globalProperties.connectionsConfig.availableConnections);

const addDataSource = () => {
    createDataSource(null);
};
</script>

<template>
    <div class="datasource_list-container">
        <div class="datasource_list-header">
            <h4>
                DataSources
            </h4>
            <VaButton size="small" @click="addDataSource()">Add datasource</VaButton>
        </div>
        <VaList class="datasource_list-content">
            <VaListItem v-for="(dataSource, index) in dataSources" :key="index" class="datasource_list-list__item"
                @click="$emit('openEditor', { type: 'DataSource', itemId: dataSource.uid })">
                <VaListItemSection>
                    <VaListItemLabel>
                        {{ dataSource.name }}
                    </VaListItemLabel>

                    <VaListItemLabel caption>
                        Type: {{ dataSource.type }}
                    </VaListItemLabel>
                    <VaListItemLabel caption>
                        UID: {{ dataSource.uid }}
                    </VaListItemLabel>
                </VaListItemSection>
                <VaListItemSection icon>
                    <VaIcon name="delete" color="danger" @click.stop.prevent="removeDataSource(dataSource.uid)" />
                </VaListItemSection>
            </VaListItem>
        </VaList>
    </div>
</template>

<style scoped>
.datasource_list-container {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.datasource_list-content {
    overflow: auto;
    flex-grow: 1;
}

.datasource_list-header {
    padding: 16px;
    display: flex;
    margin: -16px -16px 16px -16px;

    flex-direction: row;
    align-items: center;
    border-bottom: 1px dashed #e0e0e0;
}

.datasource_list-header h4 {
    margin: 0;
    flex-grow: 1;
}

.datasource_list-list__item+.datasource_list-list__item {
    margin-top: 8px;
}
</style>
