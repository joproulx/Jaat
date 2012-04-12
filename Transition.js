/**
 * Created by JetBrains WebStorm.
 * User: Jo
 * Date: 11/02/12
 * Time: 12:59 PM
 * To change this template use File | Settings | File Templates.
 */

//Array.prototype.first = function()
//{
//    if (this.length == 0)
//    {
//        return NaN;
//    }
//
//    for (var item in this)
//    {
//        return item;
//    }
//};

function Transition(startKeyFrame, endKeyFrame)
{

    this.StartKeyFrame = startKeyFrame;
    this.EndKeyFrame = endKeyFrame;
    this.Transformations = new Array();
    this.Elements = new Array();

    this.generateTransformations = Transition_generateTransformations;
    this.render = Transition_render;
    this.copy = Transition_copy;
    this.clone = Transition_clone;


    this.generateTransformations();
}


function Transition_generateTransformations()
{
    var thisObj = this;
    this.StartKeyFrame.Elements.forEach(function(element)
    {
        thisObj.Elements.push(element.clone());
    });

    for(var i = 0; i < this.Elements.length; i++)
    {
        var element = this.Elements[i];
        var correspondingElement = null;

        var elements = this.EndKeyFrame.Elements.filter(function(item){ return item.Id == element.Id; });

        for(var j = 0; j < elements.length; j++)
        {
            correspondingElement = elements[j];
            break;
        }

        if (correspondingElement != null)
        {
            var thisObj = this;
            element.getTransformations(correspondingElement).forEach(function(item)
            {
                thisObj.Transformations.push(item);
            });
        }
    }
}

function Transition_render(timestamp)
{
    var start = this.StartKeyFrame.Timestamp;
    var end = this.EndKeyFrame.Timestamp;

    if (timestamp < start || timestamp > end)
    {
        return;
    }

    var diff = end - start;

    var ratio = (timestamp - start) / diff;


    for(var i = 0; i < this.Transformations.length; i++)
    {
        var transformation = this.Transformations[i];
        transformation.updateValue(ratio);
    }

    for(var i = 0; i < this.Elements.length; i++)
    {
        var element = this.Elements[i];
        element.render(timestamp);
    }
}

function Transition_copy(other)
{
    this.StartKeyFrame = other.StartKeyFrame.clone();
    this.EndKeyFrame = other.EndKeyFrame.clone();

    // todo: find a way to clone transformation

    other.Transformations.forEach(function(item)
    {
        this.Transformations.push(item.clone());
    });

    other.Elements.forEach(function(item)
    {
        this.Elements.push(item.clone());
    });
}


function Transition_clone()
{
    var newTransition = new Transition();
    newTransition.copy(this);
    return newTransition;
}


