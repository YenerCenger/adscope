'use client';

import { videoDatabase, type VideoRecord } from '@/data/videoDatabase';
import { useToast } from '@/context/ToastContext';
import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';

/* ─── constants ──────────────────────────────────────────── */
const COUNTRIES  = ['🇺🇸 United States', '🇹🇷 Turkey', '🇩🇪 Germany', '🇧🇷 Brazil'] as const;
const CATEGORIES = ['🧴 Skincare', '🍳 Yemek', '📱 Mobil Uygulama'] as const;

/** Veritabanı anahtarı aynı; arayüzde emoji göstermiyoruz */
const COUNTRY_UI: Record<(typeof COUNTRIES)[number], string> = {
    '🇺🇸 United States': 'United States',
    '🇹🇷 Turkey': 'Turkey',
    '🇩🇪 Germany': 'Germany',
    '🇧🇷 Brazil': 'Brazil',
};
const CATEGORY_UI: Record<(typeof CATEGORIES)[number], string> = {
    '🧴 Skincare': 'Skincare',
    '🍳 Yemek': 'Yemek',
    '📱 Mobil Uygulama': 'Mobil Uygulama',
};

const CREDIT_COST   = 15;
const TYPEWRITER_MS = 22;
const LOAD_DELAY_MS = 450;
const AI_DELAY_MS   = 800;

const DEMO_SCRIPT =
    'HOOK: "Yüzünüzü havluyla kurulamayı hemen bırakın!"\n\nGÖVDE: Çoğu havlu bakteri yuvasıdır. Bunun yerine tek kullanımlık kağıt havlu veya [Ürün İsmi] kullanarak akne oluşumunu %40 azaltabilirsiniz.\n\nCTA: Denemek için link biyografide.';

function getCreditBarClass(credit: number) {
    if (credit < 30) return 'bg-gradient-to-r from-rose-900/90 to-rose-700/70 h-full transition-all duration-700';
    if (credit < 50) return 'bg-gradient-to-r from-amber-900/80 to-amber-600/60 h-full transition-all duration-700';
    return 'bg-gradient-to-r from-indigo-600 to-violet-600 h-full transition-all duration-700';
}

/** Skor çubuğu — tek indigo→violet paleti, skora göre opaklık hissi */
function scoreBarClass(score: number): string {
    if (score >= 9.0) return 'bg-gradient-to-r from-emerald-500/90 to-teal-500/75';
    if (score >= 8.5) return 'bg-gradient-to-r from-indigo-500 to-violet-500';
    return 'bg-gradient-to-r from-indigo-500/70 to-violet-500/60';
}

function getVideos(country: string, category: string): VideoRecord[] {
    const byCountry = videoDatabase[country];
    if (!byCountry) return [];
    return byCountry[category] ?? [];
}

function buildBulkReportText(
    selected: VideoRecord[],
    countryKey: (typeof COUNTRIES)[number],
    categoryKey: (typeof CATEGORIES)[number]
): string {
    if (!selected.length) return '';
    const avgScore = selected.reduce((s, v) => s + v.score, 0) / selected.length;
    const avgEng = selected.reduce((s, v) => s + v.engagement, 0) / selected.length;
    const date = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

    const lines = selected
        .map((v, i) => {
            return `${i + 1}. ${v.title}
   Viral skor: ${v.score}/10 · Engagement: +${v.engagement}% · ${v.views} görüntülenme · ${v.likes} beğeni · ${v.daysAgo} gün önce`;
        })
        .join('\n\n');

    const insight =
        avgScore >= 9
            ? 'Seçilen örnekler üst performans bandında. Güçlü hook ve net CTA geçişlerini kendi kampanyanıza uyarlamak için iyi referanslar.'
            : avgScore >= 8
              ? 'Performans dengeli. Önce en yüksek skorlu videonun ilk saniyelerindeki vaat ve son bölümdeki çağrıyı inceleyin; aynı yapıyı ürününüze çevirin.'
              : 'Karşılaştırma için daha yüksek skorlu içerikler de seçerek ortak kanca ve senaryo kalıplarını çıkarın.';

    return `TrendCatcher AI — TOPLU TREND RAPORU
${'─'.repeat(36)}
Tarih: ${date}
Pazar: ${COUNTRY_UI[countryKey]}
Kategori: ${CATEGORY_UI[categoryKey]}
Seçilen içerik: ${selected.length} video

DETAY
${lines}

ÖZET
Ortalama viral skor: ${avgScore.toFixed(1)}/10
Ortalama engagement artışı: +${Math.round(avgEng)}%

YORUM
${insight}`;
}

/* ─── Single video card (pure CSS, no images) ────────────── */
function VideoCard({
    video, index, selected, onSelect, onClick,
}: {
    video: VideoRecord; index: number;
    selected: boolean; onSelect: (id: number, v: boolean) => void;
    onClick: () => void;
}) {
    const pct = Math.round((video.score / 10) * 100);

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
            className="group relative bg-white/[0.025] border border-white/[0.07] rounded-xl p-4 cursor-pointer
                       hover:bg-white/[0.05] hover:border-indigo-500/20 transition-all"
        >
            {/* Index + title + badges row */}
            <div className="flex items-start gap-3 mb-3">
                {/* Numbered index + select */}
                <div
                    className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 cursor-pointer transition-colors ${
                        selected ? 'bg-indigo-500 border-indigo-400 shadow-[0_0_0_1px_rgba(99,102,241,0.3)]' : 'border-white/[0.12] bg-transparent'
                    }`}
                    onClick={(e) => { e.stopPropagation(); onSelect(video.id, !selected); }}
                    role="checkbox"
                    aria-checked={selected}
                    tabIndex={-1}
                >
                    {selected
                        ? <i className="fa-solid fa-check text-[8px] text-white" />
                        : <span className="text-[9px] text-zinc-600 leading-none">{String(index + 1).padStart(2, '0')}</span>
                    }
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="text-white text-[12px] font-medium leading-snug line-clamp-2 flex-1">
                            {video.title}
                        </h4>
                        <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[9px] bg-rose-950/50 text-rose-200/90 border border-rose-500/25 px-1.5 py-0.5 rounded font-semibold tracking-wide leading-none">
                                VİRAL
                            </span>
                            <span className="text-[12px] font-semibold tabular-nums text-indigo-300">
                                {video.score}
                            </span>
                        </div>
                    </div>

                    {/* Score bar */}
                    <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden mb-3">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${scoreBarClass(video.score)}`}
                            style={{ width: `${pct}%` }}
                        />
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-3 text-zinc-500">
                            <span><i className="fa-solid fa-eye mr-1 text-indigo-400/70" />{video.views}</span>
                            <span><i className="fa-solid fa-heart mr-1 text-rose-400/50" />{video.likes}</span>
                            <span className="text-zinc-600">{video.daysAgo}g önce</span>
                        </div>
                        <span className="text-emerald-400/90 font-medium tabular-nums">+{video.engagement}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Types ──────────────────────────────────────────────── */
export type VideoGridProps = {
    earlyAccessOpen: boolean;
    onCloseEarlyAccess: () => void;
};

/* ─── Main component ─────────────────────────────────────── */
export function VideoGrid({ earlyAccessOpen, onCloseEarlyAccess }: VideoGridProps) {
    const toast = useToast();

    const [currentCountry,  setCurrentCountry]  = useState<(typeof COUNTRIES)[number]>(COUNTRIES[0]);
    const [currentCategory, setCurrentCategory] = useState<(typeof CATEGORIES)[number]>(CATEGORIES[0]);
    const [countrySearch,   setCountrySearch]   = useState('');
    const [countryOpen,     setCountryOpen]     = useState(false);
    const [categoryOpen,    setCategoryOpen]    = useState(false);
    const [loading,         setLoading]         = useState(false);
    const [selectedIds,     setSelectedIds]     = useState<number[]>([]);
    const [modalVideo,      setModalVideo]      = useState<VideoRecord | null>(null);
    const [currentCredit,   setCurrentCredit]   = useState(75);
    const [isGenerating,    setIsGenerating]    = useState(false);
    const [showAiResult,    setShowAiResult]    = useState(false);
    const [aiScriptText,    setAiScriptText]    = useState('');
    const [typingCursor,    setTypingCursor]    = useState(false);
    const [reportOpen,      setReportOpen]      = useState(false);
    const [reportText,      setReportText]      = useState('');

    const countryWrapRef  = useRef<HTMLDivElement>(null);
    const categoryWrapRef = useRef<HTMLDivElement>(null);
    const twTimerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);

    const filteredCountries = useMemo(() => {
        const q = countrySearch.toLowerCase();
        return COUNTRIES.filter((c) => {
            const label = COUNTRY_UI[c].toLowerCase();
            return label.includes(q) || c.toLowerCase().includes(q);
        });
    }, [countrySearch]);

    const videos      = useMemo(() => getVideos(currentCountry, currentCategory), [currentCountry, currentCategory]);

    /* ── handlers ─────────────────────────────────────────── */
    const runLoad = useCallback((after: () => void) => {
        setLoading(true);
        setTimeout(() => { setLoading(false); after(); }, LOAD_DELAY_MS);
    }, []);

    const toggleCountry  = useCallback(() => { setCountryOpen((o) => !o); setCountrySearch(''); }, []);
    const toggleCategory = useCallback(() => { setCategoryOpen((o) => !o); }, []);

    const selectCountry = useCallback((name: (typeof COUNTRIES)[number]) => {
        if (name === currentCountry) { toast.show('Zaten seçili', 'info', 1500); setCountryOpen(false); return; }
        setCountryOpen(false);
        const label = COUNTRY_UI[name];
        toast.show(`${label} yükleniyor…`, 'info', 1200);
        runLoad(() => { setCurrentCountry(name); setSelectedIds([]); toast.show(`${label} hazır`, 'success', 1800); });
    }, [currentCountry, runLoad, toast]);

    const selectCategory = useCallback((name: (typeof CATEGORIES)[number]) => {
        if (name === currentCategory) { toast.show('Zaten seçili', 'info', 1500); setCategoryOpen(false); return; }
        setCategoryOpen(false);
        const label = CATEGORY_UI[name];
        toast.show(`${label} yükleniyor…`, 'info', 1200);
        runLoad(() => { setCurrentCategory(name); setSelectedIds([]); toast.show(`${label} hazır`, 'success', 1800); });
    }, [currentCategory, runLoad, toast]);

    const handleBulkReport = useCallback(() => {
        if (!selectedIds.length) {
            toast.show('En az bir video seçin (kartın solundaki numaraya tıklayın).', 'error', 3500);
            return;
        }
        const selected = videos.filter((v) => selectedIds.includes(v.id));
        if (!selected.length) {
            toast.show('Seçimler güncel liste ile eşleşmiyor; seçimi temizleyip yeniden deneyin.', 'error', 3500);
            setSelectedIds([]);
            return;
        }
        const text = buildBulkReportText(selected, currentCountry, currentCategory);
        setReportText(text);
        setReportOpen(true);
    }, [selectedIds, videos, currentCountry, currentCategory, toast]);

    const copyReport = useCallback(() => {
        if (!reportText) return;
        navigator.clipboard.writeText(reportText).then(
            () => toast.show('Rapor panoya kopyalandı.', 'success', 2200),
            () => toast.show('Kopyalanamadı; metni elle seçin.', 'error', 2500)
        );
    }, [reportText, toast]);

    const clearTw = useCallback(() => {
        if (twTimerRef.current) { clearTimeout(twTimerRef.current); twTimerRef.current = null; }
    }, []);

    const runTypewriter = useCallback(() => {
        clearTw();
        let i = 0;
        const step = () => {
            if (i < DEMO_SCRIPT.length) {
                setAiScriptText((p) => p + DEMO_SCRIPT.charAt(i++));
                twTimerRef.current = setTimeout(step, TYPEWRITER_MS);
            } else {
                setTypingCursor(false);
                setIsGenerating(false);
                toast.show('Script hazır!', 'success', 2500);
            }
        };
        setAiScriptText('');
        setTypingCursor(true);
        step();
    }, [clearTw, toast]);

    const handleGenerateAi = useCallback(() => {
        if (isGenerating) { toast.show('Zaten oluşturuluyor…', 'info', 1500); return; }
        setIsGenerating(true);
        setCurrentCredit((c) => { const n = Math.max(c - CREDIT_COST, 0); if (n < 30) toast.show('Kredi düşük!', 'error', 2500); return n; });
        toast.show('AI script oluşturuluyor…', 'info', 1200);
        setTimeout(() => { setShowAiResult(true); runTypewriter(); }, AI_DELAY_MS);
    }, [isGenerating, runTypewriter, toast]);

    const closeAiPanel = useCallback(() => { setShowAiResult(false); setAiScriptText(''); setTypingCursor(false); clearTw(); }, [clearTw]);

    const copyScript = useCallback(() => {
        if (!aiScriptText) { toast.show('Metin yok', 'error', 1500); return; }
        navigator.clipboard.writeText(aiScriptText).then(
            () => toast.show('Kopyalandı!', 'success', 1800),
            () => toast.show('Kopyalama başarısız', 'error', 2000)
        );
    }, [aiScriptText, toast]);

    function toggleSelect(id: number, v: boolean) {
        setSelectedIds((p) => v ? (p.includes(id) ? p : [...p, id]) : p.filter((x) => x !== id));
    }

    useEffect(() => () => clearTw(), [clearTw]);

    useEffect(() => {
        const onDown = (e: MouseEvent) => {
            const t = e.target as Node;
            if (countryWrapRef.current  && !countryWrapRef.current.contains(t))  setCountryOpen(false);
            if (categoryWrapRef.current && !categoryWrapRef.current.contains(t)) setCategoryOpen(false);
        };
        document.addEventListener('mousedown', onDown as unknown as EventListener);
        return () => document.removeEventListener('mousedown', onDown as unknown as EventListener);
    }, []);

    useEffect(() => {
        document.body.style.overflow = modalVideo || reportOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [modalVideo, reportOpen]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const tgt = e.target as HTMLElement;
            if (['INPUT','TEXTAREA','SELECT'].includes(tgt.tagName) && e.key !== 'Escape') return;
            if (e.key === 'Escape') {
                if (reportOpen)     { setReportOpen(false); return; }
                if (modalVideo)     { setModalVideo(null); return; }
                if (earlyAccessOpen){ onCloseEarlyAccess(); return; }
                if (countryOpen)   setCountryOpen(false);
                if (categoryOpen)  setCategoryOpen(false);
                return;
            }
            if (e.shiftKey && e.key === 'C') { e.preventDefault(); setCountryOpen((o) => !o); }
            if (e.shiftKey && e.key === 'K') { e.preventDefault(); setCategoryOpen((o) => !o); }
            if (e.shiftKey && e.key === 'R') { e.preventDefault(); handleBulkReport(); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [reportOpen, modalVideo, earlyAccessOpen, countryOpen, categoryOpen, onCloseEarlyAccess, handleBulkReport, toast]);

    /* ─── render ──────────────────────────────────────────── */
    return (
        <>
            {/* Mac window chrome */}
            <div className="mx-auto max-w-5xl demo-mac-window rounded-2xl overflow-hidden">
                <div className="demo-mac-titlebar flex items-center gap-2 px-4 py-2.5">
                    <div className="flex items-center gap-1.5 shrink-0" aria-hidden>
                        <span className="demo-mac-traffic-light w-3 h-3 rounded-full bg-[#ff5f57]" />
                        <span className="demo-mac-traffic-light w-3 h-3 rounded-full bg-[#febc2e]" />
                        <span className="demo-mac-traffic-light w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                    <p className="flex-1 text-center text-[11px] font-medium text-zinc-500 -ml-9">
                        TrendCatcher AI — İnteraktif Demo
                    </p>
                </div>

                {/* Body */}
                <div className="flex flex-col md:flex-row h-[560px] demo-panel-interfere">

                    {/* ── Sidebar ─────────────────────────── */}
                    <aside className="hidden md:flex w-52 shrink-0 flex-col gap-3 p-4 bg-black/55 border-r border-white/[0.06]">
                        <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">Pazar & Filtre</p>

                        {/* Country dropdown */}
                        <div className="relative" ref={countryWrapRef}>
                            <button
                                type="button"
                                onClick={toggleCountry}
                                className="w-full flex items-center justify-between gap-2 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] rounded-lg px-3 py-2 text-[12px] text-zinc-300 transition-colors text-left"
                            >
                                <span className="truncate">{COUNTRY_UI[currentCountry]}</span>
                                <i className={`fa-solid fa-chevron-down text-zinc-600 text-[9px] transition-transform duration-200 ${countryOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {countryOpen && (
                                <div className="absolute top-full left-0 w-full mt-1 bg-[#111114] border border-white/[0.09] rounded-xl shadow-xl z-50 overflow-hidden">
                                    <div className="p-2 border-b border-white/[0.05]">
                                        <input
                                            type="text"
                                            placeholder="Ara…"
                                            className="search-input"
                                            value={countrySearch}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCountrySearch(e.target.value)}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="max-h-40 overflow-y-auto custom-scrollbar">
                                        {filteredCountries.map((c) => (
                                            <button key={c} type="button" onClick={() => selectCountry(c)}
                                                className="block w-full text-left px-3 py-2 text-[12px] text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors">
                                                {COUNTRY_UI[c]}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Category dropdown */}
                        <div className="relative" ref={categoryWrapRef}>
                            <button
                                type="button"
                                onClick={toggleCategory}
                                className="w-full flex items-center justify-between gap-2 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] rounded-lg px-3 py-2 text-[12px] text-zinc-300 transition-colors text-left"
                            >
                                <span className="truncate">{CATEGORY_UI[currentCategory]}</span>
                                <i className={`fa-solid fa-chevron-down text-zinc-600 text-[9px] transition-transform duration-200 ${categoryOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {categoryOpen && (
                                <div className="absolute top-full left-0 w-full mt-1 bg-[#111114] border border-white/[0.09] rounded-xl shadow-xl z-50 overflow-hidden">
                                    <div className="max-h-40 overflow-y-auto custom-scrollbar">
                                        {CATEGORIES.map((c) => (
                                            <button key={c} type="button" onClick={() => selectCategory(c)}
                                                className="block w-full text-left px-3 py-2 text-[12px] text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors">
                                                {CATEGORY_UI[c]}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bulk report */}
                        <button
                            type="button"
                            disabled={!selectedIds.length}
                            onClick={handleBulkReport}
                            className="flex items-center justify-center gap-1.5 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] rounded-lg px-3 py-2 text-[12px] text-zinc-500 hover:text-zinc-300 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                        >
                            <i className="fa-solid fa-file-export text-[10px]" />
                            {selectedIds.length ? `Rapor (${selectedIds.length})` : 'Toplu Rapor'}
                        </button>

                        {/* Credit */}
                        <div className="mt-auto p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-[11px] text-zinc-600">Kalan Kredi</p>
                                <span className="text-[11px] text-white font-semibold tabular-nums">{currentCredit}%</span>
                            </div>
                            <div className="w-full bg-white/[0.06] h-1 rounded-full overflow-hidden">
                                <div className={getCreditBarClass(currentCredit)} style={{ width: `${currentCredit}%` }} />
                            </div>
                        </div>
                    </aside>

                    {/* ── Main area ───────────────────────── */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 relative">

                        {/* Loading overlay */}
                        {loading && (
                            <div className="absolute inset-0 bg-black/92 z-50 flex flex-col items-center justify-center gap-3">
                                <i className="fa-solid fa-circle-notch fa-spin text-2xl text-indigo-400/90" />
                                <p className="text-[11px] text-zinc-600">Yükleniyor…</p>
                            </div>
                        )}

                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-[13px] font-semibold text-white flex items-center gap-1.5">
                                    <i className="fa-solid fa-chart-line text-indigo-400/90 text-xs" />
                                    Trend Analizleri
                                </h3>
                                <p className="text-[10px] text-zinc-600 mt-0.5">{videos.length} viral içerik</p>
                            </div>
                            <span className="flex items-center gap-1.5 text-[10px] text-emerald-400/85 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                Canlı
                            </span>
                        </div>

                        {/* Seçim + toplu rapor — mobilde sidebar olmadığı için her zaman burada */}
                        {selectedIds.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 mb-4 p-3 rounded-xl bg-white/[0.04] border border-indigo-500/25">
                                <p className="text-[12px] text-zinc-400 flex-1 min-w-[140px]">
                                    <span className="text-white font-semibold tabular-nums">{selectedIds.length}</span>
                                    {' '}video seçildi
                                </p>
                                <button
                                    type="button"
                                    onClick={handleBulkReport}
                                    className="text-[12px] font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 transition-all"
                                >
                                    Toplu rapor
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedIds([])}
                                    className="text-[11px] text-zinc-500 hover:text-zinc-300 px-2 py-1"
                                >
                                    Temizle
                                </button>
                            </div>
                        )}

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                            {videos.length === 0 ? (
                                <div className="col-span-2 text-center py-10">
                                    <i className="fa-solid fa-video-slash text-3xl text-white/10 mb-3" />
                                    <p className="text-zinc-600 text-sm">Bu kombinasyonda video bulunamadı</p>
                                </div>
                            ) : (
                                videos.map((video, idx) => (
                                    <VideoCard
                                        key={video.id}
                                        video={video}
                                        index={idx}
                                        selected={selectedIds.includes(video.id)}
                                        onSelect={toggleSelect}
                                        onClick={() => setModalVideo(video)}
                                    />
                                ))
                            )}
                        </div>

                        {/* AI Script output */}
                        {showAiResult && (
                            <div className="bg-zinc-950/80 border border-indigo-500/20 rounded-xl p-4 mb-2">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-medium text-indigo-300/90 uppercase tracking-wider">
                                        AI Script Çıktısı
                                    </span>
                                    <div className="flex gap-3">
                                        <button type="button" onClick={copyScript}
                                            className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1">
                                            <i className="fa-solid fa-copy text-[10px]" />Kopyala
                                        </button>
                                        <button type="button" onClick={closeAiPanel}
                                            className="text-[11px] text-zinc-700 hover:text-zinc-400 transition-colors">
                                            <i className="fa-solid fa-times" />
                                        </button>
                                    </div>
                                </div>
                                <pre className={`text-zinc-300 text-[12px] whitespace-pre-wrap font-mono leading-relaxed m-0 ${typingCursor ? 'typing-cursor' : ''}`}>
                                    {aiScriptText}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Modal ─────────────────────────────────── */}
            {modalVideo && (
                <div
                    className="fixed inset-0 bg-black/88 z-[100] flex items-center justify-center p-4"
                    role="dialog" aria-modal="true" aria-labelledby="vm-title"
                    onClick={(e) => { if (e.target === e.currentTarget) setModalVideo(null); }}
                >
                    <div className="bg-[#0a0a0c] border border-white/[0.09] rounded-2xl max-w-3xl w-full max-h-[88vh] overflow-y-auto custom-scrollbar shadow-2xl animate-fade-in-scale">

                        {/* Modal header */}
                        <div className="sticky top-0 bg-[#0a0a0c]/98 border-b border-white/[0.07] px-5 py-4 flex justify-between items-center z-10">
                            <h3 id="vm-title" className="text-sm font-semibold text-white">Video Detay Analizi</h3>
                            <button type="button" onClick={() => setModalVideo(null)} aria-label="Kapat"
                                className="text-zinc-600 hover:text-zinc-300 transition-colors w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/[0.07]">
                                <i className="fa-solid fa-times" />
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            {/* Title + meta */}
                            <div>
                                <h3 className="text-base font-bold text-white mb-2 leading-snug">{modalVideo.title}</h3>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-[10px] bg-rose-950/45 text-rose-200/90 border border-rose-500/25 px-2 py-0.5 rounded font-semibold tracking-wide">VİRAL</span>
                                    <span className="text-sm font-semibold tabular-nums text-indigo-300">
                                        {modalVideo.score} / 10
                                    </span>
                                    <span className="text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 text-xs px-2.5 py-0.5 rounded-full tabular-nums">
                                        +{modalVideo.engagement}%
                                    </span>
                                    <span className="text-zinc-600 text-xs">{modalVideo.daysAgo} gün önce</span>
                                </div>
                            </div>

                            {/* Score bar */}
                            <div>
                                <div className="flex items-center justify-between text-[10px] text-zinc-600 mb-1">
                                    <span>Viral Skor</span>
                                    <span className="tabular-nums text-indigo-300/80">{modalVideo.score}/10</span>
                                </div>
                                <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-700 ${scoreBarClass(modalVideo.score)}`}
                                        style={{ width: `${(modalVideo.score / 10) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { icon: 'fa-eye', val: modalVideo.views, label: 'Görüntülenme', iconClass: 'text-indigo-400/80' },
                                    { icon: 'fa-heart', val: modalVideo.likes, label: 'Beğeni', iconClass: 'text-rose-400/70' },
                                    { icon: 'fa-share', val: modalVideo.shares, label: 'Paylaşım', iconClass: 'text-violet-400/75' },
                                ].map(({ icon, val, label, iconClass }) => (
                                    <div key={label} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3 text-center">
                                        <i className={`fa-solid ${icon} mb-1.5 text-sm ${iconClass}`} />
                                        <div className="text-sm font-semibold text-white tabular-nums">{val}</div>
                                        <div className="text-[10px] text-zinc-600">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Analysis — tek sol vurgu (indigo), çok renkli şerit yok */}
                            <div className="rounded-xl border border-white/[0.07] border-l-2 border-l-indigo-500/45 bg-gradient-to-br from-indigo-950/20 to-transparent overflow-hidden divide-y divide-white/[0.06]">
                                {[
                                    {
                                        title: 'Hook (ilk 3 sn)',
                                        body: `"${modalVideo.hook}" — İzleyiciyi ilk saniyede yakalar.`,
                                    },
                                    {
                                        title: 'Senaryo yapısı',
                                        body: '0–3 sn: problem tanımı · 3–15 sn: yanlış uygulama · 15–30 sn: çözüm ve kanıt.',
                                    },
                                    {
                                        title: 'Görsellik ve kurgu',
                                        body: 'Hızlı kesim, yakın çekim ve dengeli ışık. Profesyonel, doğal bir akış.',
                                    },
                                ].map((item, i) => (
                                    <div key={item.title} className="flex gap-4 px-4 py-3.5">
                                        <span className="shrink-0 w-6 text-[10px] font-medium text-indigo-400/70 tabular-nums pt-0.5">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-[11px] font-medium text-zinc-200 mb-1">{item.title}</p>
                                            <p className="text-[12px] text-zinc-500 leading-relaxed">{item.body}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <button
                                type="button"
                                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:from-indigo-500 hover:to-violet-500 transition-all shadow-[0_0_24px_-4px_rgba(99,102,241,0.35)]"
                                onClick={() => { setModalVideo(null); handleGenerateAi(); }}
                            >
                                Bu videodan AI script oluştur
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toplu rapor çıktısı */}
            {reportOpen && (
                <div
                    className="fixed inset-0 bg-black/88 z-[110] flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="bulk-report-title"
                    onClick={(e) => { if (e.target === e.currentTarget) setReportOpen(false); }}
                >
                    <div className="bg-[#0a0a0c] border border-white/[0.1] rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl animate-fade-in-scale">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07] shrink-0">
                            <h3 id="bulk-report-title" className="text-sm font-semibold text-white">
                                Toplu trend raporu
                            </h3>
                            <button
                                type="button"
                                onClick={() => setReportOpen(false)}
                                className="text-zinc-500 hover:text-zinc-300 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/[0.07]"
                                aria-label="Kapat"
                            >
                                <i className="fa-solid fa-times" />
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto custom-scrollbar flex-1 min-h-0">
                            <pre className="text-[11px] text-zinc-400 whitespace-pre-wrap font-mono leading-relaxed m-0">
                                {reportText}
                            </pre>
                        </div>
                        <div className="flex gap-2 p-4 border-t border-white/[0.07] shrink-0">
                            <button
                                type="button"
                                onClick={copyReport}
                                className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-white text-zinc-900 hover:bg-zinc-100 transition-colors"
                            >
                                Panoya kopyala
                            </button>
                            <button
                                type="button"
                                onClick={() => setReportOpen(false)}
                                className="px-4 py-2.5 rounded-xl text-sm text-zinc-400 border border-white/[0.1] hover:bg-white/[0.05]"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
