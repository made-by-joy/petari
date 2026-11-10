(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const video = document.querySelector('video');
  const syncVideo = () => {
    video.controls = motion.matches;
    if (motion.matches) { video.autoplay = false; video.pause(); }
    else { video.autoplay = true; video.play().catch(() => { video.controls = true; }); }
  };
  syncVideo();
  motion.addEventListener('change', syncVideo);
  if ('IntersectionObserver' in window && !motion.matches) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
  const dialog = document.querySelector('.image-dialog');
  const fullImage = dialog.querySelector('img');
  document.querySelectorAll('[data-zoom]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      fullImage.src = link.href;
      fullImage.alt = link.dataset.alt || link.querySelector('img').alt;
      fullImage.removeAttribute('width');
      fullImage.removeAttribute('height');
      dialog.showModal();
      dialog.querySelector('.dialog-scroll').scrollTo(0, 0);
    });
  });
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
})();
