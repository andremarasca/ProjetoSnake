<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8"/>
    <title>PHP</title>
</head>
<body>

    <?php
        $a = $_GET["a"];
        $b = $_GET["b"];
        echo("Recebidos $a e $b");
        echo("<br/>Soma: ". ($a + $b));
        echo("<br/>Subtracao: ". ($a - $b));
        echo("<br/>Multiplicacao: ". ($a * $b));
        echo("<br/>Divisao: ". ($a / $b));
        echo("<br/>Resto: ". ($a % $b));
    ?>

</body>
</html>