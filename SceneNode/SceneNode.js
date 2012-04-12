
var SceneNode = Class.extend(
    {
        init: function(parentNode)
        {
            this.ParentNode = parentNode;
            this.ChildrenNodes = new Array();
            this.Position = new Point(0,0);
        },
        addChildrenSceneNode :function(sceneNode)
        {
            this.ChildrenNodes.push(sceneNode);

            this.Position = this.getPosition();
        },
        rotateTo : function(center, radians)
        {
            for(var i = 0; i < this.ChildrenNodes.length; i++)
            {
                this.ChildrenNodes[i].rotateTo(center, radians);
            }
        },
        rotate : function(center, radians)
        {
            for(var i = 0; i < this.ChildrenNodes.length; i++)
            {
                this.ChildrenNodes[i].rotate(center, radians);
            }
        },
        translateTo : function(point)
        {
            this.translate(point.X - this.X, point.Y - this.Y);
        },
        translate : function(dx, dy)
        {
            for(var i = 0; i < this.ChildrenNodes.length; i++)
            {
                this.ChildrenNodes[i].translate(dx, dy);
            }
        },
        getPosition :function()
        {
            var maxX = Numbre.MIN_VALUE;
            var minX = Number.MAX_VALUE;
            var maxY = Number.MIN_VALUE;
            var minY = Number.MAX_VALUE;
            for(var i = 0; i < this.ChildrenNodes.length; i++)
            {
                if (!this.ChildrenNodes[i].isLeaf())
                {
                    var position = this.ChildrenNodes[i].getPosition();
                    if (position.X > maxX)
                    {
                        maxX = position.X;
                    }
                    if (position.X < minX)
                    {
                        minX = position.X;
                    }
                    if (position.Y > maxY)
                    {
                        maxY = position.Y;
                    }
                    if (position.Y < minY)
                    {
                        minY = position.Y;
                    }
                }
            }

            return new Point(((maxX - minX)/2+ minX), ((maxY - minY)/2 + minY));
        }
    });
