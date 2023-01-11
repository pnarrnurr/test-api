const { collectionConnect } = require('../config/database');
const { nanoid } = require('nanoid');
const crypto = require('crypto');
const hashSecretKey = "test";

exports.get = async (req, res, next) => {
    let id = req.params.id || null;
    if (id && id != ':id') {
        const users = await collectionConnect('users');
        let result = await users.findOne({ _id: id });
        if (!result) {
            return {
                result: null,
                result_message: {
                    type: 'error',
                    title: 'Error',
                    message: 'Kullanıcı Bulunamadı!'
                }
            };
        }
        result.id = result._id;
        delete result._id;
        delete result.password;
        return result;
    }
}

exports.create = async (req, res, next) => {
    let { name, username, email, password } = req.body;
    if (req.body) {
        const users = await collectionConnect('users');
        let condition = name.length > 0 && username.length > 0 && email.length > 0 && password.length > 0;
        if (!condition) {
            return {
                result: null,
                result_message: {
                    type: 'error',
                    title: 'Error',
                    message: 'Zorunlu alanları doldurunuz!'
                }
            };
        }
        req.body.password = crypto.createHmac('sha256', hashSecretKey).update(password).digest('hex')
        let data = {
            ...req.body,
            _id: nanoid(),
            createdAt: new Date(),
            createdBy: '1',
            updatedAt: new Date(),
            updatedBy: '1'
        }
        let result = await users.insertOne(data)
        if (result.insertedId) {
            req.params.id = result.insertedId;
            return {
                result: await this.get(req),
                result_message: {
                    type: 'success',
                    title: 'Info',
                    message: 'Kullanıcı Başarıyla Eklendi.'
                }
            };
        }
    }
}

exports.update = async (req, res, next) => {
    let id = req.params.id || null;
    if (id && req.body) {
        let status = req.body.name && req.body.name.length > 0
        if (req.body.password) {
            delete req.body.password;
        }
        let data = {
            ...req.body,
            updatedAt: new Date(),
            updatedBy: '1'
        }
        const users = await collectionConnect('users');
        let result = await users.updateOne(
            { _id: id },
            { $set: data }
        );
        if (result.matchedCount == 0)
            return {
                result: null,
                result_message: {
                    type: 'error',
                    title: 'Error',
                    message: 'Kullanıcı Bulunamadı!'
                }
            }
        return {
            result: await this.get(req),
            result_message: {
                type: 'success',
                title: 'Info',
                message: 'Kullanıcı Başarıyla Güncellendi.'
            }
        };
    }
}

exports.deleteOne = async (req, res, next) => {
    let id = req.params.id || null;
    if (id) {
        const users = await collectionConnect('users');
        let result = await users.deleteOne({ _id: id })
        if (result.deletedCount == 0)
            return {
                result: null,
                result_message: {
                    type: 'error',
                    title: 'Error',
                    message: 'Kullanıcı Bulunamadı!'
                }
            }
        return {
            result: true,
            result_message: {
                type: 'success',
                title: 'Info',
                message: 'Kullanıcı Başarıyla Silindi.'
            }
        }
    }
}

exports.getAll = async (req, res, next) => {
    const users = await collectionConnect('users');
    let result = await users.find({}).toArray();
    if (result.length > 0) {
        result = await result.map(item => {
            item.id = item._id;
            delete item._id;
            return item
        })
    }
    return result;
}