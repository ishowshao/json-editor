import Vue from 'vue';
import ObjectEditor from './ObjectEditor.vue';
import ArrayEditor from './ArrayEditor.vue';
import ColorEditor from './ColorEditor.vue';
import IntegerEditor from './IntegerEditor.vue';
import StringEditor from './StringEditor.vue';

console.log(ObjectEditor);
Vue.component(ObjectEditor.name, ObjectEditor);
Vue.component(ArrayEditor.name, ArrayEditor);
Vue.component(ColorEditor.name, ColorEditor);
Vue.component(IntegerEditor.name, IntegerEditor);
Vue.component(StringEditor.name, StringEditor);

const editorMap = {
    object: ObjectEditor,
    array: ArrayEditor,
    color: ColorEditor,
    integer: IntegerEditor,
    string: StringEditor,
};

export default editorMap;