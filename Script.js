// Questões dos diferentes quizzes
const todosQuizzes = [
  // Quiz 0: Lógica da Programação
  [
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
  ]
  // Aqui você pode adicionar outros quizzes no futuro
  
];

// Variáveis globais
let quizAtual = null;
let indiceAtual = 0;
let respostas = [];

// Cache dos elementos DOM para melhor performance
const elementos = {
  telaInicial: document.getElementById("tela-inicial"),
  quiz: document.getElementById("quiz"),
  questao: document.getElementById("questao"),
  botoes: document.querySelectorAll(".btn"),
  proximoBtn: document.getElementById("proximo-btn"),
  voltarBtn: document.getElementById("voltar-btn"),
  resultado: document.getElementById("resultado"),
  reiniciar: document.getElementById("reiniciar"),
  btnReiniciar: document.getElementById("btn-reiniciar")
};

// Função para começar um quiz específico
function comecarQuiz(indiceQuiz) {
  // Verifica se o quiz existe e está disponível
  if (indiceQuiz !== 0) {
    alert("Este quiz ainda não está disponível!");
    return;
  }
  
  if (!todosQuizzes[indiceQuiz]) {
    alert("Quiz não encontrado!");
    return;
  }
  
  // Inicializa o quiz
  quizAtual = todosQuizzes[indiceQuiz];
  indiceAtual = 0;
  respostas = new Array(quizAtual.length).fill(null);
  
  // Transição entre telas
  elementos.telaInicial.classList.add("escondido");
  elementos.quiz.classList.remove("escondido");
  elementos.resultado.classList.add("escondido");
  elementos.reiniciar.classList.add("escondido");
  
  // Mostra a primeira questão
  mostrarQuestao();
}

// Função para mostrar a questão atual
function mostrarQuestao() {
  if (!quizAtual || indiceAtual >= quizAtual.length) return;
  
  const questaoAtual = quizAtual[indiceAtual];
  elementos.questao.textContent = questaoAtual.questao;
  
  // Configura as alternativas
  questaoAtual.alternativas.forEach((alternativa, indice) => {
    const botao = elementos.botoes[indice];
    botao.textContent = alternativa.text;
    botao.disabled = false;
    
    // Remove classes anteriores
    botao.className = "btn";
    
    // Marca se já foi selecionada
    if (respostas[indiceAtual] === indice) {
      botao.classList.add("selecionado");
    }
    
    // Event listener otimizado
    botao.onclick = () => selecionarResposta(indice);
  });
  
  // Configura botões de navegação
  atualizarBotoesNavegacao();
}

// Função para selecionar uma resposta
function selecionarResposta(indice) {
  respostas[indiceAtual] = indice;
  
  // Remove seleção anterior e adiciona nova
  elementos.botoes.forEach(botao => botao.classList.remove("selecionado"));
  elementos.botoes[indice].classList.add("selecionado");
  
  // Mostra botão próximo
  elementos.proximoBtn.style.display = "inline-block";
}

// Função para atualizar botões de navegação
function atualizarBotoesNavegacao() {
  // Botão voltar
  elementos.voltarBtn.style.display = indiceAtual === 0 ? "none" : "inline-block";
  
  // Botão próximo
  const temResposta = respostas[indiceAtual] !== null;
  elementos.proximoBtn.style.display = temResposta ? "inline-block" : "none";
  elementos.proximoBtn.textContent = indiceAtual === quizAtual.length - 1 ? "Finalizar" : "Próximo";
}

// Função para avançar questão
function avancarQuestao() {
  if (respostas[indiceAtual] === null) {
    alert("Por favor, selecione uma alternativa antes de continuar.");
    return;
  }
  
  if (indiceAtual < quizAtual.length - 1) {
    indiceAtual++;
    mostrarQuestao();
  } else {
    mostrarResultado();
  }
}

// Função para voltar questão
function voltarQuestao() {
  if (indiceAtual > 0) {
    indiceAtual--;
    mostrarQuestao();
  }
}

// Função para mostrar resultado
function mostrarResultado() {
  elementos.quiz.classList.add("escondido");
  elementos.resultado.classList.remove("escondido");
  
  let acertos = 0;
  let html = `<h1>Resultado do Quiz</h1><ul style="list-style: none; padding-left: 0;">`;
  
  quizAtual.forEach((questao, indice) => {
    const respostaCorreta = questao.alternativas.findIndex(alt => alt.correct);
    const respostaUsuario = respostas[indice];
    const acertou = respostaUsuario === respostaCorreta;
    
    if (acertou) acertos++;
    
    const cor = acertou ? "green" : "red";
    const emoji = acertou ? "✅" : "❌";
    const textoResposta = respostaUsuario !== null ? 
      questao.alternativas[respostaUsuario].text : "Não respondeu";
    
    html += `
      <li style="margin-bottom: 20px; text-align: left;">
        <strong>${questao.questao}</strong><br>
        <span style="color: #666;">Sua resposta:</span> 
        <span style="color: ${cor}; font-weight: bold;">${textoResposta}</span><br>
        ${emoji} <span style="color: #666;">Resposta correta:</span> 
        <span style="color: green; font-weight: bold;">${questao.alternativas[respostaCorreta].text}</span>
      </li>`;
  });
  
  html += `</ul>`;
  
  // Calcula porcentagem
  const porcentagem = Math.round((acertos / quizAtual.length) * 100);
  let mensagem = "";
  
  if (porcentagem >= 80) {
    mensagem = "🎉 Excelente! Você domina o assunto!";
  } else if (porcentagem >= 60) {
    mensagem = "👍 Bom trabalho! Continue estudando!";
  } else {
    mensagem = "📚 Continue estudando, você vai melhorar!";
  }
  
  html += `
    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 20px;">
      <h2 style="color: #2c3e50;">Você acertou ${acertos} de ${quizAtual.length} questões</h2>
      <p style="font-size: 18px; color: #34495e;">Porcentagem: ${porcentagem}%</p>
      <p style="font-size: 16px; margin-top: 10px;">${mensagem}</p>
    </div>`;
  
  elementos.resultado.innerHTML = html;
  elementos.reiniciar.classList.remove("escondido");
}

// Função para reiniciar o quiz
function reiniciarQuiz() {
  // Reset das variáveis
  indiceAtual = 0;
  respostas = [];
  quizAtual = null;
  
  // Volta para tela inicial
  elementos.resultado.classList.add("escondido");
  elementos.reiniciar.classList.add("escondido");
  elementos.quiz.classList.add("escondido");
  elementos.telaInicial.classList.remove("escondido");
}

// Event listeners
elementos.proximoBtn.addEventListener("click", avancarQuestao);
elementos.voltarBtn.addEventListener("click", voltarQuestao);
elementos.btnReiniciar.addEventListener("click", reiniciarQuiz);

// Prevenção de erros
window.addEventListener("error", (e) => {
  console.error("Erro no quiz:", e.error);
});

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  console.log("Quiz carregado com sucesso!");
});