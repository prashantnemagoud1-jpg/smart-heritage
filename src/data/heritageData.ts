import { HeritageSite, LanguageCulture, TraditionalSong, FestivalTradition, SmartTechCard } from '../types';

export const heritageSites: HeritageSite[] = [
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    nativeName: 'ताज महल',
    country: 'India',
    region: 'Agra, Uttar Pradesh',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    historicalBackground: 'Commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal, the monument was constructed over a 20-year period utilizing over 20,000 artisans and craftsmen.',
    architecturalSignificance: 'An pinnacle of Indo-Islamic architecture, it represents a symmetric design plan featuring a pristine white marble dome, inlaid semiprecious stones (pietra dura), intricate carved relief work, and four standing minarets supporting a central square platform.',
    culturalImportance: 'A global symbol of love and beauty, it stands as an architectural record of the majestic artistic height of the Mughal empire and remains a recognized UNESCO World Heritage monument.',
    coordinates: { lat: 27.1751, lng: 78.0421, x: 68, y: 55 },
    visitorHighlights: [
      'Strolling the reflection pool aligning the central gateway',
      'Observing the marvel of marble color shifts from pinkish morning light to luminous gold at night',
      'Inspecting the detailed floral stone inlay work inside the central dome chambers'
    ],
    epoch: '17th Century AD'
  },
  {
    id: 'hampi',
    name: 'Ruins of Hampi',
    nativeName: 'ಹಂಪಿ',
    country: 'India',
    region: 'Ballari, Karnataka',
    imageUrl: 'https://images.unsplash.com/photo-1600100397990-24b321a32a13?auto=format&fit=crop&w=1200&q=80',
    historicalBackground: 'Hampi was the majestic capital city of the Vijayanagara Empire during the 14th century. Located along the banks of the Tungabhadra River, it grew into a thriving trade hub admired by European and Persian travelers before its destruction in 1565.',
    architecturalSignificance: 'Famous for its unique Dravidian temple architecture, monolithic stone sculptures, step wells, and massive bouldered terrains. The Stone Chariot in the Vittala Temple and the towering Virupaksha Gopuram are exceptional engineering marvels.',
    culturalImportance: 'Known as the spiritual heart of the Vijayanagara expansion, preserve ancient traditions of sculpting, water harvesting, and urban town planning.',
    coordinates: { lat: 15.3350, lng: 76.4600, x: 67, y: 62 },
    visitorHighlights: [
      'Visiting the musical pillars of Vittala Temple which resonate musical notes when gently tapped',
      'Climbing Hemakuta Hill for panoramic sunrise views over the monolithic boulder expanse',
      'Exploring the grand Queen\'s Bath and the complex multi-tiered Lotus Mahal royal pavilion'
    ],
    epoch: '14th-16th Century AD'
  },
  {
    id: 'colosseum',
    name: 'The Colosseum',
    nativeName: 'Anfiteatro Flavio',
    country: 'Italy',
    region: 'Rome',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    historicalBackground: 'Completed in 80 AD under Emperor Titus, this titanic structure served as the premier amphitheater of the Roman Empire, hosting gladiator contests, public spectacles, and dramatic combat events for over 500 years.',
    architecturalSignificance: 'A masterpiece of free-standing concrete and vaulted brick arches, featuring three tiers of distinct column orders (Doric, Ionic, and Corinthian) and a complex system of underground trapdoors (the Hypogeum).',
    culturalImportance: 'A profound testament to the ancient Roman civilization\'s engineering prowess, urban control, and theatrical social organization.',
    coordinates: { lat: 41.8902, lng: 12.4922, x: 48, y: 44 },
    visitorHighlights: [
      'Walking over the exposed wooden floor reconstruction to peer into the Hypogeum dungeons below',
      'Viewing the panoramic ruins of the nearby Roman Forum and Palatine Hill arches',
      'The dramatic night lighting framing the outer stone travertine arcades'
    ],
    epoch: '1st Century AD'
  },
  {
    id: 'machu-picchu',
    name: 'Machu Picchu',
    nativeName: 'Machu Pikchu',
    country: 'Peru',
    region: 'Andes Mountains, Cusco',
    imageUrl: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=1200&q=80',
    historicalBackground: 'Built as an elite mountain estate for the Incan Emperor Pachacuti around 1450, it sat abandoned following the Spanish conquest and remained obscured from the external world until explorer Hiram Bingham brought it to global attention in 1911.',
    architecturalSignificance: 'Constructed using the dry-stone Ashlar technique, where colossal stones are fitted tightly together without any mortar, allowing the structure to safely slide and withstand major earthquakes.',
    culturalImportance: 'Stands as a sacred cosmic observatory that aligns with seasonal solstices, preserving the deep Andean bond with Inti, the Sun deity, and Mother Earth.',
    coordinates: { lat: -13.1631, lng: -72.5450, x: 28, y: 72 },
    visitorHighlights: [
      'Gazing at the Intihuatana Stone, a solar clock calibrated to mark winter/summer solstices',
      'Climbing the steep peak of Huayna Picchu for a bird’s-eye view of the citadel below',
      'Inspecting the classic agricultural terraces climbing up near-vertical cliffs'
    ],
    epoch: '15th Century AD'
  },
  {
    id: 'pyramids-giza',
    name: 'Great Pyramids of Giza',
    nativeName: 'أهرامات الجيزة',
    country: 'Egypt',
    region: 'Giza Plateau, Cairo',
    imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80',
    historicalBackground: 'Constructed around 2560 BC as eternal tombs for Pharaohs Khufu, Khafre, and Menkaure. The Great Khufu Pyramid was the tallest human-made masterpiece on Earth for over 3,800 years.',
    architecturalSignificance: 'Meticulously aligned to true cardinal directions using astronomical calculations, containing millions of heavy limestone blocks stacked with sub-millimeter precision.',
    culturalImportance: 'An enduring monument to ancient Egyptian cosmology, absolute sovereignty, math excellence, and their spiritual preparations for the afterlife.',
    coordinates: { lat: 29.9792, lng: 31.1342, x: 55, y: 49 },
    visitorHighlights: [
      'Entering the inner passageways and Grand Gallery inside the Khufu Pyramid core',
      'Capturing the monumental Great Sphinx keeping silent watch over the golden sands',
      'The breathtaking panoramic viewpoint from dunes showing all three master pyramids together'
    ],
    epoch: '26th Century BC'
  },
  {
    id: 'kyoto-temples',
    name: 'Historic Kyoto',
    nativeName: '京都の歴史、寺院',
    country: 'Japan',
    region: 'Kyoto Prefecture',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    historicalBackground: 'Kyoto served as the imperial capital of Japan for over a thousand years. Escaping the widespread aerial devastations of WWII, it preserves centuries of intact temples, imperial palisades, zen gardens, and regional timber design.',
    architecturalSignificance: 'Exemplifies traditional wooden joinery methods crafted completely without nails, combined with pristine zen landscape architecture, stone meditation circles, and gold leaf screen sliding doors.',
    culturalImportance: 'The birthplace of Japanese tea ceremonies, flower arrangements, koto playing, and the geisha district, celebrating peaceful alignment with nature.',
    coordinates: { lat: 35.0116, lng: 135.7681, x: 81, y: 53 },
    visitorHighlights: [
      'Walking beneath thousands of vermilion wood torii gates at Fushimi Inari Sanctuary',
      'Admiring the shimmering Kinkaku-ji (Golden Pavilion) mirrored beautifully upon its pond',
      'Meditating in the bare gravel zen gardens of Ryoan-ji Temple'
    ],
    epoch: '8th-19th Century AD'
  }
];

export const languagesList: LanguageCulture[] = [
  {
    id: 'sanskrit',
    langName: 'Sanskrit',
    nativeName: 'संस्कृतम्',
    meaning: 'Refined, perfected, or highly polished',
    origin: 'An ancient Indo-Aryan language that serves as the root of many modern Indian languages, acting as the classical liturgy of Hinduism, Buddhism, and Jainism.',
    region: 'India / Classical South Asia',
    phrases: [
      { phrase: 'Namaste (नमस्ते)', meaning: 'I bow to the divine spark within you', pronunciation: 'Nuh-muh-stay' },
      { phrase: 'Vasudhaiva Kutumbakam (वसुधैव कुटुम्बकम्)', meaning: 'The entire world is one single family', pronunciation: 'Vuh-su-dhai-vuh Ku-tum-buh-kum' },
      { phrase: 'Satyamevat Jayate (सत्यमेव जयते)', meaning: 'Truth alone triumphs in the end', pronunciation: 'Sut-yuh-may-vuh Juh-yuh-tay' },
      { phrase: 'Lokah Samastah Sukhino Bhavantu (लोकाः समस्ताः सुखिनो भवन्तु)', meaning: 'May all beings everywhere be happy and free', pronunciation: 'Lo-kah Suh-mus-tah Su-khi-no Bhuh-vun-tu' }
    ],
    facts: [
      'The grammatical codification of Sanskrit by Panini in the 4th century BC is praised as a milestone of linguistic science.',
      'Sanskrit contains an incredibly vast, precise vocabulary particularly suited for philosophy, physics, logic, and spiritual texts.',
      'Many digital researchers have explored Sanskrit\'s rule-based structure for machine translation applications.'
    ]
  },
  {
    id: 'latin',
    langName: 'Latin',
    nativeName: 'Lingua Latina',
    meaning: 'Language of Latium (ancient Roman region)',
    origin: 'The administrative and scholastic powerhouse language of the Roman Empire, which evolved into modern Romance languages like Italian, French, Spanish, Portuguese, and Romanian.',
    region: 'Italy / Classical Europe',
    phrases: [
      { phrase: 'Carpe Diem', meaning: 'Seize the day, trust as little as possible in tomorrow', pronunciation: 'Kar-peh Dee-em' },
      { phrase: 'Veni Vidi Vici', meaning: 'I came, I saw, I conquered', pronunciation: 'Weh-nee Wee-dee Wee-kee' },
      { phrase: 'Amor Vincit Omnia', meaning: 'Love conquers all obstacles', pronunciation: 'Ah-mor Win-kit Om-nee-ah' },
      { phrase: 'Ars Longa, Vita Brevis', meaning: 'Art is eternal, but life is fleeting and short', pronunciation: 'Ars Lon-gah Wee-tah Breh-wis' }
    ],
    facts: [
      'Latin was the universal language of science, diplomacy, and higher learning throughout Europe for over 1500 years.',
      'Over 60% of modern English vocabulary and technical vocabulary across biology, law, and medicine is rooted deeply in Latin.'
    ]
  },
  {
    id: 'quechua',
    langName: 'Quechua',
    nativeName: 'Runasimi',
    meaning: 'The language of the people',
    origin: 'The state administrative language of the vast Inca Empire, spoken across Peru, Bolivia, Ecuador, and parts of Chile & Argentina.',
    region: 'Andean South America',
    phrases: [
      { phrase: 'Allillanchu', meaning: 'How are you? Are you well?', pronunciation: 'Ah-yee-yan-choo' },
      { phrase: 'Allillanmi', meaning: 'I am doing very well, thank you', pronunciation: 'Ah-yee-yan-mee' },
      { phrase: 'Sulpayki', meaning: 'Thank you very much', pronunciation: 'Sool-pie-kee' },
      { phrase: 'Tupananchiskama', meaning: 'Until our paths cross again, farewell', pronunciation: 'Too-pan-an-chees-ka-ma' }
    ],
    facts: [
      'It is an agglutinative language, where complex compound words express broad compound sentences in a single block.',
      'Quechua has no ancient written script; instead, numerical data and cultural narratives were recorded using colored knotted strings called Quipus.'
    ]
  },
  {
    id: 'japanese-classical',
    langName: 'Japanese (Kogo)',
    nativeName: '日本語 / 古語',
    meaning: 'Language of the Rising Sun / Ancient Speech',
    origin: 'Highly nuanced classical Japanese used in court poetry, diaries, and novels during the Kyoto-centric Heian Period (794–1185 AD).',
    region: 'Kyoto, Japan',
    phrases: [
      { phrase: 'Mono no Aware (もののあわれ)', meaning: 'The beautiful yet bittersweet awareness of life\'s impermanence', pronunciation: 'Moh-noh noh Ah-wah-reh' },
      { phrase: 'Ichigo Ichie (一期一会)', meaning: 'One lifetime, one treasure encounter', pronunciation: 'Ee-chee-goh Ee-chee-eh' },
      { phrase: 'Wabi-Sabi (侘寂)', meaning: 'Finding deep beauty in age, simplicity, and natural imperfection', pronunciation: 'Wah-bee Sah-bee' },
      { phrase: 'Komorebi (木漏れ日)', meaning: 'Sunlight filtering gently through the leaves of the forest trees', pronunciation: 'Koh-moh-reh-bee' }
    ],
    facts: [
      'The classical Japanese language features incredibly complex levels of respect and honorifics (Keigo) that reflect subtle ranks.',
      'It contains a treasure trove of seasonal words called \"Kigo\" used in traditional Haiku to anchor the reader to a biological rhythm.'
    ]
  }
];

export const traditionalSongs: TraditionalSong[] = [
  {
    id: 'ragalingam',
    title: 'Raag Bhairavi Alaap',
    cultureRegion: 'Vedic North India',
    instruments: ['Sitar', 'Tambura', 'Tabla drone'],
    significance: 'Considered the queen of morning ragas, representing deep peace, introspection, and spiritual devotion.',
    meaning: 'A series of expanding, meditative melodic patterns designed to align human breath with the early morning biological cycle, dissolving anxieties.',
    artist: 'Pandit Somnath Sen (Sitar Master)',
    synthConfig: {
      baseFreq: 146.83, // D3 (Sanskrit Sa)
      scale: [1, 1.067, 1.20, 1.333, 1.50, 1.60, 1.80], // Bhairavi scale intervals
      tempo: 65,
      style: 'sitar'
    }
  },
  {
    id: 'flute-zen',
    title: 'Shakuhachi Bamboo Breath',
    cultureRegion: 'Kyoto Zen Temples',
    instruments: ['Shakuhachi (Bamboo Flute)'],
    significance: 'Originally practiced by the Komuso monks of Fuke Zen as a form of blowing meditation or \"Suizen\".',
    meaning: 'The continuous, fluid drafts represent the transient rising and fading of worldly thoughts, leading to pristine mental stillness.',
    artist: 'Kozan Master Yoshida',
    synthConfig: {
      baseFreq: 220.00, // A3
      scale: [1, 1.125, 1.25, 1.5, 1.667, 1.875], // Pentatonic scale
      tempo: 40,
      style: 'flute'
    }
  },
  {
    id: 'andean-wind',
    title: 'Andean Quena Echo',
    cultureRegion: 'Machu Picchu Valleys',
    instruments: ['Quena Flute', 'Charango guitar'],
    significance: 'Traditional woodwind melodies dating back to prehistoric pre-Columbian mountain communities.',
    meaning: 'An echoing call sending gratitude to the Pachamama (Mother Earth) and remembering the lost Incan empire of the sun.',
    artist: 'Yauri Inka Ensemble',
    synthConfig: {
      baseFreq: 261.63, // C4
      scale: [1, 1.20, 1.333, 1.50, 1.75, 2.0], // Minor pentatonic scale
      tempo: 80,
      style: 'vessel'
    }
  },
  {
    id: 'mediterra-lyre',
    title: 'Phrygian Lyre Drone',
    cultureRegion: 'Greco-Roman Amphitheaters',
    instruments: ['Ancient Lyre', 'Double-pipe Aulos'],
    significance: 'Synthesized sound profile recreating Roman drama theater backing arrangements.',
    meaning: 'A harmonic, echoing tribute to ancient bards reciting historic myths of epic voyages and legendary deities.',
    artist: 'Athenian Lyre Circle',
    synthConfig: {
      baseFreq: 196.00, // G3
      scale: [1, 1.067, 1.25, 1.333, 1.50, 1.60, 1.875], // Phrygian mode
      tempo: 75,
      style: 'drone'
    }
  }
];

export const festivalsList: FestivalTradition[] = [
  {
    id: 'diwali',
    name: 'Diwali (Festival of Lights)',
    region: 'India / Global Diaspora',
    clothing: 'Vibrant silk Sarees, richly embroidered Kurtas, and Sherwanis reflecting festive abundance.',
    food: 'Sweet treats including Kaju Katli (cashew fudge), Besan Ladoo, and crispy spicy mathri crackers.',
    customsName: 'Deepa Aradhana & Rangoli Creation',
    customsDesc: 'Arranging circles of tiny clay oil lamps (diyas) around doorways and creating detailed geometrical threshold drawings called Rangoli using colorful rice powders to invite auspicious energies.',
    imageUrl: 'https://images.unsplash.com/photo-1541079178912-d3136e1742a0?auto=format&fit=crop&w=400&q=80',
    highlights: [
      'Lighting up whole houses with oil lamps',
      'Exchanging sweets and gifts among family and neighbors',
      'The beautiful collective sparklers lighting up the night'
    ],
    description: 'Diwali represents the spiritual victory of light over darkness, wisdom over ignorance, and hope over despair.'
  },
  {
    id: 'gion-matsuri',
    name: 'Gion Matsuri',
    region: 'Kyoto, Japan',
    clothing: 'Light breeze-friendly colorful cotton Yukatas paired with wooden Geta sandals.',
    food: 'Yakitori (skewered chicken), Shaved Ice (Kakigori) with sweet matcha syrup, and comforting Takoyaki.',
    customsName: 'Yamaboko Junco (Float Parade)',
    customsDesc: 'Parading colossal, multi-story festive wooden floats decorated with valuable hand-woven tapestries from ancient imports, constructed completely without metal screws utilizing special rope tie grids.',
    imageUrl: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=400&q=80',
    highlights: [
      'Admiring massive timber floats called Hoko towering up to 25 meters',
      'Listening to Gion-bayashi folk flutes and drums echoing through the night',
      'Lanternlit pedestrian streets lined with traditional wooden craft stalls'
    ],
    description: 'Dating back to 869 AD, Gion Matsuri was established as a purifying spiritual ritual to seek divine protection from pestilence and health hazards.'
  },
  {
    id: 'inti-raymi',
    name: 'Inti Raymi (Festival of the Sun)',
    region: 'Cusco, Peru',
    clothing: 'Brightly colored, thick woolen ponchos and multi-tiered woven shawls featuring Inca geometric iconographies.',
    food: 'Chicha de Jora (traditional fermented corn beer), slow-roasted local tubers, and corn dishes.',
    customsName: 'Sacsayhuaman Sun Invocation',
    customsDesc: 'A grand theatrical and spiritual ceremony where high priests invoke the sun god Inti at the monumental stone fortress of Sacsayhuaman to bless agricultural fields.',
    imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=80',
    highlights: [
      'Vibrant parade of four regional delegations in imperial Inca costumes',
      'The commanding Quechua vocal chants and rhythmic panpipe circles escalating in energy',
      'The symbolic ritual offering of regional fruits to the sun'
    ],
    description: 'Celebrated on the June Solstice, Inti Raymi celebrates the Andean New Year and deepens the bond between humanity, crop life, and solar energies.'
  }
];

export const smartTechnologies: SmartTechCard[] = [
  {
    id: 'tech-ai',
    name: 'Artificial Intelligence',
    category: 'Preservation & Navigation',
    subtitle: 'Cognitive Site Curators',
    description: 'Deploying neural networks to decode faded inscriptions, predict stone decay patterns before they become visible, and transcribe complex dead scripts (like Indus Valley or Egyptian Hieroglyphs).',
    useCase: 'Generates customized travel itineraries and provides responsive historical guidance on-the-spot depending on user queries and schedules.',
    impact: 'Reduces barrier to entry for complex history, offering personalized educational curation instantly for every single visitor.'
  },
  {
    id: 'tech-ar',
    name: 'Augmented Reality (AR)',
    category: 'Interactive Overlay',
    subtitle: 'Time-travel Portals',
    description: 'Superimposing historical 3D models over broken real-world temple ruins using smartphone cameras, bringing lost towers and painted relief figures back to vivid life.',
    useCase: 'Visitors hold their device toward a ruined pillar to view how it looked in its golden era, complete with dynamic ceremonial actors.',
    impact: 'Increases traveler retention, offering an engaging spatial connection to the heritage site.'
  },
  {
    id: 'tech-vr',
    name: 'Virtual Reality (VR)',
    category: 'Immersive Exploration',
    subtitle: 'Global Teleportation',
    description: 'Providing realistic 3D virtual walkthroughs of distant, fragile, or restricted heritage environments (like deep subterranean crypts).',
    useCase: 'Students wear a VR headset from physical classrooms worldwide to stroll inside the Taj Mahal central chamber and study geometry.',
    impact: 'Democratizes heritage science, making historic knowledge affordable and accessible to people with limited physical mobility.'
  },
  {
    id: 'tech-ml',
    name: 'Machine Learning Translation',
    category: 'Language Barriers',
    subtitle: 'Polyglot System',
    description: 'Converting rare local languages and regional historical texts into multiple global languages, preserving regional dialects from extinction.',
    useCase: 'A real-time translation module that converts native signage and plaques into tourists\' custom mother tongue.',
    impact: 'Eradicates modern language divides, welcoming global tourism and enriching international appreciation of local stories.'
  },
  {
    id: 'tech-maps',
    name: 'Interactive Maps & Geofencing',
    category: 'Smarter Navigation',
    subtitle: 'Contextual Spatial Awareness',
    description: 'Using GPS and Bluetooth beacon sensors to trigger spatial audio accounts when tourists near specific historical walls or ruins.',
    useCase: 'Dynamic route planning showing how merchant paths, defense rings, or temple routes evolved over centuries.',
    impact: 'Streamlines site crowds and ensures visitors discover overlooked spots with deeper context.'
  },
  {
    id: 'tech-qr',
    name: 'QR-Based Heritage Archives',
    category: 'Minimal Friction access',
    subtitle: 'Instant Heritage Dossiers',
    description: 'Affixing unobtrusive eco-friendly QR markers on historical plaques, linking instantly to server-stored multimedia libraries, vocal tracks, and 3D files.',
    useCase: 'Tourists scan a brick code to listen to traditional regional music tracks recorded by native artists from that exact decade.',
    impact: 'Saves paper plaques, avoids physical clutter, and keeps visitor content easily updatable over time.'
  }
];
