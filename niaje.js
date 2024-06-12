// const fsPromises = require("fs").promises
// const fs = require("fs")
// const event = require("events")
// const {v4:uuid} = require("uuid")
// const {format} = require("date-fns")


// const myEmmitter = new event()
// myEmmitter.on("niaje",(message)=>{
//     const Time = format(new Date(),"yyyy/mm/dd\thh:MM:ss")
//     const logData = `${Time} ${message} \n`

//     if(!fs.existsSync("./logs")){
//         fsPromises.mkdir("./logs")
//     }
//     fs.promises.appendFile("./logs/randomlogs",logData)
// })



// // myEmmitter.emit("niaje","a message")

// // for(let i=0;i<=500;i++){
// //     fs.writeFileSync("./logs/largetext.txt",`hello world ${i}\n`,{flag:"a"})
// // }

// // const stream = fs.createReadStream('./logs/largetext.txt','utf8')

// // stream.on("data",(data)=>{
// //     console.log(data);
// // })



// // const firstPromise = new Promise((res,rej)=>{
// //     let status = 1
// //     if(status){
// //         res("It works")
// //     }
// //     rej("rejected")
// // })

// // firstPromise.then((data)=>{
// //     console.log(data+1)
// // }).catch((err)=>{
// //     console.error(err.name)
// // })







const myInput = require("prompt-sync")()
exports.myInput = myInput
const crypt = require("bcrypt")
const fs = require("fs")
const fsPromises = require("fs/promises")
const path = require("path")
const { settingpwd } = require("./settingpwd")
let vaultData = fs.existsSync("./VAULT/password.json")?JSON.parse(fs.readFileSync("./VAULT/password.json")):[]

const Vault = async () =>{
    if(!fs.existsSync("./VAULT")){
      newUser()
      Act()
    }else if(authenticate()){
        
        Act()
    }
  }

  const newUser = ()=>{
    const name = myInput("Enter your name: ".toUpperCase()).toLowerCase()
    const password = myInput("Set Your Vault password: ".toUpperCase()).toLowerCase()
    let confPassword = myInput("Confirm Your Password: ".toUpperCase()).toLowerCase()
    let count = 3
    while ((confPassword !== password) && (count > 0)) {
        count--;
        console.log(`Password mismatch ${count} more trials remaining`);
        confPassword = myInput("Confirm Your Password: ".toUpperCase()).toLowerCase();

        if (count === 0) {
            console.log("Maximum number of attempts reached please try again later");
            break;
        }
    }
    if(password === confPassword){
        console.log("Answer the following emergency questions to finish")
        const city = myInput("in which city were you born? ".toUpperCase()).toLowerCase()
        const nickname = myInput("what was your childhood nickname? ".toUpperCase()).toLowerCase()
        const color = myInput("what is your favourite color? ".toUpperCase()).toLowerCase()
        fsPromises.mkdir("./VAULT")
        fs.writeFileSync("./VAULT/password.json",JSON.stringify([{name: name,passwd:password,city:city,nickname:nickname,color:color}]))
    }

    
}

const authenticate = ()=>{
    let count = 3
    const authenticPwd = vaultData[0].passwd
    let password = myInput("enter your vault password: ".toUpperCase()).toLowerCase()

    while(password != authenticPwd){
        
        console.log(`the password you've enetred is incorrect ${count} more attempt(s) remaining`.toUpperCase())
        password = myInput("enter your vault password: ".toUpperCase()).toLowerCase()
        count--

        if(count===0){
            console.log("maximum number of attempts reached!".toUpperCase())
            console.log("answer the following emergency questions to reset your vault password".toUpperCase())
            const cityperp = myInput("in which city were you born? ".toUpperCase()).toLowerCase()
            const nicknameperp = myInput("what was your childhood nickname? ".toUpperCase()).toLowerCase()
            const colorperp = myInput("what is your favourite color? ".toUpperCase()).toLowerCase()
            if(cityperp===vaultData[0].city && nicknameperp===vaultData[0].nickname && colorperp === vaultData[0].color){
                 const newPwd = myInput("enter your new vault password: ".toUpperCase()).toLowerCase()
                 let confNewPwd = myInput("confirm your new vault password: ".toUpperCase()).toLowerCase()
                 let count = 3;
                 while ((confNewPwd !== newPwd)) {
                     
                     console.log(`Password mismatch ${count} more trial(s) remaining`);
                     confNewPwd = myInput("Confirm Your Password: ".toUpperCase()).toLowerCase();
                     count--;
             
                     if (count === 0) {
                         console.log("Maximum number of attempts reached please try again later");
                         console.log("The vault has been locked".toUpperCase())
                         setTimeout(()=>{

                         },3000)
                         return false
                     }
                 }
                 if(confNewPwd === newPwd){
                    vaultData[0].passwd = newPwd
                    console.log(`password successfully reset your new vault password id ${newPwd}`)
                    let vaultDat = JSON.stringify(vaultData)
                    fs.writeFileSync("./VAULT/password.json",vaultDat)
                    return true
                    
                 }
            }else{
                console.log("invalid credentials!".toUpperCase())
                console.log("The vault has been locked!".toUpperCase())
                setTimeout(()=>{

                },3000)
                return false
            }

        }

    }
    return true
}

const upperletters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerletters = upperletters.toLowerCase()
const symbols = '#@$%^&*!~?:()'
const numbers = '0123456789'

const sample = lowerletters+upperletters+numbers+symbols

const passwdgenerator = (length)=>{
    let password = ''
    for(let i=0;i<=length;i++){
        password+=sample[Math.floor(Math.random()* sample.length)]
    }
    return password
}

const accountType = ()=>{
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

const Act = ()=>{
    
    const choicealts=['create','quit','retrieve']
    let choice = myInput("would you like to create?|| retrieve?|| quit: ".toUpperCase()).toLowerCase()
    while(choicealts.indexOf(choice)===-1){
        console.log("invalid choice, kindly select the provided alternatives")
        choice = myInput("would you like to create?|| retrieve?|| quit: ".toUpperCase()).toLowerCase()
    }
    
    if(choice==='create'){
        let alreadyExists = false
        let account = accountType()
        const choice1alts = ['generate','have']
        let choice1 = myInput("would you like me to 'generate' one || you 'have' one in mind: ".toUpperCase()).toLowerCase()
        while(choice1alts.indexOf(choice1)===-1){
            console.log("invalid choice, kindly select the provided alternatives")
            choice1 = myInput("would you like me to 'generate' one || you 'have' one in mind: ".toUpperCase()).toLowerCase()
        }
        if(choice1 == 'generate'){
            const password = passwdgenerator(16)
            account.password=password
            console.log(`Your password is ${password}`)
        }else{
            const password = myInput("enter your password: ".toUpperCase()).toLowerCase()
            let confPassword  = myInput("confirm your password: ".toUpperCase()).toLowerCase()
            settingpwd(password,confPassword)
            account.password=password
            
            console.log(`Your password is ${password}`)
        }
        

        if(account.account){
            let accountset = vaultData.filter(x=>x.account)
            let accountset1 = accountset.map((x)=>{
                return x.account
            })
            let username = accountset.map((x)=>{
                return x.username
            })
            if(accountset1.includes(account.account) && username.includes(account.username) && username.indexOf(account.username)===accountset1.indexOf(account.account)){
                alreadyExists = true
                let passwd = accountset.find(x=>x.account===account.account).password
                console.log(`The account already has a password: ${passwd}`);
                let choice = myInput("would you like to update y || n? ".toUpperCase()).toLowerCase()
                if(choice==='y'){
                    console.log(`your new password is ${account.password}`)
                }else{
                    account.password = passwd
                }
                let index = vaultData.findIndex(x=>x.account===account.account && x.username===account.username)
                vaultData.splice(index,1)
            }
        }else if(account.emailAddress){
            let mailset = vaultData.filter(x=>x.emailAddress)
            let mailset1 = mailset.map((x)=>{
                return x.emailAddress
            })
            if(mailset1.includes(account.emailAddress)){
                alreadyExists = true
                let passwd = mailset.find(x=>x.emailAddress === account.emailAddress).password
                console.log(`The account already has a password: ${passwd}`);
                let choice = myInput("would you like to update y || n? ".toUpperCase()).toLowerCase()
                if(choice==='y'){
                    console.log(`your new password is ${account.password}`)
                }else{
                    account.password = passwd
                }
                  
            }
            let index = vaultData.findIndex(x=>x.emailAddress===account.emailAddress)
            vaultData.splice(index,1)  
        }
        
        if(!alreadyExists){
            vaultData = JSON.parse(fs.readFileSync("./VAULT/password.json"))
        }
        vaultData.push(account)
        const vaultDat =JSON.stringify(vaultData)
        fs.writeFileSync('./VAULT/password.json',vaultDat)

    }else if(choice==="retrieve"){
        let acc = accountType()
        let accountStatus
        if(acc.username){
            if(vaultData.findIndex(x=>x.account===acc.account)===-1){
                accountStatus = false
            }else{
                accountStatus=true
            }
            let index = vaultData.findIndex(x=>x.account===acc.account && x.username===acc.username)
            if(index===-1 && accountStatus===true){
                console.log("the account you enetred has no such username".toUpperCase())
                
                return
            }else if(index===-1 && accountStatus === false){
                console.log("the account you entered does not exist".toUpperCase())
                return
            }else{
                let pwd = vaultData.find(x=>x.account=== acc.account && x.username=== acc.username).password
                console.log(`Your ${acc.account} password for ${acc.username} is ${pwd}`)
                return
            }
        }else if(acc.emailAddress){
            if(vaultData.find(x=>x.emailAddress===acc.emailAddress)){
                let passwd = vaultData.find(x=>x.emailAddress===acc.emailAddress).password
                console.log(`The password for ${acc.emailAddress} is ${passwd}`)
                return
            }else{
                console.log("the emai address you've entered does not exist".toUpperCase())
                return
            }

        }
        
    }else{
        console.log("your vault has been locked".toUpperCase())
        setTimeout(()=>{
            
        },3000)
        
        return
    }
}


Vault()

