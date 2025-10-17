/**Elementos */
const video = document.getElementById('introVideo');
const envelope = document.getElementById('envelope');
const card = document.getElementById('card');
const confettiContainer = document.getElementById('confetti-container');
const cloudsContainer = document.getElementById('clouds-container');

/**Configuracion para efecto de particulas */
const confettiCount = 500;        // Cantidad de partículas
const explosionDistance = 800;   // Distancia máxima de la explosión inicial (px)
const explosionDuration = 0.5;   // Duración de la explosión inicial (s)
const fallDistance = 800;        // Distancia vertical de la caída lenta (px)
const fallSpread = 414;          // Dispersión horizontal durante la caída (px)
const fallDuration = 20;          // Duración de la caída lenta (s)

/**Colores del Confeti */
const confettiColors = ['#FFB57B', '#FF8AC4', '#FFD3A6', '#FFFFFF', '#E6E6E6'];

/**Funcion para generar confeti */
function generateConfetti() {
    const rect = card.getBoundingClientRect();
    const centerX = window.innerWidth / 2;   // ancho de la pantalla / 2
    const centerY = window.innerHeight / 2;  // alto de la pantalla / 2

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random()*confettiColors.length)];

        const size = Math.random() * 8 + 4; // tamaño aleatorio
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;

        confettiContainer.appendChild(confetti);

        // Fase 1: explosión rápida
        const explodeX = (Math.random() - 0.5) * explosionDistance;
        const explodeY = (Math.random() - 0.5) * explosionDistance;
        const rotation = Math.random() * 720;

        confetti.style.left = `${centerX}px`;
        confetti.style.top = `${centerY}px`;
        confetti.style.transform = `translate(0,0) rotate(0deg)`;
        confetti.style.transition = `transform ${explosionDuration}s ease-out`;

        requestAnimationFrame(() => {
            confetti.style.transform = `translate(${explodeX}px, ${explodeY}px) rotate(${rotation}deg)`;
        });

        // Fase 2: caída lenta
        setTimeout(() => {
            const fallX = explodeX + (Math.random() - 0.5) * fallSpread;
            const fallY = explodeY + fallDistance + Math.random() * fallSpread;
            const rotation2 = rotation + Math.random() * 360;

            confetti.style.transition = `transform ${fallDuration}s ease-out, opacity ${fallDuration}s ease-out`;
            confetti.style.transform = `translate(${fallX}px, ${fallY}px) rotate(${rotation2}deg)`;
            confetti.style.opacity = 0;
        }, explosionDuration * 1000);

        // Eliminar confeti después de la animación completa
        setTimeout(() => confetti.remove(), (explosionDuration + fallDuration) * 1000);
    }
}

/**Seccion de Nubes */
const cloudCount = 5;  // cantidad de nubes por fila
const rows = 20;         // número de filas

for (let row = 0; row < rows; row++) {
    for (let i = 0; i < cloudCount; i++) {
        const cloud = document.createElement('img');
        cloud.src = 'assets/nube.png';
        cloud.classList.add('cloud');

        // Posición vertical según la fila + variación aleatoria
        cloud.style.top = `${10 + row * 30 + Math.random() * 20}%`;

        // Escala aleatoria para variar tamaño
        const scale = 0.5 + Math.random() * 0.8;
        cloud.style.width = `${120 * scale}px`;

        // Posición inicial fuera de la pantalla (izquierda)
        cloud.style.left = `-150px`;

        // Animación horizontal
        const duration = 30 + Math.random() * 30; // 30 a 60s
        cloud.style.animationDuration = `${duration}s`;

        // Delay aleatorio para escalonar la entrada
        const delay = Math.random() * 5; // unos segundos de diferencia
        cloud.style.animationDelay = `${delay}s`;

        cloudsContainer.appendChild(cloud);
    }
}

/**Eventos */
video.addEventListener('ended', () => {
    video.style.display = 'none';
    envelope.parentElement.style.display = 'block';
    card.style.display = 'block';
});

envelope.addEventListener('click', () => {
    envelope.classList.add('open');
    card.classList.add('show');
    generateConfetti();
    envelope.removeEventListener('click', arguments.callee);
});
