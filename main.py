radio.set_group(1)
RunComp.set_light_level()
start = 0
stav = 0
vysledek = 0

def on_button_pressed_a():
    global stav
    if stav == 0:
        stav = 1
    else:
        stav = 0
    basic.show_number(stav)
    pause(250)
    basic.clear_screen()
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_forever():
    global stav, start, vysledek
    if stav == 0:
        def on_light_drop():
            start = control.millis()
            radio.send_number(start)
        RunComp.on_light_drop(on_light_drop)
    else:
        def on_light_drop2():
            konec = control.millis()
            def on_received_number(receivedNumber):
                vysledek = konec - receivedNumber
                basic.show_number(vysledek)
                print(vysledek)
            radio.on_received_number(on_received_number)
        RunComp.on_light_drop(on_light_drop2)

basic.forever(on_forever)