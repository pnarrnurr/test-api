exports.getUserSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string', minLength: 1, maxLength: 1 }
        },
        required: ['id']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                result: {
                    type: 'object',
                    additionalProperties: true
                    // properties: {
                    //     id: { type: 'string' },
                    //     name: { type: 'string' },
                    //     username: { type: 'string' },
                    //     email: { type: 'string' },
                    //     createdAt: { type: 'string' },
                    //     createdBy: { type: 'string' },
                    //     updatedAt: { type: 'string' },
                    //     updatedBy: { type: 'string' }
                    // },
                    // required: ['id', 'name', 'username', 'email', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy']
                },
                result_message: {
                    type: 'object',
                    additionalProperties: true,
                    default: {
                        type: 'success',
                        title: 'Info',
                        message: 'Success'
                    }
                },
            },
            required: ['result', 'result_message']
        },
        // 400: {
        //     type: 'object',
        //     properties: {
        //         result: { type: 'string', default: 'hata' },
        //         result_message: {
        //             type: 'object',
        //             default: {
        //                 type: 'error',
        //                 title: 'Error',
        //                 message: 'Params eksik'
        //             }
        //         }
        //     },
        //     required: ['result', 'result_message']
        // }
    }
}