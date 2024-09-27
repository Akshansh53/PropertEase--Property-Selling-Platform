(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  let cards = document.querySelectorAll(".list-card");
  let cardImages = document.querySelectorAll("#card-image");
  
  cards.forEach(function(card,index) {
    let cardimage=cardImages[index];
      card.addEventListener("mouseover", function() {
        
        card.setAttribute("style", "background-image:url("+cardimage.currentSrc+") ");
      });
      card.addEventListener("mouseout", function() {
        card.setAttribute("style", "none");
      });
    });