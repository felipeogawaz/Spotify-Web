document.addEventListener('DOMContentLoaded', () => {

    const audioPlayer = new Audio(); 
    
    // ===== Biblioteca expandida =====
const library = document.querySelector('.nav-library');
const libraryOptions = document.querySelector('.library-options');

library.addEventListener('click', () => {
    if(libraryOptions.style.display === 'block') {
        libraryOptions.style.display = 'none';
    } else {
        libraryOptions.style.display = 'block';
    }
});

 
const openPlaylist = document.getElementById("openPlaylist");
const playlistPopup = document.getElementById("playlistPopup");
const closePlaylist = document.getElementById("closePlaylist");
const savePlaylistBtn = document.getElementById("savePlaylist");
const notification = document.getElementById("notification");

savePlaylistBtn.addEventListener("click", () => {
    // Aqui você poderia salvar o nome da playlist se quisesse
    const playlistName = document.querySelector("#playlistPopup input").value;
    console.log("Playlist salva:", playlistName); // só pra teste

    // Mostrar notificação
    notification.classList.add("show");

    // Esconder depois de 5 segundos
    setTimeout(() => {
        notification.classList.remove("show");
    }, 5000);

    // Fechar popup
    playlistPopup.style.display = "none";
});

const langButton = document.getElementById("langButton");
const langMenu = document.getElementById("langMenu");

langButton.addEventListener("click", () => {
    if (langMenu.style.display === "flex") {
        langMenu.style.display = "none";
    } else {
        langMenu.style.display = "flex";
    }
});

// Clicar fora fecha o menu
document.addEventListener("click", (e) => {
    if (!langButton.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.style.display = "none";
    }
});

// Mostrar no console qual idioma foi selecionado (aqui é só teste)
langMenu.querySelectorAll("p").forEach(p => {
    p.addEventListener("click", () => {
        console.log("Idioma selecionado:", p.dataset.lang);
        langMenu.style.display = "none";
        langButton.innerHTML = `<i class="fa-solid fa-globe"></i> ${p.textContent}`;
    });
});



let translations = {};

fetch('translations.json')
  .then(res => res.json())
  .then(data => {
    translations = data;
    setLanguage('pt'); // inicializa em português
  });


openPlaylist.addEventListener("click", () => {
    playlistPopup.style.display = "flex";
});

closePlaylist.addEventListener("click", () => {
    playlistPopup.style.display = "none";
});

// Fechar clicando fora da caixa
playlistPopup.addEventListener("click", (e) => {
    if(e.target === playlistPopup) playlistPopup.style.display = "none";
});


// ===== Pesquisa popup =====
const searchInput = document.querySelector('.search-bar input');
const searchPopup = document.getElementById('searchPopup');
const closeSearch = document.getElementById('closeSearch');

searchInput.addEventListener('click', () => {
    searchPopup.style.display = 'flex';
});

// Fechar popup
closeSearch.addEventListener('click', () => {
    searchPopup.style.display = 'none';
});

// Fechar clicando fora da caixa
searchPopup.addEventListener('click', (e) => {
    if(e.target === searchPopup) searchPopup.style.display = 'none';
});


    const artistsData = [
        { name: 'Henrique e Juliano', image: 'img/artista-henrique-juliano.jpg', audio: 'msc/Henrique-Juliano.mp3' },
        { name: 'Jorge & Mateus', image: 'img/artista-jorge-mateus.jpg', audio: 'msc/Jorge-Mateus.mp3' },
        { name: 'Zé Neto & Cristiano', image: 'img/artista-ze-neto.jpg', audio: 'msc/Ze-Neto-Cristiano.mp3' },
        { name: 'Gusttavo Lima', image: 'img/artista-gustavo-limma.jpg', audio: 'msc/Gusttavo-Lima.mp3' },
        { name: 'Luan Santana', image: 'img/artista-luan-santana.jpg', audio: 'msc/Luan-Santana.mp3' },
        { name: 'Matheus & Kauan', image: 'img/artista-mateus-kauan.jpg', audio: 'msc/Matheus-Kauan.mp3' },
    ];

    const albumsData = [
        { name: '333', artist: 'Matuê', image: 'img/album-matue.jpeg', audio: 'msc/Matuê.mp3' },
        { name: 'O Céu Explica Tudo (Ao Vivo)', artist: 'Henrique & Juliano', image: 'img/album-ceu-explica.jpg', audio: 'msc/Henrique-Juliano2.mp3' },
        { name: 'Nada como um dia após o outro', artist: 'Racionais', image: 'img/album-vida-loka.jpg', audio: 'msc/Racionais.mp3' },
        { name: 'HIT ME HARD AND SOFT ', artist: 'Billie Eilish', image: 'img/album-hit-me.jpg', audio: 'msc/Billie-eilish.mp3' },
        { name: 'Caos', artist: 'Alee', image: 'img/album-alee.jpg', audio: 'msc/Alee.mp3' },
        { name: 'SEMRÉH', artist: 'Ryu, The Runner', image: 'img/album-ryu.jpg', audio: 'msc/Ryu.mp3' },
    ];

    const artistGrid = document.querySelector('.artists-grid');
    const albumsGrid = document.querySelector('.albums-grid');

    // ARTISTAS
    artistsData.forEach(artist => {
        const card = document.createElement('div');
        card.classList.add('artist-card');

        card.innerHTML = `
            <img src="${artist.image}" alt="${artist.name}">
            <h3>${artist.name}</h3>
            <p>Artista</p>
            <button class="play-btn" data-audio="${artist.audio}">
                <i class="fa-solid fa-play"></i>
            </button>
        `;

        artistGrid.appendChild(card);
    });

    // ÁLBUNS
    albumsData.forEach(album => {
        const card = document.createElement('div');
        card.classList.add('album-card');

        card.innerHTML = `
            <img src="${album.image}" alt="${album.name}">
            <h3>${album.name}</h3>
            <p>${album.artist}</p>
            <button class="play-btn" data-audio="${album.audio}">
                <i class="fa-solid fa-play"></i>
            </button>
        `;

        albumsGrid.appendChild(card);
    });

    // PLAYER DE VERDADE
    document.addEventListener('click', e => {
        const btn = e.target.closest('.play-btn');
        if (!btn) return;

        const audioSrc = btn.getAttribute('data-audio');

        // Resetar ícones
        document.querySelectorAll('.play-btn i').forEach(icon => {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        });

        // Se é o mesmo áudio → play/pause
        if (audioPlayer.src.includes(audioSrc)) {
            if (audioPlayer.paused) {
                audioPlayer.play();
                btn.querySelector('i').classList.add('fa-pause');
                btn.querySelector('i').classList.remove('fa-play');
            } else {
                audioPlayer.pause();
            }
            return;
        }

        // Novo áudio
        audioPlayer.src = audioSrc;
        audioPlayer.play();

        btn.querySelector('i').classList.remove('fa-play');
        btn.querySelector('i').classList.add('fa-pause');
    });

    audioPlayer.addEventListener('ended', () => {
        document.querySelectorAll('.play-btn i').forEach(icon => {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        });
    });

});
