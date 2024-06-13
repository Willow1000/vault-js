const passwdgenerator = (length)=>{
    const upperletters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerletters = upperletters.toLowerCase()
    const symbols = '#@$%^&*!~?:()'
    const numbers = '0123456789'

    const sample = lowerletters+upperletters+numbers+symbols
    let password = ''
    for(let i=0;i<=length;i++){
        password+=sample[Math.floor(Math.random()* sample.length)]
    }
    return password
}

exports.passwdgenerator = passwdgenerator