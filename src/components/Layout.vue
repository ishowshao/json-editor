<template>
    <div
        :style="{top: `${instanceData.layout.top}px`, left: `${instanceData.layout.left}px`, width: `${instanceData.layout.width}px`}"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
        @mousemove.prevent="onMouseMove"
        @click.stop="active"
        :class="{active: component.active}"
        class="x-component">
        <slot></slot>
        <div class="handle handle-l"></div>
        <div class="handle handle-r"></div>
    </div>
</template>
<script>
export default {
    props: ['component', 'instanceData'],
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
        active() {
            this.$emit('active', this.component);
        },
        onMouseDown(e) {
            console.log('mousedown', e, this.component);
            this.target = e.target;
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            this.top = Number(this.component.data.layout.top) || 0;
            this.left = Number(this.component.data.layout.left) || 0;
        },
        onMouseUp(e) {
            this.target = null;
            this.component.data.layout.top = this.top + e.clientY - this.clientY;
            this.component.data.layout.left = this.left + e.clientX - this.clientX;
        },
        onMouseMove(e) {
            if (this.target) {
                // console.log(this.target);
                this.component.data.layout.top = this.top + e.clientY - this.clientY;
                this.component.data.layout.left = this.left + e.clientX - this.clientX;
            }
        },
    }
}
</script>
<style>
.x-component {
    position: absolute;
    z-index: 2;
}
.x-component.active::after  {
    content: "";
    position: absolute;
    border: 1px dashed #81b0ff;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.handle {
    display: none;
    position: absolute;
    width: 7px;
    height: 7px;
    box-sizing: border-box;
    border: 1px solid black;
}
.active .handle {
    display: block;
}
.handle-l {
    top: 50%;
    left: -3px;
}
.handle-r {
    top: 50%;
    right: -3px;
}
</style>