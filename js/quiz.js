function shuffle(arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a;}
function computeLevel(p){if(p>=92)return "Pós-doc (alto desempenho)";if(p>=80)return "Doutorado";if(p>=65)return "Mestrado";if(p>=50)return "Graduando (forte)";return "Graduando (em construção)";}
function difficultyBonus(level){
  return ({grad:0,mestre:6,doutor:10,posdoc:14}[level] ?? 0);
}
function computePoints(pct, level, timerOn, elapsedMs, limitMs){
  let pts = pct + difficultyBonus(level);
  if(timerOn){
    pts += 4;
    const remaining = Math.max(0, (limitMs - elapsedMs));
    const frac = limitMs ? (remaining / limitMs) : 0;
    pts += Math.round(6 * frac); // up to +6 if very fast
  }
  return pts;
}
function computeBadge(points){
  if(points >= 100) return "Diamante";
  if(points >= 85) return "Platina";
  if(points >= 70) return "Ouro";
  if(points >= 55) return "Prata";
  return "Bronze";
}

function formatTime(ms){if(ms==null)return "—";const s=Math.round(ms/1000),m=Math.floor(s/60),r=s%60;return `${m}m ${String(r).padStart(2,'0')}s`;}
const Quiz=(()=>{let state={running:false,level:"grad",startedAt:null,timerOn:false,timerLimitMs:8*60*1000,questions:[],answers:{},reveal:false};
const el={};function init(){el.area=document.getElementById("quizArea");el.resultBox=document.getElementById("quizResult");el.btnReview=document.getElementById("btnReview");el.btnCopy=document.getElementById("btnCopyResult");el.btnStart=document.getElementById("btnStartQuiz");el.btnNew=document.getElementById("btnNewQuiz");
el.scorePct=document.getElementById("scorePct");el.scoreLevel=document.getElementById("scoreLevel");el.scoreTime=document.getElementById("scoreTime");el.resultText=document.getElementById("resultText");
el.btnStart.addEventListener("click",start);
el.btnReview.addEventListener("click",()=>{state.reveal=!state.reveal;render();el.btnReview.textContent=state.reveal?"Ocultar revisão":"Revisar respostas";});
el.btnCopy.addEventListener("click",copyResult);
el.btnNew.addEventListener("click",()=>{state.running=false;state.reveal=false;state.answers={};el.resultBox.classList.add("hidden");el.area.classList.add("hidden");el.btnReview.disabled=true;el.btnCopy.disabled=true;render();});
}
function start(){const level=document.getElementById("levelSelect").value;const count=parseInt(document.getElementById("questionCount").value,10);const timerMode=document.getElementById("timerMode").value;
const bank=QUESTION_BANK[level]||[];const pool=shuffle(bank);state.questions=pool.slice(0,Math.min(count,pool.length));state.level=level;state.startedAt=performance.now();state.running=true;state.timerOn=(timerMode==="on");state.answers={};state.reveal=false;
el.area.classList.remove("hidden");el.resultBox.classList.add("hidden");el.btnReview.disabled=true;el.btnCopy.disabled=true;render();
if(state.timerOn){const tick=()=>{if(!state.running)return;const e=performance.now()-state.startedAt;if(e>=state.timerLimitMs){finish();return;}requestAnimationFrame(tick);};requestAnimationFrame(tick);}
}
function choose(qIdx,cIdx){state.answers[qIdx]=cIdx;render();}
function finish(){state.running=false;const elapsed=performance.now()-state.startedAt;let correct=0;state.questions.forEach((qq,i)=>{if(state.answers[i]===qq.correct)correct++;});
const pct=state.questions.length?Math.round(100*correct/state.questions.length):0;const levelName=computeLevel(pct);const points=computePoints(pct,state.level,state.timerOn,elapsed,state.timerLimitMs);const badge=computeBadge(points);
const profile=Storage.get(\"sci_profile\",{name:\"Visitante\",bestPct:0,bestPoints:0,bestLevel:\"—\",badge:\"—\"});
if(points>(profile.bestPoints||0)){
  profile.bestPoints=points;
  profile.bestPct=pct;
  profile.bestLevel=levelName;
  profile.badge=badge;
  Storage.set(\"sci_profile\",profile);
}
el.scorePct.textContent=`${pct}%`;el.scoreLevel.textContent=levelName;el.scoreTime.textContent=formatTime(elapsed);
const name=(profile.name&&profile.name.trim())?profile.name.trim():"Visitante";
el.resultText.textContent=`${name}, seu desempenho foi ${pct}% (pontos: ${points}, badge: ${badge}) — nível: ${levelName}. Que Deus abençoe seu artigo.`;

// Ranking local (top 20)
const attempts = Storage.get("sci_ranking", []);
attempts.push({
  name,
  pct,
  points,
  badge,
  level: state.level,
  levelName,
  timerOn: state.timerOn,
  elapsedMs: elapsed,
  ts: Date.now()
});
attempts.sort((a,b)=> b.points - a.points || b.pct - a.pct || a.elapsedMs - b.elapsedMs);
Storage.set("sci_ranking", attempts.slice(0,20));

el.resultBox.classList.remove("hidden");el.btnReview.disabled=false;el.btnCopy.disabled=false;if(window.App)window.App.refreshKPIs();
}
function copyResult(){const text=`${el.resultText.textContent}\nAcerto: ${el.scorePct.textContent} | Nível: ${el.scoreLevel.textContent} | Tempo: ${el.scoreTime.textContent}`;
navigator.clipboard?.writeText(text).then(()=>{el.btnCopy.textContent="Copiado!";setTimeout(()=>el.btnCopy.textContent="Copiar resultado",900);}).catch(()=>alert("Não consegui copiar automaticamente. Selecione e copie manualmente."));
}
function render(){if(!state.running){el.area.innerHTML="";return;}
const name=Storage.get("sci_profile",{name:"Visitante"}).name||"Visitante";const elapsed=performance.now()-state.startedAt;const timeLeft=state.timerOn?Math.max(0,state.timerLimitMs-elapsed):null;
let html=`<div class="muted small">Participante: <b>${escapeHtml(name)}</b> • Questões: <b>${state.questions.length}</b>`;
if(state.timerOn){html+=` • Tempo restante: <b>${formatTime(timeLeft)}</b>`;}html+=`</div>`;
state.questions.forEach((qq,i)=>{html+=`<div class="question"><h4>${i+1}. ${escapeHtml(qq.q)}</h4><div class="choices">`;
qq.a.forEach((opt,cIdx)=>{const selected=state.answers[i]===cIdx;let cls="choice"+(selected?" selected":"");
if(state.reveal&&state.answers[i]!=null){if(cIdx===qq.correct)cls+=" correct";else if(selected&&cIdx!==qq.correct)cls+=" wrong";}
html+=`<div class="${cls}" data-q="${i}" data-c="${cIdx}">${escapeHtml(opt)}</div>`;});
html+=`</div>`;if(state.reveal&&state.answers[i]!=null){html+=`<div class="muted small" style="margin-top:8px;">${escapeHtml(qq.why||"")}</div>`;}html+=`</div>`;});
html+=`<div class="row"><button class="btn primary" id="btnFinishQuiz" type="button">Finalizar</button><button class="btn ghost" id="btnClearAnswers" type="button">Limpar respostas</button></div>`;
el.area.innerHTML=html;
el.area.querySelectorAll(".choice").forEach(node=>{node.addEventListener("click",()=>{const q=parseInt(node.getAttribute("data-q"),10);const c=parseInt(node.getAttribute("data-c"),10);choose(q,c);});});
document.getElementById("btnFinishQuiz").addEventListener("click",finish);
document.getElementById("btnClearAnswers").addEventListener("click",()=>{state.answers={};state.reveal=false;el.btnReview.textContent="Revisar respostas";render();});
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,(m)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
return {init};})();