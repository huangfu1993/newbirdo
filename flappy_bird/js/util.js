define(function(require, exports, module) {
    // 把角度转换为弧度
    module.exports.angleToRad = function(angle) {
        return Math.PI / 180 * angle;
    }

    // 把第二个对象的属性copy到第一个对象中
    module.exports.extend = function(obj1, obj2) {
        for (var key in obj2) {
            obj1[key] = obj2[key];
        }
    }
})
