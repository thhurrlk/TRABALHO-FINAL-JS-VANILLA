// Declaração de variáveis globais
let vagas = [];
let temporizadores = {};
let totalDia = 0; // Variável para armazenar o valor total do dia

// Função para adicionar uma vaga vazia
function adicionarVaga() {
    vagas.push(null); // Adiciona uma vaga vazia
    exibirVagas(); // Atualiza a exibição das vagas
}

// Função para remover uma vaga vazia
function removerVaga() {
    const vagaVaziaIndex = vagas.findIndex(vaga => vaga === null); // Encontra a primeira vaga vazia
    if (vagaVaziaIndex !== -1) {
        cancelarTemporizador(vagaVaziaIndex); // Cancela o temporizador associado à vaga
        vagas.splice(vagaVaziaIndex, 1); // Remove a vaga vazia
        exibirVagas(); // Atualiza a exibição das vagas
    } else {
        alert('Não há vagas vazias para remover.'); // Mostra uma mensagem se não houver vagas vazias
    }
}

// Função para adicionar um carro a uma vaga
function adicionarCarro() {
    const modelo = prompt('Digite o modelo do carro:'); // Pede o modelo do carro
    if (modelo) {
        const vagaVaziaIndex = vagas.findIndex(vaga => vaga === null); // Encontra a primeira vaga vazia
        if (vagaVaziaIndex !== -1) {
            vagas[vagaVaziaIndex] = { modelo, tempo: 0, valor: 0 }; // Adiciona o carro à vaga vazia
            iniciarTemporizador(vagaVaziaIndex); // Inicia o temporizador para a vaga
            exibirVagas(); // Atualiza a exibição das vagas
        } else {
            alert('Não há vagas disponíveis para estacionar o carro.'); // Mostra uma mensagem se não houver vagas disponíveis
        }
    }
}

// Função para iniciar o temporizador de uma vaga
function iniciarTemporizador(index) {
    temporizadores[index] = setInterval(() => {
        vagas[index].tempo += 5; // Atualiza o tempo a cada 5 segundos
        vagas[index].valor += 2; // Atualiza o valor a cada 5 segundos
        exibirVagas(); // Atualiza a exibição das vagas
    }, 5000); // A cada 5 segundos (5000 milissegundos)
}

// Função para cancelar o temporizador de uma vaga
function cancelarTemporizador(index) {
    clearInterval(temporizadores[index]); // Cancela o temporizador
    delete temporizadores[index]; // Remove o temporizador do objeto
}

// Função para remover um carro de uma vaga
function removerCarro(index) {
    const valor = vagas[index].valor; // Obtém o valor acumulado da vaga
    totalDia += valor; // Adiciona o valor ao total do dia
    vagas[index] = { pagamento: valor }; // Armazena o valor do pagamento na vaga
    cancelarTemporizador(index); // Cancela o temporizador da vaga
    exibirVagas(); // Atualiza a exibição das vagas
    setTimeout(() => {
        vagas[index] = null; // Define a vaga como vazia após 3 segundos
        exibirVagas(); // Atualiza a exibição das vagas
    }, 3000); // 3 segundos (3000 milissegundos)
}

// Função para calcular e exibir o valor total do caixa no dia
function calcularCaixa() {
    document.getElementById('caixa').innerText = `Total do Dia: R$ ${totalDia}`;
}

// Função para exibir as vagas no elemento HTML com id 'vagas-container'
function exibirVagas() {
    const vagasContainer = document.getElementById('vagas-container');
    vagasContainer.innerHTML = ''; // Limpa o conteúdo atual
    vagas.forEach((vaga, index) => {
        const div = document.createElement('div'); // Cria um novo div para cada vaga
        div.classList.add('vaga'); // Adiciona a classe 'vaga' ao div
        if (vaga) {
            if (vaga.pagamento !== undefined) {
                div.innerHTML = `<strong>Valor a pagar:</strong> R$ ${vaga.pagamento}`; // Exibe o valor a pagar
            } else {
                div.innerHTML = `
                    <div class="carro-info">
                        <strong>Modelo:</strong> ${vaga.modelo}<br>
                        <strong>Tempo:</strong> ${vaga.tempo} segundos<br>
                        <strong>Valor:</strong> R$ ${vaga.valor}
                    </div>
                    <button class="remover-carro-btn" onclick="removerCarro(${index})">Remover Carro</button>
                `; // Exibe as informações do carro e o botão para remover o carro
            }
        } else {
            div.textContent = 'Vazia'; // Exibe 'Vazia' se a vaga estiver vazia
        }
        vagasContainer.appendChild(div); // Adiciona o div ao contêiner de vagas
    });

    calcularCaixa(); // Atualiza o valor do caixa sempre que as vagas são exibidas
}

exibirVagas(); // Exibe as vagas inicialmente
