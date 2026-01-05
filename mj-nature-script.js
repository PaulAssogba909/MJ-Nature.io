// Menu toggle for mobile
function toggleMenu() {
  const nav = document.querySelector(".nav")
  const menuToggle = document.querySelector(".menu-toggle")

  if (nav.style.display === "flex") {
    nav.style.display = "none"
    menuToggle.classList.remove("active")
  } else {
    nav.style.display = "flex"
    nav.style.flexDirection = "column"
    nav.style.position = "absolute"
    nav.style.top = "80px"
    nav.style.left = "0"
    nav.style.right = "0"
    nav.style.background = "white"
    nav.style.padding = "1.5rem"
    nav.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
    menuToggle.classList.add("active")
  }
}

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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      // Close mobile menu if open
      const nav = document.querySelector(".nav")
      if (window.innerWidth <= 768 && nav.style.display === "flex") {
        toggleMenu()
      }
    }
  })
})

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
