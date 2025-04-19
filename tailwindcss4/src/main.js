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

// Testimonial Section
const track = document.getElementById('testimonialTrack');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

const slides = Array.from(track.children);
const total = slides.length;
let index = 0;

// Dynamically set track width
track.style.width = `${total * 100}%`;

// Ensure each slide is 100% of the container width
slides.forEach(slide => {
  slide.style.width = `${100 / total}%`;
});



function updateSlidePosition() {
  track.style.transform = `translateX(-${index * (100 / total)}%)`;
}

next.addEventListener('click', () => {
  if (index < dotElements.length) {
    const targetDotIndex = dotElements.length - 1 - index;
    animateDot(targetDotIndex, 'right');
    index++;
    updateSlidePosition();
  }
});


prev.addEventListener('click', () => {
  if (index > 0) {
    index--;
    const targetDotIndex = dotElements.length - 1 - index;
    animateDot(targetDotIndex, 'left');
    updateSlidePosition();
  }
});




// Swipe support
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

  // Testimonial Dot Animation
const dotTrail = document.getElementById("dotTrail");
const dotCount = total - 1;
let dotElements = [];

// Create and append dots
function initDots() {
  dotTrail.innerHTML = '';
  dotElements = [];

  for (let i = 0; i < dotCount; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'relative w-4 h-4 overflow-visible';
  
    const dot = document.createElement('div');
    dot.className = 'w-3 h-3 transition-transform duration-700 ease-out rounded-full bg-light-pink';
    dot.style.transform = 'translateX(0px)';
  
    wrapper.appendChild(dot);
    dotTrail.appendChild(wrapper);
    dotElements.push(dot); // Push only the INNER dot for animation
  }  
}

console.log("initDots ran, total:", dotCount);

// Animate dot to right or back to left
function animateDot(index, direction) {
  const dot = dotElements[index];
  if (!dot) return;

  const rightmostPosition = 320; // confirmed good landing spot for rightmost dot
  const spacing = 0;            // tighter visual spacing between dots
  const destination = rightmostPosition - (index * spacing);

  dot.style.transform =
    direction === 'right'
      ? `translateX(${destination}px)`
      : `translateX(0px)`;
}



// ✅ Call initDots AFTER the DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  initDots();
});


