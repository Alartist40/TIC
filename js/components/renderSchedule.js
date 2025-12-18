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
    html += '<div class="schedule-table">';
    html += '<table style="width:100%; border-collapse: collapse;">';
    html += '<thead><tr style="border-bottom: 2px solid var(--divider);">';
    html += '<th style="padding: 0.75rem; text-align: left;">Time</th>';
    html += '<th style="padding: 0.75rem; text-align: left;">Program</th>';
    html += '<th style="padding: 0.75rem; text-align: left;">Speaker/Leader</th>';
    html += '</tr></thead>';
    html += '<tbody>';

    data.forEach((item, index) => {
        const time = item.Time || item.time || '';
        const program = item.Program || item.program || item.Title || '';
        const speaker = item.Speaker || item.speaker || item.Leader || '';

        const rowStyle = index % 2 === 0 ? 'background: rgba(0,0,0,0.02);' : '';
        html += `<tr style="${rowStyle}">`;
        html += `<td style="padding: 0.75rem; font-weight: 600;">${time}</td>`;
        html += `<td style="padding: 0.75rem;">${program}</td>`;
        html += `<td style="padding: 0.75rem; color: var(--accent);">${speaker}</td>`;
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
