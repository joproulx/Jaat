var ArrowEndPoint = EndPoint.extend({
    init:function (point, arrowLength, arrowWidth) {
        if (arrowLength == Infinity || arrowWidth == Infinity) {
            alert("You must provide arrow width and arrow length");
        }

        this._super(point);
        this.ArrowLength = arrowLength;
        this.ArrowWidth = arrowWidth;
    },
    createDrawnSegment:function () {
        return new ArrowDrawnSegment(this);
    }
});

