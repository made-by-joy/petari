(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  // Text stays visible without JavaScript; add only a brief entrance.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (!motion.matches) entry.target.classList.add('is-entering');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  const video = document.querySelector('#demo-video');
  // 仮: demo.mp4 is a zero-byte slot. Replacing it enables native controls.
  if (video && location.protocol !== 'file:') {
    fetch(video.dataset.src, { method: 'HEAD' }).then(response => {
      if (response.ok && Number(response.headers.get('content-length')) > 0) {
        video.src = video.dataset.src;
        video.controls = true;
      }
    }).catch(() => {});
  }
  motion.addEventListener('change', () => {
    if (motion.matches && video) video.pause();
  });
})();
