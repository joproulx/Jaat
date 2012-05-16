var DrawnSegment = Class.extend(
    {
        init:function (representCorner) {
            this.IsCorner = representCorner;


        },
        setAttachedSegments:function (drawnSegment1, drawnSegment2) {
            this.DrawnSegment1 = drawnSegment1;
            this.DrawnSegment2 = drawnSegment2;
        }



    });


