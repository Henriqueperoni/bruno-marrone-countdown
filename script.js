// CONFIGURAÇÃO DO SHOW
// Data: 08 de Março de 2026, às 20h (Horário de Dublin)
const eventDate = new Date("March 8, 2026 20:00:00").getTime();

// Atualização da contagem a cada 1 segundo
const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    // Cálculos de tempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Exibindo no HTML
    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdown);
        document.querySelector(".countdown-container").innerHTML = "<h2>É HOJE! 🍻</h2>";
    }
}, 1000);

// PLAYER DE MÚSICA
// Adicione os nomes dos seus arquivos .mp3 aqui
const playlist = [
    { title: "Dormi na Praça", src: "dormireinapraca.mp3" },
    { title: "Boate Azul", src: "boateazul.mp3" },
    { title: "Choram as Rosas", src: "choramrosas.mp3" }
];

let currentTrack = 0;
const audio = document.getElementById("audio-element");
const songTitle = document.getElementById("song-title");
const playBtn = document.getElementById("play-btn");

function loadTrack(index) {
    audio.src = playlist[index].src;
    songTitle.innerText = playlist[index].title;
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸️";
    } else {
        audio.pause();
        playBtn.innerText = "▶️";
    }
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    audio.play();
    playBtn.innerText = "⏸️";
}

function prevTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    audio.play();
    playBtn.innerText = "⏸️";
}

// Inicializa a primeira música
loadTrack(currentTrack);
