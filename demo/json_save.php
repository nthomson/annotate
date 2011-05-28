<?php

include('/db_connect.php');

$json = json_decode($_POST['data']);
$source_id = $_POST['source_id'];

mysql_select_db("annotate") or die(mysql_error());

//Delete all annotations
$sql = "DELETE from annotations WHERE source_id = $source_id;";
echo 'deleted';
mysql_query($sql);

//Insert the annotations we've saved
foreach($json as $annotation) {
	$x = $annotation->x;
	$y = $annotation->y;
	$text = $annotation->text;
	$sql = "INSERT into annotations (x, y, text, source_id) VALUES($x, $y, '$text', $source_id);";
	mysql_query($sql);
}

?>
