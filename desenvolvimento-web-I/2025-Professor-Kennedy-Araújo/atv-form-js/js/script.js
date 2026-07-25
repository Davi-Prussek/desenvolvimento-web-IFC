let L_M_P = (nome) => {
         let preposicao = ["a", "ante", "após", "até", "com", "contra", "de", "desde", "em",
        "entre", "para", "perante", "por", "sem", "sob", "sobre", "trás", "da", "de", "do"];
        let nomeComeco; let restoNome; let nomeCompletoMaiusculo = [];
        let primeiraLetra = nome.split(" ");
    for (let i = 0; i < primeiraLetra.length; i++) {
        let palavraMinuscula = primeiraLetra[i].toLowerCase();
        if (preposicao.includes(primeiraLetra[i])) {
            nomeCompletoMaiusculo.push(palavraMinuscula)
        } else {
            nomeComeco = primeiraLetra[i].charAt(0);
            restoNome = primeiraLetra[i].substring(1);
            nomeCompletoMaiusculo.push(nomeComeco.toUpperCase() + restoNome)}};
        return nomeCompletoMaiusculo.join(" ")};

const parteI = document.getElementById("parte-I");
const parteII = document.getElementById("parte-II");
const parteIII = document.getElementById("parte-III");
const parteIV = document.getElementById("parte-IV");

const proximoI = document.getElementById("proximo-I");
const proximoII = document.getElementById("proximo-II");
const proximoIII = document.getElementById("proximo-III");
const proximoIV = document.getElementById("proximo-IV");

let nome = "";
let turma = "";

parteII.style.display = "none";
parteIII.style.display = "none";
parteIV.style.display = "none";

function actSwapPage() {
    if (parteI.style.display == "block") {
        parteI.style.display = "none"
        parteII.style.display = "block"
        nome = document.getElementById("nome").value;
        document.querySelector(".parte-II h1 span").innerHTML = L_M_P(nome);
        document.querySelector(".parte-IV h1 span").innerHTML = L_M_P(nome);
    } else if (parteII.style.display == "block") {
        let estudante = document.querySelector(".parte-II input:checked").value;
        if (estudante == 1) {
            parteII.style.display = "none";
            parteIII.style.display = "block";
            
        } else {
            parteII.style.display = "none";
            parteIV.style.display = "block";
            document.querySelector(".parte-IV p span").innerHTML = "1XXXXX";
        }
    } else if (parteIII.style.display == "block") {
        parteIII.style.display = "none";
        parteIV.style.display = "block";
        turma = document.querySelector(".parte-III select").value;
        document.querySelector(".parte-IV p span").innerHTML = turma;
    } else {
        
        parteIV.style.display = "none";
        parteI.style.display = "block";
    }
}

proximoI.addEventListener("click", actSwapPage);
proximoII.addEventListener("click", actSwapPage);
proximoIII.addEventListener("click", actSwapPage);
proximoIV.addEventListener("click", actSwapPage);