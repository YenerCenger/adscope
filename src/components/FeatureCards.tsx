import { MacWindow } from './MacWindow';
import { ScrollReveal } from './ScrollReveal';

const FEATURE_SECTIONS = [
    {
        num: '01',
        eyebrow: 'Pazar Keşfi',
        title: 'Müşterilerinizden önce\nne olduğunu öğrenin.',
        desc: 'TrendCatcher AI hedef pazarınızı sürekli izler; davranış veya trendler değiştiğinde, hatalar büyümeden önce sizi uyarır.',
        tags: ['Çoklu Pazar İzleme', 'Kategori Filtreleri', 'Canlı Veri', 'Engagement Skoru'],
        windowTitle: 'Pazar Paneli — TrendCatcher AI',
        content: (
            <div className="space-y-2">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] text-zinc-500">Aktif Pazarlar</span>
                    <span className="text-[11px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 rounded-full px-2.5 py-0.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                        Canlı
                    </span>
                </div>
                {[
                    { code: 'US', name: 'United States', score: '9.2/10', trend: '+238%' },
                    { code: 'TR', name: 'Turkey', score: '8.9/10', trend: '+201%' },
                    { code: 'DE', name: 'Germany', score: '8.5/10', trend: '+195%' },
                    { code: 'BR', name: 'Brazil', score: '8.7/10', trend: '+207%' },
                ].map(({ code, name, score, trend }) => (
                    <div key={code} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2.5">
                        <span className="text-xs font-bold text-zinc-500 w-7 shrink-0">{code}</span>
                        <span className="text-[13px] text-zinc-300 flex-1">{name}</span>
                        <span className="text-[12px] text-zinc-600">{score}</span>
                        <span className="text-[12px] text-emerald-400 font-semibold">{trend}</span>
                    </div>
                ))}
            </div>
        ),
    },
    {
        num: '02',
        eyebrow: 'Derin Analiz',
        title: 'Ne olduğunu\nanlayın.',
        desc: 'Yalnızca görüntülenme sayısı değil; hook yapısı, senaryo akışı, görsellik ve CTA stratejisi. TrendCatcher AI kök nedeni bulur.',
        tags: ['Hook Skoru', 'Senaryo Yapısı', 'Viral Skor', 'Tahmin Motoru'],
        windowTitle: 'Video Detay Analizi — TrendCatcher AI',
        content: (
            <div>
                <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-6 h-6 rounded bg-orange-500/20 flex items-center justify-center shrink-0">
                        <i className="fa-solid fa-key text-orange-400" style={{ fontSize: '10px' }} />
                    </div>
                    <span className="text-[13px] text-zinc-300 font-medium flex-1">Viral Video Analizi</span>
                    <span className="text-[11px] bg-white/[0.07] border border-white/[0.1] text-zinc-300 px-2.5 py-0.5 rounded-full font-semibold">
                        9.2 / 10
                    </span>
                </div>
                <div className="space-y-3 mb-5">
                    {[
                        { label: '🎯 Hook Skoru', pct: 94 },
                        { label: '📝 Senaryo', pct: 87 },
                        { label: '📊 Engagement', pct: 78 },
                    ].map(({ label, pct }) => (
                        <div key={label} className="flex items-center gap-3">
                            <span className="text-[12px] text-zinc-500 w-28 shrink-0">{label}</span>
                            <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                            <span className="text-[11px] text-zinc-400 w-8 text-right">{pct}%</span>
                        </div>
                    ))}
                </div>
                <div className="border-t border-white/[0.06] pt-4">
                    <p className="text-[11px] text-pink-400 font-semibold mb-1.5">🎯 Hook (İlk 3 sn)</p>
                    <p className="text-[12px] text-zinc-400 leading-relaxed">&quot;Havluyu bir kenara bırakın!&quot; — İlk 3 saniyede dikkat çekiyor.</p>
                </div>
            </div>
        ),
    },
    {
        num: '03',
        eyebrow: 'AI Script Üretimi',
        title: 'Özgüvenle\niçerik üretin.',
        desc: 'Analiz edilen viral videolardan ilham alan özelleştirilmiş scriptler üretin. Typewriter efektiyle canlı oluşturma, tek tıkla kopyalama.',
        tags: ['Otomatik Script', 'Typewriter Animasyon', 'Panoya Kopyala', 'Demo Kredi Sistemi'],
        windowTitle: 'AI Script Üretici — TrendCatcher AI',
        content: (
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-wand-magic-sparkles text-indigo-400" style={{ fontSize: '11px' }} />
                        <span className="text-[12px] text-zinc-500 uppercase tracking-widest">Script Çıktısı</span>
                    </div>
                    <span className="text-[11px] text-indigo-400 animate-pulse">● Yazıyor...</span>
                </div>
                <div className="font-mono text-[12px] leading-relaxed space-y-2">
                    <p className="text-pink-400 font-semibold">HOOK:</p>
                    <p className="text-zinc-300 mb-1">&quot;Yüzünüzü havluyla kurulamayı hemen bırakın!&quot;</p>
                    <p className="text-blue-400 font-semibold">GÖVDE:</p>
                    <p className="text-zinc-400 mb-1">Çoğu havlu bakteri yuvasıdır. [Ürün] ile akne oluşumunu %40 azaltabilirsiniz.</p>
                    <p className="text-emerald-400 font-semibold">CTA:</p>
                    <p className="text-zinc-300">Denemek için link biyografide.</p>
                </div>
            </div>
        ),
    },
] as const;

export function FeatureCards() {
    return (
        <section id="features" className="relative bg-transparent section-divider py-28">
            <div className="container mx-auto px-6 space-y-28">
                {FEATURE_SECTIONS.map(({ num, eyebrow, title, desc, tags, windowTitle, content }) => (
                    <ScrollReveal key={num}>
                        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                        {/* Text */}
                        <div>
                            <p className="text-zinc-600 text-xs font-medium mb-2">{num}</p>
                            <p className="text-zinc-500 text-xs uppercase tracking-widest font-medium mb-4">{eyebrow}</p>
                            <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-5 whitespace-pre-line">
                                {title}
                            </h2>
                            <p className="text-zinc-500 text-sm leading-relaxed mb-6 max-w-sm">{desc}</p>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                                {tags.map((tag) => (
                                    <div key={tag} className="flex items-center gap-2 text-[12px] text-zinc-400">
                                        <span className="w-1 h-1 rounded-full bg-zinc-600 shrink-0" />
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mac window mockup */}
                        <MacWindow title={windowTitle}>
                            {content}
                        </MacWindow>
                    </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}
