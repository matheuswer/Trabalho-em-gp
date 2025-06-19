const questoes = [
    {
      questao: "1- Quem foi o primeiro imperador do Brasil? ?",
      alternativas: [
        { text: "Dom Pedro I", correct: true },
        { text: "Getúlio Vargas", correct: false },
        { text: "Dom Pedro II", correct: false },
        { text: "Tiradentes", correct: false }
      ]
    },
    {
      questao: "2-Quem descobriu o Brasil ?",
      alternativas: [
        { text: " Cristóvão Colombo", correct: false },
        { text: "Pedro Álvares Cabral", correct: true },
        { text: "Dom João VI", correct: false },
        { text: "Santos Dumont", correct: false }
      ]
    },
    {
      questao: "3- Qual povo viveu no Brasil antes da chegada dos portugueses?",
      alternativas: [
        { text: " Índios (Povos indígenas)", correct: true },
        { text: " Espanhóis", correct: false },
        { text: " Italianos", correct: false },
        { text: " Franceses", correct: false }
      ]
    },
    {
      questao: "4- O que foi o “grito do Ipiranga” ?",
      alternativas: [
        { text: " A declaração da Independência do Brasil", correct: true },
        { text: "Um livro famoso", correct: false },
        { text: "Um jogo de futebol", correct: false },
        { text: "Uma festa popular", correct: false }
      ]
    },
    {
      questao: "5-Em que ano os portugueses chegaram ao Brasil",
      alternativas: [
        { text: "1889", correct: false },
        { text: "1822", correct: false },
        { text: "1500", correct: true },
        { text: " 2022", correct: false }
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
  }
  
  // Quando clicar em "Reiniciar", começa tudo de novo
  btnReiniciar.addEventListener("click", comecarquiz);
  
  // Botões "Próximo" e "Voltar"
  proximoBtn.addEventListener("click", avancarQuestao);
  voltarBtn.addEventListener("click", voltarQuestao);