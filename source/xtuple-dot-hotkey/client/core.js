/*jshint indent:2, curly:true, eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true,
white:true*/
/*global App:true, XT:true, Backbone:true, _:true, console:true */

(function () {
  "use strict";

  XT.extensions.xtuple_dot_hotkey = {
    addHotkey: function () {
      App.prototype.keyCapturePatterns.push({
        method: "captureDotHotKey",
        // http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
        start: [190], // period
        end: [13] // enter
      });
      // entering .i15002<enter> will drill down into incident # 15002
      App.prototype.captureDotHotKey = function (data) {
        var capturedId;
        if (data.charAt(0).toLowerCase() === 'i') {
          capturedId = data.substring(1);
          this.$.postbooks.waterfall("onWorkspace", {workspace: "XV.IncidentWorkspace", id: capturedId});
        }
      };
    }
  };

}());
