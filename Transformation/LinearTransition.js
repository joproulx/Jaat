
var LinearTransition = Class.extend({
    init: function(){
        this.StartTimestamp = null;
        this.EndTimestamp = null;
        this.StartValue = null;
        this.EndValue = null;
    },
    getValue: function(t){
        if (t < this.StartTimestamp || t > this.EndTimestamp){
            throw "Invalid timestamp";
        }

        var ratio = (t - this.StartTimestamp) / (this.EndTimestamp - this.StartTimestamp);

        return (ratio * (this.EndValue - this.StartValue)) + this.StartValue;
    }
});

