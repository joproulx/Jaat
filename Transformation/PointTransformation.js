
var PointTransformation = Class.extend(
{
    init: function (point, startValue, endValue, startTime, endTime) {
        this.Point = point;
        this.StartValue = startValue;
        this.EndValue = endValue;
        this.StartTime = startTime;
        this.EndTime = endTime;
    },
    update: function (timestampRatio) {
        //var argument = this.getTimeRatio(timestamp);
        if (timestampRatio >= 0 && timestampRatio <= 1) {
            this.Point.X = (timestampRatio * (this.EndValue.X - this.StartValue.X) + this.StartValue.X);
            this.Point.Y = (timestampRatio * (this.EndValue.Y - this.StartValue.Y) + this.StartValue.Y);
        }
    },
    getTimeRatio: function(timestamp) {
        if (timestamp > this.EndTime || timestamp < this.StartTime)
        {
            return 0;   
        }
        return (timestamp - this.StartTime) / (this.EndTime - this.StartTime);
    }
});
