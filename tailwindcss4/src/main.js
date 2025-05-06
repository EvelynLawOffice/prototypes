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
window.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('mobile-backdrop');

  if (toggleBtn && menu && backdrop) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = !menu.classList.contains('hidden');

      menu.classList.toggle('hidden');
      menu.classList.toggle('flex');
      backdrop.classList.toggle('hidden');
      toggleBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
        backdrop.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Optional: close menu if backdrop is clicked
    backdrop.addEventListener('click', () => {
      menu.classList.add('hidden');
      menu.classList.remove('flex');
      backdrop.classList.add('hidden');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  }
});

// Testimonial Section
const track = document.getElementById('testimonialTrack');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

const slides = Array.from(track.children);
const total = slides.length;
let index = 0;

// Set track width and each slide’s width
track.style.width = `${total * 100}%`;
slides.forEach(slide => {
  slide.style.width = `${100 / total}%`;
});

function updateSlidePosition() {
  track.style.transform = `translateX(-${index * (100 / total)}%)`;
}

next.addEventListener('click', () => {
  if (index < total - 1) {
    index++;
    updateSlidePosition();
  }
});

prev.addEventListener('click', () => {
  if (index > 0) {
    index--;
    updateSlidePosition();
  }
});

// Swipe Support
let startX = 0;
let isSwiping = false;

track.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  isSwiping = true;
}, { passive: true });

track.addEventListener('touchmove', e => {
  if (!isSwiping) return;
  const deltaX = e.touches[0].clientX - startX;
  if (Math.abs(deltaX) > 10) e.preventDefault();
}, { passive: false });

track.addEventListener('touchend', e => {
  if (!isSwiping) return;
  isSwiping = false;
  const endX = e.changedTouches[0].clientX;
  const delta = startX - endX;

  if (delta > 50 && index < total - 1) {
    index++;
    updateSlidePosition();
  }
  if (delta < -50 && index > 0) {
    index--;
    updateSlidePosition();
  }
});

// Testimonial Text
  document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            entry.target.classList.remove("opacity-0", "translate-y-4");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    document.querySelectorAll('.fade-on-scroll').forEach(el => {
      observer.observe(el);
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-x-[100px]');
          entry.target.classList.add('animate-slide-in-right');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    document.querySelectorAll('.bio-image-scroll').forEach(el => observer.observe(el));
  });
