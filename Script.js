const questoes = [
  {
    questao: "1- O que significa 'HTML'?",
    alternativas: [
      { text: "HyperText Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Hyperlinking Text Mark Language", correct: false }
    ]
  },
  {
    questao: "2- Qual estrutura de repetição executa um bloco enquanto uma condição for verdadeira?",
    alternativas: [
      { text: "if", correct: false },
      { text: "while", correct: true },
      { text: "switch", correct: false },
      { text: "function", correct: false }
    ]
  },
  {
    questao: "3- Qual o resultado da expressão lógica: !(true && false)?",
    alternativas: [
      { text: "true", correct: true },
      { text: "false", correct: false },
      { text: "undefined", correct: false },
      { text: "null", correct: false }
    ]
  },
  {
    questao: "4- Qual palavra-chave é usada para declarar uma função em JavaScript?",
    alternativas: [
      { text: "function", correct: true },
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "if", correct: false }
    ]
  },
  {
    questao: "5- Qual operador compara igualdade estrita em JavaScript?",
    alternativas: [
      { text: "=", correct: false },
      { text: "==", correct: false },
      { text: "===", correct: true },
      { text: "=>", correct: false }
    ]
  }
];

const questaoEl = document.getElementById("questao");
const botoesEl = document.querySelectorAll(".btn");
const proximoBtn = document.getElementById("proximo-btn");
const voltarBtn = document.getElementById("voltar-btn");
const quizContainer = document.getElementById("quiz-container");

let indiceAtual = 0;
const foiRespondida = new Array(questoes.length).fill(false);
const respostas = new Array(questoes.length).fill(null);

function animarTransicao(callback) {
  quizContainer.classList.remove("show");
  setTimeout(() => {
    callback();
    quizContainer.classList.add("show");
  }, 300);
}

function mostrarQuestao() {
  const atual = questoes[indiceAtual];
  questaoEl.textContent = atual.questao;

  atual.alternativas.forEach((alt, index) => {
    const botao = botoesEl[index];
    botao.textContent = alt.text;
    botao.classList.remove("correct", "incorrect");
    botao.disabled = foiRespondida[indiceAtual];
    botao.onclick = foiRespondida[indiceAtual] ? null : () => selecionarAlternativa(index);
  });

  proximoBtn.style.display = "inline-block";
  voltarBtn.style.display = indiceAtual > 0 ? "inline-block" : "none";
  proximoBtn.disabled = !foiRespondida[indiceAtual];
}

function selecionarAlternativa(index) {
  respostas[indiceAtual] = index;
  foiRespondida[indiceAtual] = true;
  botoesEl.forEach(btn => btn.disabled = true);
  proximoBtn.disabled = false;

  setTimeout(() => {
    if (indiceAtual < questoes.length - 1) {
      indiceAtual++;
      animarTransicao(mostrarQuestao);
    } else {
      animarTransicao(mostrarResultado);
    }
  }, 300);
}

function proximoHandler() {
  if (indiceAtual < questoes.length - 1) {
    indiceAtual++;
    animarTransicao(mostrarQuestao);
  } else {
    animarTransicao(mostrarResultado);
  }
}

function voltarHandler() {
  if (indiceAtual > 0) {
    indiceAtual--;
    animarTransicao(mostrarQuestao);
  }
}

function mostrarResultado() {
  const pontuacao = respostas.reduce((acc, resposta, i) => {
    return resposta !== null && questoes[i].alternativas[resposta].correct ? acc + 1 : acc;
  }, 0);

  questaoEl.textContent = `Você acertou ${pontuacao} de ${questoes.length} questões!`;
  botoesEl.forEach(btn => btn.style.display = "none");
  proximoBtn.textContent = "Reiniciar";
  voltarBtn.style.display = "none";
  proximoBtn.onclick = reiniciarQuiz;
}

function reiniciarQuiz() {
  indiceAtual = 0;
  respostas.fill(null);
  foiRespondida.fill(false);
  botoesEl.forEach(btn => {
    btn.style.display = "block";
    btn.disabled = false;
    btn.classList.remove("correct", "incorrect");
  });

  proximoBtn.textContent = "Próximo";
  proximoBtn.onclick = proximoHandler;

  animarTransicao(mostrarQuestao);
}

proximoBtn.onclick = proximoHandler;
voltarBtn.onclick = voltarHandler;

window.onload = () => {
  quizContainer.classList.add("show");
  mostrarQuestao();
};
