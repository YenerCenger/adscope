'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';

type Props = {
    open: boolean;
    onClose: () => void;
};

const TABLE = 'early_access_leads';

export function EarlyAccessModal({ open, onClose }: Props) {
    const toast = useToast();
    const [submitting, setSubmitting] = useState(false);

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

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem('email') as HTMLInputElement)?.value?.trim();
        const role = (form.elements.namedItem('role') as HTMLSelectElement)?.value || null;
        const country = (form.elements.namedItem('country') as HTMLSelectElement)?.value || null;
        const note = (form.elements.namedItem('note') as HTMLTextAreaElement)?.value?.trim() || null;

        if (!email) {
            toast.show('Lütfen geçerli bir e-posta adresi girin.', 'error', 2500);
            return;
        }

        const supabase = createBrowserSupabaseClient();
        if (!supabase) {
            toast.show(
                'Supabase yapılandırması eksik. Proje kökünde .env.local oluşturup NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY ekleyin.',
                'error',
                6500
            );
            return;
        }

        setSubmitting(true);
        const { error } = await supabase.from(TABLE).insert({
            email: email.toLowerCase(),
            role,
            country,
            note,
            source: 'web',
        });

        setSubmitting(false);

        if (error) {
            const msg = error.message || '';
            if (error.code === '23505') {
                toast.show('Bu e-posta ile zaten bir kayıt var.', 'info', 3500);
            } else if (
                msg.includes('schema cache') ||
                msg.includes('Could not find the table') ||
                msg.includes('does not exist')
            ) {
                toast.show(
                    'Supabase’de early_access_leads tablosu yok. Dashboard → SQL Editor’da sql/early_access_leads.sql dosyasını çalıştırın (README).',
                    'error',
                    8000
                );
            } else if (msg.includes('row-level security') || error.code === '42501') {
                toast.show(
                    'Kayıt reddedildi. Supabase’de tablo ve RLS politikalarını kontrol edin (README).',
                    'error',
                    5000
                );
            } else {
                console.error(error);
                toast.show(error.message || 'Kayıt sırasında bir hata oluştu.', 'error', 4000);
            }
            return;
        }

        toast.show('Erken erişim talebin alındı. Teşekkürler!', 'success', 3000);
        form.reset();
        onClose();
    }

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 bg-black/85 z-[120] flex items-center justify-center px-4"
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
                        E-posta adresini bırak, lansmandan önce TrendCatcher AI&apos;yı deneyebileceğin davet linkini gönderelim.
                    </p>

                    <form className="early-access-form space-y-4" onSubmit={handleSubmit}>
                        <div className="text-left">
                            <label htmlFor="ea-email" className="block text-[11px] font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                                E-posta adresi
                            </label>
                            <input
                                id="ea-email"
                                name="email"
                                type="email"
                                required
                                disabled={submitting}
                                placeholder="ornek@firma.com"
                                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all disabled:opacity-50"
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
                                    disabled={submitting}
                                    className="w-full px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/30 transition-all disabled:opacity-50"
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
                                    disabled={submitting}
                                    className="w-full px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/30 transition-all disabled:opacity-50"
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
                                disabled={submitting}
                                placeholder="Örn: TikTok reklam kreatiflerini analiz etmek ve yeni script fikirleri üretmek istiyorum."
                                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all resize-none disabled:opacity-50"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full mt-1 bg-white hover:bg-zinc-100 text-black font-semibold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:pointer-events-none"
                        >
                            {submitting ? (
                                <>
                                    <i className="fa-solid fa-circle-notch fa-spin" />
                                    Gönderiliyor…
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-envelope-open-text" />
                                    Erken erişim talebini gönder
                                </>
                            )}
                        </button>

                        <p className="text-[11px] text-zinc-600 mt-1 text-center">
                            Veriler Supabase üzerinde güvenli şekilde saklanır.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
