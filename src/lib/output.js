const object2output = schema => {
    const output = {};
    for (let key in schema.properties) {
        if (schema.properties.hasOwnProperty(key)) {
            output[key] = schema.properties[key].default || null;
        }
    }
};
const schema2output = schema => {
    let output;
    if (schema.type === 'object') {
        output = {};

        console.log(output);
    } else {
    }
};
