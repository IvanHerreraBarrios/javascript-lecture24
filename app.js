//67

var addBinary = function(a, b) {
    let result = ""
    let carry = "0"

    const maxLength = Math.max(a.length, b.length)

    if(a.length < maxLength) a = addLeadingZeros(a, maxLength)
    if(b.length < maxLength) b = addLeadingZeros(b, maxLength)

    for(let i=maxLength-1; i >= 0; i--){
        const b1 = a[i] || "0"
        const b2 = b[i] || "0"

        let r
        ({r, carry} = addBits(b1, b2, carry))
        result = r + result
    }

    if(carry === "1") result = "1" + result

    return result
};

function addLeadingZeros(str, length){
    const l = str.length
    for(let i=0; i < length - l; i++){
        str = "0" + str
    }
    return str
}

function addBits(b1, b2, carry){
    let nextCarry = "0"
    let r
    if (b1 === "0" && b2 === "0"){
        r = "0"
    } else if((b1 === "0" && b2 === "1") || (b1 === "1" && b2 === "0")){
        r = "1"
    } else { // a=1, b=1
        r = "0"
        nextCarry = "1"
    }

    if(carry === "1"){
        ({r, carry} = addBits(r, "1", "0"))
        nextCarry = carry === "1" ? "1" : nextCarry
    }

    return {r, carry:nextCarry}
}