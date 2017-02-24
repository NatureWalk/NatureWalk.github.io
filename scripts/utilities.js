function drawText(text, x, y) {
    ctx.font = '24px Indie Flower';
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'top';
    ctx.fillText(text, x, y);
}