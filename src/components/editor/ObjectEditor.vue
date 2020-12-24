<template>
    <div>
        <div>{{ schema.title }}</div>
        <component v-bind:is="map[value.format ? value.format : value.type]" v-for="(value, name) in schema.properties" :key="schema.id + name" :ref="name" :schema="value" :name="name"></component>
    </div>
</template>
<script>
import editorMap from './index';

export default {
    props: ['schema', 'output'],
    data() {
        return {
            map: editorMap,
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
        }
    },
    created() {
        console.log('object created');
    }
};
</script>
