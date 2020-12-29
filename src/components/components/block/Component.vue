<template>
    <div class="block" :style="{backgroundColor: config.bgColor}">empty block</div>
</template>
<script>
export default {
    props: ['config'],
}
</script>
<style scoped>
.block {
    position: relative;
    box-sizing: border-box;
    border: 1px dashed #cccccc;
    width: 100%;
    height: 100px;
}
</style>