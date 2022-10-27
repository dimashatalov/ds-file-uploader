<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS, post, get');
header("Access-Control-Max-Age", "3600");
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header("Access-Control-Allow-Credentials", "true");


include_once("src/DSFileUploader/DSFileUploader.php");

use DSFileUploader\DSFileUploader;

$fileUploader = new DSFileUploader([
    "path" => "uploads"
]);

// Filter incoming post as you like
$post = $fileUploader->listenForIncomingPost();
// If file is OK just use autosave.
// you can modify $post here


$fileUploader->saveFile($post);

$postFile = $fileUploader->get("postFile"); // get latest postFile array to store it in your database or do nothing

$fileUploader->response(); // show and exit 
//$response = $fileUploader->response(true); // return into variable


?>