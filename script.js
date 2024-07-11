document.addEventListener('DOMContentLoaded', () => {
    const chatBubble = document.querySelector('.chat-bubble');
    const chatBox = document.querySelector('.chat-box');
    const chatClose = document.querySelector('.chat-close');
    const questionButtons = document.querySelectorAll('.question-button');
    const chatContent = document.querySelector('.chat-content');
    const chatInput = document.querySelector('.chat-input input');
    
    const respuestas = {
        horario: 'Atendemos todos los días de 7 am a 9 pm para consultas dentro de la sede física.',
        'plan-basico': 'En el Plan Básico, aparte de los servicios mencionados en la página principal, también está el servicio de atención personalizada de Uywakuna, que brinda ayuda directa mediante el asistente virtual. Este asistente te da información de salud específica para tu mascota, ya que tiene como referencia la base de datos de todo su historial médico. Te ayudará a responder preguntas acerca de algunas medicinas, dietas o dudas generales para su cuidado. Además, incluye servicios de vacunación y baño para mascotas una vez al mes, así como ligeros descuentos en veterinarias afiliadas para consultas médicas básicas.',
        'plan-estandar': 'El Plan Estándar, aparte de los servicios mencionados en la página principal, incluye beneficios y descuentos en cirugías menores y vacunaciones con vacunas de mayor calidad. También ofrece servicios básicos de ecografías gratuitas en nuestra sede local, servicio personalizado al cliente por llamada y cobertura para accidentes de menor grado.',
        'plan-premium': 'El Plan Premium ofrece asistencia médica o atención ambulatoria gratuita 4 veces al mes en nuestro local, cobertura de accidentes mayores en mascotas, acceso al servicio de 0 filas en nuestros locales y prioridad de atención en lista. También cubre rayos X y ecografías más avanzadas gratuitas con cita en nuestra sede física.',
        sede: 'Nuestra sede se encuentra en el distrito de Miraflores, Av. Larco 1050, Lima, Perú.'
    };

    chatBubble.addEventListener('click', () => {
        chatBox.style.display = 'flex';
    });

    chatClose.addEventListener('click', () => {
        chatBox.style.display = 'none';
    });

    questionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const question = button.getAttribute('data-question');
            const response = respuestas[question];
            addMessage('user', button.textContent);
            simulateTyping(() => {
                addMessage('bot', response);
            });
        });
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const userMessage = chatInput.value.trim();
            if (userMessage) {
                addMessage('user', userMessage);
                chatInput.value = '';
                simulateTyping(() => {
                    const botMessage = 'Lo siento, actualmente solo puedo responder a preguntas predefinidas.';
                    addMessage('bot', botMessage);
                });
            }
        }
    });

    function addMessage(sender, message) {
        const messageElement = document.createElement('p');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageElement.innerHTML = sender === 'user' ? message : `<strong>${message}</strong>`;
        chatContent.appendChild(messageElement);
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    function simulateTyping(callback) {
        const typingIndicator = document.createElement('p');
        typingIndicator.classList.add('bot-message');
        typingIndicator.innerHTML = `<strong>Escribiendo...</strong>`;
        chatContent.appendChild(typingIndicator);
        chatContent.scrollTop = chatContent.scrollHeight;

        setTimeout(() => {
            chatContent.removeChild(typingIndicator);
            callback();
        }, 1000);
    }
});

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

revealElements.forEach(el => revealObserver.observe(el));

// Scroll to Top Button
const scrollToTopButton = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
