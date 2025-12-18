export function renderSchedule(data, container) {
    if (!container || !data) return;

    let html = `
        <div class="card">
            <h3>Service Times</h3>
            <div style="overflow-x: auto;">
                <table class="service-table">
                    <thead>
                        <tr>
                            <th>Program</th>
                            <th>Time</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    data.forEach(item => {
        if (item.Program && item.Time) {
            html += `
                <tr>
                    <td>${item.Program}</td>
                    <td>${item.Time}</td>
                    <td>${item.Location || ''}</td>
                </tr>
            `;
        }
    });

    html += `
                    </tbody>
                </table>
            </div>
        </div>
    `;

    container.innerHTML = html;
}
