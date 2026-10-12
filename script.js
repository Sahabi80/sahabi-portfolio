
/* ===============================
   Portfolio v2.1
   Theme, Animations, Slider & Ghost
   =============================== */

// ===============================
// Dark / Light Mode
// ===============================

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

// ===============================
// Smooth Fade Animation
// ===============================

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

// ===============================
// SecureShield Screenshot Slider
// ===============================

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
            currentIndex =
                (currentIndex + screenshots.length) % screenshots.length;

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

// ===============================
// Floating Purple Ghost Mascot
// ===============================

(function createGhostMascot() {
    // Prevent duplicate mascots
    if (document.getElementById("ghost-mascot")) return;

    // Respect accessibility preferences
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Inject mascot styles
    const style = document.createElement("style");

    style.textContent = `
        #ghost-mascot {
            position: fixed;
            right: 24px;
            bottom: 22px;
            width: 100px;
            height: 120px;
            z-index: 999;
            pointer-events: none;
            user-select: none;
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
                145deg,
                #d8b4fe 0%,
                #a855f7 48%,
                #7c3aed 100%
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
            background: linear-gradient(
                180deg,
                #a855f7,
                #7c3aed
            );
            border-radius: 15px 15px 8px 8px;
            clip-path: polygon(
                0 0, 100% 0, 100% 88%,
                83% 100%, 67% 87%,
                50% 100%, 33% 87%,
                16% 100%, 0 88%
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

        #ghost-mascot.blinking .ghost-eye {
            animation: ghost-blink .18s ease-in-out;
        }

        #ghost-mascot:hover {
            filter: drop-shadow(0 8px 24px rgba(139,92,246,.45));
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

        @media (max-width: 576px) {
            #ghost-mascot {
                right: 10px;
                bottom: 12px;
                transform: scale(.78);
                transform-origin: bottom right;
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
        }
    `;

    document.head.appendChild(style);

    // Create mascot elements
    const ghost = document.createElement("div");
    ghost.id = "ghost-mascot";
    ghost.setAttribute("role", "img");
    ghost.setAttribute("aria-label", "Purple ghost mascot");

    ghost.innerHTML = `
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
    const eyes = ghost.querySelectorAll(".ghost-eye");

    // Make eyes follow the cursor and gently turn the head
    if (!reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
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

            const tilt = Math.max(-10, Math.min(10, dx / 35));
            const nod = Math.max(-5, Math.min(5, dy / 55));

            head.style.transform =
                `rotate(${tilt}deg) translateY(${nod}px)`;
        }, { passive: true });
    }

    // Random natural blinking
    function blink() {
        if (!document.hidden && !reducedMotion) {
            ghost.classList.add("blinking");

            setTimeout(() => {
                ghost.classList.remove("blinking");
            }, 180);
        }

        const nextBlink = 2200 + Math.random() * 3000;
        setTimeout(blink, nextBlink);
    }

    if (!reducedMotion) {
        setTimeout(blink, 1800);
    }
})();
