/* =========================================================
   BREWVERSE — Reservation, Contact & Newsletter Forms
   ========================================================= */

const ReservationModule = (() => {

  const setError = (input, message) => {
    const errorEl = document.querySelector(`[data-error-for="${input.id}"]`);
    if (errorEl) errorEl.textContent = message;
    input.closest('.form-group')?.classList.toggle('invalid', Boolean(message));
  };

  const validateField = (input) => {
    const value = input.value.trim();

    if (input.required && !Utils.isNotEmpty(value)) {
      setError(input, 'This field is required.');
      return false;
    }
    if (input.type === 'email' && value && !Utils.validateEmail(value)) {
      setError(input, 'Enter a valid email address.');
      return false;
    }
    if (input.type === 'tel' && value && !Utils.validatePhone(value)) {
      setError(input, 'Enter a valid 10-digit phone number.');
      return false;
    }
    setError(input, '');
    return true;
  };

  const bindReservationForm = () => {
    const form = document.getElementById('reservationForm');
    if (!form) return;

    // Prevent picking a past date
    const dateInput = document.getElementById('resDate');
    if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

    Utils.qsa('input, select, textarea', form).forEach((input) => {
      input.addEventListener('blur', () => validateField(input));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = Utils.qsa('input, select', form).filter((el) => el.required);
      const allValid = fields.map(validateField).every(Boolean);

      if (!allValid) {
        Toast.show('Please fix the highlighted fields.', 'error');
        return;
      }

      Toast.show('Table reserved! A confirmation has been sent to your email.', 'success');
      form.reset();
    });
  };

  const bindContactForm = () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = Utils.qsa('input, textarea', form);
      const allValid = inputs.map(validateField).every(Boolean);

      if (!allValid) {
        Toast.show('Please fix the highlighted fields.', 'error');
        return;
      }

      Toast.show('Message sent! We\'ll get back to you soon.', 'success');
      form.reset();
    });

    Utils.qsa('input, textarea', form).forEach((input) => {
      input.addEventListener('blur', () => validateField(input));
    });
  };

  const bindNewsletterForm = () => {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!Utils.validateEmail(input.value.trim())) {
        Toast.show('Enter a valid email to subscribe.', 'error');
        return;
      }
      Toast.show('Subscribed! Welcome to the BrewVerse newsletter.', 'success');
      form.reset();
    });
  };

  const init = () => {
    bindReservationForm();
    bindContactForm();
    bindNewsletterForm();
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', ReservationModule.init);
