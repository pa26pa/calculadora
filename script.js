const operacao = ['+','-','*','/','**'];
const numero = ['0','1','2','3','4','5','6','7','8','9'];
let ordem = 'padrao';
let historico = {};

function add(item) {
    input = document.getElementById("input");

    input.value += item;
}

function gerarAleatorio(min, max, ignorado) {
    let numero;

    do {
        numero = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (ignorado.includes(numero));

    return numero;
}

function mudarOrdem(ordem_selecionada) {
    ordem = ordem_selecionada;
}

function chamarOrdem(lista) {
    let numerinho;
    if (ordem == 'padrao') {
        numerinho = chamando(lista)
        return numerinho
    }
    if (ordem == 'aleatorio') {
        numerinho = chamando_aleatorio(lista)
        return numerinho
    }
    if (ordem == 'escolhida') {
        numerinho = chamando(lista)
        return numerinho
    }
}

function submit() {
    input = document.getElementById("input");

    enviado = input.value;

    temLetra = /[a-zA-Z]/i.test(enviado);
    if (temLetra) {
        return;
    }

    const lista = enviado.match(/\d+([.,]\d+)?|\*\*|[+\-*/]/g);

    console.log(lista);

    a = chamarOrdem(lista);

    const histo_chave = enviado in historico;
    const histo_valor = Object.values(historico).includes(enviado);

    if (histo_chave || histo_valor) {
        historico[enviado + " "] = a;
    } else {
        historico[enviado] = a;
    }

    input.value = a;
}

function chamando(lista) {
    lista = resolvendo(lista,'**');
    lista = resolvendo(lista,'*');
    lista = resolvendo(lista,'/');
    lista = resolvendo(lista,'+');
    lista = resolvendo(lista,'-');

    return Number(lista[0]);
}

function chamando_aleatorio(lista) {
    let ignorado = [];

    //const dicionario = {
    //    numero1: "divisao",
    //    numero2: "adicao",
    //    numero3: "multiplica",
    //    numero4: "subtacao",
    //    numero5: "potencia"
    //};

    let aleatorio;
    let contador = 0;
    
    while (contador < 5) {
        aleatorio = gerarAleatorio(1, 5, ignorado);    

        ignorado.push(aleatorio);
        contador += 1;
    }

    contador = 0;

    while (ignorado.length > 0) {
        let numero_escolhido_temporariamente = ignorado.shift();

        if (numero_escolhido_temporariamente == 1) {
            lista = resolvendo(lista,'/');
        }
        if (numero_escolhido_temporariamente == 2) {
            lista = resolvendo(lista,'+');
        }
        if (numero_escolhido_temporariamente == 3) {
            lista = resolvendo(lista,'*');
        }
        if (numero_escolhido_temporariamente == 4) {
            lista = resolvendo(lista,'-');
        }
        if (numero_escolhido_temporariamente == 5) {
            lista = resolvendo(lista,'**');
        }
    }

    return Number(lista[0]);
}

function resolvendo(lista, operador) {
    let i = 0;
    let o = 0;

    while (i < lista.length) {
        const item = lista[i];

        if (item.trim() == operador) {
            const numEsquerda = Number(lista[i - 1].replace(',', '.'));
            const numDireita = Number(lista[i + 1].replace(',', '.'));

            if (operador == '+') {
                o = numEsquerda + numDireita;
            }

            if (operador == '-') {
                o = numEsquerda - numDireita;
            }

            if (operador == '/') {
                o = numEsquerda / numDireita;
            }

            if (operador == '*') {
                o = numEsquerda * numDireita;
            }
            
            if (operador == '**') {
                o = numEsquerda ** numDireita;
            }

            lista.splice(i - 1, 3, String(o));

            i = i-1;
        } else {
            i++;
        }
        
    }
    console.log(`Lista após operar [${operador}]:`, lista)
    return lista
}

