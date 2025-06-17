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

let indiceAtual = 0;
let pontuacao = 0;

// Armazena quais perguntas foram respondidas
const foiRespondida = new Array(questoes.length).fill(false);

function mostrarQuestao() {
  const atual = questoes[indiceAtual];
  questaoEl.textContent = atual.questao;

  atual.alternativas.forEach((alt, index) => {
    const botao = botoesEl[index];
    botao.textContent = alt.text;
    botao.dataset.correct = alt.correct;

    // Restabelecer evento se não foi respondida ainda
    if (!foiRespondida[indiceAtual]) {
      botao.onclick = () => selecionarAlternativa(botao);
      botao.disabled = false;
      botao.classList.remove("correct", "incorrect");
    } else {
      // Se já foi respondida, manter estado visual
      botao.onclick = null;
      botao.disabled = true;
    }
  });

  // Controle dos botões
  proximoBtn.style.display = "inline-block";
  voltarBtn.style.display = indiceAtual > 0 ? "inline-block" : "none";

  // Verifica se a pergunta atual foi respondida
  const jaFoiRespondida = foiRespondida[indiceAtual];
  proximoBtn.disabled = !jaFoiRespondida;
}

function selecionarAlternativa(botao) {
  const correto = botao.dataset.correct === "true";
  if (correto) {
    botao.classList.add("correct");
    pontuacao++;
  } else {
    botao.classList.add("incorrect");
  }

  // Marca a pergunta como respondida
  foiRespondida[indiceAtual] = true;
  botoesEl.forEach(btn => btn.disabled = true);
  proximoBtn.disabled = false; // Libera o próximo
}

function proximoHandler() {
  if (!foiRespondida[indiceAtual]) {
    alert("Selecione uma alternativa antes de continuar.");
    return;
  }

  indiceAtual++;

  if (indiceAtual < questoes.length) {
    mostrarQuestao();
  } else {
    mostrarResultado();
  }
}

function voltarHandler() {
  if (indiceAtual > 0) {
    indiceAtual--;
    mostrarQuestao();
  }
}

function mostrarResultado() {
  questaoEl.textContent = `Você acertou ${pontuacao} de ${questoes.length} questões!`;
  botoesEl.forEach(btn => btn.style.display = "none");
  proximoBtn.textContent = "Reiniciar";
  voltarBtn.style.display = "none";

  proximoBtn.removeEventListener("click", proximoHandler);
  proximoBtn.addEventListener("click", reiniciarQuiz);
}

function reiniciarQuiz() {
  indiceAtual = 0;
  pontuacao = 0;
  foiRespondida.fill(false);

  botoesEl.forEach(btn => {
    btn.style.display = "block";
    btn.disabled = false;
    btn.classList.remove("correct", "incorrect");
  });

  proximoBtn.textContent = "Próximo";
  proximoBtn.disabled = false;
  proximoBtn.removeEventListener("click", reiniciarQuiz);
  proximoBtn.addEventListener("click", proximoHandler);

  mostrarQuestao();
}

// Eventos iniciais
proximoBtn.addEventListener("click", proximoHandler);
voltarBtn.addEventListener("click", voltarHandler);

// Início do quiz
mostrarQuestao();