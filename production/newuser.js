const newUser = ()=>{
    const fs = require("fs")
    const fsPromises = require("fs/promises")
    const myInput = require("prompt-sync")()
    const name = myInput("Enter your name: ".toUpperCase())
    const password = myInput("Set Your Vault password: ".toUpperCase())
    let confPassword = myInput("Confirm Your Password: ".toUpperCase())
    let count = 3
    while ((confPassword !== password) && (count > 0)) {
        count--;
        console.log(`Password mismatch ${count} more trials remaining`);
        confPassword = myInput("Confirm Your Password: ".toUpperCase())

        if (count === 0) {
            console.log("Maximum number of attempts reached please try again later");
            break;
        }
    }
    if(password === confPassword){
        console.log("Answer the following emergency questions to finish")
        const city = myInput("in which city were you born? ".toUpperCase())
        const nickname = myInput("what was your childhood nickname? ".toUpperCase())
        const color = myInput("what is your favourite color? ".toUpperCase())
        fsPromises.mkdir("./VAULT")
        fs.writeFileSync("./VAULT/password.json",JSON.stringify([{name: name,passwd:password,city:city,nickname:nickname,color:color}]))
        
    }

    

    
}

exports.newUser = newUser