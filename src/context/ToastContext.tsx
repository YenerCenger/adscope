'use client';

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode
} from 'react';

export type ToastType = 'success' | 'error' | 'info';

let toastIdSeq = 0;
function nextToastId(): number {
    return ++toastIdSeq;
}

type ToastItem = { id: number; message: string; type: ToastType };

type ToastContextValue = {
    show: (message: string, type?: ToastType, duration?: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const icons: Record<ToastType, string> = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle'
};

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const remove = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const show = useCallback(
        (message: string, type: ToastType = 'info', duration = 3000) => {
            const id = nextToastId();
            setToasts((prev) => [...prev, { id, message, type }]);
            if (duration > 0) {
                setTimeout(() => remove(id), duration);
            }
        },
        [remove]
    );

    const value = useMemo(() => ({ show }), [show]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="toast-container" id="toast-container" aria-live="polite">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        id={`toast-${t.id}`}
                        role="status"
                        className={`toast toast-${t.type}`}
                    >
                        <span className="toast-icon-wrap" aria-hidden>
                            <i className={`fa-solid ${icons[t.type]}`} />
                        </span>
                        <div className="flex-1 min-w-0 pt-0.5">
                            <p className="toast-message">{t.message}</p>
                        </div>
                        <button
                            type="button"
                            className="toast-dismiss"
                            onClick={() => remove(t.id)}
                            aria-label="Kapat"
                        >
                            <i className="fa-solid fa-times text-[11px]" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast(): ToastContextValue {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return ctx;
}
