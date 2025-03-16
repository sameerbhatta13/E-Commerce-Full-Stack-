require('dotenv').config()
const crypto = require('crypto')

let algorithm = 'aes-256-cbc'
let secret_key = Buffer.from(process.env.Secret_Key, 'hex')

const encryptPassword = (password) => {
    const iv = crypto.randomBytes(16)
    const ciper = crypto.createCipheriv(algorithm, secret_key, iv)
    let encrypted = ciper.update(password, 'utf-8', 'hex')
    encrypted += ciper.final('hex')
    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted
    }
}

const decryptPassword = (encryptedData, iv) => {
    const decipher = crypto.createDecipheriv(algorithm, secret_key, Buffer.from(iv, 'hex'))
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8')
    decrypted += decipher.final('utf-8')

    return decrypted
}

module.exports = { encryptPassword, decryptPassword }