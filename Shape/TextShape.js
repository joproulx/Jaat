var TextShape = Class.extend(
    {
        init: function(text, x, y)
        {
            this.Text = text;
            this.FillStyle    = '#AAAAAA';
            this.Font         = 'bold 24px segoe';
            this.TextBaseline = 'top';
            this.X = x;
            this.Y = y;

        },
        render: function(context)
        {
            context.fillStyle    = this.FillStyle;
            context.font         = this.Font;
            context.textBaseline = this.TextBaseline;
            context.fillText(this.Text, this.X, this.Y);
        }


    });