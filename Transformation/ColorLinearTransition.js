
var ColorLinearTransition = Class.extend({
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

        var r = this.getColorFromRatio(ratio, this.StartValue.R, this.EndValue.R);
        var g = this.getColorFromRatio(ratio, this.StartValue.G, this.EndValue.G);
        var b = this.getColorFromRatio(ratio, this.StartValue.B, this.EndValue.B);

        return {
                 R:r,
                 G:g,
                 B:b
               };

    },
    getColorFromRatio :function(ratio, startValue, endValue){
        return (ratio * (endValue - startValue)) + startValue
    }




});

/**
 * Created with JetBrains WebStorm.
 * User: Jo
 * Date: 15/05/12
 * Time: 9:35 PM
 * To change this template use File | Settings | File Templates.
 */
