const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const modal = document.querySelector('#enquiry-modal');
const openButtons = document.querySelectorAll('.enquiry-open');
const closeButton = document.querySelector('.modal-close');
const modalBackground = document.querySelector('.modal-bg');
const form = document.querySelector('#enquiry-form');
const success = document.querySelector('.success');

navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('open')));

function toggleModal(open) {
  modal.classList.toggle('open', open);
  modal.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) document.querySelector('#enquiry-form input').focus();
}
openButtons.forEach((button) => button.addEventListener('click', () => toggleModal(true)));
closeButton.addEventListener('click', () => toggleModal(false));
modalBackground.addEventListener('click', () => toggleModal(false));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') toggleModal(false); });

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(form).entries());
  const application = [
    'MUHABURA SHINE SECONDARY SCHOOL - 2026 APPLICATION',
    '',
    `Learner name: ${values.learnerName}`,
    `Date of birth: ${values.dateOfBirth}`,
    `Class applying for: ${values.classLevel}`,
    `School option: ${values.schoolOption}`,
    `Previous school: ${values.previousSchool || 'Not provided'}`,
    `Parent/guardian: ${values.guardianName}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email}`
  ].join('\n');
  const backup = new Blob([application], { type: 'text/plain' });
  const backupLink = document.createElement('a');
  backupLink.href = URL.createObjectURL(backup);
  backupLink.download = `muhabura-shine-application-${values.learnerName.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '2026'}.txt`;
  backupLink.click();
  URL.revokeObjectURL(backupLink.href);
  const subject = encodeURIComponent(`2026 application - ${values.learnerName}`);
  const body = encodeURIComponent(application);
  window.location.href = `mailto:muhaburashine@gmail.com?subject=${subject}&body=${body}`;
  success.textContent = 'Application prepared. Your email app will open, and a backup copy was downloaded.';
  success.classList.add('show');
  setTimeout(() => { success.classList.remove('show'); toggleModal(false); form.reset(); }, 6000);
});

document.querySelectorAll('.programme').forEach((programme) => {
  programme.addEventListener('click', () => {
    document.querySelectorAll('.programme').forEach((item) => item.classList.remove('active'));
    programme.classList.add('active');
  });
});

const sections = document.querySelectorAll('main section[id]');
const links = document.querySelectorAll('.nav a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => observer.observe(section));
