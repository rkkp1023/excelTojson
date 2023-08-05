# excelTojson
Converting or replacing the JSON value from the column value in the excel sheet can be done using this software/tool.

# How to run this project?
1. Clone the project into your desktop.
2. Run `npm install` to install all the required dependencies.
3. Run `npm start` After a few minutes this will run the project on `http://localhost:4200`.
4. when you run on the given host then you will see this screen.
<img width="1728" alt="image" src="https://github.com/rkkp1023/excelTojson/assets/29485284/0ce4ecf6-ec42-4ab1-82cc-642712b2c849">


# Example 
Converting/translating the JSON value into the language set that you have in Excel.

Let's say I have the Below JSON Key-Value pair and I want to convert the values to France/Spanish or another language.
Follow the Below steps:-
1. Copy the below JSON and paste this into the `assets/en.json` file.
```
{
  "title": "Title",
  "name": "Name",
  "address": "Address",
  "landmark": "LandMark",
  "details": "Details",
  "description": "Description"
}
```
2. Sheets should be in this format.
<img width="501" alt="image" src="https://github.com/rkkp1023/excelTojson/assets/29485284/2a0b9b33-7665-43c7-af28-7cd40592d8d1">

3. Upload the sheet by clicking on the `Select File` button.
4. The JSON output will be downloaded automatically.
   
Below is the Sample output JSON.
```
{
  "title": "France Title",
  "name": "France Name",
  "address": "Address ",
  "landmark": "France LandMark",
  "details": "France Details",
  "description": "description"
}
```
