/**
 * Created by JetBrains WebStorm.
 * User: Jo
 * Date: 23/02/12
 * Time: 8:42 PM
 * To change this template use File | Settings | File Templates.
 */
var Segment = Class.extend(
    {
        init:function () {
            this.Joint1 = null;
            this.Joint2 = null;

        },
        setJoints:function (joint1, joint2) {
            this.Joint1 = joint1;
            this.Joint2 = joint2;
            this.Line = new Line(joint1.Point, joint2.Point);
        }

    });
