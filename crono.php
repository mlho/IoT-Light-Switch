<?php 
	system("> mycron");

	system("echo SH=". $_POST['startHour'] . " >> mycron"); 

	system("echo SM=". $_POST['startMin'] . " >> mycron");

	system("echo EH=". $_POST['endHour'] . " >> mycron");

	system("echo EM=". $_POST['endMin'] . " >> mycron");

	exit();
?>

