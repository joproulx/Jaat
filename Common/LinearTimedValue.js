var LinearTimedValue = TimedValue.extend(
{
    init:function (defaultValue) {
        this._super(function() { return new LinearTransition(); });

        if (arguments.length === 1){
            this.set(0, defaultValue);
        }
    }
});