const settingpwd = (password, confPassword) => {
    const myInput = require("prompt-sync")()
    let count = 3;
    while ((confPassword !== password) && (count > 0)) {
        count--;
        console.log(`Password mismatch ${count} more trials remaining`);
        confPassword = myInput("Confirm Your Password: ".toUpperCase()).toLowerCase();

        if (count === 0) {
            console.log("Maximum number of attempts reached please try again later");
            break;
        }
    }
};
exports.settingpwd = settingpwd;


