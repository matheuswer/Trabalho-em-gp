const questoes = [
    {
      questao: "1- O que significa 'HTML'?",
      alternativas: [
        { id: 1, text: "HyperText Markup Language", correct: true },
        { id: 2, text: "Home Tool Markup Language", correct: false },
        { id: 3, text: "Hyperlinks and Text Markup Language", correct: false },
        { id: 4, text: "Hyperlinking Text Mark Language", correct: false }
      ]
    },
    {
      questao: "2- Qual estrutura de repetição executa um bloco enquanto uma condição for verdadeira?",
      alternativas: [
        { id: 1, text: "if", correct: false },
        { id: 2, text: "while", correct: true },
        { id: 3, text: "switch", correct: false },
        { id: 4, text: "function", correct: false }
      ]
    },
    {
      questao: "3- Qual o resultado da expressão lógica: !(true && false)?",
      alternativas: [
        { id: 1, text: "true", correct: true },
        { id: 2, text: "false", correct: false },
        { id: 3, text: "undefined", correct: false },
        { id: 4, text: "null", correct: false }
      ]
    },
    {
      questao: "4- Qual palavra-chave é usada para declarar uma função em JavaScript?",
      alternativas: [
        { id: 1, text: "function", correct: true },
        { id: 2, text: "var", correct: false },
        { id: 3, text: "let", correct: false },
        { id: 4, text: "if", correct: false }
      ]
    },
    {
      questao: "5- Qual operador compara igualdade estrita em JavaScript?",
      alternativas: [
        { id: 1, text: "=", correct: false },
        { id: 2, text: "==", correct: false },
        { id: 3, text: "===", correct: true },
        { id: 4, text: "=>", correct: false }
      ]
    }
  ];
  
  const questaoEl = document.getElementById("questao");
  const botoesEl = document.querySelectorAll(".btn");
  const proximoBtn = document.getElementById("proximo-btn");
  
  let indiceAtual = 0;
  let pontuacao = 0;
  
  function mostrarQuestao() {
    const atual = questoes[indiceAtual];
    questaoEl.textContent = atual.questao;
  
    atual.alternativas.forEach((alt, index) => {
      const botao = botoesEl[index];
      botao.textContent = alt.text;
      botao.dataset.correct = alt.correct;
      botao.disabled = false;
      botao.classList.remove("correct", "incorrect");
      botao.onclick = () => selecionarAlternativa(botao);
    });
  
    proximoBtn.style.display = "none";
  }
  
  function selecionarAlternativa(botao) {
    const correto = botao.dataset.correct === "true";
    if (correto) {
      botao.classList.add("correct");
      pontuacao++;
    } else {
      botao.classList.add("incorrect");
    }
  
    botoesEl.forEach(btn => btn.disabled = true);
    proximoBtn.style.display = "block";
  }
  
  //  Função separada para "próximo"
  function proximoHandler() {
    indiceAtual++;
    if (indiceAtual < questoes.length) {
      mostrarQuestao();
    } else {
      mostrarResultado();
    }
  }
  
  proximoBtn.addEventListener("click", proximoHandler);
  
  function mostrarResultado() {
    questaoEl.textContent = `Você acertou ${pontuacao} de ${questoes.length} questões!`;
    botoesEl.forEach(btn => btn.style.display = "none");
  
    proximoBtn.textContent = "Reiniciar";
  
    // Remove o handler antigo para evitar duplicações
    proximoBtn.removeEventListener("click", proximoHandler);
    proximoBtn.onclick = reiniciarQuiz;
    proximoBtn.style.display = "block";
  }
  
  function reiniciarQuiz() {
    indiceAtual = 0;
    pontuacao = 0;
  
    botoesEl.forEach(btn => {
      btn.style.display = "block";
      btn.classList.remove("correct", "incorrect");
    });
  
    proximoBtn.textContent = "Próximo";
  
    // Remove onclick antigo (reiniciar)
    proximoBtn.onclick = null;
  
    // Reativa o handler do botão próximo
    proximoBtn.addEventListener("click", proximoHandler);
  
    mostrarQuestao();
  }
  
  // 👇 Inicia o quiz
  mostrarQuestao();
  