<template>
    <div class="cc-background" :style="{backgroundColor: config.color}">背景颜色组件</div>
</template>
<script>
export default {
    props: ['config'],

}
</script>
<style scoped>
.cc-background {
    width: 100%;
    height: 80px;
}
</style>