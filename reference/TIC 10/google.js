// Code.gs - Deploy as Web App
function doGet() {
  const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  const events = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][4] === 'Active') { // Status column
      const event = {};
      for (let j = 0; j < headers.length; j++) {
        event[headers[j]] = data[i][j];
      }
      events.push(event);
    }
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({events: events}))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({'Access-Control-Allow-Origin': '*'});
}