let vagas = [];
let temporizadores = {};

function adicionarVaga() {
    vagas.push(null); // Adiciona uma vaga vazia
    exibirVagas();
}

function removerVaga() {
    const vagaVaziaIndex = vagas.findIndex(vaga => vaga === null);
    if (vagaVaziaIndex !== -1) {
        cancelarTemporizador(vagaVaziaIndex);
        vagas.splice(vagaVaziaIndex, 1); // Remove a vaga vazia
        exibirVagas();
    } else {
        alert('Não há vagas vazias para remover.');
    }
}

function adicionarCarro() {
    const modelo = prompt('Digite o modelo do carro:');
    if (modelo) {
        const vagaVaziaIndex = vagas.findIndex(vaga => vaga === null);
        if (vagaVaziaIndex !== -1) {
            vagas[vagaVaziaIndex] = { modelo, tempo: 0, valor: 0 }; // Adiciona o carro à vaga vazia
            iniciarTemporizador(vagaVaziaIndex);
            exibirVagas();
        } else {
            alert('Não há vagas disponíveis para estacionar o carro.');
        }
    }
}

function iniciarTemporizador(index) {
    temporizadores[index] = setInterval(() => {
        vagas[index].tempo += 10;
        vagas[index].valor += 2;
        exibirVagas();
    }, 10000); // A cada 10 segundos (10000 milissegundos)
}

function cancelarTemporizador(index) {
    clearInterval(temporizadores[index]);
    delete temporizadores[index];
}

function removerCarro(index) {
    const valor = vagas[index].valor;
    vagas[index] = { pagamento: valor }; // Armazena o valor do pagamento na vaga
    cancelarTemporizador(index);
    exibirVagas();
    setTimeout(() => {
        vagas[index] = null; // Define a vaga como vazia após 3 segundos
        exibirVagas();
    }, 3000); // 3 segundos (3000 milissegundos)
}

function exibirVagas() {
    const vagasContainer = document.getElementById('vagas-container');
    vagasContainer.innerHTML = '';
    vagas.forEach((vaga, index) => {
        const div = document.createElement('div');
        div.classList.add('vaga');
        if (vaga) {
            if (vaga.pagamento !== undefined) {
                div.innerHTML = `<strong>Valor a pagar:</strong> R$ ${vaga.pagamento}`;
            } else {
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
            div.textContent = 'Vazia';
        }
        vagasContainer.appendChild(div);
    });
}

exibirVagas(); // Exibe as vagas inicialmente
