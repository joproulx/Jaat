var ArrowShape = PolySegmentShape.extend({
    init:function (t){

        var path ={
           IsClosedPath: true,
           Origin: {X: 0, Y: 25},
           Items:  [
            { X:0, Y:-25 },
            { SegmentType:"line" },
            { X:50, Y:0 },
            { SegmentType:"line" },
            { X:0, Y:25 },
            { SegmentType:"line" }
        ]};

        this._super(t, path);
    }
});
