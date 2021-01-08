<template>
    <div class="block position-relative" :style="{backgroundColor: instanceData.bgColor, height: `${instanceData.height}px`}">
        <div v-if="components.length === 0" class="block-placeholder d-flex justify-content-center align-items-center position-absolute" style="border: 1px dashed #0aaae6; top: 10px; left: 10px; right: 10px; bottom: 10px;">
            <div>可从左侧点击或拖拽组件到这里</div>
        </div>
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
        <div class="position-absolute block-handler block-handler-top"></div>
        <div class="position-absolute block-handler block-handler-bottom"></div>
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
    box-sizing: border-box;
    width: 100%;
    height: 100px;
}
.block-container .block-handler {
    display: none;
}
.block-container.active .block-handler {
    display: block;
    width: 50px;
    height: 14px;
    background: #0AAAE6;
    border-radius: 8px 8px 0px 0px;
    left: 162px;
    z-index: 100;
    cursor: ns-resize;
    box-shadow: 0px -2px 8px -2px rgba(0, 47, 65, 0.37);
}
.block-container.active .block-handler::after {
    position: absolute;
    content: "";
    width: 10px;
    height: 1px;
    background-color: white;
    left: 20px;
    top: 6px;
    box-shadow: 0 3px 0 0 white;
}
.block-container.active .block-handler.block-handler-top {
    top: -14px;
}
.block-container.active .block-handler.block-handler-bottom {
    bottom: -14px;
    transform: scaleY(-1);
}
.block-placeholder {
    color: #999999;
    font-size: 14px;
}
</style>