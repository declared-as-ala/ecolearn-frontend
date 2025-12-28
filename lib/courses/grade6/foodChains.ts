import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA ==============
export const foodChainsVideo: AnimatedVideoData = {
  title: 'رحلة الطاقة… من الشمس إلى الصقر!',
  totalDuration: 70,
  scenes: [
    {
      id: 'scene-1-intro',
      title: 'المشهد 1: بداية الرحلة',
      background: 'ocean',
      duration: 10,
      narratorText: 'مرحبًا أيها المسافر في سلسلة الحياة! 🌊 اليوم سنتتبع رحلة الطاقة من الشمس عبر المحيط حتى تصل إلى الطائر البحري. رحلة مذهلة!',
      elements: [
        { id: 'sun-start', type: 'sun', props: { size: 'large', glowing: true }, position: { x: '50%', y: '15%' }, delay: 0 },
        { id: 'ocean-wave', type: 'water', props: { type: 'wave', size: 'large' }, position: { x: '50%', y: '80%' }, delay: 0.5 },
        { id: 'energy-text', type: 'text', props: { text: 'رحلة الطاقة ☀️→🐟→🦅' }, position: { x: '50%', y: '50%' }, delay: 1 },
        { id: 'arrow-energy', type: 'arrow', props: { direction: 'down', color: '#fbbf24', size: 'medium' }, position: { x: '50%', y: '35%' }, delay: 1.5 },
        { id: 'label-intro', type: 'text', props: { text: '🌊 رحلة في المحيط' }, position: { x: '50%', y: '90%' }, delay: 2 },
      ],
      soundEffects: ['تدفق الماء 💧', 'موج البحر 🌊'],
      educationalHighlight: 'السلسلة الغذائية: مسار انتقال الطاقة من كائن لآخر',
      transition: 'fade',
    },
    {
      id: 'scene-2-plankton',
      title: 'المشهد 2: العوالق - بداية السلسلة',
      background: 'underwater',
      duration: 12,
      narratorText: 'تبدأ الرحلة مع العوالق الصغيرة! 🌿 هذه الكائنات المجهرية تستخدم طاقة الشمس لصنع غذائها. إنها "المنتجون" في المحيط وأساس كل السلاسل الغذائية!',
      elements: [
        { id: 'sun-plankton', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '80%', y: '10%' }, delay: 0 },
        { id: 'plankton-1', type: 'emoji', props: { emoji: '🌿', size: 30 }, position: { x: '25%', y: '50%' }, delay: 0.3 },
        { id: 'plankton-2', type: 'emoji', props: { emoji: '🌿', size: 25 }, position: { x: '40%', y: '55%' }, delay: 0.5 },
        { id: 'plankton-3', type: 'emoji', props: { emoji: '🌿', size: 30 }, position: { x: '55%', y: '48%' }, delay: 0.7 },
        { id: 'plankton-4', type: 'emoji', props: { emoji: '🌿', size: 25 }, position: { x: '70%', y: '52%' }, delay: 0.9 },
        { id: 'arrow-sun-plankton', type: 'arrow', props: { direction: 'down', color: '#fbbf24', size: 'small', label: 'طاقة شمسية' }, position: { x: '50%', y: '30%' }, delay: 1.2 },
        { id: 'energy-100', type: 'text', props: { text: '100% طاقة' }, position: { x: '50%', y: '70%' }, delay: 1.5 },
        { id: 'label-plankton', type: 'text', props: { text: '🌿 العوالق (المنتجون)' }, position: { x: '50%', y: '90%' }, delay: 1.8 },
      ],
      soundEffects: ['فقاعات 🫧', 'ماء هادئ 💧'],
      educationalHighlight: 'العوالق = المنتجون: تحول طاقة الشمس إلى غذاء (100% طاقة)',
      transition: 'slide',
    },
    {
      id: 'scene-3-small-fish',
      title: 'المشهد 3: السمكة الصغيرة',
      background: 'underwater',
      duration: 12,
      narratorText: 'تأتي الأسماك الصغيرة وتأكل العوالق! 🐟 لكن انتبه: ليست كل الطاقة تنتقل. جزء كبير يُستخدم للحركة والحرارة. فقط حوالي 10% تنتقل للمستوى التالي!',
      elements: [
        { id: 'plankton-food', type: 'emoji', props: { emoji: '🌿', size: 25 }, position: { x: '25%', y: '60%' }, delay: 0 },
        { id: 'arrow-eat-1', type: 'arrow', props: { direction: 'right', color: '#22c55e', size: 'small' }, position: { x: '38%', y: '58%' }, delay: 0.3 },
        { id: 'small-fish-1', type: 'animal', props: { type: 'fish', size: 'medium', moving: true }, position: { x: '55%', y: '55%' }, delay: 0.5 },
        { id: 'small-fish-2', type: 'animal', props: { type: 'fish', size: 'small', moving: true }, position: { x: '70%', y: '65%' }, delay: 0.8 },
        { id: 'energy-loss', type: 'emoji', props: { emoji: '💨', size: 30 }, position: { x: '60%', y: '40%' }, delay: 1.1 },
        { id: 'text-loss', type: 'text', props: { text: '90% تُفقد!' }, position: { x: '60%', y: '32%' }, delay: 1.4 },
        { id: 'energy-10', type: 'text', props: { text: '10% طاقة متبقية' }, position: { x: '55%', y: '80%' }, delay: 1.7 },
        { id: 'label-small-fish', type: 'text', props: { text: '🐟 سمكة صغيرة (مستهلك أول)' }, position: { x: '50%', y: '90%' }, delay: 2 },
      ],
      soundEffects: ['أسماك تسبح 🐟', 'فقدان طاقة 💨'],
      educationalHighlight: 'المستهلك الأول: يأكل المنتج ويحصل على ~10% فقط من الطاقة',
      transition: 'slide',
    },
    {
      id: 'scene-4-big-fish',
      title: 'المشهد 4: السمكة الكبيرة',
      background: 'underwater',
      duration: 10,
      narratorText: 'ثم تأتي السمكة الكبيرة وتصطاد الصغيرة! 🐠 مرة أخرى، الطاقة تقل. من 10% تصل فقط 1% إلى هذا المستوى!',
      elements: [
        { id: 'small-fish-prey', type: 'animal', props: { type: 'fish', size: 'small', moving: true, direction: 'left' }, position: { x: '30%', y: '55%' }, delay: 0 },
        { id: 'arrow-eat-2', type: 'arrow', props: { direction: 'right', color: '#ef4444', size: 'small' }, position: { x: '45%', y: '55%' }, delay: 0.3 },
        { id: 'big-fish', type: 'emoji', props: { emoji: '🐠', size: 60 }, position: { x: '65%', y: '55%' }, delay: 0.6 },
        { id: 'energy-loss-2', type: 'emoji', props: { emoji: '💨', size: 25 }, position: { x: '65%', y: '35%' }, delay: 0.9 },
        { id: 'text-loss-2', type: 'text', props: { text: '90% تُفقد!' }, position: { x: '65%', y: '28%' }, delay: 1.2 },
        { id: 'energy-1', type: 'text', props: { text: '1% طاقة متبقية' }, position: { x: '65%', y: '75%' }, delay: 1.5 },
        { id: 'label-big-fish', type: 'text', props: { text: '🐠 سمكة كبيرة (مستهلك ثانٍ)' }, position: { x: '50%', y: '90%' }, delay: 1.8 },
      ],
      soundEffects: ['صيد 🎣', 'فقدان طاقة 💨'],
      educationalHighlight: 'المستهلك الثاني: يحصل على ~1% فقط من الطاقة الأصلية',
      transition: 'slide',
    },
    {
      id: 'scene-5-seabird',
      title: 'المشهد 5: الطائر البحري',
      background: 'sky',
      duration: 10,
      narratorText: 'وأخيراً، الطائر البحري يصطاد السمكة الكبيرة! 🦅 في نهاية السلسلة، تبقى طاقة قليلة جداً. لهذا السبب، المفترسات في القمة قليلة العدد!',
      elements: [
        { id: 'sun-sky', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '80%', y: '15%' }, delay: 0 },
        { id: 'cloud-1', type: 'cloud', props: { size: 'medium' }, position: { x: '25%', y: '20%' }, delay: 0.3 },
        { id: 'seabird', type: 'emoji', props: { emoji: '🦅', size: 70 }, position: { x: '50%', y: '40%' }, delay: 0.6 },
        { id: 'fish-prey', type: 'emoji', props: { emoji: '🐠', size: 35 }, position: { x: '55%', y: '60%' }, delay: 0.9 },
        { id: 'arrow-eat-3', type: 'arrow', props: { direction: 'up', color: '#ef4444', size: 'small' }, position: { x: '52%', y: '52%' }, delay: 1.2 },
        { id: 'energy-final', type: 'text', props: { text: '0.1% طاقة!' }, position: { x: '50%', y: '75%' }, delay: 1.5 },
        { id: 'label-seabird', type: 'text', props: { text: '🦅 طائر بحري (قمة السلسلة)' }, position: { x: '50%', y: '90%' }, delay: 1.8 },
      ],
      soundEffects: ['طائر يحلق 🦅', 'رياح 🌬️'],
      educationalHighlight: 'قمة السلسلة: المفترسات الكبيرة تحصل على أقل طاقة',
      transition: 'slide',
    },
    {
      id: 'scene-6-decomposers',
      title: 'المشهد 6: المحللات - إعادة الدورة',
      background: 'underwater',
      duration: 10,
      narratorText: 'لكن الدورة لا تنتهي! 🔄 عندما تموت الكائنات، تأتي المحللات (البكتيريا والفطريات) وتحلل أجسامها وتعيد المواد الغذائية للماء والتربة. دورة أبدية!',
      elements: [
        { id: 'dead-fish', type: 'emoji', props: { emoji: '🐟', size: 40 }, position: { x: '30%', y: '50%' }, delay: 0 },
        { id: 'cross', type: 'emoji', props: { emoji: '❌', size: 25 }, position: { x: '35%', y: '45%' }, delay: 0.3 },
        { id: 'bacteria-1', type: 'animal', props: { type: 'bacteria', size: 'medium' }, position: { x: '50%', y: '55%' }, delay: 0.6 },
        { id: 'bacteria-2', type: 'animal', props: { type: 'bacteria', size: 'small' }, position: { x: '60%', y: '50%' }, delay: 0.8 },
        { id: 'arrow-decompose', type: 'arrow', props: { direction: 'down', color: '#8b4513', size: 'small', label: 'تحلل' }, position: { x: '50%', y: '70%' }, delay: 1.1 },
        { id: 'nutrients', type: 'emoji', props: { emoji: '✨', size: 30 }, position: { x: '50%', y: '85%' }, delay: 1.4 },
        { id: 'cycle-icon', type: 'emoji', props: { emoji: '🔄', size: 45 }, position: { x: '75%', y: '50%' }, delay: 1.7 },
        { id: 'label-decomposers', type: 'text', props: { text: '🦠 المحللات - إعادة الدورة' }, position: { x: '50%', y: '90%' }, delay: 2 },
      ],
      soundEffects: ['تحلل 🦠', 'موسيقى الدورة 🔄'],
      educationalHighlight: 'المحللات: تعيد المواد الغذائية للبيئة لتبدأ الدورة من جديد',
      transition: 'slide',
    },
    {
      id: 'scene-7-complete-chain',
      title: 'المشهد 7: السلسلة الكاملة',
      background: 'ocean',
      duration: 6,
      narratorText: 'والآن نرى السلسلة الغذائية كاملة! ☀️ → 🌿 → 🐟 → 🐠 → 🦅 → 🦠 → 🔄 دورة مستمرة من الطاقة والمادة!',
      elements: [
        { id: 'sun-chain', type: 'sun', props: { size: 'small', glowing: true }, position: { x: '10%', y: '30%' }, delay: 0 },
        { id: 'plankton-chain', type: 'emoji', props: { emoji: '🌿', size: 35 }, position: { x: '25%', y: '30%' }, delay: 0.2 },
        { id: 'small-fish-chain', type: 'emoji', props: { emoji: '🐟', size: 35 }, position: { x: '40%', y: '30%' }, delay: 0.4 },
        { id: 'big-fish-chain', type: 'emoji', props: { emoji: '🐠', size: 40 }, position: { x: '55%', y: '30%' }, delay: 0.6 },
        { id: 'seabird-chain', type: 'emoji', props: { emoji: '🦅', size: 40 }, position: { x: '70%', y: '30%' }, delay: 0.8 },
        { id: 'bacteria-chain', type: 'emoji', props: { emoji: '🦠', size: 30 }, position: { x: '85%', y: '30%' }, delay: 1 },
        { id: 'arrows-flow', type: 'emoji', props: { emoji: '➡️', size: 25 }, position: { x: '50%', y: '50%' }, delay: 1.2 },
        { id: 'cycle-complete', type: 'emoji', props: { emoji: '🔄', size: 50 }, position: { x: '50%', y: '70%' }, delay: 1.5 },
        { id: 'label-complete', type: 'text', props: { text: '⛓️ السلسلة الغذائية الكاملة' }, position: { x: '50%', y: '90%' }, delay: 1.8 },
      ],
      soundEffects: ['موسيقى انتصار 🎵', 'دورة مستمرة 🔄'],
      educationalHighlight: 'السلسلة الغذائية: شمس ← منتج ← مستهلكون ← محللون ← دورة مستمرة',
      transition: 'zoom',
    },
  ],
  finalMessage: 'أحسنت! أنت الآن حارس الدورة الأبدية! 🌍 تفهم كيف تنتقل الطاقة في الطبيعة!',
};

// ============== COURSE DATA ==============
export const foodChainsCourse: Course = {
  id: 'food-chains-6',
  title: 'السلاسل الغذائية',
  grade: 6,
  icon: '⛓️',
  color: 'bg-amber-100',
  badge: { name: 'حارس الدورة الأبدية', icon: '🌍' },
  rewardMessages: {
    student: 'أنت الآن خبير في السلاسل الغذائية! تفهم رحلة الطاقة!',
    parent: 'طفلك تعلم عن السلاسل الغذائية وانتقال الطاقة في الطبيعة! ⛓️',
    universalGoldBadge: { name: 'البطل الشامل للبيئة', icon: '🌍' },
  },
  videoConcept: {
    title: 'رحلة الطاقة… من الشمس إلى الصقر! ☀️🦅',
    scenario: 'مرحبًا أيها المسافر في سلسلة الحياة! 🌊 سنتتبع رحلة الطاقة عبر المحيط.',
    moralMessage: 'الطاقة تنتقل عبر السلسلة الغذائية، وكل كائن له دور!',
  },
  animatedVideo: foodChainsVideo,
  videoStoryboard: {
    title: 'رحلة الطاقة… من الشمس إلى الصقر! ☀️🦅',
    scenes: 'عوالق ← سمكة صغيرة ← سمكة كبيرة ← طائر بحري، تدفق الطاقة، التحلل، دورة المادة',
    narratorText: 'مرحبًا أيها المسافر في سلسلة الحياة! 🌊...',
    soundEffects: [
      'تدفق الماء 💧',
      'أسماك 🐟',
      'طائر 🦅',
      'بكتيريا 🦠',
      'فقدان طاقة 💨',
      'موسيقى الدورة 🔄',
    ],
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1',
      type: 'multi',
      title: 'أين تذهب الطاقة؟',
      points: 20,
      prompt: 'اختر الجمل التي توضّح "فقدان الطاقة" في السلسلة الغذائية 💨',
      options: [
        'تقل الطاقة كلما صعدنا في السلسلة 💨',
        'تزداد الطاقة كلما صعدنا في السلسلة 🔋',
        'جزء من الطاقة يُستعمل للحركة والحرارة 🔥',
        'الطاقة تنتقل فقط ولا تُفقد أبدًا ❌',
      ],
      correct: ['تقل الطاقة كلما صعدنا في السلسلة 💨', 'جزء من الطاقة يُستعمل للحركة والحرارة 🔥'],
      successMessage: '✅ ممتاز! الطاقة تقل لأن الكائنات تستهلك جزءًا منها 💨',
      errorMessage: '❌ راجع الفكرة: الطاقة تقل في كل مستوى بسبب الاستهلاك والحرارة 🔥',
      rewardBadge: { name: 'خبير الطاقة', icon: '⚡' },
    },
    {
      id: 'ex2',
      type: 'short',
      title: 'لماذا لا ينتهي الماء؟',
      points: 20,
      prompt: 'صف كيف تُعاد "المادة" (مثل الماء والعناصر) في الطبيعة عبر التحلل والدورة 🔄',
      placeholder: 'اكتب عن التحلل، المحللات، وإعادة المواد...',
      requiredKeywords: ['دورة', 'تحلل'],
      successMessage: '✅ رائع! فهمت أن المادة تُعاد عبر دورة مستمرة 🔄',
      errorMessage: '❌ حاول ذكر فكرة "الدورة" و"التحلل" 🔄🦠',
      rewardBadge: { name: 'فاهم الدورات', icon: '🔄' },
    },
    {
      id: 'ex3',
      type: 'choice',
      title: 'اختَر السلسلة الصحيحة!',
      points: 20,
      prompt: 'اختر السلسلة الغذائية البحرية الصحيحة 🌊',
      options: [
        'عوالق → سمكة صغيرة → سمكة كبيرة → طائر بحري',
        'طائر بحري → عوالق → سمكة كبيرة → سمكة صغيرة',
        'سمكة كبيرة → عوالق → طائر بحري → سمكة صغيرة',
      ],
      correct: 'عوالق → سمكة صغيرة → سمكة كبيرة → طائر بحري',
      successMessage: '✅ صحيح! هكذا تنتقل الطاقة عبر المستويات ☀️→🐟→🦅',
      errorMessage: '❌ حاول من جديد: البداية تكون غالبًا من كائنات صغيرة/منتجات مثل العوالق 🌿',
      rewardBadge: { name: 'خبير السلاسل', icon: '⛓️' },
    },
  ],
  games: [
    {
      id: 'g1',
      type: 'dragdrop',
      title: 'سباق أنقذ الدورة!',
      description: 'أصلح الدورة بإسقاط كل عنصر في مكانه الصحيح 🔄',
      points: 35,
      gameData: {
        items: [
          { id: 'i1', label: 'عوالق (منتِج/أساس)', category: 'البداية' },
          { id: 'i2', label: 'سمكة صغيرة', category: 'المستوى 2' },
          { id: 'i3', label: 'سمكة كبيرة', category: 'المستوى 3' },
          { id: 'i4', label: 'طائر بحري', category: 'المستوى 4' },
          { id: 'i5', label: 'محللات 🦠', category: 'نهاية/إعادة' },
        ],
        categories: ['البداية', 'المستوى 2', 'المستوى 3', 'المستوى 4', 'نهاية/إعادة'],
        rewardBadgeName: 'مُصلح الدورة 🔧',
      },
    },
    {
      id: 'g2',
      type: 'flow',
      title: 'مهمة راقب تدفق الطاقة',
      description: 'شاهد الطاقة في كل مرحلة وكيف تتناقص 💨',
      points: 30,
      gameData: {
        stages: [
          { id: 'sun', label: 'الشمس', icon: '☀️', energy: 100 },
          { id: 'plankton', label: 'عوالق', icon: '🌿', energy: 60 },
          { id: 'smallfish', label: 'سمكة صغيرة', icon: '🐟', energy: 25 },
          { id: 'bigfish', label: 'سمكة كبيرة', icon: '🐠', energy: 12 },
          { id: 'seabird', label: 'طائر بحري', icon: '🦅', energy: 6 },
        ],
        lossIcon: '💨',
        correctOrder: ['sun', 'plankton', 'smallfish', 'bigfish', 'seabird'],
        rewardBadgeName: 'مراقب الطاقة 👁️',
      },
    },
    {
      id: 'g3',
      type: 'construction',
      title: 'بناء سلسلتك البحرية',
      description: 'ابنِ سلسلة غذائية من 4 مراحل وتأكد من وجود محلّل 🦠',
      points: 35,
      gameData: {
        availableElements: [
          { id: 'e1', name: 'شمس', type: 'sun', icon: '☀️' },
          { id: 'e2', name: 'عوالق', type: 'producer', icon: '🌿' },
          { id: 'e3', name: 'سمكة صغيرة', type: 'consumer', icon: '🐟' },
          { id: 'e4', name: 'سمكة كبيرة', type: 'consumer', icon: '🐠' },
          { id: 'e5', name: 'طائر بحري', type: 'consumer', icon: '🦅' },
          { id: 'e6', name: 'محللات', type: 'decomposer', icon: '🦠' },
        ],
        constraints: { mustIncludeType: 'decomposer', minElements: 5 },
        rewardBadgeName: 'بانٍ السلاسل 🏗️',
      },
    },
  ],
};
