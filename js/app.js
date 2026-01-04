window.App=(()=>{const tabs=Array.from(document.querySelectorAll(".tab"));
const panels={home:document.getElementById("tab-home"),teoria:document.getElementById("tab-teoria"),sankey:document.getElementById("tab-sankey"),quiz:document.getElementById("tab-quiz"),sobre:document.getElementById("tab-sobre")};
const helpModal=document.getElementById("helpModal"),btnHelp=document.getElementById("btnHelp"),helpClose=document.getElementById("helpClose");
const trailModal=document.getElementById("trailModal"),trailTitle=document.getElementById("trailTitle"),trailBody=document.getElementById("trailBody"),trailClose=document.getElementById("trailClose");
const nameInput=document.getElementById("nameInput"),btnSaveName=document.getElementById("btnSaveName"),btnReset=document.getElementById("btnReset");
const kpiName=document.getElementById("kpiName"),kpiLevel=document.getElementById("kpiLevel"),kpiBest=document.getElementById("kpiBest");
function showTab(key){tabs.forEach(t=>t.classList.toggle("active",t.dataset.tab===key));Object.entries(panels).forEach(([k,el])=>el.classList.toggle("active",k===key));window.scrollTo({top:0,behavior:"smooth"});}
function openModal(m){m.classList.remove("hidden");m.setAttribute("aria-hidden","false");}
function closeModal(m){m.classList.add("hidden");m.setAttribute("aria-hidden","true");}
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
function refreshKPIs(){const p=Storage.get("sci_profile",{name:"Visitante",best:0,bestLevel:"—"});kpiName.textContent=p.name||"Visitante";kpiBest.textContent=`${p.best||0}%`;kpiLevel.textContent=p.bestLevel||"—";}
async function init(){initTabs();initHelp();initTrails();initProfile();Quiz.init();await SankeyApp.init();}
return {init,refreshKPIs};})();
document.addEventListener("DOMContentLoaded",()=>window.App.init());