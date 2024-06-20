// const {scryptSync, randomBytes, timingSafeEqual} = require("crypto")

// const fs = require('fs')

// const passwd = fs.readFileSync("./VAULT/password.json")
// let salt = randomBytes(16).toString('hex')
// const hashedPasswd = scryptSync(passwd,salt,64).toString("hex")

// console.log(hashedPasswd)

// // const bcrypt = require("bcryptjs")

// function signup(mail,password){
//     const salt = randomBytes(16).toString("hex")
//     const hashedPsswd  = scryptSync(password,salt,64).toString("hex")

//     const user = { mail, password:`${salt}:${hashedPsswd}`}
// }

// function login(mail,password){
//     const user = users.find(x=>x.mail===mail)

//     const [salt,key] = user.password.split(":")
//     const hashedBuffer = scryptSync(passwd,salt,64).toString('hex')

//     const keyBuffer = Buffer.from(key, "hex")
//     const match = timingSafeEqual(hashedBuffer,keyBuffer)
// }

// const lock = ()=>{







// }

// const pass = {password:"niaje",acc:"account"}

// const [password,acc] = [pass.password,pass.acc]
// console.log(password)