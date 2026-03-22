const LINKS = {
    Şirket: [
        { label: 'Hakkımızda', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'İletişim', href: '#' },
        { label: 'Kariyer', href: '#' },
    ],
    Hukuki: [
        { label: 'Gizlilik Politikası', href: '#' },
        { label: 'Kullanım Şartları', href: '#' },
        { label: 'Çerez Politikası', href: '#' },
    ],
    Sosyal: [
        { label: 'X (Twitter)', href: '#' },
        { label: 'LinkedIn', href: '#' },
        { label: 'Instagram', href: '#' },
    ],
} as const;

export function Footer() {
    return (
        <footer className="relative bg-transparent pt-20 pb-0 overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Top row: logo + links */}
                <div className="flex flex-col md:flex-row gap-12 justify-between mb-16">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center shrink-0">
                                <span className="text-black font-bold text-xs">A</span>
                            </div>
                            <span className="text-white font-semibold text-sm tracking-wide">AdScope AI</span>
                        </div>
                        <p className="text-zinc-600 text-xs max-w-[200px] leading-relaxed">
                            Rakiplerinizin viral sırlarını saniyeler içinde keşfedin.
                        </p>
                    </div>

                    {/* Link columns */}
                    <div className="flex gap-16">
                        {(Object.entries(LINKS) as [string, readonly { label: string; href: string }[]][]).map(([col, items]) => (
                            <div key={col}>
                                <p className="text-zinc-600 text-[11px] uppercase tracking-widest font-medium mb-4">{col}</p>
                                <ul className="space-y-2.5">
                                    {items.map(({ label, href }) => (
                                        <li key={label}>
                                            <a href={href} className="text-zinc-500 hover:text-zinc-300 text-[13px] transition-colors">
                                                {label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/[0.06] py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-zinc-700 text-[12px]">© 2026 AdScope AI. Tüm hakları saklıdır.</p>
                    <p className="text-zinc-700 text-[12px]">Türkiye&apos;de tasarlandı</p>
                </div>

                {/* Large watermark */}
                <div className="relative h-24 sm:h-32 overflow-hidden select-none pointer-events-none" aria-hidden="true">
                    <p
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold text-[clamp(56px,12vw,120px)] leading-none text-white/[0.04]"
                        style={{ letterSpacing: '-0.03em' }}
                    >
                        AdScope
                    </p>
                </div>
            </div>
        </footer>
    );
}
