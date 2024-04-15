console.log("Let's go");

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

async function main() {
    try {
        // Get list of all songs
        let songs = await getSongs();
        if (songs.length === 0) {
            console.error('No songs found');
            return;
        }
        console.log(songs);

        let songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0];
        for (const song of songs) {
            songUl.innerHTML = songUl.innerHTML + `<li>${song}</li>`;
        }
        
        var audio = new Audio(songs[0]);
        // await audio.play();

        audio.addEventListener("loadeddata", () => {
            console.log('Audio loaded:', audio.duration, audio.currentSrc, audio.currentTime);
        });

        audio.addEventListener("error", (event) => {
            console.error('Error playing audio:', event);
        });
    } catch (error) {
        console.error('Error in main:', error);
    }
}

main();
