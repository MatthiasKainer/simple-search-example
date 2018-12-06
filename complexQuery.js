module.exports = [{
    op: "AND",
    leaves: [
        {
            op: "OR",
            leaves: [
                {
                    op: "MATCH",
                    field: "Manufacturer",
                    value: "Ope"
                },
                {
                    op: "MATCH",
                    field: "Manufacturer",
                    value: "Au"
                }
            ]
        },
        {
            op: "OR",
            leaves: [
                {
                    op: "MATCH",
                    field: "transmittionType",
                    value: "Manual"
                }
            ]
        }
    ]
}];