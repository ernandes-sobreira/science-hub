window.App=(()=>{const tabs=Array.from(document.querySelectorAll(".tab"));
const panels={home:document.getElementById("tab-home"),teoria:document.getElementById("tab-teoria"),sankey:document.getElementById("tab-sankey"),quiz:document.getElementById("tab-quiz"),sobre:document.getElementById("tab-sobre")};
const helpModal=document.getElementById("helpModal"),btnHelp=document.getElementById("btnHelp"),helpClose=document.getElementById("helpClose");
const trailModal=document.getElementById("trailModal"),trailTitle=document.getElementById("trailTitle"),trailBody=document.getElementById("trailBody"),trailClose=document.getElementById("trailClose");
const nameInput=document.getElementById("nameInput"),btnSaveName=document.getElementById("btnSaveName"),btnReset=document.getElementById("btnReset");
const kpiName=document.getElementById("kpiName"),kpiBadge=document.getElementById("kpiBadge"),kpiBest=document.getElementById("kpiBest"),kpiRank=document.getElementById("kpiRank");
const btnShowRanking=document.getElementById("btnShowRanking");
const rankModal=document.getElementById("rankModal");
const rankClose=document.getElementById("rankClose");
const rankTable=document.getElementById("rankTable");
const btnClearRanking=document.getElementById("btnClearRanking");
function showTab(key){tabs.forEach(t=>t.classList.toggle("active",t.dataset.tab===key));Object.entries(panels).forEach(([k,el])=>el.classList.toggle("active",k===key));window.scrollTo({top:0,behavior:"smooth"});}
function openModal(m){m.classList.remove("hidden");m.setAttribute("aria-hidden","false");}
function closeModal(m){m.classList.add("hidden");m.setAttribute("aria-hidden","true");}

function renderRanking(){
  const rows = Storage.get("sci_ranking", []);
  if(!rows.length){
    rankTable.innerHTML = `<div class="muted">Sem tentativas ainda. Faça um quiz 🙂</div>`;
    return;
  }
  const header = `<div class="muted small" style="margin-bottom:10px;">Regra B: pontos = % + bônus de dificuldade + bônus de timer + bônus de rapidez.</div>`;
  let t = `<div style="overflow:auto;"><table style="width:100%; border-collapse:collapse; font-size:13px;">
    <thead>
      <tr>
        <th style="text-align:left; padding:8px; border-bottom:1px solid rgba(255,255,255,.12);">#</th>
        <th style="text-align:left; padding:8px; border-bottom:1px solid rgba(255,255,255,.12);">Nome</th>
        <th style="text-align:right; padding:8px; border-bottom:1px solid rgba(255,255,255,.12);">Pontos</th>
        <th style="text-align:right; padding:8px; border-bottom:1px solid rgba(255,255,255,.12);">%</th>
        <th style="text-align:left; padding:8px; border-bottom:1px solid rgba(255,255,255,.12);">Badge</th>
        <th style="text-align:left; padding:8px; border-bottom:1px solid rgba(255,255,255,.12);">Dificuldade</th>
        <th style="text-align:right; padding:8px; border-bottom:1px solid rgba(255,255,255,.12);">Tempo</th>
      </tr>
    </thead><tbody>`;
  const mapLevel = {grad:"Grad", mestre:"Mest", doutor:"Dout", posdoc:"Pós-doc"};
  rows.forEach((r,i)=>{
    const mins = Math.floor((r.elapsedMs||0)/60000);
    const secs = Math.floor(((r.elapsedMs||0)%60000)/1000);
    const time = `${mins}m ${String(secs).padStart(2,'0')}s` + (r.timerOn ? "" : " (sem)");
    t += `<tr>
      <td style="padding:8px; border-bottom:1px solid rgba(255,255,255,.08);">${i+1}</td>
      <td style="padding:8px; border-bottom:1px solid rgba(255,255,255,.08);">${(r.name||"").replace(/</g,"&lt;")}</td>
      <td style="padding:8px; border-bottom:1px solid rgba(255,255,255,.08); text-align:right;"><b>${r.points}</b></td>
      <td style="padding:8px; border-bottom:1px solid rgba(255,255,255,.08); text-align:right;">${r.pct}%</td>
      <td style="padding:8px; border-bottom:1px solid rgba(255,255,255,.08);">${r.badge||"—"}</td>
      <td style="padding:8px; border-bottom:1px solid rgba(255,255,255,.08);">${mapLevel[r.level]||r.level}</td>
      <td style="padding:8px; border-bottom:1px solid rgba(255,255,255,.08); text-align:right;">${time}</td>
    </tr>`;
  });
  t += `</tbody></table></div>`;
  rankTable.innerHTML = header + t;
}
function openTrail(k){const t=TRAILS[k];if(!t)return;trailTitle.textContent=t.title;trailBody.innerHTML=t.body;openModal(trailModal);}
function initTrails(){document.querySelectorAll("[data-open-trail]").forEach(b=>b.addEventListener("click",()=>openTrail(b.dataset.openTrail)));
trailClose.addEventListener("click",()=>closeModal(trailModal));trailModal.addEventListener("click",(e)=>{if(e.target===trailModal)closeModal(trailModal);});}
function initHelp(){btnHelp.addEventListener("click",()=>openModal(helpModal));helpClose.addEventListener("click",()=>closeModal(helpModal));
helpModal.addEventListener("click",(e)=>{if(e.target===helpModal)closeModal(helpModal);});}
function initTabs(){tabs.forEach(t=>t.addEventListener("click",()=>showTab(t.dataset.tab)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>showTab(b.dataset.go)));}
function initProfile(){const p=Storage.get("sci_profile",{name:"Visitante",best:0,bestLevel:"—"});nameInput.value=p.name||"";
btnSaveName.addEventListener("click",()=>{const p2=Storage.get("sci_profile",{name:"Visitante",best:0,bestLevel:"—"});p2.name=(nameInput.value||"").trim()||"Visitante";Storage.set("sci_profile",p2);refreshKPIs();});
btnReset.addEventListener("click",()=>{if(confirm("Tem certeza? Isso vai apagar seu progresso/localStorage deste app.")){Storage.del("sci_profile");location.reload();}});refreshKPIs();}
function refreshKPIs(){
  const p=Storage.get("sci_profile",{name:"Visitante",bestPct:0,bestPoints:0,bestLevel:"—",badge:"—"});
  kpiName.textContent=p.name||"Visitante";
  kpiBest.textContent=`${p.bestPct||0}%`;
  kpiBadge.textContent=p.badge||"—";
  const rows=Storage.get("sci_ranking",[]);
  // compute rank of bestPoints for this profile name (best among same name)
  let rank="—";
  if(rows.length){
    const name=(p.name||"Visitante").trim();
    const idx=rows.findIndex(r=>(r.name||"").trim()===name && r.points==p.bestPoints);
    rank = idx>=0 ? `#${idx+1}` : `#${rows.findIndex(r=>r.points===p.bestPoints)+1}`;
    if(rank==="#0") rank="—";
  }
  kpiRank.textContent=rank;
}
function initRanking(){
  btnShowRanking?.addEventListener("click",()=>{renderRanking();openModal(rankModal);});
  rankClose?.addEventListener("click",()=>closeModal(rankModal));
  rankModal?.addEventListener("click",(e)=>{if(e.target===rankModal)closeModal(rankModal);});
  btnClearRanking?.addEventListener("click",()=>{if(confirm("Limpar ranking local?")){Storage.del("sci_ranking");renderRanking();refreshKPIs();}});
}

async function init(){initTabs();initHelp();initTrails();initProfile();initRanking();Quiz.init();await SankeyApp.init();}
return {init,refreshKPIs};})();
document.addEventListener("DOMContentLoaded",()=>window.App.init());