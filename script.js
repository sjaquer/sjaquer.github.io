document.addEventListener('DOMContentLoaded', function() {
    // Scroll suave
    document.querySelectorAll('a.smooth-scroll').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll-to-top
    var scrollToTopButton = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animación de secciones al hacer scroll
    var sections = document.querySelectorAll('.reveal');
    var revealSection = function() {
        var windowHeight = window.innerHeight;
        var revealPoint = 150;

        sections.forEach(function(section) {
            var sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight - revealPoint) {
                section.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealSection);

    // Burbuja de chat
    var chatBubble = document.querySelector('.chat-bubble');
    var chatBox = document.querySelector('.chat-box');
    var chatClose = document.querySelector('.chat-close');

    chatBubble.addEventListener('click', function() {
        chatBox.style.display = 'flex';
    });

    chatClose.addEventListener('click', function() {
        chatBox.style.display = 'none';
    });

    // Inicializar animación de secciones
    revealSection();
});
