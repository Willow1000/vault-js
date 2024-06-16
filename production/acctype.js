const accountType = ()=>{
    const myInput = require("prompt-sync")()
    const choices = ['email','account']
    let choice = myInput("email || account: ".toUpperCase()).toLowerCase()
    while(choices.indexOf(choice)===-1){
        console.log("invalid choice, kindly select the provided alternatives")
        choice = myInput("email || account: ".toUpperCase()).toLowerCase()
    }
    if(choice==='email'){
        const emailAddress = myInput("enter the email address: ".toUpperCase())
        return {emailAddress: emailAddress}
    }else{
        const account = myInput("enter name of the account: ".toUpperCase())
        const username = myInput("enter your username: ".toUpperCase())

        return {username:username,account:account}
    }
}

exports.accountType = accountType
