document.addEventListener("DOMContentLoaded", () => {

    
    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {
        if (loader) {
            setTimeout(() => {
                loader.classList.add("hidden");
            }, 300);
        }
    });



    const yearSpan = document.getElementById("current-year");

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }



    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const themeLabel = document.getElementById("theme-label");
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem("theme") || "dark";

    htmlElement.setAttribute("data-theme", savedTheme);

    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {

            const currentTheme =
                htmlElement.getAttribute("data-theme");

            const newTheme =
                currentTheme === "light" ? "dark" : "light";

            htmlElement.setAttribute("data-theme", newTheme);

            localStorage.setItem("theme", newTheme);

            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {

        if (!themeIcon) return;

        if (theme === "dark") {
            themeIcon.className = "fa-solid fa-sun";
            if (themeLabel) themeLabel.textContent = "Light mode";
            if (themeToggleBtn) {
                themeToggleBtn.setAttribute("aria-label", "Switch to light mode");
                themeToggleBtn.setAttribute("title", "Switch to light mode");
            }
        } else {
            themeIcon.className = "fa-solid fa-moon";
            if (themeLabel) themeLabel.textContent = "Dark mode";
            if (themeToggleBtn) {
                themeToggleBtn.setAttribute("aria-label", "Switch to dark mode");
                themeToggleBtn.setAttribute("title", "Switch to dark mode");
            }
        }
    }



    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (hamburger && navMenu) {

        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

    }

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (hamburger) {
                hamburger.classList.remove("active");
            }

            if (navMenu) {
                navMenu.classList.remove("active");
            }

        });

    });



    const typedTextSpan = document.getElementById("typed-text");

    const titles = [
        "Software Engineering Student",
        "Web Developer",
        "Frontend Developer",
        "Aspiring Software Engineer"
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newTitleDelay = 2000;

    function type() {

        if (!typedTextSpan) return;

        const currentTitle = titles[titleIndex];

        if (isDeleting) {

            typedTextSpan.textContent =
                currentTitle.substring(0, charIndex - 1);

            charIndex--;

        } else {

            typedTextSpan.textContent =
                currentTitle.substring(0, charIndex + 1);

            charIndex++;
        }


        if (!isDeleting && charIndex === currentTitle.length) {

            isDeleting = true;

            setTimeout(type, newTitleDelay);

        } else if (isDeleting && charIndex === 0) {

            isDeleting = false;

            titleIndex =
                (titleIndex + 1) % titles.length;

            setTimeout(type, 500);

        } else {

            setTimeout(
                type,
                isDeleting ? erasingSpeed : typingSpeed
            );

        }

    }

    if (typedTextSpan) {
        setTimeout(type, 1000);
    }


    const scrollProgress =
        document.getElementById("scroll-progress");

    const backToTopBtn =
        document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {

        const totalHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            totalHeight > 0
                ? (window.scrollY / totalHeight) * 100
                : 0;

        if (scrollProgress) {
            scrollProgress.style.width = `${progress}%`;
        }


        if (backToTopBtn) {

            if (window.scrollY > 400) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }

        }


        highlightNavOnScroll();

    });


    if (backToTopBtn) {

        backToTopBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    const sections =
        document.querySelectorAll("section");

    function highlightNavOnScroll() {

        const scrollY = window.pageYOffset;

        sections.forEach(current => {

            const sectionHeight =
                current.offsetHeight;

            const sectionTop =
                current.offsetTop - 100;

            const sectionId =
                current.getAttribute("id");

            const navLink =
                document.querySelector(
                    `.nav-menu a[href*="${sectionId}"]`
                );

            if (!navLink) return;


            if (
                scrollY > sectionTop &&
                scrollY <= sectionTop + sectionHeight
            ) {

                navLink.classList.add("active");

            } else {

                navLink.classList.remove("active");

            }

        });

    }



    const revealElements =
        document.querySelectorAll(".scroll-reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("active");

                            observer.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

       

        revealElements.forEach(element => {
            element.classList.add("active");
        });

    }

    const contactForm =
        document.getElementById("contact-form");

    const formStatus =
        document.getElementById("form-status");


    if (contactForm) {

        contactForm.addEventListener("submit", (e) => {

            e.preventDefault();


            document
                .querySelectorAll(".error-msg")
                .forEach(el => {
                    el.textContent = "";
                });


            if (formStatus) {
                formStatus.className = "form-status";
                formStatus.textContent = "";
            }


            let isValid = true;


            const name =
                document.getElementById("name");

            const email =
                document.getElementById("email");

            const subject =
                document.getElementById("subject");

            const message =
                document.getElementById("message");


           

            if (name && name.value.trim() === "") {

                showError(
                    "name-error",
                    "Full Name is required"
                );

                isValid = false;
            }


        

            if (email && email.value.trim() === "") {

                showError(
                    "email-error",
                    "Email is required"
                );

                isValid = false;

            } else if (
                email &&
                !isValidEmail(email.value.trim())
            ) {

                showError(
                    "email-error",
                    "Please enter a valid email address"
                );

                isValid = false;
            }



            if (subject && subject.value.trim() === "") {

                showError(
                    "subject-error",
                    "Subject is required"
                );

                isValid = false;
            }


           

            if (message && message.value.trim() === "") {

                showError(
                    "message-error",
                    "Message cannot be empty"
                );

                isValid = false;
            }


            

            if (isValid && formStatus) {

                formStatus.className =
                    "form-status success";

                formStatus.textContent =
                    "Thank you! Your message has been sent successfully.";

                contactForm.reset();


                setTimeout(() => {

                    formStatus.textContent = "";

                    formStatus.className =
                        "form-status";

                }, 5000);

            }

        });

    }

    function showError(elementId, message) {

        const errorElement =
            document.getElementById(elementId);

        if (errorElement) {
            errorElement.textContent = message;
        }

    }


    function isValidEmail(email) {

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);

    }

});

// Visible but soft cursor-smoke trail for a polished professional portfolio.
(() => {
  const canvas = document.getElementById('smoke-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let width = 0, height = 0, particles = [], lastSpawn = 0;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize, { passive: true }); resize();
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  window.addEventListener('pointermove', (event) => {
    const now = performance.now();
    const interval = reduceMotion ? 34 : 16;
    if (now - lastSpawn < interval) return;
    lastSpawn = now;
    const amount = reduceMotion ? 1 : 2;
    for (let i = 0; i < amount; i++) {
      particles.push({
        x: event.clientX + (Math.random() - 0.5) * 10,
        y: event.clientY + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 0.65,
        vy: -0.2 - Math.random() * 0.5,
        size: 8 + Math.random() * 12,
        life: 1,
        decay: reduceMotion ? 0.026 + Math.random() * 0.012 : 0.014 + Math.random() * 0.012,
        hue: 255 + Math.random() * 28
      });
    }
    if (particles.length > 100) particles.splice(0, particles.length - 100);
  }, { passive: true });
  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles = particles.filter(p => p.life > 0.025);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy; p.size += 0.12; p.life -= p.decay;
      const alpha = Math.max(0, p.life) * (reduceMotion ? 0.13 : 0.19);
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      gradient.addColorStop(0, `hsla(${p.hue}, 90%, 88%, ${alpha})`);
      gradient.addColorStop(0.38, `hsla(${p.hue}, 82%, 72%, ${alpha * 0.72})`);
      gradient.addColorStop(0.72, `hsla(${p.hue}, 70%, 62%, ${alpha * 0.28})`);
      gradient.addColorStop(1, `hsla(${p.hue}, 80%, 55%, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

// Let the Skills cards' soft glow follow the pointer, with no effect on touch devices.
(() => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('#skills .skills-category').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--skill-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--skill-y', `${event.clientY - rect.top}px`);
    }, { passive: true });
  });
})();


// Reveal portfolio projects in groups of three.
(() => {
  const cards = Array.from(document.querySelectorAll('.project-page-item'));
  const button = document.getElementById('projectsMoreBtn');
  const count = document.getElementById('projectsCount');
  if (!cards.length || !button || !count) return;
  const batchSize = 3;
  let visible = Math.min(batchSize, cards.length);
  function render() {
    cards.forEach((card, index) => card.classList.toggle('is-visible', index < visible));
    count.textContent = `Showing ${visible} of ${cards.length} projects`;
    if (visible >= cards.length) {
      button.innerHTML = 'See Less <i class="fa-solid fa-chevron-up"></i>';
      button.disabled = false;
      button.setAttribute('aria-label', 'Show fewer projects');
    } else {
      button.innerHTML = 'See More <i class="fa-solid fa-chevron-down"></i>';
      button.disabled = false;
      button.setAttribute('aria-label', 'Show more projects');
    }
  }
  button.addEventListener('click', () => {
    if (visible >= cards.length) {
      visible = Math.min(batchSize, cards.length);
    } else {
      visible = Math.min(visible + batchSize, cards.length);
    }
    render();
  });
  render();
})();
