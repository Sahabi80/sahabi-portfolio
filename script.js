
/* =====================================
   Portfolio v2.2
   Theme, Animations, Slider & Ghost
   ===================================== */

// =====================================
// Dark / Light Mode
// =====================================

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

if (themeToggle) {
    const themeIcon = themeToggle.querySelector("i");

    function enableLightMode() {
        body.classList.add("light-mode");

        if (themeIcon) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        }

        localStorage.setItem("theme", "light");
    }

    function disableLightMode() {
        body.classList.remove("light-mode");

        if (themeIcon) {
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
        }

        localStorage.setItem("theme", "dark");
    }

    if (localStorage.getItem("theme") === "light") {
        enableLightMode();
    }

    themeToggle.addEventListener("click", () => {
        if (body.classList.contains("light-mode")) {
            disableLightMode();
        } else {
            enableLightMode();
        }
    });
}

// =====================================
// Smooth Fade Animation
// =====================================

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.15
    });

    document.querySelectorAll("section").forEach(section => {
        section.classList.add("hidden");
        observer.observe(section);
    });
}

// =====================================
// SecureShield Screenshot Slider
// =====================================

const screenshots = [
    "assets/screenshots/secureshield-sign-in.png",
    "assets/screenshots/secureshield-sign-up.png",
    "assets/screenshots/secureshield-dashboard.png",
    "assets/screenshots/secureshield-pin-auth.png",
    "assets/screenshots/secureshield-recovery.png",
    "assets/screenshots/secureshield-splash-screen.png"
];

let currentIndex = 0;

const phoneImage = document.getElementById("phone-image");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");

if (phoneImage && prevBtn && nextBtn) {
    function updateScreenshot() {
        phoneImage.style.opacity = "0";

        setTimeout(() => {
            phoneImage.src = screenshots[currentIndex];
            phoneImage.style.opacity = "1";
        }, 150);
    }

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % screenshots.length;
        updateScreenshot();
    });

    prevBtn.addEventListener("click", () => {
        currentIndex =
            (currentIndex - 1 + screenshots.length) % screenshots.length;
        updateScreenshot();
    });
}

// =====================================
// Purple Ghost Mascot
// =====================================

(function createGhostMascot() {
    if (document.getElementById("ghost-mascot")) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // ---------------------------------
    // Ghost CSS
    // ---------------------------------

    const style = document.createElement("style");

    style.textContent = `
        #ghost-mascot {
            position: fixed;
            right: 24px;
            bottom: 22px;
            width: 100px;
            height: 120px;
            z-index: 999;
            pointer-events: auto;
            user-select: none;
            cursor: pointer;
            touch-action: manipulation;
            transform-origin: 50% 75%;
            animation: ghost-float 3s ease-in-out infinite;
            filter: drop-shadow(0 8px 18px rgba(139,92,246,.22));
        }

        #ghost-mascot .ghost-head {
            position: absolute;
            top: 8px;
            left: 9px;
            width: 82px;
            height: 76px;
            border-radius: 48% 48% 38% 38%;
            background: linear-gradient(
                145deg, #d8b4fe 0%, #a855f7 48%, #7c3aed 100%
            );
            box-shadow:
                inset -7px -7px 12px rgba(76,29,149,.22),
                inset 5px 5px 10px rgba(255,255,255,.3),
                0 0 20px rgba(139,92,246,.22);
            z-index: 2;
            transform-origin: 50% 90%;
            transition: transform .16s ease-out;
        }

        #ghost-mascot .ghost-body {
            position: absolute;
            top: 52px;
            left: 9px;
            width: 82px;
            height: 52px;
            background: linear-gradient(180deg, #a855f7, #7c3aed);
            border-radius: 15px 15px 8px 8px;
            clip-path: polygon(
                0 0, 100% 0, 100% 88%,
                83% 100%, 67% 87%, 50% 100%,
                33% 87%, 16% 100%, 0 88%
            );
            z-index: 1;
        }

        #ghost-mascot .ghost-eyes {
            position: absolute;
            top: 29px;
            left: 15px;
            display: flex;
            gap: 13px;
        }

        #ghost-mascot .ghost-eye {
            width: 19px;
            height: 24px;
            border-radius: 50%;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            box-shadow: 0 1px 4px rgba(46,16,101,.18);
            transform-origin: center;
        }

        #ghost-mascot .ghost-pupil {
            width: 9px;
            height: 12px;
            border-radius: 50%;
            background: #24113f;
            transform: translate(0, 0);
            transition: transform .08s linear;
        }

        #ghost-mascot .ghost-pupil::after {
            content: "";
            display: block;
            width: 3px;
            height: 3px;
            margin: 2px;
            border-radius: 50%;
            background: white;
        }

        #ghost-mascot .ghost-mouth {
            position: absolute;
            top: 58px;
            left: 36px;
            width: 10px;
            height: 6px;
            border-bottom: 2px solid #4c1d95;
            border-radius: 0 0 50% 50%;
        }

        #ghost-mascot .ghost-shadow {
            position: absolute;
            bottom: 0;
            left: 22px;
            width: 56px;
            height: 8px;
            border-radius: 50%;
            background: rgba(139,92,246,.22);
            filter: blur(5px);
            animation: ghost-shadow 3s ease-in-out infinite;
        }

        #ghost-mascot .ghost-wave {
            position: absolute;
            top: 12px;
            right: -5px;
            width: 12px;
            height: 22px;
            border-radius: 0 10px 10px 0;
            background: #a855f7;
            transform: rotate(-15deg);
        }

        #ghost-mascot:hover {
            filter: drop-shadow(0 8px 24px rgba(139,92,246,.45));
        }

        /* Speech bubble */

        #ghost-mascot .ghost-speech {
            position: absolute;
            right: 92px;
            top: 0;
            min-width: 125px;
            max-width: 190px;
            padding: 10px 13px;
            border: 1px solid rgba(168,85,247,.4);
            border-radius: 14px 14px 4px 14px;
            background: #fff;
            color: #35204d;
            font: 600 13px/1.4 Arial, sans-serif;
            text-align: center;
            box-shadow: 0 5px 20px rgba(124,58,237,.2);
            opacity: 0;
            visibility: hidden;
            transform: translateY(8px) scale(.92);
            pointer-events: none;
            transition: opacity .2s, transform .2s, visibility .2s;
            z-index: 5;
        }

        #ghost-mascot .ghost-speech.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
        }

        /* Reaction animations */

        #ghost-mascot.reaction-jump .ghost-head,
        #ghost-mascot.reaction-jump .ghost-body {
            animation: ghost-jump .45s ease;
        }

        #ghost-mascot.reaction-surprise .ghost-head {
            animation: ghost-surprise .5s ease;
        }

        #ghost-mascot.reaction-laugh .ghost-head {
            animation: ghost-laugh .55s ease;
        }

        #ghost-mascot.reaction-laugh .ghost-mouth {
            width: 15px;
            height: 10px;
            background: #4c1d95;
            border-radius: 4px 4px 50% 50%;
        }

        #ghost-mascot.blinking .ghost-eye {
            animation: ghost-blink .18s ease-in-out;
        }

        @keyframes ghost-float {
            0%, 100% { transform: translateY(0) rotate(-2deg); }
            50% { transform: translateY(-9px) rotate(2deg); }
        }

        @keyframes ghost-shadow {
            0%, 100% { transform: scale(1); opacity: .8; }
            50% { transform: scale(.75); opacity: .45; }
        }

        @keyframes ghost-blink {
            0%, 100% { transform: scaleY(1); }
            45%, 55% { transform: scaleY(.08); }
        }

        @keyframes ghost-jump {
            0%, 100% { transform: translateY(0); }
            40% { transform: translateY(-22px) rotate(-5deg); }
            70% { transform: translateY(0) rotate(5deg); }
        }

        @keyframes ghost-surprise {
            0%, 100% { transform: scale(1) rotate(0); }
            40% { transform: scale(1.15) rotate(7deg); }
            70% { transform: scale(.96) rotate(-5deg); }
        }

        @keyframes ghost-laugh {
            0%, 100% { transform: rotate(0); }
            25% { transform: rotate(-9deg) translateY(-3px); }
            50% { transform: rotate(9deg); }
            75% { transform: rotate(-6deg) translateY(-2px); }
        }

        /* Sound toggle */

        #ghost-sound-toggle {
            position: fixed;
            right: 25px;
            bottom: 145px;
            z-index: 1000;
            border: 1px solid rgba(168,85,247,.5);
            border-radius: 20px;
            padding: 7px 10px;
            background: #1e293b;
            color: white;
            font: 12px Arial, sans-serif;
            cursor: pointer;
        }

        #ghost-sound-toggle:focus-visible,
        #ghost-mascot:focus-visible {
            outline: 2px solid #c084fc;
            outline-offset: 4px;
        }

        @media (max-width: 576px) {
            #ghost-mascot {
                right: 10px;
                bottom: 12px;
                transform-origin: bottom right;
            }

            #ghost-mascot .ghost-speech {
                right: 72px;
                max-width: 145px;
                min-width: 105px;
                font-size: 12px;
            }

            #ghost-sound-toggle {
                right: 12px;
                bottom: 112px;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            #ghost-mascot,
            #ghost-mascot .ghost-shadow {
                animation: none;
            }

            #ghost-mascot .ghost-head,
            #ghost-mascot .ghost-pupil {
                transition: none;
            }

            #ghost-mascot.reaction-jump .ghost-head,
            #ghost-mascot.reaction-jump .ghost-body,
            #ghost-mascot.reaction-surprise .ghost-head,
            #ghost-mascot.reaction-laugh .ghost-head {
                animation: none;
            }
        }
    `;

    document.head.appendChild(style);

    // ---------------------------------
    // Create Ghost HTML
    // ---------------------------------

    const ghost = document.createElement("div");

    ghost.id = "ghost-mascot";
    ghost.setAttribute("role", "button");
    ghost.setAttribute("tabindex", "0");
    ghost.setAttribute(
        "aria-label",
        "Interactive purple ghost. Click to play."
    );

    ghost.innerHTML = `
        <div class="ghost-speech" aria-live="polite"></div>
        <div class="ghost-shadow"></div>

        <div class="ghost-head">
            <div class="ghost-eyes">
                <div class="ghost-eye">
                    <div class="ghost-pupil"></div>
                </div>
                <div class="ghost-eye">
                    <div class="ghost-pupil"></div>
                </div>
            </div>
            <div class="ghost-mouth"></div>
        </div>

        <div class="ghost-body">
            <div class="ghost-wave"></div>
        </div>
    `;

    document.body.appendChild(ghost);

    const head = ghost.querySelector(".ghost-head");
    const pupils = ghost.querySelectorAll(".ghost-pupil");
    const speech = ghost.querySelector(".ghost-speech");

    // ---------------------------------
    // Eye Tracking & Head Movement
    // ---------------------------------

    if (
        !reducedMotion &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
        document.addEventListener("pointermove", (event) => {
            const rect = head.getBoundingClientRect();

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = event.clientX - centerX;
            const dy = event.clientY - centerY;

            const angle = Math.atan2(dy, dx);
            const distance = Math.min(Math.hypot(dx, dy), 400);

            const pupilX = Math.cos(angle) * Math.min(distance / 40, 4);
            const pupilY = Math.sin(angle) * Math.min(distance / 40, 5);

            pupils.forEach(pupil => {
                pupil.style.transform =
                    `translate(${pupilX}px, ${pupilY}px)`;
            });

            // Do not override a reaction animation.
            if (
                !ghost.classList.contains("reaction-jump") &&
                !ghost.classList.contains("reaction-surprise") &&
                !ghost.classList.contains("reaction-laugh")
            ) {
                const tilt = Math.max(-10, Math.min(10, dx / 35));
                const nod = Math.max(-5, Math.min(5, dy / 55));

                head.style.transform =
                    `rotate(${tilt}deg) translateY(${nod}px)`;
            }
        }, { passive: true });
    }

    // ---------------------------------
    // Natural Blinking
    // ---------------------------------

    function blink() {
        if (!document.hidden && !reducedMotion) {
            ghost.classList.add("blinking");

            setTimeout(() => {
                ghost.classList.remove("blinking");
            }, 180);
        }

        setTimeout(blink, 2200 + Math.random() * 3000);
    }

    if (!reducedMotion) {
        setTimeout(blink, 1800);
    }

    // =================================
    // Talking Tom Style Interactions
    // =================================

    const messages = [
        "Hey there! 👋",
        "Looking good! ✨",
        "Nice to meet you! 💜",
        "You're awesome! 😎",
        "Hello, friend! 😊",
        "Welcome to my home! 🏠"
    ];

    let clickTimer = null;
    let clickCount = 0;
    let reactionTimer = null;
    let speechTimer = null;

    function showSpeech(message) {
        speech.textContent = message;
        speech.classList.add("visible");

        clearTimeout(speechTimer);

        speechTimer = setTimeout(() => {
            speech.classList.remove("visible");
        }, 2300);
    }

    // ---------------------------------
    // Optional Sound Effects
    // ---------------------------------

    let soundEnabled = false;
    let audioContext = null;

    const soundToggle = document.createElement("button");

    soundToggle.id = "ghost-sound-toggle";
    soundToggle.type = "button";
    soundToggle.textContent = "🔇 Sound off";
    soundToggle.setAttribute("aria-pressed", "false");
    soundToggle.setAttribute("aria-label", "Toggle ghost sound effects");

    document.body.appendChild(soundToggle);

    soundToggle.addEventListener("click", () => {
        soundEnabled = !soundEnabled;

        soundToggle.textContent = soundEnabled
            ? "🔊 Sound on"
            : "🔇 Sound off";

        soundToggle.setAttribute(
            "aria-pressed",
            String(soundEnabled)
        );

        if (soundEnabled && !audioContext) {
            const AudioContextClass =
                window.AudioContext || window.webkitAudioContext;

            if (AudioContextClass) {
                audioContext = new AudioContextClass();
            }
        }

        if (soundEnabled && audioContext) {
            audioContext.resume().catch(() => {});
        }
    });

    function playTinySound(type) {
        if (!soundEnabled || !audioContext) return;

        try {
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();

            const frequencies = {
                happy: 660,
                surprise: 880,
                laugh: 520
            };

            oscillator.type = "sine";
            oscillator.frequency.value = frequencies[type] || 660;

            const now = audioContext.currentTime;

            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(0.07, now + 0.025);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

            oscillator.connect(gain);
            gain.connect(audioContext.destination);

            oscillator.start(now);
            oscillator.stop(now + 0.17);
        } catch (error) {
            // Sound is optional. Visual reactions remain available.
        }
    }

    // ---------------------------------
    // Reaction Controller
    // ---------------------------------

    function reactToGhost(type) {
        clearTimeout(reactionTimer);

        ghost.classList.remove(
            "reaction-jump",
            "reaction-surprise",
            "reaction-laugh"
        );

        // Restart CSS animation.
        void ghost.offsetWidth;

        if (type === "surprise") {
            ghost.classList.add("reaction-surprise");
            showSpeech("Whoa! 😲");
        } else if (type === "laugh") {
            ghost.classList.add("reaction-laugh");
            showSpeech("Haha! That tickles! 😂");
        } else {
            ghost.classList.add("reaction-jump");

            const message =
                messages[Math.floor(Math.random() * messages.length)];

            showSpeech(message);
        }

        playTinySound(type);

        reactionTimer = setTimeout(() => {
            ghost.classList.remove(
                "reaction-jump",
                "reaction-surprise",
                "reaction-laugh"
            );
        }, 650);
    }

    // Single click / repeated clicks.
    function handleGhostClick() {
        clickCount++;

        clearTimeout(clickTimer);

        clickTimer = setTimeout(() => {
            if (clickCount >= 3) {
                reactToGhost("laugh");
            } else {
                reactToGhost("happy");
            }

            clickCount = 0;
        }, 260);
    }

    ghost.addEventListener("click", handleGhostClick);

    // Double click.
    ghost.addEventListener("dblclick", (event) => {
        event.preventDefault();

        clearTimeout(clickTimer);
        clickCount = 0;

        reactToGhost("surprise");
    });

    // Keyboard accessibility.
    ghost.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleGhostClick();
        }
    });

})();

/* =========================================
   Developer Terminal + Ghost Chat Assistant
   ========================================= */

(function initPortfolioTools() {
    // Prevent duplicate initialization.
    if (document.getElementById("portfolio-tools-initialized")) return;

    const marker = document.createElement("span");
    marker.id = "portfolio-tools-initialized";
    marker.hidden = true;
    document.body.appendChild(marker);

    // ---------------------------------------
    // Developer Terminal
    // ---------------------------------------

    const terminalForm = document.getElementById("terminal-form");
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");

    function printTerminal(text, className = "terminal-result") {
        const line = document.createElement("p");
        line.className = className;
        line.textContent = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    const terminalCommands = {
        help() {
            printTerminal("Available commands:");
            printTerminal("about     - Learn about Sahabi");
            printTerminal("projects  - Jump to Projects");
            printTerminal("skills    - Jump to Technical Skills");
            printTerminal("contact   - Jump to Contact");
            printTerminal("clear     - Clear the terminal");
        },

        about() {
            printTerminal(
                "Sahabi Khan is a Computer Science and Engineering student " +
                "interested in Android development and software engineering."
            );
        },

        projects() {
            printTerminal("Opening Projects...");
            document.getElementById("projects")?.scrollIntoView({
                behavior: "smooth"
            });
        },

        skills() {
            printTerminal("Opening Technical Skills...");
            document.getElementById("skills")?.scrollIntoView({
                behavior: "smooth"
            });
        },

        contact() {
            printTerminal("Opening Contact...");
            document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth"
            });
        },

        clear() {
            terminalOutput.replaceChildren();
        }
    };

    if (terminalForm && terminalInput && terminalOutput) {
        terminalForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const command = terminalInput.value.trim().toLowerCase();
            if (!command) return;

            printTerminal("visitor@portfolio:~$ " + command, "terminal-command-line");

            if (terminalCommands[command]) {
                terminalCommands[command]();
            } else {
                printTerminal(
                    "Command not found. Type 'help' to see available commands.",
                    "terminal-error"
                );
            }

            terminalInput.value = "";
        });
    }

    // ---------------------------------------
    // Chat panel creation
    // ---------------------------------------

    const ghost = document.getElementById("ghost-mascot");
    if (!ghost) return;

    const panel = document.createElement("aside");
    panel.className = "ghost-chat-panel";
    panel.id = "ghost-chat-panel";
    panel.setAttribute("aria-label", "Purple Ghost portfolio assistant");

    panel.innerHTML = `
        <div class="ghost-chat-header">
            <div class="ghost-chat-avatar" aria-hidden="true">👻</div>
            <div class="ghost-chat-identity">
                <strong>Nova — Portfolio Guide</strong>
                <span>Here to help you explore</span>
            </div>
            <button class="ghost-chat-close" type="button"
                aria-label="Close assistant">&times;</button>
        </div>

        <div class="ghost-chat-messages" id="ghost-chat-messages"
            aria-live="polite"></div>

        <div class="ghost-chat-actions">
            <button class="ghost-chat-action" data-action="projects">
                <i class="fa-solid fa-folder-open"></i> Projects
            </button>
            <button class="ghost-chat-action" data-action="skills">
                <i class="fa-solid fa-code"></i> Skills
            </button>
            <button class="ghost-chat-action" data-action="cv">
                <i class="fa-solid fa-file-arrow-down"></i> Find My CV
            </button>
            <button class="ghost-chat-action" data-action="contact">
                <i class="fa-solid fa-envelope"></i> Contact
            </button>
        </div>
    `;

    document.body.appendChild(panel);

    const chatMessages = panel.querySelector("#ghost-chat-messages");
    const closeButton = panel.querySelector(".ghost-chat-close");

    function addChatMessage(message) {
        const bubble = document.createElement("div");
        bubble.className = "ghost-chat-message";
        bubble.textContent = message;
        chatMessages.appendChild(bubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function openChat(message) {
        panel.classList.add("is-open");

        if (message) {
            addChatMessage(message);
        }
    }

    function closeChat() {
        panel.classList.remove("is-open");
    }

    // Ghost remains animated; clicking it also opens the guide.
    ghost.setAttribute("role", "button");
    ghost.setAttribute("tabindex", "0");
    ghost.setAttribute("aria-controls", "ghost-chat-panel");
    ghost.setAttribute("aria-expanded", "false");

    ghost.addEventListener("click", () => {
        const isOpen = panel.classList.toggle("is-open");

        ghost.setAttribute("aria-expanded", String(isOpen));

        if (isOpen && chatMessages.children.length === 0) {
            addChatMessage(
                "Hey there! 👋 I'm Nova, your portfolio guide. " +
                "What would you like to explore?"
            );
        }
    });

    closeButton.addEventListener("click", () => {
        closeChat();
        ghost.setAttribute("aria-expanded", "false");
    });

    // Close by clicking outside the panel or mascot.
    document.addEventListener("click", (event) => {
        if (
            panel.classList.contains("is-open") &&
            !panel.contains(event.target) &&
            !ghost.contains(event.target)
        ) {
            closeChat();
            ghost.setAttribute("aria-expanded", "false");
        }
    });

    // Keyboard support for the mascot.
    ghost.addEventListener("keydown", (event) => {
        if (
            (event.key === "Enter" || event.key === " ") &&
            document.activeElement === ghost
        ) {
            event.preventDefault();

            const isOpen = panel.classList.toggle("is-open");
            ghost.setAttribute("aria-expanded", String(isOpen));

            if (isOpen && chatMessages.children.length === 0) {
                addChatMessage(
                    "Hey there! 👋 I'm Nova, your portfolio guide. " +
                    "What would you like to explore?"
                );
            }
        }
    });

    // ---------------------------------------
    // Quick action navigation
    // ---------------------------------------

    panel.querySelectorAll("[data-action]").forEach(button => {
        button.addEventListener("click", () => {
            const action = button.dataset.action;

            const destinations = {
                projects: {
                    id: "projects",
                    message: "Let's explore my projects! 🚀"
                },
                skills: {
                    id: "skills",
                    message: "Here are the technologies I work with. 💻"
                },
                contact: {
                    id: "contact",
                    message: "Let's connect! You can find my contact details here. ✉️"
                }
            };

            if (action === "cv") {
                // Uses the existing CV filename in the portfolio root.
                const link = document.createElement("a");
                link.href = "Sahabi_Khan_CV.pdf";
                link.download = "Sahabi_Khan_CV.pdf";
                link.click();

                addChatMessage("Here's my CV! 📄");
                return;
            }

            const destination = destinations[action];
            if (!destination) return;

            addChatMessage(destination.message);

            document.getElementById(destination.id)?.scrollIntoView({
                behavior: "smooth"
            });

            closeChat();
            ghost.setAttribute("aria-expanded", "false");
        });
    });

    // ---------------------------------------
    // First-visit greeting only
    // ---------------------------------------

    const greetingKey = "sahabiPortfolioGhostGreeted";

    try {
        if (!localStorage.getItem(greetingKey)) {
            setTimeout(() => {
                // Don't interrupt if the visitor already opened the chat.
                if (!panel.classList.contains("is-open")) {
                    openChat("Hey there! 👋 Welcome to my portfolio. Want a quick tour?");
                    ghost.setAttribute("aria-expanded", "true");
                }

                localStorage.setItem(greetingKey, "yes");
            }, 1800);
        }
    } catch (error) {
        // If browser storage is unavailable, manual interaction still works.
    }
})();
