document.addEventListener('DOMContentLoaded', () => {
    // SFONDO ANIMATO CUORI
    function createPixelHeart() {
        const bgContainer = document.getElementById('background-animations');
        const heart = document.createElement('div');
        heart.classList.add('pixel-heart');
        const symbols = ['♥', '★', '♦'];
        heart.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        const animationDuration = Math.random() * 6 + 5; 
        heart.style.animationDuration = animationDuration + 's';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        bgContainer.appendChild(heart);
        setTimeout(() => { heart.remove(); }, animationDuration * 1000);
    }
    setInterval(createPixelHeart, 600);

    // GESTIONE ACCESSO (PIN)
    const CORRECT_PIN = "2904"; 
    let currentPin = "";
    const keys = document.querySelectorAll('.key');
    const dots = document.querySelectorAll('.dot');
    const errorMsg = document.getElementById('error-msg');
    const titleScreen = document.getElementById('title-screen');
    const loginScreen = document.getElementById('login-screen');
    const intro2 = document.getElementById('intro-2');
    const mainContent = document.getElementById('main-content');
    
    // Bottone Start iniziale
    window.startGame = function() {
        titleScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
    }

    keys.forEach(key => {
        key.addEventListener('click', () => {
            const value = key.innerText;
            if (value === 'C') { clearPin(); }
            else if (value === 'OK') { checkPin(); }
            else {
                if (currentPin.length < 4) {
                    currentPin += value;
                    updateDots();
                    errorMsg.classList.add('hidden'); 
                }
            }
        });
    });

    function updateDots() {
        dots.forEach((dot, index) => { dot.innerText = index < currentPin.length ? '*' : '_'; });
    }

    function clearPin() { currentPin = ""; updateDots(); errorMsg.classList.add('hidden'); }

    function checkPin() {
        if (currentPin === CORRECT_PIN) {
            loginScreen.style.display = 'none';
            intro2.classList.remove('hidden');
        } else {
            errorMsg.classList.remove('hidden'); currentPin = ""; updateDots();
            const box = document.querySelector('.login-container');
            box.animate([
                { transform: 'translateX(-10px)' }, { transform: 'translateX(10px)' },
                { transform: 'translateX(-10px)' }, { transform: 'translateX(0)' }
            ], { duration: 200, iterations: 2 });
        }
    }

    // Inizia gioco da Intro 2
    window.startMainGame = function() {
        intro2.classList.add('hidden');
        mainContent.classList.remove('hidden');
        window.scrollTo(0, 0); 
    }

    // LOGICA APERTURA BUSTA
    const envelope = document.getElementById('envelope');
    const realLetter = document.getElementById('real-letter');
    const mainNav = document.getElementById('main-nav');

    window.openLetter = function() {
        envelope.classList.add('open');
        document.getElementById('tap-hint').style.display = 'none'; 

        setTimeout(() => {
            envelope.style.opacity = '0'; 
            realLetter.classList.remove('hidden'); 
            
            setTimeout(() => {
                realLetter.classList.add('visible'); 
                mainNav.classList.remove('hidden'); 
            }, 50);
            
            setTimeout(() => {
                envelope.style.display = 'none';
            }, 600);
            
        }, 1100);
    }

    // LOGICA NAVIGAZIONE LIVELLI (Frecce)
    let currentStage = 1;
    const totalStages = 3;
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const stageIndicator = document.getElementById('stage-number');
    const bgVideo = document.getElementById('bg-video');

    function updateStageView() {
        document.querySelectorAll('.stage').forEach(stage => stage.classList.add('hidden'));
        document.getElementById(`stage-${currentStage}`).classList.remove('hidden');
        stageIndicator.innerText = currentStage;
        window.scrollTo(0, 0);

        prevBtn.style.visibility = currentStage === 1 ? 'hidden' : 'visible';
        nextBtn.style.visibility = currentStage === totalStages ? 'hidden' : 'visible';

        // Auto play del video per lo Stage 2
        if(currentStage === 2) {
            bgVideo.play().catch(e => console.log("L'utente deve premere play."));
        } else {
            bgVideo.pause();
        }
    }

    prevBtn.addEventListener('click', () => { if (currentStage > 1) { currentStage--; updateStageView(); } });
    nextBtn.addEventListener('click', () => { if (currentStage < totalStages) { currentStage++; updateStageView(); } });
});