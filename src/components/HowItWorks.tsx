import { MacWindow } from './MacWindow';
import { ScrollReveal } from './ScrollReveal';

const STEPS = [
    {
        num: '01',
        title: 'Rakiplerinizi Keşfedin',
        desc: 'AdScope AI, pazarınızı sürekli izler ve trend kaymalarını siz fark etmeden önce tespit eder — kullanıcılar şikâyet etmeden önce.',
        tags: ['Çoklu Pazar', 'Kategori Analizi', 'Canlı Veri'],
    },
    {
        num: '02',
        title: 'Ne Olduğunu Anlayın',
        desc: 'Yalnızca metrik değil; hook yapısı, senaryo akışı ve engagement stratejisi. AdScope kök nedeni bulur ve neden viral olduğunu açıklar.',
        tags: ['Hook Analizi', 'Viral Skor', 'Senaryo Yapısı'],
    },
    {
        num: '03',
        title: 'Özgüvenle Üretin',
        desc: 'AI destekli script önerilerini kullanarak kendi içeriğinizi oluşturun; süreci başından sonuna kadar takip edin.',
        tags: ['AI Script', 'Typewriter Efekti', 'Panoya Kopyala'],
    },
] as const;

function Step0Content() {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] text-zinc-500">Pazar Seçimi</span>
                <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 rounded-full px-2 py-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    Canlı
                </span>
            </div>
            {[
                { code: 'US', name: 'United States', score: '9.2/10', trend: '+238%' },
                { code: 'TR', name: 'Turkey', score: '8.9/10', trend: '+201%' },
                { code: 'DE', name: 'Germany', score: '8.5/10', trend: '+195%' },
            ].map(({ code, name, score, trend }) => (
                <div key={code} className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2">
                    <span className="text-[10px] font-bold text-zinc-500 w-6 shrink-0">{code}</span>
                    <span className="text-[11px] text-zinc-300 flex-1">{name}</span>
                    <span className="text-[10px] text-zinc-600">{score}</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">{trend}</span>
                </div>
            ))}
        </div>
    );
}

function Step1Content() {
    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded bg-orange-500/20 flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-key text-orange-400" style={{ fontSize: '9px' }} />
                </div>
                <span className="text-[11px] text-zinc-300 font-medium flex-1">Viral Video Analizi</span>
                <span className="text-[10px] bg-white/[0.07] border border-white/[0.1] text-zinc-300 px-2 py-0.5 rounded-full">9.2 / 10</span>
            </div>
            <div className="space-y-2.5 mb-4">
                {[
                    { label: '🎯 Hook', pct: 94 },
                    { label: '📝 Senaryo', pct: 87 },
                    { label: '📊 Engagement', pct: 78 },
                ].map(({ label, pct }) => (
                    <div key={label} className="flex items-center gap-3">
                        <span className="text-[10px] text-zinc-500 w-24 shrink-0">{label}</span>
                        <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                        <span className="text-[10px] text-zinc-500 w-8 text-right">{pct}%</span>
                    </div>
                ))}
            </div>
            <div className="border-t border-white/[0.06] pt-3">
                <p className="text-[10px] text-pink-400 font-semibold mb-1">🎯 Hook (İlk 3 sn)</p>
                <p className="text-[10px] text-zinc-500 leading-relaxed">&quot;Havluyu bir kenara bırakın!&quot; — İlk 3 saniyede dikkat çekiyor.</p>
            </div>
        </div>
    );
}

function Step2Content() {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Çıktı</span>
                <span className="text-[10px] text-indigo-400 animate-pulse">● Yazıyor...</span>
            </div>
            <div className="font-mono text-[10px] leading-relaxed space-y-1.5">
                <p className="text-pink-400 font-semibold">HOOK:</p>
                <p className="text-zinc-300 mb-2">&quot;Yüzünüzü havluyla kurulamayı hemen bırakın!&quot;</p>
                <p className="text-blue-400 font-semibold">GÖVDE:</p>
                <p className="text-zinc-400 mb-2">Çoğu havlu bakteri yuvasıdır. [Ürün] ile akne oluşumunu %40 azaltabilirsiniz.</p>
                <p className="text-emerald-400 font-semibold">CTA:</p>
                <p className="text-zinc-300">Denemek için link biyografide.</p>
            </div>
        </div>
    );
}

const STEP_TITLES = ['Pazar Paneli — AdScope AI', 'Analiz Motoru — AdScope AI', 'AI Script Üretici — AdScope AI'];
const STEP_CONTENTS = [<Step0Content key={0} />, <Step1Content key={1} />, <Step2Content key={2} />];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="relative bg-transparent section-divider py-28">
            <div className="container mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-20">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">
                        AdScope AI, viral içerikleri{' '}
                        <em className="font-playfair italic text-zinc-400">bulur,</em>
                        <br />
                        <em className="font-playfair italic text-zinc-400">anlar</em>{' '}
                        ve size hazır script üretir.
                    </h2>
                    <p className="text-zinc-500 text-sm max-w-xl mx-auto leading-relaxed">
                        İlk sinyalden içerik üretimine kadar her adımda yanınızda.
                    </p>
                </div>

                {/* 3-col Mac windows */}
                <ScrollReveal className="grid lg:grid-cols-3 gap-6 mb-6 sr-stagger">
                    {STEPS.map(({ num }, i) => (
                        <MacWindow key={num} title={STEP_TITLES[i]}>
                            {STEP_CONTENTS[i]}
                        </MacWindow>
                    ))}
                </ScrollReveal>

                {/* 3-col step descriptions */}
                <ScrollReveal delay={150} className="grid lg:grid-cols-3 gap-6 sr-stagger">
                    {STEPS.map(({ num, title, desc, tags }) => (
                        <div key={num} className="pt-5 border-t border-white/[0.07]">
                            <p className="text-[11px] text-zinc-600 font-medium mb-3">{num}</p>
                            <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed mb-4">{desc}</p>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <span key={tag} className="text-[11px] text-zinc-500 bg-white/[0.04] border border-white/[0.07] rounded px-2 py-0.5">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </ScrollReveal>
            </div>
        </section>
    );
}
