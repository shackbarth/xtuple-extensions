/*jshint indent:2, curly:true, eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true,
white:true*/
/*global XT:true, enyo:true, _:true, XV:true, XM:true, console:true, setTimeout:true, Globalize:true */

(function () {
  "use strict";

  // TODO: deal with 77.5 and 92.5
  // TODO: core bug: it's not possible to remove a ship-to from a customer
  // TODO: core bug: the shipto address doesn't get filled in automatically
  //   until you click a new line item, at which point it fills in the wrong
  //   address (walnut hills instead of alexandria)
  // TODO: why is site.address null? Looks like a bug in core.


  var validClasses = [50, 55, 60, 65, 70, 77, 85, 92, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500],
    validClassesStrings = _.map(validClasses, function (clazz) {
      return "" + clazz;
    });

  XT.extensions.logistify.initWorkspace = function () {
    // XXX it works, so yell at me later -tjw
    var interval = setInterval(function () {
      var container = XT.app.$.postbooks.getActive(),
        workspace = container.$.workspace || { };

      if (workspace.kind !== "XV.SalesOrderWorkspace" ||
        workspace.$.shipViaCombobox.$.injectionPoint.children.length > 0) return;

      workspace.$.shipViaCombobox.$.injectionPoint.createComponent({kind: "onyx.Button", style: "padding: 3px 5px; vertical-align: -55%; margin-left: 6px;",
        ontap: "logistify", owner: workspace, components: [
          {kind: "onyx.Icon", style: "width: 24px; height: 24px", src: XT.getOrganizationPath() + "/xtuple-extensions/source/logistify/client/assets/logistify_icon_24.png"}
      ]});
      workspace.render();
    }, 500);
    /*
    var extensions = [
      {kind: "onyx.Button", container: "injectionPoint", style: "padding: 3px 5px; vertical-align: -55%; margin-left: 6px;",
        ontap: "logistify", owner: XT.app.$.postbooks.getActive(), components: [
          {kind: "onyx.Icon", style: "width: 24px; height: 24px", src: XT.getOrganizationPath() + "/xtuple-extensions/source/logistify/client/assets/logistify_icon_24.png"}
      ]}
    ];
    XV.appendExtension("XV.SalesOrderWorkspace", extensions);
    */
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
      validationError = validationError + "_needShiptoWithPostalCode".loc();
    }
    if (!fromZip) {
      fromZip = "23510"; // XXX
      //validationError = validationError + "_needSiteWithPostalCode".loc();
    }


    if (validationError) {
      this.notify(model, "_error".loc() + ": " + validationError, {});
      return;
    }

    var carrierHash = XM.shipVias.toJSON();

    var popupDialog = function () {
      var callback = function (response) {
        if (!response.componentValue) {
          return;
        }
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
          // TODO: rates don't line up vertically
          content: carrier.code + " " + Globalize.format(carrier.rate, "c"),
          style: "display:block;width:auto;padding-left:35px;line-height:30px;margin: 0 6px 6px 6px;color:white;"
        };
      });

      that.doNotify({
        message: "_chooseCarrier".loc(),
        callback: callback,
        component: {
          kind: "Group",
          components: radiobuttonArray,
          getValue: function () {
            var selectedCheckbox = _.find(this.children, function (child) {
              return child.active;
            });
            if (!selectedCheckbox) {
              return false;
            }
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
        source: "xtuple",
        fromZip: fromZip,
        toZip: toZip,
        scac: carrier.scac,
        // TODO: account number, username, password
        lineItems: JSON.stringify(lineItems)
      };
      console.log("request", request);

      var callback = function () {
        // TODO: use the rate from the response
        carrier.rate = 100 + Math.random() * 500;
        responsesReceived++;
        if (responsesReceived === requestsMade) {
          popupDialog();
        }
      };

      var ajax = new enyo.Ajax({
        url: "http://api.logistify.co/quote/" + carrier.scac,
        response: callback
      });

      // TODO: use the API
      //ajax.go(request);
      callback();
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
