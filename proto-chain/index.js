const lookupProto = function(object, property) {
    let current = object;
    while(current) {
        if (current.hasOwnProperty(property)) {
            return current[property];
        }
        current = Object.getPrototypeOf(current)
    }
}

lookupProto({}, 'toString');