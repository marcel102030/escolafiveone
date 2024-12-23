// Variáveis para controlar o teste
let perguntaAtual = 0;
let respostas = {
    apostolo: 0,
    profeta: 0,
    evangelista: 0,
    pastor: 0,
    mestre: 0
};

// Lista de perguntas
const perguntas = [
    { pergunta: "Você gosta de liderar grupos e organizar tarefas?", opcoes: ["Sim", "Não"], resposta: ["apostolo", "profeta"] },
    { pergunta: "Você sente um forte desejo de ensinar e compartilhar conhecimento?", opcoes: ["Sim", "Não"], resposta: ["mestre", "evangelista"] },
    { pergunta: "Você sente empatia e gosta de cuidar das pessoas ao seu redor?", opcoes: ["Sim", "Não"], resposta: ["pastor", "apostolo"] },
    { pergunta: "Você tem facilidade para entender e explicar as Escrituras?", opcoes: ["Sim", "Não"], resposta: ["mestre", "profeta"] },
    { pergunta: "Você sente um chamado para compartilhar o evangelho com desconhecidos?", opcoes: ["Sim", "Não"], resposta: ["evangelista", "pastor"] }
];

// Descrições dos dons ministeriais
const descricoes = {
    apostolo: "Os apóstolos são visionários e estrategistas. São responsáveis por liderar e plantar igrejas, expandindo o Reino de Deus.",
    profeta: "Os profetas têm um forte senso de justiça e discernimento espiritual, chamando as pessoas a alinharem suas vidas com a vontade de Deus.",
    evangelista: "Os evangelistas têm o dom de comunicar o evangelho de forma clara e cativante, alcançando pessoas de fora da igreja.",
    pastor: "Os pastores cuidam e guiam as pessoas, ajudando-as a crescer espiritualmente e oferecendo apoio emocional e espiritual.",
    mestre: "Os mestres têm um profundo amor pelo conhecimento e ensino, ajudando os outros a entenderem melhor a Palavra de Deus."
};

// Inicializar o teste
document.getElementById("iniciarTeste").addEventListener("click", () => {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("perguntas").style.display = "block";
    carregarPergunta();
});

// Carregar pergunta
function carregarPergunta() {
    const perguntaObj = perguntas[perguntaAtual];
    document.getElementById("titulo-pergunta").innerText = perguntaObj.pergunta;
    const botoes = document.querySelectorAll(".botoes .opcao");
    botoes[0].innerText = perguntaObj.opcoes[0];
    botoes[0].setAttribute("data-resposta", perguntaObj.resposta[0]);
    botoes[1].innerText = perguntaObj.opcoes[1];
    botoes[1].setAttribute("data-resposta", perguntaObj.resposta[1]);
}

// Lidar com clique em uma resposta
document.querySelectorAll(".opcao").forEach(botao => {
    botao.addEventListener("click", (e) => {
        const resposta = e.target.getAttribute("data-resposta");
        respostas[resposta]++;
        perguntaAtual++;
        if (perguntaAtual < perguntas.length) {
            carregarPergunta();
        } else {
            mostrarResultado();
        }
    });
});

// Mostrar resultado
function mostrarResultado() {
    document.getElementById("perguntas").style.display = "none";
    document.getElementById("resultado").style.display = "block";

    // Calcula a porcentagem de cada dom
    const totalRespostas = Object.values(respostas).reduce((acc, curr) => acc + curr, 0);
    const porcentagens = Object.keys(respostas).map(dom => ({
        nome: dom.charAt(0).toUpperCase() + dom.slice(1),
        valor: ((respostas[dom] / totalRespostas) * 100).toFixed(2),
        chave: dom
    }));

    // Ordena os dons por porcentagem (do maior para o menor)
    const ordenados = porcentagens.sort((a, b) => b.valor - a.valor);

    // Obtém os dois dons mais predominantes
    const top2Dons = ordenados.slice(0, 2);

    // Gera o relatório dinâmico com barras de progresso
    const relatorioContainer = document.getElementById("relatorio-resultado");
    relatorioContainer.innerHTML = `
        <h3>Seus Dois Dons Principais</h3>
        <div>
            <h4>${top2Dons[0].nome}: ${top2Dons[0].valor}%</h4>
            <p>${descricoes[top2Dons[0].chave]}</p>
        </div>
        <div>
            <h4>${top2Dons[1].nome}: ${top2Dons[1].valor}%</h4>
            <p>${descricoes[top2Dons[1].chave]}</p>
        </div>
        <div class="relatorio">
            ${ordenados.map(p => `
                <div class="relatorio-item">
                    <span class="relatorio-nome">${p.nome}</span>
                    <div class="relatorio-barra">
                        <div class="relatorio-barra-preenchida" style="width: ${p.valor}%"></div>
                    </div>
                    <span class="relatorio-valor">${p.valor}%</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Reiniciar teste
document.getElementById("reiniciarTeste").addEventListener("click", () => {
    perguntaAtual = 0;
    respostas = { apostolo: 0, profeta: 0, evangelista: 0, pastor: 0, mestre: 0 };
    document.getElementById("resultado").style.display = "none";
    document.getElementById("inicio").style.display = "block";
});