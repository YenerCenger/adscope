'use client';
import { useState } from 'react';

const FAQS = [
    {
        q: 'Gerçek ürün mü yoksa demo mu görüyorum?',
        a: 'Bu sayfa TrendCatcher AI için tasarlanmış interaktif bir ürün demosu. Gerçek üründe aynı deneyim gerçek veri kaynakları ve kendi hesabınızla çalışır.',
    },
    {
        q: 'Demo sırasında neleri test edebilirim?',
        a: 'Ülke ve kategori değiştirme, viral video kartlarını inceleme, detay modalini açma ve AI Script Oluştur özelliğini deneyerek tipik kullanıcı yolculuğunu görebilirsiniz.',
    },
    {
        q: 'Erken erişime kaydolursam ne kazanırım?',
        a: 'Lansmandan önce platforma giriş hakkı, sınırlı süreli ücretsiz analiz kredileri ve ürün yol haritasına geri bildirim verme fırsatı elde edersiniz.',
    },
    {
        q: 'Kredi kartı veya ödeme bilgisi gerekiyor mu?',
        a: 'Hayır. Erken erişim döneminde demo hesabı oluşturmak için yalnızca e-posta adresiniz yeterli; ödeme bilgisi zorunlu değildir.',
    },
] as const;

export function Faq() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section id="faq" className="relative bg-transparent section-divider py-24">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <p className="text-zinc-500 text-xs uppercase tracking-widest font-medium mb-3">SSS</p>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                        Sıkça Sorulan
                        <br />
                        <em className="font-playfair italic text-zinc-400">Sorular</em>
                    </h2>
                </div>

                <div className="max-w-2xl space-y-2">
                    {FAQS.map(({ q, a }, i) => {
                        const isOpen = open === i;
                        return (
                            <div
                                key={q}
                                className={`rounded-xl border transition-colors ${
                                    isOpen
                                        ? 'border-white/[0.1] bg-white/[0.04]'
                                        : 'border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.03]'
                                }`}
                            >
                                <button
                                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                                    onClick={() => setOpen(isOpen ? null : i)}
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-white text-sm font-medium leading-snug">{q}</span>
                                    <span className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isOpen ? 'border-zinc-500 text-zinc-400' : 'border-zinc-700 text-zinc-600'}`}>
                                        <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'} text-[9px]`} />
                                    </span>
                                </button>
                                {isOpen && (
                                    <div className="px-5 pb-5">
                                        <p className="text-zinc-500 text-sm leading-relaxed">{a}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
