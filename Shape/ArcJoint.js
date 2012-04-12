/**
 * Created by JetBrains WebStorm.
 * User: Jo
 * Date: 23/02/12
 * Time: 8:48 PM
 * To change this template use File | Settings | File Templates.
 */
var ArcJoint = Joint.extend({
    init: function(point, segment1, segment2, cornerLength)
    {
        if (isNaN(cornerLength))
        {
            alert("You must provide a cornerLength");
        }

        this._super(point, segment1, segment2);
        this.CornerLength = cornerLength;
    },
    createDrawnSegment: function()
    {
        return new ArcDrawnSegment(this, true);
    }
});