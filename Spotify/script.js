console.log("Let's go");

let currentsong = new Audio();
async function getSongs() {
    try {
        let response = await fetch("http://127.0.0.1:5500/github/Projects-Repo/Spotify/songs/");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let html = await response.text();

        let div = document.createElement("div");
        div.innerHTML = html;
        let links = div.getElementsByTagName("a");

        let songs = [];
        for (let index = 6; index < links.length; index++) {
            const link = links[index];
            if (link.href.endsWith(".mp3")) {
                let songName = link.href.split("/").pop().replaceAll("%20", " ");
                songName = decodeURIComponent(songName); // Decode URL-encoded characters
                songs.push(songName);
            }
        }
        return songs;
    } catch (error) {
        console.error('Error fetching songs:', error);
        return [];
    }
}

const playMusic = (track)=>{
    currentsong.src = "/songs/" + track;
    currentsong.play();
}

async function main() {
    try {
        // Get list of all songs
        let songs = await getSongs();
        if (songs.length === 0) {
            console.error('No songs found');
            return;
        }
        console.log(songs);

        // Show all the songs in the playlist
        let songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0];
        for (const song of songs) {
            // Create list item for each song
            let li = document.createElement("li");
            li.innerHTML = `
                <img class="invert" src="music.svg" alt="">
                <div class="info">
                    <div>${song}</div>
                    <div>Harihar</div>
                </div>
                <div class="playnow">
                    <span>Play now</span>
                    <img class="invert" src="play.svg" alt="">
                </div>
            `;
            // Attach event listener to each song
            li.addEventListener("click", () => {
                playMusic(song.trim());
            });
            songUl.appendChild(li);
        }
    } catch (error) {
        console.error('Error in main:', error);
    }

    // Attach event listener to play/pause button
    let play = document.querySelector(".playnow img");
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "pause.svg";
        } else {
            currentsong.pause();
            play.src = "play.svg";
        }
    });
}

main();