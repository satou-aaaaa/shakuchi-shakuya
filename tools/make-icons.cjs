// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、建物と時計（借地・借家の期間）。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <path d="M20 84 V40 L50 22 L80 40 V84 Z" fill="#fffdf7"/><rect x="30" y="48" width="10" height="12" fill="#8fb8de"/><rect x="45" y="48" width="10" height="12" fill="#8fb8de"/><rect x="60" y="48" width="10" height="12" fill="#8fb8de"/>
      <rect x="44" y="66" width="12" height="18" fill="#123554"/><circle cx="76" cy="74" r="14" fill="#f2a43a"/><path d="M76 66 V74 L82 78" stroke="#123554" stroke-width="3" fill="none"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
