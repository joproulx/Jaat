/**
 * Created by JetBrains WebStorm.
 * User: Jo
 * Date: 04/02/12
 * Time: 5:59 AM
 * To change this template use File | Settings | File Templates.
 */
function SceneGroup(sceneGroup)
{
    this.m_parentSceneGroup = sceneGroup;

    this.m_arraySceneItems = new Array();

    this.createScene = SceneGroup_createScene;
    this.createSceneGroup = SceneGroup_createSceneGroup;
    this.render = SceneGroup_render;
    this.addToScene = SceneGroup_addToScene;
}

function SceneGroup_createSceneGroup(name)
{
    return this.addToScene(new SceneGroup(this));
}

function SceneGroup_createScene(name)
{
    return this.addToScene(new Scene(this));
}

function SceneGroup_addToScene(name, item)
{
    this.m_arraySceneItems[name] = item;
    return item;
}

function SceneGroup_render(context, timestamp)
{
    for(var i in this.m_arraySceneItems)
    {
        this.m_arraySceneItems[i].render(context, timestamp);
    }
}