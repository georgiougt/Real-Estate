// Aura Prime Estates - Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = navLinks.classList.contains('active') ? 'close' : 'menu';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      });
    });
  }

  // Interactive Estate Switcher in Hero
  const estateTabs = document.querySelectorAll('.estate-tab-btn');
  const featuredVillaImg = document.getElementById('featuredVillaImg');
  const stageVillaName = document.getElementById('stageVillaName');
  const stageVillaSpecs = document.getElementById('stageVillaSpecs');

  const estateData = {
    kyma: {
      name: 'Villa Kyma // Seafront Sanctuary',
      specs: '€14,500,000 • 6 Suites • 850 m² Living • Private Deep-Water Berth',
      img: 'https://images.pexels.com/photos/3288102/pexels-photo-3288102.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    peninsula: {
      name: 'Peninsula Crown // Cliffside Estate',
      specs: '€18,200,000 • 7 Suites • 1,200 m² Living • Private Helipad & Beach',
      img: 'https://images.pexels.com/photos/1488327/pexels-photo-1488327.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    penthouse: {
      name: 'Sky Penthouse Apex // Marina Tower',
      specs: '€8,900,000 • 4 Suites • 620 m² Living • Rooftop Infinity Pool & 360° Glass',
      img: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1600'
    }
  };

  estateTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      estateTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const estateKey = btn.getAttribute('data-estate');
      const data = estateData[estateKey];

      if (data) {
        if (featuredVillaImg) featuredVillaImg.src = data.img;
        if (stageVillaName) stageVillaName.textContent = data.name;
        if (stageVillaSpecs) stageVillaSpecs.innerHTML = data.specs;
      }
    });
  });

  // Viewing Modal
  const modal = document.getElementById('viewingModal');
  const openBtns = document.querySelectorAll('.open-modal');
  const closeBtn = document.getElementById('closeModal');
  const viewingForm = document.getElementById('viewingForm');
  const residenceSelect = document.getElementById('residenceSelect');

  const openModal = (villaName = '') => {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (residenceSelect && villaName) {
      for (let i = 0; i < residenceSelect.options.length; i++) {
        if (residenceSelect.options[i].text.includes(villaName) || residenceSelect.options[i].value.includes(villaName)) {
          residenceSelect.selectedIndex = i;
          break;
        }
      }
    }
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const villa = btn.getAttribute('data-villa') || '';
      openModal(villa);
    });
  });

  // Hero Request Dossier Button
  const requestDossierBtn = document.getElementById('requestDossierBtn');
  const residenceType = document.getElementById('residenceType');

  if (requestDossierBtn && residenceType) {
    requestDossierBtn.addEventListener('click', () => {
      openModal(residenceType.value);
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (viewingForm) {
    viewingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = viewingForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="material-symbols-outlined" style="animation: spin 1s infinite linear;">sync</span>
        Preparing Investment Dossier...
      `;

      setTimeout(() => {
        viewingForm.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="width: 64px; height: 64px; background: rgba(212, 175, 55, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: #D4AF37;">
              <span class="material-symbols-outlined" style="font-size: 36px;">task_alt</span>
            </div>
            <h3 style="font-family: var(--font-serif); font-size: 1.8rem; color: #FFF; margin-bottom: 0.5rem;">Dossier Dispatched</h3>
            <p style="color: #94A3B8; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
              The architectural dossier, digital floorplans, and private viewing briefing have been sent to your email.
            </p>
            <button type="button" class="btn btn-gold" id="doneModalBtn" style="width: 100%; justify-content: center;">
              Return to Portfolio
            </button>
          </div>
        `;

        const doneBtn = document.getElementById('doneModalBtn');
        if (doneBtn) doneBtn.addEventListener('click', closeModal);
      }, 900);
    });
  }
});
