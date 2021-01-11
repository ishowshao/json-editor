<template>
    <el-form size="small" :label-width="schema.$layout !== 'inline' ? `80px` : ''" :inline="schema.$layout === 'inline'" label-position="left" class="editor-inline">
        <div v-if="!root && !(schema.$layout === 'inline')">{{ schema.title }}</div>
        <template v-if="schema.$layout === 'inline'">
            <el-form-item :label="schema.title" class="editor-inline-label"></el-form-item>
            <div class="d-inline-flex" style="width: 360px;">
                <div v-for="(value, name) in schema.properties" :key="name" style="width: 159px;">
                    <component v-bind:is="(value.format ? value.format : value.type) + '-editor'" :ref="name" :schema="value" :name="name" :instanceData="instanceData ? instanceData[name] : null" @change="onChange"></component>
                </div>
            </div>
        </template>
        <template v-else>
            <component v-bind:is="(value.format ? value.format : value.type) + '-editor'" v-for="(value, name) in schema.properties" :key="name"  :ref="name" :schema="value" :name="name" :instanceData="instanceData ? instanceData[name] : null" @change="onChange"></component>
        </template>
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
.el-form--inline.editor-inline .el-form-item:not(.editor-inline-label) .el-form-item__label {
    background-color: #f5f5f5;
    border: 1px solid #DCDFE6;
    border-right: 0;
    box-sizing: border-box;
    border-radius: 4px 0 0 4px;
    line-height: 30px;
}
.el-form--inline.editor-inline .el-form-item:not(.editor-inline-label) .el-form-item__label + .el-form-item__content .el-input__inner {
    border-radius: 0 4px 4px 0;
}
</style>