import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA ==============
export const imbalanceCausesVideo: AnimatedVideoData = {
  title: 'الغازي الذي دمّر جزيرتي!',
  totalDuration: 70,
  scenes: [
    {
      id: 'scene-1-beautiful-island',
      title: 'المشهد 1: جزيرة خضراء جميلة',
      background: 'forest',
      duration: 10,
      narratorText: 'مرحباً يا أصدقاء! 🌴 كان يا ما كان، كانت هناك جزيرة خضراء جميلة. فيها أشجار كثيرة، حيوانات سعيدة، مياه صافية، وهواء نقي. كل شيء كان متوازناً ورائعاً!',
      elements: [
        { id: 'sun-beautiful', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '85%', y: '15%' }, delay: 0 },
        { id: 'tree-1', type: 'plant', props: { type: 'tree', size: 'large' }, position: { x: '20%', y: '55%' }, delay: 0.3 },
        { id: 'tree-2', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '50%', y: '60%' }, delay: 0.5 },
        { id: 'tree-3', type: 'plant', props: { type: 'tree', size: 'large' }, position: { x: '80%', y: '55%' }, delay: 0.7 },
        { id: 'flower-1', type: 'plant', props: { type: 'flower', size: 'small' }, position: { x: '35%', y: '80%' }, delay: 0.9 },
        { id: 'rabbit-happy', type: 'animal', props: { type: 'rabbit', size: 'medium', moving: true }, position: { x: '40%', y: '75%' }, delay: 1.1 },
        { id: 'bird-happy', type: 'animal', props: { type: 'bird', size: 'small', moving: true }, position: { x: '30%', y: '40%' }, delay: 1.3 },
        { id: 'turtle-happy', type: 'animal', props: { type: 'turtle', size: 'medium', moving: true }, position: { x: '70%', y: '80%' }, delay: 1.5 },
        { id: 'water-clean', type: 'water', props: { type: 'wave', size: 'medium' }, position: { x: '85%', y: '90%' }, delay: 1.7 },
        { id: 'label-beautiful', type: 'text', props: { text: '🌴 جزيرة متوازنة وجميلة' }, position: { x: '50%', y: '90%' }, delay: 2 },
      ],
      soundEffects: ['طيور سعيدة 🐦', 'موج هادئ 🌊', 'طبيعة جميلة 🎶'],
      educationalHighlight: 'الجزيرة المتوازنة: كل الكائنات تعيش بسلام وانسجام',
      transition: 'fade',
    },
    {
      id: 'scene-2-overhunting',
      title: 'المشهد 2: الصيد الجائر',
      background: 'forest',
      duration: 12,
      narratorText: 'لكن جاء صيادون طماعون! 😢 صادوا الكثير من الحيوانات حتى اختفت بعض الأنواع. هذا يسمى "الصيد الجائر" ويسبب خللاً كبيراً في التوازن!',
      elements: [
        { id: 'tree-damaged', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '25%', y: '60%' }, delay: 0 },
        { id: 'hunter-icon', type: 'emoji', props: { emoji: '🎯', size: 50 }, position: { x: '60%', y: '50%' }, delay: 0.5 },
        { id: 'rabbit-scared', type: 'animal', props: { type: 'rabbit', size: 'small', moving: true, direction: 'left' }, position: { x: '40%', y: '75%' }, delay: 0.8 },
        { id: 'deer-scared', type: 'animal', props: { type: 'deer', size: 'medium', moving: true, direction: 'left' }, position: { x: '75%', y: '65%' }, delay: 1 },
        { id: 'sad-face', type: 'emoji', props: { emoji: '😢', size: 40 }, position: { x: '50%', y: '35%' }, delay: 1.3 },
        { id: 'cross-1', type: 'emoji', props: { emoji: '❌', size: 30 }, position: { x: '45%', y: '70%' }, delay: 1.5 },
        { id: 'cross-2', type: 'emoji', props: { emoji: '❌', size: 30 }, position: { x: '70%', y: '60%' }, delay: 1.8 },
        { id: 'warning', type: 'emoji', props: { emoji: '⚠️', size: 45 }, position: { x: '85%', y: '30%' }, delay: 2 },
        { id: 'label-hunting', type: 'text', props: { text: '⚠️ الصيد الجائر' }, position: { x: '50%', y: '90%' }, delay: 2.5 },
      ],
      soundEffects: ['صوت تحذير ⚠️', 'حيوانات خائفة 🐾'],
      educationalHighlight: 'الصيد الجائر: قتل أعداد كبيرة من الحيوانات يسبب انقراضها',
      transition: 'slide',
    },
    {
      id: 'scene-3-invasive-species',
      title: 'المشهد 3: الأنواع الغازية',
      background: 'farm',
      duration: 12,
      narratorText: 'ثم جاء حيوان غريب من بلد آخر! 🐰🔴 هذا النوع الغازي أكل كل النباتات وسرق طعام الحيوانات المحلية. ليس له أعداء طبيعيون هنا!',
      elements: [
        { id: 'invasive-rabbit', type: 'emoji', props: { emoji: '🐰', size: 60 }, position: { x: '50%', y: '55%' }, delay: 0 },
        { id: 'warning-invasive', type: 'emoji', props: { emoji: '🔴', size: 30 }, position: { x: '58%', y: '48%' }, delay: 0.3 },
        { id: 'plant-eaten-1', type: 'emoji', props: { emoji: '🥀', size: 35 }, position: { x: '30%', y: '75%' }, delay: 0.6 },
        { id: 'plant-eaten-2', type: 'emoji', props: { emoji: '🥀', size: 35 }, position: { x: '70%', y: '80%' }, delay: 0.9 },
        { id: 'local-animal-sad', type: 'animal', props: { type: 'turtle', size: 'medium' }, position: { x: '80%', y: '70%' }, delay: 1.2 },
        { id: 'hungry-icon', type: 'emoji', props: { emoji: '😿', size: 35 }, position: { x: '85%', y: '62%' }, delay: 1.5 },
        { id: 'arrow-eat', type: 'arrow', props: { direction: 'left', color: '#ef4444', size: 'small' }, position: { x: '40%', y: '65%' }, delay: 1.8 },
        { id: 'arrow-eat-2', type: 'arrow', props: { direction: 'right', color: '#ef4444', size: 'small' }, position: { x: '60%', y: '70%' }, delay: 2 },
        { id: 'label-invasive', type: 'text', props: { text: '🔴 الأنواع الغازية' }, position: { x: '50%', y: '90%' }, delay: 2.5 },
      ],
      soundEffects: ['حيوان يأكل بنهم 🐰', 'تحذير ⚠️'],
      educationalHighlight: 'الأنواع الغازية: كائنات غريبة تدمر التوازن المحلي',
      transition: 'slide',
    },
    {
      id: 'scene-4-deforestation',
      title: 'المشهد 4: قطع الغابات',
      background: 'desert',
      duration: 12,
      narratorText: 'ثم جاءت آلات ضخمة! 🪓🌳 قطعت الأشجار لبناء مبانٍ ومصانع. الحيوانات فقدت بيوتها، والتربة أصبحت جافة وميتة!',
      elements: [
        { id: 'stump-1', type: 'emoji', props: { emoji: '🪵', size: 40 }, position: { x: '25%', y: '70%' }, delay: 0 },
        { id: 'stump-2', type: 'emoji', props: { emoji: '🪵', size: 35 }, position: { x: '50%', y: '75%' }, delay: 0.3 },
        { id: 'stump-3', type: 'emoji', props: { emoji: '🪵', size: 40 }, position: { x: '75%', y: '72%' }, delay: 0.5 },
        { id: 'chainsaw', type: 'emoji', props: { emoji: '🪓', size: 50 }, position: { x: '60%', y: '50%' }, delay: 0.8 },
        { id: 'factory', type: 'emoji', props: { emoji: '🏭', size: 55 }, position: { x: '85%', y: '55%' }, delay: 1.1 },
        { id: 'smoke', type: 'pollution', props: { type: 'smoke', size: 'medium' }, position: { x: '85%', y: '35%' }, delay: 1.4 },
        { id: 'homeless-bird', type: 'animal', props: { type: 'bird', size: 'small', moving: true }, position: { x: '30%', y: '40%' }, delay: 1.7 },
        { id: 'sad-soil', type: 'emoji', props: { emoji: '🏜️', size: 60 }, position: { x: '40%', y: '85%' }, delay: 2 },
        { id: 'label-deforest', type: 'text', props: { text: '🪓 قطع الغابات' }, position: { x: '50%', y: '90%' }, delay: 2.5 },
      ],
      soundEffects: ['منشار كهربائي 🪓', 'شجرة تسقط 🌳', 'دخان مصنع 🏭'],
      educationalHighlight: 'قطع الغابات: تدمير موطن الحيوانات وزيادة التصحر',
      transition: 'slide',
    },
    {
      id: 'scene-5-pollution',
      title: 'المشهد 5: التلوث',
      background: 'city',
      duration: 12,
      narratorText: 'والأسوأ... التلوث! 🏭🗑️ البلاستيك ملأ البحر، والدخان ملأ الهواء. السلاحف تختنق بالأكياس البلاستيكية، والأسماك تموت!',
      elements: [
        { id: 'ocean-polluted', type: 'water', props: { type: 'wave', size: 'large' }, position: { x: '50%', y: '80%' }, delay: 0 },
        { id: 'plastic-1', type: 'emoji', props: { emoji: '🥤', size: 30 }, position: { x: '30%', y: '75%' }, delay: 0.3 },
        { id: 'plastic-2', type: 'emoji', props: { emoji: '🛍️', size: 35 }, position: { x: '55%', y: '78%' }, delay: 0.5 },
        { id: 'plastic-3', type: 'emoji', props: { emoji: '🗑️', size: 35 }, position: { x: '70%', y: '72%' }, delay: 0.7 },
        { id: 'turtle-choking', type: 'animal', props: { type: 'turtle', size: 'medium' }, position: { x: '45%', y: '70%' }, delay: 1 },
        { id: 'sad-turtle', type: 'emoji', props: { emoji: '😵', size: 25 }, position: { x: '50%', y: '65%' }, delay: 1.3 },
        { id: 'factory-pollution', type: 'emoji', props: { emoji: '🏭', size: 50 }, position: { x: '20%', y: '40%' }, delay: 1.5 },
        { id: 'smoke-heavy', type: 'pollution', props: { type: 'smoke', size: 'large' }, position: { x: '20%', y: '20%' }, delay: 1.8 },
        { id: 'oil-spill', type: 'pollution', props: { type: 'oil', size: 'medium' }, position: { x: '80%', y: '75%' }, delay: 2 },
        { id: 'label-pollution', type: 'text', props: { text: '🏭🗑️ التلوث' }, position: { x: '50%', y: '90%' }, delay: 2.5 },
      ],
      soundEffects: ['سلحفاة تختنق 🐢', 'دخان ثقيل 💨', 'موسيقى حزينة 😢'],
      educationalHighlight: 'التلوث: البلاستيك والدخان يقتلان الكائنات الحية',
      transition: 'slide',
    },
    {
      id: 'scene-6-destroyed-island',
      title: 'المشهد 6: الجزيرة المدمرة',
      background: 'desert',
      duration: 12,
      narratorText: 'انظروا ماذا حدث للجزيرة! 😭 لم يعد فيها أشجار، الحيوانات اختفت، التربة جافة، والماء ملوث. هذا ما يحدث عندما نخل بالتوازن البيئي!',
      elements: [
        { id: 'dead-tree-1', type: 'emoji', props: { emoji: '🥀', size: 50 }, position: { x: '25%', y: '60%' }, delay: 0 },
        { id: 'dead-tree-2', type: 'emoji', props: { emoji: '🥀', size: 45 }, position: { x: '75%', y: '65%' }, delay: 0.3 },
        { id: 'barren-soil', type: 'emoji', props: { emoji: '🏜️', size: 70 }, position: { x: '50%', y: '80%' }, delay: 0.6 },
        { id: 'no-animals', type: 'emoji', props: { emoji: '🚫', size: 40 }, position: { x: '40%', y: '50%' }, delay: 0.9 },
        { id: 'skull', type: 'emoji', props: { emoji: '💀', size: 35 }, position: { x: '60%', y: '70%' }, delay: 1.2 },
        { id: 'polluted-water', type: 'emoji', props: { emoji: '🟤', size: 50 }, position: { x: '80%', y: '85%' }, delay: 1.5 },
        { id: 'sad-earth', type: 'emoji', props: { emoji: '🌍😢', size: 60 }, position: { x: '50%', y: '35%' }, delay: 1.8 },
        { id: 'fire-remains', type: 'fire', props: { size: 'small' }, position: { x: '35%', y: '75%' }, delay: 2 },
        { id: 'label-destroyed', type: 'text', props: { text: '😭 جزيرة مدمرة' }, position: { x: '50%', y: '90%' }, delay: 2.5 },
      ],
      soundEffects: ['رياح صحراوية 🏜️', 'صمت حزين 😢'],
      educationalHighlight: 'اختلال التوازن يحول الجزيرة الخضراء إلى صحراء ميتة',
      transition: 'zoom',
    },
  ],
  finalMessage: 'الآن تعرف أسباب اختلال التوازن! دورك حماية بيئتك من هذه الأخطار! 🌍💪',
};

// ============== COURSE DATA ==============
export const imbalanceCausesGrade5: Course = {
  id: 'imbalance-causes-5',
  title: 'أسباب اختلال التوازن البيئي',
  grade: 5,
  icon: '⚠️',
  color: 'bg-red-100',
  badge: { name: 'مهندس الحلول البيئية', icon: '🗺️🌱' },
  rewardMessages: {
    student: 'أنت الآن محارب بيئي! تعرف الأخطار وتعرف كيف تواجهها!',
    parent: 'طفلك تعلم عن مخاطر اختلال التوازن البيئي وأهمية الحفاظ عليه! ⚠️🌍',
    universalGoldBadge: { name: 'البطل الشامل للبيئة', icon: '🌍' },
  },
  videoConcept: {
    title: 'الغازي الذي دمّر جزيرتي!',
    scenario: 'مرحباً يا أصدقاء! كل شيء كان متوازناً… لكن جاءت أفعال بشرية خالفت النظام!',
    moralMessage: 'أفعالنا السلبية تدمر التوازن البيئي، فلنحافظ على بيئتنا!',
  },
  animatedVideo: imbalanceCausesVideo,
  videoStoryboard: {
    title: 'الغازي الذي دمّر جزيرتي!',
    scenes: 'جزيرة خضراء → صيد جائر → أنواع غازية → قطع أشجار → تلوث → جزيرة مدمرة',
    narratorText: 'مرحباً يا أصدقاء! كل شيء كان متوازناً… لكن جاءت أفعال بشرية خالفت النظام!',
    soundEffects: ['مناشير 🪓', 'حريق 🔥', 'سلحفاة تختنق 🐢', 'موسيقى أمل 🎶'],
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1',
      type: 'drag-sequence',
      title: 'رتّب أسباب الاختلال',
      points: 25,
      prompt: 'رتّب أسباب اختلال التوازن البيئي من الأخطر إلى الأقل خطورة 🔴🟡🟢',
      items: [
        { id: 'hunt', label: 'الصيد الجائر', emoji: '🎯' },
        { id: 'invasive', label: 'الأنواع الغازية', emoji: '🐰🔴' },
        { id: 'pesticides', label: 'المبيدات الكيميائية', emoji: '☠️' },
        { id: 'deforest', label: 'قطع الغابات', emoji: '🪓' },
        { id: 'plastic', label: 'التلوث البلاستيكي', emoji: '🛍️' },
      ],
      correctOrder: ['deforest', 'hunt', 'invasive', 'pesticides', 'plastic'],
      successMessage: 'ممتاز! أنت محلل بيئي ماهر! 🧐',
      errorMessage: 'حاول مجدداً! فكر في تأثير كل سبب على البيئة ⚠️',
      rewardBadge: { name: 'محلل أسباب الخلل', icon: '🧐' },
    },
    {
      id: 'ex2',
      type: 'mcq-set',
      title: 'أسئلة عن الاختلال',
      points: 20,
      prompt: 'أجب عن الأسئلة لفهم أسباب اختلال التوازن البيئي 🌍',
      questions: [
        {
          id: 'q1',
          question: 'ماذا يحدث عندما يأتي نوع غازي إلى بيئة جديدة؟',
          options: ['🔴 يأكل كل الطعام ويهدد الأنواع المحلية', '✅ يعيش بسلام مع الجميع', '💤 لا شيء يحدث'],
          correct: '🔴 يأكل كل الطعام ويهدد الأنواع المحلية',
        },
        {
          id: 'q2',
          question: 'ما تأثير المبيدات الكيميائية على البيئة؟',
          options: ['☠️ تقتل الحشرات النافعة وتلوث التربة والماء', '✅ تساعد النباتات فقط', '🌿 لا تأثير لها'],
          correct: '☠️ تقتل الحشرات النافعة وتلوث التربة والماء',
        },
        {
          id: 'q3',
          question: 'لماذا قطع الغابات خطير؟',
          options: ['🪓 يدمر موطن الحيوانات ويسبب التصحر', '✅ يوفر مساحة للزراعة فقط', '🌳 الأشجار تنمو مرة أخرى بسرعة'],
          correct: '🪓 يدمر موطن الحيوانات ويسبب التصحر',
        },
      ],
      successMessage: 'رائع! أنت تفهم مخاطر اختلال التوازن 🌍',
      errorMessage: 'راجع الفيديو وفكر في تأثير كل سبب ⚠️',
      rewardBadge: { name: 'خبير المخاطر البيئية', icon: '⚠️' },
    },
    {
      id: 'ex3',
      type: 'scenario',
      title: 'حماية المحيط',
      points: 20,
      prompt: 'اختر التصرف الصحيح لحماية المحيط من التلوث 🌊',
      scenario: 'رأيت شخصاً يرمي كيساً بلاستيكياً في البحر. ماذا تفعل؟',
      options: [
        'أطلب منه بأدب عدم فعل ذلك وأشرح خطورة البلاستيك على الحيوانات البحرية 🌊✅',
        'أتجاهل الأمر لأنه ليس من شأني',
        'أرمي المزيد من النفايات معه',
      ],
      correct: 'أطلب منه بأدب عدم فعل ذلك وأشرح خطورة البلاستيك على الحيوانات البحرية 🌊✅',
      successMessage: 'أحسنت! أنت صوت المحيط الصامت 🌊',
      errorMessage: 'فكر مجدداً... السلاحف والأسماك تختنق بالبلاستيك 🐢',
      rewardBadge: { name: 'صوت المحيط الصامت', icon: '🌊' },
    },
  ],
  games: [
    {
      id: 'g1',
      type: 'runner',
      title: 'سباق منع الاختلال',
      description: 'حل المشاكل البيئية بسرعة قبل أن تدمر التوازن! 🏃⚡',
      points: 35,
      gameData: {
        collectItems: ['🌳', '🌿', '💧', '🐰', '🦊'],
        hazardItems: ['🪓', '🔥', '☠️', '🛍️', '🏭'],
        lives: 3,
        timeLimitSec: 35,
        problems: ['أرنب غازي', 'منشار', 'مبيدات', 'نفايات'],
        rewardBadgeName: 'محارب الاختلال 🛡️',
      },
    },
    {
      id: 'g2',
      type: 'rescue',
      title: 'مهمة إنقاذ الجزيرة',
      description: 'نظف البلاستيك، أطفئ الحرائق، وازرع الأشجار لإنقاذ الجزيرة! 🏝️🦸',
      points: 35,
      gameData: {
        tasks: [
          { id: 't1', type: 'clean', target: '🛍️', tool: '🧹', count: 5 },
          { id: 't2', type: 'extinguish', target: '🔥', tool: '🧯', count: 3 },
          { id: 't3', type: 'plant', target: '🪵', tool: '🌱', count: 4 },
        ],
        timeLimitSec: 60,
        rewardBadgeName: 'منقذ الجزيرة 🏝️',
      },
    },
    {
      id: 'g3',
      type: 'map',
      title: 'خريطة الحلول البيئية',
      description: 'اربط كل مشكلة بيئية بحلها الصحيح على خريطة تونس 🗺️🌱',
      points: 30,
      gameData: {
        problems: [
          { id: 'p1', name: 'قطع الغابات', icon: '🪓', solution: 'زراعة الأشجار' },
          { id: 'p2', name: 'التلوث البلاستيكي', icon: '🛍️', solution: 'إعادة التدوير' },
          { id: 'p3', name: 'الصيد الجائر', icon: '🎯', solution: 'قوانين حماية' },
          { id: 'p4', name: 'الأنواع الغازية', icon: '🐰🔴', solution: 'المراقبة والإزالة' },
        ],
        mapLabel: '🗺️ خريطة تونس البيئية',
        rewardBadgeName: 'مهندس الحلول البيئية 🗺️',
      },
    },
  ],
};
