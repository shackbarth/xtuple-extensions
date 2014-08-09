{
  "name": "bi_open",
  "version": "4.6.0",
  "comment": "Business Intelligence",
  "loadOrder": 50,
  "dependencies": [],
  "databaseScripts": [
    "create-bi-open-schema.sql",
    "usrbichart.sql",
    "register.sql"
  ],
  "routes": [
    {
      "path": "queryOlap",
      "filename": "routes/olapdata.js",
      "functionName": "queryOlapCatalog"
    }
  ]
}
