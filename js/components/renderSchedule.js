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
    html += '<div class="schedule-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr)); gap: 1rem; margin-top: 1rem;">';

    data.forEach((item) => {
        const time = item.Time || item.time || '';
        const program = item.Program || item.program || item.Title || '';
        const speaker = item.Speaker || item.speaker || item.Leader || '';

        html += `
            <div class="card" style="margin-bottom: 0; padding: 1rem; border-left: 4px solid var(--accent);">
                <div style="font-weight: 700; color: var(--primary); margin-bottom: 0.25rem;">${time}</div>
                <div style="font-weight: 500; font-size: 1.1rem; margin-bottom: 0.5rem;">${program}</div>
                <div style="font-size: 0.9rem; color: #666;">${speaker}</div>
            </div>
        `;
    });

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
