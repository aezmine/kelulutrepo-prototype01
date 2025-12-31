
import { Species, PanoramaScene, FAQ, QuizQuestion } from './types';

export const MOCK_SPECIES: Species[] = [
  {
    id: '1',
    name: 'Tetragonula iridipennis',
    scientificName: 'Tetragonula iridipennis',
    habitat: 'Tropical forests',
    honeyTraits: 'Sour, citrus notes',
    nestType: 'Hollow tree trunks',
    region: 'South Asia',
    description: 'A very common species of stingless bee, known for its small size and efficient honey production.',
    imageUrl: 'https://picsum.photos/seed/bee1/800/600',
    category: 'Common'
  },
  {
    id: '2',
    name: 'Heterotrigona itama',
    scientificName: 'Heterotrigona itama',
    habitat: 'Secondary forests',
    honeyTraits: 'Sweet-sour, thick',
    nestType: 'Logs and man-made hives',
    region: 'Southeast Asia',
    description: 'One of the most popular species for stingless bee farming in Malaysia.',
    imageUrl: 'https://picsum.photos/seed/bee2/800/600',
    category: 'Commercial'
  },
  {
    id: '3',
    name: 'Geniotrigona thoracica',
    scientificName: 'Geniotrigona thoracica',
    habitat: 'Primary forests',
    honeyTraits: 'Fragrant, light amber',
    nestType: 'Large logs',
    region: 'Indo-Malaya',
    description: 'Known for being larger than other Kelulut species and producing high-quality propolis.',
    imageUrl: 'https://picsum.photos/seed/bee3/800/600',
    category: 'Wild'
  }
];

export const MOCK_SCENES: PanoramaScene[] = [
  {
    id: 'entrance',
    title: 'UMT Bukit Kor Entrance',
    panoramaUrl: 'https://pannellum.org/images/alma.jpg',
    hotspots: [
      { id: 'h1', pitch: -10, yaw: 170, type: 'navigation', text: 'To Research Site', targetSceneId: 'research_site' },
      { id: 'h2', pitch: 0, yaw: -10, type: 'info', text: 'Welcome Sign', details: 'Established in 2021 for Kelulut conservation.' }
    ]
  },
  {
    id: 'research_site',
    title: 'Kelulut Research Site',
    panoramaUrl: 'https://pannellum.org/images/cerro-tolo.jpg',
    hotspots: [
      { id: 'h3', pitch: 5, yaw: 0, type: 'navigation', text: 'Back to Entrance', targetSceneId: 'entrance' },
      { id: 'h4', pitch: -15, yaw: 45, type: 'info', text: 'Nest Log #04', details: 'Inhabited by Heterotrigona itama.' }
    ]
  }
];

export const MOCK_FAQ: FAQ[] = [
  { id: '1', question: 'What is Kelulut?', answer: 'Kelulut are stingless bees that produce honey with high medicinal value.', keywords: ['kelulut', 'stingless', 'bee', 'definition'] },
  { id: '2', question: 'Does Kelulut honey taste sour?', answer: 'Yes, Kelulut honey is naturally sour due to its fermentation process in the nest.', keywords: ['sour', 'taste', 'honey'] },
  { id: '3', question: 'Where is UMT Bukit Kor?', answer: 'It is a specialized research site in Terengganu, Malaysia, focused on tropical biodiversity.', keywords: ['location', 'umt', 'bukit kor', 'where'] }
];

export const MOCK_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the main physical characteristic of Kelulut?',
    options: ['They are very aggressive', 'They have no sting', 'They only live in deserts', 'They are larger than honeybees'],
    correctAnswer: 1
  },
  {
    id: 'q2',
    question: 'Which species is most commonly farmed in Malaysia?',
    options: ['Apis mellifera', 'Heterotrigona itama', 'Vespa crabro', 'Bombus terrestris'],
    correctAnswer: 1
  },
  {
    id: 'q3',
    question: 'Kelulut honey is stored in what structure?',
    options: ['Hexagonal wax combs', 'Propolis pots', 'Mud tubes', 'Silk cocoons'],
    correctAnswer: 1
  }
];
