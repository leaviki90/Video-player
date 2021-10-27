const video = document.getElementById("video");
const play = document.getElementById("play");
const stops = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");
const sound = document.getElementById("sound");
const sliderVolume = document.getElementById("sliderVolume");
const fullScreen = document.getElementById("fullScreen");
const settings = document.getElementById("settings");

//play and pause the video

function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//update play-pause icon

function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

//update progress and timestamp

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  //get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  //get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }
  timestamp.innerHTML = `${mins}:${secs}`;
}

//set video time to progress

function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

//stop the video

function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

//turn off/on the sound
function toggleSound() {
  if (video.muted) {
    video.muted = false;
    // sliderVolume.value = 10;
    sound.firstElementChild.className = "fas fa-volume-up fa-2x";
  } else {
    video.muted = true;
    // sliderVolume.value = 0;
    sound.firstElementChild.className = "fas fa-volume-off fa-2x";
  }
}

//Set sound progress

// Volume slider
function setSoundProgress() {
  if (video.muted) {
    video.muted = false;
  }

  let theVolume = sliderVolume.value / 10;
  video.volume = theVolume;

  if (theVolume === 0) {
    sound.firstElementChild.className = "fas fa-volume-off fa-2x";
  } else if (theVolume === 1) {
    sound.firstElementChild.className = "fas fa-volume-up fa-2x";
  } else {
    sound.firstElementChild.className = "fas fa-volume-down fa-2x";
  }
}

//Toggle between full and small screen

function toggleScreen() {
  video.requestFullscreen();
}

//Show speed list (for video)

function showSpeedList() {
  let speedList = document.getElementById("speedList");
  speedList.addEventListener("change", changeSpeed);
  speedList.classList.toggle("active");
  function changeSpeed(event) {
    video.playbackRate = event.target.value;
  }
}

//Event listeners

video.addEventListener("click", toggleVideoStatus);

video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);

video.addEventListener("timeupdate", updateProgress);
play.addEventListener("click", toggleVideoStatus);

stops.addEventListener("click", stopVideo);

progress.addEventListener("input", setVideoProgress);

sound.addEventListener("click", toggleSound);

sliderVolume.addEventListener("input", setSoundProgress);
fullScreen.addEventListener("click", toggleScreen);
settings.addEventListener("click", showSpeedList);
