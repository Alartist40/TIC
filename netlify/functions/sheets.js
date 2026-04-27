/**
 * Secure Google Sheets CSV Fetcher
 *
 * Purpose: Proxy requests to Google Sheets CSV export
 * Credentials are stored in Netlify environment variables (NOT in code)
 * This prevents API key exposure in GitHub
 *
 * Usage: Client calls /api/sheets?type=general (not the Google URL directly)
 */

exports.handler = async (event) => {
    try {
        // Get sheet type from query parameter
        const type = event.queryStringParameters?.type;

        if (!type) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing sheet type parameter' })
            };
        }

        // Get credentials from Netlify environment variables
        const sheetId = process.env.GOOGLE_SHEET_ID;
        const gidMap = {
            general: process.env.SHEET_GID_GENERAL,
            about: process.env.SHEET_GID_ABOUT,
            ministries: process.env.SHEET_GID_MINISTRIES,
            schedule: process.env.SHEET_GID_SCHEDULE,
            events: process.env.SHEET_GID_EVENTS,
            sermons: process.env.SHEET_GID_SERMONS
        };

        const gid = gidMap[type];

        if (!gid || !sheetId) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Configuration missing' })
            };
        }

        // Construct Google Sheets CSV export URL
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;

        // Fetch from Google
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Google Sheets returned ${response.status}`);
        }

        const csv = await response.text();

        // Return CSV with proper caching headers
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Cache-Control': 'public, max-age=300, stale-while-revalidate=600'
            },
            body: csv
        };

    } catch (error) {
        console.error('Error fetching sheet:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch sheet data' })
        };
    }
};
