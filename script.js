/* ----------------------------------------------------
   Modern Portfolio JS Core
   Sakshi Damani | Full Stack & GenAI Developer
---------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- Mobile Menu Toggle ---
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const openIcon = document.querySelector(".mobile-nav-toggle .open-icon");
    const closeIcon = document.querySelector(".mobile-nav-toggle .close-icon");
    const navLinksList = document.querySelectorAll(".nav-link");

    function toggleMenu() {
        navMenu.classList.toggle("open");
        const isOpen = navMenu.classList.contains("open");
        
        if (isOpen) {
            openIcon.style.display = "none";
            closeIcon.style.display = "block";
            document.body.style.overflow = "hidden"; // Prevent background scroll
        } else {
            openIcon.style.display = "block";
            closeIcon.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener("click", toggleMenu);
    }

    // Close menu when clicking nav link
    navLinksList.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("open")) {
                toggleMenu();
            }
        });
    });

    // --- Scrolled Header Shadow ---
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // --- Dark/Light Theme Switching ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;

    // Check cached theme preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Apply initial theme
    if (savedTheme) {
        htmlElement.setAttribute("data-theme", savedTheme);
    } else {
        htmlElement.setAttribute("data-theme", systemPrefersDark ? "dark" : "light");
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            htmlElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
        });
    }

    // --- ScrollSpy Active Links ---
    const sections = document.querySelectorAll("section[id]");
    
    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");
            const currentLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (currentLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    currentLink.classList.add("active");
                } else {
                    currentLink.classList.remove("active");
                }
            }
        });
    }
    window.addEventListener("scroll", scrollActive);

    // --- Scroll Reveal Animations ---
    const revealItems = document.querySelectorAll("[data-reveal]");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

    // --- Project Filtering ---
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active from all buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            // Add active to current
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            projectCards.forEach(card => {
                const cardCategories = card.getAttribute("data-categories").split(" ");
                
                if (filterValue === "all" || cardCategories.includes(filterValue)) {
                    card.style.display = "flex";
                    // Brief delay to trigger transition
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });
        });
    });

    // --- Interactive Contact Form Handler ---
    const contactForm = document.getElementById("contact-form");
    const formFeedback = document.getElementById("form-feedback");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("form-name").value;
            const email = document.getElementById("form-email").value;
            const subject = document.getElementById("form-subject").value;
            const message = document.getElementById("form-message").value;

            // Simple validation check
            if (!name || !email || !subject || !message) {
                showFeedback("Please fill out all fields.", "error");
                return;
            }

            // Simulate form submission
            showFeedback("Sending message...", "");
            
            setTimeout(() => {
                showFeedback(`Thank you, ${name}! Your message has been sent successfully.`, "success");
                contactForm.reset();
            }, 1500);
        });
    }

    function showFeedback(text, statusClass) {
        if (!formFeedback) return;
        formFeedback.innerText = text;
        formFeedback.className = "form-feedback"; // Clear previous classes
        
        if (statusClass) {
            formFeedback.classList.add(statusClass);
        } else {
            formFeedback.style.display = "block";
            formFeedback.style.color = "var(--text-secondary)";
        }
    }
});
