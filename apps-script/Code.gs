/**
 * Google Apps Script — KMJ Registration Backend
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet with these column headers in Row 1:
 *    Timestamp | Organization | Name | Phone | Email | Address | PIN | Members | Attendance
 *
 * 2. Open Extensions → Apps Script
 * 3. Paste this entire code into Code.gs
 * 4. Replace SHEET_NAME with your sheet tab name (default: "Registrations")
 * 5. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL and set it as NEXT_PUBLIC_APPS_SCRIPT_URL in .env.local
 */

function doPost(e) {
  try {
    var SHEET_NAME = "Registrations";
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({ status: "error", message: "Sheet not found" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);

    var row = [
      new Date(),
      data.organization || "",
      data.name || "",
      data.phone || "",
      data.email || "",
      data.address || "",
      data.pin || "",
      data.members || "",
      data.attendance || "",
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "KMJ Registration API is running" })
  ).setMimeType(ContentService.MimeType.JSON);
}
