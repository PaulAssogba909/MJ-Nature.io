// Gestion du formulaire de réservation
const reservationForm = document.getElementById("reservationForm")
const confirmationSection = document.getElementById("confirmationSection")
const formWrapper = document.querySelector(".reservation-form-wrapper")

let timerInterval
const totalSeconds = 5400 // 1h30 (moyenne entre 1h et 2h)

reservationForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const selectedProducts = []
  const checkboxes = document.querySelectorAll('input[name="products"]:checked')

  if (checkboxes.length === 0) {
    alert("Veuillez sélectionner au moins un produit")
    return
  }

  checkboxes.forEach((checkbox, index) => {
    const productName = checkbox.value
    const qtyInput = checkbox.parentElement.querySelector(".product-quantity")
    const quantity = qtyInput.value || 1
    selectedProducts.push({ produit: productName, quantite: quantity })
  })

  // Récupérer les autres données du formulaire
  const formData = {
    nom: document.getElementById("name").value,
    telephone: document.getElementById("phone").value,
    produits: selectedProducts,
    dateLivraison: document.getElementById("deliveryDate").value,
    heureLivraison: document.getElementById("deliveryTime").value,
    adresse: document.getElementById("address").value,
    notes: document.getElementById("notes").value || "Aucune",
  }

  // Formater la date en français
  const dateObj = new Date(formData.dateLivraison)
  const dateFormatted = dateObj.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  let produitsText = ""
  formData.produits.forEach((item, index) => {
    produitsText += `${index + 1}. ${item.produit} - Quantité: ${item.quantite}\n`
  })

  // Créer le message WhatsApp
  const message = `🛒 *NOUVELLE RÉSERVATION MJ NATURE*

👤 *Client:* ${formData.nom}
📱 *Téléphone:* ${formData.telephone}

🥗 *Produits commandés:*
${produitsText}
📅 *Date de livraison:* ${dateFormatted}
🕐 *Heure souhaitée:* ${formData.heureLivraison}
📍 *Adresse:* ${formData.adresse}

📝 *Notes:* ${formData.notes}

⏰ _Réservation envoyée le ${new Date().toLocaleString("fr-FR")}_`

  // Numéro WhatsApp pour recevoir les commandes
  const whatsappNumber = "22941764144"
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  formWrapper.style.display = "none"
  confirmationSection.style.display = "block"

  const instructionDiv = document.createElement("div")
  instructionDiv.className = "whatsapp-instruction"
  instructionDiv.innerHTML = `
    <div style="background: #fff3cd; border: 2px solid #ffc107; padding: 20px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
      <h3 style="color: #856404; margin-bottom: 10px;">📱 Dernière étape</h3>
      <p style="color: #856404; margin-bottom: 15px;">WhatsApp va s'ouvrir avec votre message pré-rempli.</p>
      <p style="color: #856404; font-weight: bold; margin-bottom: 15px;">Cliquez sur "Envoyer" dans WhatsApp pour confirmer votre commande.</p>
      <button onclick="openWhatsAppAndStartTimer('${whatsappURL}')" class="btn btn-primary" style="background: #25D366;">
        <svg style="width: 20px; height: 20px; margin-right: 8px;" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        Ouvrir WhatsApp et envoyer
      </button>
    </div>
  `
  confirmationSection.insertBefore(instructionDiv, confirmationSection.firstChild)

  // Scroll vers le haut pour voir les instructions
  window.scrollTo({ top: 0, behavior: "smooth" })
})

function openWhatsAppAndStartTimer(whatsappURL) {
  // Ouvrir WhatsApp
  window.open(whatsappURL, "_blank")

  // Retirer le message d'instruction
  const instruction = document.querySelector(".whatsapp-instruction")
  if (instruction) {
    instruction.remove()
  }

  // Démarrer le chronomètre après l'ouverture de WhatsApp
  startTimer()
}

function startTimer() {
  let remainingSeconds = totalSeconds

  updateTimerDisplay(remainingSeconds)

  timerInterval = setInterval(() => {
    remainingSeconds--

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval)
      remainingSeconds = 0
    }

    updateTimerDisplay(remainingSeconds)
  }, 1000)
}

function updateTimerDisplay(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  document.getElementById("hours").textContent = String(hours).padStart(2, "0")
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0")
  document.getElementById("seconds").textContent = String(secs).padStart(2, "0")

  // Mettre à jour la barre de progression
  const progressPercentage = (seconds / totalSeconds) * 100
  document.getElementById("progressBar").style.width = progressPercentage + "%"
}

function newReservation() {
  // Réinitialiser le formulaire
  reservationForm.reset()
  formWrapper.style.display = "block"
  confirmationSection.style.display = "none"

  // Arrêter le chronomètre
  if (timerInterval) {
    clearInterval(timerInterval)
  }

  // Scroll vers le haut
  window.scrollTo({ top: 0, behavior: "smooth" })
}

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
      menuToggle.classList.toggle("active")
    })

    // Fermer le menu quand on clique sur un lien
    const mobileMenuLinks = mobileMenu.querySelectorAll(".nav-link")
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        menuToggle.classList.remove("active")
      })
    })
  }
})
