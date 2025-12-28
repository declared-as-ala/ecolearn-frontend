import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA ==============
export const foodRelationshipsVideo: AnimatedVideoData = {
  title: 'السلسلة الغذائية وحماية توازن الوسط البيئي',
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
  title: 'السلسلة الغذائية وحماية توازن الوسط البيئي',
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
      id: 'ex1_1',
      type: 'drag-sequence',
      title: 'ترتيب السلسلة الغذائية (1)',
      points: 10,
      prompt: 'رتب الكائنات لتكوين سلسلة غذائية صحيحة 🌿🐀🦉🦅',
      items: [
        { id: 'plant', label: 'نبات', emoji: '🌿' },
        { id: 'mouse', label: 'فأر', emoji: '🐀' },
        { id: 'owl', label: 'بوم', emoji: '🦉' },
        { id: 'hawk', label: 'صقر', emoji: '🦅' },
      ],
      correctOrder: ['plant', 'mouse', 'owl', 'hawk'],
      successMessage: 'ممتاز! أنت حامي التوازن البيئي لكل سلسلة 🌿',
      errorMessage: 'حاول مجددًا 🌱',
      rewardBadge: { name: 'حامي السلسلة 1', icon: '🥇' },
    },
    {
      id: 'ex1_2',
      type: 'drag-sequence',
      title: 'ترتيب السلسلة الغذائية (2)',
      points: 10,
      prompt: 'رتب الكائنات لتكوين سلسلة غذائية صحيحة 🌸🐝🐦🐱',
      items: [
        { id: 'flower', label: 'زهرة', emoji: '🌸' },
        { id: 'bee', label: 'نحلة', emoji: '🐝' },
        { id: 'bird', label: 'طائر', emoji: '🐦' },
        { id: 'cat', label: 'قط', emoji: '🐱' },
      ],
      correctOrder: ['flower', 'bee', 'bird', 'cat'],
      successMessage: 'ممتاز! أنت حامي التوازن البيئي لكل سلسلة 🌿',
      errorMessage: 'حاول مجددًا 🌱',
      rewardBadge: { name: 'حامي السلسلة 2', icon: '🥈' },
    },
    {
      id: 'ex1_3',
      type: 'drag-sequence',
      title: 'ترتيب السلسلة الغذائية (3)',
      points: 10,
      prompt: 'رتب الكائنات لتكوين سلسلة غذائية صحيحة 🌿🦗🐸🐍',
      items: [
        { id: 'green_plant', label: 'نبات أخضر', emoji: '🌿' },
        { id: 'locust', label: 'جرادة', emoji: '🦗' },
        { id: 'frog', label: 'ضفدع', emoji: '🐸' },
        { id: 'snake', label: 'ثعبان', emoji: '🐍' },
      ],
      correctOrder: ['green_plant', 'locust', 'frog', 'snake'],
      successMessage: 'ممتاز! أنت حامي التوازن البيئي لكل سلسلة 🌿',
      errorMessage: 'حاول مجددًا 🌱',
      rewardBadge: { name: 'حامي السلسلة 3', icon: '🥉' },
    },
    {
      id: 'ex2',
      type: 'mcq-set',
      title: 'أدوار الكائنات الحية',
      points: 20,
      prompt: 'أجب عن الأسئلة التالية لفهم أدوار الكائنات في الطبيعة 🌍',
      questions: [
        {
          id: 'q1',
          question: 'من يتغذى مباشرة على النبات الأخضر؟',
          options: ['الفأر', 'البوم', 'الصقر'],
          correct: 'الفأر',
        },
        {
          id: 'q2',
          question: 'من هم المفككون؟',
          options: ['البكتيريا والفطريات', 'الفأر', 'البوم'],
          correct: 'البكتيريا والفطريات',
        },
        {
          id: 'q3',
          question: 'إذا اختفت النباتات، ماذا يحدث؟',
          options: ['الحيوانات العاشبة تتأثر', 'لا شيء', 'الحيوانات اللاحمة تأكل النباتات مباشرة'],
          correct: 'الحيوانات العاشبة تتأثر',
        },
      ],
      successMessage: 'رائع! كل إجابة صحيحة تقربك من فهم أسرار الطبيعة 🐭',
      errorMessage: 'لا تقلق! ركّز على الكائنات وستفهم العلاقة بينهم 🌿',
      rewardBadge: { name: 'محقق الطبيعة الصغير', icon: '🕵️‍♂️' },
    },
    {
      id: 'ex3',
      type: 'scenario',
      title: 'سلوك بيئي مسؤول',
      points: 20,
      prompt: 'رأيت أشخاصاً يقطعون النباتات في الحقل. ماذا تفعل؟ 🌳',
      scenario: 'أنت في نزهة ورأيت مجموعة من الناس يقطفون الزهور ويقطعون شجيرات صغيرة.',
      options: [
        'حماية النباتات (أنصحهم بالتوقف بلطف) ✅',
        'تجاهل الوضع',
        'أخذ النباتات لنفسك',
      ],
      correct: 'حماية النباتات (أنصحهم بالتوقف بلطف) ✅',
      successMessage: 'أحسنت! اختيارك يحمي حياة الحيوانات والنباتات 🕊️',
      errorMessage: 'توقف! فكر في العواقب على الوسط البيئي 🌍',
      rewardBadge: { name: 'صديق الحقول والطبيعة', icon: '🕊️' },
    },
  ],
  games: [
    {
      id: 'g1',
      type: 'dragdrop',
      title: 'سباق السلسلة الغذائية',
      description: 'ساعد كل حيوان للوصول إلى طعامه الصحيح! 🏁',
      points: 35,
      gameData: {
        items: [
          { id: 'i1', label: 'أرنب 🐰', category: 'يأكل النباتات' },
          { id: 'i2', label: 'أسد 🦁', category: 'يأكل اللحوم' },
          { id: 'i3', label: 'غزال 🦌', category: 'يأكل النباتات' },
          { id: 'i4', label: 'نمر 🐅', category: 'يأكل اللحوم' },
          { id: 'i5', label: 'فراشة 🦋', category: 'يأكل النباتات' },
          { id: 'i6', label: 'صقر 🦅', category: 'يأكل اللحوم' },
        ],
        // The DragDrop component generates categories automatically from items
        // We structure categories as "Targets" (Food types)
        rewardBadgeName: 'سفير السلسلة الغذائية 🏁🌿',
      },
    },
    {
      id: 'g2',
      type: 'rescue',
      title: 'مهمة إنقاذ البيئة',
      description: 'أنقذ البيئة! أزل المخاطر واجعل الطبيعة سعيدة 💧🌸',
      points: 35,
      gameData: {
        items: [
          { id: '1', type: 'hazardous', icon: '🪓', x: 20, y: 30 }, // Axe (cutting plants)
          { id: '2', type: 'plastic', icon: '🗑️', x: 60, y: 40 }, // Trash
          { id: '3', type: 'hazardous', icon: '⚠️', x: 40, y: 60 }, // Danger/Trap
          { id: '4', type: 'plastic', icon: '🥤', x: 80, y: 50 }, // Cup
          { id: '5', type: 'hazardous', icon: '🔥', x: 30, y: 70 }, // Fire risk
        ],
        rewardBadgeName: 'بطل إنقاذ الطبيعة 💧🌸',
      },
    },
    {
      id: 'g3',
      type: 'construction',
      title: 'بناء الشبكة الغذائية',
      description: 'ابنِ شبكة غذائية متكاملة للحفاظ على التوازن! 🦉🌍',
      points: 30,
      gameData: {
        availableElements: [
          { id: 'e1', name: 'نبات', type: 'producer', icon: '🌿' },
          { id: 'e2', name: 'عشب', type: 'producer', icon: '🌱' },
          { id: 'e3', name: 'أرنب', type: 'consumer', icon: '🐰' },
          { id: 'e4', name: 'جرادة', type: 'consumer', icon: '🦗' },
          { id: 'e5', name: 'ضفدع', type: 'consumer', icon: '🐸' },
          { id: 'e6', name: 'ثعبان', type: 'consumer', icon: '🐍' },
          { id: 'e7', name: 'بوم', type: 'consumer', icon: '🦉' },
          { id: 'e8', name: 'بكتيريا', type: 'decomposer', icon: '🦠' },
        ],
        constraints: {
          minLiving: 5, // Requires a rich web
          mustIncludeType: 'decomposer',
        },
        rewardBadgeName: 'مهندس الشبكة الغذائية 🦉🌍',
      },
    },
  ],
};
