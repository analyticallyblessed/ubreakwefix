// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || '';
  const newTheme = currentTheme === 'dark' ? '' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Apply saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

// Booking Form Submission
document.getElementById('bookingForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const formMessage = document.getElementById('formMessage');

  const name = form.querySelector('#name').value;
  const email = form.querySelector('#email').value;
  const device = form.querySelector('#device').value;
  const issue = form.querySelector('#issue').value;

  const message = `Booking Request:\nName: ${name}\nEmail: ${email}\nDevice: ${device}\nIssue: ${issue}`;
  const phoneNumber = 'YOUR_PHONE_NUMBER'; // Replace with your WhatsApp Business number (e.g., +919876543210)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, '_blank');
  formMessage.innerHTML = '<p style="color: #10B981;">Thank you for your booking! Please send the WhatsApp message to confirm.</p>';
  form.reset();
});

// Postal Code Checker Form Submission
document.getElementById('postalCodeForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const postalCodeMessage = document.getElementById('postalCodeMessage');
  const postalCode = form.querySelector('#postalCode').value;

  const validCodes = ['110001', '110002', '110003'];
  const message = validCodes.includes(postalCode)
    ? `Great news! We service your area (Postal Code: ${postalCode}). Book now!`
    : `We’re sorry, we don’t service postal code ${postalCode} yet. Contact us for assistance.`;

  const whatsappMessage = `Postal Code Check:\nPostal Code: ${postalCode}\nResult: ${message}`;
  const phoneNumber = '919899964218';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  window.open(whatsappUrl, '_blank');
  postalCodeMessage.innerHTML = `<p style="color: ${validCodes.includes(postalCode) ? '#10B981' : '#EF4444'}">${message}</p>`;
  form.reset();
});

// Accordion Toggle
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    content.classList.toggle('active');
  });
});

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero', { opacity: 0, y: 50, duration: 1, ease: 'power2.out' });
  gsap.from('.section', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.section', start: 'top 80%' },
  });
  gsap.from('.card', {
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    stagger: 0.2,
    ease: 'back.out(1.7)',
    scrollTrigger: { trigger: '.grid', start: 'top 80%' },
  });
  gsap.from('.navbar', { opacity: 0, y: -50, duration: 0.8, ease: 'power2.out' });
  gsap.from('.sticky-cta', { opacity: 0, x: 50, duration: 1, delay: 1, ease: 'power2.out' });
  gsap.from('.whatsapp-chat', { opacity: 0, x: 50, duration: 1, delay: 1.2, ease: 'power2.out' });
  gsap.from('.accordion-item', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.accordion', start: 'top 80%' },
  });

  // Background Particle Animation
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(167, 139, 250, 0.5)';
    particles.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
    });
    requestAnimationFrame(animate);
  }

  animate();
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});