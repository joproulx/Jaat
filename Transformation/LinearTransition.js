
var LinearTransition = Class.extend({
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

        return (ratio * (this.EndValue - this.StartValue)) + this.StartValue;
    }
});

