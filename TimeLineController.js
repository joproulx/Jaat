/**
 * Created by JetBrains WebStorm.
 * User: Jo
 * Date: 04/02/12
 * Time: 5:59 AM
 * To change this template use File | Settings | File Templates.
 */


function TimeLineController(startTimestamp, endTimestamp, context) {

    this.Context = context;
    this.onTimeout = TimeLineController_onTimeout;
    this.start = TimeLineController_start;
    this.stop = TimeLineController_stop;
    this.seek = TimeLineController_seek;
    this.renderFrame = TimeLineController_renderFrame;

    this.BeforeRenderEvent = new Event();
    this.RenderEvent = new Event();

    this.StartTimestamp = startTimestamp;
    this.EndTimestamp = endTimestamp;

    this.CurrentTime = 0;
    this.m_timer = new Timer(this, this.onTimeout);
    this.IsStarted = false;
}

function TimeLineController_start(startTime)
{
    this.IsStarted = true;
    this.CurrentTime = startTime;
    this.m_timer.start();
}

function TimeLineController_stop()
{
    this.IsStarted = false;
    this.m_timer.stop();
}

function TimeLineController_seek(t)
{
    this.CurrentTime = t;

    if (!this.IsStarted)
    {
        this.renderFrame(this.CurrentTime, this.Context);
    }
}

function TimeLineController_onTimeout(from, elapsedTime)
{
    from.CurrentTime += elapsedTime;
    from.renderFrame(from.CurrentTime, from.Context);
}

function TimeLineController_renderFrame(t, context)
{
    this.BeforeRenderEvent.trigger(t, context);
    this.RenderEvent.trigger(t, context);
}
