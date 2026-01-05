// Menu toggle for mobile
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // Close menu when clicking on a link
  mobileMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    const target = document.querySelector(href);

    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    

    // Close menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll(".nav-link")
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.toggle("active")
        menuToggle.classList.toggle("active")
      })
    })
  }
})

// FAQ toggle
function toggleFaq(button) {
  const faqItem = button.closest(".faq-item")
  const wasActive = faqItem.classList.contains("active")

  // Close all FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active")
  })

  // If this item wasn't active, open it
  if (!wasActive) {
    faqItem.classList.add("active")
  }
}

// Close mobile menu if open
    const mobileMenu = document.querySelector(".mobile-menu");
    const menuToggle = document.getElementById("menuToggle");

    if (
      window.innerWidth <= 768 &&
      mobileMenu &&
      menuToggle &&
      mobileMenu.classList.contains("active")
    ) {
      mobileMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
      
// Form submission handler
document.querySelector(".contact-form form")?.addEventListener("submit", function (e) {
  e.preventDefault()

  const name = this.querySelector("#name").value
  const email = this.querySelector("#email").value
  const phone = this.querySelector("#phone").value
  const message = this.querySelector("#message").value

  // Create WhatsApp message
  const whatsappMessage = `Nouveau message de ${name}%0A%0AEmail: ${email}%0ATéléphone: ${phone}%0A%0AMessage:%0A${message}`

  // Redirect to WhatsApp
  window.open(`https://wa.me/c/22941764144?text=${whatsappMessage}`, "_blank")

  // Reset form
  this.reset()
  alert("Merci pour votre message ! Nous vous redirigerons vers WhatsApp.")
})

// Add scroll animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all cards
document.querySelectorAll(".product-card, .feature-card, .testimonial-card, .faq-item").forEach((card) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(30px)"
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(card)
})
