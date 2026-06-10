export interface HeritageSite {
  id: string;
  name: string;
  nativeName: string;
  country: string;
  region: string;
  imageUrl: string;
  historicalBackground: string;
  architecturalSignificance: string;
  culturalImportance: string;
  coordinates: {
    lat: number;
    lng: number;
    x: number; // custom SVG map relative x (0-100)
    y: number; // custom SVG map relative y (0-100)
  };
  visitorHighlights: string[];
  epoch: string;
}

export interface Phrase {
  phrase: string;
  meaning: string;
  pronunciation: string;
}

export interface LanguageCulture {
  id: string;
  langName: string;
  nativeName: string;
  meaning: string;
  origin: string;
  phrases: Phrase[];
  facts: string[];
  region: string;
}

export interface TraditionalSong {
  id: string;
  title: string;
  cultureRegion: string;
  instruments: string[];
  significance: string;
  meaning: string;
  artist: string;
  synthConfig: {
    baseFreq: number;
    scale: number[];
    tempo: number;
    style: 'sitar' | 'flute' | 'vessel' | 'drone';
  };
}

export interface FestivalTradition {
  id: string;
  name: string;
  region: string;
  clothing: string;
  food: string;
  customsName: string;
  customsDesc: string;
  imageUrl: string;
  highlights: string[];
  description: string;
}

export interface SmartTechCard {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  useCase: string;
  impact: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
