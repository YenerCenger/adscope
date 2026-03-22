export function Hero() {
    return (
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-16">

            {/* Left: headline */}
            <div className="lg:max-w-[60%]">
                <h1 className="text-[2.6rem] sm:text-5xl lg:text-[3.8rem] font-bold leading-[1.06] tracking-tight text-white">
                    Rakiplerinizin viral
                    <br />
                    sırlarını{' '}
                    <em
                        className="font-playfair not-italic"
                        style={{
                            fontStyle: 'italic',
                            background: 'linear-gradient(135deg, #e0e0e0 0%, #ffffff 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        keşfedin.
                    </em>
                </h1>
            </div>

            {/* Right: description + CTA */}
            <div className="lg:max-w-[34%] flex flex-col items-start gap-5 lg:pb-1">
                <p className="text-zinc-400 text-sm leading-relaxed">
                    AdScope AI, trend videolarını yapay zeka ile analiz ederek viral
                    script&apos;ler üretir. Rakiplerinizin stratejilerini saniyeler içinde
                    çözün — aşağıdaki interaktif demoyu şimdi deneyin.
                </p>
                <a
                    href="#early-access"
                    className="flex items-center gap-1.5 bg-white hover:bg-zinc-100 text-black pl-5 pr-1.5 py-2 rounded-full text-[13px] font-semibold transition-colors"
                >
                    Erken Erişime Katıl
                    <span className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white" style={{ fontSize: '11px' }}>
                        ↗
                    </span>
                </a>
            </div>
        </div>
    );
}
