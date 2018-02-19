#! /bin/bash

source /usr/share/nginx/www/mycron

HOUR=$(date "+%H")
MIN=$(date "+%M")


if [ $SH == $HOUR ] && [ $SM == $MIN ]; then
	/bin/bash /usr/share/nginx/www/on.sh
	echo "ON: $HOUR $MIN | $SH $SM" >> /home/pi/log
fi

if [ $EH == $HOUR ] && [ $EM == $MIN ]; then
	/bin/bash /usr/share/nginx/www/off.sh
	echo "OFF: $HOUR $MIN | $EH $EM" >> /home/pi/log
fi
