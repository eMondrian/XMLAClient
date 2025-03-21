<script setup lang="ts">
import { onMounted, watch, ref, onBeforeUnmount } from 'vue';
import useTemporaryStore from '@/composables/useTemporaryStore';
import React from 'react';
import { createRoot } from 'react-dom/client';
import GraphiQL from 'graphiql';

const props = defineProps<{ dataSource: any }>();

const { tempStore } = useTemporaryStore(props.dataSource.type, props.dataSource);
let isMounted = false;

watch(tempStore, async () => {
    if (isMounted) {
        return;
    }

    if (!tempStore.value) {
        return;
    }

    mountGraphiQL();
    isMounted = true;
}, { deep: true });

onMounted(() => {
    isMounted = false;
    if (!tempStore.value) {
        return;
    }

    mountGraphiQL();
    isMounted = true;
});

onBeforeUnmount(() => {
    console.log('GraphQLPreview unmounted');
});

const mountGraphiQL = () => {
    const container = document.getElementById('preview');
    const root = createRoot(container!);
    const graphiql = React.createElement(GraphiQL, {
        onTabChange: (tab) => {
            console.log('Tab changed', tab);
            props.dataSource.config.query = tab.tabs[0].query;
        },
        fetcher: tempStore.value.fetcher,
        defaultTheme: 'light',
        disableTabs: true,
        defaultQuery: props.dataSource.config?.query || `# Welcome to the GraphiQL editor! \n`,
        storage: null as unknown as Storage,
    });
    
    root.render(graphiql);
};
</script>
<template>
    <div class="h-full" id="preview"></div>
</template>
