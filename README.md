<h1>How use Google Sheet</h1>
First go to this website <a href="https://docs.google.com/spreadsheets">Google sheet</a>
Then login if you are not , then create new document and enter your data title in the columns like this :
<img src="/src/assets/image.png" />

then click in Extensions > Apps scripts and replace this code :
```
function myFunction() {

}
```

by this :
```
function doPost(e) {
  const sheet = SpreadsheetApp.openByUrl('your google sheet link').getActiveSheet();
  const data = e.parameter;
  sheet.appendRow([data.Name, data.Price, data.Description,data.Image]);
  return ContentService.createTextOutput(JSON.stringify({ 'result': 'success', 'msg': 'Data submitted successfully' })).setMimeType(ContentService.MimeType.JSON);
}
```
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
```
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
```
 
code of delete :
```
function doPost(e) {
  const sheet = SpreadsheetApp.openByUrl('google sheet link').getActiveSheet();
  const data = e.parameter;

    const range = sheet.getRange('B:B'); // Assuming dates are in column B
    const values = range.getValues();
    let rowToDelete = -1;

    for (let i = 0; i < values.length; i++) {
      if (values[i][0] == data.date) { // Compare the date in column B
        rowToDelete = i + 1; // Rows are 1-indexed
        break;
      }
    }

    if (rowToDelete > 0) {
      sheet.deleteRow(rowToDelete);
      return ContentService.createTextOutput(
        JSON.stringify({ result: 'success', msg: 'Row deleted successfully' })
      ).setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(
        JSON.stringify({ result: 'error', msg: 'Row not found for the given date' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
}

```

code of update :
```
function doPost(e) {
  const sheet = SpreadsheetApp.openByUrl('google sheet link').getActiveSheet();
  
  if (!e.parameter) {
    return ContentService.createTextOutput(JSON.stringify({ 
      'result': 'error', 
      'msg': 'No data provided' 
    })).setMimeType(ContentService.MimeType.JSON);
  }

  const data = e.parameter;

  const values = sheet.getDataRange().getValues();
  const testRowIndex = values.findIndex(row => row[0] == data.id);
  
  if (testRowIndex === -1) {
    return ContentService.createTextOutput(JSON.stringify({ 
      'result': 'error', 
      'msg': 'غير موجود' 
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    // تحقق من عدد الأعمدة المتاحة
    const columnsCount = sheet.getLastColumn();
    
    // تحديث البيانات، مع التأكد من أن عدد القيم يطابق عدد الأعمدة
    const updatedRow = [
      data.id || "",
      data.patient || "",
      data.result || "",
      data.date || "",
      data.image
    ];

    sheet.getRange(testRowIndex + 1, 1, 1, updatedRow.length).setValues([updatedRow]);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      'result': 'success', 
      'msg': 'تم الحفظ بنجاح' 
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      'result': 'error', 
      'msg': 'فشل الحفظ ' + error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

```


then use same steps to get api of each one and paste it in ProductsPage component


<h1 id="link">What is google sheet Link ?</h1>
<img src="/src/assets/gsl.png" />

<h1>Final result in Apps scripts</h1>
<img src="/src/assets/fr.png" />
