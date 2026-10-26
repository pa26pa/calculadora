operacao = ['+','-','*','/','**'];
numero = ['0','1','2','3','4','5','6','7','8','9'];

function add(item) {
    input = document.getElementById("input");

    input.value += item;
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

    a = chamando(lista);
    console.log(a);
}

function chamando(lista) {
    lista = resolvendo(lista,'**');
    lista = resolvendo(lista,'*');
    lista = resolvendo(lista,'/');
    lista = resolvendo(lista,'+');
    lista = resolvendo(lista,'-');

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

