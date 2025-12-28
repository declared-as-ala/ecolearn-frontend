import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA ==============
export const foodChainsVideo: AnimatedVideoData = {
  title: 'رحلة الطاقة… من الشمس إلى الصقر!',
  totalDuration: 90,
  scenes: [
    {
      id: 'scene-1-sun-energy',
      title: 'المشهد 1: بداية الرحلة',
      background: 'ocean',
      duration: 15,
      narratorText: 'مرحبًا أيها المسافر في سلسلة الحياة! 🌊 انظر إلى هذه الرحلة السرية التي تبدأ من الشمس! الطاقة تهبط إلى العوالق النباتية 🌿.',
      elements: [
        { id: 'sun', type: 'sun', props: { size: 'large', glowing: true }, position: { x: '85%', y: '15%' }, delay: 0 },
        { id: 'algae', type: 'plant', props: { type: 'flower', size: 'small' }, position: { x: '30%', y: '75%' }, delay: 1 },
        { id: 'light-beam', type: 'emoji', props: { emoji: '⚡', size: 40 }, position: { x: '60%', y: '40%' }, delay: 2 },
      ],
      soundEffects: ['صوت شعاع ⚡', 'أمواج 🌊'],
      educationalHighlight: 'الشمس هي مصدر الطاقة الأول لكل الكائنات',
      transition: 'fade',
    },
    {
      id: 'scene-2-chain-reaction',
      title: 'المشهد 2: السلسلة الغذائية',
      background: 'ocean',
      duration: 25,
      narratorText: 'ثم تنتقل الطاقة إلى السمكة الصغيرة 🐟… فالكبيرة 🐠… فالطائر البحري 🦅! لكن الطاقة لا تعود… تتبدد في كل مرحلة!',
      elements: [
        { id: 'small-fish', type: 'animal', props: { type: 'fish', size: 'small', moving: true }, position: { x: '40%', y: '70%' }, delay: 0 },
        { id: 'big-fish', type: 'animal', props: { type: 'fish', size: 'large', moving: true }, position: { x: '60%', y: '60%' }, delay: 2 },
        { id: 'bird', type: 'animal', props: { type: 'bird', size: 'medium', moving: true }, position: { x: '80%', y: '20%' }, delay: 4 },
        { id: 'energy-loss', type: 'emoji', props: { emoji: '📉', size: 30 }, position: { x: '50%', y: '50%' }, delay: 5 },
      ],
      soundEffects: ['صيد ومطاردة 🐟', 'رفرفة أجنحة 🦅', 'تنهيدة (طاقة ضائعة) 💨'],
      educationalHighlight: 'الطاقة تنتقل وتتبدد، ولا تدور',
      transition: 'slide',
    },
    {
      id: 'scene-3-matter-cycle',
      title: 'المشهد 3: دورة المادة',
      background: 'ocean', // Underwater view
      duration: 25,
      narratorText: 'أما المادة… فتُعاد! عندما يموت الطائر… تأتي البكتيريا 🦠 لتفكيك جثته... فتعيد المعادن إلى الماء… فتنمو العوالق من جديد!',
      elements: [
        { id: 'dead-bird', type: 'emoji', props: { emoji: '🦴', size: 30 }, position: { x: '50%', y: '85%' }, delay: 0 },
        { id: 'bacteria', type: 'animal', props: { type: 'bacteria', size: 'small' }, position: { x: '55%', y: '80%' }, delay: 1 },
        { id: 'minerals', type: 'emoji', props: { emoji: '💎', size: 20 }, position: { x: '45%', y: '75%' }, delay: 3 },
        { id: 'new-algae', type: 'plant', props: { type: 'flower', size: 'small' }, position: { x: '30%', y: '70%' }, delay: 5 },
        { id: 'cycle-arrow', type: 'emoji', props: { emoji: '🔄', size: 60 }, position: { x: '50%', y: '50%' }, delay: 6 },
      ],
      soundEffects: ['حركة بكتيريا 🦠', 'موسيقى دائرية 🔄'],
      educationalHighlight: 'المادة لا تفنى، بل يُعاد تدويرها بفضل المفككات',
      transition: 'zoom',
    },
    {
      id: 'scene-4-disruption',
      title: 'المشهد 4: كسر الدورة',
      background: 'ocean',
      duration: 25,
      narratorText: 'هذه دورة أبدية! لكن قطعة بلاستيك قد تكسر هذه الدورة 🛑، لأن البكتيريا لا تستطيع تفكيكها! أنت حارس هذه الدورة. هل ستسمح لها أن تستمر؟ 🌍',
      elements: [
        { id: 'plastic', type: 'emoji', props: { emoji: '🛍️🚫', size: 40 }, position: { x: '50%', y: '80%' }, delay: 1 },
        { id: 'bacteria-sad', type: 'emoji', props: { emoji: '🦠😢', size: 30 }, position: { x: '60%', y: '80%' }, delay: 2 },
        { id: 'cycle-broken', type: 'emoji', props: { emoji: '💔', size: 50 }, position: { x: '50%', y: '50%' }, delay: 3 },
        { id: 'hero', type: 'emoji', props: { emoji: '🦸', size: 50 }, position: { x: '20%', y: '50%' }, delay: 5 },
      ],
      soundEffects: ['صوت توقف مفاجئ 🛑', 'تحذير ⚠️', 'موسيقى ملهمة 🎵'],
      educationalHighlight: 'التلوث بالبلاستيك يعيق عمل المحللات ويكسر دورة المادة',
      transition: 'fade',
    },
  ],
  finalMessage: 'أنت حارس الدورة الأبدية. حافظ عليها! 🔄🌍',
};

// ============== COURSE DATA ==============
export const foodChainsCourse: Course = {
  id: 'food-chains-6',
  title: 'السلاسل الغذائية',
  grade: 6,
  icon: '🕸️',
  color: 'bg-amber-100',
  badge: { name: 'حارس الدورة الأبدية', icon: '🔄🌍' },
  rewardMessages: {
    student: 'أنت فهمت أن الطاقة تسير… والمادة تدور… فلم تكسر الحلقة!',
    parent: 'ولدك يرى الحياة كدورة أبدية… وليس كنهاية! 🌿',
    universalGoldBadge: { name: 'حارس الدورة الأبدية', icon: '🌍' },
  },
  videoConcept: {
    title: 'رحلة الطاقة… من الشمس إلى الصقر!',
    scenario: 'تتبع مسار الطاقة من الشمس إلى الكائنات، وكيف تعيد البكتيريا تدوير المادة في دورة لا تنتهي.',
    moralMessage: 'الطاقة تتبدد، لكن المادة تدور للأبد، وعلينا حماية هذه الدورة من التلوث.',
  },
  animatedVideo: foodChainsVideo,
  videoStoryboard: {
    title: 'رحلة الطاقة… من الشمس إلى الصقر!',
    scenes: 'شمس وعوالق → سمك وطير → موت وتحلل → عودة للحياة → خطر البلاستيك',
    narratorText: 'مرحبًا أيها المسافر! انظر إلى هذه الرحلة السرية التي تبدأ من الشمس...',
    soundEffects: ['طاقة ⚡', 'بحر 🌊', 'بكتيريا 🦠'],
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1',
      type: 'drag-sequence', // "Where Energy Goes?" - Visualize flow/loss
      title: 'أين تذهب الطاقة؟',
      points: 20,
      prompt: 'رتب مسار تدفق الطاقة من المصدر الأول ☀️',
      items: [
        { id: 'i1', label: 'الشمس ☀️', emoji: '☀️' },
        { id: 'i2', label: 'نبات (منتج) 🌿', emoji: '🌿' },
        { id: 'i3', label: 'فأر (مستهلك 1) 🐭', emoji: '🐭' },
        { id: 'i4', label: 'بومة (مستهلك 2) 🦉', emoji: '🦉' },
      ],
      correctOrder: ['i1', 'i2', 'i3', 'i4'],
      successMessage: 'صحيح! الطاقة تتدفق في اتجاه واحد! ⚡',
      errorMessage: 'تذكر: الشمس هي البداية دائماً.',
      rewardBadge: { name: 'رائد دراسة الطاقة', icon: '⚡' },
    },
    {
      id: 'ex2',
      type: 'scenario', // "Why Water Doesn't End?" - or "Recycling Steps" - let's make it a step ordering or selection
      title: 'لماذا لا تنتهي المادة؟',
      points: 20,
      prompt: 'كيف تعود المادة إلى الطبيعة بعد موت الكائن؟ اختر التفسير الصحيح 🔄',
      scenario: 'جثة حيوان في التربة... ماذا يحدث؟',
      options: [
        'تقوم البكتيريا بتفكيكها وإعادتها كمعادن للتربة ✅',
        'تختفي تماماً ولا يتبقى منها شيء',
        'تتحول إلى طاقة شمسية',
      ],
      correct: 'تقوم البكتيريا بتفكيكها وإعادتها كمعادن للتربة ✅',
      successMessage: 'ممتاز! البكتيريا هي سر التجدد! 🦠♻️',
      errorMessage: 'المادة لا تفنى... فكر في دور المفككات.',
      rewardBadge: { name: 'خبير التدوير الطبيعي', icon: '♻️' },
    },
    {
      id: 'ex3',
      type: 'scenario', // "Choose Right Chain"
      title: 'اختَر السلسلة الصحيحة!',
      points: 25,
      prompt: 'أي من هذه السلاسل الغذائية صحيحة ومنطقية؟ ⛓️',
      scenario: 'اختر الترتيب الطبيعي:',
      options: [
        'نبات ← فأر ← بوم ← بكتيريا ✅',
        'شمس ← نبات ← بوم (نسينا المستهلك الأول)',
        'بكتيريا ← نبات ← فأر (البداية خاطئة)',
      ],
      correct: 'نبات ← فأر ← بوم ← بكتيريا ✅', // Using arrow notation in option text
      successMessage: 'أحسنت! ترتيبك منطقي وصحيح! 🧵',
      errorMessage: 'ابدأ بالمنتج (النبات) ثم المستهلكين.',
      rewardBadge: { name: 'حرفي السلاسل', icon: '🧵' },
    },
  ],
  games: [
    {
      id: 'g1',
      type: 'dragdrop', // "Save the Cycle Race"
      title: 'سباق "أنقذ الدورة!"',
      description: 'أكمل الدورة بسرعة! اسحب البكتيريا للجثة، والمعادن للنبات.',
      points: 35,
      gameData: {
        items: [
          { id: 'bacteria', icon: '🦠', target: 'dead_body' },
          { id: 'minerals', icon: '💎', target: 'plant' },
          { id: 'sun', icon: '☀️', target: 'plant' },
        ],
        targets: [
          { id: 'dead_body', label: 'جثة' },
          { id: 'plant', label: 'نبات' },
        ],
        rewardBadgeName: 'منقذ الدورة الأبدية',
      },
    },
    {
      id: 'g2',
      type: 'decision', // "Watch Energy Flow" - simple tap to see energy levels
      title: 'مهمة مراقبة الطاقة',
      description: 'اضغط على الكائنات لترى كمية الطاقة المتبقية (1000 -> 100 -> 10).',
      points: 30,
      gameData: {
        levels: [
          { item: 'نبات', energy: 1000 },
          { item: 'فأر', energy: 100 },
          { item: 'أفعى', energy: 10 },
          { item: 'نسر', energy: 1 },
        ],
        message: 'لاحظ كيف تقل الطاقة كلما صعدنا في الهرم!',
        rewardBadgeName: 'خبير الطاقة البيئية',
      },
    },
    {
      id: 'g3',
      type: 'construction', // "Build Marine Chain"
      title: 'بناء سلسلتك البحرية',
      description: 'كوّن سلسلة بحرية من 4 عناصر. لا تنسَ المفكك (البكتيريا)!',
      points: 35,
      gameData: {
        elements: ['عوالق', 'سردين', 'تونا', 'قرش', 'بكتيريا', 'بحر'],
        requiredChainLength: 4,
        mustInclude: 'بكتيريا',
        rewardBadgeName: 'مهندس السلاسل البحرية',
      },
    },
  ],
};
