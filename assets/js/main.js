/*=============== EMAIL JS ===============*/

const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message')

const sendEmail = (e) =>{
   e.preventDefault()

   // serviceID - templateID - #form - publicKey
   emailjs.sendForm('service_74xylcs','template_qwb22oo','#contact-form','7K1_QO6RaJeEYkhuR')

   .then(() =>{
    // Show sent message
    contactMessage.textContent = 'Message envoyé avec succès ✅'

    // Remove message after five seconds
    setTimeout(() =>{
       contactMessage.textContent = ''
    }, 5000)

     // Clear input fields
       contactForm.reset()
   }, () =>{
     // Show error message
     contactMessage.textContent = 'Message non envoyé (erreur de service) ❌'
   })
}

contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/ 

const scrollUp = () =>{
   const scrollUp = document.getElementById('scroll-up')
   this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                   : scrollUp.classList.remove('show-scroll')
}

window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
   const scrollDown = window.scrollY

   sections.forEach(current =>{
      const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id'),
      sectionsClass = document.querySelector('.nav__list a[href*=' + sectionId + ']')

      if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
         sectionsClass.classList.add('active-link')
      } else{
         sectionsClass.classList.remove('active-link')
      }
   })
}

window.addEventListener('scroll', scrollActive)


/*=============== FILTER PROJECTS & EXPERIENCES ===============*/

const filterGroups = document.querySelectorAll('[data-filter-group]')

filterGroups.forEach(group =>{
   const target = document.querySelector(`[data-filter-target="${group.dataset.filterGroup}"]`),
         buttons = group.querySelectorAll('.filters__button'),
         cards = target.querySelectorAll('[data-category]')

   // Message shown when a category has no cards yet
   const emptyMessage = document.createElement('p')
   emptyMessage.className = 'filters__empty'
   emptyMessage.textContent = 'Bientôt disponible : aucun élément dans cette catégorie pour le moment.'
   emptyMessage.hidden = true
   target.after(emptyMessage)

   buttons.forEach(button =>{
      button.addEventListener('click', () =>{
         const filter = button.dataset.filter
         let visibleCards = 0

         buttons.forEach(btn => btn.classList.remove('active-filter'))
         button.classList.add('active-filter')

         cards.forEach(card =>{
            const categories = card.dataset.category.split(' ')
            const show = filter === 'all' || categories.includes(filter)

            card.classList.toggle('filter-hidden', !show)
            if(show) visibleCards++

            // Swap content written for a specific filter (data-show-for / data-hide-for)
            card.querySelectorAll('[data-show-for]').forEach(el =>{
               el.classList.toggle('filter-hidden', !el.dataset.showFor.split(' ').includes(filter))
            })
            card.querySelectorAll('[data-hide-for]').forEach(el =>{
               el.classList.toggle('filter-hidden', el.dataset.hideFor.split(' ').includes(filter))
            })

            // Switch links that have a specific URL for this filter (data-href-<filter>)
            card.querySelectorAll('a[href]').forEach(link =>{
               if(!link.dataset.hrefDefault) link.dataset.hrefDefault = link.getAttribute('href')
               link.href = link.getAttribute(`data-href-${filter}`) || link.dataset.hrefDefault
            })
         })

         emptyMessage.hidden = visibleCards > 0

         // Let ScrollReveal reveal cards that were hidden before
         window.dispatchEvent(new Event('resize'))
      })
   })
})

/*=============== SCROLL REVEAL ANIMATION ===============*/

const sr = ScrollReveal({
   origin: 'top', 
   distance: '6Opx', 
   duration: 2500, 
   delay: 400,

   // reset: true, // Animations repeat
})

sr.reveal(`.perfil, .contact__form`)
sr.reveal(`.info`, {origin: 'left', delay: 800})
sr.reveal(`.skills`, {origin: 'left', delay: 1000})
sr.reveal(`.about`, {origin: 'right', delay: 1200})
sr.reveal(`.projects__card, .services__card, .experiennce__card`, {interval: 100})

