document.addEventListener('DOMContentLoaded', function() {
    let correctAnswers = 0; // Contador de respuestas correctas
    const totalQuestions = document.querySelectorAll('.contenedor_de_juego > div').length;
    let playerName = '';

    // Crear y agregar el div para los mensajes flotantes
    const messageDiv = document.createElement('div');
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.padding = '10px';
    messageDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
    messageDiv.style.color = 'white';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.zIndex = '1000';
    messageDiv.style.display = 'none';
    messageDiv.style.fontSize = '35px'; // Aumenta el tamaño de la fuente
    document.body.appendChild(messageDiv);

    // Función para mostrar mensaje
    function showMessage(message) {
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 2000);
    }

    // Obtener elementos del modal
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const startGameButton = document.getElementById('start-game');
    const playerNameInput = document.getElementById('player-name');

    // Mostrar el modal al cargar la página
    modal.style.display = 'block';

    // Cerrar el modal cuando se hace clic en la X
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Iniciar el juego cuando se hace clic en el botón "Comenzar"
    startGameButton.addEventListener('click', () => {
        playerName = playerNameInput.value.trim();
        if (playerName) {
            modal.style.display = 'none';
        } else {
            alert('Por favor, ingresa tu nombre.');
        }
    });

    // Función para verificar la respuesta
    function checkAnswer(event) {
        const isCorrect = event.target.getAttribute('data-correct') === 'true';
        const questionDiv = event.target.closest('div.pregunta1, div.pregunta2, div.pregunta3, div.pregunta4');
        
        if (questionDiv && !questionDiv.classList.contains('answered')) {
            if (isCorrect) {
                correctAnswers++;
                event.target.classList.add('correct-answer');
                showMessage('¡Correcto!');
            } else {
                event.target.classList.add('incorrect-answer');
                showMessage('Incorrecto');
            }
            questionDiv.classList.add('answered');
            if (document.querySelectorAll('.answered').length === totalQuestions) {
                setTimeout(() => {
                    modal.style.display = 'block';
                    document.querySelector('.modal-content').innerHTML = `
                        <span class="close-button">&times;</span>
                        <h2>¡Juego Terminado!</h2>
                        <p>${playerName}, has acertado ${correctAnswers} de ${totalQuestions} preguntas.</p>
                        <button onclick="window.location.reload()">Reiniciar</button>
                    `;
                    document.querySelector('.close-button').addEventListener('click', () => {
                        modal.style.display = 'none';
                    });
                }, 500);
            }
        }
    }

    // Agregar event listener a todas las imágenes
    const images = document.querySelectorAll('.signal-image');
    images.forEach(image => {
        image.addEventListener('click', checkAnswer);
    });
});