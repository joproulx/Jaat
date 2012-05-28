/**
 * Created by JetBrains WebStorm.
 * User: jproulx
 * Date: 13/02/12
 * Time: 12:37 PM
 * To change this template use File | Settings | File Templates.
 */
function Event(){
    this.eventHandlers = new Array();
}

Event.prototype.subscribe = function(eventHandler, context){
    this.eventHandlers.push({ EventHandler: eventHandler, Context: context} );
}

Event.prototype.unsubscribe = function(eventHandler){
    var index = this.eventHandlers.indexOf(eventHandler);

    if (index != -1)
    {
        this.eventHandlers.splice(index, 1);
    }
}

Event.prototype.trigger = function(arg1, arg2, arg3){

    for(var i = 0; i < this.eventHandlers.length; i++){
        this.eventHandlers[i].EventHandler(this.eventHandlers[i].Context, arg1, arg2, arg3);
    }
}