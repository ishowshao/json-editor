<template>
    <div>
        <div>{{schema.title}}</div>
        <component v-bind:is="map[value.type]" v-for="(value, name) in schema.properties" :key="name" :schema="value" :name="name"></component>
    </div>
</template>
<script>
import StringGenerator from './StringGenerator.vue';
import IntegerGenerator from './IntegerGenerator.vue';
import ArrayGenerator from './ArrayGenerator.vue'

export default {
    props: ['schema'],
    data() {
        return {
            map: {
                string: StringGenerator,
                integer: IntegerGenerator,
                array: ArrayGenerator,
            },
        };
    }
}
</script>