/* ============================================================
   NihongoTrip — dati statici (kana, vocabolario, frasi)
   Modifica/aggiungi voci qui: l'app le userà automaticamente.
   ============================================================ */

// ---------- HIRAGANA ----------
// lvl: 1 = base (46), 2 = dakuten/handakuten, 3 = combinazioni (youon)
var HIRAGANA = [
  {k:'あ',r:'a',lvl:1},{k:'い',r:'i',lvl:1},{k:'う',r:'u',lvl:1},{k:'え',r:'e',lvl:1},{k:'お',r:'o',lvl:1},
  {k:'か',r:'ka',lvl:1},{k:'き',r:'ki',lvl:1},{k:'く',r:'ku',lvl:1},{k:'け',r:'ke',lvl:1},{k:'こ',r:'ko',lvl:1},
  {k:'さ',r:'sa',lvl:1},{k:'し',r:'shi',lvl:1},{k:'す',r:'su',lvl:1},{k:'せ',r:'se',lvl:1},{k:'そ',r:'so',lvl:1},
  {k:'た',r:'ta',lvl:1},{k:'ち',r:'chi',lvl:1},{k:'つ',r:'tsu',lvl:1},{k:'て',r:'te',lvl:1},{k:'と',r:'to',lvl:1},
  {k:'な',r:'na',lvl:1},{k:'に',r:'ni',lvl:1},{k:'ぬ',r:'nu',lvl:1},{k:'ね',r:'ne',lvl:1},{k:'の',r:'no',lvl:1},
  {k:'は',r:'ha',lvl:1},{k:'ひ',r:'hi',lvl:1},{k:'ふ',r:'fu',lvl:1},{k:'へ',r:'he',lvl:1},{k:'ほ',r:'ho',lvl:1},
  {k:'ま',r:'ma',lvl:1},{k:'み',r:'mi',lvl:1},{k:'む',r:'mu',lvl:1},{k:'め',r:'me',lvl:1},{k:'も',r:'mo',lvl:1},
  {k:'や',r:'ya',lvl:1},{k:'ゆ',r:'yu',lvl:1},{k:'よ',r:'yo',lvl:1},
  {k:'ら',r:'ra',lvl:1},{k:'り',r:'ri',lvl:1},{k:'る',r:'ru',lvl:1},{k:'れ',r:'re',lvl:1},{k:'ろ',r:'ro',lvl:1},
  {k:'わ',r:'wa',lvl:1},{k:'を',r:'wo',lvl:1},{k:'ん',r:'n',lvl:1},
  {k:'が',r:'ga',lvl:2},{k:'ぎ',r:'gi',lvl:2},{k:'ぐ',r:'gu',lvl:2},{k:'げ',r:'ge',lvl:2},{k:'ご',r:'go',lvl:2},
  {k:'ざ',r:'za',lvl:2},{k:'じ',r:'ji',lvl:2},{k:'ず',r:'zu',lvl:2},{k:'ぜ',r:'ze',lvl:2},{k:'ぞ',r:'zo',lvl:2},
  {k:'だ',r:'da',lvl:2},{k:'ぢ',r:'ji',lvl:2},{k:'づ',r:'zu',lvl:2},{k:'で',r:'de',lvl:2},{k:'ど',r:'do',lvl:2},
  {k:'ば',r:'ba',lvl:2},{k:'び',r:'bi',lvl:2},{k:'ぶ',r:'bu',lvl:2},{k:'べ',r:'be',lvl:2},{k:'ぼ',r:'bo',lvl:2},
  {k:'ぱ',r:'pa',lvl:2},{k:'ぴ',r:'pi',lvl:2},{k:'ぷ',r:'pu',lvl:2},{k:'ぺ',r:'pe',lvl:2},{k:'ぽ',r:'po',lvl:2},
  {k:'きゃ',r:'kya',lvl:3},{k:'きゅ',r:'kyu',lvl:3},{k:'きょ',r:'kyo',lvl:3},
  {k:'しゃ',r:'sha',lvl:3},{k:'しゅ',r:'shu',lvl:3},{k:'しょ',r:'sho',lvl:3},
  {k:'ちゃ',r:'cha',lvl:3},{k:'ちゅ',r:'chu',lvl:3},{k:'ちょ',r:'cho',lvl:3},
  {k:'にゃ',r:'nya',lvl:3},{k:'にゅ',r:'nyu',lvl:3},{k:'にょ',r:'nyo',lvl:3},
  {k:'ひゃ',r:'hya',lvl:3},{k:'ひゅ',r:'hyu',lvl:3},{k:'ひょ',r:'hyo',lvl:3},
  {k:'みゃ',r:'mya',lvl:3},{k:'みゅ',r:'myu',lvl:3},{k:'みょ',r:'myo',lvl:3},
  {k:'りゃ',r:'rya',lvl:3},{k:'りゅ',r:'ryu',lvl:3},{k:'りょ',r:'ryo',lvl:3},
  {k:'ぎゃ',r:'gya',lvl:3},{k:'ぎゅ',r:'gyu',lvl:3},{k:'ぎょ',r:'gyo',lvl:3},
  {k:'じゃ',r:'ja',lvl:3},{k:'じゅ',r:'ju',lvl:3},{k:'じょ',r:'jo',lvl:3},
  {k:'びゃ',r:'bya',lvl:3},{k:'びゅ',r:'byu',lvl:3},{k:'びょ',r:'byo',lvl:3},
  {k:'ぴゃ',r:'pya',lvl:3},{k:'ぴゅ',r:'pyu',lvl:3},{k:'ぴょ',r:'pyo',lvl:3},
];

// ---------- KATAKANA ----------
var KATAKANA = [
  {k:'ア',r:'a',lvl:1},{k:'イ',r:'i',lvl:1},{k:'ウ',r:'u',lvl:1},{k:'エ',r:'e',lvl:1},{k:'オ',r:'o',lvl:1},
  {k:'カ',r:'ka',lvl:1},{k:'キ',r:'ki',lvl:1},{k:'ク',r:'ku',lvl:1},{k:'ケ',r:'ke',lvl:1},{k:'コ',r:'ko',lvl:1},
  {k:'サ',r:'sa',lvl:1},{k:'シ',r:'shi',lvl:1},{k:'ス',r:'su',lvl:1},{k:'セ',r:'se',lvl:1},{k:'ソ',r:'so',lvl:1},
  {k:'タ',r:'ta',lvl:1},{k:'チ',r:'chi',lvl:1},{k:'ツ',r:'tsu',lvl:1},{k:'テ',r:'te',lvl:1},{k:'ト',r:'to',lvl:1},
  {k:'ナ',r:'na',lvl:1},{k:'ニ',r:'ni',lvl:1},{k:'ヌ',r:'nu',lvl:1},{k:'ネ',r:'ne',lvl:1},{k:'ノ',r:'no',lvl:1},
  {k:'ハ',r:'ha',lvl:1},{k:'ヒ',r:'hi',lvl:1},{k:'フ',r:'fu',lvl:1},{k:'ヘ',r:'he',lvl:1},{k:'ホ',r:'ho',lvl:1},
  {k:'マ',r:'ma',lvl:1},{k:'ミ',r:'mi',lvl:1},{k:'ム',r:'mu',lvl:1},{k:'メ',r:'me',lvl:1},{k:'モ',r:'mo',lvl:1},
  {k:'ヤ',r:'ya',lvl:1},{k:'ユ',r:'yu',lvl:1},{k:'ヨ',r:'yo',lvl:1},
  {k:'ラ',r:'ra',lvl:1},{k:'リ',r:'ri',lvl:1},{k:'ル',r:'ru',lvl:1},{k:'レ',r:'re',lvl:1},{k:'ロ',r:'ro',lvl:1},
  {k:'ワ',r:'wa',lvl:1},{k:'ヲ',r:'wo',lvl:1},{k:'ン',r:'n',lvl:1},
  {k:'ガ',r:'ga',lvl:2},{k:'ギ',r:'gi',lvl:2},{k:'グ',r:'gu',lvl:2},{k:'ゲ',r:'ge',lvl:2},{k:'ゴ',r:'go',lvl:2},
  {k:'ザ',r:'za',lvl:2},{k:'ジ',r:'ji',lvl:2},{k:'ズ',r:'zu',lvl:2},{k:'ゼ',r:'ze',lvl:2},{k:'ゾ',r:'zo',lvl:2},
  {k:'ダ',r:'da',lvl:2},{k:'ヂ',r:'ji',lvl:2},{k:'ヅ',r:'zu',lvl:2},{k:'デ',r:'de',lvl:2},{k:'ド',r:'do',lvl:2},
  {k:'バ',r:'ba',lvl:2},{k:'ビ',r:'bi',lvl:2},{k:'ブ',r:'bu',lvl:2},{k:'ベ',r:'be',lvl:2},{k:'ボ',r:'bo',lvl:2},
  {k:'パ',r:'pa',lvl:2},{k:'ピ',r:'pi',lvl:2},{k:'プ',r:'pu',lvl:2},{k:'ペ',r:'pe',lvl:2},{k:'ポ',r:'po',lvl:2},
  {k:'キャ',r:'kya',lvl:3},{k:'キュ',r:'kyu',lvl:3},{k:'キョ',r:'kyo',lvl:3},
  {k:'シャ',r:'sha',lvl:3},{k:'シュ',r:'shu',lvl:3},{k:'ショ',r:'sho',lvl:3},
  {k:'チャ',r:'cha',lvl:3},{k:'チュ',r:'chu',lvl:3},{k:'チョ',r:'cho',lvl:3},
  {k:'ニャ',r:'nya',lvl:3},{k:'ニュ',r:'nyu',lvl:3},{k:'ニョ',r:'nyo',lvl:3},
  {k:'ヒャ',r:'hya',lvl:3},{k:'ヒュ',r:'hyu',lvl:3},{k:'ヒョ',r:'hyo',lvl:3},
  {k:'ミャ',r:'mya',lvl:3},{k:'ミュ',r:'myu',lvl:3},{k:'ミョ',r:'myo',lvl:3},
  {k:'リャ',r:'rya',lvl:3},{k:'リュ',r:'ryu',lvl:3},{k:'リョ',r:'ryo',lvl:3},
  {k:'ギャ',r:'gya',lvl:3},{k:'ギュ',r:'gyu',lvl:3},{k:'ギョ',r:'gyo',lvl:3},
  {k:'ジャ',r:'ja',lvl:3},{k:'ジュ',r:'ju',lvl:3},{k:'ジョ',r:'jo',lvl:3},
  {k:'ビャ',r:'bya',lvl:3},{k:'ビュ',r:'byu',lvl:3},{k:'ビョ',r:'byo',lvl:3},
  {k:'ピャ',r:'pya',lvl:3},{k:'ピュ',r:'pyu',lvl:3},{k:'ピョ',r:'pyo',lvl:3},
];

// ---------- CATEGORIE (etichette leggibili) ----------
var CATEGORY_LABELS = {
  saluti: 'Saluti e cortesia',
  numeri: 'Numeri e quantità',
  tempo: 'Tempo e giorni',
  cibo: 'Cibo e ristorante',
  direzioni: 'Direzioni e luoghi',
  trasporti: 'Trasporti',
  emergenza: 'Emergenze e salute',
  verbi: 'Verbi comuni',
  aggettivi: 'Aggettivi comuni',
  shopping: 'Shopping e soldi',
  smalltalk: 'Small talk e domande',
  alloggio: 'Alloggio',
};

// ---------- VOCABOLARIO (per SRS) ----------
// jp = forma con kanji (se assente = solo kana), kana = lettura, romaji, it = italiano, cat = categoria
var VOCAB = [
  // saluti
  {jp:'おはようございます',kana:'おはようございます',romaji:'ohayou gozaimasu',it:'buongiorno (mattina)',cat:'saluti'},
  {jp:'こんにちは',kana:'こんにちは',romaji:'konnichiwa',it:'buongiorno / salve',cat:'saluti'},
  {jp:'こんばんは',kana:'こんばんは',romaji:'konbanwa',it:'buonasera',cat:'saluti'},
  {jp:'さようなら',kana:'さようなら',romaji:'sayounara',it:'arrivederci',cat:'saluti'},
  {jp:'おやすみなさい',kana:'おやすみなさい',romaji:'oyasumi nasai',it:'buonanotte',cat:'saluti'},
  {jp:'ありがとうございます',kana:'ありがとうございます',romaji:'arigatou gozaimasu',it:'grazie',cat:'saluti'},
  {jp:'すみません',kana:'すみません',romaji:'sumimasen',it:'mi scusi / scusa',cat:'saluti'},
  {jp:'ごめんなさい',kana:'ごめんなさい',romaji:'gomen nasai',it:'mi dispiace',cat:'saluti'},
  {jp:'お願いします',kana:'おねがいします',romaji:'onegaishimasu',it:'per favore',cat:'saluti'},
  {jp:'どういたしまして',kana:'どういたしまして',romaji:'dou itashimashite',it:'prego (risposta a grazie)',cat:'saluti'},
  {jp:'はじめまして',kana:'はじめまして',romaji:'hajimemashite',it:'piacere (primo incontro)',cat:'saluti'},
  {jp:'よろしくお願いします',kana:'よろしくおねがいします',romaji:'yoroshiku onegaishimasu',it:'piacere / mi raccomando',cat:'saluti'},
  {jp:'はい',kana:'はい',romaji:'hai',it:'sì',cat:'saluti'},
  {jp:'いいえ',kana:'いいえ',romaji:'iie',it:'no',cat:'saluti'},
  {jp:'大丈夫です',kana:'だいじょうぶです',romaji:'daijoubu desu',it:'va bene / tutto ok',cat:'saluti'},

  // numeri
  {jp:'ゼロ',kana:'ゼロ',romaji:'zero',it:'zero',cat:'numeri'},
  {jp:'一',kana:'いち',romaji:'ichi',it:'uno (1)',cat:'numeri'},
  {jp:'二',kana:'に',romaji:'ni',it:'due (2)',cat:'numeri'},
  {jp:'三',kana:'さん',romaji:'san',it:'tre (3)',cat:'numeri'},
  {jp:'四',kana:'よん',romaji:'yon',it:'quattro (4)',cat:'numeri'},
  {jp:'五',kana:'ご',romaji:'go',it:'cinque (5)',cat:'numeri'},
  {jp:'六',kana:'ろく',romaji:'roku',it:'sei (6)',cat:'numeri'},
  {jp:'七',kana:'なな',romaji:'nana',it:'sette (7)',cat:'numeri'},
  {jp:'八',kana:'はち',romaji:'hachi',it:'otto (8)',cat:'numeri'},
  {jp:'九',kana:'きゅう',romaji:'kyuu',it:'nove (9)',cat:'numeri'},
  {jp:'十',kana:'じゅう',romaji:'juu',it:'dieci (10)',cat:'numeri'},
  {jp:'二十',kana:'にじゅう',romaji:'nijuu',it:'venti (20)',cat:'numeri'},
  {jp:'三十',kana:'さんじゅう',romaji:'sanjuu',it:'trenta (30)',cat:'numeri'},
  {jp:'百',kana:'ひゃく',romaji:'hyaku',it:'cento (100)',cat:'numeri'},
  {jp:'千',kana:'せん',romaji:'sen',it:'mille (1000)',cat:'numeri'},
  {jp:'万',kana:'まん',romaji:'man',it:'diecimila (10.000)',cat:'numeri'},
  {jp:'円',kana:'えん',romaji:'en',it:'yen (valuta)',cat:'numeri'},

  // tempo
  {jp:'今日',kana:'きょう',romaji:'kyou',it:'oggi',cat:'tempo'},
  {jp:'明日',kana:'あした',romaji:'ashita',it:'domani',cat:'tempo'},
  {jp:'昨日',kana:'きのう',romaji:'kinou',it:'ieri',cat:'tempo'},
  {jp:'今',kana:'いま',romaji:'ima',it:'adesso',cat:'tempo'},
  {jp:'朝',kana:'あさ',romaji:'asa',it:'mattina',cat:'tempo'},
  {jp:'昼',kana:'ひる',romaji:'hiru',it:'mezzogiorno / giorno',cat:'tempo'},
  {jp:'夜',kana:'よる',romaji:'yoru',it:'sera / notte',cat:'tempo'},
  {jp:'週末',kana:'しゅうまつ',romaji:'shuumatsu',it:'weekend',cat:'tempo'},
  {jp:'月曜日',kana:'げつようび',romaji:'getsuyoubi',it:'lunedì',cat:'tempo'},
  {jp:'火曜日',kana:'かようび',romaji:'kayoubi',it:'martedì',cat:'tempo'},
  {jp:'水曜日',kana:'すいようび',romaji:'suiyoubi',it:'mercoledì',cat:'tempo'},
  {jp:'木曜日',kana:'もくようび',romaji:'mokuyoubi',it:'giovedì',cat:'tempo'},
  {jp:'金曜日',kana:'きんようび',romaji:'kinyoubi',it:'venerdì',cat:'tempo'},
  {jp:'土曜日',kana:'どようび',romaji:'doyoubi',it:'sabato',cat:'tempo'},
  {jp:'日曜日',kana:'にちようび',romaji:'nichiyoubi',it:'domenica',cat:'tempo'},

  // cibo
  {jp:'ご飯',kana:'ごはん',romaji:'gohan',it:'riso / pasto',cat:'cibo'},
  {jp:'水',kana:'みず',romaji:'mizu',it:'acqua',cat:'cibo'},
  {jp:'お茶',kana:'おちゃ',romaji:'ocha',it:'tè',cat:'cibo'},
  {jp:'ビール',kana:'ビール',romaji:'biiru',it:'birra',cat:'cibo'},
  {jp:'美味しい',kana:'おいしい',romaji:'oishii',it:'buono (cibo)',cat:'cibo'},
  {jp:'辛い',kana:'からい',romaji:'karai',it:'piccante',cat:'cibo'},
  {jp:'甘い',kana:'あまい',romaji:'amai',it:'dolce',cat:'cibo'},
  {jp:'レストラン',kana:'レストラン',romaji:'resutoran',it:'ristorante',cat:'cibo'},
  {jp:'メニュー',kana:'メニュー',romaji:'menyuu',it:'menu',cat:'cibo'},
  {jp:'お会計',kana:'おかいけい',romaji:'okaikei',it:'il conto',cat:'cibo'},
  {jp:'魚',kana:'さかな',romaji:'sakana',it:'pesce',cat:'cibo'},
  {jp:'肉',kana:'にく',romaji:'niku',it:'carne',cat:'cibo'},
  {jp:'野菜',kana:'やさい',romaji:'yasai',it:'verdura',cat:'cibo'},
  {jp:'卵',kana:'たまご',romaji:'tamago',it:'uovo',cat:'cibo'},
  {jp:'麺',kana:'めん',romaji:'men',it:'noodles / pasta',cat:'cibo'},
  {jp:'箸',kana:'はし',romaji:'hashi',it:'bacchette',cat:'cibo'},
  {jp:'これ',kana:'これ',romaji:'kore',it:'questo',cat:'cibo'},
  {jp:'それ',kana:'それ',romaji:'sore',it:'quello (vicino a te)',cat:'cibo'},
  {jp:'ください',kana:'ください',romaji:'kudasai',it:'per favore (dammi)',cat:'cibo'},
  {jp:'いただきます',kana:'いただきます',romaji:'itadakimasu',it:'formula prima di mangiare',cat:'cibo'},
  {jp:'ごちそうさまでした',kana:'ごちそうさまでした',romaji:'gochisousama deshita',it:'formula dopo aver mangiato',cat:'cibo'},

  // direzioni
  {jp:'駅',kana:'えき',romaji:'eki',it:'stazione',cat:'direzioni'},
  {jp:'空港',kana:'くうこう',romaji:'kuukou',it:'aeroporto',cat:'direzioni'},
  {jp:'トイレ',kana:'トイレ',romaji:'toire',it:'bagno',cat:'direzioni'},
  {jp:'病院',kana:'びょういん',romaji:'byouin',it:'ospedale',cat:'direzioni'},
  {jp:'薬局',kana:'やっきょく',romaji:'yakkyoku',it:'farmacia',cat:'direzioni'},
  {jp:'コンビニ',kana:'コンビニ',romaji:'konbini',it:'minimarket',cat:'direzioni'},
  {jp:'右',kana:'みぎ',romaji:'migi',it:'destra',cat:'direzioni'},
  {jp:'左',kana:'ひだり',romaji:'hidari',it:'sinistra',cat:'direzioni'},
  {jp:'まっすぐ',kana:'まっすぐ',romaji:'massugu',it:'dritto',cat:'direzioni'},
  {jp:'ここ',kana:'ここ',romaji:'koko',it:'qui',cat:'direzioni'},
  {jp:'どこ',kana:'どこ',romaji:'doko',it:'dove',cat:'direzioni'},
  {jp:'近い',kana:'ちかい',romaji:'chikai',it:'vicino',cat:'direzioni'},
  {jp:'遠い',kana:'とおい',romaji:'tooi',it:'lontano',cat:'direzioni'},
  {jp:'入口',kana:'いりぐち',romaji:'iriguchi',it:'entrata',cat:'direzioni'},
  {jp:'出口',kana:'でぐち',romaji:'deguchi',it:'uscita',cat:'direzioni'},

  // trasporti
  {jp:'電車',kana:'でんしゃ',romaji:'densha',it:'treno',cat:'trasporti'},
  {jp:'バス',kana:'バス',romaji:'basu',it:'autobus',cat:'trasporti'},
  {jp:'タクシー',kana:'タクシー',romaji:'takushii',it:'taxi',cat:'trasporti'},
  {jp:'切符',kana:'きっぷ',romaji:'kippu',it:'biglietto',cat:'trasporti'},
  {jp:'飛行機',kana:'ひこうき',romaji:'hikouki',it:'aereo',cat:'trasporti'},
  {jp:'乗り換え',kana:'のりかえ',romaji:'norikae',it:'cambio (treno)',cat:'trasporti'},
  {jp:'何時',kana:'なんじ',romaji:'nanji',it:'che ora',cat:'trasporti'},
  {jp:'時刻表',kana:'じこくひょう',romaji:'jikokuhyou',it:'orario',cat:'trasporti'},
  {jp:'自転車',kana:'じてんしゃ',romaji:'jitensha',it:'bicicletta',cat:'trasporti'},
  {jp:'車',kana:'くるま',romaji:'kuruma',it:'macchina',cat:'trasporti'},
  {jp:'道',kana:'みち',romaji:'michi',it:'strada',cat:'trasporti'},
  {jp:'橋',kana:'はし',romaji:'hashi',it:'ponte',cat:'trasporti'},
  {jp:'運転手',kana:'うんてんしゅ',romaji:'untenshu',it:'autista',cat:'trasporti'},
  {jp:'遅れる',kana:'おくれる',romaji:'okureru',it:'ritardare',cat:'trasporti'},
  {jp:'早い',kana:'はやい',romaji:'hayai',it:'veloce / presto',cat:'trasporti'},

  // emergenza
  {jp:'助けて',kana:'たすけて',romaji:'tasukete',it:'aiuto!',cat:'emergenza'},
  {jp:'危ない',kana:'あぶない',romaji:'abunai',it:'pericoloso / attento',cat:'emergenza'},
  {jp:'病気',kana:'びょうき',romaji:'byouki',it:'malattia',cat:'emergenza'},
  {jp:'痛い',kana:'いたい',romaji:'itai',it:'dolore / fa male',cat:'emergenza'},
  {jp:'熱',kana:'ねつ',romaji:'netsu',it:'febbre',cat:'emergenza'},
  {jp:'薬',kana:'くすり',romaji:'kusuri',it:'medicina',cat:'emergenza'},
  {jp:'警察',kana:'けいさつ',romaji:'keisatsu',it:'polizia',cat:'emergenza'},
  {jp:'救急車',kana:'きゅうきゅうしゃ',romaji:'kyuukyuusha',it:'ambulanza',cat:'emergenza'},
  {jp:'火事',kana:'かじ',romaji:'kaji',it:'incendio',cat:'emergenza'},
  {jp:'地震',kana:'じしん',romaji:'jishin',it:'terremoto',cat:'emergenza'},
  {jp:'アレルギー',kana:'アレルギー',romaji:'arerugii',it:'allergia',cat:'emergenza'},
  {jp:'医者',kana:'いしゃ',romaji:'isha',it:'dottore',cat:'emergenza'},
  {jp:'大丈夫ですか',kana:'だいじょうぶですか',romaji:'daijoubu desu ka',it:'stai bene?',cat:'emergenza'},
  {jp:'気をつけて',kana:'きをつけて',romaji:'ki wo tsukete',it:'stai attento',cat:'emergenza'},

  // verbi (forma dizionario)
  {jp:'食べる',kana:'たべる',romaji:'taberu',it:'mangiare',cat:'verbi'},
  {jp:'飲む',kana:'のむ',romaji:'nomu',it:'bere',cat:'verbi'},
  {jp:'行く',kana:'いく',romaji:'iku',it:'andare',cat:'verbi'},
  {jp:'来る',kana:'くる',romaji:'kuru',it:'venire',cat:'verbi'},
  {jp:'見る',kana:'みる',romaji:'miru',it:'vedere',cat:'verbi'},
  {jp:'聞く',kana:'きく',romaji:'kiku',it:'ascoltare / chiedere',cat:'verbi'},
  {jp:'話す',kana:'はなす',romaji:'hanasu',it:'parlare',cat:'verbi'},
  {jp:'分かる',kana:'わかる',romaji:'wakaru',it:'capire',cat:'verbi'},
  {jp:'買う',kana:'かう',romaji:'kau',it:'comprare',cat:'verbi'},
  {jp:'待つ',kana:'まつ',romaji:'matsu',it:'aspettare',cat:'verbi'},
  {jp:'帰る',kana:'かえる',romaji:'kaeru',it:'tornare',cat:'verbi'},
  {jp:'使う',kana:'つかう',romaji:'tsukau',it:'usare',cat:'verbi'},
  {jp:'座る',kana:'すわる',romaji:'suwaru',it:'sedersi',cat:'verbi'},
  {jp:'立つ',kana:'たつ',romaji:'tatsu',it:'alzarsi / stare in piedi',cat:'verbi'},
  {jp:'寝る',kana:'ねる',romaji:'neru',it:'dormire',cat:'verbi'},
  {jp:'起きる',kana:'おきる',romaji:'okiru',it:'svegliarsi',cat:'verbi'},
  {jp:'歩く',kana:'あるく',romaji:'aruku',it:'camminare',cat:'verbi'},
  {jp:'撮る',kana:'とる',romaji:'toru',it:'fotografare',cat:'verbi'},
  {jp:'探す',kana:'さがす',romaji:'sagasu',it:'cercare',cat:'verbi'},
  {jp:'持つ',kana:'もつ',romaji:'motsu',it:'portare / avere con sé',cat:'verbi'},

  // aggettivi
  {jp:'大きい',kana:'おおきい',romaji:'ookii',it:'grande',cat:'aggettivi'},
  {jp:'小さい',kana:'ちいさい',romaji:'chiisai',it:'piccolo',cat:'aggettivi'},
  {jp:'新しい',kana:'あたらしい',romaji:'atarashii',it:'nuovo',cat:'aggettivi'},
  {jp:'古い',kana:'ふるい',romaji:'furui',it:'vecchio',cat:'aggettivi'},
  {jp:'良い',kana:'いい',romaji:'ii',it:'buono',cat:'aggettivi'},
  {jp:'悪い',kana:'わるい',romaji:'warui',it:'cattivo',cat:'aggettivi'},
  {jp:'高い',kana:'たかい',romaji:'takai',it:'alto / caro',cat:'aggettivi'},
  {jp:'安い',kana:'やすい',romaji:'yasui',it:'economico',cat:'aggettivi'},
  {jp:'綺麗',kana:'きれい',romaji:'kirei',it:'bello / pulito',cat:'aggettivi'},
  {jp:'静か',kana:'しずか',romaji:'shizuka',it:'tranquillo',cat:'aggettivi'},

  // shopping
  {jp:'お金',kana:'おかね',romaji:'okane',it:'soldi',cat:'shopping'},
  {jp:'いくらですか',kana:'いくらですか',romaji:'ikura desu ka',it:'quanto costa?',cat:'shopping'},
  {jp:'高すぎる',kana:'たかすぎる',romaji:'takasugiru',it:'troppo caro',cat:'shopping'},
  {jp:'安くしてください',kana:'やすくしてください',romaji:'yasuku shite kudasai',it:'mi fa uno sconto?',cat:'shopping'},
  {jp:'現金',kana:'げんきん',romaji:'genkin',it:'contanti',cat:'shopping'},
  {jp:'カード',kana:'カード',romaji:'kaado',it:'carta (di pagamento)',cat:'shopping'},
  {jp:'お釣り',kana:'おつり',romaji:'otsuri',it:'resto',cat:'shopping'},
  {jp:'レジ',kana:'レジ',romaji:'reji',it:'cassa',cat:'shopping'},
  {jp:'店',kana:'みせ',romaji:'mise',it:'negozio',cat:'shopping'},
  {jp:'市場',kana:'いちば',romaji:'ichiba',it:'mercato',cat:'shopping'},

  // small talk
  {jp:'名前',kana:'なまえ',romaji:'namae',it:'nome',cat:'smalltalk'},
  {jp:'どこから来ましたか',kana:'どこからきましたか',romaji:'dokokara kimashita ka',it:'da dove vieni?',cat:'smalltalk'},
  {jp:'イタリアから来ました',kana:'イタリアからきました',romaji:'itaria kara kimashita',it:'vengo dall\'Italia',cat:'smalltalk'},
  {jp:'何歳ですか',kana:'なんさいですか',romaji:'nansai desu ka',it:'quanti anni hai?',cat:'smalltalk'},
  {jp:'仕事は何ですか',kana:'しごとはなんですか',romaji:'shigoto wa nan desu ka',it:'che lavoro fai?',cat:'smalltalk'},
  {jp:'分かりません',kana:'わかりません',romaji:'wakarimasen',it:'non capisco',cat:'smalltalk'},
  {jp:'もう一度お願いします',kana:'もういちどおねがいします',romaji:'mou ichido onegaishimasu',it:'può ripetere per favore?',cat:'smalltalk'},
  {jp:'ゆっくり話してください',kana:'ゆっくりはなしてください',romaji:'yukkuri hanashite kudasai',it:'parli più lentamente per favore',cat:'smalltalk'},
  {jp:'英語を話せますか',kana:'えいごをはなせますか',romaji:'eigo wo hanasemasu ka',it:'parla inglese?',cat:'smalltalk'},
  {jp:'日本語が少し話せます',kana:'にほんごがすこしはなせます',romaji:'nihongo ga sukoshi hanasemasu',it:'parlo un po\' di giapponese',cat:'smalltalk'},
  {jp:'写真を撮ってもいいですか',kana:'しゃしんをとってもいいですか',romaji:'shashin wo tottemo ii desu ka',it:'posso fare una foto?',cat:'smalltalk'},
  {jp:'トイレはどこですか',kana:'トイレはどこですか',romaji:'toire wa doko desu ka',it:'dov\'è il bagno?',cat:'smalltalk'},
  {jp:'Wi-Fiはありますか',kana:'ワイファイはありますか',romaji:'waifai wa arimasu ka',it:'c\'è il wifi?',cat:'smalltalk'},
  {jp:'楽しい',kana:'たのしい',romaji:'tanoshii',it:'divertente',cat:'smalltalk'},
  {jp:'大好きです',kana:'だいすきです',romaji:'daisuki desu',it:'mi piace molto',cat:'smalltalk'},
];

// ---------- FRASI (per shadowing / lettura) ----------
var PHRASES = [
  // direzioni
  {jp:'すみません、駅はどこですか。',romaji:'Sumimasen, eki wa doko desu ka.',it:'Scusi, dov\'è la stazione?',cat:'direzioni'},
  {jp:'まっすぐ行ってください。',romaji:'Massugu itte kudasai.',it:'Vada dritto, per favore.',cat:'direzioni'},
  {jp:'右に曲がってください。',romaji:'Migi ni magatte kudasai.',it:'Giri a destra, per favore.',cat:'direzioni'},
  {jp:'左に曲がってください。',romaji:'Hidari ni magatte kudasai.',it:'Giri a sinistra, per favore.',cat:'direzioni'},
  {jp:'どのくらいかかりますか。',romaji:'Dono kurai kakarimasu ka.',it:'Quanto tempo ci vuole?',cat:'direzioni'},
  {jp:'歩いて行けますか。',romaji:'Aruite ikemasu ka.',it:'Posso arrivarci a piedi?',cat:'direzioni'},

  // cibo
  {jp:'おすすめは何ですか。',romaji:'Osusume wa nan desu ka.',it:'Cosa consiglia?',cat:'cibo'},
  {jp:'これをください。',romaji:'Kore wo kudasai.',it:'Questo, per favore.',cat:'cibo'},
  {jp:'お水をください。',romaji:'Omizu wo kudasai.',it:'Acqua, per favore.',cat:'cibo'},
  {jp:'お会計をお願いします。',romaji:'Okaikei wo onegaishimasu.',it:'Il conto, per favore.',cat:'cibo'},
  {jp:'とても美味しかったです。',romaji:'Totemo oishikatta desu.',it:'Era molto buono.',cat:'cibo'},
  {jp:'辛くないものはありますか。',romaji:'Karakunai mono wa arimasu ka.',it:'C\'è qualcosa non piccante?',cat:'cibo'},
  {jp:'アレルギーがあります。',romaji:'Arerugii ga arimasu.',it:'Ho un\'allergia.',cat:'cibo'},
  {jp:'ベジタリアン料理はありますか。',romaji:'Bejitarian ryouri wa arimasu ka.',it:'C\'è un piatto vegetariano?',cat:'cibo'},

  // trasporti
  {jp:'この電車は東京駅に行きますか。',romaji:'Kono densha wa Toukyou eki ni ikimasu ka.',it:'Questo treno va alla stazione di Tokyo?',cat:'trasporti'},
  {jp:'切符はどこで買えますか。',romaji:'Kippu wa doko de kaemasu ka.',it:'Dove posso comprare il biglietto?',cat:'trasporti'},
  {jp:'次の電車は何時ですか。',romaji:'Tsugi no densha wa nanji desu ka.',it:'A che ora è il prossimo treno?',cat:'trasporti'},
  {jp:'タクシーを呼んでもらえますか。',romaji:'Takushii wo yonde moraemasu ka.',it:'Può chiamarmi un taxi?',cat:'trasporti'},
  {jp:'ここで降ります。',romaji:'Koko de orimasu.',it:'Scendo qui.',cat:'trasporti'},

  // emergenza
  {jp:'助けてください。',romaji:'Tasukete kudasai.',it:'Aiuto, per favore.',cat:'emergenza'},
  {jp:'具合が悪いです。',romaji:'Guai ga warui desu.',it:'Non mi sento bene.',cat:'emergenza'},
  {jp:'病院はどこですか。',romaji:'Byouin wa doko desu ka.',it:'Dov\'è l\'ospedale?',cat:'emergenza'},
  {jp:'警察を呼んでください。',romaji:'Keisatsu wo yonde kudasai.',it:'Chiami la polizia, per favore.',cat:'emergenza'},
  {jp:'道に迷いました。',romaji:'Michi ni mayoimashita.',it:'Mi sono perso.',cat:'emergenza'},
  {jp:'パスポートをなくしました。',romaji:'Pasupooto wo nakushimashita.',it:'Ho perso il passaporto.',cat:'emergenza'},

  // small talk
  {jp:'日本語は少ししか話せません。',romaji:'Nihongo wa sukoshi shika hanasemasen.',it:'Parlo solo un po\' di giapponese.',cat:'smalltalk'},
  {jp:'もう一度言ってください。',romaji:'Mou ichido itte kudasai.',it:'Lo ripeta, per favore.',cat:'smalltalk'},
  {jp:'ゆっくりお願いします。',romaji:'Yukkuri onegaishimasu.',it:'Più lentamente, per favore.',cat:'smalltalk'},
  {jp:'これは何ですか。',romaji:'Kore wa nan desu ka.',it:'Cos\'è questo?',cat:'smalltalk'},
  {jp:'写真を撮ってもいいですか。',romaji:'Shashin wo tottemo ii desu ka.',it:'Posso fare una foto?',cat:'smalltalk'},
  {jp:'とても親切ですね、ありがとうございます。',romaji:'Totemo shinsetsu desu ne, arigatou gozaimasu.',it:'È molto gentile, grazie.',cat:'smalltalk'},
  {jp:'お邪魔しました。',romaji:'Ojama shimashita.',it:'Scusi il disturbo (formula di commiato).',cat:'smalltalk'},
  {jp:'お世話になりました。',romaji:'Osewa ni narimashita.',it:'Grazie per l\'aiuto/l\'ospitalità (formula di commiato).',cat:'smalltalk'},

  // alloggio
  {jp:'チェックインをお願いします。',romaji:'Chekku in wo onegaishimasu.',it:'Vorrei fare il check-in.',cat:'alloggio'},
  {jp:'Wi-Fiのパスワードは何ですか。',romaji:'Waifai no pasuwaado wa nan desu ka.',it:'Qual è la password del wifi?',cat:'alloggio'},
  {jp:'タオルをもう一枚もらえますか。',romaji:'Taoru wo mou ichimai moraemasu ka.',it:'Posso avere un altro asciugamano?',cat:'alloggio'},
  {jp:'荷物を預けられますか。',romaji:'Nimotsu wo azukeraremasu ka.',it:'Posso lasciare i bagagli?',cat:'alloggio'},

  // shopping
  {jp:'いくらですか。',romaji:'Ikura desu ka.',it:'Quanto costa?',cat:'shopping'},
  {jp:'カードは使えますか。',romaji:'Kaado wa tsukaemasu ka.',it:'Posso pagare con carta?',cat:'shopping'},
  {jp:'試着してもいいですか。',romaji:'Shichaku shitemo ii desu ka.',it:'Posso provarlo?',cat:'shopping'},
  {jp:'免税できますか。',romaji:'Menzei dekimasu ka.',it:'È possibile il tax-free?',cat:'shopping'},
];

// ---------- PIANO DI STUDIO (mostrato nella tab dedicata) ----------
var STUDY_PLAN = [
  {
    fase: 'Fase 1 — Fondamenta',
    periodo: '17 lug – 30 lug (2 settimane)',
    obiettivi: [
      'Leggere hiragana e katakana a colpo d\'occhio (senza pensarci)',
      'Saluti e cortesia di base',
      'Capire il ritmo/pronuncia giapponese (le "more", non le sillabe italiane)'
    ]
  },
  {
    fase: 'Fase 2 — Corpo centrale',
    periodo: '31 lug – 20 set (8 settimane)',
    obiettivi: [
      '10-15 parole nuove al giorno via SRS (vocabolario ad alta frequenza)',
      'Grammatica base essenziale (particelle は/が/を/に, forma ます)',
      '10 min al giorno di shadowing su audio facili (frasi della tab Frasi)',
      'Ascolto passivo regolare (podcast/NHK Easy Japanese)'
    ]
  },
  {
    fase: 'Fase 3 — Sopravvivenza rurale',
    periodo: '21 set – 18 ott (4 settimane)',
    obiettivi: [
      'Frasi pratiche per situazioni reali: indicazioni, trasporti, cibo, emergenze',
      'Small talk con locali dove l\'inglese non arriva',
      'Più ascolto a velocità naturale, più speaking attivo (shadowing a voce alta)'
    ]
  },
  {
    fase: 'Fase 4 — Consolidamento',
    periodo: '19 ott – 2 nov (2 settimane)',
    obiettivi: [
      'Ripasso spaziato di tutto il materiale (le carte SRS più deboli)',
      'Conversazioni simulate (ripeti a voce alta le frasi come se parlassi con qualcuno)',
      'Phrasebook finale sempre pronto sul telefono'
    ]
  },
];
