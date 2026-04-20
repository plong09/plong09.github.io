/* =============================================
   script.js — Portfolio JavaScript
   Sections:
   1. Mobile hamburger menu
   2. Active nav link on scroll
   3. Contact form validation
============================================= */


/* ── 1. MOBILE HAMBURGER MENU ─────────────── */

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

// Toggle the mobile menu open/closed when hamburger is clicked
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close the menu automatically when any nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


/* ── 2. ACTIVE NAV LINK ON SCROLL ─────────── */

const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a');

// As the user scrolls, highlight the nav link for the current section
window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    // If we've scrolled past the top of this section, mark it as current
    if (window.scrollY >= section.offsetTop - 80) {
      current = section.id;
    }
  });

  // Update the color of each nav link based on which section is active
  links.forEach(link => {
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--navy)';   // active — dark color
    } else {
      link.style.color = '';              // inactive — revert to CSS default
    }
  });
});


/* ── 3. CONTACT FORM VALIDATION ───────────── */

function handleSubmit() {
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const status  = document.getElementById('form-status');
  const btn     = document.getElementById('send-btn');

  // Check all fields are filled
  if (!name || !email || !message) {
    status.style.color = '#ef4444';
    status.textContent = 'Please fill in all fields.';
    return;
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    status.style.color = '#ef4444';
    status.textContent = 'Please enter a valid email address.';
    return;
  }

  // Show a loading state on the button
  btn.textContent = 'Sending...';
  btn.disabled    = true;

  // Simulate sending (we'll replace this with real EmailJS in Phase 4)
  setTimeout(() => {
    status.style.color = '#22c55e';
    status.textContent = 'Message sent! I\'ll get back to you soon.';
    btn.textContent    = 'Send message';
    btn.disabled       = false;

    // Clear the form fields
    document.getElementById('name').value    = '';
    document.getElementById('email').value   = '';
    document.getElementById('message').value = '';
  }, 1000);
}
