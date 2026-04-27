/**
 * Admin Configuration Endpoint
 * Returns sheet IDs and GIDs for authenticated staff
 */
exports.handler = async (event, context) => {
    // Only authenticated users can access
    if (!context.clientContext?.user) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Unauthorized' })
        };
    }

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
        },
        body: JSON.stringify({
            sheetId: process.env.GOOGLE_SHEET_ID,
            gids: {
                general: process.env.SHEET_GID_GENERAL,
                about: process.env.SHEET_GID_ABOUT,
                ministries: process.env.SHEET_GID_MINISTRIES,
                schedule: process.env.SHEET_GID_SCHEDULE,
                events: process.env.SHEET_GID_EVENTS,
                sermons: process.env.SHEET_GID_SERMONS
            }
        })
    };
};
