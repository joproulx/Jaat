/**
 * Created by JetBrains WebStorm.
 * User: jproulx
 * Date: 21/02/12
 * Time: 12:46 PM
 * To change this template use File | Settings | File Templates.
 */
var RectangleShape = PolySegmentShape.extend(
    {
        init:function (t, x, y, w, h) {
            this.X = x;
            this.Y = y;
            this.W = w;
            this.H = h;

            var points = new Array();

            points.push(new Point(x, y));
            points.push(new Point(x + w, y));
            points.push(new Point(x + w, y + h));
            points.push(new Point(x, y + h));

            this._super(t, points, false, true);
        }
    });