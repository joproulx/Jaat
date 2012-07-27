var BezierSegment = Segment.extend({
    
    //todo: Modify control point to be SceneNodeTimedValue. Otherwise the bezier is fucked when moving the parent scene node
    init:function () {
        this.LengthCache =
        {
            Length:0,
            StartPoint:new Point(0, 0),
            EndPoint: new Point(0, 0),
            ControlPoint0:new Point(0, 0),
            ControlPoint1:new Point(0, 0)
        };
    },
    setControlPoints:function (point1, point2) {
        this.ControlPoint1 = point1;
        this.ControlPoint2 = point2;
    },
    createDrawnSegment:function () {
        return new BezierDrawnSegment(this);
    },
    pointFromRatio:function (timestamp, ratio) {
        var coefficient0 = Math.pow((1 - ratio), 3);
        var coefficient1 = 3 * ratio * Math.pow((1 - ratio), 2);
        var coefficient2 = 3 * ratio * ratio * (1 - ratio);
        var coefficient3 = ratio * ratio * ratio;

        var point0 = this.Joint1.Point.get(timestamp);
        var point1 = this.ControlPoint1.get(timestamp);
        var point2 = this.ControlPoint2.get(timestamp);
        var point3 = this.Joint2.Point.get(timestamp);

        return point0.multiplyBy(coefficient0).add(point1.multiplyBy(coefficient1)).add(point2.multiplyBy(coefficient2)).add(point3.multiplyBy(coefficient3));
    },
    pointFromLength:function (timestamp, length) {
        return this.pointFromRatio(timestamp, length / this.length(timestamp));
    },
    length:function (timestamp) {
        var array = new Array(4);

        array[0] = this.Joint1.Point.get(timestamp);
        array[1] = this.ControlPoint1.get(timestamp);
        array[2] = this.ControlPoint2.get(timestamp);
        array[3] = this.Joint2.Point.get(timestamp);

        if (!array[0].equals(this.LengthCache.StartPoint) ||
            !array[1].equals(this.LengthCache.ControlPoint0) ||
            !array[2].equals(this.LengthCache.ControlPoint1) ||
            !array[3].equals(this.LengthCache.EndPoint)){

            this.LengthCache.StartPoint = array[0];
            this.LengthCache.ControlPoint0 = array[1];
            this.LengthCache.ControlPoint1 = array[2];
            this.LengthCache.EndPoint = array[3];

            this.LengthCache.Length = this.arclen(array, 3);
        }
        return this.LengthCache.Length;
    },
    getPerpendicularLine:function (timestamp, point) {
        return this.Line.getPerpendicularLine(timestamp, point);
    },
    getIntersectionPoint:function (timestamp, otherLine) {
        return this.Line.getIntersectionPoint(timestamp, otherLine);
    },
    bezsplit:function (V, Left, Right) {
        var i, j;
        /* Index variables  */
        var Vtemp = new Array(4)
        for (var i = 0; i < 4; i++) {
            Vtemp[i] = new Array(4);
        }

        for (var j = 0; j <= 3; j++)
            Vtemp[0][j] = V[j];


        /* Triangle computation */
        for (i = 1; i <= 3; i++) {
            for (j = 0; j <= 3 - i; j++) {
                Vtemp[i][j] = new Point(0, 0);
                Vtemp[i][j].X = 0.5 * Vtemp[i - 1][j].X + 0.5 * Vtemp[i - 1][j + 1].X;
                Vtemp[i][j].y = 0.5 * Vtemp[i - 1][j].Y + 0.5 * Vtemp[i - 1][j + 1].Y;
            }
        }

        for (j = 0; j <= 3; j++)
            Left[j] = Vtemp[j][0];

        for (j = 0; j <= 3; j++)
            Right[j] = Vtemp[3 - j][j];
    },
    V2DistanceBetween2Points:function (point1, point2) {
        var dx = point1.X - point2.X;
        var dy = point1.Y - point2.Y;

        return Math.sqrt(dx * dx + dy * dy);
    },
    addifclose:function (V, length, error) {
        var left = new Array(4)
        var right = new Array(4);
        /* bez poly splits */

        var len = 0.0;
        /* arc length */
        var chord;
        /* chord length */

        var index;
        /* misc counter */

        for (index = 0; index <= 2; index++)
            len = len + this.V2DistanceBetween2Points(V[index], V[index + 1]);

        chord = this.V2DistanceBetween2Points(V[0], V[3]);

        if ((len - chord) > error) {
            this.bezsplit(V, left, right);
            /* split in two */
            length = this.addifclose(left, length, error);
            /* try left side */
            length = this.addifclose(right, length, error);
            /* try right side */
            return length;
        }

        length = length + len;

        return length;
    },
//  Taken from: http://steve.hollasch.net/cgindex/curves/cbezarclen.html
    arclen:function (V, error) {
        var length = 0;
        /* length of curve */

        length = this.addifclose(V, length, error);
        /* kick off recursion */

        return(length);
        /* that's it! */
    }                                                   /* end arclen */


});


