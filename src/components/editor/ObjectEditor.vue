<template>
    <div>
        <div>{{ schema.title }}</div>
        <component v-bind:is="(value.format ? value.format : value.type) + '-editor'" v-for="(value, name) in schema.properties" :key="name + genId()"  :ref="name" :schema="value" :name="name" :instanceData="instanceData ? instanceData[name] : null" @change="onChange"></component>
    </div>
</template>
<script>
import id from '../../lib/id';

export default {
    name: 'object-editor',
    props: ['schema', 'instanceData'],
    data() {
        return {
            // map: editorMap,
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
        console.log('object created', this.schema);
    }
};
</script>
