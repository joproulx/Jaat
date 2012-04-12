/**
 * Created by JetBrains WebStorm.
 * User: Jo
 * Date: 01/03/12
 * Time: 9:06 PM
 * To change this template use File | Settings | File Templates.
 */

var PathTransformation = Class.extend(
    {
        init: function(dynamicValue, path, argumentProvider)
        {
            this.DynamicValue = dynamicValue;
            this.Path = path;
            this.ArgumentProvider = argumentProvider;
        },
        update : function(timestamp)
        {
            var argument = this.ArgumentProvider.getArgument(timestamp);
            if(argument >= 0 && argument <= 1)
            {
                this.DynamicValue.set(this.Path.pointFromRatio(argument));
            }
        }
    });
