const QUESTION_BANK={
grad:[
{q:"Quem costuma ser produtor primário em sistemas aquáticos?",a:["Peixes","Algas/perifíton","Macroinvertebrados","Sedimento"],correct:1,why:"Algas/perifíton fixam C via fotossíntese."},
{q:"Em anóxia no sedimento, qual gás pode aumentar?",a:["O₂","CH₄","He","N₂O sempre"],correct:1,why:"Metanogênese produz CH₄ em anóxia."},
{q:"Macroinvertebrados são bons bioindicadores porque…",a:["Integram condições do habitat","Voam longas distâncias","Ignoram oxigênio","Não dependem de substrato"],correct:0,why:"Respondem a oxigênio, substrato e matéria orgânica."},
{q:"Eutrofização tende a aumentar biomassa algal por…",a:["Menos nutrientes","Mais N e P","Menos luz sempre","Salinidade obrigatória"],correct:1,why:"N e P frequentemente limitam a produção."}
],
mestre:[
{q:"Cascata trófica plausível:",a:["Mais predadores→menos herbívoros→mais algas","Mais algas→menos luz→mais fotossíntese","Mais O₂→mais anóxia","Mais vento→menos troca gasosa"],correct:0,why:"Menos pastagem pode aumentar algas."},
{q:"Emissões de CO₂ tendem a aumentar quando:",a:["Fotossíntese>respiração","Respiração>fotossíntese","Não há carbono","Sempre"],correct:1,why:"Quando respiração/decomposição excedem fixação."},
{q:"Pulso de inundação pode mudar emissões porque:",a:["Muda conectividade/luz/nutrientes/oxigênio","Elimina a água","Zera matéria orgânica","Impede fotossíntese sempre"],correct:0,why:"Efeito depende do contexto."}
],
doutor:[
{q:"Hipótese mecanística ligando MO fina a CH₄:",a:["Oxigênio favorece metanogênese","Anóxia+substrato orgânico favorecem metanogênese","CH₄ vem só da atmosfera","CH₄ não depende de micróbios"],correct:1,why:"Metanogênese é microbiana e favorecida por anóxia."},
{q:"Desenho robusto para testar “peixes alteram emissões”:",a:["Só observacional","Mesocosmos com manipulação+réplicas+CO₂/CH₄","Uma foto","Só entrevistas"],correct:1,why:"Manipulação controlada fortalece inferência causal."}
],
posdoc:[
{q:"Maior armadilha em modelos integrados é:",a:["Ignorar incertezas e autocorrelação temporal","Usar dados","Incluir covariáveis","Testar hipóteses"],correct:0,why:"Séries temporais exigem tratar dependência e incerteza."},
{q:"Abordagem robusta para mudanças de regime:",a:["Média simples","Regressão segmentada/modelos não lineares + validação","Só boxplot","Só Pearson"],correct:1,why:"Tipping points pedem modelos apropriados e validação."}
]
};