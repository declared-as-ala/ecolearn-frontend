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
    universalGoldBadge: { name: 'البطل الشامل للبيئة', icon: '🌍' },
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
      type: 'drag-sequence',
      title: 'رتّب العوامل المناخية',
      points: 25,
      prompt: 'رتّب تأثير العوامل المناخية على دورة الماء بالترتيب الصحيح 🌞🌧️',
      items: [
        { id: 'sun', label: 'الشمس تسخن الماء', emoji: '☀️' },
        { id: 'evap', label: 'التبخر', emoji: '💨' },
        { id: 'cloud', label: 'تكوّن السحب', emoji: '☁️' },
        { id: 'rain', label: 'سقوط المطر', emoji: '🌧️' },
      ],
      correctOrder: ['sun', 'evap', 'cloud', 'rain'],
      successMessage: 'ممتاز! تعرفت على ترتيب تأثير العوامل المناخية 🌞🌿',
      errorMessage: 'حاول مجدداً! تذكر دورة الماء السحرية 💧',
      rewardBadge: { name: 'ساحر العوامل الطبيعية', icon: '🌞💧' },
    },
    {
      id: 'ex2',
      type: 'mcq-set',
      title: 'أسئلة عن الماء والمناخ',
      points: 20,
      prompt: 'أجب عن الأسئلة التالية عن حالات الماء والعوامل المناخية 💦',
      questions: [
        {
          id: 'q1',
          question: 'ما الذي يحدث للماء عند تسخينه؟',
          options: ['💨 يتبخر', '❄️ يتجمد', '💧 يبقى كما هو'],
          correct: '💨 يتبخر',
        },
        {
          id: 'q2',
          question: 'كيف تتكون السحب؟',
          options: ['☁️ بتكثف بخار الماء', '🌧️ بسقوط المطر', '🌬️ بهبوب الرياح'],
          correct: '☁️ بتكثف بخار الماء',
        },
        {
          id: 'q3',
          question: 'ما دور الرياح في البيئة؟',
          options: ['🌬️ نقل البذور والسحب', '🌧️ سقوط المطر', '☀️ تسخين الأرض'],
          correct: '🌬️ نقل البذور والسحب',
        },
      ],
      successMessage: 'رائع! أنت تعرف أهمية الماء والعوامل المناخية 💦🌞',
      errorMessage: 'راجع الفيديو وتذكر دور كل عامل مناخي 🌍',
      rewardBadge: { name: 'محارب العناصر الطبيعية', icon: '🌿' },
    },
    {
      id: 'ex3',
      type: 'scenario',
      title: 'حماية المياه والهواء',
      points: 20,
      prompt: 'اختر التصرف الصحيح لحماية الماء والهواء 💧🌬️',
      scenario: 'رأيت مياهاً ملوثة في النهر ونباتات ذابلة بسبب قلة الماء. ماذا تفعل؟',
      options: [
        'أبلّغ الكبار وأساعد في سقي النباتات وعدم إلقاء النفايات 💧✅',
        'أتجاهل الأمر لأنه ليس مشكلتي',
        'ألقي المزيد من النفايات في النهر',
      ],
      correct: 'أبلّغ الكبار وأساعد في سقي النباتات وعدم إلقاء النفايات 💧✅',
      successMessage: 'أحسنت! كل تصرف إيجابي ينقذ الطبيعة 🌱',
      errorMessage: 'فكر مجدداً... حماية الماء مسؤولية الجميع 💧',
      rewardBadge: { name: 'حامي المياه والهواء', icon: '💧🌬️' },
    },
  ],
  games: [
    {
      id: 'g1',
      type: 'runner',
      title: 'سباق القطرات السحرية',
      description: 'ساعد قطرة الماء في رحلتها عبر دورة الماء: التبخر، التكثف، الهطول 💧🏁',
      points: 35,
      gameData: {
        collectItems: ['☀️', '☁️', '🌧️', '💧'],
        hazardItems: ['🏭', '🗑️', '💨'],
        lives: 3,
        timeLimitSec: 40,
        stages: ['تبخر', 'تكثف', 'هطول', 'تجمع'],
        rewardBadgeName: 'بطل دورة الماء 💧',
      },
    },
    {
      id: 'g2',
      type: 'flow',
      title: 'تنقية النهر السحري',
      description: 'طبّق أدوات الترشيح بالترتيب الصحيح لتنقية مياه النهر 🧪🌊',
      points: 30,
      gameData: {
        stages: [
          { id: 'dirty', label: 'ماء ملوث', icon: '🟤', energy: 0 },
          { id: 'filter1', label: 'ترشيح أولي', icon: '🧹', energy: 25 },
          { id: 'filter2', label: 'ترشيح ثانوي', icon: '🧪', energy: 50 },
          { id: 'clean', label: 'ماء نظيف', icon: '💧', energy: 100 },
        ],
        correctOrder: ['dirty', 'filter1', 'filter2', 'clean'],
        lossIcon: '❌',
        rewardBadgeName: 'منقذ النهر 🌊',
      },
    },
    {
      id: 'g3',
      type: 'construction',
      title: 'حديقة العوامل الطبيعية',
      description: 'احمِ النباتات والحيوانات من تأثيرات الشمس والرياح والمطر الشديد 🌞🌬️🌧️',
      points: 35,
      gameData: {
        availableElements: [
          { id: 'e1', name: 'شمس معتدلة', type: 'sun', icon: '🌤️' },
          { id: 'e2', name: 'ظل الأشجار', type: 'producer', icon: '🌳' },
          { id: 'e3', name: 'مظلة للحماية', type: 'consumer', icon: '⛱️' },
          { id: 'e4', name: 'مياه للسقي', type: 'water', icon: '💧' },
          { id: 'e5', name: 'سياج للرياح', type: 'soil', icon: '🧱' },
          { id: 'e6', name: 'نباتات سعيدة', type: 'producer', icon: '🌻' },
          { id: 'e7', name: 'حيوانات سعيدة', type: 'consumer', icon: '🐰' },
        ],
        constraints: { minElements: 4 },
        rewardBadgeName: 'حارس الحديقة 🌻',
      },
    },
  ],
};
