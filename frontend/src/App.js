import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Database, TrendingUp, Users, FileText } from 'lucide-react';

const NepsixResearchLanding = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    ageRange: '',
    occupation: '',
    primaryGovernanceProblem: '',
    problemImpact: '',
    specificExample: '',
    willingToParticipate: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const countries = [
    'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Tanzania', 'Uganda', 
    'Rwanda', 'Ethiopia', 'Senegal', 'Côte d\'Ivoire', 'Other'
  ];

  const occupations = [
    'Student',
    'Software Developer/Engineer',
    'Data Analyst/Scientist',
    'Teacher/Educator',
    'Healthcare Professional',
    'Business Owner/Entrepreneur',
    'Government Employee',
    'NGO/Non-Profit Worker',
    'Sales/Marketing Professional',
    'Accountant/Finance Professional',
    'Lawyer/Legal Professional',
    'Trader/Merchant',
    'Farmer/Agriculture',
    'Artisan/Craftsperson',
    'Driver/Transportation',
    'Unemployed',
    'Retired',
    'Other'
  ];

  const governanceProblems = [
    'Corruption & Bribery',
    'Lack of Accountability',
    'Electoral Fraud & Manipulation',
    'Police Brutality & Abuse of Power',
    'Lack of Transparency in Public Spending',
    'Inefficient Public Service Delivery',
    'Judicial System Inefficiency',
    'Nepotism & Favoritism',
    'Mismanagement of Public Funds',
    'Other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
    // For Vercel deployment
    const API_ENDPOINT = '/api/submit-research';
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        submitted_at: new Date().toISOString()
      })
    });

      if (response.ok || response.status === 201) {
        setSubmitted(true);
        setFormData({
          fullName: '', email: '', country: '', ageRange: '', occupation: '',
          primaryGovernanceProblem: '', problemImpact: '', specificExample: '',
          willingToParticipate: ''
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-white font-bold text-2xl">Nepsix</div>
            </div>
            <div className="text-emerald-400 text-sm font-medium">Research Initiative 2025</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6">
            <Database className="w-4 h-4 text-emerald-400 mr-2" />
            <span className="text-emerald-300 text-sm font-medium">Data-Driven Research Project</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Reengineering Africa's Future Through
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"> Data & Technology</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Join Nepsix College in mapping Africa's most critical governance challenges. 
            Your insights will power solutions built by the next generation of African tech innovators.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-16">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <Users className="w-8 h-8 text-emerald-400 mb-3 mx-auto" />
              <div className="text-2xl font-bold text-white mb-1">10,000+</div>
              <div className="text-slate-400 text-sm">Target Responses</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <TrendingUp className="w-8 h-8 text-cyan-400 mb-3 mx-auto" />
              <div className="text-2xl font-bold text-white mb-1">54</div>
              <div className="text-slate-400 text-sm">African Countries</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <FileText className="w-8 h-8 text-purple-400 mb-3 mx-auto" />
              <div className="text-2xl font-bold text-white mb-1">Q1 2026</div>
              <div className="text-slate-400 text-sm">Solution Launch</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 border-y border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Research Problem Statement</h2>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">The Challenge</h3>
                <p className="text-slate-300 leading-relaxed">
                  Despite Africa's projected economic growth of 3.8% annually and a tech ecosystem valued at over $115 billion, 
                  governance inefficiencies continue to impede socioeconomic development across the continent. Studies indicate 
                  that corruption alone costs African economies approximately $148 billion annually—equivalent to 25% of Africa's GDP.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Database className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">The Gap</h3>
                <p className="text-slate-300 leading-relaxed">
                  While numerous governance challenges exist—from electoral fraud to public service inefficiency—there is insufficient 
                  empirical data mapping which specific problems most critically impact citizens' daily lives across different African 
                  regions. Without data-driven prioritization, tech solutions risk addressing symptoms rather than root causes.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <TrendingUp className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Our Approach</h3>
                <p className="text-slate-300 leading-relaxed">
                  This research leverages quantitative and qualitative data analytics to identify, rank, and contextualize Africa's 
                  most pressing governance problems. Using SQL databases, Python analytics, Power BI visualizations, and statistical 
                  modeling, we will transform citizen insights into actionable intelligence that directly informs solution development 
                  by Nepsix's technology cohorts.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-6 mt-6">
              <h4 className="text-lg font-semibold text-white mb-2">Research Objective</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                To systematically collect, analyze, and synthesize primary data from 10,000+ African respondents to identify 
                the top 3 governance problems requiring immediate technological intervention, thereby enabling evidence-based 
                solution design that addresses real-world pain points with measurable impact potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Share Your Experience</h2>
            <p className="text-slate-400">Your voice matters. Help us understand the governance challenges affecting your community.</p>
          </div>

          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-slate-300 mb-4">Your response has been recorded and will contribute to building Africa's future.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-emerald-400 hover:text-emerald-300 font-medium"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-300 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-white font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Country *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select country</option>
                    {countries.map(country => (
                      <option key={country} value={country} className="bg-slate-800">{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Age Range *</label>
                  <select
                    name="ageRange"
                    value={formData.ageRange}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select age range</option>
                    <option value="16-24" className="bg-slate-800">16-24</option>
                    <option value="25-34" className="bg-slate-800">25-34</option>
                    <option value="35-44" className="bg-slate-800">35-44</option>
                    <option value="45-54" className="bg-slate-800">45-54</option>
                    <option value="55+" className="bg-slate-800">55+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Occupation *</label>
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select your occupation</option>
                  {occupations.map(occupation => (
                    <option key={occupation} value={occupation} className="bg-slate-800">{occupation}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">What is the PRIMARY governance problem affecting you most? *</label>
                <select
                  name="primaryGovernanceProblem"
                  value={formData.primaryGovernanceProblem}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select a problem</option>
                  {governanceProblems.map(problem => (
                    <option key={problem} value={problem} className="bg-slate-800">{problem}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">How does this problem impact your daily life? *</label>
                <textarea
                  name="problemImpact"
                  value={formData.problemImpact}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Describe the specific ways this governance issue affects you..."
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Can you share a specific example or incident? (Optional)</label>
                <textarea
                  name="specificExample"
                  value={formData.specificExample}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Share a real experience that illustrates this problem..."
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Would you be willing to participate in follow-up interviews? *</label>
                <select
                  name="willingToParticipate"
                  value={formData.willingToParticipate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select an option</option>
                  <option value="Yes" className="bg-slate-800">Yes, I'm interested</option>
                  <option value="Maybe" className="bg-slate-800">Maybe, contact me later</option>
                  <option value="No" className="bg-slate-800">No, thank you</option>
                </select>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Your Response'}
              </button>

              <p className="text-slate-400 text-sm text-center">
                Your data will be anonymized and used solely for research purposes.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 border-t border-white/10 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400 text-sm">
            © 2025 Nepsix College, Port Harcourt, Nigeria. Empowering Africa through technology.
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Research Initiative | Data Analytics Cohort 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NepsixResearchLanding;