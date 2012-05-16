var TimedValue = Class.extend(
    {
        init: function () {
            this.Values = new Array();
        },
        get: function(timestamp)
        {
            var previous=null;
            var actualValue = null;

            _.find(this.Values, function(value, index){
                if (index == timestamp){
                    actualValue = value.Value;
                    return true;
                }
                if (index > timestamp){
                    return true;
                }
                previous = value;
                return false;
            }, this);

            if (actualValue != null){
                return actualValue;
            }

            if (previous != null){
                if (previous.Transition != null){
                    return previous.Transition.getValue(timestamp);
                }
                return previous.Value;
            }

            return null;
        },
        set: function(value, timestamp, transition)
        {
            var currentTransition = null;

            if (transition != undefined &&
                transition != null){
                var previousValue = null;
                var previousTimestamp = null;
                _.find(this.Values, function(value, index){
                    if (index == timestamp){
                        currentTransition = value.Transition;
                        return true;
                    }
                    if (index > timestamp){
                        currentTransition = previousValue.Transition;
                        return true;
                    }
                    previousValue = value;
                    previousTimestamp = index;
                    return false;
                });

                if (previousValue != null)
                {
                    previousValue.Transition = transition;
                    transition.StartTimestamp = previousTimestamp;
                    transition.EndTimestamp = timestamp;
                    transition.StartValue = previousValue.Value;
                    transition.EndValue = value;
                }
            }

            if (currentTransition != null)
            {
                currentTransition.StartTimestamp = timestamp;
                currentTransition.StartValue = value;
            }

            this.Values[timestamp] = { Value:value, Transition:currentTransition };

        }
    });
