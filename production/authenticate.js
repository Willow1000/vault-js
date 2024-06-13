const authenticate = ()=>{
    let fs = require("fs")
    const myInput = require("prompt-sync")()
    let vaultData = fs.existsSync("./VAULT/password.json")?JSON.parse(fs.readFileSync("./VAULT/password.json")):[]
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

exports.authenticate = authenticate

