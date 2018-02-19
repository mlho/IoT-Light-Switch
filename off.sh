#! /bin/bash

/usr/local/bin/gpio -g mode 18 pwm

/usr/local/bin/gpio pwm-ms
/usr/local/bin/gpio pwmc 192
/usr/local/bin/gpio pwmr 2000

/usr/local/bin/gpio -g pwm 18 115
sleep 0.5
/usr/local/bin/gpio -g pwm 18 150

