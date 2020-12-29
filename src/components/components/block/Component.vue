<template>
    <div class="block" :style="{backgroundColor: config.bgColor}"></div>
</template>
<script>
export default {
    props: ['config'],
}
</script>
<style scoped>
.block {
    position: relative;
    width: 100%;
    height: 100px;
}
</style>