/**
 * Gepard Trans Logistics — contact form → Google Sheets (GOOGLE_SCRIPT_URL)
 *
 * This is the script behind GOOGLE_SCRIPT_URL in the Next.js app's .env.local:
 * an Apps Script deployed as a web app. The app POSTs each submission to its
 * /exec URL and this script appends a row to the matching tab — Drivers /
 * Partners / Customers (tabs are created + formatted on first submit).
 *
 * ── SETUP ──────────────────────────────────────────────────────────────
 * 1. Open the client's Google Sheet → Extensions → Apps Script.
 * 2. Replace the default Code.gs with this file, save.
 * 3. Deploy → New deployment → type "Web app":
 *      Execute as:      Me
 *      Who has access:  Anyone
 *    Copy the /exec URL into .env.local as GOOGLE_SCRIPT_URL=... and
 *    restart the Next.js server.
 * 4. After editing this script: Deploy → Manage deployments → ✏️ →
 *    New version → Deploy (otherwise the /exec URL keeps the old code).
 * 5. Test: GET the /exec URL in a browser — it should reply {"ok":true,…}.
 * ───────────────────────────────────────────────────────────────────────
 */

/** Optional: leave "" when the script is bound to the sheet
 *  (Extensions → Apps Script from inside the spreadsheet). Otherwise set
 *  the spreadsheet ID from its URL. */
var SHEET_ID = "";

var TABS = { driver: "Drivers", partner: "Partners", customer: "Customers" };
var HEADERS = ["Timestamp", "First name", "Last name", "Phone", "Message", "SMS consent"];
var COL_WIDTHS = { "Timestamp": 150, "First name": 110, "Last name": 110, "Phone": 140, "Message": 360, "SMS consent": 110 };
var HEADER_BG = "#cb0201"; // Gepard red
var HEADER_FG = "#ffffff";
var TIMESTAMP_FORMAT = "yyyy-mm-dd hh:mm";
var MAX_MESSAGE = 2000;
var CHARS_PER_LINE = 55; // approx for the 360px Message column at 10pt
var MAX_ROW_HEIGHT = 300;

function doGet() {
  return json_({ ok: true, script: "gepard-trans contact intake", tabs: Object.keys(TABS).map(function (r) { return TABS[r]; }) });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    var tab = TABS[data.role];
    if (!tab) return json_({ ok: false, error: "Unknown role" });

    if (!lock.tryLock(30000)) return json_({ ok: false, error: "Busy, retry" });
    try {
      appendRow_(tab, data);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function appendRow_(tabName, data) {
  var sheet = getTab_(tabName);
  ensureHeader_(sheet);

  var message = String(data.message || "").slice(0, MAX_MESSAGE);
  sheet.appendRow([
    new Date(),
    String(data.firstName || "").slice(0, 100),
    String(data.lastName || "").slice(0, 100),
    String(data.phone || "").slice(0, 40),
    message,
    data.smsConsent ? "Yes" : "No",
  ]);

  var row = sheet.getLastRow();
  sheet.setRowHeight(row, estimateRowHeight_(message));
}

function getTab_(name) {
  var ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(name) || createTab_(ss, name);
}

/** Guarantee the styled header band is row 1 — even on tabs that already
 *  existed without one (created manually, or by an older script version).
 *  If data is present but headers are missing, insert a row so existing
 *  entries are pushed below the header instead of overwritten. */
function ensureHeader_(sheet) {
  var first = sheet.getLastRow() >= 1
    ? sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0]
    : [];
  var headerOk = HEADERS.every(function (h, i) { return first[i] === h; });
  if (headerOk) return;
  if (sheet.getLastRow() >= 1) sheet.insertRowBefore(1);
  styleHeader_(sheet);
}

function styleHeader_(sheet) {
  var nCols = HEADERS.length;

  // Header band — bold white on Gepard red, frozen.
  sheet.getRange(1, 1, 1, nCols)
    .setValues([HEADERS])
    .setFontWeight("bold")
    .setFontColor(HEADER_FG)
    .setBackground(HEADER_BG)
    .setVerticalAlignment("middle");
  sheet.setFrozenRows(1);

  // Sensible widths.
  HEADERS.forEach(function (h, i) {
    sheet.setColumnWidth(i + 1, COL_WIDTHS[h] || 140);
  });

  // Wrap the data area so long messages wrap instead of spilling/clipping.
  sheet.getRange(2, 1, sheet.getMaxRows() - 1, nCols)
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
    .setVerticalAlignment("top");

  // Human-readable timestamps.
  sheet.getRange(2, 1, sheet.getMaxRows() - 1, 1).setNumberFormat(TIMESTAMP_FORMAT);
}

function createTab_(ss, name) {
  var sheet = ss.insertSheet(name);
  styleHeader_(sheet);
  return sheet;
}

/** Row height so wrapped messages are fully visible (Sheets won't auto-grow
 *  rows written by a script). Caps at MAX_ROW_HEIGHT to resist spam. */
function estimateRowHeight_(message) {
  if (!message) return 21;
  var lines = message.split("\n").reduce(function (n, seg) {
    return n + Math.max(1, Math.ceil((seg.length || 1) / CHARS_PER_LINE));
  }, 0);
  return Math.min(MAX_ROW_HEIGHT, Math.max(21, lines * 21 + 2));
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
