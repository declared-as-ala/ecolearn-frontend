import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA ==============
export const ecoBalanceVideo: AnimatedVideoData = {
  title: 'التوازن… خيطٌ لا تراه العين!',
  totalDuration: 65,
  scenes: [
    {
      id: 'scene-1-intro',
      title: 'المشهد 1: مقدمة - سر الحياة',
      background: 'forest',
      duration: 10,
      narratorText: 'مرحباً يا أصدقاء الطبيعة! 🌿 اليوم سنكتشف سر استمرار الحياة على الأرض... إنه التوازن البيئي! خيط خفي يربط بين كل الكائنات الحية وغير الحية في الطبيعة.',
      elements: [
        { id: 'tree-1', type: 'plant', props: { type: 'tree', size: 'large' }, position: { x: '20%', y: '55%' }, delay: 0 },
        { id: 'tree-2', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '80%', y: '60%' }, delay: 0.3 },
        { id: 'sun-intro', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '85%', y: '15%' }, delay: 0.5 },
        { id: 'rabbit-intro', type: 'animal', props: { type: 'rabbit', size: 'medium', moving: true }, position: { x: '40%', y: '75%' }, delay: 0.8 },
        { id: 'owl-intro', type: 'animal', props: { type: 'owl', size: 'medium' }, position: { x: '25%', y: '40%' }, delay: 1 },
        { id: 'water-intro', type: 'water', props: { type: 'river', size: 'medium' }, position: { x: '60%', y: '85%' }, delay: 1.2 },
        { id: 'balance-icon', type: 'emoji', props: { emoji: '⚖️', size: 50 }, position: { x: '50%', y: '35%' }, delay: 1.5 },
        { id: 'text-intro', type: 'text', props: { text: 'التوازن البيئي 🌿⚖️' }, position: { x: '50%', y: '90%' }, delay: 2 },
      ],
      soundEffects: ['أوراق شجر 🍃', 'بومة 🦉', 'ماء يجري 💧'],
      educationalHighlight: 'التوازن البيئي: علاقة متناغمة بين جميع عناصر البيئة الحية وغير الحية',
      transition: 'fade',
    },
    {
      id: 'scene-2-living-elements',
      title: 'المشهد 2: العناصر الحية',
      background: 'forest',
      duration: 12,
      narratorText: 'في الغابة المتوازنة، كل كائن حي له دور! النباتات تنتج الأكسجين والغذاء، العواشب تأكل النباتات، اللواحم تصطاد العواشب، والمحللات تعيد المواد للتربة 🌱🐭🦉🦠',
      elements: [
        { id: 'plant-living', type: 'plant', props: { type: 'tree', size: 'large' }, position: { x: '15%', y: '60%' }, delay: 0 },
        { id: 'grass-living', type: 'plant', props: { type: 'grass', size: 'medium' }, position: { x: '35%', y: '85%' }, delay: 0.3 },
        { id: 'mouse-living', type: 'animal', props: { type: 'mouse', size: 'medium', moving: true }, position: { x: '45%', y: '75%' }, delay: 0.6 },
        { id: 'owl-living', type: 'animal', props: { type: 'owl', size: 'large' }, position: { x: '70%', y: '40%' }, delay: 0.9 },
        { id: 'worm-living', type: 'animal', props: { type: 'worm', size: 'small', moving: true }, position: { x: '60%', y: '85%' }, delay: 1.2 },
        { id: 'bacteria-living', type: 'animal', props: { type: 'bacteria', size: 'small' }, position: { x: '80%', y: '80%' }, delay: 1.5 },
        { id: 'arrow-1', type: 'arrow', props: { direction: 'right', color: '#22c55e', size: 'small' }, position: { x: '28%', y: '75%' }, delay: 1.8 },
        { id: 'arrow-2', type: 'arrow', props: { direction: 'right', color: '#ef4444', size: 'small' }, position: { x: '55%', y: '55%' }, delay: 2 },
        { id: 'label-living', type: 'text', props: { text: 'العناصر الحية 🌿🐭🦉' }, position: { x: '50%', y: '90%' }, delay: 2.5 },
      ],
      soundEffects: ['فأر يركض 🐭', 'بومة تصطاد 🦉', 'ديدان تحفر 🪱'],
      educationalHighlight: 'العناصر الحية: منتجون (نباتات) ← مستهلكون (حيوانات) ← محللون (بكتيريا)',
      transition: 'slide',
    },
    {
      id: 'scene-3-nonliving-elements',
      title: 'المشهد 3: العناصر غير الحية',
      background: 'farm',
      duration: 10,
      narratorText: 'لكن التوازن يحتاج أيضاً للعناصر غير الحية! الماء، الهواء، التربة، وضوء الشمس. كلها ضرورية لحياة الكائنات الحية ☀️💧🌍💨',
      elements: [
        { id: 'sun-nonliving', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '80%', y: '15%' }, delay: 0 },
        { id: 'cloud-nonliving', type: 'cloud', props: { size: 'medium' }, position: { x: '30%', y: '20%' }, delay: 0.3 },
        { id: 'water-nonliving', type: 'water', props: { type: 'river', size: 'large' }, position: { x: '50%', y: '80%' }, delay: 0.6 },
        { id: 'soil-nonliving', type: 'soil', props: { size: 'large' }, position: { x: '50%', y: '90%' }, delay: 0.9 },
        { id: 'air-icon', type: 'emoji', props: { emoji: '💨', size: 40 }, position: { x: '60%', y: '40%' }, delay: 1.2 },
        { id: 'oxygen-icon', type: 'emoji', props: { emoji: '🫁', size: 35 }, position: { x: '40%', y: '50%' }, delay: 1.5 },
        { id: 'label-nonliving', type: 'text', props: { text: 'العناصر غير الحية ☀️💧🌍' }, position: { x: '50%', y: '90%' }, delay: 2 },
      ],
      soundEffects: ['شمس ساطعة ☀️', 'ماء يتدفق 💧', 'رياح خفيفة 🌬️'],
      educationalHighlight: 'العناصر غير الحية: الماء، الهواء، التربة، الضوء - ضرورية للحياة',
      transition: 'slide',
    },
    {
      id: 'scene-4-interactions',
      title: 'المشهد 4: التفاعلات المتبادلة',
      background: 'forest',
      duration: 12,
      narratorText: 'انظروا كيف تتفاعل كل العناصر! الشمس تعطي الطاقة للنباتات، النباتات تعطي الأكسجين للهواء، الماء يسقي كل شيء، والتربة تغذي الجذور. شبكة رائعة! 🕸️',
      elements: [
        { id: 'sun-interact', type: 'sun', props: { size: 'small', glowing: true }, position: { x: '10%', y: '15%' }, delay: 0 },
        { id: 'plant-interact', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '30%', y: '55%' }, delay: 0.3 },
        { id: 'rabbit-interact', type: 'animal', props: { type: 'rabbit', size: 'medium', moving: true }, position: { x: '50%', y: '70%' }, delay: 0.6 },
        { id: 'fox-interact', type: 'animal', props: { type: 'fox', size: 'medium', moving: true }, position: { x: '70%', y: '65%' }, delay: 0.9 },
        { id: 'water-interact', type: 'water', props: { type: 'droplet', size: 'small' }, position: { x: '25%', y: '75%' }, delay: 1.2 },
        { id: 'soil-interact', type: 'soil', props: { size: 'medium' }, position: { x: '50%', y: '90%' }, delay: 1.5 },
        { id: 'arrow-sun-plant', type: 'arrow', props: { direction: 'down', color: '#fbbf24', size: 'small', label: 'طاقة' }, position: { x: '20%', y: '35%' }, delay: 1.8 },
        { id: 'arrow-plant-rabbit', type: 'arrow', props: { direction: 'right', color: '#22c55e', size: 'small', label: 'غذاء' }, position: { x: '40%', y: '65%' }, delay: 2.1 },
        { id: 'arrow-rabbit-fox', type: 'arrow', props: { direction: 'right', color: '#ef4444', size: 'small', label: 'صيد' }, position: { x: '60%', y: '68%' }, delay: 2.4 },
        { id: 'web-icon', type: 'emoji', props: { emoji: '🕸️', size: 40 }, position: { x: '85%', y: '45%' }, delay: 2.7 },
      ],
      soundEffects: ['طبيعة متناغمة 🎶', 'حيوانات تتحرك 🐾'],
      educationalHighlight: 'التفاعلات: كل عنصر يؤثر ويتأثر بالآخرين في شبكة معقدة',
      transition: 'slide',
    },
    {
      id: 'scene-5-worms-role',
      title: 'المشهد 5: دور الديدان الخفي',
      background: 'farm',
      duration: 10,
      narratorText: 'هل تعلمون أن الديدان أبطال خفيون؟ إنها تحفر في التربة وتهوّيها، وتحلل المواد العضوية وتحولها إلى سماد طبيعي. التربة بدون ديدان تصبح ميتة! 🪱🌍',
      elements: [
        { id: 'soil-worms', type: 'soil', props: { size: 'large', withWorms: true }, position: { x: '50%', y: '75%' }, delay: 0 },
        { id: 'worm-1', type: 'animal', props: { type: 'worm', size: 'medium', moving: true }, position: { x: '35%', y: '70%' }, delay: 0.5 },
        { id: 'worm-2', type: 'animal', props: { type: 'worm', size: 'small', moving: true }, position: { x: '55%', y: '72%' }, delay: 0.8 },
        { id: 'worm-3', type: 'animal', props: { type: 'worm', size: 'medium', moving: true }, position: { x: '70%', y: '68%' }, delay: 1.1 },
        { id: 'plant-healthy', type: 'plant', props: { type: 'flower', size: 'medium' }, position: { x: '30%', y: '50%' }, delay: 1.4 },
        { id: 'plant-healthy-2', type: 'plant', props: { type: 'grass', size: 'medium' }, position: { x: '70%', y: '55%' }, delay: 1.7 },
        { id: 'sparkle-1', type: 'emoji', props: { emoji: '✨', size: 25 }, position: { x: '45%', y: '65%' }, delay: 2 },
        { id: 'sparkle-2', type: 'emoji', props: { emoji: '✨', size: 25 }, position: { x: '60%', y: '63%' }, delay: 2.3 },
        { id: 'label-worms', type: 'text', props: { text: 'الديدان: أبطال التربة 🪱' }, position: { x: '50%', y: '90%' }, delay: 2.5 },
      ],
      soundEffects: ['تربة تتنفس 🌍', 'ديدان تحفر 🪱'],
      educationalHighlight: 'الديدان تهوّي التربة وتحلل المواد العضوية - ضرورية للنباتات',
      transition: 'slide',
    },
    {
      id: 'scene-6-balance-complete',
      title: 'المشهد 6: التوازن الكامل',
      background: 'park',
      duration: 11,
      narratorText: 'هكذا يعمل التوازن البيئي! النباتات ← العواشب ← اللواحم ← المحللات ← التربة ← الهواء. دورة كاملة لا تنتهي. أنت جزء من هذه الشبكة العظيمة! 🌍⚖️',
      elements: [
        { id: 'sun-final', type: 'sun', props: { size: 'small', glowing: true }, position: { x: '10%', y: '15%' }, delay: 0 },
        { id: 'plant-final', type: 'emoji', props: { emoji: '🌿', size: 40 }, position: { x: '25%', y: '30%' }, delay: 0.3 },
        { id: 'rabbit-final', type: 'emoji', props: { emoji: '🐰', size: 40 }, position: { x: '45%', y: '30%' }, delay: 0.6 },
        { id: 'fox-final', type: 'emoji', props: { emoji: '🦊', size: 40 }, position: { x: '65%', y: '30%' }, delay: 0.9 },
        { id: 'decomp-final', type: 'emoji', props: { emoji: '🦠', size: 35 }, position: { x: '85%', y: '30%' }, delay: 1.2 },
        { id: 'soil-final', type: 'emoji', props: { emoji: '🌍', size: 40 }, position: { x: '50%', y: '55%' }, delay: 1.5 },
        { id: 'air-final', type: 'emoji', props: { emoji: '💨', size: 35 }, position: { x: '30%', y: '55%' }, delay: 1.8 },
        { id: 'water-final', type: 'emoji', props: { emoji: '💧', size: 35 }, position: { x: '70%', y: '55%' }, delay: 2.1 },
        { id: 'balance-final', type: 'emoji', props: { emoji: '⚖️', size: 60 }, position: { x: '50%', y: '75%' }, delay: 2.5 },
        { id: 'cycle-final', type: 'emoji', props: { emoji: '🔄', size: 40 }, position: { x: '50%', y: '90%' }, delay: 2.8 },
      ],
      soundEffects: ['موسيقى هادئة 🎶', 'انسجام الطبيعة 🌿'],
      educationalHighlight: 'التوازن البيئي: دورة مستمرة بين كل عناصر البيئة الحية وغير الحية',
      transition: 'zoom',
    },
  ],
  finalMessage: 'أحسنت! أنت الآن تفهم سر التوازن البيئي. حافظ على هذا التوازن في بيئتك! 🌍⚖️',
};

// ============== COURSE DATA ==============
export const ecoBalanceGrade5: Course = {
  id: 'eco-balance-5',
  title: 'التوازن البيئي',
  grade: 5,
  icon: '⚖️',
  color: 'bg-lime-100',
  badge: { name: 'مهندس شبكة التوازن', icon: '🌍🕸️' },
  rewardMessages: {
    student: 'أنت الآن حارس التوازن البيئي! كل كائن يعتمد عليك!',
    parent: 'طفلك تعلم أهمية التوازن البيئي ودوره في حمايته! ⚖️',
    universalGoldBadge: { name: 'البطل الشامل للبيئة', icon: '🌍' },
  },
  videoConcept: {
    title: 'التوازن… خيطٌ لا تراه العين!',
    scenario: 'مرحباً يا أصدقاء الطبيعة! اليوم سنكتشف سر استمرار الحياة… التوازن البيئي!',
    moralMessage: 'التوازن البيئي خيط خفي يربط كل الكائنات، ويجب علينا حمايته!',
  },
  animatedVideo: ecoBalanceVideo,
  videoStoryboard: {
    title: 'التوازن… خيطٌ لا تراه العين!',
    scenes: 'غابة متوازنة → النباتات تنمو → العواشب تأكل → اللواحم تصطاد → المحللات تحلل → التربة تُغني',
    narratorText: 'مرحباً يا أصدقاء الطبيعة! اليوم سنكتشف سر استمرار الحياة… التوازن البيئي!',
    soundEffects: ['أشجار 🍃', 'فأر 🐭', 'بومة 🦉', 'ديدان 🪱', 'انهيار ⚠️'],
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1',
      type: 'drag-sequence',
      title: 'رتّب عناصر التوازن',
      points: 25,
      prompt: 'رتّب عناصر التوازن البيئي بالترتيب الصحيح لضمان استمرار الحياة 🌿⚖️',
      items: [
        { id: 'plant', label: 'النباتات (منتِج)', emoji: '🌿' },
        { id: 'herb', label: 'العواشب (مستهلك أول)', emoji: '🐰' },
        { id: 'carn', label: 'اللواحم (مستهلك ثانٍ)', emoji: '🦊' },
        { id: 'decomp', label: 'المحللات', emoji: '🦠' },
        { id: 'soil', label: 'التربة', emoji: '🌍' },
      ],
      correctOrder: ['plant', 'herb', 'carn', 'decomp', 'soil'],
      successMessage: 'ممتاز! أنت تبني توازناً طبيعياً كاملاً! 🌿⚖️',
      errorMessage: 'حاول مجدداً! تذكر دورة الحياة في الطبيعة 🔄',
      rewardBadge: { name: 'منقذ التوازن البيئي', icon: '🌿🛡️' },
    },
    {
      id: 'ex2',
      type: 'mcq-set',
      title: 'أدوار الكائنات في التوازن',
      points: 20,
      prompt: 'أجب عن الأسئلة لفهم دور كل كائن في التوازن البيئي 🌍',
      questions: [
        {
          id: 'q1',
          question: 'ما دور المحللات في التوازن البيئي؟',
          options: ['🦠 تحليل الكائنات الميتة وإعادة المواد للتربة', '🌿 إنتاج الغذاء', '🦊 صيد الفرائس'],
          correct: '🦠 تحليل الكائنات الميتة وإعادة المواد للتربة',
        },
        {
          id: 'q2',
          question: 'لماذا الديدان مهمة للتربة؟',
          options: ['🪱 تهوّي التربة وتحلل المواد العضوية', '🌿 تأكل النباتات', '🦊 تصطاد الحيوانات'],
          correct: '🪱 تهوّي التربة وتحلل المواد العضوية',
        },
        {
          id: 'q3',
          question: 'ماذا يحدث إذا اختفت النباتات من البيئة؟',
          options: ['⚠️ تموت كل الحيوانات لعدم وجود غذاء', '✅ لا شيء يحدث', '🦊 تزداد اللواحم'],
          correct: '⚠️ تموت كل الحيوانات لعدم وجود غذاء',
        },
      ],
      successMessage: 'رائع! فهمت دور كل عنصر في التوازن 🌍',
      errorMessage: 'راجع الفيديو وفكر في العلاقات بين الكائنات 🔄',
      rewardBadge: { name: 'خبير التوازن', icon: '⚖️' },
    },
    {
      id: 'ex3',
      type: 'scenario',
      title: 'حماية الديدان',
      points: 20,
      prompt: 'اختر التصرف الصحيح لحماية التوازن البيئي 🪱',
      scenario: 'صديقك يدوس على الديدان في الحديقة. ماذا تفعل؟',
      options: [
        'أشرح له أن الديدان مهمة للتربة وأطلب منه التوقف 🪱✅',
        'أساعده في قتل المزيد من الديدان',
        'أتجاهل الأمر ولا أقول شيئاً',
      ],
      correct: 'أشرح له أن الديدان مهمة للتربة وأطلب منه التوقف 🪱✅',
      successMessage: 'أحسنت! أنت صديق حقيقي للتربة والكائنات الحية 🪱',
      errorMessage: 'فكر مجدداً... الديدان أبطال خفيون يجب حمايتهم 🌍',
      rewardBadge: { name: 'صديق التربة الحية', icon: '🪱' },
    },
  ],
  games: [
    {
      id: 'g1',
      type: 'runner',
      title: 'سباق استعادة التوازن',
      description: 'ساعد في استعادة التوازن البيئي خلال 30 ثانية! اجمع العناصر الصحيحة 🏃⚖️',
      points: 35,
      gameData: {
        collectItems: ['🌿', '🐰', '🦊', '🦠', '🌍', '💧'],
        hazardItems: ['🏭', '🗑️', '🔥', '🪓'],
        lives: 3,
        timeLimitSec: 30,
        rewardBadgeName: 'منقذ التوازن 🏆',
      },
    },
    {
      id: 'g2',
      type: 'decision',
      title: 'مهمة حماية الغابة',
      description: 'امنع قطع الأشجار، الحرائق، ورمي النفايات لحماية التوازن 🌳🛡️',
      points: 30,
      gameData: {
        scenarios: [
          { id: 's1', text: 'شخص يقطع شجرة', correct: 'أوقفه وأبلّغ', wrong: 'أتركه' },
          { id: 's2', text: 'حريق في الغابة', correct: 'أبلّغ رجال الإطفاء', wrong: 'أهرب' },
          { id: 's3', text: 'نفايات في النهر', correct: 'أجمعها وأرميها بشكل صحيح', wrong: 'أتجاهلها' },
        ],
        rewardBadgeName: 'حارس الغابة 🌳',
      },
    },
    {
      id: 'g3',
      type: 'construction',
      title: 'بناء شبكة التوازن',
      description: 'اربط كل عناصر النظام البيئي بشكل صحيح لإنشاء شبكة متوازنة 🕸️',
      points: 35,
      gameData: {
        availableElements: [
          { id: 'e1', name: 'شمس', type: 'sun', icon: '☀️' },
          { id: 'e2', name: 'نباتات', type: 'producer', icon: '🌿' },
          { id: 'e3', name: 'أرنب', type: 'consumer', icon: '🐰' },
          { id: 'e4', name: 'ثعلب', type: 'consumer', icon: '🦊' },
          { id: 'e5', name: 'بومة', type: 'consumer', icon: '🦉' },
          { id: 'e6', name: 'ديدان', type: 'decomposer', icon: '🪱' },
          { id: 'e7', name: 'بكتيريا', type: 'decomposer', icon: '🦠' },
          { id: 'e8', name: 'تربة', type: 'soil', icon: '🌍' },
          { id: 'e9', name: 'ماء', type: 'water', icon: '💧' },
          { id: 'e10', name: 'هواء', type: 'consumer', icon: '💨' },
        ],
        constraints: { minLiving: 4, minNonLiving: 2, minDecomposers: 1 },
        rewardBadgeName: 'مهندس شبكة التوازن 🕸️',
      },
    },
  ],
};
