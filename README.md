<h1>How use Google Sheet</h1>
First go to this website <a href="https://docs.google.com/spreadsheets">Google sheet</a>
Then login if you are not , then create new document and enter your data title in the columns like this :
<img src="/src/assets/image.png" />

then click in Extensions > Apps scripts and replace this code :
<code>
function myFunction() {

}
</code>

by this :
<code>
function doPost(e) {
  const sheet = SpreadsheetApp.openByUrl('your google sheet link').getActiveSheet();
  const data = e.parameter;
  sheet.appendRow([data.Name, data.Price, data.Description,data.Image]);
  return ContentService.createTextOutput(JSON.stringify({ 'result': 'success', 'msg': 'Data submitted successfully' })).setMimeType(ContentService.MimeType.JSON);
}
</code>
replace "your google sheet link" with your <a href="#link">google sheet link</a> then click ctrl+s to save
this code is for add product , and to add product in your website you need an api 
<h1>How get Api ?</h1>
in the page of app scripts click in deployer > nouveux deploiment
change info like this :

Application Web
Exécuter en tant que Moi (your mail)

Qui a accès
Tout le monde

then click deployer

coper your web url and paste it in the page of add priduct in api fetch 


<h1>How Get or delete ?</h1>

in the page of apps scripts add new fichiers one for get and one for delete and paste this codes

code of get :
<code>
function doGet(e) {
  const sheet = SpreadsheetApp.openByUrl('your google sheet link').getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // Exclude header row
  const products = data.slice(1).map(row => ({
    Name: row[0],
    Price: row[1],
    Description: row[2],
    Image: row[3],
    RowNumber: row[4] // Store the row number for deletion purposes
  }));
  
  return ContentService.createTextOutput(JSON.stringify(products)).setMimeType(ContentService.MimeType.JSON);
}
</code>
 
code of delete :
<code>
function doPost(e) {
  const sheet = SpreadsheetApp.openByUrl('your google sheet link').getActiveSheet();
  const data = e.parameter;

  if (data.action === "delete" && data.Name) {
    const range = sheet.getRange('A:A'); // Assuming names are in column A
    const values = range.getValues();
    let rowToDelete = -1;

    for (let i = 0; i < values.length; i++) {
      if (values[i][0] === data.Name) {
        rowToDelete = i + 1; // Rows are 1-indexed
        break;
      }
    }

    if (rowToDelete > 0) {
      sheet.deleteRow(rowToDelete);
      return ContentService.createTextOutput(JSON.stringify({ 'result': 'success', 'msg': 'Product deleted successfully' })).setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'msg': 'Product not found' })).setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'msg': 'Invalid parameters' })).setMimeType(ContentService.MimeType.JSON);
}

</code>


then use same steps to get api of each one and paste it in ProductsPage component


<h1 id="link">What is google sheet Link ?</h1>
<img src="/src/assets/gsl.png" />

<h1>Final result in Apps scripts</h1>
<img src="/src/assets/fr.png" />