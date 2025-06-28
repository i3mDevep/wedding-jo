document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const envelopeClickArea = document.getElementById('envelope-click');
    const mainInvitationContent = document.getElementById('main-invitation-content');
    const welcomeSection = document.getElementById('welcome-section'); // La primera sección después del sobre
    const musicButton = document.getElementById('play-music');
    const guessLabel = document.getElementById("guess");
    const backgroundMusic = document.getElementById('background-music');
    const urlParams = new URLSearchParams(window.location.search);

    const guessNumber = urlParams.get('guest')
    if(guessNumber) guessLabel.innerHTML = guessNumber

    // --- Lógica del Sobre y Revelación de Contenido ---

    if (envelopeClickArea && mainInvitationContent && welcomeSection) {
        envelopeClickArea.addEventListener('click', () => {
            console.log('¡Clic en el sobre detectado! Revelando invitación...');

            backgroundMusic?.play?.()
            .then(() => {
                musicButton.classList.add('playing');
                console.log('Música reproduciéndose.');
            })
            .catch(error => {
                console.error('Error al intentar reproducir la música:', error);
                // Mensaje amigable para el usuario
                alert('No se pudo reproducir la música. Algunos navegadores requieren una interacción previa del usuario.');
            });
            
            // Oculta el sobre suavemente
            envelopeClickArea.style.opacity = '0';
            envelopeClickArea.style.transition = 'opacity 1s ease-out';
            
            // Espera a que el sobre se desvanezca antes de mostrar el contenido principal
            setTimeout(() => {
                // Haz que el contenido principal sea visible
                mainInvitationContent.classList.remove('hidden');
                mainInvitationContent.classList.add('visible');
                
                // Hace scroll suavemente a la primera sección de la invitación (welcome-section)
                welcomeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Puedes opcionalmente ocultar completamente la sección del sobre después de un tiempo si quieres
                // coverSection.style.display = 'none'; 

            }, 1000); // Espera 1 segundo (la duración del desvanecimiento del sobre)
        });
    } else {
        console.error("Error: Elementos del sobre o contenido principal no encontrados.");
    }

    // --- Lógica del Contador de Tiempo (Se mantiene igual) ---

    const setupCountdown = (targetDate, daysId, hoursId, minutesId, secondsId) => {
        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                const daysEl = document.getElementById(daysId);
                const hoursEl = document.getElementById(hoursId);
                const minutesEl = document.getElementById(minutesId);
                const secondsEl = document.getElementById(secondsId);

                if(daysEl) daysEl.innerHTML = "00";
                if(hoursEl) hoursEl.innerHTML = "00";
                if(minutesEl) minutesEl.innerHTML = "00";
                if(secondsEl) secondsEl.innerHTML = "00";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const daysEl = document.getElementById(daysId);
            const hoursEl = document.getElementById(hoursId);
            const minutesEl = document.getElementById(minutesId);
            const secondsEl = document.getElementById(secondsId);

            if(daysEl) daysEl.innerHTML = String(days).padStart(2, '0');
            if(hoursEl) hoursEl.innerHTML = String(hours).padStart(2, '0');
            if(minutesEl) minutesEl.innerHTML = String(minutes).padStart(2, '0');
            if(secondsEl) secondsEl.innerHTML = String(seconds).padStart(2, '0');
        }, 1000);
    };

    // Configura el contador para la fecha de la boda (24 de Octubre de 2026, 6 PM)
    const weddingDate = new Date("August 16, 2025 16:00:00").getTime(); 
    setupCountdown(weddingDate, 'days', 'hours', 'minutes', 'seconds');
    setupCountdown(weddingDate, 'days2', 'hours2', 'minutes2', 'seconds2');

    // --- Lógica del Reproductor de Música (Se mantiene igual) ---

    if (musicButton && backgroundMusic) {
        musicButton.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play()
                    .then(() => {
                        musicButton.classList.add('playing');
                        console.log('Música reproduciéndose.');
                    })
                    .catch(error => {
                        console.error('Error al intentar reproducir la música:', error);
                        // Mensaje amigable para el usuario
                        alert('No se pudo reproducir la música. Algunos navegadores requieren una interacción previa del usuario.');
                    });
            } else {
                backgroundMusic.pause();
                musicButton.classList.remove('playing');
                console.log('Música pausada.');
            }
        });
    } else {
        console.warn("Elemento de música o botón de play no encontrado.");
    }
});