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
  const sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1jAV8-JOHWKBApxn7Obcd6Jgrf9rKQeousxbGZKD68rY/edit?gid=0#gid=0').getActiveSheet();
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
  
  // Validate request body
  if (!e.parameter) {
    return ContentService.createTextOutput(JSON.stringify({ 
      'result': 'error', 
      'msg': 'No data provided' 
    })).setMimeType(ContentService.MimeType.JSON);
  }

  const data = e.parameter;
  
  // Validate required fields
  if (!data.Phone || !data.Name) {
    return ContentService.createTextOutput(JSON.stringify({ 
      'result': 'error', 
      'msg': 'Phone and Name are required' 
    })).setMimeType(ContentService.MimeType.JSON);
  }

  // Find the row of the user to update
  const values = sheet.getDataRange().getValues();
  const userRowIndex = values.findIndex(row => row[1] == data.Phone);
  
  if (userRowIndex === -1) {
    return ContentService.createTextOutput(JSON.stringify({ 
      'result': 'error', 
      'msg': 'مستخدم غير موجود' 
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    // Update the user's data
    sheet.getRange(userRowIndex + 1, 1, 1, 7).setValues([[
      data.Name,
      data.Phone,
      data.Password,
      data.Birthday,
      data.SickTitle,
      data.SickDetails,
      data.Sexe
    ]]);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      'result': 'success', 
      'msg': 'تم تحديث المستخدم بنجاح' 
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      'result': 'error', 
      'msg': 'فشل تحديث المستخدم ' + error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```


then use same steps to get api of each one and paste it in ProductsPage component


<h1 id="link">What is google sheet Link ?</h1>
<img src="/src/assets/gsl.png" />

<h1>Final result in Apps scripts</h1>
<img src="/src/assets/fr.png" />
