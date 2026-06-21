const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = path.join(__dirname, "uploads");
const MAX_FILE_SIZE_MB = 100;

// Hakikisha folda ya uploads ipo
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Safisha jina la faili lisiwe na njia hatari (path traversal)
function safeName(originalName) {
  const base = path.basename(originalName);
  return base.replace(/[^a-zA-Z0-9.\-_ ]/g, "_");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const clean = safeName(file.originalname);
    const stamped = `${Date.now()}-${clean}`;
    cb(null, stamped);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE_MB * 1024 * 1024 },
});

function humanSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let val = bytes / 1024;
  let i = 0;
  while (val >= 1024 && i < units.length - 1) {
    val /= 1024;
    i++;
  }
  return `${val.toFixed(1)} ${units[i]}`;
}

function listFiles() {
  return fs
    .readdirSync(UPLOAD_DIR)
    .filter((f) => f !== ".gitkeep")
    .map((stored) => {
      const stat = fs.statSync(path.join(UPLOAD_DIR, stored));
      // Jina lililohifadhiwa ni: <timestamp>-<jinaasili>
      const dashIndex = stored.indexOf("-");
      const original = dashIndex !== -1 ? stored.slice(dashIndex + 1) : stored;
      return {
        stored,
        original,
        size: humanSize(stat.size),
        date: stat.mtime.toLocaleString("sw-TZ", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        mtime: stat.mtimeMs,
      };
    })
    .sort((a, b) => b.mtime - a.mtime);
}

app.get("/", (req, res) => {
  res.render("index", { files: listFiles(), error: req.query.error || null });
});

app.post("/upload", (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      const msg =
        err.code === "LIMIT_FILE_SIZE"
          ? `Faili kubwa mno (kikomo ni ${MAX_FILE_SIZE_MB}MB)`
          : "Imeshindikana kupakia faili";
      return res.redirect(`/?error=${encodeURIComponent(msg)}`);
    }
    if (!req.file) {
      return res.redirect(`/?error=${encodeURIComponent("Hujachagua faili lolote")}`);
    }
    res.redirect("/");
  });
});

app.get("/download/:stored", (req, res) => {
  const stored = safeName(req.params.stored);
  const filePath = path.join(UPLOAD_DIR, stored);
  if (!fs.existsSync(filePath)) return res.status(404).send("Faili halipo");
  const dashIndex = stored.indexOf("-");
  const original = dashIndex !== -1 ? stored.slice(dashIndex + 1) : stored;
  res.download(filePath, original);
});

app.post("/delete/:stored", (req, res) => {
  const stored = safeName(req.params.stored);
  const filePath = path.join(UPLOAD_DIR, stored);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Wingu Drive inaendesha kwenye port ${PORT}`);
});
