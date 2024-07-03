document.addEventListener('DOMContentLoaded', function() {
    const preguntas = [
        {
            pregunta: 'Curva Pronunciada',
            respuestas: [
                { imgSrc: 'juego-martina/curva.png', answer: false },
                { imgSrc: 'juego-martina/camino_sinuoso.png', answer: false },
                { imgSrc: 'juego-martina/curva_pronunciada.png', answer: true },
                { imgSrc: 'juego-martina/calzada_dividida.png', answer: false }
            ]
        },
        {
            pregunta: 'No estacionar',
            respuestas: [
                { imgSrc: 'juego-martina/estacionamiento_exclusivo.png', answer: false },
                { imgSrc: 'juego-martina/no_estacionar.png', answer: true },
                { imgSrc: 'juego-martina/no_estacionar_no_detenerse.png', answer: false },
                { imgSrc: 'juego-martina/transito_pesado_derecha.png', answer: false }
            ]
        },
        {
            pregunta: 'Cruce Ferroviario',
            respuestas: [
                { imgSrc: 'juego-martina/puente_movil.png', answer: false },
                { imgSrc: 'juego-martina/tunel.png', answer: false },
                { imgSrc: 'juego-martina/tranvia.png', answer: false },
                { imgSrc: 'juego-martina/cruce_ferroviario.png', answer: true }
            ]
        },
        {
            pregunta: 'Animales Sueltos (silvestres)',
            respuestas: [
                { imgSrc: 'juego-martina/prohibido_circular_arreos.png', answer: false },
                { imgSrc: 'juego-martina/animales_sueltos_domestico.png', answer: false },
                { imgSrc: 'juego-martina/animales_sueltos_silvestre.png', answer: true },
                { imgSrc: 'juego-martina/jinetes.png', answer: false }
            ]
        }
    ];

    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    const totalQuestions = preguntas.length;
    const preguntaActualElement = document.getElementById('pregunta-actual');
    const totalPreguntasElement = document.getElementById('total-preguntas');
    const resultadoElement = document.getElementById('resultado');
    const contenedorDeJuego = document.querySelector('.contenedor_de_juego');
    const modal = document.getElementById('modal');
    const playerNameInput = document.getElementById('player-name');
    const startGameButton = document.getElementById('start-game');
    const closeModalButton = document.querySelector('.close-button');

    startGameButton.addEventListener('click', function() {
        const playerName = playerNameInput.value.trim();
        if (playerName !== '') {
            modal.style.display = 'none';
            iniciarJuego(playerName);
        } else {
            alert('Por favor, ingresa tu nombre para comenzar el juego.');
        }
    });

    function iniciarJuego(playerName) {
        mostrarPregunta();
        totalPreguntasElement.textContent = totalQuestions;
        actualizarContadorPreguntas();
    }

    function mostrarPregunta() {
        const pregunta = preguntas[currentQuestionIndex];
        preguntaActualElement.innerHTML = `
            <h2>${pregunta.pregunta}</h2>
            <div class="images-container">
                ${pregunta.respuestas.map((respuesta, index) => `
                    <img src="${respuesta.imgSrc}" alt="Señal ${index + 1}" class="signal-image" data-answer="${index}" data-correct="${respuesta.answer ? 'true' : 'false'}">
                `).join('')}
            </div>
        `;
    }

    function mostrarResultado(esCorrecta) {
        const images = document.querySelectorAll('.signal-image');
        images.forEach(image => {
            const isCorrect = image.getAttribute('data-correct') === 'true';
            if (isCorrect && esCorrecta) {
                image.classList.add('correct-answer');
            } else if (!isCorrect && !esCorrecta) {
                image.classList.add('incorrect-answer');
            }
        });
    }

    function avanzarPregunta() {
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
            mostrarPregunta();
            resultadoElement.innerHTML = ''; // Limpiar el resultado anterior
            actualizarContadorPreguntas();
        } else {
            finDelJuego();
        }
    }

    function actualizarContadorPreguntas() {
        document.getElementById('pregunta-actual-numero').textContent = currentQuestionIndex + 1;
    }

    function finDelJuego() {
        preguntaActualElement.innerHTML = '<h2>¡Has completado todas las preguntas!</h2>';
        resultadoElement.innerHTML = `<p>Respuestas correctas: ${correctAnswers} de ${totalQuestions}</p>`;
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Jugar de Nuevo';
        restartButton.classList.add('restart-button');
        restartButton.addEventListener('click', () => {
            resetearJuego();
        });
        contenedorDeJuego.appendChild(restartButton);
    }

    function resetearJuego() {
        currentQuestionIndex = 0;
        correctAnswers = 0;
        mostrarPregunta();
        resultadoElement.innerHTML = '';
        actualizarContadorPreguntas();
        const restartButton = document.querySelector('.restart-button');
        if (restartButton) {
            restartButton.remove();
        }
    }

    // Event listener para las respuestas
    preguntaActualElement.addEventListener('click', function(event) {
        if (event.target.matches('.signal-image')) {
            const selectedAnswer = event.target.getAttribute('data-answer');
            const isCorrect = event.target.getAttribute('data-correct') === 'true';

            mostrarResultado(isCorrect);

            // Mostrar resultado y avanzar a la siguiente pregunta después de 2 segundos
            setTimeout(() => {
                mostrarResultado(false); // Limpiar clases de respuesta anterior
                avanzarPregunta();
            }, 2000);
        }
    });

    // Modal de inicio de juego
    modal.style.display = 'block';

    // Cerrar modal al hacer click en la X
    closeModalButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Cerrar modal al hacer click fuera de él
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
