
var ArrowEndPoint = EndPoint.extend({
    init: function(point, arrowLength, arrowWidth)
    {
        if (arrowLength == Infinity || arrowWidth == Infinity)
        {
            alert("You must provide arrow width and arrow length");
        }

        this._super(point);
        this.ArrowLength = arrowLength;
        this.ArrowWidth = arrowWidth;
    },
    createDrawnSegment: function()
    {
        return new ArrowDrawnSegment(this);
    },
    copy: function (other) {
        this._super(other);
        this.ArrowLength = other.ArrowLength;
        this.ArrowWidth = other.ArrowWidth;
    },
    clone: function () {
        var newJoint = new ArrowEndPoint(null);
        newJoint.copy(this);
        return newJoint;
    }
});

