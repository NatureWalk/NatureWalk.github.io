function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

//Credit End

function findTarget(evt) {
    var mousePos = getMousePos(canvas, evt);
    for (var i=0; i<btnAry.length; i++) {
        if (btnAry[i].isInside(mousePos)) {
            btnAry[i].mouseEventManager(evt.type);
        } else {
            if (btnAry[i].hovered){
                btnAry[i].onMouseLeave();
            }
        }
    }
}