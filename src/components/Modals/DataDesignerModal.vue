<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->
<script lang="ts">
import { usePromisifiedModal } from "@/composables/promisifiedModal";
import DataDesigner from "@/components/Common/DataDesigner.vue";

export default {
    name: "AxisSelectionModal",
    setup() {
        const opened = async () => {};

        const { isOpened, run, close } = usePromisifiedModal(() => {}, opened);

        return {
            isOpened,
            run,
            close,
        };
    },
    methods: {
        ok() {
            this.close();
        },
    },
    components: {
        DataDesigner,
    },
};
</script>
<template>
    <va-modal
        :modelValue="isOpened"
        no-padding
        fullscreen
        class="modal"
        @ok="ok"
        zIndex="10000000"
    >
        <template #content="{ }">
            <va-card-title>
                <h4 class="va-h4">Data Designer</h4>
            </va-card-title>
            <va-card-content class="main-content">
                <DataDesigner />
            </va-card-content>
            <va-card-actions align="right">
                <va-button @click="close">Close</va-button>
                <va-button @click="close">Save</va-button>
            </va-card-actions>
        </template>
    </va-modal>
</template>
<style lang="scss" scoped>
.measure_list {
    padding: 20px 0;
}

.main-content {
    flex-grow: 1;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}
</style>
