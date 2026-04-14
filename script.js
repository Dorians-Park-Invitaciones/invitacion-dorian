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