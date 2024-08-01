const authenticate = ()=>{
    let fs = require("fs")
    const { securityQuiz } = require("./securityQuiz.js")
    const { unlock, lock } = require("./cryptotest.js")
    const exit = ()=>{
        console.log("The vault has been locked!".toUpperCase())
        setTimeout(()=>{
            console.clear()
        },2000)
    }
    const myInput = require("prompt-sync")()
    const encryptedMessage = fs.readFileSync("./VAULT/password.json")
    let vaultData;
    if(typeof(JSON.parse(fs.readFileSync("./VAULT/password.json")))==='string'){
        vaultData = unlock(encryptedMessage)
    }else{
        vaultData = JSON.parse(encryptedMessage)
    }
   
    let count = 3
    const authenticPwd = vaultData[0].passwd
    let password = myInput.hide("enter your vault password: ".toUpperCase())

    while(password != authenticPwd){
        
        console.log(`the password you've enetred is incorrect ${count} more attempt(s) remaining`.toUpperCase())
        password = myInput.hide("enter your vault password: ".toUpperCase()).toLowerCase()
        count--

        if(count===0){
            console.log("maximum number of attempts reached!".toUpperCase())
            console.log("answer the following emergency questions to reset your vault password".toUpperCase())
            const {color,nickname,city} = securityQuiz()
            if(city===vaultData[0].city && nickname===vaultData[0].nickname && color === vaultData[0].color){
                 const newPwd = myInput.hide("enter your new vault password: ".toUpperCase()).toLowerCase()
                 let confNewPwd = myInput.hide("confirm your new vault password: ".toUpperCase()).toLowerCase()
                 let count = 3;
                 while ((confNewPwd !== newPwd)) {
                     
                     console.log(`Password mismatch ${count} more trial(s) remaining`);
                     confNewPwd = myInput.hide("Confirm Your Password: ".toUpperCase()).toLowerCase();
                     count--;
             
                     if (count === 0) {
                         console.log("Maximum number of attempts reached please try again later");
                         exit()
                         return false
                     }
                 }
                 if(confNewPwd === newPwd){
                    vaultData[0].passwd = newPwd
                    console.log(`Password successfully reset your new vault password is ${newPwd}`)
                    const encryptedMessage = fs.readFileSync("./VAULT/password.json")
                    vaultData = fs.existsSync("./VAULT/key")?unlock(encryptedMessage):JSON.parse(encryptedMessage)
                    console.log(`Hello ${vaultData[0].name} welcome to your vault`)
                    lock(vaultData)
                    
                    return true
                    
                 }
            }else{
                console.log("invalid credentials!".toUpperCase())
                exit()
                return false
            }

        }

    }
    console.log(`Hello ${vaultData[0].name} welcome to your vault`)
    return true
}


exports.authenticate = authenticate



