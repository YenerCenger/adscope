'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { Hero } from '@/components/Hero';
import { VideoGrid } from '@/components/VideoGrid';
import { BentoStats } from '@/components/BentoStats';
import { FeatureCards } from '@/components/FeatureCards';
import { HowItWorks } from '@/components/HowItWorks';
import { Testimonials } from '@/components/Testimonials';
import { Faq } from '@/components/Faq';
import { EarlyAccessModal } from '@/components/EarlyAccessModal';
import { CtaSection } from '@/components/CtaSection';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function Page() {
    const toast = useToast();
    const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => {
            toast.show("AdScope AI'ya hoş geldiniz.", 'success', 3000);
        }, 500);
        return () => clearTimeout(t);
    }, [toast]);

    useEffect(() => {
        const onErr = (e: ErrorEvent) => {
            console.error('Bir hata oluştu:', e.error);
            toast.show('Bir hata oluştu. Lütfen tekrar deneyin.', 'error', 3000);
        };
        window.addEventListener('error', onErr);
        return () => window.removeEventListener('error', onErr);
    }, [toast]);

    return (
        <>
            {/* ===== HERO + DEMO ===== */}
            <header id="demo" className="hero-interfere pt-20 pb-16 lg:pt-28 lg:pb-20">
                {/* Glow orbs — GPU-composited, static (no scroll repaint) */}
                <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0 overflow-hidden" style={{ willChange: 'auto' }}>
                    <div
                        className="absolute opacity-50"
                        style={{
                            width: 'min(38vw, 460px)', height: '90%',
                            top: '0', left: '-8%',
                            background: 'radial-gradient(ellipse 60% 75% at 30% 50%, rgba(160, 35, 65, 0.5) 0%, transparent 70%)',
                            filter: 'blur(80px)',
                            transform: 'translateZ(0)',
                        }}
                    />
                    <div
                        className="absolute opacity-45"
                        style={{
                            width: 'min(40vw, 480px)', height: '90%',
                            top: '0', right: '-8%',
                            background: 'radial-gradient(ellipse 55% 72% at 70% 50%, rgba(35, 65, 150, 0.48) 0%, transparent 70%)',
                            filter: 'blur(80px)',
                            transform: 'translateZ(0)',
                        }}
                    />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <Hero />

                    {/* Demo divider */}
                    <div className="flex items-center gap-4 mb-7">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <span className="flex items-center gap-2 text-zinc-500 text-[11px] font-medium tracking-widest uppercase">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                            </span>
                            İnteraktif Demo
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>

                    <ScrollReveal>
                        <VideoGrid
                            earlyAccessOpen={earlyAccessOpen}
                            onCloseEarlyAccess={() => setEarlyAccessOpen(false)}
                        />
                    </ScrollReveal>
                </div>
            </header>

            <ScrollReveal delay={0}>
                <BentoStats />
            </ScrollReveal>

            {/* FeatureCards — each sub-section has its own reveal inside the component */}
            <FeatureCards />

            <ScrollReveal delay={0}>
                <HowItWorks />
            </ScrollReveal>

            {/* Testimonials with glow reveal */}
            <ScrollReveal delay={0} className="relative overflow-hidden">
                {/* Glow orb that brightens on scroll-in */}
                <div
                    aria-hidden="true"
                    className="glow-orb pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                    <div
                        className="w-[700px] h-[300px] rounded-full"
                        style={{
                            background: 'radial-gradient(ellipse, rgba(80, 40, 140, 0.5) 0%, transparent 70%)',
                            filter: 'blur(80px)',
                        }}
                    />
                </div>
                <Testimonials />
            </ScrollReveal>

            <ScrollReveal delay={0}>
                <Faq />
            </ScrollReveal>

            <EarlyAccessModal open={earlyAccessOpen} onClose={() => setEarlyAccessOpen(false)} />
            <CtaSection />
        </>
    );
}

