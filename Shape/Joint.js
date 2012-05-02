var Joint = Class.extend(
    {
        init: function (point) {
            this.Point = point;
        },
        setSegments: function (segment1, segment2) {
            this.Segment1 = segment1;
            this.Segment2 = segment2;
        },
        getOtherSegment: function (segment) {
            return (segment == this.Segment1) ? this.Segment2 : this.Segment1;
        },
        createDrawnSegment: function () {
            return null;
        },
        copy: function (other) {
            this.Point = other.Point.clone();
        },
        clone: function () {
            var newJoint = new Joint(null);
            newJoint.copy(this);
            return newJoint;
        },
        toString:function () {
            return "[Joint {" + this.Point.toString() + "}]";

        }
    });
