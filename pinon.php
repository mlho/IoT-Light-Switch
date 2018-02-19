<?php
	$File = "/home/pi/log";
	$Handle = fopen($File, 'a');
	$Data = "PON: " . date("h:i:sa") . "\n";
	fwrite($Handle, $Data);
	fclose($Handle);

	system("./on.sh");
?>

