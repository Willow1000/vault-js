const myInput = require('prompt-sync')()

const securityQuiz = ()=>{
    const city = myInput.hide("in which city were you born? ".toUpperCase())
    const nickname = myInput.hide("what was your childhood nickname? ".toUpperCase())
    const color = myInput.hide("what is your favourite color? ".toUpperCase())
    return {city:city,color:color,nickname:nickname}
}

module.exports = {securityQuiz}