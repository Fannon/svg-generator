<?php

/* Generated File Export Helper
** http://tutorialzine.com/2011/05/generating-files-javascript-php/ */

if(empty($_POST['filename']) || empty($_POST['content'])){
    echo 'test';
    exit;
}

$filename = preg_replace('/[^a-z0-9\-\_\.]/i','',$_POST['filename']);


header("Cache-Control: public");
header("Content-Description: File Transfer");
header("Content-type: application/octet-stream");
header('Content-Disposition: attachment; filename="'.$filename.'"');

echo $_POST['content'];

?>
