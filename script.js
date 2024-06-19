const slots = [];

function addSlot() {
    slots.push({ occupied: false, entryTime: null, timerInterval: null, totalDue: 0 });
    renderSlots();
}

function removeSlot() {
    if (slots.length === 0) return;
    const lastSlot = slots[slots.length - 1];
    if (!lastSlot.occupied) {
        slots.pop();
        renderSlots();
    } else {
        alert('Não é possível remover uma vaga ocupada!');
    }
}

function registerEntry(event) {
    event.preventDefault();
    const carPlate = document.getElementById('car-plate').value;
    const carModel = document.getElementById('car-model').value;
    if (!carPlate || !carModel) return;

    const freeSlot = slots.find(slot => !slot.occupied);
    if (!freeSlot) {
        alert('Não há vagas disponíveis');
        return;
    }

    freeSlot.occupied = true;
    freeSlot.carPlate = carPlate;
    freeSlot.carModel = carModel;
    freeSlot.entryTime = new Date();
    freeSlot.totalDue = 0;
    freeSlot.timerInterval = setInterval(() => {
        freeSlot.totalDue += 2; // A cada 10 segundos, soma R$ 2,00
        updateTotalDue();
    }, 10000); // 10 segundos
    renderSlots();
}

function leaveSlot(index) {
    const slot = slots[index];
    clearInterval(slot.timerInterval);
    const currentTime = new Date();
    const timeDiff = Math.abs(currentTime - slot.entryTime);
    const hours = Math.ceil(timeDiff / (1000 * 60 * 60));
    const totalAmountDue = hours * 2;

    slot.occupied = false;
    slot.entryTime = null;
    slot.totalDue = totalAmountDue;
    updateTotalDue();
    renderSlots();
}

function updateTotalDue() {
    const totalDueElement = document.getElementById('total-due');
    totalDueElement.textContent = `R$ ${slots.reduce((total, slot) => total + slot.totalDue, 0).toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateTotalDue();
    renderSlots();
});

function renderSlots() {
    const slotsList = document.getElementById('slots-list');
    slotsList.innerHTML = '';

    slots.forEach((slot, index) => {
        const slotItem = document.createElement('li');
        slotItem.innerHTML = `Vaga ${index + 1} - ${slot.occupied ? `Ocupada - Modelo: ${slot.carModel}, Placa: ${slot.carPlate}` : 'Livre'}`;

        if (slot.occupied) {
            const leaveButton = document.createElement('button');
            leaveButton.innerText = 'Sair';
            leaveButton.onclick = () => leaveSlot(index);
            slotItem.appendChild(leaveButton);
        }

        slotsList.appendChild(slotItem);
    });
}
function resetPayment() {
    const totalDueElement = document.getElementById('total-due');
    totalDueElement.textContent = 'R$ 0,00';
}

