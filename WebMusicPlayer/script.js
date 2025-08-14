const playlist = [
    { title: "Kash Maar", artist: "MellowD ft. Avani  DJ Ruchir", src: "Songs/Song1.mp3", cover: "Album_Cover/Song1.png" },
    { title: "Perfect", artist: "Ed Sheeran", src: "Songs/Song2.mp3", cover: "Album_Cover/Song2.webp" },
    { title: "Kar Gayi Chull", artist: "Sidharth Malhotra  Alia Bhatt  Badshah", src: "Songs/Song3.mp3", cover: "Album_Cover/Song3.webp" },
    { title: "Thudarum", artist: "Mohanlal, Shobana | Jakes Bejoy | Tharun Moorthy | M Renjith", src: "Songs/Song4.mp3", cover: "Album_Cover/Song4.webp" },
    { title: "Kar Gayi Chull", artist: "Sidharth Malhotra  Alia Bhatt  Badshah", src: "Songs/Song3.mp3", cover: "Album_Cover/Song3.webp" }
];

const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volumeControl = document.getElementById("volume");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const albumArt = document.getElementById("albumArt");
const playlistElement = document.getElementById("playlist");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");

let currentSongIndex = 0;
let isPlaying = false;

// Load playlist UI
playlist.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => loadSong(index, true));
    playlistElement.appendChild(li);
});

function loadSong(index, play = false) {
    currentSongIndex = index;
    audio.src = playlist[index].src;
    songTitle.textContent = playlist[index].title;
    songArtist.textContent = playlist[index].artist;
    albumArt.src = playlist[index].cover;

    document.querySelectorAll("#playlist li").forEach(li => li.classList.remove("active"));
    document.querySelectorAll("#playlist li")[index].classList.add("active");

    // Remove previous loadedmetadata listener
    audio.removeEventListener("loadedmetadata", updateTotalTime);

    // Add new loadedmetadata listener for this song
    audio.addEventListener("loadedmetadata", updateTotalTime);

    if (play) playSong();
}

// Function to update total duration
function updateTotalTime() {
    totalTimeEl.textContent = formatTime(audio.duration);
}


// Play / Pause functions
function playSong() {
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸️";
    albumArt.classList.add("playing");
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playPauseBtn.textContent = "▶️";
    albumArt.classList.remove("playing");
}

playPauseBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

// Previous / Next
prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex, true);
});

nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex, true);
});

// Update progress and current time
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
});

// Update total duration when metadata is loaded
audio.addEventListener("loadedmetadata", () => {
    totalTimeEl.textContent = formatTime(audio.duration);
});

// Seek functionality
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

// Auto next song
audio.addEventListener("ended", () => {
    nextBtn.click();
});

// Format seconds to mm:ss
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
}

// Load first song
loadSong(0);
