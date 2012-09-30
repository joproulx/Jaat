define(['libs/ctor/ctor'], function (Ctor) {
    var Event = Ctor(function () {
        var _eventHandlers = [];

        this.subscribe = function (eventHandler, context) {
            _eventHandlers.push({ EventHandler:eventHandler, Context:context});
        };
        this.unsubscribe = function (eventHandler) {
            var index = _eventHandlers.indexOf(eventHandler);
            if (index != -1) {
                _eventHandlers.splice(index, 1);
            }
        };
        this.trigger = function (arg1, arg2, arg3) {
            for (var i = 0; i < _eventHandlers.length; i++) {
                _eventHandlers[i].EventHandler(_eventHandlers[i].Context, arg1, arg2, arg3);
            }
        };
    });

    return Event;
});