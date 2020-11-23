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
    basic.showNumber(value)
})
let pitch = 0
let absPitch = 0
let absRoll = 0
let leftSpeed = 0
let rightSpeed = 0
radio.setGroup(256)
basic.forever(function () {
    absRoll = input.rotation(Rotation.Roll)
    absRoll = (absRoll + 180)
    absRoll = Math.round(absRoll / 3.6)

    absPitch = input.rotation(Rotation.Pitch)
    absPitch = absPitch + 180
    absPitch = Math.round(absPitch / 3.6)
    pitch = absRoll
    if (pitch >= 0) {
        radio.sendValue("FL", pitch)
        radio.sendValue("FR", pitch)
    } else {
        radio.sendValue("BL", pitch)
        radio.sendValue("BR", pitch)
        basic.showNumber(pitch)
        basic.pause(1000)
    }
})
