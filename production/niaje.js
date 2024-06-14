let fs = require("fs")
const {newUser} = require("./newuser.js")


const {authenticate} = require("./authenticate.js")
const {Act} = require('./act.js')
// const {lock} = require("..cryptotest.js/")

const Vault = async () =>{
    if(!fs.existsSync("./VAULT")){
      newUser()
      Act()
      

    }else if(authenticate()){
        
        Act()
        
    }
  }

  Vault()





















