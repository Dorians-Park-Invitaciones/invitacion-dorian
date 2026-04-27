document.getElementById('btn-abrir').addEventListener('click', function() {
    
    // 1. Ocultar el texto y el botón con un desvanecimiento
    document.querySelector('.contenido-inicio').classList.add('oculto');

    // 2. Abrir las puertas jurásicas
    document.querySelector('.puerta-izquierda').classList.add('abierta');
    document.querySelector('.puerta-derecha').classList.add('abierta');

    // 3. Reproducir la música de fondo de inmediato
    let audio = document.getElementById('musica-fondo');
    audio.play().catch(e => console.log("El navegador bloqueó el audio automático"));

    // 4. ESPERAR a que las puertas se abran (1500 milisegundos = 1.5s)
    setTimeout(function() {
        
        // Quitar la pantalla de inicio por completo y mostrar la invitación
        document.getElementById('pantalla-inicio').style.display = 'none';
        document.getElementById('contenido-invitacion').style.display = 'block';
        
        // Arrancar el video de fondo
        document.getElementById('video-interno').play();
        
        // EL TRUCO PARA EL PASTEL SVG
        let contenedorPastel = document.querySelector('.contenedor-pastel-svg');
        let pastelOriginal = document.getElementById('pastel-vector');
        let pastelClonado = pastelOriginal.cloneNode(true);
        
        pastelOriginal.remove(); 
        contenedorPastel.appendChild(pastelClonado); 

        // Hacer que caiga la vela
        document.querySelector('.vela-cayendo').classList.add('caer-vela');

    }, 1500); // <-- Este es el tiempo de espera
});

// Configuración de la Cuenta Regresiva
const fechaFiesta = new Date("May 30, 2026 14:00:00").getTime();

const intervalo = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaFiesta - ahora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("dias").innerText = dias < 10 ? "0" + dias : dias;
    document.getElementById("horas").innerText = horas < 10 ? "0" + horas : horas;
    document.getElementById("min").innerText = minutos < 10 ? "0" + minutos : minutos;
    document.getElementById("seg").innerText = segundos < 10 ? "0" + segundos : segundos;

    if (distancia < 0) {
        clearInterval(intervalo);
        document.querySelector(".contador").innerHTML = "<h3>¡La fiesta ha comenzado!</h3>";
    }
}, 1000);

// ==============================================================
// MOTOR DE LA GALERÍA DE FOTOS (ARRANCA AL HACER SCROLL)
// ==============================================================
document.addEventListener("DOMContentLoaded", () => {
    
    const fotos = document.querySelectorAll('.foto-slide');
    const seccionGaleria = document.querySelector('.seccion-galeria');
    let fotoActual = 0; 
    let intervaloGaleria; // Guardará el temporizador
    let yaInicio = false; // Control para saber si ya arrancó la primera vez

    if (fotos.length > 0 && seccionGaleria) {
        
        // Función que hace el cambio de fotos
        const cambiarFoto = () => {
            fotos[fotoActual].classList.remove('activa'); // Apaga la actual
            fotoActual++; // Pasa a la siguiente
            
            if (fotoActual >= fotos.length) {
                fotoActual = 0; // Reinicia si llega al final
            }
            
            fotos[fotoActual].classList.add('activa'); // Enciende la nueva
        };

        // Creamos al "vigilante" que revisará cuándo llegas a la galería
        const observadorGaleria = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                
                // Si la galería ya es visible en la pantalla (al menos un 30%)
                if (entrada.isIntersecting) {
                    
                    // Si es la primera vez que la vemos, arrancamos la secuencia
                    if (!yaInicio) {
                        // Aseguramos que inicie exactamente en la foto 1 (posición 0)
                        fotoActual = 0;
                        fotos.forEach(f => f.classList.remove('activa'));
                        fotos[0].classList.add('activa');
                        
                        // Arranca el cambio automático cada 1.5 segundos
                        intervaloGaleria = setInterval(cambiarFoto, 5200);
                        yaInicio = true; // Marcamos que ya arrancó para no duplicar tiempos
                    }
                } else {
                    // Opcional: Si el usuario vuelve a subir, pausamos la galería 
                    // para ahorrar batería en el celular.
                    clearInterval(intervaloGaleria);
                    yaInicio = false; 
                }
            });
        }, {
            threshold: 0.3 // Se activa cuando el 30% de la foto ya entró a la pantalla
        });

        // Le decimos al vigilante que se ponga a observar la sección
        observadorGaleria.observe(seccionGaleria);
    }
});
