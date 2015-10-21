﻿// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var vidids = ['vZv9-TWdBJM', '5hEh9LiSzow', 'zzzzzz']
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
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

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED && vidids.length > 0) {
        var playersrc = $("#player").attr("src", "https://www.youtube.com/embed/"+vidids.shift()+"?enablejsapi=1");
    }
}
function stopVideo() {
    player.stopVideo();
}