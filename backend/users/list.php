<?php

if(isset($_GET['count'])){
	echo 3;
}

if(isset($_GET['take'])){
	$result = array(
		array(
			'ID'=>3,
			'Account'=>'Daniel Popescu'
		),
		array(
			'ID'=>5,
			'Account'=>'Anca Geangala'
		),
		array(
			'ID'=>7,
			'Account'=>'Alex Dnk'
		)
	);
	echo json_encode($result);
}


	?>