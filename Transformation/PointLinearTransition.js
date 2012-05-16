
var PointLinearTransition = Class.extend({
    init: function(){
        this.StartTimestamp = null;
        this.EndTimestamp = null;
        this.StartValue = null;
        this.EndValue = null;
    },
    getValue: function(timestamp){
        if (timestamp < this.StartTimestamp || timestamp > this.EndTimestamp){
            throw "Invalid timestamp";
        }

        var ratio = (timestamp - this.StartTimestamp) / (this.EndTimestamp - this.StartTimestamp);

        return new Point(((ratio * (this.EndValue.X - this.StartValue.X)) + this.StartValue.X),
                         ((ratio * (this.EndValue.Y - this.StartValue.Y)) + this.StartValue.Y));
    }
});

/**
 * Created with JetBrains WebStorm.
 * User: Jo
 * Date: 15/05/12
 * Time: 9:35 PM
 * To change this template use File | Settings | File Templates.
 */
