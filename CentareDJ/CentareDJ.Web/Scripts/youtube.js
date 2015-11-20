
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var videoHub;
var player;
var vidids = []
var currentlyPlaying = false;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: vidids.shift(),
        playerVars: {
            controls: 1,
            fs: 0,
            disablekb: 0,

        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED && vidids.length > 0) {
        currentlyPlaying = true;
        $('#SongNotPlaying').hide();
        $('#player').show()
        var nextId = vidids[0];
        player.loadVideoById(vidids.shift());
        videoHub.server.playNextVideo();
    }
    else if (event.data == YT.PlayerState.ENDED && vidids.length == 0) {
        $('#player').hide()
        $('#SongNotPlaying').show();
    }
    else {
        return;
    }
}
function stopVideo() {
    player.stopVideo();
}
$(function () {
    videoHub = $.connection.videoHub;
    $('#player').hide();

    $.connection.hub.start().done(function () {
        videoHub.server.connect();
    });

    videoHub.client.onConnect = function (videoId, secondsElapsed, queue) {
        vidids = queue;
        player.loadVideoById(videoId, secondsElapsed);
        $('#player').show();
        $('#SongNotPlaying').hide();
        currentlyPlaying = true;
    }

    videoHub.client.AddVideo = function (videoId) {
        $('#player').show();
        $('#SongNotPlaying').hide();
        vidids.push(videoId);
        if(vidids.length === 1 && !currentlyPlaying)
        {

            currentlyPlaying = true;
            console.log(vidids, currentlyPlaying);
            player.loadVideoById(vidids.shift());
        }
    };
    var addSong = function () {
        console.log("event fired!");
        var url = $('#AddSongUrl').val()
        if (url) {
            console.log("event fired!");
            var videoId = "";
            if (url.indexOf("&") == -1) {
                videoId = url.split("=")[1];
            }
            else {
                videoId = url.substring(url.indexOf("=") + 1, url.indexOf("&"));
            }

            videoHub.server.addVideo(videoId);
        }
        $('#AddSongUrl').val("");
    };
    $('#AddSong').click(addSong);
    $('#AddSongUrl').keyup(function (event) {
        if (event.keyCode == 13) {
            addSong();
        }
    });

});
