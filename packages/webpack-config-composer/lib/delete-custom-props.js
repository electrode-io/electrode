"use strict";
function deleteCustomProps(o) {
    if (!o) {
        return o;
    }
    if (o.constructor.name === "Array") {
        o.forEach(deleteCustomProps);
    }
    else if (o.constructor.name === "Object") {
        Object.keys(o).forEach((k) => {
            if (k !== "__dirname" && k !== "__filename" && k.startsWith("_")) {
                delete o[k];
            }
            else {
                deleteCustomProps(o[k]);
            }
        });
    }
    return o;
}
module.exports = deleteCustomProps;
//# sourceMappingURL=delete-custom-props.js.map