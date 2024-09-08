<script setup lang="ts"></script>
<template>
    <div class="main_container">
        <div class="sources">
            <div class="stores"></div>
            <div class="connections"></div>
        </div>
        <div class="preview"></div>
        <div class="composers"></div>
    </div>
</template>
<style scoped>
.main_container {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    flex-grow: 1;
}

.sources {
    width: 20%;
    background-color: #f0f0f0;
}

.sources .stores {
    height: 50%;
    background-color: #e0e0e0;
}

.sources .connections {
    height: 50%;
    background-color: #d0d0d0;
}

.preview {
    flex-grow: 1;
    background-color: #a0a0a0;
}

.composers {
    width: 20%;
    background-color: #f0f0f0;
}
</style>
