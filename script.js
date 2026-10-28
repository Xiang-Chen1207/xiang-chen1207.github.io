const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const navigationLinks = [...navigation.querySelectorAll('a')];
document.documentElement.classList.add('js');
menuButton.hidden = false;

function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  navigation.classList.toggle('is-open', !isOpen);
  menuButton.setAttribute('aria-expanded', String(!isOpen));
});

navigationLinks.forEach(link => {
  link.addEventListener('click', () => {
    const wasOpen = navigation.classList.contains('is-open');
    closeMenu();
    if (wasOpen) {
      const target = document.querySelector(link.getAttribute('href'));
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});

const narrowScreen = window.matchMedia('(max-width: 620px)');
narrowScreen.addEventListener('change', () => {
  const focusedOnToggle = document.activeElement === menuButton;
  const focusedInMenu = navigation.contains(document.activeElement);
  closeMenu();
  if (!narrowScreen.matches && focusedOnToggle) navigationLinks[0].focus();
  if (narrowScreen.matches && focusedInMenu) menuButton.focus();
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navigationLinks.forEach(link => {
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-18% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('main > section').forEach(section => observer.observe(section));
}
