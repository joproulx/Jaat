/**
 * Created by JetBrains WebStorm.
 * User: Jo
 * Date: 12/02/12
 * Time: 11:55 AM
 * To change this template use File | Settings | File Templates.
 */
function generateGuid() {
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}