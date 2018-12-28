<?php
require_once './twilio/vendor/autoload.php';
require_once './twilio/config.php';

use Twilio\Rest\Client;
$client = new Client($sid, $token);

$to = $_POST['to'];
$from = $_POST['from'];
//if($to && $from){
try {
    $call = $client->account->calls->create(
        $to,
        $from,
        array("url" => "https://care24.iqwik.ru/call_to_client.xml")
    );
    echo "Started call: " . $call->sid;
    print_r($call);
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}
//}