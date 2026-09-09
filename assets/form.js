/*
 * EdelSenz form submission
 * Prepared 2026-07-29 by In-Sites
 *
 * Progressive enhancement only. The forms post normally without JavaScript;
 * this upgrades them to submit in the background so the visitor is not
 * bounced off the page, which matters on a single-scroll layout.
 */
(function () {
  'use strict';

  var forms = document.querySelectorAll('form[data-ajax]');
  if (!forms.length || typeof window.fetch !== 'function') return;

  function messageEl(form) {
    var el = form.querySelector('.form-msg');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form-msg';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      form.appendChild(el);
    }
    return el;
  }

  function show(form, ok, text) {
    var el = messageEl(form);
    el.textContent = text;
    el.classList.remove('is-ok', 'is-error');
    el.classList.add(ok ? 'is-ok' : 'is-error');
  }

  Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var button = form.querySelector('button[type="submit"], button:not([type])');
      var label = button ? button.innerHTML : null;

      if (button) {
        button.disabled = true;
        button.innerHTML = '<span>Sending…</span>';
      }

      fetch(form.getAttribute('action'), {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
        credentials: 'same-origin'
      })
        .then(function (response) {
          return response.json().catch(function () {
            return { ok: false, message: 'Unexpected response from the server.' };
          });
        })
        .then(function (data) {
          show(form, !!data.ok, data.message || 'Something went wrong.');
          if (data.ok) form.reset();
        })
        .catch(function () {
          show(
            form,
            false,
            'We could not reach the server. Please email admin@edelsenz.com directly.'
          );
        })
        .then(function () {
          if (button) {
            button.disabled = false;
            if (label !== null) button.innerHTML = label;
          }
        });
    });
  });
})();

/* ---- MailerLite newsletter signup, added 2026-08-18 ---- */
(function () {
  'use strict';
  var forms = document.querySelectorAll('form[data-mailerlite]');
  if (!forms.length || typeof window.fetch !== 'function') { return; }

  function msgEl(form) {
    var el = form.querySelector('.form-msg');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form-msg';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      form.appendChild(el);
    }
    return el;
  }

  function show(form, ok, text) {
    var el = msgEl(form);
    el.textContent = text;
    el.classList.remove('is-ok', 'is-error');
    el.classList.add(ok ? 'is-ok' : 'is-error');
  }

  Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var hp = form.querySelector('input[name="company_website"]');
      if (hp && hp.value) { show(form, true, 'Thank you for subscribing.'); return; }

      var email = form.querySelector('input[type="email"]');
      var btn = form.querySelector('button[type="submit"]');
      if (!email || !email.value) { return; }

      if (btn) { btn.disabled = true; }
      show(form, true, 'Subscribing...');

      var body = 'fields%5Bemail%5D=' + encodeURIComponent(email.value) +
                 '&ml-submit=1&anticsrf=true';

      fetch(form.getAttribute('action'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
      })
      .then(function (r) {
        return r.json().catch(function () { return { success: r.ok }; });
      })
      .then(function (data) {
        if (btn) { btn.disabled = false; }
        if (data && data.success) {
          show(form, true, 'Thank you for subscribing.');
          email.value = '';
        } else {
          show(form, false, 'Sorry, that did not go through. Please email admin@edelsenz.com.');
        }
      })
      .catch(function () {
        if (btn) { btn.disabled = false; }
        show(form, false, 'We could not reach the server. Please email admin@edelsenz.com.');
      });
    });
  });
})();
