// Integration proposal only: not deployed. Do not replace doPost.
// Add this branch to the START of your EXISTING doGet(e):
// if (e && e.parameter && e.parameter.action === 'guest') return guestLookupResponse(e);
// If there is no doGet, create it with that branch and a generic unsupported response.
function guestLookupResponse(e) {
  var output = { success: false };
  try {
    var ids = e.parameters && e.parameters.id;
    var id = e.parameter.id || '';
    if (!ids || ids.length !== 1 || !/^[0-9a-f]{48}$/.test(id)) return guestLookupJson_(output);
    var spreadsheetId = PropertiesService.getScriptProperties().getProperty('GUEST_SPREADSHEET_ID');
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('Invitados');
    var rows = sheet.getDataRange().getDisplayValues();
    var header = rows.shift();
    var idColumn = header.indexOf('id'), nameColumn = header.indexOf('displayName'), activeColumn = header.indexOf('active');
    if (idColumn < 0 || nameColumn < 0 || activeColumn < 0) return guestLookupJson_(output);
    var matches = rows.filter(function(row) { return row[idColumn] === id; });
    if (matches.length === 1 && matches[0][activeColumn].toUpperCase() === 'TRUE') {
      var name = matches[0][nameColumn].trim();
      if (name && name.length <= 120) output = { success: true, guest: { id: id, displayName: name } };
    }
  } catch (error) {
    // Do not return sheet contents, configuration or stack traces.
  }
  return guestLookupJson_(output);
}
function guestLookupJson_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
