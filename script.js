// Array que armazena as vagas do estacionamento
let vagas = [];

// Objeto que armazena os temporizadores associados às vagas
let temporizadores = {};

// Função para adicionar uma nova vaga ao estacionamento
function adicionarVaga() {
    vagas.push(null); // Adiciona uma vaga vazia (representada por null)
    exibirVagas(); // Atualiza a exibição das vagas
}

// Função para remover uma vaga vazia do estacionamento
function removerVaga() {
    const vagaVaziaIndex = vagas.findIndex(vaga => vaga === null); // Encontra o índice da primeira vaga vazia
    if (vagaVaziaIndex !== -1) {
        cancelarTemporizador(vagaVaziaIndex); // Cancela o temporizador associado à vaga (se existir)
        vagas.splice(vagaVaziaIndex, 1); // Remove a vaga do array
        exibirVagas(); // Atualiza a exibição das vagas
    } else {
        alert('Não há vagas vazias para remover.'); // Alerta se não houver vagas vazias
    }
}

// Função para adicionar um carro a uma vaga vazia
function adicionarCarro() {
    const modelo = prompt('Digite o modelo do carro:'); // Solicita ao usuário o modelo do carro
    if (modelo) {
        const vagaVaziaIndex = vagas.findIndex(vaga => vaga === null); // Encontra o índice da primeira vaga vazia
        if (vagaVaziaIndex !== -1) {
            // Adiciona o carro à vaga, iniciando o tempo e o valor em 0
            vagas[vagaVaziaIndex] = { modelo, tempo: 0, valor: 0 };
            iniciarTemporizador(vagaVaziaIndex); // Inicia o temporizador para a vaga
            exibirVagas(); // Atualiza a exibição das vagas
        } else {
            alert('Não há vagas disponíveis para estacionar o carro.'); // Alerta se não houver vagas disponíveis
        }
    }
}

// Função para iniciar o temporizador que calcula o valor a ser pago pelo estacionamento
function iniciarTemporizador(index) {
    temporizadores[index] = setInterval(() => {
        vagas[index].tempo += 10; // Incrementa o tempo em 10 segundos
        vagas[index].valor += 2; // Incrementa o valor em 2 reais
        exibirVagas(); // Atualiza a exibição das vagas
    }, 10000); // Define o intervalo de tempo para 10 segundos (10000 milissegundos)
}

// Função para cancelar o temporizador associado a uma vaga
function cancelarTemporizador(index) {
    clearInterval(temporizadores[index]); // Cancela o temporizador
    delete temporizadores[index]; // Remove o temporizador do objeto
}

// Função para remover um carro de uma vaga e calcular o valor a ser pago
function removerCarro(index) {
    const valor = vagas[index].valor; // Obtém o valor a ser pago
    vagas[index] = { pagamento: valor }; // Armazena o valor do pagamento na vaga
    cancelarTemporizador(index); // Cancela o temporizador associado à vaga
    exibirVagas(); // Atualiza a exibição das vagas
    setTimeout(() => {
        vagas[index] = null; // Define a vaga como vazia após 3 segundos
        exibirVagas(); // Atualiza a exibição das vagas
    }, 3000); // Define o tempo de espera para 3 segundos (3000 milissegundos)
}

// Função para exibir as vagas no contêiner HTML
function exibirVagas() {
    const vagasContainer = document.getElementById('vagas-container'); // Obtém o contêiner de vagas do DOM
    vagasContainer.innerHTML = ''; // Limpa o conteúdo do contêiner
    vagas.forEach((vaga, index) => {
        const div = document.createElement('div'); // Cria um novo elemento div para a vaga
        div.classList.add('vaga'); // Adiciona a classe 'vaga' ao elemento div
        if (vaga) {
            if (vaga.pagamento !== undefined) {
                // Se o pagamento estiver definido, exibe o valor a ser pago
                div.innerHTML = `<strong>Valor a pagar:</strong> R$ ${vaga.pagamento}`;
            } else {
                // Se o carro estiver na vaga, exibe as informações do carro e o botão de remover
                div.innerHTML = `
                    <div class="carro-info">
                        <strong>Modelo:</strong> ${vaga.modelo}<br>
                        <strong>Tempo:</strong> ${vaga.tempo} segundos<br>
                        <strong>Valor:</strong> R$ ${vaga.valor}
                    </div>
                    <button class="remover-carro-btn" onclick="removerCarro(${index})">Remover Carro</button>
                `;
            }
        } else {
            div.textContent = 'Vazia'; // Exibe 'Vazia' se a vaga estiver vazia
        }
        vagasContainer.appendChild(div); // Adiciona o elemento div ao contêiner de vagas
    });
}

exibirVagas(); // Chama a função para exibir as vagas inicialmente
