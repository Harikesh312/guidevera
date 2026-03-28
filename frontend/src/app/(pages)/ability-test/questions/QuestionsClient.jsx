"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle, Map, Phone } from "lucide-react";
import { generateCareerRoadmap } from "../../../../lib/gemini";
import Image from "next/image";
import API_URL from "@/lib/api";

const streamSelector = {
  q: "Which type of subject or activity naturally interests you the most?",
  opts: [
    "Medical / Life Sciences",
    "Technology / Engineering / Mathematics", 
    "Commerce / Business / Management",
    "Humanities / Creative / Social Sciences"
  ],
};

const medicalQuestions = [
  { q: "How do you react to the sight of blood or injuries?", opts: ["Completely fine, it doesn't bother me", "A little uncomfortable but I can manage", "I prefer lab work over patient care", "I cannot handle it"] },
  { q: "Are you comfortable working long, irregular shifts?", opts: ["Yes, if it means saving lives", "I prefer standard working hours", "Only occasionally", "No, work-life balance is strict for me"] },
  { q: "Which part of healthcare interests you most?", opts: ["Direct patient diagnosis and surgery", "Nursing and continuous care", "Laboratory research and diagnostics", "Pharmacy and medicine formulation"] },
  { q: "How do you feel about continuous, lifelong studying?", opts: ["I love it, medicine requires constant learning", "I am okay with it if necessary", "I prefer practical work soon after graduating", "I strongly dislike studying for too long"] },
  { q: "When someone is in pain, what is your first instinct?", opts: ["Provide immediate medical or first-aid help", "Comfort them emotionally", "Find a professional doctor immediately", "Analyze what caused the pain"] },
  { q: "How detail-oriented are you in pressure situations?", opts: ["Extremely, I notice every small change", "Moderately, I do my best", "I tend to look at the bigger picture", "I panic and might miss details"] },
  { q: "Would you rather work in a hospital or a research lab?", opts: ["Busy hospital ward", "Private clinic", "Quiet research laboratory", "In a healthcare management office"] },
  { q: "How do you feel about studying Biology and Anatomy?", opts: ["Fascinated by it", "It's interesting but hard to memorize", "I prefer chemistry over biology", "I don't enjoy it much"] },
  { q: "Can you deliver bad news to someone with empathy but firmness?", opts: ["Yes, I can handle difficult conversations", "I can, but it takes a heavy emotional toll", "I would rather someone else do it", "No, I am too emotional"] },
  { q: "Which tool do you find most interesting?", opts: ["Stethoscope or Scalpel", "Microscope", "Chemical reagents", "Healthcare software systems"] },
  { q: "How do you handle repetitive procedures?", opts: ["I excel at them with precision", "I can do them, but prefer variety", "I get bored easily", "I hate repetition"] },
  { q: "What is your stance on working with technology in healthcare?", opts: ["I want to use the latest robotic/AI medical tools", "I prefer traditional methods", "I want to develop the tech, not just use it", "Neutral"] },
  { q: "How well do you memorize complex terminology?", opts: ["Very well, I have a strong memory", "With some effort and repetition", "I struggle with rote memorization", "I prefer concept-based learning over memorization"] },
  { q: "Which of these causes inspires you the most?", opts: ["Curing rare diseases", "Improving mental health and therapy", "Providing rural healthcare access", "Innovating new medical devices"] },
  { q: "How do you prefer to interact with people?", opts: ["One-on-one deep consultations", "Brief check-ins with many people", "Focusing on the data, less on the person", "Managing healthcare teams"] }
];

const techQuestions = [
  { q: "What do you enjoy doing on a computer?", opts: ["Coding and building software", "Designing UI/UX or graphics", "Hardware and networking", "Just browsing and gaming"] },
  { q: "How do you approach a complex math or logic puzzle?", opts: ["I systematically break it down until solved", "I look for creative shortcuts", "I ask for help or look up solutions", "I lose interest quickly"] },
  { q: "Would you rather build a machine or write a software program?", opts: ["Write software/app", "Build a physical machine/robot", "Design the aesthetics of either", "Manage the team building it"] },
  { q: "How do you feel about debugging or finding a tiny error for hours?", opts: ["It's rewarding when I finally fix it", "It's frustrating but part of the job", "I hate it and give up", "I prefer if someone else tests my work"] },
  { q: "Which field of tech excites you the most?", opts: ["Artificial Intelligence & Data", "Cybersecurity & Hacking", "Civil/Mechanical Engineering", "Game Development & VR"] },
  { q: "Are you comfortable staring at a screen for 8+ hours a day?", opts: ["Yes, I already do", "Yes, if the work is engaging", "I'd prefer a mix of screen and physical work", "No, I need to be active"] },
  { q: "How do you learn a new software or tool?", opts: ["Read the documentation", "Watch video tutorials", "Just start clicking and experimenting", "Wait for someone to teach me"] },
  { q: "What sounds like a better workday?", opts: ["Writing clean, efficient code alone", "Brainstorming architecture with a team", "Visiting a construction/manufacturing site", "Pitching a tech product to clients"] },
  { q: "Do you prefer abstract concepts or concrete physical objects?", opts: ["Abstract concepts (Algorithms, Data)", "Concrete objects (Engines, Bridges, Circuits)", "A mix of both", "Mainly visual/creative things"] },
  { q: "How important is math to your ideal career?", opts: ["Essential, I love complex math", "Useful for logic, but I don't want to derive formulas", "I only want to do basic math", "I want to avoid math completely"] },
  { q: "When a device breaks, what is your first reaction?", opts: ["Take it apart and try to fix it", "Google the problem", "Call a technician", "Buy a new one"] },
  { q: "Which describes your workspace style?", opts: ["Multiple monitors, highly organized digital space", "A workshop full of tools and parts", "A sketchbook and a drawing tablet", "A clean desk with just a laptop"] },
  { q: "How do you feel about constant, rapid industry changes?", opts: ["Excited, I love learning the newest frameworks", "It can be exhausting but necessary", "I prefer mastering one timeless skill", "I dislike constant change"] },
  { q: "If you had to choose a specialty, what would it be?", opts: ["Backend/Database management", "Frontend/User Interface", "Hardware/IoT systems", "DevOps/Cloud infrastructure"] },
  { q: "How do you handle situations where there is no clear right answer?", opts: ["Analyze data to find the most probable outcome", "Create a new solution from scratch", "Rely on best practices", "Seek diverse opinions"] }
];

const commerceQuestions = [
  { q: "What interests you most about business?", opts: ["Managing money and investments", "Marketing and consumer behavior", "Leading people and operations", "Starting my own company"] },
  { q: "How do you feel about taking calculated financial risks?", opts: ["I love the thrill of high risk/high reward", "I'm okay with moderate, managed risk", "I prefer safe, guaranteed returns", "I avoid financial risk completely"] },
  { q: "How good are you at convincing others?", opts: ["Excellent, I can sell almost anything", "Good, if I believe in the product", "I am better at negotiating than selling", "I am not persuasive at all"] },
  { q: "Which numbers do you prefer working with?", opts: ["Stock market trends and financial accounting", "Data analytics and consumer metrics", "Cost optimization and supply chain", "I don't like working with numbers"] },
  { q: "How do you stay updated with the world?", opts: ["Follow stock markets and economy", "Read about tech and startups", "Follow social media trends and influencers", "Read political and global news"] },
  { q: "What is your approach to teamwork?", opts: ["I naturally take the leadership role", "I prefer being the strategic advisor", "I execute my tasks independently", "I act as the peacemaker and coordinator"] },
  { q: "Would you rather work in...", opts: ["An investment bank or accounting firm", "A digital marketing agency", "A corporate HR or operations department", "My own startup garage"] },
  { q: "How do you handle high-pressure deadlines?", opts: ["Delegate tasks efficiently to meet it", "Work overtime myself to finish perfectly", "Negotiate for more time", "I tend to stress out"] },
  { q: "What kind of analysis do you enjoy?", opts: ["Analyzing balance sheets and profit/loss", "Analyzing human behavior and psychology", "Analyzing market gaps and opportunities", "I prefer creative work over analysis"] },
  { q: "How do you view networking?", opts: ["Essential, I actively build my network", "Necessary but exhausting", "I only connect with people I strictly need", "I hate networking"] },
  { q: "Which tool would you open first at work?", opts: ["Excel spreadsheet", "PowerPoint / Keynote", "Salesforce / CRM dashboard", "Project Management tool (Trello/Asana)"] },
  { q: "What makes a business successful in your eyes?", opts: ["Maximum profitability and shareholder value", "A strong, recognizable brand", "Happy, productive employees", "Disruptive innovation"] },
  { q: "How comfortable are you speaking in front of a large audience?", opts: ["Very comfortable, I love public speaking", "I can do it if prepared", "I get nervous but manage", "I avoid it entirely"] },
  { q: "If a project fails, what is your first response?", opts: ["Analyze the ROI and financial loss", "Pivot the strategy and try marketing differently", "Re-evaluate the team's performance", "Move on to the next opportunity quickly"] },
  { q: "Which title appeals to you most?", opts: ["Chief Financial Officer (CFO)", "Chief Marketing Officer (CMO)", "Chief Executive Officer (CEO)", "Independent Consultant"] }
];

const humanitiesQuestions = [
  { q: "How do you prefer to express yourself?", opts: ["Through written words (articles, poetry, stories)", "Through visual arts (design, painting, film)", "Through spoken communication (debates, speeches)", "Through helping and counseling others"] },
  { q: "Which of these topics fascinates you most?", opts: ["History, politics, and sociology", "Psychology and human behavior", "Literature, languages, and culture", "Art, media, and journalism"] },
  { q: "How do you feel about subjective topics with no single right answer?", opts: ["I love debating and exploring different perspectives", "I find it interesting to analyze", "I prefer objective facts to subjective opinions", "I find it frustrating"] },
  { q: "What kind of impact do you want to make?", opts: ["Change public policy or laws", "Improve individual mental health", "Tell stories that move people", "Educate the next generation"] },
  { q: "How do you approach a large reading assignment?", opts: ["I dive deeply into the text and analyze it", "I skim for the main ideas", "I prefer to listen to it or watch a summary", "I struggle to get through heavy reading"] },
  { q: "Would you rather spend your day...", opts: ["Writing, editing, or researching in a library", "Counseling or interacting with diverse people", "Designing graphics, sets, or media", "Organizing a social cause or campaign"] },
  { q: "How good are you at reading people's emotions?", opts: ["Very intuitive, I always know how people feel", "Quite good, I can empathize easily", "I mostly focus on what they explicitly say", "I struggle to read emotions"] },
  { q: "Which profession sounds most appealing?", opts: ["Lawyer or Civil Servant", "Psychologist or HR Specialist", "Journalist or Author", "Graphic Designer or Animator"] },
  { q: "How do you feel about routine 9-to-5 desk jobs?", opts: ["I prefer a dynamic, unpredictable schedule", "I prefer creative freedom over strict hours", "I like the stability of a 9-to-5", "I want to travel and work on the field"] },
  { q: "What is your stance on learning multiple languages?", opts: ["I love learning new languages and cultures", "It's useful but difficult", "I only want to know what's necessary", "Not interested at all"] },
  { q: "How do you handle conflict?", opts: ["Mediate and find a diplomatic resolution", "Argue my point logically and persuasively", "Try to understand the psychological root of the conflict", "Avoid it entirely"] },
  { q: "What kind of data do you prefer working with?", opts: ["Historical records and human stories", "Survey results and behavioral patterns", "Visual aesthetics and color palettes", "Legal documents and case studies"] },
  { q: "Are you comfortable working on projects that take years to complete (e.g., writing a book, policy reform)?", opts: ["Yes, I have the patience for deep work", "Yes, if I am passionate about it", "I prefer medium-term projects", "No, I need quick results"] },
  { q: "Which of these documentaries would you watch first?", opts: ["A deep dive into an unsolved historical mystery", "An analysis of human brain and mental health", "A profile of a famous artist or filmmaker", "An exposé on political corruption"] },
  { q: "How do you view society's rules?", opts: ["They need to be constantly questioned and reformed", "They are necessary to maintain order", "They are interesting psychological constructs", "I focus more on individual expression than societal rules"] }
];

const universalQuestions = [
  { q: "What is your preference regarding higher studies?", opts: ["I want to study up to Master's/Ph.D.", "I will do a Master's only if my career demands it", "I want to work immediately after my Bachelor's", "I am unsure"] },
  { q: "What is your priority between income and work-life balance?", opts: ["High income is my main priority, regardless of hours", "I want a strict work-life balance even if pay is lower", "I am looking for a middle ground", "I want flexibility to work on my own terms"] },
  { q: "Are you willing to relocate for your career?", opts: ["Yes, anywhere in the world", "Yes, but only within my country", "No, I want to stay near my hometown", "Only for exceptional opportunities"] },
  { q: "How open are you to entrepreneurship (starting your own business)?", opts: ["That is my ultimate goal", "I am open to it later in my career", "I prefer the stability of being an employee", "I haven't thought about it"] }
];

export default function QuestionsClient() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [testAlreadyTaken, setTestAlreadyTaken] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);

  const getQuestionsList = () => {
    let list = [streamSelector];
    if (answers[0] !== undefined) {
      if (answers[0] === 0) list = list.concat(medicalQuestions);
      else if (answers[0] === 1) list = list.concat(techQuestions);
      else if (answers[0] === 2) list = list.concat(commerceQuestions);
      else if (answers[0] === 3) list = list.concat(humanitiesQuestions);
      list = list.concat(universalQuestions);
    }
    return list;
  };

  const activeQuestions = getQuestionsList();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login?redirect=/ability-test/questions");
      return;
    }

    // Always verify against backend MongoDB — not just localStorage
    // This ensures the check works after logout/login and across devices
    fetch(`${API_URL}/api/roadmap/has`, {
      headers: { "Authorization": `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(json => {
        if (json.success && json.hasRoadmap) {
          // Sync localStorage to match backend truth
          localStorage.setItem("testCompleted", "true");
          setTestAlreadyTaken(true);
        } else {
          // Backend says no roadmap — allow test
          setTestAlreadyTaken(false);
        }
        setAuthChecked(true);
      })
      .catch(() => {
        // If backend check fails, fall back to localStorage
        if (localStorage.getItem("testCompleted") === "true") {
          setTestAlreadyTaken(true);
        }
        setAuthChecked(true);
      });
  }, [router]);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#0EB4A6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── ALREADY TAKEN SCREEN ──
  if (testAlreadyTaken) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white font-sans flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#0EB4A6]/5 rounded-full blur-[140px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#121214] border border-white/10 rounded-2xl p-10 max-w-md w-full text-center relative z-10"
        >
          <div className="w-20 h-20 rounded-full bg-[#0EB4A6]/10 border border-[#0EB4A6]/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#0EB4A6]" />
          </div>
          <h1 className="text-2xl font-bold mb-3">You&apos;ve Already Taken the Test!</h1>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            You&apos;ve already completed the Guidevera Ability Test. Each account is allowed one attempt to ensure the most accurate career roadmap.
          </p>
          <div className="space-y-3">
            <Link
              href="/ability-test/roadmap"
              className="w-full bg-[#0EB4A6] hover:bg-[#0c9c90] text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(14,180,166,0.3)]"
            >
              <Map className="w-4 h-4" /> View My Roadmap
            </Link>
            <Link
              href="/counseling"
              className="w-full bg-white/5 hover:bg-white/8 border border-white/10 text-white font-medium py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" /> Book a Counseling Session
            </Link>
            <Link href="/" className="block text-sm text-white/30 hover:text-white/50 transition-colors mt-2">
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const progress = ((currentQ + 1) / activeQuestions.length) * 100;

  const selectOption = (optIndex) => {
    setAnswers((prev) => ({ ...prev, [currentQ]: optIndex }));
  };

  const goNext = () => {
    if (currentQ < activeQuestions.length - 1) {
      setDirection(1);
      setCurrentQ((p) => p + 1);
    }
  };

  const goPrev = () => {
    if (currentQ > 0) {
      setDirection(-1);
      setCurrentQ((p) => p - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formatted = activeQuestions
        .map((q, i) => `Q${i + 1}. ${q.q}\nAnswer: ${q.opts[answers[i]] ?? "Not answered"}`)
        .join("\n\n");

      // Pass the selected stream explicitly
      const streamNames = ["Medical/Life Sciences", "Technology/Engineering", "Commerce/Management", "Humanities/Arts"];
      const chosenStreamName = streamNames[answers[0]];
      
      // 1. Generate roadmap via Gemini
      const roadmap = await generateCareerRoadmap(formatted, chosenStreamName);

      // 2. Persist to MongoDB (user-specific, auth-protected)
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/api/roadmap/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ data: roadmap }),
      });

      // 3. Cache in sessionStorage for instant display, mark completed
      sessionStorage.setItem("roadmapData", JSON.stringify(roadmap));
      localStorage.setItem("testCompleted", "true");
      router.push("/ability-test/roadmap");
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to generate roadmap. Please try again.");
      setIsSubmitting(false);
    }
  };

  const isLast = currentQ === activeQuestions.length - 1;
  const hasAnswer = answers[currentQ] !== undefined;

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans relative overflow-hidden">

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-[#09090b]/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#0EB4A6] border-t-transparent rounded-full animate-spin mb-6" />
          <h3 className="text-xl font-bold mb-2">Analysing your profile with AI...</h3>
          <p className="text-white/50">Please wait, generating your personalised roadmap</p>
        </div>
      )}

      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Image src="/guidevera-logo.png" alt="Guidevera" width={120} height={40} className="object-contain" style={{ width: "auto", height: "auto" }} />
          <span className="text-xs md:text-sm text-white/50 font-medium">Question {currentQ + 1} of {activeQuestions.length}</span>
          <span className="text-xs md:text-sm text-[#0EB4A6] font-bold">{Math.round(progress)}% complete</span>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-white/5">
          <motion.div
            className="h-full bg-[#0EB4A6]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="min-h-screen flex items-center justify-center pt-16 px-4 py-12">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQ}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            <div className="bg-[#121214] border border-white/10 rounded-2xl p-4 md:p-8">
              <p className="text-xs text-white/30 font-medium mb-4">QUESTION {currentQ + 1} OF {activeQuestions.length}</p>
              <h2 className="text-xl md:text-2xl font-bold mb-8 leading-snug">{activeQuestions[currentQ].q}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {activeQuestions[currentQ].opts.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => selectOption(i)}
                    className={`border rounded-xl p-4 text-sm text-left font-medium transition-all cursor-pointer ${
                      answers[currentQ] === i
                        ? "border-[#0EB4A6] bg-[#0EB4A6]/10 text-[#0EB4A6]"
                        : "border-white/10 bg-white/5 text-white/70 hover:border-[#0EB4A6]/50 hover:bg-white/8"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={goPrev}
                  disabled={currentQ === 0}
                  className="flex items-center gap-1 md:gap-2 px-3 py-2 text-xs md:px-6 md:py-2.5 md:text-sm border border-white/10 rounded-full text-white/50 hover:text-white hover:border-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" /> Previous
                </button>

                {isLast ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!hasAnswer || isSubmitting}
                    className="flex items-center gap-1 md:gap-2 px-3 py-2 text-xs md:px-6 md:py-2.5 md:text-sm bg-[#0EB4A6] hover:bg-[#0c9c90] text-white rounded-full font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(14,180,166,0.3)]"
                  >
                    Submit <span className="hidden sm:inline"> & Generate </span> 🚀
                  </button>
                ) : (
                  <button
                    onClick={goNext}
                    disabled={!hasAnswer}
                    className="flex items-center gap-1 md:gap-2 px-3 py-2 text-xs md:px-6 md:py-2.5 md:text-sm bg-[#0EB4A6] hover:bg-[#0c9c90] text-white rounded-full font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
