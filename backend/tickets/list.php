<?php

if(isset($_GET['count'])){
	echo 3;
}

if(isset($_GET['take'])){
	$result = array(
		array(
			'ID'=>2,
			'User'=>'Daniel Popescu',
			'Status'=>'init',
			'ClassSystem'=>'Grup Facebook',
			'ClassName'=>'AngularJS Bucharest'
		),
		array(
			'ID'=>4,
			'User'=>'Daniel Popescu',
			'Status'=>'init',
			'ClassSystem'=>'Grup Facebook',
			'ClassName'=>'AngularJS Bucharest'
		),
		array(
			'ID'=>6,
			'User'=>'Daniel Popescu',
			'Status'=>'init',
			'ClassSystem'=>'Grup Facebook',
			'ClassName'=>'AngularJS Bucharest'
		),
	);
	echo json_encode($result);
}


	?>