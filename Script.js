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

let indiceAtual = 0;
let respostas = new Array(questoes.length).fill(null);

// Elementos do DOM
let capaInicial = document.getElementById("capa-inicial");
let telaSelecao = document.getElementById("tela-selecao");
let quiz = document.getElementById("quiz");
let questaoEl = document.getElementById("questao");
let questaoNumeroEl = document.getElementById("questao-numero");
let botoesEl = document.querySelectorAll(".btn");
let proximoBtn = document.getElementById("proximo-btn");
let voltarBtn = document.getElementById("voltar-btn");
let resultadoEl = document.getElementById("resultado");
let reiniciarEl = document.getElementById("reiniciar");
let btnReiniciar = document.getElementById("btn-reiniciar");

// Função para ir da capa inicial para seleção de quiz
function irParaSelecao() {
  capaInicial.classList.add("escondido");
  telaSelecao.classList.remove("escondido");
}

// Função para voltar da seleção para a capa
function voltarParaCapa() {
  telaSelecao.classList.add("escondido");
  capaInicial.classList.remove("escondido");
}

// Função para voltar do quiz para seleção
function voltarParaSelecao() {
  quiz.classList.add("escondido");
  resultadoEl.classList.add("escondido");
  reiniciarEl.classList.add("escondido");
  telaSelecao.classList.remove("escondido");
  
  // Reset do quiz
  indiceAtual = 0;
  respostas = new Array(questoes.length).fill(null);
}

// Função para começar o quiz
function comecarQuiz(tipoQuiz) {
  if (tipoQuiz !== 0) {
    alert("Este quiz ainda não está disponível!");
    return;
  }
  
  telaSelecao.classList.add("escondido");
  quiz.classList.remove("escondido");
  
  indiceAtual = 0;
  respostas = new Array(questoes.length).fill(null);
  mostrarQuestao();
  proximoBtn.style.display = "none";
  voltarBtn.style.display = "none";
  resultadoEl.classList.add("escondido");
  reiniciarEl.classList.add("escondido");
}

function mostrarQuestao() {
  const atual = questoes[indiceAtual];
  questaoEl.textContent = atual.questao;
  
  // Atualizar indicador de progresso
  questaoNumeroEl.textContent = `${indiceAtual + 1}/${questoes.length}`;

  // Mostrar cada alternativa
  atual.alternativas.forEach((alt, i) => {
    const botao = botoesEl[i];
    botao.textContent = alt.text;
    botao.disabled = false;
    botao.classList.remove("correct", "incorrect", "selecionado");

    if (respostas[indiceAtual] === i) {
      botao.classList.add("selecionado");
    }

    // Quando clicar em uma alternativa
    botao.onclick = () => {
      respostas[indiceAtual] = i;
      botoesEl.forEach(b => b.classList.remove("selecionado"));
      botao.classList.add("selecionado");
      proximoBtn.style.display = "inline-block";
    };
  });

  // Controle dos botões de navegação
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
  let html = `<h1>🎉 Resultado do Quiz</h1><ul style="list-style: none; padding-left: 0;">`;

  questoes.forEach((q, i) => {
    const correta = q.alternativas.findIndex(a => a.correct);
    const resposta = respostas[i];
    const acertou = resposta === correta;
    const cor = acertou ? "#00b894" : "#e17055";
    const emoji = acertou ? "✅" : "❌";

    if (acertou) acertos++;

    // Monta o resultado de cada pergunta
    html += `
      <li>
        <strong>${q.questao}</strong><br>
        <strong>Sua resposta:</strong> <span style="color:${cor}; font-weight: 600;">${resposta !== null ? q.alternativas[resposta].text : "Não respondeu"}</span><br>
        ${emoji} <strong>Resposta correta:</strong> <span style="color: #00b894; font-weight: 600;">${q.alternativas[correta].text}</span>
      </li>`;
  });

  html += `</ul>`;
  
  // Mensagem personalizada baseada na pontuação
  let mensagem = "";
  let porcentagem = Math.round((acertos / questoes.length) * 100);
  
  if (porcentagem >= 80) {
    mensagem = "🏆 Excelente! Você domina o assunto!";
  } else if (porcentagem >= 60) {
    mensagem = "👏 Muito bom! Continue estudando!";
  } else if (porcentagem >= 40) {
    mensagem = "📚 Bom esforço! Que tal revisar alguns conceitos?";
  } else {
    mensagem = "💪 Não desista! A prática leva à perfeição!";
  }
  
  html += `<h2>${mensagem}<br>Você acertou ${acertos} de ${questoes.length} questões (${porcentagem}%)</h2>`;
  resultadoEl.innerHTML = html;
  reiniciarEl.classList.remove("escondido");
}

// Event listeners
btnReiniciar.addEventListener("click", () => comecarQuiz(0));
proximoBtn.addEventListener("click", avancarQuestao);
voltarBtn.addEventListener("click", voltarQuestao);

// Inicialização - mostrar a capa inicial
document.addEventListener("DOMContentLoaded", function() {
  capaInicial.classList.remove("escondido");
});
