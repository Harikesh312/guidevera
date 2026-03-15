"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle, Map, Phone } from "lucide-react";
import { generateCareerRoadmap } from "../../../../lib/gemini";
import Image from "next/image";
import API_URL from "@/lib/api";

const questions = [
  {
    q: "Which subject did you enjoy the most in school?",
    opts: ["Mathematics & Logic", "Science & Technology", "Arts & Creativity", "Commerce & Economics"],
  },
  {
    q: "How do you prefer to solve problems?",
    opts: ["Step-by-step analysis", "Brainstorming creative ideas", "Discussing with others", "Following proven methods"],
  },
  {
    q: "What type of work environment suits you best?",
    opts: ["Working independently", "Collaborative team setting", "Fast-paced and dynamic", "Structured and routine"],
  },
  {
    q: "What motivates you the most?",
    opts: ["Financial success", "Making a social impact", "Creative expression", "Knowledge and learning"],
  },
  {
    q: "How comfortable are you with technology?",
    opts: ["I love coding and building things", "I use tech but don't build it", "I prefer minimal technology", "I want to learn but haven't started"],
  },
  {
    q: "Which activity would you enjoy for an entire day?",
    opts: ["Solving puzzles or coding problems", "Designing or painting something", "Teaching or helping others", "Managing a project or event"],
  },
  {
    q: "What is your reading preference?",
    opts: ["Science, Tech & Innovation", "Business & Entrepreneurship", "Literature, Art & Philosophy", "Health, Environment & Society"],
  },
  {
    q: "How do you handle pressure?",
    opts: ["Stay calm and analytical", "Get creative under pressure", "Seek support from others", "Make quick decisive calls"],
  },
  {
    q: "Which superpower would you choose?",
    opts: ["Genius-level intelligence", "Ability to heal others", "Power to create anything", "Ability to lead and inspire"],
  },
  {
    q: "What type of outcome satisfies you most?",
    opts: ["A perfectly optimised system", "A beautiful design or artwork", "A person who felt helped", "A successful business or deal"],
  },
  {
    q: "Are you more introverted or extroverted?",
    opts: ["Strongly introverted", "Slightly introverted", "Slightly extroverted", "Strongly extroverted"],
  },
  {
    q: "Which skill do you want to develop most?",
    opts: ["Programming & AI", "Communication & Leadership", "Design & Creativity", "Finance & Strategy"],
  },
  {
    q: "How do you feel about research and reading academic content?",
    opts: ["I love deep research", "I do it when needed", "I prefer practical experience", "I avoid it when possible"],
  },
  {
    q: "What kind of projects excite you?",
    opts: ["Building apps or software", "Designing visual content", "Planning social or community events", "Analysing data and making reports"],
  },
  {
    q: "Which field fascinates you the most?",
    opts: ["Engineering & Computer Science", "Medicine & Health Sciences", "Law, Politics & Social Work", "Business, Finance & Marketing"],
  },
  {
    q: "How important is job security to you?",
    opts: ["Very important – stability matters", "Somewhat important", "I prioritise growth over security", "I want to build my own business"],
  },
  {
    q: "Do you enjoy leading others?",
    opts: ["Yes, I naturally take charge", "Sometimes, when needed", "I prefer supporting roles", "I work best alone"],
  },
  {
    q: "Which describes your learning style best?",
    opts: ["Visual (diagrams, videos)", "Hands-on (experiments, projects)", "Reading & writing", "Listening & discussion"],
  },
  {
    q: "How do you feel about working with numbers and data?",
    opts: ["Love it – data is exciting", "Can do it but not my preference", "Neutral", "I prefer to avoid it"],
  },
  {
    q: "Where do you see yourself in 10 years?",
    opts: ["Leading a tech company or startup", "Practising medicine, law or science", "Creating art, content or design", "Running my own business or organisation"],
  },
];

export default function QuestionsClient() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [testAlreadyTaken, setTestAlreadyTaken] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login?redirect=/ability-test/questions");
      return;
    }
    if (localStorage.getItem("testCompleted") === "true") {
      setTestAlreadyTaken(true);
    }
    setAuthChecked(true);
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

  const progress = ((currentQ + 1) / questions.length) * 100;

  const selectOption = (optIndex) => {
    setAnswers((prev) => ({ ...prev, [currentQ]: optIndex }));
  };

  const goNext = () => {
    if (currentQ < questions.length - 1) {
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
      const formatted = questions
        .map((q, i) => `Q${i + 1}. ${q.q}\nAnswer: ${q.opts[answers[i]] ?? "Not answered"}`)
        .join("\n\n");

      // 1. Generate roadmap via Gemini
      const roadmap = await generateCareerRoadmap(formatted);

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

  const isLast = currentQ === questions.length - 1;
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
          <Image src="/guidevera-logo.png" alt="Guidevera" width={120} height={40} className="object-contain" />
          <span className="text-sm text-white/50 font-medium">Question {currentQ + 1} of {questions.length}</span>
          <span className="text-sm text-[#0EB4A6] font-bold">{Math.round(progress)}% complete</span>
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
            <div className="bg-[#121214] border border-white/10 rounded-2xl p-8">
              <p className="text-xs text-white/30 font-medium mb-4">QUESTION {currentQ + 1} OF {questions.length}</p>
              <h2 className="text-xl md:text-2xl font-bold mb-8 leading-snug">{questions[currentQ].q}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {questions[currentQ].opts.map((opt, i) => (
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
                  className="flex items-center gap-2 px-5 py-2.5 text-sm border border-white/10 rounded-full text-white/50 hover:text-white hover:border-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                {isLast ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!hasAnswer || isSubmitting}
                    className="flex items-center gap-2 px-6 py-2.5 text-sm bg-[#0EB4A6] hover:bg-[#0c9c90] text-white rounded-full font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(14,180,166,0.3)]"
                  >
                    Submit & Generate Roadmap 🚀
                  </button>
                ) : (
                  <button
                    onClick={goNext}
                    disabled={!hasAnswer}
                    className="flex items-center gap-2 px-6 py-2.5 text-sm bg-[#0EB4A6] hover:bg-[#0c9c90] text-white rounded-full font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next <ChevronRight className="w-4 h-4" />
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
