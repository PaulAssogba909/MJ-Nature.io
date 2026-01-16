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

  // Ouvrir WhatsApp
  window.open(whatsappURL, "_blank")

  // Afficher la confirmation et démarrer le chronomètre
  formWrapper.style.display = "none"
  confirmationSection.style.display = "block"
  startTimer()
})

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
