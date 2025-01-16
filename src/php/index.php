<?php

$data = json_decode(file_get_contents("php://input"), true);


if (!empty($data)) {
    $size = $data['size'];
    $price = $data['price'];

    
    $textMessage = "Новый заказ:\nРазмер холста: $size\nЦена: $price";

    $token = "7512450721:AAFhXsEN_MMkHrWaIimLFdd4yOgDln2u9nM";
    $chat_id = "1137697786";

    
    $textMessage = urlencode($textMessage);

    $urlQuery = "https://api.telegram.org/bot" . $token . "/sendMessage?chat_id=" . $chat_id . "&text=" . $textMessage;

    $result = file_get_contents($urlQuery);

    echo $result;
} else {
    echo "Данные не получены";
}
?>
