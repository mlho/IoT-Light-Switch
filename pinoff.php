<?php
	$File = "/home/pi/log";
	$Handle = fopen($File, 'a');
	$Data = "POFF: " . date("h:i:sa") . "\n";
	fwrite($Handle, $Data);
	fclose($Handle);

	system("./off.sh");
?>

