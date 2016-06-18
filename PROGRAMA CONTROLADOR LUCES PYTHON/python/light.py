import RPi.GPIO as io
import time as t
import sys

#pin con el que voy a interactuar
pin= 03
#parametro que le paso por pantalla
parametro= str(sys.argv)
print('parametro pasado: ', parametro)

io.setmode(io.BCM)
io.setup(pi, io.OUT)
if(not parametro== ''):
    if(parametro == 'ON'):
        io.OUTPUT(pin, True)
        print('ON')
    else:
        if(parametro == 'OFF'):
            io.OUTPUT(pin, False)
            print('OFF')
else:
    print('ningun parametro pasado')
var finalizar= input('presione cualquier tecla para salir.')
