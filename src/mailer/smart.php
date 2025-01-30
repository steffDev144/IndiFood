<?php 

if(
	!empty($_POST['name']) && 
	!empty($_POST['phone']) && 
	!empty($_POST['email']) && 
	!empty($_POST['city']) 

	) {
	$name = $_POST['name'];
	$number = $_POST['phone'];
	$email = $_POST['email'];
	$userText = $_POST['text'];
	$userCity = $_POST['city'];
	require_once('phpmailer/PHPMailerAutoload.php');
	$mail = new PHPMailer;
	$mail->CharSet = 'utf-8';

	// $mail->SMTPDebug = 3;                               // Enable verbose debug output

	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'itswift@yandex.ru';                 // Наш логин
	$mail->Password = 'moitggnwjnnccexj';                           // Наш пароль от ящика
	$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 465;                                    // TCP port to connect to
	
	$mail->setFrom('itswift@yandex.ru', 'Nikita Cevich Site:');   // От кого письмо
	$mail->addAddress('nikcevichoff@gmail.com');     // Add a recipient Кому письмо
	//$mail->addAddress('ellen@example.com');               // Name is optional
	//$mail->addReplyTo('info@example.com', 'Information');
	//$mail->addCC('cc@example.com');
	//$mail->addBCC('bcc@example.com');
	//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
	//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
	$mail->isHTML(true);                                    // Set email format to HTML
	$mail->AddAttachment( $file_to_attach , $filename );

	
	$mail->Subject = 'Индифуд, форма вакансии';
	$mail->Body    = '
			Данные пользователя<br> 
			Имя: ' . $name . ' <br>
			Номер телефона: ' . $number . '<br>
			Почта: ' . $email . ' <br>
			Текстовое сообщение: ' . $userText . '<br>
			Город: ' . $userCity . '<br>';
	

	if(!$mail->send()) {
		return false;
	} else {
		return true;
	}
}

else {
	echo "<p style='color: red'>Ошибка отправки заявки!</p>";
}