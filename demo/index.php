<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Annotate</title>
    <link rel="stylesheet" type="text/css" href="style/style.css" />
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
    <script src="annotate.js"></script>
    <script src="demo.js"></script>
</head>
<body>
    <div id="controls">
        <ul>
            <li><a href="javascript:void(0)" class="add control">Add</a></li>
            <li><a href="javascript:void(0)" class="toggle control">Toggle All</a></li>
            <li><a href="javascript:void(0)" class="save control">Save</a></li>
        </ul>
        
    </div>
    <div id="share">
        <p>Generated JSON <a onclick="$('#share').hide();" href="javascript:void(0)">X</a></p>
        <input type="text" />
    </div>
    <div id="source_list">
        <p>Sources with annotations:</p>
        <ul>
        <?php
            include($_SERVER['DOCUMENT_ROOT'].'/db_connect.php');
            mysql_select_db("annotate") or die(mysql_error());
            $sql = "SELECT DISTINCT source_id FROM annotations ORDER BY source_id ASC";
            $result = mysql_query($sql);
            // Retrieve all the data from the "example" table
            while ( $row = mysql_fetch_assoc($result) ) {
                $source_id = $row['source_id'];
                echo "<li><a href='?source_id=$source_id'>Source $source_id</a></li>";
            }
            $source_id++;
            echo "<li><a href='?source_id=$source_id'>New</a></li>";
        ?>
        </ul>
    </div>
    <?php   if(isset($_GET['source_id'])) { ?>
        <div id="source">
            #Source
        </div>
    <?php   } ?>
</body>
</html>
