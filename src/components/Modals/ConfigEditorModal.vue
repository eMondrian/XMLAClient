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
import ConfigEditor from "@/components/Common/ConfigEditor.vue";

export default {
    name: "ConfigEditorModal",
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
            this.close(null);
        },
        handleSave() {
            this.close(null);
        },
        handleCancel() {
            this.close(null);
        }
    },
    components: {
        ConfigEditor,
    },
};
</script>

<template>
    <va-modal
        :model-value="isOpened"
        no-padding
        class="modal"
        @ok="ok"
        size="auto"
    >
        <template #content="{ ok }">
            <div class="config-editor-modal">
                <div class="m-4">
                    <ConfigEditor @save="handleSave" @cancel="handleCancel"/>
                </div>
                <va-button
                    preset="secondary"
                    class="mr-1 mb-1 close"
                    @click="close"
                    icon="clear"
                />
            </div>
        </template>
    </va-modal>
</template>

<style lang="scss" scoped>
.config-editor-modal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 10px;
    width: 100%;
    z-index: 99999999;

    button {
        align-self: flex-start;
    }

    .config-table {
        display: flex;
        flex-direction: column;
    }

    .config-row {
        margin: 10px;
    }

    .dlt-btn {
        i {
            margin: 0;
        }
    }
}
</style>
