'use client';

import { FormEvent, useEffect } from 'react';
import { useToast } from '@/context/ToastContext';

type Props = {
    open: boolean;
    onClose: () => void;
};

export function EarlyAccessModal({ open, onClose }: Props) {
    const toast = useToast();

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem('email') as HTMLInputElement)?.value?.trim();
        if (!email) {
            toast.show('Lütfen geçerli bir e-posta adresi girin.', 'error', 2500);
            return;
        }
        toast.show('Erken erişim talebin alındı. Teşekkürler!', 'success', 3000);
        form.reset();
        onClose();
    }

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[120] flex items-center justify-center px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="early-access-title"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-zinc-950 border border-white/[0.09] rounded-2xl max-w-lg w-full shadow-2xl animate-fade-in-scale relative">
                <button
                    type="button"
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-200 rounded-lg hover:bg-white/[0.06] transition-all hover:rotate-90"
                    aria-label="Kapat"
                    onClick={onClose}
                >
                    <i className="fa-solid fa-times" />
                </button>
                <div className="p-6 sm:p-8">
                    <h3 id="early-access-title" className="text-xl font-bold text-white mb-1.5">
                        Erken Erişim Talebi
                    </h3>
                    <p className="text-zinc-500 text-sm mb-6">
                        E-posta adresini bırak, lansmandan önce AdScope AI&apos;yı deneyebileceğin davet linkini gönderelim.
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="text-left">
                            <label htmlFor="ea-email" className="block text-[11px] font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                                E-posta adresi
                            </label>
                            <input
                                id="ea-email"
                                name="email"
                                type="email"
                                required
                                placeholder="ornek@firma.com"
                                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all"
                            />
                        </div>
                        <div className="text-left grid sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="ea-role" className="block text-[11px] font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                                    Rolün
                                </label>
                                <select
                                    id="ea-role"
                                    name="role"
                                    className="w-full px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                                >
                                    <option value="">Seç (opsiyonel)</option>
                                    <option value="creator">İçerik Üreticisi</option>
                                    <option value="marketer">Performance Marketer</option>
                                    <option value="agency">Ajans Sahibi / Çalışanı</option>
                                    <option value="brand">Marka Sahibi</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="ea-country" className="block text-[11px] font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                                    Hedef pazar
                                </label>
                                <select
                                    id="ea-country"
                                    name="country"
                                    className="w-full px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                                >
                                    <option value="">Seç (opsiyonel)</option>
                                    <option value="us">ABD</option>
                                    <option value="de">Almanya</option>
                                    <option value="tr">Türkiye</option>
                                    <option value="other">Diğer</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-left">
                            <label htmlFor="ea-note" className="block text-[11px] font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                                Kısaca kullanım amacın
                            </label>
                            <textarea
                                id="ea-note"
                                name="note"
                                rows={3}
                                placeholder="Örn: TikTok reklam kreatiflerini analiz etmek ve yeni script fikirleri üretmek istiyorum."
                                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-1 bg-white hover:bg-zinc-100 text-black font-semibold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
                        >
                            <i className="fa-solid fa-envelope-open-text" />
                            Erken erişim talebini gönder
                        </button>

                        <p className="text-[11px] text-zinc-600 mt-1 text-center">
                            Şimdilik yalnızca iletişim almak için topluyoruz.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
