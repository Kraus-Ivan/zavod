radio.setGroup(1)
RunComp.SetLightLevel()
let start = 0
let stav = 0
let vysledek = 0
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    if (stav == 0) {
        stav = 1
    } else {
        stav = 0
    }
    
    basic.showNumber(stav)
    pause(250)
    basic.clearScreen()
})
basic.forever(function on_forever() {
    
    if (stav == 0) {
        RunComp.OnLightDrop(function on_light_drop() {
            let start = control.millis()
            radio.sendNumber(start)
        })
    } else {
        RunComp.OnLightDrop(function on_light_drop2() {
            let konec = control.millis()
            radio.onReceivedNumber(function on_received_number(receivedNumber: number) {
                let vysledek = konec - receivedNumber
                basic.showNumber(vysledek)
                console.log(vysledek)
            })
        })
    }
    
})
