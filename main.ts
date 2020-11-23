input.onButtonPressed(Button.A, function () {
    radio.sendValue("FR", 50)
})
input.onButtonPressed(Button.AB, function () {
    radio.sendValue("FL", 0)
    radio.sendValue("FR", 0)
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue("FL", 50)
})
radio.onReceivedValue(function (name, value) {
    basic.showString(name +  ":" + value.toString())
})

let pitch = 0
let absPitch = 0
let absRoll = 0
let leftSpeed = 0
let rightSpeed = 0
let oldRoll = 0
let oldPitch = 0
radio.setGroup(256)
basic.forever(function () {
    absRoll = input.rotation(Rotation.Roll)
    absPitch = input.rotation(Rotation.Pitch)

    if (oldPitch != absPitch || oldRoll != absRoll)
    {
        oldPitch = absPitch 
        oldRoll = absRoll

        leftSpeed = absPitch - absRoll
        rightSpeed = absPitch + absRoll

        if (leftSpeed != 0){
            if (leftSpeed >= 0) {
                if (leftSpeed > 100){
                    leftSpeed = 100
                }
                radio.sendValue("FL", leftSpeed)
                basic.showString("FL:" + leftSpeed.toString())
            } else {
                if (leftSpeed < -100){
                    leftSpeed = -100
                }
                leftSpeed = leftSpeed * - 1
                radio.sendValue("BL", leftSpeed)
                basic.showString("BL:" + leftSpeed.toString())
            }
            if (rightSpeed >= 0) {
                if (rightSpeed > 100){
                    rightSpeed = 100
                }
                radio.sendValue("FR", rightSpeed)
                basic.showString("FR:" + rightSpeed.toString())
            } else {
                if (rightSpeed < -100){
                    rightSpeed = -100
                }
                rightSpeed = rightSpeed * - 1
                radio.sendValue("BR", rightSpeed)
                basic.showString("BR:" + rightSpeed.toString())
            }
            basic.pause(1000)
        }
    } 
})
