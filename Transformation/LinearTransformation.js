
var LinearTransformation = Class.extend(
{
    init: function(dynamicValue, startValue, endValue, argumentProvider)
    {
        this.DynamicValue = dynamicValue;
        this.StartValue = startValue;
        this.EndValue = endValue;
        this.ArgumentProvider = argumentProvider;
    },
    update : function(timestamp)
    {
        var argument = this.ArgumentProvider.getArgument(timestamp);
        if(argument >= 0 && argument <= 1)
        {
            this.DynamicValue.set(argument * (this.EndValue - this.StartValue) + this.StartValue);
        }
    }
});
