<?

$email = "djmibpqt@djmib.net";
$headers = "From:$email\nReply-To:$email\nContent-type: text/html";
$assunto = "[formmail] Dj Mib FormMail Global";
$mensagem = "<html><head> <title>FormMail Global - DJ Mib</title> <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'> <meta name=author content='José Felipe - Dj Mib'> </head>  <body> <p>E-mail enviado via formulário global, feito por José Felipe Dj Mib</p> <p>Segue dados enviados:</p>   <p> <dl>";

foreach($_POST as $key => $value) {
    $mensagem .= "  <dt><strong>$key</strong></dt>   <dd>$value</dd> ";
}
$mensagem .= "  </dl>   </p> <p> Dj Mib - José Felipe - www.djmib.net</p> </body></html>";


if(!mail($email, $assunto, $mensagem, $headers, "-r".$email)){// Se for Postfix
    if(!mail($email, $assunto, $mensagem, $headers)){ // Se não for Postfix
        echo "Erro ao enviar e-mail";
        exit;
    }
}
if(isset($_POST["formretorno"])){
    header("Location: ".$_POST["formretorno"]);
}
echo $mensagem;

?>