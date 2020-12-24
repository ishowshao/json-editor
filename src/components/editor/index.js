import ObjectEditor from './ObjectEditor.vue';
import ArrayEditor from './ArrayEditor.vue';
import ColorEditor from './ColorEditor.vue';
import IntegerEditor from './IntegerEditor.vue';
import StringEditor from './StringEditor.vue';

const editorMap = {
    object: ObjectEditor,
    array: ArrayEditor,
    color: ColorEditor,
    interger: IntegerEditor,
    string: StringEditor,
};

export default editorMap;