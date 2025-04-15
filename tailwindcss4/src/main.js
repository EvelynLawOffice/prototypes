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

// JavaScript to toggle menu

        const toggleBtn = document.getElementById('menu-toggle');
        const menu = document.getElementById('mobile-menu');
        const backdrop = document.getElementById('mobile-backdrop');

          // Toggle menu and backdrop visibility
        toggleBtn.addEventListener('click', () => {
        const isOpen = menu.classList.contains('flex');
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
        backdrop.classList.toggle('hidden');
        });

          // Close menu when clicking on a nav link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
        backdrop.classList.add('hidden');
        });
        });

          // Optional: close menu if backdrop is clicked
        backdrop.addEventListener('click', () => {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
        backdrop.classList.add('hidden');
        });


    const track = document.getElementById('testimonialTrack');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');

    let index = 0;
    const slides = track.children;
    const total = slides.length;

    function updateSlidePosition() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    prev.addEventListener('click', () => {
      index = (index - 1 + total) % total;
      updateSlidePosition();
    });

    next.addEventListener('click', () => {
      index = (index + 1) % total;
      updateSlidePosition();
    });

    // Optional: swipe support
    let startX = 0;
    track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    track.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].clientX;
      const delta = startX - endX;
      if (delta > 50) next.click();
      if (delta < -50) prev.click();
    });
