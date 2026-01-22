export const SHEET_URLS = {
    general: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=2118403729&single=true&output=csv',
    about: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=1587976413&single=true&output=csv',
    ministries: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=0&single=true&output=csv',
    sermons: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=708079300&single=true&output=csv',
    schedule: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=786496350&single=true&output=csv'
};

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
