export function Testimonials() {
    return (
        <section className="relative bg-transparent section-divider py-24" aria-label="Kullanıcı yorumları">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto rounded-2xl bg-zinc-950/90 border border-white/[0.07] p-10 sm:p-14 text-center">
                    <p className="text-zinc-200 text-xl sm:text-2xl leading-relaxed font-medium mb-8">
                        &quot;Viral içerik üretmek için harcadığım her saat, aslında kullanıcıların
                        gerçekten istediği şeyleri yapmaktan uzaklaşmaktı. TrendCatcher AI, ekibimizin
                        zamanını{' '}
                        <em className="font-playfair italic text-white">gerçekten önemli olana</em>
                        {' '}odaklamasını sağlıyor.&quot;
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
                            <span className="text-white font-bold text-xs">AE</span>
                        </div>
                        <div className="text-left">
                            <p className="text-white text-sm font-semibold">Aziz Emre Erdoğan</p>
                            <p className="text-zinc-500 text-xs">Skincare Markası Sahibi</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
