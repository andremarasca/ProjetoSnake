mapa = [];
mouseI = 0;
mouseJ = 0;
comidai = -1;
comidaj = -1;
M = -1;
N = -1;
dir = 'd';
score_snake = 0;
creditos = 0;
filaCorpoI = [0];
filaCorpoJ = [0];
filaDir = ['d'];
tempoDelay = 1000;
ultimoTempoDelay = -1;

meus_timers = []; // nao pode mexer

function comecarJogo() {
    preload();
    mapa = [];
    mouseI = 0;
    mouseJ = 0;
    comidai = -1;
    comidaj = -1;
    M = -1;
    N = -1;
    dir = 'd';
    score_snake = 0;
    creditos = 0;
    filaCorpoI = [0];
    filaCorpoJ = [0];
    filaDir = ['d'];
    tempoDelay = 500;
    ultimoTempoDelay = 500;

    M = parseInt(document.getElementById("cM").value);
    N = parseInt(document.getElementById("cN").value);
    mapa = [];
    var x = Math.round(900 / N);
    var iden;
    meuHTML = "";
    if (x < 400) {
        if (x > 60)
            x = 60;
        var largura = x.toString();
        largura = 'height="' + largura + '"' + ' width="' + largura + '"';
    }
    else {
        largura = "";
    }
    for (i = 0; i < M; i++) {
        meuHTML = meuHTML.concat('<tr>');
        linhas = [];
        for (j = 0; j < N; j++) {
            linhas.push(0);
            iden = 'a_' + i.toString() + '_' + j.toString();
            meuHTML = meuHTML.concat('<td onmouseover="setaMouse(' + i.toString() + ',' + j.toString() + ')"');
            meuHTML = meuHTML.concat('<td><img ' + largura + ' class="minhasImagens" id="' + iden + '" src="_imagens/chao.png"/></td>');
        }
        meuHTML = meuHTML.concat('</tr>');
        mapa.push(linhas);
    }
    document.getElementById("tabelaspec").innerHTML = meuHTML;
    nova_posicao_comida(filaCorpoI[filaCorpoI.length - 1], filaCorpoJ[filaCorpoJ.length - 1]);
    document.getElementById("res_score").setAttribute('data-value', score_snake);
}

var funcao_do_timer = function () {
    if (M > 0) {
        movimento();
    }
}

function movimento() {
    defineDir();
    var lista = atualiza_coordenadas(dir);
    var ii = lista[0];
    var jj = lista[1];
    var parede = lista[2];
    var movimento_valido = lista[3];

    if (parede == 0 && movimento_valido == 1) {
        mapa[ii][jj] = 1;

        var ultimoIValido = filaCorpoI[filaCorpoI.length - 1];
        var ultimoJValido = filaCorpoJ[filaCorpoJ.length - 1];
        var ultimoDirValido = filaDir[filaCorpoJ.length - 1];

        filaCorpoI.push(ii);
        filaCorpoJ.push(jj);
        filaDir.push(dir);

        verifica_pontuacao(ii, jj);
        iden = 'a_' + ii.toString() + '_' + jj.toString();
        if (dir == 'b')
            document.getElementById(iden).src = imagensJogo.cabeca_baixo.src;
        else if (dir == 'c')
            document.getElementById(iden).src = imagensJogo.cabeca_cima.src;
        else if (dir == 'd')
            document.getElementById(iden).src = imagensJogo.cabeca_direita.src;
        else
            document.getElementById(iden).src = imagensJogo.cabeca_esquerda.src;

        if (ultimoIValido >= 0) {
            iden = 'a_' + ultimoIValido.toString() + '_' + ultimoJValido.toString();
            if (ultimoDirValido == 'b' && dir == 'd')
                document.getElementById(iden).src = imagensJogo.baixo_direita.src;
            else if (ultimoDirValido == 'b' && dir == 'e')
                document.getElementById(iden).src = imagensJogo.baixo_esquerda.src;
            else if (ultimoDirValido == 'c' && dir == 'd')
                document.getElementById(iden).src = imagensJogo.cima_direita.src;
            else if (ultimoDirValido == 'c' && dir == 'e')
                document.getElementById(iden).src = imagensJogo.cima_esquerda.src;
            else if (ultimoDirValido == 'd' && dir == 'b')
                document.getElementById(iden).src = imagensJogo.direita_baixo.src;
            else if (ultimoDirValido == 'd' && dir == 'c')
                document.getElementById(iden).src = imagensJogo.direita_cima.src;
            else if (ultimoDirValido == 'e' && dir == 'b')
                document.getElementById(iden).src = imagensJogo.esquerda_baixo.src;
            else if (ultimoDirValido == 'e' && dir == 'c')
                document.getElementById(iden).src = imagensJogo.esquerda_cima.src;
            else if (ultimoDirValido == 'b')
                document.getElementById(iden).src = imagensJogo.baixo.src;
            else if (ultimoDirValido == 'c')
                document.getElementById(iden).src = imagensJogo.cima.src;
            else if (ultimoDirValido == 'd')
                document.getElementById(iden).src = imagensJogo.direita.src;
            else
                document.getElementById(iden).src = imagensJogo.esquerda.src;
        }

        if (creditos == 0 && filaCorpoI.length > 1) {
            var ni = filaCorpoI.shift();
            var nj = filaCorpoJ.shift();
            filaDir.shift();
            iden = 'a_' + ni.toString() + '_' + nj.toString();
            document.getElementById(iden).src = imagensJogo.chao.src;
            mapa[ni][nj] = 0;

            if (filaDir.length >= 2) {
                var ni = filaCorpoI[0];
                var nj = filaCorpoJ[0];
                dir = filaDir[1];
                iden = 'a_' + ni.toString() + '_' + nj.toString();
                if (dir == 'b')
                    document.getElementById(iden).src = imagensJogo.rabo_baixo.src;
                else if (dir == 'c')
                    document.getElementById(iden).src = imagensJogo.rabo_cima.src;
                else if (dir == 'd')
                    document.getElementById(iden).src = imagensJogo.rabo_direita.src;
                else
                    document.getElementById(iden).src = imagensJogo.rabo_esquerda.src;
            }
        }
        else if (creditos > 0)
            creditos--;
        dir_invalido = 0;
    }
}

function defineDir() {
    var ii = filaCorpoI[filaCorpoI.length - 1];
    var jj = filaCorpoJ[filaCorpoJ.length - 1];
    var i = mouseI;
    var j = mouseJ;
    var di = i - ii;
    var dj = j - jj;
    if (!(di == 0 && dj == 0)) {
        if (Math.abs(di) > Math.abs(dj)) {
            if (di > 0)
                dir = 'b';
            else
                dir = 'c';
            var lista = atualiza_coordenadas(dir);
            var parede = lista[2];
            var movimento_valido = lista[3];
            if (parede == 1 || movimento_valido == 0) {
                if (dj != 0) {
                    if (dj > 0)
                        dir = 'd';
                    else
                        dir = 'e';
                }
                else {
                    if (dir == 'b')
                        dirTmp = 'c';
                    else
                        dirTmp = 'b';
                    var lista = atualiza_coordenadas(dirTmp);
                    var parede = lista[2];
                    var movimento_valido = lista[3];
                    if (parede == 0 && movimento_valido == 1)
                        dir = dirTmp;

                }
            }
        }
        else {
            if (dj > 0)
                dir = 'd';
            else
                dir = 'e';
            var lista = atualiza_coordenadas(dir);
            var parede = lista[2];
            var movimento_valido = lista[3];
            if (parede == 1 || movimento_valido == 0) {
                if (di != 0) {
                    if (di > 0)
                        dir = 'b';
                    else
                        dir = 'c';
                }
                else {
                    if (dir == 'd')
                        dirTmp = 'e';
                    else
                        dirTmp = 'd';
                    var lista = atualiza_coordenadas(dirTmp);
                    var parede = lista[2];
                    var movimento_valido = lista[3];
                    if (parede == 0 && movimento_valido == 1)
                        dir = dirTmp;
                }
            }
        }
    }
    else if (filaDir.length >= 1) {
        dir = filaDir[filaDir.length - 1];
    }
}

function setaMouse(i, j) {
    mouseI = i;
    mouseJ = j;
}

function verifica_pontuacao(ii, jj) {
    if (ii == comidai && jj == comidaj) {
        score_snake++;
        creditos++;
        document.getElementById("res_score").setAttribute('data-value', score_snake);

        iden = 'a_' + comidai.toString() + '_' + comidaj.toString();
        document.getElementById(iden).src = imagensJogo.chao.src;
        nova_posicao_comida(ii, jj);
    }
}

function nova_posicao_comida(ii, jj) {
    comidai = parseInt(Math.floor(Math.random() * M));
    comidaj = parseInt(Math.floor(Math.random() * N));
    while (ii == comidai && jj == comidaj || mapa[comidai][comidaj] == 1) {
        comidai = parseInt(Math.floor(Math.random() * M));
        comidaj = parseInt(Math.floor(Math.random() * N));
    }
    iden = 'a_' + comidai.toString() + '_' + comidaj.toString();
    document.getElementById(iden).src = imagensJogo.comida.src;
}

function atualiza_coordenadas(dir) {
    var parede = 0;
    var ii = filaCorpoI[filaCorpoI.length - 1];
    var jj = filaCorpoJ[filaCorpoJ.length - 1];
    if (dir == 'b') {
        ii++;
        if (ii >= M) {
            parede = 1;
            ii = M - 1;
        }
    }
    else if (dir == 'c') {
        ii--;
        if (ii < 0) {
            parede = 1;
            ii = 0;
        }

    }
    else if (dir == 'd') {
        jj++;
        if (jj >= N) {
            parede = 1;
            jj = N - 1;
        }
    }
    else if (dir == 'e') {
        jj--;
        if (jj < 0) {
            parede = 1;
            jj = 0;
        }
    }

    var movimento_valido = 0;
    if (mapa[ii][jj] == 0) {
        movimento_valido = 1;
    }

    return [ii, jj, parede, movimento_valido];
}

function atualizaTimer() {
    tempoDelay = parseInt(document.getElementById("cDelay").value);
    if (tempoDelay != ultimoTempoDelay) {
        ultimoTempoDelay = tempoDelay;
        while (meus_timers.length > 0) // pode gerar varios timer sem querer, tem que jogar fora todos
            clearInterval(meus_timers.shift());
        meus_timers.push(setInterval(funcao_do_timer, tempoDelay));
        document.getElementById("cTimer").setAttribute('data-value', tempoDelay);
    }
    document.getElementById("cTimer").setAttribute('data-value', tempoDelay);
}

var imagensJogo = [];

function preload() {
    imagensJogo.cabeca_baixo = new Image();
    imagensJogo.cabeca_baixo.src = '_imagens/cabeca_baixo.png';
    imagensJogo.cabeca_cima = new Image();
    imagensJogo.cabeca_cima.src = '_imagens/cabeca_cima.png';
    imagensJogo.cabeca_direita = new Image();
    imagensJogo.cabeca_direita.src = '_imagens/cabeca_direita.png';
    imagensJogo.cabeca_esquerda = new Image();
    imagensJogo.cabeca_esquerda.src = '_imagens/cabeca_esquerda.png';
    imagensJogo.baixo_direita = new Image();
    imagensJogo.baixo_direita.src = '_imagens/baixo_direita.png';
    imagensJogo.baixo_esquerda = new Image();
    imagensJogo.baixo_esquerda.src = '_imagens/baixo_esquerda.png';
    imagensJogo.cima_direita = new Image();
    imagensJogo.cima_direita.src = '_imagens/cima_direita.png';
    imagensJogo.cima_esquerda = new Image();
    imagensJogo.cima_esquerda.src = '_imagens/cima_esquerda.png';
    imagensJogo.direita_baixo = new Image();
    imagensJogo.direita_baixo.src = '_imagens/direita_baixo.png';
    imagensJogo.direita_cima = new Image();
    imagensJogo.direita_cima.src = '_imagens/direita_cima.png';
    imagensJogo.esquerda_baixo = new Image();
    imagensJogo.esquerda_baixo.src = '_imagens/esquerda_baixo.png';
    imagensJogo.esquerda_cima = new Image();
    imagensJogo.esquerda_cima.src = '_imagens/esquerda_cima.png';
    imagensJogo.baixo = new Image();
    imagensJogo.baixo.src = '_imagens/baixo.png';
    imagensJogo.cima = new Image();
    imagensJogo.cima.src = '_imagens/cima.png';
    imagensJogo.direita = new Image();
    imagensJogo.direita.src = '_imagens/direita.png';
    imagensJogo.esquerda = new Image();
    imagensJogo.esquerda.src = '_imagens/esquerda.png';
    imagensJogo.chao = new Image();
    imagensJogo.chao.src = '_imagens/chao.png';
    imagensJogo.rabo_baixo = new Image();
    imagensJogo.rabo_baixo.src = '_imagens/rabo_baixo.png';
    imagensJogo.rabo_cima = new Image();
    imagensJogo.rabo_cima.src = '_imagens/rabo_cima.png';
    imagensJogo.rabo_direita = new Image();
    imagensJogo.rabo_direita.src = '_imagens/rabo_direita.png';
    imagensJogo.rabo_esquerda = new Image();
    imagensJogo.rabo_esquerda.src = '_imagens/rabo_esquerda.png';
    imagensJogo.comida = new Image();
    imagensJogo.comida.src = '_imagens/comida.png';
}