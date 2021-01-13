<template>
    <div class="cc-background" :style="{backgroundColor: instanceData.color}">背景颜色组件</div>
</template>
<script>
export default {
    props: ['instanceData'],
}
</script>
<style scoped>
.cc-background {
    width: 50px;
    height: 50px;
}
</style>