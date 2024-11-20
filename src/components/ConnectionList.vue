<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { useConnectionsStore } from "@/plugins/data/ConnectionsPinia";

const { connections, createConnection, removeConnection } = useConnectionsStore();
const instance = getCurrentInstance();

const availableConnections = Object.keys(instance?.appContext.config.globalProperties.connectionsConfig.availableConnections);

const addDataSource = () => {
  createConnection(null);
};

defineEmits(['openEditor']);
</script>

<template>
  <div class="datasource_list-container">
    <div class="datasource_list-header">
      <h4>
        Connections
      </h4>
      <VaButton size="small" @click="addDataSource()">Add connection</VaButton>
    </div>
    <VaList class="datasource_list-content">
      <VaListItem v-for="(connection, index) in connections" :key="index" class="datasource_list-list__item"
        @click="$emit('openEditor', { type: 'Connection', itemId: connection.uid })">
        <VaListItemSection>
          <VaListItemLabel>
            {{ connection.name }}
          </VaListItemLabel>

          <VaListItemLabel caption>
            Type: {{ connection.type }}
          </VaListItemLabel>
          <VaListItemLabel caption>
            UID: {{ connection.uid }}
          </VaListItemLabel>
        </VaListItemSection>
        <VaListItemSection icon>
          <VaIcon name="delete" color="danger" @click.stop.prevent="removeConnection(connection.uid)" />
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
