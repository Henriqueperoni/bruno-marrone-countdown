// Playlist de músicas
const playlist = [
    {
        title: 'Aquele Abraço',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
        title: 'Querência',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    {
        title: 'Distância',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    },
    {
        title: 'Antes Que Eu Me Esqueça',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
    },
    {
        title: 'Deixa Eu Te Amar',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
    }
];

let currentTrack = 0;
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const songTitle = document.getElementById('songTitle');
const playlistUl = document.getElementById('playlistUl');

// Preencher a playlist
function renderPlaylist() {
    playlistUl.innerHTML = '';
    playlist.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.onclick = () => loadTrack(index);
        if (index === currentTrack) {
            li.classList.add('active');
        }
        playlistUl.appendChild(li);
    });
}

// Carregar faixa
function loadTrack(index) {
    currentTrack = index;
    audioPlayer.src = playlist[currentTrack].url;
    songTitle.textContent = `🎵 ${playlist[currentTrack].title}`;
    renderPlaylist();
}

// Controles do player
playBtn.onclick = () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.textContent = '⏸️ Pausa';
    } else {
        audioPlayer.pause();
        playBtn.textContent = '▶️ Play';
    }
};

nextBtn.onclick = () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    audioPlayer.play();
    playBtn.textContent = '⏸️ Pausa';
};

prevBtn.onclick = () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    audioPlayer.play();
    playBtn.textContent = '⏸️ Pausa';
};

// Quando a música termina, toca a próxima
audioPlayer.onended = () => {
    nextBtn.click();
};

// Contagem regressiva
function updateCountdown() {
    // Data e hora do show: 8 de março de 2026, 20:00 Dublin (UTC)
    const showDate = new Date('2026-03-08T20:00:00+00:00').getTime();
    const now = new Date().getTime();
    const difference = showDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        songTitle.textContent = '🎉 O SHOW COMEÇOU! 🎉';
    }
}

// Inicializar
renderPlaylist();
loadTrack(0);
updateCountdown();
setInterval(updateCountdown, 1000);