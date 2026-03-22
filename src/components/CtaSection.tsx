'use client';
import { useState } from 'react';
import { EarlyAccessModal } from './EarlyAccessModal';

export function CtaSection() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <section id="early-access" className="relative bg-transparent section-divider py-32">
                {/* Glow */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div className="w-[600px] h-[300px] rounded-full opacity-30"
                        style={{ background: 'radial-gradient(ellipse, rgba(120,40,180,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }} />
                </div>

                <div className="relative container mx-auto px-6 text-center">
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mb-6">Erken Erişim</p>

                    <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                        Viral içerik üret.
                    </h2>
                    <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-10">
                        <em className="font-playfair italic text-zinc-400">Asla durma.</em>
                    </h2>

                    <p className="text-zinc-500 text-sm max-w-md mx-auto mb-10 leading-relaxed">
                        Rakipleriniz zaten izliyor. Siz de başlayın — ücretsiz,
                        kredi kartı gerektirmez.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                            onClick={() => setOpen(true)}
                            className="flex items-center gap-2 bg-white hover:bg-zinc-100 text-black pl-5 pr-2 py-2 rounded-full text-sm font-semibold transition-colors"
                        >
                            Erken Erişim Al
                            <span className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white shrink-0" style={{ fontSize: '11px' }}>
                                ↗
                            </span>
                        </button>
                        <a
                            href="#how-it-works"
                            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors px-5 py-2 rounded-full border border-white/[0.08] hover:border-white/[0.15]"
                        >
                            Nasıl çalışır?
                        </a>
                    </div>
                </div>
            </section>

            <EarlyAccessModal open={open} onClose={() => setOpen(false)} />
        </>
    );
}
