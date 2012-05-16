var SceneNodeLeaf = SceneNode.extend(
    {
        init:function () {


        },
        setPoints: function(points)
        {
            this.Points = points;
            this.setPosition(this.getPosition());
        },
        translate: function(x, y)
        {
            for (var i = 0; i < this.Points.length; i++)
            {
                var point = this.Points[i];

                point.X = point.X + x;
                point.Y = point.Y + y;
            }
        },
        rotate: function(pointCenter, angleRadians)
        {

        },
        getPosition: function()
        {
            var minY = Number.MAX_VALUE;
            var maxY = Number.MIN_VALUE;
            var minX = Number.MAX_VALUE;
            var maxX = Number.MIN_VALUE;


            for (var i = 0; i < this.Points; i++)
            {
                var point = this.Points[i];

                if (point.X < minX)
                {
                    minX = point.X;
                }
                if (point.X > maxX)
                {
                    maxX = point.X;
                }
                if (point.Y < minY)
                {
                    minY = point.Y;
                }
                if (point.Y > maxY)
                {
                    maxY = point.Y;
                }
            }
            return new Point((maxX - minX)/2 + minX, (maxY - minY)/2 + minY);
        }

    });