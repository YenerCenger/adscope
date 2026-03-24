'use client';

import { useEffect, useState } from 'react';

const NAV_LINKS = [
    { href: '#demo',         label: 'Demo' },
    { href: '#how-it-works', label: 'Nasıl Çalışır?' },
    { href: '#features',     label: 'Özellikler' },
    { href: '#faq',          label: 'SSS' },
] as const;

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled]     = useState(false);

    useEffect(() => {
        let ticking = false;
        let lastValue = false;

        const onScroll = () => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                const nextValue = window.scrollY > 10;
                if (nextValue !== lastValue) {
                    lastValue = nextValue;
                    setScrolled(nextValue);
                }
                ticking = false;
            });
        };

        // Ensure initial state is in sync on first paint.
        lastValue = window.scrollY > 10;
        setScrolled(lastValue);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-200 ${
                scrolled
                    ? 'bg-black/95 border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.04)]'
                    : 'bg-transparent border-b border-transparent'
            }`}
        >
            <div className="container mx-auto px-6 h-14 flex items-center justify-between gap-6">

                {/* Logo */}
                <a href="/" className="flex items-center gap-2 shrink-0 group">
                    <div className="w-6 h-6 bg-white rounded-[6px] flex items-center justify-center group-hover:bg-zinc-200 transition-colors">
                        <i className="fa-solid fa-layer-group text-black" style={{ fontSize: '9px' }} />
                    </div>
                    <span className="text-[13px] font-semibold tracking-tight text-white">
                        TrendCatcher <span className="text-zinc-500">AI</span>
                    </span>
                </a>

                {/* Center links */}
                <div className="hidden md:flex items-center gap-7">
                    {NAV_LINKS.map(({ href, label }) => (
                        <a
                            key={href}
                            href={href}
                            className="text-zinc-400 hover:text-zinc-100 text-sm font-medium transition-colors"
                        >
                            {label}
                        </a>
                    ))}
                </div>

                {/* Right actions */}
                <div className="hidden md:flex items-center shrink-0">
                    <a
                        href="#early-access"
                        className="flex items-center gap-1.5 bg-white hover:bg-zinc-100 text-black pl-4 pr-1.5 py-1.5 rounded-full text-[13px] font-semibold transition-colors"
                    >
                        Erken Erişim
                        <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center text-white" style={{ fontSize: '10px' }}>
                            ↗
                        </span>
                    </a>
                </div>

                {/* Mobile toggle */}
                <button
                    type="button"
                    className="md:hidden text-zinc-400 hover:text-white transition-colors ml-auto"
                    aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
                    onClick={() => setMobileOpen((o) => !o)}
                >
                    <i className={`fa-solid ${mobileOpen ? 'fa-times' : 'fa-bars'} text-base`} />
                </button>
            </div>

            {/* Mobile menu */}
            <div className={`${mobileOpen ? 'block' : 'hidden'} md:hidden bg-black/98 border-t border-white/[0.06]`}>
                <div className="container mx-auto px-6 py-2">
                    {[...NAV_LINKS, { href: '#early-access', label: 'Erken Erişim' }].map(({ href, label }) => (
                        <a
                            key={href}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center py-3 text-sm text-zinc-300 hover:text-white transition-colors border-b border-white/[0.04] last:border-0"
                        >
                            {label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
