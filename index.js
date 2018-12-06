const operators = {
    "AND": (leaves, data) => leaves
        .reduce((result, innerLeaf) =>
            [...result, ...walkTree(data, innerLeaf)], [])
        .filter((value, index, self) => self.indexOf(value) === index),
    "OR": (leaves, data) => leaves
        .reduce((result, innerLeaf) => {
            const leafResult = walkTree(data, innerLeaf);
            return [
                ...result
                    .filter(x => !leafResult.includes(x))
                    .concat(leafResult.filter(x => !result.includes(x)))
            ];
        }, [])
        .filter((value, index, self) => self.indexOf(value) === index),
    "MATCH": (leaf, data) => {
        return [
            ...data
                .filter(data => {
                    const fields = leaf.field
                        ? [leaf.field]
                        : [...Object.keys(data)];
                    return fields.some(field =>
                        (data[field]).toUpperCase()
                            .indexOf(leaf.value.toUpperCase()) > -1);
                })
        ]
    }
}

const walkTree = (data, leaf) => {
    if (operators[leaf.op] && leaf.leaves) {
        return operators[leaf.op](leaf.leaves, data);
    }

    return (operators[leaf.op])
        ? operators[leaf.op](leaf, data)
        : [];
}

const search = (data, leaves) => {
    return leaves
        .reduce((result, innerLeaf) => {
            result = [...result, ...walkTree(data, innerLeaf)];
            return result;
        }, [])
        .filter((value, index, self) => self.indexOf(value) === index);
}

module.exports = search;