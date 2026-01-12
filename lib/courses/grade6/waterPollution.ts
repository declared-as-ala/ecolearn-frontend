import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA: تلوث الأوساط المائية ==============
export const waterPollutionVideo: AnimatedVideoData = {
  title: 'النهر يبكي… والمحيط يصرخ!',
  totalDuration: 90,
  scenes: [
    {
      id: 'scene-1-river-pollution',
      title: 'المشهد 1: دموع النهر',
      background: 'ocean',
      duration: 20,
      narratorText: 'مرحبًا أيها المنقذ! 🌊 هذا النهر كان يومًا مصدر حياة… واليوم… يذرف دموعًا من التلوث! المنظفات والمبيدات تقتل الأسماك وتلوث المياه العذبة.',
      elements: [
        { id: 'river', type: 'water', props: { type: 'river', size: 'large' }, position: { x: '50%', y: '80%' }, delay: 0 },
        { id: 'detergent', type: 'emoji', props: { emoji: '🧴🧼', size: 40 }, position: { x: '25%', y: '60%' }, delay: 1 },
        { id: 'pesticide', type: 'emoji', props: { emoji: '🧪🌾', size: 40 }, position: { x: '75%', y: '60%' }, delay: 2 },
        { id: 'polluted-bubbles', type: 'pollution', props: { type: 'smoke', size: 'small' }, position: { x: '50%', y: '75%' }, delay: 3 },
        { id: 'dead-fish', type: 'emoji', props: { emoji: '🐟💀', size: 30 }, position: { x: '50%', y: '70%' }, delay: 4 },
        { id: 'label', type: 'text', props: { text: 'تلوث كيميائي وعضوي 🧪🧴' }, position: { x: '50%', y: '92%' }, delay: 5 },
      ],
      soundEffects: ['جريان ماء ملوث 💧', 'موسيقى حزينة 🎻'],
      educationalHighlight: 'المواد الكيميائية المنزلية والزراعية تقتل الحياة المائية',
      transition: 'fade',
    },
    {
      id: 'scene-2-oil-danger',
      title: 'المشهد 2: خطر النفط والبلاستيك',
      background: 'ocean',
      duration: 25,
      narratorText: 'ناقلات النفط قد تسبب كوارث! 🚢 النفط يخنق الكائنات، والبلاستيك يُخطئه الطير والسلحفاة لقوتها! نحن نكسر دورة الحياة بهذا الإهمال.',
      elements: [
        { id: 'tanker', type: 'emoji', props: { emoji: '🚢', size: 60 }, position: { x: '80%', y: '20%' }, delay: 0 },
        { id: 'oil-spill', type: 'pollution', props: { type: 'oil', size: 'large' }, position: { x: '50%', y: '60%' }, delay: 1 },
        { id: 'turtle-struggle', type: 'animal', props: { type: 'turtle', size: 'medium', moving: true }, position: { x: '40%', y: '60%' }, delay: 2.5 },
        { id: 'plastic-waste', type: 'emoji', props: { emoji: '🥤🛍️', size: 40 }, position: { x: '60%', y: '55%' }, delay: 3.5 },
        { id: 'danger-icon', type: 'emoji', props: { emoji: '⚠️🛑', size: 50 }, position: { x: '50%', y: '40%' }, delay: 5 },
        { id: 'label', type: 'text', props: { text: 'التلوث النفطي والبلاستيكي 🛢️🥤' }, position: { x: '50%', y: '92%' }, delay: 6 },
      ],
      soundEffects: ['تنبيه خطر ⚠️', 'أمواج متعبة 🌊'],
      educationalHighlight: 'النفط والبلاستيك يهددان سلامة الأوساط المائية العالمية',
      transition: 'slide',
    },
    {
      id: 'scene-3-your-protection',
      title: 'المشهد 3: كيف تحمي ماءك؟',
      background: 'city',
      duration: 25,
      narratorText: 'الحماية تبدأ منك! 🚰 لا تسكب الزيت في المصرف، غطّ بئرك جيداً، واستخدم حلولاً ذكية لتصفية المياه. كل فعل صغير ينقذ قطرة ماء!',
      elements: [
        { id: 'kid-protecting', type: 'emoji', props: { emoji: '🧑‍🔬', size: 50 }, position: { x: '25%', y: '60%' }, delay: 0 },
        { id: 'oil-bottle', type: 'emoji', props: { emoji: '🧴✅', size: 40 }, position: { x: '45%', y: '60%' }, delay: 2 },
        { id: 'well-cover', type: 'emoji', props: { emoji: '🕳️🛡️', size: 45 }, position: { x: '70%', y: '65%' }, delay: 4 },
        { id: 'clean-droplet', type: 'water', props: { type: 'droplet', size: 'medium' }, position: { x: '50%', y: '30%' }, delay: 6 },
        { id: 'label', type: 'text', props: { text: 'كن حارساً للماء! 🚰🛡️' }, position: { x: '50%', y: '92%' }, delay: 7 },
      ],
      soundEffects: ['محطة تصفية 🏭', 'ماء نقي 🚰', 'نجاح ✨'],
      educationalHighlight: 'السلوكيات الواعية تحمي المياه الجوفية والسطحية',
      transition: 'zoom',
    },
  ],
  finalMessage: 'أنت الآن بطل المياه النظيفة! حميت قطرة الماء… وحميت الحياة. 💧💙🌍',
};

// ============== COURSE DATA: تلوث الأوساط المائية ==============
export const waterPollutionCourse: Course = {
  id: 'water-pollution-6',
  title: 'تلوث الأوساط المائية',
  grade: 6,
  icon: '🚰',
  color: 'bg-indigo-50',
  badge: { name: 'بطل المياه النظيفة', icon: '💧🌊' },
  rewardMessages: {
    student: 'لم تنظّف ماءً فقط… بل حميت حياة كاملة! 🌍💙',
    parent: 'ابنكم/ابنتكم أصبح يدرك مخاطر تلوث المياه وكيفية التصرف بوعي لحماية هذا المورد الثمين. 🌿',
    universalGoldBadge: { name: 'بطل المياه النظيفة', icon: '💧' },
  },
  videoConcept: {
    title: 'النهر يبكي… والمحيط يصرخ!',
    scenario: 'رحلة بصرية تكتشف مصادر التلوث وتأثيرها على الكائنات المائية، مع حلول عملية للحماية.',
    moralMessage: 'الماء عهدة في أعناقنا، وحمايته واجب أخلاقي وعلمي.',
  },
  videoUrl: '/videos/6eme-4.mp4',
  animatedVideo: waterPollutionVideo,
  videoStoryboard: {
    title: 'النهر يبكي… والمحيط يصرخ!',
    scenes: 'تلوث النهر ← كوارث النفط ← حلول منزلية ← بيئة مائية صافية',
    narratorText: 'مرحبًا أيها المنقذ! النهر يواجه تهديدات كبيرة، فهل ستساعده؟',
    soundEffects: ['ماء ملوث 💧', 'تنبيه ⚠️', 'موسيقى نصر 🎵'],
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1_water_pollution',
      type: 'matching',
      title: 'التمرين 1: من أين يأتي التلوث؟',
      points: 20,
      prompt: 'اربط كل مصدر من المصادر التالية بنوع التلوث الذي يسببه للوسط المائي 🏭⚓',
      pairs: [
        { left: 'المنزل (منظفات - زيت) 🏠', right: 'تلوث كيميائي وعضوي' },
        { left: 'المزرعة (مبيدات - أسمدة) 🌾', right: 'تلوث كيميائي' },
        { left: 'ناقلة نفط في البحر 🚢', right: 'تلوث نفطي' },
        { left: 'فضلات المصانع 🏭', right: 'تلوث كيميائي سام' },
      ],
      successMessage: 'تحليل دقيق! أنت "محلل مصادر التلوث". النهر أصبح أنظف الآن! 🔍✨',
      errorMessage: 'تذكر: المنظفات والمبيدات كيميائية، والناقلات تسبب تلوثاً نفطياً. ❌',
      rewardBadge: { name: 'محلل مصادر التلوث', icon: '🔍' },
    },
    {
      id: 'ex2_water_pollution',
      type: 'mcq-set',
      title: 'التمرين 2: كيف تحمي ماءك؟',
      points: 20,
      prompt: 'اختر السلوك الذكي والصحيح لحماية المياه في المواقف التالية 🚰🛡️',
      questions: [
        {
          id: 'q1',
          question: 'كيف تتخلص من زيت القلي المستعمل؟ 🍳',
          options: ['أجمعه في قارورة مغلقة للتدوير ✅', 'أسكبه في مجرى المياه'],
          correct: 'أجمعه في قارورة مغلقة للتدوير ✅',
        },
        {
          id: 'q2',
          question: 'كيف تغسل الخضار لتوفير وحماية الماء؟ 🥗',
          options: ['في إناء وأستعمل الماء للسقي ✅', 'تحت صنبور مفتوح بقوة'],
          correct: 'في إناء وأستعمل الماء للسقي ✅',
        },
        {
          id: 'q3',
          question: 'ما هو التصرف الصحيح للبئر في المنزل؟ 💧',
          options: ['تغطيته بغطاء محكم لمنع التسرب ✅', 'تركه مفتوحاً ليصله الهواء'],
          correct: 'تغطيته بغطاء محكم لمنع التسرب ✅',
        },
      ],
      successMessage: 'رائع! أنت "حارس الماء المنزلي" الأمين. الماء أصبح صالحاً! 🚰✨',
      errorMessage: 'انتبه! سكب الزيت وترك الآبار مفتوحة يسبب تلوثاً خطيراً للمياه الجوفية. ❌',
      rewardBadge: { name: 'حارس الماء المنزلي', icon: '🚰' },
    },
    {
      id: 'ex3_water_pollution',
      type: 'scenario',
      title: 'التمرين 3: اختَر الحل الأذكى!',
      points: 25,
      prompt: 'واجه النهر مشكلة تلوث كبيرة. أي حل هو الأكثر واقعية وعلمية؟ 💡🌊',
      scenario: 'لاحظ النهر الملوث بمياه الصرف الصحي والنفايات الصناعية:',
      options: [
        'بناء محطة تصفية (تطهير) ومعالجة المياه ✅',
        'بناء سد لإغلاق النهر ومنع جريانه',
        'ردم النهر بالكامل بالتراب لإنهاء المشكلة',
      ],
      correct: 'بناء محطة تصفية (تطهير) ومعالجة المياه ✅',
      successMessage: 'تفكير عبقري! أنت "مبتكر الحلول المائية". النهر بدأ يصفو! 💡✨',
      errorMessage: 'إغلاق النهر أو ردمه يسبب كوارث أكبر (فيضان أو جفاف). التصفية هي الحل! ❌',
      rewardBadge: { name: 'مبتكر الحلول المائية', icon: '💡' },
    },
  ],
  games: [
    // 🎮 GAME 1: "مصدر التلوث"
    {
      id: 'g1',
      type: 'pollution-source',
      title: 'مصدر التلوث',
      description: 'نهر ملوث! حدد مصدر التلوث: منزل؟ مصنع؟ مزرعة؟ اختيار خاطئ → التلوث يستمر 🏠🏭🚜',
      points: 40,
      gameData: {
        scenarios: [
          {
            id: 's1',
            riverState: 'نهر ملوث برغوة بيضاء ورائحة كيميائية',
            visualClues: [
              '🌊 ماء عكر مع رغوة بيضاء',
              '💨 رائحة كيميائية قوية',
              '🏭 دخان أسود في الأفق',
              '🐟 أسماك ميتة تطفو',
            ],
            correctSource: 'factory',
            sources: {
              house: { label: 'منزل', icon: '🏠', description: 'مياه صرف صحي من المنازل' },
              factory: { label: 'مصنع', icon: '🏭', description: 'مخلفات كيميائية من المصانع' },
              farm: { label: 'مزرعة', icon: '🚜', description: 'مبيدات وأسمدة من المزارع' },
            },
          },
          {
            id: 's2',
            riverState: 'نهر ملوث برائحة كريهة ومواد عضوية',
            visualClues: [
              '🌊 ماء عكر بني',
              '💩 رائحة كريهة',
              '🏠 منازل قريبة من النهر',
              '🧼 صابون ورغوة',
            ],
            correctSource: 'house',
            sources: {
              house: { label: 'منزل', icon: '🏠', description: 'مياه صرف صحي من المنازل' },
              factory: { label: 'مصنع', icon: '🏭', description: 'مخلفات كيميائية من المصانع' },
              farm: { label: 'مزرعة', icon: '🚜', description: 'مبيدات وأسمدة من المزارع' },
            },
          },
          {
            id: 's3',
            riverState: 'نهر ملوث بمواد خضراء وطحالب كثيفة',
            visualClues: [
              '🌊 ماء أخضر عكر',
              '🌿 طحالب كثيفة',
              '🚜 جرارات زراعية قريبة',
              '🌾 حقول قريبة',
            ],
            correctSource: 'farm',
            sources: {
              house: { label: 'منزل', icon: '🏠', description: 'مياه صرف صحي من المنازل' },
              factory: { label: 'مصنع', icon: '🏭', description: 'مخلفات كيميائية من المصانع' },
              farm: { label: 'مزرعة', icon: '🚜', description: 'مبيدات وأسمدة من المزارع' },
            },
          },
        ],
      },
    },

    // 🎮 GAME 2: "اختبار جودة الماء"
    {
      id: 'g2',
      type: 'water-quality-test',
      title: 'اختبار جودة الماء',
      description: 'أدوات: pH، بكتيريا، مواد كيميائية. قرر: صالح أم لا؟ 🧪📊',
      points: 45,
      gameData: {
        samples: [
          {
            id: 's1',
            name: 'عينة ماء من نهر نظيف',
            pH: 7.2,
            bacteria: 5,
            chemicals: 2,
            isSafe: true,
            description: 'ماء نظيف وصالح للشرب',
          },
          {
            id: 's2',
            name: 'عينة ماء من نهر ملوث',
            pH: 4.5,
            bacteria: 85,
            chemicals: 90,
            isSafe: false,
            description: 'ماء ملوث وغير صالح للشرب',
          },
          {
            id: 's3',
            name: 'عينة ماء من بئر',
            pH: 6.8,
            bacteria: 15,
            chemicals: 10,
            isSafe: true,
            description: 'ماء صالح للشرب بعد المعالجة',
          },
        ],
      },
    },

    // 🎮 GAME 3: "ما الذي يلوث البحر؟" - لعبة بسيطة وتعليمية للأطفال
    {
      id: 'g3',
      type: 'sea-pollution-quiz',
      title: 'ما الذي يلوث البحر؟',
      description: 'شاهد كل عنصر وقرر: هل يلوث البحر أم لا؟ ✅ / ❌ 🌊',
      points: 50,
      gameData: {
        items: [
          { id: '1', name: 'زجاجة بلاستيكية', icon: '🥤', pollutes: true },
          { id: '2', name: 'سمكة', icon: '🐟', pollutes: false },
          { id: '3', name: 'كيس بلاستيك', icon: '🛍️', pollutes: true },
          { id: '4', name: 'نبات بحري', icon: '🌿', pollutes: false },
          { id: '5', name: 'زيت', icon: '🛢️', pollutes: true },
          { id: '6', name: 'قنديل البحر', icon: '🪼', pollutes: false },
          { id: '7', name: 'علبة معدنية', icon: '🥫', pollutes: true },
          { id: '8', name: 'نجم البحر', icon: '⭐', pollutes: false },
          { id: '9', name: 'منظفات كيميائية', icon: '🧴', pollutes: true },
          { id: '10', name: 'سلحفاة بحرية', icon: '🐢', pollutes: false },
          { id: '11', name: 'نفايات صناعية', icon: '🏭', pollutes: true },
          { id: '12', name: 'أعشاب بحرية', icon: '🌊', pollutes: false },
        ],
      },
    },
  ],
};
