/*jshint indent:2, curly:true, eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true,
white:true*/
/*global XT:true, _:true, XV:true, XM:true, console:true */

(function () {
  "use strict";

  var validClasses = [50, 55, 60, 65, 70, 77, 85, 92, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500],
    validClassesStrings = _.map(validClasses, function (clazz) {
      return "" + clazz;
    });



  XT.extensions.logistify.initWorkspace = function () {
    var extensions = [
      {kind: "onyx.Button", container: "settingsGroup", content: "_logistifyMe".loc(), ontap: "logistify" }
    ];
    XV.appendExtension("XV.SalesOrderWorkspace", extensions);
  };

  XV.SalesOrderWorkspace.prototype.logistify = function () {
    var model = this.value,
      fromZip = "00000", // ???
      toZip = model.getValue("shipto.address.postalCode"),
      validationError,
      lineItems = _.map(model.get("lineItems").models, function (model) {
        var clazz = model.getValue("item.freightClass.code"),
          weight = model.getValue("item.productWeight");

        if (!_.contains(validClassesStrings, clazz)) {
          validationError = clazz + " is not a valid class";
        }
        return {
          class: clazz,
          weight: weight
        };
      }),
      carriers = XM.shipVias;

    if (validationError) {
      console.log("Logistify error: " + validationError);
      return;
    }

    console.log(toZip, lineItems, carriers.toJSON());
  };

}());
