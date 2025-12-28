export type ExerciseV2Base = {
  id: string;
  title: string;
  points: number;
  rewardBadge?: {
    name: string;
    icon: string;
  };
};

export type ChoiceExerciseV2 = ExerciseV2Base & {
  type: 'choice';
  prompt: string;
  options: string[];
  correct: string;
  successMessage: string;
  errorMessage: string;
};

export type MultiSelectExerciseV2 = ExerciseV2Base & {
  type: 'multi';
  prompt: string;
  options: string[];
  correct: string[];
  successMessage: string;
  errorMessage: string;
};

export type ShortAnswerExerciseV2 = ExerciseV2Base & {
  type: 'short';
  prompt: string;
  placeholder?: string;
  requiredKeywords: string[];
  successMessage: string;
  errorMessage: string;
};

export type StickerRepairExerciseV2 = ExerciseV2Base & {
  type: 'sticker-repair';
  prompt: string;
  sceneTitle: string;
  slots: Array<{ id: string; label: string }>;
  stickers: Array<{ id: string; label: string; emoji: string; slotId: string }>;
  successMessage: string;
  errorMessage: string;
};

export type MatchingExerciseV2 = ExerciseV2Base & {
  type: 'matching';
  prompt: string;
  pairs: Array<{ left: string; right: string }>;
  successMessage: string;
  errorMessage: string;
};

export type DragSequenceExerciseV2 = ExerciseV2Base & {
  type: 'drag-sequence';
  prompt: string;
  items: Array<{ id: string; label: string; emoji?: string }>;
  correctOrder: string[]; // item ids
  successMessage: string;
  errorMessage: string;
};

export type McqSetExerciseV2 = ExerciseV2Base & {
  type: 'mcq-set';
  prompt: string;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correct: string;
  }>;
  successMessage: string;
  errorMessage: string;
};

export type ScenarioExerciseV2 = ExerciseV2Base & {
  type: 'scenario';
  prompt: string;
  scenario: string;
  options: string[];
  correct: string;
  successMessage: string;
  errorMessage: string;
};

export type ExerciseV2 =
  | ChoiceExerciseV2
  | MultiSelectExerciseV2
  | ShortAnswerExerciseV2
  | StickerRepairExerciseV2
  | MatchingExerciseV2
  | DragSequenceExerciseV2
  | McqSetExerciseV2
  | ScenarioExerciseV2;


