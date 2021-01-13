import block from './block/';
import background from './background/';
import size from './size/';
import plainText from './plain-text/';

const componentsMap = {
    block,
    background,
    size,
    'plain-text': plainText,
};

export default componentsMap;