var RoundedRectangleShape = PolyLineShape.extend(
    {
        init:function (timestamp, x, y, w, h, l) {
            var points = new Array();

            points.push(new Point(x, y));
            points.push(new Point(x + w, y));
            points.push(new Point(x + w, y + h));
            points.push(new Point(x, y + h));

            this._super(timestamp, points, true, true);
        }
    });