window.addEventListener(
    "keydown",
    function (event) {
        if ([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
            event.preventDefault();
        }
    },
    false
);
volumeSlider = document.getElementById("volumeSlider")
let songArray = [
    "Promenade (Part 1).mp3",
    "The Gnome.mp3",
    "Promenade (Part 2).mp3",
    "The Sage.mp3",
    "The Old Castle.mp3",
    "Blues Variation.mp3",
    "Promenade (Part 3).mp3",
    "The Hut of Baba Yaga (Part 1).mp3",
    "The Curse of Baba Yaga.mp3",
    "The Hut of Baba Yaga (Part 2).mp3",
    "The Great Gates of Kiev.mp3",
    "Nutrocker.mp3"
];

let currentSong = 0;
let song = new Audio();
window.onload = function () {
    playSong();
};

function playSong() {
    song.src = songArray[currentSong];
    document.getElementById("title").textContent = songArray[currentSong].slice(0, -4);
}

function playOrPause() {
    if (song.paused) {
        song.play();
        document.getElementById("play").src = "images/pause.png";
    } else {
        song.pause();
        document.getElementById("play").src = "images/play.png";
    }
}
var progressBar = document.getElementById('rewindSlider')
  function changeProgressBar(){
      song.currentTime = progressBar.value;
  }
song.addEventListener("timeupdate", function () {
    convertTime(song.currentTime);
    if (song.ended) {
        next();
    }
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
});

function convertTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    document.getElementById("currentTime").textContent = min + ":" + sec;
    totalTime(Math.floor(song.duration));
}

function totalTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    document.getElementById("currentTime").textContent += " / " + min + ":" + sec;
}

function next() {
    currentSong++;
    if (currentSong >= songArray.length) {
        currentSong = 0;
    }
    playSong();
    song.play();
    document.getElementById("play").src = "images/pause.png";
}

function prev() {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songArray.length - 1;
    }
    playSong();
    song.play();
    document.getElementById("play").src = "images/pause.png";
}


volumeSlider.addEventListener("mousemove", setvolume);

function setvolume() {
    song.volume = volumeSlider.value / 100;
    document.getElementById('volVal').value = volumeSlider.value;
}

document.getElementById('volVal').addEventListener('change', (event) => {
    volumeSlider.value = event.target.value;
    song.volume = volumeSlider.value / 100;
  });

