import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA: أسباب اختلال التوازن ==============
export const imbalanceVideo: AnimatedVideoData = {
  title: 'لماذا تمرض الأرض؟',
  totalDuration: 85,
  scenes: [
    {
      id: 'scene-1-intro',
      title: 'المشهد 1: الطبيعة السعيدة',
      background: 'forest',
      duration: 10,
      narratorText: 'كانت الغابة سعيدة، الحيوانات تعيش بسلام، والأشجار تنمو بقوة. لكن شيئاً ما على وشك أن يتغير... 😟',
      elements: [
        { id: 'sun-happy', type: 'sun', props: { size: 'large', glowing: true }, position: { x: '80%', y: '15%' }, delay: 0 },
        { id: 'tree-1', type: 'plant', props: { type: 'tree', size: 'large' }, position: { x: '25%', y: '55%' }, delay: 0.3 },
        { id: 'tree-2', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '65%', y: '60%' }, delay: 0.5 },
        { id: 'deer', type: 'emoji', props: { emoji: '🦌', size: 45 }, position: { x: '45%', y: '75%' }, delay: 0.8 },
        { id: 'bird', type: 'animal', props: { type: 'bird', size: 'small', moving: true }, position: { x: '55%', y: '40%' }, delay: 1 },
        { id: 'flowers', type: 'plant', props: { type: 'flower', size: 'medium' }, position: { x: '35%', y: '80%' }, delay: 1.3 },
      ],
      soundEffects: ['طيور سعيدة 🐦', 'نسيم هادئ 🍃'],
      educationalHighlight: 'الطبيعة المتوازنة: كل شيء يعمل بانسجام',
      transition: 'fade',
    },
    {
      id: 'scene-2-pollution',
      title: 'المشهد 2: التلوث - العدو الأول',
      background: 'city',
      duration: 14,
      narratorText: 'انظروا! المصانع تنفث الدخان السام 🏭 والسيارات تلوث الهواء. الماء يصبح أسود والأسماك تختفي. هذا هو التلوث!',
      elements: [
        { id: 'factory', type: 'pollution', props: { type: 'factory', size: 'large' }, position: { x: '70%', y: '50%' }, delay: 0 },
        { id: 'smoke-1', type: 'emoji', props: { emoji: '💨', size: 40 }, position: { x: '75%', y: '30%' }, delay: 0.3 },
        { id: 'smoke-2', type: 'emoji', props: { emoji: '💨', size: 35 }, position: { x: '72%', y: '25%' }, delay: 0.5 },
        { id: 'car', type: 'emoji', props: { emoji: '🚗', size: 40 }, position: { x: '30%', y: '80%' }, delay: 0.8 },
        { id: 'pollution-water', type: 'water', props: { type: 'polluted', size: 'medium' }, position: { x: '45%', y: '85%' }, delay: 1 },
        { id: 'dead-fish', type: 'emoji', props: { emoji: '🐟', size: 30 }, position: { x: '50%', y: '88%' }, delay: 1.5 },
        { id: 'warning', type: 'emoji', props: { emoji: '⚠️', size: 50 }, position: { x: '50%', y: '50%' }, delay: 2 },
        { id: 'label', type: 'text', props: { text: 'التلوث يدمر الحياة! 🏭💀' }, position: { x: '50%', y: '92%' }, delay: 2.5 },
      ],
      soundEffects: ['دخان مصنع 🏭', 'سيارات 🚗', 'ماء ملوث 💀'],
      educationalHighlight: 'التلوث: تلويث الهواء والماء والتربة بمواد ضارة',
      transition: 'slide',
    },
    {
      id: 'scene-3-deforestation',
      title: 'المشهد 3: قطع الأشجار',
      background: 'forest',
      duration: 14,
      narratorText: 'الفأس والمناشير تقطع الأشجار بلا رحمة! 🪓 الحيوانات تفقد بيوتها، التربة تنجرف، والهواء يصبح ساخناً. الغابة تصرخ!',
      elements: [
        { id: 'tree-cut-1', type: 'emoji', props: { emoji: '🪵', size: 50 }, position: { x: '25%', y: '70%' }, delay: 0 },
        { id: 'tree-cut-2', type: 'emoji', props: { emoji: '🪵', size: 45 }, position: { x: '45%', y: '75%' }, delay: 0.3 },
        { id: 'axe', type: 'emoji', props: { emoji: '🪓', size: 40 }, position: { x: '60%', y: '65%' }, delay: 0.6 },
        { id: 'sad-bird', type: 'emoji', props: { emoji: '🐦', size: 35 }, position: { x: '70%', y: '40%' }, delay: 1 },
        { id: 'question', type: 'emoji', props: { emoji: '❓', size: 30 }, position: { x: '75%', y: '35%' }, delay: 1.2 },
        { id: 'soil-erosion', type: 'soil', props: { size: 'medium', eroding: true }, position: { x: '40%', y: '85%' }, delay: 1.5 },
        { id: 'hot-sun', type: 'sun', props: { size: 'large', glowing: true }, position: { x: '80%', y: '20%' }, delay: 2 },
        { id: 'thermometer', type: 'emoji', props: { emoji: '🌡️', size: 45 }, position: { x: '85%', y: '35%' }, delay: 2.3 },
      ],
      soundEffects: ['منشار 🪚', 'شجرة تسقط 🌲', 'طائر حزين 🐦'],
      educationalHighlight: 'قطع الأشجار: يدمر موطن الحيوانات ويزيد حرارة الأرض',
      transition: 'slide',
    },
    {
      id: 'scene-4-hunting',
      title: 'المشهد 4: الصيد الجائر',
      background: 'forest',
      duration: 14,
      narratorText: 'الصيد بدون قواعد يقتل الحيوانات النادرة! 🔫 عندما يختفي حيوان، تختل السلسلة الغذائية كلها. بعض الحيوانات انقرضت للأبد!',
      elements: [
        { id: 'hunter', type: 'emoji', props: { emoji: '🎯', size: 40 }, position: { x: '25%', y: '60%' }, delay: 0 },
        { id: 'scared-deer', type: 'emoji', props: { emoji: '🦌', size: 50 }, position: { x: '50%', y: '70%' }, delay: 0.5 },
        { id: 'running', type: 'emoji', props: { emoji: '💨', size: 30 }, position: { x: '55%', y: '75%' }, delay: 0.7 },
        { id: 'extinct', type: 'emoji', props: { emoji: '🦤', size: 45 }, position: { x: '75%', y: '55%' }, delay: 1.2 },
        { id: 'cross', type: 'emoji', props: { emoji: '❌', size: 40 }, position: { x: '80%', y: '50%' }, delay: 1.5 },
        { id: 'broken-chain', type: 'emoji', props: { emoji: '⛓️‍💥', size: 50 }, position: { x: '50%', y: '40%' }, delay: 2 },
        { id: 'label', type: 'text', props: { text: 'الصيد الجائر = الانقراض! 🦤❌' }, position: { x: '50%', y: '90%' }, delay: 2.5 },
      ],
      soundEffects: ['صياد 🎯', 'حيوانات تهرب 🏃', 'صمت حزين 😢'],
      educationalHighlight: 'الصيد الجائر: قتل الحيوانات بأعداد كبيرة يؤدي للانقراض',
      transition: 'slide',
    },
    {
      id: 'scene-5-solutions',
      title: 'المشهد 5: الأمل - الحلول',
      background: 'park',
      duration: 18,
      narratorText: 'لكن لا تيأسوا! 💪 يمكننا إصلاح الأرض: التشجير، التدوير، الطاقة النظيفة، وحماية الحيوانات. كل فعل صغير يصنع فرقاً كبيراً! 🌍💚',
      elements: [
        { id: 'new-tree', type: 'plant', props: { type: 'tree', size: 'large' }, position: { x: '20%', y: '55%' }, delay: 0 },
        { id: 'planting', type: 'emoji', props: { emoji: '🌱', size: 35 }, position: { x: '30%', y: '75%' }, delay: 0.5 },
        { id: 'recycle', type: 'emoji', props: { emoji: '♻️', size: 50 }, position: { x: '50%', y: '50%' }, delay: 1 },
        { id: 'solar', type: 'emoji', props: { emoji: '☀️', size: 40 }, position: { x: '75%', y: '40%' }, delay: 1.5 },
        { id: 'windmill', type: 'emoji', props: { emoji: '🌀', size: 45 }, position: { x: '80%', y: '55%' }, delay: 1.8 },
        { id: 'protected', type: 'emoji', props: { emoji: '🦌', size: 40 }, position: { x: '60%', y: '70%' }, delay: 2.2 },
        { id: 'shield', type: 'emoji', props: { emoji: '🛡️', size: 35 }, position: { x: '65%', y: '65%' }, delay: 2.5 },
        { id: 'happy-earth', type: 'emoji', props: { emoji: '🌍', size: 60 }, position: { x: '50%', y: '25%' }, delay: 3 },
        { id: 'heart', type: 'emoji', props: { emoji: '💚', size: 40 }, position: { x: '55%', y: '22%' }, delay: 3.3 },
        { id: 'label', type: 'text', props: { text: 'معاً نحمي كوكبنا! 🌍💪' }, position: { x: '50%', y: '92%' }, delay: 4 },
      ],
      soundEffects: ['تشجير 🌱', 'طاقة نظيفة ☀️', 'أمل 🎶'],
      educationalHighlight: 'الحلول: التشجير، التدوير، الطاقة المتجددة، وحماية الحياة البرية',
      transition: 'zoom',
    },
  ],
  finalMessage: 'أنت الآن تعرف أسباب المشكلة والحلول. كن بطل البيئة! 🌍💚',
};

// ============== COURSE DATA ==============
export const imbalanceCausesGrade5: Course = {
  id: 'imbalance-causes-5',
  title: 'أسباب اختلال التوازن البيئي',
  grade: 5,
  icon: '📉',
  color: 'bg-red-50',
  badge: { name: 'درع التوازن', icon: '🛡️' },
  rewardMessages: {
    student: 'أنت تدرك المخاطر الآن.. وتملك الحلول!',
    parent: 'طفلك تعرف على أسباب التلوث وكيفية منعه',
    universalGoldBadge: { name: 'منقذ الجزيرة', icon: '🏝️' },
  },
  videoConcept: {
    title: 'لماذا تمرض الأرض؟',
    scenario: 'تلوث، قطع أشجار، صيد جائر... ماذا نفعل؟',
    moralMessage: 'يدنا هي الداء والدواء!',
  },
  animatedVideo: imbalanceVideo,
  videoStoryboard: {
    title: 'لماذا تمرض الأرض؟',
    scenes: 'الطبيعة السعيدة ← التلوث ← قطع الأشجار ← الصيد الجائر ← الحلول',
    narratorText: 'كانت الغابة سعيدة، لكن شيئاً ما على وشك أن يتغير...',
    soundEffects: ['مصانع 🏭', 'مناشير 🪚', 'أمل 💚']
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1_imbalance',
      type: 'matching',
      title: 'اربط السبب بالنتيجة',
      points: 20,
      prompt: 'اسحب كل سبب نحو نتيجته في البيئة 🏭🌲',
      pairs: [
        { left: 'التلوث الصناعي 🏭', right: 'تلوث الهواء والماء' },
        { left: 'قطع الأشجار 🪓', right: 'انجراف التربة وارتفاع الحرارة' },
        { left: 'الصيد الجائر 🎯', right: 'انقراض الحيوانات' },
        { left: 'النفايات البلاستيكية 🥤', right: 'تلوث المحيطات وموت الأسماك' },
      ],
      successMessage: 'أحسنت! الآن تفهم كيف يختل التوازن 📉',
      errorMessage: 'حاول مرة أخرى! كل فعل سلبي له عواقب',
      rewardBadge: { name: 'محلل المشكلات', icon: '🔍' },
    },
    {
      id: 'ex2_imbalance',
      type: 'mcq-set',
      title: 'أسئلة عن أسباب الاختلال',
      points: 25,
      prompt: 'اختر الإجابة الصحيحة',
      questions: [
        {
          id: 'q1',
          question: 'ما أخطر تأثير لقطع الأشجار؟',
          options: ['يصبح الجو أكثر برودة', 'تفقد الحيوانات بيوتها ويزيد ثاني أكسيد الكربون', 'تزيد الأمطار'],
          correct: 'تفقد الحيوانات بيوتها ويزيد ثاني أكسيد الكربون',
        },
        {
          id: 'q2',
          question: 'الصيد الجائر يؤدي إلى:',
          options: ['زيادة الحيوانات', 'انقراض أنواع كاملة', 'تحسن البيئة'],
          correct: 'انقراض أنواع كاملة',
        },
        {
          id: 'q3',
          question: 'ماذا يحدث عندما تموت كل الأسماك في نهر ملوث؟',
          options: ['لا شيء مهم', 'تختل السلسلة الغذائية كاملة', 'تزيد النباتات'],
          correct: 'تختل السلسلة الغذائية كاملة',
        },
      ],
      successMessage: 'ممتاز! أنت تدرك خطورة الاختلال البيئي 🌍',
      errorMessage: 'فكر في كيف يؤثر كل سبب على باقي الكائنات',
      rewardBadge: { name: 'عالم البيئة', icon: '🔬' },
    },
    {
      id: 'ex3_imbalance',
      type: 'scenario',
      title: 'موقف: المصنع الملوث',
      points: 30,
      prompt: 'اختر الحل الأفضل',
      scenario: 'مصنع قريب من النهر يرمي نفاياته في الماء. الأسماك بدأت تموت والرائحة كريهة. ما الحل؟',
      options: [
        'نتجاهل الأمر فهو ليس مشكلتنا',
        'نبلّغ السلطات ونطالب بتركيب فلاتر وتنظيف النهر',
        'ننتقل للعيش بعيداً',
      ],
      correct: 'نبلّغ السلطات ونطالب بتركيب فلاتر وتنظيف النهر',
      successMessage: 'قرار حكيم! المواطن النشط يحمي بيئته 💪🌊',
      errorMessage: 'البيئة مسؤوليتنا جميعاً! يجب أن نتحرك',
      rewardBadge: { name: 'المواطن البيئي', icon: '🛡️' },
    },
  ],
  games: [
    {
      id: 'g1_imbalance',
      type: 'simulation',
      title: 'سباق منع الاختلال',
      description: 'يظهر الخطر فجأة! اختر الحل الصحيح بسرعة لإنقاذ الموقف 🚨🌿',
      points: 35,
      gameData: {
        scenarios: [
          { id: 'flood', title: 'فيضان قادم! 🌊', description: 'المياه ترتفع بسرعة في النهر.', icon: '🌊', correctAction: 'dam' },
          { id: 'smoke', title: 'تلوث هواء! 🏭', description: 'دخان المصانع يخنق المدينة.', icon: '🏭', correctAction: 'filter' },
          { id: 'hunting', title: 'صيد جائر! 🔫', description: 'صيادون يلاحقون الغزلان.', icon: '🦌', correctAction: 'law' }
        ],
        actions: [
          { id: 'dam', label: 'بناء سد/تشجير', icon: '🧱', color: 'bg-blue-100' },
          { id: 'filter', label: 'تركيب فلاتر', icon: '⚙️', color: 'bg-gray-100' },
          { id: 'law', label: 'تطبيق القانون', icon: '📜', color: 'bg-yellow-100' }
        ],
        rewardBadgeName: 'درع التوازن'
      },
    },
    {
      id: 'g2_imbalance',
      type: 'rescue',
      title: 'إنقاذ الجزيرة',
      description: 'الجزيرة تعاني! نظف الشاطئ وازرع الأشجار لتعود الحياة 🏝️',
      points: 40,
      gameData: {
        items: [
          { id: 'plastic', type: 'waste', label: 'بلاستيك', x: 30, y: 80, icon: '🥤', correctAction: 'clean', successIcon: '🦀' },
          { id: 'oil', type: 'waste', label: 'بقعة زيت', x: 70, y: 85, icon: '🛢️', correctAction: 'clean', successIcon: '🐟' },
          { id: 'palm', type: 'cut', label: 'نخلة ميتة', x: 50, y: 40, icon: '🥥', correctAction: 'plant', successIcon: '🌴' },
        ],
        rewardBadgeName: 'منقذ الجزيرة'
      },
    },
    {
      id: 'g3_imbalance',
      type: 'rescue',
      title: 'خريطة الحلول البيئية',
      description: 'ضع الحل المناسب في المكان المناسب على خريطة تونس 🗺️🇹🇳',
      points: 40,
      gameData: {
        items: [
          { id: 'desert', type: 'desert', label: 'تصحّر (الجنوب)', x: 40, y: 70, icon: '🌵', correctAction: 'plant', successIcon: '🌳' },
          { id: 'city', type: 'pollution', label: 'تلوث (العاصمة)', x: 50, y: 20, icon: '🚗', correctAction: 'clean', successIcon: '🚲' },
          { id: 'sea', type: 'plastic', label: 'تلوث بحري (الساحل)', x: 80, y: 40, icon: '⚓', correctAction: 'protect', successIcon: '🐬' },
        ],
        rewardBadgeName: 'مهندس الحلول البيئية'
      },
    }
  ],
};
