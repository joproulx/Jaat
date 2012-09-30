define(['libs/ctor/ctor'],
    function (Ctor) {
        var Transition = Ctor(function () {
            this.init = function () {
                this.StartTimestamp = null;
                this.EndTimestamp = null;
                this.StartValue = null;
                this.EndValue = null;
            }
        });
        return Transition;
    });