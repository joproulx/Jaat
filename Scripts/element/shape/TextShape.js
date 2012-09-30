define([
    'libs/ctor/ctor'],
    function (Ctor) {
        var TextShape = Ctor(function () {
            this.init = function (text, x, y) {
                this.Text = text;
                this.FillStyle = '#AAAAAA';
                this.Font = 'bold 24px segoe';
                this.TextBaseline = 'top';
                this.X = x;
                this.Y = y;
            };
            this.render = function (context) {
                context.fillStyle = this.FillStyle;
                context.font = this.Font;
                context.textBaseline = this.TextBaseline;
                context.fillText(this.Text, this.X, this.Y);
            };
        });
        return TextShape;

    });