    let jogoAtivo = true;
let jogadorAtual = "X";
let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let statusDisplay = document.querySelector('.status_msg');

const win_msg = () => `O Jogador ${jogadorAtual} Ganhou!'`;
const vez_msg = () => `É a vez do jogador ${jogadorAtual}!`;
const emp_msg = () => 'Empate!';

statusDisplay.innerHTML = vez_msg();

const condicao_ganhar = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function blocoJogador(blocoClicado, blocoIndex) {
    
    tabuleiro[blocoIndex] = jogadorAtual;
    blocoClicado.innerHTML = jogadorAtual;
    console.log(tabuleiro);
}

function trocaJogador() {
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    statusDisplay.innerHTML = vez_msg();
}

function validacaoVitoria(){
    let ganhador = false;
    for (let i = 0; i <= 7; i++){
        const condicao = condicao_ganhar[i];
        let a = tabuleiro[condicao[0]];
        let b = tabuleiro[condicao[1]];
        let c = tabuleiro[condicao[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c){
            ganhador = true;;
            break;
        }
    }

    if (ganhador) {
        statusDisplay.innerHTML = win_msg();
        jogoAtivo = false;
        return;
    }


    let empate = !tabuleiro.includes("");
    if (empate) {
        statusDisplay.innerHTML = emp_msg();
        return;
    }
    trocaJogador();
}

function blocoEscolhido(eventoBloco){
    const blocoClicado = eventoBloco.target;
    const blocoIndex = parseInt(blocoClicado.getAttribute('data-cell-index'));
    
    if (!jogoAtivo) {
        return;
    }

    if (tabuleiro[blocoIndex] !== ''){
        alert('Bloco já selecionado')
    } 
    
    if (tabuleiro[blocoIndex] == ''){
        blocoJogador(blocoClicado, blocoIndex);
        validacaoVitoria();
    }
    
}

function reiniciarJogo() {
    jogoAtivo = true;
    jogadorAtual = "X";
    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = vez_msg();
    document.querySelectorAll('.bloco').forEach(bloco => bloco.innerHTML = "");
}


document.querySelectorAll('.bloco').forEach(bloco => bloco.addEventListener('click', blocoEscolhido));
document.querySelector('.reiniciar').addEventListener('click', reiniciarJogo);

console.log("test");