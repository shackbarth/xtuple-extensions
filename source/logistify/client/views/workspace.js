/*jshint indent:2, curly:true, eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true,
white:true*/
/*global XT:true, _:true, XV:true, XM:true, console:true, setTimeout:true, Globalize:true */

(function () {
  "use strict";

  // TODO: deal with 77.5 and 92.5
  var validClasses = [50, 55, 60, 65, 70, 77, 85, 92, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500],
    validClassesStrings = _.map(validClasses, function (clazz) {
      return "" + clazz;
    });

  XT.extensions.logistify.initWorkspace = function () {
    var extensions = [
      {kind: "onyx.Button", style: "padding: 3px 5px;", container: "shipViaCombobox", ontap: "logistify", components: [
        {kind: "onyx.Icon", style: "width: 16px;", src: XT.getOrganizationPath() + "/xtuple-extensions/source/logistify/client/assets/logistify_icon_16.png"}
      ]}
    ];
    XV.appendExtension("XV.SalesOrderWorkspace", extensions);
  };

  XV.SalesOrderWorkspace.prototype.logistify = function () {
    console.log(XT.getOrganizationPath() + "/client/assets/logistify_icon_32.png");
    var that = this,
      model = this.value,
      fromZip = model.getValue("site.address.postalCode"),
      toZip = model.getValue("shipto.address.postalCode"),
      validationError = "",
      requestsMade = 0,
      responsesReceived = 0,
      lineItems = _.map(model.get("lineItems").models, function (model) {
        var clazz = model.getValue("item.freightClass.code"),
          weight = model.getValue("quantity") * model.getValue("item.productWeight");

        if (!_.contains(validClassesStrings, clazz)) {
          validationError = validationError + "_invalidClass".loc() + ": " + clazz + " ";
        }
        return {
          class: clazz,
          weight: weight
        };
      }),
      carriers = XM.shipVias;

    if (!toZip) {
      // TODO: why is site.address null?
      validationError = validationError + "_needShiptoWithPostalCode".loc();
    }
    if (!fromZip) {
      validationError = validationError + "_needSiteWithPostalCode".loc();
    }


    if (validationError) {
      this.notify(model, "_error".loc() + ": " + validationError, {});
      return;
    }

    var carrierHash = XM.shipVias.toJSON();

    var popupDialog = function () {
      var callback = function (response) {
        var carrier = response.componentValue.carrier,
          rate = response.componentValue.rate;

        model.set("shipVia", carrier);
        model.set("freight", rate);
      };
      var radiobuttonArray = _.map(carrierHash, function (carrier) {
        return {
          kind: "onyx.Checkbox",
          carrier: carrier.code,
          rate: carrier.rate,
          content: carrier.code + " " + Globalize.format(carrier.rate, "c"),
          style: "display:block;width:auto;padding-left:35px;line-height:30px;margin: 0 6px 6px 6px;color:white;"
        };
      });

      that.doNotify({
        message: "_chooseCarrier".loc(),
        callback: callback,
        // TODO: the notify popup is not deleting out the old ones on subsequent clicks
        component: {
          kind: "Group",
          components: radiobuttonArray,
          getValue: function () {
            var selectedCheckbox = this.controls[0]; // TODO: find active
            return {
              carrier: selectedCheckbox.carrier,
              rate: selectedCheckbox.rate
            };
          }
        }
      });
    };

    var getCarrierRate = function (carrier) {
      var request = {
        fromZip: fromZip,
        toZip: toZip,
        scac: carrier.scac,
        // TODO: account number, username, password
        lineItems: lineItems
      };
      console.log("request", request);
      //TODO: actually query lfy
      // http://api.logistify.co/quote/pitd
      setTimeout(function () {
        carrier.rate = 100 + Math.random() * 500;
        responsesReceived++;
        if (responsesReceived === requestsMade) {
          popupDialog();
        }
      }, 3000);
    };


    _.each(carrierHash, function (carrier) {
      var scac = "foo";//carrier.scac; // TODO: use real attribute
      if (scac) {
        requestsMade++;
        getCarrierRate(carrier);
      } else {

      }
    });

    if (requestsMade === 0) {
      popupDialog();
    }
  };

  XT.extensions.logistify.initSetupWorkspace = function () {
    var extensions = [
      {kind: "XV.InputWidget", attr: "accountNumber", container: "mainGroup"},
      {kind: "XV.InputWidget", attr: "scac", container: "mainGroup"},
      {kind: "XV.InputWidget", attr: "username", container: "mainGroup"},
      {kind: "XV.InputWidget", attr: "password", container: "mainGroup"}
    ];
    XV.appendExtension("XV.ShipViaWorkspace", extensions);
  };

}());
