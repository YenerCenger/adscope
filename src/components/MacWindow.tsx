interface MacWindowProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function MacWindow({ title, children, className = '' }: MacWindowProps) {
    return (
        <div className={`rounded-xl overflow-hidden border border-white/[0.09] bg-zinc-950/90 shadow-2xl ${className}`}>
            {/* Title bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.07] bg-zinc-900/60">
                {/* Traffic lights */}
                <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                    <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                    <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                </div>
                {title && (
                    <span className="flex-1 text-center text-[11px] text-zinc-500 font-medium truncate -ml-9">
                        {title}
                    </span>
                )}
            </div>
            {/* Content */}
            <div className="p-5">{children}</div>
        </div>
    );
}
