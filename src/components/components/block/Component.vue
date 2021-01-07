<template>
    <div class="block" :style="{backgroundColor: instanceData.bgColor}">
        <div v-if="components.length === 0">empty block</div>
        <layout
            v-else
            v-for="(component, index) in components"
            :key="component.id"
            :component="component"
            :instanceData="component.data"
            :zIndex="zIndex + index"
            @active="active">
            <component v-bind:is="component.component" :componentId="component.id" :instanceData="component.data"></component>
        </layout>
    </div>
</template>
<script>
import Layout from '@/components/Layout.vue';

export default {
    props: ['blockId', 'instanceData', 'components'],
    components: {
        Layout,
    },
    data() {
        return {
            zIndex: 2,
            targetComponent: null,
            target: null,
            clientX: null,
            clientY: null,
            top: null,
            left: null,
        };
    },
    methods: {
        active(component) {
            this.$emit('component-active', component, this.blockId);
        },
    }
}
</script>
<style scoped>
.block {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100px;
}
</style>