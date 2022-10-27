<?php 

namespace DSFileUploader;

use Exception;

class DSFileUploader {

    function __construct($settings = false) {
        $this->args = [];

        if ($settings !== false) {
            foreach ($settings as $k=>$v) {
                
                $this->set($k, $v);
            }
        }

        if (empty($settings["path"])) {
            throw new Exception('settings["path"] can not be empty, it is folder to manage files');
        }
    }


    function listenForIncomingPost() {
        $postBody = file_get_contents('php://input');

        if (!empty($postBody)) {
            $postBody = json_decode($postBody,1);
        }

        if (empty($postBody["ds_file_uploader"])) {
            return false;
        }
        
        $this->set("post", $postBody);
        return $postBody;
    }


    function saveFile($post) {
        if (!file_exists($this->get("path"))) {
            throw new Exception($this->get("path") . " does not exists, I am not allowed to create such folder, create manually and do not forget to set 777 or another rules to allowe writes");
        }
        
        $this->set("post", $post);

        $fileFolder = $this->getFileFolder($post);

        if (!file_exists($fileFolder)) {
            mkdir($fileFolder);
        }

        $files = scandir($fileFolder);
        $postFile = $post["file"];
        $postFile = $this->renameIfBusy($files, $postFile);

        if (!empty($postFile["newName"])) {
            $filePath = $fileFolder .'/'.$postFile["newName"];
        }
        else 
            $filePath = $fileFolder .'/'.$postFile["name"];
        
        
        $this->writeBase64ToFile($filePath, $postFile);


    }

    function saveDB($sqlTable) {

    }

    function writeBase64ToFile($filePath, $postFile) {
        if (empty($postFile["base64"])) {
            throw new Exception("Where is base64? I do not see...");
        }

        $parts   = explode(";base64,", $postFile["base64"]);
        $decoded  = base64_decode($parts[1]);
        file_put_contents($filePath, $decoded);

        $postFile["filePath"] = $filePath;

        $this->set("postFile", $postFile);
        
    }

    function renameIfBusy($files, $postFile) {
        for ($i = 1; $i < 1000; $i++ ) {
            
            $fit = true;

            foreach ($files as $file) {

                if ($i == 1) {
                    if ($file == $postFile["name"] ){
                        $fit = false;
                        break;
                    }
                }
                else {
                    $ex = explode(".", $postFile["name"]);
                    $extension = ".".$ex[count($ex)-1];
                    $postFile["newName"] = rtrim($postFile["name"],$extension)."_(".$i.")".$extension;

                    if ($file == $postFile["newName"] ){
                        $fit = false;
                        break;
                    }
                        
                }

            }

            if ($fit == true) {
                return $postFile;
            }
        }

    }

    function response($return = false) {
        $out = ["status" => "success"];

        if ($return === true)
            return $out;


        $out = json_encode($out);
        echo $out;
        exit();        
    }

    function getFileFolder($post) {
        
        if (!empty($post["folder"])) 
            $fileFolder = $this->get("path") . "/" . $post["folder"];
        else 
            $fileFolder = $this->get("path");

        return $fileFolder;
    }


    public function set($k, $v) {
        $this->args[$k] = $v;
    }

    public function get($k) {
        if (!isset($this->args[$k]))
            return false;
        else 
            return $this->args[$k];
    }
}

?>