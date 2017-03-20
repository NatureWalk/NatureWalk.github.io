

function drawText(text, x, y, size) {
    //console.log(size);
    if (size) {ctx.font = size + ' Indie Flower';}
    else {ctx.font = '24px Indie Flower';}
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'top';
    ctx.fillText(text, x, y);
}

/* Text Wrapping Tutorial
http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
*/
function drawWrappedText(text, x, y, fontSize, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        if (fontSize) {ctx.font = fontSize + ' Indie Flower';}
        else {ctx.font = '24px Indie Flower';}
        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            y -= (lineHeight/2);
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        ctx.fillText(line, x, y);
      }