import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA: التوازن البيئي ==============
export const ecoBalanceVideo: AnimatedVideoData = {
  title: 'رحلة التوازن في الغابة السحرية',
  totalDuration: 80,
  scenes: [
    {
      id: 'scene-1-intro',
      title: 'المشهد 1: مقدمة - ما هو التوازن؟',
      background: 'forest',
      duration: 12,
      narratorText: 'مرحباً يا أصدقاء! 🌿 اليوم سنكتشف سر الغابة السحرية. كل شيء هنا مترابط: الشمس، الماء، النباتات، والحيوانات تعيش معاً في تناغم تام!',
      elements: [
        { id: 'sun-intro', type: 'sun', props: { size: 'large', glowing: true }, position: { x: '80%', y: '15%' }, delay: 0 },
        { id: 'tree-1', type: 'plant', props: { type: 'tree', size: 'large' }, position: { x: '20%', y: '60%' }, delay: 0.5 },
        { id: 'tree-2', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '70%', y: '65%' }, delay: 0.7 },
        { id: 'rabbit', type: 'animal', props: { type: 'rabbit', size: 'medium' }, position: { x: '45%', y: '80%' }, delay: 1 },
        { id: 'bird', type: 'animal', props: { type: 'bird', size: 'small', moving: true }, position: { x: '35%', y: '40%' }, delay: 1.3 },
        { id: 'title-text', type: 'text', props: { text: 'التوازن البيئي ⚖️🌍' }, position: { x: '50%', y: '90%' }, delay: 2 },
      ],
      soundEffects: ['طيور تغرد 🐦', 'رياح خفيفة 🍃', 'جدول ماء 💧'],
      educationalHighlight: 'التوازن البيئي: حالة التناغم بين جميع عناصر الطبيعة',
      transition: 'fade',
    },
    {
      id: 'scene-2-producers',
      title: 'المشهد 2: المنتجون - أساس الحياة',
      background: 'farm',
      duration: 14,
      narratorText: 'انظروا! النباتات الخضراء هي المنتجون 🌱 تستخدم ضوء الشمس والماء لصنع غذائها. بدونها لا حياة للحيوانات أو الإنسان!',
      elements: [
        { id: 'sun-prod', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '75%', y: '20%' }, delay: 0 },
        { id: 'arrow-sun', type: 'arrow', props: { direction: 'down', color: '#f59e0b', label: 'طاقة ضوئية' }, position: { x: '60%', y: '35%' }, delay: 0.5 },
        { id: 'grass', type: 'plant', props: { type: 'grass', size: 'large' }, position: { x: '30%', y: '80%' }, delay: 0.8 },
        { id: 'flower-1', type: 'plant', props: { type: 'flower', size: 'medium' }, position: { x: '50%', y: '75%' }, delay: 1 },
        { id: 'flower-2', type: 'plant', props: { type: 'flower', size: 'small' }, position: { x: '65%', y: '78%' }, delay: 1.2 },
        { id: 'water-drop', type: 'water', props: { type: 'droplet', size: 'medium' }, position: { x: '40%', y: '60%' }, delay: 1.5 },
        { id: 'energy', type: 'energy-flow', props: { color: 'green' }, position: { x: '45%', y: '70%' }, delay: 2 },
        { id: 'label', type: 'text', props: { text: 'المنتجون 🌿 = النباتات' }, position: { x: '50%', y: '90%' }, delay: 2.5 },
      ],
      soundEffects: ['أشعة شمس 🌞', 'نمو نبات 🌱', 'تركيب ضوئي ✨'],
      educationalHighlight: 'المنتجون: النباتات التي تصنع غذاءها بنفسها من الشمس والماء',
      transition: 'slide',
    },
    {
      id: 'scene-3-consumers',
      title: 'المشهد 3: المستهلكون - سلسلة الحياة',
      background: 'forest',
      duration: 14,
      narratorText: 'الحيوانات هي المستهلكون! 🐰 الأرنب يأكل العشب، ثم يأتي الثعلب ويأكل الأرنب، والبومة تصطاد الفئران. كل حيوان يعتمد على آخر!',
      elements: [
        { id: 'grass-food', type: 'plant', props: { type: 'grass', size: 'medium' }, position: { x: '15%', y: '85%' }, delay: 0 },
        { id: 'rabbit-eat', type: 'animal', props: { type: 'rabbit', size: 'medium' }, position: { x: '30%', y: '75%' }, delay: 0.5 },
        { id: 'arrow-1', type: 'arrow', props: { direction: 'left', color: '#22c55e' }, position: { x: '22%', y: '80%' }, delay: 0.8 },
        { id: 'fox', type: 'emoji', props: { emoji: '🦊', size: 50 }, position: { x: '55%', y: '70%' }, delay: 1.2 },
        { id: 'arrow-2', type: 'arrow', props: { direction: 'left', color: '#ef4444' }, position: { x: '42%', y: '72%' }, delay: 1.5 },
        { id: 'owl', type: 'emoji', props: { emoji: '🦉', size: 45 }, position: { x: '80%', y: '50%' }, delay: 2 },
        { id: 'mouse', type: 'emoji', props: { emoji: '🐭', size: 30 }, position: { x: '70%', y: '80%' }, delay: 2.3 },
        { id: 'label', type: 'text', props: { text: 'نبات ← عاشب ← لاحم' }, position: { x: '50%', y: '92%' }, delay: 3 },
      ],
      soundEffects: ['أرنب يقفز 🐰', 'ثعلب يجري 🦊', 'بومة تنادي 🦉'],
      educationalHighlight: 'المستهلكون: حيوانات تتغذى على غيرها (عاشبة ولاحمة)',
      transition: 'slide',
    },
    {
      id: 'scene-4-decomposers',
      title: 'المشهد 4: المحللون - عمال النظافة',
      background: 'forest',
      duration: 12,
      narratorText: 'لكن من ينظف الغابة؟ 🪱 الديدان والفطريات والبكتيريا تحلل الكائنات الميتة وتعيدها للتربة كغذاء للنباتات. دورة لا تنتهي!',
      elements: [
        { id: 'dead-leaf', type: 'emoji', props: { emoji: '🍂', size: 40 }, position: { x: '25%', y: '75%' }, delay: 0 },
        { id: 'worm', type: 'emoji', props: { emoji: '🪱', size: 35 }, position: { x: '35%', y: '85%' }, delay: 0.5 },
        { id: 'mushroom', type: 'emoji', props: { emoji: '🍄', size: 40 }, position: { x: '55%', y: '80%' }, delay: 0.8 },
        { id: 'soil', type: 'soil', props: { size: 'large' }, position: { x: '50%', y: '90%' }, delay: 1 },
        { id: 'arrow-cycle', type: 'arrow', props: { direction: 'up', color: '#8b5cf6', label: 'غذاء للتربة' }, position: { x: '70%', y: '70%' }, delay: 1.5 },
        { id: 'new-plant', type: 'plant', props: { type: 'flower', size: 'small' }, position: { x: '80%', y: '75%' }, delay: 2 },
        { id: 'cycle-icon', type: 'emoji', props: { emoji: '🔄', size: 50 }, position: { x: '50%', y: '50%' }, delay: 2.5 },
      ],
      soundEffects: ['تربة رطبة 🌍', 'ديدان تعمل 🪱', 'نمو جديد 🌱'],
      educationalHighlight: 'المحللون: كائنات تفكك المواد الميتة وتعيد المغذيات للتربة',
      transition: 'slide',
    },
    {
      id: 'scene-5-balance',
      title: 'المشهد 5: التوازن الكامل',
      background: 'park',
      duration: 14,
      narratorText: 'عندما يعمل الجميع معاً - المنتجون والمستهلكون والمحللون - تزدهر الحياة! ⚖️ هذا هو التوازن البيئي: كل عنصر له دور مهم لا يمكن الاستغناء عنه.',
      elements: [
        { id: 'sun-balance', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '85%', y: '15%' }, delay: 0 },
        { id: 'tree-balance', type: 'plant', props: { type: 'tree', size: 'large' }, position: { x: '20%', y: '55%' }, delay: 0.3 },
        { id: 'flowers', type: 'plant', props: { type: 'flower', size: 'medium' }, position: { x: '45%', y: '80%' }, delay: 0.5 },
        { id: 'rabbit-b', type: 'animal', props: { type: 'rabbit', size: 'small' }, position: { x: '35%', y: '75%' }, delay: 0.8 },
        { id: 'bird-b', type: 'animal', props: { type: 'bird', size: 'small', moving: true }, position: { x: '60%', y: '45%' }, delay: 1 },
        { id: 'butterfly', type: 'animal', props: { type: 'butterfly', size: 'small', moving: true }, position: { x: '50%', y: '60%' }, delay: 1.3 },
        { id: 'water', type: 'water', props: { type: 'river', size: 'medium' }, position: { x: '75%', y: '85%' }, delay: 1.5 },
        { id: 'rainbow', type: 'emoji', props: { emoji: '🌈', size: 60 }, position: { x: '50%', y: '30%' }, delay: 2 },
        { id: 'balance-text', type: 'text', props: { text: 'التوازن = الحياة ⚖️🌍' }, position: { x: '50%', y: '92%' }, delay: 2.5 },
      ],
      soundEffects: ['طبيعة هادئة 🎶', 'ماء يجري 💧', 'طيور سعيدة 🐦'],
      educationalHighlight: 'التوازن البيئي ضروري لاستمرار الحياة على الأرض',
      transition: 'zoom',
    },
  ],
  finalMessage: 'أحسنت! أنت الآن تفهم كيف تعمل الطبيعة بتناغم. كل كائن له دور! ⚖️🌿',
};

// ============== COURSE DATA ==============
export const ecoBalanceGrade5: Course = {
  id: 'eco-balance-5',
  title: 'التوازن البيئي',
  grade: 5,
  icon: '⚖️',
  color: 'bg-emerald-100',
  badge: { name: 'حارس التوازن', icon: '⚖️' },
  rewardMessages: {
    student: 'أنت الآن تفهم سر التوازن في الطبيعة!',
    parent: 'طفلك تعلم مفاهيم التوازن البيئي بعمق',
    universalGoldBadge: { name: 'بطل التوازن', icon: '🏆' },
  },
  videoConcept: {
    title: 'رحلة التوازن في الغابة السحرية',
    scenario: 'كيف تعيش الكائنات معاً في سلام وتوازن؟',
    moralMessage: 'كل كائن له دور مهم!',
  },
  animatedVideo: ecoBalanceVideo,
  videoUrl: '/videos/5eme-3.mp4',
  videoStoryboard: {
    title: 'رحلة التوازن في الغابة السحرية',
    scenes: 'مقدمة ← المنتجون ← المستهلكون ← المحللون ← التوازن الكامل',
    narratorText: 'مرحباً يا أصدقاء! اليوم سنكتشف سر الغابة السحرية...',
    soundEffects: ['طيور 🐦', 'ماء 💧', 'رياح 🍃']
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1_balance',
      type: 'matching',
      title: 'اربط كل كائن بدوره في النظام البيئي',
      points: 20,
      prompt: 'اسحب كل كائن نحو دوره الصحيح في الطبيعة 🌿🐰🦉',
      pairs: [
        { left: 'النباتات 🌱', right: 'المنتجون - تصنع الغذاء' },
        { left: 'الأرنب 🐰', right: 'مستهلك أول - يأكل النبات' },
        { left: 'الثعلب 🦊', right: 'مستهلك ثاني - يأكل العاشبات' },
        { left: 'الديدان 🪱', right: 'المحللون - تفكك الكائنات الميتة' },
      ],
      successMessage: 'ممتاز! كل كائن له دور مهم في سلسلة الحياة ⚖️🌍',
      errorMessage: 'حاول مرة أخرى! تذكر: المنتجون ← المستهلكون ← المحللون',
      rewardBadge: { name: 'عالم البيئة الصغير', icon: '🔬' },
    },
    {
      id: 'ex2_balance',
      type: 'mcq-set',
      title: 'أسئلة عن التوازن البيئي',
      points: 25,
      prompt: 'اختر الإجابة الصحيحة لكل سؤال',
      questions: [
        {
          id: 'q1',
          question: 'ماذا يحدث إذا اختفت كل النباتات من الغابة؟',
          options: ['لا شيء يتغير', 'تموت كل الحيوانات العاشبة', 'تزيد أعداد الحيوانات'],
          correct: 'تموت كل الحيوانات العاشبة',
        },
        {
          id: 'q2',
          question: 'من يقوم بتنظيف الغابة من الكائنات الميتة؟',
          options: ['الأسد 🦁', 'المحللون (ديدان وفطريات) 🪱', 'الطيور 🐦'],
          correct: 'المحللون (ديدان وفطريات) 🪱',
        },
        {
          id: 'q3',
          question: 'التوازن البيئي يعني:',
          options: ['أن تكون أعداد الحيوانات متساوية تماماً', 'تناغم وانسجام بين جميع الكائنات', 'غياب المفترسات'],
          correct: 'تناغم وانسجام بين جميع الكائنات',
        },
      ],
      successMessage: 'أحسنت! أنت تفهم أسرار التوازن البيئي 🌟',
      errorMessage: 'لا بأس! شاهد الفيديو مرة أخرى وستفهم',
      rewardBadge: { name: 'خبير التوازن', icon: '⚖️' },
    },
    {
      id: 'ex3_balance',
      type: 'scenario',
      title: 'موقف بيئي: الغابة في خطر!',
      points: 30,
      prompt: 'اختر التصرف الأفضل لحماية التوازن',
      scenario: 'لاحظت أن الفئران كثُرت جداً في الحقل وبدأت تأكل كل المحاصيل. ماذا تفعل؟',
      options: [
        'نقتل كل الفئران بالسم',
        'نحمي البوم والثعابين التي تصطاد الفئران طبيعياً',
        'نترك الأمر كما هو',
      ],
      correct: 'نحمي البوم والثعابين التي تصطاد الفئران طبيعياً',
      successMessage: 'ذكي جداً! الحل الطبيعي أفضل من الكيماويات 🦉🌿',
      errorMessage: 'فكر في الحل الطبيعي: المفترسات تضبط أعداد الفرائس',
      rewardBadge: { name: 'حكيم الطبيعة', icon: '🦉' },
    },
  ],
  games: [
    // 🎮 GAME 1: "ميزان الحياة" (Balance of Life)
    {
      id: 'g1',
      type: 'balance-of-life',
      title: 'ميزان الحياة',
      description: 'التحكم في عناصر النظام البيئي! أضف أو أزل النباتات والحيوانات والماء للحفاظ على التوازن ⚖️🌿💧',
      points: 40,
      gameData: {
        rounds: 3,
      },
    },

    // 🎮 GAME 2: "السلسلة المنكسرة"
    {
      id: 'g2',
      type: 'broken-chain',
      title: 'السلسلة المنكسرة',
      description: 'سلسلة غذائية ناقصة! حدد ما ينقص وماذا يحدث إذا اختفى عنصر 💔🔗',
      points: 45,
      gameData: {
        scenarios: [
          {
            id: 's1',
            chain: [
              { id: 'grass', label: 'العشب', icon: '🌿', type: 'producer', present: false },
              { id: 'rabbit', label: 'الأرنب', icon: '🐰', type: 'consumer1', present: true },
              { id: 'fox', label: 'الثعلب', icon: '🦊', type: 'consumer2', present: true },
              { id: 'bacteria', label: 'البكتيريا', icon: '🦠', type: 'decomposer', present: true },
            ],
            missingElement: 'grass',
            question: 'ماذا ينقص في هذه السلسلة الغذائية؟',
            consequences: [
              'الأرنب لا يجد غذاء',
              'الأرنب يموت جوعاً',
              'الثعلب لا يجد غذاء',
              'الثعلب يموت جوعاً',
              'النظام البيئي ينهار',
            ],
          },
          {
            id: 's2',
            chain: [
              { id: 'algae', label: 'الطحالب', icon: '🌊', type: 'producer', present: true },
              { id: 'fish', label: 'الأسماك', icon: '🐟', type: 'consumer1', present: true },
              { id: 'shark', label: 'القرش', icon: '🦈', type: 'consumer2', present: true },
              { id: 'bacteria', label: 'البكتيريا', icon: '🦠', type: 'decomposer', present: false },
            ],
            missingElement: 'bacteria',
            question: 'ماذا يحدث إذا اختفى المفكك؟',
            consequences: [
              'الجثث تتراكم',
              'المواد العضوية لا تتحلل',
              'التربة لا تحصل على غذاء',
              'النباتات لا تنمو',
              'النظام البيئي يختل',
            ],
          },
          {
            id: 's3',
            chain: [
              { id: 'tree', label: 'الشجرة', icon: '🌳', type: 'producer', present: true },
              { id: 'bird', label: 'الطائر', icon: '🐦', type: 'consumer1', present: false },
              { id: 'snake', label: 'الأفعى', icon: '🐍', type: 'consumer2', present: true },
              { id: 'bacteria', label: 'البكتيريا', icon: '🦠', type: 'decomposer', present: true },
            ],
            missingElement: 'bird',
            question: 'ماذا يحدث إذا اختفى المستهلك الأول؟',
            consequences: [
              'الأفعى لا تجد غذاء',
              'الأفعى تموت جوعاً',
              'البكتيريا لا تجد جثث',
              'النظام البيئي يختل',
            ],
          },
        ],
      },
    },

    // 🎮 GAME 3: "أنقذ النظام خلال 30 ثانية"
    {
      id: 'g3',
      type: 'save-ecosystem',
      title: 'أنقذ النظام خلال 30 ثانية',
      description: 'عدّ تنازلي! مشاكل تظهر عشوائياً. اختر الحل الصحيح بسرعة لإنقاذ النظام البيئي ⏰🚨',
      points: 50,
      gameData: {
        problems: [
          {
            id: 'pollution',
            label: 'تلوث',
            icon: '💨',
            description: 'مياه ملوثة تهدد الكائنات المائية',
            solutions: [
              { id: 'clean', label: 'تنظيف المياه', icon: '🧹', correct: true },
              { id: 'ignore', label: 'عدم التدخل', icon: '😐', correct: false },
              { id: 'add-chemicals', label: 'إضافة مواد كيميائية', icon: '☠️', correct: false },
            ],
          },
          {
            id: 'drought',
            label: 'جفاف',
            icon: '🏜️',
            description: 'نقص شديد في المياه',
            solutions: [
              { id: 'irrigate', label: 'ري النباتات', icon: '💧', correct: true },
              { id: 'cut-trees', label: 'قطع الأشجار', icon: '🪓', correct: false },
              { id: 'wait', label: 'انتظار المطر', icon: '⏳', correct: false },
            ],
          },
          {
            id: 'overhunting',
            label: 'صيد جائر',
            icon: '🏹',
            description: 'صيد مفرط يهدد الحيوانات',
            solutions: [
              { id: 'protect', label: 'حماية الحيوانات', icon: '🛡️', correct: true },
              { id: 'hunt-more', label: 'الصيد أكثر', icon: '🎯', correct: false },
              { id: 'ignore', label: 'عدم التدخل', icon: '😐', correct: false },
            ],
          },
          {
            id: 'deforestation',
            label: 'قطع الأشجار',
            icon: '🪓',
            description: 'قطع مفرط للأشجار',
            solutions: [
              { id: 'replant', label: 'إعادة التشجير', icon: '🌱', correct: true },
              { id: 'cut-more', label: 'قطع المزيد', icon: '🪓', correct: false },
              { id: 'ignore', label: 'عدم التدخل', icon: '😐', correct: false },
            ],
          },
          {
            id: 'waste',
            label: 'نفايات',
            icon: '🗑️',
            description: 'تراكم النفايات في البيئة',
            solutions: [
              { id: 'recycle', label: 'إعادة التدوير', icon: '♻️', correct: true },
              { id: 'burn', label: 'حرق النفايات', icon: '🔥', correct: false },
              { id: 'dump', label: 'رمي المزيد', icon: '🗑️', correct: false },
            ],
          },
        ],
      },
    },
  ],
};
