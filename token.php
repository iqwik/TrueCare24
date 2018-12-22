<?php
include('./twilio/vendor/autoload.php');
//include('./twilio/config.php');
//include('./twilio/randos.php');

use Twilio\Rest\Client;

$sid    = "AC011ccac4f8374f2775e802f421b0f0bf";
$token  = "d08ce283ddeb8b66532afec5a37acc2e";
$twilio = new Client($sid, $token);
$to = $_POST['to'];
$from = $_POST['from'];
if($to && $from){
    $participant = $twilio->conferences("EH89571c9a152faae81db125c560b7aa16")
        ->participants
        ->create($to, $from);

    echo $participant->callSid;
    /*
    try {
        $call = $twilio->account->calls->create(
            $to,   // to
            $from, // from
            array(
                "method" => "GET",
                "statusCallback" => "http://test.loc/call_to_client.php",
                "statusCallbackEvent" => array("initiated","answered"),
                //"statusCallbackEvent" => "completed",
                "statusCallbackMethod" => "POST",
                "url" => "http://demo.twilio.com/docs/voice.xml"
                //"url" => "http://test.loc/call_to_client.php"
                // conference SID EH89571c9a152faae81db125c560b7aa16
            )
        );
        echo $call;
    } catch (Exception $e) {
        //header('Content-Type: application/json');
        echo $e->getMessage();
    }
    */
}
/*
$twilio = new Client($sid, $token);
$call = $twilio->calls
    ->create("+79636626266", // to
        "+12242680276", // from
        array("url" => "http://demo.twilio.com/docs/voice.xml")
    );

/*
use Twilio\Jwt\ClientToken;

// choose a random username for the connecting user
//$identity = randomUsername();

$capability = new ClientToken($TWILIO_ACCOUNT_SID, $TWILIO_AUTH_TOKEN);
$capability->allowClientOutgoing($TWILIO_TWIML_APP_SID);
//$capability->allowClientIncoming($identity);
$token = $capability->generateToken();

// return serialized token and the user's randomly generated ID
header('Content-Type: application/json');
echo json_encode(array(
    //'identity' => $identity,
    'token' => $token,
));
