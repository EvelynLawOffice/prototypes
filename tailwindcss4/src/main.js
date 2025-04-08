import './style.css'
import Alpine from 'alpinejs'
import AOS from 'aos'
import 'aos/dist/aos.css'

window.Alpine = Alpine
Alpine.start()

// Normal AOS init (don't delay here)
AOS.init({
  once: false,       // <— triggers animation on every scroll into view
  duration: 700,
  offset: 50,
})


// Optional refresh shortly after load to catch Alpine content
window.addEventListener('load', () => {
  setTimeout(() => {
    AOS.refresh()
  }, 100)
})
