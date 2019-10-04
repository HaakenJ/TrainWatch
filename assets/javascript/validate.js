function stringValidation(str) {
    let alpha = /^[A-Z -]+$/i;
    return alpha.test(str) && str.length < 30;
}

function timeValidation(str) {
    let reg = /^[0-9:]+$/,
        hour = str.slice(0, 2),
        min = str.slice(3);
    console.log(hour);
    console.log(min)
    return reg.test(str) && str.length == 5 && parseInt(hour) < 24 && parseInt(min) < 60;
}

function freqValidation(str) {
    if (parseInt(str) && str >= 1 && str <= 60) {
        return true;
    } else {
        return false;
    }
}