// Create embed in the `embed-example` div. By default the embed will fit its container
var container = document.getElementById("embed-example");

var embed = new Flat.Embed(container, {
  // The score hosted on Flat we use here as template.
  // You can also use `embed.loadMusicXML(score)` to load your MsuicXML on the fly:
  // https://flat.io/developers/docs/embed/javascript.html#loadmusicxmlscore-mixed-promisevoid-error
  score: "56ae21579a127715a02901a6",
  // The embed configuration parameters
  height: "500px",
  embedParams: {
    mode: "edit",
    appId: "59e7684b476cba39490801c2",
    // Customization: https://flat.io/developers/docs/embed/url-parameters.html
    branding: false,
    controlsPosition: "top"
  }
});

// Helper function to force downloading the exported file
var exportFile = function(buffer, mimeType, ext) {
  var blobUrl = window.URL.createObjectURL(
    new Blob([buffer], {
      type: mimeType
    })
  );
  var a = document.createElement("a");
  a.href = blobUrl;
  a.download = "exported-score." + ext;
  document.body.appendChild(a);
  a.style = "display: none";
  a.click();
  a.remove();
};

// Export as MusicXML when the button is clicked
// https://flat.io/developers/docs/embed/javascript.html#getmusicxmloptions-object-promisestringuint8array-error
document.getElementById("export-xml").addEventListener("click", function() {
  embed.getMusicXML({ compressed: true }).then(function(buffer) {
    exportFile(buffer, "application/vnd.recordare.musicxml+xml", "mxl");
  });
});

// Export as MIDI when the button is clicked
// https://flat.io/developers/docs/embed/javascript.html#getmidi-promiseuint8array-error
document.getElementById("export-midi").addEventListener("click", function() {
  embed.getMIDI().then(function(buffer) {
    exportFile(buffer, "audio/midi", "mid");
  });
});

// Export as PNG when the button is clicked
// https://flat.io/developers/docs/embed/javascript.html#getpngoptions-object-promisestringuint8array-error
document.getElementById("export-png").addEventListener("click", function() {
  embed.getPNG().then(function(buffer) {
    exportFile(buffer, "image/png", "png");
  });
});
