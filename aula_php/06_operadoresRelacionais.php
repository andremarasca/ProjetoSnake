<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8"/>
    <title>Site Marasca</title>
    <link rel="stylesheet" href="_css/estilo.css"/>
    <script src="_javascript/funcoes.js"></script>
</head>
<body onload="atualizaTimer()">
<div id="interface">

    <header id="cabecalho">
        <hgroup>
            <h1>Site</h1>
            <h2>Produzido por Marasca</h2>
        </hgroup>
    </header>

    <section id="corpo">
        <article id="noticia-principal">
            
            <?php
                $a = 5;
                $b = 3;
                echo ("Soma: ". ($a > $b));
                echo ("<br/>Subtracao: ". ($a < $b));
                echo ("<br/>Multiplicacao: ". ($a == $b));
                echo ("<br/>Divisao: ". ($a != $b));
                echo ("<br/>Resto: ". ($a == '5'));
            ?>

        </article>
    </section>

    <footer id="rodape">
        <p>
            Copyright 2018 - by André Luiz Marasca<br/>
            <a href="https://www.facebook.com/andre.marasca" target="_blank">Facebook</a> | 
            <a href="https://www.youtube.com/channel/UC7YlMzwNGcpQWfF7vEbSIrQ/videos?view_as=subscriber" target="_blank">YouTube</a>
        </p>
    </footer>

</div>
</body>
</html>