const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const volumeControl = document.getElementById('volume');
const title = document.getElementById('title');

// Playlist (local MP3 files)
const songs = [
    { name: "song1.mp3", title: "Film Song 1" },
    { name: "song2.mp3", title: "Film Song 2" },
    { name: "song3.mp3", title: "Film Song 3" },
    { name: "song4.mp3", title: "Film Song 4" },
    { name: "song5.mp3", title: "Film Song 5" }
];

let songIndex = 0;
let isPlaying = false;

// Load song
function loadSong(song) {
    title.textContent = song.title;
    audio.src = `songs/${song.name}`;
}
loadSong(songs[songIndex]);

// Play song
function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.textContent = "⏸";
}

// Pause song
function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.textContent = "▶";
}

// Play/Pause button
playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

// Next song
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}
nextBtn.addEventListener('click', nextSong);

// Previous song
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}
prevBtn.addEventListener('click', prevSong);

// Update progress bar
audio.addEventListener('timeupdate', () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
});

// Seek in song
progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});
