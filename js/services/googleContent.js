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
