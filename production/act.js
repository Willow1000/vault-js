const Act = ()=>{
    const { settingpwd } = require("./settingpwd.js")
    const {passwdgenerator} = require("./generatepwd.js")
    const myInput = require("prompt-sync")()
    const {unlock,lock} = require("./cryptotest.js")
    const fs = require("fs")
    const {accountType} = require("./acctype.js")
    let choice;
    
    while(choice!=='quit'){
        const encryptedMessage = fs.readFileSync("./VAULT/password.json")
        let vaultData;
        if(fs.existsSync("./VAULT/password.json") && typeof(JSON.parse(encryptedMessage))==="string"){
            vaultData = unlock(encryptedMessage)
        }else if(fs.existsSync("./VAULT/password.json") && typeof(JSON.parse(encryptedMessage))==='object'){
            vaultData = JSON.parse(encryptedMessage)
        }else{
            vaultData = []
        }
        
        const choicealts=['create','quit','retrieve']
        choice = myInput("would you like to create?|| retrieve?|| quit: ".toUpperCase()).toLowerCase()
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
                const password = myInput.hide("enter your password: ".toUpperCase())
                let confPassword  = myInput.hide("confirm your password: ".toUpperCase())
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
                if(accountset1.includes(account.account) && username.includes(account.username) && username[accountset1.indexOf(account.account)]===account.username){ 
                    alreadyExists = true
                    const choiceAlts = ['y','n']
                    let passwd = accountset.find(x=>x.account===account.account).password
                    console.log(`The account already has a password: ${passwd}`);
                    let choice = myInput("would you like to update y || n? ".toUpperCase()).toLowerCase()
                    while(choiceAlts.indexOf(choice)===-1){
                        console.log("invalid choice, kindly select the provided alternatives")
                        choice = myInput("would you like to update y || n? ".toUpperCase()).toLowerCase()
                    }
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
                    const choiceAlts = ['y','n']
                    let passwd = mailset.find(x=>x.emailAddress === account.emailAddress).password
                    console.log(`The account already has a password: ${passwd}`);
                    let choice = myInput("would you like to update y || n? ".toUpperCase()).toLowerCase()
                    while(choiceAlts.indexOf(choice)===-1){
                        console.log("invalid choice, kindly select the provided alternatives")
                        choice = myInput("would you like to update y || n? ".toUpperCase()).toLowerCase()
                    }
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
                
                vaultData = fs.existsSync("./VAULT/key.json")?unlock(encryptedMessage):JSON.parse(encryptedMessage)
                
                
            }
            vaultData.push(account)
            lock(vaultData)
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
                    
                    
                }else if(index===-1 && accountStatus === false){
                    console.log("the account you entered does not exist".toUpperCase())
                    const choiceAlts = ['y','n']
                    const choice = myInput("Would you like to create one? y || n: ".toUpperCase()).toLowerCase()
                    while(choiceAlts.indexOf(choice)===-1){
                        console.log("invalid choice, kindly select the provided alternatives");
                        choice = myInput("Would you like to create one? y || n: ".toUpperCase()).toLowerCase()
                    }
                    if (choice==='y'){
                        const choice1alts = ['generate','have']
                        let choice1 = myInput("would you like me to 'generate' one || you 'have' one in mind: ".toUpperCase()).toLowerCase()
                        while(choice1alts.indexOf(choice1)===-1){
                            console.log("invalid choice, kindly select the provided alternatives")
                            choice1 = myInput("would you like me to 'generate' one || you 'have' one in mind: ".toUpperCase()).toLowerCase()
                        }
                        if(choice1 == 'generate'){
                            const password = passwdgenerator(16)
                            acc.password=password
                            console.log(`Your password is ${password}`)
                        }else{
                            const password = myInput.hide("enter your password: ".toUpperCase())
                            let confPassword  = myInput.hide("confirm your password: ".toUpperCase())
                            settingpwd(password,confPassword)
                            acc.password=password
                            
                            console.log(`Your password is ${password}`)
                        }
                        vaultData.push(acc)
                        lock(vaultData)
                    }else{
                        continue
                    }
                    
                }else{
                    let pwd = vaultData.find(x=>x.account=== acc.account && x.username=== acc.username).password
                    console.log(`Your "${acc.account}" password for "${acc.username}" is ${pwd}`)
                    
                }
            }else if(acc.emailAddress){
                if(vaultData.find(x=>x.emailAddress===acc.emailAddress)){
                    let passwd = vaultData.find(x=>x.emailAddress===acc.emailAddress).password
                    console.log(`The password for "${acc.emailAddress}" is ${passwd}`)
                    
                }else{
                    console.log("the email address you've entered does not exist".toUpperCase())
                    const choiceAlts = ['y','n']
                    const choice = myInput("Would you like to create one? y || n: ".toUpperCase()).toLowerCase()
                    while(choiceAlts.indexOf(choice)===-1){
                        console.log("invalid choice, kindly select the provided alternatives");
                        choice = myInput("Would you like to create one? y || n: ".toUpperCase()).toLowerCase()
                    }
                    if (choice==='y'){
                        const choice1alts = ['generate','have']
                        let choice1 = myInput("would you like me to 'generate' one || you 'have' one in mind: ".toUpperCase()).toLowerCase()
                        while(choice1alts.indexOf(choice1)===-1){
                            console.log("invalid choice, kindly select the provided alternatives")
                            choice1 = myInput("would you like me to 'generate' one || you 'have' one in mind: ".toUpperCase()).toLowerCase()
                        }
                        if(choice1 == 'generate'){
                            const password = passwdgenerator(16)
                            acc.password=password
                            console.log(`Your password is ${password}`)
                        }else{
                            const password = myInput.hide("enter your password: ".toUpperCase())
                            let confPassword  = myInput.hide("confirm your password: ".toUpperCase())
                            settingpwd(password,confPassword)
                            acc.password=password
                            
                            console.log(`Your password is ${password}`)
                        }
                        vaultData.push(acc)
                        lock(vaultData)
                    }else{
                        continue
                    }
                    
                }
    
            }
            
        }
    }
    if(choice==='quit'){
        console.log("your vault has been locked".toUpperCase())
        setTimeout(()=>{
            console.clear()
        },1500)
        
        return
    }
}

exports.Act = Act




