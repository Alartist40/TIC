export function renderSchedule(data) {
    const visitSection = document.getElementById('visit');
    if (!visitSection) return;

    // Remove existing schedule if present
    const existingSchedule = document.getElementById('weekly-schedule');
    if (existingSchedule) existingSchedule.remove();

    // Create schedule card
    const scheduleCard = document.createElement('div');
    scheduleCard.id = 'weekly-schedule';
    scheduleCard.className = 'card';

    let html = '<h3>Weekly Service Schedule</h3>';
    html += '<div class="table-wrapper">';
    html += '<table class="service-table">';
    html += '<thead><tr>';
    html += '<th>Time</th>';
    html += '<th>Program</th>';
    html += '<th>Speaker/Leader</th>';
    html += '</tr></thead>';
    html += '<tbody>';

    data.forEach((item) => {
        const time = item.Time || item.time || '';
        const program = item.Program || item.program || item.Title || '';
        const speaker = item.Speaker || item.speaker || item.Leader || '';

        html += `<tr>`;
        html += `<td style="font-weight: 600;">${time}</td>`;
        html += `<td>${program}</td>`;
        html += `<td style="color: var(--accent);">${speaker}</td>`;
        html += '</tr>';
    });

    html += '</tbody></table>';
    html += '</div>';

    scheduleCard.innerHTML = html;

    // Insert before service times card if it exists, otherwise at the top
    const serviceTimesCard = document.getElementById('service-times');
    if (serviceTimesCard) {
        visitSection.insertBefore(scheduleCard, serviceTimesCard);
    } else {
        visitSection.insertBefore(scheduleCard, visitSection.firstChild.nextSibling);
    }
}
