#! /bin/bash

gpio -g mode 18 pwm

gpio pwm-ms
gpio pwmc 192
gpio pwmr 2000

/usr/local/bin/gpio -g pwm 18 180
sleep 0.5
/usr/local/bin/gpio -g pwm 18 150
