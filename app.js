const topics=[
["🇮🇳","Constitution & Polity","Preamble, Articles, Rights, DPSP, Duties, Parliament, Courts, Bodies","★★★★★"],
["📚","Static GK","Capitals, currencies, rivers, dams, parks, symbols, firsts","★★★★★"],
["📜","Indian History","Ancient, Medieval, Modern India, freedom movement","★★★★☆"],
["🌍","Geography","India & world geography, rivers, soils, climate, resources","★★★★☆"],
["💰","Indian Economy","Banking, budget, taxation, inflation, institutions, basics","★★★★☆"],
["🔬","General Science","Physics, Chemistry, Biology and everyday science","★★★★★"],
["🚆","Railway GK","Zones, HQ, history, terminology and railway facts","★★★★☆"],
["🏆","Sports & Awards","Tournaments, trophies, awards, honours and records","★★★☆☆"],
["📖","Books & Authors","Important books, authors and literary awards","★★★☆☆"],
["📅","Important Days","National/international days and themes","★★★☆☆"],
["🏛️","Government Schemes","Major central schemes and their purposes","★★★★☆"],
["💻","Computer Awareness","Basics, internet, hardware, software, shortcuts","★★★☆☆"]
];
const qs=[
["Which Article deals with the Right to Constitutional Remedies?",["Article 14","Article 19","Article 21","Article 32"],3,"Article 32"],
["Who described Article 32 as the heart and soul of the Constitution?",["Jawaharlal Nehru","B. R. Ambedkar","Rajendra Prasad","Sardar Patel"],1,"Constitution"],
["The 42nd Constitutional Amendment is popularly known as:",["Mini Constitution","Basic Amendment","Federal Amendment","Rights Amendment"],0,"Constitution"],
["Which is the largest planet in the Solar System?",["Earth","Jupiter","Saturn","Neptune"],1,"Science"],
["Which gas is most abundant in Earth's atmosphere?",["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],1,"Science"],
["The first passenger railway in India ran between:",["Delhi–Agra","Mumbai–Thane","Kolkata–Howrah","Chennai–Arakkonam"],1,"Railway GK"],
["The currency of Japan is:",["Won","Yuan","Yen","Ringgit"],2,"Static GK"],
["The Constitution of India came into force on:",["15 August 1947","26 November 1949","26 January 1950","2 October 1950"],2,"Constitution"],
["Which is the longest river in India?",["Ganga","Godavari","Yamuna","Narmada"],0,"Geography"],
["Vitamin C deficiency causes:",["Rickets","Scurvy","Beriberi","Night blindness"],1,"Biology"]
];
let pos=0,stats=JSON.parse(localStorage.getItem("ntpcGKStats")||'{"q":0,"c":0}');
function save(){localStorage.setItem("ntpcGKStats",JSON.stringify(stats));renderStats()}
function renderStats(){document.getElementById("qDone").textContent=stats.q;document.getElementById("accuracy").textContent=stats.q?Math.round(stats.c/stats.q*100)+"%":"—"}
function go(id){document.getElementById(id).scrollIntoView({behavior:"smooth"})}
function filterTopics(){const term=document.getElementById("search").value.toLowerCase();renderTopics(term)}
function renderTopics(term=""){document.getElementById("topicGrid").innerHTML=topics.filter(x=>(x[1]+" "+x[2]).toLowerCase().includes(term)).map((x,i)=>`<article class="topic" onclick="topicInfo('${x[1]}')"><div class="ico">${x[0]}</div><div class="level">${x[3]}</div><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("")}
function topicInfo(name){alert(name+"\\n\\nThis topic is ready for notes, memory cards and practice questions.")}
function showMemory(){const cards=[["42nd Amendment","Often called the “Mini Constitution”.","Tip: 42 = many major changes."],["Article 32","Right to Constitutional Remedies.","Tip: 32 → remedies through courts."],["Fundamental Duties","Added by the 42nd Amendment.","Tip: Duties came in 1976."]];let x=cards[Math.floor(Math.random()*cards.length)];document.getElementById("memoryCard").innerHTML=`<span>🧠 MEMORY CARD</span><h3>${x[0]}</h3><p>${x[1]}</p><small>${x[2]}</small>`}
function startQuiz(){pos=0;renderQ();go("practice")}
function renderQ(){let q=qs[pos];document.getElementById("quiz").innerHTML=`<div class="eyebrow">QUESTION ${pos+1} / ${qs.length}</div><h3>${q[0]}</h3>${q[1].map((o,i)=>`<button class="option" onclick="answer(${i})">${String.fromCharCode(65+i)}. ${o}</button>`).join("")}<div id="fb"></div>`}
function answer(i){let q=qs[pos];stats.q++;let ok=i===q[3];if(ok)stats.c++;document.querySelectorAll(".option").forEach((b,n)=>{b.disabled=true;if(n===q[3])b.classList.add("correct");if(n===i&&!ok)b.classList.add("wrong")});document.getElementById("fb").innerHTML=`<p>${ok?"✅ Correct!":"❌ Incorrect."} <b>${q[1][q[3]]}</b><br><span class="muted">Topic: ${q[4]}</span></p>`;save();setTimeout(()=>{pos++;pos<qs.length?renderQ():document.getElementById("quiz").innerHTML="<h3>🎉 Quiz complete</h3><p>Your progress has been saved in this browser.</p>"},700)}
function toggleMode(){document.body.classList.toggle("dark");localStorage.setItem("dark",document.body.classList.contains("dark"))}
if(localStorage.getItem("dark")==="true")document.body.classList.add("dark");renderTopics();renderStats();
