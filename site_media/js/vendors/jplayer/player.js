define(function( require, exports, module){
/*
 * 播放单个声音的类
 */
function Player(selector) {
    var self = this;
    this.selector = selector;
    this.onend = null;

    this.selector.jPlayer({
        ready: function () {
        },
        timeupdate: function(e) {
            var o = e.jPlayer.status;
            if (self.onplaying) {
                // 当前时间,总时间
                self.onplaying(o.currentTime,o.duration);
            }
        },
        play: function(event) {
            if (self.onplay)
                self.onplay(event);
        },
        pause: function(event) {
        },
        ended: function(event) {
            if (self.onend)
                self.onend(event);
        },
        swfPath: "/site_media/js/vendors/jplayer",
        cssSelectorAncestor: "",
        supplied: "mp3, flv",
        wmode: "transparent",
        size: {
            width: "0px",
            height: "0px"
        }
    });
}

Player.prototype = {
    select: function(path) {
        var ext = path.substring(path.lastIndexOf(".")+1);
        var arg = {};
        if (ext == 'flv')
            arg['flv'] = path;
        else
            arg['mp3'] = path;
        this.selector.jPlayer("setMedia", arg);
    },
    play: function(path) {
        if (path !== undefined)
            this.select(path);
        this.selector.jPlayer("play");
    },
    pause: function() {
        this.selector.jPlayer("pause");
    },
    stop: function() {
        this.selector.jPlayer("stop");
    }
};

return Player;

})