document.addEventListener('DOMContentLoaded', () => {

    const audioPlayer = new Audio(); // AGORA EXISTE

    const artistsData = [
        { name: 'Henrique e Juliano', image: 'img/artista-henrique-juliano.jpg', audio: 'msc/Henrique-Juliano.mp3' },
        { name: 'Jorge & Mateus', image: 'img/artista-jorge-mateus.jpg', audio: 'msc/Jorge-Mateus.mp3' },
        { name: 'Zé Neto & Cristiano', image: 'img/artista-ze-neto.jpg', audio: 'msc/Ze-Neto-Cristiano.mp3' },
        { name: 'Gusttavo Lima', image: 'img/artista-gustavo-limma.jpg', audio: 'msc/Gusttavo-Lima.mp3' },
        { name: 'Luan Santana', image: 'img/artista-luan-santana.jpg', audio: 'msc/Luan-Santana.mp3' },
        { name: 'Matheus & Kauan', image: 'img/artista-mateus-kauan.jpg', audio: 'msc/Matheus-Kauan.mp3' },
    ];

    const albumsData = [
        { name: 'White Noise (Sleep & Relaxation Sounds)', artist: 'Sleep John', image: 'img/album-white-noise.jpg', audio: 'msc/White-Noise.mp3' },
        { name: 'O Céu Explica Tudo (Ao Vivo)', artist: 'Henrique & Juliano', image: 'img/album-ceu-explica.jpg', audio: 'msc/Ceu-Explica.mp3' },
        { name: 'Nada como um dia após o outro', artist: 'Racionais', image: 'img/album-vida-loka.jpg', audio: 'msc/Vida-Loka.mp3' },
        { name: 'HIT ME HARD AND SOFT ', artist: 'Billie Eilish', image: 'img/album-hit-me.jpg', audio: 'msc/Hit-Me.mp3' },
        { name: 'CAJU', artist: 'Liniker', image: 'img/album-caju.jpg', audio: 'msc/Caju.mp3' },
        { name: 'Escândalo Íntimo', artist: 'Luisa Sonza', image: 'img/album-escandalo.jpg', audio: 'msc/Escandalo.mp3' },
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
