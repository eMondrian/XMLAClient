<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderBar from './components/common/HeaderBar.vue';
import { ref } from 'vue';

const isSidebarHovered = ref();
</script>

<template>
    <HeaderBar />
    <div
        class="sidebar"
        @mouseenter="isSidebarHovered = true"
        @mouseleave="isSidebarHovered = false"
        style="position: relative;"
    >
        <va-sidebar
            hoverable
            minimized-width="58px"
            class="colored-sidebar"
        >
            <va-sidebar-item :active="$route.name === 'designer'" @click="$router.push('/qweqwe/')" class="pointer">
                <va-sidebar-item-content>
                    <va-icon name="preview" />
                    <va-sidebar-item-title>
                        View
                    </va-sidebar-item-title>
                </va-sidebar-item-content>
            </va-sidebar-item>
            <va-sidebar-item :active="$route.name === 'dashboard'" @click="$router.push('/qweqwe/edit')"
                class="pointer">
                <va-sidebar-item-content>
                    <va-icon name="draw" />
                    <va-sidebar-item-title>
                        Edit
                    </va-sidebar-item-title>
                </va-sidebar-item-content>
            </va-sidebar-item>
            <va-sidebar-item :active="$route.name === 'dashboard'" @click="$router.push('/qweqwe/data')"
                class="pointer">
                <va-sidebar-item-content>
                    <va-icon name="draw" />
                    <va-sidebar-item-title>
                        Edit
                    </va-sidebar-item-title>
                </va-sidebar-item-content>
            </va-sidebar-item>
            <va-sidebar-item :active="$route.name === 'config'" @click="$router.push('/configuration')" class="pointer">
                <va-sidebar-item-content>
                    <va-icon name="settings" />
                    <va-sidebar-item-title>
                        Configuration
                    </va-sidebar-item-title>
                </va-sidebar-item-content>
            </va-sidebar-item>
            <va-sidebar-item :active="$route.name === 'test'" @click="$router.push('/test')" class="pointer">
                <va-sidebar-item-content>
                    <va-icon name="settings" />
                    <va-sidebar-item-title>
                        Test
                    </va-sidebar-item-title>
                </va-sidebar-item-content>
            </va-sidebar-item>
        </va-sidebar>
    </div>
    <div class="router-view-wrapper">
      <RouterView />
    </div>
    
</template>

<style scoped>
.router-view-wrapper {
  flex: 1;
  margin-top: 58px;
  overflow-y: auto;
}

.sidebar {
    margin-top: 58px;
}
</style>
