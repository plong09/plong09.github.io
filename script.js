/* =============================================
   script.js — Portfolio JavaScript
   Sections:
   1. EmailJS initialization
   2. Mobile hamburger menu
   3. Active nav link on scroll
   4. Contact form with real email sending
============================================= */


/* ── 1. EMAILJS INITIALIZATION ────────────── */

// Replace with your actual Public Key from emailjs.com → Account → General
emailjs.init('sO6fV1HSX2u7qcrCs');


/* ── 2. MOBILE HAMBURGER MENU ─────────────── */

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


/* ── 3. ACTIVE NAV LINK ON SCROLL ─────────── */

const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a');

// As the user scrolls, highlight the nav link for the current section
window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 80) {
      current = section.id;
    }
  });

  links.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current
      ? 'var(--navy)'
      : '';
  });
});


/* ── 4. CONTACT FORM WITH EMAILJS ─────────── */

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

  // Show loading state on the button
  btn.textContent = 'Sending...';
  btn.disabled    = true;
  status.textContent = '';

  // Send via EmailJS
  // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with your actual values
  emailjs.send(
    'service_1ru7rks',    // e.g. 'service_abc123'
    'template_skzuyz8',   // e.g. 'template_xyz789'
    {
      from_name:  name,
      from_email: email,
      message:    message
    }
  )
  .then(() => {
    // Success — email was sent
    status.style.color = '#22c55e';
    status.textContent = "Message sent! I'll get back to you soon.";
    btn.textContent    = 'Send message';
    btn.disabled       = false;

    // Clear the form
    document.getElementById('name').value    = '';
    document.getElementById('email').value   = '';
    document.getElementById('message').value = '';
  })
  .catch((error) => {
    // Something went wrong
    status.style.color = '#ef4444';
    status.textContent = 'Oops! Something went wrong. Please try again.';
    btn.textContent    = 'Send message';
    btn.disabled       = false;
    console.error('EmailJS error:', error);
  });
}