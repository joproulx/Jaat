/**
 * Created by JetBrains WebStorm.
 * User: jproulx
 * Date: 01/03/12
 * Time: 12:02 PM
 * To change this template use File | Settings | File Templates.
 */

var ArcSegment = Segment.extend({
    init:function () {
    },
    setJoints:function (joint1, joint2) {
        this.Joint1 = joint1;
        this.Joint2 = joint2;
    }
});

