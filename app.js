/* Le français en Irak – 1re année intermédiaire  |  علي الصفار .. دعم لبراعم العراق */
"use strict";
const SITE="https://alialsaffarmosuluniversity.github.io/french/";
const WA_NUM="9647740856155", WA_SHOW="0774 085 6155";
const $=s=>document.querySelector(s);
const app=$("#app"),bar=$("#bar");
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmt=n=>Number(n).toLocaleString("ar-IQ");
const isLat=s=>/[A-Za-zÀ-ÿŒœ]/.test(s)&&!/[؀-ۿ]/.test(s);
const LET=["أ","ب","ج","د"];
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const col=id=>`--c:var(--u${id});--cs:var(--u${id}s)`;
const U=id=>UNITS.find(u=>u.id===id);
const stripAcc=s=>s.normalize("NFD").replace(/[̀-ͯ]/g,"");
const norm=s=>stripAcc(String(s).toLowerCase().replace(/[’‘`´]/g,"'").replace(/œ/g,"oe").replace(/[^a-z0-9' ]/g," ").replace(/\s+/g," ").trim());
const fixApos=s=>String(s).replace(/'/g,"’");

/* نص عربي فيه كلمات فرنسية: نلفّ الفرنسي بـ span ليُعرض يسار-يمين صحيحاً */
const LATRUN=/[A-Za-zÀ-ÿŒœ0-9’'][A-Za-zÀ-ÿŒœ0-9’'\-]*(?:[ ,…!?.:;·\-+]+[A-Za-zÀ-ÿŒœ0-9’'][A-Za-zÀ-ÿŒœ0-9’'\-]*)*(?: ?[!?])?/g;
const bidi=s=>esc(s).replace(LATRUN,m=>`<span class="fr">${m}</span>`).replace(/\n/g,"<br>");

/* ───── الصوت (فرنسي طبيعي وبطيء) ───── */
const TTS=("speechSynthesis" in window)&&("SpeechSynthesisUtterance" in window);
let FRV=[],voice=null,srcMode=store.get("fr1-src","auto"),slow=store.get("fr1-slow",false),voiceName=store.get("fr1-voice",""),playToken=0,curAudio=null;
function voiceScore(v){let s=0;const n=v.name||"";
  if(/^fr[-_]FR/i.test(v.lang))s+=6;else if(/^fr[-_]CA/i.test(v.lang))s+=4;else if(/^fr/i.test(v.lang))s+=3;
  if(/natural|neural|online/i.test(n))s+=8;
  if(/google/i.test(n))s+=5;
  if(/denise|eloise|henri|vivienne|remy|brigitte|julie|paul|hortense/i.test(n))s+=4;
  if(/amélie|amelie|thomas|audrey|aurélie|aurelie|marie|siri/i.test(n))s+=4;
  if(/compact|espeak|festival/i.test(n))s-=6;
  if(!v.localService)s+=1;
  return s}
function loadVoices(){if(!TTS)return;
  FRV=speechSynthesis.getVoices().filter(v=>/^fr/i.test(v.lang)).sort((a,b)=>voiceScore(b)-voiceScore(a));
  voice=FRV.find(v=>v.name===voiceName)||FRV[0]||null}
if(TTS){loadVoices();speechSynthesis.onvoiceschanged=loadVoices}
const useOnline=()=>srcMode==="online"||(srcMode==="auto"&&(!TTS||!voice));
function cleanSay(t){
  return String(t).replace(/\s*\/\s*/g,". ").replace(/___/g,"…").replace(/→|←/g,"").replace(/’/g,"'")
   .replace(/\bM\. /g,"Monsieur ").replace(/\bMme\b/g,"Madame")
   .replace(/\b\d[\d ]{6,}\b/g,m=>m.replace(/\s+/g,"").split("").join(" "))
   .replace(/\s+/g," ").trim()}
function speak(text,opt={}){
  const t=cleanSay(text),isSlow=opt.slow!==undefined?opt.slow:slow;
  return new Promise(res=>{
    if(!t){res();return}
    try{
      if(!opt.queue)stopSpeak(true);
      if(useOnline()){
        const a=new Audio(`https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=fr&q=${encodeURIComponent(t)}${isSlow?"&ttsspeed=0.24":""}`);
        curAudio=a;a.onended=a.onerror=()=>res();a.play().catch(()=>res());return}
      if(!TTS){res();return}
      const u=new SpeechSynthesisUtterance(t);
      u.lang=(voice&&voice.lang)||"fr-FR";if(voice)u.voice=voice;
      u.rate=isSlow?0.5:0.92;u.pitch=opt.pitch||1;
      u.onend=u.onerror=()=>res();
      speechSynthesis.speak(u);
    }catch(e){res()}
  });
}
function stopSpeak(soft){if(!soft)playToken++;if(curAudio){try{curAudio.pause()}catch(e){}curAudio=null}if(TTS)try{speechSynthesis.cancel()}catch(e){}}
const canSpeak=()=>TTS||true;
const spkBtn=(t,cls="")=>`<button class="spk ${cls}" data-say="${esc(t)}" aria-label="استمع بصوت طبيعي" title="صوت طبيعي">🔊</button>`;
const slowBtn=(t,cls="")=>`<button class="spk slow ${cls}" data-say="${esc(t)}" data-slow="1" aria-label="استمع ببطء" title="نطق بطيء">🐢</button>`;
const bothBtn=t=>spkBtn(t)+slowBtn(t);
function bindSpeak(root){root.querySelectorAll("[data-say]").forEach(b=>{b.onclick=e=>{e.stopPropagation();const t=b.dataset.say;b.classList.add("playing");speak(t,b.dataset.slow?{slow:true}:{slow:b.dataset.fast?false:undefined}).then(()=>b.classList.remove("playing"))}})}
function bindTr(root){root.querySelectorAll(".trbtn:not([data-meaning])").forEach(b=>{const lab=b.textContent;b.onclick=()=>{const t=b.nextElementSibling;t.hidden=!t.hidden;b.textContent=t.hidden?lab:"🙈 إخفاء الترجمة"}})}
const trBlock=ar=>`<button class="trbtn">🌐 ترجمة</button><div class="tr" hidden>${bidi(ar)}</div>`;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
/* كلمة كلمة (للجمل) */
async function wordByWord(t,btn){stopSpeak();const tok=playToken;const ws=cleanSay(t).replace(/[?!.,…]/g,"").split(" ").filter(Boolean);
  for(const w of ws){if(tok!==playToken)break;await speak(w,{slow:true,queue:true});await sleep(300)}
  if(tok===playToken)await speak(t,{slow:true,queue:true})}

/* ───── التعرف على الصوت (تدريب النطق) ───── */
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
function lev(a,b){const m=a.length,n=b.length,d=Array.from({length:m+1},(_,i)=>[i,...Array(n).fill(0)]);for(let j=1;j<=n;j++)d[0][j]=j;
  for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n]}
function simil(a,b){a=norm(a);b=norm(b);if(!a&&!b)return 1;return 1-lev(a,b)/Math.max(a.length,b.length,1)}
function micTry(target,out,btn){
  if(!SR){out.innerHTML=`<div class="fb bad">متصفحك لا يدعم التعرف على الصوت. جرّب كروم على الأندرويد أو الحاسوب.</div>`;return}
  try{
    const r=new SR();r.lang="fr-FR";r.interimResults=false;r.maxAlternatives=3;
    btn.classList.add("playing");out.innerHTML=`<div class="fb">🎤 أنا أسمعك… انطق: <span class="fr"><b>${esc(target)}</b></span></div>`;
    r.onresult=e=>{let best=0,said="";for(const alt of e.results[0]){const s=simil(alt.transcript,target);if(s>best){best=s;said=alt.transcript}}
      const g=best>=.85?["good","ممتاز! نطقك صحيح 🌟"]:best>=.6?["good","جيد! قريب جداً، أعد المحاولة لتتقنها 👍"]:["bad","لم أفهمها جيداً، استمع للنطق ببطء ثم أعد المحاولة 🐢"];
      out.innerHTML=`<div class="fb ${g[0]}"><b>${g[1]}</b><br>سمعتُ: <span class="fr">${esc(said)}</span> · نسبة التطابق ${Math.round(best*100)}٪</div>`};
    r.onerror=e=>{out.innerHTML=`<div class="fb bad">${e.error==="not-allowed"?"اسمح للمتصفح باستعمال الميكروفون أولاً.":e.error==="no-speech"?"لم أسمع صوتاً. اقترب من الميكروفون وأعد المحاولة.":"تعذّر التعرف على الصوت (قد تحتاج إنترنت)."}</div>`;btn.classList.remove("playing")};
    r.onend=()=>btn.classList.remove("playing");
    r.start();
  }catch(e){out.innerHTML=`<div class="fb bad">تعذّر تشغيل الميكروفون.</div>`}
}

/* ───── الأعلام والأيقونات ───── */
const FLAGS={
 fr:'<rect width="10" height="20" fill="#0055A4"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#EF4135"/>',
 it:'<rect width="10" height="20" fill="#009246"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#CE2B37"/>',
 iq:'<rect width="30" height="6.7" fill="#CE1126"/><rect y="6.7" width="30" height="6.6" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#000"/><text x="15" y="12.2" font-size="4.4" text-anchor="middle" fill="#007A3D" font-family="serif" font-weight="700">الله أكبر</text>',
 jp:'<rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="5.5" fill="#BC002D"/>',
 ca:'<rect width="30" height="20" fill="#fff"/><rect width="7.5" height="20" fill="#D52B1E"/><rect x="22.5" width="7.5" height="20" fill="#D52B1E"/><polygon points="15,4 16.2,7 18.5,6.2 17.6,9.4 19.6,10.2 16.2,12.8 16.6,14.8 15.4,14.2 15.4,17 14.6,17 14.6,14.2 13.4,14.8 13.8,12.8 10.4,10.2 12.4,9.4 11.5,6.2 13.8,7" fill="#D52B1E"/>',
 dz:'<rect width="15" height="20" fill="#006233"/><rect x="15" width="15" height="20" fill="#fff"/><circle cx="15" cy="10" r="4.6" fill="#D21034"/><circle cx="16.1" cy="10" r="3.7" fill="#fff"/><polygon points="17.6,7.8 18.2,9.5 20,9.5 18.6,10.6 19.1,12.3 17.6,11.3 16.1,12.3 16.6,10.6 15.2,9.5 17,9.5" fill="#D21034"/>',
 lb:'<rect width="30" height="20" fill="#fff"/><rect width="30" height="5" fill="#ED1C24"/><rect y="15" width="30" height="5" fill="#ED1C24"/><polygon points="15,5.4 17.9,10.3 16.3,10.3 18.4,13.4 11.6,13.4 13.7,10.3 12.1,10.3" fill="#00A651"/><rect x="14.6" y="13.4" width=".8" height="1.4" fill="#6b4b2a"/>',
 de:'<rect width="30" height="6.7" fill="#000"/><rect y="6.7" width="30" height="6.6" fill="#DD0000"/><rect y="13.3" width="30" height="6.7" fill="#FFCE00"/>',
 be:'<rect width="10" height="20" fill="#000"/><rect x="10" width="10" height="20" fill="#FDDA24"/><rect x="20" width="10" height="20" fill="#EF3340"/>',
 ru:'<rect width="30" height="6.7" fill="#fff"/><rect y="6.7" width="30" height="6.6" fill="#0039A6"/><rect y="13.3" width="30" height="6.7" fill="#D52B1E"/>',
 ma:'<rect width="30" height="20" fill="#C1272D"/><polygon points="15,5.2 16.5,9.2 20.7,9.3 17.4,11.8 18.6,15.8 15,13.4 11.4,15.8 12.6,11.8 9.3,9.3 13.5,9.2" fill="none" stroke="#006233" stroke-width=".9"/>',
 tn:'<rect width="30" height="20" fill="#E70013"/><circle cx="15" cy="10" r="5.2" fill="#fff"/><circle cx="14.4" cy="10" r="3.8" fill="#E70013"/><circle cx="15.4" cy="10" r="3" fill="#fff"/><polygon points="16,8.6 16.5,9.6 17.6,9.7 16.8,10.4 17,11.5 16,10.9 15,11.5 15.2,10.4 14.4,9.7 15.5,9.6" fill="#E70013"/>',
 ar:'<rect width="30" height="20" fill="#74ACDF"/><rect y="6.7" width="30" height="6.6" fill="#fff"/><circle cx="15" cy="10" r="2.1" fill="#F6B40E"/>',
 in:'<rect width="30" height="6.7" fill="#FF9933"/><rect y="6.7" width="30" height="6.6" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#138808"/><circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" stroke-width=".7"/>',
 at:'<rect width="30" height="20" fill="#ED2939"/><rect y="6.7" width="30" height="6.6" fill="#fff"/>',
 pl:'<rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#DC143C"/>',
 ch:'<rect width="30" height="20" fill="#DA291C"/><rect x="13" y="4" width="4" height="12" fill="#fff"/><rect x="9" y="8" width="12" height="4" fill="#fff"/>'
};
function ico(i,big){
  if(!i)return"";
  if(i.startsWith("flag:"))return`<span class="ico${big?" big":""}"><svg viewBox="0 0 30 20" aria-hidden="true">${FLAGS[i.slice(5)]||""}</svg></span>`;
  if(i.startsWith("col:"))return`<span class="ico${big?" big":""}"><span class="swc" style="background:${i.slice(4)}"></span></span>`;
  if(i.startsWith("txt:"))return`<span class="ico txt${big?" big":""}">${esc(i.slice(4))}</span>`;
  return`<span class="ico${big?" big":""}">${i}</span>`;
}
const cinfo=id=>COUNTRIES.find(c=>c[6]===id);

/* ───── فهرس الكلمات ───── */
const WORDS=new Map();
const mkW=(it,g,ga,u)=>({fr:it[0],ar:it[1],pr:it[2]||"",ic:it[3]||"",nt:it[4]||"",say:it[5]||"",g,ga,u});
UNITS.forEach(u=>{
  u.vocab=[];const seen=new Set();
  const push=w=>{const k=w.fr.toLowerCase();if(seen.has(k))return;seen.add(k);u.vocab.push(w);if(!WORDS.has(k))WORDS.set(k,w)};
  u.blocks.forEach(b=>{
    if(b.k==="v")b.items.forEach(it=>push(mkW(it,b.g,b.ga,u.id)));
    else if(b.k==="nat")b.ids.forEach(id=>{const c=cinfo(id);if(!c)return;
      push(mkW([c[0],c[7],c[3],"flag:"+id,""],"Les pays","البلدان",u.id));
      const same=c[1]===c[2];
      push({fr:same?c[1]:`${c[1]} / ${c[2]}`,ar:same?`${c[8]} / ${c[9]}`:`${c[8]} / ${c[9]}`,pr:same?c[4]:`${c[4]} / ${c[5]}`,ic:"flag:"+id,nt:same?"المذكر والمؤنث بالشكل نفسه":"",say:same?c[1]:`${c[1]}. ${c[2]}`,g:"Les nationalités",ga:"الجنسيات",u:u.id})});
    else if(b.k==="nums")NUMS.filter(n=>n[0]>=b.from&&n[0]<=b.to).forEach(n=>push({fr:n[1],ar:String(n[0]),pr:n[2],ic:"txt:"+n[0],nt:"",say:"",g:"Les nombres",ga:"الأرقام",u:u.id}));
  });
});
const ALL={id:0,rev:[1,2,3,4],fr:"Toutes les unités",ar:"كل الوحدات",emoji:"🏆",no:"",vocab:[],blocks:[],ex:[],qs:[]};
const srcUnits=u=>u.id===0?ALL.rev.map(U):[u];
const vocabOf=u=>srcUnits(u).flatMap(s=>s.vocab);
const wk=fr=>WORDS.get(fr.toLowerCase());
const sayOf=w=>w.say||w.fr;
const dlOf=u=>srcUnits(u).flatMap(s=>Object.values(s.dl));
const sentencesOf=u=>{const out=[];const seen=new Set();dlOf(u).forEach(d=>d.lines.forEach(l=>{const t=l[1];if(!seen.has(t)){seen.add(t);out.push([t,l[2]])}}));return out};
const shortSent=u=>sentencesOf(u).filter(([t])=>{const n=t.split(" ").length;return n>=3&&n<=9&&!/\d{3}/.test(t)});

/* ───── الحالة ───── */
let best=store.get("fr1-best",{}),hardSet=store.get("fr1-hard",{}),exBest=store.get("fr1-ex",{}),chk=store.get("fr1-chk",{}),autoSpeak=store.get("fr1-auto",true);
const saveBest=()=>store.set("fr1-best",best),saveHard=()=>store.set("fr1-hard",hardSet);
const starsOf=p=>p>=.9?3:p>=.7?2:p>=.5?1:0;
const starRow=n=>[0,1,2].map(i=>`<span class="${i<n?"on":"off"}">★</span>`).join("");
const totalStars=()=>UNITS.reduce((s,u)=>s+(best[u.id]||0),0);
const hardCount=()=>Object.keys(hardSet).filter(k=>WORDS.has(k)).length;
function toggleHard(fr){const k=fr.toLowerCase();if(hardSet[k])delete hardSet[k];else hardSet[k]=1;saveHard();return !!hardSet[k]}
function addHard(fr){if(!fr)return;const k=fr.toLowerCase();if(WORDS.has(k)&&!hardSet[k]){hardSet[k]=1;saveHard()}}

/* ───── الثيم والتثبيت والعداد ───── */
const isDark=()=>{const t=document.documentElement.dataset.theme;return t==="dark"};
function setTheme(t){document.documentElement.dataset.theme=t;store.set("fr1-theme",t)}
{const t=store.get("fr1-theme",null);if(t)document.documentElement.dataset.theme=t}
let deferredPrompt=null;
const isStandalone=()=>matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
const onSite=()=>location.hostname.endsWith("github.io");
addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e});
addEventListener("appinstalled",()=>{deferredPrompt=null;document.querySelectorAll(".needinstall").forEach(el=>el.hidden=true)});
try{if("serviceWorker" in navigator&&onSite())navigator.serviceWorker.register("sw.js").catch(()=>{})}catch(e){}
function device(){const ua=navigator.userAgent;
  if(/iPhone|iPad|iPod/.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1))return"ios";
  if(/Android/.test(ua))return"android";
  if(/Macintosh/.test(ua)&&/Safari/.test(ua)&&!/Chrome|Edg|Firefox/.test(ua))return"mac";
  return"desktop"}
const STEPS={
 ios:["آيفون وآيباد",["افتح رابط التطبيق في متصفح سفاري.","اضغط زر المشاركة (مربع يخرج منه سهم).<span class='en'>Share</span>","اختر «إضافة إلى الشاشة الرئيسية».<span class='en'>Add to Home Screen</span>","اضغط «إضافة».<span class='en'>Add</span>"]],
 android:["أندرويد",["افتح رابط التطبيق في متصفح كروم.","اضغط النقاط الثلاث أعلى الشاشة.","اختر «تثبيت التطبيق».<span class='en'>Install app</span>","اضغط «تثبيت».<span class='en'>Install</span>"]],
 desktop:["حاسوب ويندوز أو لينكس",["افتح الرابط في متصفح كروم أو إيدج.","اضغط أيقونة التثبيت في نهاية شريط العنوان.","اضغط «تثبيت».<span class='en'>Install</span>"]],
 mac:["حاسوب ماك",["افتح الرابط في متصفح سفاري.","من قائمة «ملف» اختر «إضافة إلى Dock».<span class='en'>File › Add to Dock</span>"]]};
function sheet(html,label){
  const box=document.createElement("div");box.className="sheet";box.setAttribute("role","dialog");box.setAttribute("aria-label",label);
  box.innerHTML=`<div class="sheet-in">${html}</div>`;
  box.onclick=e=>{if(e.target===box)box.remove()};document.body.appendChild(box);
  const c=box.querySelector("[data-close]");if(c){c.onclick=()=>box.remove();c.focus()}return box}
function copyText(t,btn){const done=()=>{if(btn)btn.textContent="تم النسخ ✓"};
  try{navigator.clipboard.writeText(t).then(done,()=>{})}catch(e){}}
function installHelp(){
  const d=device(),order=[d,...Object.keys(STEPS).filter(k=>k!==d)];
  const list=k=>`<ol class="steps">${STEPS[k][1].map(x=>`<li>${x}</li>`).join("")}</ol>`;
  const box=sheet(`<h3>📲 تنزيل التطبيق على جهازك</h3>
   ${onSite()?"":`<p style="margin:0">افتح هذا الرابط أولاً ثم ثبّت التطبيق منه:</p><div class="siteurl">${SITE}</div><div class="row"><a class="btn" href="${SITE}" target="_blank" rel="noopener">افتح التطبيق</a><button class="btn ghost" id="cpy">نسخ الرابط</button></div>`}
   <p style="margin:0;font-family:var(--display);font-weight:700">خطوات ${STEPS[d][0]}:</p>${list(d)}
   ${order.slice(1).map(k=>`<details><summary>${STEPS[k][0]}</summary>${list(k)}</details>`).join("")}
   <p style="margin:0;color:var(--muted);font-size:.95rem">بعد التثبيت يظهر التطبيق بأيقونته بين تطبيقاتك ويعمل دون إنترنت. يعمل على الهاتف والآيباد والحاسوب.</p>
   <button class="btn" data-close>حسناً</button>`,"تنزيل التطبيق");
  const c=box.querySelector("#cpy");if(c)c.onclick=()=>copyText(SITE,c);
}
function install(){if(deferredPrompt){deferredPrompt.prompt();deferredPrompt.userChoice.finally(()=>{deferredPrompt=null});return}installHelp()}
function invite(){
  const text="🎉 تطبيق «اللغة الفرنسية – الأول المتوسط» (Le français en Irak): شرح مفصل، نطق طبيعي وبطيء، بطاقات، تمارين، اختبارات وألعاب. مجاني، من علي الصفار .. دعم لبراعم العراق:";
  if(navigator.share){navigator.share({title:"الفرنسية – الأول المتوسط",text,url:SITE}).catch(()=>{});return}
  const enc=encodeURIComponent;
  const box=sheet(`<h3>💌 ادعُ أصدقاءك</h3><p style="margin:0">شارك التطبيق مع زملائك ليتعلموا الفرنسية معك.</p>
   <div class="sharegrid">
    <a class="cbtn wa" href="https://wa.me/?text=${enc(text+" "+SITE)}" target="_blank" rel="noopener">💬 واتساب</a>
    <a class="cbtn" style="background:#229ED9" href="https://t.me/share/url?url=${enc(SITE)}&text=${enc(text)}" target="_blank" rel="noopener">✈️ تيليغرام</a>
    <a class="cbtn fb" href="https://www.facebook.com/sharer/sharer.php?u=${enc(SITE)}" target="_blank" rel="noopener">👍 فيسبوك</a>
    <button class="cbtn tel" id="cpy">🔗 نسخ الرابط</button></div>
   <div class="siteurl">${SITE}</div><button class="btn ghost" data-close>إغلاق</button>`,"دعوة الأصدقاء");
  box.querySelector("#cpy").onclick=e=>copyText(SITE,e.currentTarget);
}
const LCLOGO=`<svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="16" fill="#1E3A8A"/><text x="32" y="43" font-size="34" text-anchor="middle">🌱</text></svg>`;
function about(){
  sheet(`<div class="lc">${LCLOGO}<div><h3>علي الصفار</h3><div style="color:var(--muted);font-size:.95rem">دعم لبراعم العراق</div></div></div>
   <p style="margin:0">صمّم هذا التطبيق <b>علي الصفار</b> من الموصل، العراق، دعماً لطلبتنا، ليتعلم تلاميذ الصف الأول المتوسط الفرنسية من كتاب «Le français en Irak» بطريقة ممتعة، بشرح مفصل ونطق طبيعي وبطيء.</p>
   <p style="margin:0"><b>نصنع لك تطبيقاً مشابهاً</b> لمدرستك أو مادتك أو مشروعك: تطبيقات تعليمية، أنظمة مدارس، مواقع، وبحوث أكاديمية.</p>
   <div class="contact">
    <a class="cbtn wa" href="https://wa.me/${WA_NUM}" target="_blank" rel="noopener">💬 تواصل عبر واتساب<small>${WA_SHOW}</small></a></div>
   <button class="btn ghost" data-close>إغلاق</button>`,"من نحن");
}
const CNT="https://abacus.jasoncameron.dev",NS="alialsaffarmosuluniversity-french";let stats=null;
function flag(st,k){try{if(st.getItem(k))return true;st.setItem(k,"1")}catch(e){}return false}
async function loadStats(){
  if(!onSite())return;
  try{const nv=!flag(localStorage,"fr1-visitor"),no=!flag(sessionStorage,"fr1-visit");
   const get=async(key,hit)=>{const r=await fetch(`${CNT}/${hit?"hit":"get"}/${NS}/${key}`);if(!r.ok)throw 0;return(await r.json()).value};
   const[v,o]=await Promise.all([get("visitors",nv),get("visits",no)]);stats={v,o};paintStats()}catch(e){}}
function paintStats(){const el=$("#visits");if(!el||!stats)return;
  el.innerHTML=`<span class="vchip">👥 عدد الزوار <b>${fmt(stats.v)}</b></span><span class="vchip">👁️ مرات الفتح <b>${fmt(stats.o)}</b></span>`;el.hidden=false}
function confetti(){for(let i=0;i<26;i++){const s=document.createElement("span");s.className="conf";s.textContent=["🎉","⭐","✨","🎈","🌟","🇫🇷"][i%6];s.style.left=Math.random()*100+"vw";s.style.animationDelay=Math.random()*.6+"s";document.body.appendChild(s);setTimeout(()=>s.remove(),3400)}}

/* ───── الشريط العلوي والتنقل ───── */
const LOGO=`<svg class="logo" viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="13" fill="#1E3A8A"/><rect x="9" y="12" width="10" height="24" fill="#fff" opacity=".95"/><rect x="19" y="12" width="10" height="24" fill="#fff"/><rect x="29" y="12" width="10" height="24" fill="#EF4135"/><rect x="9" y="12" width="10" height="24" fill="#0055A4" opacity=".0"/><text x="24" y="31" font-size="14" text-anchor="middle" font-family="serif" font-weight="700" fill="#1E3A8A">Fr</text></svg>`;
let navDepth=0;
function topBar(back){
  bar.innerHTML=(back?`<button class="back" id="bk" aria-label="رجوع">→ رجوع</button>`:LOGO)+
   `<h1>Le français en Irak<small>اللغة الفرنسية · الأول المتوسط</small></h1>
    ${isStandalone()?"":`<button class="iconbtn needinstall" id="ins" aria-label="تنزيل التطبيق">📲</button>`}
    <button class="iconbtn" id="thm" aria-label="الوضع الليلي أو النهاري">${isDark()?"☀️":"🌙"}</button>
    <span class="starpill" title="مجموع النجوم"><b>★</b> ${totalStars()}/${UNITS.length*3}</span>`;
  if(back){$("#bk").onclick=()=>{stopSpeak();back()};if(!navDepth){try{history.pushState({fr1:1},"");navDepth=1}catch(e){}}}else navDepth=0;
  const ib=$("#ins");if(ib)ib.onclick=install;
  $("#thm").onclick=()=>{setTheme(isDark()?"light":"dark");topBar(back)};
}
addEventListener("popstate",()=>{if(navDepth){navDepth=0;stopSpeak();document.querySelectorAll(".sheet").forEach(s=>s.remove());home()}});
/* ───── الصفحة الرئيسية ───── */
function home(){
  stopSpeak();topBar(null);app.removeAttribute("style");
  const t=totalStars(),max=UNITS.length*3;
  const msg=t===0?"اختر وحدة، تعلّم، استمع بنطق طبيعي وبطيء، ثم اختبر نفسك واجمع النجوم.":t<max/2?"بداية رائعة! استمر في جمع النجوم.":t<max?"أنت قريب من القمة، يا بطل!":"أكملت كل الوحدات، أنت بطل الفرنسية!";
  let h=`<section class="hello pop"><div class="big">🇫🇷</div><div style="flex:1;min-width:0"><h2>Bonjour ! أهلاً بك</h2><p>${msg}</p><div class="meter"><i style="width:${t/max*100}%"></i></div></div></section>
  <div class="quick">
   <button class="qk" id="qCards"><span>🃏</span>بطاقات<small>كل الكلمات</small></button>
   <button class="qk" id="qHard"><span>⭐</span>كلماتي الصعبة<small>${hardCount()} كلمة</small></button>
   <button class="qk" id="qListen"><span>🎧</span>استماع ونطق<small>كل الوحدات</small></button></div>
  <button class="guidebtn" id="qGuide"><span class="em">🔤</span><span><h3>دليل النطق والأصوات</h3><p>الأبجدية، الحروف الصامتة، الـ accents، أصوات ou / oi / ch / an …</p></span><span class="go">افتح</span></button>
  <section class="units">`;
  UNITS.forEach(u=>{h+=`<button class="u" data-id="${u.id}" style="${col(u.id)}"><span class="em">${u.emoji}</span><span class="tx"><span class="no">${u.no}</span><h3>${esc(u.fr)}</h3><span class="ar">${u.ar}</span><span class="stars">${starRow(best[u.id]||0)}</span></span></button>`});
  h+=`</section><button class="challenge" id="chal"><span class="em">🏆</span><span><h3>تحدي البطل</h3><p>اختبار من كل الكتاب، وأنت تحدد عدد الأسئلة</p></span><span class="go">ابدأ</span></button>
  <div class="actions"><button class="act" id="aInv"><span>💌</span>دعوة الأصدقاء</button><button class="act needinstall" id="aIns"><span>📲</span>تنزيل التطبيق</button><button class="act" id="aAbout"><span>ℹ️</span>من نحن</button></div>
  <div class="visits" id="visits" hidden></div>
  <p class="foot">مبني على كتاب «Le français en Irak» وكراس الأنشطة للصف الأول المتوسط<br>تصميم وتطوير: علي الصفار .. دعم لبراعم العراق</p>`;
  app.innerHTML=h;
  app.querySelectorAll(".u").forEach(b=>b.onclick=()=>unit(+b.dataset.id,"learn"));
  $("#chal").onclick=challenge;$("#aInv").onclick=invite;$("#aAbout").onclick=about;
  const ai=$("#aIns");if(isStandalone())ai.hidden=true;else ai.onclick=install;
  $("#qCards").onclick=()=>globalPane("cards");$("#qHard").onclick=()=>globalPane("hard");$("#qListen").onclick=()=>globalPane("listen");$("#qGuide").onclick=guide;
  paintStats();scrollTo(0,0);
}
const pane=()=>$("#pane");
function globalPane(kind){
  topBar(home);app.setAttribute("style","--c:var(--btn);--cs:var(--btn-soft)");
  const title={cards:"🃏 بطاقات كل الكلمات",hard:"⭐ كلماتي الصعبة",listen:"🎧 استماع ونطق"}[kind];
  app.innerHTML=`<section class="hero" style="background:var(--btn)"><span class="em">${kind==="cards"?"🃏":kind==="hard"?"⭐":"🎧"}</span><div><h2 style="direction:rtl;font-family:var(--display)">${title}</h2></div></section><div id="pane"></div>`;
  if(kind==="cards")cards(ALL);else if(kind==="hard")myHard();else listenTab(ALL);
  scrollTo(0,0);
}

/* ───── صفحة الوحدة ───── */
const TABS=[["learn","📖","الدروس"],["cards","🃏","البطاقات"],["listen","🎧","استماع ونطق"],["ex","📝","تمارين الكتاب"],["hard","⭐","كلمات صعبة"],["quiz","✏️","اختبار"],["games","🎮","ألعاب"]];
function unit(id,tab){
  stopSpeak();const u=U(id);topBar(home);app.setAttribute("style",col(id));
  app.innerHTML=`<section class="hero"><span class="em">${u.emoji}</span><div><div class="no">${u.no}</div><h2>${esc(u.fr)}</h2><div>${u.ar}</div></div></section>
  <div class="tabs" role="tablist">${TABS.map(t=>`<button class="tab" role="tab" data-t="${t[0]}"><span>${t[1]}</span>${t[2]}</button>`).join("")}</div><div id="pane"></div>`;
  const set=t=>{stopSpeak();app.querySelectorAll(".tab").forEach(b=>b.setAttribute("aria-selected",b.dataset.t===t));
    ({learn,cards,listen:listenTab,ex:exTab,hard:hardTab,quiz:quizSetup,games:gamesTab})[t](u);};
  app.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{set(b.dataset.t);scrollTo({top:0})});
  set(tab);scrollTo(0,0);
}

/* ───── الدروس ───── */
function wordRow(w,star){const k=w.fr.toLowerCase();
  return`<div class="wcard">${w.ic?ico(w.ic):""}<div class="wm"><div class="wfr fr">${esc(w.fr)}</div><div class="war">${bidi(w.ar)}</div>${w.pr?`<div class="wpr">🗣️ ${esc(w.pr)}</div>`:""}${w.nt?`<div class="wnt">💡 ${bidi(w.nt)}</div>`:""}</div>
  <div class="wbt">${bothBtn(sayOf(w))}${star?`<button class="star ${hardSet[k]?"on":""}" data-star="${esc(k)}" aria-label="كلمة صعبة">★</button>`:""}</div></div>`}
function dialogCard(d,key){
  const roles=[...new Set(d.lines.map(l=>l[0]).filter(Boolean))];
  return`<section class="card dlg" data-dk="${key}"><h3>💬 ${esc(d.t)}</h3><p style="margin:0">${bidi(d.ar)}</p>
  <div class="dlines">${d.lines.map((l,i)=>`<div class="dl" data-i="${i}">${l[0]?`<span class="who">${esc(l[0])}</span>`:""}<div class="dbody"><div class="entx">${esc(l[1])}</div><div class="dbt">${bothBtn(l[1])}<button class="spk slow" data-wbw="${esc(l[1])}" title="كلمة كلمة" aria-label="كلمة كلمة">🔤</button></div>${trBlock(l[2])}</div></div>`).join("")}</div>
  <div class="row"><button class="btn sm" data-dplay>▶ استمع للحوار</button><button class="btn sm ghost" data-dplay="slow">🐢 ببطء</button><button class="btn sm ghost" data-dstop>⏹ إيقاف</button></div>
  ${roles.length>=2?`<div class="roles"><b>🎭 مثّل الحوار مع التطبيق، اختر دورك:</b><div class="row">${roles.map(r=>`<button class="btn sm ghost" data-role="${esc(r)}">${esc(r)}</button>`).join("")}</div><div class="rstat" hidden></div></div>`:""}
  </section>`}
function bindDialogs(root){
  root.querySelectorAll(".dlg").forEach(card=>{
    const key=card.dataset.dk,d=card._d||findDialog(key);const lines=[...card.querySelectorAll(".dl")];
    const roles=[...new Set(d.lines.map(l=>l[0]).filter(Boolean))];
    const hl=i=>lines.forEach((x,j)=>x.classList.toggle("hl",j===i));
    const pitchOf=w=>1+((roles.indexOf(w)%3)-1)*.12;
    card.querySelectorAll("[data-dplay]").forEach(b=>b.onclick=async()=>{stopSpeak();const tok=playToken;const sl=b.dataset.dplay==="slow"?true:undefined;
      for(let i=0;i<d.lines.length;i++){if(tok!==playToken)break;hl(i);await speak(d.lines[i][1],{slow:sl,pitch:pitchOf(d.lines[i][0]),queue:true});await sleep(350)}hl(-1)});
    card.querySelector("[data-dstop]").onclick=()=>{stopSpeak();hl(-1);const st=card.querySelector(".rstat");if(st)st.hidden=true};
    card.querySelectorAll("[data-wbw]").forEach(b=>b.onclick=()=>wordByWord(b.dataset.wbw));
    card.querySelectorAll("[data-role]").forEach(b=>b.onclick=async()=>{
      stopSpeak();const tok=playToken,me=b.dataset.role,st=card.querySelector(".rstat");st.hidden=false;
      for(let i=0;i<d.lines.length;i++){if(tok!==playToken)return;const l=d.lines[i];hl(i);
        if(l[0]===me){
          st.innerHTML=`<div class="fb good">🎤 دورك الآن! اقرأ السطر المظلّل بصوت عالٍ.<div class="row" style="margin-top:8px"><button class="btn sm" id="rnext">التالي ←</button><button class="btn sm ghost" id="rhear">🔊 اسمع النطق الصحيح</button>${SR?`<button class="btn sm ghost" id="rmic">🎙️ تحقق من نطقي</button>`:""}</div><div id="rout"></div></div>`;
          await new Promise(res=>{$("#rnext").onclick=()=>res();$("#rhear").onclick=()=>speak(l[1],{slow:true});const m=$("#rmic");if(m)m.onclick=()=>micTry(l[1],$("#rout"),m)});
          stopSpeak();
        }else{st.innerHTML=`<div class="fb">🔊 يتحدث: <b>${esc(l[0]||"…")}</b></div>`;await speak(l[1],{pitch:pitchOf(l[0]),queue:true});await sleep(250)}
      }
      hl(-1);st.innerHTML=`<div class="fb good"><b>أحسنت! أكملتَ الحوار 🎉</b> أعد المحاولة بدور آخر.</div>`;
    });
  });
}
function findDialog(key){const[uid,id]=key.split(":");return U(+uid).dl[id]}
function alphaGrid(){return`<div class="alpha">${ALPHA.map(a=>`<div class="al"><button class="al-l" data-say="${esc(a[1])}"><b class="fr">${a[0]}</b><span class="alp">${a[2]}</span></button><button class="al-e" data-say="${esc(a[3])}"><span class="fr">${esc(a[3])}</span><small>${a[4]}</small></button></div>`).join("")}</div>
  <div class="row c"><button class="btn sm" id="alAll">▶ ردّد الأبجدية كاملة</button><button class="btn sm ghost" id="alSlow">🐢 ببطء</button><button class="btn sm ghost" id="alStop">⏹ إيقاف</button></div>`}
function bindAlpha(root){const a=root.querySelector("#alAll");if(!a)return;
  const run=async s=>{stopSpeak();const tok=playToken;const tiles=[...root.querySelectorAll(".al")];for(let i=0;i<ALPHA.length;i++){if(tok!==playToken)break;tiles.forEach((t,j)=>t.classList.toggle("hl",j===i));await speak(ALPHA[i][1],{slow:s,queue:true});await sleep(s?600:350)}tiles.forEach(t=>t.classList.remove("hl"))};
  a.onclick=()=>run(false);root.querySelector("#alSlow").onclick=()=>run(true);root.querySelector("#alStop").onclick=()=>{stopSpeak();root.querySelectorAll(".al").forEach(t=>t.classList.remove("hl"))}}
function numGrid(from,to){const L=NUMS.filter(n=>n[0]>=from&&n[0]<=to);
  return`<div class="numgrid">${L.map(n=>`<button class="nb" data-say="${esc(n[1])}"><b>${n[0]}</b><span class="fr">${n[1]}</span><small>${n[2]}</small></button>`).join("")}</div>
  <div class="row c"><button class="btn sm" data-ncount="${from}-${to}">▶ عدّ من ${from} إلى ${to}</button><button class="btn sm ghost" data-ncount="${from}-${to}-s">🐢 ببطء</button><button class="btn sm ghost" data-nstop>⏹ إيقاف</button></div>`}
function bindNums(root){root.querySelectorAll("[data-ncount]").forEach(b=>b.onclick=async()=>{const[f,t,s]=b.dataset.ncount.split("-");stopSpeak();const tok=playToken;
  const tiles=[...b.closest(".card,.sec").querySelectorAll(".nb")];
  for(const n of NUMS.filter(n=>n[0]>=+f&&n[0]<=+t)){if(tok!==playToken)break;tiles.forEach(x=>x.classList.toggle("hl",x.querySelector("b").textContent==n[0]));await speak(n[1],{slow:!!s,queue:true});await sleep(s?550:300)}
  tiles.forEach(x=>x.classList.remove("hl"))});
  root.querySelectorAll("[data-nstop]").forEach(b=>b.onclick=stopSpeak)}
function natCards(ids){
  return`<div class="natl">${ids.map(id=>{const c=cinfo(id);const same=c[1]===c[2];
   return`<div class="nat">${ico("flag:"+id,true)}<div class="natm"><div class="natc"><span class="fr">${esc(c[0])}</span> <small>${c[7]} · ${c[3]}</small><span class="nb2">${bothBtn(c[0])}</span></div>
   <div class="natn"><b>🙋‍♂️ ${same?"للذكر والأنثى":"للذكر"}:</b> <span class="fr">${c[1]}</span> <small>${c[8]} · ${c[4]}</small><span class="nb2">${bothBtn(c[1])}</span></div>
   ${same?"":`<div class="natn"><b>🙋‍♀️ للأنثى:</b> <span class="fr">${c[2]}</span> <small>${c[9]} · ${c[5]}</small><span class="nb2">${bothBtn(c[2])}</span></div>`}</div></div>`}).join("")}</div>`}
function blockHTML(b,u){
  switch(b.k){
   case"s":return`<h2 class="sec-t" id="s${u.id}-${b.n}"><span class="sn">${b.n}</span><span class="fr">${esc(b.fr)}</span><small>${b.ar} · ${b.pg}</small></h2>`;
   case"p":return`<p class="par">${bidi(b.ar)}</p>`;
   case"v":return`<section class="card" style="${col(u.id)}"><h3><span class="fr">${esc(b.g)}</span> · ${b.ga}</h3><div class="wl2">${b.items.map(it=>wordRow(mkW(it,b.g,b.ga,u.id),true)).join("")}</div></section>`;
   case"d":return dialogCard(u.dl[b.id],u.id+":"+b.id);
   case"r":return`<div class="tip rule"><h4>📐 ${bidi(b.t)}</h4><p>${bidi(b.ar)}</p>${b.ex.map(e=>`<div class="ex"><span class="fr">${esc(e[0])}</span><span class="exar">${bidi(e[1])}</span>${spkBtn(e[0])}</div>`).join("")}</div>`;
   case"tb":return`<div class="tbw"><table class="tbl"><thead><tr>${b.head.map(h=>`<th>${bidi(h)}</th>`).join("")}</tr></thead><tbody>${b.rows.map(r=>`<tr>${r.map(c=>c===""?"<td></td>":isLat(c)?`<td class="lc"><button class="cell" data-say="${esc(c.replace(/ \/ /g,". "))}"><span class="fr">${esc(c)}</span> 🔊</button></td>`:`<td>${bidi(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
   case"kn":return`<div class="know">💡 ${bidi(b.ar)}</div>`;
   case"tip":return`<div class="tip"><p>✨ ${bidi(b.ar)}</p></div>`;
   case"alpha":return`<section class="card" style="${col(u.id)}"><h3>🔤 الأبجدية الفرنسية (L’alphabet)</h3><p style="margin:0">اضغط على الحرف لتسمع اسمه، وعلى الكلمة لتسمع مثالاً.</p>${alphaGrid()}</section>`;
   case"names":return`<section class="card" style="${col(u.id)}"><h3>🧑‍🤝‍🧑 أسماء فرنسية للتمثيل</h3><div class="names"><div><b>Fille · بنات</b>${NAMES.f.map(n=>`<button class="chip" data-say="${n}"><span class="fr">${n}</span><span>🔊</span></button>`).join("")}</div><div><b>Garçon · أولاد</b>${NAMES.m.map(n=>`<button class="chip" data-say="${n}"><span class="fr">${n}</span><span>🔊</span></button>`).join("")}</div></div></section>`;
   case"nums":return`<section class="card" style="${col(u.id)}"><h3>🔢 الأرقام من ${b.from} إلى ${b.to} (Les nombres)</h3>${numGrid(b.from,b.to)}</section>`;
   case"nat":return`<section class="card" style="${col(u.id)}"><h3>🏳️ البلدان والجنسيات</h3>${natCards(b.ids)}</section>`;
   case"flags":return`<section class="card" style="${col(u.id)}"><h3>🚩 خمّن البلد من العلم</h3><div class="flagrow">${b.ids.map(id=>`<button class="fl" data-say="${esc(cinfo(id)[0])}">${ico("flag:"+id,true)}<span class="fr">${esc(cinfo(id)[0])}</span><small>${cinfo(id)[7]}</small></button>`).join("")}</div></section>`;
   case"check":return`<section class="card" style="${col(u.id)}"><h3>✅ ${b.ar}</h3>${b.items.map((t,i)=>{const k=u.id+"-"+i;return`<label class="chk"><input type="checkbox" data-chk="${k}" ${chk[k]?"checked":""}><span>${bidi(t)}</span></label>`}).join("")}</section>`;
  }return""}
function learn(u){
  const secs=u.blocks.filter(b=>b.k==="s");
  let h=`<section class="card" style="${col(u.id)}"><h3>🗺️ عن هذه الوحدة</h3><p style="margin:0">${bidi(u.intro)}</p>
   <h4 class="sub">🎯 أهداف الوحدة (Je vais apprendre à…)</h4><div class="goals">${u.goals.map(g=>`<div class="goal"><span class="fr">${esc(g[0])}</span><small>${g[1]}</small></div>`).join("")}</div>
   <h4 class="sub">🏁 المهمة النهائية (La tâche)</h4><div class="sent" style="${col(u.id)}"><div class="sent-top"><div class="entx">${esc(u.task.fr)}</div>${bothBtn(u.task.fr)}</div>${trBlock(u.task.ar)}</div></section>
   <nav class="seances" aria-label="الحصص">${secs.map(s=>`<button data-go="s${u.id}-${s.n}">${s.n}</button>`).join("")}</nav>`;
  h+=u.blocks.map(b=>blockHTML(b,u)).join("");
  h+=`<div class="row c"><button class="btn ghost" data-tab="cards">🃏 البطاقات</button><button class="btn ghost" data-tab="ex">📝 تمارين الكتاب</button><button class="btn" data-tab="quiz">✏️ اختبر نفسك</button></div>`;
  pane().innerHTML=`<div class="sec pop">${h}</div>`;
  const P=pane();bindSpeak(P);bindTr(P);bindDialogs(P);bindAlpha(P);bindNums(P);bindStars(P);
  P.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{const el=document.getElementById(b.dataset.go);if(el){el.scrollIntoView({behavior:"smooth",block:"start"});}});
  P.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>unit(u.id,b.dataset.tab));
  P.querySelectorAll("[data-chk]").forEach(c=>c.onchange=()=>{chk[c.dataset.chk]=c.checked;store.set("fr1-chk",chk)});
  P.querySelectorAll("[data-wbw]").forEach(b=>b.onclick=()=>wordByWord(b.dataset.wbw));
}
function bindStars(root){root.querySelectorAll("[data-star]").forEach(b=>b.onclick=()=>{b.classList.toggle("on",toggleHard(b.dataset.star))})}

/* ───── البطاقات ───── */
function cards(u,mode,override){
  let src=override||(u.id===0?[...WORDS.values()]:vocabOf(u));
  mode=mode||"all";
  const list=()=>mode==="hard"?src.filter(w=>hardSet[w.fr.toLowerCase()]):src;
  let k=0,v=list();
  const draw=()=>{
    v=list();if(k>=v.length)k=0;
    const w=v[k];
    pane().innerHTML=`<div class="fc-wrap pop"><div class="seg" role="group"><button data-m="all" aria-pressed="${mode==="all"}">كل الكلمات (${src.length})</button><button data-m="hard" aria-pressed="${mode==="hard"}">⭐ صعبة (${src.filter(x=>hardSet[x.fr.toLowerCase()]).length})</button></div>
    ${w?`<p style="margin:0;color:var(--muted);text-align:center">انظر للكلمة، اسمعها بالسرعتين، وتذكّر معناها، ثم اضغط على البطاقة لتقلبها.</p>
    <button class="fc" id="fc" aria-label="اقلب البطاقة"><div class="fc-in"><div class="face front">${w.g?`<span class="grp fr">${esc(w.g)}</span>`:""}${w.ic?ico(w.ic,true):""}<span class="w fr">${esc(w.fr)}</span><span class="s">اضغط لترى المعنى</span></div><div class="face back-f"><div>${bidi(w.ar)}</div>${w.pr?`<div class="bpr">🗣️ ${esc(w.pr)}</div>`:""}${w.nt?`<div class="bnt">${bidi(w.nt)}</div>`:""}</div></div></button>
    <div class="fc-tools"><button class="spk" id="say" style="width:52px;height:52px;font-size:1.3rem" aria-label="استمع">🔊</button><button class="spk slow" id="sayslow" style="width:52px;height:52px;font-size:1.3rem" aria-label="ببطء">🐢</button><button class="star ${hardSet[w.fr.toLowerCase()]?"on":""}" id="st" aria-label="كلمة صعبة">★</button></div>
    <div class="fc-nav"><button class="btn ghost" id="pv" aria-label="السابقة">→</button><span class="fc-count en">${k+1} / ${v.length}</span><button class="btn ghost" id="nx" aria-label="التالية">←</button></div>
    <div class="row c"><button class="btn ghost sm" id="shf">🔀 خلط</button><button class="btn ghost sm" id="auto">${autoSpeak?"🔊 النطق التلقائي: مفعّل":"🔇 النطق التلقائي: متوقف"}</button></div>`
    :`<div class="card" style="text-align:center">لا توجد بطاقات هنا بعد. اضغط ★ على أي بطاقة لتضيفها إلى كلماتك الصعبة.</div>`}</div>`;
    pane().querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{mode=b.dataset.m;k=0;draw()});
    if(!w)return;
    $("#fc").onclick=()=>{$("#fc").classList.toggle("flip")};
    const nav=d=>{k=(k+d+v.length)%v.length;draw()};
    $("#nx").onclick=()=>nav(1);$("#pv").onclick=()=>nav(-1);
    $("#shf").onclick=()=>{src=shuffle(src);k=0;draw()};
    $("#st").onclick=e=>{e.currentTarget.classList.toggle("on",toggleHard(w.fr))};
    $("#say").onclick=()=>speak(sayOf(w),{slow:false});$("#sayslow").onclick=()=>speak(sayOf(w),{slow:true});
    $("#auto").onclick=()=>{autoSpeak=!autoSpeak;store.set("fr1-auto",autoSpeak);draw()};
    if(autoSpeak&&draw.go)speak(sayOf(w),{slow:false});
    draw.go=true;
  };
  draw.go=false;draw();
}

/* ───── الكلمات الصعبة ───── */
function hardTab(u){
  const hw=vocabOf(u).filter(w=>w.fr.length<40);
  pane().innerHTML=`<div class="sec pop"><section class="card"><h3>⭐ كلمات الوحدة وعباراتها</h3><p style="margin:0">اضغط 🔊 للنطق الطبيعي و🐢 للنطق البطيء، واضغط ★ لتضيف الكلمة إلى «كلماتي الصعبة» لتراجعها لاحقاً.</p>
  <div class="wl2">${hw.map(w=>wordRow(w,true)).join("")}</div>
  <div class="row c"><button class="btn ghost" id="hc">🃏 بطاقات الوحدة</button><button class="btn" id="hq">✏️ اختبر نفسك</button></div></section></div>`;
  bindSpeak(pane());bindStars(pane());
  $("#hc").onclick=()=>unit(u.id,"cards");
  $("#hq").onclick=()=>unit(u.id,"quiz");
}
function myHard(){
  const ks=Object.keys(hardSet).filter(k=>WORDS.has(k)),list=ks.map(k=>WORDS.get(k));
  pane().innerHTML=`<div class="sec pop"><section class="card"><h3>⭐ كلماتي الصعبة</h3>
   ${list.length?`<p style="margin:0">هذه الكلمات التي أضفتها، وأي كلمة أخطأت فيها في الاختبار أو اللعب تُضاف هنا تلقائياً.</p><div class="wl2">${list.map(w=>wordRow(w,true)).join("")}</div>
   <div class="row c"><button class="btn ghost" id="hc">🃏 بطاقات</button><button class="btn" id="hq">✏️ اختبار</button><button class="btn ghost sm" id="hx">🗑️ مسح الكل</button></div>`
   :`<p style="margin:0">لا توجد كلمات هنا بعد. اضغط ★ على أي كلمة لتضعها هنا.</p>`}</section></div>`;
  bindSpeak(pane());bindStars(pane());
  if(list.length){$("#hc").onclick=()=>cards(ALL,"hard");$("#hq").onclick=()=>quizSetup(ALL,"hardonly");$("#hx").onclick=()=>{if(confirm("مسح كل الكلمات الصعبة؟")){hardSet={};saveHard();myHard()}}}
}

/* ───── الاستماع والنطق ───── */
function voiceBox(){
  const opts=FRV.map(v=>`<option value="${esc(v.name)}" ${voice&&v.name===voice.name?"selected":""}>${esc(v.name)} (${v.lang})</option>`).join("");
  return`<section class="card"><h3>🎧 إعدادات الصوت</h3>
   <p style="margin:0">اختر السرعة الافتراضية للنطق، ويمكنك دائماً الضغط على 🔊 للطبيعي أو 🐢 للبطيء بجانب أي كلمة.</p>
   <div class="seg" role="group"><button data-sp="0" aria-pressed="${!slow}">🔊 طبيعي</button><button data-sp="1" aria-pressed="${slow}">🐢 بطيء</button></div>
   <label class="sel">مصدر الصوت:<select id="srcSel"><option value="auto" ${srcMode==="auto"?"selected":""}>تلقائي (الأفضل)</option><option value="device" ${srcMode==="device"?"selected":""}>صوت الجهاز</option><option value="online" ${srcMode==="online"?"selected":""}>صوت الإنترنت (Google)</option></select></label>
   ${FRV.length?`<label class="sel">صوت الجهاز الفرنسي:<select id="vSel">${opts}</select></label>`:`<p class="note">لم نجد صوتاً فرنسياً مثبتاً على جهازك، لذلك سيُستعمل صوت الإنترنت (يحتاج اتصالاً). يمكنك تثبيت صوت فرنسي من إعدادات الجهاز ← اللغة ← تحويل النص إلى كلام.</p>`}
   <div class="row"><button class="btn sm" id="testV">🔊 جرّب الصوت: Bonjour, je m’appelle Ali.</button><button class="btn sm ghost" id="testS">🐢 ببطء</button></div></section>`}
function bindVoiceBox(root){
  root.querySelectorAll("[data-sp]").forEach(b=>b.onclick=()=>{slow=b.dataset.sp==="1";store.set("fr1-slow",slow);root.querySelectorAll("[data-sp]").forEach(x=>x.setAttribute("aria-pressed",x===b))});
  const s=root.querySelector("#srcSel");if(s)s.onchange=()=>{srcMode=s.value;store.set("fr1-src",srcMode)};
  const v=root.querySelector("#vSel");if(v)v.onchange=()=>{voiceName=v.value;store.set("fr1-voice",voiceName);loadVoices()};
  const t=root.querySelector("#testV");if(t){t.onclick=()=>speak("Bonjour, je m’appelle Ali.",{slow:false});root.querySelector("#testS").onclick=()=>speak("Bonjour, je m’appelle Ali.",{slow:true})}}
function listenTab(u){
  const words=vocabOf(u).filter(w=>w.fr.length<30);
  const sents=u.id===0?ALL.rev.flatMap(i=>shortSent(U(i))):shortSent(u);
  const dls=u.id===0?[]:Object.keys(u.dl).map(k=>[u.id+":"+k,u.dl[k]]);
  let h=voiceBox();
  h+=`<section class="card"><h3>🔤 استمع للكلمات</h3><div class="row"><button class="btn sm" id="allW">▶ شغّل الكلمات</button><button class="btn sm ghost" id="stopW">⏹ إيقاف</button></div>
   <div class="wgrid">${words.slice(0,u.id===0?90:999).map(w=>`<button class="wb" data-say="${esc(sayOf(w))}">${w.ic?ico(w.ic):"🔊"}<span><span class="fr">${esc(w.fr)}</span><small class="pr2">${esc(w.pr)}</small></span></button>`).join("")}</div></section>`;
  if(sents.length)h+=`<section class="card"><h3>💬 استمع للجمل</h3><p style="margin:0">لكل جملة: 🔊 طبيعي · 🐢 بطيء · 🔤 كلمة كلمة · 🎙️ تحقق من نطقك.</p><div class="row"><button class="btn sm" id="allS">▶ شغّل الجمل</button><button class="btn sm ghost" id="stopS">⏹ إيقاف</button></div>
   ${shuffle(sents).slice(0,u.id===0?15:40).map(t=>`<div class="sent"><div class="sent-top"><div class="entx">${esc(t[0])}</div></div><div class="dbt">${bothBtn(t[0])}<button class="spk slow" data-wbw="${esc(t[0])}" title="كلمة كلمة">🔤</button>${SR?`<button class="spk mic" data-mic="${esc(t[0])}" title="تحقق من نطقي">🎙️</button>`:""}</div><div class="micout"></div>${trBlock(t[1])}</div>`).join("")}</section>`;
  if(dls.length)h+=`<h2 class="sec-t">🗣️ الحوارات</h2>`+dls.map(([k,d])=>dialogCard(d,k)).join("");
  h+=`<section class="card"><h3>🎯 تدرّب على ما سمعت</h3><div class="gcards"><button class="gc" id="lq"><span>👂</span><div><b>اختبار استماع</b><small>اسمع الكلمة واختر الصحيحة</small></div></button><button class="gc" id="dict"><span>✍️</span><div><b>إملاء</b><small>اسمع واكتب الكلمة بالفرنسية</small></div></button></div></section>`;
  pane().innerHTML=`<div class="sec pop">${h}</div>`;
  const P=pane();bindSpeak(P);bindTr(P);bindDialogs(P);bindVoiceBox(P);
  P.querySelectorAll("[data-wbw]").forEach(b=>b.onclick=()=>wordByWord(b.dataset.wbw));
  P.querySelectorAll("[data-mic]").forEach(b=>b.onclick=()=>micTry(b.dataset.mic,b.closest(".sent").querySelector(".micout"),b));
  const seq=async items=>{stopSpeak();const tok=playToken;for(const t of items){if(tok!==playToken)break;await speak(t,{queue:true});await sleep(450)}};
  $("#allW").onclick=()=>seq(words.slice(0,40).map(sayOf));$("#stopW").onclick=stopSpeak;
  const aS=$("#allS");if(aS){aS.onclick=()=>seq(sents.slice(0,12).map(t=>t[0]));$("#stopS").onclick=stopSpeak}
  $("#lq").onclick=()=>quizSetup(u,"listen");$("#dict").onclick=()=>dictation(u);
}
function dictation(u){
  const pool=shuffle(vocabOf(u).filter(w=>/^[a-zàâçéèêëîïôûùüœ'’ -]{3,16}$/i.test(w.fr)&&!/ \/ /.test(w.fr))).slice(0,8);let n=0,score=0;
  const step=()=>{
    if(n>=pool.length){if(score>=pool.length*.7)confetti();pane().innerHTML=`<div class="qbox result pop"><div class="big">${score>=pool.length*.7?"🏆":"👍"}</div><h3>أنهيت الإملاء!</h3><div class="num">${score} من ${pool.length}</div><div class="row c"><button class="btn" id="ag">🔁 إملاء جديد</button></div></div>`;$("#ag").onclick=()=>dictation(u);return}
    const w=pool[n];
    pane().innerHTML=`<div class="qbox pop"><div class="qtop"><span>كلمة ${n+1} من ${pool.length}</span><span>✔ ${score}</span></div><div class="qbar"><i style="width:${n/pool.length*100}%"></i></div>
    <div class="gprompt"><p style="margin:0">اضغط 🔊 واكتب الكلمة التي سمعتها بالفرنسية (تُقبل الكتابة بدون accents لكن انتبه لها!)</p><div class="row c">${bothBtn(sayOf(w))}</div>
    <input class="dict-in" id="di" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="اكتب الكلمة"><div class="accbar">${["é","è","ê","à","â","ç","ô","î","û","ù","œ","’"].map(c=>`<button data-ch="${c}">${c}</button>`).join("")}</div><div class="row c"><button class="btn" id="ck">تحقق ✓</button><button class="btn ghost" id="hn">💡 تلميح</button></div><div id="fbk" style="width:100%"></div></div></div>`;
    bindSpeak(pane());setTimeout(()=>speak(sayOf(w)),250);
    pane().querySelectorAll("[data-ch]").forEach(b=>b.onclick=()=>{const i=$("#di");i.value+=b.dataset.ch;i.focus()});
    $("#hn").onclick=()=>{$("#fbk").innerHTML=`<div class="fb bad">المعنى: <b>${bidi(w.ar)}</b> · أول حرف: <span class="fr"><b>${esc(w.fr[0])}</b></span></div>`};
    const ck=()=>{const v=$("#di").value.trim();if(!v)return;
      const ok=norm(v)===norm(w.fr),exact=fixApos(v.toLowerCase())===fixApos(w.fr.toLowerCase());if(ok)score++;else addHard(w.fr);
      $("#fbk").innerHTML=`<div class="fb ${ok?"good":"bad"}">${ok?(exact?"صحيح تماماً! أحسنت 🌟":"صحيح! لكن انتبه للكتابة الدقيقة: <span class='fr'><b>"+esc(w.fr)+"</b></span>"):"الكتابة الصحيحة: <span class='fr'><b>"+esc(w.fr)+"</b></span>"}</div><button class="btn" id="nx" style="margin-top:10px">${n+1<pool.length?"التالي ←":"النتيجة 🏁"}</button>`;
      $("#ck").disabled=true;$("#di").disabled=true;$("#nx").onclick=()=>{n++;step()}};
    $("#ck").onclick=ck;$("#di").onkeydown=e=>{if(e.key==="Enter")ck()};$("#di").focus();
  };step();
}

/* ───── دليل النطق ───── */
function guide(){
  stopSpeak();topBar(home);app.setAttribute("style","--c:var(--btn);--cs:var(--btn-soft)");
  const G=GUIDE;
  const tbl=(head,rows,fn)=>`<div class="tbw"><table class="tbl"><thead><tr>${head.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(fn).join("")}</tbody></table></div>`;
  const sp=t=>`<button class="cell" data-say="${esc(t)}"><span class="fr">${esc(t)}</span> 🔊</button>`;
  app.innerHTML=`<section class="hero" style="background:var(--btn)"><span class="em">🔤</span><div><h2 style="direction:rtl;font-family:var(--display)">دليل النطق والأصوات</h2><div>كل ما تحتاجه لتقرأ الفرنسية صح</div></div></section>
  <div class="sec pop">
  <section class="card"><h3>🗝️ مفتاح الكتابة بالحروف العربية</h3><p style="margin:0">نكتب النطق التقريبي بحروف عربية، وهذه رموز خاصة لأصوات غير موجودة في العربية. وتذكّر: الاستماع هو الأساس.</p>
   ${tbl(["الرمز","الصوت","مثال"],G.legend,r=>`<tr><td><b style="font-size:1.4rem">${r[0]}</b></td><td>${bidi(r[1])}</td><td>${bidi(r[2])}</td></tr>`)}</section>
  <section class="card"><h3>🔤 الأبجدية (L’alphabet)</h3>${alphaGrid()}</section>
  <section class="card"><h3>✏️ العلامات فوق الحروف (Les accents)</h3><p style="margin:0">تغيّر الصوت أو المعنى، ولا تُهملها في الكتابة.</p>
   ${tbl(["العلامة","اسمها","النطق","مثال"],G.accents,r=>`<tr><td><b class="fr" style="font-size:1.3rem">${r[0]}</b></td><td><span class="fr">${r[1]}</span></td><td>${r[2]}</td><td>${sp(r[3])} <small>${r[4]}</small></td></tr>`)}</section>
  <section class="card"><h3>🎼 أصوات مهمة (Les sons)</h3><p style="margin:0">اضغط على كل مثال لتسمعه.</p>
   ${tbl(["الحروف","الصوت","مثال","النطق","المعنى"],G.sounds,r=>`<tr><td><b class="fr">${r[0]}</b></td><td>${bidi(r[1])}</td><td>${sp(r[2])}</td><td>${r[3]}</td><td>${r[4]}</td></tr>`)}</section>
  <section class="card"><h3>🤫 حروف لا تُنطق (Les lettres muettes)</h3><p style="margin:0">في الغالب لا تُنطق الحروف الصامتة في نهاية الكلمة (t, s, d, x, z, e) وكذلك الحرف h. لكن حروف c, r, f, l في النهاية تُنطق غالباً (مثل bonjour، neuf، il).</p>
   ${tbl(["الكلمة","الملاحظة","النطق"],G.silent,r=>`<tr><td>${sp(r[0])}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`)}</section>
  <section class="card"><h3>✂️ الحذف (L’élision)</h3><p style="margin:0">قبل كلمة تبدأ بحرف متحرك نحذف حرف e أو a ونضع علامة ’ .</p>
   ${tbl(["الأصل","بعد الحذف","النطق","المعنى"],G.elision,r=>`<tr><td><span class="fr">${r[0]}</span></td><td>${sp(r[1])}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`)}</section>
  <section class="card"><h3>🔗 الربط (La liaison)</h3><p style="margin:0">يُنطق حرف صامت في آخر كلمة إذا جاءت بعدها كلمة تبدأ بحرف متحرك، فتنساب الكلمتان كأنهما واحدة.</p>
   ${tbl(["الكلمتان","كيف تُنطق","النطق","ملاحظة"],G.liaison,r=>`<tr><td>${sp(r[0])}</td><td><span class="fr">${r[1]}</span></td><td>${r[2]}</td><td>${r[3]}</td></tr>`)}</section>
  <section class="card"><h3>🧠 نصائح لمن يتكلم العربية</h3><div class="tip"><p>1) الحرف P ليس B: père ≠ bère. اجعل الشفتين تنفجران بلا اهتزاز.</p><p>2) الحرف V ليس F: vélo (ڤ) مع اهتزاز، وfamille (ف) بلا اهتزاز.</p><p>3) الحرف U الفرنسي لا يوجد عندنا: شفتان مستديرتان وقل «ي»: salut, une, musique.</p><p>4) الحرف R يخرج من الحلق، لا تُدحرجه باللسان كراء العربية.</p><p>5) الجملة السؤالية ترتفع نبرتها في النهاية: Comment ça va ? ↗</p><p>6) الفرنسية تُنطق بإيقاع منتظم بلا ضغط قوي على مقطع: bon-jour، mer-ci.</p></div></section>
  </div>`;
  bindSpeak(app);bindAlpha(app);scrollTo(0,0);
}
/* ───── تمارين الكتاب والكراس ───── */
function joinTokens(a,j){
  if(j==="")return a.join("");
  let s="";a.forEach((t,i)=>{
    if(i===0){s=t;return}
    const prev=a[i-1];
    if(/^[.,?!…]$/.test(t)||t==="-"||prev==="-"||/’$/.test(prev))s+=t;
    else s+=" "+t});
  return s.replace(/ ([?!])/g," $1")}
function exTab(u){
  const done=u.ex.map((s,i)=>exBest[u.id+"-"+i]);
  pane().innerHTML=`<div class="sec pop"><section class="card"><h3>📝 تمارين الكتاب ودفتر النشاط</h3><p style="margin:0">هذه تمارين مأخوذة من الكتاب المنهجي ودفتر النشاط حصة بحصة، بتفاعل وتصحيح فوري ونطق. اختر حصة وابدأ.</p></section>
  <div class="exlist">${u.ex.map((s,i)=>`<button class="exi" data-i="${i}"><b>${i+1}</b><span><span class="fr">${esc(s.t)}</span><small>${s.items.length} ${s.items.length===1?"تمرين":"تمارين"}${done[i]!==undefined?` · أفضل نتيجة ${Math.round(done[i]*100)}٪`:""}</small></span><span class="go">${done[i]>=.9?"⭐":"←"}</span></button>`).join("")}</div></div>`;
  pane().querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>runEx(u,+b.dataset.i));
}
function expandItems(items){const out=[];items.forEach(it=>{
  if(it.t==="num"){const pool=shuffle(NUMS.filter(n=>n[0]>=it.from&&n[0]<=it.to)).slice(0,it.n);pool.forEach(n=>out.push({t:"numq",n}))}else out.push(it)});return out}
function runEx(u,si){
  const set=u.ex[si],items=expandItems(set.items),root=pane();let n=0,score=0;
  const step=()=>{
    if(n>=items.length){
      const p=score/items.length,k=u.id+"-"+si;if(exBest[k]===undefined||p>exBest[k]){exBest[k]=p;store.set("fr1-ex",exBest)}
      if(p>=.7)confetti();
      root.innerHTML=`<div class="qbox result pop"><div class="big">${p>=.9?"🏆":p>=.7?"🌟":p>=.5?"👍":"📚"}</div><h3>${p>=.9?"ممتاز!":p>=.7?"عمل رائع!":p>=.5?"جيد، حاول أكثر":"راجع الدرس وأعد المحاولة"}</h3><div class="num">${score} من ${items.length}</div>
      <div class="row c"><button class="btn" id="ag">🔁 أعد التمرين</button><button class="btn ghost" id="bk">← الحصص</button><button class="btn ghost" id="ln">📖 راجع الدرس</button></div></div>`;
      $("#ag").onclick=()=>runEx(u,si);$("#bk").onclick=()=>exTab(u);$("#ln").onclick=()=>unit(u.id,"learn");return}
    const it=items[n];
    root.innerHTML=`<div class="qbox pop"><div class="qtop"><span>${esc(set.t)}</span><span>${n+1}/${items.length} · ✔ ${score}</span></div><div class="qbar"><i style="width:${n/items.length*100}%"></i></div><div id="ex"></div><div id="fbk"></div></div>`;
    const finish=(ok,msg,say)=>{
      if(ok)score++;
      $("#fbk").innerHTML=`<div class="fb ${ok?"good":"bad"}"><b>${ok?["أحسنت! 🌟","رائع! 🎉","ممتاز يا بطل! 💪","صحيح! 👏"][Math.floor(Math.random()*4)]:"لا بأس، تعلّم معي 🙂"}</b> ${msg||""}</div><button class="btn" id="nxq" style="margin-top:10px">${n+1<items.length?"التالي ←":"النتيجة 🏁"}</button>`;
      if(say)speak(say);
      const nb=$("#nxq");nb.focus({preventScroll:true});nb.onclick=()=>{stopSpeak();n++;step();root.scrollIntoView({block:"start"});scrollBy(0,-90)};
    };
    EXR[it.t]($("#ex"),it,finish);bindSpeak(root);bindTr(root);
  };
  step();
}
const hdrQ=it=>`<div class="qa">${bidi(it.q||"")}</div>${it.say?`<div class="row c">${bothBtn(it.say)}</div>`:""}`;
const EXR={
 mc(box,it,fin){
  const right=it.o[it.a];const sh=shuffle(it.o);
  box.innerHTML=`${hdrQ(it)}<div class="opts">${sh.map((o,j)=>`<button class="opt ${isLat(o)?"lat":""}" data-o="${j}"><span class="k">${LET[j]||j+1}</span><span>${esc(o)}</span></button>`).join("")}</div>`;
  if(it.say)setTimeout(()=>speak(it.say),250);
  box.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const ok=sh[+b.dataset.o]===right;
    box.querySelectorAll(".opt").forEach(o=>{o.disabled=true;if(sh[+o.dataset.o]===right)o.classList.add("right")});if(!ok)b.classList.add("wrong");
    fin(ok,(ok?"":`الإجابة الصحيحة: <strong>${bidi(right)}</strong>. `)+(it.x?bidi(it.x):""),ok&&isLat(right)&&right.length<30?right:null)});
 },
 tf(box,it,fin){
  box.innerHTML=`<div class="qa">صح أم خطأ؟</div><div class="qe">${esc(it.q)}</div><div class="opts"><button class="opt" data-v="1"><span class="k">✔</span><span>صح</span></button><button class="opt" data-v="0"><span class="k">✘</span><span>خطأ</span></button></div>`;
  box.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const ok=(b.dataset.v==="1")===it.a;box.querySelectorAll(".opt").forEach(o=>{o.disabled=true;if((o.dataset.v==="1")===it.a)o.classList.add("right")});if(!ok)b.classList.add("wrong");fin(ok,it.x?bidi(it.x):"")});
 },
 order(box,it,fin){
  const ans=it.ans,tiles=shuffle(ans.map((t,i)=>({t,i})));let typed=[],mist=false;const goal=joinTokens(ans,it.join);
  const draw=()=>{box.innerHTML=`${hdrQ(it)}<div class="qe sline">${typed.map((t,i)=>`<button class="tile" data-r="${i}">${esc(t.t)}</button>`).join("")||'<span style="color:var(--muted);font-size:1rem">اضغط على الكلمات بالترتيب</span>'}</div>
    <div class="tiles">${tiles.map(t=>`<button class="tile ${typed.includes(t)?"used":""}" data-t="${t.i}">${esc(t.t)}</button>`).join("")}</div>
    <div class="row c"><button class="btn ghost sm" id="clr">↺ مسح</button><button class="btn ghost sm" id="sol">👁️ أظهر الحل</button></div><div id="chk"></div>`;
    box.querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{typed.push(tiles.find(t=>t.i===+b.dataset.t));draw();check()});
    box.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{typed.splice(+b.dataset.r,1);draw()});
    $("#clr").onclick=()=>{typed=[];draw()};$("#sol").onclick=()=>{box.querySelectorAll("button").forEach(x=>x.disabled=true);fin(false,`الحل: <span class="fr"><b>${esc(goal)}</b></span>`,goal)};
    bindSpeak(box)};
  const check=()=>{if(typed.length<ans.length)return;const got=joinTokens(typed.map(t=>t.t),it.join);
    if(got===goal){box.querySelectorAll("button").forEach(x=>x.disabled=true);fin(!mist,`<span class="fr"><b>${esc(goal)}</b></span>`,goal)}
    else{mist=true;$("#chk").innerHTML=`<div class="fb bad">ليست صحيحة بعد، جرّب ترتيباً آخر.</div>`}};
  draw();
 },
 fill(box,it,fin){
  const parts=it.text.split("___"),nb=it.blanks.length;let filled=Array(nb).fill(null);const tiles=shuffle(it.bank.map((t,i)=>({t,i})));
  const draw=()=>{let bi=0;
    const lines=it.text.split("\n").map(line=>{const ps=line.split("___");return ps.map((p,k)=>esc(p)+(k<ps.length-1?(()=>{const i=bi++;const f=filled[i];return`<button class="slotw ${f?"on":""}" data-s="${i}">${f?esc(f.t):"&nbsp;"}</button>`})():"")).join("")});
    box.innerHTML=`${hdrQ(it)}<div class="fillbox fr">${lines.map(l=>`<div>${l}</div>`).join("")}</div><div class="tiles">${tiles.map(t=>`<button class="tile ${filled.includes(t)?"used":""}" data-t="${t.i}">${esc(t.t)}</button>`).join("")}</div>
    <div class="row c"><button class="btn" id="ckf" ${filled.every(Boolean)?"":"disabled"}>تحقق ✓</button><button class="btn ghost sm" id="clr">↺ مسح</button></div>`;
    box.querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{const i=filled.indexOf(null);if(i<0)return;filled[i]=tiles.find(t=>t.i===+b.dataset.t);draw()});
    box.querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{filled[+b.dataset.s]=null;draw()});
    $("#clr").onclick=()=>{filled=Array(nb).fill(null);draw()};
    $("#ckf").onclick=()=>{let all=true;const sl=[...box.querySelectorAll(".slotw")];
      filled.forEach((f,i)=>{const ok=f.t.toLowerCase()===it.blanks[i].toLowerCase();if(!ok)all=false;sl[i].classList.add(ok?"okc":"badc");if(!ok)sl[i].innerHTML=esc(f.t)+" ✘"});
      box.querySelectorAll("button").forEach(x=>x.disabled=true);
      const sol=it.text.split("\n").map(l=>{let k=0;return l.replace(/___/g,()=>it.blanks[k++]||"")}).join(" / ");
      fin(all,all?"":`الحل: <span class="fr"><b>${esc(sol)}</b></span>`,null)};
    bindSpeak(box)};
  draw();
 },
 match(box,it,fin){
  const pairs=it.pairs;const L=pairs.map((p,i)=>({v:p[0],i})),R=shuffle(pairs.map((p,i)=>({v:p[1],i})));let sel=null,done=0,mist=0;
  const rend=(v)=>v.startsWith("flag:")?ico(v):esc(v);
  box.innerHTML=`${hdrQ(it)}<div class="pairs"><div class="col">${L.map((p,i)=>`<button class="pr ${isLat(p.v)||p.v.startsWith("flag:")?"en":""}" data-l="${i}">${rend(p.v)}</button>`).join("")}</div><div class="col">${R.map((p,i)=>`<button class="pr ${isLat(p.v)?"en":""}" data-r="${i}">${rend(p.v)}</button>`).join("")}</div></div>`;
  const Lb=box.querySelectorAll("[data-l]"),Rb=box.querySelectorAll("[data-r]");
  Lb.forEach(b=>b.onclick=()=>{Lb.forEach(x=>x.classList.remove("sel"));b.classList.add("sel");sel=+b.dataset.l;const v=L[sel].v;if(isLat(v)&&!v.startsWith("flag:"))speak(v)});
  Rb.forEach(b=>b.onclick=()=>{if(sel===null)return;const r=R[+b.dataset.r];
    if(r.i===sel){b.classList.add("done");Lb[sel].classList.remove("sel");Lb[sel].classList.add("done");sel=null;if(isLat(r.v))speak(r.v);if(++done===pairs.length)fin(mist<=1,mist?`أخطأت ${mist} مرة.`:"")}
    else{mist++;b.classList.add("no");setTimeout(()=>b.classList.remove("no"),350)}});
 },
 type(box,it,fin){
  box.innerHTML=`${hdrQ(it)}${it.pr?`<div class="qe" style="letter-spacing:.12em;text-align:center">${esc(it.pr)}</div>`:""}<div class="gprompt"><input class="dict-in" id="di" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="اكتب الجواب"><div class="accbar">${["é","è","ê","à","â","ç","ô","î","û","ù","’","-"].map(c=>`<button data-ch="${c}">${c}</button>`).join("")}</div><button class="btn" id="ck">تحقق ✓</button></div>`;
  if(it.say)setTimeout(()=>speak(it.say),250);
  box.querySelectorAll("[data-ch]").forEach(b=>b.onclick=()=>{const i=$("#di");i.value+=b.dataset.ch;i.focus()});
  const ck=()=>{const v=$("#di").value.trim();if(!v)return;const ok=it.a.some(a=>norm(a)===norm(v));$("#ck").disabled=true;$("#di").disabled=true;
    fin(ok,ok?`<span class="fr"><b>${esc(it.x||it.a[0])}</b></span>`:`الجواب الصحيح: <span class="fr"><b>${esc(it.x||it.a[0])}</b></span>`,it.x&&isLat(it.x)?it.x:null)};
  $("#ck").onclick=ck;$("#di").onkeydown=e=>{if(e.key==="Enter")ck()};$("#di").focus();
 },
 numq(box,it,fin){
  const[nv,w]=it.n;
  box.innerHTML=`<div class="qa">استمع واكتب الرقم الذي سمعته بالأرقام (0، 1، 2 …)</div><div class="row c">${bothBtn(w)}</div><div class="gprompt"><input class="dict-in" id="di" inputmode="numeric" autocomplete="off" aria-label="اكتب الرقم"><button class="btn" id="ck">تحقق ✓</button></div>`;
  setTimeout(()=>speak(w),250);
  const ck=()=>{const v=$("#di").value.trim();if(!v)return;const ok=+v===nv;$("#ck").disabled=true;$("#di").disabled=true;fin(ok,`<span class="fr"><b>${w} = ${nv}</b></span>`,null)};
  $("#ck").onclick=ck;$("#di").onkeydown=e=>{if(e.key==="Enter")ck()};$("#di").focus();
 },
 flagmc(box,it,fin){
  const right=it.o[it.a],sh=shuffle(it.o);
  box.innerHTML=`${hdrQ(it)}<div class="flagopts">${sh.map((c,j)=>`<button class="fopt" data-o="${j}">${ico("flag:"+c,true)}</button>`).join("")}</div>`;
  if(it.say)setTimeout(()=>speak(it.say),250);
  box.querySelectorAll(".fopt").forEach(b=>b.onclick=()=>{const ok=sh[+b.dataset.o]===right;box.querySelectorAll(".fopt").forEach(o=>{o.disabled=true;if(sh[+o.dataset.o]===right)o.classList.add("right")});if(!ok)b.classList.add("wrong");
    fin(ok,(ok?"":`العلم الصحيح هو علم ${cinfo(right)[7]}. `)+(it.x?bidi(it.x):""),null)});
 },
 ws(box,it,fin){box.innerHTML=`${hdrQ(it)}<div id="wsbox"></div>`;wsWidget($("#wsbox"),it.words,()=>fin(true,"ممتاز! وجدتَ كل الكلمات."))}
};
/* ── شبكة الكلمات المتقاطعة (word search) ── */
function wsWidget(root,words,done){
  const clean=w=>stripAcc(w.toLowerCase()).replace(/[^a-z]/g,"").toUpperCase();
  const W=words.map(w=>({show:w,w:clean(w)}));const N=Math.max(10,...W.map(x=>x.w.length+1));
  let grid,tries=0,ok=false;
  while(!ok&&tries++<80){grid=Array.from({length:N},()=>Array(N).fill(""));ok=true;
    for(const x of shuffle(W)){let placed=false;
      for(let t=0;t<200&&!placed;t++){const d=[[0,1],[1,0],[1,1]][Math.floor(Math.random()*3)],rev=Math.random()<.2,s=rev?x.w.split("").reverse().join(""):x.w;
        const r0=Math.floor(Math.random()*(N-d[0]*(s.length-1))),c0=Math.floor(Math.random()*(N-d[1]*(s.length-1)));
        let fit=true;for(let i=0;i<s.length;i++){const g=grid[r0+d[0]*i][c0+d[1]*i];if(g&&g!==s[i]){fit=false;break}}
        if(fit){for(let i=0;i<s.length;i++)grid[r0+d[0]*i][c0+d[1]*i]=s[i];placed=true;x.cells=Array.from({length:s.length},(_,i)=>[r0+d[0]*i,c0+d[1]*i])}}
      if(!placed){ok=false;break}}}
  const AB="ABCDEFGHIJKLMNOPRSTUV";grid=grid.map(r=>r.map(c=>c||AB[Math.floor(Math.random()*AB.length)]));
  const found=new Set();let first=null;
  const draw=()=>{root.innerHTML=`<p style="margin:0;text-align:center">اضغط على أول حرف من الكلمة ثم على آخر حرف فيها (أفقياً أو عمودياً أو قطرياً، وقد تكون معكوسة).</p>
   <div class="ws" style="--n:${N}">${grid.map((r,i)=>r.map((c,j)=>`<button class="wc ${first&&first[0]===i&&first[1]===j?"f":""} ${[...found].some(k=>W[k].cells.some(p=>p[0]===i&&p[1]===j))?"ok":""}" data-r="${i}" data-c="${j}">${c}</button>`).join("")).join("")}</div>
   <div class="wsw">${W.map((x,k)=>`<span class="${found.has(k)?"got":""} fr">${esc(x.show)}</span>`).join("")}</div>`;
   root.querySelectorAll(".wc").forEach(b=>b.onclick=()=>{const p=[+b.dataset.r,+b.dataset.c];
     if(!first){first=p;draw();return}
     const a=first,z=p;first=null;
     W.forEach((x,k)=>{if(found.has(k))return;const s=x.cells[0],e=x.cells[x.cells.length-1];
       if((s[0]===a[0]&&s[1]===a[1]&&e[0]===z[0]&&e[1]===z[1])||(e[0]===a[0]&&e[1]===a[1]&&s[0]===z[0]&&s[1]===z[1])){found.add(k);speak(x.show)}});
     draw();if(found.size===W.length)setTimeout(done,500)})};
  draw();
}

/* ───── توليد الأسئلة ───── */
function lettersMissing(w){
  const cand=[];for(let i=1;i<w.length;i++)if(/[a-zàâçéèêëîïôûùüœ]/i.test(w[i]))cand.push(i);
  const i=cand[Math.floor(Math.random()*cand.length)],ans=w[i].toLowerCase();
  const VAR={e:["é","è","ê","e"],é:["e","è","ê","é"],è:["e","é","ê","è"],ê:["e","é","è","ê"],a:["a","à","â","e"],à:["a","â","e","à"],â:["a","à","e","â"],c:["c","ç","s","k"],ç:["c","s","k","ç"],o:["o","ô","u","a"],ô:["o","u","a","ô"],i:["i","î","y","e"],î:["i","y","e","î"],u:["u","û","ù","o"]};
  let o=VAR[ans]?VAR[ans].filter(x=>x!==ans).slice(0,3):shuffle("aeioulnrstcdmpvbf".split("").filter(c=>c!==ans)).slice(0,3);
  return{shown:w.slice(0,i)+"_"+w.slice(i+1),ans,o}}
function genQs(units,kinds){
  const pool=[];const seen=new Set();units.forEach(u=>u.vocab.forEach(w=>{const k=w.fr.toLowerCase();if(!seen.has(k)&&w.ar.length<=34){seen.add(k);pool.push(w)}}));
  const out=[];
  const pickAr=w=>shuffle(pool.filter(p=>p.ar!==w.ar&&!(w.ic&&w.ic.startsWith("txt:")!==p.ic.startsWith("txt:")))).slice(0,3).map(p=>p.ar);
  const pickFr=w=>shuffle(pool.filter(p=>p.fr.toLowerCase()!==w.fr.toLowerCase()&&p.fr.length<30&&!(w.ic&&w.ic.startsWith("txt:")!==p.ic.startsWith("txt:")))).slice(0,3).map(p=>p.fr);
  const kindOf=i=>i.startsWith("flag:")?"f":i.startsWith("col:")?"c":i.startsWith("txt:")?"t":"e";
  pool.forEach(w=>{
    const k=w.fr.toLowerCase(),a3=pickAr(w),f3=pickFr(w),say=sayOf(w);
    if(a3.length<3||f3.length<3)return;
    if(kinds.mean)out.push({key:k,w:w.fr,a:/\d/.test(w.ar)&&w.ar.length<4?"ما العدد؟":"ما معنى هذه الكلمة أو العبارة؟",e:w.fr,spk:say,o:[w.ar,...a3],x:`${w.fr} = ${w.ar}${w.pr?" · النطق: "+w.pr:""}`});
    if(kinds.rev&&w.fr.length<30)out.push({key:k,w:w.fr,a:"ما الكلمة الفرنسية التي معناها:",ar:w.ar,o:[w.fr,...f3],x:`${w.ar} = ${w.fr}`,spkAfter:say});
    if(kinds.pic&&w.ic&&!w.ic.startsWith("txt:")){const kd=kindOf(w.ic);const o3=shuffle(pool.filter(p=>p.ic&&kindOf(p.ic)===kd&&p.fr.toLowerCase()!==k&&p.fr.length<30)).slice(0,3).map(p=>p.fr);
      if(o3.length===3)out.push({key:k,w:w.fr,a:kd==="f"?"أي بلد أو جنسية يخصّ هذا العلم؟":kd==="c"?"ما اسم هذا اللون؟":"ماذا ترى في الصورة؟",ico:w.ic,o:[w.fr,...o3],x:`${w.fr} = ${w.ar}`,spkAfter:say})}
    if(kinds.spell&&/^[a-zàâçéèêëîïôûùüœ]{4,12}$/i.test(w.fr)){const m=lettersMissing(w.fr.toLowerCase());out.push({key:k,w:w.fr,a:`أكمل الحرف الناقص (${w.ar}):`,e:m.shown,spk:say,o:[m.ans,...m.o],x:`${w.fr} = ${w.ar}`})}
    if(kinds.listen&&w.fr.length<30)out.push({key:k,w:w.fr,a:"استمع واختر الكلمة التي سمعتها:",listen:say,o:[w.fr,...f3],x:`${w.fr} = ${w.ar}`});
  });
  return out}
const handQs=units=>units.flatMap(u=>u.qs.map((q,i)=>({key:"h"+u.id+"_"+i,...q})));
function buildQuiz(u,mode){
  const units=srcUnits(u);let kinds={mean:1,rev:1,pic:1,spell:1,listen:1};
  if(mode==="listen")kinds={listen:1};
  let gen=genQs(units,kinds);
  if(mode==="hardonly")gen=gen.filter(q=>hardSet[q.key]);
  const hw=(mode==="listen"||mode==="hardonly")?[]:shuffle(handQs(units));
  gen=shuffle(gen);const seen=new Set(),uniq=[];gen.forEach(q=>{if(!seen.has(q.key)){seen.add(q.key);uniq.push(q)}});
  const rest=gen.filter(q=>!uniq.includes(q));
  return{hw,uniq,rest,total:hw.length+uniq.length+rest.length};
}
function pickQs(b,n){
  const nh=Math.min(b.hw.length,Math.ceil(n*.4));let sel=b.hw.slice(0,nh);
  sel=sel.concat(b.uniq.slice(0,n-sel.length));
  if(sel.length<n)sel=sel.concat(b.hw.slice(nh,nh+n-sel.length));
  if(sel.length<n)sel=sel.concat(b.rest.slice(0,n-sel.length));
  return shuffle(sel).slice(0,n);
}
function quizSetup(u,mode){
  mode=mode||"all";
  const b=buildQuiz(u,mode);const total=b.total;
  const opts=[5,10,15,20,30,50].filter(x=>x<total);if(total)opts.push(total);
  let n=Math.min(10,total);
  const title=mode==="listen"?"👂 اختبار الاستماع":mode==="hardonly"?"⭐ اختبار كلماتي الصعبة":u.id===0?"🏆 تحدي البطل":"✏️ اختبر نفسك";
  const root=pane()||(()=>{topBar(home);app.innerHTML='<div id="pane"></div>';return pane()})();
  if(!total){root.innerHTML=`<div class="qbox setup"><h3>${title}</h3><p>لا توجد أسئلة كافية. أضف كلمات صعبة بالضغط على ★ أو جرّب اختباراً آخر.</p></div>`;return}
  root.innerHTML=`<div class="qbox setup pop"><div style="font-size:2.6rem">${title.split(" ")[0]}</div><h3>${title.slice(2)}</h3>
   <p style="margin:0">كم سؤالاً تريد؟ اختر العدد الذي يناسبك:</p>
   <div class="cnt">${opts.map(x=>`<button data-n="${x}" aria-pressed="${x===n}">${x===total&&total>50?"الكل "+x:x}</button>`).join("")}</div>
   <p style="margin:0;color:var(--muted);font-size:.95rem">أسئلة معاني، كلمات، صور وأعلام، تهجئة، واستماع. وأي كلمة تخطئ فيها تُضاف إلى كلماتك الصعبة.</p>
   <button class="btn" id="go">ابدأ الاختبار ←</button></div>`;
  root.querySelectorAll("[data-n]").forEach(bn=>bn.onclick=()=>{n=+bn.dataset.n;root.querySelectorAll("[data-n]").forEach(x=>x.setAttribute("aria-pressed",x===bn))});
  $("#go").onclick=()=>{const qs=pickQs(b,n);
    runQuiz(qs,(score,wrong)=>{
      const p=score/qs.length,st=starsOf(p);
      if(mode==="all"&&u.id&&(best[u.id]||0)<st){best[u.id]=st;saveBest()}
      if(st>=2)confetti();
      const t=st===3?["🏆","بطل الفرنسية!"]:st===2?["🌟","عمل رائع!"]:st===1?["👍","جيد، تستطيع أكثر!"]:["📚","راجع الدروس وحاول مجدداً"];
      root.innerHTML=`<div class="qbox result pop"><div class="big">${t[0]}</div><h3>${t[1]}</h3><div class="rs stars">${starRow(st)}</div><div class="num">${score} من ${qs.length} إجابة صحيحة</div>
       <div class="row c"><button class="btn" id="ag">🔁 اختبار جديد</button><button class="btn ghost" id="hm">🏠 الوحدات</button></div>
       ${wrong.length?`<div class="review"><h4>راجع هذه الأسئلة (وأضفنا كلماتها إلى كلماتك الصعبة):</h4>${wrong.map(w=>`<div class="rv">${w[0]?`<span class="${isLat(w[0])?"fr":""}">${esc(w[0])}</span><br>`:""}<span class="a">✔ <span class="${isLat(w[1])?"fr":""}">${esc(w[1])}</span></span></div>`).join("")}</div>`:""}</div>`;
      $("#ag").onclick=()=>u.id===0?challenge():unit(u.id,"quiz");$("#hm").onclick=home;topBar(home);
    },root);
  };
}
function challenge(){topBar(home);app.setAttribute("style","--c:var(--btn);--cs:var(--btn-soft)");app.innerHTML='<section class="hero" style="background:var(--ink);color:var(--paper)"><span class="em">🏆</span><div><h2 style="direction:rtl;font-family:var(--display)">تحدي البطل</h2><div>أسئلة من كل وحدات الكتاب</div></div></section><div id="pane"></div>';quizSetup(ALL);scrollTo(0,0)}

function runQuiz(qs,onDone,root){
  let n=0,score=0;const wrong=[];
  const step=()=>{
    const q=qs[n];let right,sh;const isTF=q.tf===true;
    if(isTF){right=q.tfa?"صح":"خطأ";sh=["صح","خطأ"]}else{right=q.o[0];sh=shuffle(q.o)}
    const lat=!isTF&&sh.every(isLat);const spk=q.listen||q.spk;
    root.innerHTML=`<div class="qbox pop"><div class="qtop"><span>سؤال ${n+1} من ${qs.length}</span><span>✔ ${score}</span></div><div class="qbar"><i style="width:${n/qs.length*100}%"></i></div>
     ${q.a?`<div class="qa">${bidi(q.a)}</div>`:isTF?`<div class="qa">صح أم خطأ؟</div>`:""}
     ${q.ico?`<div style="text-align:center">${ico(q.ico,true)}</div>`:""}
     ${q.ar?`<div class="qar">${esc(q.ar)}</div>`:""}
     ${q.listen?`<div class="row c">${bothBtn(q.listen)}</div>`:""}
     ${q.e?`<div class="qline"><div class="qe">${esc(q.e)}</div>${spk&&!q.listen?bothBtn(spk):""}</div>`:""}
     <div class="opts">${sh.map((o,j)=>`<button class="opt ${lat?"lat":""}" data-o="${j}"><span class="k">${LET[j]}</span><span>${esc(o)}</span></button>`).join("")}</div><div id="fbk"></div></div>`;
    bindSpeak(root);if(q.listen)setTimeout(()=>speak(q.listen),250);
    root.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{
      const pick=sh[+b.dataset.o],ok=pick===right;
      root.querySelectorAll(".opt").forEach(o=>{o.disabled=true;if(sh[+o.dataset.o]===right)o.classList.add("right")});
      if(ok)score++;else{b.classList.add("wrong");wrong.push([q.e||q.ar||q.a||"",right]);if(q.w)addHard(q.w)}
      const praise=["أحسنت! 🌟","رائع! 🎉","ممتاز يا بطل! 💪","صحيح! 👏","Très bien ! 🌟"];
      $("#fbk").innerHTML=`<div class="fb ${ok?"good":"bad"}"><b>${ok?praise[Math.floor(Math.random()*praise.length)]:"لا بأس، تعلّم معي 🙂"}</b> ${ok?"":"الإجابة الصحيحة: <strong class='"+(isLat(right)?"fr":"")+"'>"+esc(right)+"</strong>. "}${q.x?`<span>${bidi(q.x)}</span>`:""}</div><button class="btn" id="nxq" style="margin-top:10px">${n+1<qs.length?"التالي ←":"النتيجة 🏁"}</button>`;
      if(ok&&q.spkAfter)speak(q.spkAfter);else if(!ok&&q.w&&(q.listen||q.spk||q.spkAfter))speak(q.listen||q.spk||q.spkAfter);
      const nb=$("#nxq");nb.focus({preventScroll:true});nb.onclick=()=>{stopSpeak();n++;if(n<qs.length){step();root.scrollIntoView({block:"start"});scrollBy(0,-90)}else onDone(score,wrong)};
    });
  };
  step();
}

/* ───── الألعاب ───── */
function gamesTab(u){
  const G=[["match","🔗","وصّل الكلمة بمعناها","اربط الفرنسي بالعربي"],["memory","🧠","لعبة الذاكرة","اقلب البطاقات: صورة وكلمة"],["spell","🔡","رتّب الحروف","كوّن الكلمة من حروفها"],["sent","🧩","رتّب الجملة","ضع الكلمات في مكانها"],["ws","🔎","الكلمات المخفية","جد الكلمات في الشبكة"]];
  if(u.id===1||u.id===0)G.push(["alpha","🔤","لعبة الأبجدية","اسمع اسم الحرف واختره"]);
  if(u.id===1||u.id===4||u.id===0)G.push(["nums","🔢","لعبة الأرقام","اسمع الرقم واختره"]);
  if(u.id===2||u.id===0)G.push(["flags","🚩","لعبة الأعلام","خمّن الجنسية من العلم"]);
  pane().innerHTML=`<div class="sec pop"><section class="card"><h3>🎮 ألعاب ممتعة</h3><p style="margin:0">العب لتتعلم الكلمات والجمل. كل لعبة جولة قصيرة، ويمكنك إعادتها بكلمات جديدة.</p>
  <div class="gcards">${G.map(g=>`<button class="gc" data-g="${g[0]}"><span>${g[1]}</span><div><b>${g[2]}</b><small>${g[3]}</small></div></button>`).join("")}</div></section><div id="game"></div></div>`;
  const F={match:gMatch,memory:gMemory,spell:gSpell,sent:gSent,ws:gWS,alpha:gAlpha,nums:gNums,flags:gFlags};
  pane().querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>{F[b.dataset.g](u);$("#game").scrollIntoView({behavior:"smooth",block:"start"})});
}
const gbox=()=>$("#game");
const again=(fn,u,msg)=>{confetti();gbox().innerHTML=`<div class="qbox result pop"><div class="big">🏆</div><h3>${msg}</h3><div class="row c"><button class="btn" id="ag">🔁 جولة جديدة</button></div></div>`;$("#ag").onclick=()=>fn(u)};
function gMatch(u){
  const ws=shuffle(vocabOf(u).filter(w=>w.fr.length<24&&w.ar.length<22)).slice(0,6);let sel=null,done=0;
  const fr=ws,ar=shuffle(ws);
  gbox().innerHTML=`<div class="qbox pop"><h3>🔗 وصّل الكلمة بمعناها</h3><p style="margin:0">اضغط كلمة فرنسية ثم معناها بالعربي.</p><div class="pairs"><div class="col">${fr.map((w,i)=>`<button class="pr en" data-e="${i}">${esc(w.fr)}</button>`).join("")}</div><div class="col">${ar.map((w,i)=>`<button class="pr" data-a="${i}">${esc(w.ar)}</button>`).join("")}</div></div><div id="fbk"></div></div>`;
  const L=gbox().querySelectorAll("[data-e]"),R=gbox().querySelectorAll("[data-a]");
  L.forEach(b=>b.onclick=()=>{L.forEach(x=>x.classList.remove("sel"));b.classList.add("sel");sel=+b.dataset.e;speak(sayOf(fr[sel]))});
  R.forEach(b=>b.onclick=()=>{if(sel===null)return;const w=ar[+b.dataset.a];
    if(w===fr[sel]){b.classList.add("done");L[sel].classList.remove("sel");L[sel].classList.add("done");sel=null;if(++done===ws.length){confetti();$("#fbk").innerHTML=`<div class="fb good"><b>ممتاز! أنهيت اللعبة 🎉</b></div><div class="row c" style="margin-top:8px"><button class="btn" id="ag">🔁 جولة جديدة</button></div>`;$("#ag").onclick=()=>gMatch(u)}}
    else{b.classList.add("no");setTimeout(()=>b.classList.remove("no"),350);addHard(fr[sel].fr)}});
}
function gMemory(u){
  let items=shuffle(vocabOf(u).filter(w=>w.ic&&!w.ic.startsWith("txt:")&&w.fr.length<18)).slice(0,6);
  if(items.length<3){gbox().innerHTML=`<div class="qbox"><p>لا توجد صور كافية في هذه الوحدة. جرّب لعبة أخرى.</p></div>`;return}
  const cards=shuffle(items.flatMap(w=>[{k:w.fr,t:"i",w},{k:w.fr,t:"w",w}]));let open=[],matched=0,moves=0;
  gbox().innerHTML=`<div class="qbox pop"><h3>🧠 لعبة الذاكرة</h3><p style="margin:0">اقلب بطاقتين: صورة والكلمة التي تناسبها. <span id="mv">0</span> محاولة</p><div class="mem">${cards.map((c,i)=>`<button class="mc" data-i="${i}" aria-label="بطاقة"><div class="mc-in"><div class="f fr">?</div><div class="f bk">${c.t==="i"?ico(c.w.ic):`<span class="fr">${esc(c.w.fr)}</span>`}</div></div></button>`).join("")}</div><div id="fbk"></div></div>`;
  const els=[...gbox().querySelectorAll(".mc")];
  els.forEach((el,i)=>el.onclick=()=>{if(open.length===2||el.classList.contains("on"))return;el.classList.add("on");open.push(i);if(cards[i].t==="w")speak(sayOf(cards[i].w));
    if(open.length===2){moves++;$("#mv").textContent=moves;const[a,b]=open;
      if(cards[a].k===cards[b].k&&cards[a].t!==cards[b].t){els[a].classList.add("ok");els[b].classList.add("ok");open=[];if(++matched===items.length){confetti();$("#fbk").innerHTML=`<div class="fb good"><b>رائع! أنهيتها في ${moves} محاولة 🎉</b></div><div class="row c" style="margin-top:8px"><button class="btn" id="ag">🔁 جولة جديدة</button></div>`;$("#ag").onclick=()=>gMemory(u)}}
      else setTimeout(()=>{els[a].classList.remove("on");els[b].classList.remove("on");open=[]},900)}});
}
function gSpell(u){
  const pool=shuffle(vocabOf(u).filter(w=>/^[a-zàâçéèêëîïôûùüœ]{3,11}$/i.test(w.fr))).slice(0,6);let n=0;
  const step=()=>{
    if(n>=pool.length){again(gSpell,u,"أحسنت! أنهيت الجولة");return}
    const w=pool[n],word=w.fr.toLowerCase();let typed=[];const tiles=shuffle(word.split("").map((c,i)=>({c,i})));
    const draw=()=>{gbox().innerHTML=`<div class="qbox pop"><div class="qtop"><span>كلمة ${n+1} من ${pool.length}</span><span></span></div><div class="gprompt">${w.ic?ico(w.ic,true):""}<div class="qar">${esc(w.ar)}</div><div class="row c">${bothBtn(sayOf(w))}</div></div>
      <div class="slots">${word.split("").map((_,i)=>`<button class="slot" data-s="${i}">${typed[i]?typed[i].c:""}</button>`).join("")}</div>
      <div class="tiles">${tiles.map(t=>`<button class="tile ${typed.includes(t)?"used":""}" data-t="${t.i}">${t.c}</button>`).join("")}</div>
      <div class="row c"><button class="btn ghost sm" id="clr">↺ مسح</button></div><div id="fbk"></div></div>`;
      bindSpeak(gbox());
      gbox().querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{if(typed.length>=word.length)return;typed.push(tiles.find(t=>t.i===+b.dataset.t));draw();check()});
      gbox().querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{typed.splice(+b.dataset.s);draw()});
      $("#clr").onclick=()=>{typed=[];draw()};};
    const check=()=>{if(typed.length<word.length)return;const ans=typed.map(t=>t.c).join("");
      if(ans===word){speak(sayOf(w));gbox().querySelectorAll(".slot").forEach(s=>s.style.background="var(--oks)");$("#fbk").innerHTML=`<div class="fb good"><b>صحيح! 🌟</b></div><div class="row c" style="margin-top:8px"><button class="btn" id="nx">التالي ←</button></div>`;$("#nx").onclick=()=>{n++;step()};gbox().querySelectorAll(".tile").forEach(t=>t.disabled=true)}
      else{addHard(w.fr);gbox().querySelectorAll(".slot").forEach(s=>s.classList.add("no"));setTimeout(()=>{typed=[];draw()},600)}};
    draw();
  };step();
}
function gSent(u){
  const pool=shuffle(shortSent(u)).slice(0,5);let n=0;
  if(!pool.length){gbox().innerHTML=`<div class="qbox"><p>لا توجد جمل كافية.</p></div>`;return}
  const step=()=>{
    if(n>=pool.length){again(gSent,u,"ممتاز! رتّبت كل الجمل");return}
    const[fr,ar]=pool[n];const toks=fr.split(" ");let typed=[];const tiles=shuffle(toks.map((t,i)=>({t,i})));
    const draw=()=>{gbox().innerHTML=`<div class="qbox pop"><div class="qtop"><span>جملة ${n+1} من ${pool.length}</span><span></span></div><p style="margin:0">رتّب الكلمات لتكوّن جملة صحيحة:</p>
      <div><button class="trbtn">🌐 ترجمة</button><div class="tr" hidden>${bidi(ar)}</div></div>
      <div class="qe sline">${typed.map((t,i)=>`<button class="tile" data-r="${i}">${esc(t.t)}</button>`).join("")||'<span style="color:var(--muted);font-size:1rem">اضغط على الكلمات بالترتيب</span>'}</div>
      <div class="tiles">${tiles.map(t=>`<button class="tile ${typed.includes(t)?"used":""}" data-t="${t.i}">${esc(t.t)}</button>`).join("")}</div>
      <div class="row c"><button class="btn ghost sm" id="clr">↺ مسح</button></div><div id="fbk"></div></div>`;
      bindTr(gbox());
      gbox().querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{typed.push(tiles.find(t=>t.i===+b.dataset.t));draw();check()});
      gbox().querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{typed.splice(+b.dataset.r,1);draw()});
      $("#clr").onclick=()=>{typed=[];draw()};};
    const check=()=>{if(typed.length<toks.length)return;
      if(typed.map(t=>t.t).join(" ")===fr){speak(fr);$("#fbk").innerHTML=`<div class="fb good"><b>جملة صحيحة! 🌟</b></div><div class="row c" style="margin-top:8px"><button class="btn" id="nx">التالي ←</button></div>`;$("#nx").onclick=()=>{n++;step()};gbox().querySelectorAll(".tile").forEach(t=>t.disabled=true)}
      else $("#fbk").innerHTML=`<div class="fb bad">ليست صحيحة بعد، جرّب ترتيباً آخر.</div>`};
    draw();
  };step();
}
function gWS(u){
  const ws=shuffle(vocabOf(u).filter(w=>/^[a-zàâçéèêëîïôûùüœ]{4,9}$/i.test(w.fr))).slice(0,6).map(w=>w.fr);
  gbox().innerHTML=`<div class="qbox pop"><h3>🔎 الكلمات المخفية</h3><div id="wsbox"></div><div id="fbk"></div></div>`;
  wsWidget($("#wsbox"),ws,()=>{confetti();$("#fbk").innerHTML=`<div class="fb good"><b>رائع! وجدتَ كل الكلمات 🎉</b></div><div class="row c" style="margin-top:8px"><button class="btn" id="ag">🔁 جولة جديدة</button></div>`;$("#ag").onclick=()=>gWS(u)});
}
function quickRounds(u,title,make,total){
  let n=0,score=0;
  const step=()=>{
    if(n>=total){if(score>=total*.7)confetti();gbox().innerHTML=`<div class="qbox result pop"><div class="big">${score>=total*.7?"🏆":"👍"}</div><h3>${title}: ${score} من ${total}</h3><div class="row c"><button class="btn" id="ag">🔁 جولة جديدة</button></div></div>`;$("#ag").onclick=()=>quickRounds(u,title,make,total);return}
    const q=make();const sh=shuffle(q.o);
    gbox().innerHTML=`<div class="qbox pop"><div class="qtop"><span>${title} ${n+1}/${total}</span><span>✔ ${score}</span></div><div class="gprompt"><p style="margin:0">${q.p}</p><div class="row c">${bothBtn(q.say)}</div></div>
     <div class="opts four">${sh.map((o,j)=>`<button class="opt lat big" data-o="${j}"><span>${esc(o)}</span></button>`).join("")}</div><div id="fbk"></div></div>`;
    bindSpeak(gbox());setTimeout(()=>speak(q.say),250);
    gbox().querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const ok=sh[+b.dataset.o]===q.a;gbox().querySelectorAll(".opt").forEach(o=>{o.disabled=true;if(sh[+o.dataset.o]===q.a)o.classList.add("right")});if(ok)score++;else b.classList.add("wrong");
      $("#fbk").innerHTML=`<div class="fb ${ok?"good":"bad"}"><b>${ok?"صحيح! 🌟":"لا بأس 🙂"}</b> ${q.x}</div><button class="btn" id="nxq" style="margin-top:8px">التالي ←</button>`;$("#nxq").onclick=()=>{n++;step()}});
  };step();
}
function gNums(u){
  const [f,t]=u.id===1?[0,20]:u.id===4?[21,40]:[0,40];
  quickRounds(u,"الأرقام",()=>{const L=NUMS.filter(n=>n[0]>=f&&n[0]<=t);const a=L[Math.floor(Math.random()*L.length)];const o=shuffle(L.filter(x=>x!==a)).slice(0,3).map(x=>String(x[0]));
    return{p:"استمع واختر الرقم الذي سمعته:",say:a[1],a:String(a[0]),o:[String(a[0]),...o],x:`<span class="fr"><b>${a[1]} = ${a[0]}</b></span>`}},8);
}
function gAlpha(u){
  quickRounds(u,"الحروف",()=>{const a=ALPHA[Math.floor(Math.random()*26)];const o=shuffle(ALPHA.filter(x=>x!==a)).slice(0,3).map(x=>x[0].split(" ")[0]);
    return{p:"استمع إلى اسم الحرف واختر الحرف:",say:a[1],a:a[0].split(" ")[0],o:[a[0].split(" ")[0],...o],x:`<span class="fr"><b>${a[0]}</b></span> · ${a[2]}`}},8);
}
function gFlags(u){
  const ids=COUNTRIES.map(c=>c[6]);let n=0,score=0;const total=8;
  const step=()=>{
    if(n>=total){if(score>=total*.7)confetti();gbox().innerHTML=`<div class="qbox result pop"><div class="big">${score>=total*.7?"🏆":"👍"}</div><h3>الأعلام: ${score} من ${total}</h3><div class="row c"><button class="btn" id="ag">🔁 جولة جديدة</button></div></div>`;$("#ag").onclick=()=>gFlags(u);return}
    const id=ids[Math.floor(Math.random()*ids.length)],c=cinfo(id);const o=shuffle(COUNTRIES.filter(x=>x[6]!==id&&x[1]!==c[1])).slice(0,3).map(x=>x[1]);const sh=shuffle([c[1],...o]);
    gbox().innerHTML=`<div class="qbox pop"><div class="qtop"><span>العلم ${n+1}/${total}</span><span>✔ ${score}</span></div><div class="gprompt">${ico("flag:"+id,true)}<p style="margin:0">ما جنسية صاحب هذا العلم؟ (للذكر)</p></div>
     <div class="opts">${sh.map((x,j)=>`<button class="opt lat" data-o="${j}"><span class="k">${LET[j]}</span><span>${esc(x)}</span></button>`).join("")}</div><div id="fbk"></div></div>`;
    gbox().querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const ok=sh[+b.dataset.o]===c[1];gbox().querySelectorAll(".opt").forEach(o=>{o.disabled=true;if(sh[+o.dataset.o]===c[1])o.classList.add("right")});if(ok)score++;else b.classList.add("wrong");
      speak(`${c[0]}. ${c[1]}. ${c[2]}`);$("#fbk").innerHTML=`<div class="fb ${ok?"good":"bad"}"><b>${ok?"صحيح! 🌟":"لا بأس 🙂"}</b> <span class="fr">${c[0]} → ${c[1]} / ${c[2]}</span> (${c[7]})</div><button class="btn" id="nxq" style="margin-top:8px">التالي ←</button>`;$("#nxq").onclick=()=>{n++;step()}});
  };step();
}

home();loadStats();
