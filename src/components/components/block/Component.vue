<template>
    <div class="block" :style="{backgroundColor: instanceData.bgColor}">
        <div v-if="components.length === 0">empty block</div>
        <div v-else v-for="component in components" :key="component.id" :class="{active: component.active}" @click.stop="active(component)" class="x-component">
            <component v-bind:is="component.component" :componentId="component.id" :instanceData="component.data"></component>
        </div>
    </div>
</template>
<script>
export default {
    props: ['blockId', 'instanceData', 'components'],
    methods: {
        active(component) {
            this.$emit('component-active', component, this.blockId);
        }
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