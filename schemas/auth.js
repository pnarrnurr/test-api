exports.userLoginSchema = {
    body: {
        type: 'object',
        properties: {
            username: { type: 'string' },
            password: { type: 'string' }
        },
        required: ['username', 'password']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                result: {
                    type: 'object',
                    additionalProperties: true,
                    nullable: true
                },
                result_message: {
                    type: 'object',
                    additionalProperties: true,
                    default: {
                        type: 'success',
                        title: 'Info',
                        message: 'Başarılı'
                    }
                },
            },
            required: ['result', 'result_message']
        }
    }
}