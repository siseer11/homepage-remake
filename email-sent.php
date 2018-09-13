	    <?php
	error_reporting(0);
if((isset($_POST['email']))&&(isset($_POST['name'])&&$_POST['message']!="")){ 
  $to = 'shahzad.salamat@yahoo.com';
  $subject = 'feedback from globuzzer.com';
  $message = '
        <html>
            <head>
                <title>Users feedback from www.globuzzer.com</title>
            </head>
            <body>
                <p><b>Name:</b> '.$_POST['name'].'</p>
                <p><b>Email:</b> '.$_POST['email'].'</p>
				p><b>Subject:</b> '.$_POST['subject'].'</p>  
				p><b>Message:</b> '.$_POST['message'].'</p>                          
            </body>
        </html>'; 
  $headers  = "Content-type: text/html; charset=utf-8 \r\n";
  $email_from = $_POST['email']; 
mail($to, $subject, $message, $headers,  $email_from);

  echo json_encode(array('status' => 'success'));
} else {
  echo json_encode(array('status' => 'error'));
}
?>