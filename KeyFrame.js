/**
 * Created by JetBrains WebStorm.
 * User: Jo
 * Date: 12/02/12
 * Time: 12:37 PM
 * To change this template use File | Settings | File Templates.
 */
function KeyFrame(timestamp)
{
    this.Timestamp = timestamp;
    this.Transition = null;
    this.Elements = new Array();

    this.copy = function(other)
    {
        this.Timestamp = other.Timestamp;
        this.Transition = null;

        for(var i = 0; i< other.Elements.length; i++)
        {
            var element = other.Elements[i];
            this.Elements.push(element.clone());
        }
    }

    this.clone = function()
    {
        var newKeyFrame = new KeyFrame();

        newKeyFrame.copy(this);



        return newKeyFrame;
    }

    this.addElement = function(element)
    {
        this.Elements.push(element.clone());
    }

    this.addElements = function(elements)
    {
        for (var i = 0; i < elements.length; i++)
        {
            this.addElement(elements[i]);
        }
    }


    this.getElement = function(id)
    {
        for(var i = 0; i< this.Elements.length; i++)
        {
            if (this.Elements[i].Id == id)
            {
                return this.Elements[i];
            }
        }
        return null;
    }



    this.render = function(context, timestamp)
    {

        for(var i = 0; i< this.Elements.length; i++)
        {
            var element = this.Elements[i];
            element.render(context, timestamp);
        }
    }
}




