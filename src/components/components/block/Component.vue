<template>
    <div class="block" :style="{backgroundColor: instanceData.bgColor}">
        <div v-if="components.length === 0">empty block</div>
        <layout v-else v-for="component in components" :key="component.id" :component="component" :instanceData="component.data" :mouse="mouse" @active="active">
            <component v-bind:is="component.component" :componentId="component.id" :instanceData="component.data"></component>
        </layout>
    </div>
</template>
<script>
import Layout from '@/components/Layout.vue';

export default {
    props: ['blockId', 'instanceData', 'components', 'mouse'],
    components: {
        Layout,
    },
    data() {
        return {
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