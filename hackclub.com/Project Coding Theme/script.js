document.addEventListener('DOMContentLoaded', function() {
    const elementsInSection1 = document.querySelectorAll('.section1 .heading101, .section1 .heading102, .section1 .intro p');
  
    elementsInSection1.forEach(element => {
        const text = element.textContent.trim();
        let index = 0;
  
        function type() {
            element.textContent = text.slice(0, index++);
            if (index <= text.length) {
                setTimeout(type, 115);
            }
        }
  
        type();
        if (element.classList.contains('heading102')) {
            const glitchText = document.createElement('span');
            glitchText.textContent = 'Coding';
            glitchText.classList.add('glitch-animation');
            // Append glitched text after the original text
            element.appendChild(glitchText);
        }   
    });
  });


