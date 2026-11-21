/* French 1st Intermediate – data core  |  علي الصفار */
"use strict";
const UNITS=[];

/* حروف الأبجدية: [Aa, say(النطق للمحرك), اسم الحرف بالعربية, مثال, معنى المثال] */
const ALPHA=[
 ["A a","a","آ","à bientôt","إلى اللقاء قريباً"],
 ["B b","bé","بِيه","bonjour","صباح الخير"],
 ["C c","cé","سِيه","cousin","ابن العم/الخال"],
 ["D d","dé","دِيه","demain","غداً"],
 ["E e","e","أُ (أُو خفيفة)","enchanté","تشرفت"],
 ["F f","effe","إِفْ","football","كرة القدم"],
 ["G g","gé","ژِيه","grand-père","الجد"],
 ["H h","ache","آش","huit","ثمانية"],
 ["I i","i","إي","italien","إيطالي"],
 ["J j","ji","ژِي","jaune","أصفر"],
 ["K k","ka","كَا","kilo","كيلو"],
 ["L l","elle","إِلْ","lecture","القراءة"],
 ["M m","emme","إِمْ","musique","الموسيقى"],
 ["N n","enne","إِنْ","nuit","ليل"],
 ["O o","o","أُو","oncle","العم/الخال"],
 ["P p","pé","پِيه","père","الأب"],
 ["Q q","qu","كْيُ","quatre","أربعة"],
 ["R r","erre","إِير","rouge","أحمر"],
 ["S s","esse","إِسْ","salut","مرحباً"],
 ["T t","té","تِيه","tante","العمة/الخالة"],
 ["U u","u","يُ (u)","une","واحدة"],
 ["V v","vé","ڤِيه","vélo","دراجة"],
 ["W w","double vé","دُوبْلُ ڤِيه","week-end","عطلة نهاية الأسبوع"],
 ["X x","iks","إِكْسْ","taxi","سيارة أجرة"],
 ["Y y","i grec","إي گْرِك","Yuki","يوكي (اسم)"],
 ["Z z","zède","زِيدْ","zéro","صفر"]
];

/* الأرقام 0–40: [رقم, بالفرنسية, نطق عربي] */
const NUMS=[
 [0,"zéro","زِيرُو"],[1,"un","أُونْ"],[2,"deux","دُو"],[3,"trois","تْرْوَا"],[4,"quatre","كَاتْر"],
 [5,"cinq","سَانْك"],[6,"six","سِيس"],[7,"sept","سِت"],[8,"huit","وِيت"],[9,"neuf","نُوف"],
 [10,"dix","دِيس"],[11,"onze","أُونْز"],[12,"douze","دُوز"],[13,"treize","تْرِيز"],[14,"quatorze","كَاتُورْز"],
 [15,"quinze","كَانْز"],[16,"seize","سِيز"],[17,"dix-sept","دِي سِت"],[18,"dix-huit","دِي زْوِيت"],[19,"dix-neuf","دِيز نُوف"],
 [20,"vingt","ڤَانْ"],[21,"vingt-et-un","ڤَانْ تِيه أُونْ"],[22,"vingt-deux","ڤَانْ دُو"],[23,"vingt-trois","ڤَانْ تْرْوَا"],
 [24,"vingt-quatre","ڤَانْ كَاتْر"],[25,"vingt-cinq","ڤَانْ سَانْك"],[26,"vingt-six","ڤَانْ سِيس"],[27,"vingt-sept","ڤَانْ سِت"],
 [28,"vingt-huit","ڤَانْ وِيت"],[29,"vingt-neuf","ڤَانْ نُوف"],[30,"trente","تْرَانْت"],[31,"trente-et-un","تْرَانْت إِيه أُونْ"],
 [32,"trente-deux","تْرَانْت دُو"],[33,"trente-trois","تْرَانْت تْرْوَا"],[34,"trente-quatre","تْرَانْت كَاتْر"],[35,"trente-cinq","تْرَانْت سَانْك"],
 [36,"trente-six","تْرَانْت سِيس"],[37,"trente-sept","تْرَانْت سِت"],[38,"trente-huit","تْرَانْت وِيت"],[39,"trente-neuf","تْرَانْت نُوف"],[40,"quarante","كَارَانْت"]
];

/* دليل النطق والأصوات */
const GUIDE={
 legend:[
  ["ڤ","صوت V","مثل: vélo ← ڤِيلُو (أسنان على الشفة السفلى مع اهتزاز)"],
  ["پ","صوت P","مثل: père ← پِير (انفجاري بلا اهتزاز، ليس باء)"],
  ["گ","صوت G الثقيل","مثل: grand ← گْرَانْ"],
  ["ژ","صوت J/G الناعم","مثل: bonjour ← بُونْژُور (كالجيم في «جاك» بالفرنسية)"],
  ["ش","صوت CH","مثل: enchanté ← آنْشَانْتِيه"],
  ["نْ","غُنّة أنفية","نون ساكنة لا تُنطق كاملة، يخرج الصوت من الأنف: bon ← بُونْ"],
  ["يُ","صوت U الفرنسي","انطق ياء وأنت تضم شفتيك كما في «و»: salut ← سَالْيُ"],
  ["ر","صوت R","في الفرنسية يخرج من الحلق قرب الغين والخاء، استمع جيداً للصوت"]
 ],
 accents:[
  ["é","accent aigu","إيه","élève","تلميذ"],
  ["è","accent grave","إي (مفتوحة)","père","الأب"],
  ["ê","accent circonflexe","إي (مفتوحة)","fête","عيد/حفلة"],
  ["à","accent grave","آ","à demain","إلى الغد"],
  ["ù","accent grave","يُ","où","أين"],
  ["ô","accent circonflexe","أُو","hôtel","فندق"],
  ["î","accent circonflexe","إي","île","جزيرة"],
  ["ç","cédille","سين","français","فرنسي"],
  ["ë ï","tréma","تُنطق الحرفان منفصلين","Noël","عيد الميلاد"]
 ],
 sounds:[
  ["ou","و","bonjour","بُونْژُور","صباح الخير"],
  ["oi","وَا","trois","تْرْوَا","ثلاثة"],
  ["ai / ei","إي (مفتوحة)","j’aime","ژِيم","أحب"],
  ["au / eau","أُو","au revoir","أُو رُڤْوَار","إلى اللقاء"],
  ["eu / œu","صوت بين الأُو والإي، شفتان مستديرتان","deux","دُو","اثنان"],
  ["ch","ش","enchanté","آنْشَانْتِيه","تشرفت"],
  ["gn","نْيْ","Allemagne","أَلْمَانْيْ","ألمانيا"],
  ["qu","ك","musique","مُيزِيك","موسيقى"],
  ["ph","ف","photo","فُوتُو","صورة"],
  ["c + e/i","س","cinq","سَانْك","خمسة"],
  ["c + a/o/u","ك","cousin","كُوزَانْ","ابن العم"],
  ["ç","س","français","فْرَانْسِيه","فرنسي"],
  ["g + e/i","ژ","belge","بِلْژ","بلجيكي"],
  ["g + a/o/u","گ","grand","گْرَانْ","كبير"],
  ["s بين حرفين متحركين","ز","musique","مُيزِيك","موسيقى"],
  ["an / en","آنْ (أنفية)","enchanté","آنْشَانْتِيه","تشرفت"],
  ["on","أُونْ (أنفية)","bonjour","بُونْژُور","صباح الخير"],
  ["in / ain / ein / ien","آنْ (أنفية مفتوحة)","bien","بْيَانْ","جيد"],
  ["un","أُونْ (أنفية)","un","أُونْ","واحد"],
  ["ill / y بين حرفين","ي","famille","فَامِي","عائلة"]
 ],
 silent:[
  ["salut","الـ t في النهاية لا تُنطق","سَالْيُ"],
  ["nuit","الـ t في النهاية لا تُنطق","نْوِي"],
  ["trois","الـ s في النهاية لا تُنطق","تْرْوَا"],
  ["français","الـ s في النهاية لا تُنطق","فْرَانْسِيه"],
  ["huit","الـ h لا تُنطق أبداً تقريباً","وِيت"],
  ["famille","الـ e في النهاية لا يُنطق","فَامِي"],
  ["Ils parlent","النهاية -ent في الفعل لا تُنطق","إِيل پَارْلْ"]
 ],
 elision:[
  ["je + ai","j’ai","ژِيه","أنا عندي (أنا عمري)"],
  ["je + appelle","je m’appelle","ژُ مَابِل","اسمي"],
  ["le + oncle","l’oncle","لُونْكْل","العم"],
  ["ne + aime","n’aime","نِيم","لا أحب"],
  ["ce + est","c’est","سِي","هذا هو"],
  ["que/qui + est-ce","qu’est-ce","كِيسْ","ما هذا؟"]
 ],
 liaison:[
  ["vous allez","vou-z-allez","ڤُو زَالِيه","يُنطق z بين الكلمتين"],
  ["les amis","lè-z-amis","لِي زَامِي","يُنطق z بين الكلمتين"],
  ["un ami","u-n-ami","أُو نَامِي","يُنطق n بين الكلمتين"],
  ["comment allez-vous","comment-t-allez","كُومَانْ تَالِيه","يُنطق t بين الكلمتين"]
 ]
};

/* دول وجنسيات: [دولة, فرنسي مذكر, مؤنث, نطق دولة, نطق مذكر, نطق مؤنث, علم, عربي دولة, عربي مذكر, عربي مؤنث] */
const COUNTRIES=[
 ["la France","français","française","لَا فْرَانْسْ","فْرَانْسِيه","فْرَانْسِيز","fr","فرنسا","فرنسي","فرنسية"],
 ["l’Irak","irakien","irakienne","لِيرَاك","إِيرَاكْيَانْ","إِيرَاكْيِين","iq","العراق","عراقي","عراقية"],
 ["le Japon","japonais","japonaise","لُ ژَاپُونْ","ژَاپُونِيه","ژَاپُونِيز","jp","اليابان","ياباني","يابانية"],
 ["le Canada","canadien","canadienne","لُ كَانَادَا","كَانَادْيَانْ","كَانَادْيِين","ca","كندا","كندي","كندية"],
 ["l’Algérie","algérien","algérienne","لَالْژِيرِي","أَلْژِيرْيَانْ","أَلْژِيرْيِين","dz","الجزائر","جزائري","جزائرية"],
 ["l’Italie","italien","italienne","لِيتَالِي","إِيتَالْيَانْ","إِيتَالْيِين","it","إيطاليا","إيطالي","إيطالية"],
 ["le Liban","libanais","libanaise","لُ لِيبَانْ","لِيبَانِيه","لِيبَانِيز","lb","لبنان","لبناني","لبنانية"],
 ["l’Allemagne","allemand","allemande","لَالْمَانْيْ","أَلْمَانْ","أَلْمَانْد","de","ألمانيا","ألماني","ألمانية"],
 ["la Belgique","belge","belge","لَا بِلْژِيك","بِلْژ","بِلْژ","be","بلجيكا","بلجيكي","بلجيكية"],
 ["la Russie","russe","russe","لَا رُيسِي","رُيس","رُيس","ru","روسيا","روسي","روسية"],
 ["le Maroc","marocain","marocaine","لُ مَارُوك","مَارُوكَانْ","مَارُوكِين","ma","المغرب","مغربي","مغربية"],
 ["la Tunisie","tunisien","tunisienne","لَا تُيْنِيزِي","تُيْنِيزْيَانْ","تُيْنِيزْيِين","tn","تونس","تونسي","تونسية"],
 ["l’Argentine","argentin","argentine","لَارْژَانْتِين","أَرْژَانْتَانْ","أَرْژَانْتِين","ar","الأرجنتين","أرجنتيني","أرجنتينية"],
 ["l’Inde","indien","indienne","لَانْد","أَنْدْيَانْ","أَنْدْيِين","in","الهند","هندي","هندية"],
 ["l’Autriche","autrichien","autrichienne","لُوتْرِيش","أُوتْرِيشْيَانْ","أُوتْرِيشْيِين","at","النمسا","نمساوي","نمساوية"],
 ["la Pologne","polonais","polonaise","لَا پُولُونْيْ","پُولُونِيه","پُولُونِيز","pl","بولندا","بولندي","بولندية"],
 ["la Suisse","suisse","suisse","لَا سُويس","سُويس","سُويس","ch","سويسرا","سويسري","سويسرية"]
];

/* الألوان */
const COLORS=[
 ["blanc","أبيض","بْلَانْ","col:#FFFFFF"],["rouge","أحمر","رُوژ","col:#CE1126"],["bleu","أزرق","بْلُو","col:#0055A4"],
 ["noir","أسود","نْوَار","col:#111111"],["vert","أخضر","ڤِير","col:#00843D"],["jaune","أصفر","ژُون","col:#FFD100"]
];

/* أسماء فرنسية شائعة */
const NAMES={
 f:["Alice","Anna","Camille","Clara","Emma","Justine","Louise","Lucie","Margot","Zoé"],
 m:["Adam","Julien","Léo","Louis","Manuel","Matthieu","Oscar","Paul","Théo","Tom"]
};
/* الوحدة 1 – Présentons-nous ! */
UNITS.push({
 id:1,no:"الوحدة ١",fr:"Présentons-nous !",ar:"لنُقدِّم أنفسنا",emoji:"👋",
 intro:"في هذه الوحدة تتعلم كيف تُلقي التحية وتودّع، وكيف تقول اسمك وعمرك وتسأل غيرك، وتتعرف على حروف الأبجدية الفرنسية والأرقام من 0 إلى 20. وفي النهاية تشارك في «لعبة الصداقة» لتكوّن أصدقاء جدداً.",
 goals:[
  ["saluer","أُحيّي"],["prendre congé de quelqu’un","أودّع شخصاً"],
  ["donner mon nom et demander le nom à quelqu’un","أقول اسمي وأسأل عن اسم شخص"],
  ["connaître et réciter les lettres de l’alphabet","أعرف حروف الأبجدية وأقرؤها"],
  ["connaître les chiffres et les nombres (de 0 jusqu’à 20)","أعرف الأرقام من 0 إلى 20"]],
 task:{fr:"L’Institut français d’Irak organise un jeu qui te permettra de te faire des amis. Tu décides d’y participer.",
  ar:"يُنظّم المعهد الفرنسي في العراق لعبةً تساعدك على تكوين الأصدقاء، وقد قررتَ المشاركة فيها."},
 dl:{
  d1:{t:"Audio 1 · أليس وإيما",ar:"التقت أليس بصديقتها إيما مساءً.",lines:[
   ["Alice","Bonsoir Emma ! Comment ça va ?","مساء الخير إيما! كيف حالك؟"],
   ["Emma","Salut Alice ! Ça va bien, merci. Et toi ?","مرحباً أليس! بخير، شكراً. وأنتِ؟"],
   ["Alice","Ça va bien aussi, merci. Passe une bonne soirée !","أنا بخير أيضاً، شكراً. أتمنى لكِ أمسية طيبة!"],
   ["Emma","Merci. Toi aussi. Au revoir !","شكراً. وأنتِ أيضاً. إلى اللقاء!"],
   ["Alice","À bientôt !","إلى اللقاء قريباً!"]]},
  d2:{t:"Audio 2 · أوسكار والسيد دوبوا",ar:"يُحيّي أوسكار معلّمه السيد دوبوا صباحاً، ويخاطبه بـ vous احتراماً.",lines:[
   ["Oscar","Bonjour Monsieur Dubois ! Comment allez-vous ?","صباح الخير سيد دوبوا! كيف حالكم؟"],
   ["M. Dubois","Bonjour Oscar. Ça va bien, merci. À demain en classe.","صباح الخير أوسكار. بخير، شكراً. إلى الغد في الصف."],
   ["Oscar","Oui, monsieur. À demain.","نعم يا سيدي. إلى الغد."],
   ["M. Dubois","Au revoir Oscar. Bonne journée !","إلى اللقاء أوسكار. يوماً سعيداً!"]]},
  d5:{t:"Audio 7 · توم وآدم والسيد دوبوا",ar:"يتعرف توم وآدم إلى مدرّب الكرة الطائرة.",lines:[
   ["Tom","Salut ! Je m’appelle Tom. J’ai 11 ans. Et toi, comment t’appelles-tu ? Quel âge as-tu ?","مرحباً! اسمي توم. عمري 11 سنة. وأنت، ما اسمك؟ كم عمرك؟"],
   ["Adam","Salut Tom ! Je m’appelle Adam. J’ai 12 ans.","مرحباً توم! اسمي آدم. عمري 12 سنة."],
   ["Tom","Quel est le nom de notre entraîneur de volleyball ?","ما اسم مدرّبنا في الكرة الطائرة؟"],
   ["Adam","Je ne sais pas. On peut lui demander.","لا أعرف. يمكننا أن نسأله."],
   ["Tom et Adam","Bonjour monsieur !","صباح الخير يا سيد!"],
   ["M. Dubois","Bonjour !","صباح الخير!"],
   ["Tom","Je m’appelle Tom et c’est Adam. Et vous ? Comment vous appelez-vous ?","اسمي توم وهذا آدم. وأنتم؟ ما اسمكم؟"],
   ["M. Dubois","Enchanté Tom et Adam ! Je m’appelle Victor Dubois.","تشرفت يا توم وآدم! اسمي فيكتور دوبوا."],
   ["Tom et Adam","Enchantés Monsieur Dubois !","تشرفنا سيد دوبوا!"],
   ["M. Dubois","À tout de suite pour l’entraînement !","إلى بعد قليل في التدريب!"]]},
  d9:{t:"Audio 10 · الأسئلة والأجوبة",ar:"توم يسأل آدم ثم يسأل السيد دوبوا.",lines:[
   ["Tom","Comment t’appelles-tu ?","ما اسمك؟"],["Adam","Je m’appelle Adam.","اسمي آدم."],
   ["Tom","Quel âge as-tu ?","كم عمرك؟"],["Adam","J’ai 12 ans.","عمري 12 سنة."],
   ["Tom","Comment vous appelez-vous ?","ما اسمكم؟ (للكبير)"],["M. Dubois","Je m’appelle Victor Dubois.","اسمي فيكتور دوبوا."]]},
  d10:{t:"نموذج حوار · في الحديقة",ar:"ولدان يتعرفان في الحديقة (من دفتر النشاط).",lines:[
   ["Oscar","Salut !","مرحباً!"],["Léo","Salut ! Comment t’appelles-tu ?","مرحباً! ما اسمك؟"],
   ["Oscar","Je m’appelle Oscar. Et toi ?","اسمي أوسكار. وأنت؟"],["Léo","Je m’appelle Léo. Quel âge as-tu ?","اسمي ليو. كم عمرك؟"],
   ["Oscar","J’ai 13 ans. Et toi ?","عمري 13 سنة. وأنت؟"],["Léo","Moi, j’ai 12 ans. Nous avons presque le même âge !","وأنا عمري 12 سنة. عمرانا متقاربان تقريباً!"],
   ["Oscar","Oui ! Tu veux jouer au football avec moi ?","نعم! هل تريد أن تلعب كرة القدم معي؟"],["Léo","Oui, bien sûr !","نعم، بالطبع!"]]},
  d11:{t:"نموذج حوار · كلارا وليا",ar:"تلتقي كلارا وليا لأول مرة عند صديقتهما فاليري.",lines:[
   ["Clara","Salut ! Comment vas-tu ?","مرحباً! كيف حالك؟"],["Léa","Ça va bien, merci.","بخير، شكراً."],
   ["Clara","Je m’appelle Clara. Et toi ?","اسمي كلارا. وأنتِ؟"],["Léa","Je m’appelle Léa.","اسمي ليا."],
   ["Clara","Moi, j’ai 12 ans. Quel âge as-tu ?","عمري 12 سنة. كم عمرك؟"],["Léa","J’ai 11 ans. Enchantée !","عمري 11 سنة. تشرفت!"]]},
  d12:{t:"Audio 11 · لاما (للتدرب على الاستماع)",ar:"فقرة استماع قصيرة من اختبار DELF.",lines:[
   ["Lama","Salut ! Je m’appelle Lama. J’ai 11 ans. J’aime la danse. Mon numéro de téléphone est 964 184 1957 714.","مرحباً! اسمي لاما. عمري 11 سنة. أحب الرقص. رقم هاتفي 964 184 1957 714."]]}
 },
 blocks:[
  {k:"s",n:1,fr:"Je découvre",ar:"أكتشف",pg:"ص 10–11"},
  {k:"p",ar:"بدأت الوحدة بسؤال: هذه المراهقون يُلقون عليك التحية، فمن أي بلد يأتي كل واحد منهم؟ كل تحية تدل على لغة بلد."},
  {k:"tb",head:["التحية","المعنى","اللغة / البلد"],rows:[["مرحبا","مرحباً","العربية · العراق والدول العربية"],["Ciao !","مرحباً / وداعاً","الإيطالية · إيطاليا"],["Salut !","مرحباً","الفرنسية · فرنسا"],["Hola !","مرحباً","الإسبانية · إسبانيا"],["Hello !","مرحباً","الإنكليزية · إنكلترا وأمريكا"]]},
  {k:"v",g:"Les questions",ga:"كلمات الاستفهام الخمسة (تتكرر في كل وحدة)",items:[
   ["Qui ?","من؟","كِي","❓","للسؤال عن الأشخاص"],["Où ?","أين؟","أُو","📍","للسؤال عن المكان"],["Quand ?","متى؟","كَانْ","🕒","للسؤال عن الزمان"],
   ["Quoi ?","ماذا؟","كْوَا","💭","للسؤال عن الشيء"],["Pourquoi ?","لماذا؟","پُورْكْوَا","🤔","للسؤال عن السبب"]]},
  {k:"p",ar:"المهمة النهائية: «لعبة الصداقة» (Jeu de l’amitié) ستُقام في 20 أكتوبر في المعهد الفرنسي في العراق، والتسجيل عبر الإنترنت قبل 10 أكتوبر. تملأ بطاقة التسجيل (Fiche d’inscription) وفيها: الاسم الأول (Prénom)، اللقب (Nom)، العمر (Âge)."},
  {k:"v",g:"La fiche d’inscription",ga:"بطاقة التسجيل",items:[
   ["le prénom","الاسم الأول","لُ پْرِينُونْ","🧒","مثل: Ali"],["le nom","اسم العائلة / اللقب","لُ نُونْ","👪","مثل: Al-Saffar"],["l’âge","العمر","لَاژ","🎂","مثل: 12 ans"]]},

  {k:"s",n:2,fr:"Je comprends",ar:"أفهم",pg:"ص 12–13"},
  {k:"p",ar:"الأسئلة: من هم الشخصيات؟ أين هم؟ ماذا يفعلون؟ الجواب: صديقتان (أليس وإيما) وتلميذ مع معلمه (أوسكار والسيد دوبوا)، ويلتقون في سوبرماركت (supermarché) ويتبادلون التحية. اقرأ الحوارين واستمع إليهما."},
  {k:"d",id:"d1"},{k:"d",id:"d2"},
  {k:"kn",ar:"لاحظ: أليس وإيما صديقتان فقالتا Salut وTu (صيغة المفرد غير الرسمية)، أما أوسكار فيخاطب معلّمه بـ Vous احتراماً."},

  {k:"s",n:3,fr:"Je réfléchis",ar:"أتأمل: كيف أُحيّي؟",pg:"ص 14–15"},
  {k:"v",g:"Saluer",ga:"إلقاء التحية",items:[
   ["Bonjour","صباح الخير / مرحباً (نهاراً)","بُونْژُور","☀️","تُقال من الصباح حتى المساء، وهي تحية مهذبة مع الجميع"],
   ["Bonsoir","مساء الخير","بُونْسْوَار","🌆","تُقال مساءً عند اللقاء"],
   ["Salut","مرحباً (بين الأصدقاء)","سَالْيُ","🙋","تحية غير رسمية بين الأصدقاء، لا تقلها لمعلّمك. الـ t لا تُنطق"]]},
  {k:"v",g:"Prendre congé",ga:"التوديع",items:[
   ["Au revoir","إلى اللقاء","أُو رُڤْوَار","👋","وداع عام ومهذب"],
   ["À bientôt","إلى اللقاء قريباً","آ بْيَانْتُو","🤝","نقولها لمن سنراه قريباً"],
   ["À demain","إلى الغد","آ دُمَانْ","📅","نقولها لمن سنراه غداً مثل المعلم"],
   ["Bonne journée","يوماً سعيداً","بُون ژُورْنِيه","🌤️","تُقال نهاراً عند الوداع"],
   ["Bonne soirée","أمسية سعيدة","بُون سْوَارِيه","🌙","تُقال مساءً عند الوداع"],
   ["Bonne nuit","ليلة سعيدة / تصبح على خير","بُون نْوِي","😴","تُقال قبل النوم. الـ t لا تُنطق"]]},
  {k:"r",t:"الفرق بين Bonjour وBonsoir وSalut",ar:"استعمل Bonjour نهاراً وBonsoir مساءً، وSalut مع الأصدقاء فقط. وللتوديع: Au revoir للجميع، وÀ bientôt لمن ستراه قريباً.",ex:[["Bonjour Monsieur !","صباح الخير يا سيد!"],["Salut Emma !","مرحباً إيما!"],["Bonsoir Madame !","مساء الخير يا سيدة!"]]},
  {k:"p",ar:"الكلمات تتكون من حروف، والأبجدية الفرنسية فيها 26 حرفاً كالإنكليزية (A إلى Z)، لكنها تُنطق بأسماء فرنسية. استمع لكل حرف وكرر. أما حروف الكلمات فتُنطق بتهجئتها (épeler) مثل B-O-N-J-O-U-R."},
  {k:"alpha"},
  {k:"tip",ar:"في الأبجدية الفرنسية أيضاً حروف مع علامات (accents) مثل é è ê à ç ô، وهي مهمة جداً في الكتابة والنطق. ستجدها مشروحة في «دليل النطق» في الصفحة الرئيسية."},

  {k:"s",n:4,fr:"Je réfléchis",ar:"أسأل عن الحال وأجيب",pg:"ص 16–17"},
  {k:"v",g:"Demander à quelqu’un comment il va",ga:"السؤال عن الحال",items:[
   ["Comment ça va ?","كيف الحال؟ (عام)","كُومَانْ سَا ڤَا","💬","يصلح لأي شخص تقريباً"],
   ["Comment vas-tu ?","كيف حالك؟ (لصديق)","كُومَانْ ڤَا تْيُ","🧑‍🤝‍🧑","tu = صديق أو أقرب أو من هو في عمرك"],
   ["Comment allez-vous ?","كيف حالكم؟ (مهذّب)","كُومَانْ تَالِيه ڤُو","🧑‍🏫","vous = شخص كبير أو معلّم أو أكثر من شخص. لاحظ ربط t بين الكلمتين"]]},
  {k:"v",g:"Répondre",ga:"الجواب",items:[
   ["Ça va bien, merci.","بخير، شكراً.","سَا ڤَا بْيَانْ، مِيرْسِي","😊","الجواب الإيجابي المعتاد"],
   ["Ça ne va pas.","لستُ بخير.","سَا نُ ڤَا پَا","😞","جواب سلبي: ne ... pas تحيط بالفعل va"],
   ["Et toi ?","وأنت؟","إِيه تْوَا","↩️","نرد بها بعد أن يُسأل عن حالنا (لصديق)"],
   ["Et vous ?","وأنتم؟","إِيه ڤُو","↩️","للمهذّب أو لأكثر من شخص"],
   ["Merci","شكراً","مِيرْسِي","🙏","كلمة تُقال دائماً بعد الجواب"]]},
  {k:"r",t:"tu أم vous؟",ar:"نقول tu لصديق أو قريب أو طفل، ونقول vous للمعلم وللكبير ولمن لا نعرفه، ولأكثر من شخص. لذلك نقول Comment vas-tu ? لصديق، وComment allez-vous ? لمعلّم.",ex:[["Comment vas-tu ?","لصديق"],["Comment allez-vous ?","لمعلم أو كبير"]]},
  {k:"d",id:"d1"},{k:"d",id:"d2"},

  {k:"s",n:5,fr:"Je produis",ar:"أُنتج: لعبة التحيات",pg:"ص 18"},
  {k:"p",ar:"تلتقي بأبناء عمومتك عند جدّيك وتلعبون لعبة التحيات: بطاقة حمراء وبطاقة صفراء. أظهر البطاقة لصديقك ليرد عليك. استعن بـ «صندوق الأدوات» (Boîte à outils) التالي:"},
  {k:"tb",head:["Saluer","Demander comment il va","Répondre","Prendre congé"],rows:[
   ["Salut","Comment ça va ?","Ça va bien, merci.","Au revoir"],["Bonjour","Comment vas-tu ?","Ça ne va pas.","À bientôt"],["Bonsoir","Comment allez-vous ?","","À demain"],["","","","Bonne journée"],["","","","Bonne soirée"],["","","","Bonne nuit"]]},

  {k:"s",n:6,fr:"Je produis",ar:"أمثّل مشهداً",pg:"ص 19"},
  {k:"p",ar:"أنت مدعو إلى عيد ميلاد أوسكار، وتلتقي هناك زملاء آخرين. مثّل المشهد مع مجموعتك مستعملاً الكلمات المناسبة. اختر اسماً فرنسياً لدورك:"},
  {k:"names"},

  {k:"s",n:7,fr:"Je comprends",ar:"أفهم: الأسماء والأعمار",pg:"ص 20–21"},
  {k:"p",ar:"استمع للحوار وانظر للصورة: من هم الشخصيات؟ أين هم؟ ماذا يفعلون؟ فيها أربعة أشخاص: فيكتور (30 سنة)، آدم (12 سنة)، توم (11 سنة)، أوسكار (13 سنة)."},
  {k:"tb",head:["Prénom","Âge","العمر"],rows:[["Victor","30 ans","30 سنة (المدرّب)"],["Adam","12 ans","12 سنة"],["Tom","11 ans","11 سنة"],["Oscar","13 ans","13 سنة"]]},
  {k:"d",id:"d5"},

  {k:"s",n:8,fr:"Je réfléchis",ar:"أقول اسمي وعمري",pg:"ص 22–23"},
  {k:"v",g:"Se présenter",ga:"تقديم النفس",items:[
   ["Je m’appelle …","اسمي …","ژُ مَابِل","🪪","حرفياً: «أنا أسمّي نفسي»، يليها الاسم الأول. استمع: je + appelle = j’appelle مع m’ في الوسط"],
   ["J’ai … ans.","عمري … سنة.","ژِيه … آنْ","🎂","الفعل avoir (يملك) وليس être. نقول «عندي 12 سنة»: J’ai 12 ans"],
   ["Enchanté / Enchantée","تشرفت","آنْشَانْتِيه","🤝","يقولها الذكر Enchanté والأنثى Enchantée (النطق واحد)"]]},
  {k:"r",t:"j’ai = je + ai",ar:"عندما تأتي كلمة تبدأ بحرف متحرك بعد je نحذف e ونضع علامة ’ (الحذف: l’élision) فتصير j’ai. ومثله je m’appelle (m’ بدل me).",ex:[["J’ai 12 ans.","عمري 12 سنة."],["Je m’appelle Tom.","اسمي توم."]]},
  {k:"nums",from:0,to:20},
  {k:"tip",ar:"عدّ بصوت عالٍ: un – deux – trois ... vingt. وانتبه إلى حروف النهاية في الأرقام: six (سيس) وdix (ديس) تُنطق الـ x بصوت س، لكن في six ans تصير z: سِيز آنْ."},

  {k:"s",n:9,fr:"Je réfléchis",ar:"أسأل عن الاسم والعمر",pg:"ص 24–25"},
  {k:"d",id:"d9"},
  {k:"tb",head:["Question · السؤال","Réponse · الجواب"],rows:[
   ["Comment t’appelles-tu ?","Je m’appelle …"],["Comment vous appelez-vous ?","Je m’appelle …"],["Quel âge as-tu ?","J’ai … ans."],["Quel âge avez-vous ?","J’ai … ans."]]},
  {k:"v",g:"Les questions",ga:"أسئلة التعارف",items:[
   ["Comment t’appelles-tu ?","ما اسمك؟ (لصديق)","كُومَانْ تَابِل تْيُ","🗣️","tu: صديق أو قريب"],
   ["Comment vous appelez-vous ?","ما اسمكم؟ (مهذّب)","كُومَانْ ڤُو زَابْلِيه ڤُو","🎩","vous: معلّم أو كبير"],
   ["Quel âge as-tu ?","كم عمرك؟ (لصديق)","كِل آژ آ تْيُ","🔢","نقول «أي عمر عندك؟»"],
   ["Quel âge avez-vous ?","كم عمركم؟ (مهذّب)","كِل آژ آڤِيه ڤُو","🎩","vous"]]},
  {k:"tip",ar:"الإجابة عن «Quel âge as-tu ?» تكون دائماً J’ai … ans، ولا نقول Je suis 12 ans أبداً (هذا خطأ شائع عند الناطقين بالعربية والإنكليزية)."},

  {k:"s",n:10,fr:"Je produis",ar:"أُكمل الحوار",pg:"ص 26–27"},
  {k:"d",id:"d11"},
  {k:"tb",head:["Faire connaissance · التعارف","القاعدة"],rows:[["Enchanté / Enchantée","تشرفت"],["Comment t’appelles-tu ? / Comment vous appelez-vous ?","ما اسمك؟"],["Je m’appelle + prénom.","اسمي + الاسم"],["Quel âge as-tu ? / Quel âge avez-vous ?","كم عمرك؟"],["J’ai + âge.","عمري + العمر"]]},

  {k:"s",n:11,fr:"Je réalise la tâche",ar:"أنجز المهمة",pg:"ص 28–29"},
  {k:"p",ar:"أولاً: املأ بطاقة التسجيل على موقع المعهد (الاسم الأول، اللقب، العمر). ثانياً: في يوم 20 أكتوبر شارك في «لعبة الصداقة» مع زملائك: أمسك كرة، قل اسمك وعمرك، ثم ارمِ الكرة إلى زميل واسأله عن اسمه وعمره. وهكذا حتى يشارك الجميع. لا تنس التحية والتوديع."},
  {k:"d",id:"d10"},
  {k:"tb",head:["Fiche d’inscription","مثال"],rows:[["Prénom","Ali"],["Nom","Al-Saffar"],["Âge","13 ans"]]},

  {k:"s",n:12,fr:"Bilan",ar:"الخلاصة والتقويم",pg:"ص 30–31"},
  {k:"r",t:"Je retiens · أتذكر",ar:"هذه أهم عبارات الوحدة، احفظها واستعملها.",ex:[["Bonjour ! / Salut !","مرحباً"],["Comment t’appelles-tu ?","ما اسمك؟"],["Je m’appelle Sara.","اسمي سارة."],["Quel âge as-tu ?","كم عمرك؟"],["J’ai 11 ans.","عمري 11 سنة."]]},
  {k:"d",id:"d12"},
  {k:"check",ar:"التقويم الذاتي: أستطيع أن…",items:["أُحيّي","أودّع شخصاً","أقول اسمي وعمري","أسأل عن الاسم والعمر","أقول حروف الأبجدية","أقول الأرقام من 0 إلى 20"]}
 ],

 ex:[
  {t:"Séance 2 · ماذا يقول كل شخص؟",items:[
   {t:"mc",q:"استمع للحوار الأول. في نهاية الحوار، ماذا تقول Alice؟",say:"À bientôt !",o:["À bientôt","À demain","Au revoir Oscar"],a:0,x:"Alice تقول في النهاية: À bientôt !"},
   {t:"mc",q:"في الحوار الثاني، ماذا يقول Oscar لمعلّمه عن الغد؟",say:"Oui, monsieur. À demain.",o:["À demain","À bientôt","Bonne nuit"],a:0,x:"لأنه سيراه غداً في الصف: À demain."},
   {t:"mc",q:"أيّ الحوارين فيه Comment allez-vous ? ولماذا؟",o:["حوار Oscar مع المعلم، لأنه يخاطب كبيراً بـ vous","حوار Alice مع Emma، لأنهما صديقتان","كلاهما"],a:0,x:"vous للمعلم والكبير."},
   {t:"mc",q:"متى نقول Bonsoir؟",say:"Bonsoir",o:["مساءً","صباحاً فقط","قبل النوم فقط"],a:0,x:"Bonsoir = مساء الخير."}]},
  {t:"Séance 3 · الأبجدية والكلمات",items:[
   {t:"type",q:"أكمل الكلمة بحروفها (Bonjour):",say:"Bonjour",pr:"B _ n j _ u r",a:["bonjour"],x:"Bonjour"},
   {t:"type",q:"أكمل الكلمة (Bonsoir):",say:"Bonsoir",pr:"B _ n s _ i r",a:["bonsoir"],x:"Bonsoir"},
   {t:"type",q:"أكمل الكلمة (Au revoir):",say:"Au revoir",pr:"A _ R _ v _ i r",a:["au revoir"],x:"Au revoir"},
   {t:"type",q:"أكمل الكلمة (Salut):",say:"Salut",pr:"S _ _ _ t",a:["salut"],x:"Salut"},
   {t:"mc",q:"كم حرفاً في الأبجدية الفرنسية؟",o:["26","24","28"],a:0,x:"26 حرفاً كالإنكليزية."},
   {t:"ws",q:"ابحث في الشبكة عن كلمات التحية",words:["BONJOUR","BONSOIR","BONNE NUIT","AU REVOIR","A BIENTOT"]}]},
  {t:"Séance 4 · كيف الحال؟",items:[
   {t:"order",q:"رتّب الكلمات لتكوّن سؤالاً:",ans:["Comment","ça","va","?"],x:"Comment ça va ?"},
   {t:"order",q:"رتّب الكلمات لتكوّن سؤالاً مهذباً:",ans:["Comment","allez","-","vous","?"],x:"Comment allez-vous ?"},
   {t:"order",q:"رتّب الكلمات لتكوّن جواباً:",ans:["Ça","va","bien",",","merci","."],x:"Ça va bien, merci."},
   {t:"fill",q:"أكمل الحوار بالكلمات: bien – bien – ça – allez",text:"– Salut Emma ! Comment ___ va ?\n– Bonjour ! Ça va ___, merci.\n– Ça va bien aussi.\n– Comment ___ vous, monsieur ?\n– Ça va ___, merci.",blanks:["ça","bien","allez","bien"],bank:["bien","bien","ça","allez"]},
   {t:"mc",q:"تخاطب معلّمك صباحاً، ماذا تقول؟",o:["Bonjour Monsieur ! Comment allez-vous ?","Salut ! Comment vas-tu ?","Bonne nuit !"],a:0,x:"للمعلم: Bonjour + vous."}]},
  {t:"Séance 6 · الرسالة",items:[
   {t:"match",q:"صِل كل تحية بجوابها المناسب:",pairs:[["Salut !","Salut !"],["Comment ça va ?","Ça va bien, merci."],["À bientôt !","Au revoir !"],["Bonne nuit !","Bonne nuit !"]]},
   {t:"order",q:"رتّب رسالة سامي لصديقه آدم:",ans:["Salut","!","Comment","ça","va","?"],x:"Salut ! Comment ça va ?"}]},
  {t:"Séance 7 · الأعمار",items:[
   {t:"match",q:"صِل كل شخص بعمره:",pairs:[["Victor","30 ans"],["Oscar","13 ans"],["Tom","11 ans"],["Adam","12 ans"]]},
   {t:"mc",q:"كم عمر Tom؟",say:"J’ai 11 ans.",o:["11 ans","12 ans","13 ans"],a:0,x:"Tom: J’ai 11 ans."}]},
  {t:"Séance 8 · الأرقام",items:[
   {t:"num",q:"استمع واكتب الرقم الذي سمعته:",from:0,to:20,n:6},
   {t:"mc",q:"2 + 4 = ؟ (اختر الجواب بالفرنسية)",o:["six","cinq","huit"],a:0,x:"2 + 4 = 6 = six"},
   {t:"mc",q:"5 + 5 = ؟",o:["dix","neuf","onze"],a:0,x:"5 + 5 = 10 = dix"},
   {t:"mc",q:"8 + 4 = ؟",o:["douze","treize","onze"],a:0,x:"8 + 4 = 12 = douze"},
   {t:"mc",q:"9 + 9 = ؟",o:["dix-huit","dix-sept","vingt"],a:0,x:"9 + 9 = 18 = dix-huit"},
   {t:"mc",q:"15 + 5 = ؟",o:["vingt","dix-neuf","seize"],a:0,x:"15 + 5 = 20 = vingt"}]},
  {t:"Séance 9 · الأسئلة",items:[
   {t:"order",q:"رتّب الكلمات:",ans:["Comment","t’","appelles","-","tu","?"],x:"Comment t’appelles-tu ?"},
   {t:"order",q:"رتّب الكلمات:",ans:["Quel","âge","as","-","tu","?"],x:"Quel âge as-tu ?"},
   {t:"order",q:"رتّب الكلمات:",ans:["Comment","vous","appelez","-","vous","?"],x:"Comment vous appelez-vous ?"},
   {t:"match",q:"صِل العناصر لتكوّن جملاً:",pairs:[["Je m’appelle","Rami."],["J’ai","13 ans."],["Ça va","bien, merci."]]}]},
  {t:"Séance 10 · أكمل الحوار",items:[
   {t:"fill",q:"أكمل الحوار بالكلمات المعطاة: j’ai – ans – m’appelle – Je – Comment – âge – Salut – Salut",text:"Oscar : ___ !\nLéo : ___ ! ___ t’appelles-tu ?\nOscar : ___ m’appelle Oscar. Et toi ?\nLéo : Je ___ Léo. Quel ___ as-tu ?\nOscar : J’ai 13 ___. Et toi ?\nLéo : Moi, ___ 12 ans.",blanks:["Salut","Salut","Comment","Je","m’appelle","âge","ans","j’ai"],bank:["j’ai","ans","m’appelle","Je","Comment","âge","Salut","Salut"]}]},
  {t:"Séances 11–12 · نحو DELF",items:[
   {t:"mc",q:"استمع إلى لاما. اسم الفتاة…",say:"Salut ! Je m’appelle Lama. J’ai 11 ans. J’aime la danse. Mon numéro de téléphone est 964 184 1957 714.",o:["Lama","Manale","Sarah"],a:0,x:"Je m’appelle Lama."},
   {t:"mc",q:"عمرها…",say:"Salut ! Je m’appelle Lama. J’ai 11 ans. J’aime la danse.",o:["11 ans","10 ans","12 ans"],a:0,x:"J’ai 11 ans."},
   {t:"mc",q:"قرأتَ رسالة رامي: كم عمره؟",o:["13 ans","12 ans","14 ans"],a:0,x:"Rami: J’ai 13 ans."},
   {t:"mc",q:"أكمل: «Bonjour ! … Je m’appelle Rami.»",o:["Comment ça va ?","Bonne nuit !","À demain !"],a:0,x:"رسالة رامي تبدأ بـ: Bonjour ! Comment ça va ? Je m’appelle Rami."}]}
 ],

 qs:[
  {a:"ما معنى هذه العبارة؟",e:"Bonjour",o:["صباح الخير","مساء الخير","إلى اللقاء","شكراً"],spk:"Bonjour",x:"Bonjour = صباح الخير"},
  {a:"ما معنى هذه العبارة؟",e:"Bonsoir",o:["مساء الخير","صباح الخير","ليلة سعيدة","إلى الغد"],spk:"Bonsoir",x:"Bonsoir = مساء الخير"},
  {a:"أي عبارة تقولها قبل النوم؟",o:["Bonne nuit","Bonne journée","Bonsoir","À demain"],x:"Bonne nuit = ليلة سعيدة"},
  {a:"أي تحية غير رسمية بين الأصدقاء؟",o:["Salut","Au revoir","Bonne journée","Enchanté"],x:"Salut للأصدقاء"},
  {a:"ماذا تقول لمعلّمك للسؤال عن حاله؟",o:["Comment allez-vous ?","Comment vas-tu ?","Comment t’appelles-tu ?","Quel âge as-tu ?"],x:"vous للمعلم"},
  {a:"ماذا تقول لصديقك للسؤال عن حاله؟",o:["Comment vas-tu ?","Comment allez-vous ?","Comment vous appelez-vous ?","À bientôt"],x:"tu للصديق"},
  {a:"ما جواب Comment ça va ? الإيجابي؟",e:"Comment ça va ?",o:["Ça va bien, merci.","Je m’appelle Tom.","J’ai 12 ans.","Au revoir."],spk:"Comment ça va ?",x:"Ça va bien, merci."},
  {a:"ما معنى Au revoir ؟",e:"Au revoir",o:["إلى اللقاء","مرحباً","شكراً","كم عمرك؟"],spk:"Au revoir",x:"Au revoir = إلى اللقاء"},
  {a:"نقول لمن سنراه غداً:",o:["À demain","À bientôt","Bonsoir","Merci"],x:"À demain = إلى الغد"},
  {a:"كيف تعرّف بنفسك؟",o:["Je m’appelle Sara.","Je suis Sara ans.","Quel âge as-tu ?","Au revoir Sara."],x:"Je m’appelle + prénom"},
  {a:"كيف تقول إن عمرك 11 سنة؟",o:["J’ai 11 ans.","Je suis 11 ans.","Je m’appelle 11.","Il a 11 ans."],x:"J’ai 11 ans."},
  {a:"ما معنى Quel âge as-tu ?",e:"Quel âge as-tu ?",o:["كم عمرك؟","ما اسمك؟","كيف حالك؟","أين تسكن؟"],spk:"Quel âge as-tu ?",x:"Quel âge as-tu ? = كم عمرك؟"},
  {a:"ما معنى Comment t’appelles-tu ?",e:"Comment t’appelles-tu ?",o:["ما اسمك؟","كيف حالك؟","كم عمرك؟","من أنت؟"],spk:"Comment t’appelles-tu ?",x:"ما اسمك؟"},
  {a:"أيّ سؤال تخاطب به السيد دوبوا لتعرف اسمه؟",o:["Comment vous appelez-vous ?","Comment t’appelles-tu ?","Quel âge as-tu ?","Comment ça va ?"],x:"vous للكبير"},
  {a:"ما اسم الحرف J بالفرنسية؟",e:"J",o:["ژِي (ji)","جِيه","دْجِي","يُوت"],spk:"ji",x:"اسم الحرف J هو ji، وصوته ژ كما في bonjour."},
  {a:"كم حرفاً في الأبجدية الفرنسية؟",o:["26","24","28","30"],x:"26 حرفاً"},
  {a:"ما العدد؟",e:"douze",o:["12","2","20","10"],spk:"douze",x:"douze = 12"},
  {a:"ما العدد؟",e:"seize",o:["16","6","60","13"],spk:"seize",x:"seize = 16"},
  {a:"ما العدد؟",e:"vingt",o:["20","2","30","19"],spk:"vingt",x:"vingt = 20"},
  {a:"ما العدد؟",e:"dix-sept",o:["17","7","10","27"],spk:"dix-sept",x:"dix-sept = 17"},
  {a:"ما معنى Enchanté ؟",e:"Enchanté",o:["تشرفت","شكراً","مرحباً","إلى اللقاء"],spk:"Enchanté",x:"نقولها عند التعارف"},
  {a:"أيّ عبارة تعني «يوماً سعيداً»؟",o:["Bonne journée","Bonne nuit","Bonne soirée","Bonsoir"],x:"Bonne journée"},
  {a:"أيّ عبارة تعني «أمسية سعيدة»؟",o:["Bonne soirée","Bonne journée","Bonne nuit","Bonjour"],x:"Bonne soirée"},
  {tf:true,e:"Salut est une salutation formelle (للمعلم).",x:"خطأ: Salut غير رسمية.",tfa:false},
  {tf:true,e:"« Comment vas-tu ? » s’adresse à un ami.",x:"صح: tu للصديق.",tfa:true}
 ]
});
/* الوحدة 2 – Parlons des pays et des nationalités ! */
UNITS.push({
 id:2,no:"الوحدة ٢",fr:"Parlons des pays et des nationalités !",ar:"لنتحدث عن البلدان والجنسيات",emoji:"🌍",
 intro:"في هذه الوحدة تتعلم كيف تذكر جنسيتك وتسأل غيرك عن جنسيته، وتسمّي ألوان الأعلام. وتتعرف على بلدان تتكلم الفرنسية، وتشارك في لقاء مع تلاميذ فرنكوفونيين من جنسيات مختلفة.",
 goals:[["donner ma nationalité","أقول جنسيتي"],["demander la nationalité à quelqu’un","أسأل شخصاً عن جنسيته"],["nommer les couleurs des drapeaux","أسمّي ألوان الأعلام"]],
 task:{fr:"Dans le cadre d’un concours international de dessin, ton collège a organisé une rencontre avec des élèves francophones de différentes nationalités. Au début de la rencontre, chaque élève se présente pour faire connaissance avec les autres.",
  ar:"ضمن مسابقة دولية للرسم، نظّمت مدرستك لقاءً مع تلاميذ فرنكوفونيين من جنسيات مختلفة. في بداية اللقاء يُقدّم كل تلميذ نفسه ليتعرف على الآخرين."},
 dl:{
  v1:{t:"Vidéo 1 · الحوار الأول",ar:"في مسابقة الرسم: توماس ويوكي وطلال يذكرون جنسياتهم.",lines:[
   ["Thomas","Bonjour, je m’appelle Thomas. Je suis canadien. Et vous, de quelle nationalité êtes-vous ?","مرحباً، اسمي توماس. أنا كندي. وأنتما، ما جنسيتكما؟"],
   ["Yuki","Moi, je suis japonaise. Je m’appelle Yuki.","أنا يابانية. اسمي يوكي."],
   ["Talal","Moi, je suis irakien. Je m’appelle Talal.","أنا عراقي. اسمي طلال."]]},
  v2:{t:"Vidéo 1 · الحوار الثاني",ar:"أوسكار وليو يتعارفان.",lines:[
   ["Oscar","Bonjour ! Je m’appelle Oscar. J’ai 12 ans. Je suis français et toi ? Es-tu algérien ?","مرحباً! اسمي أوسكار. عمري 12 سنة. أنا فرنسي وأنت؟ هل أنت جزائري؟"],
   ["Léo","Non, moi, je suis français. Je m’appelle Léo. Mais, ma mère est algérienne.","لا، أنا فرنسي. اسمي ليو. لكن أمي جزائرية."]]},
  v3:{t:"Vidéo 1 · الحوار الثالث",ar:"أوسكار يسأل عن مدير المسابقة.",lines:[
   ["Oscar","Dis, Léo, qui est ce monsieur, là-bas ?","قل لي يا ليو، من هذا السيد هناك؟"],
   ["Léo","C’est le directeur du concours. Il s’appelle Leonardo. Il est italien.","إنه مدير المسابقة. اسمه ليوناردو. هو إيطالي."]]},
  a13:{t:"Audio 13 · كلمة ليوناردو",ar:"مدير المسابقة يرحّب بالمشاركين ويطلب منهم رفع أعلام بلدانهم.",lines:[
   ["Leonardo","Bienvenus au concours de dessin. Des pays du monde entier participent à ce concours. Montrez les drapeaux de vos pays.","مرحباً بكم في مسابقة الرسم. تشارك بلدان من العالم كله. أَظهروا أعلام بلدانكم."],
   ["","La France : bleu – blanc – rouge","فرنسا: أزرق – أبيض – أحمر"],["","Le Canada : blanc – rouge","كندا: أبيض – أحمر"],
   ["","L’Irak : blanc – rouge – noir","العراق: أبيض – أحمر – أسود"],["","La Russie : blanc – bleu – rouge","روسيا: أبيض – أزرق – أحمر"],
   ["","La Belgique : jaune – noir – rouge","بلجيكا: أصفر – أسود – أحمر"],["","Le Japon : blanc – rouge","اليابان: أبيض – أحمر"],
   ["","L’Algérie : blanc – vert – rouge","الجزائر: أبيض – أخضر – أحمر"],["","L’Italie : blanc – vert – rouge","إيطاليا: أبيض – أخضر – أحمر"]]},
  a16:{t:"Audio 16 · ما جنسيتك؟",ar:"ثلاثة أشخاص يتبادلون السؤال عن الجنسية.",lines:[
   ["A","Bonjour, de quelle nationalité es-tu ?","مرحباً، ما جنسيتك؟"],["B","Je suis canadien. Et toi, de quelle nationalité es-tu ?","أنا كندي. وأنتِ، ما جنسيتك؟"],
   ["A","Je suis irakienne. Et toi, de quelle nationalité es-tu ?","أنا عراقية. وأنت، ما جنسيتك؟"],["C","Je suis français.","أنا فرنسي."]]},
  a18:{t:"Audio 18 · أوسكار يُقدّم نفسه",ar:"لاحظ: اسم + عمر + جنسية.",lines:[
   ["Oscar","Bonjour ! Je m’appelle Oscar. J’ai 12 ans. Je suis français. Et toi, de quelle nationalité es-tu ?","مرحباً! اسمي أوسكار. عمري 12 سنة. أنا فرنسي. وأنت، ما جنسيتك؟"]]},
  a19:{t:"Audio 19 · جنسيتكم؟",ar:"سؤال بصيغة vous (مهذّبة).",lines:[
   ["A","Bonjour, de quelle nationalité êtes-vous ?","مرحباً، ما جنسيتكم؟"],["B","Je suis allemand. Et vous, de quelle nationalité êtes-vous ?","أنا ألماني. وأنتم، ما جنسيتكم؟"],
   ["A","Je suis belge. Et vous, de quelle nationalité êtes-vous ?","أنا بلجيكي. وأنتم، ما جنسيتكم؟"],["C","Je suis allemande.","أنا ألمانية."]]},
  f1:{t:"Forum · الشباب المشاركون في المسابقة",ar:"ثلاث رسائل قصيرة من شباب يبحثون عن أصدقاء.",lines:[
   ["Max","Je m’appelle Max. J’ai 14 ans. Je suis allemand.","اسمي ماكس. عمري 14 سنة. أنا ألماني."],
   ["Alice","Bonsoir ! Je suis belge. Je m’appelle Alice. J’ai 12 ans.","مساء الخير! أنا بلجيكية. اسمي أليس. عمري 12 سنة."],
   ["Dimitri","Salut ! J’ai 13 ans. Je m’appelle Dimitri. Je suis russe.","مرحباً! عمري 13 سنة. اسمي ديميتري. أنا روسي."]]},
  a24:{t:"Audio 24 · ليو ورشيد",ar:"فقرة استماع من اختبار DELF.",lines:[
   ["Léo","Bonjour !","مرحباً!"],["Rachid","Bonjour !","مرحباً!"],
   ["Léo","Je m’appelle Léo. Et toi, comment t’appelles-tu ?","اسمي ليو. وأنت، ما اسمك؟"],["Rachid","Moi, c’est Rachid.","أنا اسمي رشيد."],
   ["Léo","Quel âge as-tu ?","كم عمرك؟"],["Rachid","J’ai 12 ans et toi ?","عمري 12 سنة وأنت؟"],
   ["Léo","J’ai 11 ans. Je suis français. Et toi, de quelle nationalité es-tu ?","عمري 11 سنة. أنا فرنسي. وأنت، ما جنسيتك؟"],
   ["Rachid","Moi, je suis algérien.","أنا جزائري."],["Léo","À bientôt !","إلى اللقاء قريباً!"]]},
  ra:{t:"نموذج حوار · آدم ورامي",ar:"يلتقيان لأول مرة في المسابقة الدولية للرسم.",lines:[
   ["Adam","Bonjour.","مرحباً."],["Rami","Bonjour.","مرحباً."],
   ["Adam","Je m’appelle Adam. Et toi ?","اسمي آدم. وأنت؟"],["Rami","Je m’appelle Rami.","اسمي رامي."],
   ["Adam","Je suis français. Et toi, de quelle nationalité es-tu ?","أنا فرنسي. وأنت، ما جنسيتك؟"],["Rami","Je suis irakien.","أنا عراقي."]]}
 },
 blocks:[
  {k:"s",n:1,fr:"Je découvre",ar:"أكتشف",pg:"ص 34–35"},
  {k:"p",ar:"انظر إلى الأعلام وخمّن البلد. لكل بلد علم وجنسية: فرنسا ← فرنسي، العراق ← عراقي، اليابان ← ياباني. وفي نهاية الوحدة ستُنجز مهمة التعريف بنفسك في لقاء دولي."},
  {k:"flags",ids:["fr","iq","jp","ca","dz","it"]},

  {k:"s",n:2,fr:"Je comprends",ar:"أفهم: الفيديو والألوان",pg:"ص 36–37"},
  {k:"p",ar:"شاهد الفيديو أولاً بلا صوت: من ترى؟ أين هم؟ متى؟ ماذا يفعلون؟ (تلاميذ في مسابقة رسم، وتظهر أسماؤهم: Thomas, Talal, Yuki, Léo, Oscar). ثم شاهده بالصوت."},
  {k:"d",id:"v1"},{k:"d",id:"v2"},{k:"d",id:"v3"},
  {k:"v",g:"Les couleurs",ga:"الألوان",items:COLORS.map(c=>[c[0],c[1],c[2],c[3],""]).map((x,i)=>{x[4]=["لون الثلج والحليب","لون الورد والدم","لون السماء والبحر","لون الليل","لون الأشجار","لون الليمون"][i];return x})},
  {k:"p",ar:"استمع إلى مدير المسابقة ليوناردو وهو يذكر ألوان أعلام الدول، ثم اختر رقم العلم المناسب:"},
  {k:"d",id:"a13"},
  {k:"tip",ar:"الألوان صفات في الفرنسية. وهي تأتي بعد الاسم عادةً (un drapeau rouge)، لكننا هنا نذكرها فقط للتسمية. لاحظ أن علم العراق في الكتاب: أبيض – أحمر – أسود (مع كلمة «الله أكبر» الخضراء)."},

  {k:"s",n:3,fr:"Je réfléchis",ar:"أتعلم الجنسيات",pg:"ص 38–39"},
  {k:"p",ar:"لكل بلد جنسية، وللجنسية صيغتان: مذكر للولد/الرجل ومؤنث للبنت/المرأة. استمع وكرر:"},
  {k:"nat",ids:["fr","iq","jp","ca","dz","it"]},
  {k:"r",t:"المذكر والمؤنث في الجنسيات",ar:"نضيف e للمؤنث، وإذا كان المذكر ينتهي بـ -ien نضاعف الـ n ونضيف e فتصير -ienne. وفي النطق: المذكر ينتهي بصوت أنفي أو حرف صامت، والمؤنث تُسمع فيه الـ n أو الـ z والـ s في النهاية.",ex:[["français → française","فرنسي ← فرنسية"],["irakien → irakienne","عراقي ← عراقية"],["japonais → japonaise","ياباني ← يابانية"],["canadien → canadienne","كندي ← كندية"]]},
  {k:"tip",ar:"إملاء مهم: français / japonais ينتهيان بـ s في المذكر، و française / japonaise ينتهيان بـ se. لا تنس cédille (ç) في français وfrançaise: تُنطق س."},

  {k:"s",n:4,fr:"Je réfléchis",ar:"أسأل عن الجنسية وأجيب",pg:"ص 40–41"},
  {k:"v",g:"La nationalité",ga:"السؤال والجواب عن الجنسية",items:[
   ["De quelle nationalité es-tu ?","ما جنسيتك؟ (لصديق)","دُ كِل نَاسْيُونَالِيتِيه إِي تْيُ","🪪","للصديق أو الزميل"],
   ["De quelle nationalité êtes-vous ?","ما جنسيتكم؟ (مهذّب)","دُ كِل نَاسْيُونَالِيتِيه إِيت ڤُو","🎩","للكبير أو للمعلم أو لأكثر من شخص"],
   ["Quelle est ta nationalité ?","ما هي جنسيتك؟","كِل إِي تَا نَاسْيُونَالِيتِيه","🪪","صيغة أخرى للسؤال (وردت في المنتدى والتقويم)"],
   ["Je suis …","أنا …","ژُ سُوِي","🙋","يليها صفة الجنسية: Je suis irakien"]]},
  {k:"r",t:"الفعل être (يكون) في المتكلم",ar:"نستعمل Je suis (أنا) لنقول من أنا: Je suis irakien (الذكر) وJe suis irakienne (الأنثى). وبقية الأشخاص: tu es (أنت) وil est (هو) وelle est (هي) وvous êtes (أنتم).",ex:[["Je suis irakien.","أنا عراقي."],["Tu es algérien ?","هل أنت جزائري؟"],["Il est italien.","هو إيطالي."],["Elle est algérienne.","هي جزائرية."],["Vous êtes français ?","هل أنتم فرنسيون؟"]]},
  {k:"tb",head:["الذكر يقول","الأنثى تقول"],rows:[["Je suis français.","Je suis française."],["Je suis irakien.","Je suis irakienne."],["Je suis japonais.","Je suis japonaise."],["Je suis canadien.","Je suis canadienne."],["Je suis libanais.","Je suis libanaise."],["Je suis algérien.","Je suis algérienne."]]},
  {k:"nat",ids:["lb"]},
  {k:"d",id:"a16"},
  {k:"tip",ar:"تدرّب: اسأل زميلك Quelle est ta nationalité ? ثم بدّلا الأدوار."},

  {k:"s",n:5,fr:"Je produis",ar:"أُقدّم نفسي بالجنسية",pg:"ص 42"},
  {k:"d",id:"a18"},
  {k:"r",t:"Je retiens",ar:"لأسأل عن الجنسية: «De quelle nationalité es-tu ?». لأقول جنسيتي: «Je suis … + صفة جنسيتي». ولأتحدث عن شخص مشهور: Prénom + il est français / il est irakien.",ex:[["Prénom + il est français","اسم الشخص + هو فرنسي"],["Prénom + il est irakien","اسم الشخص + هو عراقي"]]},
  {k:"p",ar:"لعبة الجنسيات: اختر علماً، سمِّ البلد، وقدّم نفسك كما فعل أوسكار. وفكر في شخص مشهور تعرفه وقل اسمه وجنسيته."},

  {k:"s",n:6,fr:"Je produis",ar:"أُكمل الجمل",pg:"ص 43"},
  {k:"d",id:"ra"},
  {k:"kn",ar:"هل تعلم؟ الفرنسية لا يتكلمها أهل فرنسا فقط! فسويسرا وبلجيكا تتكلمان الفرنسية أيضاً وهما من الدول الفرنكوفونية (francophones)، وكذلك كندا ولبنان وتونس والجزائر والمغرب وبلدان أخرى."},

  {k:"s",n:7,fr:"Je comprends",ar:"أفهم: منتدى الشباب",pg:"ص 44–45"},
  {k:"p",ar:"في المنتدى يبحث الشباب المشاركون في مسابقة الرسم عن أصدقاء. اقرأ رسائلهم وأكمل الجدول."},
  {k:"d",id:"f1"},
  {k:"tb",head:["Nom","Âge","Nationalité","ألوان علم بلده"],rows:[["Max","14 ans","allemand","noir – rouge – jaune"],["Alice","12 ans","belge","noir – jaune – rouge"],["Dimitri","13 ans","russe","blanc – bleu – rouge"]]},

  {k:"s",n:8,fr:"Je réfléchis",ar:"جنسيات جديدة",pg:"ص 46–47"},
  {k:"nat",ids:["de","be","ru"]},
  {k:"tip",ar:"belge وrusse لهما الصيغة نفسها للمذكر والمؤنث: Je suis belge (ولد أو بنت)، Je suis russe. أما allemand فتصير allemande: في المؤنث تُسمع الـ d."},
  {k:"p",ar:"اقرأ ألوان كل علم بصوت عالٍ ثم تهجّى كل لون حرفاً حرفاً، ثم اقرأه كاملاً. مثال: B-L-A-N-C ← blanc."},

  {k:"s",n:9,fr:"Je réfléchis",ar:"أسأل بـ vous وأجيب",pg:"ص 48–49"},
  {k:"d",id:"a19"},
  {k:"nat",ids:["ma","tn"]},
  {k:"r",t:"Je retiens",ar:"الجنسيات: allemand/allemande، belge/belge، marocain/marocaine، russe/russe. اسأل معلمك: De quelle nationalité êtes-vous ?",ex:[["Je suis allemand. / Je suis allemande.","أنا ألماني / ألمانية"],["Je suis belge.","أنا بلجيكي / بلجيكية"],["Je suis marocain. / Je suis marocaine.","أنا مغربي / مغربية"],["Je suis russe.","أنا روسي / روسية"]]},

  {k:"s",n:10,fr:"Je produis",ar:"أملأ استمارة المشاركة",pg:"ص 50"},
  {k:"p",ar:"يريد ماكس، وهو شاب ألماني، المشاركة في مسابقة الرسم. اقرأ ملفه وأكمل الاستمارة: Prénom: Max · Âge: 14 ans · Nationalité: allemand."},
  {k:"tb",head:["Prénom","Âge","Nationalité"],rows:[["Max","14 ans","allemand"]]},

  {k:"s",n:11,fr:"Je réalise la tâche",ar:"أنجز المهمة",pg:"ص 51"},
  {k:"p",ar:"في اللقاء الدولي: 1) سلّم على الحاضرين. 2) قدّم نفسك: اسمك وعمرك وجنسيتك. أجب عن الأسئلة التالية بجمل كاملة:"},
  {k:"tb",head:["السؤال","جوابي"],rows:[["Comment t’appelles-tu ?","Je m’appelle …"],["Quel âge as-tu ?","J’ai … ans."],["De quelle nationalité es-tu ?","Je suis …"]]},

  {k:"s",n:12,fr:"Bilan",ar:"الخلاصة والتقويم",pg:"ص 52–53"},
  {k:"nat",ids:["ar","in","at","pl","ch"]},
  {k:"check",ar:"التقويم الذاتي: أستطيع أن…",items:["أقول جنسيتي","أسأل: De quelle nationalité es-tu ? / êtes-vous ?","أسمّي وأقرأ الألوان: blanc – rouge – bleu – vert – jaune – noir","أستعمل الفعل être في المتكلم: je suis","أقدّم نفسي: اسمي وعمري وجنسيتي"]},
  {k:"d",id:"a24"}
 ],

 ex:[
  {t:"Séance 2 · الفيديو والألوان",items:[
   {t:"match",q:"صِل كل تلميذ بجنسيته (الحوارين الأول والثاني):",pairs:[["Thomas","canadien"],["Yuki","japonaise"],["Talal","irakien"],["Léo","français"]]},
   {t:"mc",q:"ما جنسية مدير المسابقة Leonardo؟",say:"Il s’appelle Leonardo. Il est italien.",o:["italien","français","irakien"],a:0,x:"Il est italien."},
   {t:"mc",q:"استمع إلى اللون:",say:"rouge",o:["أحمر","أزرق","أخضر"],a:0,x:"rouge = أحمر"},
   {t:"mc",q:"استمع إلى اللون:",say:"jaune",o:["أصفر","أسود","أبيض"],a:0,x:"jaune = أصفر"},
   {t:"mc",q:"استمع إلى اللون:",say:"vert",o:["أخضر","أحمر","أزرق"],a:0,x:"vert = أخضر"},
   {t:"mc",q:"استمع إلى اللون:",say:"noir",o:["أسود","أبيض","أصفر"],a:0,x:"noir = أسود"},
   {t:"mc",q:"استمع إلى اللون:",say:"bleu",o:["أزرق","أخضر","أحمر"],a:0,x:"bleu = أزرق"},
   {t:"mc",q:"استمع إلى اللون:",say:"blanc",o:["أبيض","أسود","أصفر"],a:0,x:"blanc = أبيض"},
   {t:"flagmc",q:"استمع واختر العلم: «La France : bleu – blanc – rouge»",say:"La France : bleu, blanc, rouge",o:["fr","iq","jp","it"],a:0,x:"فرنسا: أزرق – أبيض – أحمر"},
   {t:"flagmc",q:"استمع واختر العلم: «Le Japon : blanc – rouge»",say:"Le Japon : blanc, rouge",o:["jp","ca","fr","iq"],a:0,x:"اليابان: أبيض وأحمر (دائرة حمراء)"}]},
  {t:"Séance 3 · العلم والجنسية",items:[
   {t:"match",q:"صِل كل علم بالجنسية المناسبة:",pairs:[["flag:ca","canadien"],["flag:iq","irakien"],["flag:fr","français"],["flag:jp","japonais"]]},
   {t:"type",q:"أكمل الجنسية (علم العراق):",say:"irakienne",pr:"I _ a _ i _ n n e",a:["irakienne"],x:"irakienne"},
   {t:"type",q:"أكمل الجنسية (علم فرنسا للذكر):",say:"français",pr:"F _ a _ ç _ i _",a:["français"],x:"français"},
   {t:"type",q:"أكمل الجنسية (علم اليابان للأنثى):",say:"japonaise",pr:"J _ p _ n _ i _ e",a:["japonaise"],x:"japonaise"},
   {t:"type",q:"أكمل الجنسية (الجزائر للذكر):",say:"algérien",pr:"A _ g _ r _ e _",a:["algérien","algerien"],x:"algérien"}]},
  {t:"Séance 4 · الصيغة الصحيحة",items:[
   {t:"mc",q:"Je m’appelle Clara. Je suis …",say:"Je m’appelle Clara. Je suis française.",o:["française","français","franceise"],a:0,x:"Clara بنت ← française"},
   {t:"mc",q:"Emma est …",o:["libanaise","libanais","libanien"],a:0,x:"Emma بنت ← libanaise"},
   {t:"mc",q:"Lina est …",o:["algérienne","algérien","algérienn"],a:0,x:"Lina بنت ← algérienne"},
   {t:"mc",q:"Adam est …",o:["tunisien","tunisienne","tunisienn"],a:0,x:"Adam ولد ← tunisien"},
   {t:"mc",q:"Rime est …",o:["irakienne","irakien","irakienn"],a:0,x:"Rime بنت ← irakienne"},
   {t:"mc",q:"احذف الكلمة الشاذة: Libanais – Japonais – Irakien – Polonais",o:["Irakien","Libanais","Japonais","Polonais"],a:0,x:"الباقية تنتهي بـ -ais، أما Irakien فتنتهي بـ -ien"},
   {t:"mc",q:"احذف الكلمة الشاذة: Tunisien – Irakien – Canadien – Français",o:["Français","Tunisien","Irakien","Canadien"],a:0,x:"الباقية تنتهي بـ -ien"},
   {t:"mc",q:"احذف الكلمة الشاذة: Algérienne – Irakien – Italienne – Tunisienne",o:["Irakien","Algérienne","Italienne","Tunisienne"],a:0,x:"الباقية مؤنثة، وIrakien مذكر"}]},
  {t:"Séances 5–6 · أُنتج",items:[
   {t:"order",q:"رتّب الكلمات لتكوّن جملة:",ans:["Je","suis","français","."],x:"Je suis français."},
   {t:"order",q:"رتّب الكلمات لتكوّن جملة:",ans:["Je","suis","algérien","."],x:"Je suis algérien."},
   {t:"order",q:"رتّب الكلمات لتكوّن سؤالاً:",ans:["De","quelle","nationalité","es","-","tu","?"],x:"De quelle nationalité es-tu ?"},
   {t:"order",q:"ركّب الجنسية من القطع:",join:"",ans:["irak","ien"],x:"irakien"},
   {t:"order",q:"ركّب الجنسية من القطع:",join:"",ans:["japon","aise"],x:"japonaise"},
   {t:"order",q:"ركّب الجنسية من القطع:",join:"",ans:["franç","ais"],x:"français"},
   {t:"fill",q:"أكمل حوار آدم ورامي: Bonjour – irakien – m’appelle – nationalité",text:"Adam : Bonjour.\nRami : ___.\nAdam : Je m’appelle Adam. Et toi ?\nRami : Je ___ Rami.\nAdam : Je suis français. Et toi, de quelle ___ es-tu ?\nRami : Je suis ___.",blanks:["Bonjour","m’appelle","nationalité","irakien"],bank:["Bonjour","irakien","nationalité","m’appelle"]},
   {t:"fill",q:"أكمل رد Majed وSakura: irakien – japonaise",text:"Majed : Je m’appelle Majed. Je suis ___.\nSakura : Je m’appelle Sakura. Je suis ___.",blanks:["irakien","japonaise"],bank:["irakien","japonaise"]}]},
  {t:"Séance 7 · المنتدى",items:[
   {t:"tf",q:"Max est italien.",a:false,x:"Max est allemand."},
   {t:"tf",q:"Alice a 12 ans.",a:true,x:"Alice: J’ai 12 ans."},
   {t:"tf",q:"Alice est irakienne.",a:false,x:"Alice est belge."},
   {t:"tf",q:"Dimitri est russe.",a:true,x:"Dimitri: Je suis russe."},
   {t:"mc",q:"ما ألوان علم ألمانيا (علم Max)؟",o:["noir – rouge – jaune","blanc – bleu – rouge","bleu – blanc – rouge"],a:0,x:"أسود – أحمر – أصفر"}]},
  {t:"Séances 8–9 · جنسيات جديدة",items:[
   {t:"match",q:"صِل كل علم بالجنسية:",pairs:[["flag:be","belge"],["flag:de","allemand"],["flag:ru","russe"],["flag:ma","marocain"]]},
   {t:"mc",q:"C’est Anna. Elle est …",o:["allemande","allemand","allemend"],a:0,x:"Anna بنت ← allemande"},
   {t:"mc",q:"Sophie est …",o:["argentine","argentin","argentien"],a:0,x:"Sophie بنت ← argentine"},
   {t:"mc",q:"Samara est …",o:["marocaine","marocain","marocane"],a:0,x:"Samara بنت ← marocaine"},
   {t:"type",q:"أعد ترتيب الحروف لتحصل على لون: B A L N C",pr:"B A L N C",a:["blanc"],x:"blanc"},
   {t:"type",q:"أعد ترتيب الحروف لتحصل على لون: U E L B",pr:"U E L B",a:["bleu"],x:"bleu"},
   {t:"type",q:"أعد ترتيب الحروف لتحصل على لون: J U A N E",pr:"J U A N E",a:["jaune"],x:"jaune"},
   {t:"type",q:"أعد ترتيب الحروف لتحصل على لون: R E U O G",pr:"R E U O G",a:["rouge"],x:"rouge"},
   {t:"ws",q:"ابحث عن الجنسيات في الشبكة",words:["JAPONAISE","FRANCAISE","ALLEMANDE","LIBANAIS","RUSSE","BELGE","CANADIENNE","IRAKIEN","AUTRICHIEN"]}]},
  {t:"Séance 10 · الاستمارة",items:[
   {t:"fill",q:"أكمل استمارة Karim: Karim – 12 – irakien",text:"Je m’appelle ___.\nJ’ai ___ ans.\nJe suis ___.",blanks:["Karim","12","irakien"],bank:["Karim","12","irakien"]}]},
  {t:"Séances 11–12 · نحو DELF",items:[
   {t:"mc",q:"استمع: ماذا قال Rachid عن جنسيته؟",say:"Moi, je suis algérien.",o:["algérien","français","irakien"],a:0,x:"Rachid: Moi, je suis algérien."},
   {t:"mc",q:"كم عمر Rachid؟",say:"J’ai 12 ans et toi ?",o:["12 ans","11 ans","13 ans"],a:0,x:"J’ai 12 ans"},
   {t:"mc",q:"ما جنسية Léo؟",say:"J’ai 11 ans. Je suis français.",o:["français","algérien","italien"],a:0,x:"Léo est français."},
   {t:"mc",q:"قرأتَ: «Bonsoir ! Je m’appelle Majed. J’ai 14 ans. Je suis irakien.» كم عمر Majed؟",o:["14 ans","13 ans","12 ans"],a:0,x:"Majed: 14 ans"},
   {t:"mc",q:"«Salut ! J’ai 13 ans. Je suis japonais. Je m’appelle Aki.» ما جنسية Aki؟",o:["japonais","irakien","algérien"],a:0,x:"Aki est japonais."},
   {t:"flagmc",q:"استمع: «Je suis tunisien»",say:"Je suis tunisien",o:["tn","ma","dz","be"],a:0,x:"tunisien = تونسي"},
   {t:"flagmc",q:"استمع: «Je suis marocain»",say:"Je suis marocain",o:["ma","tn","dz","iq"],a:0,x:"marocain = مغربي"},
   {t:"flagmc",q:"استمع: «Je suis belge»",say:"Je suis belge",o:["be","de","ru","fr"],a:0,x:"belge = بلجيكي"},
   {t:"flagmc",q:"استمع: «Je suis allemande»",say:"Je suis allemande",o:["de","be","ru","it"],a:0,x:"allemande = ألمانية"},
   {t:"flagmc",q:"استمع: «Je suis français»",say:"Je suis français",o:["fr","ru","it","be"],a:0,x:"français = فرنسي"}]}
 ],

 qs:[
  {a:"ما معنى هذا السؤال؟",e:"De quelle nationalité es-tu ?",o:["ما جنسيتك؟","كم عمرك؟","ما اسمك؟","من أين أنت؟"],spk:"De quelle nationalité es-tu ?",x:"السؤال عن الجنسية"},
  {a:"أجب عن السؤال: De quelle nationalité es-tu ?",o:["Je suis irakien.","J’ai 12 ans.","Je m’appelle Ali.","Bonsoir."],x:"Je suis + الجنسية"},
  {a:"ما جنسية من يقول: «Je suis irakienne» ؟",e:"Je suis irakienne.",o:["بنت عراقية","ولد عراقي","ولد ياباني","بنت يابانية"],spk:"Je suis irakienne.",x:"irakienne مؤنث"},
  {a:"مؤنث français هو:",o:["française","francaisse","francienne","français"],x:"française"},
  {a:"مؤنث canadien هو:",o:["canadienne","canadiene","canadienn","canadiens"],x:"canadienne"},
  {a:"مؤنث japonais هو:",o:["japonaise","japonaisse","japonienne","japonais"],x:"japonaise"},
  {a:"مذكر algérienne هو:",o:["algérien","algérienn","algérient","algérienne"],x:"algérien"},
  {a:"أيّ جنسية لا تتغير بين المذكر والمؤنث؟",o:["belge","allemand","français","irakien"],x:"belge وrusse لا تتغيران"},
  {a:"أيّ جنسية لا تتغير بين المذكر والمؤنث؟",o:["russe","marocain","libanais","tunisien"],x:"russe"},
  {a:"ما معنى هذا اللون؟",e:"vert",o:["أخضر","أحمر","أصفر","أزرق"],spk:"vert",x:"vert = أخضر"},
  {a:"ما معنى هذا اللون؟",e:"noir",o:["أسود","أبيض","أخضر","أصفر"],spk:"noir",x:"noir = أسود"},
  {a:"ما معنى هذا اللون؟",e:"jaune",o:["أصفر","أحمر","أبيض","أزرق"],spk:"jaune",x:"jaune = أصفر"},
  {a:"ما معنى هذا اللون؟",e:"bleu",o:["أزرق","أخضر","أسود","أصفر"],spk:"bleu",x:"bleu = أزرق"},
  {a:"ما اللون الذي يعني (أحمر)؟",o:["rouge","vert","blanc","jaune"],x:"rouge = أحمر"},
  {a:"ألوان علم فرنسا هي:",o:["bleu – blanc – rouge","noir – jaune – rouge","blanc – vert – rouge","blanc – rouge"],x:"bleu – blanc – rouge"},
  {a:"ألوان علم بلجيكا هي:",o:["noir – jaune – rouge","bleu – blanc – rouge","blanc – vert – rouge","blanc – rouge – noir"],x:"noir – jaune – rouge"},
  {a:"ألوان علم الجزائر هي:",o:["blanc – vert – rouge","noir – jaune – rouge","blanc – bleu – rouge","blanc – rouge"],x:"blanc – vert – rouge"},
  {a:"ألوان علم اليابان هي:",o:["blanc – rouge","blanc – vert – rouge","bleu – blanc – rouge","noir – rouge"],x:"blanc – rouge"},
  {a:"ما معنى Il est italien ؟",e:"Il est italien.",o:["هو إيطالي","أنا إيطالي","هي إيطالية","أنتم إيطاليون"],spk:"Il est italien.",x:"il est = هو"},
  {a:"من هو Leonardo؟",o:["مدير المسابقة، إيطالي","تلميذ فرنسي","معلّم ياباني","صديق ليو"],x:"Il est le directeur du concours; il est italien."},
  {a:"أي بلدين يتكلمان الفرنسية إضافة إلى فرنسا (كما في «هل تعلم؟»)؟",o:["سويسرا وبلجيكا","اليابان وكندا","الصين والهند","النمسا وبولندا"],x:"La Suisse et la Belgique"},
  {a:"أيّ جملة صحيحة لتعرّف بنفسك؟",o:["Je m’appelle Sami. J’ai 12 ans. Je suis irakien.","Je m’appelle Sami. Je suis 12 ans.","Je suis Sami appelle.","J’ai irakien."],x:"اسم + عمر + جنسية"},
  {tf:true,e:"« Je suis belge » peut être dit par un garçon ou une fille.",x:"صح: belge لا تتغير.",tfa:true},
  {tf:true,e:"« Elle est irakien » est correct.",x:"خطأ: elle est irakienne.",tfa:false}
 ]
});
/* الوحدة 3 – Amusons-nous ensemble ! */
UNITS.push({
 id:3,no:"الوحدة ٣",fr:"Amusons-nous ensemble !",ar:"لنستمتع معاً",emoji:"⚽",
 intro:"في هذه الوحدة تتحدث عن هواياتك (les loisirs) مع زملائك. تتعلم أسماء الهوايات، وتقول ما تحب وما لا تحب، وتسأل غيرك عن هواياته، ثم تصنع «خريطة هوايات الصف».",
 goals:[["nommer différents loisirs","أُسمّي هوايات مختلفة"],["demander et donner des informations sur les loisirs","أسأل وأُعطي معلومات عن الهوايات"]],
 task:{fr:"Pour mieux connaître les loisirs de vos camarades, tu vas créer la carte des loisirs de la classe.",
  ar:"لتتعرف أكثر على هوايات زملائك، ستصنع «خريطة الهوايات» الخاصة بصفكم."},
 dl:{
  a30:{t:"Audio 30 · أوسكار وليو في «عالم الهوايات»",ar:"يلتقي أوسكار وليو عند معرض الهوايات ويتحدثان عما يحبّان.",lines:[
   ["Oscar","Salut ! Toi aussi tu veux faire des activités ici ?","مرحباً! هل تريد أنت أيضاً أن تمارس نشاطات هنا؟"],
   ["Léo","Oui ! Moi, j’adore les activités.","نعم! أنا أحب النشاطات كثيراً."],
   ["Oscar","Quelles activités aimes-tu faire ? Tu aimes les arts ?","ما النشاطات التي تحب ممارستها؟ هل تحب الفنون؟"],
   ["Léo","Oui, j’aime la lecture mais je n’aime pas la musique. Et toi ? Quels sont tes loisirs ?","نعم، أحب القراءة لكنني لا أحب الموسيقى. وأنت؟ ما هواياتك؟"],
   ["Oscar","Moi j’aime la peinture et le sport. Tu aimes le sport ?","أنا أحب الرسم والرياضة. هل تحب الرياضة؟"],
   ["Léo","Mmmmm… Je déteste le football mais j’aime le tennis et le volleyball.","همم… أكره كرة القدم لكنني أحب التنس والكرة الطائرة."],
   ["Oscar","Vraiment ? Moi aussi j’adore le volleyball !","حقاً؟ أنا أيضاً أعشق الكرة الطائرة!"],
   ["Léo","Parfait ! Alors on peut jouer au volleyball ensemble.","رائع! إذن يمكننا أن نلعب الكرة الطائرة معاً."],
   ["Oscar","Bien sûr !","بالتأكيد!"]]},
  a31:{t:"Audio 31 · أربع جمل",ar:"أوسكار وليو يقولان ما يحبانه وما لا يحبانه.",lines:[
   ["","J’aime la lecture.","أحب القراءة."],["","Je n’aime pas la musique.","لا أحب الموسيقى."],
   ["","Je déteste le football.","أكره كرة القدم."],["","J’adore le volleyball.","أعشق الكرة الطائرة."]]},
  a33:{t:"Audio 33 · ما هواياتك؟",ar:"ليو يسأل أوسكار عن هواياته.",lines:[
   ["Léo","Quels sont tes loisirs ?","ما هواياتك؟"],
   ["Oscar","J’aime la lecture. J’adore le volleyball. Je n’aime pas la musique. Je déteste le football.","أحب القراءة. أعشق الكرة الطائرة. لا أحب الموسيقى. أكره كرة القدم."]]},
  a34:{t:"Audio 34 · أربعة أصدقاء (DELF)",ar:"فقرة استماع من دفتر النشاط.",lines:[
   ["Garçon 1","J’aime la lecture. J’adore la peinture.","أحب القراءة. أعشق الرسم."],
   ["Fille","J’aime la musique. Je n’aime pas le football.","أحب الموسيقى. لا أحب كرة القدم."],
   ["Garçon 2","Je n’aime pas le football. Je déteste la peinture.","لا أحب كرة القدم. أكره الرسم."],
   ["Garçon 3","J’aime le tennis. Je déteste le volleyball.","أحب التنس. أكره الكرة الطائرة."]]}
 },
 blocks:[
  {k:"s",n:1,fr:"Je découvre",ar:"أكتشف",pg:"ص 56–57"},
  {k:"p",ar:"سؤال البداية: ماذا تفعل في وقت فراغك خارج ساعات الدراسة؟ أخبر زميلك. ثم انظر إلى الصور وصِلها (كرة، موسيقى، رسم …)."},
  {k:"kn",ar:"هل تعلم؟ الأنشطة التي نمارسها لنتسلى في أوقات فراغنا تسمى «هوايات» (loisirs)."},
  {k:"v",g:"Le temps libre",ga:"وقت الفراغ",items:[
   ["les loisirs","الهوايات / أنشطة وقت الفراغ","لِي لُوَازِير","🎯","تُكتب دائماً بصيغة الجمع في الغالب"],
   ["une activité","نشاط","أُون آكْتِيڤِيتِيه","🏃","Quelles activités aimes-tu faire ?"]]},

  {k:"s",n:2,fr:"Je comprends",ar:"أفهم: ملصق عالم الهوايات",pg:"ص 58–59"},
  {k:"p",ar:"أمامك ملصق بعنوان «L’UNIVERS DES LOISIRS» (عالم الهوايات) وعليه: «Inscription lundi 9h» أي «التسجيل يوم الإثنين الساعة التاسعة». انظر للصورة وأجب: من الشخصيات؟ أين هم؟ ماذا يفعلون؟ ماذا ينظرون؟"},
  {k:"v",g:"Les loisirs",ga:"أربع هوايات",items:[
   ["le football","كرة القدم","لُ فُوتْبُول","⚽","مصدرها الإنكليزية، تُنطق foot-bol"],
   ["le tennis","التنس","لُ تِينِيس","🎾","تُنطق الـ s في النهاية في هذه الكلمة"],
   ["la lecture","القراءة","لَا لِكْتُيرْ","📖","حرف u يُنطق يُ (كما في salut)"],
   ["la musique","الموسيقى","لَا مُيزِيك","🎵","qu = ك، والـ s بين متحركين = ز"]]},
  {k:"p",ar:"استمع إلى الكلمات (Audio 25) وكرر: le football – le tennis – la lecture – la musique."},

  {k:"s",n:3,fr:"Je réfléchis",ar:"أتعرف إلى ست هوايات",pg:"ص 60–61"},
  {k:"v",g:"Les loisirs",ga:"الهوايات الست",items:[
   ["le football","كرة القدم","لُ فُوتْبُول","⚽","هو أكثر الرياضات شعبية في العالم"],
   ["la musique","الموسيقى","لَا مُيزِيك","🎵",""],
   ["la lecture","القراءة","لَا لِكْتُيرْ","📖","القراءة نشاط يحسّن الذاكرة"],
   ["le volleyball","الكرة الطائرة","لُ ڤُولِيبُول","🏐","تُنطق ڤولي-بول"],
   ["la peinture","الرسم / التلوين","لَا پَانْتُيرْ","🎨","ein = آنْ (صوت أنفي)"],
   ["le tennis","التنس","لُ تِينِيس","🎾",""]]},
  {k:"kn",ar:"هل تعلم؟ كرة القدم (le football) هي أكثر الرياضات شعبية في العالم."},

  {k:"s",n:4,fr:"Je réfléchis",ar:"المذكر والمؤنث: le وla",pg:"ص 62–63"},
  {k:"r",t:"le أم la ؟",ar:"كل اسم في الفرنسية إما مذكر (masculin) ونضع قبله le، أو مؤنث (féminin) ونضع قبله la. الأسماء لا تُعرف دائماً من معناها، فاحفظ الاسم مع أداته.",ex:[["le garçon","الولد"],["la fille","البنت"],["le football","كرة القدم"],["la peinture","الرسم"]]},
  {k:"tb",head:["Le · مذكر","La · مؤنث"],rows:[["le football","la peinture"],["le volleyball","la lecture"],["le tennis","la musique"],["le garçon","la fille"]]},
  {k:"tip",ar:"عندما يبدأ الاسم بحرف متحرك (a, o, e, i, u) أو بـ h الصامتة نكتب l’ بدل le/la، مثل l’oncle. ستراها في الوحدة الرابعة."},

  {k:"s",n:5,fr:"Je produis",ar:"أستمع وأُمثّل",pg:"ص 64–65"},
  {k:"p",ar:"استمع إلى ست أصوات (Audio 29) وخمّن الهواية: كرة تنس في مباراة تنس، صوت كمان (موسيقى)، صوت كتابة وصبي يقول Donne-moi le rouge (أعطني الأحمر — رسم)، فتاة تقرأ قصة (Cendrillon — القراءة)، أجواء مباراة كرة قدم، وأجواء مباراة كرة طائرة."},
  {k:"p",ar:"لعبة التمثيل الصامت (jeu de mimes): اختر هواية وقلّد حركتها، وعلى زميلك أن يخمّن الهواية بالفرنسية."},

  {k:"s",n:6,fr:"Je produis",ar:"المزيد من الهوايات",pg:"ص 66–67"},
  {k:"v",g:"Autres loisirs",ga:"هوايات أخرى",items:[
   ["la natation","السباحة","لَا نَاتَاسْيُون","🏊","tion = سيون"],
   ["la randonnée","التنزه والمشي في الجبال","لَا رَانْدُونِيه","🥾","on = أُون (أنفية)، ée = إيه"],
   ["le théâtre","المسرح","لُ تِيَاتْر","🎭","â = آ"],
   ["le vélo","الدراجة","لُ ڤِيلُو","🚲","ركوب الدراجة"],
   ["le dessin","الرسم (بالقلم)","لُ دِيسَانْ","✏️","in = آنْ (أنفية)"],
   ["la danse","الرقص","لَا دَانْس","💃","ذكرتها لاما في الوحدة الأولى"]]},
  {k:"p",ar:"أسماء الهوايات على الملصق: le football, la natation, la lecture, la musique, la randonnée, la peinture, le théâtre, le vélo, le volleyball, le tennis. أكمل الناقص (le f…، la le…، la m…، la p…) وتدرّب على كتابتها."},

  {k:"s",n:7,fr:"Je comprends",ar:"أفهم: حوار حول الهوايات",pg:"ص 68–69"},
  {k:"d",id:"a30"},
  {k:"kn",ar:"هل تعلم؟ القراءة نشاط تحبّه الأذهان لأنها تحسّن الذاكرة."},

  {k:"s",n:8,fr:"Je réfléchis",ar:"أقول ما أحب وما لا أحب",pg:"ص 70–71"},
  {k:"v",g:"Aimer",ga:"درجات الحب والكره",items:[
   ["J’adore","أعشق / أحب كثيراً جداً","ژَادُور","😍","أقوى درجات الحب"],
   ["J’aime","أحب","ژِيم","🙂","درجة عادية من الحب"],
   ["Je n’aime pas","لا أحب","ژُ نِيم پَا","😕","ne ... pas حول الفعل: je n’aime pas"],
   ["Je déteste","أكره","ژُ دِيتِيست","😡","أقوى درجات الكره"]]},
  {k:"tb",head:["الجملة","ما معناها؟"],rows:[["J’aime la lecture.","أحب القراءة."],["J’adore le volleyball.","أعشق الكرة الطائرة."],["Je n’aime pas la musique.","لا أحب الموسيقى."],["Je déteste le football.","أكره كرة القدم."]]},
  {k:"r",t:"شكل الجملة",ar:"الجملة = الفاعل (je) + الفعل (aime / adore / déteste) + le أو la + اسم الهواية. وفي النفي نضع n’ قبل الفعل وpas بعده: je n’aime pas.",ex:[["J’aime la peinture.","أحب الرسم."],["Je n’aime pas le tennis.","لا أحب التنس."]]},
  {k:"d",id:"a31"},

  {k:"s",n:9,fr:"Je réfléchis",ar:"أُرتّب الجمل",pg:"ص 72–73"},
  {k:"p",ar:"من القطع المبعثرة كوّن جملاً صحيحة، ثم اقرأها بصوت عالٍ. مثال: la + lecture + J’aime ← J’aime la lecture."},
  {k:"tb",head:["قطع الجملة","الجملة الصحيحة"],rows:[["la · lecture · J’aime","J’aime la lecture."],["le · football · Je · n’aime · pas","Je n’aime pas le football."],["Le · tennis · J’adore","J’adore le tennis."],["Je · déteste · la · peinture","Je déteste la peinture."]]},

  {k:"s",n:10,fr:"Je produis",ar:"أسأل عن الهوايات",pg:"ص 74"},
  {k:"v",g:"Poser la question",ga:"السؤال عن الهوايات",items:[
   ["Quels sont tes loisirs ?","ما هواياتك؟","كِل سُونْ تِيه لُوَازِير","❓","tes = لك، سؤال لصديق"],
   ["Quelles activités aimes-tu faire ?","ما النشاطات التي تحب ممارستها؟","كِل آكْتِيڤِيتِيه إِيم تْيُ فِير","❓",""],
   ["Tu aimes le sport ?","هل تحب الرياضة؟","تْيُ إِيم لُ سْپُور","🏅","السؤال بنبرة صاعدة"],
   ["Tu aimes les arts ?","هل تحب الفنون؟","تْيُ إِيم لِي زَار","🎨","لاحظ الربط: les-z-arts"],
   ["Moi aussi","أنا أيضاً","مْوَا أُوسِي","🙋","للموافقة"],
   ["Vraiment ?","حقاً؟","ڤْرِيمَانْ","😮","للاستغراب"],
   ["Parfait !","ممتاز! رائع!","پَارْفِي","👍",""],
   ["Bien sûr !","بالتأكيد!","بْيَانْ سُيرْ","✅",""]]},
  {k:"d",id:"a33"},

  {k:"s",n:11,fr:"Je réalise la tâche",ar:"أنجز المهمة: خريطة الهوايات",pg:"ص 75"},
  {k:"p",ar:"اصنع مع زملائك خريطة هوايات الصف. قسّم اللوحة إلى أربعة أعمدة: J’adore – J’aime – Je n’aime pas – Je déteste. اسأل كل زميل Quels sont tes loisirs ? والصق اسمه أو صورة هوايته في العمود المناسب. مثال على لوحة: J’adore la musique · J’aime le football · Je déteste la peinture · Je n’aime pas le tennis."},

  {k:"s",n:12,fr:"Bilan",ar:"الخلاصة والتقويم",pg:"ص 76–77"},
  {k:"d",id:"a34"},
  {k:"check",ar:"التقويم الذاتي: أستطيع أن…",items:["أسمّي هوايات مختلفة","أقدّم الهوايات التي أحبها","أقدّم الهوايات التي لا أحبها"]}
 ],

 ex:[
  {t:"Séance 2 · الملصق",items:[
   {t:"mc",q:"متى يكون التسجيل على الملصق؟ (Inscription lundi 9h)",o:["يوم الإثنين الساعة 9","يوم الأحد الساعة 9","يوم الإثنين الساعة 10"],a:0,x:"Inscription lundi 9h"},
   {t:"mc",q:"استمع واختر الكلمة:",say:"la lecture",o:["القراءة","الموسيقى","التنس"],a:0,x:"la lecture"}]},
  {t:"Séance 3 · ركّب الكلمات",items:[
   {t:"order",q:"ركّب الهواية من القطع:",join:"",ans:["foot","ball"],x:"football"},
   {t:"order",q:"ركّب الهواية من القطع:",join:"",ans:["volley","ball"],x:"volleyball"},
   {t:"order",q:"ركّب الهواية من القطع:",join:"",ans:["mu","sique"],x:"musique"},
   {t:"order",q:"ركّب الهواية من القطع:",join:"",ans:["lec","ture"],x:"lecture"},
   {t:"order",q:"ركّب الهواية من القطع:",join:"",ans:["pein","ture"],x:"peinture"},
   {t:"order",q:"ركّب الهواية من القطع:",join:"",ans:["te","nnis"],x:"tennis"}]},
  {t:"Séance 4 · le أم la ؟",items:[
   {t:"mc",q:"… musique",o:["la","le"],a:0,x:"la musique (مؤنث)"},
   {t:"mc",q:"… peinture",o:["la","le"],a:0,x:"la peinture (مؤنث)"},
   {t:"mc",q:"… tennis",o:["le","la"],a:0,x:"le tennis (مذكر)"},
   {t:"mc",q:"… football",o:["le","la"],a:0,x:"le football (مذكر)"},
   {t:"mc",q:"… lecture",o:["la","le"],a:0,x:"la lecture (مؤنث)"},
   {t:"mc",q:"… volleyball",o:["le","la"],a:0,x:"le volleyball (مذكر)"},
   {t:"mc",q:"… théâtre",o:["le","la"],a:0,x:"le théâtre (مذكر)"},
   {t:"mc",q:"… randonnée",o:["la","le"],a:0,x:"la randonnée (مؤنث)"},
   {t:"mc",q:"… vélo",o:["le","la"],a:0,x:"le vélo (مذكر)"},
   {t:"mc",q:"… natation",o:["la","le"],a:0,x:"la natation (مؤنث)"}]},
  {t:"Séances 5–6 · أُنتج",items:[
   {t:"mc",q:"استمع إلى الصوت: «Donne-moi le rouge.» أي هواية هذه؟",say:"Donne-moi le rouge.",o:["la peinture","le football","la natation"],a:0,x:"الألوان = الرسم"},
   {t:"mc",q:"استمع: «Il était une fois une jeune fille qui s’appelait Cendrillon.» أي هواية؟",say:"Il était une fois une jeune fille qui s’appelait Cendrillon.",o:["la lecture","la musique","le tennis"],a:0,x:"قصة تُقرأ = la lecture"},
   {t:"match",q:"صِل كل هواية بمعناها:",pairs:[["la natation","السباحة"],["la randonnée","التنزه الجبلي"],["le théâtre","المسرح"],["le vélo","الدراجة"]]}]},
  {t:"Séance 7 · حوار أوسكار وليو",items:[
   {t:"mc",q:"ماذا يحب Léo؟",say:"Oui, j’aime la lecture mais je n’aime pas la musique.",o:["la lecture","la musique","le football"],a:0,x:"J’aime la lecture."},
   {t:"mc",q:"ماذا لا يحب Léo؟",say:"Je n’aime pas la musique.",o:["la musique","la lecture","le tennis"],a:0,x:"Je n’aime pas la musique."},
   {t:"mc",q:"ماذا يكره Léo؟",say:"Je déteste le football.",o:["le football","le tennis","le volleyball"],a:0,x:"Je déteste le football."},
   {t:"mc",q:"ما الرياضة المشتركة بين Oscar وLéo؟",say:"Moi aussi j’adore le volleyball !",o:["le volleyball","le football","la natation"],a:0,x:"كلاهما يحب le volleyball"},
   {t:"mc",q:"ماذا يحب Oscar؟",say:"Moi j’aime la peinture et le sport.",o:["la peinture et le sport","la lecture","la musique"],a:0,x:"J’aime la peinture et le sport."}]},
  {t:"Séances 8–9 · أقول ما أحب",items:[
   {t:"match",q:"صِل كل عبارة بإيموجي مناسب لمشاعرها:",pairs:[["J’adore","😍"],["J’aime","🙂"],["Je n’aime pas","😕"],["Je déteste","😡"]]},
   {t:"order",q:"رتّب الجملة:",ans:["J’","aime","la","lecture","."],x:"J’aime la lecture."},
   {t:"order",q:"رتّب الجملة:",ans:["Je","n’","aime","pas","le","football","."],x:"Je n’aime pas le football."},
   {t:"order",q:"رتّب الجملة:",ans:["J’","adore","le","tennis","."],x:"J’adore le tennis."},
   {t:"order",q:"رتّب الجملة:",ans:["Je","déteste","la","peinture","."],x:"Je déteste la peinture."},
   {t:"mc",q:"احذف الكلمة الزائدة: «J’aime le je volleyball.»",o:["je","le","aime","volleyball"],a:0,x:"J’aime le volleyball."},
   {t:"mc",q:"احذف الكلمة الزائدة: «J’adore le la musique.»",o:["le","la","adore","musique"],a:0,x:"J’adore la musique."},
   {t:"mc",q:"احذف الكلمة الزائدة: «Je n’aime pas pas la peinture.»",o:["pas (الثانية)","peinture","la","aime"],a:0,x:"Je n’aime pas la peinture."},
   {t:"mc",q:"احذف الكلمة الزائدة: «Je le déteste le football.»",o:["le (الأولى)","football","déteste","Je"],a:0,x:"Je déteste le football."}]},
  {t:"Séance 10 · جمل عن الصور",items:[
   {t:"fill",q:"أكمل بـ J’aime – J’adore – Je n’aime pas – Je déteste (حسب الشعور)",text:"😍 ___ le football.\n🙂 ___ la peinture.\n😕 ___ la natation.\n😡 ___ le dessin.",blanks:["J’adore","J’aime","Je n’aime pas","Je déteste"],bank:["J’aime","J’adore","Je n’aime pas","Je déteste"]}]},
  {t:"Séances 11–12 · نحو DELF",items:[
   {t:"tf",q:"Sami n’aime pas la lecture. (قال: J’aime la lecture)",a:false,x:"Sami: J’aime la lecture."},
   {t:"tf",q:"Clara adore la peinture.",a:true,x:"Clara: J’adore la peinture."},
   {t:"tf",q:"Sarah n’aime pas le tennis.",a:true,x:"Sarah: Je n’aime pas le tennis."},
   {t:"tf",q:"Rami adore le football. (قال: Je déteste le football)",a:false,x:"Rami: Je déteste le football."},
   {t:"mc",q:"استمع (Audio 34): الولد الأول يحب…",say:"J’aime la lecture. J’adore la peinture.",o:["القراءة والرسم","الموسيقى","التنس"],a:0,x:"la lecture + la peinture"},
   {t:"mc",q:"استمع: الفتاة لا تحب…",say:"J’aime la musique. Je n’aime pas le football.",o:["le football","la musique","la lecture"],a:0,x:"Je n’aime pas le football."},
   {t:"mc",q:"استمع: الولد الأخير يكره…",say:"J’aime le tennis. Je déteste le volleyball.",o:["le volleyball","le tennis","la peinture"],a:0,x:"Je déteste le volleyball."}]}
 ],

 qs:[
  {a:"ما معنى هذه الهواية؟",e:"la natation",o:["السباحة","الرقص","الدراجة","الرسم"],spk:"la natation",x:"la natation = السباحة"},
  {a:"ما معنى هذه الهواية؟",e:"la randonnée",o:["التنزه الجبلي","السباحة","المسرح","القراءة"],spk:"la randonnée",x:"la randonnée"},
  {a:"ما معنى هذه الهواية؟",e:"le théâtre",o:["المسرح","الدراجة","الموسيقى","التنس"],spk:"le théâtre",x:"le théâtre = المسرح"},
  {a:"ما معنى هذه الهواية؟",e:"le vélo",o:["الدراجة","السباحة","الرسم","الرقص"],spk:"le vélo",x:"le vélo = الدراجة"},
  {a:"ما معنى هذه العبارة؟",e:"J’adore",o:["أعشق","أكره","لا أحب","أحب قليلاً"],spk:"J’adore",x:"J’adore = أعشق"},
  {a:"ما معنى هذه العبارة؟",e:"Je déteste",o:["أكره","أحب","أعشق","لا أحب"],spk:"Je déteste",x:"Je déteste = أكره"},
  {a:"ما معنى هذه العبارة؟",e:"Je n’aime pas",o:["لا أحب","أحب","أكره","أعشق"],spk:"Je n’aime pas",x:"Je n’aime pas = لا أحب"},
  {a:"كيف تقول «أحب القراءة»؟",o:["J’aime la lecture.","Je n’aime pas la lecture.","Je déteste la lecture.","J’aime le lecture."],x:"J’aime la lecture."},
  {a:"كيف تقول «أكره كرة القدم»؟",o:["Je déteste le football.","J’adore le football.","J’aime le football.","Je n’aime pas la football."],x:"Je déteste le football."},
  {a:"كيف تقول «لا أحب الموسيقى»؟",o:["Je n’aime pas la musique.","J’aime la musique.","Je déteste le musique.","Je aime pas musique."],x:"Je n’aime pas la musique."},
  {a:"ما معنى Quels sont tes loisirs ?",e:"Quels sont tes loisirs ?",o:["ما هواياتك؟","كم عمرك؟","ما اسمك؟","ما جنسيتك؟"],spk:"Quels sont tes loisirs ?",x:"ما هواياتك؟"},
  {a:"أيّ أداة مع la peinture؟",o:["la","le","l’","les"],x:"la peinture"},
  {a:"أيّ أداة مع le tennis؟",o:["le","la","l’","les"],x:"le tennis"},
  {a:"أيّ أداة مع la natation؟",o:["la","le","l’","les"],x:"la natation"},
  {a:"أيّ اسم مذكر؟",o:["le vélo","la peinture","la lecture","la musique"],x:"le vélo"},
  {a:"أيّ اسم مؤنث؟",o:["la randonnée","le football","le tennis","le volleyball"],x:"la randonnée"},
  {a:"ما أكثر الرياضات شعبية في العالم؟",o:["le football","le tennis","la natation","le volleyball"],x:"le football"},
  {a:"ما النشاط الذي يحسّن الذاكرة (هل تعلم؟)",o:["la lecture","le football","la danse","le vélo"],x:"la lecture"},
  {a:"ماذا تعني Moi aussi ?",e:"Moi aussi",o:["أنا أيضاً","أنا فقط","ليس أنا","أنت أيضاً"],spk:"Moi aussi",x:"Moi aussi = أنا أيضاً"},
  {a:"ماذا تعني Vraiment ?",e:"Vraiment ?",o:["حقاً؟","أبداً","شكراً","من؟"],spk:"Vraiment ?",x:"Vraiment ? = حقاً؟"},
  {a:"أيّ عبارة تدل على أقوى حب؟",o:["J’adore","J’aime","Je n’aime pas","Je déteste"],x:"J’adore"},
  {tf:true,e:"« Je n’aime pas » signifie « أحب ».",x:"خطأ: تعني لا أحب.",tfa:false},
  {tf:true,e:"On dit « la football ».",x:"خطأ: نقول le football.",tfa:false},
  {tf:true,e:"« le vélo » est masculin.",x:"صح.",tfa:true}
 ]
});
/* الوحدة 4 – Découvrons nos familles ! */
UNITS.push({
 id:4,no:"الوحدة ٤",fr:"Découvrons nos familles !",ar:"لنكتشف عائلاتنا",emoji:"👨‍👩‍👧‍👦",
 intro:"في هذه الوحدة تعرّف بعائلتك: تسمّي أفراد الأسرة، وتقول أعمارهم وهواياتهم، وتتعلم الأرقام من 21 إلى 40، ثم ترسم شجرة عائلتك وتقدّمها.",
 goals:[["présenter ma famille","أُعرّف بعائلتي"],["donner un âge","أذكر العمر"]],
 task:{fr:"À l’occasion de la journée internationale des familles, ton collège organise une rencontre entre des familles irakiennes et des familles francophones qui vivent en Irak. Pendant la rencontre, tu présentes ta famille à l’aide d’un arbre généalogique.",
  ar:"بمناسبة اليوم العالمي للأسرة، تُنظّم مدرستك لقاءً بين عائلات عراقية وعائلات فرنكوفونية تعيش في العراق. وخلال اللقاء تُقدّم عائلتك بمساعدة شجرة العائلة."},
 dl:{
  a35:{t:"Audio 35 · توم وآدم",ar:"آدم يرى صورة عائلة توم ثم يُريه صورة عائلته.",lines:[
   ["Adam","Oh, quelle belle photo ! Qui est avec toi ?","يا لها من صورة جميلة! من معك؟"],
   ["Tom","C’est mon père.","هذا أبي."],
   ["Adam","Et les autres, qui sont-ils ?","والآخرون، من هم؟"],
   ["Tom","C’est ma mère et ma sœur.","هذه أمي وأختي."],
   ["Adam","Et ton frère ? Où est-il ?","وأخوك؟ أين هو؟"],
   ["Tom","Je n’ai pas de frère. Et toi, as-tu un frère ?","ليس لي أخ. وأنت، هل لك أخ؟"],
   ["Adam","Oui, j’ai une photo de ma famille.","نعم، عندي صورة لعائلتي."],
   ["Tom","Ah, ta famille est grande !","آه، عائلتك كبيرة!"],
   ["Adam","Regarde Tom, voici mon père, ma mère, et mon frère. Il y a également mon grand-père, ma grand-mère, mon oncle et ma tante.","انظر يا توم، هذا أبي وأمي وأخي. وهنا أيضاً جدي وجدتي وعمي وعمتي."],
   ["Tom","Et qui sont ces enfants ?","ومن هؤلاء الأطفال؟"],
   ["Adam","Ce sont mes cousins et ma cousine.","هؤلاء أبناء عمومتي وبنت عمي."]]},
  a41:{t:"Audio 39–41 · C’est … / Ce sont …",ar:"ثلاث فقرات قصيرة للتدرب على «هذا» و«هؤلاء».",lines:[
   ["","C’est le père, c’est la mère, c’est le frère, c’est la sœur, c’est la famille.","هذا الأب، هذه الأم، هذا الأخ، هذه الأخت، هذه العائلة."],
   ["","C’est le père, c’est la mère, ce sont les parents.","هذا الأب، هذه الأم، هؤلاء الوالدان."],
   ["","C’est le grand-père, c’est la grand-mère, ce sont les grands-parents.","هذا الجد، هذه الجدة، هؤلاء الجدّان (الأجداد)."]]},
  alice:{t:"Texte · Ma famille (أليس تُقدّم عائلتها)",ar:"اقرأ النص ببطء ثم استمع إليه جملة جملة.",lines:[
   ["","Je m’appelle Alice. J’ai 12 ans.","اسمي أليس. عمري 12 سنة."],
   ["","Mon père s’appelle Victor. Il a 39 ans. Il aime le football.","أبي اسمه فيكتور. عمره 39 سنة. يحب كرة القدم."],
   ["","Ma mère, Nicole, a 37 ans. Elle aime la musique et le vélo.","أمي نيكول عمرها 37 سنة. تحب الموسيقى والدراجة."],
   ["","J’ai une sœur, elle s’appelle Léa. Elle a 10 ans. Elle adore la musique mais déteste le volleyball.","لي أخت اسمها ليا. عمرها 10 سنوات. تعشق الموسيقى لكنها تكره الكرة الطائرة."],
   ["","Mon frère s’appelle Lucas. Il a 7 ans et il adore le football.","أخي اسمه لوكاس. عمره 7 سنوات ويعشق كرة القدم."],
   ["","Papy Lucien et mamie Claire sont mes grands-parents et ma tante s’appelle Sabine.","جدي لوسيان وجدتي كلير هما جداي وعمتي اسمها سابين."],
   ["","Ma mère a un frère. C’est mon oncle Pascal. Il a 40 ans.","لأمي أخ. إنه خالي باسكال. عمره 40 سنة."],
   ["","J’ai deux cousins Léo et Adam.","لي ابنا عم (خال) هما ليو وآدم."],
   ["","J’aime ma famille.","أحب عائلتي."]]},
  a45:{t:"Audio 45 · لوكاس (DELF)",ar:"فقرة استماع من دفتر النشاط.",lines:[
   ["Lucas","Je m’appelle Lucas. J’ai 12 ans. Mon frère s’appelle Léo. Il a 10 ans. Il aime le volleyball. J’ai aussi une sœur. Elle a 14 ans et elle s’appelle Léa. Elle n’aime pas le sport mais elle adore la peinture.","اسمي لوكاس. عمري 12 سنة. أخي اسمه ليو. عمره 10 سنوات. يحب الكرة الطائرة. ولي أيضاً أخت. عمرها 14 سنة واسمها ليا. لا تحب الرياضة لكنها تعشق الرسم."]]},
  pere:{t:"نموذج · ليو يعرّف أباه بمعلّم الرياضة",ar:"ليو في السوبرماركت مع أبيه ويلتقي معلمه.",lines:[
   ["Léo","Bonjour Monsieur ! C’est mon père.","صباح الخير يا سيد! هذا أبي."],
   ["Léo","Il s’appelle Karim. Il a 40 ans. Il aime le tennis.","اسمه كريم. عمره 40 سنة. يحب التنس."],
   ["Le professeur","Enchanté Monsieur !","تشرفت يا سيد!"]]}
 },
 blocks:[
  {k:"s",n:1,fr:"Je découvre",ar:"أكتشف",pg:"ص 80–81"},
  {k:"p",ar:"انظر إلى الرسم: ماذا ترى؟ من ترى؟ هل تعرف اسم هذه الشجرة؟ إنها «شجرة العائلة» (l’arbre généalogique): في أعلاها الأجداد ثم الآباء ثم الأبناء. وفي دفتر النشاط تُسمّى الصور: Mes grands-parents, Ma mère, Mon frère, Moi, Mon père, Ma sœur, Ma tante, Mon oncle, Mon cousin, Ma cousine."},
  {k:"v",g:"L’arbre généalogique",ga:"شجرة العائلة",items:[
   ["la famille","العائلة / الأسرة","لَا فَامِي","👨‍👩‍👧‍👦","ill = ي"],
   ["l’arbre généalogique","شجرة العائلة","لَارْبْر ژِينِيَالُوژِيك","🌳","arbre مذكر: l’arbre"],
   ["la journée internationale des familles","اليوم العالمي للأسرة","لَا ژُورْنِيه أَنْتِرْنَاسْيُونَال دِي فَامِي","🌍",""]]},

  {k:"s",n:2,fr:"Je comprends",ar:"أفهم: صورة عائلة",pg:"ص 82–83"},
  {k:"d",id:"a35"},
  {k:"v",g:"La famille",ga:"أفراد الأسرة الأقرب",items:[
   ["le père","الأب","لُ پِير","👨","è = إي مفتوحة"],
   ["la mère","الأم","لَا مِير","👩",""],
   ["le frère","الأخ","لُ فْرِير","👦",""],
   ["la sœur","الأخت","لَا سُور","👧","œu = صوت بين أُو وإي"]]},
  {k:"p",ar:"أكمل شجرة عائلة آدم بالأسماء الناقصة: le grand-père، la tante، la mère، la cousine. واستمع إلى Audio 36: le père – la mère – le frère – la sœur."},

  {k:"s",n:3,fr:"Je réfléchis",ar:"عائلة آدم",pg:"ص 84–85"},
  {k:"v",g:"La famille d’Adam",ga:"بقية أفراد العائلة",items:[
   ["le grand-père","الجد","لُ گْرَانْ پِير","👴","كلمتان بشرطة: grand-père"],
   ["la grand-mère","الجدة","لَا گْرَانْ مِير","👵",""],
   ["l’oncle","العم / الخال","لُونْكْل","🧔","le + oncle = l’oncle"],
   ["la tante","العمة / الخالة","لَا تَانْت","👩‍🦰","tante تشمل أخت الأب وأخت الأم"],
   ["le cousin","ابن العم / ابن الخال","لُ كُوزَانْ","🧒","c قبل o تُنطق ك"],
   ["la cousine","بنت العم / بنت الخال","لَا كُوزِين","👧","المؤنث يُنطق فيه حرف n"]]},
  {k:"v",g:"Les parents",ga:"الجمع",items:[
   ["les parents","الوالدان (الأب والأم)","لِي پَارَانْ","👨‍👩","كلمة parents تعني الوالدين، وليست «أقارب»"],
   ["les grands-parents","الجدّان / الأجداد","لِي گْرَانْ پَارَانْ","👴👵","grand-père + grand-mère"],
   ["le fils","الابن","لُ فِيس","👦","في دفتر النشاط: «le fils de l’oncle» = ابن العم"],
   ["la fille","البنت / الابنة","لَا فِي","👧","fille: ill = ي"]]},
  {k:"r",t:"le / la / l’",ar:"قبل الاسم المذكر le، وقبل المؤنث la. وإذا بدأ الاسم بحرف متحرك (a, e, i, o, u) أو h صامتة نكتب l’ للمذكر والمؤنث.",ex:[["le grand-père","الجد"],["la grand-mère","الجدة"],["l’oncle","العم"],["la tante","العمة"],["le cousin","ابن العم"],["la cousine","بنت العم"]]},
  {k:"tb",head:["Masculin · مذكر","Féminin · مؤنث"],rows:[["le père","la mère"],["le frère","la sœur"],["le grand-père","la grand-mère"],["l’oncle","la tante"],["le cousin","la cousine"],["le fils","la fille"]]},
  {k:"p",ar:"استمع إلى Audio 37 و38 وكرر: le père – la mère – les parents · le frère – la sœur · le grand-père – la grand-mère – les grands-parents · la tante (la sœur du père / de la mère) · l’oncle (le frère du père / de la mère) · la cousine – le cousin."},

  {k:"s",n:4,fr:"Je réfléchis",ar:"أُقدّم: هذا وهؤلاء",pg:"ص 86–87"},
  {k:"r",t:"C’est … / Ce sont …",ar:"نقول C’est للمفرد (هذا / هذه) مع le / la، ونقول Ce sont للجمع (هؤلاء) مع les. ونستعمل C’est أيضاً مع الاسم الشخصي: C’est Adam.",ex:[["C’est le père.","هذا هو الأب."],["C’est la mère.","هذه هي الأم."],["Ce sont les parents.","هؤلاء هم الوالدان."],["C’est le grand-père.","هذا هو الجد."],["Ce sont les grands-parents.","هؤلاء هم الأجداد."]]},
  {k:"v",g:"Présenter",ga:"أدوات التقديم",items:[
   ["C’est …","هذا / هذه …","سِي","👉","يقال للمفرد"],
   ["Ce sont …","هؤلاء …","سُ سُونْ","👉👉","يقال للجمع"],
   ["Qui est-ce ?","من هذا؟","كِي إِيس","❓","سؤال عن الشخص"]]},
  {k:"d",id:"a41"},
  {k:"kn",ar:"هل تعلم؟ في فرنسا يسمّون الجد «papi» والجدة «mamie»، والعم «tonton» والعمة «tata». وكذلك يقول الأطفال «papa» للأب و«maman» للأم."},
  {k:"v",g:"Les petits noms",ga:"أسماء التدليل",items:[
   ["papi","جدّو","پَاپِي","👴","تدليل لـ grand-père"],["mamie","جدّتي","مَامِي","👵","تدليل لـ grand-mère"],
   ["tonton","عمو","تُونْتُونْ","🧔","تدليل لـ oncle"],["tata","عمتو","تَاتَا","👩‍🦰","تدليل لـ tante"],
   ["papa","بابا","پَاپَا","👨","تدليل لـ père"],["maman","ماما","مَامَانْ","👩","تدليل لـ mère"]]},

  {k:"s",n:5,fr:"Je produis",ar:"أُقدّم أفراد عائلتي",pg:"ص 88"},
  {k:"p",ar:"تتدرب مع زملائك على تقديم عائلتك في اجتماع أولياء الأمور. اختر أحد المواقف الثلاثة وقدّم الأشخاص: C’est le … C’est la … C’est l’oncle. C’est la tante. C’est la cousine. C’est le cousin."},

  {k:"s",n:6,fr:"Je produis",ar:"عائلة سامي",pg:"ص 89"},
  {k:"p",ar:"صديقك غاب عن الدرس، وتذهب إليه لتساعده في واجب «تقديم عائلة». اكتب على ورقة جملاً تقدّم فيها عائلة سامي: Le père, La mère, Le frère, La sœur, Les grands-parents, L’oncle, La tante, Les cousins – Les cousines."},
  {k:"tb",head:["Modèle · نموذج","المعنى"],rows:[["C’est Sami.","هذا سامي."],["C’est le père de Sami.","هذا أبو سامي."],["C’est la mère de Sami.","هذه أم سامي."],["Ce sont les grands-parents de Sami.","هؤلاء جدّا سامي."],["C’est l’oncle de Sami.","هذا عمّ سامي."]]},

  {k:"s",n:7,fr:"Je comprends",ar:"أفهم: نص «عائلتي»",pg:"ص 90–91"},
  {k:"d",id:"alice"},
  {k:"tb",head:["Le personnage","Âge","Loisirs"],rows:[["Alice (12 ans)","12 ans","—"],["Victor, le père","39 ans","le football"],["Nicole, la mère","37 ans","la musique et le vélo"],["Léa, la sœur","10 ans","adore la musique, déteste le volleyball"],["Lucas, le frère","7 ans","adore le football"],["Pascal, l’oncle (frère de la mère)","40 ans","—"]]},
  {k:"v",g:"Il / Elle",ga:"عبارات لتقديم شخص",items:[
   ["Il s’appelle …","اسمه …","إِيل سَابِل","👦","il = هو"],["Elle s’appelle …","اسمها …","إِيل سَابِل","👧","elle = هي"],
   ["Il aime …","هو يحب …","إِيل إِيم","🙂","il aime / elle aime: كتابة واحدة"],["Elle aime …","هي تحب …","إِيل إِيم","🙂",""],
   ["Il n’aime pas …","هو لا يحب …","إِيل نِيم پَا","😕",""],["Elle n’aime pas …","هي لا تحب …","إِيل نِيم پَا","😕",""],
   ["J’ai un frère","عندي أخ","ژِيه أُونْ فْرِير","👦","avoir: j’ai"],["Je n’ai pas de frère","ليس عندي أخ","ژُ نِيه پَا دُ فْرِير","🚫","بعد pas نقول de"]]},

  {k:"s",n:8,fr:"Je réfléchis",ar:"أقول العمر: الأرقام حتى 40",pg:"ص 92–93"},
  {k:"p",ar:"لتقديم فرد من العائلة نذكر اسمه وعمره. وتعلمنا العمر بالأرقام من 1 إلى 20. والآن نتعلم الأرقام من 21 إلى 40."},
  {k:"r",t:"Je m’appelle / J’ai … · Il s’appelle / Il a …",ar:"عن نفسي: Je m’appelle Adam. J’ai 12 ans. وعن غيري: Il s’appelle Rami. Il a 13 ans. لاحظ: j’ai (أنا عندي) وil a (هو عنده) من الفعل avoir.",ex:[["Je m’appelle Adam. J’ai 12 ans.","اسمي آدم. عمري 12 سنة."],["Il s’appelle Rami. Il a 13 ans.","اسمه رامي. عمره 13 سنة."],["Elle s’appelle Léa. Elle a 10 ans.","اسمها ليا. عمرها 10 سنوات."]]},
  {k:"nums",from:21,to:40},
  {k:"tip",ar:"قاعدة: نضع et (و) بين العشرة والرقم واحد فقط: vingt-et-un (21)، trente-et-un (31). أما بقية الأرقام فنكتبها بشرطة: vingt-deux (22)، trente-trois (33)."},
  {k:"p",ar:"تمرين الدومينو: انظر إلى القطع واجمع النقاط وقل المجموع بالفرنسية (حتى 40)."},

  {k:"s",n:9,fr:"Je réfléchis",ar:"أُقدّم فرداً من عائلتي: mon / ma / mes",pg:"ص 94–95"},
  {k:"r",t:"mon / ma / mes (ملكية: لي)",ar:"mon مع المذكر المفرد، وma مع المؤنث المفرد، وmes مع الجمع. نقول mon père وma mère وmes parents. وأيضاً: mon oncle (لأن oncle مذكر) وma tante.",ex:[["mon père","أبي"],["ma mère","أمي"],["mes parents","والداي"],["mon oncle","عمي / خالي"],["ma tante","عمتي / خالتي"],["mes grands-parents","جداي"]]},
  {k:"tb",head:["مذكر","مؤنث","جمع"],rows:[["le … / mon …","la … / ma …","les … / mes …"],["mon frère","ma sœur","mes cousins"],["Il …","Elle …","Ils / Elles …"]]},
  {k:"tb",head:["Étiquette","المعنى"],rows:[["Le frère d’Alice","أخو أليس"],["Le père d’Alice","أبو أليس"],["La mère d’Alice","أمّ أليس"],["Mon père / Ma mère / Ma sœur","أبي / أمي / أختي"],["Il s’appelle Lucas. / Elle s’appelle Nicole.","اسمه لوكاس. / اسمها نيكول."],["Il a 39 ans. / Elle a 29 ans. / Elle a 10 ans.","عمره 39 سنة. / عمرها 29 سنة. / عمرها 10 سنوات."]]},
  {k:"p",ar:"اقرأ: Mon père aime le football. Ma mère aime la lecture. ثم اسأل زميلك: Et toi ؟ (وأنت؟) وأجب عن هوايتك."},

  {k:"s",n:10,fr:"Je produis",ar:"أُقدّم أبي لمعلّم الرياضة",pg:"ص 96"},
  {k:"d",id:"pere"},
  {k:"tip",ar:"نموذج لتقديم أي شخص: «Bonjour Monsieur ! C’est mon père. Il s’appelle … Il a … ans. Il aime …»"},

  {k:"s",n:11,fr:"Je réalise la tâche",ar:"أنجز المهمة: شجرة عائلتي",pg:"ص 97"},
  {k:"p",ar:"الخطوات: 1) ارسم شجرة عائلة. 2) الصق صور أفراد عائلتك واكتب أسماءهم. 3) قدّم كل شخص على بطاقة مستقلة. المواد: كرتون، مقص، غراء، صور أفراد العائلة. ولا تنس أن تعرض شجرتك بصوت عالٍ!"},
  {k:"tb",head:["نموذج التقديم","المعنى"],rows:[["C’est mon père. Il s’appelle … Il a … ans.","هذا أبي. اسمه … عمره … سنة."],["C’est ma mère. Elle s’appelle … Elle a … ans.","هذه أمي. اسمها … عمرها … سنة."],["Ce sont mes grands-parents.","هؤلاء جداي."],["J’aime ma famille.","أحب عائلتي."]]},

  {k:"s",n:12,fr:"Bilan",ar:"الخلاصة والتقويم",pg:"ص 98–99"},
  {k:"p",ar:"شجرة عائلة عادل: Jamal وLayla (الجدّان)، Karim وRana، Dima وMaher، Majed وRami وLama وAdel وSara. عادل يجيب عن السؤال «Qui est-ce ?». مثال: C’est Layla, ma grand-mère. C’est la mère de mon père. أكمل: C’est Jamal, mon grand-père. C’est le père de mon père. · C’est Dima, ma tante. C’est la sœur de mon père. · C’est Maher, mon oncle. C’est le frère de mon père."},
  {k:"d",id:"a45"},
  {k:"check",ar:"التقويم الذاتي: أستطيع أن…",items:["أسمّي أفراد عائلتي","أقول وأكتب الأرقام حتى 40","أقدّم عائلتي بـ c’est + le / la / l’ وce sont + les","أستعمل mon وma وmes","أستعمل il s’appelle وelle s’appelle وil a وelle a وil aime وelle aime","أقدّم عائلتي: صلة القرابة والاسم والعمر والهوايات"]}
 ],

 ex:[
  {t:"Séance 2 · حوار توم وآدم",items:[
   {t:"mc",q:"من تعرض Tom على آدم في الصورة؟",say:"C’est mon père. C’est ma mère et ma sœur.",o:["الأب والأم والأخت","الأب والأم والأخ","الجد والجدة"],a:0,x:"Tom: mon père, ma mère et ma sœur."},
   {t:"mc",q:"هل لدى Tom أخ؟",say:"Je n’ai pas de frère.",o:["لا","نعم","نعم، أخوان"],a:0,x:"Je n’ai pas de frère."},
   {t:"mc",q:"من هم الأطفال في صورة آدم؟",say:"Ce sont mes cousins et ma cousine.",o:["أبناء عمومته وبنت عمه","إخوته","جيرانه"],a:0,x:"Ce sont mes cousins et ma cousine."},
   {t:"match",q:"أكمل شجرة عائلة آدم: صِل المعنى بالكلمة",pairs:[["الجد","le grand-père"],["العمة","la tante"],["الأم","la mère"],["بنت العم","la cousine"]]},
   {t:"match",q:"صِل كل كلمة بمعناها:",pairs:[["le père","الأب"],["la mère","الأم"],["le frère","الأخ"],["la sœur","الأخت"]]}]},
  {t:"Séance 3 · أفراد العائلة",items:[
   {t:"match",q:"صِل كل كلمة بمعناها:",pairs:[["l’oncle","العم / الخال"],["la tante","العمة / الخالة"],["le cousin","ابن العم"],["la cousine","بنت العم"],["le grand-père","الجد"],["la grand-mère","الجدة"]]},
   {t:"mc",q:"« C’est le père du père ou de la mère. » من هو؟",o:["le grand-père","l’oncle","le cousin"],a:0,x:"أبو الأب أو الأم = le grand-père"},
   {t:"mc",q:"« C’est la fille de l’oncle ou de la tante. » من هي؟",o:["la cousine","la sœur","la tante"],a:0,x:"la cousine"},
   {t:"mc",q:"« C’est la fille de mon père et de ma mère. » من هي؟",o:["ma sœur","ma cousine","ma tante"],a:0,x:"ma sœur"},
   {t:"mc",q:"« C’est la mère du père ou de la mère. » من هي؟",o:["la grand-mère","la tante","la sœur"],a:0,x:"la grand-mère"},
   {t:"mc",q:"« C’est le frère du père ou de la mère. » من هو؟",o:["l’oncle","le cousin","le frère"],a:0,x:"l’oncle"},
   {t:"mc",q:"« C’est la sœur du père ou de la mère. » من هي؟",o:["la tante","la cousine","la sœur"],a:0,x:"la tante"},
   {t:"mc",q:"« C’est le fils de l’oncle ou de la tante. » من هو؟",o:["le cousin","le frère","l’oncle"],a:0,x:"le cousin"},
   {t:"mc",q:"« C’est le fils de mon père et de ma mère. » من هو؟",o:["mon frère","mon cousin","mon oncle"],a:0,x:"mon frère"}]},
  {t:"Séance 4 · le / la / l’ وC’est / Ce sont",items:[
   {t:"mc",q:"… sœur",o:["la","le","l’"],a:0,x:"la sœur"},
   {t:"mc",q:"… oncle",o:["l’","le","la"],a:0,x:"l’oncle (يبدأ بحرف متحرك)"},
   {t:"mc",q:"… père",o:["le","la","l’"],a:0,x:"le père"},
   {t:"mc",q:"… mère",o:["la","le","l’"],a:0,x:"la mère"},
   {t:"mc",q:"… les parents",o:["Ce sont","C’est"],a:0,x:"للجمع: Ce sont"},
   {t:"mc",q:"… le grand-père",o:["C’est","Ce sont"],a:0,x:"للمفرد: C’est"},
   {t:"order",q:"رتّب الكلمات:",ans:["C’est","la","tante","de","Léo","."],x:"C’est la tante de Léo."},
   {t:"order",q:"رتّب الكلمات:",ans:["Ce","sont","les","parents","de","Léo","."],x:"Ce sont les parents de Léo."}]},
  {t:"Séance 7 · نص «عائلتي»",items:[
   {t:"mc",q:"كم عمر أخ أليس Lucas؟",say:"Mon frère s’appelle Lucas. Il a 7 ans et il adore le football.",o:["7 ans","10 ans","12 ans"],a:0,x:"Il a 7 ans."},
   {t:"mc",q:"كم عمر أخت أليس Léa؟",say:"J’ai une sœur, elle s’appelle Léa. Elle a 10 ans.",o:["10 ans","7 ans","12 ans"],a:0,x:"Elle a 10 ans."},
   {t:"mc",q:"Pascal هو … أليس",o:["l’oncle","le grand-père","le père"],a:0,x:"Ma mère a un frère. C’est mon oncle Pascal."},
   {t:"mc",q:"Nicole هي … لوكاس",o:["la mère","la sœur","la tante"],a:0,x:"Nicole هي أم أليس ولوكاس"},
   {t:"mc",q:"هل تحب أليس عائلتها؟",say:"J’aime ma famille.",o:["نعم: aime","لا: n’aime pas"],a:0,x:"J’aime ma famille."},
   {t:"mc",q:"من يحب الكرة الطائرة؟ (في عائلة أليس)",o:["لا أحد يحبها: ليا تكرهها","ليا","لوكاس"],a:0,x:"Léa déteste le volleyball."}]},
  {t:"Séance 8 · الأرقام 21–40",items:[
   {t:"num",q:"استمع واكتب الرقم الذي سمعته:",from:21,to:40,n:8},
   {t:"type",q:"اكتب الرقم 21 بالحروف الفرنسية:",pr:"21 = ?",a:["vingt-et-un","vingt et un"],x:"vingt-et-un"},
   {t:"type",q:"اكتب الرقم 32 بالحروف:",pr:"32 = ?",a:["trente-deux","trente deux"],x:"trente-deux"},
   {t:"type",q:"اكتب الرقم 25 بالحروف:",pr:"25 = ?",a:["vingt-cinq","vingt cinq"],x:"vingt-cinq"},
   {t:"type",q:"اكتب الرقم 40 بالحروف:",pr:"40 = ?",a:["quarante"],x:"quarante"},
   {t:"mc",q:"اختر الرقم الذي ينطقه المعلم (دائرة العمود): 21 – 28 – 30",say:"vingt-huit",o:["28","21","30"],a:0,x:"vingt-huit = 28"},
   {t:"mc",q:"Quel âge as-tu ? — « J’ai … ans ». كيف تقول 35؟",o:["trente-cinq","vingt-cinq","trente-six"],a:0,x:"35 = trente-cinq"},
   {t:"mc",q:"أكمل: Il … 15 ans.",o:["a","ai","est"],a:0,x:"il a"},
   {t:"match",q:"صِل الجملة بمعناها:",pairs:[["Je m’appelle Lucas.","اسمي لوكاس."],["Il s’appelle Farid.","اسمه فريد."],["J’ai 15 ans.","عمري 15 سنة."],["Il a 15 ans.","عمره 15 سنة."]]}]},
  {t:"Séance 9 · mon / ma / mes",items:[
   {t:"mc",q:"… père",o:["Mon","Ma","Mes"],a:0,x:"mon père"},
   {t:"mc",q:"… sœur",o:["Ma","Mon","Mes"],a:0,x:"ma sœur"},
   {t:"mc",q:"… grands-parents",o:["Mes","Mon","Ma"],a:0,x:"mes grands-parents"},
   {t:"mc",q:"… mère",o:["Ma","Mon","Mes"],a:0,x:"ma mère"},
   {t:"mc",q:"… oncle et … tante sont irakiens.",o:["Mon … ma","Ma … mon","Mes … mes"],a:0,x:"Mon oncle et ma tante sont irakiens."},
   {t:"mc",q:"J’aime … grands-parents, ils sont en Irak.",o:["mes","mon","ma"],a:0,x:"mes grands-parents"},
   {t:"mc",q:"… grand-mère aime marcher et … grand-père adore lire.",o:["Ma … mon","Mon … ma","Mes … mes"],a:0,x:"Ma grand-mère … mon grand-père"},
   {t:"mc",q:"… ai deux cousins. … cousin a 23 ans.",o:["J’… Mon","Je … Ma","J’… Mes"],a:0,x:"J’ai deux cousins. Mon cousin a 23 ans."},
   {t:"fill",q:"أكمل: mon – ma – mes / il – elle / a – s’appelle",text:"a. Rami est le frère de mon père. C’est ___ oncle. ___ ___ 39 ans.\nb. C’est ___ tante. ___ ___ Sarah. ___ ___ 25 ans.\nc. Ce sont ___ grands-parents.",blanks:["mon","Il","a","ma","Elle","s’appelle","Elle","a","mes"],bank:["mon","ma","mes","Il","Elle","Elle","a","a","s’appelle"]},
   {t:"mc",q:"المذكر أم المؤنث؟ «Elle a 40 ans.»",o:["مؤنث","مذكر"],a:0,x:"elle = هي = مؤنث"},
   {t:"mc",q:"المذكر أم المؤنث؟ «Il s’appelle Rami.»",o:["مذكر","مؤنث"],a:0,x:"il = هو = مذكر"}]},
  {t:"Séance 12 · التقويم",items:[
   {t:"fill",q:"شجرة عائلة عادل — أكمل: mon grand-père – ma tante – mon oncle – ma grand-mère",text:"Qui est-ce ? C’est Layla, ___. C’est la mère de mon père.\nQui est-ce ? C’est Jamal, ___. C’est le père de mon père.\nQui est-ce ? C’est Dima, ___. C’est la sœur de mon père.\nQui est-ce ? C’est Maher, ___. C’est le frère de mon père.",blanks:["ma grand-mère","mon grand-père","ma tante","mon oncle"],bank:["mon grand-père","ma tante","mon oncle","ma grand-mère"]},
   {t:"mc",q:"أكمل: Mon oncle et ma tante sont …",o:["irakiens","irakienne","irakien"],a:0,x:"جمع: irakiens"}]},
  {t:"Séances 11–12 · نحو DELF",items:[
   {t:"mc",q:"استمع إلى لوكاس. كم عمره؟",say:"Je m’appelle Lucas. J’ai 12 ans.",o:["12 ans","10 ans","14 ans"],a:0,x:"J’ai 12 ans."},
   {t:"mc",q:"كم عمر أخيه Léo؟",say:"Mon frère s’appelle Léo. Il a 10 ans. Il aime le volleyball.",o:["10 ans","12 ans","14 ans"],a:0,x:"Il a 10 ans."},
   {t:"mc",q:"كم عمر أخته Léa؟",say:"J’ai aussi une sœur. Elle a 14 ans et elle s’appelle Léa.",o:["14 ans","12 ans","10 ans"],a:0,x:"Elle a 14 ans."},
   {t:"mc",q:"ماذا تحب Léa؟",say:"Elle n’aime pas le sport mais elle adore la peinture.",o:["la peinture","le volleyball","le football"],a:0,x:"Elle adore la peinture."},
   {t:"tf",q:"La mère de Léo aime le tennis. (القراءة: الأب يحب التنس)",a:false,x:"Mon père, Adam, adore le tennis."},
   {t:"tf",q:"Le père de Léo s’appelle Adam.",a:true,x:"Mon père, Adam…"},
   {t:"tf",q:"Oscar a des cousins.",a:true,x:"Ce sont mes grands-parents, ma tante et mes cousins."},
   {t:"tf",q:"Oscar aime la peinture. (النص: عمة أوسكار تحب الرسم)",a:false,x:"Ma tante aime la peinture."}]}
 ],

 qs:[
  {a:"ما معنى هذه الكلمة؟",e:"la grand-mère",o:["الجدة","العمة","الأم","بنت العم"],spk:"la grand-mère",x:"la grand-mère = الجدة"},
  {a:"ما معنى هذه الكلمة؟",e:"l’oncle",o:["العم / الخال","الجد","ابن العم","الأب"],spk:"l’oncle",x:"l’oncle = العم / الخال"},
  {a:"ما معنى هذه الكلمة؟",e:"la tante",o:["العمة / الخالة","الجدة","الأخت","الأم"],spk:"la tante",x:"la tante = العمة / الخالة"},
  {a:"ما معنى هذه الكلمة؟",e:"les parents",o:["الوالدان","الأقارب","الأجداد","الإخوة"],spk:"les parents",x:"les parents = الأب والأم"},
  {a:"ما معنى هذه الكلمة؟",e:"le cousin",o:["ابن العم / الخال","الأخ","الجد","العم"],spk:"le cousin",x:"le cousin = ابن العم"},
  {a:"ما معنى هذه الكلمة؟",e:"la sœur",o:["الأخت","الأم","العمة","الجدة"],spk:"la sœur",x:"la sœur = الأخت"},
  {a:"ما معنى هذه الكلمة؟",e:"le grand-père",o:["الجد","الأب","العم","الأخ"],spk:"le grand-père",x:"le grand-père = الجد"},
  {a:"اختر الأداة الصحيحة: … oncle",o:["l’","le","la","les"],x:"l’oncle"},
  {a:"اختر الأداة الصحيحة: … tante",o:["la","le","l’","les"],x:"la tante"},
  {a:"اختر: … sont les parents.",o:["Ce","C’","Ça","Se"],x:"Ce sont les parents."},
  {a:"اختر: … est la mère.",o:["C’","Ce","Ça","Se"],x:"C’est la mère."},
  {a:"ما العدد؟",e:"vingt-et-un",o:["21","20","22","11"],spk:"vingt-et-un",x:"vingt-et-un = 21"},
  {a:"ما العدد؟",e:"trente-quatre",o:["34","24","44","14"],spk:"trente-quatre",x:"trente-quatre = 34"},
  {a:"ما العدد؟",e:"vingt-huit",o:["28","18","38","8"],spk:"vingt-huit",x:"vingt-huit = 28"},
  {a:"ما العدد؟",e:"quarante",o:["40","14","4","30"],spk:"quarante",x:"quarante = 40"},
  {a:"كيف تكتب 30 بالفرنسية؟",o:["trente","trois","treize","vingt"],x:"30 = trente"},
  {a:"كيف تكتب 39 بالفرنسية؟",o:["trente-neuf","vingt-neuf","trente-huit","quarante"],x:"39 = trente-neuf"},
  {a:"أكمل: Je … 12 ans.",o:["ai","suis","a","es"],x:"J’ai 12 ans."},
  {a:"أكمل: Il … 13 ans.",o:["a","ai","est","as"],x:"Il a 13 ans."},
  {a:"أكمل: … s’appelle Rami. (ولد)",o:["Il","Elle","Je","Mon"],x:"Il s’appelle Rami."},
  {a:"أكمل: … s’appelle Léa. (بنت)",o:["Elle","Il","Mon","Ma"],x:"Elle s’appelle Léa."},
  {a:"أكمل: … mère aime la musique.",o:["Ma","Mon","Mes","Le"],x:"Ma mère aime la musique."},
  {a:"أكمل: … père aime le football.",o:["Mon","Ma","Mes","La"],x:"Mon père aime le football."},
  {a:"أكمل: … parents sont gentils.",o:["Mes","Mon","Ma","Le"],x:"Mes parents..."},
  {a:"ما شجرة العائلة بالفرنسية؟",o:["l’arbre généalogique","la famille","le père","les parents"],x:"l’arbre généalogique"},
  {tf:true,e:"« Mon tante » est correct.",x:"خطأ: ma tante.",tfa:false},
  {tf:true,e:"On dit « Ce sont les grands-parents ».",x:"صح.",tfa:true},
  {tf:true,e:"« Il a 12 ans » = عمره 12 سنة.",x:"صح.",tfa:true}
 ]
});
