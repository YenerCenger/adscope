import { createClient, SupabaseClient } from '@supabase/supabase-js';

export type EarlyAccessLead = {
    email: string;
    role: string | null;
    country: string | null;
    note: string | null;
    source?: string;
};

/**
 * Tarayıcıda kullanılacak Supabase istemcisi.
 * URL + anon/publishable anahtar tanımlı değilse `null` döner.
 * Panelde "Publishable" olarak verilen anahtar için bazen `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` kullanılır.
 */
export function createBrowserSupabaseClient(): SupabaseClient | null {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}
