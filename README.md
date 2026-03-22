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
