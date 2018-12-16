<?php
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function () {
    return View::make('home');
});

// POST URL to handle form submission and make outbound call
Route::post('call.php', function () {
    // Get form input

    $userPhone = '+17278091539';
    $encodedSalesPhone = urlencode(str_replace(' ','','+12242680276'));
    //$userPhone = Input::get('userPhone');
    //$encodedSalesPhone = urlencode(str_replace(' ','',Input::get('salesPhone')));
    // Set URL for outbound call - this should be your public server URL
    $host = parse_url(Request::url(), PHP_URL_HOST);

    // Create authenticated REST client using account credentials in
    // <project root dir>/.env.php
    $client = new Twilio\Rest\Client(
        getenv('AC011ccac4f8374f2775e802f421b0f0bf'),
        getenv('d08ce283ddeb8b66532afec5a37acc2e')
    );

    try {
        $client->calls->create(
            $userPhone, // The visitor's phone number
            getenv('+12242680276'), // A Twilio number in your account
            array(
                "url" => "http://$host/outbound/$encodedSalesPhone"
            )
        );
    } catch (Exception $e) {
        // Failed calls will throw
        return $e;
    }

    // return a JSON response
    return array('message' => 'Call incoming!');
});

// POST URL to handle form submission and make outbound call
Route::post('/outbound/{salesPhone}', function ($salesPhone) {
    // A message for Twilio's TTS engine to repeat
    $sayMessage = 'Thanks for contacting our sales department. Our
        next available representative will take your call.';

    $twiml = new Twilio\Twiml();
    $twiml->say($sayMessage, array('voice' => 'alice'));
    $twiml->dial($salesPhone);

    $response = Response::make($twiml, 200);
    $response->header('Content-Type', 'text/xml');
    return $response;
});