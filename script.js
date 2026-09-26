/* =====================================================
   PORTFOLIO SCRIPT
   Handles: sticky header shadow, mobile menu, active nav
   state, reveal-on-scroll, back-to-top, contact form.
===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header shadow on scroll ---------- */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    if (window.scrollY > 8) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile hamburger menu ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  function closeMenu() {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  function openMenu() {
    navMenu.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  /* Close mobile menu after a nav link is clicked */
  const navLinks = document.querySelectorAll('[data-nav]');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  /* Close mobile menu on Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- Active navigation state on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav__link[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');
      }
    });
  }, {
    rootMargin: '-45% 0px -45% 0px',
    threshold: 0
  });

  sections.forEach(section => navObserver.observe(section));

  /* ---------- Reveal-on-scroll entrance animation ---------- */
  const revealTargets = document.querySelectorAll(
    '.section-intro, .project-card, .timeline__item, .achievement, .skills__category, .about__grid, .contact__grid'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  if (prefersReducedMotion) {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(el => revealObserver.observe(el));
  }

  /* ---------- Back to top button ---------- */
  const backToTop = document.getElementById('backToTop');

  const toggleBackToTop = () => {
    if (window.scrollY > 700) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  };
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  /* ---------- Contact form (frontend-only) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        formStatus.textContent = 'Please fill in every field before sending.';
        return;
      }

      // NOTE: This form is frontend-only. No email service or backend
      // is connected yet, so submissions are not actually sent anywhere.
      // Connect a form service (e.g. Formspree) or your own backend,
      // then replace this block with the real submit logic.
      formStatus.textContent = 'This form is not yet connected to an email service — add your own backend or a form service to send messages.';
      contactForm.reset();
    });
  }

});
