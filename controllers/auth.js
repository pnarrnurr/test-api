const { collectionConnect } = require('../config/database');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const hashSecretKey = "test";
const jwtSecretKet = "test";

exports.login = async (req, res, next) => {
    let { username, password } = req.body;
    if (req.body) {
        const users = await collectionConnect('users');
        let condition = username.length > 0 && password.length > 0;
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
        password = crypto.createHmac('sha256', hashSecretKey).update(password).digest('hex')

        let user = await users.findOne({ username: username, password: password });
        if (user) {
            let userInfo = {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            }
            user.token = await jwt.sign(userInfo, jwtSecretKet);

            let result = await users.updateOne(
                { _id: user._id },
                { $set: user }
            );

            if (result.modifiedCount == 0) {
                return {
                    result: null,
                    result_message: {
                        type: 'error',
                        title: 'Error',
                        message: 'Bir hata oluştu!'
                    }
                }
            }
            return {
                result: {
                    token: user.token,
                    ...userInfo
                },
                result_message: {
                    type: 'success',
                    title: 'Info',
                    message: 'Giriş Yapıldı.'
                }
            };
        }
        return {
            result: null,
            result_message: {
                type: 'error',
                title: 'Error',
                message: 'Kullanıcı adı veya şifre yanlış!'
            }
        }
    }
}

exports.logout = async (req, res, next) => {
    if (req.user) {
        const users = await collectionConnect('users');
        let result = await users.updateOne(
            { _id: req.user.id },
            {
                $set: {
                    token: ''
                }
            }
        );
        if (result.matchedCount == 0) {
            return {
                result: null,
                result_message: {
                    type: 'error',
                    title: 'Error',
                    message: 'Bir hata oluştu!!!'
                }
            };
        }

        return {
            result: true,
            result_message: {
                type: 'success',
                title: 'Info',
                message: 'Çıkış Yapıldı.'
            }
        };
    }
}

exports.authorization = async (req, res, next) => {
    let token = null;
    let user = null;
    if (token == null && req.headers['authorization']) {
        token = req.headers['authorization'].replace('bearer ', '').replace('Bearer ', '');
    }
    if (token == null && req.headers['Authorization']) {
        token = req.headers['Authorization'].replace('bearer ', '').replace('Bearer ', '');
    }

    if (token) {
        const users = await collectionConnect('users');
        user = jwt.verify(token, jwtSecretKet);
        let userControl = await users.findOne({ _id: user.id });
        if (userControl) {
            user.token = userControl.token
        }
        req.user = user;
    }
    if (!token || user == null || user.id == null || user.token.length == 0) {
        return res.code(401).send({
            result: false,
            result_message: {
                type: "token_expire",
                title: "Error",
                message: "Yetkisiz İşlem"
            }
        })
    }
    return next();
}