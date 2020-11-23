input.onButtonPressed(Button.A, function () {
    enabled = 1
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("0;0")
    enabled = 0
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
})
input.onButtonPressed(Button.B, function () {
    enabled = 1
    radio.sendString("100;100")
})
let oldRoll = 0
let oldPitch = 0
let absPitch = 0
let absRoll = 0
let enabled = 0
let rightSpeed = 0
let leftSpeed = 0
let pitch = 0
enabled = 1
radio.setGroup(256)
basic.forever(function () {
    absRoll = input.rotation(Rotation.Roll)
    absPitch = input.rotation(Rotation.Pitch)
    if (enabled == 1 && (oldPitch != absPitch || oldRoll != absRoll)) {
        oldPitch = absPitch
        oldRoll = absRoll
        leftSpeed = absPitch - Math.round(absRoll / 2)
        if (leftSpeed > 100) {
            leftSpeed = 100
        }
        rightSpeed = absPitch + Math.round(absRoll / 2)
        if (rightSpeed > 100) {
            rightSpeed = 100
        }
        radio.sendString("" + leftSpeed.toString() + ";" + rightSpeed.toString())
        basic.pause(50)
    }
})
