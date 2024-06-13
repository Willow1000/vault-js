const accountType = ()=>{
    
    const fs = require("fs")
    const myInput = require("prompt-sync")()
    let vaultData = fs.existsSync("./VAULT/password.json")?JSON.parse(fs.readFileSync("./VAULT/password.json")):[]
    const choices = ['email','account']
    let choice = myInput("email || account: ".toUpperCase()).toLowerCase()
    while(choices.indexOf(choice)===-1){
        console.log("invalid choice, kindly select the provided alternatives")
        choice = myInput("email || account: ".toUpperCase()).toLowerCase()
    }
    if(choice==='email'){
        const emailAddress = myInput("enter the email address: ".toUpperCase()).toLocaleLowerCase()
        return {emailAddress: emailAddress}
    }else{
        const account = myInput("enter name of the account: ".toUpperCase()).toLowerCase()
        const username = myInput("enter your username: ".toUpperCase()).toLowerCase()
        const accountPwd = vaultData.filter(x=>x.account)

        return {username:username,account:account}
    }
}

exports.accountType = accountType
