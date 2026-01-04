async function loadSankeyData(){const res=await fetch('data/sankey.json');return await res.json();}
function buildGraph(scenario,scale){const nodes=scenario.nodes.map(n=>({name:n}));const index=new Map(nodes.map((d,i)=>[d.name,i]));
const links=scenario.links.map(([s,t,v])=>({source:index.get(s),target:index.get(t),value:v*scale}));return {nodes,links};}
function renderSankey(svgEl,graph,showLabels=true){
const svg=d3.select(svgEl);svg.selectAll("*").remove();
const width=svgEl.clientWidth||900, height=520;svg.attr("viewBox",`0 0 ${width} ${height}`);
const sankey=d3.sankey().nodeWidth(18).nodePadding(14).extent([[18,20],[width-18,height-20]]);
const {nodes,links}=sankey({nodes:graph.nodes.map(d=>Object.assign({},d)),links:graph.links.map(d=>Object.assign({},d))});
svg.append("g").attr("fill","none").attr("stroke-opacity",0.35).selectAll("path").data(links).join("path")
  .attr("d",d3.sankeyLinkHorizontal()).attr("stroke","rgba(125,211,252,.75)").attr("stroke-width",d=>Math.max(1,d.width));
const node=svg.append("g").selectAll("g").data(nodes).join("g");
node.append("rect").attr("x",d=>d.x0).attr("y",d=>d.y0).attr("height",d=>d.y1-d.y0).attr("width",d=>d.x1-d.x0)
  .attr("rx",6).attr("fill","rgba(167,139,250,.35)").attr("stroke","rgba(255,255,255,.18)");
if(showLabels){
  node.append("text").attr("x",d=>d.x0<width/2?d.x1+8:d.x0-8).attr("y",d=>(d.y0+d.y1)/2).attr("dy","0.35em")
    .attr("text-anchor",d=>d.x0<width/2?"start":"end").attr("fill","rgba(233,238,252,.92)").attr("font-size",12).text(d=>d.name);
}}

function downloadText(filename, text, mime="text/plain"){
  const blob = new Blob([text], {type: mime});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function exportSankeyCSV(scenario, scale){
  const rows = ["source,target,value"];
  scenario.links.forEach(([s,t,v]) => rows.push(`${s},${t},${(v*scale).toFixed(4)}`));
  return rows.join("\n");
}

function exportSvgToPng(svgEl, filename="sankey.png"){
  const svg = svgEl.cloneNode(true);

  // inline minimal styles for readability
  const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
  style.textContent = `
    text { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }
  `;
  svg.insertBefore(style, svg.firstChild);

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);

  const canvas = document.createElement("canvas");
  const bbox = svgEl.getBoundingClientRect();
  const width = Math.max(900, Math.round(bbox.width));
  const height = 520;
  canvas.width = width * 2;   // retina-ish
  canvas.height = height * 2;
  const ctx = canvas.getContext("2d");
  ctx.scale(2,2);

  const img = new Image();
  const svgBlob = new Blob([svgString], {type:"image/svg+xml;charset=utf-8"});
  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    ctx.clearRect(0,0,width,height);
    // background
    ctx.fillStyle = "rgba(11,16,32,1)";
    ctx.fillRect(0,0,width,height);
    ctx.drawImage(img, 0, 0, width, height);
    URL.revokeObjectURL(url);

    canvas.toBlob((blob) => {
      const a = document.createElement("a");
      const pngUrl = URL.createObjectURL(blob);
      a.href = pngUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(pngUrl);
    }, "image/png");
  };
  img.onerror = () => {
    URL.revokeObjectURL(url);
    alert("Falha ao exportar PNG (bloqueio do navegador). Tente pelo GitHub Pages/servidor local.");
  };
  img.src = url;
}


const SankeyApp=(()=>{let data=null;async function init(){data=await loadSankeyData();
const scenarioSelect=document.getElementById("scenarioSelect");const flowScale=document.getElementById("flowScale");
const toggleLabels=document.getElementById("toggleLabels");const svgEl=document.getElementById("sankeySvg");
const btnPNG=document.getElementById("btnSankeyPNG");const btnCSV=document.getElementById("btnSankeyCSV");
function rerender(){const sc=scenarioSelect.value;const scale=parseFloat(flowScale.value);const showLabels=toggleLabels.value==="on";
const scenario=data.scenarios[sc]||data.scenarios.base;renderSankey(svgEl,buildGraph(scenario,scale),showLabels);}
scenarioSelect.addEventListener("change",rerender);flowScale.addEventListener("input",rerender);toggleLabels.addEventListener("change",rerender);
btnPNG?.addEventListener("click",()=>{
  const sc=scenarioSelect.value;const scale=parseFloat(flowScale.value);
  const scenario=data.scenarios[sc]||data.scenarios.base;
  exportSvgToPng(svgEl, `sankey-${sc}.png`);
});
btnCSV?.addEventListener("click",()=>{
  const sc=scenarioSelect.value;const scale=parseFloat(flowScale.value);
  const scenario=data.scenarios[sc]||data.scenarios.base;
  const csv=exportSankeyCSV(scenario, scale);
  downloadText(`sankey-${sc}.csv`, csv, "text/csv");
});
rerender();window.addEventListener("resize",rerender);}return {init};})();