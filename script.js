const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
  },
];

// Create a new instance of the HTML5 <audio> element
// Exists in memory — like a JS object, not yet in the page visually
const audio = new Audio();

// Your music player should keep track of the songs, the current song playing, and the time of the current song. 
// To do this, you will need to create an object to store this information.
// Inside the userData object create a songs property. For the value, spread allSongs into an array. The spread operator (...) allows you to copy all elements from one array into another. 

let userData = {
  songs: [...allSongs], //spread operator, copies the array 
  currentSong: null, //// starts with no song selected
  songCurrentTime: 0,
};

const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;
  // You’re not assigning inside the ternary — you're assigning THE RESULT of the ternary
  // WRONG: currentTitle ? playingSong.textContent = currentTitle : playingSong.textContent = "";
  
playingSong.textContent = currentTitle ? currentTitle : "";
songArtist.textContent = currentArtist ? currentArtist: "";
}

const deleteSong = (id) => {
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;

    pauseSong();
    setPlayerDisplay();
  }

  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSongs(userData?.songs); 
  highlightCurrentSong(); 
  setPlayButtonAccessibleText(); 

};

const shuffle = () => {
  userData?.songs.sort(() => {
    return Math.random() - 0.5;
  })
};

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
  
};
// To display the songs in the UI, you need to create a function 

// Why..where is song.title coming from? Create a button element with class playlist-song-info. Inside the button, add a span element with the class playlist-song-title, then interpolate song.title as the text.

//create a function, renderSongs, taking argument 'array' where we will pass the array of song objects
// define songsHTML = array 
// within .map, a function is taken as the argument, that function being an arrow function with argument song. A ~new array~ is returned with the updated song details
const renderSongs = (array) => {
  const songsHTML = array
    .map((song)=> {
      // In button, onclick attribute is alr within a tempalte literal...so no need for backticks when interpolating song.id???
      return `
      <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button onclick = "deleteSong(${song.id})"  class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
      </li>
      `;
    })
    .join("");

    //insert the new songsHTML array which is formatted into <li> into the <ul> HTML element 
  playlistSongs.innerHTML = songsHTML;
};

const setPlayButtonAccessibleText = () => {
  //get the 'song' we are listening to now or default first song 
  const song = userData?.currentSong || userData?.songs[0];

  //use the setAttribute method to add to the PLAY BUTTON attribute 
  playButton.setAttribute("aria-label", 
                    song?.title ? `Play ${song.title}` : "Play"); //if song.title exists, use that song title, otherwise if there is no title (fallback label)
}

playButton.addEventListener("click", () => {
    if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src; // Load this audio player with the song file at the src location. audio is a HTMLAudioElement — a real playable audio object unlike song
  audio.title = song.title;

  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");

  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play();
};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;

  playButton.classList.remove("playing");
  audio.pause();
};

// nextSong: grabbing the song from the array songs, which is a PROPERTY of the OBJECT userData
const playNextSong = () => {

  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];

    playSong(nextSong.id);
  }
};

const playPreviousSong = () => {
   if (userData?.currentSong === null) return;
   else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];

    playSong(previousSong.id);
   }
};

pauseButton.addEventListener("click",  pauseSong);
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener("click", playPreviousSong);


const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong);

pauseButton.addEventListener("click",  pauseSong);
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener("click", playPreviousSong);

audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  //if the currentSongIndex is greater than the length of the currentSongIndex - 1, its the end, nextSongExists (e.g. 10 songs in the playlist, current song 9 still 1 more)
  const nextSongExists = userData.songs.length - 1 > currentSongIndex;
  // If there is no next song in the playlist, use the else block to reset the currentSong key of userData to null, and its songCurrentTime property to 0.
  //WHY IS ONE A KEY, ONE A PROPERTY
  if (nextSongExists) {
    playNextSong();
  }
  else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
  }
});


// use callback functions to sort the songs
const sortSongs = () => {
  userData?.songs.sort((a,b) => {
    if (a.title < b.title) {
      return -1;
    }

    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });

  return userData?.songs;
};


// To store the current time of the song when it is paused, set the songCurrentTime of the userData object to the currentTime of the audio variable.

// Note: You should not use optional chaining for this step because userData.songCurrentTime will not be null or undefined at this point if ur pausing the song !
//audio is the variable we defined earlier to create a new Audio element. We are accessing a property of audio - currentTime which is built in!
// const pauseSong = () => {
//   userData.songCurrentTime = audio.currentTime
// };

//call renderSongs, calling sortSongs function as the parameter 
renderSongs(sortSongs());

// Use const to create a variable named song and assign it result of the find() method call on the userData?.songs array. Use song as the parameter of the find() callback and check if song.id is strictly equal to id.

// This will iterate through the userData?.songs array, searching for a song that corresponds to the id passed into the playSong function.

  renderSongs(sortSongs());

audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

    if (nextSongExists) {
      playNextSong();
    } else {
      userData.currentSong = null;
      userData.songCurrentTime = 0;  

pauseSong();
setPlayerDisplay();
highlightCurrentSong();
setPlayerDisplay();
setPlayButtonAccessibleText();