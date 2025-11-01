import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Database, TrendingUp, Users, FileText, Moon, Sun } from 'lucide-react';

const NepsixResearchLanding = () => {
  const [darkMode, setDarkMode] = useState(true);
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

  // Load theme preference
  useEffect(() => {
    const saved = localStorage.getItem('nepsix-theme');
    if (saved) setDarkMode(saved === 'dark');
  }, []);

  // Save theme and apply to document
  useEffect(() => {
    localStorage.setItem('nepsix-theme', darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const countries = [
    'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Tanzania', 'Uganda', 
    'Rwanda', 'Ethiopia', 'Senegal', 'Côte d\'Ivoire', 'Other'
  ];

  const occupations = [
    'Student', 'Software Developer/Engineer', 'Data Analyst/Scientist',
    'Teacher/Educator', 'Healthcare Professional', 'Business Owner/Entrepreneur',
    'Government Employee', 'NGO/Non-Profit Worker', 'Sales/Marketing Professional',
    'Accountant/Finance Professional', 'Lawyer/Legal Professional', 'Trader/Merchant',
    'Farmer/Agriculture', 'Artisan/Craftsperson', 'Driver/Transportation',
    'Unemployed', 'Retired', 'Other'
  ];

  const governanceProblems = [
    'Corruption & Bribery', 'Lack of Accountability', 'Electoral Fraud & Manipulation',
    'Police Brutality & Abuse of Power', 'Lack of Transparency in Public Spending',
    'Inefficient Public Service Delivery', 'Judicial System Inefficiency',
    'Nepotism & Favoritism', 'Mismanagement of Public Funds', 'Other'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const isLocal = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';
      
      if (isLocal) {
        console.log('LOCAL TEST - Form data:', formData);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitted(true);
        setFormData({
          fullName: '', email: '', country: '', ageRange: '', occupation: '',
          primaryGovernanceProblem: '', problemImpact: '', specificExample: '',
          willingToParticipate: ''
        });
        alert('✅ LOCAL TEST: Form submitted successfully!\nCheck console for data.');
        return;
      }
      
      const response = await fetch('/api/submit-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, submitted_at: new Date().toISOString() })
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

  const inputClass = `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300 ${
    darkMode
      ? 'bg-white/5 border-white/20 text-white placeholder-slate-500'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
  }`;

  const labelClass = `block font-medium mb-2 transition-colors duration-300 ${
    darkMode ? 'text-white' : 'text-gray-900'
  }`;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Header */}
      <header className={`backdrop-blur-sm border-b transition-colors duration-300 ${
        darkMode ? 'bg-black/30 border-white/10' : 'bg-white/70 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={darkMode ? "/nepsix-logo-dark.png" : "/nepsix-logo-light.png"}
                alt="Nepsix College" 
                className="h-10 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className={`font-bold text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{display: 'none'}}>
                Nepsix
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`text-sm font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                Research Initiative 2025
              </div>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode ? 'bg-white/10 hover:bg-white/20 text-yellow-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`inline-flex items-center px-4 py-2 border rounded-full mb-6 transition-colors duration-300 ${
            darkMode ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
          }`}>
            <Database className={`w-4 h-4 mr-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <span className={`text-sm font-medium ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
              Data-Driven Research Project
            </span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Reengineering Africa's Future Through
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"> Data & Technology</span>
          </h1>
          
          <p className={`text-xl mb-8 leading-relaxed transition-colors duration-300 ${
            darkMode ? 'text-slate-300' : 'text-gray-600'
          }`}>
            Join Nepsix College in mapping Africa's most critical governance challenges. 
            Your insights will power solutions built by the next generation of African tech innovators.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-16">
            {[
              { icon: Users, value: '10,000+', label: 'Target Responses', color: darkMode ? 'text-emerald-400' : 'text-emerald-600' },
              { icon: TrendingUp, value: '54', label: 'African Countries', color: darkMode ? 'text-cyan-400' : 'text-cyan-600' },
              { icon: FileText, value: 'Q1 2026', label: 'Solution Launch', color: darkMode ? 'text-purple-400' : 'text-purple-600' }
            ].map((stat, i) => (
              <div key={i} className={`backdrop-blur-sm border rounded-xl p-6 transition-colors duration-300 ${
                darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'
              }`}>
                <stat.icon className={`w-8 h-8 mb-3 mx-auto ${stat.color}`} />
                <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className={`py-12 px-4 sm:px-6 lg:px-8 border-y transition-colors duration-300 ${
        darkMode ? 'bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 border-white/10' : 'bg-gradient-to-r from-emerald-50 to-cyan-50 border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold mb-6 text-center transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Research Problem Statement</h2>
          
          <div className={`backdrop-blur-sm border rounded-2xl p-8 space-y-6 transition-colors duration-300 ${
            darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-xl'
          }`}>
            {[
              { icon: AlertCircle, color: darkMode ? 'text-emerald-400' : 'text-emerald-600', title: 'The Challenge',
                text: "Despite Africa's projected economic growth of 3.8% annually and a tech ecosystem valued at over $115 billion, governance inefficiencies continue to impede socioeconomic development across the continent. Studies indicate that corruption alone costs African economies approximately $148 billion annually—equivalent to 25% of Africa's GDP." },
              { icon: Database, color: darkMode ? 'text-cyan-400' : 'text-cyan-600', title: 'The Gap',
                text: "While numerous governance challenges exist—from electoral fraud to public service inefficiency—there is insufficient empirical data mapping which specific problems most critically impact citizens' daily lives across different African regions. Without data-driven prioritization, tech solutions risk addressing symptoms rather than root causes." },
              { icon: TrendingUp, color: darkMode ? 'text-purple-400' : 'text-purple-600', title: 'Our Approach',
                text: "This research leverages quantitative and qualitative data analytics to identify, rank, and contextualize Africa's most pressing governance problems. Using SQL databases, Python analytics, Power BI visualizations, and statistical modeling, we will transform citizen insights into actionable intelligence that directly informs solution development by Nepsix's technology cohorts." }
            ].map((section, i) => (
              <div key={i} className="flex items-start space-x-3">
                <section.icon className={`w-6 h-6 mt-1 flex-shrink-0 ${section.color}`} />
                <div>
                  <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{section.title}</h3>
                  <p className={`leading-relaxed ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>{section.text}</p>
                </div>
              </div>
            ))}

            <div className={`border rounded-xl p-6 mt-6 transition-colors duration-300 ${
              darkMode ? 'bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-500/30' : 'bg-gradient-to-r from-emerald-50 to-cyan-50 border-emerald-300'
            }`}>
              <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Research Objective</h4>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                To systematically collect, analyze, and synthesize primary data from 10,000+ African respondents to identify 
                the top 3 governance problems requiring immediate technological intervention, thereby enabling evidence-based 
                solution design that addresses real-world pain points with measurable impact potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Share Your Experience
            </h2>
            <p className={`transition-colors duration-300 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              Your voice matters. Help us understand the governance challenges affecting your community.
            </p>
          </div>

          {submitted ? (
            <div className={`border rounded-2xl p-8 text-center transition-colors duration-300 ${
              darkMode ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
            }`}>
              <CheckCircle2 className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Thank You!</h3>
              <p className={`mb-4 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                Your response has been recorded and will contribute to building Africa's future.
              </p>
              <button onClick={() => setSubmitted(false)} className={`font-medium ${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'}`}>
                Submit another response
              </button>
            </div>
          ) : (
            <div className={`backdrop-blur-sm border rounded-2xl p-8 space-y-6 transition-colors duration-300 ${
              darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-xl'
            }`}>
              {error && (
                <div className={`border rounded-lg p-4 text-sm ${darkMode ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-red-50 border-red-200 text-red-700'}`}>
                  {error}
                </div>
              )}

              <div><label className={labelClass}>Full Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className={inputClass} placeholder="Enter your full name" />
              </div>

              <div><label className={labelClass}>Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="your.email@example.com" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className={labelClass}>Country *</label>
                  <select name="country" value={formData.country} onChange={handleChange} required className={inputClass}>
                    <option value="">Select country</option>
                    {countries.map(c => <option key={c} value={c} className={darkMode ? 'bg-slate-800' : 'bg-white'}>{c}</option>)}
                  </select>
                </div>
                <div><label className={labelClass}>Age Range *</label>
                  <select name="ageRange" value={formData.ageRange} onChange={handleChange} required className={inputClass}>
                    <option value="">Select age range</option>
                    {['16-24', '25-34', '35-44', '45-54', '55+'].map(a => <option key={a} value={a} className={darkMode ? 'bg-slate-800' : 'bg-white'}>{a}</option>)}
                  </select>
                </div>
              </div>

              <div><label className={labelClass}>Occupation *</label>
                <select name="occupation" value={formData.occupation} onChange={handleChange} required className={inputClass}>
                  <option value="">Select your occupation</option>
                  {occupations.map(o => <option key={o} value={o} className={darkMode ? 'bg-slate-800' : 'bg-white'}>{o}</option>)}
                </select>
              </div>

              <div><label className={labelClass}>What is the PRIMARY governance problem affecting you most? *</label>
                <select name="primaryGovernanceProblem" value={formData.primaryGovernanceProblem} onChange={handleChange} required className={inputClass}>
                  <option value="">Select a problem</option>
                  {governanceProblems.map(p => <option key={p} value={p} className={darkMode ? 'bg-slate-800' : 'bg-white'}>{p}</option>)}
                </select>
              </div>

              <div><label className={labelClass}>How does this problem impact your daily life? *</label>
                <textarea name="problemImpact" value={formData.problemImpact} onChange={handleChange} required rows="4" className={inputClass} placeholder="Describe the specific ways this governance issue affects you..." />
              </div>

              <div><label className={labelClass}>Can you share a specific example or incident? (Optional)</label>
                <textarea name="specificExample" value={formData.specificExample} onChange={handleChange} rows="4" className={inputClass} placeholder="Share a real experience that illustrates this problem..." />
              </div>

              <div><label className={labelClass}>Would you be willing to participate in follow-up interviews? *</label>
                <select name="willingToParticipate" value={formData.willingToParticipate} onChange={handleChange} required className={inputClass}>
                  <option value="">Select an option</option>
                  {['Yes, I\'m interested', 'Maybe, contact me later', 'No, thank you'].map((opt, i) => 
                    <option key={i} value={['Yes', 'Maybe', 'No'][i]} className={darkMode ? 'bg-slate-800' : 'bg-white'}>{opt}</option>
                  )}
                </select>
              </div>

              <button onClick={handleSubmit} disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Submitting...' : 'Submit Your Response'}
              </button>

              <p className={`text-sm text-center ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                Your data will be anonymized and used solely for research purposes.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-8 px-4 transition-colors duration-300 ${darkMode ? 'bg-black/30 border-white/10' : 'bg-white/70 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            © 2025 Nepsix College, Port Harcourt, Nigeria. Empowering Africa through technology.
          </p>
          <p className={`text-xs mt-2 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
            Research Initiative | Data Analytics Cohort 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NepsixResearchLanding;