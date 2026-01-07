import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA: دور الإنسان ==============
export const humanRoleVideo: AnimatedVideoData = {
  title: 'أبطال الأرض - قصة أمل',
  totalDuration: 85,
  scenes: [
    {
      id: 'scene-1-intro',
      title: 'المشهد 1: الإنسان جزء من الطبيعة',
      background: 'park',
      duration: 12,
      narratorText: 'مرحباً يا أبطال الأرض! 🌍 نحن البشر لسنا منفصلين عن الطبيعة... نحن جزء منها! الهواء الذي نتنفسه، الماء الذي نشربه، كلها هدايا من كوكبنا.',
      elements: [
        { id: 'sun', type: 'sun', props: { size: 'medium', glowing: true }, position: { x: '80%', y: '15%' }, delay: 0 },
        { id: 'tree-1', type: 'plant', props: { type: 'tree', size: 'large' }, position: { x: '20%', y: '55%' }, delay: 0.3 },
        { id: 'child', type: 'emoji', props: { emoji: '🧒', size: 55 }, position: { x: '50%', y: '70%' }, delay: 0.6 },
        { id: 'heart', type: 'emoji', props: { emoji: '💚', size: 35 }, position: { x: '55%', y: '60%' }, delay: 1 },
        { id: 'earth', type: 'emoji', props: { emoji: '🌍', size: 50 }, position: { x: '60%', y: '65%' }, delay: 1.3 },
        { id: 'bird', type: 'animal', props: { type: 'bird', size: 'small', moving: true }, position: { x: '35%', y: '40%' }, delay: 1.5 },
        { id: 'flowers', type: 'plant', props: { type: 'flower', size: 'medium' }, position: { x: '70%', y: '80%' }, delay: 1.8 },
        { id: 'label', type: 'text', props: { text: 'نحن جزء من الطبيعة! 🌍💚' }, position: { x: '50%', y: '92%' }, delay: 2.2 },
      ],
      soundEffects: ['طبيعة هادئة 🎶', 'طيور 🐦', 'أطفال يضحكون 😄'],
      educationalHighlight: 'الإنسان جزء من النظام البيئي وليس منفصلاً عنه',
      transition: 'fade',
    },
    {
      id: 'scene-2-planting',
      title: 'المشهد 2: التشجير - زراعة الأمل',
      background: 'farm',
      duration: 14,
      narratorText: 'انظروا! الأطفال يزرعون الأشجار 🌳 كل شجرة تُنقّي الهواء وتُبرّد الأرض وتُوفّر بيتاً للعصافير. شجرة واحدة = هواء نقي لعائلة كاملة!',
      elements: [
        { id: 'kid-planting', type: 'emoji', props: { emoji: '👧', size: 50 }, position: { x: '30%', y: '70%' }, delay: 0 },
        { id: 'shovel', type: 'emoji', props: { emoji: '🪴', size: 40 }, position: { x: '35%', y: '80%' }, delay: 0.3 },
        { id: 'seedling-1', type: 'plant', props: { type: 'flower', size: 'small' }, position: { x: '45%', y: '78%' }, delay: 0.6 },
        { id: 'seedling-2', type: 'emoji', props: { emoji: '🌱', size: 35 }, position: { x: '55%', y: '75%' }, delay: 1 },
        { id: 'grown-tree', type: 'plant', props: { type: 'tree', size: 'large' }, position: { x: '75%', y: '55%' }, delay: 1.5 },
        { id: 'bird-home', type: 'animal', props: { type: 'bird', size: 'small' }, position: { x: '78%', y: '45%' }, delay: 2 },
        { id: 'oxygen', type: 'emoji', props: { emoji: '💨', size: 30 }, position: { x: '80%', y: '40%' }, delay: 2.3 },
        { id: 'arrow-grow', type: 'arrow', props: { direction: 'right', color: '#22c55e', label: 'نمو' }, position: { x: '58%', y: '65%' }, delay: 2.5 },
        { id: 'label', type: 'text', props: { text: 'ازرع شجرة = أنقذ حياة! 🌳💚' }, position: { x: '50%', y: '92%' }, delay: 3 },
      ],
      soundEffects: ['حفر 🪴', 'طيور سعيدة 🐦', 'نسيم 🍃'],
      educationalHighlight: 'التشجير: كل شجرة تُنتج أكسجين وتُبرّد الجو وتحمي التربة',
      transition: 'slide',
    },
    {
      id: 'scene-3-recycling',
      title: 'المشهد 3: التدوير - لا نفايات!',
      background: 'city',
      duration: 14,
      narratorText: 'هل تعلم؟ ♻️ زجاجة بلاستيك واحدة تبقى في الأرض 500 سنة! لكن إذا أعدنا تدويرها، تصبح لعبة أو كرسي جديد. التدوير = ذكاء!',
      elements: [
        { id: 'trash-bin', type: 'emoji', props: { emoji: '🗑️', size: 50 }, position: { x: '25%', y: '70%' }, delay: 0 },
        { id: 'bottle', type: 'emoji', props: { emoji: '🧴', size: 35 }, position: { x: '30%', y: '60%' }, delay: 0.3 },
        { id: 'paper', type: 'emoji', props: { emoji: '📄', size: 30 }, position: { x: '35%', y: '55%' }, delay: 0.5 },
        { id: 'recycle-symbol', type: 'emoji', props: { emoji: '♻️', size: 60 }, position: { x: '50%', y: '50%' }, delay: 1 },
        { id: 'arrow-cycle', type: 'arrow', props: { direction: 'right', color: '#22c55e' }, position: { x: '55%', y: '55%' }, delay: 1.3 },
        { id: 'new-toy', type: 'emoji', props: { emoji: '🪀', size: 40 }, position: { x: '70%', y: '60%' }, delay: 1.8 },
        { id: 'new-chair', type: 'emoji', props: { emoji: '🪑', size: 45 }, position: { x: '80%', y: '70%' }, delay: 2.1 },
        { id: 'happy-earth', type: 'emoji', props: { emoji: '🌍', size: 50 }, position: { x: '75%', y: '40%' }, delay: 2.5 },
        { id: 'label', type: 'text', props: { text: 'التدوير = حياة جديدة! ♻️✨' }, position: { x: '50%', y: '92%' }, delay: 3 },
      ],
      soundEffects: ['فرز نفايات ♻️', 'مصنع تدوير 🏭', 'نجاح ✨'],
      educationalHighlight: 'التدوير: تحويل النفايات لمنتجات جديدة يحمي الأرض',
      transition: 'slide',
    },
    {
      id: 'scene-4-saving',
      title: 'المشهد 4: توفير الماء والكهرباء',
      background: 'city',
      duration: 14,
      narratorText: 'كل قطرة ماء ثمينة! 💧 أغلق الصنبور أثناء غسل أسنانك. أطفئ الضوء عند الخروج. هذه الأفعال الصغيرة تصنع فرقاً كبيراً!',
      elements: [
        { id: 'tap', type: 'emoji', props: { emoji: '🚰', size: 50 }, position: { x: '25%', y: '60%' }, delay: 0 },
        { id: 'water-drop', type: 'water', props: { type: 'droplet', size: 'medium' }, position: { x: '30%', y: '75%' }, delay: 0.3 },
        { id: 'hand-stop', type: 'emoji', props: { emoji: '✋', size: 40 }, position: { x: '35%', y: '55%' }, delay: 0.6 },
        { id: 'check-water', type: 'emoji', props: { emoji: '✅', size: 30 }, position: { x: '40%', y: '50%' }, delay: 1 },
        { id: 'light-bulb', type: 'emoji', props: { emoji: '💡', size: 50 }, position: { x: '65%', y: '45%' }, delay: 1.5 },
        { id: 'switch', type: 'emoji', props: { emoji: '🔌', size: 35 }, position: { x: '70%', y: '60%' }, delay: 1.8 },
        { id: 'check-light', type: 'emoji', props: { emoji: '✅', size: 30 }, position: { x: '75%', y: '50%' }, delay: 2.2 },
        { id: 'coin', type: 'emoji', props: { emoji: '💰', size: 40 }, position: { x: '50%', y: '35%' }, delay: 2.6 },
        { id: 'earth-happy', type: 'emoji', props: { emoji: '😊', size: 35 }, position: { x: '55%', y: '30%' }, delay: 3 },
        { id: 'label', type: 'text', props: { text: 'وفّر = احمِ الكوكب! 💧💡' }, position: { x: '50%', y: '92%' }, delay: 3.3 },
      ],
      soundEffects: ['ماء يُغلق 🚰', 'ضوء يُطفأ 💡', 'توفير 💰'],
      educationalHighlight: 'التوفير: كل قطرة وكل واط كهرباء مهم للبيئة',
      transition: 'slide',
    },
    {
      id: 'scene-5-hero',
      title: 'المشهد 5: أنت بطل الأرض!',
      background: 'park',
      duration: 16,
      narratorText: 'أنت الآن بطل بيئي حقيقي! 🦸 ازرع، دوّر، وفّر، وعلّم الآخرين. معاً نستطيع إنقاذ كوكبنا الجميل. الأرض تشكرك! 🌍💚',
      elements: [
        { id: 'hero-kid', type: 'emoji', props: { emoji: '🦸', size: 70 }, position: { x: '50%', y: '55%' }, delay: 0 },
        { id: 'cape', type: 'emoji', props: { emoji: '🌟', size: 40 }, position: { x: '55%', y: '45%' }, delay: 0.5 },
        { id: 'tree-left', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '15%', y: '60%' }, delay: 0.8 },
        { id: 'tree-right', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '85%', y: '60%' }, delay: 1 },
        { id: 'recycle', type: 'emoji', props: { emoji: '♻️', size: 35 }, position: { x: '25%', y: '75%' }, delay: 1.3 },
        { id: 'water', type: 'emoji', props: { emoji: '💧', size: 35 }, position: { x: '75%', y: '75%' }, delay: 1.5 },
        { id: 'animals', type: 'emoji', props: { emoji: '🦋', size: 30 }, position: { x: '35%', y: '40%' }, delay: 1.8 },
        { id: 'bird-fly', type: 'animal', props: { type: 'bird', size: 'small', moving: true }, position: { x: '65%', y: '35%' }, delay: 2 },
        { id: 'earth-love', type: 'emoji', props: { emoji: '🌍', size: 55 }, position: { x: '50%', y: '25%' }, delay: 2.5 },
        { id: 'hearts', type: 'emoji', props: { emoji: '💚💚💚', size: 30 }, position: { x: '50%', y: '18%' }, delay: 3 },
        { id: 'label', type: 'text', props: { text: 'أنت بطل الأرض! 🦸🌍' }, position: { x: '50%', y: '92%' }, delay: 3.5 },
      ],
      soundEffects: ['موسيقى نصر 🎺', 'تصفيق 👏', 'طبيعة سعيدة 🎶'],
      educationalHighlight: 'كل فعل إيجابي صغير يصنع فرقاً كبيراً للكوكب',
      transition: 'zoom',
    },
  ],
  finalMessage: 'مبروك! أنت الآن سفير البيئة. علّم عائلتك وأصدقاءك ما تعلمته! 🌍💚🦸',
};

// ============== COURSE DATA ==============
export const humanRoleGrade5: Course = {
  id: 'human-role-5',
  title: 'دور الإنسان في حماية البيئة',
  grade: 5,
  icon: '🤝',
  color: 'bg-blue-100',
  badge: { name: 'صديق البيئة', icon: '🤝' },
  rewardMessages: {
    student: 'كل فعل صغير منك يصنع فرقاً كبيراً!',
    parent: 'طفلك تعلم كيف يكون مواطناً بيئياً مسؤولاً',
    universalGoldBadge: { name: 'سفير الطبيعة', icon: '🌍' },
  },
  videoConcept: {
    title: 'أبطال الأرض - قصة أمل',
    scenario: 'قصص لأطفال قاموا بتغيير العالم بأيديهم.',
    moralMessage: 'نحن حراس هذا الكوكب.',
  },
  animatedVideo: humanRoleVideo,
  videoUrl: '/videos/5eme-5.mp4',
  videoStoryboard: {
    title: 'أبطال الأرض - قصة أمل',
    scenes: 'الإنسان والطبيعة ← التشجير ← التدوير ← التوفير ← بطل الأرض',
    narratorText: 'مرحباً يا أبطال الأرض! نحن البشر لسنا منفصلين عن الطبيعة...',
    soundEffects: ['طبيعة 🎶', 'زراعة 🌱', 'نصر 🎺']
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1_human',
      type: 'matching',
      title: 'اربط الفعل الإيجابي بنتيجته',
      points: 20,
      prompt: 'اسحب كل فعل بيئي نحو فائدته 🌱♻️',
      pairs: [
        { left: 'زراعة الأشجار 🌳', right: 'هواء نقي وظل وموطن للطيور' },
        { left: 'تدوير النفايات ♻️', right: 'تقليل التلوث وتوفير الموارد' },
        { left: 'توفير الماء 💧', right: 'الحفاظ على مصادر المياه للأجيال' },
        { left: 'استخدام الدراجة 🚲', right: 'تقليل تلوث الهواء' },
      ],
      successMessage: 'رائع! كل فعل صغير يصنع فرقاً كبيراً 💚',
      errorMessage: 'فكر في كيف يساعد كل فعل البيئة',
      rewardBadge: { name: 'صانع الفرق', icon: '💚' },
    },
    {
      id: 'ex2_human',
      type: 'mcq-set',
      title: 'أسئلة عن دورك في حماية البيئة',
      points: 25,
      prompt: 'اختر الإجابة الصحيحة',
      questions: [
        {
          id: 'q1',
          question: 'ما أفضل طريقة للتخلص من زجاجة بلاستيكية؟',
          options: ['رميها في الشارع', 'وضعها في سلة التدوير ♻️', 'حرقها'],
          correct: 'وضعها في سلة التدوير ♻️',
        },
        {
          id: 'q2',
          question: 'كم شجرة يجب أن يزرعها كل شخص سنوياً على الأقل؟',
          options: ['لا حاجة للزراعة', 'شجرة واحدة أو أكثر 🌳', 'مئة شجرة'],
          correct: 'شجرة واحدة أو أكثر 🌳',
        },
        {
          id: 'q3',
          question: 'عند غسل أسنانك، يجب:',
          options: ['ترك الصنبور مفتوحاً', 'إغلاق الصنبور أثناء التنظيف 💧', 'استخدام الكثير من الماء'],
          correct: 'إغلاق الصنبور أثناء التنظيف 💧',
        },
      ],
      successMessage: 'ممتاز! أنت مواطن بيئي مسؤول 🌍',
      errorMessage: 'تذكر: كل فعل صغير يحمي كوكبنا',
      rewardBadge: { name: 'حامي الكوكب', icon: '🌍' },
    },
    {
      id: 'ex3_human',
      type: 'scenario',
      title: 'موقف: الرحلة المدرسية',
      points: 30,
      prompt: 'اختر التصرف الأفضل',
      scenario: 'في رحلة للغابة، رأيت زملاءك يرمون أكياس الشيبس والزجاجات على الأرض. ماذا تفعل؟',
      options: [
        'أفعل مثلهم لأنني لا أريد أن أكون مختلفاً',
        'أجمع النفايات وأشرح لهم أهمية النظافة للطبيعة',
        'أشتكي للمعلم فقط وأذهب',
      ],
      correct: 'أجمع النفايات وأشرح لهم أهمية النظافة للطبيعة',
      successMessage: 'أنت قائد حقيقي! التغيير يبدأ منك 🦸💚',
      errorMessage: 'كن القدوة! علّم الآخرين بالفعل والكلمة',
      rewardBadge: { name: 'قائد البيئة', icon: '🦸' },
    },
  ],
  games: [
    // 🎮 GAME 1: "بطل البيئة اليومي"
    {
      id: 'g1',
      type: 'daily-eco-hero',
      title: 'بطل البيئة اليومي',
      description: 'مواقف حياتية يومية! اختر السلوك الصحيح في كل موقف لتحسين البيئة 🌟🌍',
      points: 45,
      gameData: {
        situations: [
          {
            id: 's1',
            title: 'في الحديقة',
            description: 'رأيت زجاجة بلاستيكية على الأرض',
            icon: '🌳',
            options: [
              {
                id: 'pick-up',
                label: 'أرفعها وأضعها في سلة المهملات',
                icon: '♻️',
                correct: true,
                impact: '✅ البيئة أصبحت أنظف! +5 نقاط صحة',
              },
              {
                id: 'ignore',
                label: 'أتركها كما هي',
                icon: '😐',
                correct: false,
                impact: '❌ التلوث يزداد! -3 نقاط صحة',
              },
              {
                id: 'throw-away',
                label: 'أرميها في النهر',
                icon: '🗑️',
                correct: false,
                impact: '❌ تلوث المياه! -5 نقاط صحة',
              },
            ],
          },
          {
            id: 's2',
            title: 'في المنزل',
            description: 'النباتات تحتاج للماء',
            icon: '🏠',
            options: [
              {
                id: 'water-plants',
                label: 'أسقي النباتات بالماء',
                icon: '💧',
                correct: true,
                impact: '✅ النباتات تنمو! +5 نقاط صحة',
              },
              {
                id: 'ignore',
                label: 'أتركها تذبل',
                icon: '🥀',
                correct: false,
                impact: '❌ النباتات تموت! -3 نقاط صحة',
              },
              {
                id: 'waste-water',
                label: 'أستخدم ماء كثير جداً',
                icon: '💦',
                correct: false,
                impact: '❌ إهدار الماء! -2 نقاط صحة',
              },
            ],
          },
          {
            id: 's3',
            title: 'بجانب النهر',
            description: 'النهر يحتوي على نفايات',
            icon: '🌊',
            options: [
              {
                id: 'clean-river',
                label: 'أشارك في تنظيف النهر',
                icon: '🧹',
                correct: true,
                impact: '✅ النهر نظيف! +7 نقاط صحة',
              },
              {
                id: 'ignore',
                label: 'أتركه كما هو',
                icon: '😐',
                correct: false,
                impact: '❌ التلوث يزداد! -4 نقاط صحة',
              },
              {
                id: 'add-waste',
                label: 'أرمي المزيد من النفايات',
                icon: '🗑️',
                correct: false,
                impact: '❌ تلوث شديد! -6 نقاط صحة',
              },
            ],
          },
          {
            id: 's4',
            title: 'في المدرسة',
            description: 'ورقة على الأرض',
            icon: '🏫',
            options: [
              {
                id: 'recycle',
                label: 'أضعها في سلة إعادة التدوير',
                icon: '♻️',
                correct: true,
                impact: '✅ إعادة التدوير! +4 نقاط صحة',
              },
              {
                id: 'throw',
                label: 'أرميها في سلة عادية',
                icon: '🗑️',
                correct: false,
                impact: '❌ فرصة ضائعة! -1 نقطة صحة',
              },
              {
                id: 'burn',
                label: 'أحرقها',
                icon: '🔥',
                correct: false,
                impact: '❌ تلوث الهواء! -5 نقاط صحة',
              },
            ],
          },
          {
            id: 's5',
            title: 'في الحديقة العامة',
            description: 'حيوان صغير يحتاج مساعدة',
            icon: '🦋',
            options: [
              {
                id: 'help',
                label: 'أساعده بحذر',
                icon: '🛡️',
                correct: true,
                impact: '✅ حماية الحيوان! +6 نقاط صحة',
              },
              {
                id: 'ignore',
                label: 'أتركه',
                icon: '😐',
                correct: false,
                impact: '❌ الحيوان في خطر! -3 نقاط صحة',
              },
              {
                id: 'harm',
                label: 'أؤذيه',
                icon: '💔',
                correct: false,
                impact: '❌ إيذاء الحيوان! -7 نقاط صحة',
              },
            ],
          },
        ],
      },
    },

    // 🎮 GAME 2: "ابنِ وسطًا مستدامًا"
    {
      id: 'g2',
      type: 'build-sustainable-ecosystem',
      title: 'ابنِ وسطًا مستدامًا',
      description: 'بناء نظام بيئي مستدام! اختر المكونات الصحيحة (طاقة نظيفة، تشجير، حماية ماء) 🌱⚡',
      points: 50,
      gameData: {
        rounds: 3,
        components: [
          // Sustainable
          { id: 'solar', label: 'طاقة شمسية', icon: '☀️', type: 'energy', sustainable: true, description: 'طاقة نظيفة ومتجددة' },
          { id: 'wind', label: 'طاقة الرياح', icon: '💨', type: 'energy', sustainable: true, description: 'طاقة نظيفة ومتجددة' },
          { id: 'trees', label: 'تشجير', icon: '🌳', type: 'green', sustainable: true, description: 'امتصاص ثاني أكسيد الكربون' },
          { id: 'recycle', label: 'إعادة التدوير', icon: '♻️', type: 'waste', sustainable: true, description: 'تقليل النفايات' },
          { id: 'water-save', label: 'ترشيد الماء', icon: '💧', type: 'water', sustainable: true, description: 'استخدام الماء بحكمة' },
          { id: 'protect', label: 'حماية الحيوانات', icon: '🛡️', type: 'green', sustainable: true, description: 'الحفاظ على التنوع' },
          
          // Non-sustainable
          { id: 'coal', label: 'فحم', icon: '⚫', type: 'energy', sustainable: false, description: 'يسبب تلوث الهواء' },
          { id: 'waste', label: 'نفايات', icon: '🗑️', type: 'waste', sustainable: false, description: 'يسبب تلوث البيئة' },
          { id: 'waste-water', label: 'إهدار الماء', icon: '💦', type: 'water', sustainable: false, description: 'استهلاك مفرط' },
          { id: 'cut-trees', label: 'قطع أشجار', icon: '🪓', type: 'green', sustainable: false, description: 'يدمر البيئة' },
        ],
      },
    },

    // 🎮 GAME 3: "مهمة الإنقاذ الجماعي"
    {
      id: 'g3',
      type: 'collective-rescue-mission',
      title: 'مهمة الإنقاذ الجماعي',
      description: 'قادة فريق! وزع أعضاء الفريق على المهام (تنظيف، توعية، تشجير، حماية) مع التوازن 🤝👥',
      points: 50,
      gameData: {
        rounds: 3,
      },
    },
  ],
};
