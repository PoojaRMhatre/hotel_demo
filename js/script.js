/* Demo Luxury Stay — frontend interactions. No backend is connected. */
(() => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const updateHeader = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 30);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }));
  }

  // Mark the matching page/section in navigation.
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) link.classList.add('active');
  });
  if (currentPage === 'index.html') {
    const sections = [...document.querySelectorAll('main section[id]')];
    const links = [...document.querySelectorAll('.main-nav a[href^="#"]')];
    if ('IntersectionObserver' in window && sections.length) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
          }
        });
      }, { rootMargin: '-35% 0px -55% 0px' });
      sections.forEach(section => observer.observe(section));
    }
  }

  // Keep date choices sensible and validate a frontend-only booking request.
  const checkIn = document.querySelector('#checkin');
  const checkOut = document.querySelector('#checkout');
  const setDateMinimums = () => {
    if (!checkIn || !checkOut) return;
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    checkIn.min = localToday;
    if (!checkIn.value || checkIn.value < localToday) checkIn.value = localToday;
    checkOut.min = checkIn.value;
    if (!checkOut.value || checkOut.value <= checkIn.value) {
      const next = new Date(`${checkIn.value}T12:00:00`);
      next.setDate(next.getDate() + 1);
      checkOut.value = next.toISOString().slice(0, 10);
    }
  };
  setDateMinimums();
  if (checkIn && checkOut) {
    checkIn.addEventListener('change', () => {
      checkOut.min = checkIn.value;
      if (checkOut.value <= checkIn.value) {
        const next = new Date(`${checkIn.value}T12:00:00`);
        next.setDate(next.getDate() + 1);
        checkOut.value = next.toISOString().slice(0, 10);
      }
    });
  }

  const bookingForm = document.querySelector('#booking-form');
  const bookingModal = document.querySelector('#booking-modal');
  const summary = document.querySelector('#booking-summary');
  const closeModal = () => {
    if (bookingModal) bookingModal.classList.remove('open');
  };
  document.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', closeModal));
  if (bookingModal) bookingModal.addEventListener('click', e => { if (e.target === bookingModal) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
      closeLightbox();
    }
  });
  if (bookingForm) {
    bookingForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!bookingForm.reportValidity()) return;
      const data = new FormData(bookingForm);
      const messageText = [
        'Hello Demo Luxury Stay, I would like to enquire about a stay.',
        `Name: ${data.get('name')}`,
        `Phone / WhatsApp: ${data.get('phone')}`,
        `Email: ${data.get('email') || 'Not provided'}`,
        `Check-in: ${data.get('checkin')}`,
        `Check-out: ${data.get('checkout')}`,
        `Guests: ${data.get('guests')}`,
        `Room preference: ${data.get('room')}`
      ].join('\n');
      const whatsappUrl = `https://wa.me/919850826021?text=${encodeURIComponent(messageText)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (summary) summary.innerHTML = `
        <p><strong>Name:</strong> ${escapeHtml(data.get('name'))}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.get('phone'))}</p>
        <p><strong>Check-in:</strong> ${escapeHtml(data.get('checkin'))}</p>
        <p><strong>Check-out:</strong> ${escapeHtml(data.get('checkout'))}</p>
        <p><strong>Guests:</strong> ${escapeHtml(data.get('guests'))}</p>
        <p><strong>Room preference:</strong> ${escapeHtml(data.get('room'))}</p>
        <p class="notice">Your enquiry has been prepared in WhatsApp. Tap Send in WhatsApp to deliver it.</p>`;
      if (bookingModal) bookingModal.classList.add('open');
    });
  }
  document.querySelectorAll('[data-book-room]').forEach(button => button.addEventListener('click', () => {
    const roomSelect = document.querySelector('#room');
    if (roomSelect) roomSelect.value = button.dataset.bookRoom;
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => document.querySelector('#checkin')?.focus(), 400);
    } else {
      location.href = 'index.html#booking';
    }
  }));

  // Gallery category filters and accessible lightbox.
  const galleryItems = [...document.querySelectorAll('.gallery-item')];
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  let galleryIndex = 0;
  const visibleGalleryItems = () => galleryItems.filter(item => !item.hidden);
  const showGalleryItem = index => {
    const items = visibleGalleryItems();
    if (!items.length || !lightbox || !lightboxImage) return;
    galleryIndex = (index + items.length) % items.length;
    const image = items[galleryIndex].querySelector('img');
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    lightbox.querySelector('.lightbox-close')?.focus();
  };
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }
  galleryItems.forEach(item => item.addEventListener('click', () => showGalleryItem(visibleGalleryItems().indexOf(item))));
  document.querySelectorAll('[data-gallery-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-gallery-filter]').forEach(b => b.classList.toggle('active', b === button));
    galleryItems.forEach(item => { item.hidden = button.dataset.galleryFilter !== 'all' && item.dataset.category !== button.dataset.galleryFilter; });
  }));
  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.querySelector('.lightbox-prev')?.addEventListener('click', () => showGalleryItem(galleryIndex - 1));
  lightbox?.querySelector('.lightbox-next')?.addEventListener('click', () => showGalleryItem(galleryIndex + 1));
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lightbox?.classList.contains('open')) return;
    if (e.key === 'ArrowRight') showGalleryItem(galleryIndex + 1);
    if (e.key === 'ArrowLeft') showGalleryItem(galleryIndex - 1);
  });

  // Frontend-only contact/newsletter forms: validate, then clearly disclose no delivery.
  document.querySelectorAll('[data-demo-form]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    const message = form.querySelector('.form-message');
    if (!form.reportValidity()) {
      if (message) { message.textContent = 'Please review the highlighted fields and try again.'; message.className = 'form-message show error'; }
      return;
    }
    if (form.dataset.demoForm === 'contact') {
      const data = new FormData(form);
      const messageText = [
        'Hello Demo Luxury Stay, I am contacting you through your website.',
        `Name: ${data.get('name') || 'Not provided'}`,
        `Email: ${data.get('email') || 'Not provided'}`,
        `Phone: ${data.get('phone') || 'Not provided'}`,
        `Enquiry type: ${data.get('subject') || data.get('topic') || 'General enquiry'}`,
        `Message: ${data.get('message') || 'Not provided'}`
      ].join('\n');
      const whatsappUrl = `https://wa.me/919850826021?text=${encodeURIComponent(messageText)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (message) {
        message.textContent = 'WhatsApp has opened with your enquiry. Please tap Send in WhatsApp to deliver your message.';
        message.className = 'form-message show success';
      }
      form.reset();
      return;
    }
    if (message) {
      message.textContent = form.dataset.demoForm === 'newsletter'
        ? 'Thank you! This demo has not subscribed you to a mailing list. Connect an email marketing service to enable subscriptions.'
        : 'Thank you! Your form passed validation, but this demo has not sent your message.';
      message.className = 'form-message show success';
    }
    form.reset();
  }));

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }
})();
