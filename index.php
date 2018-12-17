<?php
        $production = true;
        if((!isset($_SERVER['HTTPS'])) && (!isset($_SERVER['HTTP_HTTPS'])) && ($_SERVER['HTTP_HTTPS'] != 'on') && ($production == false)){
            header('Location: ' . strtolower('https://' . $_SERVER['HTTP_HOST']), TRUE, 301);
        }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>TruCare24</title>
    <link rel="stylesheet" href="css/normalize.css" />
    <link rel="stylesheet" href="css/fonts.css" />
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/media.css" />
</head>
<body>
    <div class="aside __flex __flex-direction_column">
        <a href="#" class="main-logo">
            <img class="menu-links-img" src="img/TrueCare24_logo.png" alt="logo TrueCare24" width="34" height="29">
        </a>
        <ul class="menu-links-ul">
            <li class="menu-links-li">
                <a class="menu-links-a __flex __flex-direction_column __justify-content_center __align-items_center" href="#">
                    <img class="menu-links-img" src="img/Dashboard.png" alt="" width="28" height="15">
                    <span class="menu-links-span">Dashboard</span>
                </a>
            </li>
            <li class="menu-links-li">
                <a class="menu-links-a __flex __flex-direction_column __justify-content_center __align-items_center" href="#">
                    <img class="menu-links-img" src="img/FAQ.png" alt="" width="25" hight="25">
                    <span class="menu-links-span">FAQ</span>
                </a>
            </li>
            <li class="menu-links-li">
                <a class="menu-links-a __flex __flex-direction_column __justify-content_center __align-items_center" href="#">
                    <img class="menu-links-img" src="img/Sign%20out.png" alt="" width="20" height="20">
                    <span class="menu-links-span">Sign out</span>
                </a>
            </li>
        </ul>
    </div>
    <div class="main" id="main-block">
        <div class="header __flex __align-items_center __justify-content_space-between">
            <a href="#" class="burger">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </a>
            <div class="left-side __flex __align-items_center">
                <a href="#" class="back-link">
                    <img class="left-arrow-img" src="img/Back%201.png" alt="left arrow" width="13" height="13">
                    <span class="back-span">Back</span>
                </a>
                <form class="search __flex __align-items_center __justify-content_center" action="">
                    <input class="search-input" type="text" name="search" placeholder="Go to case ID#">
                    <button class="search-btn"><img src="img/Go.png" alt="go search button"></button>
                </form>
                <a href="#" class="fulfillments-kpi-a">
                    <img src="img/Fulfillment%20KPIs.png" alt="Fulfillment KPIs" width="16" height="13">
                    <span class="fulfillment-kpi-span">Fulfillment KPIs</span>
                </a>
            </div>
            <div class="right-side">
                <a href="#" class="login">
                    <span class="login-a">leo@truecare24.com</span>
                    <img class="dropdown-arrow-img" src="img/Dropdown.png" alt="dropdown arrow">
                </a>
            </div>
        </div>
        <div class="content">
            <h1 class="h1">Matched providers</h1>
            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>ID</th>
                            <th><span class="status-heading">Status</span></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="data-users"></tbody>
                </table>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="//media.twiliocdn.com/sdk/js/client/v1.3/twilio.min.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/table.js"></script>
    <script src="js/modal.js"></script>
    <script src="js/app.js"></script>
</body>
</html>