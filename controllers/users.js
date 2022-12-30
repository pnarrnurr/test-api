const { collectionConnect } = require('../config/database');
const { nanoid } = require('nanoid');

exports.get = async (req, res, next) => {
    let id = req.params.id || null;
    if (id) {
        const users = await collectionConnect("users");
        let result = await users.findOne({ _id: id });
        if (!result) {
            return {
                result: false,
                result_message: {
                    type: 'error',
                    title: 'Error',
                    message: 'Kullanıcı Bulunamadı!'
                }
            };
        }
        delete result.password;
        return result;
    }
}

exports.create = async (req, res, next) => {
    let { name, username, email, password } = req.body;
    if (req.body) {
        const users = await collectionConnect("users");
        let condition = name && name.length > 0 && username && username.length > 0 && email && email.length > 0 && password && password.length > 0;
        if (!condition) {
            return {
                result: false,
                result_message: {
                    type: 'error',
                    title: 'Error',
                    message: 'Eksik yerleri doldurunuz!'
                }
            };
        }
        let data = {
            ...req.body,
            _id: nanoid(),
            createdAt: new Date(),
            createdBy: "1"
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
        let data = {
            ...req.body,
            updatedAt: new Date(),
            updatedBy: "1"
        }
        const users = await collectionConnect("users");
        let result = await users.updateOne(
            { _id: id },
            { $set: data }
        );
        if (result.modifiedCount == 0)
            return {
                result: false,
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
        const users = await collectionConnect("users");
        let result = await users.deleteOne({ _id: id })
        if (result.deletedCount == 0)
            return {
                result: false,
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
    const users = await collectionConnect("users");
    let result = users.find({}).toArray()
    return result;
}