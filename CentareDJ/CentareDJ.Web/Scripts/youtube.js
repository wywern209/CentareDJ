$(function () {
    $('#AddSong').click(function () {
        var url = $('#addSongUrl').val()
        if (url) {
            if (url.indexOf("&") == -1) {
                var videoId = url.split("=")[1];
                vidids.push(videoId);
            }
            else {
                var videoId = url.substring(url.indexOf("=") + 1, url.indexOf("&"));
                console.log(videoId);
                vidids.push(videoId);
            }
           
        }
        $('#addSongUrl').val("");
    });
});
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var vidids = ['vZv9-TWdBJM', '5hEh9LiSzow']
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
        player.loadVideoById(vidids.shift());       
    }
}
function stopVideo() {
    player.stopVideo();
}