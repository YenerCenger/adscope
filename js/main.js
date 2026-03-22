import { AdScopeApp } from './modules/adScopeApp.js';

window.AdScopeApp = AdScopeApp;

const COMPONENT_MAP = [
    ['mount-navbar', 'components/navbar.html'],
    ['mount-hero', 'components/hero.html'],
    ['mount-video-grid', 'components/video-grid.html'],
    ['mount-video-modal', 'components/video-modal.html'],
    ['mount-bento', 'components/bento-stats.html'],
    ['mount-features', 'components/feature-cards.html'],
    ['mount-how', 'components/how-it-works.html'],
    ['mount-testimonials', 'components/testimonials.html'],
    ['mount-faq', 'components/faq.html'],
    ['mount-early-modal', 'components/early-access-modal.html'],
    ['mount-cta', 'components/cta-section.html'],
    ['mount-footer', 'components/footer.html']
];

async function loadHtmlInto(id, path) {
    const el = document.getElementById(id);
    if (!el) {
        console.warn(`Mount point #${id} bulunamadı`);
        return;
    }
    const res = await fetch(path);
    if (!res.ok) {
        throw new Error(`${path} yüklenemedi: ${res.status}`);
    }
    el.innerHTML = await res.text();
}

async function loadAllComponents() {
    await Promise.all(COMPONENT_MAP.map(([id, path]) => loadHtmlInto(id, path)));
}

function registerGlobalErrorHandler() {
    window.addEventListener('error', function (e) {
        console.error('Bir hata oluştu:', e.error);
        if (AdScopeApp?.toast) {
            AdScopeApp.toast.show('Bir hata oluştu. Lütfen tekrar deneyin.', 'error', 3000);
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadAllComponents();
    } catch (err) {
        console.error(err);
        document.body.insertAdjacentHTML(
            'afterbegin',
            '<p class="fixed inset-0 flex items-center justify-center bg-slate-900 text-red-400 p-6 text-center z-[200]">Bileşenler yüklenemedi. Sayfayı bir yerel sunucu üzerinden açın (ör. <code class="mx-1">npx serve</code>).</p>'
        );
        return;
    }

    registerGlobalErrorHandler();
    AdScopeApp.init();
});
