const SHEET_ID = '17POGMQ8b4M9mo9R948tlTJHoDOKFtI6j1vRR4u-iiJM';
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const name = (e.parameter.name || '').trim();
    const people = parseInt(e.parameter.people, 10);

    if (!name) {
      return jsonResponse({ status: 'error', message: 'Name is required.' });
    }

    if (!Number.isInteger(people) || people < 1) {
      return jsonResponse({ status: 'error', message: 'Invalid people count.' });
    }

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      return jsonResponse({ status: 'error', message: 'Sheet1 not found.' });
    }

    sheet.appendRow([name, people]);

    return jsonResponse({ status: 'success' });
  } catch (error) {
    return jsonResponse({ status: 'error', message: String(error) });
  }
}

function doGet() {
  return jsonResponse({ status: 'ok', message: 'RSVP endpoint is running.' });
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
