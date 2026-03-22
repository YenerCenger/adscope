const STATS = [
    { value: '100K+', label: 'Video Analiz Edildi' },
    { value: '50+', label: 'Desteklenen Ülke' },
    { value: '10+', label: 'Kategori' },
    { value: '9.2', label: 'Ort. Viral Skor' },
] as const;

const TAGS = [
    'Çoklu Pazar İzleme',
    'Hook Analizi',
    'Senaryo Yapısı',
    'Viral Tahmin',
    'AI Script Üretimi',
    'Kategori Filtreleri',
    'Engagement Metrikleri',
    'Demo Kredi Sistemi',
] as const;

export function BentoStats() {
    return (
        <section className="relative bg-transparent section-divider py-20" aria-label="İstatistikler">
            <div className="container mx-auto px-6">
                {/* Stat bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/[0.07] rounded-2xl overflow-hidden mb-10">
                    {STATS.map(({ value, label }, i) => (
                        <div
                            key={label}
                            className={`px-8 py-8 text-center ${i < STATS.length - 1 ? 'border-r border-white/[0.07]' : ''} bg-white/[0.01]`}
                        >
                            <p className="text-2xl font-bold text-white mb-1">{value}</p>
                            <p className="text-xs text-zinc-600">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Feature tag ribbon */}
                <div className="flex flex-wrap justify-center gap-2">
                    {TAGS.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs text-zinc-500 border border-white/[0.07] bg-white/[0.02] rounded-full px-4 py-1.5"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
