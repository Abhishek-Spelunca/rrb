const questions={
Maths:[
{q:"If 20% of a number is 60, what is the number?",o:["240","300","360","400"],a:1},
{q:"A train travels 120 km in 2 hours. Its average speed is:",o:["40 km/h","50 km/h","60 km/h","80 km/h"],a:2},
{q:"The ratio 24:36 in simplest form is:",o:["2:3","3:2","4:5","6:9"],a:0},
{q:"15% of 200 is:",o:["20","25","30","35"],a:2}],
Reasoning:[
{q:"Find the next number: 2, 4, 8, 16, ?",o:["20","24","30","32"],a:3},
{q:"If CAT is coded as DBU, DOG is coded as:",o:["EPH","EOG","FPH","DPH"],a:0},
{q:"Which is different?",o:["Square","Triangle","Circle","Cube"],a:3},
{q:"A is north of B. C is east of A. C is in which direction from B?",o:["North","East","North-East","South-East"],a:2}],
GA:[
{q:"Which is the largest planet in the Solar System?",o:["Earth","Jupiter","Saturn","Neptune"],a:1},
{q:"The Constitution of India came into force on:",o:["15 Aug 1947","26 Nov 1949","26 Jan 1950","2 Oct 1950"],a:2},
{q:"Which gas is most abundant in Earth's atmosphere?",o:["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],a:1},
{q:"The currency of Japan is:",o:["Won","Yuan","Yen","Ringgit"],a:2}]
};
let stats=JSON.parse(localStorage.getItem("ntpcStats")||'{"q":0,"correct":0,"tests":0}');
let active=[],idx=0,mode="practice",timer=null;
function save(){localStorage.setItem("ntpcStats",JSON.stringify(stats));renderStats()}
function renderStats(){qCount.textContent=stats.q;accuracy.textContent=stats.q?Math.round(stats.correct/stats.q*100)+"%":"—";testCount.textContent=stats.tests;targetText.textContent=Math.min(stats.q%21,20)+" / 20 completed";targetBar.style.width=Math.min(stats.q%21,20)/20*100+"%"}
function scrollToId(id){document.getElementById(id).scrollIntoView({behavior:"smooth"})}
function startPractice(subject){active=questions[subject];idx=0;mode="practice";showQuiz("quiz",subject)}
function showQuiz(id,title){const box=document.getElementById(id);box.classList.remove("hidden");renderQuestion(box,title);box.scrollIntoView({behavior:"smooth",block:"center"})}
function renderQuestion(box,title){let x=active[idx];box.innerHTML=`<p class="eyebrow">${title} • Question ${idx+1}/${active.length}</p><h3>${x.q}</h3>${x.o.map((v,i)=>`<button class="option" onclick="answer(${i})">${String.fromCharCode(65+i)}. ${v}</button>`).join("")}<div id="feedback"></div>`}
function answer(choice){let box=document.querySelector(".quiz:not(.hidden)");let x=active[idx];stats.q++;if(choice===x.a){stats.correct++;feedback.innerHTML="<p>✅ Correct!</p>"}else{feedback.innerHTML=`<p>❌ Incorrect. Correct answer: ${x.o[x.a]}</p>`}document.querySelectorAll(".option").forEach((b,i)=>{b.disabled=true;if(i===x.a)b.classList.add("correct");if(i===choice&&choice!==x.a)b.classList.add("wrong")});save();setTimeout(()=>{idx++;if(idx<active.length)renderQuestion(box,mode==="mock"?"Mock Test":"Practice");else{box.innerHTML="<h3>🎉 Section complete!</h3><p>Keep going. Your progress has been saved.</p>" }},700)}
function startMock(){active=[...questions.Maths,...questions.Reasoning,...questions.GA].sort(()=>Math.random()-.5).slice(0,10);idx=0;mode="mock";stats.tests++;save();showQuiz("mockBox","Mock Test");if(timer)clearInterval(timer);let end=Date.now()+600000;timer=setInterval(()=>{let left=Math.max(0,end-Date.now());let el=document.querySelector("#mockBox .eyebrow");if(el)el.textContent=`MOCK TEST • ${Math.ceil(left/1000)}s remaining`;if(!left)clearInterval(timer)},500)}
renderStats();
