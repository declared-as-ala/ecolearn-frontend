import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA ==============
export const respiratorySafetyVideo: AnimatedVideoData = {
  title: 'أنفي… درعك الأول ضد التلوث!',
  totalDuration: 70,
  scenes: [
    {
      id: 'scene-1-intro',
      title: 'المشهد 1: مقدمة - الجهاز التنفسي',
      background: 'city',
      duration: 10,
      narratorText: 'مرحبًا أيها الحارس الصغير! 🌬️ اليوم سنتعلم كيف نحمي جهازنا التنفسي. أنفك ورئتاك هما بوابة الأكسجين لجسمك. لكن الهواء ليس دائماً نظيفاً!',
      elements: [
        { id: 'city-bg', type: 'emoji', props: { emoji: '🏙️', size: 80 }, position: { x: '50%', y: '30%' }, delay: 0 },
        { id: 'lungs-icon', type: 'emoji', props: { emoji: '🫁', size: 60 }, position: { x: '50%', y: '60%' }, delay: 0.5 },
        { id: 'nose-icon', type: 'emoji', props: { emoji: '👃', size: 50 }, position: { x: '25%', y: '55%' }, delay: 0.8 },
        { id: 'oxygen', type: 'emoji', props: { emoji: '💨', size: 35 }, position: { x: '75%', y: '55%' }, delay: 1.1 },
        { id: 'shield', type: 'emoji', props: { emoji: '🛡️', size: 40 }, position: { x: '50%', y: '78%' }, delay: 1.4 },
        { id: 'label-intro', type: 'text', props: { text: '🌬️ الجهاز التنفسي' }, position: { x: '50%', y: '90%' }, delay: 1.7 },
      ],
      soundEffects: ['تنفس عميق 🌿', 'أصوات المدينة 🏙️'],
      educationalHighlight: 'الجهاز التنفسي: الأنف والرئتان يحتاجان لهواء نظيف ليعملا بشكل صحيح',
      transition: 'fade',
    },
    {
      id: 'scene-2-polluted-city',
      title: 'المشهد 2: المدينة الملوثة',
      background: 'city',
      duration: 12,
      narratorText: 'في الشوارع المزدحمة، السيارات والمصانع تطلق دخاناً ضاراً! 🚗💨 هذا الدخان يحتوي على مواد سامة تؤذي رئتيك وتسبب السعال وضيق التنفس.',
      elements: [
        { id: 'cars', type: 'emoji', props: { emoji: '🚗', size: 50 }, position: { x: '25%', y: '75%' }, delay: 0 },
        { id: 'car-smoke', type: 'pollution', props: { type: 'smoke', size: 'medium' }, position: { x: '30%', y: '60%' }, delay: 0.3 },
        { id: 'factory', type: 'emoji', props: { emoji: '🏭', size: 60 }, position: { x: '75%', y: '55%' }, delay: 0.5 },
        { id: 'factory-smoke', type: 'pollution', props: { type: 'smoke', size: 'large' }, position: { x: '75%', y: '35%' }, delay: 0.8 },
        { id: 'coughing-person', type: 'emoji', props: { emoji: '😷', size: 45 }, position: { x: '50%', y: '70%' }, delay: 1.1 },
        { id: 'warning', type: 'emoji', props: { emoji: '⚠️', size: 40 }, position: { x: '50%', y: '30%' }, delay: 1.4 },
        { id: 'dust', type: 'emoji', props: { emoji: '🟤', size: 25 }, position: { x: '40%', y: '50%' }, delay: 1.7 },
        { id: 'label-pollution', type: 'text', props: { text: '⚠️ تلوث الهواء' }, position: { x: '50%', y: '90%' }, delay: 2 },
      ],
      soundEffects: ['سعال 😷', 'سيارات 🚗', 'مصانع 🏭', 'موسيقى متوترة ⚠️'],
      educationalHighlight: 'تلوث الهواء: دخان السيارات والمصانع يضر بالجهاز التنفسي',
      transition: 'slide',
    },
    {
      id: 'scene-3-clean-park',
      title: 'المشهد 3: الحديقة النظيفة',
      background: 'park',
      duration: 12,
      narratorText: 'لكن انظر! في الحديقة، الهواء نظيف ومنعش! 🌳🌿 الأشجار تنتج الأكسجين وتنظف الهواء. هنا تستطيع رئتاك التنفس بحرية!',
      elements: [
        { id: 'sun-park', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '85%', y: '15%' }, delay: 0 },
        { id: 'tree-1', type: 'plant', props: { type: 'tree', size: 'large' }, position: { x: '20%', y: '55%' }, delay: 0.3 },
        { id: 'tree-2', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '75%', y: '60%' }, delay: 0.5 },
        { id: 'flower-1', type: 'plant', props: { type: 'flower', size: 'small' }, position: { x: '40%', y: '80%' }, delay: 0.7 },
        { id: 'grass-1', type: 'plant', props: { type: 'grass', size: 'medium' }, position: { x: '60%', y: '85%' }, delay: 0.9 },
        { id: 'happy-person', type: 'emoji', props: { emoji: '😊', size: 50 }, position: { x: '50%', y: '70%' }, delay: 1.1 },
        { id: 'deep-breath', type: 'emoji', props: { emoji: '🌬️', size: 35 }, position: { x: '55%', y: '65%' }, delay: 1.4 },
        { id: 'bird', type: 'animal', props: { type: 'bird', size: 'small', moving: true }, position: { x: '35%', y: '40%' }, delay: 1.7 },
        { id: 'oxygen-flow', type: 'emoji', props: { emoji: '💨', size: 30 }, position: { x: '30%', y: '50%' }, delay: 2 },
        { id: 'label-clean', type: 'text', props: { text: '🌿 هواء نظيف' }, position: { x: '50%', y: '90%' }, delay: 2.3 },
      ],
      soundEffects: ['تنفس عميق 🌿', 'طيور تغرد 🐦', 'موسيقى هادئة 🎶'],
      educationalHighlight: 'الحدائق والأشجار تنتج أكسجين نظيف للتنفس',
      transition: 'slide',
    },
    {
      id: 'scene-4-protection',
      title: 'المشهد 4: طرق الحماية',
      background: 'city',
      duration: 12,
      narratorText: 'كيف نحمي جهازنا التنفسي؟ 🛡️ ابتعد عن الدخان، ارتدِ كمامة في الأماكن الملوثة، افتح النوافذ للتهوية، وازرع نباتات في البيت!',
      elements: [
        { id: 'mask', type: 'emoji', props: { emoji: '😷', size: 50 }, position: { x: '25%', y: '40%' }, delay: 0 },
        { id: 'checkmark-1', type: 'emoji', props: { emoji: '✅', size: 25 }, position: { x: '30%', y: '35%' }, delay: 0.3 },
        { id: 'window', type: 'emoji', props: { emoji: '🪟', size: 50 }, position: { x: '50%', y: '40%' }, delay: 0.5 },
        { id: 'checkmark-2', type: 'emoji', props: { emoji: '✅', size: 25 }, position: { x: '55%', y: '35%' }, delay: 0.8 },
        { id: 'plant-home', type: 'emoji', props: { emoji: '🪴', size: 50 }, position: { x: '75%', y: '40%' }, delay: 1 },
        { id: 'checkmark-3', type: 'emoji', props: { emoji: '✅', size: 25 }, position: { x: '80%', y: '35%' }, delay: 1.3 },
        { id: 'no-smoke', type: 'emoji', props: { emoji: '🚭', size: 50 }, position: { x: '40%', y: '70%' }, delay: 1.5 },
        { id: 'park-icon', type: 'emoji', props: { emoji: '🌳', size: 50 }, position: { x: '60%', y: '70%' }, delay: 1.8 },
        { id: 'label-protect', type: 'text', props: { text: '🛡️ طرق الحماية' }, position: { x: '50%', y: '90%' }, delay: 2.1 },
      ],
      soundEffects: ['تهوية 🌬️', 'نباتات داخلية 🪴'],
      educationalHighlight: 'الحماية: كمامة، تهوية، نباتات داخلية، الابتعاد عن الدخان',
      transition: 'slide',
    },
    {
      id: 'scene-5-clean-city',
      title: 'المشهد 5: مدينة نظيفة',
      background: 'park',
      duration: 12,
      narratorText: 'معاً نستطيع بناء مدينة أنظف! 🏙️🌿 استخدم الدراجة بدل السيارة، ادعم الطاقة النظيفة، وازرع الأشجار في كل مكان. مستقبل صحي للجميع!',
      elements: [
        { id: 'bike', type: 'emoji', props: { emoji: '🚲', size: 50 }, position: { x: '25%', y: '70%' }, delay: 0 },
        { id: 'electric-bus', type: 'emoji', props: { emoji: '🚌⚡', size: 50 }, position: { x: '50%', y: '75%' }, delay: 0.3 },
        { id: 'solar-panel', type: 'emoji', props: { emoji: '☀️', size: 45 }, position: { x: '75%', y: '50%' }, delay: 0.6 },
        { id: 'tree-city', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '20%', y: '55%' }, delay: 0.9 },
        { id: 'tree-city-2', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '80%', y: '60%' }, delay: 1.1 },
        { id: 'happy-lungs', type: 'emoji', props: { emoji: '🫁✨', size: 50 }, position: { x: '50%', y: '45%' }, delay: 1.4 },
        { id: 'clean-air', type: 'emoji', props: { emoji: '💨✅', size: 35 }, position: { x: '50%', y: '30%' }, delay: 1.7 },
        { id: 'rainbow', type: 'emoji', props: { emoji: '🌈', size: 50 }, position: { x: '50%', y: '15%' }, delay: 2 },
        { id: 'label-future', type: 'text', props: { text: '🌿 مستقبل صحي' }, position: { x: '50%', y: '90%' }, delay: 2.3 },
      ],
      soundEffects: ['دراجة 🚲', 'طبيعة نظيفة 🌿', 'موسيقى أمل 🎶'],
      educationalHighlight: 'المستقبل: وسائل نقل نظيفة، طاقة شمسية، أشجار في كل مكان',
      transition: 'zoom',
    },
  ],
  finalMessage: 'أحسنت! أنت الآن بطل الهواء النقي! 🌬️ حافظ على جهازك التنفسي وساعد في بناء بيئة نظيفة!',
};

// ============== COURSE DATA ==============
export const respiratorySafetyCourse: Course = {
  id: 'respiratory-system-safety',
  title: 'المحافظة على سلامة الجهاز التنفسي',
  grade: 6,
  icon: '🫁',
  color: 'bg-pink-100',
  badge: { name: 'بطل الهواء النقي', icon: '🌬️' },
  rewardMessages: {
    student: 'أنت الآن خبير في حماية الجهاز التنفسي! تنفس بعمق!',
    parent: 'طفلك تعلم كيف يحمي جهازه التنفسي من التلوث! 🌬️',
    universalGoldBadge: { name: 'البطل الشامل للبيئة', icon: '🌍' },
  },
  videoConcept: {
    title: 'أنفي… درعك الأول ضد التلوث!',
    scenario: 'مرحبًا أيها الحارس الصغير! 🌬️ اليوم سنتعلم كيف نحمي جهازنا التنفسي.',
    moralMessage: 'جهازك التنفسي ثمين، احمِه من التلوث!',
  },
  animatedVideo: respiratorySafetyVideo,
  videoStoryboard: {
    title: 'أنفي… درعك الأول ضد التلوث!',
    scenes: 'شوارع المدينة، هواء ملوث، حديقة نظيفة، دخان متحرك، أشجار تتحرك.',
    narratorText: 'مرحبًا أيها الحارس الصغير! 🌬️...',
    soundEffects: [
      'سعال 😷',
      'تنفس عميق 🌿',
      'سيارات 🚗',
      'زراعة 🌱',
      'موسيقى متوترة ⚠️',
      'موسيقى هادئة 🎶',
    ],
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1',
      type: 'choice',
      title: 'اختَر هواءك!',
      points: 15,
      prompt: 'اختر أفضل سيناريو للهواء لصحة جهازك التنفسي 🌿',
      options: ['حديقة نظيفة 🌳', 'شارع مزدحم بالدخان 🚗💨', 'غرفة مغلقة مليئة بالغبار 🏠🟤'],
      correct: 'حديقة نظيفة 🌳',
      successMessage: '✅ ممتاز! الهواء النقي يحمي رئتيك وأنفك 🌬️🌿',
      errorMessage: '❌ هذا ليس الأفضل! ابحث عن المكان الذي فيه هواء نقي 🌿',
      rewardBadge: { name: 'خبير الهواء النقي', icon: '🌬️' },
    },
    {
      id: 'ex2',
      type: 'multi',
      title: 'أنفِك يحكي!',
      points: 20,
      prompt: 'اختر حلولًا تساعد أنفك مع: هواء نظيف / هواء ملوّث / هواء جاف 🌬️',
      options: [
        'الابتعاد عن الدخان 😷',
        'تهوية الغرفة 🏡',
        'الذهاب إلى حديقة 🌳',
        'شرب الماء 💧',
        'اللعب قرب السيارات 🚗💨',
      ],
      correct: ['الابتعاد عن الدخان 😷', 'تهوية الغرفة 🏡', 'الذهاب إلى حديقة 🌳', 'شرب الماء 💧'],
      successMessage: '✅ رائع! اخترت حلولًا ذكية تحمي أنفك في كل الحالات 🌬️',
      errorMessage: '❌ راجع اختياراتك: لا نقترب من الدخان ولا من ازدحام السيارات 🚗💨',
      rewardBadge: { name: 'حامي الأنف', icon: '👃' },
    },
    {
      id: 'ex3',
      type: 'sticker-repair',
      title: 'صلّح بيتك ليتنفّس!',
      points: 25,
      prompt: 'استخدم الملصقات لإصلاح بيئة البيت حتى يصبح الهواء أفضل 🏡🌿',
      sceneTitle: '🏡 بيت يحتاج إلى هواء أفضل',
      slots: [
        { id: 'slot1', label: 'نافذة للتهوية' },
        { id: 'slot2', label: 'نباتات داخل البيت' },
        { id: 'slot3', label: 'مكان بعيد عن الدخان' },
      ],
      stickers: [
        { id: 'st1', label: 'فتح النافذة', emoji: '🪟', slotId: 'slot1' },
        { id: 'st2', label: 'نبتة', emoji: '🪴', slotId: 'slot2' },
        { id: 'st3', label: 'منع التدخين', emoji: '🚭', slotId: 'slot3' },
      ],
      successMessage: '✅ أحسنت! بيتك الآن "يتنفّس" بشكل أفضل 🏡🌬️',
      errorMessage: '❌ ليس تمامًا… حاول وضع كل ملصق في المكان الأنسب 🌿',
      rewardBadge: { name: 'مهندس البيت الصحي', icon: '🏡' },
    },
  ],
  games: [
    {
      id: 'g1',
      type: 'runner',
      title: 'سباق أنقذ أنفي!',
      description: 'اركض عبر شوارع ملوّثة، اجمع الأوراق 🍃 وتجنّب الدخان 💨',
      points: 35,
      gameData: {
        collectItems: ['🍃', '🍃', '🍃', '🌿', '🌱'],
        hazardItems: ['💨', '💨', '⚠️'],
        lives: 3,
        timeLimitSec: 35,
        rewardBadgeName: 'عدّاء الهواء النقي 🏃',
      },
    },
    {
      id: 'g2',
      type: 'map',
      title: 'مهمة مراقب جودة الهواء',
      description: 'ضع حساسات جودة الهواء على الخريطة في أماكن مهمة 🗺️📍',
      points: 30,
      gameData: {
        rows: 6,
        cols: 8,
        sensorIcon: '📍',
        sensorsToPlace: 3,
        mapLabel: '🗺️ خريطة المدينة (جودة الهواء)',
        hotspots: [
          { id: 'h1', name: 'المصنع', x: 2, y: 1, risk: 'عالي' },
          { id: 'h2', name: 'الشارع الرئيسي', x: 4, y: 3, risk: 'متوسط' },
          { id: 'h3', name: 'الحديقة', x: 6, y: 5, risk: 'منخفض' },
        ],
        rewardBadgeName: 'مراقب جودة الهواء 📍',
      },
    },
    {
      id: 'g3',
      type: 'construction',
      title: 'بناء مدينة أنظف',
      description: 'ابنِ مدينة بوسائل نقل نظيفة، طاقة نظيفة، ومساحات خضراء 🌳⚡🚲',
      points: 35,
      gameData: {
        availableElements: [
          { id: 't1', name: 'حافلة كهربائية', type: 'consumer', icon: '🚌⚡' },
          { id: 't2', name: 'دراجة', type: 'consumer', icon: '🚲' },
          { id: 't3', name: 'سيارة كثيرة الدخان', type: 'consumer', icon: '🚗💨' },
          { id: 'e1', name: 'طاقة شمسية', type: 'sun', icon: '☀️' },
          { id: 'e2', name: 'مصنع ملوّث', type: 'soil', icon: '🏭⚠️' },
          { id: 'g1', name: 'حديقة', type: 'producer', icon: '🌳' },
          { id: 'g2', name: 'أشجار', type: 'producer', icon: '🌲' },
        ],
        constraints: {
          mustIncludeAny: ['☀️', '🌳', '🚲'],
          avoidAny: ['🏭⚠️', '🚗💨'],
        },
        rewardBadgeName: 'مهندس المدينة النظيفة 🏙️',
      },
    },
  ],
};
