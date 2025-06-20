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
    
      { text: "false", correct: false },
      { text: "undefined", correct: false },
      { text: "null", correct: false },
      { text: "true", correct: true }
    ]
  },
  {
    questao: "4- Qual palavra-chave é usada para declarar uma função em JavaScript?",
    alternativas: [
      
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "function", correct: true },
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

let indiceAtual = 0;
let respostas = new Array(questoes.length).fill(null);

let telaInicial = document.getElementById("tela-inicial");
let quiz = document.getElementById("quiz");
let questaoEl = document.getElementById("questao");
let botoesEl = document.querySelectorAll(".btn");
let proximoBtn = document.getElementById("proximo-btn");
let voltarBtn = document.getElementById("voltar-btn");
let resultadoEl = document.getElementById("resultado");
let reiniciarEl = document.getElementById("reiniciar");
let btnReiniciar = document.getElementById("btn-reiniciar");
let btnVoltar = document.getElementById("btn-voltar");

function comecarquiz() {
  telaInicial.classList.add("escondido");
  quiz.classList.remove("escondido");
  indiceAtual = 0;
  respostas = new Array(questoes.length).fill(null);
  mostrarQuestao();
  proximoBtn.style.display = "none";
  voltarBtn.style.display = "none";
  resultadoEl.classList.add("escondido");
  reiniciarEl.classList.add("escondido");
  btnVoltar.classList.add("escondido");  // Esconde o botão de voltar à tela inicial
}

function mostrarQuestao() {
  const atual = questoes[indiceAtual];
  questaoEl.textContent = atual.questao;

  atual.alternativas.forEach((alt, i) => {
    const botao = botoesEl[i];
    botao.textContent = alt.text;
    botao.disabled = false;
    botao.classList.remove("correct", "incorrect", "selecionado");

    if (respostas[indiceAtual] === i) {
      botao.classList.add("selecionado");
    }

    botao.onclick = () => {
      respostas[indiceAtual] = i;
      botoesEl.forEach(b => b.classList.remove("selecionado"));
      botao.classList.add("selecionado");
      proximoBtn.style.display = "inline-block";
    };
  });

  voltarBtn.style.display = indiceAtual === 0 ? "none" : "inline-block";
  proximoBtn.textContent = indiceAtual === questoes.length - 1 ? "Finalizar" : "Próximo";
  proximoBtn.style.display = respostas[indiceAtual] !== null ? "inline-block" : "none";
}

function avancarQuestao() {
  if (respostas[indiceAtual] === null) {
    alert("Por favor, selecione uma alternativa antes de continuar.");
    return;
  }

  if (indiceAtual < questoes.length - 1) {
    indiceAtual++;
    mostrarQuestao();
  } else {
    mostrarResultado();
  }
}

function voltarQuestao() {
  if (indiceAtual > 0) {
    indiceAtual--;
    mostrarQuestao();
  }
}

function mostrarResultado() {
  quiz.classList.add("escondido");
  resultadoEl.classList.remove("escondido");

  let acertos = 0;
  let html = `<h1>Resultado do Quiz</h1><ul style="list-style: none; padding-left: 0;">`;

  questoes.forEach((q, i) => {
    const correta = q.alternativas.findIndex(a => a.correct);
    const resposta = respostas[i];
    const acertou = resposta === correta;
    const cor = acertou ? "green" : "red";
    const emoji = acertou ? "✅" : "❌";

    if (acertou) acertos++;

    html += `
      <li>
        <strong>${q.questao}</strong><br>
        Sua resposta: <span style="color:${cor}">${resposta !== null ? q.alternativas[resposta].text : "Não respondeu"}</span><br>
        ${emoji} Resposta correta: ${q.alternativas[correta].text}
      </li><br>`;
  });

  html += `</ul>`;
  html += `<h2>Você acertou ${acertos} de ${questoes.length} questões.</h2>`;
  resultadoEl.innerHTML = html;
  reiniciarEl.classList.remove("escondido");
  btnVoltar.classList.remove("escondido"); // Mostra o botão de voltar ao final
}

btnReiniciar.addEventListener("click", comecarquiz);
proximoBtn.addEventListener("click", avancarQuestao);
voltarBtn.addEventListener("click", voltarQuestao);
