/* renderGallery.js - With Truncation */
export function renderGallery(items, container, type = 'ministry') {
    if (!container) return;
    container.innerHTML = '';

    if (!items || items.length === 0) {
        container.innerHTML = '<p>No content available.</p>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card fade-in';

        let imageUrl = item.image || item.ImageLink || item.DriveLink || '';
        if (imageUrl.includes('drive.google.com')) {
            const idMatch = imageUrl.match(/d\/([^/]+)/);
            if (idMatch) {
                imageUrl = `https://lh3.googleusercontent.com/d/${idMatch[1]}=w1000`;
            }
        }

        const title = item.title || item.Title || item.EventName || 'Untitled';
        const desc = item.description || item.Description || item.Date || '';

        // Truncation Logic
        const isLongText = desc.length > 150;
        const shortDesc = isLongText ? desc.substring(0, 150) + "..." : desc;

        let imgHTML = imageUrl ? `<div class="card-image" style="background-image: url('${imageUrl}'); height: 200px; background-size: cover; background-position: center; border-radius: 4px; margin-bottom: 1rem;"></div>` : '';

        card.innerHTML = `
            ${imgHTML}
            <h3>${title}</h3>
            <p class="${isLongText ? 'text-truncate' : ''}">${shortDesc}</p>
            ${isLongText ? `<button class="more-btn" onclick="alert('${desc.replace(/'/g, "\\'")}')">Read More</button>` : ''}
        `;

        container.appendChild(card);
    });
}
