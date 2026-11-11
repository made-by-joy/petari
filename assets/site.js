(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(node => observer.observe(node));
})();

document.querySelectorAll('.mobile-url-copy').forEach(button => {
  button.addEventListener('click', async () => {
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(location.href);
      button.textContent = 'コピーしました';
      window.setTimeout(() => { button.textContent = original; }, 2000);
    } catch (_) {}
  });
});
