/* ============================================================
   SMARTDESK — script.js   (mobile-first)
   ============================================================ */

/* ---------- Navbar scroll effect ---------- */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 11, 16, 0.97)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.35)';
    } else {
        navbar.style.background = 'var(--bg-glass)';
        navbar.style.boxShadow = 'none';
    }
}, { passive: true });

/* ---------- Mobile menu toggle ---------- */
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    mobileBtn.setAttribute('aria-expanded', isOpen);
    const icon = mobileBtn.querySelector('i');
    icon.classList.toggle('fa-bars', !isOpen);
    icon.classList.toggle('fa-times', isOpen);
});

// Close mobile menu when a nav link is tapped
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileBtn.setAttribute('aria-expanded', 'false');
        const icon = mobileBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

/* ---------- Scroll-reveal animation ---------- */
function revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
        if (el.getBoundingClientRect().top < windowHeight - 80) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('load', revealElements);
window.addEventListener('scroll', revealElements, { passive: true });

/* ---------- Latest APK version fetch ---------- */
let latestDownloadUrl = 'https://github.com/imtiyazallam07/smartdesk/releases';

async function fetchLatestVersion() {
    const versionUrl = 'https://raw.githubusercontent.com/imtiyaz-allam/SmartDesk-backend/refs/heads/main/latest_version.txt';
    try {
        const response = await fetch(versionUrl);
        if (!response.ok) throw new Error('Network response not ok');
        const latestVersion = (await response.text()).trim();
        latestDownloadUrl = `https://github.com/imtiyazallam07/smartdesk/releases/download/v${latestVersion}/SmartDesk-v${latestVersion}.apk`;
    } catch (error) {
        console.warn('Could not fetch latest version, defaulting to releases page.', error);
    }
}

/* ---------- Download modal ---------- */
const modal = document.getElementById('termsModal');
const acceptBtn = document.getElementById('acceptBtn');
const cancelBtn = document.getElementById('cancelBtn');
const downloadLinks = document.querySelectorAll('.apk-download-link');

function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    cancelBtn.focus();
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

downloadLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        openModal();
    });
});

cancelBtn.addEventListener('click', closeModal);

acceptBtn.addEventListener('click', () => {
    window.location.href = latestDownloadUrl;
    closeModal();
});

// Close on backdrop tap (mobile-friendly)
modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
});

/* ---------- Init ---------- */
window.addEventListener('DOMContentLoaded', fetchLatestVersion);