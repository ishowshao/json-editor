<template>
    <el-form-item :label="name" :key="name">
        <el-input v-model="schema.value"></el-input>
    </el-form-item>
</template>
<script>
export default {
    props: ['schema', 'name'],
}
</script>