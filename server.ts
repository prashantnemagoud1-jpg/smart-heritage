import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization utility for Google GenAI as recommended
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
      console.log('Gemini API Client initialized successfully.');
    } else {
      console.warn('GEMINI_API_KEY is not defined or is placeholder. Falling back to offline heritage guide system.');
    }
  }
  return aiClient;
}

// 1. API: Custom AI chat proxy utilizing the recommended 'gemini-3.5-flash'
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages body. Must be an array.' });
  }

  // Format messages into a string conversation or history for generateContent
  const systemPrompt = `You are "Aethelgard", the Ultimate Smart Tourism & Cultural Heritage AI Guide. 
You possess infinite knowledge on world languages, classical architecture, ancient history, local clothing, folk music, and native culinary arts.
Help tourists learn about heritage sites, plan eco-friendly tours, explore native cultures, and appreciate ancient designs.
Respond warmly, using concise and visually clear formatting (bullet points, short paragraphs). Ensure your tone is educational, and respectful of local cultures.`;

  try {
    const ai = getGeminiClient();
    if (!ai) {
      // Fallback response with simulated intelligence if key is missing
      const userMsg = messages[messages.length - 1]?.content || 'Hello';
      const lowercaseMsg = userMsg.toLowerCase();
      let replyContent = "Greetings! I am the local Smart Heritage offline curator. I am ready to guide you! (Note: Connect your **GEMINI_API_KEY** in the AI Studio Secrets menu to activate full real-time AI capabilities).\n\n";

      if (lowercaseMsg.includes('taj') || lowercaseMsg.includes('agra')) {
        replyContent += "The Taj Mahal is a masterpiece of Mughal architecture. It was built between 1632 and 1648. Did you know that the marble changes color based on the time of day, glowing a soft pink at dawn and sparkling silver in the moonlight?";
      } else if (lowercaseMsg.includes('hampi') || lowercaseMsg.includes('chariot')) {
        replyContent += "Hampi was the grand capital of the Vijayanagara Empire. It resides on bouldered banks where stones literally whisper stories of old. Its Vittala temple has 56 musical pillars that sound different notes when tapped.";
      } else if (lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi')) {
        replyContent += "Welcome! How can I assist your historical explorations today? You can ask me about regional festivals, language definitions, or seek travel recommendations for famous monuments.";
      } else if (lowercaseMsg.includes('music') || lowercaseMsg.includes('song')) {
        replyContent += "Traditional music is the heartbeat of cultural transmission. I highly recommend listening to our integrated traditional synthesisers, which generate authentic ancient waveforms (like mornings raga scales or Zen shakuhachi flutes) using standard browser audio nodes!";
      } else {
        replyContent += `I can certainly share my historical analysis regarding "${userMsg}" with you! Heritage is our bridge between past generations and future opportunities. If you configure a live Gemini key, I can fetch comprehensive global itineraries and architectural breakdowns for any remote coordinate instantly!`;
      }

      return res.json({
        content: replyContent,
        simulated: true,
      });
    }

    // Build history for Gemini
    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I apologize, I searched the archives but couldn't formulate a response. Would you like to ask something else?";
    return res.json({ content: reply, simulated: false });
  } catch (error: any) {
    console.error('Gemini Chat error:', error);
    return res.status(500).json({
      error: 'Failed to generate response',
      details: error.message || error,
    });
  }
});

// 2. API: Structured Custom Itinerary Planner powered by Gemini
app.post('/api/itinerary', async (req, res) => {
  const { site, durationDays, travelerStyle } = req.body;
  if (!site) {
    return res.status(400).json({ error: 'Site parameter is required' });
  }

  const duration = durationDays || 3;
  const style = travelerStyle || 'balanced';

  try {
    const ai = getGeminiClient();
    if (!ai) {
      // Return predefined high-quality mock customized itinerary based on requested site name
      const siteCheck = String(site).toLowerCase();
      let localItinerary = {
        destination: site,
        days: [
          {
            dayNumber: 1,
            title: 'Cultural Initiation & Architecture Basics',
            activities: [
              'Morning entrance when temperature is low to admire grand design layers',
              'Visiting the local interpretation archives to learn about historical construction',
              'Sunset photography from across the scenic riverbank or viewing tier'
            ]
          },
          {
            dayNumber: 2,
            title: 'Immersive Local Traditions & Dialects',
            activities: [
              'Attending an organic localized language briefing workshop',
              'Participating in an eco-sustainable food pairing lunch hosted by resident families',
              'Observing traditional artisans and handloom weaving workshops'
            ]
          }
        ],
        smartTips: [
          'Wear slip-off footwear for easy temple/sanctuary entrance',
          'Use eco-friendly hydration bottles and avoid carrying single-use plastics',
          'Scan physical QR posts placed near site boundaries to stream localized audio-dramas'
        ],
        simulated: true,
      };

      if (siteCheck.includes('taj')) {
        localItinerary.destination = 'Taj Mahal Golden Explorer';
        localItinerary.days[0].activities = [
          '6:00 AM - Sunrise view of the main mausoleum to watch the marble glow pink',
          '9:00 AM - Structured walkthrough of the gardens detailing symmetric geometry and water canals',
          '3:00 PM - Exploration of the massive red sandstone Agra Fort, hearing stories of Shah Jahan’s confinement'
        ];
        localItinerary.days[1].activities = [
          '10:00 AM - Visiting local marble inlay (Pietra Dura) craft studios to meet descendant artisans',
          '1:00 PM - Traditional Awadhu lunch highlighting rich aromatic spices and saffron rotis',
          '5:30 PM - Viewing the Taj from Mehtab Bagh gardens across the Yamuna River during golden hour'
        ];
      } else if (siteCheck.includes('hampi')) {
        localItinerary.destination = 'Hampi Stone & Boulder Trails';
        localItinerary.days[0].activities = [
          '7:00 AM - Climbing Hemakuta Hill to view early morning light over the pillared temples',
          '10:30 AM - Comprehensive walk of Virupaksha Temple, following ancient water channels',
          '3:00 PM - Stepping inside the Royal Enclosure, checking out the Elephant Stables and Lotus Mahal'
        ];
        localItinerary.days[1].activities = [
          '9:00 AM - Exploring Vittala Temple to inspect the stone chariot and musical columns',
          '2:00 PM - Relaxing coracle boat ride across the sacred Tungabhadra river to Anegundi village',
          '6:00 PM - Capturing sunset silhouettes of ruins from the peak of Malyavanta Hill'
        ];
      }

      return res.json(localItinerary);
    }

    // Call live Gemini to generate a structured JSON itinerary
    const prompt = `Generate a highly structured travel itinerary for visiting ${site} over a duration of ${duration} days, optimized for a "${style}" style of traveler (e.g. historical-focused, eco-tourism, or family-oriented).
The output MUST be valid JSON matching the schema below. Answer ONLY with the raw JSON string; no markdown code blocks.

Schema representation:
{
  "destination": string,
  "days": [
    {
      "dayNumber": number,
      "title": string,
      "activities": [string, string, string]
    }
  ],
  "smartTips": [string, string, string]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            destination: { type: Type.STRING },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dayNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  activities: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['dayNumber', 'title', 'activities'],
              },
            },
            smartTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ['destination', 'days', 'smartTips'],
        },
      },
    });

    const rawText = response.text || '{}';
    const parsed = JSON.parse(rawText.trim());
    return res.json({ ...parsed, simulated: false });
  } catch (error: any) {
    console.error('Gemini Itinerary error:', error);
    return res.status(500).json({
      error: 'Failed to generate itinerary',
      details: error.message || error,
    });
  }
});

// Configure Vite middleware or Static files serving
async function bootstrap() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted on Express for development mode.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Fallback to client-side SPA routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production static assets from: ' + distPath);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Smart Tourism application is running on http://localhost:${PORT}`);
  });
}

bootstrap();
