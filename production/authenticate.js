const authenticate = ()=>{
    let fs = require("fs")
    const { unlock, lock } = require("./cryptotest.js")
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
                    console.log(`Password successfully reset your new vault password is ${newPwd}`)
                    const encryptedMessage = fs.readFileSync("./VAULT/password.json")
                    vaultData = fs.existsSync("./VAULT/key")?unlock(encryptedMessage):JSON.parse(encryptedMessage)

                    lock(vaultData)
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

exports.authenticate = authenticate



