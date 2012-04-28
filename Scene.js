/**
 * Created by JetBrains WebStorm.
 * User: Jo
 * Date: 04/02/12
 * Time: 5:59 AM
 * To change this template use File | Settings | File Templates.
 */
function Scene(sceneGroup)
{
    this.render = Scene_render;
}


function Scene_render(context, timestamp)
{
    for(var i = 0; i < this.m_arraySceneItems.length; i++)
    {
        this.m_arraySceneItems[i].render(context, timestamp);
    }
}