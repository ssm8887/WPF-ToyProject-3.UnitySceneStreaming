import { VideoPlayer } from "./video-player.js";
import { registerGamepadEvents, registerKeyboardEvents, registerMouseEvents, sendClickEvent } from "./register-events.js";
import { startGamepadDetection } from "./gamepadEvents.js";

let playButton;
let videoPlayer;

showPlayButton();
// onClickPlayButton();

window.document.oncontextmenu = function () {
  return false;     // cancel default menu
}

window.addEventListener('resize', function() {
  videoPlayer.resizeVideo();
}, true);


function showPlayButton() {
  if (!document.getElementById('playButton')) {
    let elementPlayButton = document.createElement('img');
    elementPlayButton.id = 'playButton';
    elementPlayButton.src = 'images/Play.png';
    elementPlayButton.alt = 'Start Streaming';
    playButton = document.getElementById('player').appendChild(elementPlayButton);
    playButton.addEventListener('click', onClickPlayButton);
  }
}

async function onClickPlayButton() {

  playButton.style.display = 'none';

  const playerDiv = document.getElementById('player');

  // add video player
  const elementVideo = document.createElement('video');
  elementVideo.id = 'Video';
  elementVideo.style.touchAction = 'none';
  playerDiv.appendChild(elementVideo);

  // add video thumbnail
  const elementVideoThumb = document.createElement('video');
  elementVideoThumb.id = 'VideoThumbnail';
  elementVideoThumb.style.touchAction = 'none';
  playerDiv.appendChild(elementVideoThumb);

  setupVideoPlayer([elementVideo, elementVideoThumb]).then(value => videoPlayer = value);

  // add fullscreen button
  // const elementFullscreenButton = document.createElement('img');
  // elementFullscreenButton.id = 'fullscreenButton';
  // elementFullscreenButton.src = 'images/FullScreen.png';
  // playerDiv.appendChild(elementFullscreenButton);
  // elementFullscreenButton.addEventListener ("click", function() {
  //   if (!document.fullscreenElement) {
  //     if(document.documentElement.requestFullscreen) {
  //       document.documentElement.requestFullscreen();
  //     }
  //     else if(document.documentElement.webkitRequestFullscreen){
  //       document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  //     }
  //   }
  // });
  document.addEventListener('webkitfullscreenchange', onFullscreenChange);
  document.addEventListener('fullscreenchange', onFullscreenChange);

  function onFullscreenChange(e) {
    if(document.webkitFullscreenElement || document.fullscreenElement) {
      elementFullscreenButton.style.display = 'none';
    }
    else {
      elementFullscreenButton.style.display = 'block';
    }
  }
}

async function setupVideoPlayer(elements, config) {
  const videoPlayer = new VideoPlayer(elements, config);
  await videoPlayer.setupConnection();

  videoPlayer.ondisconnect = onDisconnect;
  registerGamepadEvents(videoPlayer);
  registerKeyboardEvents(videoPlayer);
  registerMouseEvents(videoPlayer, elements[0]);
  
  startGamepadDetection();
  return videoPlayer;
}

function onDisconnect() {
  const playerDiv = document.getElementById('player')
  clearChildren(playerDiv);
  videoPlayer = null;
  showPlayButton();
}

function clearChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}