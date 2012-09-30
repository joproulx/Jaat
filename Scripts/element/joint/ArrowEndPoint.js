define([
    'libs/ctor/ctor',
    'element/endpoint/EndPoint',
    'element/renderer/ArrowSegmentRenderer'],
    function (Ctor, EndPoint, ArrowSegmentRenderer) {
        var ArrowEndPoint = Ctor(EndPoint, function (_super) {
            this.init = function (point, arrowLength, arrowWidth) {
                if (arrowLength == Infinity || arrowWidth == Infinity) {
                    alert("You must provide arrow width and arrow length");
                }
                _super.init(point);
                this.ArrowLength = arrowLength;
                this.ArrowWidth = arrowWidth;
            };
            this.createSegmentRenderer = function () {
                return new ArrowSegmentRenderer(this);
            };
        });
        return ArrowEndPoint;
    });
