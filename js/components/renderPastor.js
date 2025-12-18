export function renderPastor(data, container) {
    if (!container || !data) return;

    container.innerHTML = `
        <div class="card pastor-card">
            <div class="pastor-square">
                <img src="${data.image}" alt="${data.name}">
            </div>
            <div class="pastor-info">
                <h3>Our Pastor</h3>
                <h4>${data.name}</h4>
                <p>${data.bio || ''}</p>
            </div>
        </div>
    `;
}
