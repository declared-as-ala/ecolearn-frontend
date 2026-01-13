import type { Course } from '@/lib/coursesData';
import type { AnimatedVideoData } from '@/components/animated-video/AnimatedCourseVideo';

// ============== ANIMATED VIDEO DATA: سلامة الجهاز التنفسي ==============
export const respiratorySafetyVideo: AnimatedVideoData = {
  title: 'أنفي… درعك الأول ضد التلوث!',
  totalDuration: 90,
  scenes: [
    {
      id: 'scene-1-city-pollution',
      title: 'المشهد 1: المدينة الملوثة',
      background: 'city',
      duration: 15,
      narratorText: 'مرحبًا أيها الحارس الصغير! 🌬️ هل تعلم أن كل نفس تأخذه… قد يكون سماً أو نعمة؟ في المدينة، الهواء مليء بدخان السيارات وعوادم المصانع.',
      elements: [
        { id: 'car', type: 'emoji', props: { emoji: '🚗', size: 50 }, position: { x: '20%', y: '70%' }, delay: 0.5 },
        { id: 'factory', type: 'emoji', props: { emoji: '🏭', size: 60 }, position: { x: '70%', y: '60%' }, delay: 1 },
        { id: 'smoke-1', type: 'pollution', props: { type: 'smoke', size: 'large' }, position: { x: '30%', y: '40%' }, delay: 2 },
        { id: 'smoke-2', type: 'pollution', props: { type: 'smoke', size: 'medium' }, position: { x: '60%', y: '30%' }, delay: 2.5 },
        { id: 'child-cough', type: 'emoji', props: { emoji: '😷', size: 45 }, position: { x: '45%', y: '65%' }, delay: 3 },
        { id: 'label', type: 'text', props: { text: 'هواء ملوث = رئتين متعبتين 🏭😷' }, position: { x: '50%', y: '92%' }, delay: 3.5 },
      ],
      soundEffects: ['دخان سيارات 🚗', 'سعال 😷', 'موسيقى توتر ⚠️'],
      educationalHighlight: 'تلوث الهواء يضر بصحتنا وجهازنا التنفسي',
      transition: 'fade',
    },
    {
      id: 'scene-2-nose-role',
      title: 'المشهد 2: الأنف البطل',
      background: 'school',
      duration: 20,
      narratorText: 'لكن أنفك… هذا البطل الصغير… يحاول حمايتك! يُرشّح الغبار، يحبس الجراثيم، ويُبرد الهواء النظيف إلى رئتيك. لكنه لا يستطيع وحده!',
      elements: [
        { id: 'nose-hero', type: 'emoji', props: { emoji: '👃🛡️', size: 85 }, position: { x: '50%', y: '45%' }, delay: 0 },
        { id: 'dust', type: 'emoji', props: { emoji: '🌫️🌫️🌫️', size: 40 }, position: { x: '25%', y: '40%' }, delay: 1 },
        { id: 'shield-action', type: 'emoji', props: { emoji: '⛔', size: 45 }, position: { x: '35%', y: '45%' }, delay: 1.5 },
        { id: 'clean-air-flow', type: 'water', props: { type: 'droplet', size: 'small' }, position: { x: '65%', y: '50%' }, delay: 3 },
        { id: 'lungs', type: 'emoji', props: { emoji: '🫁✨', size: 50 }, position: { x: '80%', y: '50%' }, delay: 4 },
        { id: 'label', type: 'text', props: { text: 'الأنف: خط الدفاع الأول! 👃🛡️' }, position: { x: '50%', y: '92%' }, delay: 4.5 },
      ],
      soundEffects: ['صوت تنفس 🌬️', 'موسيقى بطولية 🎵', 'نجاح ✨'],
      educationalHighlight: 'الأنف يعمل كمرشح طبيعي للهواء',
      transition: 'slide',
    },
    {
      id: 'scene-3-your-role',
      title: 'المشهد 3: دورك في الحماية',
      background: 'park',
      duration: 25,
      narratorText: 'أنت شريكه في الحماية: 🌳 هل ستزرع شجرة؟ 🚲 هل ستستخدم دراجتك؟ 🪟 هل ستفتح نوافذك بعيدًا عن الطرقات؟ الهواء النظيف… حقّك وكلنا مسؤولون عنه!',
      elements: [
        { id: 'kid-planting', type: 'emoji', props: { emoji: '👦', size: 50 }, position: { x: '25%', y: '70%' }, delay: 0 },
        { id: 'tree-planting', type: 'plant', props: { type: 'tree', size: 'medium' }, position: { x: '20%', y: '60%' }, delay: 1 },
        { id: 'bike', type: 'emoji', props: { emoji: '🚲', size: 55 }, position: { x: '50%', y: '65%' }, delay: 3 },
        { id: 'fresh-air-1', type: 'emoji', props: { emoji: '🍃', size: 30 }, position: { x: '55%', y: '50%' }, delay: 3.5 },
        { id: 'window-open', type: 'emoji', props: { emoji: '🪟', size: 50 }, position: { x: '80%', y: '50%' }, delay: 5 },
        { id: 'fresh-air-2', type: 'emoji', props: { emoji: '🌬️✨', size: 35 }, position: { x: '85%', y: '40%' }, delay: 6 },
        { id: 'label', type: 'text', props: { text: 'كن صديقاً للهواء! 🌳🚲🪟' }, position: { x: '50%', y: '92%' }, delay: 6.5 },
      ],
      soundEffects: ['زراعة شتلة 🌱', 'جرس دراجة 🚲', 'هواء نقي 🍃'],
      educationalHighlight: 'سلوكيات بسيطة تحسن جودة الهواء الذي نتنفسه',
      transition: 'zoom',
    },
    {
      id: 'scene-4-future',
      title: 'المشهد 4: مستقبل نقي',
      background: 'forest',
      duration: 25,
      narratorText: 'كل فعل صغير منك… يصنع فرقاً كبيراً. تذكر أن تحمي رئتيك بالابتعاد عن دخان السجائر والأماكن المغلقة الملوثة. هل أنت مستعد لتكون بطلاً للهواء؟ 💨🛡️',
      elements: [
        { id: 'happy-child', type: 'emoji', props: { emoji: '🦸🧑', size: 70 }, position: { x: '50%', y: '60%' }, delay: 0 },
        { id: 'no-smoking', type: 'emoji', props: { emoji: '🚫🚬', size: 50 }, position: { x: '20%', y: '30%' }, delay: 1 },
        { id: 'clean-sky', type: 'cloud', props: { size: 'large' }, position: { x: '50%', y: '20%' }, delay: 2 },
        { id: 'birds', type: 'animal', props: { type: 'bird', size: 'small', moving: true }, position: { x: '75%', y: '30%' }, delay: 3 },
        { id: 'badge', type: 'emoji', props: { emoji: '🌟🛡️', size: 50 }, position: { x: '50%', y: '40%' }, delay: 4 },
        { id: 'label', type: 'text', props: { text: 'رئتان صحيتان = حياة سعيدة! 🫁✨' }, position: { x: '50%', y: '92%' }, delay: 5 },
      ],
      soundEffects: ['تنفس عميق ومريح 😌', 'طيور تغرد 🐦', 'موسيقى نصر 🎺'],
      educationalHighlight: 'الحفاظ على البيئة والابتعاد عن التدخين يحمي صحتنا',
      transition: 'fade',
    },
  ],
  finalMessage: 'أنت الآن بطل الهواء النقي! حافظ على رئتيك وعلّم الآخرين القواعد الذهبية للتنفس الصحي. 🌬️🛡️🫁',
};

// ============== COURSE DATA: سلامة الجهاز التنفسي ==============
export const respiratorySafetyCourse: Course = {
  id: 'respiratory-safety-6',
  title: 'المحافظة على سلامة الجهاز التنفسي',
  grade: 6,
  icon: '🌬️',
  color: 'bg-blue-100',
  badge: { name: 'بطل الهواء النقي', icon: '🌬️🛡️' },
  rewardMessages: {
    student: 'أنت لم تتنفّس فقط… بل صنعت هواءً نقيًّا لكل من حولك! 🌟',
    parent: 'ابنكم/ابنتكم أصبح يعي تماماً أهمية الهواء النقي وكيفية حماية جهازة التنفسي. 🌿',
    universalGoldBadge: { name: 'بطل الهواء النقي', icon: '🌬️' },
  },
  videoConcept: {
    title: 'أنفي… درعك الأول ضد التلوث!',
    scenario: 'رحلة كرتونية توضح كيف يواجه الأنف ملوثات المدينة وكيف يمكننا مساعدته.',
    moralMessage: 'الهواء النظيف ليس رفاهية… بل حق أساسي ومسؤولية مشتركة!',
  },
  animatedVideo: respiratorySafetyVideo,
  videoStoryboard: {
    title: 'أنفي… درعك الأول ضد التلوث!',
    scenes: 'تلوث المدينة ← الأنف كمرشح ← سلوكيات الحماية ← صحة الرئتين',
    narratorText: 'مرحبًا أيها الحارس الصغير! الهواء مليء بالتحديات، فما هو دورك؟',
    soundEffects: ['سعال 😷', 'تنفس عميق 😌', 'موسيقى كرتونية 🎵'],
  },
  exercises: [],
  exercisesV2: [
    {
      id: 'ex1_respiratory',
      type: 'scenario',
      title: 'التمرين 1: اختر هواءك!',
      points: 20,
      prompt: 'أمامك طفل يريد التنفس بعمق. أي مشهد يوفر له الهواء الأنظف؟ 🌬️',
      scenario: 'لاحظ المشاهد الثلاثة التالية بتركيز:',
      options: [
        'شارع مزدحم بالسيارات والدخان 🚗💨',
        'حديقة خضراء بعيدة عن الضجيج والتلوث 🌳',
        'منطقة صناعية مليئة بالمداخن 🏭🌫️',
      ],
      correct: 'حديقة خضراء بعيدة عن الضجيج والتلوث 🌳',
      successMessage: 'رائع! الهواء في الحديقة غني بالأكسجين وفقير بالملوثات. 🌿✨',
      errorMessage: 'هذا المكان يحتوي على ملوثات ودخان يضر برئتيك. حاول اختيار المكان الأصفى! 😷',
      rewardBadge: { name: 'خبير جودة الهواء', icon: '💨' },
    },
    {
      id: 'ex2_respiratory',
      type: 'scenario',
      title: 'التمرين 2: أنفك يحكي!',
      points: 20,
      prompt: 'أنفك يشعر بالتعب من غبار الغرفة. ما هو الحل الأنسب للهواء؟ 👃',
      scenario: 'تخيل أنك في غرفة مغلقة ووجدت الكثير من الغبار العالق في الهواء.',
      options: [
        'أستخدم معطر جو قوي لإخفاء الرائحة 🌸',
        'أفتح النوافذ لتجديد الهواء والسماح للغبار بالخروج 🪟',
        'أشغل المكيف لساعات طويلة دون تهوية ❄️',
      ],
      correct: 'أفتح النوافذ لتجديد الهواء والسماح للغبار بالخروج 🪟',
      successMessage: 'صحيح! التهوية الطبيعية هي أفضل وسيلة لتنقية هواء الغرف من الغبار والجراثيم. 😄',
      errorMessage: 'المكيف يبرد الهواء لكنه لا يجدده، والمعطرات قد تزيد تهيج الجهاز التنفسي. ❌',
      rewardBadge: { name: 'صديق الأنف الذكي', icon: '👃' },
    },
    {
      id: 'ex3_respiratory',
      type: 'sticker-repair',
      title: 'التمرين 3: صلّح بيتك ليتنفس!',
      points: 25,
      prompt: 'هذا المنزل يعاني من هواء مكتوم وأخطار بيئية. ضع الملصقات الصحيحة لإصلاحه! 🏡🛡️',
      sceneTitle: 'خطة تحسين جودة هواء المنزل',
      slots: [
        { id: 'window_slot', label: 'نافذة تطل على الحديقة' },
        { id: 'corner_slot', label: 'زاوية بجانب التلفاز' },
        { id: 'garage_slot', label: 'المرآب (الكراج)' },
      ],
      stickers: [
        { id: 'st_window', label: 'فتح النافذة للتهوية', emoji: '🪟', slotId: 'window_slot' },
        { id: 'st_plant', label: 'نباتات داخلية منقية', emoji: '🌿', slotId: 'corner_slot' },
        { id: 'st_bike', label: 'دراجة بدلاً من السيارة', emoji: '🚲', slotId: 'garage_slot' },
      ],
      successMessage: 'ممتاز! لقد حولت المنزل إلى مكان صحي يتنفس فيه الجميع بأمان! 🏡✨',
      errorMessage: 'تذكر أن النباتات تنقي الهواء والتهوية تخرج الجراثيم والدراجة تمنع الدخان. ♻️',
      rewardBadge: { name: 'مهندس بيئة منزلية', icon: '🏡' },
    },
  ],
  games: [
    {
      id: 'g1_respiratory',
      type: 'runner',
      title: 'سباق "أنقذ أنفي!"',
      description: 'ساعد الطفل على الجري في المدينة! تجنب سحب الدخان وجمع أوراق الشجر لتحسين جودة الهواء حولك 🏃‍♂️🍃',
      points: 35,
      gameData: {
        stages: [
          {
            id: 'st1', title: 'تحدي المدينة المزدحمة', instruction: 'تجاوز دخان السيارات!', background: 'bg-slate-200',
            playerIcon: '🏃', hazards: ['🚗💨', '🚬', '🏭'], collectables: ['🍃', '🌳', '😷'], direction: 'horizontal'
          }
        ],
        rewardBadgeName: 'منقذ التنفس'
      },
    },
    {
      id: 'g2_respiratory',
      type: 'rescue',
      title: 'مراقب جودة الهواء',
      description: 'أنت المسؤول عن صحة المدينة! ضع أجهزة قياس التلوث في الأماكن التي يقضي فيها الأطفال والضعفاء وقتهم 👁️🏙️',
      points: 40,
      gameData: {
        items: [
          { id: 'school', type: 'location', label: 'ساحة المدرسة', x: 20, y: 30, icon: '🏫', correctAction: 'protect', successIcon: '📡' },
          { id: 'hospital', type: 'location', label: 'مدخل المستشفى', x: 70, y: 25, icon: '🏥', correctAction: 'protect', successIcon: '📡' },
          { id: 'park', type: 'location', label: 'منطقة الألعاب', x: 45, y: 70, icon: '🎠', correctAction: 'protect', successIcon: '📡' }
        ],
        rewardBadgeName: 'خبير مراقبة الهواء'
      },
    },
    {
      id: 'g3_respiratory',
      type: 'construction',
      title: 'بناء مدينة أنظف',
      description: 'صمم حياً نموذجياً! اربط بين وسائل النقل النظيفة والمساحات الخضراء لتقليل نسـبة الملوثات 🚲🌳',
      points: 45,
      gameData: {
        minConnections: 4,
        nodes: [
          { id: 'green_park', label: 'غابة حضرية', type: 'source', icon: '🌳', x: 20, y: 20 },
          { id: 'bike_lane', label: 'مسار دراجات', type: 'producer', icon: '🚲', x: 80, y: 20 },
          { id: 'electric_bus', label: 'حافلة كهربائية', type: 'consumer', icon: '🚌⚡', x: 50, y: 50 },
          { id: 'clean_school', label: 'مدرسة بعيدة عن الدخان', type: 'consumer', icon: '🏫', x: 50, y: 85 },
        ],
        validConnections: [
          { from: 'green_park', to: 'electric_bus' },
          { from: 'bike_lane', to: 'clean_school' },
          { from: 'green_park', to: 'clean_school' },
          { from: 'electric_bus', to: 'clean_school' }
        ],
        rewardBadgeName: 'مهندس مدن المستقبل'
      },
    }
  ],
};
