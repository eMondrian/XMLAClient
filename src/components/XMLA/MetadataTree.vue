<!-- <script lang="ts">
import { TreeItemTypesEnum } from "../../stores/TreeViewItems";
import { onMounted, ref } from "vue";
import draggable from "vuedraggable";
import XMLAIconVue from "@/icons/XMLAIcon.vue";
import { useMetadataStorage } from "@/composables/metadataStorage";

export default {
  setup() {
    const metadataStorage = useMetadataStorage();

    const treeViewData = ref(null as any);
    onMounted(async () => {
      treeViewData.value = await metadataStorage.getTreeViewNodes();
    });

    const filter = ref("");

    const expandedNodes = ref([] as string[]);
    const triggerExpanded = async (nodes: string[]) => {
      expandedNodes.value = nodes;
      await metadataStorage.setExpandedNodes(nodes);
      treeViewData.value = await metadataStorage.getTreeViewNodes();
    };

    const loadMore = async (id) => {
      await metadataStorage.loadMoreForNode(id);
      treeViewData.value = await metadataStorage.getTreeViewNodes();
    };

    const dragging = ref("");

    return {
      treeViewData,
      filter,
      triggerExpanded,
      TreeItemTypesEnum,
      dragging,
      expandedNodes,
      loadMore,
    };
  },
  components: {
    draggable,
    XMLAIconVue,
  },
  methods: {
    getTreeViewItemIcon(treeViewItem) {
      const iconDesc = {
        name: "",
        primaryColor: "",
        secondaryColor: "",
      };
      if (treeViewItem.type === TreeItemTypesEnum.Measure) {
        iconDesc.name = "MeasureIcon";
      } else if (
        treeViewItem.type === TreeItemTypesEnum.SetsFolder ||
        treeViewItem.type === TreeItemTypesEnum.Folder
      ) {
        if (this.expandedNodes.some((e) => e === treeViewItem.id)) {
          iconDesc.name = "mdi-folder_open";
        } else {
          iconDesc.name = "mdi-folder";
        }
      } else if (treeViewItem.type === TreeItemTypesEnum.Set) {
        iconDesc.name = "SetIcon";
      } else if (treeViewItem.type === TreeItemTypesEnum.Dimension) {
        if (treeViewItem.isMeasureDimension) {
          iconDesc.name = "MeasureIcon";
        } else {
          iconDesc.name = "DimesionIcon";
        }
      } else if (treeViewItem.type === TreeItemTypesEnum.MeasureGroup) {
        if (this.expandedNodes.some((e) => e === treeViewItem.id)) {
          iconDesc.name = "MeasureFolderOpened";
          iconDesc.secondaryColor = "#154EC1";
        } else {
          iconDesc.name = "MeasureFolder";
          iconDesc.secondaryColor = "#154EC1";
        }
      } else if (treeViewItem.type === TreeItemTypesEnum.Hierarchy) {
        if (treeViewItem.originalItem.PARENT_CHILD) {
          iconDesc.name = "HierarchyParentChild";
          iconDesc.secondaryColor = "#154EC1";
        }
        iconDesc.name = "HierarchyNormal";
        iconDesc.secondaryColor = "#154EC1";
      } else if (treeViewItem.type === TreeItemTypesEnum.Level) {
        if (treeViewItem.originalItem.LEVEL_NUMBER === "0") {
          iconDesc.name = "LevelZero";
        }
        if (treeViewItem.originalItem.LEVEL_NUMBER === "1") {
          iconDesc.name = "LevelOne";
        }
        if (treeViewItem.originalItem.LEVEL_NUMBER === "2") {
          iconDesc.name = "LevelTwo";
        }
        if (treeViewItem.originalItem.LEVEL_NUMBER === "3") {
          iconDesc.name = "LevelThree";
        }
        if (treeViewItem.originalItem.LEVEL_NUMBER === "4") {
          iconDesc.name = "LevelFour";
        }
        if (treeViewItem.originalItem.LEVEL_NUMBER === "5") {
          iconDesc.name = "LevelFive";
        }
        if (treeViewItem.originalItem.LEVEL_NUMBER === "6") {
          iconDesc.name = "LevelSix";
        }
        if (treeViewItem.originalItem.LEVEL_NUMBER === "7") {
          iconDesc.name = "LevelSeven";
        }
        if (treeViewItem.originalItem.LEVEL_NUMBER === "8") {
          iconDesc.name = "LevelEight";
        }
        if (treeViewItem.originalItem.LEVEL_NUMBER === "9") {
          iconDesc.name = "LevelNine";
        }
      }
      return iconDesc;
    },
  },
};
</script> -->


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getTreeViewNodes } from './XMLAMetadataTree';
import { TreeItemTypesEnum } from './TreeViewItems';
import XMLAIconVue from './XMLAIcon.vue';
import draggable from "vuedraggable";

const { metadata, cubename } = defineProps(['metadata', 'cubename'])

const treeViewData = ref(null as any);

onMounted(() => {
  treeViewData.value = getTreeViewNodes(metadata.storage);
});

const filter = ref("");
const getTreeViewItemIcon = (treeViewItem: any) => {
  const iconDesc = {
    name: "",
    primaryColor: "",
    secondaryColor: "",
  };

  return iconDesc;
}
</script>

<template>
  <h1 class="area-header">Metadata Tree</h1>
  <div class="metadata_tree-container">
    <div v-if="treeViewData">
      <div class="tree-container">
        <div class="tree-header mb-2">
          <h3 class="ma-2">Cube: {{ cubename }}</h3>
          <va-input v-model="filter" placeholder="Filter..." clearable class="filter-input" />
        </div>
        <va-tree-view :nodes="treeViewData" class="tree-view overflow-auto" :filter="filter" :text-by="'caption'">
          <!-- @update:expanded="triggerExpanded" -->
          <template #content="node">
            <draggable v-if="node.type === TreeItemTypesEnum.Hierarchy" :modelValue="[node]"
              :group="{ name: 'hierarchies', pull: 'clone', put: false }" item-key="id">
              <template #item="{ element }">
                <div class="d-flex align-center">
                  <XMLAIconVue :icon="getTreeViewItemIcon(node).name"
                    :primary-color="getTreeViewItemIcon(node).primaryColor"
                    :secondary-color="getTreeViewItemIcon(node).secondaryColor" :height="24" :width="24" class="mr-1">
                  </XMLAIconVue>
                  {{ element.caption }}
                </div>
              </template>
            </draggable>
            <draggable v-else-if="node.type === TreeItemTypesEnum.Measure" :modelValue="[node]"
              :group="{ name: 'measures', pull: 'clone', put: false }" item-key="id">
              <template #item="{ element }">
                <div class="d-flex align-center">
                  <XMLAIconVue :icon="getTreeViewItemIcon(node).name"
                    :primary-color="getTreeViewItemIcon(node).primaryColor"
                    :secondary-color="getTreeViewItemIcon(node).secondaryColor" :height="24" :width="24" class="mr-1">
                  </XMLAIconVue>
                  {{ element.caption }}
                </div>
              </template>
            </draggable>
            <div v-else class="d-flex align-center">
              <XMLAIconVue :icon="getTreeViewItemIcon(node).name"
                :primary-color="getTreeViewItemIcon(node).primaryColor"
                :secondary-color="getTreeViewItemIcon(node).secondaryColor" :height="24" :width="24" class="mr-1">
              </XMLAIconVue>
              {{ node.caption }}
            </div>
          </template>
        </va-tree-view>
      </div>
    </div>
    <div v-else class="progress-circle">
      <va-progress-circle indeterminate size="large" />
    </div>
  </div>
</template>

<style scoped>
.tree-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.tree-container .tree-view {
  overflow: auto;
}

.tree-container .va-tree-node-content__body svg {
  vertical-align: baseline;
}

.progress-circle {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-input {
  width: 100%;
  padding: 0 1rem;
}

.metadata_tree-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>