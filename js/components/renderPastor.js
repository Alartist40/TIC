/* renderPastor.js - Adapted for TIC 12 Styles */
export function renderPastor(data, container) {
    if (!container || !data) return;

    const name = data.PastorName || "Pastor Name";
    const bio = data.PastorBio || "Pastor bio loading...";
    // Use the local image if no URL provided in data
    let imgUrl = data.PastorImage || "images/pastor_profile_pic.webp";

    if (imgUrl.includes('drive.google.com')) {
        const idMatch = imgUrl.match(/d\/([^/]+)/);
        if (idMatch) {
            imgUrl = `https://lh3.googleusercontent.com/d/${idMatch[1]}=w1000`;
        }
    }

    // Using TIC 12 HTML Structure for Pastor
    container.innerHTML = `
        <div class="card about-card">
            <h3>Our Church Pastor</h3>
            
            <div class="pastor-verse-row">
                <div class="pastor-square">
                    <img src="${imgUrl}" alt="${name}">
                </div>
                
                <div class="verse-box">
                    <p class="verse">
                        "For as the rain comes down, and the snow from heaven... So shall My word be that goes forth from My mouth..."
                    </p>
                    <span class="ref">— Isaiah 55:10-11</span>
                </div>
            </div>
            
            <div class="pastor-info">
                <h4>${name}</h4>
                <p>${bio}</p>
            </div>
        </div>
    `;
}
