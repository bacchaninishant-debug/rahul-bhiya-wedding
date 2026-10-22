/**
 * ==============================================================================
 * RAJESH & HARSHA - DIGITAL WEDDING INVITATION CONTROLLER
 * Replicating exact animations from Instagram Reel (@zareqia - DbLhrmFoz5k)
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.WEDDING_CONFIG || {};

  // DOM Elements
  const sceneDoorway = document.getElementById('sceneDoorway');
  const doorPortal = document.getElementById('doorPortal');
  const sceneCouple = document.getElementById('sceneCouple');
  const cueScroll = document.getElementById('cueScroll');
  const sceneScratch = document.getElementById('sceneScratch');
  const scratchCanvas = document.getElementById('scratchCanvas');
  const btnAutoReveal = document.getElementById('btnAutoReveal');
  const weddingAudio = document.getElementById('weddingAudio');
  const btnSoundToggle = document.getElementById('btnSoundToggle');
  const soundIcon = document.getElementById('soundIcon');
  const btnLangToggle = document.getElementById('btnLangToggle');
  const langLabel = document.getElementById('langLabel');
  const btnHeaderShare = document.getElementById('btnHeaderShare');
  const btnDockShare = document.getElementById('btnDockShare');
  const btnGoogleCalendar = document.getElementById('btnGoogleCalendar');
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpSuccessAlert = document.getElementById('rsvpSuccessAlert');
  const wishesWall = document.getElementById('wishesWall');
  const petalCanvas = document.getElementById('petalCanvas');

  const reelScrollArea = document.getElementById('reelScrollArea');

  let isAudioPlaying = false;
  let isDoorsOpen = false;

  // Lock scrolling initially - User MUST click the door to open and advance
  document.body.classList.add('doors-locked');

  // ============================================================================
  // 1. 3D DOUBLE DOOR OPENING SEQUENCE (Tap to Open)
  // ============================================================================
  function openDoors() {
    if (isDoorsOpen) return;
    isDoorsOpen = true;

    if (sceneDoorway) {
      sceneDoorway.classList.add('doors-opened');
    }

    // Play music
    playAudio();

    // Trigger golden celebration confetti
    triggerConfetti();

    // Unlock scrolling after doors swing open, then smoothly slide to romantic couple scene
    setTimeout(() => {
      document.body.classList.remove('doors-locked');
      if (sceneCouple) {
        sceneCouple.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1100);
  }

  // Clicking anywhere on the archway door or portal triggers opening
  if (doorPortal) {
    doorPortal.addEventListener('click', (e) => {
      e.stopPropagation();
      openDoors();
    });
  }
  if (sceneDoorway) {
    sceneDoorway.addEventListener('click', openDoors);
  }

  // Prevent scroll/swipe before doors are opened and shake door to prompt user
  if (reelScrollArea) {
    const promptDoorTap = (e) => {
      if (!isDoorsOpen) {
        if (e.cancelable) e.preventDefault();
        if (sceneDoorway && !sceneDoorway.classList.contains('wiggle-doors')) {
          sceneDoorway.classList.add('wiggle-doors');
          setTimeout(() => sceneDoorway.classList.remove('wiggle-doors'), 450);
        }
      }
    };
    reelScrollArea.addEventListener('wheel', promptDoorTap, { passive: false });
    reelScrollArea.addEventListener('touchmove', promptDoorTap, { passive: false });
  }

  const sceneWelcome = document.getElementById('sceneWelcome');
  if (cueScroll) {
    cueScroll.addEventListener('click', () => {
      if (sceneWelcome) {
        sceneWelcome.scrollIntoView({ behavior: 'smooth' });
      } else if (sceneScratch) {
        sceneScratch.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  function triggerConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#4ba3e3', '#ffd700', '#d94b76', '#ffffff']
      });
      setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ffd700', '#d94b76', '#ffccd3']
        });
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ffd700', '#d94b76', '#ffccd3']
        });
      }, 350);
    }
  }

  // ============================================================================
  // 2. AUDIO CONTROLLER & SYNTHESIS DRONE
  // ============================================================================
  function playAudio() {
    if (!weddingAudio) return;
    weddingAudio.play().then(() => {
      isAudioPlaying = true;
      if (soundIcon) soundIcon.textContent = '🔊';
    }).catch(() => {
      startSynthDrone();
      isAudioPlaying = true;
      if (soundIcon) soundIcon.textContent = '🔊';
    });
  }

  function pauseAudio() {
    if (weddingAudio) weddingAudio.pause();
    stopSynthDrone();
    isAudioPlaying = false;
    if (soundIcon) soundIcon.textContent = '🔇';
  }

  function toggleAudio() {
    if (isAudioPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  if (btnSoundToggle) {
    btnSoundToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAudio();
    });
  }

  let audioCtx = null;
  let synthGain = null;
  function startSynthDrone() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      if (synthGain) return;

      synthGain = audioCtx.createGain();
      synthGain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      synthGain.connect(audioCtx.destination);

      const freqs = [138.59, 207.65, 277.18, 415.30];
      freqs.forEach(f => {
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, audioCtx.currentTime);
        osc.connect(synthGain);
        osc.start();
      });
    } catch (e) {}
  }

  function stopSynthDrone() {
    if (synthGain && audioCtx) {
      synthGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.2);
      setTimeout(() => { synthGain = null; }, 300);
    }
  }

  // ============================================================================
  // 3. INTERACTIVE SCRATCH TO REVEAL CARD (Matches Reel 5s)
  // ============================================================================
  if (scratchCanvas) {
    const ctx = scratchCanvas.getContext('2d', { willReadFrequently: true });
    const width = scratchCanvas.width;
    const height = scratchCanvas.height;
    let isScratching = false;
    let isRevealed = false;

    function initScratchCover() {
      // Glitter blue & gold gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#3888c3');
      grad.addColorStop(0.5, '#56a7e2');
      grad.addColorStop(1, '#256da2');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Gold Sparkle specks
      for (let i = 0; i < 60; i++) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Heart outline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 2.5;
      drawHeart(ctx, width / 2, height / 2 - 10, 75);
      ctx.stroke();

      // Cover text
      const isHi = document.body.classList.contains('lang-hi');
      ctx.fillStyle = '#ffffff';
      ctx.font = isHi ? 'bold 15px "Tiro Devanagari Hindi", serif' : 'bold 14px Montserrat, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isHi ? '✨ यहाँ स्क्रैच करें ✨' : '✨ SCRATCH HERE ✨', width / 2, height / 2 + 50);

      ctx.font = isHi ? '12px "Tiro Devanagari Hindi", serif' : '11px Montserrat, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fillText(isHi ? 'तारीख जानने के लिए टच एवं स्क्रैच करें' : 'Touch & scratch to reveal', width / 2, height / 2 + 70);
    }

    window.redrawScratchCover = () => {
      if (!isRevealed) {
        initScratchCover();
      }
    };

    function drawHeart(c, x, y, size) {
      c.save();
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(x, y + topCurveHeight);
      c.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      c.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.5, x, y + size);
      c.bezierCurveTo(x, y + (size + topCurveHeight) / 1.5, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      c.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      c.closePath();
      c.restore();
    }

    initScratchCover();

    function scratch(e) {
      if (!isScratching || isRevealed) return;
      const rect = scratchCanvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = (clientX - rect.left) * (width / rect.width);
      const y = (clientY - rect.top) * (height / rect.height);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      checkScratch();
    }

    function checkScratch() {
      if (isRevealed) return;
      try {
        const imgData = ctx.getImageData(0, 0, width, height);
        const pixels = imgData.data;
        let transparent = 0;
        const total = pixels.length / 4;

        for (let i = 3; i < pixels.length; i += 16) {
          if (pixels[i] === 0) transparent++;
        }

        if (transparent / (total / 4) > 0.4) {
          revealAll();
        }
      } catch (e) {}
    }

    function revealAll() {
      if (isRevealed) return;
      isRevealed = true;
      ctx.clearRect(0, 0, width, height);
      triggerConfetti();
    }

    scratchCanvas.addEventListener('mousedown', (e) => { isScratching = true; scratch(e); });
    window.addEventListener('mouseup', () => { isScratching = false; });
    scratchCanvas.addEventListener('mousemove', scratch);

    scratchCanvas.addEventListener('touchstart', (e) => { isScratching = true; scratch(e); }, { passive: true });
    window.addEventListener('touchend', () => { isScratching = false; });
    scratchCanvas.addEventListener('touchmove', scratch, { passive: true });

    if (btnAutoReveal) {
      btnAutoReveal.addEventListener('click', revealAll);
    }
  }

  // ============================================================================
  // 3B. WEDDING PHOTO GALLERY CAROUSEL (Image 4 & Image 5)
  // ============================================================================
  const weddingCarousel = document.getElementById('weddingCarousel');
  const carouselPrevBtn = document.getElementById('carouselPrevBtn');
  const carouselNextBtn = document.getElementById('carouselNextBtn');
  const carouselDots = document.querySelectorAll('#carouselDots .carousel-dot');
  const carouselSlides = document.querySelectorAll('.carousel-slide');

  let currentSlide = 0;
  let carouselTimer = null;

  function showSlide(index) {
    if (!carouselSlides.length) return;
    if (index < 0) index = carouselSlides.length - 1;
    if (index >= carouselSlides.length) index = 0;
    currentSlide = index;

    carouselSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });

    carouselDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  if (carouselNextBtn) {
    carouselNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
      resetCarouselTimer();
    });
  }

  if (carouselPrevBtn) {
    carouselPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
      resetCarouselTimer();
    });
  }

  carouselDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(dot.getAttribute('data-slide'), 10);
      showSlide(idx);
      resetCarouselTimer();
    });
  });

  function startCarouselTimer() {
    carouselTimer = setInterval(nextSlide, 4500);
  }

  function resetCarouselTimer() {
    if (carouselTimer) clearInterval(carouselTimer);
    startCarouselTimer();
  }

  if (weddingCarousel) {
    startCarouselTimer();
  }

  // ============================================================================
  // 4. LANGUAGE SWITCHER (English / हिन्दी)
  // ============================================================================
  if (btnLangToggle) {
    btnLangToggle.addEventListener('click', (e) => {
      if (e) e.stopPropagation();
      if (document.body.classList.contains('lang-en')) {
        document.body.classList.remove('lang-en');
        document.body.classList.add('lang-hi');
        if (langLabel) langLabel.textContent = 'English';
      } else {
        document.body.classList.remove('lang-hi');
        document.body.classList.add('lang-en');
        if (langLabel) langLabel.textContent = 'हिन्दी';
      }
      if (typeof window.redrawScratchCover === 'function') {
        window.redrawScratchCover();
      }
    });
  }

  // ============================================================================
  // 5. GOOGLE CALENDAR LINK
  // ============================================================================
  if (btnGoogleCalendar) {
    const title = encodeURIComponent("Wedding Ceremony: Rajesh (Rahul) & Harsha");
    const details = encodeURIComponent("You are warmly invited to the wedding celebration of Rajesh (Rahul) & Harsha on 11th & 12th November 2026. Balaji Banquet Hall, Muhana Mandi Road, Jaipur.");
    const location = encodeURIComponent("Balaji Banquet Hall, Muhana Mandi Road, Kesar Chauraha, Jaipur, Rajasthan");
    const dates = "20261111T110000/20261113T020000";
    btnGoogleCalendar.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  }

  // ============================================================================
  // 6. WHATSAPP SHARING & INTERACTIVE SHARE MODAL
  // ============================================================================
  const shareModal = document.getElementById('shareModal');
  const btnCloseShareModal = document.getElementById('btnCloseShareModal');
  const btnDirectWhatsApp = document.getElementById('btnDirectWhatsApp');
  const btnCopyFullMessage = document.getElementById('btnCopyFullMessage');
  const copyFullMsgTitle = document.getElementById('copyFullMsgTitle');
  const copyFullMsgSub = document.getElementById('copyFullMsgSub');
  const shareUrlInput = document.getElementById('shareUrlInput');
  const btnCopyOnlyUrl = document.getElementById('btnCopyOnlyUrl');

  // Automatically detect the live public URL (e.g. Vercel domain), falling back to config or current origin
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || !window.location.hostname;
  const detectedOrigin = (!isLocal && window.location.origin) ? window.location.origin : (config.share && config.share.url ? config.share.url : window.location.href);
  const publicUrl = detectedOrigin;

  const shareTemplate = (config.share && config.share.message) ? config.share.message : (
    `🌸 *Wedding Invitation* 🌸\n\n` +
    `॥ श्री गणेशाय नमः ॥\n\n` +
    `परमपिता परमेश्वर व पूज्य बड़ों के आशीर्वाद से हमारे शुभ विवाह में आपकी स्नेहमयी उपस्थिति प्रार्थनीय है।\n\n` +
    `💍 *Rajesh (Rahul)* ❤️ *Harsha*\n` +
    `🗓 *तारीख:* 11 एवं 12 नवम्बर 2026\n` +
    `📍 *वेन्यू:* बालाजी बैंक्वेट हॉल, केसर चौराहा, जयपुर\n\n` +
    `✨ *हमारा डिजिटल एनिमेटेड कार्ड (म्यूजिक व 3D एनीमेशन के साथ) देखने के लिए यहाँ टच करें:*\n{URL}`
  );

  const shareText = shareTemplate.includes('{URL}') 
    ? shareTemplate.replace('{URL}', publicUrl)
    : (shareTemplate.includes('lhr.life') ? shareTemplate.replace(/https:\/\/[^\s]+/, publicUrl) : `${shareTemplate}\n${publicUrl}`);

  if (shareUrlInput) shareUrlInput.value = publicUrl;
  const shareQrImg = document.getElementById('shareQrImg');
  if (shareQrImg) {
    shareQrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(publicUrl)}`;
  }

  function openShareModal() {
    // If mobile supports native share, invoke it
    if (navigator.share && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      navigator.share({
        title: "Rajesh (Rahul) & Harsha - Wedding Invitation",
        text: shareText,
        url: publicUrl
      }).catch(() => {
        // Fallback to modal if cancelled or denied
        if (shareModal) shareModal.classList.remove('hidden');
      });
      return;
    }

    if (shareModal) {
      shareModal.classList.remove('hidden');
    }
  }

  function closeShareModal() {
    if (shareModal) {
      shareModal.classList.add('hidden');
    }
  }

  if (btnHeaderShare) btnHeaderShare.addEventListener('click', openShareModal);
  if (btnDockShare) btnDockShare.addEventListener('click', openShareModal);

  if (btnCloseShareModal) {
    btnCloseShareModal.addEventListener('click', closeShareModal);
  }

  if (shareModal) {
    shareModal.addEventListener('click', (e) => {
      if (e.target === shareModal) closeShareModal();
    });
  }

  // Setup Direct WhatsApp Link
  if (btnDirectWhatsApp) {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    btnDirectWhatsApp.href = waUrl;
  }

  // Copy Full Message to Clipboard
  if (btnCopyFullMessage) {
    btnCopyFullMessage.addEventListener('click', () => {
      copyToClipboard(shareText, () => {
        if (copyFullMsgTitle) copyFullMsgTitle.textContent = "✓ पूरा मैसेज कॉपी हो गया!";
        if (copyFullMsgSub) copyFullMsgSub.textContent = "अब सीधे WhatsApp पर जाकर पेस्ट करें";
        setTimeout(() => {
          if (copyFullMsgTitle) copyFullMsgTitle.textContent = "पूरा निमंत्रण मैसेज कॉपी करें";
          if (copyFullMsgSub) copyFullMsgSub.textContent = "मैसेज कॉपी करके कहीं भी पेस्ट करें";
        }, 3000);
      });
    });
  }

  // Copy Link Only
  if (btnCopyOnlyUrl) {
    btnCopyOnlyUrl.addEventListener('click', () => {
      copyToClipboard(publicUrl, () => {
        const orig = btnCopyOnlyUrl.textContent;
        btnCopyOnlyUrl.textContent = "✓ कॉपीड!";
        setTimeout(() => { btnCopyOnlyUrl.textContent = orig; }, 2500);
      });
    });
  }

  function copyToClipboard(text, onSuccess) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onSuccess).catch(() => fallbackCopy(text, onSuccess));
    } else {
      fallbackCopy(text, onSuccess);
    }
  }

  function fallbackCopy(text, onSuccess) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      if (onSuccess) onSuccess();
    } catch (e) {}
    document.body.removeChild(ta);
  }

  // ============================================================================
  // 7. RSVP FORM & GUESTBOOK (LocalStorage)
  // ============================================================================
  const STORAGE_KEY = 'rahul_wedding_wishes_db';

  const defaultWishes = [
    { name: "कमल एवं रेखा गुलवानी", wishes: "राहुल भैया और हर्षा भाभी को नए सफर की ढेरों बधाइयां! 🌸" },
    { name: "Vikram & Neha Sharma", wishes: "Heartiest congratulations to the lovely couple! Excited for Jaipur! ✨" }
  ];

  function renderWishes() {
    if (!wishesWall) return;
    let list = defaultWishes;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) list = JSON.parse(stored);
    } catch (e) {}

    wishesWall.innerHTML = '';
    list.forEach(item => {
      const el = document.createElement('div');
      el.className = 'mini-wish-item';
      el.innerHTML = `<span class="mini-wish-name">${escapeText(item.name)}:</span> <span class="mini-wish-text">“${escapeText(item.wishes)}”</span>`;
      wishesWall.appendChild(el);
    });
  }

  function escapeText(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  renderWishes();

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('rsvpName');
      const wishesInput = document.getElementById('rsvpWishes');

      const name = nameInput ? nameInput.value.trim() : '';
      const wishes = wishesInput && wishesInput.value.trim() ? wishesInput.value.trim() : 'Congratulations and best wishes!';

      if (!name) {
        alert('Please enter your name (कृपया अपना नाम दर्ज करें)');
        return;
      }

      try {
        let list = defaultWishes;
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) list = JSON.parse(stored);
        list.unshift({ name, wishes });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch (e) {}

      renderWishes();

      if (rsvpSuccessAlert) rsvpSuccessAlert.classList.remove('hidden');
      rsvpForm.reset();
      triggerConfetti();
    });
  }

  // ============================================================================
  // 8. FALLING ROSE PETALS CANVAS
  // ============================================================================
  if (petalCanvas) {
    const pCtx = petalCanvas.getContext('2d');
    let pWidth = (petalCanvas.width = window.innerWidth);
    let pHeight = (petalCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      pWidth = petalCanvas.width = window.innerWidth;
      pHeight = petalCanvas.height = window.innerHeight;
    });

    const petals = [];
    for (let i = 0; i < 24; i++) {
      petals.push({
        x: Math.random() * pWidth,
        y: Math.random() * pHeight,
        size: Math.random() * 7 + 5,
        speedX: Math.random() * 0.8 - 0.4,
        speedY: Math.random() * 1.2 + 0.6,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.03,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    function drawPetals() {
      pCtx.clearRect(0, 0, pWidth, pHeight);
      petals.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.angularSpeed;

        if (p.y > pHeight + 20) { p.y = -20; p.x = Math.random() * pWidth; }
        if (p.x < -20) p.x = pWidth + 20;
        if (p.x > pWidth + 20) p.x = -20;

        pCtx.save();
        pCtx.translate(p.x, p.y);
        pCtx.rotate(p.angle);
        pCtx.fillStyle = `rgba(217, 75, 118, ${p.opacity})`;
        pCtx.beginPath();
        pCtx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        pCtx.fill();
        pCtx.restore();
      });
      requestAnimationFrame(drawPetals);
    }
    drawPetals();
  }
});
