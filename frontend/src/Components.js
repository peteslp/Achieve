import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Mock data for the application
const mockStudents = [
  {
    id: 1,
    name: "Alex Johnson",
    grade: "3rd Grade",
    goals: 3,
    progress: 78,
    lastSession: "2024-01-15",
    assessmentScore: 85,
    disorder: "Articulation",
    status: "Active",
    birthDate: "2015-03-12",
    parentContact: "Sarah Johnson - (555) 123-4567",
    email: "sarah.johnson@email.com",
    teacher: "Ms. Rodriguez",
    therapyFrequency: "2x per week",
    notes: "Shows consistent progress with /r/ sound production. Responds well to visual cues.",
    // IEP Information
    iep: {
      currentIEPDate: "2023-09-15",
      nextIEPDate: "2024-09-15",
      lastIEPDate: "2022-09-20",
      iepTeamMembers: ["Ms. Rodriguez (Teacher)", "Dr. Sarah Johnson (SLP)", "Maria Lopez (School Psychologist)", "Parent: Sarah Johnson"],
      iepGoals: "Speech articulation improvement, Reading comprehension support",
      accommodations: ["Extra time for verbal responses", "Visual cues for articulation", "Small group instruction"],
      iepNotes: "Annual IEP review scheduled for September 2024. Student making good progress on speech goals."
    },
    // Detailed Assessments
    assessments: [
      {
        id: 1,
        name: "Goldman-Fristoe Test of Articulation-3",
        type: "Standardized Assessment",
        date: "2024-01-10",
        score: "85/100",
        percentile: "16th percentile",
        administered: "Dr. Sarah Johnson",
        results: "Mild articulation difficulties with /r/ sound in all positions",
        recommendations: "Continue therapy 2x/week focusing on /r/ production",
        status: "Complete"
      },
      {
        id: 2,
        name: "CELF-5 (Clinical Evaluation of Language Fundamentals)",
        type: "Language Assessment",
        date: "2023-09-01",
        score: "92/120",
        percentile: "25th percentile", 
        administered: "Dr. Sarah Johnson",
        results: "Age-appropriate language skills with mild weaknesses in complex syntax",
        recommendations: "Monitor progress, no additional language therapy needed",
        status: "Complete"
      },
      {
        id: 3,
        name: "Articulation Progress Assessment", 
        type: "Progress Monitoring",
        date: "2024-01-15",
        score: "78%",
        percentile: "Improving",
        administered: "Dr. Sarah Johnson",
        results: "/r/ sound production improving in structured activities",
        recommendations: "Continue current therapy approach",
        status: "Complete"
      }
    ],
    // Progress Monitoring Data
    progressMonitoring: [
      {
        id: 1,
        date: "2024-01-15",
        goal: "Improve /r/ sound production",
        activity: "Conversational speech sample",
        accuracy: "78%",
        notes: "Improved from 65% last week. Good carryover to conversation.",
        dataType: "Percentage Correct",
        trials: 20,
        correct: 16
      },
      {
        id: 2,
        date: "2024-01-12", 
        goal: "Improve /r/ sound production",
        activity: "Structured word practice",
        accuracy: "85%",
        notes: "Excellent performance in structured setting",
        dataType: "Percentage Correct",
        trials: 25,
        correct: 21
      },
      {
        id: 3,
        date: "2024-01-10",
        goal: "Improve /r/ sound production", 
        activity: "Sentence reading",
        accuracy: "72%",
        notes: "Some difficulty with /r/ in complex sentences",
        dataType: "Percentage Correct",
        trials: 18,
        correct: 13
      },
      {
        id: 4,
        date: "2024-01-08",
        goal: "Self-monitoring /r/ production",
        activity: "Self-correction task",
        accuracy: "60%",
        notes: "Beginning to self-monitor. Needs more practice.",
        dataType: "Percentage Correct", 
        trials: 15,
        correct: 9
      }
    ],
    // Detailed Goals
    currentGoals: [
      {
        id: 1,
        goal: "Improve /r/ sound production in conversational speech with 80% accuracy",
        startDate: "2023-09-15",
        targetDate: "2024-06-15",
        progress: 78,
        status: "In Progress",
        frequency: "2x per week",
        setting: "Individual therapy",
        method: "Traditional articulation therapy with visual cues",
        criteria: "80% accuracy across 3 consecutive sessions",
        notes: "Good progress, on track to meet goal by target date"
      },
      {
        id: 2,
        goal: "Use correct /r/ sounds in structured activities with 90% accuracy",
        startDate: "2023-09-15", 
        targetDate: "2024-03-15",
        progress: 85,
        status: "In Progress",
        frequency: "2x per week",
        setting: "Individual therapy",
        method: "Drill practice with immediate feedback",
        criteria: "90% accuracy across 2 consecutive sessions",
        notes: "Nearly ready to meet this goal, will reassess next month"
      },
      {
        id: 3,
        goal: "Self-monitor /r/ production in reading tasks with 70% accuracy",
        startDate: "2024-01-01",
        targetDate: "2024-05-15", 
        progress: 60,
        status: "In Progress",
        frequency: "2x per week",
        setting: "Individual therapy",
        method: "Self-monitoring strategies and metacognitive training",
        criteria: "70% self-correction accuracy",
        notes: "New goal, student learning self-monitoring techniques"
      }
    ],
    sessionHistory: [
      { date: "2024-01-15", duration: "30 min", focus: "/r/ articulation", progress: "Good" },
      { date: "2024-01-12", duration: "30 min", focus: "Conversational speech", progress: "Excellent" },
      { date: "2024-01-10", duration: "30 min", focus: "/r/ in sentences", progress: "Fair" }
    ]
  },
  {
    id: 2,
    name: "Sarah Chen",
    grade: "5th Grade", 
    goals: 4,
    progress: 92,
    lastSession: "2024-01-14",
    assessmentScore: 91,
    disorder: "Language",
    status: "Active",
    birthDate: "2013-08-22",
    parentContact: "David Chen - (555) 987-6543",
    email: "david.chen@email.com",
    teacher: "Mr. Thompson",
    therapyFrequency: "1x per week",
    notes: "Exceptional progress in language development. Ready for advanced goals.",
    // IEP Information
    iep: {
      currentIEPDate: "2023-10-12",
      nextIEPDate: "2024-10-12",
      lastIEPDate: "2022-10-15",
      iepTeamMembers: ["Mr. Thompson (Teacher)", "Dr. Sarah Johnson (SLP)", "Lisa Park (Special Ed Coordinator)", "Parent: David Chen"],
      iepGoals: "Language comprehension and expression, Academic vocabulary development",
      accommodations: ["Extended time for writing assignments", "Graphic organizers", "Pre-teaching of vocabulary"],
      iepNotes: "Student exceeding expectations. Consider reducing therapy frequency or transitioning to consultation model."
    },
    // Detailed Assessments
    assessments: [
      {
        id: 1,
        name: "CELF-5 (Clinical Evaluation of Language Fundamentals)",
        type: "Standardized Assessment",
        date: "2024-01-05",
        score: "115/120",
        percentile: "84th percentile",
        administered: "Dr. Sarah Johnson",
        results: "Above average language skills with strengths in vocabulary and comprehension",
        recommendations: "Continue current therapy with focus on complex syntax",
        status: "Complete"
      },
      {
        id: 2,
        name: "TOLD-P:4 (Test of Language Development)",
        type: "Language Assessment",
        date: "2023-10-01",
        score: "108/130",
        percentile: "70th percentile",
        administered: "Dr. Sarah Johnson",
        results: "Significant improvement in all language areas since last assessment",
        recommendations: "Consider reducing therapy frequency",
        status: "Complete"
      }
    ],
    // Progress Monitoring Data
    progressMonitoring: [
      {
        id: 1,
        date: "2024-01-14",
        goal: "Complex sentence structures",
        activity: "Story retelling",
        accuracy: "92%",
        notes: "Excellent use of subordinate clauses and complex vocabulary",
        dataType: "Percentage Correct",
        trials: 12,
        correct: 11
      },
      {
        id: 2,
        date: "2024-01-07",
        goal: "Narrative skills",
        activity: "Personal narrative",
        accuracy: "90%",
        notes: "Good story grammar and sequence",
        dataType: "Percentage Correct",
        trials: 10,
        correct: 9
      }
    ],
    // Detailed Goals
    currentGoals: [
      {
        id: 1,
        goal: "Increase MLU (Mean Length of Utterance) to 6+ words",
        startDate: "2023-10-12",
        targetDate: "2024-04-12",
        progress: 92,
        status: "Nearly Met",
        frequency: "1x per week",
        setting: "Individual therapy",
        method: "Language expansion and modeling",
        criteria: "MLU of 6+ words across 3 language samples",
        notes: "Goal nearly achieved, preparing for next level goals"
      },
      {
        id: 2,
        goal: "Use complex sentence structures in conversation",
        startDate: "2023-10-12",
        targetDate: "2024-05-12",
        progress: 88,
        status: "In Progress",
        frequency: "1x per week",
        setting: "Individual therapy",
        method: "Structured conversation practice",
        criteria: "Use subordinate clauses in 80% of opportunities",
        notes: "Excellent progress, very close to meeting goal"
      },
      {
        id: 3,
        goal: "Demonstrate narrative skills with story retelling",
        startDate: "2023-10-12",
        targetDate: "2024-03-12",
        progress: 95,
        status: "Met",
        frequency: "1x per week",
        setting: "Individual therapy",
        method: "Story grammar instruction and practice",
        criteria: "Include all story grammar elements in retelling",
        notes: "Goal achieved! Ready for more advanced narrative goals"
      },
      {
        id: 4,
        goal: "Apply grammar rules in spontaneous speech",
        startDate: "2024-01-01",
        targetDate: "2024-06-01",
        progress: 85,
        status: "In Progress",
        frequency: "1x per week",
        setting: "Individual therapy",
        method: "Naturalistic teaching in conversation",
        criteria: "Correct grammar usage 90% of the time",
        notes: "New goal showing excellent early progress"
      }
    ],
    sessionHistory: [
      { date: "2024-01-14", duration: "45 min", focus: "Narrative skills", progress: "Excellent" },
      { date: "2024-01-07", duration: "45 min", focus: "Complex sentences", progress: "Good" },
      { date: "2024-01-05", duration: "45 min", focus: "Grammar practice", progress: "Excellent" }
    ]
  },
  {
    id: 3,
    name: "Marcus Williams",
    grade: "2nd Grade",
    goals: 2,
    progress: 65,
    lastSession: "2024-01-12",
    assessmentScore: 72,
    disorder: "Fluency",
    status: "Active",
    birthDate: "2016-11-05",
    parentContact: "Angela Williams - (555) 456-7890",
    email: "angela.williams@email.com",
    teacher: "Mrs. Garcia",
    therapyFrequency: "3x per week",
    notes: "Moderate stuttering. Working on fluency techniques and confidence building.",
    // IEP Information
    iep: {
      currentIEPDate: "2023-11-20",
      nextIEPDate: "2024-11-20",
      lastIEPDate: "2022-11-18",
      iepTeamMembers: ["Mrs. Garcia (Teacher)", "Dr. Sarah Johnson (SLP)", "James Wilson (School Counselor)", "Parent: Angela Williams"],
      iepGoals: "Fluency improvement, Communication confidence building",
      accommodations: ["Allow extra time for verbal responses", "Reduce pressure for immediate responses", "Alternative communication methods when needed"],
      iepNotes: "Student benefiting from intensive therapy. Continue current frequency and approach."
    },
    // Detailed Assessments
    assessments: [
      {
        id: 1,
        name: "Stuttering Severity Instrument-4 (SSI-4)",
        type: "Fluency Assessment",
        date: "2024-01-08",
        score: "Moderate",
        percentile: "Moderate severity",
        administered: "Dr. Sarah Johnson",
        results: "Moderate stuttering with 8% disfluency rate, primarily sound repetitions",
        recommendations: "Continue intensive therapy 3x/week with focus on easy onset",
        status: "Complete"
      },
      {
        id: 2,
        name: "Overall Assessment of the Speaker's Experience of Stuttering (OASES)",
        type: "Impact Assessment",
        date: "2023-11-15",
        score: "Mild-Moderate",
        percentile: "Mild-Moderate impact",
        administered: "Dr. Sarah Johnson",
        results: "Stuttering having mild to moderate impact on communication and daily activities",
        recommendations: "Include confidence-building activities in therapy",
        status: "Complete"
      }
    ],
    // Progress Monitoring Data
    progressMonitoring: [
      {
        id: 1,
        date: "2024-01-12",
        goal: "Reduce disfluencies",
        activity: "Conversation sample",
        accuracy: "92%", // fluency rate
        notes: "8% disfluency rate, down from 12% last month",
        dataType: "Fluency Percentage",
        trials: 100,
        correct: 92
      },
      {
        id: 2,
        date: "2024-01-10",
        goal: "Easy onset technique",
        activity: "Structured practice",
        accuracy: "75%",
        notes: "Improving with easy onset, still needs prompting",
        dataType: "Percentage Correct",
        trials: 20,
        correct: 15
      },
      {
        id: 3,
        date: "2024-01-08",
        goal: "Breathing techniques",
        activity: "Breathing exercises",
        accuracy: "80%",
        notes: "Good breath support, helping with fluency",
        dataType: "Percentage Correct",
        trials: 15,
        correct: 12
      }
    ],
    // Detailed Goals
    currentGoals: [
      {
        id: 1,
        goal: "Reduce disfluencies to less than 5% in structured activities",
        startDate: "2023-11-20",
        targetDate: "2024-08-20",
        progress: 65,
        status: "In Progress",
        frequency: "3x per week",
        setting: "Individual therapy",
        method: "Fluency shaping techniques and easy onset",
        criteria: "Less than 5% disfluency rate across 3 consecutive sessions",
        notes: "Steady progress, currently at 8% disfluency rate"
      },
      {
        id: 2,
        goal: "Use easy onset technique in conversation",
        startDate: "2023-11-20",
        targetDate: "2024-06-20",
        progress: 70,
        status: "In Progress",
        frequency: "3x per week",
        setting: "Individual therapy",
        method: "Systematic practice from single words to conversation",
        criteria: "Use easy onset independently 80% of the time",
        notes: "Good progress in structured activities, working on generalization"
      }
    ],
    sessionHistory: [
      { date: "2024-01-12", duration: "30 min", focus: "Breathing techniques", progress: "Fair" },
      { date: "2024-01-10", duration: "30 min", focus: "Easy onset", progress: "Good" },
      { date: "2024-01-08", duration: "30 min", focus: "Fluency strategies", progress: "Fair" }
    ]
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    grade: "4th Grade",
    goals: 3,
    progress: 88,
    lastSession: "2024-01-13",
    assessmentScore: 89,
    disorder: "Voice",
    status: "Active",
    birthDate: "2014-06-18",
    parentContact: "Maria Rodriguez - (555) 321-0987",
    email: "maria.rodriguez@email.com",
    teacher: "Ms. Brown",
    therapyFrequency: "2x per week",
    notes: "Voice quality improving with vocal hygiene program. Good compliance with exercises.",
    // IEP Information
    iep: {
      currentIEPDate: "2023-08-30",
      nextIEPDate: "2024-08-30",
      lastIEPDate: "2022-09-05",
      iepTeamMembers: ["Ms. Brown (Teacher)", "Dr. Sarah Johnson (SLP)", "Nurse Patricia Clark", "Parent: Maria Rodriguez"],
      iepGoals: "Voice quality improvement, Vocal hygiene education",
      accommodations: ["Frequent voice breaks", "Access to water throughout day", "Modified speaking assignments"],
      iepNotes: "Excellent progress with voice therapy. Consider reducing frequency to 1x/week soon."
    },
    // Detailed Assessments
    assessments: [
      {
        id: 1,
        name: "CAPE-V (Consensus Auditory-Perceptual Evaluation of Voice)",
        type: "Voice Assessment",
        date: "2024-01-10",
        score: "Mild",
        percentile: "Mild voice disorder",
        administered: "Dr. Sarah Johnson",
        results: "Mild vocal hoarseness, improved from moderate severity 6 months ago",
        recommendations: "Continue voice therapy with focus on vocal hygiene",
        status: "Complete"
      },
      {
        id: 2,
        name: "Voice Handicap Index - Pediatric",
        type: "Impact Assessment",
        date: "2023-08-25",
        score: "Low",
        percentile: "Minimal impact",
        administered: "Dr. Sarah Johnson",
        results: "Voice disorder having minimal impact on daily activities",
        recommendations: "Continue current therapy approach",
        status: "Complete"
      }
    ],
    // Progress Monitoring Data
    progressMonitoring: [
      {
        id: 1,
        date: "2024-01-13",
        goal: "Appropriate vocal volume",
        activity: "Classroom simulation",
        accuracy: "88%",
        notes: "Good volume control, occasional episodes of loud voice",
        dataType: "Percentage Correct",
        trials: 25,
        correct: 22
      },
      {
        id: 2,
        date: "2024-01-11",
        goal: "Proper breathing for voice",
        activity: "Breathing exercises",
        accuracy: "90%",
        notes: "Excellent breath support for voice production",
        dataType: "Percentage Correct",
        trials: 20,
        correct: 18
      },
      {
        id: 3,
        date: "2024-01-09",
        goal: "Vocal hygiene knowledge",
        activity: "Q&A session",
        accuracy: "95%",
        notes: "Excellent understanding of vocal hygiene principles",
        dataType: "Percentage Correct",
        trials: 20,
        correct: 19
      }
    ],
    // Detailed Goals
    currentGoals: [
      {
        id: 1,
        goal: "Maintain appropriate vocal volume in classroom settings",
        startDate: "2023-08-30",
        targetDate: "2024-05-30",
        progress: 88,
        status: "In Progress",
        frequency: "2x per week",
        setting: "Individual therapy",
        method: "Volume monitoring and feedback training",
        criteria: "Appropriate volume 90% of observed intervals",
        notes: "Great progress, nearly ready to meet goal"
      },
      {
        id: 2,
        goal: "Use proper breathing for voice support",
        startDate: "2023-08-30",
        targetDate: "2024-04-30",
        progress: 90,
        status: "Nearly Met",
        frequency: "2x per week",
        setting: "Individual therapy",
        method: "Diaphragmatic breathing training",
        criteria: "Demonstrate proper breathing technique in 90% of trials",
        notes: "Goal nearly achieved, excellent breath support"
      },
      {
        id: 3,
        goal: "Demonstrate vocal hygiene knowledge",
        startDate: "2023-08-30",
        targetDate: "2024-02-28",
        progress: 95,
        status: "Met",
        frequency: "2x per week",
        setting: "Individual therapy",
        method: "Education and practice of vocal hygiene strategies",
        criteria: "Score 90% or higher on vocal hygiene quiz",
        notes: "Goal achieved! Student demonstrates excellent understanding"
      }
    ],
    sessionHistory: [
      { date: "2024-01-13", duration: "30 min", focus: "Vocal exercises", progress: "Good" },
      { date: "2024-01-11", duration: "30 min", focus: "Breathing techniques", progress: "Excellent" },
      { date: "2024-01-09", duration: "30 min", focus: "Volume control", progress: "Good" }
    ]
  }
];

// Mock scheduling data
const mockSchedule = [
  {
    id: 1,
    studentId: 1,
    studentName: "Alex Johnson",
    date: "2024-01-16",
    time: "09:00",
    duration: 30,
    type: "Individual Therapy",
    notes: "Focus on /r/ in conversation",
    completed: false
  },
  {
    id: 2,
    studentId: 3,
    studentName: "Marcus Williams",
    date: "2024-01-16",
    time: "09:45",
    duration: 30,
    type: "Individual Therapy",
    notes: "Fluency techniques practice",
    completed: false
  },
  {
    id: 3,
    studentId: 2,
    studentName: "Sarah Chen",
    date: "2024-01-16",
    time: "10:30",
    duration: 45,
    type: "Individual Therapy",
    notes: "Advanced narrative skills",
    completed: false
  },
  {
    id: 4,
    studentId: 4,
    studentName: "Emma Rodriguez",
    date: "2024-01-16",
    time: "11:30",
    duration: 30,
    type: "Individual Therapy",
    notes: "Voice exercises and breathing",
    completed: false
  },
  {
    id: 5,
    studentId: 1,
    studentName: "Alex Johnson",
    date: "2024-01-17",
    time: "10:00",
    duration: 30,
    type: "Individual Therapy",
    notes: "/r/ articulation practice",
    completed: false
  },
  {
    id: 6,
    studentId: 3,
    studentName: "Marcus Williams",
    date: "2024-01-17",
    time: "14:00",
    duration: 30,
    type: "Individual Therapy",
    notes: "Easy onset techniques",
    completed: false
  },
  {
    id: 7,
    studentId: 4,
    studentName: "Emma Rodriguez",
    date: "2024-01-18",
    time: "09:30",
    duration: 30,
    type: "Individual Therapy",
    notes: "Vocal hygiene review",
    completed: false
  },
  {
    id: 8,
    studentId: 2,
    studentName: "Sarah Chen",
    date: "2024-01-19",
    time: "11:00",
    duration: 45,
    type: "Individual Therapy",
    notes: "Story retelling assessment",
    completed: false
  }
];

const mockAssessments = [
  {
    id: 1,
    name: "Articulation Assessment",
    type: "Present Level",
    duration: "30 minutes",
    aiEnabled: true,
    description: "AI-powered assessment for speech sound production"
  },
  {
    id: 2,
    name: "Language Comprehension",
    type: "Progress Monitoring",
    duration: "25 minutes",
    aiEnabled: true,
    description: "Evaluate understanding of complex language structures"
  },
  {
    id: 3,
    name: "Fluency Evaluation",
    type: "Diagnostic",
    duration: "40 minutes",
    aiEnabled: false,
    description: "Comprehensive stuttering and fluency assessment"
  }
];

const mockGoals = [
  {
    id: 1,
    studentName: "Alex Johnson",
    goal: "Improve /r/ sound production in conversational speech",
    progress: 78,
    targetDate: "2024-06-30",
    sessions: 12,
    aiSuggested: true
  },
  {
    id: 2,
    studentName: "Sarah Chen",
    goal: "Increase MLU (Mean Length of Utterance) to 6+ words",
    progress: 92,
    targetDate: "2024-05-15",
    sessions: 8,
    aiSuggested: true
  },
  {
    id: 3,
    studentName: "Marcus Williams",
    goal: "Reduce disfluencies to less than 5% in structured activities",
    progress: 65,
    targetDate: "2024-07-20",
    sessions: 15,
    aiSuggested: false
  }
];

// Navigation Component
const Navigation = ({ currentUser, setIsAuthenticated }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="bg-slate-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-white text-xl font-bold">Achieve</span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </Link>
              <Link to="/schedule" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Schedule
              </Link>
              <Link to="/assessments" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Assessments
              </Link>
              <Link to="/progress" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Progress
              </Link>
              <Link to="/goals" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Goals
              </Link>
              <Link to="/ai-tools" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                AI Tools
              </Link>
              <Link to="/caseload" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Caseload
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 text-sm">Welcome, {currentUser?.name || 'SLP'}</span>
            <button
              onClick={handleLogout}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Login Page Component
const LoginPage = ({ setIsAuthenticated, setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setCurrentUser({ 
        name: 'Dr. Sarah Johnson', 
        email: email,
        role: 'Speech-Language Pathologist',
        caseload: 24
      });
      setIsAuthenticated(true);
      navigate('/dashboard');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">A</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Achieve</h2>
          <p className="text-gray-300 text-lg">Advanced SLP Toolkit with AI</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Sign in to your account</h3>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary relative"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center space-y-2">
            <Link to="#" className="text-orange-500 hover:text-orange-600 text-sm">
              Forgot your password?
            </Link>
            <div className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-orange-500 hover:text-orange-600 font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Signup Page Component
const SignupPage = ({ setIsAuthenticated, setCurrentUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    license: '',
    facility: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setCurrentUser({ 
        name: formData.name, 
        email: formData.email,
        role: 'Speech-Language Pathologist',
        caseload: 0
      });
      setIsAuthenticated(true);
      navigate('/dashboard');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">A</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Join Achieve</h2>
          <p className="text-gray-300 text-lg">Start your AI-powered SLP journey</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Create your account</h3>
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Dr. Jane Smith"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="jane@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
              <input
                type="text"
                name="license"
                value={formData.license}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="SLP License #"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facility/School</label>
              <input
                type="text"
                name="facility"
                value={formData.facility}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Lincoln Elementary School"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Create a secure password"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Confirm your password"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary relative mt-6"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <div className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ currentUser, setIsAuthenticated }) => {
  const [stats, setStats] = useState({
    totalStudents: 24,
    activeGoals: 78,
    completedAssessments: 156,
    avgProgress: 82
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentUser={currentUser} setIsAuthenticated={setIsAuthenticated} />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Welcome back, {currentUser?.name}
          </h1>
          <p className="text-gray-600">Here's what's happening with your caseload today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card-hover bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-slate-800">{stats.totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">👥</span>
              </div>
            </div>
          </div>

          <div className="card-hover bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Goals</p>
                <p className="text-3xl font-bold text-slate-800">{stats.activeGoals}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">🎯</span>
              </div>
            </div>
          </div>

          <div className="card-hover bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Assessments</p>
                <p className="text-3xl font-bold text-slate-800">{stats.completedAssessments}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">📊</span>
              </div>
            </div>
          </div>

          <div className="card-hover bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                <p className="text-3xl font-bold text-slate-800">{stats.avgProgress}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 text-xl">📈</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Students */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Recent Students</h3>
            <div className="space-y-4">
              {mockStudents.slice(0, 4).map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Link to={`/student/${student.id}`} className="hover:text-orange-600">
                      <h4 className="font-semibold text-slate-800 hover:text-orange-600 cursor-pointer">
                        {student.name}
                      </h4>
                    </Link>
                    <p className="text-sm text-gray-600">{student.grade} • {student.disorder}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-800">{student.progress}% Progress</p>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-slate-800 mb-4">AI Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-800">Recommended Action</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Alex Johnson would benefit from increased /r/ practice sessions. Consider adding 2 more weekly sessions.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-800">Progress Alert</h4>
                <p className="text-sm text-green-700 mt-1">
                  Sarah Chen is exceeding expectations. Consider advancing to next goal level.
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-800">Attention Needed</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Marcus Williams hasn't shown progress in 2 weeks. Review current strategies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/assessments" className="btn-primary text-center">
              New Assessment
            </Link>
            <Link to="/goals" className="btn-secondary text-center">
              Create Goal
            </Link>
            <Link to="/ai-tools" className="btn-outline text-center">
              AI Analysis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Assessments Page Component
const AssessmentsPage = ({ currentUser }) => {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [showNewAssessment, setShowNewAssessment] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentUser={currentUser} />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Assessments</h1>
          <p className="text-gray-600">AI-powered assessment tools for comprehensive evaluation.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Assessment List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">Available Assessments</h3>
                <button 
                  onClick={() => setShowNewAssessment(true)}
                  className="btn-primary"
                >
                  New Assessment
                </button>
              </div>
              
              <div className="space-y-4">
                {mockAssessments.map((assessment) => (
                  <div 
                    key={assessment.id} 
                    className="card-hover p-6 border border-gray-200 rounded-lg cursor-pointer"
                    onClick={() => setSelectedAssessment(assessment)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 mb-2">{assessment.name}</h4>
                        <p className="text-gray-600 text-sm mb-3">{assessment.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {assessment.type}
                          </span>
                          <span className="text-gray-500">{assessment.duration}</span>
                          {assessment.aiEnabled && (
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
                              AI Enhanced
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="btn-outline text-sm">
                        Start Assessment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Assessment Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Assessment Details</h3>
              
              {selectedAssessment ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-800">{selectedAssessment.name}</h4>
                    <p className="text-gray-600 text-sm mt-1">{selectedAssessment.description}</p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{selectedAssessment.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{selectedAssessment.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">AI Enhanced:</span>
                        <span className="font-medium">
                          {selectedAssessment.aiEnabled ? '✅ Yes' : '❌ No'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h5 className="font-semibold text-slate-800 mb-2">AI Features:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Automatic scoring</li>
                      <li>• Real-time analysis</li>
                      <li>• Progress prediction</li>
                      <li>• Recommendation engine</li>
                    </ul>
                  </div>
                  
                  <button className="w-full btn-primary">
                    Begin Assessment
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Select an assessment to view details
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Progress Page Component
const ProgressPage = ({ currentUser }) => {
  const [selectedStudent, setSelectedStudent] = useState(mockStudents[0]);
  const [timeframe, setTimeframe] = useState('3months');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentUser={currentUser} />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Progress Monitoring</h1>
          <p className="text-gray-600">Track student progress with AI-powered insights and analytics.</p>
        </div>

        {/* Student Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-800">Select Student</h3>
            <select 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockStudents.map((student) => (
              <div 
                key={student.id}
                className={`card-hover p-4 border-2 rounded-lg cursor-pointer ${
                  selectedStudent.id === student.id 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedStudent(student)}
              >
                <h4 className="font-semibold text-slate-800">{student.name}</h4>
                <p className="text-sm text-gray-600">{student.grade}</p>
                <div className="mt-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{student.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-orange-500 h-2 rounded-full progress-bar" 
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              Progress Chart - {selectedStudent.name}
            </h3>
            
            {/* Mock Chart */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-4xl mb-2">📈</div>
                <p className="text-gray-600">Progress visualization would appear here</p>
                <p className="text-sm text-gray-500">Showing {selectedStudent.progress}% improvement</p>
              </div>
            </div>
            
            {/* AI Analysis */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">AI Analysis</h4>
              <p className="text-blue-700 text-sm">
                {selectedStudent.name} is showing consistent improvement in {selectedStudent.disorder.toLowerCase()} skills. 
                The current trajectory suggests goal completion by the target date. 
                Consider introducing more challenging activities to maintain progress momentum.
              </p>
            </div>
          </div>

          {/* Progress Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Progress Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Overall Progress</span>
                  <span className="font-bold text-slate-800">{selectedStudent.progress}%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Goals</span>
                  <span className="font-bold text-slate-800">{selectedStudent.goals}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Assessment</span>
                  <span className="font-bold text-slate-800">{selectedStudent.assessmentScore}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Session</span>
                  <span className="font-bold text-slate-800">{selectedStudent.lastSession}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full btn-primary">
                  Generate Report
                </button>
                <button className="w-full btn-secondary">
                  Schedule Session
                </button>
                <button className="w-full btn-outline">
                  Update Goals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Goals Page Component
const GoalsPage = ({ currentUser }) => {
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentUser={currentUser} />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Goal Management</h1>
          <p className="text-gray-600">Create, track, and manage student goals with AI assistance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Goals List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">Active Goals</h3>
                <button 
                  onClick={() => setShowNewGoal(true)}
                  className="btn-primary"
                >
                  New Goal
                </button>
              </div>
              
              <div className="space-y-4">
                {mockGoals.map((goal) => (
                  <div 
                    key={goal.id} 
                    className="card-hover p-6 border border-gray-200 rounded-lg cursor-pointer"
                    onClick={() => setSelectedGoal(goal)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-slate-800">{goal.studentName}</h4>
                          {goal.aiSuggested && (
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                              AI Suggested
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{goal.goal}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-gray-500">Target: {goal.targetDate}</span>
                          <span className="text-gray-500">Sessions: {goal.sessions}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full progress-bar" 
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Goal Details & AI Recommendations */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Goal Details</h3>
              
              {selectedGoal ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-800">{selectedGoal.studentName}</h4>
                    <p className="text-gray-600 text-sm mt-1">{selectedGoal.goal}</p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Progress:</span>
                        <span className="font-medium">{selectedGoal.progress}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Target Date:</span>
                        <span className="font-medium">{selectedGoal.targetDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sessions:</span>
                        <span className="font-medium">{selectedGoal.sessions}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button className="w-full btn-primary text-sm">
                      Update Progress
                    </button>
                    <button className="w-full btn-outline text-sm">
                      Edit Goal
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Select a goal to view details
                </p>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4">AI Recommendations</h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-800 text-sm">Suggested Goal</h4>
                  <p className="text-purple-700 text-xs mt-1">
                    Add phonological awareness goal for Emma Rodriguez
                  </p>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 text-sm">Strategy Update</h4>
                  <p className="text-blue-700 text-xs mt-1">
                    Consider visual cues for Alex's /r/ goal
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 text-sm">Ready to Advance</h4>
                  <p className="text-green-700 text-xs mt-1">
                    Sarah Chen ready for next complexity level
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// AI Tools Page Component
const AIToolsPage = ({ currentUser }) => {
  const [selectedTool, setSelectedTool] = useState('speechAnalysis');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const tools = [
    {
      id: 'speechAnalysis',
      name: 'Speech Analysis',
      description: 'AI-powered speech pattern analysis and recommendations',
      icon: '🎤'
    },
    {
      id: 'goalGenerator',
      name: 'Smart Goal Generator',
      description: 'Generate SMART goals based on assessment data',
      icon: '🎯'
    },
    {
      id: 'progressPredictor',
      name: 'Progress Predictor',
      description: 'Predict student outcomes using machine learning',
      icon: '🔮'
    },
    {
      id: 'activitySuggester',
      name: 'Activity Suggester',
      description: 'Get personalized therapy activity recommendations',
      icon: '🎲'
    }
  ];

  const handleAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentUser={currentUser} />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">AI Tools</h1>
          <p className="text-gray-600">Advanced AI-powered tools to enhance your speech therapy practice.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tool Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Available Tools</h3>
              
              <div className="space-y-3">
                {tools.map((tool) => (
                  <div 
                    key={tool.id}
                    className={`card-hover p-4 border-2 rounded-lg cursor-pointer ${
                      selectedTool === tool.id 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedTool(tool.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{tool.icon}</span>
                      <div>
                        <h4 className="font-semibold text-slate-800">{tool.name}</h4>
                        <p className="text-xs text-gray-600">{tool.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tool Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              {selectedTool === 'speechAnalysis' && (
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">🎤 Speech Analysis</h3>
                  
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <div className="mb-4">
                        <span className="text-4xl">🎵</span>
                      </div>
                      <h4 className="font-semibold text-slate-800 mb-2">Upload Audio Sample</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        Upload a speech sample for AI analysis
                      </p>
                      <button className="btn-primary">
                        Choose Audio File
                      </button>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-800 mb-2">Analysis Results</h4>
                      {isAnalyzing ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="loading-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mr-3"></div>
                          <span>Analyzing speech patterns...</span>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Articulation Accuracy:</span>
                            <span className="font-medium">78%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fluency Rate:</span>
                            <span className="font-medium">Good</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Voice Quality:</span>
                            <span className="font-medium">Normal</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <button 
                      onClick={handleAnalysis}
                      className="w-full btn-secondary"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
                    </button>
                  </div>
                </div>
              )}

              {selectedTool === 'goalGenerator' && (
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">🎯 Smart Goal Generator</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Student
                      </label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                        <option>Alex Johnson</option>
                        <option>Sarah Chen</option>
                        <option>Marcus Williams</option>
                        <option>Emma Rodriguez</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Area
                      </label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                        <option>Articulation</option>
                        <option>Language</option>
                        <option>Fluency</option>
                        <option>Voice</option>
                      </select>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">AI-Generated Goal Suggestion</h4>
                      <p className="text-blue-700 text-sm">
                        "Student will produce /r/ sound in initial position of words with 80% accuracy 
                        across 3 consecutive therapy sessions as measured by clinician observation."
                      </p>
                    </div>
                    
                    <button className="w-full btn-primary">
                      Generate New Goal
                    </button>
                  </div>
                </div>
              )}

              {selectedTool === 'progressPredictor' && (
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">🔮 Progress Predictor</h3>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Student
                        </label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                          <option>Alex Johnson</option>
                          <option>Sarah Chen</option>
                          <option>Marcus Williams</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prediction Timeline
                        </label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                          <option>3 months</option>
                          <option>6 months</option>
                          <option>1 year</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Prediction Results</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Expected Progress:</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Goal Completion:</span>
                          <span className="font-medium">On Track</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Confidence Level:</span>
                          <span className="font-medium">High (92%)</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full btn-primary">
                      Generate Prediction
                    </button>
                  </div>
                </div>
              )}

              {selectedTool === 'activitySuggester' && (
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">🎲 Activity Suggester</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Target Skill
                        </label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                          <option>Articulation - /r/</option>
                          <option>Language - MLU</option>
                          <option>Fluency - Stuttering</option>
                          <option>Voice - Resonance</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Student Age
                        </label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                          <option>5-7 years</option>
                          <option>8-10 years</option>
                          <option>11-13 years</option>
                          <option>14+ years</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-800 mb-2">Suggested Activity 1</h4>
                        <p className="text-purple-700 text-sm">
                          "Race Car Rally" - Practice /r/ sounds using toy cars and race track vocabulary
                        </p>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-800 mb-2">Suggested Activity 2</h4>
                        <p className="text-purple-700 text-sm">
                          "Restaurant Role Play" - Use restaurant scenarios to practice /r/ in conversational speech
                        </p>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-800 mb-2">Suggested Activity 3</h4>
                        <p className="text-purple-700 text-sm">
                          "Robot Commands" - Give robot instructions using /r/ words for articulation practice
                        </p>
                      </div>
                    </div>
                    
                    <button className="w-full btn-primary">
                      Get More Suggestions
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Caseload Page Component
const CaseloadPage = ({ currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.disorder.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentUser={currentUser} />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Caseload Management</h1>
          <p className="text-gray-600">Manage your entire student caseload in one place.</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Search students..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="name">Name</option>
                <option value="progress">Progress</option>
                <option value="lastSession">Last Session</option>
                <option value="grade">Grade</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button className="w-full btn-primary">
                Add Student
              </button>
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-slate-800">
              Students ({filteredStudents.length})
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <div key={student.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    
                    <div>
                      <Link to={`/student/${student.id}`} className="hover:text-orange-600">
                        <h4 className="font-semibold text-slate-800 hover:text-orange-600 cursor-pointer">
                          {student.name}
                        </h4>
                      </Link>
                      <p className="text-sm text-gray-600">{student.grade} • {student.disorder}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Goals</p>
                      <p className="font-bold text-slate-800">{student.goals}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Progress</p>
                      <p className="font-bold text-slate-800">{student.progress}%</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Last Session</p>
                      <p className="font-bold text-slate-800">{student.lastSession}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link to={`/student/${student.id}`} className="btn-primary text-sm">
                        View
                      </Link>
                      <button className="btn-outline text-sm">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full progress-bar" 
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Schedule Page Component
const SchedulePage = ({ currentUser }) => {
  const [viewMode, setViewMode] = useState('weekly');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showNewAppointment, setShowNewAppointment] = useState(false);

  // Helper function to get date range for weekly view
  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    startOfWeek.setDate(diff);
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day.toISOString().split('T')[0]);
    }
    return weekDays;
  };

  const weekDays = getWeekDays(selectedDate);
  
  // Filter appointments for the current view
  const getAppointmentsForDate = (date) => {
    return mockSchedule.filter(apt => apt.date === date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentUser={currentUser} />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Schedule</h1>
          <p className="text-gray-600">Manage your therapy appointments and sessions.</p>
        </div>

        {/* Schedule Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('daily')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'daily' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setViewMode('weekly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'weekly' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setViewMode('monthly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'monthly' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Monthly
                </button>
              </div>
              
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            
            <button 
              onClick={() => setShowNewAppointment(true)}
              className="btn-primary"
            >
              New Appointment
            </button>
          </div>
        </div>

        {/* Weekly View */}
        {viewMode === 'weekly' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="grid grid-cols-7 border-b border-gray-200">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className="p-4 text-center border-r border-gray-200 last:border-r-0">
                  <div className="font-semibold text-slate-800">{day}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {new Date(weekDays[index]).getDate()}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 min-h-96">
              {weekDays.map((date, index) => {
                const dayAppointments = getAppointmentsForDate(date);
                return (
                  <div key={date} className="border-r border-gray-200 last:border-r-0 p-2">
                    <div className="space-y-2">
                      {dayAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="bg-orange-100 border-l-4 border-orange-500 p-2 rounded text-xs cursor-pointer hover:bg-orange-200 transition-colors"
                        >
                          <div className="font-semibold text-orange-800">
                            {appointment.time}
                          </div>
                          <Link 
                            to={`/student/${appointment.studentId}`}
                            className="text-orange-700 hover:text-orange-900"
                          >
                            {appointment.studentName}
                          </Link>
                          <div className="text-orange-600 mt-1">
                            {appointment.duration}min
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Daily View */}
        {viewMode === 'daily' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              Schedule for {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            
            <div className="space-y-4">
              {getAppointmentsForDate(selectedDate).length > 0 ? (
                getAppointmentsForDate(selectedDate).map((appointment) => (
                  <div key={appointment.id} className="card-hover p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {appointment.time}
                          </span>
                        </div>
                        <div>
                          <Link 
                            to={`/student/${appointment.studentId}`}
                            className="font-semibold text-slate-800 hover:text-orange-600 cursor-pointer"
                          >
                            {appointment.studentName}
                          </Link>
                          <p className="text-sm text-gray-600">{appointment.type} • {appointment.duration} minutes</p>
                          <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="btn-primary text-sm">Start Session</button>
                        <button className="btn-outline text-sm">Edit</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📅</div>
                  <p className="text-gray-500">No appointments scheduled for this date</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Monthly View */}
        {viewMode === 'monthly' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Monthly Overview</h3>
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🗓️</div>
              <p className="text-gray-500">Monthly calendar view coming soon</p>
              <p className="text-sm text-gray-400 mt-2">Use weekly or daily view for detailed scheduling</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Student Profile Page Component
const StudentProfilePage = ({ currentUser }) => {
  const { studentId } = useParams();
  const student = mockStudents.find(s => s.id === parseInt(studentId));
  const [activeTab, setActiveTab] = useState('overview');

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation currentUser={currentUser} />
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800">Student not found</h1>
            <Link to="/caseload" className="text-orange-500 hover:text-orange-600 mt-4 inline-block">
              Return to Caseload
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentUser={currentUser} />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Student Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">{student.name}</h1>
                <p className="text-gray-600 text-lg">{student.grade} • {student.disorder}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    student.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {student.status}
                  </span>
                  <span className="text-sm text-gray-500">Progress: {student.progress}%</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="btn-primary">Schedule Session</button>
              <button className="btn-secondary">New Assessment</button>
              <button className="btn-outline">Edit Profile</button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'iep', name: 'IEP Information' },
                { id: 'assessments', name: 'Assessments' },
                { id: 'progress-monitoring', name: 'Progress Monitoring' },
                { id: 'goals', name: 'Goals' },
                { id: 'sessions', name: 'Session History' },
                { id: 'notes', name: 'Notes' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Basic Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Birth Date:</span>
                        <span className="font-medium">{student.birthDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Grade:</span>
                        <span className="font-medium">{student.grade}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Teacher:</span>
                        <span className="font-medium">{student.teacher}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Therapy Frequency:</span>
                        <span className="font-medium">{student.therapyFrequency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-600 block">Parent/Guardian:</span>
                        <span className="font-medium">{student.parentContact}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 block">Email:</span>
                        <span className="font-medium">{student.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Progress Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{student.progress}%</div>
                      <div className="text-gray-600">Overall Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{student.goals}</div>
                      <div className="text-gray-600">Active Goals</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{student.assessmentScore}</div>
                      <div className="text-gray-600">Last Assessment</div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Clinical Notes</h3>
                  <p className="text-gray-700">{student.notes}</p>
                </div>
              </div>
            )}

            {/* Goals Tab */}
            {activeTab === 'goals' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-800">Current Goals</h3>
                  <button className="btn-primary">Add New Goal</button>
                </div>
                <div className="space-y-4">
                  {student.currentGoals.map((goal, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{goal}</p>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{student.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full progress-bar" 
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <button className="btn-outline text-sm ml-4">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Session History Tab */}
            {activeTab === 'sessions' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-800">Session History</h3>
                  <button className="btn-primary">Add Session Note</button>
                </div>
                <div className="space-y-4">
                  {student.sessionHistory.map((session, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <span className="font-medium text-slate-800">{session.date}</span>
                            <span className="text-gray-600">{session.duration}</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              session.progress === 'Excellent' ? 'bg-green-100 text-green-800' :
                              session.progress === 'Good' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {session.progress}
                            </span>
                          </div>
                          <p className="text-gray-700">Focus: {session.focus}</p>
                        </div>
                        <button className="btn-outline text-sm">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assessments Tab */}
            {activeTab === 'assessments' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-800">Assessment History</h3>
                  <button className="btn-primary">New Assessment</button>
                </div>
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📋</div>
                  <p className="text-gray-500">Assessment history will appear here</p>
                  <p className="text-sm text-gray-400 mt-2">Current assessment score: {student.assessmentScore}</p>
                </div>
              </div>
            )}

            {/* Notes Tab */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-800">Clinical Notes</h3>
                  <button className="btn-primary">Add Note</button>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 whitespace-pre-line">{student.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export all components
const Components = {
  LoginPage,
  SignupPage,
  Dashboard,
  AssessmentsPage,
  ProgressPage,
  GoalsPage,
  AIToolsPage,
  CaseloadPage,
  SchedulePage,
  StudentProfilePage,
  Navigation
};

export default Components;