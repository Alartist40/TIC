
// Service to handle Google Sheets CSV fetching
// Using 'Publish to Web' CSV format

export async function fetchGoogleSheetData(sheetUrl) {
    return new Promise((resolve, reject) => {
        Papa.parse(sheetUrl, {
            download: true,
            header: true,
            complete: (results) => {
                resolve(results.data);
            },
            error: (error) => {
                reject(error);
            }
        });
    });
}
