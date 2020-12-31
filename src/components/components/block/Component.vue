<template>
    <div class="block" :style="{backgroundColor: instanceData.bgColor}">
        <div v-if="components.length === 0">empty block</div>
        <div v-else v-for="component in components" :key="component.id" :class="{active: component.active}" @click.stop="active(component)" @mousedown="onMouseDown" @mouseup="onMouseUp" @mousemove.prevent="onMouseMove" class="x-component">
            <component v-bind:is="component.component" :componentId="component.id" :instanceData="component.data"></component>
        </div>
    </div>
</template>
<script>
export default {
    props: ['blockId', 'instanceData', 'components'],
    data() {
        return {
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
        onMouseDown(e) {
            console.log('mousedown', e);
            this.target = e.target;
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            this.top = parseInt(this.target.parentNode.style.top) || 0;
            this.left = parseInt(this.target.parentNode.style.left) || 0;
        },
        onMouseUp() {
            this.target = null;
        },
        onMouseMove(e) {
            if (this.target) {
                // console.log(this.target);
                this.target.parentNode.style.top = (this.top + e.clientY - this.clientY) + `px`;
                this.target.parentNode.style.left = (this.left + e.clientX - this.clientX) + `px`;
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