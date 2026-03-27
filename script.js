import * as THREE from "./assets/vendor/three.module.js";

const poets = [
  {
    name: "王勃",
    birthYear: 650,
    deathYear: 676,
    title: "初唐四杰之一，文气明丽而昂扬",
    bio: "王勃少年成名，辞章华美却不空泛，常在短促的人生里写出盛唐将至的高阔气象。",
    life: ["十四岁已有文名。", "因文章获誉，也因文字获罪。", "南下途中遇海难，英年早逝。"],
    works: ["《送杜少府之任蜀州》", "《滕王阁序》", "《滕王阁诗》"]
  },
  {
    name: "陈子昂",
    birthYear: 661,
    deathYear: 702,
    title: "高倡风骨，扭转浮艳旧习",
    bio: "陈子昂强调恢复汉魏风骨，让诗重新回到更深沉、更辽阔的精神气象之中。",
    life: ["以《感遇》确立诗名。", "多次上书论政，气格峻直。", "其诗风对盛唐影响极深。"],
    works: ["《登幽州台歌》", "《感遇》", "《蓟丘览古赠卢居士藏用》"]
  },
  {
    name: "孟浩然",
    birthYear: 689,
    deathYear: 740,
    title: "山水田园中的清旷与静意",
    bio: "孟浩然的诗像晨雾和山风，写日常、写闲居，也写士人心中安静而不甘的微妙波澜。",
    life: ["长期居于襄阳附近。", "赴长安求仕，终未显达。", "与王维并称山水田园诗代表。"],
    works: ["《春晓》", "《宿建德江》", "《过故人庄》"]
  },
  {
    name: "王维",
    birthYear: 701,
    deathYear: 761,
    title: "诗中有画，空明沉静",
    bio: "王维兼通诗、画、乐，擅长在极静的山水里写出澄明、禅意与温柔的距离感。",
    life: ["早年登第，仕途顺达。", "安史之乱中人生遭逢转折。", "晚年山居心境更趋淡远。"],
    works: ["《山居秋暝》", "《终南别业》", "《使至塞上》"]
  },
  {
    name: "李白",
    birthYear: 701,
    deathYear: 762,
    title: "想象瑰丽，气势纵横",
    bio: "李白把个人精神写到极高处，山川、酒意、月色和自由，在他的诗里都带着飞扬的光。",
    life: ["青年时广泛游历。", "曾入长安供奉翰林。", "晚年飘泊，仍留下大量名篇。"],
    works: ["《将进酒》", "《蜀道难》", "《早发白帝城》"]
  },
  {
    name: "高适",
    birthYear: 704,
    deathYear: 765,
    title: "边塞悲壮，也见世路风尘",
    bio: "高适的边塞诗并不只写豪情，也写不遇、离别和现实中的沉重分量。",
    life: ["早年长期漫游求仕。", "后逐渐得官，曾任节度使。", "与岑参并称边塞诗名家。"],
    works: ["《别董大》", "《燕歌行》", "《塞上听吹笛》"]
  },
  {
    name: "杜甫",
    birthYear: 712,
    deathYear: 770,
    title: "沉郁深厚，写尽时代与苍生",
    bio: "杜甫经历盛唐转衰的剧变，他让诗既有高处的理想，也有现实生活最沉重的回声。",
    life: ["青年时期多游历。", "安史之乱中长期流离。", "晚年漂泊江湖，病卒舟中。"],
    works: ["《春望》", "《茅屋为秋风所破歌》", "《登高》"]
  },
  {
    name: "岑参",
    birthYear: 715,
    deathYear: 770,
    title: "边地奇景与豪情并举",
    bio: "岑参以奇寒、大雪、风沙和军旅生活入诗，让边塞世界显得壮阔又锋利。",
    life: ["两度赴西北军幕。", "作品色彩浓烈，节奏明快。", "晚年仕途起伏，入蜀而终。"],
    works: ["《白雪歌送武判官归京》", "《走马川行奉送封大夫出师西征》", "《逢入京使》"]
  },
  {
    name: "韩愈",
    birthYear: 768,
    deathYear: 824,
    title: "气骨峻拔，诗文皆有锋芒",
    bio: "韩愈的文字有一种向前冲撞的力量，既能写理想，也能写受挫、谪居和中唐士人的内在焦灼。",
    life: ["多次上疏论政。", "屡遭贬谪，又屡被起用。", "古文运动的关键人物之一。"],
    works: ["《左迁至蓝关示侄孙湘》", "《早春呈水部张十八员外》", "《山石》"]
  },
  {
    name: "白居易",
    birthYear: 772,
    deathYear: 846,
    title: "写世情，也写人心",
    bio: "白居易重视诗的可读与可感，他能把社会关怀和个人深情都写得明白、动人、余味悠长。",
    life: ["早年积极提倡新乐府。", "因言事被贬江州。", "晚年居洛阳，诗名大盛。"],
    works: ["《琵琶行》", "《长恨歌》", "《赋得古原草送别》"]
  },
  {
    name: "柳宗元",
    birthYear: 773,
    deathYear: 819,
    title: "清峭冷峻，自成高境",
    bio: "柳宗元在贬谪中形成了独特的文字气质，山水在他笔下极静，却有一种深而坚硬的力量。",
    life: ["参与永贞革新。", "失败后长期贬居永州。", "后任柳州刺史，卒于任上。"],
    works: ["《江雪》", "《渔翁》", "《溪居》"]
  }
];

const sortedPoets = poets.slice().sort((a, b) => a.birthYear - b.birthYear);
const timeline = document.getElementById("timeline");
const experienceFrame = document.getElementById("experienceFrame");
const experienceScene = document.getElementById("experienceScene");
const riverCanvas = document.getElementById("riverParticles");
const detailPanel = document.getElementById("detailPanel");
const closeDetail = document.getElementById("closeDetail");
const coverScreen = document.getElementById("coverScreen");

const detailName = document.getElementById("detailName");
const detailYears = document.getElementById("detailYears");
const detailTitle = document.getElementById("detailTitle");
const detailBio = document.getElementById("detailBio");
const detailLife = document.getElementById("detailLife");
const detailWorks = document.getElementById("detailWorks");
const poemPanel = document.getElementById("poemPanel");
const closePoem = document.getElementById("closePoem");
const poemTitle = document.getElementById("poemTitle");
const poemColumns = document.getElementById("poemColumns");

const poemLibrary = {
  "《送杜少府之任蜀州》": "城阙辅三秦，风烟望五津。\n与君离别意，同是宦游人。\n海内存知己，天涯若比邻。\n无为在歧路，儿女共沾巾。",
  "《滕王阁序》": "豫章故郡，洪都新府。\n星分翼轸，地接衡庐。\n襟三江而带五湖，控蛮荆而引瓯越。\n物华天宝，龙光射牛斗之墟；\n人杰地灵，徐孺下陈蕃之榻。\n雄州雾列，俊采星驰。\n台隍枕夷夏之交，宾主尽东南之美。\n都督阎公之雅望，棨戟遥临；\n宇文新州之懿范，襜帷暂驻。\n十旬休假，胜友如云；\n千里逢迎，高朋满座。\n腾蛟起凤，孟学士之词宗；\n紫电青霜，王将军之武库。\n家君作宰，路出名区；\n童子何知，躬逢胜饯。\n时维九月，序属三秋。\n潦水尽而寒潭清，烟光凝而暮山紫。\n俨骖騑于上路，访风景于崇阿。\n临帝子之长洲，得天人之旧馆。\n层峦耸翠，上出重霄；\n飞阁流丹，下临无地。\n鹤汀凫渚，穷岛屿之萦回；\n桂殿兰宫，即冈峦之体势。\n披绣闼，俯雕甍。\n山原旷其盈视，川泽纡其骇瞩。\n闾阎扑地，钟鸣鼎食之家；\n舸舰弥津，青雀黄龙之舳。\n云销雨霁，彩彻区明。\n落霞与孤鹜齐飞，秋水共长天一色。\n渔舟唱晚，响穷彭蠡之滨；\n雁阵惊寒，声断衡阳之浦。\n遥襟甫畅，逸兴遄飞。\n爽籁发而清风生，纤歌凝而白云遏。\n睢园绿竹，气凌彭泽之樽；\n邺水朱华，光照临川之笔。\n四美具，二难并。\n穷睇眄于中天，极娱游于暇日。\n天高地迥，觉宇宙之无穷；\n兴尽悲来，识盈虚之有数。\n望长安于日下，目吴会于云间。\n地势极而南溟深，天柱高而北辰远。\n关山难越，谁悲失路之人；\n萍水相逢，尽是他乡之客。\n怀帝阍而不见，奉宣室以何年？\n嗟乎！时运不齐，命途多舛。\n冯唐易老，李广难封。\n屈贾谊于长沙，非无圣主；\n窜梁鸿于海曲，岂乏明时？\n所赖君子见机，达人知命。\n老当益壮，宁移白首之心；\n穷且益坚，不坠青云之志。\n酌贪泉而觉爽，处涸辙以犹欢。\n北海虽赊，扶摇可接；\n东隅已逝，桑榆非晚。\n孟尝高洁，空余报国之情；\n阮籍猖狂，岂效穷途之哭！\n勃，三尺微命，一介书生。\n无路请缨，等终军之弱冠；\n有怀投笔，慕宗悫之长风。\n舍簪笏于百龄，奉晨昏于万里。\n非谢家之宝树，接孟氏之芳邻。\n他日趋庭，叨陪鲤对；\n今兹捧袂，喜托龙门。\n杨意不逢，抚凌云而自惜；\n钟期既遇，奏流水以何惭？\n呜乎！胜地不常，盛筵难再；\n兰亭已矣，梓泽丘墟。\n临别赠言，幸承恩于伟饯；\n登高作赋，是所望于群公。\n敢竭鄙怀，恭疏短引；\n一言均赋，四韵俱成。\n请洒潘江，各倾陆海云尔。",
  "《山中》": "长江悲已滞，万里念将归。\n况属高风晚，山山黄叶飞。",
  "《滕王阁诗》": "滕王高阁临江渚，佩玉鸣鸾罢歌舞。\n画栋朝飞南浦云，珠帘暮卷西山雨。\n闲云潭影日悠悠，物换星移几度秋。\n阁中帝子今何在？槛外长江空自流。",
  "《登幽州台歌》": "前不见古人，后不见来者。\n念天地之悠悠，独怆然而涕下。",
  "《感遇》": "兰若生春夏，芊蔚何青青。\n幽独空林色，朱蕤冒紫茎。\n迟迟白日晚，嫋嫋秋风生。\n岁华尽摇落，芳意竟何成。",
  "《蓟丘览古赠卢居士藏用》": "丁亥岁云暮，西山事甲兵。\n赢粮匝邛道，荷戟争羌城。\n严冬岂不苦，马瘦衣裳单。\n深谷时一啸，惊沙自相向。",
  "《春夜别友人》": "银烛吐青烟，金樽对绮筵。\n离堂思琴瑟，别路绕山川。\n明月悬高树，长河没晓天。\n悠悠洛阳道，此会在何年。",
  "《春晓》": "春眠不觉晓，处处闻啼鸟。\n夜来风雨声，花落知多少。",
  "《宿建德江》": "移舟泊烟渚，日暮客愁新。\n野旷天低树，江清月近人。",
  "《过故人庄》": "故人具鸡黍，邀我至田家。\n绿树村边合，青山郭外斜。\n开轩面场圃，把酒话桑麻。\n待到重阳日，还来就菊花。",
  "《山居秋暝》": "空山新雨后，天气晚来秋。\n明月松间照，清泉石上流。\n竹喧归浣女，莲动下渔舟。\n随意春芳歇，王孙自可留。",
  "《终南别业》": "中岁颇好道，晚家南山陲。\n兴来每独往，胜事空自知。\n行到水穷处，坐看云起时。\n偶然值林叟，谈笑无还期。",
  "《使至塞上》": "单车欲问边，属国过居延。\n征蓬出汉塞，归雁入胡天。\n大漠孤烟直，长河落日圆。\n萧关逢候骑，都护在燕然。",
  "《将进酒》": "君不见黄河之水天上来，奔流到海不复回。\n君不见高堂明镜悲白发，朝如青丝暮成雪。\n人生得意须尽欢，莫使金樽空对月。\n天生我材必有用，千金散尽还复来。\n烹羊宰牛且为乐，会须一饮三百杯。\n岑夫子，丹丘生，将进酒，杯莫停。\n与君歌一曲，请君为我倾耳听。\n钟鼓馔玉不足贵，但愿长醉不愿醒。\n古来圣贤皆寂寞，惟有饮者留其名。\n陈王昔时宴平乐，斗酒十千恣欢谑。\n主人何为言少钱，径须沽取对君酌。\n五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。",
  "《蜀道难》": "噫吁嚱，危乎高哉！\n蜀道之难，难于上青天！\n蚕丛及鱼凫，开国何茫然！\n尔来四万八千岁，不与秦塞通人烟。\n西当太白有鸟道，可以横绝峨眉巅。\n地崩山摧壮士死，然后天梯石栈相钩连。\n上有六龙回日之高标，下有冲波逆折之回川。\n黄鹤之飞尚不得过，猿猱欲度愁攀援。\n青泥何盘盘，百步九折萦岩峦。\n扪参历井仰胁息，以手抚膺坐长叹。\n问君西游何时还？畏途巉岩不可攀。\n但见悲鸟号古木，雄飞雌从绕林间。\n又闻子规啼夜月，愁空山。\n蜀道之难，难于上青天，使人听此凋朱颜！\n连峰去天不盈尺，枯松倒挂倚绝壁。\n飞湍瀑流争喧豗，砯崖转石万壑雷。\n其险也如此，嗟尔远道之人胡为乎来哉！\n剑阁峥嵘而崔嵬，一夫当关，万夫莫开。\n所守或匪亲，化为狼与豺。\n朝避猛虎，夕避长蛇；\n磨牙吮血，杀人如麻。\n锦城虽云乐，不如早还家。\n蜀道之难，难于上青天，侧身西望长咨嗟！",
  "《早发白帝城》": "朝辞白帝彩云间，千里江陵一日还。\n两岸猿声啼不住，轻舟已过万重山。",
  "《月下独酌》": "花间一壶酒，独酌无相亲。\n举杯邀明月，对影成三人。\n月既不解饮，影徒随我身。\n暂伴月将影，行乐须及春。\n我歌月徘徊，我舞影零乱。\n醒时同交欢，醉后各分散。\n永结无情游，相期邈云汉。",
  "《别董大》": "千里黄云白日曛，北风吹雁雪纷纷。\n莫愁前路无知己，天下谁人不识君。",
  "《燕歌行》": "汉家烟尘在东北，汉将辞家破残贼。\n男儿本自重横行，天子非常赐颜色。\n摐金伐鼓下榆关，旌旆逶迤碣石间。\n校尉羽书飞瀚海，单于猎火照狼山。\n山川萧条极边土，胡骑凭陵杂风雨。\n战士军前半死生，美人帐下犹歌舞。\n大漠穷秋塞草腓，孤城落日斗兵稀。\n身当恩遇常轻敌，力尽关山未解围。\n铁衣远戍辛勤久，玉箸应啼别离后。\n少妇城南欲断肠，征人蓟北空回首。\n边庭飘飖那可度，绝域苍茫更何有。\n杀气三时作阵云，寒声一夜传刁斗。\n相看白刃血纷纷，死节从来岂顾勋。\n君不见沙场征战苦，至今犹忆李将军！",
  "《塞上听吹笛》": "雪净胡天牧马还，月明羌笛戍楼间。\n借问梅花何处落，风吹一夜满关山。",
  "《春望》": "国破山河在，城春草木深。\n感时花溅泪，恨别鸟惊心。\n烽火连三月，家书抵万金。\n白头搔更短，浑欲不胜簪。",
  "《登高》": "风急天高猿啸哀，渚清沙白鸟飞回。\n无边落木萧萧下，不尽长江滚滚来。\n万里悲秋常作客，百年多病独登台。\n艰难苦恨繁霜鬓，潦倒新停浊酒杯。",
  "《茅屋为秋风所破歌》": "八月秋高风怒号，卷我屋上三重茅。\n茅飞渡江洒江郊，高者挂罥长林梢，下者飘转沉塘坳。\n南村群童欺我老无力，忍能对面为盗贼。\n公然抱茅入竹去，唇焦口燥呼不得，归来倚杖自叹息。\n俄顷风定云墨色，秋天漠漠向昏黑。\n布衾多年冷似铁，娇儿恶卧踏里裂。\n床头屋漏无干处，雨脚如麻未断绝。\n自经丧乱少睡眠，长夜沾湿何由彻！\n安得广厦千万间，大庇天下寒士俱欢颜，风雨不动安如山！\n呜呼！何时眼前突兀见此屋，吾庐独破受冻死亦足！",
  "《白雪歌送武判官归京》": "北风卷地白草折，胡天八月即飞雪。\n忽如一夜春风来，千树万树梨花开。\n散入珠帘湿罗幕，狐裘不暖锦衾薄。\n将军角弓不得控，都护铁衣冷难着。\n瀚海阑干百丈冰，愁云惨淡万里凝。\n中军置酒饮归客，胡琴琵琶与羌笛。\n纷纷暮雪下辕门，风掣红旗冻不翻。\n轮台东门送君去，去时雪满天山路。\n山回路转不见君，雪上空留马行处。",
  "《走马川行奉送封大夫出师西征》": "君不见走马川行雪海边，平沙莽莽黄入天。\n轮台九月风夜吼，一川碎石大如斗，随风满地石乱走。\n匈奴草黄马正肥，金山西见烟尘飞，汉家大将西出师。\n将军金甲夜不脱，半夜军行戈相拨，风头如刀面如割。\n马毛带雪汗气蒸，五花连钱旋作冰，幕中草檄砚水凝。\n虏骑闻之应胆慑，料知短兵不敢接，车师西门伫献捷。",
  "《逢入京使》": "故园东望路漫漫，双袖龙钟泪不干。\n马上相逢无纸笔，凭君传语报平安。",
  "《左迁至蓝关示侄孙湘》": "一封朝奏九重天，夕贬潮州路八千。\n欲为圣明除弊事，肯将衰朽惜残年。\n云横秦岭家何在？雪拥蓝关马不前。\n知汝远来应有意，好收吾骨瘴江边。",
  "《早春呈水部张十八员外》": "天街小雨润如酥，草色遥看近却无。\n最是一年春好处，绝胜烟柳满皇都。",
  "《山石》": "山石荦确行径微，黄昏到寺蝙蝠飞。\n升堂坐阶新雨足，芭蕉叶大栀子肥。\n僧言古壁佛画好，以火来照所见稀。\n铺床拂席置羹饭，疏粝亦足饱我饥。\n夜深静卧百虫绝，清月出岭光入扉。\n天明独去无道路，出入高下穷烟霏。\n山红涧碧纷烂漫，时见松枥皆十围。\n当流赤足踏涧石，水声激激风吹衣。\n人生如此自可乐，岂必局束为人鞿。\n嗟哉吾党二三子，安得至老不更归。",
  "《琵琶行》": "浔阳江头夜送客，枫叶荻花秋瑟瑟。\n主人下马客在船，举酒欲饮无管弦。\n醉不成欢惨将别，别时茫茫江浸月。\n忽闻水上琵琶声，主人忘归客不发。\n寻声暗问弹者谁？琵琶声停欲语迟。\n移船相近邀相见，添酒回灯重开宴。\n千呼万唤始出来，犹抱琵琶半遮面。\n转轴拨弦三两声，未成曲调先有情。\n弦弦掩抑声声思，似诉平生不得志。\n低眉信手续续弹，说尽心中无限事。\n轻拢慢捻抹复挑，初为《霓裳》后《六幺》。\n大弦嘈嘈如急雨，小弦切切如私语。\n嘈嘈切切错杂弹，大珠小珠落玉盘。\n间关莺语花底滑，幽咽泉流冰下难。\n冰泉冷涩弦凝绝，凝绝不通声暂歇。\n别有幽愁暗恨生，此时无声胜有声。\n银瓶乍破水浆迸，铁骑突出刀枪鸣。\n曲终收拨当心画，四弦一声如裂帛。\n东船西舫悄无言，唯见江心秋月白。\n沉吟放拨插弦中，整顿衣裳起敛容。\n自言本是京城女，家在虾蟆陵下住。\n十三学得琵琶成，名属教坊第一部。\n曲罢曾教善才服，妆成每被秋娘妒。\n五陵年少争缠头，一曲红绡不知数。\n钿头银篦击节碎，血色罗裙翻酒污。\n今年欢笑复明年，秋月春风等闲度。\n弟走从军阿姨死，暮去朝来颜色故。\n门前冷落鞍马稀，老大嫁作商人妇。\n商人重利轻别离，前月浮梁买茶去。\n去来江口守空船，绕船月明江水寒。\n夜深忽梦少年事，梦啼妆泪红阑干。\n我闻琵琶已叹息，又闻此语重唧唧。\n同是天涯沦落人，相逢何必曾相识！\n我从去年辞帝京，谪居卧病浔阳城。\n浔阳地僻无音乐，终岁不闻丝竹声。\n住近湓江地低湿，黄芦苦竹绕宅生。\n其间旦暮闻何物？杜鹃啼血猿哀鸣。\n春江花朝秋月夜，往往取酒还独倾。\n岂无山歌与村笛？呕哑嘲哳难为听。\n今夜闻君琵琶语，如听仙乐耳暂明。\n莫辞更坐弹一曲，为君翻作《琵琶行》。\n感我此言良久立，却坐促弦弦转急。\n凄凄不似向前声，满座重闻皆掩泣。\n座中泣下谁最多？江州司马青衫湿。",
  "《长恨歌》": "汉皇重色思倾国，御宇多年求不得。\n杨家有女初长成，养在深闺人未识。\n天生丽质难自弃，一朝选在君王侧。\n回眸一笑百媚生，六宫粉黛无颜色。\n春寒赐浴华清池，温泉水滑洗凝脂。\n侍儿扶起娇无力，始是新承恩泽时。\n云鬓花颜金步摇，芙蓉帐暖度春宵。\n春宵苦短日高起，从此君王不早朝。\n承欢侍宴无闲暇，春从春游夜专夜。\n后宫佳丽三千人，三千宠爱在一身。\n金屋妆成娇侍夜，玉楼宴罢醉和春。\n姊妹弟兄皆列土，可怜光彩生门户。\n遂令天下父母心，不重生男重生女。\n骊宫高处入青云，仙乐风飘处处闻。\n缓歌慢舞凝丝竹，尽日君王看不足。\n渔阳鼙鼓动地来，惊破霓裳羽衣曲。\n九重城阙烟尘生，千乘万骑西南行。\n翠华摇摇行复止，西出都门百余里。\n六军不发无奈何，宛转蛾眉马前死。\n花钿委地无人收，翠翘金雀玉搔头。\n君王掩面救不得，回看血泪相和流。\n黄埃散漫风萧索，云栈萦纡登剑阁。\n峨嵋山下少人行，旌旗无光日色薄。\n蜀江水碧蜀山青，圣主朝朝暮暮情。\n行宫见月伤心色，夜雨闻铃肠断声。\n天旋日转回龙驭，到此踌躇不能去。\n马嵬坡下泥土中，不见玉颜空死处。\n君臣相顾尽沾衣，东望都门信马归。\n归来池苑皆依旧，太液芙蓉未央柳。\n芙蓉如面柳如眉，对此如何不泪垂。\n春风桃李花开夜，秋雨梧桐叶落时。\n西宫南内多秋草，落叶满阶红不扫。\n梨园弟子白发新，椒房阿监青娥老。\n夕殿萤飞思悄然，孤灯挑尽未成眠。\n迟迟钟鼓初长夜，耿耿星河欲曙天。\n鸳鸯瓦冷霜华重，翡翠衾寒谁与共。\n悠悠生死别经年，魂魄不曾来入梦。\n临邛道士鸿都客，能以精诚致魂魄。\n为感君王辗转思，遂教方士殷勤觅。\n排空驭气奔如电，升天入地求之遍。\n上穷碧落下黄泉，两处茫茫皆不见。\n忽闻海上有仙山，山在虚无缥缈间。\n楼阁玲珑五云起，其中绰约多仙子。\n中有一人字太真，雪肤花貌参差是。\n金阙西厢叩玉扃，转教小玉报双成。\n闻道汉家天子使，九华帐里梦魂惊。\n揽衣推枕起徘徊，珠箔银屏迤逦开。\n云鬓半偏新睡觉，花冠不整下堂来。\n风吹仙袂飘飘举，犹似霓裳羽衣舞。\n玉容寂寞泪阑干，梨花一枝春带雨。\n含情凝睇谢君王，一别音容两渺茫。\n昭阳殿里恩爱绝，蓬莱宫中日月长。\n回头下望人寰处，不见长安见尘雾。\n唯将旧物表深情，钿合金钗寄将去。\n钗留一股合一扇，钗擘黄金合分钿。\n但教心似金钿坚，天上人间会相见。\n临别殷勤重寄词，词中有誓两心知。\n七月七日长生殿，夜半无人私语时。\n在天愿作比翼鸟，在地愿为连理枝。\n天长地久有时尽，此恨绵绵无绝期。",
  "《赋得古原草送别》": "离离原上草，一岁一枯荣。\n野火烧不尽，春风吹又生。\n远芳侵古道，晴翠接荒城。\n又送王孙去，萋萋满别情。",
  "《江雪》": "千山鸟飞绝，万径人踪灭。\n孤舟蓑笠翁，独钓寒江雪。",
  "《渔翁》": "渔翁夜傍西岩宿，晓汲清湘燃楚竹。\n烟销日出不见人，欸乃一声山水绿。\n回看天际下中流，岩上无心云相逐。",
  "《溪居》": "久为簪组累，幸此南夷谪。\n闲依农圃邻，偶似山林客。\n晓耕翻露草，夜榜响溪石。\n来往不逢人，长歌楚天碧。"
};

const state = {
  currentId: null,
  dispersed: false
};

const positions = [];
let suppressPanelCloseUntil = 0;
let poemAutoScrollFrame = 0;
let poemAutoScrollTarget = 0;
let poemUserDragging = false;
let poemManualOverride = false;

function isPanelInteractionTarget(target) {
  return Boolean(target && target.closest && target.closest(".poet-node, .detail-panel, .poem-panel"));
}

function riverPoint(t) {
  const x = -0.92 + 1.84 * t + Math.sin(t * Math.PI * 1.7) * 0.025;
      const y = 0.72 - 1.45 * t + Math.sin(t * Math.PI * 2.6 + 0.8) * 0.16;
  return { x, y };
}

class RiverSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    this.camera.position.z = 2;
    this.camera.zoom = 1;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.startTime = performance.now();
    this.count = 2200;
    this.currentPositions = new Float32Array(this.count * 3);
    this.riverPositions = new Float32Array(this.count * 3);
    this.scatterPositions = new Float32Array(this.count * 3);
    this.sizes = new Float32Array(this.count);
    this.alphas = new Float32Array(this.count);
    this.depths = new Float32Array(this.count);
    this.flowBias = new Float32Array(this.count);
    this.pointer = { x: 0, y: 0, active: 0 };
    this.targetRotation = { x: 0.18, y: -0.2 };
    this.currentRotation = { x: 0.18, y: -0.2 };
    this.targetZoom = 1;
    this.isDragging = false;
    this.dragState = { x: 0, y: 0 };

    this.build();
    this.resize();
    this.setupInteraction();
  }

  build() {
    for (let index = 0; index < this.count; index += 1) {
      const t = index / (this.count - 1);
      const point = riverPoint(t);
      const channel = Math.random();
      const coreWeight = Math.pow(Math.random(), 2.8);
      const edgeWeight = 1 - coreWeight;
      const width = 0.016 + edgeWeight * (0.028 + Math.sin(t * Math.PI) * 0.018);
      const angle = Math.sin(t * Math.PI * 6.4 + index * 0.02);
      const radius = (Math.random() - 0.5) * width * (channel < 0.7 ? 0.7 : 1.65);

      const x = point.x + Math.cos(angle) * radius * 4.4;
      const y = point.y + Math.sin(angle) * radius * 2.2;

      this.riverPositions[index * 3] = x;
      this.riverPositions[index * 3 + 1] = y;
      this.riverPositions[index * 3 + 2] = 0;

      this.scatterPositions[index * 3] = (Math.random() * 2 - 1) * 1.2;
      this.scatterPositions[index * 3 + 1] = (Math.random() * 2 - 1) * 1.2;
      this.scatterPositions[index * 3 + 2] = (Math.random() - 0.5) * 0.2;

      this.currentPositions[index * 3] = x;
      this.currentPositions[index * 3 + 1] = y;
      this.currentPositions[index * 3 + 2] = 0;

      this.depths[index] = channel < 0.7 ? 1 : 0;
      this.flowBias[index] = 0.55 + Math.random() * 0.9;
      this.sizes[index] = channel < 0.7 ? 8 + Math.random() * 11 : 3 + Math.random() * 6;
      this.alphas[index] = channel < 0.7 ? 0.4 + Math.random() * 0.24 : 0.06 + Math.random() * 0.16;
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.currentPositions, 3));
    this.geometry.setAttribute("aSize", new THREE.BufferAttribute(this.sizes, 1));
    this.geometry.setAttribute("aAlpha", new THREE.BufferAttribute(this.alphas, 1));
    this.geometry.setAttribute("aDepth", new THREE.BufferAttribute(this.depths, 1));
    this.geometry.setAttribute("aFlowBias", new THREE.BufferAttribute(this.flowBias, 1));

    this.material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uTime: { value: 0 },
        uDisperse: { value: 0 }
      },
      vertexShader: `
        attribute float aSize;
        attribute float aAlpha;
        attribute float aDepth;
        attribute float aFlowBias;
        varying float vAlpha;
        varying float vDepth;
        uniform float uPixelRatio;
        uniform float uTime;
        uniform float uDisperse;

        void main() {
          vec3 pos = position;
          float stream = sin(uTime * (0.7 + aFlowBias * 0.12) + pos.x * 8.0 + pos.y * 10.0) * 0.01 * (1.0 - uDisperse);
          float ripple = cos(uTime * (0.95 + aFlowBias * 0.08) + pos.x * 11.0) * 0.007 * (1.0 - uDisperse);
          pos.x += stream;
          pos.y += ripple * mix(1.6, 0.6, aDepth);

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = aSize * uPixelRatio * (0.8 + (1.0 - uDisperse) * mix(0.72, 0.36, aDepth));
          vAlpha = aAlpha;
          vDepth = aDepth;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        varying float vDepth;

        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float glow = smoothstep(0.55, 0.0, distanceToCenter);
          float core = smoothstep(0.22, 0.0, distanceToCenter);
          vec3 edgeColor = vec3(0.74, 0.52, 0.21);
          vec3 coreColor = vec3(0.99, 0.9, 0.66);
          vec3 color = mix(edgeColor, coreColor, core + vDepth * 0.55);
          float alpha = glow * vAlpha * mix(0.55, 0.9, vDepth);
          gl_FragColor = vec4(color, alpha);
        }
      `
    });

    this.rig = new THREE.Group();
    this.points = new THREE.Points(this.geometry, this.material);
    this.rig.add(this.points);
    this.scene.add(this.rig);
  }

  disperse() {
    for (let index = 0; index < this.count; index += 1) {
      const sideWind = 0.35 + Math.random() * 0.95;
      this.scatterPositions[index * 3] = -1.25 + Math.random() * 2.6 + sideWind * 0.25;
      this.scatterPositions[index * 3 + 1] = 1.15 - Math.random() * 2.2 + sideWind * -0.08;
      this.scatterPositions[index * 3 + 2] = (Math.random() - 0.5) * 0.2;
    }
  }

  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    this.camera.updateProjectionMatrix();
  }

  setPointer(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
    this.pointer.active = 1;
  }

  clearPointer() {
    this.pointer.active = 0;
  }

  setupInteraction() {
    this.canvas.addEventListener("pointerdown", (event) => {
      this.isDragging = true;
      this.dragState.x = event.clientX;
      this.dragState.y = event.clientY;
      this.canvas.setPointerCapture?.(event.pointerId);
      this.clearPointer();
    });

    this.canvas.addEventListener("pointermove", (event) => {
      if (!this.isDragging) {
        return;
      }

      const deltaX = event.clientX - this.dragState.x;
      const deltaY = event.clientY - this.dragState.y;
      this.dragState.x = event.clientX;
      this.dragState.y = event.clientY;
      this.targetRotation.y += deltaX * 0.0034;
      this.targetRotation.x = THREE.MathUtils.clamp(
        this.targetRotation.x + deltaY * 0.0026,
        -0.6,
        0.6
      );
    });

    const endDrag = (event) => {
      this.isDragging = false;
      if (event?.pointerId !== undefined) {
        this.canvas.releasePointerCapture?.(event.pointerId);
      }
    };

    this.canvas.addEventListener("pointerup", endDrag);
    this.canvas.addEventListener("pointercancel", endDrag);
    this.canvas.addEventListener("pointerleave", () => {
      if (!this.isDragging) {
        this.clearPointer();
      }
    });

    this.canvas.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        const nextZoom = this.targetZoom + event.deltaY * -0.0012;
        this.targetZoom = THREE.MathUtils.clamp(nextZoom, 0.82, 1.52);
      },
      { passive: false }
    );
  }

  update(disperse) {
    const elapsed = (performance.now() - this.startTime) / 1000;
    this.material.uniforms.uTime.value = elapsed;
    this.material.uniforms.uDisperse.value += ((disperse ? 1 : 0) - this.material.uniforms.uDisperse.value) * 0.045;

    const target = disperse ? this.scatterPositions : this.riverPositions;
    const positionAttr = this.geometry.getAttribute("position");

    for (let index = 0; index < this.count; index += 1) {
      const base = index * 3;
      const gatherPull = disperse ? 0.026 : 0.045 + this.depths[index] * 0.022;
      const windX = disperse ? (0.0036 + this.flowBias[index] * 0.0006) : 0;
      const windY = disperse ? Math.cos(elapsed * (0.74 + this.flowBias[index] * 0.12) + index * 0.013) * 0.0014 : 0;
      let pointerX = 0;
      let pointerY = 0;

      if (!disperse && this.pointer.active > 0) {
        const dx = this.currentPositions[base] - this.pointer.x;
        const dy = this.currentPositions[base + 1] - this.pointer.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const influence = Math.max(0, 1 - distance / 0.28);
        const swirl = influence * influence * 0.016;
        pointerX = (-dy / distance) * swirl;
        pointerY = (dx / distance) * swirl * 0.7;
      }

      this.currentPositions[base] += (target[base] - this.currentPositions[base]) * gatherPull + windX + pointerX;
      this.currentPositions[base + 1] += (target[base + 1] - this.currentPositions[base + 1]) * gatherPull + windY + pointerY;
      this.currentPositions[base + 2] += (target[base + 2] - this.currentPositions[base + 2]) * gatherPull;
    }

    positionAttr.needsUpdate = true;
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.08;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.08;
    this.rig.rotation.x = this.currentRotation.x;
    this.rig.rotation.y = this.currentRotation.y;
    this.camera.zoom += (this.targetZoom - this.camera.zoom) * 0.12;
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  }
}

const riverSystem = new RiverSystem(riverCanvas);

function revealExperience() {
  document.body.classList.add("is-ready");
  requestAnimationFrame(() => {
    window.setTimeout(() => {
      coverScreen.classList.add("is-hidden");
    }, 380);
  });
}

function renderPoem(poetName, workTitle) {
  const poemText = poemLibrary[workTitle];
  const plainTitle = workTitle.replace(/[《》]/g, "");
  if (!poemText) {
    poemPanel.classList.add("hidden");
    poemColumns.innerHTML = "";
    poemTitle.textContent = "";
    poemPanel.style.removeProperty("--poem-panel-width");
    return;
  }

  poemTitle.textContent = `${plainTitle} ${poetName}`;
  poemColumns.innerHTML = "";
  poemPanel.classList.remove("hidden");

  const lines = poemText.split("\n");
  const titleReserve = window.innerWidth <= 640 ? 92 : 128;
  const sidePadding = window.innerWidth <= 640 ? 52 : 112;
  const columnGap = lines.length >= 40 ? 8 : lines.length >= 18 ? 10 : 14;
  const fontSizePx =
    lines.length >= 24 ? 24.6 :
    lines.length >= 12 ? 25.9 :
    lines.length >= 9 ? 27.2 :
    28.5;
  const columnFootprint = fontSizePx * 1.72;
  const contentWidth =
    lines.length * columnFootprint + Math.max(0, lines.length - 1) * columnGap;
  const targetWidth = Math.max(
    window.innerWidth <= 640 ? 168 : 420,
    Math.min(window.innerWidth - 24, titleReserve + sidePadding + contentWidth)
  );
  const columnSize = `${fontSizePx.toFixed(2)}px`;
  const totalChars = lines.reduce((sum, line) => sum + Array.from(line).length, 0);
  let typedChars = 0;
  poemPanel.style.setProperty("--poem-panel-width", `${Math.round(targetWidth)}px`);
  poemPanel.style.setProperty("--poem-column-size", columnSize);
  poemPanel.style.setProperty("--poem-column-gap", `${columnGap}px`);
  poemColumns.scrollLeft = 0;
  poemManualOverride = false;
  stopPoemAutoScroll();
  let delay = 0;

  lines.forEach((line) => {
    const column = document.createElement("div");
    column.className = "poem-panel__column";

    Array.from(line).forEach((char) => {
      const span = document.createElement("span");
      span.className = "poem-panel__char";
      span.style.animationDelay = `${delay}ms`;
      span.style.setProperty("--ink-opacity", (0.62 + Math.random() * 0.34).toFixed(2));
      span.style.setProperty("--ink-blur", `${(Math.random() * 0.75).toFixed(2)}px`);
      span.style.setProperty("--ink-shift", `${(-4 + Math.random() * 8).toFixed(2)}px`);
      span.textContent = char;
      span.addEventListener(
        "animationend",
        () => {
          typedChars += 1;
          syncPoemScroll(typedChars, totalChars);
        },
        { once: true }
      );
      delay += 58;
      column.appendChild(span);
    });

    poemColumns.appendChild(column);
  });

  requestAnimationFrame(() => {
    syncPoemScroll(0, totalChars);
    startPoemAutoScroll();
  });
}

function clearPoem() {
  stopPoemAutoScroll();
  poemManualOverride = false;
  poemPanel.classList.add("hidden");
  poemColumns.innerHTML = "";
  poemTitle.textContent = "";
  poemPanel.style.removeProperty("--poem-panel-width");
  poemPanel.style.removeProperty("--poem-column-size");
  poemPanel.style.removeProperty("--poem-column-gap");
  poemColumns.scrollLeft = 0;
}

function syncPoemScroll(typedChars, totalChars) {
  if (poemManualOverride) {
    return;
  }

  const maxScroll = Math.max(0, poemColumns.scrollWidth - poemColumns.clientWidth);
  if (!maxScroll || !totalChars) {
    poemAutoScrollTarget = 0;
    poemColumns.scrollLeft = 0;
    return;
  }

  const progress = Math.min(1, typedChars / totalChars);
  const visibleRatio = Math.min(1, poemColumns.clientWidth / poemColumns.scrollWidth);
  if (progress <= visibleRatio) {
    poemAutoScrollTarget = 0;
    return;
  }

  const scrollProgress = (progress - visibleRatio) / Math.max(1 - visibleRatio, 0.0001);
  poemAutoScrollTarget = -maxScroll * Math.pow(scrollProgress, 0.88);
}

function startPoemAutoScroll() {
  stopPoemAutoScroll();

  const step = () => {
    if (poemUserDragging || poemManualOverride) {
      poemAutoScrollFrame = requestAnimationFrame(step);
      return;
    }

    const current = poemColumns.scrollLeft;
    const next = current + (poemAutoScrollTarget - current) * 0.28;
    if (Math.abs(poemAutoScrollTarget - next) < 0.4) {
      poemColumns.scrollLeft = poemAutoScrollTarget;
    } else {
      poemColumns.scrollLeft = next;
    }

    if (!poemPanel.classList.contains("hidden")) {
      poemAutoScrollFrame = requestAnimationFrame(step);
    }
  };

  poemAutoScrollFrame = requestAnimationFrame(step);
}

function stopPoemAutoScroll() {
  if (poemAutoScrollFrame) {
    cancelAnimationFrame(poemAutoScrollFrame);
    poemAutoScrollFrame = 0;
  }
}

function setupPoemDrag() {
  let pointerId = null;
  let startX = 0;
  let startScrollLeft = 0;
  let dragMoved = false;
  let mouseDragging = false;

  poemColumns.addEventListener("pointerdown", (event) => {
    if (poemPanel.classList.contains("hidden")) {
      return;
    }

    poemUserDragging = true;
    poemManualOverride = true;
    poemAutoScrollTarget = poemColumns.scrollLeft;
    stopPoemAutoScroll();
    dragMoved = false;
    pointerId = event.pointerId;
    startX = event.clientX;
    startScrollLeft = poemColumns.scrollLeft;
    poemColumns.classList.add("is-dragging");
    poemColumns.setPointerCapture?.(pointerId);
    event.preventDefault();
  });

  poemColumns.addEventListener("pointermove", (event) => {
    if (pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - startX;
    if (Math.abs(deltaX) > 3) {
      dragMoved = true;
    }
    poemColumns.scrollLeft = startScrollLeft + deltaX;
    event.preventDefault();
  });

  const endDrag = (event) => {
    if (pointerId !== event.pointerId) {
      return;
    }

    poemColumns.classList.remove("is-dragging");
    poemColumns.releasePointerCapture?.(pointerId);
    pointerId = null;
    startX = 0;
    startScrollLeft = poemColumns.scrollLeft;

    window.setTimeout(() => {
      poemUserDragging = false;
    }, dragMoved ? 240 : 0);
  };

  poemColumns.addEventListener("pointerup", endDrag);
  poemColumns.addEventListener("pointercancel", endDrag);

  poemColumns.addEventListener("mousedown", (event) => {
    if (poemPanel.classList.contains("hidden")) {
      return;
    }

    mouseDragging = true;
    poemUserDragging = true;
    poemManualOverride = true;
    poemAutoScrollTarget = poemColumns.scrollLeft;
    stopPoemAutoScroll();
    dragMoved = false;
    startX = event.clientX;
    startScrollLeft = poemColumns.scrollLeft;
    poemColumns.classList.add("is-dragging");
    event.preventDefault();
  });

  window.addEventListener("mousemove", (event) => {
    if (!mouseDragging) {
      return;
    }

    const deltaX = event.clientX - startX;
    if (Math.abs(deltaX) > 3) {
      dragMoved = true;
    }
    poemColumns.scrollLeft = startScrollLeft + deltaX;
    event.preventDefault();
  });

  window.addEventListener("mouseup", () => {
    if (!mouseDragging) {
      return;
    }

    mouseDragging = false;
    poemColumns.classList.remove("is-dragging");
    window.setTimeout(() => {
      poemUserDragging = false;
    }, dragMoved ? 240 : 0);
  });

  poemColumns.addEventListener("scroll", () => {
    if (poemPanel.classList.contains("hidden")) {
      return;
    }

    if (!poemUserDragging && !mouseDragging && poemColumns.scrollWidth > poemColumns.clientWidth) {
      poemManualOverride = true;
      poemAutoScrollTarget = poemColumns.scrollLeft;
      stopPoemAutoScroll();
    }
  });
}

function buildTimeline() {
  sortedPoets.forEach((poet, index) => {
    const progress = index / Math.max(sortedPoets.length - 1, 1);
    const point = riverPoint(progress);
    const side = index % 2 === 0 ? "left" : "right";
    const laneOffset = side === "left" ? -4.6 : 4.6;
    const x = 12 + ((point.x + 1) / 2) * 76;
    const y =
      18 +
      ((1 - (point.y + 1) / 2)) * 60 +
      laneOffset +
      Math.sin(progress * Math.PI * 4) * 1.4;
    const lineLength = 92 + (index % 3) * 18;

    positions.push({ x, y, side, lineLength });

    const node = document.createElement("button");
    node.type = "button";
    node.className = "poet-node";
    node.dataset.id = String(index);
    node.dataset.side = side;
    node.style.left = `${x}%`;
    node.style.top = `${y}%`;
    node.style.setProperty("--line-length", `${lineLength}px`);
    node.setAttribute("aria-label", `${poet.birthYear}年 ${poet.name}`);
    if (x < 16 || x > 84) {
      node.classList.add("is-edge");
    }

    node.innerHTML = `
      <span class="poet-node__dot" aria-hidden="true"></span>
      <span class="poet-node__line" aria-hidden="true"></span>
      <span class="poet-node__label">
        <span class="poet-node__year">${poet.birthYear}</span>
        <span class="poet-node__name">${poet.name}</span>
      </span>
    `;

    node.addEventListener("click", () => openDetail(index));
    timeline.appendChild(node);
  });
}

function openDetail(index) {
  const poet = sortedPoets[index];
  const nodes = Array.from(document.querySelectorAll(".poet-node"));

  state.currentId = index;
  state.dispersed = true;
  document.body.classList.add("is-dispersed");
  riverSystem.disperse();
  nodes.forEach((node, nodeIndex) => node.classList.toggle("is-active", nodeIndex === index));

  detailYears.textContent = `${poet.birthYear} - ${poet.deathYear}`;
  detailName.textContent = poet.name;
  detailTitle.textContent = poet.title;
  detailBio.textContent = poet.bio;
  detailLife.innerHTML = poet.life.map((item) => `<li>${item}</li>`).join("");
  detailWorks.innerHTML = "";
  poet.works.forEach((workTitle, workIndex) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "detail-panel__work-button";
    button.textContent = workTitle;
    if (workIndex === 0) {
      button.classList.add("is-active");
    }
    button.addEventListener("click", () => {
      document.querySelectorAll(".detail-panel__work-button").forEach((element) => {
        element.classList.remove("is-active");
      });
      button.classList.add("is-active");
      renderPoem(poet.name, workTitle);
    });
    item.appendChild(button);
    detailWorks.appendChild(item);
  });

  detailPanel.classList.remove("hidden");
  clearPoem();

  if (window.innerWidth <= 640) {
    detailPanel.style.left = "12px";
    detailPanel.style.top = "auto";
    detailPanel.style.bottom = "12px";
    return;
  }

  detailPanel.style.left = "50%";
  detailPanel.style.top = "50%";
  detailPanel.style.bottom = "auto";
}

function closePanel() {
  state.currentId = null;
  state.dispersed = false;
  document.body.classList.remove("is-dispersed");
  detailPanel.classList.add("hidden");
  document.querySelectorAll(".poet-node").forEach((node) => node.classList.remove("is-active"));
  clearPoem();
}

function setupPointerInteraction() {
  document.addEventListener("pointermove", (event) => {
    if (isPanelInteractionTarget(event.target)) {
      riverSystem.clearPointer();
      return;
    }

    riverSystem.setPointer(event.clientX, event.clientY);
  });

  document.addEventListener("pointerleave", () => {
    riverSystem.clearPointer();
  });

  document.addEventListener("pointercancel", () => {
    riverSystem.clearPointer();
  });
}

function setupSandCanvas() {
  const sandCanvas = document.getElementById("sandCanvas");
  const sandCtx = sandCanvas.getContext("2d");
  let grains = [];
  let animationId = 0;

  const resize = () => {
    sandCanvas.width = window.innerWidth;
    sandCanvas.height = window.innerHeight;
    grains = Array.from({ length: Math.max(120, Math.floor(window.innerWidth * 0.12)) }, () => ({
      x: Math.random() * sandCanvas.width,
      y: Math.random() * sandCanvas.height,
      r: Math.random() * 1.8 + 0.4,
      a: Math.random() * 0.45 + 0.1,
      s: Math.random() * 0.18 + 0.04
    }));
    riverSystem.resize();
  };

  const draw = () => {
    sandCtx.clearRect(0, 0, sandCanvas.width, sandCanvas.height);

    const backdrop = sandCtx.createLinearGradient(0, 0, 0, sandCanvas.height);
    backdrop.addColorStop(0, "rgba(17, 12, 8, 0.08)");
    backdrop.addColorStop(1, "rgba(56, 38, 23, 0.04)");
    sandCtx.fillStyle = backdrop;
    sandCtx.fillRect(0, 0, sandCanvas.width, sandCanvas.height);

    grains.forEach((grain, index) => {
      const pulse = Math.sin(performance.now() * 0.001 + index * 0.27) * 0.08;
      sandCtx.beginPath();
      sandCtx.arc(grain.x, grain.y, grain.r, 0, Math.PI * 2);
      sandCtx.fillStyle = `rgba(244, 210, 141, ${Math.max(0.06, grain.a + pulse)})`;
      sandCtx.fill();

      grain.y -= grain.s;
      grain.x += Math.sin((performance.now() * 0.0004) + index) * 0.05;

      if (grain.y < -2) {
        grain.y = sandCanvas.height + 2;
        grain.x = Math.random() * sandCanvas.width;
      }
    });

    riverSystem.update(state.dispersed);
    animationId = requestAnimationFrame(draw);
  };

  resize();
  draw();

  window.setTimeout(revealExperience, 1400);

  window.addEventListener("resize", () => {
    cancelAnimationFrame(animationId);
    resize();
    if (state.currentId !== null) {
      openDetail(state.currentId);
    }
    draw();
  });
}

function setupEvents() {
  closeDetail.addEventListener("click", closePanel);
  closePoem.addEventListener("click", clearPoem);
  detailPanel.addEventListener("click", (event) => event.stopPropagation());
  poemPanel.addEventListener("click", (event) => event.stopPropagation());

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePanel();
    }
  });
}

buildTimeline();
setupPointerInteraction();
setupSandCanvas();
setupEvents();
setupPoemDrag();
