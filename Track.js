/**
 * Created by JetBrains WebStorm.
 * User: Jo
 * Date: 04/02/12
 * Time: 5:59 AM
 * To change this template use File | Settings | File Templates.
 */
function Track()
{
    //    this.addTransition = function(transition)
//    {
//        this.m_transitions.push(transition);
//    }

    this.render = function(context, timestamp)
    {
        // Todo: improve performance by avoiding getting always the last keyframe
        var keyFrame = this.getPreviousKeyFrame(timestamp);

        if (keyFrame != null)
        {
            if (keyFrame.Transition != null)
            {
                keyFrame.Transition.render(context, timestamp);
            }
            else
            {
                keyFrame.render(context, timestamp);
            }
        }
    }

    this.getPreviousKeyFrame = function(timestamp)
    {
        var result = null;

        for(var i = 0; i < this.m_keyFrames.length; i++)
        {
            var keyFrame = this.m_keyFrames[i];
            if (keyFrame.Timestamp <= timestamp)
            {
                result = keyFrame;
            }
            else
            {
                break;
            }
        }
        return result;
    }

    this.getNextKeyFrame = function(timestamp)
    {
        var result = null;

        for(var i = 0; i< this.m_keyFrames.length; i++)
        {
            var keyFrame = this.m_keyFrames[i];

            if (keyFrame.Timestamp > timestamp)
            {
                result = keyFrame;
                break;
            }
        }
        return result;
    }

    this.generateTransitions = function()
    {
        var previousKeyFrame = null;
        for(var i = 0; i< this.m_keyFrames.length; i++)
        {
            var keyFrame = this.m_keyFrames[i];

            if (previousKeyFrame != null)
            {
                previousKeyFrame.Transition = new Transition(previousKeyFrame, keyFrame);
            }

            previousKeyFrame = keyFrame;
        }
    }


    this.addNewKeyFrame = function(timestamp)
    {
        var keyFrame;
        var previousKeyFrame = this.getPreviousKeyFrame(timestamp);

        if (previousKeyFrame)
        {
            keyFrame = previousKeyFrame.clone();
            keyFrame.Timestamp = timestamp;
        }
        else
        {
            keyFrame = new KeyFrame(timestamp);
        }

        this.m_keyFrames.push(keyFrame);
        this.m_keyFrames.sort(this.sortKeyFrames);
        return keyFrame;
    }

    this.sortKeyFrames = function(a, b)
    {
        if (a.Timestamp < b.Timestamp)
        {
            return -1;
        }

        if (a.Timestamp == b.Timestamp)
        {
            return 0;
        }

        if (a.Timestamp > b.Timestamp)
        {
            return 1;
        }
    }

    this.m_keyFrames = new Array();

    this.FirstKeyFrame = this.addNewKeyFrame(0);

}



