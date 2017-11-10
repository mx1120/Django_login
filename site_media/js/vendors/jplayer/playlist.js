define(function( require, exports, module){

/* 一个连续播放多声音的类
 *
 * 参数:
 * selector: jquery对象, 如$('#player')
 * audio_list: 声音文件列表, 如['a.mp3', '../b.mp3']
 * 属性:
 * auto_next: false/*true
 * delay: 播放下一个前的延迟时间(毫秒)
 *
 * 用法:
 * var pl = new Playlist($('#player'));
 * pl.load(['a.mp3']);
 * pl.play(0);
 * pl.stop();
 *
 * 注意:
 * selector最好不要放在内层, 不然播不了flv..
 */
function Playlist(selector, audio_list) {
    var self = this;
    this.player_obj = selector;
    this.audio_list = [];
    this.i = -1;
    this.auto_next = true;
    this.delay = 0;
    this._timer = null;
    this.onplay = null;
    this.onend = null;
    this.onpause = null;
    this.onfinish = null; // 全播完回调
    this.onselected = null; // select完回调

    this.player_obj.jPlayer({
        ready: function () {
        },
        loadeddata: function(event) {
            if (self.onselected) {
                self.onselected(event);
            }
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
                self.onplay();
        },
        pause: function(event) {
            if (self.onpause)
                self.onpause();
        },
        ended: function(event) {
            if (self.onend)
                self.onend();
            if (self.i >= self.audio_list.length-1) {
                if (self.onfinish)
                    self.onfinish();
                return;
            }
            if (self.auto_next) {
                self.clear_timer();
                self._timer = setTimeout(function() {
                    var ok = self.next();
                    if (ok)
                        self.play();
                }, self.delay);
            }
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

Playlist.prototype = {
    set_playlist: function(audio_list) {
        this.audio_list = audio_list;
    },
    select: function(index) {
        this.i = index;
        var path = this.audio_list[this.i];
        var ext = path.substring(path.lastIndexOf(".")+1);
        var arg = {};
        if (ext == 'flv')
            arg['flv'] = path;
        else
            arg['mp3'] = path;
        this.player_obj.jPlayer("setMedia", arg);
    },
    next: function() {
        this.i++;
        if (this.i < this.audio_list.length) {
            this.select(this.i);
            return true;
        } else {
            this.i = 0;
            return false;
        }
    },
    clear_timer: function() {
        if (this._timer)
            clearTimeout(this._timer);
        this._timer = null;
    },
    play: function(index) {
        if (index !== undefined)
            this.select(index);
        else if (this.i < 0)
            this.select(0);
        this.clear_timer();
        this.player_obj.jPlayer('play');
    },
    pause: function() {
        this.clear_timer();
        this.player_obj.jPlayer('pause');
    },
    stop: function() {
        this.clear_timer();
        this.player_obj.jPlayer('stop');
        this.i = -1;
    }
};

Playlist.prototype.load = Playlist.prototype.set_playlist;

return Playlist;

})
