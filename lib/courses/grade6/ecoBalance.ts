import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA: التوازن البيئي ==============
export const ecoBalanceVideo: AnimatedVideoData = {
  title: 'التوازن البيئي: معادلة الحياة!',
  totalDuration: 90,
  scenes: [
    {
      id: 'scene-1-integration',
      title: 'المشهد 1: النظام المتكامل',
      background: 'forest',
      duration: 20,
      narratorText: 'مرحبًا أيها الحارس المتوازن! 🌿 هذا النظام ليس عشوائيًّا… بل معادلة دقيقة! توازن مذهل بين كائنات حية وعناصر غير حية.',
      elements: [
        { id: 'sun', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '85%', y: '15%' }, delay: 0 },
        { id: 'tree', type: 'plant', props: { type: 'tree', size: 'large' }, position: { x: '20%', y: '60%' }, delay: 0 },
        { id: 'river', type: 'water', props: { type: 'river', size: 'medium' }, position: { x: '60%', y: '80%' }, delay: 0.5 },
        { id: 'scales', type: 'emoji', props: { emoji: '⚖️', size: 60 }, position: { x: '50%', y: '30%' }, delay: 2 },
      ],
      soundEffects: ['حفيف الأشجار 🍃', 'خرير الماء 💧'],
      educationalHighlight: 'التوازن البيئي هو حالة استقرار بين المكوّنات الحية واللاحيوية',
      transition: 'fade',
    },
    {
      id: 'scene-2-biotic-abiotic',
      title: 'المشهد 2: الحيوي واللاحيوي',
      background: 'forest',
      duration: 25,
      narratorText: 'لدينا توازن حيوي 🐾 (نباتات وحيوانات)، وتوازن لاحيوي 🪨 (هواء، ماء، تربة). كلاهما يحتاج للآخر ليستمر التوازن.',
      elements: [
        { id: 'deer', type: 'emoji', props: { emoji: '🦌', size: 40 }, position: { x: '30%', y: '70%' }, delay: 0.5 },
        { id: 'rock', type: 'emoji', props: { emoji: '🪨', size: 40 }, position: { x: '50%', y: '80%' }, delay: 1.5 },
        { id: 'soil-label', type: 'text', props: { text: 'لاحيوي: ماء، هواء، تربة 🪨' }, position: { x: '50%', y: '92%' }, delay: 2.5 },
      ],
      soundEffects: ['صوت غابة 🌳', 'موسيقى تعليمية 🎵'],
      educationalHighlight: 'العناصر غير الحية (الماء، الهواء، التربة) هي أساس حياة الكائنات الحية',
      transition: 'slide',
    },
    {
      id: 'scene-3-collapse',
      title: 'المشهد 3: أسباب الاختلال',
      background: 'desert',
      duration: 25,
      narratorText: 'التلوث، الصيد الجائر، وقطع الغابات… أفعال تكسر الميزان! 🛑 انجراف التربة وموت الأسماك هي إنذارات حقيقية بانهيار النظام.',
      elements: [
        { id: 'smoke-factory', type: 'pollution', props: { type: 'smoke', size: 'large' }, position: { x: '70%', y: '40%' }, delay: 1 },
        { id: 'fallen-tree', type: 'emoji', props: { emoji: '🪵🪓', size: 45 }, position: { x: '30%', y: '75%' }, delay: 2 },
        { id: 'warning', type: 'emoji', props: { emoji: '⚠️🛑', size: 50 }, position: { x: '50%', y: '50%' }, delay: 3.5 },
      ],
      soundEffects: ['صوت محرك 🚜', 'تحذير ⚠️', 'رياح رملية 💨'],
      educationalHighlight: 'التدخل البشري غير المدروس هو السبب الرئيسي لاختلال التوازن البيئي',
      transition: 'zoom',
    },
  ],
  finalMessage: 'التوازن البيئي ليس صدفة… بل نتيجة احترام كل عنصر! 🌍⚖️',
};

// ============== COURSE DATA: التوازن البيئي ==============
export const ecoBalanceCourse: Course = {
  id: 'eco-balance-6',
  title: 'التوازن البيئي',
  grade: 6,
  icon: '⚖️',
  color: 'bg-lime-50',
  badge: { name: 'حامي التوازن المتكامل', icon: '🌍⚖️' },
  rewardMessages: {
    student: 'التوازن البيئي ليس صدفة… بل نتيجة احترام كل عنصر! 🌍',
    parent: 'طفلكم تعلم كيف يميز بين أنواع الاختلال البيئي وكيفية اتخاذ القرارات الصحيحة لاستعادة التوازن. 🌿',
    universalGoldBadge: { name: 'حامي التوازن المتكامل', icon: '🌍' },
  },
  videoConcept: {
    title: 'التوازن… سر بقاء الحياة',
    scenario: 'مشهد لغابة متوازنة تنهار تدريجياً بسبب أفعال الإنسان، ثم يبدأ الحارس الصغير في إصلاحها.',
    moralMessage: 'سلامة النظام البيئي تعني سلامتنا جميعاً.',
  },
  videoUrl: '/videos/6eme-3.mp4',
  animatedVideo: ecoBalanceVideo,
  videoStoryboard: {
    title: 'التوازن البيئي: معادلة الحياة!',
    scenes: 'نظام متكامل ← حيوي ولا حيوي ← اختلال وانهيار ← إعادة التوازن',
    narratorText: 'مرحبًا أيها الحارس! توازن هذا الكوكب بين يديك...',
    soundEffects: ['طبيعة 🌿', 'انهيار ⚠️', 'تعافي ✨'],
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1_eco_balance',
      type: 'choice',
      title: 'التمرين الأول: حيّ أم لا حيّ؟',
      points: 20,
      prompt: 'اختر: هل هذا العنصر حيّ أم لا حيّ؟ 🌿💧',
      options: [
        'حيّ',
        'لا حيّ',
      ],
      correct: 'حيّ',
      successMessage: 'إجابة صحيحة 🎉',
      errorMessage: 'حاول مرة أخرى ❌',
      rewardBadge: { name: 'خبير التصنيف', icon: '🔬' },
    },
    {
      id: 'ex1_eco_balance_2',
      type: 'matching',
      title: 'التمرين 2: ما نوع الاختلال؟',
      points: 20,
      prompt: 'صنّف كل مشكلة بيئية إلى نوع الاختلال الصحيح (حيوي أو لاحيوي) ⚖️🔍',
      pairs: [
        { left: 'الصيد الجائر ← انقراض الغزال 🦌', right: 'اختلال حيوي' },
        { left: 'تلوث النهر ← موت أسماك 🐟🛢️', right: 'اختلال لاحيوي' },
        { left: 'قطع أشجار ← انجراف التربة 🏜️', right: 'اختلال لاحيوي' },
        { left: 'تلوث الهواء ← صعوبة تنفس 😷', right: 'اختلال لاحيوي' },
      ],
      successMessage: 'تحليل دقيق! استقر النظام الآن بفضل وعيك بنوع الاختلال. 🏅✨',
      errorMessage: 'تذكر: الاختلال الحيوي يتعلق بالكائنات، واللاحيوي يتعلق بالماء والهواء والتربة. ❌',
      rewardBadge: { name: 'خبير أنواع التوازن', icon: '⚖️' },
    },
    {
      id: 'ex2_eco_balance',
      type: 'mcq-set',
      title: 'التمرين 2: أعِد التوازن!',
      points: 20,
      prompt: 'اطلب الحلول الواقعية لإعادة التوازن لهذا النظام المتعب 🛠️🌍',
      questions: [
        {
          id: 'q1',
          question: 'مشكلة: تربة منجرفة وجرداء 🏜️',
          options: ['إعادة التشجير وتثبيت التربة', 'استخدام مبيدات كيميائية', 'ترك الأرض كما هي'],
          correct: 'إعادة التشجير وتثبيت التربة',
        },
        {
          id: 'q2',
          question: 'مشكلة: نهر ملوث بالنفايات 🌊🗑️',
          options: ['تنظيف النهر ومنع إلقاء الفضلات', 'تغطية النهر بالبلاستيك', 'وضع الأسماك في حوض خارجي'],
          correct: 'تنظيف النهر ومنع إلقاء الفضلات',
        },
      ],
      successMessage: 'مصلح رائع! لقد بدأ النظام البيئي في التعافي بفضل حلولك المتكاملة. 🛠️✨',
      errorMessage: 'الحلول السطحية لا تكفي؛ نحتاج دائماً لمعالجة أصل المشكلة (تطهير، تشجير). ❌',
      rewardBadge: { name: 'مصلح التوازن', icon: '🛠️' },
    },
    {
      id: 'ex3_eco_balance',
      type: 'scenario',
      title: 'التمرين 3: اختَر القرار الصحيح!',
      points: 25,
      prompt: 'أنت الآن قائد بيئي. اختر القرار الذي سيجعل نظامك يزدهر! 🧭',
      scenario: 'أمامك غابة جميلة، وتريد بناء مخيم صيفي:',
      options: [
        'أبني المخيم في مساحة فارغة دون قطع أي شجرة',
        'أقطع الأشجار القريبة لتوسيع مساحة اللعب',
        'أترك مخلفات التخييم هناك لعدم وجود صناديق',
      ],
      correct: 'أبني المخيم في مساحة فارغة دون قطع أي شجرة',
      successMessage: 'أحسنت القائد! قرارك المسؤول ضمن بقاء الغابة رئة للأرض. 🧭✨',
      errorMessage: 'أي قرار يضر بالعناصر الحية سيؤدي لانهيار التوازن تدريجياً. ركّز أكثر! ❌',
      rewardBadge: { name: 'قائد القرارات البيئية', icon: '🧭' },
    },
  ],
  games: [
    // 🎮 GAME 1: "المعادلة البيئية"
    {
      id: 'g1',
      type: 'eco-equation',
      title: 'المعادلة البيئية',
      description: 'معادلة: نباتات + حيوانات + ماء + تربة = ؟ غيّر القيم وشاهد النتيجة تتغير بصريًا! ⚖️📊',
      points: 40,
      gameData: {
        rounds: 3,
      },
    },

    // 🎮 GAME 2: "تأثير الدومينو"
    {
      id: 'g2',
      type: 'domino-effect',
      title: 'تأثير الدومينو',
      description: 'حذف عنصر واحد يسبب سلسلة تأثيرات تلقائية! أوقف الانهيار باختيار حل مناسب 🎯💥',
      points: 45,
      gameData: {
        cascades: [
          {
            id: 'c1',
            removedElement: 'plant',
            effects: [
              '🌿 النباتات تختفي',
              '🦌 الحيوانات لا تجد غذاء',
              '🦌 الحيوانات تموت جوعاً',
              '🦊 المفترسات لا تجد غذاء',
              '💔 النظام البيئي ينهار',
            ],
            solutions: [
              { id: 'replant', label: 'إعادة التشجير', icon: '🌱', correct: true },
              { id: 'feed', label: 'إطعام الحيوانات', icon: '🍖', correct: false },
              { id: 'ignore', label: 'عدم التدخل', icon: '😐', correct: false },
            ],
          },
          {
            id: 'c2',
            removedElement: 'water',
            effects: [
              '💧 الماء يختفي',
              '🌿 النباتات تذبل',
              '🦌 الحيوانات لا تجد ماء',
              '💔 النظام البيئي ينهار',
            ],
            solutions: [
              { id: 'irrigate', label: 'ري النباتات', icon: '💧', correct: true },
              { id: 'cut-trees', label: 'قطع الأشجار', icon: '🪓', correct: false },
              { id: 'wait', label: 'انتظار المطر', icon: '⏳', correct: false },
            ],
          },
          {
            id: 'c3',
            removedElement: 'decomposer',
            effects: [
              '🦠 المفككات تختفي',
              '💀 الجثث تتراكم',
              '🌍 التربة لا تحصل على معادن',
              '🌿 النباتات لا تنمو',
              '💔 النظام البيئي ينهار',
            ],
            solutions: [
              { id: 'add-bacteria', label: 'إضافة بكتيريا', icon: '🦠', correct: true },
              { id: 'burn', label: 'حرق الجثث', icon: '🔥', correct: false },
              { id: 'ignore', label: 'عدم التدخل', icon: '😐', correct: false },
            ],
          },
        ],
      },
    },

    // 🎮 GAME 3: "استقرار أم فوضى؟"
    {
      id: 'g3',
      type: 'stability-or-chaos',
      title: 'استقرار أم فوضى؟',
      description: 'نظام يتحرك بين مستقر 🟢 وغير مستقر 🔴. قرر إجراءات لإعادته للاستقرار! ⚖️🌍',
      points: 50,
      gameData: {
        rounds: 3,
        actions: [
          {
            id: 'protect',
            label: 'حماية النظام',
            icon: '🛡️',
            impact: { plants: +10, animals: +10, water: +5, balance: +15 },
            correct: true,
          },
          {
            id: 'pollute',
            label: 'تلويث',
            icon: '💨',
            impact: { plants: -20, animals: -20, water: -30, balance: -25 },
            correct: false,
          },
          {
            id: 'restore',
            label: 'استعادة التوازن',
            icon: '🌱',
            impact: { plants: +15, animals: +10, water: +10, balance: +20 },
            correct: true,
          },
          {
            id: 'destroy',
            label: 'تدمير',
            icon: '💥',
            impact: { plants: -30, animals: -30, water: -20, balance: -30 },
            correct: false,
          },
        ],
      },
    },
  ],
};
