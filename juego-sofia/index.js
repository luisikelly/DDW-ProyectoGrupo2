Swal.fire({
    title: "¡Bienvenido a Trivia Vial!",
    text: "Respondé la trivia correctamente y estarás listo para obtener tu licencia de conducir!",
}).then(() => {
    // Mostrar el contenido del juego
    document.getElementById('content').classList.remove('hidden');
    document.getElementById('footer').classList.remove('hidden');

    // Reordenar aleatoriamente las preguntas y cargar la primera pregunta
    shuffleArray(basepreguntas);
    cargar_pregunta(index_pregunta);
});

let index_pregunta = 0;
let puntaje = 0;

// Función para reordenar aleatoriamente un array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function cargar_pregunta(index) {
    let objetopregunta = basepreguntas[index];

    let opciones = [...objetopregunta.distractores, objetopregunta.respuesta];
    opciones.sort(() => Math.random() - 0.5);

    document.getElementById("pregunta").innerHTML = objetopregunta.pregunta;
    document.getElementById("imagen").src = objetopregunta.imagen;

    document.getElementById("btn1").innerHTML = opciones[0];
    document.getElementById("btn2").innerHTML = opciones[1];
    document.getElementById("btn3").innerHTML = opciones[2];
    document.getElementById("btn4").innerHTML = opciones[3];
}

async function seleccionarOpcion(index) {
    let validezrespuesta = document.getElementById(`btn${index + 1}`).innerHTML === basepreguntas[index_pregunta].respuesta;

    if (validezrespuesta) {
        await Swal.fire({
            title: "Respuesta correcta",
            text: "¡Vas por buen camino!",
            icon: "success",
        });
        puntaje++;
    } else {
        await Swal.fire({
            title: "Respuesta incorrecta",
            text: `La respuesta correcta es "${basepreguntas[index_pregunta].respuesta}", ¡sigue intentando!`,
            icon: "error",
        });
    }

    index_pregunta++;
    if (index_pregunta >= basepreguntas.length) {
        await Swal.fire({
            title: "Trivia Finalizada!",
            text: `El resultado obtenido es de: ${puntaje}/${basepreguntas.length}`,
        });
        index_pregunta = 0;
        puntaje = 0;
        shuffleArray(basepreguntas); // Reordenar preguntas para la siguiente ronda
    }
    cargar_pregunta(index_pregunta);
}
