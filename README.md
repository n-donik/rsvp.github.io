# RSVP GitHub Pages App

Simple RSVP website for GitHub Pages that:
- shows an invitation image,
- collects `Name` and `Number of People`,
- sends RSVP data to Google Sheet `Sheet1`.

## Files

- `index.html` – page structure
- `styles.css` – page styling
- `script.js` – form handling and submit logic
- `apps-script/Code.gs` – Google Apps Script backend to write to Google Sheets

## 1) Configure Google Apps Script (backend)

1. Open the target spreadsheet:
	https://docs.google.com/spreadsheets/d/17POGMQ8b4M9mo9R948tlTJHoDOKFtI6j1vRR4u-iiJM/edit?usp=sharing
2. Go to **Extensions → Apps Script**.
3. Replace content with code from `apps-script/Code.gs`.
4. Click **Deploy → New deployment → Web app**.
5. Set:
	- **Execute as**: Me
	- **Who has access**: Anyone
6. Deploy and copy the **Web app URL**.

## 2) Configure frontend endpoint

1. Open `script.js`.
2. Set `WEB_APP_URL` to the Apps Script Web App URL from step 1.

## 3) Add invitation image

Add your invitation image file in project root as:

- `invitation.jpg`

You can also change the image path in `index.html`.

## 4) Publish on GitHub Pages

1. Push this repository to GitHub.
2. In repository **Settings → Pages**:
	- Source: **Deploy from a branch**
	- Branch: `main` (or your branch), folder: `/ (root)`
3. Save and open your Pages URL.

## Notes

- Sheet tab name must be exactly `Sheet1`.
- Header row should be:
  - Column A: `Name`
  - Column B: `Number of People`
