// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add active state to navigation on scroll
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section[id]");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections and cards
document
  .querySelectorAll(
    "section, .service-card, .project-card, .certification-card"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.background = "rgba(10, 14, 39, 0.98)";
  } else {
    navbar.style.background = "rgba(10, 14, 39, 0.95)";
  }

  lastScroll = currentScroll;
});

// Form submission handler
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector("textarea").value;

    // Simulate form submission
    alert(
      `Thank you ${name}! Your message has been received. I'll get back to you at ${email} soon.`
    );

    // Reset form
    contactForm.reset();
  });
}

// Add hover effects to service cards
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add glow effect to buttons on hover
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.filter = "brightness(1.2)";
  });

  btn.addEventListener("mouseleave", function () {
    this.style.filter = "brightness(1)";
  });
});

// Parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero-background");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Lightbox for hackathons images
document.querySelectorAll(".hack-thumb").forEach((thumb) => {
  thumb.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    if (!href) return;

    // create overlay
    const overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";

    const content = document.createElement("div");
    content.className = "lightbox-content";

    const img = document.createElement("img");
    img.src = href;
    img.alt = this.querySelector("img")?.alt || "";

    const closeBtn = document.createElement("button");
    closeBtn.className = "lightbox-close";
    closeBtn.innerHTML = "&times;";

    content.appendChild(img);
    overlay.appendChild(content);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    // focus trap / esc to close
    function closeLightbox() {
      if (overlay && overlay.parentNode)
        overlay.parentNode.removeChild(overlay);
      document.removeEventListener("keydown", onKey);
    }

    function onKey(e) {
      if (e.key === "Escape") closeLightbox();
    }

    // close handlers
    closeBtn.addEventListener("click", closeLightbox);
    overlay.addEventListener("click", function (ev) {
      if (ev.target === overlay) closeLightbox();
    });
    document.addEventListener("keydown", onKey);
  });
});

// Force PDF links to open properly in new window
document.querySelectorAll(".cert-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href && href.endsWith(".pdf")) {
      e.preventDefault(); // Prevent default link behavior
      // Force the browser to open PDF in new tab
      window.open(href, "_blank");
    }
  });
});
