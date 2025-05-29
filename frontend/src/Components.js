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
  },
  {
    id: 5,
    name: "Liam Parker",
    grade: "1st Grade",
    goals: 2,
    progress: 72,
    lastSession: "2024-12-18",
    assessmentScore: 78,
    disorder: "Articulation",
    status: "Active",
    birthDate: "2017-04-10",
    parentContact: "Jennifer Parker - (555) 234-5678",
    email: "jennifer.parker@email.com",
    teacher: "Mrs. Smith",
    therapyFrequency: "2x per week",
    notes: "Working on /s/ and /z/ sounds. Good motivation with games.",
    iep: {
      currentIEPDate: "2024-02-15",
      nextIEPDate: "2025-02-15",
      lastIEPDate: "2023-02-20",
      iepTeamMembers: ["Mrs. Smith (Teacher)", "Dr. Sarah Johnson (SLP)", "Parent: Jennifer Parker"],
      iepGoals: "Articulation improvement for /s/ and /z/ sounds",
      accommodations: ["Visual cues", "Extra practice time"],
      iepNotes: "Student responding well to therapy interventions."
    },
    assessments: [],
    progressMonitoring: [],
    currentGoals: [
      {
        id: 1,
        goal: "Produce /s/ sound in initial position with 80% accuracy",
        startDate: "2024-02-15",
        targetDate: "2024-12-15",
        progress: 72,
        status: "In Progress",
        frequency: "2x per week",
        setting: "Small group therapy",
        method: "Traditional articulation therapy",
        criteria: "80% accuracy across 3 consecutive sessions",
        notes: "Good progress in group setting"
      }
    ],
    sessionHistory: []
  },
  {
    id: 6,
    name: "Olivia Martinez",
    grade: "2nd Grade", 
    goals: 3,
    progress: 84,
    lastSession: "2024-12-18",
    assessmentScore: 87,
    disorder: "Language",
    status: "Active",
    birthDate: "2016-09-22",
    parentContact: "Carlos Martinez - (555) 345-6789",
    email: "carlos.martinez@email.com",
    teacher: "Mrs. Garcia",
    therapyFrequency: "2x per week",
    notes: "Excellent progress in vocabulary and sentence structure.",
    iep: {
      currentIEPDate: "2024-01-10",
      nextIEPDate: "2025-01-10",
      lastIEPDate: "2023-01-15",
      iepTeamMembers: ["Mrs. Garcia (Teacher)", "Dr. Sarah Johnson (SLP)", "Parent: Carlos Martinez"],
      iepGoals: "Language development and vocabulary expansion",
      accommodations: ["Picture supports", "Extended time"],
      iepNotes: "Making excellent progress toward language goals."
    },
    assessments: [],
    progressMonitoring: [],
    currentGoals: [
      {
        id: 1,
        goal: "Use descriptive words in sentences",
        startDate: "2024-01-10",
        targetDate: "2024-11-10",
        progress: 84,
        status: "In Progress",
        frequency: "2x per week",
        setting: "Small group therapy",
        method: "Language stimulation activities",
        criteria: "Use 3+ descriptive words per sentence",
        notes: "Loves group activities and peer interaction"
      }
    ],
    sessionHistory: []
  },
  {
    id: 7,
    name: "Noah Thompson",
    grade: "3rd Grade",
    goals: 2,
    progress: 69,
    lastSession: "2024-12-18",
    assessmentScore: 75,
    disorder: "Articulation",
    status: "Active",
    birthDate: "2015-11-03",
    parentContact: "Lisa Thompson - (555) 456-7890",
    email: "lisa.thompson@email.com", 
    teacher: "Ms. Rodriguez",
    therapyFrequency: "2x per week",
    notes: "Working on /r/ blends. Benefits from group practice.",
    iep: {
      currentIEPDate: "2024-03-05",
      nextIEPDate: "2025-03-05",
      lastIEPDate: "2023-03-10",
      iepTeamMembers: ["Ms. Rodriguez (Teacher)", "Dr. Sarah Johnson (SLP)", "Parent: Lisa Thompson"],
      iepGoals: "Articulation improvement for /r/ blends",
      accommodations: ["Peer models", "Group practice"],
      iepNotes: "Works well in group therapy setting."
    },
    assessments: [],
    progressMonitoring: [],
    currentGoals: [
      {
        id: 1,
        goal: "Produce /r/ blends in words with 75% accuracy",
        startDate: "2024-03-05",
        targetDate: "2025-01-05",
        progress: 69,
        status: "In Progress",
        frequency: "2x per week",
        setting: "Small group therapy",
        method: "Drill practice with peers",
        criteria: "75% accuracy in structured activities",
        notes: "Motivated by group competition"
      }
    ],
    sessionHistory: []
  },
  {
    id: 8,
    name: "Ava Wilson",
    grade: "4th Grade",
    goals: 2,
    progress: 91,
    lastSession: "2024-12-18",
    assessmentScore: 92,
    disorder: "Language",
    status: "Active",
    birthDate: "2014-12-15",
    parentContact: "Michael Wilson - (555) 567-8901",
    email: "michael.wilson@email.com",
    teacher: "Ms. Brown",
    therapyFrequency: "1x per week",
    notes: "Nearly ready for dismissal. Excellent group leader.",
    iep: {
      currentIEPDate: "2024-04-20",
      nextIEPDate: "2025-04-20",
      lastIEPDate: "2023-04-25",
      iepTeamMembers: ["Ms. Brown (Teacher)", "Dr. Sarah Johnson (SLP)", "Parent: Michael Wilson"],
      iepGoals: "Advanced language skills and peer modeling",
      accommodations: ["Leadership opportunities", "Peer tutoring"],
      iepNotes: "Consider reducing frequency or dismissal next quarter."
    },
    assessments: [],
    progressMonitoring: [],
    currentGoals: [
      {
        id: 1,
        goal: "Use complex sentences in group discussions",
        startDate: "2024-04-20",
        targetDate: "2024-12-20",
        progress: 91,
        status: "Nearly Met",
        frequency: "1x per week",
        setting: "Small group therapy",
        method: "Group discussion and peer modeling",
        criteria: "Complex sentences 90% of the time",
        notes: "Excellent peer model for other students"
      }
    ],
    sessionHistory: []
  },
  {
    id: 9,
    name: "Ethan Davis",
    grade: "1st Grade",
    goals: 3,
    progress: 58,
    lastSession: "2024-12-18",
    assessmentScore: 65,
    disorder: "Articulation",
    status: "Active",
    birthDate: "2017-07-08",
    parentContact: "Amanda Davis - (555) 678-9012",
    email: "amanda.davis@email.com",
    teacher: "Mrs. Smith",
    therapyFrequency: "3x per week",
    notes: "Multiple sound errors. Benefits from intensive group practice.",
    iep: {
      currentIEPDate: "2024-05-12",
      nextIEPDate: "2025-05-12",
      lastIEPDate: "2023-05-15",
      iepTeamMembers: ["Mrs. Smith (Teacher)", "Dr. Sarah Johnson (SLP)", "Parent: Amanda Davis"],
      iepGoals: "Multiple articulation sound production",
      accommodations: ["Frequent breaks", "Visual supports", "Peer models"],
      iepNotes: "Requires intensive intervention with group support."
    },
    assessments: [],
    progressMonitoring: [],
    currentGoals: [
      {
        id: 1,
        goal: "Produce /p/, /b/, /t/, /d/ sounds correctly",
        startDate: "2024-05-12",
        targetDate: "2025-03-12",
        progress: 58,
        status: "In Progress",
        frequency: "3x per week",
        setting: "Small group therapy",
        method: "Multi-sensory approach with peer models",
        criteria: "70% accuracy across target sounds",
        notes: "Improving slowly but steadily with group support"
      }
    ],
    sessionHistory: []
  },
  {
    id: 10,
    name: "Sophia Brown",
    grade: "5th Grade",
    goals: 2,
    progress: 88,
    lastSession: "2024-12-18",
    assessmentScore: 89,
    disorder: "Language",
    status: "Active",
    birthDate: "2013-05-28",
    parentContact: "Robert Brown - (555) 789-0123",
    email: "robert.brown@email.com",
    teacher: "Mr. Thompson",
    therapyFrequency: "1x per week",
    notes: "Advanced student helping younger peers. Great group dynamics.",
    iep: {
      currentIEPDate: "2024-06-08",
      nextIEPDate: "2025-06-08",
      lastIEPDate: "2023-06-10",
      iepTeamMembers: ["Mr. Thompson (Teacher)", "Dr. Sarah Johnson (SLP)", "Parent: Robert Brown"],
      iepGoals: "Advanced language skills and peer mentoring",
      accommodations: ["Advanced materials", "Peer tutoring opportunities"],
      iepNotes: "Excellent candidate for peer mentoring program."
    },
    assessments: [],
    progressMonitoring: [],
    currentGoals: [
      {
        id: 1,
        goal: "Lead group discussions and help peers",
        startDate: "2024-06-08",
        targetDate: "2024-12-08",
        progress: 88,
        status: "Nearly Met",
        frequency: "1x per week",
        setting: "Small group therapy",
        method: "Peer mentoring and leadership activities",
        criteria: "Successfully lead 80% of group activities",
        notes: "Natural leader, great with younger students"
      }
    ],
    sessionHistory: []
  }
];

// Mock scheduling data with current dates and realistic group sessions
const mockSchedule = [
  // Today's group sessions - Multiple students per time slot
  {
    id: 1,
    studentIds: [1, 5, 7], // Alex Johnson, Liam Parker, Noah Thompson
    studentNames: ["Alex Johnson", "Liam Parker", "Noah Thompson"],
    date: "2024-12-19",
    time: "08:30",
    duration: 30,
    type: "Group Therapy - Articulation",
    notes: "Articulation group: /r/ and /s/ sounds practice",
    completed: false,
    groupSize: 3
  },
  {
    id: 2,
    studentIds: [3, 9], // Marcus Williams, Ethan Davis
    studentNames: ["Marcus Williams", "Ethan Davis"], 
    date: "2024-12-19",
    time: "09:00",
    duration: 30,
    type: "Group Therapy - Mixed",
    notes: "Fluency and articulation mixed group",
    completed: false,
    groupSize: 2
  },
  {
    id: 3,
    studentIds: [2, 6, 10], // Sarah Chen, Olivia Martinez, Sophia Brown
    studentNames: ["Sarah Chen", "Olivia Martinez", "Sophia Brown"],
    date: "2024-12-19",
    time: "10:30",
    duration: 45,
    type: "Group Therapy - Language",
    notes: "Language development group: vocabulary and syntax",
    completed: false,
    groupSize: 3
  },
  {
    id: 4,
    studentIds: [4, 8], // Emma Rodriguez, Ava Wilson
    studentNames: ["Emma Rodriguez", "Ava Wilson"],
    date: "2024-12-19",
    time: "11:30",
    duration: 30,
    type: "Group Therapy - Advanced",
    notes: "Advanced students: voice and leadership skills",
    completed: false,
    groupSize: 2
  },
  {
    id: 5,
    studentIds: [1, 7, 9], // Alex Johnson, Noah Thompson, Ethan Davis
    studentNames: ["Alex Johnson", "Noah Thompson", "Ethan Davis"],
    date: "2024-12-19",
    time: "14:00",
    duration: 30,
    type: "Group Therapy - Articulation",
    notes: "Afternoon articulation group: intensive practice",
    completed: false,
    groupSize: 3
  },
  // Tomorrow's group sessions
  {
    id: 6,
    studentIds: [3, 5, 9], // Marcus Williams, Liam Parker, Ethan Davis
    studentNames: ["Marcus Williams", "Liam Parker", "Ethan Davis"],
    date: "2024-12-20",
    time: "08:00",
    duration: 30,
    type: "Group Therapy - Mixed",
    notes: "Mixed group: fluency and articulation focus",
    completed: false,
    groupSize: 3
  },
  {
    id: 7,
    studentIds: [4, 8, 10], // Emma Rodriguez, Ava Wilson, Sophia Brown
    studentNames: ["Emma Rodriguez", "Ava Wilson", "Sophia Brown"],
    date: "2024-12-20",
    time: "09:30",
    duration: 30,
    type: "Group Therapy - Advanced",
    notes: "Advanced group: peer mentoring and leadership",
    completed: false,
    groupSize: 3
  },
  {
    id: 8,
    studentIds: [2, 6], // Sarah Chen, Olivia Martinez
    studentNames: ["Sarah Chen", "Olivia Martinez"],
    date: "2024-12-20",
    time: "11:00",
    duration: 45,
    type: "Group Therapy - Language",
    notes: "Language group: narrative and complex syntax",
    completed: false,
    groupSize: 2
  },
  {
    id: 9,
    studentIds: [1, 5, 7], // Alex Johnson, Liam Parker, Noah Thompson
    studentNames: ["Alex Johnson", "Liam Parker", "Noah Thompson"],
    date: "2024-12-20",
    time: "13:30",
    duration: 30,
    type: "Group Therapy - Articulation",
    notes: "Articulation group: generalization activities",
    completed: false,
    groupSize: 3
  },
  // Next week group sessions  
  {
    id: 10,
    studentIds: [2, 8, 10], // Sarah Chen, Ava Wilson, Sophia Brown
    studentNames: ["Sarah Chen", "Ava Wilson", "Sophia Brown"],
    date: "2024-12-23",
    time: "09:00",
    duration: 45,
    type: "Group Therapy - Language",
    notes: "Advanced language group: peer teaching",
    completed: false,
    groupSize: 3
  },
  {
    id: 11,
    studentIds: [3, 5, 9], // Marcus Williams, Liam Parker, Ethan Davis
    studentNames: ["Marcus Williams", "Liam Parker", "Ethan Davis"],
    date: "2024-12-23",
    time: "10:15",
    duration: 30,
    type: "Group Therapy - Mixed",
    notes: "Mixed therapy group: fluency and articulation",
    completed: false,
    groupSize: 3
  },
  {
    id: 12,
    studentIds: [4, 6, 7], // Emma Rodriguez, Olivia Martinez, Noah Thompson
    studentNames: ["Emma Rodriguez", "Olivia Martinez", "Noah Thompson"],
    date: "2024-12-23",
    time: "11:00",
    duration: 30,
    type: "Group Therapy - Mixed",
    notes: "Mixed group: voice, language, and articulation",
    completed: false,
    groupSize: 3
  },
  {
    id: 13,
    studentIds: [1, 5, 9], // Alex Johnson, Liam Parker, Ethan Davis
    studentNames: ["Alex Johnson", "Liam Parker", "Ethan Davis"],
    date: "2024-12-24",
    time: "08:30",
    duration: 30,
    type: "Group Therapy - Articulation",
    notes: "Articulation group: /r/ and multiple sounds",
    completed: false,
    groupSize: 3
  },
  {
    id: 14,
    studentIds: [2, 8, 10], // Sarah Chen, Ava Wilson, Sophia Brown  
    studentNames: ["Sarah Chen", "Ava Wilson", "Sophia Brown"],
    date: "2024-12-24",
    time: "10:00",
    duration: 45,
    type: "Group Therapy - Language",
    notes: "Language group: holiday-themed activities",
    completed: false,
    groupSize: 3
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
  const [viewMode, setViewMode] = useState('daily'); // Start with daily view
  const [selectedDate, setSelectedDate] = useState('2024-12-19'); // Default to date with sessions
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

  // Use the selected date for weekly view
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
            <div className="grid grid-cols-8 border-b border-gray-200">
              <div className="p-4 text-center border-r border-gray-200 bg-gray-50">
                <div className="font-semibold text-slate-800">Time</div>
              </div>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className="p-4 text-center border-r border-gray-200 last:border-r-0">
                  <div className="font-semibold text-slate-800">{day}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {new Date(weekDays[index]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Time slots from 8:00 AM to 4:00 PM */}
            {['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'].map((timeSlot) => (
              <div key={timeSlot} className="grid grid-cols-8 border-b border-gray-100 min-h-16">
                <div className="p-3 border-r border-gray-200 bg-gray-50 flex items-center">
                  <span className="text-sm font-medium text-gray-700">{timeSlot}</span>
                </div>
                {weekDays.map((date, dayIndex) => {
                  const dayAppointments = getAppointmentsForDate(date).filter(apt => apt.time === timeSlot);
                  return (
                    <div key={`${date}-${timeSlot}`} className="border-r border-gray-200 last:border-r-0 p-2 relative">
                      {dayAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="bg-gradient-accent text-white rounded-lg p-2 text-xs cursor-pointer hover:opacity-90 transition-opacity mb-1"
                        >
                          <div className="font-semibold mb-1">
                            {appointment.studentNames ? (
                              <div>
                                <div className="text-xs opacity-90">Group of {appointment.groupSize}</div>
                                <div className="font-bold">{appointment.studentNames.slice(0, 2).join(', ')}</div>
                                {appointment.studentNames.length > 2 && (
                                  <div className="text-xs">+{appointment.studentNames.length - 2} more</div>
                                )}
                              </div>
                            ) : (
                              appointment.studentName
                            )}
                          </div>
                          <div className="text-xs opacity-90 mb-2">
                            {appointment.time} - {appointment.duration}min
                          </div>
                          <Link
                            to={`/session/${appointment.id}`}
                            className="inline-block w-full text-center py-1 bg-white bg-opacity-20 text-white text-xs rounded hover:bg-opacity-30 transition-colors"
                          >
                            Go To Session
                          </Link>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
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
            
            <div className="space-y-3">
              {getAppointmentsForDate(selectedDate).length > 0 ? (
                getAppointmentsForDate(selectedDate)
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((appointment) => (
                  <div key={appointment.id} className="card-hover p-6 border-2 border-gray-200 rounded-lg bg-gradient-to-r from-orange-50 to-blue-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {appointment.time}
                          </span>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-slate-800 mb-2">
                            {appointment.studentNames ? appointment.studentNames.join(', ') : appointment.studentName}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {appointment.type} • {appointment.duration} minutes
                            {appointment.groupSize && (
                              <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                Group of {appointment.groupSize}
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-gray-700 mt-1 font-medium">
                            📝 {appointment.notes}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            🕐 {appointment.time} - {
                              new Date(`2024-01-01 ${appointment.time}`).getTime() + (appointment.duration * 60000) > 0 
                                ? new Date(new Date(`2024-01-01 ${appointment.time}`).getTime() + (appointment.duration * 60000)).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
                                : 'End time'
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <Link to={`/session/${appointment.id}`} className="btn-primary">
                          Go To Session
                        </Link>
                        <button className="btn-outline text-sm">Edit</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📅</div>
                  <p className="text-gray-500 text-lg">No appointments scheduled for this date</p>
                  <p className="text-sm text-gray-400 mt-2">Try selecting December 19-24, 2024 to see scheduled sessions</p>
                  <button className="btn-primary mt-4">
                    Schedule New Session
                  </button>
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

            {/* IEP Information Tab */}
            {activeTab === 'iep' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* IEP Dates */}
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-800 mb-4">📅 IEP Dates</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Current IEP Date:</span>
                        <span className="font-medium text-blue-900">{student.iep.currentIEPDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Next IEP Date:</span>
                        <span className="font-medium text-blue-900">{student.iep.nextIEPDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Last IEP Date:</span>
                        <span className="font-medium text-blue-900">{student.iep.lastIEPDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* IEP Goals */}
                  <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">🎯 IEP Goals</h3>
                    <p className="text-green-700">{student.iep.iepGoals}</p>
                  </div>
                </div>

                {/* IEP Team Members */}
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4">👥 IEP Team Members</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {student.iep.iepTeamMembers.map((member, index) => (
                      <div key={index} className="text-purple-700">• {member}</div>
                    ))}
                  </div>
                </div>

                {/* Accommodations */}
                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-4">🛠️ Accommodations</h3>
                  <div className="space-y-2">
                    {student.iep.accommodations.map((accommodation, index) => (
                      <div key={index} className="text-yellow-700">• {accommodation}</div>
                    ))}
                  </div>
                </div>

                {/* IEP Notes */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">📝 IEP Notes</h3>
                  <p className="text-gray-700">{student.iep.iepNotes}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button className="btn-primary">Schedule IEP Meeting</button>
                  <button className="btn-secondary">Generate IEP Report</button>
                  <button className="btn-outline">Edit IEP Information</button>
                </div>
              </div>
            )}

            {/* Assessments Tab */}
            {activeTab === 'assessments' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-slate-800">Assessment History</h3>
                  <button className="btn-primary">New Assessment</button>
                </div>
                
                <div className="space-y-4">
                  {student.assessments.map((assessment) => (
                    <div key={assessment.id} className="bg-white border border-gray-200 rounded-lg p-6 card-hover">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-slate-800 mb-2">{assessment.name}</h4>
                          <div className="flex items-center space-x-4 mb-3">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {assessment.type}
                            </span>
                            <span className="text-gray-600 text-sm">{assessment.date}</span>
                            <span className={`px-2 py-1 rounded text-sm ${
                              assessment.status === 'Complete' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {assessment.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-slate-800">{assessment.score}</div>
                          <div className="text-sm text-gray-600">{assessment.percentile}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h5 className="font-medium text-slate-800 mb-1">Results:</h5>
                          <p className="text-gray-700 text-sm">{assessment.results}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-slate-800 mb-1">Recommendations:</h5>
                          <p className="text-gray-700 text-sm">{assessment.recommendations}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Administered by: {assessment.administered}</span>
                        <div className="space-x-2">
                          <button className="btn-outline text-xs">View Report</button>
                          <button className="btn-outline text-xs">Print</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Progress Monitoring Tab */}
            {activeTab === 'progress-monitoring' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-slate-800">Progress Monitoring Data</h3>
                  <button className="btn-primary">Add Data Point</button>
                </div>

                {/* Progress Chart Placeholder */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Progress Chart</h4>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📈</div>
                      <p className="text-gray-600">Progress visualization chart would appear here</p>
                      <p className="text-sm text-gray-500 mt-1">Showing improvement trend over time</p>
                    </div>
                  </div>
                </div>

                {/* Progress Data Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h4 className="text-lg font-semibold text-slate-800">Data Collection</h4>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Goal</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trials</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {student.progressMonitoring.map((data) => (
                          <tr key={data.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {data.date}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {data.goal}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {data.activity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                parseInt(data.accuracy) >= 80 
                                  ? 'bg-green-100 text-green-800'
                                  : parseInt(data.accuracy) >= 60
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {data.accuracy}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {data.correct}/{data.trials}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {data.notes}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Goals Tab */}
            {activeTab === 'goals' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-slate-800">Current Goals</h3>
                  <button className="btn-primary">Add New Goal</button>
                </div>
                
                <div className="space-y-6">
                  {student.currentGoals.map((goal) => (
                    <div key={goal.id} className="bg-white border border-gray-200 rounded-lg p-6 card-hover">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-slate-800 mb-2">{goal.goal}</h4>
                          <div className="flex items-center space-x-4 mb-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              goal.status === 'Met' ? 'bg-green-100 text-green-800' :
                              goal.status === 'Nearly Met' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {goal.status}
                            </span>
                            <span className="text-gray-600 text-sm">{goal.frequency}</span>
                            <span className="text-gray-600 text-sm">{goal.setting}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600">{goal.progress}%</div>
                          <div className="text-sm text-gray-600">Progress</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full progress-bar ${
                              goal.progress >= 90 ? 'bg-green-500' :
                              goal.progress >= 70 ? 'bg-blue-500' :
                              goal.progress >= 50 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Start Date:</span>
                            <span className="font-medium">{goal.startDate}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Target Date:</span>
                            <span className="font-medium">{goal.targetDate}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Method:</span>
                            <span className="font-medium">{goal.method}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-gray-600">Criteria:</span>
                            <p className="font-medium mt-1">{goal.criteria}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <h5 className="font-medium text-slate-800 mb-1">Notes:</h5>
                        <p className="text-gray-700 text-sm">{goal.notes}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="btn-primary text-sm">Update Progress</button>
                        <button className="btn-secondary text-sm">View Data</button>
                        <button className="btn-outline text-sm">Edit Goal</button>
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

// Session Page Component for Live Therapy Sessions
const SessionPage = ({ currentUser }) => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  
  // Find the appointment/session
  const session = mockSchedule.find(s => s.id === parseInt(sessionId));
  // Get all students in the session
  const sessionStudents = session && session.studentIds ? 
    session.studentIds.map(id => mockStudents.find(s => s.id === id)).filter(Boolean) : 
    session && session.studentId ? [mockStudents.find(s => s.id === session.studentId)].filter(Boolean) : [];
  
  // Session state management
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
  const [sessionData, setSessionData] = useState({});
  const [sessionNotes, setSessionNotes] = useState('');
  const [showFinishModal, setShowFinishModal] = useState(false);

  // Get current student
  const currentStudent = sessionStudents[currentStudentIndex];

  // Initialize session data for each student and their goals
  useEffect(() => {
    if (sessionStudents.length > 0) {
      const initialData = {};
      sessionStudents.forEach((student, studentIndex) => {
        initialData[studentIndex] = {};
        if (student && student.currentGoals) {
          student.currentGoals.forEach((goal, goalIndex) => {
            initialData[studentIndex][goalIndex] = {
              goalId: goal.id,
              goalText: goal.goal,
              correct: 0,
              incorrect: 0,
              total: 0,
              accuracy: 0,
              notes: ''
            };
          });
        }
      });
      setSessionData(initialData);
    }
  }, [sessionStudents]);

  // Calculate accuracy percentage
  const calculateAccuracy = (correct, total) => {
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  };

  // Handle tally buttons
  const handleTally = (studentIndex, goalIndex, type) => {
    setSessionData(prev => {
      const updated = { ...prev };
      if (!updated[studentIndex]) updated[studentIndex] = {};
      if (!updated[studentIndex][goalIndex]) {
        updated[studentIndex][goalIndex] = {
          goalId: sessionStudents[studentIndex].currentGoals[goalIndex].id,
          goalText: sessionStudents[studentIndex].currentGoals[goalIndex].goal,
          correct: 0,
          incorrect: 0,
          total: 0,
          accuracy: 0,
          notes: ''
        };
      }
      
      if (type === 'correct') {
        updated[studentIndex][goalIndex].correct += 1;
      } else {
        updated[studentIndex][goalIndex].incorrect += 1;
      }
      updated[studentIndex][goalIndex].total = updated[studentIndex][goalIndex].correct + updated[studentIndex][goalIndex].incorrect;
      updated[studentIndex][goalIndex].accuracy = calculateAccuracy(updated[studentIndex][goalIndex].correct, updated[studentIndex][goalIndex].total);
      return updated;
    });
  };

  // Reset goal data
  const resetGoalData = (studentIndex, goalIndex) => {
    setSessionData(prev => ({
      ...prev,
      [studentIndex]: {
        ...prev[studentIndex],
        [goalIndex]: {
          ...prev[studentIndex][goalIndex],
          correct: 0,
          incorrect: 0,
          total: 0,
          accuracy: 0
        }
      }
    }));
  };

  // Start session
  const startSession = () => {
    setSessionStarted(true);
    setSessionStartTime(new Date());
  };

  // Finish session
  const finishSession = () => {
    setShowFinishModal(true);
  };

  // Save and exit session
  const saveAndExit = () => {
    // Here you would typically save the session data to a backend
    console.log('Session Data:', sessionData);
    console.log('Session Notes:', sessionNotes);
    navigate('/schedule');
  };

  if (!session || sessionStudents.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation currentUser={currentUser} />
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800">Session not found</h1>
            <Link to="/schedule" className="text-orange-500 hover:text-orange-600 mt-4 inline-block">
              Return to Schedule
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
        {/* Session Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {sessionStudents.length > 0 ? sessionStudents[0].name.split(' ').map(n => n[0]).join('') : 'G'}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  {session.studentNames ? `Group Session: ${session.studentNames.join(', ')}` : sessionStudents[0]?.name || 'Session'}
                </h1>
                <p className="text-gray-600">
                  {session.groupSize ? `${session.type} (${session.groupSize} students)` : `${sessionStudents[0]?.grade || ''} • ${sessionStudents[0]?.disorder || ''} Therapy`}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-gray-500">📅 {session.date}</span>
                  <span className="text-sm text-gray-500">🕐 {session.time}</span>
                  <span className="text-sm text-gray-500">⏱️ {session.duration} minutes</span>
                  {session.groupSize && (
                    <span className="text-sm text-blue-600 font-medium">👥 Group of {session.groupSize}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              {!sessionStarted ? (
                <button 
                  onClick={startSession} 
                  className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Start Session
                </button>
              ) : (
                <div className="flex space-x-2">
                  <span className="text-sm text-green-600 font-medium flex items-center">
                    Session Active: {sessionStartTime && Math.floor((new Date() - sessionStartTime) / 60000)} min
                  </span>
                  <button 
                    onClick={finishSession} 
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Finish Session
                  </button>
                </div>
              )}
              <Link 
                to="/schedule" 
                className="border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 inline-block text-center"
              >
                Back to Schedule
              </Link>
            </div>
          </div>
        </div>

        {sessionStarted ? (
          <>
            {/* Student Tabs for Group Sessions */}
            {sessionStudents.length > 1 && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Students in Group Session</h3>
                <div className="flex space-x-2 overflow-x-auto">
                  {sessionStudents.map((student, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentStudentIndex(index);
                        setCurrentGoalIndex(0); // Reset to first goal when switching students
                      }}
                      className={`flex-shrink-0 px-4 py-3 rounded-lg font-medium transition-colors ${
                        currentStudentIndex === index
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-semibold">{student.name}</div>
                        <div className="text-xs opacity-75">{student.disorder}</div>
                        {sessionData[index] && Object.values(sessionData[index]).some(goal => goal.total > 0) && (
                          <div className="text-xs mt-1">
                            {Math.round(Object.values(sessionData[index]).reduce((acc, goal) => 
                              acc + (goal.total > 0 ? goal.accuracy : 0), 0) / 
                              Object.values(sessionData[index]).filter(goal => goal.total > 0).length || 0)}% avg
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Goals and Data Collection for Current Student */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Goal Navigation for Current Student */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">
                    {currentStudent.name}'s Goals
                  </h3>
                  <div className="space-y-3">
                    {currentStudent.currentGoals.map((goal, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentGoalIndex(index)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          currentGoalIndex === index
                            ? 'bg-orange-100 border-2 border-orange-500'
                            : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                        }`}
                      >
                        <div className="font-medium text-sm text-slate-800 mb-1">
                          Goal {index + 1}
                        </div>
                        <div className="text-xs text-gray-600 line-clamp-2">
                          {goal.goal}
                        </div>
                        {sessionData[currentStudentIndex] && sessionData[currentStudentIndex][index] && sessionData[currentStudentIndex][index].total > 0 && (
                          <div className="mt-2 text-xs font-medium text-orange-600">
                            {sessionData[currentStudentIndex][index].accuracy}% ({sessionData[currentStudentIndex][index].correct}/{sessionData[currentStudentIndex][index].total})
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Data Collection Interface for Current Student */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {currentStudent.name} - Goal {currentGoalIndex + 1} Data Collection
                    </h3>
                    <p className="text-gray-600">
                      {currentStudent.currentGoals[currentGoalIndex]?.goal}
                    </p>
                  </div>

                  {/* Tally System */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="grid grid-cols-2 gap-8 mb-6">
                      {/* Correct Tally */}
                      <div className="text-center">
                        <h4 className="text-lg font-semibold text-green-800 mb-4">✓ Correct</h4>
                        <div className="text-6xl font-bold text-green-600 mb-4">
                          {sessionData[currentStudentIndex]?.[currentGoalIndex]?.correct || 0}
                        </div>
                        <button
                          onClick={() => handleTally(currentStudentIndex, currentGoalIndex, 'correct')}
                          className="w-20 h-20 bg-green-500 hover:bg-green-600 text-white text-4xl rounded-full font-bold transition-all transform hover:scale-105"
                        >
                          +
                        </button>
                      </div>

                      {/* Incorrect Tally */}
                      <div className="text-center">
                        <h4 className="text-lg font-semibold text-red-800 mb-4">✗ Incorrect</h4>
                        <div className="text-6xl font-bold text-red-600 mb-4">
                          {sessionData[currentStudentIndex]?.[currentGoalIndex]?.incorrect || 0}
                        </div>
                        <button
                          onClick={() => handleTally(currentStudentIndex, currentGoalIndex, 'incorrect')}
                          className="w-20 h-20 bg-red-500 hover:bg-red-600 text-white text-4xl rounded-full font-bold transition-all transform hover:scale-105"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Accuracy Display */}
                    <div className="text-center border-t pt-6">
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-slate-800">
                          {sessionData[currentStudentIndex]?.[currentGoalIndex]?.accuracy || 0}% Accuracy
                        </span>
                        <span className="text-gray-600 ml-2">
                          ({sessionData[currentStudentIndex]?.[currentGoalIndex]?.correct || 0}/{sessionData[currentStudentIndex]?.[currentGoalIndex]?.total || 0} trials)
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <div 
                          className={`h-3 rounded-full transition-all duration-300 ${
                            (sessionData[currentStudentIndex]?.[currentGoalIndex]?.accuracy || 0) >= 80 ? 'bg-green-500' :
                            (sessionData[currentStudentIndex]?.[currentGoalIndex]?.accuracy || 0) >= 60 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${sessionData[currentStudentIndex]?.[currentGoalIndex]?.accuracy || 0}%` }}
                        ></div>
                      </div>

                      <button
                        onClick={() => resetGoalData(currentStudentIndex, currentGoalIndex)}
                        className="border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                      >
                        Reset Goal Data
                      </button>
                    </div>
                  </div>

                  {/* Goal Notes for Current Student */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes for {currentStudent.name} - Goal {currentGoalIndex + 1}
                    </label>
                    <textarea
                      value={sessionData[currentStudentIndex]?.[currentGoalIndex]?.notes || ''}
                      onChange={(e) => setSessionData(prev => ({
                        ...prev,
                        [currentStudentIndex]: {
                          ...prev[currentStudentIndex],
                          [currentGoalIndex]: {
                            ...prev[currentStudentIndex]?.[currentGoalIndex],
                            notes: e.target.value
                          }
                        }
                      }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20"
                      placeholder={`Add notes about ${currentStudent.name}'s performance on this goal...`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Session Summary for All Students */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mt-8">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Group Session Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {sessionStudents.map((student, studentIndex) => (
                  <div key={studentIndex} className="bg-gray-50 rounded-lg p-4">
                    <div className="font-bold text-slate-800 mb-2">{student.name}</div>
                    <div className="space-y-2">
                      {student.currentGoals.map((goal, goalIndex) => (
                        <div key={goalIndex} className="text-sm">
                          <div className="text-gray-600 mb-1">Goal {goalIndex + 1}</div>
                          <div className="font-medium">
                            {sessionData[studentIndex]?.[goalIndex]?.accuracy || 0}%
                          </div>
                          <div className="text-xs text-gray-500">
                            {sessionData[studentIndex]?.[goalIndex]?.correct || 0}/{sessionData[studentIndex]?.[goalIndex]?.total || 0} trials
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Group Session Notes
                </label>
                <textarea
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
                  placeholder="Add general notes about the group session..."
                />
              </div>
            </div>
          </>
        ) : (
          /* Pre-Session Information */
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Session Preparation</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-800 mb-3">
                  {sessionStudents.length > 1 ? "Group Goals:" : "Today's Goals:"}
                </h4>
                <div className="space-y-3">
                  {sessionStudents.map((sessionStudent, studentIndex) => (
                    <div key={studentIndex} className="space-y-2">
                      {sessionStudents.length > 1 && (
                        <h5 className="font-medium text-slate-700">{sessionStudent.name}:</h5>
                      )}
                      {sessionStudent.currentGoals?.map((goal, index) => (
                        <div key={index} className="bg-blue-50 rounded-lg p-3">
                          <div className="font-medium text-blue-800 mb-1">Goal {index + 1}</div>
                          <div className="text-sm text-blue-700">{goal.goal}</div>
                          <div className="text-xs text-blue-600 mt-1">
                            Current Progress: {goal.progress}%
                          </div>
                        </div>
                      )) || <div className="text-gray-500 text-sm">No goals set</div>}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Session Details:</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {sessionStudents.length > 1 ? "Students:" : "Student:"}
                    </span>
                    <span className="font-medium">
                      {sessionStudents.length > 1 
                        ? sessionStudents.map(s => s.name).join(', ') 
                        : sessionStudents[0]?.name || 'Unknown'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="font-medium">{session.notes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{session.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Session:</span>
                    <span className="font-medium">
                      {sessionStudents[0]?.lastSession || 'No previous session'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Finish Session Modal */}
      {showFinishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Finish Session</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to finish this session? All data will be saved.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={saveAndExit} 
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex-1"
              >
                Save & Exit
              </button>
              <button 
                onClick={() => setShowFinishModal(false)} 
                className="border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex-1"
              >
                Continue Session
              </button>
            </div>
          </div>
        </div>
      )}
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
  SessionPage,
  Navigation
};

export default Components;