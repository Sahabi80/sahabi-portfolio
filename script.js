// ===============================
// Portfolio v2.0
// Dark Mode
// ===============================

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const icon = themeToggle.querySelector("i");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
    enableLightMode();
}

// Toggle theme
themeToggle.addEventListener("click", () => {

    if (body.classList.contains("light-mode")) {
        disableLightMode();
    } else {
        enableLightMode();
    }

});

// Enable Light Mode
function enableLightMode() {

    body.classList.add("light-mode");

    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");

    localStorage.setItem("theme", "light");

}

// Enable Dark Mode
function disableLightMode() {

    body.classList.remove("light-mode");

    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");

    localStorage.setItem("theme", "dark");

}

// ===============================
// Smooth Fade Animation
// ===============================

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

            phoneImage.src = screenshots[currentIndex];
            phoneImage.style.opacity = "1";

        }, 150);

    }

    nextBtn.addEventListener("click", () => {

        currentIndex++;

        if (currentIndex >= screenshots.length) {

            currentIndex = 0;

        }

        updateScreenshot();

    });

    prevBtn.addEventListener("click", () => {

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex = screenshots.length - 1;

        }

        updateScreenshot();

    });

}
