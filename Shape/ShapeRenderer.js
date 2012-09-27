var ShapeRenderer = Class.extend(
    {
        init:function (shape) {
            this.Shape = shape;
            this.IsIndependantShape = false;

            var segmentToJoin = null;

            this.SegmentRenderers = new Array();

            var segment = this.Shape.Path.Segments[0];

            while (1) {
                var newSegment = segment.createSegmentRenderer();

                newSegment.SegmentRenderer1 = segmentToJoin;

                if (!this.Shape.Path.isClosedPath && segment == this.Shape.Path.Segments[0]) {
                    var joint = segment.Joint1;
                    var segmentRenderer = joint.createSegmentRenderer();

                    if (segmentRenderer != null) {
                        newSegment.SegmentRenderer1 = segmentRenderer;
                        segmentRenderer.SegmentRenderer2 = newSegment;
                        this.SegmentRenderers.push(segmentRenderer);
                    }
                }

                if (segmentToJoin != null) {
                    segmentToJoin.SegmentRenderer2 = newSegment;
                }

                segmentToJoin = newSegment;

                this.SegmentRenderers.push(newSegment);

                if (segment.Joint2 != null) {
                    var joint = segment.Joint2;
                    var segmentRenderer = joint.createSegmentRenderer();

                    if (segmentRenderer != null) {
                        newSegment.SegmentRenderer2 = segmentRenderer;
                        segmentRenderer.SegmentRenderer1 = newSegment;
                        segmentToJoin = segmentRenderer;

                        this.SegmentRenderers.push(segmentRenderer);
                    }
                }

                if (this.isLastSegment(segment)) {
                    if (this.Shape.Path.isClosedPath) {
                        this.SegmentRenderers[0].SegmentRenderer1 = segmentToJoin;
                        segmentToJoin.SegmentRenderer2 = this.SegmentRenderers[0];
                    }

                    break;
                }

                segment = segment.Joint2.Segment2;
            }
        },
        getRatio:function(length, totalLength){
            return length / totalLength;
        },
        getDashedSegment:function(t, dashedOffset, length){
            var value = 30;

            if (t > 0){
                var jo = 1;
            }

            length = this.Shape.StrokeDashOffset.get(t) + length;

            var modulo = (length) % value;

            var length2 = Math.floor(length / value);

            if ((length%(value*2)) >= (value)){
                return {Drawn:false, Length:length2*value + value - length};
            }
            else{
                return {Drawn:true, Length:length2*value + value - length};
            }
        },
        render:function (t, context) {
            var startRatio = this.Shape.StrokeRatio.Start.get(t);
            var endRatio = this.Shape.StrokeRatio.End.get(t);

            var length = this.Shape.Path.length(t);

            var startLength = length * startRatio;
            var endLength = length * endRatio;

            var currentTotalLength = startLength;
            var totalSegmentLength = 0;

            var beginPath = true;
            var endPath = true;

            for (var i = 0; i < this.SegmentRenderers.length; i++) {
                var segmentLength = this.SegmentRenderers[i].Segment.length(t);

                var reachedEnd = false;
                do{

                    var dashedSegment = this.getDashedSegment(t, 0, currentTotalLength);
                    var endLength = dashedSegment.Length;

                    if ((currentTotalLength + endLength) >= (totalSegmentLength + segmentLength)){
                        endPath = ((currentTotalLength + endLength) <= (totalSegmentLength + segmentLength));

                        endLength = (totalSegmentLength + segmentLength) - currentTotalLength;
                        reachedEnd = true;
                    }
                    else
                    {
                        endPath = true;
                    }

                    if (dashedSegment.Drawn){

                        var startRatio = this.getRatio((currentTotalLength - totalSegmentLength), segmentLength);
                        var endRatio = this.getRatio((currentTotalLength - totalSegmentLength) + endLength, segmentLength);

                        var point = this.SegmentRenderers[i].getPoint1(t, startRatio, endRatio);

                        if (beginPath){
                            this.beginRender(t, context);
                            context.moveTo(point.X, point.Y);
                        }
                        this.SegmentRenderers[i].render(t, context, startRatio, endRatio);

                        if (endPath){
                            this.endRender(context);
                        }
                    }

                    beginPath = endPath;
                    currentTotalLength += endLength;

                } while(!reachedEnd);
                totalSegmentLength += segmentLength;
            }




//                var startRatioSegment = 0;
//                var endRatioSegment = 1;
//
//                if (currentLength < startLength) {
//                    if (currentLength + segmentLength >= startLength) {
//                        startRatioSegment = (startLength - currentLength) / segmentLength;
//                    }
//                    else {
//                        startRatioSegment = -1;
//                    }
//                }
//
//                if (currentLength < endLength) {
//                    if (currentLength + segmentLength >= endLength) {
//                        endRatioSegment = (endLength - currentLength) / segmentLength;
//                    }
//                }
//                else {
//                    endRatioSegment = -1;
//                }
//
//                currentLength += segmentLength;
//
//                if (startRatioSegment != -1 && endRatioSegment != -1) {
//                    this.renderSegment(t, context, this.SegmentRenderers[i], startRatioSegment, endRatioSegment);
//                }
        },
        renderSegment:function (t, context, segmentRenderer, startRatio, endRatio) {
            // TODO: When a shape is closed and some of its segments are not full (ex.: dash), we need
            // to do a 2 passes rendering. One for the shape, with a stroke width= 0. A second one for the stroke.
            // Since the stroke won't be continuous, we'll need to use more than one path, hence the
            // need of a 2 passes render. The problem is that we don't know if there is such a segment
            // in the shape before iterating through the segments. Find a way to do it.
            if (segmentRenderer === _.first(this.SegmentRenderers) ||
                segmentRenderer.IsIndependantShape ||
                startRatio > 0) {

                this.beginRender(t, context);
                var point = segmentRenderer.getPoint1(t, startRatio, endRatio);
                context.moveTo(point.X, point.Y);
            }

            segmentRenderer.render(t, context, startRatio, endRatio);

            if (segmentRenderer === _.last(this.SegmentRenderers) ||
                segmentRenderer.IsIndependantShape ||
                endRatio < 1) {

                this.endRender(context);
            }
        },
        beginRender:function (t, context) {
            var strokeStyle = '#696969';
            var lineWidth = 5;
            context.save();
            context.beginPath();
            context.fillStyle = strokeStyle;

            var rgb = this.Shape.StrokeColor.get(t);
            // TODO: optimize how the rgb are passed to canvas
            context.strokeStyle = 'rgba(' + Math.round(rgb.R) + ', ' + Math.round(rgb.G) + ', ' + Math.round(rgb.B) + ', ' + this.Shape.StrokeOpacity.get(t) + ')';
            context.lineWidth = lineWidth;
            context.lineJoin = "miter";
        },
        endRender:function (context) {
            if (this.Shape.Path.isClosedPath) {
                context.closePath();
            }

            context.stroke();
            context.restore();
        },
        isLastSegment:function (segment) {
            return this.Shape.Path.Segments[this.Shape.Path.Segments.length - 1] == segment;
        }
    });


