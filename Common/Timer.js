/**
 * Created by JetBrains WebStorm.
 * User: Jo
 * Date: 11/02/12
 * Time: 11:46 AM
 * To change this template use File | Settings | File Templates.
 */
function Timer(from, callback)
{
    this.m_from = from;
    this.Callback = callback;
    this.m_offset = 0;
    this.m_timerId = 0;

    this.getTickCount = Timer_getTickCount;
    this.start = Timer_start;
    this.stop = Timer_stop;
}

function Timer_start()
{
    if (this.m_timerId)
    {
        this.stop();
    }

    this.m_offset = this.getTickCount();

    var thisObj = this;


    function render(time)
    {
        var tickCount = thisObj.getTickCount();

        var elapsedTime = tickCount - thisObj.m_offset;
        thisObj.m_offset = tickCount;

        thisObj.Callback(thisObj.m_from, elapsedTime);
        thisObj.m_timerId = window.requestAnimationFrame(render);
    };

    this.m_timerId = window.requestAnimationFrame(render);

    this.m_isStarted = true;
}

function Timer_stop()
{
    this.m_isStarted = false;
    window.cancelAnimationFrame(this.m_timerId);
}

function Timer_getTickCount()
{
    return new Date().getTime();
}