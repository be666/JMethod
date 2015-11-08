/**
 * auth : bqxu
 * create_at: 15/11/5.
 * desc:
 * note:
 *  1.
 */
define('controller/play/video', [], function (require, exports, module) {

    var utils = gxb.utils;
    var $ = jQuery;
    gxb.script.insert([
        gxb.contextPath + "/js/jwplayer/jwplayer.js"
    ], function () {
        initKey();
    });
    var initKey = function () {
        jwplayer.key = "d3/ZVrqsMFQWfLkS2rZ6MslMir0pvXWmPMgSYA==";
    };

    var _playerId = null;
    var getMediaSourceDef = function (video, host) {
        host = host || {};
        var hostUrl = host ['hostUrl'] || "";
        var hosts = [];
        var prefixImage = "/lcms/video/cover/";
        var prefixVideo = "/lcms/video/file/";
        var prefixSrt = "/lcms/video/srt/";
        if (hostUrl.length > 0) {
            hosts.push({
                prefixImage: hostUrl + prefixImage,
                prefixVideo: hostUrl + prefixVideo,
                prefixSrt: hostUrl + prefixSrt,
                title: "校内"
            })
        }
        hosts.push({
            prefixImage: gxb.wangsu.image_bucket_domain + prefixImage,
            prefixVideo: gxb.wangsu.video_bucket_domain + prefixVideo,
            prefixSrt: gxb.wangsu.default_bucket_domain + prefixSrt,
            title: "wangsu"
        });

        return makePlayList(video, hosts);
    };

    var resizePlayer = function () {
        gxb.resize.push(function video() {
            if (_playerId != null) {
                if ($("#" + _playerId).length == 0) {
                    gxb.resize.pop("resizeVideo");
                }
                var width = $("#" + _playerId).parent().get(0).offsetWidth;
                var height = width * 9 / 16;
                var playerInstance = jwplayer(_playerId);
                if (playerInstance.getWidth() == width) {
                    return;
                }
                playerInstance.resize(width, height);
            }
        });
    }
    var makePlayList = function (video, hosts) {
        var title = video['title'];
        var urlFile = video['file'];
        var urlUUid = video['uuid'];
        var urlCover = video['cover'];
        var urlSrt = video['srt'];
        var a = ["mp4", "webm"];
        var b = ["_trans1080p", "_trans720p", "_trans480p", "_trans360p"];
        var list = [];
        for (var hk in hosts) {
            var host = hosts[hk];
            var sources = [];
            for (var ak in a) {
                var av = a[ak];
                for (var bk in b) {
                    var bv = b[bk];
                    sources.push({
                        label: bv.substring(6, bv.length),
                        file: host['prefixVideo'] + urlUUid + bv + "." + av,
                        type: av
                    });
                }
                list.push({
                    image: host.prefixImage + urlCover,
                    title: host.title + "-" + av,
                    sources: sources,
                    tracks: [
                        {
                            file: host.prefixSrt + urlSrt,
                            kind: "chapters",
                            label: "字幕"
                        }
                    ]
                });
            }
        }
        return list;
    }

    var getMediaSourceExt = function (video) {
        var hosts = [];
        var prefixImage = "/lcms/video/cover/";
        var prefixVideo = "/lcms/video/file/";
        var prefixSrt = "/lcms/video/srt/";
        hosts.push({
            prefixImage: gxb.qiniu.image_bucket_domain + prefixImage,
            prefixVideo: gxb.qiniu.video_bucket_domain + prefixVideo,
            prefixSrt: gxb.qiniu.default_bucket_domain + prefixSrt,
            title: "qiniu"
        });
        return makePlayList(video, hosts);
    }


    module.exports = function (targetId, params) {
        _playerId = targetId;
        initKey();
        var video = params['video'] || {};
        if (utils.isEmptyObj(video)) {

            return;
        }
        var host = params['host'] || {};
        var playerInstance = jwplayer(targetId);

        var playlist = getMediaSourceDef(video, host);
        var width = $("#" + targetId).parent().get(0).offsetWidth;
        var height = width * 9 / 16;

        playerInstance.setup({
            modes: [
                {type: "html5"},
                {type: "flash"},
                {type: "download"}
            ],
            aspectratio: "16:9",
            autostart: false,// 自动播放
            controls: true,
            height: height,
            width: width,
            playlist: playlist,
            captions: {
                color: '000000',
                fontSize: "12",
                fontOpacity: "50",
                backgroundColor: "ffffff"
            },

            logo: {
                file: "",
                hide: false,
                link: "http://www.gaoxiaobang.com",
                margin: 10,
                position: ""
            },

            hlslabels: {
                "2500": "High",
                "1000": "Medium"
            },
            repeat: "false",// 循环播放 def false
            primary: "html5"

        });

        var func = function () {
            console.log(arguments);
        };
        playerInstance.play();
        playerInstance.on('all', func);
        playerInstance.on('ready', func);
        playerInstance.on('setupError', func);
        playerInstance.on('remove', func);
        playerInstance.on('playlist', func);
        playerInstance.on('playlistItem', func);
        playerInstance.on('playlistComplete', func);
        playerInstance.on('bufferChange', func);
        playerInstance.on('play', func);
        playerInstance.on('pause', func);
        playerInstance.on('buffer', func);
        playerInstance.on('idle', func);
        playerInstance.on('complete', func);
        playerInstance.on('playAttempt', func);
        playerInstance.on('firstFrame', func);
        playerInstance.on('error', function () {
            var playIndex = playerInstance.getPlaylistIndex();
            if (playIndex + 1 == playlist.length &&
                playlist.length == playerInstance.getPlaylist().length) {
                var list = playlist.concat(getMediaSourceExt(video));
                playerInstance.load(list)
            }
            if (playIndex + 1 < playerInstance.getPlaylist().length) {
                playerInstance.playlistItem(playIndex + 1);
            }
            playerInstance.pause();
        });
        playerInstance.on('seek', func);
        playerInstance.on('seeked', func);
        playerInstance.on('time', func);
        playerInstance.on('mute', func);
        playerInstance.on('volume', func);
        playerInstance.on('fullscreen', func);
        playerInstance.on('resize', func);
        playerInstance.on('levels', func);
        playerInstance.on('levelsChanged', func);
        playerInstance.on('visualQuality', func);
        playerInstance.on('audioTracks', func);
        playerInstance.on('audioTrackChange', func);
        playerInstance.on('captionsList', func);
        playerInstance.on('captionsChanged', func);
        playerInstance.on('controls', func);
        playerInstance.on('displayClick', func);
        playerInstance.on('beforePlay', func);
        playerInstance.on('beforeComplete', func);
        playerInstance.on('adClick', func);
        playerInstance.on('adCompanions', func);
        playerInstance.on('adComplete', func);
        playerInstance.on('beforePlay', func);
        playerInstance.on('adSkipped', func);
        playerInstance.on('adError', func);
        playerInstance.on('adRequest', func);
        playerInstance.on('adStarted', func);
        playerInstance.on('adImpression', func);
        playerInstance.on('adTime', func);
        playerInstance.on('adPause', func);
        playerInstance.on('adPlay', func);
        playerInstance.on('meta', func);
        resizePlayer();
    };
    gxb.controller.play = gxb.controller.play || {};
    gxb.controller.play.video = module.exports;
})
;