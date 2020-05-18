function cloneDeep(target) {
    const root = {};
    const loopStack = [
        {
            data: target,
            key: undefined,
            parent: root
        }
    ]

    while(loopStack.length) {
        const { data, key, parent } = loopStack.pop();

        let result = parent;
        if (key != undefined) {
            result = parent[key] = {};
        }
        
        for(let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    loopStack.push({
                        data: data[k],
                        key: k,
                        parent: result
                    })
                } else {
                    result[k] = data[k];
                }
            }
        }
    }
    return root;
}