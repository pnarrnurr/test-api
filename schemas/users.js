exports.getUserSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        },
        required: ['id']
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

exports.createUserSchema = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            username: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' }
        },
        required: ['name', 'username', 'email', 'password']
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

exports.updateUserSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        },
        required: ['id']
    },
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            username: { type: 'string' },
            email: { type: 'string', format: 'email' }
        }
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

exports.deleteUserSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        },
        required: ['id']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                result: {
                    type: 'boolean',
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

exports.getAllUserSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                result: {
                    type: 'array',
                    additionalProperties: true
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