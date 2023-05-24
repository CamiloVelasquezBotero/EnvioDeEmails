document.addEventListener('DOMContentLoaded', function(){

    //
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    // Asignar eventos
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function (e) {
        e.preventDefault(); 

        resetFormulario();
    })

    function enviarEmail(e) {
        e.preventDefault();

        // Efecto Spinner
        spinner.classList.add('flex'); // Activamos el spinner al enviar
        spinner.classList.remove('hidden'); // Lo mostramos

        setTimeout( () => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden'); // Lo ocultamos

            resetFormulario();

            // Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase'); // clases de tailwind
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout( () => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }

    function validar (e) {
        if( e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement)
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        email[e.target.name] = e.target.value.trim().toLowerCase();

        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        // Comprueba si ya existe una alerta
        limpiarAlerta(referencia);

        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'existe'); // Clase de tailwind css

        // Inyectar el error al formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.existe');
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if( Object.values(email).includes('')) { 
            btnSubmit.classList.add('opacity-50'); // Le agregamos la clase de la opacidad
            btnSubmit.disabled = true; // desactivamos el boton
            return; 
        } 
            btnSubmit.classList.remove('opacity-50'); // Le eliminamos la clase de la opacidad
            btnSubmit.disabled = false; // activamos el boton
    }

    function resetFormulario() {
        // Reiniciamos el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        
        formulario.reset();
        comprobarEmail();
    }

});