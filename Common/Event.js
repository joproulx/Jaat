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

Event.prototype.subscribe = function(eventHandler){
    this.eventHandlers.push(eventHandler);
}

Event.prototype.unsubscribe = function(eventHandler){
    var index = this.eventHandlers.indexOf(eventHandler);

    if (index != -1)
    {
        this.eventHandlers.splice(index, 1);
    }
}

Event.prototype.trigger = function(args){

    for(var i = 0; i < this.eventHandlers.length; i++){
        this.eventHandlers[i](args);
    }
}