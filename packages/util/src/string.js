export function capitalize(str) {
    if (!str || typeof str != 'string') return '';

    return str.toLowerCase.replace(/(\w)(\w+)/g, function (all, s1, s2) {
        return s1.toUpperCase() + s2 || '';
    });

}

export function trim(string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};