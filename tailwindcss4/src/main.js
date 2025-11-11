import './style.css'

// Alpine & AOS via npm
import Alpine from 'alpinejs'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Alpine boot
window.Alpine = Alpine
Alpine.start()

document.addEventListener('DOMContentLoaded', () => {
    // ---- AOS (crisper: animate once) ----
    AOS.init({
        once: true, // <- crisper for a marketing site
        duration: 700,
        offset: 50,
    })
    setTimeout(() => AOS.refresh && AOS.refresh(), 120)

    // ---- Mobile menu (accessible + scroll lock) ----
    const toggleBtn = document.getElementById('menu-toggle')
    const menu = document.getElementById('mobile-menu')
    const backdrop = document.getElementById('mobile-backdrop')
    const body = document.body

    const openMenu = () => {
        menu?.classList.remove('hidden')
        backdrop?.classList.remove('hidden')
        toggleBtn?.setAttribute('aria-expanded', 'true')
        body.classList.add('overflow-hidden-touch')
    }

    const closeMenu = () => {
        menu?.classList.add('hidden')
        backdrop?.classList.add('hidden')
        toggleBtn?.setAttribute('aria-expanded', 'false')
        body.classList.remove('overflow-hidden-touch')
    }

    if (toggleBtn && menu && backdrop) {
        toggleBtn.addEventListener('click', () => {
            const expanded = toggleBtn.getAttribute('aria-expanded') === 'true'
            expanded ? closeMenu() : openMenu()
        })

        menu.querySelectorAll('a')?.forEach((a) => a.addEventListener('click', closeMenu))
        backdrop.addEventListener('click', closeMenu)
        window.addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu())
    }

    // ---- Testimonials slider (guarded) ----
    const track = document.getElementById('testimonialTrack')
    const prev = document.getElementById('prev')
    const next = document.getElementById('next')

    if (track && prev && next) {
        const slides = Array.from(track.children)
        const total = slides.length
        let index = 0

        const applyWidths = () => {
            track.style.width = `${total * 100}%`
            slides.forEach((slide) => {
                slide.style.width = `${100 / total}%`
            })
            update()
        }

        const update = () => {
            track.style.transform = `translateX(-${index * (100 / total)}%)`
        }

        next.addEventListener('click', () => {
            if (index < total - 1) {
                index++
                update()
            }
        })

        prev.addEventListener('click', () => {
            if (index > 0) {
                index--
                update()
            }
        })

        // Keyboard support
        track.setAttribute('tabindex', '0')
        track.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') next.click()
            if (e.key === 'ArrowLeft') prev.click()
        })

        // Basic swipe support
        let startX = 0
        let isSwiping = false
        track.addEventListener(
            'touchstart',
            (e) => {
                startX = e.touches[0].clientX
                isSwiping = true
            },
            { passive: true },
        )

        track.addEventListener(
            'touchend',
            (e) => {
                if (!isSwiping) return
                isSwiping = false
                const endX = e.changedTouches[0].clientX
                const delta = startX - endX
                if (delta > 50 && index < total - 1) {
                    index++
                    update()
                }
                if (delta < -50 && index > 0) {
                    index--
                    update()
                }
            },
            { passive: true },
        )

        window.addEventListener('resize', applyWidths)
        applyWidths()
    }

    // ---- Intersection effects (guarded) ----
    const fadeTargets = document.querySelectorAll('.fade-on-scroll')
    if (fadeTargets.length) {
        const fadeObs = new IntersectionObserver(
            (entries, o) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-up')
                        entry.target.classList.remove('opacity-0', 'translate-y-4')
                        o.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.25, rootMargin: '0px 0px -50px 0px' },
        )
        fadeTargets.forEach((el) => fadeObs.observe(el))
    }

    const bioTargets = document.querySelectorAll('.bio-image-scroll')
    if (bioTargets.length) {
        const bioObs = new IntersectionObserver(
            (entries, o) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('opacity-0', 'translate-x-[100px]')
                        entry.target.classList.add('animate-slide-in-right')
                        o.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.3 },
        )
        bioTargets.forEach((el) => bioObs.observe(el))
    }
})
