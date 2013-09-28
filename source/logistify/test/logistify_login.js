var crud = require("../../../../xtuple/mocha/test/lib/crud"),
    data = {
      recordType: "XM.LogistifyLogin",
      autoTestAttributes: true,
      createHash: {
        accountNumber: "account" + Math.random(),
        scac: "scac" + Math.random()
      },
      updateHash: {
        scac: "scac" + Math.random()
      }
    };

  describe('Logistify login crud test', function () {
    crud.runAllCrud(data);
  });