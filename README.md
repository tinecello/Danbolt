# danbolt.no

Nettside for Thorbjørn Danbolt — uavhengig teknisk rådgiver innen lyd, bilde og romakustikk.

## 🚀 Teknologier

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** med shadcn/ui komponenter
- **HTML5 Canvas** for interaktive bølgeanimasjoner
- **Formspree** for kontaktskjema

## 📁 Prosjektstruktur

```
├── public/
│   ├── thorbjorn-danbolt.jpg    # Bilde av Thorbjørn
│   └── natur-rom.jpg            # Bakgrunnsbilde filosofi-seksjon
├── src/
│   ├── sections/                 # Alle seksjoner på siden
│   │   ├── Navigation.tsx        # Navigasjonsmeny
│   │   ├── Hero.tsx              # Hero med WebGL-bølgeanimasjon
│   │   ├── Philosophy.tsx        # "Det begynner med rommet"
│   │   ├── AcousticViz.tsx       # Før/etter akustisk slider
│   │   ├── Services.tsx          # 6 tjenester med hover-detaljer
│   │   ├── Process.tsx           # 5-stegs prosjekteringsflyt
│   │   ├── About.tsx             # Om meg med bilde
│   │   ├── BookSection.tsx       # Fagbok-seksjon
│   │   ├── References.tsx        # Prosjektreferanser
│   │   ├── Contact.tsx           # Kontaktskjema (Formspree)
│   │   └── Footer.tsx            # Footer
│   ├── App.tsx                   # Hovedkomponent
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Globale stiler
├── index.html                    # HTML med SEO-meta-tags
├── tailwind.config.js            # Tailwind-konfigurasjon
├── vite.config.ts                # Vite-konfigurasjon
└── package.json
```

## 🛠️ Lokal utvikling

```bash
# Installer avhengigheter
npm install

# Start utviklingsserver
npm run dev

# Bygg for produksjon
npm run build
```

## 📤 Deploy til GitHub Pages

### Steg 1: GitHub Pages med Vite

1. Åpne `vite.config.ts` og legg til base URL:

```ts
export default defineConfig({
  base: '/danbolt.no/',  // ← ditt repo-navn
  plugins: [react()],
})
```

2. Installer gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Legg til i `package.json`:
```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

4. Bygg og deploy:
```bash
npm run build
npm run deploy
```

### Steg 2: Aktiver GitHub Pages

1. Gå til **Settings > Pages** i GitHub-repoet
2. Velg **Deploy from a branch > gh-pages**
3. Nettsiden blir tilgjengelig på: `https://dittbrukernavn.github.io/danbolt.no/`

## 🔧 Konfigurasjon

### Formspree
Formspree-ID er konfigurert i `src/sections/Contact.tsx`:
```tsx
const FORMSPREE_ID = 'mdaryrlz'
```

Bytt ut med din egen ID hvis nødvendig.

### SEO
Alle meta-tags og Schema.org-strukturerte data er i `index.html`.

## 📝 SEO-optimalisering inkludert

- Schema.org LocalBusiness + ProfessionalService
- Semantisk HTML5
- Open Graph meta-tags
- Kanonisk URL
- Optimaliserte titler og beskrivelser

---

Utviklet for [danbolt.no](https://danbolt.no) — Thorbjørn Danbolt.
