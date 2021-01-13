<template>
    <div class="cc-size" :style="{width: `${width}px`, height: `${height}px`}">
        <h6>调整大小</h6>
        <el-button size="mini" @click="expand">变大</el-button>
    </div>
</template>
<script>
export default {
    name: 'size',
    data() {
        return {
            width: 100,
            height: 80,
        };
    },
    methods: {
        expand() {
            this.width += 10;
            this.height += 10;
        },
    },
}
</script>
<style scoped>
.cc-size {
    border: 1px solid blue;
    width: 100px;
    height: 80px;
}
</style>