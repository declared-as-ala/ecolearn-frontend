import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA ==============
export const foodRelationshipsVideo: AnimatedVideoData = {
  title: 'رحلة الطاقة في الغذاء',
  totalDuration: 60,
  scenes: [
    {
      id: 'scene-1-intro',
      title: 'المشهد 1: بداية الرحلة - الشمس مصدر الطاقة',
      background: 'sky',
      duration: 10,
      narratorText: 'مرحباً يا أصدقاء! 🌿 اليوم سنكتشف كيف تنتقل الطاقة من الشمس إلى النباتات، ومن ثم إلى الحيوانات والإنسان. كل كائن حي يعتمد على الآخر… لنبدأ مغامرتنا!',
      elements: [
        { id: 'sun-1', type: 'sun', props: { size: 'large', glowing: true }, position: { x: '50%', y: '25%' }, delay: 0 },
        { id: 'cloud-1', type: 'cloud', props: { size: 'medium' }, position: { x: '20%', y: '20%' }, delay: 0.5 },
        { id: 'cloud-2', type: 'cloud', props: { size: 'small' }, position: { x: '80%', y: '30%' }, delay: 0.7 },
        { id: 'text-energy', type: 'text', props: { text: 'الطاقة الشمسية ☀️' }, position: { x: '50%', y: '55%' }, delay: 1 },
        { id: 'arrow-down', type: 'arrow', props: { direction: 'down', color: '#fbbf24', label: 'طاقة' }, position: { x: '50%', y: '70%' }, delay: 1.5 },
      ],
      soundEffects: ['أشعة شمس ساطعة 🌞', 'رياح خفيفة 🌬️'],
      educationalHighlight: 'الشمس هي مصدر الطاقة الأساسي لجميع الكائنات الحية على الأرض',
      transition: 'fade',
    },
    {
      id: 'scene-2-producers',
      title: 'المشهد 2: المنتجون - النباتات تصنع الغذاء',
      background: 'forest',
      duration: 12,
      narratorText: 'انظروا! النباتات الخضراء تستخدم طاقة الشمس لتصنع غذاءها بنفسها. نسميها "المنتجون" لأنها تنتج الغذاء من ضوء الشمس والماء والهواء. إنها مثل مصانع الطعام الطبيعية! 🌱',
      elements: [
        { id: 'sun-2', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '85%', y: '15%' }, delay: 0 },
        { id: 'tree-1', type: 'plant', props: { type: 'tree', size: 'large' }, position: { x: '25%', y: '60%' }, delay: 0.3 },
        { id: 'tree-2', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '75%', y: '55%' }, delay: 0.5 },
        { id: 'flower-1', type: 'plant', props: { type: 'flower', size: 'small' }, position: { x: '40%', y: '80%' }, delay: 0.7 },
        { id: 'grass-1', type: 'plant', props: { type: 'grass', size: 'medium' }, position: { x: '60%', y: '85%' }, delay: 0.9 },
        { id: 'water-1', type: 'water', props: { type: 'droplet', size: 'small' }, position: { x: '30%', y: '70%' }, delay: 1.2 },
        { id: 'arrow-energy-1', type: 'arrow', props: { direction: 'down', color: '#22c55e', size: 'small' }, position: { x: '50%', y: '35%' }, delay: 1.5 },
        { id: 'label-producer', type: 'text', props: { text: '🌿 المنتجون' }, position: { x: '50%', y: '90%' }, delay: 2 },
      ],
      soundEffects: ['أوراق تتحرك 🍃', 'ماء يتدفق 💧', 'طيور تغرد 🐦'],
      educationalHighlight: 'النباتات = المنتجون: تصنع غذاءها من ضوء الشمس (التركيب الضوئي)',
      transition: 'slide',
    },
    {
      id: 'scene-3-herbivores',
      title: 'المشهد 3: آكلات الأعشاب - العواشب',
      background: 'farm',
      duration: 12,
      narratorText: 'والآن نرى الحيوانات التي تأكل النباتات! الأرانب والفئران والغزلان تتغذى على النباتات. نسميها "المستهلكات الأولى" أو "العواشب". انظروا كيف ينتقل الغذاء من النبات إلى الأرنب! 🐰',
      elements: [
        { id: 'plant-bg-1', type: 'plant', props: { type: 'grass', size: 'medium' }, position: { x: '20%', y: '85%' }, delay: 0 },
        { id: 'plant-bg-2', type: 'plant', props: { type: 'flower', size: 'small' }, position: { x: '80%', y: '80%' }, delay: 0.2 },
        { id: 'rabbit-1', type: 'animal', props: { type: 'rabbit', size: 'large', moving: true }, position: { x: '40%', y: '70%' }, delay: 0.5 },
        { id: 'mouse-1', type: 'animal', props: { type: 'mouse', size: 'medium', moving: true }, position: { x: '65%', y: '75%' }, delay: 0.8 },
        { id: 'deer-1', type: 'animal', props: { type: 'deer', size: 'large', moving: true }, position: { x: '85%', y: '60%' }, delay: 1 },
        { id: 'butterfly-1', type: 'animal', props: { type: 'butterfly', size: 'small', moving: true }, position: { x: '30%', y: '40%' }, delay: 1.3 },
        { id: 'flow-1', type: 'energy-flow', props: { from: '🌿', to: '🐰' }, position: { x: '50%', y: '50%' }, delay: 1.5 },
        { id: 'label-herbivore', type: 'text', props: { text: '🐰 العواشب (آكلات الأعشاب)' }, position: { x: '50%', y: '90%' }, delay: 2 },
      ],
      soundEffects: ['أرنب يقضم 🥕', 'حيوانات تتحرك 🐾', 'فراشات ترفرف 🦋'],
      educationalHighlight: 'العواشب = المستهلكات الأولى: تأكل النباتات وتحصل على الطاقة منها',
      transition: 'slide',
    },
    {
      id: 'scene-4-carnivores',
      title: 'المشهد 4: آكلات اللحوم - اللواحم',
      background: 'forest',
      duration: 12,
      narratorText: 'وهنا تأتي الحيوانات المفترسة! الثعلب يصطاد الأرنب، والأسد يصطاد الغزال. نسميها "المستهلكات الثانية" أو "اللواحم". الطاقة تنتقل من العواشب إلى اللواحم! 🦁',
      elements: [
        { id: 'rabbit-prey', type: 'animal', props: { type: 'rabbit', size: 'medium', moving: true, direction: 'left' }, position: { x: '30%', y: '70%' }, delay: 0 },
        { id: 'fox-1', type: 'animal', props: { type: 'fox', size: 'large', moving: true }, position: { x: '55%', y: '65%' }, delay: 0.5 },
        { id: 'lion-1', type: 'animal', props: { type: 'lion', size: 'large', moving: true }, position: { x: '80%', y: '60%' }, delay: 1 },
        { id: 'owl-1', type: 'animal', props: { type: 'owl', size: 'medium' }, position: { x: '20%', y: '35%' }, delay: 1.2 },
        { id: 'flow-2', type: 'energy-flow', props: { from: '🐰', to: '🦊' }, position: { x: '45%', y: '45%' }, delay: 1.5 },
        { id: 'flow-3', type: 'energy-flow', props: { from: '🦊', to: '🦁' }, position: { x: '70%', y: '40%' }, delay: 2 },
        { id: 'label-carnivore', type: 'text', props: { text: '🦁 اللواحم (آكلات اللحوم)' }, position: { x: '50%', y: '90%' }, delay: 2.5 },
      ],
      soundEffects: ['زئير أسد 🦁', 'ثعلب يجري 🦊', 'بومة تنادي 🦉'],
      educationalHighlight: 'اللواحم = المستهلكات الثانية: تصطاد العواشب وتأكلها للحصول على الطاقة',
      transition: 'slide',
    },
    {
      id: 'scene-5-decomposers',
      title: 'المشهد 5: المحللات - عمال التنظيف',
      background: 'forest',
      duration: 10,
      narratorText: 'وأخيراً، عندما تموت الكائنات الحية، تأتي المحللات! البكتيريا والفطريات والديدان تحلل الجثث وتعيد المواد الغذائية إلى التربة. هكذا تستمر دورة الحياة! 🪱',
      elements: [
        { id: 'soil-1', type: 'soil', props: { size: 'large', withWorms: true }, position: { x: '50%', y: '80%' }, delay: 0 },
        { id: 'worm-1', type: 'animal', props: { type: 'worm', size: 'medium', moving: true }, position: { x: '35%', y: '75%' }, delay: 0.5 },
        { id: 'bacteria-1', type: 'animal', props: { type: 'bacteria', size: 'small' }, position: { x: '55%', y: '70%' }, delay: 0.8 },
        { id: 'bacteria-2', type: 'animal', props: { type: 'bacteria', size: 'small' }, position: { x: '65%', y: '72%' }, delay: 1 },
        { id: 'emoji-mushroom', type: 'emoji', props: { emoji: '🍄', size: 40 }, position: { x: '75%', y: '68%' }, delay: 1.2 },
        { id: 'arrow-cycle', type: 'arrow', props: { direction: 'up', color: '#8b4513', label: 'مواد غذائية' }, position: { x: '50%', y: '55%' }, delay: 1.5 },
        { id: 'label-decomposer', type: 'text', props: { text: '🦠 المحللات' }, position: { x: '50%', y: '90%' }, delay: 2 },
      ],
      soundEffects: ['تربة رطبة 🌍', 'حشرات صغيرة 🐛'],
      educationalHighlight: 'المحللات = البكتيريا والفطريات: تحلل الكائنات الميتة وتعيد المواد للتربة',
      transition: 'fade',
    },
    {
      id: 'scene-6-food-chain',
      title: 'المشهد 6: السلسلة الغذائية الكاملة',
      background: 'park',
      duration: 14,
      narratorText: 'والآن لنرى السلسلة الغذائية كاملة! الشمس ← النباتات (المنتجون) ← العواشب ← اللواحم ← المحللات ← التربة ← النباتات مرة أخرى. إنها دورة مستمرة لا تنتهي! 🔄',
      elements: [
        { id: 'sun-chain', type: 'sun', props: { size: 'small', glowing: true }, position: { x: '10%', y: '20%' }, delay: 0 },
        { id: 'arrow-1', type: 'arrow', props: { direction: 'right', color: '#fbbf24', size: 'small' }, position: { x: '18%', y: '20%' }, delay: 0.3 },
        { id: 'plant-chain', type: 'emoji', props: { emoji: '🌿', size: 45 }, position: { x: '28%', y: '20%' }, delay: 0.5 },
        { id: 'arrow-2', type: 'arrow', props: { direction: 'right', color: '#22c55e', size: 'small' }, position: { x: '38%', y: '20%' }, delay: 0.8 },
        { id: 'rabbit-chain', type: 'emoji', props: { emoji: '🐰', size: 45 }, position: { x: '48%', y: '20%' }, delay: 1 },
        { id: 'arrow-3', type: 'arrow', props: { direction: 'right', color: '#ef4444', size: 'small' }, position: { x: '58%', y: '20%' }, delay: 1.3 },
        { id: 'fox-chain', type: 'emoji', props: { emoji: '🦊', size: 45 }, position: { x: '68%', y: '20%' }, delay: 1.5 },
        { id: 'arrow-4', type: 'arrow', props: { direction: 'right', color: '#ef4444', size: 'small' }, position: { x: '78%', y: '20%' }, delay: 1.8 },
        { id: 'lion-chain', type: 'emoji', props: { emoji: '🦁', size: 45 }, position: { x: '88%', y: '20%' }, delay: 2 },
        { id: 'decomposer-chain', type: 'emoji', props: { emoji: '🦠', size: 40 }, position: { x: '50%', y: '50%' }, delay: 2.5 },
        { id: 'soil-chain', type: 'emoji', props: { emoji: '🌍', size: 40 }, position: { x: '50%', y: '70%' }, delay: 2.8 },
        { id: 'cycle-arrow', type: 'emoji', props: { emoji: '🔄', size: 50 }, position: { x: '50%', y: '85%' }, delay: 3 },
        { id: 'label-chain', type: 'text', props: { text: 'السلسلة الغذائية 🔗' }, position: { x: '50%', y: '90%' }, delay: 3.5 },
      ],
      soundEffects: ['موسيقى هادئة 🎶', 'طبيعة متناغمة 🌿'],
      educationalHighlight: 'السلسلة الغذائية: شمس ← منتج ← عاشب ← لاحم ← محلل ← تربة ← منتج (دورة مستمرة)',
      transition: 'zoom',
    },
  ],
  finalMessage: 'أحسنت! لقد تعلمت كيف تنتقل الطاقة في السلسلة الغذائية. كل كائن حي مهم في هذه الشبكة العظيمة! 🌍',
};

// ============== COURSE DATA ==============
export const foodRelationshipsGrade5: Course = {
  id: 'food-relationships-5',
  title: 'العلاقات الغذائية',
  grade: 5,
  icon: '🍃',
  color: 'bg-emerald-100',
  badge: { name: 'مهندس السلسلة الغذائية', icon: '🌍' },
  rewardMessages: {
    student: 'أنت لم تلعب فقط… بل أنقذت كل كائن وحافظت على التوازن البيئي!',
    parent: 'ولدك أصبح فاعلاً حقيقيًا في حماية الطبيعة! 🌱',
    universalGoldBadge: { name: 'البطل الشامل للبيئة', icon: '🌍' },
  },
  videoConcept: {
    title: 'رحلة الطاقة في الغذاء',
    scenario: 'مرحباً يا أصدقاء! 🌿 اليوم سنكتشف كيف تنتقل الطاقة من الشمس إلى النباتات، ومن ثم إلى الحيوانات والإنسان. كل كائن حي يعتمد على الآخر… لنبدأ مغامرتنا!',
    moralMessage: 'كل كائن حي يعتمد على الآخر… لنحافظ على هذه الروابط الغذائية!',
  },
  // Link to animated video
  animatedVideo: foodRelationshipsVideo,
  // Legacy storyboard for fallback
  videoStoryboard: {
    title: 'رحلة الطاقة في الغذاء',
    scenes: 'الشمس تشرق → النباتات تنمو → الأرانب تأكل النباتات → الثعالب تصطاد الأرانب → المحللات تحلل الجثث → المواد تعود للتربة',
    narratorText: 'مرحباً يا أصدقاء! 🌿 اليوم سنكتشف كيف تنتقل الطاقة من الشمس إلى النباتات، ومن ثم إلى الحيوانات والإنسان.',
    soundEffects: ['أشعة شمس 🌞', 'ماء 💧', 'طيور 🐦', 'حيوانات 🐭🦁', 'تدفق الطاقة 🔄'],
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1',
      type: 'drag-sequence',
      title: 'رتّب السلسلة الغذائية',
      points: 25,
      prompt: 'اسحب العناصر ورتّبها من المنتِج إلى اللاحم لتكوين سلسلة غذائية صحيحة 🌿🐰🦊',
      items: [
        { id: 'p', label: 'نبات (منتِج)', emoji: '🌿' },
        { id: 'h', label: 'أرنب (عاشب)', emoji: '🐰' },
        { id: 'c', label: 'ثعلب (لاحم)', emoji: '🦊' },
      ],
      correctOrder: ['p', 'h', 'c'],
      successMessage: 'ممتاز! أنت تعرف ترتيب السلسلة الغذائية 🌿',
      errorMessage: 'حاول مجدداً! الطاقة تنتقل من النبات للعاشب ثم للاحم 🌞',
      rewardBadge: { name: 'حامي الطاقة', icon: '🌱' },
    },
    {
      id: 'ex2',
      type: 'mcq-set',
      title: 'أدوار الكائنات الحية',
      points: 20,
      prompt: 'أجب عن الأسئلة التالية لفهم دور كل كائن في السلسلة الغذائية 🍃',
      questions: [
        {
          id: 'q1',
          question: 'من هو المنتِج في الوسط البيئي؟',
          options: ['🌿 النباتات الخضراء', '🐰 الأرنب', '🦁 الأسد'],
          correct: '🌿 النباتات الخضراء',
        },
        {
          id: 'q2',
          question: 'ماذا نسمي الحيوانات التي تأكل النباتات فقط؟',
          options: ['🐰 العواشب', '🦊 اللواحم', '🦠 المحللات'],
          correct: '🐰 العواشب',
        },
        {
          id: 'q3',
          question: 'ما دور البكتيريا والفطريات في السلسلة الغذائية؟',
          options: ['🦠 تحليل الكائنات الميتة', '🌿 إنتاج الغذاء', '🦁 صيد الفرائس'],
          correct: '🦠 تحليل الكائنات الميتة',
        },
      ],
      successMessage: 'رائع! فهمت العلاقة بين الكائنات 🍃',
      errorMessage: 'راجع الفيديو وفكر في دور كل كائن 🌍',
      rewardBadge: { name: 'خبير الأدوار الغذائية', icon: '🍃' },
    },
    {
      id: 'ex3',
      type: 'scenario',
      title: 'حماية غذاء الحيوانات',
      points: 20,
      prompt: 'اختر التصرف الصحيح في هذا الموقف السلوكي 🍎',
      scenario: 'وجدت نفايات بالقرب من طعام الحيوانات في الحديقة. ماذا تفعل؟',
      options: [
        'أجمع النفايات وأضعها في سلة المهملات وأحذر الآخرين 🗑️✅',
        'أتركها كما هي لأن الأمر ليس مسؤوليتي',
        'أبتعد عن المكان دون فعل شيء',
      ],
      correct: 'أجمع النفايات وأضعها في سلة المهملات وأحذر الآخرين 🗑️✅',
      successMessage: 'أحسنت! كل تصرف إيجابي يحمي غذاء الكائنات الحية 🍎',
      errorMessage: 'فكر مجدداً… حماية غذاء الحيوانات مسؤولية الجميع 🌿',
      rewardBadge: { name: 'حامي الغذاء', icon: '🛡️' },
    },
  ],
  games: [
    {
      id: 'g1',
      type: 'dragdrop',
      title: 'سباق السلسلة الغذائية',
      description: 'حرّك الكائنات الحية إلى أماكنها الصحيحة لتكوين سلاسل غذائية متوازنة 🌿🐰🦊',
      points: 35,
      gameData: {
        items: [
          { id: 'i1', label: '🌿 نبات', category: 'منتِج' },
          { id: 'i2', label: '🐰 أرنب', category: 'عاشب' },
          { id: 'i3', label: '🦊 ثعلب', category: 'لاحم' },
          { id: 'i4', label: '🌱 عشب', category: 'منتِج' },
          { id: 'i5', label: '🐭 فأر', category: 'عاشب' },
          { id: 'i6', label: '🦁 أسد', category: 'لاحم' },
        ],
        categories: ['منتِج', 'عاشب', 'لاحم'],
        rewardBadgeName: 'بطل السلاسل الغذائية 🏆',
      },
    },
    {
      id: 'g2',
      type: 'flow',
      title: 'مهمة مراقبة الطاقة',
      description: 'تتبع تدفق الطاقة في كل مرحلة واضغط على الترتيب الصحيح لمشاهدة الطاقة تنتقل 🔄',
      points: 30,
      gameData: {
        stages: [
          { id: 'sun', label: 'الشمس', icon: '🌞', energy: 100 },
          { id: 'plant', label: 'النبات', icon: '🌿', energy: 60 },
          { id: 'herb', label: 'العاشب', icon: '🐰', energy: 25 },
          { id: 'carn', label: 'اللاحم', icon: '🦊', energy: 10 },
          { id: 'decomp', label: 'المحلل', icon: '🦠', energy: 5 },
        ],
        correctOrder: ['sun', 'plant', 'herb', 'carn', 'decomp'],
        lossIcon: '💨',
        rewardBadgeName: 'مراقب الطاقة 🔋',
      },
    },
    {
      id: 'g3',
      type: 'construction',
      title: 'بناء النظام الغذائي',
      description: 'اختر وضع المنتجين والعواشب واللواحم لبناء نظام غذائي متوازن ومستقر 🌍',
      points: 35,
      gameData: {
        availableElements: [
          { id: 'e1', name: 'نبات أخضر', type: 'producer', icon: '🌿' },
          { id: 'e2', name: 'شجرة', type: 'producer', icon: '🌳' },
          { id: 'e3', name: 'أرنب', type: 'consumer', icon: '🐰' },
          { id: 'e4', name: 'فأر', type: 'consumer', icon: '🐭' },
          { id: 'e5', name: 'ثعلب', type: 'consumer', icon: '🦊' },
          { id: 'e6', name: 'أسد', type: 'consumer', icon: '🦁' },
          { id: 'e7', name: 'بكتيريا', type: 'decomposer', icon: '🦠' },
          { id: 'e8', name: 'شمس', type: 'sun', icon: '🌞' },
          { id: 'e9', name: 'ماء', type: 'water', icon: '💧' },
          { id: 'e10', name: 'تربة', type: 'soil', icon: '🌍' },
        ],
        constraints: { minProducers: 2, minConsumers: 2, minDecomposers: 1 },
        rewardBadgeName: 'مهندس السلسلة الغذائية 🌍',
      },
    },
  ],
};
