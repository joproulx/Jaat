/**
 * Created with JetBrains WebStorm.
 * User: jo
 * Date: 7/15/12
 * Time: 10:58 AM
 * To change this template use File | Settings | File Templates.
 */
var CachedTimedValue = Class.extend({
    init:function () {
        this.invalidate();
    },
    set:function(start, end, value, transition){
        this.Start = start;
        this.End = end;
        this.Transition = transition;
    },
    get:function(timestamp){
        if (timestamp >= this.Start && (timestamp <= this.End || this.End == -1)){
            if (this.Transition != null){
                return this.Transition.get(timestamp);
            }
            return this.Value;
        }
        return undefined;
    },
    invalidate:function(){
        this.Start = -1;
        this.End = -1;
        this.Value = null;
        this.Transition = null;
    }
});