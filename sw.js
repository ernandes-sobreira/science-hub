const CACHE_NAME="jogo-ciencia-v2";
const ASSETS=["./","./index.html","./css/styles.css","./js/app.js","./js/storage.js","./js/content.js","./js/sankey.js","./js/questions.js","./js/quiz.js","./data/sankey.json","./manifest.webmanifest","./assets/icon-192.png","./assets/icon-512.png"];
self.addEventListener("install",(e)=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));});
self.addEventListener("activate",(e)=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):null))));});
self.addEventListener("fetch",(e)=>{e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).catch(()=>cached)));});
