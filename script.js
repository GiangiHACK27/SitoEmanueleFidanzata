document.addEventListener('DOMContentLoaded', () => {
    // --- SFONDO ---
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

    // --- LOGICA ACCESSO (PIN) ---
    const CORRECT_PIN = "2904"; 
    let currentPin = "";
    const keys = document.querySelectorAll('.key');
    const dots = document.querySelectorAll('.dot');
    const errorMsg = document.getElementById('error-msg');
    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');

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
            unlockSite();
        } else {
            errorMsg.classList.remove('hidden'); currentPin = ""; updateDots();
            const box = document.querySelector('.keypad-box');
            box.animate([
                { transform: 'translateX(-10px)' }, { transform: 'translateX(10px)' },
                { transform: 'translateX(-10px)' }, { transform: 'translateX(0)' }
            ], { duration: 200, iterations: 2 });
        }
    }

    function unlockSite() {
        loginScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        window.scrollTo(0, 0); 
        bgMusic.play().catch(e => console.log("L'utente deve premere play."));
    }

    // --- LOGICA NAVIGAZIONE LIVELLI (Frecce) ---
    let currentStage = 1;
    const totalStages = 3;
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const stageIndicator = document.getElementById('stage-number');

    function updateStageView() {
        // Nasconde tutti gli stage
        document.querySelectorAll('.stage').forEach(stage => stage.classList.add('hidden'));
        
        // Mostra solo quello corrente
        document.getElementById(`stage-${currentStage}`).classList.remove('hidden');
        
        // Aggiorna il testo STAGE X/3
        stageIndicator.innerText = currentStage;
        
        // Torna in cima alla pagina ogni volta che si cambia livello
        window.scrollTo(0, 0);

        // Gestisce i bottoni
        prevBtn.style.visibility = currentStage === 1 ? 'hidden' : 'visible';
        
        if (currentStage === totalStages) {
            nextBtn.style.visibility = 'hidden';
        } else {
            nextBtn.style.visibility = 'visible';
        }
    }

    prevBtn.addEventListener('click', () => {
        if (currentStage > 1) {
            currentStage--;
            updateStageView();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentStage < totalStages) {
            currentStage++;
            updateStageView();
        }
    });
});