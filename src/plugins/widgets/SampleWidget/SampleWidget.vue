<script setup lang="ts">
import { useDatasourceRepository } from '@/plugins/widgets/composables/datasourceRepository';
import { toRefs } from 'vue';

const props = defineProps<{ datasourceId: string }>();
const { datasourceId } = toRefs(props);

const { data } = useDatasourceRepository(datasourceId, "string");
</script>

<template>
    <div class="widget">
        {{ data ?? 'Data do not created' }}
    </div>
</template>

<style scoped>
.widget {
    padding: 12px;
}
</style>