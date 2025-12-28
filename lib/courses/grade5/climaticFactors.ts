import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA ==============
export const climaticFactorsVideo: AnimatedVideoData = {
  title: 'رحلة العناصر السحرية للماء والهواء',
  totalDuration: 70,
  scenes: [
    {
      id: 'scene-1-intro',
      title: 'المشهد 1: مقدمة - العوامل المناخية',
      background: 'sky',
      duration: 10,
      narratorText: 'مرحبًا يا أصدقاء الطبيعة! 🌞 اليوم سنذهب في مغامرة سحرية مع الحرارة، الضوء، الرياح والمطر. هذه العوامل المناخية تؤثر على كل الكائنات الحية في البيئة!',
      elements: [
        { id: 'sun-1', type: 'sun', props: { size: 'large', glowing: true }, position: { x: '50%', y: '25%' }, delay: 0 },
        { id: 'cloud-1', type: 'cloud', props: { size: 'medium', raining: false }, position: { x: '25%', y: '35%' }, delay: 0.5 },
        { id: 'cloud-2', type: 'cloud', props: { size: 'large', raining: true }, position: { x: '75%', y: '30%' }, delay: 0.7 },
        { id: 'text-title', type: 'text', props: { text: 'العوامل المناخية 🌞💧🌬️' }, position: { x: '50%', y: '70%' }, delay: 1 },
      ],
      soundEffects: ['رياح خفيفة 🌬️', 'قطرات مطر 🌧️', 'أشعة شمس 🌞'],
      educationalHighlight: 'العوامل المناخية: الحرارة، الضوء، الرياح، والأمطار تشكل بيئة الكائنات الحية',
      transition: 'fade',
    },
    {
      id: 'scene-2-sun-heat',
      title: 'المشهد 2: الشمس والحرارة',
      background: 'desert',
      duration: 12,
      narratorText: 'الشمس هي مصدر الحرارة والضوء الأساسي! في المناطق الحارة، نجد نباتات مثل الصبار تتكيف مع الحرارة الشديدة. الحرارة تؤثر على نمو النباتات وحركة الحيوانات 🌡️',
      elements: [
        { id: 'sun-hot', type: 'sun', props: { size: 'large', glowing: true }, position: { x: '75%', y: '20%' }, delay: 0 },
        { id: 'cactus-1', type: 'emoji', props: { emoji: '🌵', size: 60 }, position: { x: '30%', y: '70%' }, delay: 0.5 },
        { id: 'cactus-2', type: 'emoji', props: { emoji: '🌵', size: 45 }, position: { x: '60%', y: '75%' }, delay: 0.7 },
        { id: 'lizard', type: 'emoji', props: { emoji: '🦎', size: 40 }, position: { x: '45%', y: '80%' }, delay: 1 },
        { id: 'thermometer', type: 'emoji', props: { emoji: '🌡️', size: 50 }, position: { x: '85%', y: '50%' }, delay: 1.3 },
        { id: 'label-heat', type: 'text', props: { text: 'الحرارة والضوء ☀️' }, position: { x: '50%', y: '90%' }, delay: 1.5 },
      ],
      soundEffects: ['حرارة شديدة 🔥', 'صحراء هادئة 🏜️'],
      educationalHighlight: 'الحرارة: تؤثر على نشاط الكائنات الحية ونوع النباتات التي تنمو',
      transition: 'slide',
    },
    {
      id: 'scene-3-water-cycle',
      title: 'المشهد 3: دورة الماء السحرية',
      background: 'ocean',
      duration: 14,
      narratorText: 'انظروا إلى دورة الماء السحرية! الشمس تسخن الماء فيتبخر ويصعد للسماء ☁️ ثم يتكثف ويصبح سحاباً، ثم يسقط مطراً على الأرض! هذه الدورة لا تنتهي أبداً 💧',
      elements: [
        { id: 'sun-evap', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '80%', y: '15%' }, delay: 0 },
        { id: 'ocean-wave', type: 'water', props: { type: 'wave', size: 'large' }, position: { x: '30%', y: '85%' }, delay: 0.3 },
        { id: 'ocean-wave-2', type: 'water', props: { type: 'wave', size: 'medium' }, position: { x: '60%', y: '88%' }, delay: 0.5 },
        { id: 'arrow-up', type: 'arrow', props: { direction: 'up', color: '#3b82f6', label: 'تبخر' }, position: { x: '40%', y: '60%' }, delay: 1 },
        { id: 'cloud-form', type: 'cloud', props: { size: 'large', raining: false }, position: { x: '40%', y: '25%' }, delay: 1.5 },
        { id: 'text-condense', type: 'text', props: { text: 'تكثّف ☁️' }, position: { x: '55%', y: '25%' }, delay: 2 },
        { id: 'rain-cloud', type: 'cloud', props: { size: 'medium', raining: true }, position: { x: '70%', y: '35%' }, delay: 2.5 },
        { id: 'rain-drops', type: 'water', props: { type: 'rain', size: 'medium' }, position: { x: '70%', y: '55%' }, delay: 3 },
        { id: 'cycle-arrow', type: 'emoji', props: { emoji: '🔄', size: 40 }, position: { x: '50%', y: '50%' }, delay: 3.5 },
      ],
      soundEffects: ['موج البحر 🌊', 'تبخر الماء 💨', 'مطر يسقط 🌧️'],
      educationalHighlight: 'دورة الماء: تبخر ← تكثف ← هطول ← تجمع ← تبخر (دورة مستمرة)',
      transition: 'slide',
    },
    {
      id: 'scene-4-wind',
      title: 'المشهد 4: الرياح',
      background: 'farm',
      duration: 10,
      narratorText: 'الرياح تحمل البذور وتساعد في تلقيح النباتات! كما أنها تحرك السحب وتوزع الأمطار على مناطق مختلفة. الرياح عامل مناخي مهم جداً 🌬️',
      elements: [
        { id: 'tree-wind', type: 'plant', props: { type: 'tree', size: 'large', swaying: true }, position: { x: '25%', y: '60%' }, delay: 0 },
        { id: 'tree-wind-2', type: 'plant', props: { type: 'tree', size: 'medium', swaying: true }, position: { x: '75%', y: '65%' }, delay: 0.3 },
        { id: 'grass-wind', type: 'plant', props: { type: 'grass', size: 'medium', swaying: true }, position: { x: '50%', y: '85%' }, delay: 0.5 },
        { id: 'cloud-moving', type: 'cloud', props: { size: 'medium', speed: 'fast' }, position: { x: '40%', y: '25%' }, delay: 0.7 },
        { id: 'seeds', type: 'emoji', props: { emoji: '🌰', size: 25 }, position: { x: '55%', y: '50%' }, delay: 1 },
        { id: 'wind-icon', type: 'emoji', props: { emoji: '💨', size: 50 }, position: { x: '65%', y: '40%' }, delay: 1.3 },
        { id: 'bird-fly', type: 'animal', props: { type: 'bird', size: 'medium', moving: true }, position: { x: '80%', y: '35%' }, delay: 1.5 },
      ],
      soundEffects: ['رياح قوية 🌬️', 'أوراق تتطاير 🍂', 'طيور تحلق 🐦'],
      educationalHighlight: 'الرياح: تنقل البذور، تحرك السحب، وتساعد في توزيع الأمطار',
      transition: 'slide',
    },
    {
      id: 'scene-5-rain',
      title: 'المشهد 5: الأمطار وأثرها',
      background: 'forest',
      duration: 12,
      narratorText: 'المطر يسقي النباتات ويملأ الأنهار والبحيرات! بدون المطر، لا يمكن للكائنات الحية أن تعيش. كل قطرة ماء ثمينة ويجب علينا الحفاظ عليها 💧',
      elements: [
        { id: 'rain-cloud-1', type: 'cloud', props: { size: 'large', raining: true }, position: { x: '35%', y: '20%' }, delay: 0 },
        { id: 'rain-cloud-2', type: 'cloud', props: { size: 'medium', raining: true }, position: { x: '65%', y: '25%' }, delay: 0.3 },
        { id: 'rain-effect', type: 'water', props: { type: 'rain', size: 'large' }, position: { x: '50%', y: '45%' }, delay: 0.5 },
        { id: 'tree-wet', type: 'plant', props: { type: 'tree', size: 'large' }, position: { x: '20%', y: '70%' }, delay: 0.8 },
        { id: 'flower-wet', type: 'plant', props: { type: 'flower', size: 'medium' }, position: { x: '50%', y: '80%' }, delay: 1 },
        { id: 'river', type: 'water', props: { type: 'river', size: 'large' }, position: { x: '80%', y: '85%' }, delay: 1.3 },
        { id: 'frog', type: 'emoji', props: { emoji: '🐸', size: 40 }, position: { x: '70%', y: '75%' }, delay: 1.5 },
        { id: 'happy-plant', type: 'emoji', props: { emoji: '🌱', size: 35 }, position: { x: '40%', y: '85%' }, delay: 1.8 },
      ],
      soundEffects: ['مطر غزير 🌧️', 'ضفادع تنقنق 🐸', 'نهر يجري 💧'],
      educationalHighlight: 'الأمطار: مصدر الماء العذب للنباتات والحيوانات والإنسان',
      transition: 'slide',
    },
    {
      id: 'scene-6-balance',
      title: 'المشهد 6: توازن العوامل المناخية',
      background: 'park',
      duration: 12,
      narratorText: 'عندما تتوازن كل العوامل المناخية - الحرارة والضوء والرياح والأمطار - تزدهر الحياة! النباتات تنمو، الحيوانات تعيش بسعادة، والطبيعة تكون جميلة 🌈',
      elements: [
        { id: 'sun-balanced', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '85%', y: '15%' }, delay: 0 },
        { id: 'cloud-balanced', type: 'cloud', props: { size: 'small', raining: false }, position: { x: '60%', y: '20%' }, delay: 0.3 },
        { id: 'tree-happy', type: 'plant', props: { type: 'tree', size: 'large' }, position: { x: '25%', y: '55%' }, delay: 0.5 },
        { id: 'flowers', type: 'plant', props: { type: 'flower', size: 'medium' }, position: { x: '50%', y: '80%' }, delay: 0.7 },
        { id: 'bird-happy', type: 'animal', props: { type: 'bird', size: 'small', moving: true }, position: { x: '35%', y: '40%' }, delay: 0.9 },
        { id: 'butterfly-happy', type: 'animal', props: { type: 'butterfly', size: 'small', moving: true }, position: { x: '55%', y: '60%' }, delay: 1.1 },
        { id: 'rabbit-happy', type: 'animal', props: { type: 'rabbit', size: 'medium', moving: true }, position: { x: '70%', y: '75%' }, delay: 1.3 },
        { id: 'water-drop', type: 'water', props: { type: 'droplet', size: 'small' }, position: { x: '40%', y: '70%' }, delay: 1.5 },
        { id: 'rainbow', type: 'emoji', props: { emoji: '🌈', size: 60 }, position: { x: '50%', y: '35%' }, delay: 2 },
        { id: 'label-balance', type: 'text', props: { text: 'توازن العوامل المناخية 🌍' }, position: { x: '50%', y: '90%' }, delay: 2.5 },
      ],
      soundEffects: ['طبيعة هادئة 🎶', 'طيور سعيدة 🐦', 'ماء يجري 💧'],
      educationalHighlight: 'التوازن المناخي ضروري لحياة سعيدة للنباتات والحيوانات والإنسان',
      transition: 'zoom',
    },
  ],
  finalMessage: 'أحسنت! تعلمت عن العوامل المناخية وأهميتها للحياة. دورك الآن حماية هذا التوازن! 🌍💧',
};

// ============== COURSE DATA ==============
export const climaticFactorsGrade5: Course = {
  id: 'climatic-factors-5',
  title: 'العوامل المناخية في الوسط البيئي',
  grade: 5,
  icon: '🌦️',
  color: 'bg-sky-100',
  badge: { name: 'مستكشف دورة الماء', icon: '🌍💧' },
  rewardMessages: {
    student: 'أنت الآن خبير في العوامل المناخية! استمر في حماية البيئة!',
    parent: 'طفلك تعلم عن العوامل المناخية وأهميتها للحياة! 🌦️',
    universalGoldBadge: { name: 'بطل العوامل المناخية والوسط البيئي', icon: '🌍' },
  },
  videoConcept: {
    title: 'رحلة العناصر السحرية للماء والهواء',
    scenario: 'مرحبًا يا أصدقاء الطبيعة! 🌞 اليوم سنذهب في مغامرة سحرية مع الحرارة، الضوء، الرياح والمطر.',
    moralMessage: 'العوامل المناخية تشكل بيئتنا، ويجب علينا الحفاظ على توازنها!',
  },
  animatedVideo: climaticFactorsVideo,
  videoStoryboard: {
    title: 'رحلة العناصر السحرية للماء والهواء',
    scenes: 'الشمس تشرق → الماء يتبخر → السحب تتشكل → المطر يسقط → النباتات تنمو → الرياح تهب',
    narratorText: 'مرحبًا يا أصدقاء الطبيعة! 🌞 اليوم سنذهب في مغامرة سحرية مع الحرارة، الضوء، الرياح والمطر...',
    soundEffects: ['مطر 🌧️', 'رياح 🌬️', 'طيور 🐦', 'حشرات 🐝', 'نهر 💦'],
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1',
      type: 'matching',
      title: 'اربط العامل المناخي بتأثيره',
      points: 20,
      prompt: 'اسحب كل عامل مناخي نحو تأثيره الصحيح 🌞🌧️🌬️💡',
      pairs: [
        { left: 'الشمس ☀️', right: 'يرفع درجة حرارة الوسط' },
        { left: 'المطر 🌧️', right: 'يملأ الأنهار ويسقي التربة' },
        { left: 'الرياح 🌬️', right: 'تنقل البذور من مكان لآخر' },
        { left: 'الضوء 💡', right: 'يساعد النبات على صنع غذائه' },
      ],
      successMessage: 'أحسنت! فهمت كيف تؤثر العوامل المناخية في الوسط البيئي 🌱',
      errorMessage: 'حاول مرة أخرى، فكل عنصر مناخي له دور مهم في الطبيعة 🌍',
      rewardBadge: { name: 'صديق الطبيعة الذكي', icon: '🏅' },
    },
    {
      id: 'ex2',
      type: 'mcq-set',
      title: 'تفكير علمي في العوامل المناخية',
      points: 20,
      prompt: 'اختر الإجابة الصحيحة لكل سؤال حول الضوء والرياح والمطر',
      questions: [
        {
          id: 'q1',
          question: 'ماذا يحدث للنبات إذا غاب الضوء؟',
          options: ['لا ينمو 🌱', 'يصنع غذاءه', 'يذبل وقد يموت'],
          correct: 'يذبل وقد يموت',
        },
        {
          id: 'q2',
          question: 'أي عامل يساعد على انتشار البذور؟',
          options: ['الرياح 🌬️', 'الظل', 'الظلام'],
          correct: 'الرياح 🌬️',
        },
        {
          id: 'q3',
          question: 'لماذا الأمطار مهمة؟',
          options: ['لأنها تلوّن الطبيعة', 'لأنها تملأ المياه وتسقي النباتات', 'لأنها تزعج الناس'],
          correct: 'لأنها تملأ المياه وتسقي النباتات',
        },
      ],
      successMessage: 'رائع! أنت تفكر مثل عالم صغير 🔬🌍',
      errorMessage: 'لا بأس! أعد مشاهدة الفيديو وفكّر في تأثير كل عنصر مناخي ☀️🌧️',
      rewardBadge: { name: 'باحث بيئي صغير', icon: '🏅' },
    },
    {
      id: 'ex3',
      type: 'scenario',
      title: 'موقف سلوكي لحماية البيئة',
      points: 25,
      prompt: 'اختر التصرف الصحيح في موقف بيئي حقيقي',
      scenario: 'ترى نبتة ذابلة، ماءً ملوثاً، وطيوراً تبحث عن ماء. ماذا تفعل؟',
      options: [
        'أحافظ على الماء وأسقي النباتات',
        'أتجاهل الأمر',
        'أستعمل الماء الملوث',
      ],
      correct: 'أحافظ على الماء وأسقي النباتات',
      successMessage: 'تصرفك الصحيح يحمي الطبيعة والكائنات الحية 🌱🐦',
      errorMessage: 'جرّب ثانية: التصرّف الإيجابي ينقذ النباتات والماء 💧',
      rewardBadge: { name: 'حامي البيئة الصغير', icon: '🌍' },
    },
  ],
  games: [
    {
      id: 'g1',
      type: 'runner',
      title: 'سباق قطرة الماء السحرية',
      description: 'حرّك القطرة عبر النهر → التبخر → السحاب → المطر، وتجنّب التلوث والحرارة الزائدة 💧',
      points: 35,
      gameData: {
        collectItems: ['💧', '☁️', '🌧️'],
        hazardItems: ['🏭', '🔥', '🗑️'],
        lives: 3,
        timeLimitSec: 15,
        stages: ['نهر', 'تبخر', 'سحاب', 'مطر'],
        rewardBadgeName: 'مستكشف دورة الماء',
      },
    },
    {
      id: 'g2',
      type: 'dragdrop',
      title: 'تنقية النهر السحري',
      description: 'اسحب أدوات الترسيب والترشيح والتعقيم بالترتيب الصحيح لتحويل الماء الملوث إلى ماء صافٍ 🧪🌊',
      points: 30,
      gameData: {
        steps: ['ترسيب', 'ترشيح', 'تعقيم'],
        failDelaySec: 20,
        rewardBadgeName: 'ساحر المياه الصغير',
      },
    },
    {
      id: 'g3',
      type: 'decision',
      title: 'حديقة العوامل الطبيعية',
      description: 'اتخذ قرارات لحماية الحديقة من الحرارة الشديدة والرياح ونقص الماء بوضع ظل وسقي وحماية للتربة 🌞🌧️🌬️',
      points: 35,
      gameData: {
        scenarios: ['حرارة شديدة', 'رياح قوية', 'نقص ماء'],
        actions: ['وضع ظل', 'سقي النباتات', 'حماية التربة'],
        rewardBadgeName: 'حامي العناصر الطبيعية',
      },
    },
  ],
};
