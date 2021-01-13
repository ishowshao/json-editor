<template>
    <div class="cc-plain-text" :style="{backgroundColor: instanceData.color}">{{instanceData.content}}</div>
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