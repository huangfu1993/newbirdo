define(function(require, exports, module) {
    var getImgObj = require('./getImgObj')
    var Bird = require('./bird')
    var Sky = require('./sky')
    var Land = require('./land')
    var Pipe = require('./pipe')

    function Game() {

    }

    Game.run = function() {
        // 获取canvasDOM对象
        var nCvs = document.getElementById('cvs');
        // 获取2d绘图环境
        var ctx = nCvs.getContext('2d');

        // 对于一个游戏来说，应该有一个 Game 类
        // Game 类 应该有一个 run  方法
        // 还应该有一个 stop 停止游戏方法

        // 通过getImgObj来获取图像对象，然后通过回调函数来接收全部图像对象
        getImgObj(function(imgObj) {

            // 初始化鸟类，把鸟类需要的图像对象传进去
            Bird.init(imgObj['birds']);

            // 创建一个小鸟对象
            var bird = new Bird(nCvs, ctx, 10, 10, 52, 45);

            // 监听画布点击事件
            nCvs.addEventListener('click', function() {
                // 让小鸟update时，y轴减2
                bird.speed = -2;
            });

            // 初始化天空
            Sky.init(imgObj['sky']);

            // 创建两个天空对象
            var skys = [];
            for (var i = 0; i < 2; i++) {
                skys.push(new Sky(nCvs, ctx, imgObj['sky'].width * i));
            }

            // 初始化大地
            Land.init(imgObj['land']);

            // 创建4个大地对象
            var lands = [];
            for (var i = 0; i < 4; i++) {
                lands.push(new Land(nCvs, ctx, imgObj['land'].width * i));
            }

            // 初始化
            Pipe.init(imgObj['pipeDown'], imgObj['pipeUp']);

            // 为了防止游戏还没开始就结束了，所以第一个管道需要有一个比较大的间隔
            // 左右管道之间的距离是2个管道宽
            var pipes = [];
            for (var i = 0; i < 6; i++) {
                pipes.push(new Pipe(nCvs, ctx, 200 + imgObj['pipeDown'].width * 3 * i));
            }

            var timer = setInterval(function() {

                // 检测小鸟的中心点在不在管道路径中（碰撞检测）
                if (ctx.isPointInPath(bird.x + bird.width / 2, bird.y + bird.height / 2)) {
                    clearInterval(timer);
                }

                // 清除画布
                ctx.clearRect(0, 0, nCvs.width, nCvs.height);

                // 新开路径,这样当前保留的管道路径就不会重复了
                ctx.beginPath();

                // 天空相关
                skys.forEach(function(val, idx) {
                    val.draw();
                    val.update();
                });

                // 管道相关
                pipes.forEach(function(val, idx) {
                    val.draw();
                    val.update();
                });

                // 大地相关
                lands.forEach(function(val, idx) {
                    val.draw();
                    val.update();
                });

                // 小鸟相关
                bird.draw();
                bird.update();

            }, 1000 / 60);
        });
    }
    module.exports = Game
})
