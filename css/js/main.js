// ================================
// NAVBAR SCROLL
// ================================

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


// ================================
// MOBILE MENU
// ================================

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    const menuOpen = navLinks.classList.contains("open");

    menuButton.textContent = menuOpen ? "✕" : "☰";

});


// Linke basınca mobil menüyü kapat

document.querySelectorAll(".nav-links a").forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuButton.textContent = "☰";

    });

});


// ================================
// RESTAURANT MENU FILTER
// ================================

const menuTabs = document.querySelectorAll(".menu-tab");
const menuItems = document.querySelectorAll(".menu-item");

menuTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

        const selectedCategory = tab.dataset.category;

        // Aktif butonu değiştir

        menuTabs.forEach((button) => {
            button.classList.remove("active");
        });

        tab.classList.add("active");


        // Doğru yemek kategorisini göster

        menuItems.forEach((item) => {

            if (item.dataset.category === selectedCategory) {

                item.classList.remove("hidden");

            } else {

                item.classList.add("hidden");

            }

        });

    });

});


// ================================
// RESERVATION DATE
// ================================

// Geçmiş tarihe rezervasyon yapılmasını engelle

const dateInput = document.getElementById("date");

const today = new Date();

const todayFormatted =
    today.toISOString().split("T")[0];

dateInput.min = todayFormatted;


// ================================
// RESERVATION FORM
// ================================

const reservationForm =
    document.getElementById("reservationForm");

const formMessage =
    document.getElementById("formMessage");


reservationForm.addEventListener("submit", (event) => {

    // Gerçek sunucuya göndermeyi engelle
    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const date =
        document.getElementById("date").value;

    const time =
        document.getElementById("time").value;

    const guests =
        document.getElementById("guests").value;


    // Basit kontrol

    if (!name || !email || !date || !time || !guests) {

        formMessage.style.display = "block";

        formMessage.textContent =
            "Please complete all required fields.";

        return;

    }


    // Demo başarı mesajı

    formMessage.style.display = "block";

    formMessage.textContent =
        `Thank you, ${name}! Your demo reservation request has been received.`;


    // Formu temizle

    reservationForm.reset();

});
// ================================
// SCROLL REVEAL ANIMATION
// ================================

const revealElements = document.querySelectorAll(
    ".section-heading, .about-image, .about-content, .dish-card, .gallery-item, .reservation-content, .reservation-form"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});
// ================================
// ACTIVE NAVIGATION
// ================================

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navigationLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);

updateActiveNavigation();