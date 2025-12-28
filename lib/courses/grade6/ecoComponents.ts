import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA ==============
export const ecoComponentsVideo: AnimatedVideoData = {
  title: 'العائلة الخفية للطبيعة!',
  totalDuration: 65,
  scenes: [
    {
      id: 'scene-1-intro',
      title: 'المشهد 1: اكتشاف البحيرة',
      background: 'underwater',
      duration: 10,
      narratorText: 'مرحبًا أيها المكتشف الصغير! 🌊 اليوم سنزور بحيرة تونسية جميلة ونتعرف على "العائلة الخفية" من الكائنات الحية وغير الحية التي تعيش فيها!',
      elements: [
        { id: 'lake-surface', type: 'water', props: { type: 'wave', size: 'large' }, position: { x: '50%', y: '20%' }, delay: 0 },
        { id: 'fish-1', type: 'animal', props: { type: 'fish', size: 'medium', moving: true }, position: { x: '30%', y: '55%' }, delay: 0.5 },
        { id: 'fish-2', type: 'animal', props: { type: 'fish', size: 'small', moving: true }, position: { x: '70%', y: '60%' }, delay: 0.8 },
        { id: 'algae-1', type: 'emoji', props: { emoji: '🌿', size: 40 }, position: { x: '20%', y: '80%' }, delay: 1 },
        { id: 'algae-2', type: 'emoji', props: { emoji: '🌿', size: 35 }, position: { x: '80%', y: '85%' }, delay: 1.2 },
        { id: 'sun-surface', type: 'sun', props: { size: 'small', glowing: true }, position: { x: '85%', y: '10%' }, delay: 1.5 },
        { id: 'tunisia-flag', type: 'emoji', props: { emoji: '🇹🇳', size: 30 }, position: { x: '15%', y: '15%' }, delay: 1.8 },
        { id: 'label-intro', type: 'text', props: { text: '🌊 بحيرة تونسية' }, position: { x: '50%', y: '90%' }, delay: 2 },
      ],
      soundEffects: ['تدفق الماء 💧', 'فقاعات 🫧', 'طيور البحيرة 🦆'],
      educationalHighlight: 'الوسط البيئي: مجموعة من الكائنات الحية وغير الحية تعيش معاً',
      transition: 'fade',
    },
    {
      id: 'scene-2-living',
      title: 'المشهد 2: العناصر الحية',
      background: 'underwater',
      duration: 12,
      narratorText: 'في هذه البحيرة، نجد عناصر حية كثيرة! الطحالب الخضراء تصنع الغذاء، الأسماك تسبح، الحلزون يتحرك ببطء، والبكتيريا الصغيرة تعمل في الخفاء! 🐟🐌🦠',
      elements: [
        { id: 'algae-living', type: 'emoji', props: { emoji: '🌿', size: 50 }, position: { x: '20%', y: '70%' }, delay: 0 },
        { id: 'text-algae', type: 'text', props: { text: 'طحالب (منتج)' }, position: { x: '20%', y: '85%' }, delay: 0.3 },
        { id: 'fish-living', type: 'animal', props: { type: 'fish', size: 'large', moving: true }, position: { x: '45%', y: '55%' }, delay: 0.5 },
        { id: 'text-fish', type: 'text', props: { text: 'سمكة (مستهلك)' }, position: { x: '45%', y: '70%' }, delay: 0.8 },
        { id: 'snail-living', type: 'emoji', props: { emoji: '🐌', size: 40 }, position: { x: '70%', y: '75%' }, delay: 1 },
        { id: 'text-snail', type: 'text', props: { text: 'حلزون' }, position: { x: '70%', y: '88%' }, delay: 1.3 },
        { id: 'bacteria-living', type: 'animal', props: { type: 'bacteria', size: 'small' }, position: { x: '85%', y: '65%' }, delay: 1.5 },
        { id: 'text-bacteria', type: 'text', props: { text: 'بكتيريا (محلل)' }, position: { x: '85%', y: '80%' }, delay: 1.8 },
        { id: 'label-living', type: 'text', props: { text: '🌿 العناصر الحية' }, position: { x: '50%', y: '90%' }, delay: 2.2 },
      ],
      soundEffects: ['فقاعات 🫧', 'أسماك تسبح 🐟', 'بكتيريا 🦠'],
      educationalHighlight: 'العناصر الحية: طحالب (منتجون) + أسماك/حلزون (مستهلكون) + بكتيريا (محللون)',
      transition: 'slide',
    },
    {
      id: 'scene-3-nonliving',
      title: 'المشهد 3: العناصر غير الحية',
      background: 'ocean',
      duration: 10,
      narratorText: 'لكن العائلة لا تكتمل بدون العناصر غير الحية! الماء يوفر البيئة، الشمس تعطي الطاقة، والتربة في القاع تحتوي على المعادن المهمة! ☀️💧🌍',
      elements: [
        { id: 'sun-nonliving', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '80%', y: '15%' }, delay: 0 },
        { id: 'text-sun', type: 'text', props: { text: 'شمس (طاقة)' }, position: { x: '80%', y: '35%' }, delay: 0.3 },
        { id: 'water-nonliving', type: 'water', props: { type: 'wave', size: 'large' }, position: { x: '50%', y: '50%' }, delay: 0.5 },
        { id: 'text-water', type: 'text', props: { text: 'ماء (وسط)' }, position: { x: '50%', y: '65%' }, delay: 0.8 },
        { id: 'soil-nonliving', type: 'soil', props: { size: 'large' }, position: { x: '50%', y: '85%' }, delay: 1 },
        { id: 'text-soil', type: 'text', props: { text: 'تربة (معادن)' }, position: { x: '50%', y: '90%' }, delay: 1.3 },
        { id: 'air-icon', type: 'emoji', props: { emoji: '💨', size: 35 }, position: { x: '25%', y: '30%' }, delay: 1.5 },
        { id: 'text-air', type: 'text', props: { text: 'هواء' }, position: { x: '25%', y: '42%' }, delay: 1.8 },
      ],
      soundEffects: ['شمس ساطعة ☀️', 'ماء يتدفق 💧'],
      educationalHighlight: 'العناصر غير الحية: الماء، الشمس، التربة، الهواء - ضرورية للحياة',
      transition: 'slide',
    },
    {
      id: 'scene-4-interactions',
      title: 'المشهد 4: تفاعل العائلة',
      background: 'underwater',
      duration: 12,
      narratorText: 'الآن شاهد كيف تتفاعل العائلة! الشمس تساعد الطحالب على النمو، الأسماك تأكل الطحالب، والبكتيريا تحلل الفضلات وتعيد المواد للتربة. دورة رائعة! 🔄',
      elements: [
        { id: 'sun-interact', type: 'sun', props: { size: 'small', glowing: true }, position: { x: '10%', y: '15%' }, delay: 0 },
        { id: 'arrow-sun', type: 'arrow', props: { direction: 'down', color: '#fbbf24', size: 'small', label: 'طاقة' }, position: { x: '15%', y: '35%' }, delay: 0.3 },
        { id: 'algae-interact', type: 'emoji', props: { emoji: '🌿', size: 45 }, position: { x: '20%', y: '55%' }, delay: 0.5 },
        { id: 'arrow-food', type: 'arrow', props: { direction: 'right', color: '#22c55e', size: 'small', label: 'غذاء' }, position: { x: '35%', y: '55%' }, delay: 0.8 },
        { id: 'fish-interact', type: 'animal', props: { type: 'fish', size: 'medium', moving: true }, position: { x: '55%', y: '55%' }, delay: 1 },
        { id: 'arrow-waste', type: 'arrow', props: { direction: 'down', color: '#8b4513', size: 'small', label: 'فضلات' }, position: { x: '55%', y: '70%' }, delay: 1.3 },
        { id: 'bacteria-interact', type: 'animal', props: { type: 'bacteria', size: 'medium' }, position: { x: '55%', y: '85%' }, delay: 1.5 },
        { id: 'arrow-cycle', type: 'arrow', props: { direction: 'left', color: '#8b4513', size: 'small', label: 'مواد' }, position: { x: '35%', y: '85%' }, delay: 1.8 },
        { id: 'cycle-icon', type: 'emoji', props: { emoji: '🔄', size: 40 }, position: { x: '80%', y: '50%' }, delay: 2 },
      ],
      soundEffects: ['تفاعلات طبيعية 🔄', 'موسيقى هادئة 🎶'],
      educationalHighlight: 'التفاعل: شمس ← طحالب ← أسماك ← بكتيريا ← مواد ← طحالب (دورة)',
      transition: 'slide',
    },
    {
      id: 'scene-5-complete-family',
      title: 'المشهد 5: العائلة الكاملة',
      background: 'underwater',
      duration: 11,
      narratorText: 'هذه هي العائلة الخفية للطبيعة! كل عنصر له دور: المنتجون يصنعون الغذاء، المستهلكون يأكلون، والمحللون يعيدون المواد. الجميع مهم! 👨‍👩‍👧‍👦🌿💧',
      elements: [
        { id: 'family-sun', type: 'sun', props: { size: 'small', glowing: true }, position: { x: '50%', y: '10%' }, delay: 0 },
        { id: 'family-algae', type: 'emoji', props: { emoji: '🌿', size: 40 }, position: { x: '25%', y: '35%' }, delay: 0.3 },
        { id: 'family-fish', type: 'emoji', props: { emoji: '🐟', size: 40 }, position: { x: '50%', y: '35%' }, delay: 0.5 },
        { id: 'family-snail', type: 'emoji', props: { emoji: '🐌', size: 40 }, position: { x: '75%', y: '35%' }, delay: 0.7 },
        { id: 'family-bacteria', type: 'emoji', props: { emoji: '🦠', size: 35 }, position: { x: '50%', y: '55%' }, delay: 0.9 },
        { id: 'family-water', type: 'emoji', props: { emoji: '💧', size: 35 }, position: { x: '30%', y: '70%' }, delay: 1.1 },
        { id: 'family-soil', type: 'emoji', props: { emoji: '🌍', size: 35 }, position: { x: '70%', y: '70%' }, delay: 1.3 },
        { id: 'heart-family', type: 'emoji', props: { emoji: '❤️', size: 50 }, position: { x: '50%', y: '75%' }, delay: 1.6 },
        { id: 'label-family', type: 'text', props: { text: '👨‍👩‍👧‍👦 عائلة الطبيعة' }, position: { x: '50%', y: '90%' }, delay: 2 },
      ],
      soundEffects: ['موسيقى هادئة 🎶', 'انسجام الطبيعة 🌿'],
      educationalHighlight: 'مكونات الوسط البيئي: عناصر حية (منتجون، مستهلكون، محللون) + عناصر غير حية',
      transition: 'zoom',
    },
  ],
  finalMessage: 'أحسنت! أنت الآن عضو شرفي في عائلة الطبيعة! 🌍 تذكر أن كل عنصر مهم!',
};

// ============== COURSE DATA ==============
export const ecoComponentsCourse: Course = {
  id: 'eco-components',
  title: 'مكونات الوسط البيئي',
  grade: 6,
  icon: '🏞️',
  color: 'bg-green-100',
  badge: { name: 'عضو شرفي في عائلة الطبيعة', icon: '🌍' },
  rewardMessages: {
    student: 'أنت الآن عضو في عائلة الطبيعة! تفهم كل مكوناتها!',
    parent: 'طفلك تعلم عن مكونات الوسط البيئي وأهمية كل عنصر! 🌍',
    universalGoldBadge: { name: 'البطل الشامل للبيئة', icon: '🌍' },
  },
  videoConcept: {
    title: 'العائلة الخفية للطبيعة! 👨‍👩‍👧‍👦🌿💧',
    scenario: 'مرحبًا أيها المكتشف الصغير! 🌊 اليوم سنتعرف على العائلة الخفية في الوسط البيئي.',
    moralMessage: 'كل عنصر في الطبيعة له دور مهم، ونحن جزء من هذه العائلة!',
  },
  animatedVideo: ecoComponentsVideo,
  videoStoryboard: {
    title: 'العائلة الخفية للطبيعة! 👨‍👩‍👧‍👦🌿💧',
    scenes: 'بحيرة تونسية، طحالب، أسماك، حلزون، بكتيريا، شمس، حركة ديناميكية',
    narratorText: 'مرحبًا أيها المكتشف الصغير! 🌊...',
    soundEffects: [
      'تدفق الماء 💧',
      'فقاعات 🫧',
      'طيور 🦆',
      'بكتيريا 🦠',
      'موسيقى متوترة ⚠️',
      'انسجام هادئ 🎶',
    ],
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1',
      type: 'multi',
      title: 'من ينتمي إلى العائلة؟',
      points: 20,
      prompt: 'اختر عناصر الوسط البيئي التي تنتمي إلى "عائلة الطبيعة" 🌍',
      options: ['طحالب 🌿', 'أسماك 🐟', 'حلزون 🐌', 'بكتيريا 🦠', 'شمس ☀️', 'سيارة 🚗'],
      correct: ['طحالب 🌿', 'أسماك 🐟', 'حلزون 🐌', 'بكتيريا 🦠', 'شمس ☀️'],
      successMessage: '✅ ممتاز! هذه مكونات مهمة للوسط البيئي 🌍',
      errorMessage: '❌ انتبه: السيارة ليست عنصرًا طبيعيًا من مكونات الوسط البيئي هنا 🚗',
      rewardBadge: { name: 'خبير العناصر', icon: '🌿' },
    },
    {
      id: 'ex2',
      type: 'short',
      title: 'لماذا هذا العنصر مهم؟',
      points: 20,
      prompt: 'اكتب جملة قصيرة تشرح لماذا عنصر واحد (تختاره) مهم في الوسط البيئي ✍️',
      placeholder: 'مثال: البكتيريا مهمة لأنها تحلل... 🦠',
      requiredKeywords: ['مهم', 'لأن'],
      successMessage: '✅ رائع! جملتك توضّح أهمية العنصر داخل العائلة 🌿',
      errorMessage: '❌ حاول إضافة سبب واضح (لأن...) يشرح أهمية العنصر 💡',
      rewardBadge: { name: 'كاتب البيئة', icon: '✍️' },
    },
    {
      id: 'ex3',
      type: 'sticker-repair',
      title: 'صلّح العائلة المفككة',
      points: 25,
      prompt: 'استخدم الملصقات لإرجاع العناصر الناقصة إلى مكانها الصحيح 👨‍👩‍👧‍👦🌿💧',
      sceneTitle: '🌊 وسط بيئي ناقص',
      slots: [
        { id: 'slot1', label: 'عنصر حي صغير' },
        { id: 'slot2', label: 'عنصر غير حي (طاقة)' },
        { id: 'slot3', label: 'محلّل' },
      ],
      stickers: [
        { id: 'st1', label: 'حلزون', emoji: '🐌', slotId: 'slot1' },
        { id: 'st2', label: 'شمس', emoji: '☀️', slotId: 'slot2' },
        { id: 'st3', label: 'بكتيريا', emoji: '🦠', slotId: 'slot3' },
      ],
      successMessage: '✅ أحسنت! العائلة عادت كاملة 🌍',
      errorMessage: '❌ ليس بعد… ضع كل عنصر في المكان الأنسب داخل الوسط البيئي 🌿',
      rewardBadge: { name: 'مُصلح العائلة', icon: '🔧' },
    },
  ],
  games: [
    {
      id: 'g1',
      type: 'runner',
      title: 'سباق أعد العائلة!',
      description: 'اجمع عناصر الوسط البيئي قبل أن تختفي! 🫧',
      points: 35,
      gameData: {
        collectItems: ['🌿', '🐟', '🐌', '🦠', '☀️'],
        hazardItems: ['⚠️', '💨', '🚗'],
        lives: 3,
        timeLimitSec: 35,
        rewardBadgeName: 'جامع العناصر 🏆',
      },
    },
    {
      id: 'g2',
      type: 'scenario',
      title: 'مهمة راقب تفاعل العائلة',
      description: 'راقب تفاعل عناصر الوسط البيئي واختر ما يحدث بينها 🌊🌿',
      points: 30,
      gameData: {
        scenario: 'في بحيرة تونسية 🌊: الطحالب 🌿 تنمو تحت الشمس ☀️، الأسماك 🐟 تأكل، والبكتيريا 🦠 تحلل. ماذا تلاحظ؟',
        choices: [
          { id: 'c1', text: 'الشمس ☀️ تساعد الطحالب 🌿 على النمو', impact: 10, explanation: '✅ صحيح: الطاقة تبدأ من الشمس ☀️' },
          { id: 'c2', text: 'البكتيريا 🦠 تُفسد الوسط دائمًا', impact: -5, explanation: '❌ لا: البكتيريا مهمة للتحلل وإعادة المواد' },
          { id: 'c3', text: 'الأسماك 🐟 جزء من العائلة لأنها كائن حي', impact: 10, explanation: '✅ صحيح: عنصر حي داخل الوسط' },
        ],
        rewardBadgeName: 'مراقب التفاعلات 👁️',
      },
    },
    {
      id: 'g3',
      type: 'construction',
      title: 'بناء عائلتك البيئية',
      description: 'اختر وسطًا بيئيًا وأضف 3 عناصر حية + 3 عناصر غير حية 🌍',
      points: 35,
      gameData: {
        availableElements: [
          { id: 'l1', name: 'طحالب', type: 'producer', icon: '🌿' },
          { id: 'l2', name: 'سمكة', type: 'consumer', icon: '🐟' },
          { id: 'l3', name: 'حلزون', type: 'consumer', icon: '🐌' },
          { id: 'l4', name: 'بكتيريا', type: 'decomposer', icon: '🦠' },
          { id: 'n1', name: 'شمس', type: 'sun', icon: '☀️' },
          { id: 'n2', name: 'ماء', type: 'water', icon: '💧' },
          { id: 'n3', name: 'تربة', type: 'soil', icon: '🌍' },
        ],
        constraints: {
          minLiving: 3,
          minNonLiving: 3,
        },
        rewardBadgeName: 'بانٍ العائلة البيئية 🏗️',
      },
    },
  ],
};
