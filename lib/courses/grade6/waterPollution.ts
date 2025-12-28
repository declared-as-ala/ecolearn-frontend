import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA ==============
export const waterPollutionVideo: AnimatedVideoData = {
  title: 'النهر يبكي… والمحيط يصرخ!',
  totalDuration: 70,
  scenes: [
    {
      id: 'scene-1-intro',
      title: 'المشهد 1: النهر الجميل',
      background: 'ocean',
      duration: 10,
      narratorText: 'مرحبًا أيها المنقذ! 🌊 انظر إلى هذا النهر الجميل. الماء صافٍ، الأسماك سعيدة، والطيور تشرب. هذا ما يجب أن تكون عليه مياهنا!',
      elements: [
        { id: 'sun-river', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '85%', y: '15%' }, delay: 0 },
        { id: 'clean-water', type: 'water', props: { type: 'wave', size: 'large' }, position: { x: '50%', y: '70%' }, delay: 0.3 },
        { id: 'fish-happy-1', type: 'animal', props: { type: 'fish', size: 'medium', moving: true }, position: { x: '35%', y: '65%' }, delay: 0.6 },
        { id: 'fish-happy-2', type: 'animal', props: { type: 'fish', size: 'small', moving: true }, position: { x: '65%', y: '70%' }, delay: 0.9 },
        { id: 'turtle-happy', type: 'animal', props: { type: 'turtle', size: 'medium', moving: true }, position: { x: '50%', y: '75%' }, delay: 1.2 },
        { id: 'bird-drink', type: 'animal', props: { type: 'bird', size: 'small', moving: true }, position: { x: '25%', y: '50%' }, delay: 1.5 },
        { id: 'sparkle', type: 'emoji', props: { emoji: '✨', size: 30 }, position: { x: '45%', y: '60%' }, delay: 1.8 },
        { id: 'label-clean', type: 'text', props: { text: '🌊 نهر نظيف وجميل' }, position: { x: '50%', y: '90%' }, delay: 2.1 },
      ],
      soundEffects: ['تدفق النهر 💧', 'أسماك سعيدة 🐟', 'طيور 🐦'],
      educationalHighlight: 'الماء النظيف ضروري لحياة جميع الكائنات',
      transition: 'fade',
    },
    {
      id: 'scene-2-pollution-sources',
      title: 'المشهد 2: مصادر التلوث',
      background: 'city',
      duration: 12,
      narratorText: 'لكن التلوث يأتي من مصادر كثيرة! 😢 المصانع تلقي مخلفاتها، الناس يرمون البلاستيك، والنفط يتسرب. كل هذا يسمم الماء!',
      elements: [
        { id: 'factory-pollute', type: 'emoji', props: { emoji: '🏭', size: 55 }, position: { x: '20%', y: '45%' }, delay: 0 },
        { id: 'factory-waste', type: 'pollution', props: { type: 'smoke', size: 'medium' }, position: { x: '25%', y: '60%' }, delay: 0.3 },
        { id: 'plastic-1', type: 'emoji', props: { emoji: '🛍️', size: 35 }, position: { x: '45%', y: '70%' }, delay: 0.6 },
        { id: 'plastic-2', type: 'emoji', props: { emoji: '🥤', size: 30 }, position: { x: '55%', y: '75%' }, delay: 0.9 },
        { id: 'trash', type: 'pollution', props: { type: 'trash', size: 'medium' }, position: { x: '70%', y: '65%' }, delay: 1.2 },
        { id: 'oil-spill', type: 'pollution', props: { type: 'oil', size: 'medium' }, position: { x: '80%', y: '70%' }, delay: 1.5 },
        { id: 'dirty-water', type: 'emoji', props: { emoji: '🟤', size: 50 }, position: { x: '50%', y: '85%' }, delay: 1.8 },
        { id: 'warning', type: 'emoji', props: { emoji: '⚠️', size: 40 }, position: { x: '50%', y: '40%' }, delay: 2.1 },
        { id: 'label-sources', type: 'text', props: { text: '⚠️ مصادر التلوث' }, position: { x: '50%', y: '90%' }, delay: 2.4 },
      ],
      soundEffects: ['مصنع 🏭', 'تلوث ⚠️', 'موسيقى حزينة 😢'],
      educationalHighlight: 'مصادر التلوث: مصانع (كيميائي)، بلاستيك (صلب)، نفط (تسرب زيتي)',
      transition: 'slide',
    },
    {
      id: 'scene-3-turtle-choking',
      title: 'المشهد 3: السلحفاة تختنق',
      background: 'underwater',
      duration: 12,
      narratorText: 'انظر إلى هذه السلحفاة المسكينة! 🐢😢 تظن أن الكيس البلاستيكي طعام فتأكله وتختنق. ملايين الحيوانات البحرية تموت بسبب البلاستيك!',
      elements: [
        { id: 'turtle-choke', type: 'animal', props: { type: 'turtle', size: 'large' }, position: { x: '40%', y: '50%' }, delay: 0 },
        { id: 'plastic-bag', type: 'emoji', props: { emoji: '🛍️', size: 40 }, position: { x: '50%', y: '55%' }, delay: 0.5 },
        { id: 'sad-turtle-face', type: 'emoji', props: { emoji: '😵', size: 30 }, position: { x: '35%', y: '45%' }, delay: 1 },
        { id: 'fish-scared', type: 'animal', props: { type: 'fish', size: 'small', moving: true, direction: 'left' }, position: { x: '70%', y: '60%' }, delay: 1.3 },
        { id: 'plastic-float-1', type: 'emoji', props: { emoji: '🥤', size: 25 }, position: { x: '25%', y: '40%' }, delay: 1.6 },
        { id: 'plastic-float-2', type: 'emoji', props: { emoji: '🛍️', size: 25 }, position: { x: '75%', y: '45%' }, delay: 1.9 },
        { id: 'sad-face', type: 'emoji', props: { emoji: '😢', size: 40 }, position: { x: '50%', y: '25%' }, delay: 2.2 },
        { id: 'label-turtle', type: 'text', props: { text: '🐢😢 السلحفاة تختنق بالبلاستيك' }, position: { x: '50%', y: '90%' }, delay: 2.5 },
      ],
      soundEffects: ['سلحفاة تختنق 🐢', 'فقاعات 🫧', 'موسيقى حزينة 😢'],
      educationalHighlight: 'البلاستيك يقتل: الحيوانات البحرية تظنه طعاماً فتختنق',
      transition: 'slide',
    },
    {
      id: 'scene-4-home-water',
      title: 'المشهد 4: ماء البيت',
      background: 'park',
      duration: 10,
      narratorText: 'التلوث يصل إلى بيوتنا أيضاً! 🏡😷 إذا شربنا ماء ملوثاً، نمرض. يجب أن نحمي ماء البيت بطرق صحيحة!',
      elements: [
        { id: 'house', type: 'emoji', props: { emoji: '🏡', size: 60 }, position: { x: '30%', y: '50%' }, delay: 0 },
        { id: 'tap-water', type: 'emoji', props: { emoji: '🚰', size: 45 }, position: { x: '50%', y: '55%' }, delay: 0.4 },
        { id: 'dirty-glass', type: 'emoji', props: { emoji: '🥛🟤', size: 40 }, position: { x: '70%', y: '50%' }, delay: 0.8 },
        { id: 'sick-child', type: 'emoji', props: { emoji: '😷', size: 45 }, position: { x: '75%', y: '65%' }, delay: 1.2 },
        { id: 'warning-health', type: 'emoji', props: { emoji: '⚠️', size: 35 }, position: { x: '60%', y: '40%' }, delay: 1.6 },
        { id: 'bacteria', type: 'animal', props: { type: 'bacteria', size: 'small' }, position: { x: '55%', y: '60%' }, delay: 2 },
        { id: 'label-home', type: 'text', props: { text: '🏡 الماء الملوث يصل للبيت' }, position: { x: '50%', y: '90%' }, delay: 2.4 },
      ],
      soundEffects: ['ماء ملوث 🟤', 'طفل مريض 😷'],
      educationalHighlight: 'الماء الملوث يسبب أمراضاً خطيرة للإنسان',
      transition: 'slide',
    },
    {
      id: 'scene-5-solutions',
      title: 'المشهد 5: الحلول',
      background: 'farm',
      duration: 14,
      narratorText: 'لكننا نستطيع حل المشكلة! 💪 لا ترمِ النفايات، استخدم فلتر في البيت، نظّف الشواطئ، ومنع التلوث من المصدر. أنت جزء من الحل! 🌊✨',
      elements: [
        { id: 'no-littering', type: 'emoji', props: { emoji: '🚫🗑️', size: 45 }, position: { x: '20%', y: '40%' }, delay: 0 },
        { id: 'text-no-litter', type: 'text', props: { text: 'لا ترمِ النفايات' }, position: { x: '20%', y: '55%' }, delay: 0.3 },
        { id: 'filter', type: 'emoji', props: { emoji: '🧰💧', size: 45 }, position: { x: '45%', y: '40%' }, delay: 0.6 },
        { id: 'text-filter', type: 'text', props: { text: 'استخدم فلتر' }, position: { x: '45%', y: '55%' }, delay: 0.9 },
        { id: 'clean-beach', type: 'emoji', props: { emoji: '🧹🏖️', size: 45 }, position: { x: '70%', y: '40%' }, delay: 1.2 },
        { id: 'text-clean', type: 'text', props: { text: 'نظّف الشواطئ' }, position: { x: '70%', y: '55%' }, delay: 1.5 },
        { id: 'happy-fish', type: 'animal', props: { type: 'fish', size: 'medium', moving: true }, position: { x: '35%', y: '75%' }, delay: 1.8 },
        { id: 'happy-turtle', type: 'animal', props: { type: 'turtle', size: 'medium', moving: true }, position: { x: '65%', y: '75%' }, delay: 2.1 },
        { id: 'clean-water-result', type: 'water', props: { type: 'wave', size: 'medium' }, position: { x: '50%', y: '85%' }, delay: 2.4 },
        { id: 'checkmark', type: 'emoji', props: { emoji: '✅', size: 40 }, position: { x: '50%', y: '30%' }, delay: 2.7 },
      ],
      soundEffects: ['تنظيف 🧹', 'ماء نظيف 💧', 'موسيقى أمل 🎶'],
      educationalHighlight: 'الحلول: لا ترمِ النفايات + فلتر + تنظيف = ماء نظيف',
      transition: 'slide',
    },
    {
      id: 'scene-6-clean-future',
      title: 'المشهد 6: مستقبل نظيف',
      background: 'ocean',
      duration: 7,
      narratorText: 'هذا هو المستقبل الذي نريده! 🌊✨ نهر نظيف، محيط صافٍ، أسماك وسلاحف سعيدة. أنت منقذ الأنهار! 💙',
      elements: [
        { id: 'sun-clean', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '80%', y: '15%' }, delay: 0 },
        { id: 'clean-ocean', type: 'water', props: { type: 'wave', size: 'large' }, position: { x: '50%', y: '75%' }, delay: 0.3 },
        { id: 'fish-future-1', type: 'animal', props: { type: 'fish', size: 'medium', moving: true }, position: { x: '30%', y: '65%' }, delay: 0.6 },
        { id: 'fish-future-2', type: 'animal', props: { type: 'fish', size: 'small', moving: true }, position: { x: '55%', y: '70%' }, delay: 0.9 },
        { id: 'turtle-future', type: 'animal', props: { type: 'turtle', size: 'large', moving: true }, position: { x: '70%', y: '60%' }, delay: 1.2 },
        { id: 'heart-water', type: 'emoji', props: { emoji: '💙', size: 40 }, position: { x: '50%', y: '45%' }, delay: 1.5 },
        { id: 'sparkles', type: 'emoji', props: { emoji: '✨', size: 30 }, position: { x: '40%', y: '55%' }, delay: 1.8 },
        { id: 'rainbow', type: 'emoji', props: { emoji: '🌈', size: 50 }, position: { x: '50%', y: '25%' }, delay: 2.1 },
        { id: 'label-future', type: 'text', props: { text: '🌊✨ مستقبل نظيف' }, position: { x: '50%', y: '90%' }, delay: 2.4 },
      ],
      soundEffects: ['موج هادئ 🌊', 'أسماك سعيدة 🐟', 'موسيقى أمل 🎶'],
      educationalHighlight: 'المستقبل النظيف يبدأ بك! كل فعل صغير يصنع فرقاً كبيراً',
      transition: 'zoom',
    },
  ],
  finalMessage: 'أحسنت! أنت الآن منقذ الأنهار! 🌊💙 احمِ مياهنا من التلوث!',
};

// ============== COURSE DATA ==============
export const waterPollutionCourse: Course = {
  id: 'water-pollution',
  title: 'تلوث الأوساط المائية',
  grade: 6,
  icon: '🌊',
  color: 'bg-blue-100',
  badge: { name: 'منقذ الأنهار', icon: '🌊' },
  rewardMessages: {
    student: 'أنت الآن منقذ الأنهار! تعرف كيف تحمي الماء من التلوث!',
    parent: 'طفلك تعلم عن تلوث المياه وكيفية حمايتها! 🌊',
    universalGoldBadge: { name: 'البطل الشامل للبيئة', icon: '🌍' },
  },
  videoConcept: {
    title: 'النهر يبكي… والمحيط يصرخ! 😢🌊',
    scenario: 'مرحبًا أيها المنقذ! 🌊 سنتعلم عن تلوث المياه وكيف نحميها.',
    moralMessage: 'الماء حياة، احمِه من التلوث!',
  },
  animatedVideo: waterPollutionVideo,
  videoStoryboard: {
    title: 'النهر يبكي… والمحيط يصرخ! 😢🌊',
    scenes: 'نهر ملوث، محيط ملوث، سلحفاة تأكل بلاستيك، تسرب نفط، تلوث بيتي',
    narratorText: 'مرحبًا أيها المنقذ! 🌊...',
    soundEffects: [
      'سلحفاة تختنق 🐢',
      'تدفق النهر 💧',
      'طفل مريض 😷',
      'صوت ترشيح 🏭',
      'موسيقى أمل 🎶',
    ],
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1',
      type: 'matching',
      title: 'من أين يأتي التلوث؟',
      points: 20,
      prompt: 'اربط مصدر التلوث بنوعه الصحيح 🔗',
      pairs: [
        { left: 'مصنع 🏭', right: 'تلوث كيميائي' },
        { left: 'بلاستيك 🛍️', right: 'تلوث صلب' },
        { left: 'مياه صرف 🚽', right: 'تلوث جرثومي 🦠' },
        { left: 'نفط 🛢️', right: 'تسرب زيتي' },
      ],
      successMessage: '✅ ممتاز! عرفت مصادر التلوث وأنواعه 🌊',
      errorMessage: '❌ جرّب مجددًا: كل مصدر له نوع تلوث مختلف ⚠️',
      rewardBadge: { name: 'خبير مصادر التلوث', icon: '🔍' },
    },
    {
      id: 'ex2',
      type: 'multi',
      title: 'كيف تحمي ماءك؟',
      points: 20,
      prompt: 'اختر السلوكيات الصحيحة لحماية ماء البيت 💧🏡',
      options: [
        'عدم رمي الزيوت في المغسلة 🛢️🚫',
        'إغلاق الصنبور عند عدم الحاجة 💧',
        'رمي النفايات في الوادي 🗑️',
        'استعمال فلتر عند الحاجة 🏭',
      ],
      correct: ['عدم رمي الزيوت في المغسلة 🛢️🚫', 'إغلاق الصنبور عند عدم الحاجة 💧', 'استعمال فلتر عند الحاجة 🏭'],
      successMessage: '✅ رائع! هذه سلوكيات تحمي الماء في البيت 💧',
      errorMessage: '❌ انتبه: رمي النفايات في الوادي يلوث الماء 🌊⚠️',
      rewardBadge: { name: 'حامي ماء البيت', icon: '🏡' },
    },
    {
      id: 'ex3',
      type: 'choice',
      title: 'اختَر الحل الأذكى!',
      points: 20,
      prompt: 'اختر الحل الأذكى لنهر ملوّث 🌊',
      options: [
        'تنظيم حملات تنظيف + منع مصادر التلوث 🚫🗑️',
        'صبّ مواد مجهولة في النهر 🧪',
        'تجاهل المشكلة',
      ],
      correct: 'تنظيم حملات تنظيف + منع مصادر التلوث 🚫🗑️',
      successMessage: '✅ صحيح! الحل الذكي يجمع بين الوقاية والتنظيف 🌊',
      errorMessage: '❌ الحل الذكي لا يزيد التلوث ولا يتجاهله ⚠️',
      rewardBadge: { name: 'صاحب الحلول الذكية', icon: '💡' },
    },
  ],
  games: [
    {
      id: 'g1',
      type: 'runner',
      title: 'سباق نظّف النهر!',
      description: 'اجمع النفايات من النهر وتجنّب الأفعال الخاطئة ⚠️',
      points: 35,
      gameData: {
        collectItems: ['🛍️', '🥤', '🧴', '🗑️'],
        hazardItems: ['🏭⚠️', '🛢️', '⚠️'],
        lives: 3,
        timeLimitSec: 40,
        rewardBadgeName: 'عدّاء تنظيف النهر 🏃',
      },
    },
    {
      id: 'g2',
      type: 'lab',
      title: 'مهمة افحص ماءك!',
      description: 'افحص عينات الماء (pH، بكتيريا، معادن) 🧪',
      points: 35,
      gameData: {
        samples: [
          { id: 's1', name: 'ماء الصنبور', ph: 7, bacteria: 'قليلة', minerals: 'عادية' },
          { id: 's2', name: 'ماء النهر', ph: 6, bacteria: 'متوسطة', minerals: 'عالية' },
          { id: 's3', name: 'ماء ملوث', ph: 4, bacteria: 'كثيرة', minerals: 'سامة' },
        ],
        correctAnswers: {
          's1': 'صالح للشرب',
          's2': 'يحتاج ترشيح',
          's3': 'ملوث - لا تشرب',
        },
        rewardBadgeName: 'عالِم المياه 🔬',
      },
    },
    {
      id: 'g3',
      type: 'construction',
      title: 'بناء نظامك النظيف',
      description: 'اختر أدوات تحافظ على ماء البيت نظيفًا 💧🏡',
      points: 30,
      gameData: {
        availableElements: [
          { id: 'f1', name: 'فلتر ماء', type: 'water', icon: '🧰💧' },
          { id: 'f2', name: 'تنظيف الخزان', type: 'soil', icon: '🧽' },
          { id: 'f3', name: 'رمي زيت', type: 'soil', icon: '🛢️⚠️' },
          { id: 'f4', name: 'غلق الصنبور', type: 'water', icon: '🚰✅' },
          { id: 'f5', name: 'تخزين آمن', type: 'soil', icon: '🫙✅' },
        ],
        constraints: {
          avoidAny: ['🛢️⚠️'],
          minElements: 3,
        },
        rewardBadgeName: 'بانٍ النظام النظيف 🏗️',
      },
    },
  ],
};
