const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const music = document.querySelector("audio");
// progress
const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
// time
const currentTimeElement = document.querySelector("#current-time");
const durationElement = document.querySelector("#duration");

// buttons
const previousBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const playBtn = document.querySelector("#play");

// Music
const songs = [
  {
    name: "song-1",
    displayName: "Logical Song",
    artist: "Supertramp",
  },
  {
    name: "song-2",
    displayName: "The Masquarade (2000 Remastered)",
    artist: "George Benson",
  },
  {
    name: "song-3",
    displayName: "Feels So Good",
    artist: "Chuck Mangione - Topic",
  },
  {
    name: "song-4",
    displayName: "Easy Lover",
    artist: "Phil Collins",
  },
  {
    name: "song-5",
    displayName: "Just The Two of Us",
    artist: "Grover Washington, Jr. - Topic ft. Bill Withers",
  },
];

// Check if Playing
let isPlaying = false;

// Play
const playSong = () => {
  isPlaying = true;
  //replace play button with pause button
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");

  music.play();
};

// Pause
const pauseSong = () => {
  isPlaying = false;
  //replace pause button with play button
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
};

// Play or Pause EventListener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
const loadSong = (song) => {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.png`;
};

// Current Song
let songIndex = 0;

// Prev Song
const prevSong = () => {
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  songIndex--;
  loadSong(songs[songIndex]);
  playSong();
};

// Next Song
const nextSong = () => {
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  songIndex++;
  loadSong(songs[songIndex]);
  playSong();
};

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar and Time
const updateProgressBar = (event) => {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;

    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate Dispaly for Duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      // turn durationSeconds into a string and adds a 0 in front
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
  }
};

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
previousBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
