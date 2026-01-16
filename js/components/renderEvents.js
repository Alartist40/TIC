export function renderEvents(data, container) {
    if (!container || !data) return;

    container.innerHTML = '';

    data.forEach(item => {
        if (item.Title) {
            const card = document.createElement('div');
            card.className = 'card event-card';
            card.innerHTML = `
                <div class="event-card-image-container">
                    <img src="${item.Image || 'images/event_placeholder.webp'}" alt="${item.Title}" class="event-card-image">
                </div>
                <div class="event-card-content">
                    <h3>${item.Title}</h3>
                    <p>${item.Description || ''}</p>
                </div>
            `;
            container.appendChild(card);
        }
    });
}
