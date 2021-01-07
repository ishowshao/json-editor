<template>
    <el-form size="small" :label-width="schema.$layout !== 'inline' ? `80px` : ''" :inline="schema.$layout === 'inline'" label-position="left">
        <div v-if="!root && !(schema.$layout === 'inline')">{{ schema.title }}</div>
        <el-form-item v-if="schema.$layout === 'inline'" :label="schema.title"></el-form-item>
        <component v-bind:is="(value.format ? value.format : value.type) + '-editor'" v-for="(value, name) in schema.properties" :key="name"  :ref="name" :schema="value" :name="name" :instanceData="instanceData ? instanceData[name] : null" @change="onChange"></component>
    </el-form>
</template>
<script>
import id from '../../lib/id';

export default {
    name: 'object-editor',
    props: ['schema', 'instanceData', 'root'],
    data() {
        return {
            i: 0,
        };
    },
    methods: {
        getValue() {
            const value = {
                id: this.schema.id,
            };
            for (const key in this.schema.properties) {
                if (this.schema.properties.hasOwnProperty(key)) {
                    value[key] = this.$refs[key][0].getValue();
                }
            }
            return value;
        },
        onChange() {
            this.$emit('change');
        },
        genId() {
            return id();
        }
    },
    created() {
        // console.log('object created', this.schema);
    },
    beforeDestroy() {
        // console.log('object beforeDestroy')
    }
};
</script>
<style>
.el-form--inline .el-form-item__label {
    background-color: #f5f5f5;
}
</style>