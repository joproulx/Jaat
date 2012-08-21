/**
* Created by JetBrains WebStorm.
* User: Jo
* Date: 11/02/12
* Time: 12:59 PM
* To change this template use File | Settings | File Templates.
*/

//Array.prototype.first = function()
//{
//    if (this.length == 0)
//    {
//        return NaN;
//    }
//
//    for (var item in this)
//    {
//        return item;
//    }
//};

var Transition = Class.extend(
    {
        init: function (startKeyFrame, endKeyFrame) {
            this.StartKeyFrame = startKeyFrame;
            this.EndKeyFrame = endKeyFrame;
            this.Transformations = new Array();
            this.Elements = new Array();

            this.generateTransformations();
        },
        generateTransformations: function () {
            var thisObj = this;
            this.StartKeyFrame.Elements.forEach(function (item) {
                thisObj.Elements.push(item);
            });

            for (var i = 0; i < this.Elements.length; i++) {
                var element = this.Elements[i];
                var correspondingElement = null;

                var elements = this.EndKeyFrame.Elements.filter(function (item) { return item.Id == element.Id; });

                for (var j = 0; j < elements.length; j++) {
                    correspondingElement = elements[j];
                    break;
                }

                if (correspondingElement != null) {
                    element.generateTransformations(correspondingElement, this.StartKeyFrame.Timestamp, this.EndKeyFrame.Timestamp).forEach(function (item) {
                        thisObj.Transformations.push(item);
                    });
                }
            }
        },
        render: function (t, context) {
            var start = this.StartKeyFrame.Timestamp;
            var end = this.EndKeyFrame.Timestamp;

            if (t < start || t > end) {
                return;
            }

            var diff = end - start;

            var ratio = (t - start) / diff;

            for (var i = 0; i < this.Transformations.length; i++) {
                var transformation = this.Transformations[i];
                transformation.update(ratio);
            }

            for (var i = 0; i < this.Elements.length; i++) {
                var element = this.Elements[i];
                element.render(t, context);
            }
        },
        copy: function (other) {
            this.StartKeyFrame = other.StartKeyFrame.clone();
            this.EndKeyFrame = other.EndKeyFrame.clone();

            // todo: find a way to clone transformation

            other.Transformations.forEach(function (item) {
                this.Transformations.push(item.clone());
            });

            other.Elements.forEach(function (item) {
                this.Elements.push(item.clone());
            });
        },
        clone: function () {
            var newTransition = new Transition();
            newTransition.copy(this);
            return newTransition;
        }
    });

