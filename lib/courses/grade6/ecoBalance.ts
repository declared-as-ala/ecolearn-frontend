import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA ==============
export const ecoBalanceVideo6: AnimatedVideoData = {
  title: 'التوازن… بين الحياة والعناصر!',
  totalDuration: 65,
  scenes: [
    {
      id: 'scene-1-intro',
      title: 'المشهد 1: الغابة التونسية',
      background: 'forest',
      duration: 10,
      narratorText: 'مرحبًا أيها الحارس المتوازن! 🌿 اليوم سنزور غابة تونسية جميلة ونتعلم سر التوازن البيئي. كل شيء هنا مترابط: الأشجار، الحيوانات، الماء، والهواء!',
      elements: [
        { id: 'sun-forest', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '85%', y: '15%' }, delay: 0 },
        { id: 'tree-1', type: 'plant', props: { type: 'tree', size: 'large' }, position: { x: '20%', y: '55%' }, delay: 0.3 },
        { id: 'tree-2', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '75%', y: '60%' }, delay: 0.5 },
        { id: 'rabbit-forest', type: 'animal', props: { type: 'rabbit', size: 'medium', moving: true }, position: { x: '40%', y: '75%' }, delay: 0.8 },
        { id: 'fox-forest', type: 'animal', props: { type: 'fox', size: 'medium', moving: true }, position: { x: '65%', y: '70%' }, delay: 1 },
        { id: 'water-stream', type: 'water', props: { type: 'river', size: 'medium' }, position: { x: '50%', y: '88%' }, delay: 1.3 },
        { id: 'balance-icon', type: 'emoji', props: { emoji: '⚖️', size: 50 }, position: { x: '50%', y: '35%' }, delay: 1.6 },
        { id: 'tunisia-flag', type: 'emoji', props: { emoji: '🇹🇳', size: 30 }, position: { x: '10%', y: '20%' }, delay: 1.9 },
        { id: 'label-intro', type: 'text', props: { text: '🌿 غابة تونسية متوازنة' }, position: { x: '50%', y: '90%' }, delay: 2.2 },
      ],
      soundEffects: ['أشجار 🍃', 'طيور 🐦', 'ماء يجري 💧'],
      educationalHighlight: 'التوازن البيئي: علاقة متناغمة بين الكائنات الحية والعناصر غير الحية',
      transition: 'fade',
    },
    {
      id: 'scene-2-living-nonliving',
      title: 'المشهد 2: الحي وغير الحي',
      background: 'forest',
      duration: 12,
      narratorText: 'التوازن يحتاج لعناصر حية وغير حية معاً! الأشجار تنتج الأكسجين، الحيوانات تتنفس، الشمس تعطي الطاقة، والماء يسقي الجميع. كل شيء مترابط! 🌱☀️💧',
      elements: [
        { id: 'tree-living', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '20%', y: '55%' }, delay: 0 },
        { id: 'rabbit-living', type: 'animal', props: { type: 'rabbit', size: 'medium', moving: true }, position: { x: '40%', y: '70%' }, delay: 0.3 },
        { id: 'fox-living', type: 'animal', props: { type: 'fox', size: 'medium', moving: true }, position: { x: '60%', y: '65%' }, delay: 0.5 },
        { id: 'bacteria-living', type: 'animal', props: { type: 'bacteria', size: 'small' }, position: { x: '75%', y: '80%' }, delay: 0.7 },
        { id: 'divider', type: 'emoji', props: { emoji: '⬛', size: 5 }, position: { x: '50%', y: '45%' }, delay: 0.9 },
        { id: 'sun-nonliving', type: 'sun', props: { size: 'small', glowing: true }, position: { x: '80%', y: '20%' }, delay: 1.1 },
        { id: 'water-nonliving', type: 'water', props: { type: 'droplet', size: 'medium' }, position: { x: '30%', y: '30%' }, delay: 1.3 },
        { id: 'soil-nonliving', type: 'soil', props: { size: 'medium' }, position: { x: '50%', y: '88%' }, delay: 1.5 },
        { id: 'air-nonliving', type: 'emoji', props: { emoji: '💨', size: 35 }, position: { x: '60%', y: '25%' }, delay: 1.7 },
        { id: 'label-elements', type: 'text', props: { text: '🌱 حي + ☀️ غير حي = ⚖️ توازن' }, position: { x: '50%', y: '90%' }, delay: 2 },
      ],
      soundEffects: ['طبيعة متناغمة 🎶', 'تنفس 💨'],
      educationalHighlight: 'العناصر الحية (نباتات، حيوانات) + العناصر غير الحية (شمس، ماء، تربة) = توازن',
      transition: 'slide',
    },
    {
      id: 'scene-3-oxygen-cycle',
      title: 'المشهد 3: دورة الأكسجين',
      background: 'park',
      duration: 12,
      narratorText: 'شاهد دورة الأكسجين! 🌿💨 النباتات تستخدم ثاني أكسيد الكربون CO₂ وتنتج الأكسجين O₂. الحيوانات تتنفس O₂ وتخرج CO₂. دورة مستمرة تحافظ على توازن الهواء!',
      elements: [
        { id: 'sun-oxygen', type: 'sun', props: { size: 'small', glowing: true }, position: { x: '15%', y: '15%' }, delay: 0 },
        { id: 'tree-oxygen', type: 'plant', props: { type: 'tree', size: 'large' }, position: { x: '30%', y: '55%' }, delay: 0.3 },
        { id: 'co2-in', type: 'text', props: { text: 'CO₂ →' }, position: { x: '15%', y: '50%' }, delay: 0.6 },
        { id: 'o2-out', type: 'text', props: { text: '← O₂' }, position: { x: '50%', y: '45%' }, delay: 0.9 },
        { id: 'arrow-o2', type: 'arrow', props: { direction: 'right', color: '#22c55e', size: 'small' }, position: { x: '45%', y: '50%' }, delay: 1.2 },
        { id: 'animal-breathe', type: 'animal', props: { type: 'rabbit', size: 'medium', moving: true }, position: { x: '70%', y: '65%' }, delay: 1.5 },
        { id: 'co2-out', type: 'text', props: { text: '→ CO₂' }, position: { x: '85%', y: '60%' }, delay: 1.8 },
        { id: 'arrow-co2', type: 'arrow', props: { direction: 'down', color: '#6b7280', size: 'small' }, position: { x: '75%', y: '75%' }, delay: 2.1 },
        { id: 'cycle-icon', type: 'emoji', props: { emoji: '🔄', size: 40 }, position: { x: '50%', y: '80%' }, delay: 2.4 },
      ],
      soundEffects: ['تنفس 💨', 'أوراق 🍃'],
      educationalHighlight: 'دورة الأكسجين: نباتات تنتج O₂ ← حيوانات تتنفس ← تخرج CO₂ ← نباتات تستخدم CO₂',
      transition: 'slide',
    },
    {
      id: 'scene-4-imbalance',
      title: 'المشهد 4: عندما يختل التوازن',
      background: 'city',
      duration: 12,
      narratorText: 'لكن ماذا يحدث عندما يختل التوازن؟ 😢 قطع الأشجار يقلل الأكسجين، التلوث يسمم الماء، والحيوانات تفقد بيوتها. التوازن يتدمر!',
      elements: [
        { id: 'dead-tree', type: 'emoji', props: { emoji: '🪵', size: 50 }, position: { x: '25%', y: '60%' }, delay: 0 },
        { id: 'chainsaw', type: 'emoji', props: { emoji: '🪓', size: 40 }, position: { x: '30%', y: '50%' }, delay: 0.3 },
        { id: 'factory-pollute', type: 'emoji', props: { emoji: '🏭', size: 55 }, position: { x: '70%', y: '50%' }, delay: 0.6 },
        { id: 'smoke-pollution', type: 'pollution', props: { type: 'smoke', size: 'large' }, position: { x: '70%', y: '30%' }, delay: 0.9 },
        { id: 'polluted-water', type: 'emoji', props: { emoji: '🟤', size: 40 }, position: { x: '50%', y: '80%' }, delay: 1.2 },
        { id: 'sad-animal', type: 'animal', props: { type: 'rabbit', size: 'small', moving: true, direction: 'left' }, position: { x: '45%', y: '70%' }, delay: 1.5 },
        { id: 'warning-icon', type: 'emoji', props: { emoji: '⚠️', size: 45 }, position: { x: '50%', y: '35%' }, delay: 1.8 },
        { id: 'broken-balance', type: 'emoji', props: { emoji: '⚖️❌', size: 40 }, position: { x: '50%', y: '20%' }, delay: 2.1 },
        { id: 'label-imbalance', type: 'text', props: { text: '⚠️ اختلال التوازن' }, position: { x: '50%', y: '90%' }, delay: 2.4 },
      ],
      soundEffects: ['منشار 🪓', 'دخان 💨', 'موسيقى حزينة 😢'],
      educationalHighlight: 'اختلال التوازن: قطع الأشجار + التلوث = فقدان التوازن البيئي',
      transition: 'slide',
    },
    {
      id: 'scene-5-restore',
      title: 'المشهد 5: استعادة التوازن',
      background: 'farm',
      duration: 12,
      narratorText: 'لكننا نستطيع استعادة التوازن! 💪 ازرع الأشجار، نظّف الأنهار، احمِ الحيوانات، وقلل التلوث. أنت جزء من الحل! 🌱💧🐾',
      elements: [
        { id: 'planting-hero', type: 'emoji', props: { emoji: '🧑‍🌾', size: 50 }, position: { x: '25%', y: '60%' }, delay: 0 },
        { id: 'new-tree', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '40%', y: '55%' }, delay: 0.4 },
        { id: 'clean-water', type: 'water', props: { type: 'river', size: 'medium' }, position: { x: '60%', y: '80%' }, delay: 0.8 },
        { id: 'happy-fish', type: 'animal', props: { type: 'fish', size: 'small', moving: true }, position: { x: '65%', y: '75%' }, delay: 1.2 },
        { id: 'protected-animal', type: 'animal', props: { type: 'deer', size: 'medium', moving: true }, position: { x: '80%', y: '60%' }, delay: 1.6 },
        { id: 'shield-protect', type: 'emoji', props: { emoji: '🛡️', size: 35 }, position: { x: '85%', y: '55%' }, delay: 2 },
        { id: 'checkmark', type: 'emoji', props: { emoji: '✅', size: 40 }, position: { x: '50%', y: '35%' }, delay: 2.4 },
        { id: 'restored-balance', type: 'emoji', props: { emoji: '⚖️', size: 50 }, position: { x: '50%', y: '20%' }, delay: 2.8 },
      ],
      soundEffects: ['زراعة 🌱', 'ماء نظيف 💧', 'حيوانات سعيدة 🐾'],
      educationalHighlight: 'استعادة التوازن: زراعة + تنظيف + حماية = توازن جديد',
      transition: 'slide',
    },
    {
      id: 'scene-6-complete',
      title: 'المشهد 6: التوازن الكامل',
      background: 'park',
      duration: 7,
      narratorText: 'هذا هو التوازن البيئي الكامل! ⚖️🌍 شمس تعطي طاقة، نباتات تنتج أكسجين، حيوانات تعيش بسلام، ماء نظيف، وهواء نقي. أنت حارس هذا التوازن! 💚',
      elements: [
        { id: 'sun-complete', type: 'sun', props: { size: 'small', glowing: true }, position: { x: '50%', y: '10%' }, delay: 0 },
        { id: 'tree-complete', type: 'emoji', props: { emoji: '🌳', size: 45 }, position: { x: '25%', y: '40%' }, delay: 0.3 },
        { id: 'rabbit-complete', type: 'emoji', props: { emoji: '🐰', size: 40 }, position: { x: '45%', y: '40%' }, delay: 0.5 },
        { id: 'fox-complete', type: 'emoji', props: { emoji: '🦊', size: 40 }, position: { x: '65%', y: '40%' }, delay: 0.7 },
        { id: 'bacteria-complete', type: 'emoji', props: { emoji: '🦠', size: 35 }, position: { x: '85%', y: '40%' }, delay: 0.9 },
        { id: 'water-complete', type: 'emoji', props: { emoji: '💧', size: 40 }, position: { x: '35%', y: '60%' }, delay: 1.1 },
        { id: 'soil-complete', type: 'emoji', props: { emoji: '🌍', size: 40 }, position: { x: '55%', y: '60%' }, delay: 1.3 },
        { id: 'air-complete', type: 'emoji', props: { emoji: '💨', size: 35 }, position: { x: '75%', y: '60%' }, delay: 1.5 },
        { id: 'balance-final', type: 'emoji', props: { emoji: '⚖️', size: 60 }, position: { x: '50%', y: '80%' }, delay: 1.8 },
        { id: 'rainbow', type: 'emoji', props: { emoji: '🌈', size: 50 }, position: { x: '50%', y: '25%' }, delay: 2.1 },
      ],
      soundEffects: ['موسيقى انتصار 🎵', 'طبيعة سعيدة 🌿'],
      educationalHighlight: 'التوازن المتكامل: كل العناصر مترابطة ومتوازنة',
      transition: 'zoom',
    },
  ],
  finalMessage: 'أحسنت! أنت الآن حامي التوازن المتكامل! ⚖️🌍 حافظ على هذا التوازن في بيئتك!',
};

// ============== COURSE DATA ==============
export const ecoBalanceCourse: Course = {
  id: 'eco-balance',
  title: 'التوازن البيئي',
  grade: 6,
  icon: '⚖️',
  color: 'bg-lime-100',
  badge: { name: 'حامي التوازن المتكامل', icon: '🌍' },
  rewardMessages: {
    student: 'أنت الآن حامي التوازن! تفهم كيف تعمل الطبيعة معاً!',
    parent: 'طفلك تعلم عن التوازن البيئي وأهمية الحفاظ عليه! ⚖️',
    universalGoldBadge: { name: 'البطل الشامل للبيئة', icon: '🌍' },
  },
  videoConcept: {
    title: 'التوازن… بين الحياة والعناصر! ⚖️🌱💧',
    scenario: 'مرحبًا أيها الحارس المتوازن! 🌿 سنتعلم سر التوازن بين الكائنات والعناصر.',
    moralMessage: 'التوازن البيئي سر الحياة، وأنت حارسه!',
  },
  animatedVideo: ecoBalanceVideo6,
  videoStoryboard: {
    title: 'التوازن… بين الحياة والعناصر! ⚖️🌱💧',
    scenes: 'غابة تونسية، تغيرات التوازن، تدخل الإنسان',
    narratorText: 'مرحبًا أيها الحارس المتوازن! 🌿...',
    soundEffects: [
      'مطر 🌧️',
      'أشجار 🍃',
      'حيوانات 🐾',
      'انهيار تربة ⚠️',
      'توازن هادئ 🎶',
    ],
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1',
      type: 'matching',
      title: 'ما نوع الاختلال؟',
      points: 20,
      prompt: 'طابق الاضطراب مع نوعه: حيوي/لا حيوي 🌿',
      pairs: [
        { left: 'انقراض حيوان 🐾', right: 'حيوي' },
        { left: 'جفاف شديد 🌧️❌', right: 'لا حيوي' },
        { left: 'انتشار مرض بين الكائنات 🦠', right: 'حيوي' },
        { left: 'تلوث نهر 💧⚠️', right: 'لا حيوي' },
      ],
      successMessage: '✅ ممتاز! ميّزت بين الاختلالات الحيوية واللاحيوية ⚖️',
      errorMessage: '❌ حاول من جديد: الحيوي يتعلق بالكائنات، واللاحيّوي يتعلق بالعناصر غير الحية ⚖️',
      rewardBadge: { name: 'خبير الاختلالات', icon: '⚖️' },
    },
    {
      id: 'ex2',
      type: 'short',
      title: 'أعد التوازن!',
      points: 25,
      prompt: 'اكتب حلّين: واحد لتآكل التربة وواحد لتلوث النهر ✍️🌿💧',
      placeholder: 'مثال: غرس الأشجار... / تنظيف النهر...',
      requiredKeywords: ['تربة', 'نهر'],
      successMessage: '✅ رائع! حلولك تساعد على استرجاع التوازن ⚖️',
      errorMessage: '❌ حاول ذكر "التربة" و"النهر" وطرق الحماية/التنظيف 🌿💧',
      rewardBadge: { name: 'مُصلح التوازن', icon: '🔧' },
    },
    {
      id: 'ex3',
      type: 'multi',
      title: 'اختَر القرار الصحيح!',
      points: 20,
      prompt: 'اختر الإجراءات الصحيحة لحماية التوازن البيئي 🌍',
      options: [
        'غرس الأشجار 🌱',
        'رمي النفايات في النهر 💧🗑️',
        'ترشيد استعمال الماء 💧',
        'حماية الحيوانات 🐾',
        'إشعال حرائق في الغابة 🔥',
      ],
      correct: ['غرس الأشجار 🌱', 'ترشيد استعمال الماء 💧', 'حماية الحيوانات 🐾'],
      successMessage: '✅ ممتاز! هذه قرارات تحمي التوازن 🌍⚖️',
      errorMessage: '❌ انتبه: الحريق ورمي النفايات يسببان اختلالًا ⚠️',
      rewardBadge: { name: 'صانع القرارات الخضراء', icon: '🌿' },
    },
  ],
  games: [
    {
      id: 'g1',
      type: 'dragdrop',
      title: 'سباق أنقذ التوازن!',
      description: 'اسحب الحلول إلى المشكلة المناسبة لاسترجاع التوازن ⚖️',
      points: 35,
      gameData: {
        items: [
          { id: 's1', label: 'غرس الأشجار 🌱', category: 'تآكل التربة' },
          { id: 's2', label: 'تنظيف النهر 💧', category: 'تلوث النهر' },
          { id: 's3', label: 'منع قطع الأشجار 🚫🌳', category: 'تآكل التربة' },
          { id: 's4', label: 'منع رمي النفايات 🗑️🚫', category: 'تلوث النهر' },
        ],
        categories: ['تآكل التربة', 'تلوث النهر'],
        rewardBadgeName: 'منقذ التوازن 🛡️',
      },
    },
    {
      id: 'g2',
      type: 'scenario',
      title: 'مهمة راقب التفاعل',
      description: 'راقب التفاعل بين O₂ و CO₂ وضوء الشمس والحيوانات 🐾☀️',
      points: 30,
      gameData: {
        scenario: 'في الغابة 🌳: النباتات تستعمل ضوء الشمس ☀️، تنتج O₂، والحيوانات 🐾 تتنفس. ماذا يحدث؟',
        choices: [
          { id: 'c1', text: 'النباتات تساعد على زيادة O₂', impact: 10, explanation: '✅ صحيح: النباتات تنتج الأكسجين' },
          { id: 'c2', text: 'CO₂ لا علاقة له بالتوازن', impact: -5, explanation: '❌ لا: CO₂ جزء من توازن الغازات' },
          { id: 'c3', text: 'ضوء الشمس مهم لعملية البناء الضوئي ☀️', impact: 10, explanation: '✅ صحيح: الطاقة تبدأ من الشمس' },
        ],
        rewardBadgeName: 'مراقب الغازات 👁️',
      },
    },
    {
      id: 'g3',
      type: 'construction',
      title: 'بناء نظامك المتوازن',
      description: 'ابنِ نظامًا فيه 3 كائنات + 3 عناصر غير حية ⚖️🌱💧',
      points: 35,
      gameData: {
        availableElements: [
          { id: 'o1', name: 'نبات', type: 'producer', icon: '🌱' },
          { id: 'o2', name: 'شجرة', type: 'producer', icon: '🌳' },
          { id: 'o3', name: 'أرنب', type: 'consumer', icon: '🐰' },
          { id: 'o4', name: 'ثعلب', type: 'consumer', icon: '🦊' },
          { id: 'o5', name: 'محللات', type: 'decomposer', icon: '🦠' },
          { id: 'n1', name: 'ماء', type: 'water', icon: '💧' },
          { id: 'n2', name: 'شمس', type: 'sun', icon: '☀️' },
          { id: 'n3', name: 'تربة', type: 'soil', icon: '🌍' },
        ],
        constraints: { minLiving: 3, minNonLiving: 3 },
        rewardBadgeName: 'بانٍ النظام المتوازن 🏗️',
      },
    },
  ],
};
