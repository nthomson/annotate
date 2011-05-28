<?php

$json = array();

$source_id = $_GET['source_id'];

// Make a MySQL Connection
include('/db_connect.php');
mysql_select_db("annotate") or die(mysql_error());

$sql = "SELECT * FROM annotations WHERE source_id = $source_id";

$result = mysql_query($sql);

// Retrieve all the data from the "example" table
while ( $row = mysql_fetch_assoc($result) ) {
	array_push($json, $row);
}

echo json_encode($json);

?>
