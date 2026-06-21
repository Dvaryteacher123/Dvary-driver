# ☁️ Wingu Drive

Wingu Drive ni mradi mdogo, **huru (open source)**, wa kuhifadhi na kushiriki faili — kama Google Drive, lakini wewe unamiliki na kudeploy mwenyewe. Mtu yeyote anaweza ku-**fork**, kubadilisha, na ku-deploy nakala yake mwenyewe bila malipo.

Imejengwa kwa **Node.js + Express + EJS**, tayari kudeploy kwenye **Render** kwa kubonyeza tu.

## Vipengele

- Pakia faili (hadi 100MB kwa kila faili)
- Orodha ya mafile yote yenye ukubwa na tarehe
- Pakua faili lolote
- Nakili "link" ya kushiriki faili moja kwa moja
- Futa faili
- Muundo rahisi wa kuongeza vipengele (auth, folda, n.k.)

## Kuendesha kwenye kompyuta yako

```bash
git clone https://github.com/<jina-lako>/wingu-drive.git
cd wingu-drive
npm install
npm start
```

Fungua http://localhost:3000

## Kuweka kwenye GitHub yako

1. Tengeneza repo mpya tupu kwenye GitHub (usiweke README wala .gitignore pale GitHub, tayari zipo hapa).
2. Kwenye terminal, ndani ya folda hii:

```bash
git init
git add .
git commit -m "Wingu Drive - mwanzo"
git branch -M main
git remote add origin https://github.com/<jina-lako>/wingu-drive.git
git push -u origin main
```

## Kudeploy kwenye Render (link ya kudumu)

1. Nenda https://render.com na ufungue akaunti (unaweza kuingia kwa GitHub).
2. **New +** → **Web Service** → chagua repo yako ya `wingu-drive`.
3. Render itasoma `render.yaml` kiotomatiki (Build Command: `npm install`, Start Command: `npm start`).
4. Bonyeza **Create Web Service** — utapata link ya kudumu kama:
   `https://wingu-drive-xxxx.onrender.com`
5. Hiyo ndiyo link unayoshiriki na watu — kama Google Drive yako binafsi.

> ⚠️ **Muhimu:** Plan ya bure ("free") ya Render kwa kawaida **haihifadhi faili daima** — zikipotea baada ya restart/deploy mpya kwa sababu hifadhi (disk) ni ya muda. Kwa matumizi ya kudumu/uzito, panga kupandisha plan na kuwasha "Persistent Disk" (maelekezo yapo kwenye `render.yaml`), au unganisha hifadhi ya nje kama Cloudinary, AWS S3, au Backblaze B2.

## Kufanya watu wengi waione (fork & ushiriki)

- Weka repo **public** kwenye GitHub.
- Ongeza maelezo mazuri kwenye "About" ya repo + topics: `drive`, `file-sharing`, `nodejs`, `render`.
- Weka link ya demo yako (Render) kwenye README hii na kwenye "About" ya GitHub.
- Shiriki link kwenye mitandao ya kijamii, vikundi vya watengenezaji programu (developer communities), na Twitter/X, LinkedIn ukitumia # kama #buildinpublic.
- Watu wakibonyeza **Fork** GitHub, watapata nakala yao wenyewe ya kubadilisha na kudeploy.

## Muundo wa faili

```
wingu-drive/
├── server.js          # seva kuu (Express)
├── package.json
├── render.yaml         # usanidi wa Render
├── views/
│   └── index.ejs       # ukurasa kuu
├── public/
│   └── style.css        # mtindo
└── uploads/             # faili zilizopakiwa (haziandikwi kwenye Git)
```

## Maboresho yajayo (mawazo)

- Kuongeza login/akaunti ili kila mtu aone mafile yake tu
- Folda na sub-folda
- Hifadhi ya kudumu kwenye S3/Cloudinary
- "Drag & drop" ya kupakia faili nyingi kwa wakati mmoja

---

Mradi huu ni **MIT License** — tumia, badilisha, sambaza kwa uhuru.
