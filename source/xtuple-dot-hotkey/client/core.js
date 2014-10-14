/*jshint indent:2, curly:true, eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true,
white:true*/
/*global App:true, XT:true, Backbone:true, _:true, console:true */

(function () {
  "use strict";

  XT.extensions.xtuple_dot_hotkey = {
    /**
      Capture arbitrary hotkey instructions that start with a dot.
      In this example, entering .i15002<enter> will drill down into incident # 15002.
      Note that the hotkey listener only operates if there's no cursor focus on a field.
    */
    addHotkey: function () {

      /**
        Capture anything between a dot and an enter and send it to the captureDotHotKey function

        @see http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
      */
      App.prototype.keyCapturePatterns.push({
        method: "captureDotHotKey",
        start: [190], // period
        end: [13] // enter
      });

      /**
        Waterfall down an instruction to open a workspace if we understand which business object's
        workspace we want to open.

        @param {String} data
          In form i15002, which means that the user wants to drilldown into incident 15002
      */
      App.prototype.captureDotHotKey = function (data) {
        var capturedId;
        if (data.charAt(0).toLowerCase() === 'i') { // for now only i = Incident is supported
          capturedId = data.substring(1); // everything after the `i`
          this.$.postbooks.waterfall("onWorkspace", {workspace: "XV.IncidentWorkspace", id: capturedId});
        }
      };
    }
  };

}());
