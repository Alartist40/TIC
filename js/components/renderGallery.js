export function renderGallery(data, container) {
    if (!container || !data) return;

    container.innerHTML = '';

    data.forEach(item => {
        if (item.Title) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${item.Title}</h3>
                <p>${item.Description || ''}</p>
            `;
            container.appendChild(card);
        }
    });
}
