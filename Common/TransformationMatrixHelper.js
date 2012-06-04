function getRotationMatrix(rad) {
    //var rad = parseFloat(deg) * (Math.PI / 180);
    var costheta = Math.cos(rad);
    var sintheta = Math.sin(rad);

    var a = costheta,
        b = sintheta,
        c = -sintheta,
        d = costheta;

    return $M([
        [a, c, 0],
        [b, d, 0],
        [0, 0, 1]
    ]);
}
function getTranslationMatrix(x, y) {
    return $M([
        [1, 0, x],
        [0, 1, y],
        [0, 0, 1]
    ]);
}
function getTransformationMatrix(rad, tx, ty) {
    //var rad = parseFloat(deg) * (Math.PI / 180);
    var costheta = Math.cos(rad);
    var sintheta = Math.sin(rad);

    var a = costheta,
        b = sintheta,
        c = -sintheta,
        d = costheta;

    return $M([
        [a, c, tx],
        [b, d, ty],
        [0, 0, 1]
    ]);
}
function getTransformationFromPoint(matrix, x, y) {

    // We want to determine the translation in the transformed coordinate system
    // that gave us the specified point in the cartesian coordinate system
    //
    // The transformation is defined with this matrix:
    // [cos(theta), -sin(theta), tx]
    // [sin(theta),  cos(theta), ty]
    // [0         ,  0         , 1]
    //
    // This gives us these equations:
    // x' = tx + cos(theta)*x - sin(theta)*y
    // y' = ty + sin(theta)*x - cos(theta)*y
    //
    // 2 equations with 2 unkwnowns... that what this function solves


    var tx = matrix.e(1, 3);
    var ty = matrix.e(2, 3);
    var cosTheta = matrix.e(1, 1);
    var sinTheta = matrix.e(2, 1);
    var resultX = x;
    var resultY = y;

    if (cosTheta == 0) {
                       var test = 0;

    }
    else {
        var tanTheta = sinTheta / cosTheta;
        x = ((resultX - tx + tanTheta * resultY - tanTheta * ty) / cosTheta) / (1 + (tanTheta * tanTheta));
        y = (resultY - ty - sinTheta * x) / cosTheta;
    }

    return getTranslationMatrix(x, y);
}
function getRotationRadian(matrix){
   return Math.acos(matrix.e(1,1));
}
function getTranslationX(matrix){
    return matrix.e(1,3);
}

function getTranslationY(matrix){
    return matrix.e(2,3);
}
