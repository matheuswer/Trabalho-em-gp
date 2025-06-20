const questoes = [
    {
      questao: "1- Quanto é 20 + 20 ?",
      alternativas: [
        { text: "40", correct: true },
        { text: "35", correct: false },
        { text: "28", correct: false },
        { text: "21", correct: false }
      ]
    },
    {
      questao: "2- Qual o valor de pi?",
      alternativas: [
        { text: "19,0", correct: false },
        { text: "3,14", correct: true },
        { text: "3,20", correct: false },
        { text: "3,70", correct: false }
      ]
    },
    {
      questao: "3- Raiz quadrada de 49?",
      alternativas: [
        
        { text: "9", correct: false },
        { text: "6", correct: false },
        { text: "5", correct: false },
        { text: "7", correct: true },
      ]
    },
    {
      questao: "4- Qual é o dobro de 36 ?",
      alternativas: [
        
        { text: "74", correct: false },
        { text: "68", correct: false },
        { text: "72", correct: true },
        { text: "97", correct: false }
      ]
    },
    {
      questao: "5-Subtraia 100−68=",
      alternativas: [
        { text: "21", correct: false },
        { text: "54", correct: false },
        { text: "32", correct: true },
        { text: "34", correct: false }
      ]
    }
  ];
  
  let indiceAtual = 0;
  
  // Armazena as respostas do usuário 
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
     btnVoltar.classList.add("escondido"); // Esconde o botão de voltar à tela inicial
  }
  
  function mostrarQuestao() {
    const atual = questoes[indiceAtual];             
    questaoEl.textContent = atual.questao;           
  
    // Mostra cada alternativa 
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
  
      // Monta o resultado de cada pergunta
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
    btnVoltar.classList.remove("escondido"); 
  }
  
  // Quando clicar em "Reiniciar", começa tudo de novo
  btnReiniciar.addEventListener("click", comecarquiz);
  
  // Botões "Próximo" e "Voltar"
  proximoBtn.addEventListener("click", avancarQuestao);
  voltarBtn.addEventListener("click", voltarQuestao);