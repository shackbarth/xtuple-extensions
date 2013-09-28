/*jshint indent:2, curly:true, eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true,
white:true*/
/*global XT:true, _:true, XV:true, XM:true, console:true, setTimeout:true */

(function () {
  "use strict";

  var validClasses = [50, 55, 60, 65, 70, 77, 85, 92, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500],
    validClassesStrings = _.map(validClasses, function (clazz) {
      return "" + clazz;
    });



  XT.extensions.logistify.initWorkspace = function () {
    var extensions = [
      {kind: "onyx.Button", container: "shipViaCombobox", ontap: "logistify", components: [
        // TODO: use local version
        {kind: "onyx.Icon", src: "http://upload.wikimedia.org/wikipedia/commons/4/46/IPA_capital_l.PNG"}
      ]}
    ];
    XV.appendExtension("XV.SalesOrderWorkspace", extensions);
  };

  XV.SalesOrderWorkspace.prototype.logistify = function () {
    var that = this,
      model = this.value,
      fromZip = "00000", // ???
      toZip = model.getValue("shipto.address.postalCode"),
      validationError,
      requestsMade = 0,
      responsesReceived = 0,
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

    var carrierHash = XM.shipVias.toJSON();

    var popupDialog = function () {
      var callback = function (response) {
        console.log("response", response);
      };
      var radiobuttonArray = _.map(carrierHash, function (carrier) {
        return {
          kind: "onyx.Checkbox",
          content: carrier.code + " " + carrier.rate,
          style: "display:block;width:auto;padding-left:35px;line-height:30px;margin: 0 6px 6px 6px;color:white;"
        };
      });
      /*
      console.log("popup dialog", carrierHash);
      {kind: "Group", classes: "onyx-sample-tools group", onActivate:"groupActivated", highlander: true, components: [
			{kind:"onyx.Checkbox", checked: true},
			{kind:"onyx.Checkbox"},
			{kind:"onyx.Checkbox"}
		]},
      */
      that.doNotify({
        message: "_chooseCarrier".loc(),
        callback: callback,
        component: {
          kind: "Group",
          components: radiobuttonArray,
          getValue: function () {
            return "value";
          }
        }
      });
    };

    var getCarrierRate = function (carrier) {
      //TODO: actually query lfy
      setTimeout(function () {
        carrier.rate = 100 + Math.random() * 500;
        responsesReceived++;
        if (responsesReceived === requestsMade) {
          popupDialog();
        }
      }, 3000);
    };


    _.each(carrierHash, function (carrier) {
      var scac = "foo";//carrier.scac; // TODO: real attribute
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

}());
