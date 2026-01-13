import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA: السلاسل الغذائية ==============
export const foodChainsVideo: AnimatedVideoData = {
  title: 'رحلة الطاقة… من الشمس إلى الصقر!',
  totalDuration: 90,
  scenes: [
    {
      id: 'scene-1-sun-energy',
      title: 'المشهد 1: بداية الرحلة',
      background: 'forest',
      duration: 15,
      narratorText: 'مرحبًا أيها المسافر في سلسلة الحياة! 🌿 انظر إلى هذه الرحلة السرية التي تبدأ من الشمس! الطاقة تهبط إلى النباتات لتتحول إلى غذاء.',
      elements: [
        { id: 'sun', type: 'sun', props: { size: 'large', glowing: true }, position: { x: '85%', y: '15%' }, delay: 0 },
        { id: 'light-beam', type: 'energy-flow', props: { direction: 'down', color: '#fbbf24', speed: 'normal' }, position: { x: '80%', y: '25%' }, delay: 1 },
        { id: 'plant', type: 'plant', props: { type: 'tree', size: 'small' }, position: { x: '30%', y: '75%' }, delay: 1.5 },
        { id: 'energy-label', type: 'text', props: { text: 'الشمس: مصدر الطاقة الأول ⚡' }, position: { x: '50%', y: '92%' }, delay: 2 },
      ],
      soundEffects: ['صوت شعاع ⚡', 'غابة 🌳'],
      educationalHighlight: 'الشمس هي مصدر الطاقة الأول لكل الكائنات الحية',
      transition: 'fade',
    },
    {
      id: 'scene-2-chain-reaction',
      title: 'المشهد 2: السلسلة الغذائية',
      background: 'forest',
      duration: 25,
      narratorText: 'ثم تنتقل الطاقة إلى الفأر… فالأفعى… فالصقر! لكن لاحظ: الطاقة تتناقص في كل مرحلة ولا تعود أبداً للشمس!',
      elements: [
        { id: 'mouse', type: 'animal', props: { type: 'mouse', size: 'small', moving: true }, position: { x: '30%', y: '70%' }, delay: 0 },
        { id: 'snake', type: 'animal', props: { type: 'snake', size: 'medium', moving: true }, position: { x: '55%', y: '60%' }, delay: 2 },
        { id: 'hawk', type: 'animal', props: { type: 'hawk', size: 'large', moving: true }, position: { x: '80%', y: '30%' }, delay: 4 },
        { id: 'energy-loss', type: 'emoji', props: { emoji: '📉', size: 40 }, position: { x: '50%', y: '50%' }, delay: 5.5 },
        { id: 'label', type: 'text', props: { text: 'الطاقة تنتقل وتتناقص عبر السلسلة 📉' }, position: { x: '50%', y: '92%' }, delay: 6 },
      ],
      soundEffects: ['صوت جري 🐭', 'رفرفة أجنحة 🦅', 'تنبيه طاقة 💨'],
      educationalHighlight: 'الطاقة تنتقل في اتجاه واحد وتتبدد تدريجياً عبر السلسلة',
      transition: 'slide',
    },
    {
      id: 'scene-3-matter-cycle',
      title: 'المشهد 3: دورة المادة',
      background: 'forest',
      duration: 25,
      narratorText: 'أما المادة… فتُعاد! عندما تموت الكائنات، تأتي البكتيريا لتفكيكها، فتعيد الأملاح إلى التربة لتتغذى عليها النباتات من جديد.',
      elements: [
        { id: 'remains', type: 'emoji', props: { emoji: '🦴', size: 35 }, position: { x: '50%', y: '85%' }, delay: 0 },
        { id: 'bacteria', type: 'emoji', props: { emoji: '🦠🦠', size: 30 }, position: { x: '55%', y: '80%' }, delay: 1 },
        { id: 'cycle-arrow', type: 'emoji', props: { emoji: '🔄', size: 70 }, position: { x: '50%', y: '50%' }, delay: 4 },
        { id: 'new-plant', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '25%', y: '75%' }, delay: 6 },
        { id: 'label', type: 'text', props: { text: 'المادة تدور للأبد بفضل المفككات 🔄' }, position: { x: '50%', y: '92%' }, delay: 7 },
      ],
      soundEffects: ['حركة بكتيريا 🦠', 'موسيقى دائرية 🔄', 'نمو 🌿'],
      educationalHighlight: 'المفككات تضمن استمرار دورة المادة عبر إعادة العناصر للتربة',
      transition: 'zoom',
    },
  ],
  finalMessage: 'الطاقة تسير… والمادة تدور… وأنت الآن حارس السلاسل الغذائية! 🌍🔗',
};

// ============== COURSE DATA: السلاسل الغذائية ==============
export const foodChainsCourse: Course = {
  id: 'food-chains-6',
  title: 'السلاسل الغذائية',
  grade: 6,
  icon: '🕸️',
  color: 'bg-amber-50',
  badge: { name: 'حارس الدورة الأبدية', icon: '🔄🌍' },
  rewardMessages: {
    student: 'فهمت أن الطاقة تسير… والمادة تدور… والسلسلة لا تعيش دون كل حلقة! 🌍🔗',
    parent: 'ابنكم/ابنتكم تعلم اليوم كيف تنتقل الطاقة وتدور المادة في الطبيعة، وأهمية كل كائن في التوازن البيئي. 🌿',
    universalGoldBadge: { name: 'حارس الدورة الأبدية', icon: '🌍' },
  },
  videoConcept: {
    title: 'لغز الطاقة والمادة',
    scenario: 'تتبع رحلة الطاقة من الشمس وصولاً إلى المفترسات، واكتشاف دور البكتيريا في إغلاق دورة المادة.',
    moralMessage: 'في الطبيعة، كل حلقة ضرورية لاستمرار الحياة.',
  },
  videoUrl: '/videos/6eme-2.mp4',
  animatedVideo: foodChainsVideo,
  videoStoryboard: {
    title: 'رحلة الطاقة والمادة',
    scenes: 'شمس ← نبات ← حيوان ← موت ← تحلل ← حياة جديدة',
    narratorText: 'مرحبًا أيها المسافر! انظر إلى هذه الرحلة السرية التي تبدأ من الشمس...',
    soundEffects: ['طاقة ⚡', 'غابة 🌳', 'بكتيريا 🦠'],
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1_food_chains_new',
      type: 'matching',
      title: 'التمرين 1: أين تذهب الطاقة؟ ⚡',
      points: 20,
      prompt: 'اربط كل كائن بمرحلة انتقال الطاقة الصحيحة. تذكر: الطاقة لا تعود للشمس! 📉⚡',
      pairs: [
        { left: 'الشمس ☀️', right: 'المصدر الأول والوحيد للطاقة' },
        { left: 'نبات (منتج) 🌱', right: 'يصنع الغذاء ويخزن 100% طاقة' },
        { left: 'فأر (مستهلك 1) 🐭', right: 'تصل إليه 10% فقط من الطاقة' },
        { left: 'بوم (مستهلك 2) 🦉', right: 'تصل إليه 1% فقط من الطاقة' },
      ],
      successMessage: 'رائع! أنت "رائد دراسة الطاقة" ⚡. الطاقة تتناقص في كل انتقال.',
      errorMessage: 'انتبه! الطاقة لا تعود للشمس، بل تتبدد وتفقد في كل مرحلة. ❌',
      rewardBadge: { name: 'رائد دراسة الطاقة', icon: '⚡' },
    },
    {
      id: 'ex2_food_chains_new',
      type: 'drag-sequence',
      title: 'التمرين 2: كيف تعود المادة؟ ♻️',
      points: 20,
      prompt: 'رتب مراحل إعادة تدوير المادة في الطبيعة من موت الكائن إلى حياته من جديد 🔄',
      items: [
        { id: 'm1', label: 'حيوان ميت (جثة)', emoji: '🦴' },
        { id: 'm2', label: 'تفكيك البكتيريا للجثة', emoji: '🦠' },
        { id: 'm3', label: 'تحول المادة إلى أملاح معدنية', emoji: '🧂' },
        { id: 'm4', label: 'امتصاص النبات للأملاح والنمو', emoji: '🌱' },
      ],
      correctOrder: ['m1', 'm2', 'm3', 'm4'],
      successMessage: 'أحسنت! أنت "خبير إعادة التدوير الطبيعي" ♻️. البكتيريا هي سر استمرار الحياة.',
      errorMessage: 'تذكر: الدورة تبدأ بموت الكائن ثم تفكيكه لإعادة عناصره للتربة. ❌',
      rewardBadge: { name: 'خبير إعادة التدوير الطبيعي', icon: '♻️' },
    },
    {
      id: 'ex3_food_chains_new',
      type: 'scenario',
      title: 'التمرين 3: اختَر السلسلة الصحيحة! 🧩',
      points: 25,
      prompt: 'حدد السلسلة الغذائية العلمية الكاملة والمرتبة بشكل صحيح 🧬',
      scenario: 'أي من هذه السلاسل تمثل واقع الغابة؟',
      options: [
        'نبات 🌿 ← فأر 🐭 ← بومة 🦉 ← بكتيريا 🦠',
        'شمس ☀️ ← نبات 🌿 ← بومة 🦉 (السلسلة لا تبدأ بالشمس ككائن)',
        'بكتيريا 🦠 ← نبات 🌿 ← فأر 🐭 (المفكك يظهر في النهاية)',
      ],
      correct: 'نبات 🌿 ← فأر 🐭 ← بومة 🦉 ← بكتيريا 🦠',
      successMessage: 'مبدع! أنت "حِرفي السلاسل الغذائية" 🧵. لقد ربطت الحلقات ببراعة.',
      errorMessage: 'تذكر: السلسلة تبدأ بمنتج (نبات) وتمر بمستهلكين وتنتهي بمفكك. ❌',
      rewardBadge: { name: 'حِرفي السلاسل الغذائية', icon: '🧵' },
    },
  ],
  games: [
    // 🎮 GAME 1: "ابنِ سلسلة صحيحة"
    {
      id: 'g1',
      type: 'build-correct-chain',
      title: 'ابنِ سلسلة صحيحة',
      description: 'عناصر كثيرة! ابنِ سلسلة غذائية من 4 مراحل (منتج → مستهلك 1 → مستهلك 2 → مفكك) 🌿🦌🦊🦠',
      points: 40,
      gameData: {
        rounds: 3,
        elements: [
          { id: 'grass', label: 'عشب', icon: '🌿', type: 'producer' },
          { id: 'rabbit', label: 'أرنب', icon: '🐰', type: 'consumer1' },
          { id: 'fox', label: 'ثعلب', icon: '🦊', type: 'consumer2' },
          { id: 'bacteria', label: 'بكتيريا', icon: '🦠', type: 'decomposer' },
          { id: 'algae', label: 'طحالب', icon: '🌊', type: 'producer' },
          { id: 'fish', label: 'سمكة', icon: '🐟', type: 'consumer1' },
          { id: 'shark', label: 'قرش', icon: '🦈', type: 'consumer2' },
          { id: 'worm', label: 'دودة', icon: '🪱', type: 'decomposer' },
          { id: 'tree', label: 'شجرة', icon: '🌳', type: 'producer' },
          { id: 'bird', label: 'طائر', icon: '🐦', type: 'consumer1' },
          { id: 'snake', label: 'أفعى', icon: '🐍', type: 'consumer2' },
        ],
      },
    },

    // 🎮 GAME 2: "أين ضاعت الطاقة؟"
    {
      id: 'g2',
      type: 'where-did-energy-go',
      title: 'أين ضاعت الطاقة؟',
      description: 'كل مرحلة تُظهر كمية الطاقة! شاهد التناقص (100 → 10 → 1) وأجب: لماذا لا تعود الطاقة؟ ⚡📉',
      points: 45,
      gameData: {
        chains: [
          [
            { stage: 'producer', label: 'نبات', icon: '🌿', energy: 100, explanation: 'يستقبل 100% من الطاقة الشمسية' },
            { stage: 'consumer1', label: 'أرنب', icon: '🐰', energy: 10, explanation: 'يحصل على 10% فقط (90% ضائعة)' },
            { stage: 'consumer2', label: 'ثعلب', icon: '🦊', energy: 1, explanation: 'يحصل على 1% فقط (99% ضائعة)' },
          ],
          [
            { stage: 'producer', label: 'طحالب', icon: '🌊', energy: 100, explanation: 'يستقبل 100% من الطاقة الشمسية' },
            { stage: 'consumer1', label: 'سمكة صغيرة', icon: '🐟', energy: 10, explanation: 'يحصل على 10% فقط (90% ضائعة)' },
            { stage: 'consumer2', label: 'قرش', icon: '🦈', energy: 1, explanation: 'يحصل على 1% فقط (99% ضائعة)' },
          ],
        ],
      },
    },

    // 🎮 GAME 3: "من يأكل ماذا؟" - لعبة بسيطة وممتعة للأطفال
    {
      id: 'g3',
      type: 'animal-food-quiz',
      title: 'من يأكل ماذا؟',
      description: 'لعبة بسيطة وممتعة! اختر الطعام الصحيح لكل حيوان 🐰🥕',
      points: 50,
      gameData: {
        questions: [
          { id: 'q1', animal: { label: 'أرنب', icon: '🐰' }, correctFood: { label: 'جزر', icon: '🥕' }, wrongFoods: [{ label: 'سمك', icon: '🐟' }, { label: 'عسل', icon: '🍯' }] },
          { id: 'q2', animal: { label: 'قطة', icon: '🐱' }, correctFood: { label: 'سمك', icon: '🐟' }, wrongFoods: [{ label: 'جزر', icon: '🥕' }, { label: 'عشب', icon: '🌿' }] },
          { id: 'q3', animal: { label: 'بقرة', icon: '🐄' }, correctFood: { label: 'عشب', icon: '🌿' }, wrongFoods: [{ label: 'لحم', icon: '🥩' }, { label: 'عسل', icon: '🍯' }] },
          { id: 'q4', animal: { label: 'دب', icon: '🐻' }, correctFood: { label: 'عسل', icon: '🍯' }, wrongFoods: [{ label: 'جزر', icon: '🥕' }, { label: 'سمك', icon: '🐟' }] },
          { id: 'q5', animal: { label: 'طائر', icon: '🐦' }, correctFood: { label: 'حبوب', icon: '🌾' }, wrongFoods: [{ label: 'لحم', icon: '🥩' }, { label: 'أوراق', icon: '🍃' }] },
          { id: 'q6', animal: { label: 'أسد', icon: '🦁' }, correctFood: { label: 'لحم', icon: '🥩' }, wrongFoods: [{ label: 'عشب', icon: '🌿' }, { label: 'حبوب', icon: '🌾' }] },
          { id: 'q7', animal: { label: 'فيل', icon: '🐘' }, correctFood: { label: 'أوراق', icon: '🍃' }, wrongFoods: [{ label: 'لحم', icon: '🥩' }, { label: 'سمك', icon: '🐟' }] },
        ],
      },
    },
  ],
};
