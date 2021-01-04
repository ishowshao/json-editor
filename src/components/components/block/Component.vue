<template>
    <div class="block" :style="{backgroundColor: instanceData.bgColor}">
        <div v-if="components.length === 0">empty block</div>
        <div v-else v-for="component in components" :key="component.id" :class="{active: component.active}" :style="{top: `${component.data.layout && component.data.layout.top}px`, left: `${component.data.layout && component.data.layout.left}px`}" @click.stop="active(component)" @mousedown="(e) => {onMouseDown(e, component)}" @mouseup="onMouseUp" @mousemove.prevent="onMouseMove" class="x-component">
            <component v-bind:is="component.component" :componentId="component.id" :instanceData="component.data"></component>
        </div>
    </div>
</template>
<script>
export default {
    props: ['blockId', 'instanceData', 'components'],
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
        onMouseDown(e, component) {
            console.log('mousedown', e, component);
            this.targetComponent = component;
            this.target = e.target;
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            this.top = Number(this.targetComponent.data.layout.top) || 0;
            this.left = Number(this.targetComponent.data.layout.left) || 0;
        },
        onMouseUp(e) {
            this.target = null;
            this.targetComponent.data.layout.top = this.top + e.clientY - this.clientY;
            this.targetComponent.data.layout.left = this.left + e.clientX - this.clientX;
        },
        onMouseMove(e) {
            if (this.target) {
                // console.log(this.target);
                this.targetComponent.data.layout.top = this.top + e.clientY - this.clientY;
                this.targetComponent.data.layout.left = this.left + e.clientX - this.clientX;
            }
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