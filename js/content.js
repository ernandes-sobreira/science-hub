const TRAILS={
base:{title:"Base: Quem é quem no ecossistema?",body: `
<p><b>Visão sistêmica do ecossistema aquático</b></p>

<p>Ecossistemas aquáticos funcionam como sistemas integrados nos quais processos físicos, químicos e biológicos estão profundamente interligados. A compreensão isolada de organismos ou compartimentos raramente é suficiente para explicar padrões ecológicos ou fluxos de matéria e energia. Em especial, o carbono atua como elemento central, conectando produtores primários, consumidores, decompositores e compartimentos ambientais como sedimento, coluna d’água e atmosfera.</p>

<p><b>Produtores primários: a base do sistema</b></p>

<p>Algas e perifíton são os principais produtores primários em ecossistemas aquáticos continentais. Por meio da fotossíntese, esses organismos convertem carbono inorgânico dissolvido (principalmente CO₂ e bicarbonato) em biomassa orgânica. Esse processo representa a principal porta de entrada do carbono na teia trófica aquática. A taxa de produção primária depende de fatores como disponibilidade de luz, nutrientes (nitrogênio e fósforo), temperatura da água e estabilidade hidrológica.</p>

<p>O carbono fixado pelas algas pode permanecer na biomassa viva, ser consumido por herbívoros, ser liberado como carbono orgânico dissolvido (DOC) ou sedimentar na forma de partículas (POC). Assim, mesmo processos aparentemente simples, como o crescimento algal, geram múltiplas rotas de transferência de carbono dentro do ecossistema.</p>

<p><b>Macroinvertebrados: conectores funcionais</b></p>

<p>Macroinvertebrados aquáticos ocupam um papel estratégico na integração entre produtores, sedimento e consumidores de níveis tróficos superiores. Dependendo de seus traços funcionais, podem atuar como raspadores de perifíton, fragmentadores de matéria orgânica particulada, coletores de detritos finos ou predadores. Ao se alimentarem, transformam carbono orgânico em biomassa animal e em respiração (CO₂).</p>

<p>Além disso, macroinvertebrados são altamente sensíveis a condições ambientais como oxigenação, tipo de substrato e qualidade da água. Por isso, são amplamente utilizados como bioindicadores. Mudanças na estrutura da comunidade de macroinvertebrados frequentemente refletem alterações nos fluxos de carbono, como aumento de matéria orgânica, eutrofização ou degradação do habitat.</p>

<p><b>Peixes: integradores espaciais e tróficos</b></p>

<p>Os peixes desempenham um papel integrador fundamental nos ecossistemas aquáticos. Eles conectam diferentes habitats (margens, fundo, superfície), redistribuem nutrientes por meio da excreção e influenciam indiretamente a produção primária e a decomposição. Predadores podem controlar populações de macroinvertebrados herbívoros, gerando cascatas tróficas que afetam a biomassa algal.</p>

<p>Além disso, a movimentação de peixes pode promover a bioturbação do sedimento, aumentando a ressuspensão de partículas e alterando a disponibilidade de carbono e nutrientes na coluna d’água. Esses processos têm implicações diretas nas emissões de gases de efeito estufa, especialmente CO₂ e CH₄.</p>

<p><b>Sedimento: reator biogeoquímico</b></p>

<p>O sedimento atua como um importante reservatório e processador de carbono. Matéria orgânica proveniente da produção primária aquática ou de aportes terrestres se acumula no fundo dos corpos d’água. Em condições oxigenadas, a decomposição ocorre principalmente por respiração aeróbia, liberando CO₂. Em condições anóxicas, predominam processos anaeróbios, incluindo a metanogênese, que resulta na produção de CH₄.</p>

<p>A dinâmica redox do sedimento é fortemente influenciada pela profundidade, temperatura, disponibilidade de oxigênio e atividade biológica. Pequenas mudanças nessas condições podem alterar significativamente o balanço entre produção e consumo de gases de efeito estufa.</p>

<p><b>Coluna d’água e atmosfera: trocas gasosas</b></p>

<p>O carbono processado no sedimento e na biota pode ser transferido para a coluna d’água na forma de CO₂ e CH₄ dissolvidos. A partir daí, ocorre a troca gasosa com a atmosfera, controlada por fatores físicos como vento, turbulência e gradientes de concentração. Corpos d’água podem atuar tanto como sumidouros quanto como fontes de carbono atmosférico, dependendo do balanço entre fotossíntese e respiração.</p>

<p><b>Integração dos processos</b></p>

<p>A compreensão do ecossistema aquático exige a integração de todos esses componentes. Alterações em um único elemento — como aumento de nutrientes, redução da vazão ou perda de biodiversidade — podem desencadear respostas em cascata que afetam a estrutura trófica, os fluxos de carbono e as emissões de gases de efeito estufa. Pensar de forma sistêmica é essencial para interpretar dados ecológicos, formular hipóteses e propor estratégias de manejo e conservação.</p>

<p class="muted small">Esta base teórica sustenta o uso de diagramas de fluxo, como Sankey, e a formulação de hipóteses testáveis em estudos ecológicos e biogeoquímicos.</p>
`
algas:{title:"Algas & nutrientes",body:`<p>Algas respondem a luz, N e P.</p><p>Mais algas pode aumentar POC/DOC, mas também hipóxia após decomposição.</p><p class="muted small">Balanço fotossíntese vs respiração manda nas emissões.</p>`},
macro:{title:"Macroinvertebrados",body:`<p>Integram oxigênio, substrato e matéria orgânica.</p><p>Traços funcionais ajudam a inferir rotas de carbono.</p>`},
peixes:{title:"Peixes como integradores",body:`<p>Conectam habitats, redistribuem nutrientes e podem bioturbar sedimento.</p><p class="muted small">Peixe → teia trófica → algas → O₂ → GEE.</p>`},
carbono:{title:"Carbono: sedimento → água → atmosfera",body:`<p>DOC/POC entram e saem via produção, detrito e aporte terrestre.</p><p>Anóxia favorece CH₄ no sedimento.</p><p>Troca gasosa depende de vento/turbulência.</p>`}
};
