import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA ==============
export const humanRoleVideo: AnimatedVideoData = {
  title: 'أنت البطل… حامي الغابة!',
  totalDuration: 75,
  scenes: [
    {
      id: 'scene-1-hero-intro',
      title: 'المشهد 1: البطل الصغير',
      background: 'forest',
      duration: 10,
      narratorText: 'مرحبًا أيها البطل! 🦸 الطبيعة تستغيث… كل خطوة تقوم بها يمكن أن تغير مصير الحياة هنا. في تونس، لدينا غابات زيتون جميلة، سهول خضراء، جبال، وأنهار. هل أنت مستعد لحمايتها؟',
      elements: [
        { id: 'sun-hero', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '85%', y: '15%' }, delay: 0 },
        { id: 'olive-tree-1', type: 'plant', props: { type: 'tree', size: 'large' }, position: { x: '20%', y: '55%' }, delay: 0.3 },
        { id: 'olive-tree-2', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '50%', y: '60%' }, delay: 0.5 },
        { id: 'mountains', type: 'emoji', props: { emoji: '⛰️', size: 60 }, position: { x: '80%', y: '45%' }, delay: 0.7 },
        { id: 'river', type: 'water', props: { type: 'river', size: 'medium' }, position: { x: '60%', y: '85%' }, delay: 0.9 },
        { id: 'bird-hero', type: 'animal', props: { type: 'bird', size: 'medium', moving: true }, position: { x: '35%', y: '35%' }, delay: 1.1 },
        { id: 'hero-icon', type: 'emoji', props: { emoji: '🦸', size: 55 }, position: { x: '50%', y: '75%' }, delay: 1.4 },
        { id: 'tunisia-flag', type: 'emoji', props: { emoji: '🇹🇳', size: 35 }, position: { x: '15%', y: '25%' }, delay: 1.7 },
        { id: 'label-hero', type: 'text', props: { text: '🦸 أنت البطل!' }, position: { x: '50%', y: '90%' }, delay: 2 },
      ],
      soundEffects: ['موسيقى بطولية 🎵', 'أشجار زيتون 🫒', 'طيور 🦉🦋'],
      educationalHighlight: 'أنت قادر على إحداث فرق! كل فعل صغير يساهم في حماية البيئة',
      transition: 'fade',
    },
    {
      id: 'scene-2-problems',
      title: 'المشهد 2: المشاكل البيئية',
      background: 'city',
      duration: 12,
      narratorText: 'لكن انظر! هناك مشاكل كثيرة... 😢 الأشجار تُقطع، الأنهار ملوثة، الطيور مهددة، والتربة جافة. الطبيعة تحتاج إلى مساعدتك!',
      elements: [
        { id: 'dead-tree', type: 'emoji', props: { emoji: '🪵', size: 50 }, position: { x: '20%', y: '65%' }, delay: 0 },
        { id: 'chainsaw', type: 'emoji', props: { emoji: '🪓', size: 40 }, position: { x: '25%', y: '55%' }, delay: 0.3 },
        { id: 'polluted-river', type: 'emoji', props: { emoji: '🟤', size: 45 }, position: { x: '50%', y: '80%' }, delay: 0.6 },
        { id: 'trash-river', type: 'pollution', props: { type: 'trash', size: 'medium' }, position: { x: '55%', y: '75%' }, delay: 0.9 },
        { id: 'scared-bird', type: 'animal', props: { type: 'bird', size: 'small', moving: true, direction: 'left' }, position: { x: '70%', y: '40%' }, delay: 1.2 },
        { id: 'danger-bird', type: 'emoji', props: { emoji: '⚠️', size: 30 }, position: { x: '75%', y: '35%' }, delay: 1.4 },
        { id: 'dry-soil', type: 'emoji', props: { emoji: '🏜️', size: 55 }, position: { x: '80%', y: '75%' }, delay: 1.6 },
        { id: 'sad-earth', type: 'emoji', props: { emoji: '😢', size: 40 }, position: { x: '50%', y: '35%' }, delay: 1.9 },
        { id: 'label-problems', type: 'text', props: { text: '⚠️ مشاكل بيئية' }, position: { x: '50%', y: '90%' }, delay: 2.2 },
      ],
      soundEffects: ['صوت تحذير ⚠️', 'ماء ملوث 🟤', 'طائر خائف 🐦'],
      educationalHighlight: 'المشاكل البيئية: قطع الأشجار، تلوث المياه، تهديد الحيوانات، جفاف التربة',
      transition: 'slide',
    },
    {
      id: 'scene-3-plant-trees',
      title: 'المشهد 3: زراعة الأشجار',
      background: 'farm',
      duration: 12,
      narratorText: 'الحل الأول: زراعة الأشجار! 🌳🌱 كل شجرة تزرعها تنتج أكسجين، توفر موطناً للحيوانات، وتحافظ على التربة. أنت تستطيع أن تكون غارساً للحياة!',
      elements: [
        { id: 'hero-planting', type: 'emoji', props: { emoji: '🧑‍🌾', size: 50 }, position: { x: '30%', y: '65%' }, delay: 0 },
        { id: 'seedling-1', type: 'emoji', props: { emoji: '🌱', size: 35 }, position: { x: '45%', y: '75%' }, delay: 0.4 },
        { id: 'seedling-2', type: 'emoji', props: { emoji: '🌱', size: 35 }, position: { x: '60%', y: '78%' }, delay: 0.7 },
        { id: 'growing-tree', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '75%', y: '60%' }, delay: 1 },
        { id: 'water-can', type: 'emoji', props: { emoji: '🚿', size: 35 }, position: { x: '40%', y: '72%' }, delay: 1.3 },
        { id: 'happy-bird', type: 'animal', props: { type: 'bird', size: 'small', moving: true }, position: { x: '80%', y: '45%' }, delay: 1.6 },
        { id: 'oxygen', type: 'emoji', props: { emoji: '💨', size: 30 }, position: { x: '70%', y: '50%' }, delay: 1.9 },
        { id: 'healthy-soil', type: 'soil', props: { size: 'large' }, position: { x: '55%', y: '90%' }, delay: 2.2 },
        { id: 'label-planting', type: 'text', props: { text: '🌳 ازرع شجرة!' }, position: { x: '50%', y: '90%' }, delay: 2.5 },
      ],
      soundEffects: ['حفر التربة 🌍', 'ماء يتدفق 💧', 'طيور سعيدة 🐦'],
      educationalHighlight: 'زراعة الأشجار: تنتج أكسجين، توفر موطناً للحيوانات، تحافظ على التربة',
      transition: 'slide',
    },
    {
      id: 'scene-4-clean-water',
      title: 'المشهد 4: تنظيف المياه',
      background: 'ocean',
      duration: 12,
      narratorText: 'الحل الثاني: تنظيف المياه! 💧🧹 لا ترمِ النفايات في الأنهار والبحار. ساعد في تنظيف الشواطئ. الماء النظيف حياة لكل الكائنات!',
      elements: [
        { id: 'clean-hero', type: 'emoji', props: { emoji: '🧹', size: 45 }, position: { x: '35%', y: '65%' }, delay: 0 },
        { id: 'bag-collect', type: 'emoji', props: { emoji: '🛍️', size: 35 }, position: { x: '25%', y: '75%' }, delay: 0.4 },
        { id: 'trash-collect', type: 'emoji', props: { emoji: '🗑️', size: 40 }, position: { x: '45%', y: '70%' }, delay: 0.7 },
        { id: 'clean-water', type: 'water', props: { type: 'wave', size: 'large' }, position: { x: '65%', y: '80%' }, delay: 1 },
        { id: 'happy-fish', type: 'animal', props: { type: 'fish', size: 'medium', moving: true }, position: { x: '70%', y: '75%' }, delay: 1.3 },
        { id: 'happy-turtle', type: 'animal', props: { type: 'turtle', size: 'medium', moving: true }, position: { x: '80%', y: '70%' }, delay: 1.6 },
        { id: 'sparkle-water', type: 'emoji', props: { emoji: '✨', size: 30 }, position: { x: '60%', y: '72%' }, delay: 1.9 },
        { id: 'no-plastic', type: 'emoji', props: { emoji: '🚫🛍️', size: 35 }, position: { x: '20%', y: '50%' }, delay: 2.2 },
        { id: 'label-clean-water', type: 'text', props: { text: '💧 نظّف المياه!' }, position: { x: '50%', y: '90%' }, delay: 2.5 },
      ],
      soundEffects: ['موج نظيف 🌊', 'أسماك سعيدة 🐟', 'تنظيف 🧹'],
      educationalHighlight: 'تنظيف المياه: لا ترمِ النفايات، شارك في تنظيف الشواطئ والأنهار',
      transition: 'slide',
    },
    {
      id: 'scene-5-protect-animals',
      title: 'المشهد 5: حماية الحيوانات',
      background: 'forest',
      duration: 12,
      narratorText: 'الحل الثالث: حماية الحيوانات! 🦌🐢🐞 لا تؤذِ الحيوانات، وفّر لها الغذاء والماء، وأبلغ عن أي صيد جائر. كل حيوان له دور مهم في التوازن!',
      elements: [
        { id: 'deer-protected', type: 'animal', props: { type: 'deer', size: 'large', moving: true }, position: { x: '25%', y: '60%' }, delay: 0 },
        { id: 'turtle-protected', type: 'animal', props: { type: 'turtle', size: 'medium', moving: true }, position: { x: '50%', y: '75%' }, delay: 0.4 },
        { id: 'butterfly-protected', type: 'animal', props: { type: 'butterfly', size: 'small', moving: true }, position: { x: '70%', y: '45%' }, delay: 0.7 },
        { id: 'bird-protected', type: 'animal', props: { type: 'bird', size: 'small', moving: true }, position: { x: '40%', y: '35%' }, delay: 1 },
        { id: 'shield-icon', type: 'emoji', props: { emoji: '🛡️', size: 45 }, position: { x: '75%', y: '65%' }, delay: 1.3 },
        { id: 'food-bowl', type: 'emoji', props: { emoji: '🍽️', size: 35 }, position: { x: '60%', y: '80%' }, delay: 1.6 },
        { id: 'water-bowl', type: 'water', props: { type: 'droplet', size: 'small' }, position: { x: '65%', y: '82%' }, delay: 1.9 },
        { id: 'heart-animals', type: 'emoji', props: { emoji: '❤️', size: 35 }, position: { x: '50%', y: '50%' }, delay: 2.2 },
        { id: 'label-protect', type: 'text', props: { text: '🛡️ احمِ الحيوانات!' }, position: { x: '50%', y: '90%' }, delay: 2.5 },
      ],
      soundEffects: ['حيوانات سعيدة 🐾', 'طيور تغرد 🐦', 'طبيعة هادئة 🎶'],
      educationalHighlight: 'حماية الحيوانات: لا تؤذها، وفّر الغذاء والماء، أبلغ عن الصيد الجائر',
      transition: 'slide',
    },
    {
      id: 'scene-6-repair-soil',
      title: 'المشهد 6: إصلاح التربة',
      background: 'farm',
      duration: 10,
      narratorText: 'الحل الرابع: إصلاح التربة! 🌍🪱 استخدم السماد الطبيعي، لا ترمِ المواد الكيميائية، واحمِ الديدان. التربة الصحية = نباتات صحية = حيوانات سعيدة!',
      elements: [
        { id: 'compost', type: 'emoji', props: { emoji: '🧺', size: 40 }, position: { x: '30%', y: '60%' }, delay: 0 },
        { id: 'healthy-soil-2', type: 'soil', props: { size: 'large', withWorms: true }, position: { x: '50%', y: '80%' }, delay: 0.4 },
        { id: 'worm-happy', type: 'animal', props: { type: 'worm', size: 'medium', moving: true }, position: { x: '45%', y: '75%' }, delay: 0.7 },
        { id: 'worm-happy-2', type: 'animal', props: { type: 'worm', size: 'small', moving: true }, position: { x: '60%', y: '77%' }, delay: 1 },
        { id: 'healthy-plant', type: 'plant', props: { type: 'flower', size: 'medium' }, position: { x: '70%', y: '60%' }, delay: 1.3 },
        { id: 'no-chemicals', type: 'emoji', props: { emoji: '🚫☠️', size: 40 }, position: { x: '25%', y: '45%' }, delay: 1.6 },
        { id: 'natural-fertilizer', type: 'emoji', props: { emoji: '🌿', size: 35 }, position: { x: '40%', y: '55%' }, delay: 1.9 },
        { id: 'label-soil', type: 'text', props: { text: '🌍 أصلح التربة!' }, position: { x: '50%', y: '90%' }, delay: 2.2 },
      ],
      soundEffects: ['تربة تتنفس 🌍', 'ديدان تعمل 🪱', 'نباتات تنمو 🌱'],
      educationalHighlight: 'إصلاح التربة: سماد طبيعي، لا مواد كيميائية، حماية الديدان',
      transition: 'slide',
    },
    {
      id: 'scene-7-network',
      title: 'المشهد 7: شبكة التوازن الكاملة',
      background: 'park',
      duration: 7,
      narratorText: 'والآن أنت بطل حقيقي! 🦸🌍 لقد ربطت كل العناصر: النباتات، الحيوانات، الماء، التربة، المصانع النظيفة، والسحب. هذه شبكة التوازن البيئي!',
      elements: [
        { id: 'plant-network', type: 'emoji', props: { emoji: '🌿', size: 40 }, position: { x: '20%', y: '35%' }, delay: 0 },
        { id: 'animal-network', type: 'emoji', props: { emoji: '🦌', size: 40 }, position: { x: '40%', y: '35%' }, delay: 0.3 },
        { id: 'water-network', type: 'emoji', props: { emoji: '💧', size: 40 }, position: { x: '60%', y: '35%' }, delay: 0.5 },
        { id: 'soil-network', type: 'emoji', props: { emoji: '🌍', size: 40 }, position: { x: '80%', y: '35%' }, delay: 0.7 },
        { id: 'factory-clean', type: 'emoji', props: { emoji: '🏭✅', size: 40 }, position: { x: '30%', y: '60%' }, delay: 1 },
        { id: 'cloud-network', type: 'cloud', props: { size: 'small' }, position: { x: '70%', y: '55%' }, delay: 1.2 },
        { id: 'web-network', type: 'emoji', props: { emoji: '🕸️', size: 50 }, position: { x: '50%', y: '50%' }, delay: 1.5 },
        { id: 'hero-final', type: 'emoji', props: { emoji: '🦸', size: 55 }, position: { x: '50%', y: '75%' }, delay: 1.8 },
        { id: 'rainbow-final', type: 'emoji', props: { emoji: '🌈', size: 50 }, position: { x: '50%', y: '20%' }, delay: 2.1 },
        { id: 'label-network', type: 'text', props: { text: '🕸️ شبكة التوازن البيئي' }, position: { x: '50%', y: '90%' }, delay: 2.5 },
      ],
      soundEffects: ['موسيقى انتصار 🎵', 'طبيعة سعيدة 🌿', 'تصفيق 👏'],
      educationalHighlight: 'شبكة التوازن: كل عنصر مترابط، وأنت حلقة الوصل المهمة!',
      transition: 'zoom',
    },
  ],
  finalMessage: 'أنت البطل الحقيقي! 🦸🌍 كل فعل صغير يساهم في حماية البيئة. استمر في مهمتك!',
};

// ============== COURSE DATA ==============
export const humanRoleGrade5: Course = {
  id: 'human-role-5',
  title: 'دور الإنسان في المحافظة على التوازن البيئي',
  grade: 5,
  icon: '🦸',
  color: 'bg-purple-100',
  badge: { name: 'مهندس التوازن البيئي', icon: '🌿🦅💧' },
  rewardMessages: {
    student: 'أنت لم تلعب فقط… بل أنقذت كل كائن وحافظت على التوازن البيئي!',
    parent: 'ولدك أصبح فاعلاً حقيقيًا في حماية الطبيعة! 🌱',
    universalGoldBadge: { name: 'البطل الشامل للبيئة', icon: '🌍' },
  },
  videoConcept: {
    title: 'أنت البطل… حامي الغابة!',
    scenario: 'مرحبًا أيها البطل! الطبيعة تستغيث… كل خطوة تقوم بها يمكن أن تغير مصير الحياة هنا.',
    moralMessage: 'أنت قادر على إحداث فرق كبير في حماية البيئة!',
  },
  animatedVideo: humanRoleVideo,
  videoStoryboard: {
    title: 'أنت البطل… حامي الغابة!',
    scenes: 'غابات زيتون → مشاكل بيئية → زراعة الأشجار → تنظيف المياه → حماية الحيوانات → إصلاح التربة → شبكة التوازن',
    narratorText: 'مرحبًا أيها البطل! الطبيعة تستغيث… كل خطوة تقوم بها يمكن أن تغير مصير الحياة هنا…',
    soundEffects: ['أشجار 🍃', 'طيور 🦉🦋', 'ماء 💧', 'تحذير ⚠️', 'انتصار 🌈'],
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1',
      type: 'scenario',
      title: 'قرار سريع لحماية البيئة',
      points: 25,
      prompt: 'اختر الأداة أو التصرف الصحيح لكل مشكلة بيئية 🛠️',
      scenario: 'رأيت شجرة مقطوعة، نهراً ملوثاً، طائراً مهدداً، وتربة جافة. ماذا تفعل؟',
      options: [
        'ازرع شجرة جديدة، نظف النهر، أبلغ عن الصيد، استخدم سماداً طبيعياً ✅',
        'اترك كل شيء كما هو',
        'استخدم مواد كيميائية لحل المشاكل',
      ],
      correct: 'ازرع شجرة جديدة، نظف النهر، أبلغ عن الصيد، استخدم سماداً طبيعياً ✅',
      successMessage: 'أحسنت! أنت حامي الغابة الحقيقي! 🌿🛡️',
      errorMessage: 'فكر مجدداً... الحلول الطبيعية هي الأفضل! 🌍',
      rewardBadge: { name: 'حامي الغابة', icon: '🌿🛡️' },
    },
    {
      id: 'ex2',
      type: 'mcq-set',
      title: 'تحدث باسم الكائنات',
      points: 20,
      prompt: 'حدد السبب والتأثير والحل لكل كائن متضرر 🐢🦌🐞',
      questions: [
        {
          id: 'q1',
          question: 'السلحفاة البحرية تختنق. ما السبب؟',
          options: ['🛍️ البلاستيك في البحر', '🌞 الشمس الحارة', '🌊 الموج العالي'],
          correct: '🛍️ البلاستيك في البحر',
        },
        {
          id: 'q2',
          question: 'الغزال لا يجد طعاماً. ما الحل؟',
          options: ['🌳 زراعة المزيد من الأشجار والنباتات', '🏭 بناء مصانع', '🚗 المزيد من السيارات'],
          correct: '🌳 زراعة المزيد من الأشجار والنباتات',
        },
        {
          id: 'q3',
          question: 'الحشرات النافعة تموت. كيف نحميها؟',
          options: ['🚫☠️ تجنب المبيدات الكيميائية', '☠️ استخدام المزيد من المبيدات', '🏭 بناء مصانع'],
          correct: '🚫☠️ تجنب المبيدات الكيميائية',
        },
      ],
      successMessage: 'رائع! أنت صديق حقيقي للكائنات 🐢🦌🐞',
      errorMessage: 'راجع الفيديو وفكر في احتياجات كل كائن 🌍',
      rewardBadge: { name: 'صديق الكائنات', icon: '🐢🦌🐞' },
    },
    {
      id: 'ex3',
      type: 'sticker-repair',
      title: 'أصلح البيئة بالملصقات',
      points: 25,
      prompt: 'اسحب الملصقات الصحيحة لإصلاح المشهد البيئي المتضرر 🌍✨',
      sceneTitle: '🏞️ بيئة تحتاج إلى إصلاح',
      slots: [
        { id: 'slot1', label: 'مكان الشجرة المقطوعة' },
        { id: 'slot2', label: 'النهر الملوث' },
        { id: 'slot3', label: 'التربة الجافة' },
      ],
      stickers: [
        { id: 'st1', label: 'شجرة جديدة', emoji: '🌳', slotId: 'slot1' },
        { id: 'st2', label: 'ماء نظيف', emoji: '💧', slotId: 'slot2' },
        { id: 'st3', label: 'سماد طبيعي', emoji: '🌿', slotId: 'slot3' },
      ],
      successMessage: 'أحسنت! أنت محترف إصلاح البيئة! 🌍✨',
      errorMessage: 'حاول وضع كل ملصق في المكان الصحيح 🔄',
      rewardBadge: { name: 'محترف إصلاح البيئة', icon: '🌍✨' },
    },
  ],
  games: [
    {
      id: 'g1',
      type: 'runner',
      title: 'سباق أنقذ البيئة',
      description: 'نفّذ الإجراءات الصحيحة (ازرع، نظف، احمِ، أصلح) قبل انتهاء الوقت! 🏃🌍',
      points: 35,
      gameData: {
        collectItems: ['🌳', '💧', '🛡️', '🌿', '🌱'],
        hazardItems: ['🪓', '🛍️', '☠️', '🔥'],
        lives: 3,
        timeLimitSec: 40,
        actions: ['ازرع شجرة', 'نظف النهر', 'احمِ الطيور', 'أصلح التربة'],
        rewardBadgeName: 'بطل البيئة 🏆',
      },
    },
    {
      id: 'g2',
      type: 'decision',
      title: 'مهمة مراقبة الطبيعة',
      description: 'راقب المناطق المختلفة، حدد المخاطر، وطبّق الحلول الصحيحة 🔭🌍',
      points: 30,
      gameData: {
        regions: [
          { id: 'r1', name: 'الغابة', hazards: ['🪓 قطع أشجار', '🔥 حريق'], solutions: ['🌱 زراعة', '🧯 إطفاء'] },
          { id: 'r2', name: 'النهر', hazards: ['🛍️ تلوث', '🏭 مخلفات'], solutions: ['🧹 تنظيف', '🚫 منع'] },
          { id: 'r3', name: 'السهول', hazards: ['☠️ مبيدات', '🏜️ جفاف'], solutions: ['🌿 سماد طبيعي', '💧 ري'] },
        ],
        rewardBadgeName: 'مراقب الطبيعة 🔭',
      },
    },
    {
      id: 'g3',
      type: 'construction',
      title: 'بناء شبكة التوازن البيئي',
      description: 'اربط العناصر بشكل صحيح لإنشاء شبكة توازن كاملة 🕸️🌍',
      points: 35,
      gameData: {
        availableElements: [
          { id: 'e1', name: 'نباتات', type: 'producer', icon: '🌿' },
          { id: 'e2', name: 'حيوانات', type: 'consumer', icon: '🦌' },
          { id: 'e3', name: 'ماء', type: 'water', icon: '💧' },
          { id: 'e4', name: 'تربة', type: 'soil', icon: '🌍' },
          { id: 'e5', name: 'مصنع نظيف', type: 'consumer', icon: '🏭✅' },
          { id: 'e6', name: 'سحب', type: 'sun', icon: '☁️' },
          { id: 'e7', name: 'شمس', type: 'sun', icon: '☀️' },
          { id: 'e8', name: 'إنسان', type: 'consumer', icon: '🧑' },
          { id: 'e9', name: 'طيور', type: 'consumer', icon: '🐦' },
          { id: 'e10', name: 'أشجار', type: 'producer', icon: '🌳' },
        ],
        constraints: { minElements: 6 },
        rewardBadgeName: 'مهندس التوازن البيئي 🕸️',
      },
    },
  ],
};
