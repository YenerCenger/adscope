# AdScope AI

Yapay zeka destekli trend analizi ve viral içerik demo arayüzü. Next.js (App Router), React 18, TypeScript ve Tailwind CSS ile geliştirilmiştir.

## Özellikler

- Ülke ve kategori filtreleriyle viral video listesi
- Video detay modali, toplu rapor ve AI script üretimi (demo)
- Toast bildirimleri, erken erişim formu ve CTA bölümleri
- Özel CSS (`globals.css`) ile glass efektleri, animasyonlar ve grid arka plan

## Gereksinimler

- Node.js 18 veya üzeri
- npm (veya paket yöneticisi olarak kullandığınız araç)

## Kurulum

```bash
npm install
```

### Supabase (erken erişim e-postaları)

1. [Supabase](https://supabase.com) projenizde **SQL Editor** açın ve repodaki [`sql/early_access_leads.sql`](sql/early_access_leads.sql) içeriğini yapıştırıp **Run** edin (tablo + anon insert izni). Aşağıdaki blok aynı script’tir:

```sql
create table if not exists public.early_access_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role text,
  country text,
  note text,
  source text default 'web',
  created_at timestamptz not null default now()
);

create unique index if not exists early_access_leads_email_lower
  on public.early_access_leads (lower(email));

alter table public.early_access_leads enable row level security;

create policy "Anonim erken erişim kaydı"
  on public.early_access_leads
  for insert
  to anon
  with check (true);
```

`Could not find the table 'public.early_access_leads'` hatası, bu adımın henüz uygulanmadığı anlamına gelir.

2. Proje kökünde `.env.local` oluşturun (`.env.local.example` dosyasını kopyalayabilirsiniz):

- **Project Settings → API** bölümünden `URL` ve `anon public` anahtarını alın.
- `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` değişkenlerini doldurun.

3. Geliştirme sunucusunu yeniden başlatın (`npm run dev`).

Kayıtlar Supabase **Table Editor** üzerinden `early_access_leads` tablosunda görünür.

## Geliştirme

```bash
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

## Üretim

```bash
npm run build
npm start
```

## Lint

```bash
npm run lint
```

## Proje yapısı

| Yol | Açıklama |
|-----|----------|
| `src/app/` | App Router: `layout.tsx`, `page.tsx`, `globals.css` |
| `src/components/` | React bileşenleri (Navbar, Hero, VideoGrid, vb.) |
| `src/context/` | `ToastContext` — bildirimler |
| `src/data/videoDatabase.ts` | Demo video verisi |

Kök dizindeki `index.html`, `js/` ve `components/*.html` dosyaları eski statik prototip; canlı uygulama `src/` altındaki Next.js projesidir.

## Lisans

Özel proje — `private: true`.
"# adscope" 
