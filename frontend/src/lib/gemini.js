import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function generateCareerRoadmap(studentAnswers, streamName = "General") {
  const prompt = `
You are a professional career counselor and educational advisor. Based on the following student responses to a career aptitude assessment focused on the ${streamName} stream, generate a detailed, personalised career roadmap.

Student Answers:
${studentAnswers}

Generate a structured career roadmap in the following EXACT JSON format. Do not include any markdown code blocks, just return pure JSON:

{
  "studentProfile": {
    "dominantTraits": ["trait1", "trait2", "trait3"],
    "learningStyle": "description",
    "workStyle": "description",
    "strengths": ["strength1", "strength2", "strength3"]
  },
  "topCareers": [
    {
      "title": "Career Title",
      "field": "Field Name",
      "matchPercentage": 95,
      "description": "Why this career suits the student",
      "averageSalary": "₹X – ₹Y LPA",
      "growthOutlook": "High / Medium / Low",
      "keySkills": ["skill1", "skill2", "skill3"]
    }
  ],
  "recommendedCourses": [
    {
      "degree": "B.Tech Computer Science",
      "duration": "4 Years",
      "type": "Undergraduate",
      "topColleges": ["College1", "College2", "College3"]
    }
  ],
  "roadmapSteps": [
    {
      "phase": "Phase 1",
      "title": "Foundation (0–6 Months)",
      "description": "What to do in this phase",
      "actions": ["action1", "action2", "action3"],
      "milestone": "What you will achieve"
    }
  ],
  "immediateNextSteps": ["step1", "step2", "step3"],
  "motivationalNote": "A personalised encouraging message for the student"
}

Make it specific, actionable, and encouraging. Include exactly 3 top careers, 2 recommended courses, and 4 roadmap phases.
When recommending colleges in 'topColleges', strictly prioritize these institutions FIRST if they match the course: DBUU, Uttranchal University, Graphic Era, DBS Global, Tulas Institute, ITM Dehradun, Shivalik College, IMS Unision, Dolphin Institute, JBIT Dehradun, Alpine College. Use the exact spelling mentioned here.
  `;

  const chatSession = model.startChat({ generationConfig, history: [] });
  const result = await chatSession.sendMessage(prompt);
  const text = result.response.text();
  
  // Clean and parse JSON
  const cleaned = text.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
}
