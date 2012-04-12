/**
 * Created by JetBrains WebStorm.
 * User: Jo
 * Date: 01/03/12
 * Time: 8:35 PM
 * To change this template use File | Settings | File Templates.
 */

var DynamicProperty = Class.extend(
{
    init: function(value)
    {
        this.Value = value;
    },
    get: function()
    {
        return this.Value;
    },
    set: function(value)
    {
        this.Value = value;
    }
});