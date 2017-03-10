function drawText(text, x, y, size) {
    //console.log(size);
    if (size) {ctx.font = size + ' Indie Flower';}
    else {ctx.font = '24px Indie Flower';}
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'top';
    ctx.fillText(text, x, y);
}