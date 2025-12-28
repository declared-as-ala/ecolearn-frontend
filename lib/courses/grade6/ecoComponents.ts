import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA ==============
export const ecoComponentsVideo: AnimatedVideoData = {
  title: 'العائلة الخفية للطبيعة!',
  totalDuration: 90,
  scenes: [
    {
      id: 'scene-1-lake-intro',
      title: 'المشهد 1: بحيرة تونسية',
      background: 'ocean', // Using ocean as close approximation for lake
      duration: 15,
      narratorText: 'مرحبًا أيها المكتشف الصغير! 🌊 هذه البحيرة ليست مجرد ماء… بل عائلة متكاملة! انظر: الماء، التربة، الهواء، والشمس هم العناصر غير الحية.',
      elements: [
        { id: 'lake-bg', type: 'water', props: { type: 'wave', size: 'large' }, position: { x: '50%', y: '80%' }, delay: 0 },
        { id: 'sun', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '85%', y: '15%' }, delay: 0.5 },
        { id: 'rock', type: 'emoji', props: { emoji: '🪨', size: 40 }, position: { x: '20%', y: '85%' }, delay: 1 },
        { id: 'air-wind', type: 'emoji', props: { emoji: '💨', size: 40 }, position: { x: '70%', y: '30%' }, delay: 1.5 },
        { id: 'label-abiotic', type: 'text', props: { text: 'عناصر غير حية' }, position: { x: '50%', y: '90%' }, delay: 2 },
      ],
      soundEffects: ['تدفق الماء 💧', 'رياح خفيفة 🍃'],
      educationalHighlight: 'الوسط البيئي يتكون من عناصر حية وغير حية',
      transition: 'fade',
    },
    {
      id: 'scene-2-living-elements',
      title: 'المشهد 2: الكائنات الحية',
      background: 'ocean',
      duration: 20,
      narratorText: 'وهنا الأعضاء الحية: العوالق النباتية 🌿، الحلزون 🐌، السمكة 🐟، والبكتيريا الصغيرة 🦠. كل واحد منهم له دور لا يُعوَّض!',
      elements: [
        { id: 'algae', type: 'plant', props: { type: 'flower', size: 'small' }, position: { x: '30%', y: '75%' }, delay: 0.5 }, // Using flower as generic plant if algae not avail
        { id: 'snail', type: 'animal', props: { type: 'snail', size: 'small', moving: true }, position: { x: '40%', y: '80%' }, delay: 1 },
        { id: 'fish', type: 'animal', props: { type: 'fish', size: 'medium', moving: true }, position: { x: '60%', y: '70%' }, delay: 1.5 },
        { id: 'bacteria', type: 'animal', props: { type: 'bacteria', size: 'small' }, position: { x: '80%', y: '85%' }, delay: 2 },
        { id: 'label-biotic', type: 'text', props: { text: 'كائنات حية' }, position: { x: '50%', y: '90%' }, delay: 2.5 },
      ],
      soundEffects: ['فقاعات 🫧', 'حركة سمكة 🐟'],
      educationalHighlight: 'لكل كائن حي دور في النظام البيئي',
      transition: 'slide',
    },
    {
      id: 'scene-3-interaction',
      title: 'المشهد 3: التفاعل العائلي',
      background: 'ocean',
      duration: 25,
      narratorText: 'الطحالب تصنع الأكسجين… الحلزون يأكل الطحالب الزائدة… السمكة تأكل الحلزون… والبكتيريا تُعيد كل شيء إلى التربة! الوسط البيئي كعائلة مترابطة.',
      elements: [
        { id: 'oxygen-bubble', type: 'emoji', props: { emoji: '🫧O2', size: 30 }, position: { x: '30%', y: '65%' }, delay: 0.5 },
        { id: 'arrow1', type: 'arrow', props: { direction: 'right', size: 'small' }, position: { x: '35%', y: '75%' }, delay: 1.5 },
        { id: 'arrow2', type: 'arrow', props: { direction: 'right', size: 'small' }, position: { x: '50%', y: '75%' }, delay: 3 },
        { id: 'cycle', type: 'emoji', props: { emoji: '🔄', size: 60 }, position: { x: '50%', y: '50%' }, delay: 5 },
      ],
      soundEffects: ['موسيقى هادئة ومتناغمة 🎶'],
      educationalHighlight: 'العلاقات الغذائية والبيئية تربط جميع العناصر',
      transition: 'zoom',
    },
    {
      id: 'scene-4-disruption',
      title: 'المشهد 4: ماذا لو؟',
      background: 'desert', // Symbolizing loss
      duration: 20,
      narratorText: 'لكن ماذا لو اختفى الماء؟ تموت الطحالب… يجوع الحلزون… تختفي السمكة! إذا مرض أحد أفراد العائلة… مرضت كلها! أنت الآن جزء من هذه العائلة. هل ستحميها؟ 🌍',
      elements: [
        { id: 'no-water', type: 'emoji', props: { emoji: '🏜️', size: 60 }, position: { x: '50%', y: '70%' }, delay: 0.5 },
        { id: 'sad-snail', type: 'emoji', props: { emoji: '🐌😢', size: 40 }, position: { x: '30%', y: '70%' }, delay: 1.5 },
        { id: 'skeleton-fish', type: 'emoji', props: { emoji: '🐟💀', size: 40 }, position: { x: '70%', y: '70%' }, delay: 2.5 },
        { id: 'question', type: 'emoji', props: { emoji: '❓', size: 80 }, position: { x: '50%', y: '40%' }, delay: 4 },
      ],
      soundEffects: ['رياح جافة 💨', 'موسيقى حزينة 🎻'],
      educationalHighlight: 'التوازن هش ويعتمد على وجود جميع العناصر',
      transition: 'fade',
    },
  ],
  finalMessage: 'أنت الآن جزء من هذه العائلة. هل ستحميها؟ 🌍❤️',
};

// ============== COURSE DATA ==============
export const ecoComponentsCourse: Course = {
  id: 'eco-components-6',
  title: 'مكونات الوسط البيئي',
  grade: 6,
  icon: '🌊',
  color: 'bg-cyan-100',
  badge: { name: 'عضو شرفي في عائلة الطبيعة', icon: '👨‍👩‍👧‍👦🌍' },
  rewardMessages: {
    student: 'أنت فهمت أن كل عنصر، حتى الصامت، له صوت في عائلة الحياة!',
    parent: 'ولدك يرى الطبيعة كعائلة… وليس كأشياء منعزلة! 🌿',
    universalGoldBadge: { name: 'عضو شرفي في عائلة الطبيعة', icon: '🌍' },
  },
  videoConcept: {
    title: 'العائلة الخفية للطبيعة!',
    scenario: 'جولة في بحيرة تونسية لاستكشاف العلاقات بين العناصر الحية وغير الحية وكأنها عائلة.',
    moralMessage: 'الوسط البيئي عائلة واحدة، وسلامة الفرد من سلامة الجميع.',
  },
  animatedVideo: ecoComponentsVideo,
  videoStoryboard: {
    title: 'العائلة الخفية للطبيعة!',
    scenes: 'بحيرة تونسية → عناصر حية وغير حية → سلسلة غذائية → اختفاء الماء → أهمية التوازن',
    narratorText: 'مرحبًا أيها المكتشف الصغير! هذه البحيرة ليست مجرد ماء… بل عائلة متكاملة!',
    soundEffects: ['ماء 💧', 'طيور 🦆', 'موسيقى هادئة 🎶'],
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1',
      type: 'scenario', // "Who Belongs?" - effectively identifying eco elements
      title: 'من ينتمي إلى العائلة؟',
      points: 20,
      prompt: 'حدد العنصر الذي لا ينتمي إلى الوسط البيئي الطبيعي للبحيرة 🌊',
      scenario: 'أمامك مجموعة عناصر، أحدها دخيل:',
      options: [
        'سمكة 🐟',
        'طحالب 🌿',
        'قارورة بلاستيك 🗑️ (دخيل)',
        'بكتيريا 🦠',
      ],
      correct: 'قارورة بلاستيك 🗑️ (دخيل)',
      successMessage: 'أحسنت! البلاستيك غريب عن عائلة الطبيعة! 👏',
      errorMessage: 'أنظر جيداً… هل البلاستيك كائن حي أو عنصر طبيعي؟',
      rewardBadge: { name: 'عضو شرفي', icon: '👨‍👩‍👧‍👦' },
    },
    {
      id: 'ex2',
      type: 'scenario', // "Why Important?" - Choosing correct importance statement
      title: 'لماذا هذا العنصر مهم؟',
      points: 20,
      prompt: 'اختر الجملة الصحيحة التي تشرح أهمية البكتيريا 🦠',
      scenario: 'لماذا لا يمكننا الاستغناء عن البكتيريا في التربة؟',
      options: [
        'لأنها تعيد العناصر والمواد إلى التربة بعد موت الكائنات ✅',
        'لأنها تأكل الأسماك الكبيرة',
        'لأنها تلوث المياه',
      ],
      correct: 'لأنها تعيد العناصر والمواد إلى التربة بعد موت الكائنات ✅',
      successMessage: 'صحيح! البكتيريا هي مهندسة إعادة التدوير! ♻️',
      errorMessage: 'البكتيريا المفككة لها دور حيوي في التخلص من البقايا.',
      rewardBadge: { name: 'حكيم العناصر', icon: '📜' },
    },
    {
      id: 'ex3',
      type: 'sticker-repair', // "Fix Broken Family"
      title: 'صلّح العائلة المفككة',
      points: 25,
      prompt: 'أعد العناصر المفقودة إلى البحيرة لتكتمل العائلة 🧩',
      sceneTitle: 'بحيرة ناقصة الحياة',
      slots: [
        { id: 's1', label: 'مصدر طاقة' },
        { id: 's2', label: 'وسط العيش' },
        { id: 's3', label: 'مفكك' },
      ],
      stickers: [
        { id: 'st1', label: 'الشمس', emoji: '☀️', slotId: 's1' },
        { id: 'st2', label: 'الماء', emoji: '💧', slotId: 's2' },
        { id: 'st3', label: 'بكتيريا', emoji: '🦠', slotId: 's3' },
      ],
      successMessage: 'رائع! عادت الحياة إلى البحيرة! 🌊☀️',
      errorMessage: 'تذكر: الشمس، الماء، والمفككات أساس النظام.',
      rewardBadge: { name: 'مصلح الروابط', icon: '🔗' },
    },
  ],
  games: [
    {
      id: 'g1',
      type: 'runner', // "Restore Family Race"
      title: 'سباق "أعد العائلة!"',
      description: 'اجمع العناصر الطبيعية (ماء، شمس، نبات) وتجنب النفايات الدخيلة!',
      points: 35,
      gameData: {
        collectItems: ['💧', '☀️', '🌿', '🪨'],
        hazardItems: ['🥤', '🛍️', '🛢️'], // Plastic, bag, oil
        timeLimitSec: 40,
        rewardBadgeName: 'جامع العائلة',
      },
    },
    {
      id: 'g2',
      type: 'decision', // "Observe Interaction" - simulating monitoring
      title: 'مهمة مراقبة التفاعل',
      description: 'اضغط على العناصر لترى كيف تتفاعل مع بعضها (لعبة محاكاة بسيطة).',
      points: 30,
      gameData: {
        interactions: [
          { trigger: 'الماء 💧', effect: 'نمو الطحالب 🌿' },
          { trigger: 'البكتيريا 🦠', effect: 'خصوبة التربة 🪨' },
        ],
        rewardBadgeName: 'مُدرِك الروابط الخفية',
      },
    },
    {
      id: 'g3',
      type: 'construction', // "Build Eco Family"
      title: 'بناء عائلتك البيئية',
      description: 'اختر بيئة (غابة، بحيرة...) وضع فيها 3 كائنات حية و3 عناصر غير حية متوافقة.',
      points: 35,
      gameData: {
        environments: ['desert', 'forest', 'lake'],
        elements: ['جمل', 'سمكة', 'شجرة', 'رمل', 'ماء', 'شمس'],
        logic: 'matching-habitat', // Logic check: Fish needs Water, Camel needs Desert
        rewardBadgeName: 'مؤسس العائلات البيئية',
      },
    },
  ],
};
