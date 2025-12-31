
export enum UserRole {
  LEARNER = 'LEARNER',
  ADMIN = 'ADMIN'
}

export interface Species {
  id: string;
  name: string;
  scientificName: string;
  habitat: string;
  honeyTraits: string;
  nestType: string;
  region: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface PanoramaScene {
  id: string;
  title: string;
  panoramaUrl: string;
  hotspots: Hotspot[];
  // Added optional navigation properties to fix TS errors in VirtualTour.tsx
  pitch?: number;
  yaw?: number;
  hfov?: number;
}

export interface Hotspot {
  id: string;
  pitch: number;
  yaw: number;
  type: 'navigation' | 'info';
  text: string;
  targetSceneId?: string;
  details?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface DashboardStats {
  speciesCount: number;
  scenesCount: number;
  hotspotsCount: number;
  quizAttempts: number;
  avgQuizScore: number;
  highestQuizScore: number;
}