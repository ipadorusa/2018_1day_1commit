/* logo */
(function() {
    var logo,
        logoImage,
        canvas;
    var ctrSearchform = $('.search_input');
    var $line = $('.line');
    var $search_placehoder = $('.search_placehoder');
    function loadEvent() {
        canvas.style.display = 'none';
        ctrSearchform.addClass('on');
        $line.addClass('on');
        setTimeout(function() {
            ctrSearchform.addClass('on');
            $search_placehoder.show();
        }, 200);
        return false;
    }
    function gameLoop() {
        window.requestAnimationFrame(gameLoop);
        logo.update();
        logo.render();
    }
    function sprite(options) {
        var that = {},
            frameIndex = 0,
            tickCount = 0,
            ticksPerFrame = options.ticksPerFrame || 0,
            numberOfFrames = options.numberOfFrames || 1;
        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;
        that.update = function() {
            tickCount += 1;
            if (tickCount > ticksPerFrame) {
                tickCount = 0;
                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    loadEvent();
                }
            }
        };
        that.render = function() {
            // Clear the canvas
            that.context.clearRect(0, 0, that.width, that.height);
            // Draw the animation
            that.context.drawImage(
                that.image,
                frameIndex * that.width / numberOfFrames,
                0,
                that.width / numberOfFrames,
                that.height,
                0,
                0,
                that.width / numberOfFrames,
                that.height);
        };
        return that;
    }
    // Get canvas
    canvas = document.getElementById("sri_m_logo");
    canvas.width = 122;
    canvas.height = 38;
    // Create sprite sheet
    logoImage = new Image();
    // Create sprite
    logo = sprite({
        context: canvas.getContext("2d"),
        width: 3050,
        height: 38,
        image: logoImage,
        numberOfFrames: 25,
        ticksPerFrame: 1
    });
    // Load sprite sheet
    logoImage.addEventListener("load", gameLoop);
    logoImage.src = "//www.saraminimage.co.kr/sri/mobile/sri_m_logo.png";
}());