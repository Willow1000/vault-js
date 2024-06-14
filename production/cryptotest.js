
const lock = (message)=>{
    const {createCipheriv,randomBytes} = require("crypto")
    const fs = require("fs")
    const key = randomBytes(32)
    const iv = randomBytes(16)
    const keyDat = {key:key,iv:iv}
    const cipher = createCipheriv("aes256",key,iv)
    message = JSON.stringify(message)
    const encryptedMessage = JSON.stringify(cipher.update(message,'utf-8','hex') + cipher.final('hex'))
    const keyData = JSON.stringify(keyDat)
    fs.writeFileSync("./VAULT/key.json",keyData)
    fs.writeFileSync("./VAULT/password.json",encryptedMessage)
}

const unlock = (encryptedMessage)=>{
    encryptedMessage = JSON.parse(encryptedMessage)
    const {createDecipheriv} = require("crypto")
    const fs = require("fs")
    const data = JSON.parse(fs.readFileSync("./VAULT/key.json"))
    const[key,iv] = [Buffer.from(data.key),Buffer.from(data.iv)]
    const decipher = createDecipheriv('aes256',key,iv)

    const decryptedMessage = decipher.update(encryptedMessage,'hex','utf-8') + decipher.final('utf8')
  
    return JSON.parse(decryptedMessage)
}

module.exports = {lock,unlock}
