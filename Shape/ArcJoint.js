/**
 * Created by JetBrains WebStorm.
 * User: Jo
 * Date: 23/02/12
 * Time: 8:48 PM
 * To change this template use File | Settings | File Templates.
 */
var ArcJoint = Joint.extend({
    init: function (point, cornerLength) {
        if (isNaN(cornerLength)) {
            alert("You must provide a cornerLength");
        }

        this._super(point);
        this.CornerLength = cornerLength;
    },
    createDrawnSegment: function () {
        return new ArcDrawnSegment(this, true);
    },
    copy: function (other) {
        this._super(other);
        this.CornerLength = other.CornerLength;
    },
    clone: function () {
        var newJoint = new ArcJoint(null, 0);
        newJoint.copy(this);
        return newJoint;
    }
});