import React, { useState, useRef } from 'react';
import { Music, Heart, Headphones, Brain } from 'lucide-react';
import './TheraTunes.css';

const TheraTunes = () => {
  // State Management
  const [currentStep, setCurrentStep] = useState('welcome');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [spotifyTracks, setSpotifyTracks] = useState([]);
  
  // Use useRef for textarea instead of state - THIS FIXES THE TYPING ISSUE
  const textareaRef = useRef(null);

  // Mock AI analysis function
  const analyzeWithAI = async (userText) => {
    console.log('🤖 Analyzing with AI:', userText);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let primaryEmotion = 'neutral';
    let technique = 'Relaxation Therapy';
    let searchTerms = ['calming music', 'meditation sounds'];
    
    if (userText.toLowerCase().includes('stress')) {
      primaryEmotion = 'stressed';
      technique = 'Progressive Entrainment';
      searchTerms = ['stress relief music', 'calming piano', 'nature sounds'];
    } else if (userText.toLowerCase().includes('anxious')) {
      primaryEmotion = 'anxious';
      technique = 'Iso-Principle Method';
      searchTerms = ['anxiety relief', 'breathing meditation', 'soft instrumental'];
    } else if (userText.toLowerCase().includes('sad')) {
      primaryEmotion = 'sad';
      technique = 'Emotional Processing';
      searchTerms = ['uplifting music', 'hope music', 'gentle instrumental'];
    }
    
    return {
      primaryEmotion,
      musicTherapy: {
        technique,
        startingBPM: primaryEmotion === 'stressed' ? 80 : 70,
        targetBPM: 60,
        recommendedKeys: ['C major', 'F major'],
        duration: 15
      },
      wellnessMessage: `I understand you're feeling ${primaryEmotion}. Music therapy can help guide you toward emotional balance.`,
      spotifySearchTerms: searchTerms
    };
  };

  // Mock Spotify search with track images
  const searchSpotifyTracks = async (searchTerms) => {
    console.log('🎵 Searching Spotify for:', searchTerms);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockTracks = {
      'stress relief music': [
        { 
          id: '1', 
          name: 'Peaceful Piano Flow', 
          artist: 'Calming Sounds', 
          duration_ms: 480000,
          image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop&crop=center'
        },
        { 
          id: '2', 
          name: 'Ocean Waves Meditation', 
          artist: 'Nature Collective', 
          duration_ms: 600000,
          image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=300&fit=crop&crop=center'
        }
      ],
      'calming piano': [
        { 
          id: '3', 
          name: 'Gentle Keys', 
          artist: 'Piano Therapy', 
          duration_ms: 420000,
          image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop&crop=center'
        },
        { 
          id: '4', 
          name: 'Soft Melody', 
          artist: 'Relaxation Music', 
          duration_ms: 360000,
          image: 'https://images.unsplash.com/photo-1571974599782-87624638275b?w=300&h=300&fit=crop&crop=center'
        }
      ],
      'anxiety relief': [
        { 
          id: '5', 
          name: 'Breathing Space', 
          artist: 'Mindful Music', 
          duration_ms: 540000,
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=center'
        },
        { 
          id: '6', 
          name: 'Calm Assurance', 
          artist: 'Therapeutic Sounds', 
          duration_ms: 480000,
          image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop&crop=center'
        }
      ],
      'uplifting music': [
        { 
          id: '4E5P1XyAFtrjpiIxkydly4', 
          name: 'Replay', 
          artist: 'Iyaz', 
          duration_ms: 182000,
          image: 'https://i.scdn.co/image/ab67616d0000b273ae7012fce99c2b2345b54f30'
        },
        { 
          id: '3RiPr603aXAoi4GHyXx0uy', 
          name: 'Hymn for the Weekend', 
          artist: 'Coldplay', 
          duration_ms: 258000,
          image: 'https://i.scdn.co/image/ab67616d0000b2738ff7c3580d429c8212b9a3b6'
        },
        { 
          id: '1rqqCSm0Qe4I9rUvWncaom', 
          name: 'High Hopes', 
          artist: 'Panic! At The Disco', 
          duration_ms: 190000,
          image: 'https://i.scdn.co/image/ab67616d0000b273c5148520a59be191eea16989'
        }
      ]
    };
    
    const allTracks = [];
    searchTerms.forEach(term => {
      if (mockTracks[term]) {
        allTracks.push(...mockTracks[term]);
      }
    });
    
    return allTracks.slice(0, 4).map(track => ({
      ...track,
      external_url: `https://open.spotify.com/track/${track.id}`,
      duration_min: Math.round(track.duration_ms / 60000)
    }));
  };

  // Navigation functions
  const goToAssessment = () => {
    setCurrentStep('assessment');
  };

  const goBack = () => {
    setCurrentStep('welcome');
  };

  const handleSubmit = async () => {
    const userText = textareaRef.current.value; // Get text from ref, not state
    
    if (!userText.trim()) {
      alert('Please tell us how you\'re feeling!');
      return;
    }
    
    setCurrentStep('processing');
    
    try {
      const aiResult = await analyzeWithAI(userText);
      setAnalysisResult(aiResult);
      
      const tracks = await searchSpotifyTracks(aiResult.spotifySearchTerms);
      setSpotifyTracks(tracks);
      
      setCurrentStep('results');
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Something went wrong. Please try again.');
      setCurrentStep('assessment');
    }
  };

  // Welcome Screen Component
  const WelcomeScreen = () => (
    <div className="space-y-24">
      <div className="header">
        <div className="header-icons">
          <Headphones className="icon icon-large icon-purple" />
          <h1 className="app-title">TheraTunes</h1>
          <Music className="icon icon-large icon-blue" />
        </div>
        <p className="subtitle">AI-Powered Music Therapy Platform</p>
      </div>
      
      <div className="card">
        <h2 className="card-header">
          Transform Your Mood with Personalized Music Therapy
        </h2>
        <p className="card-text mb-24">
          Discover therapeutic music experiences that blend evidence-based 
          psychology, AI intelligence, and Spotify's vast library to support 
          your mental health and emotional wellbeing.
        </p>
        
        <div className="flex flex-center mb-32">
          <div className="text-center">
            <Brain className="icon icon-purple" style={{margin: '0 auto 8px'}} />
            <span style={{fontSize: '14px', fontWeight: '500'}}>AI Psychology</span>
          </div>
          <div className="text-center">
            <Music className="icon icon-blue" style={{margin: '0 auto 8px'}} />
            <span style={{fontSize: '14px', fontWeight: '500'}}>Music Therapy</span>
          </div>
          <div className="text-center">
            <Headphones className="icon icon-green" style={{margin: '0 auto 8px'}} />
            <span style={{fontSize: '14px', fontWeight: '500'}}>Personalized</span>
          </div>
          <div className="text-center">
            <Heart className="icon icon-red" style={{margin: '0 auto 8px'}} />
            <span style={{fontSize: '14px', fontWeight: '500'}}>Wellness</span>
          </div>
        </div>
        
        <div className="text-center">
          <button onClick={goToAssessment} className="btn btn-primary">
            🎵 Start Your TheraTunes Journey
          </button>
        </div>
      </div>
    </div>
  );

  // Assessment Screen Component - FIXED VERSION WITH REF
  const AssessmentScreen = () => (
    <div className="space-y-24">
      <div className="header">
        <Headphones className="icon icon-large icon-purple" style={{margin: '0 auto 16px'}} />
        <h2 style={{fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: '0'}}>
          How are you feeling today?
        </h2>
        <p style={{color: '#6b7280', marginTop: '8px'}}>
          Share your thoughts and emotions. TheraTunes will analyze your mood and create 
          personalized music therapy recommendations.
        </p>
      </div>
      
      <div className="card">
        {/* FIXED TEXTAREA - USES REF INSTEAD OF STATE */}
        <textarea
          ref={textareaRef}
          placeholder="Tell me about how you're feeling... Are you stressed about work or school? Feeling anxious about upcoming events? Dealing with sadness? Share whatever is on your mind."
          style={{
            width: '100%',
            height: '160px',
            padding: '16px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '16px',
            fontFamily: 'inherit',
            resize: 'none',
            outline: 'none',
            lineHeight: '1.5'
          }}
          onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
        />
        
        <div className="analysis-info">
          <h3>🧠 TheraTunes AI Will Analyze:</h3>
          <div className="analysis-list">
            <div>• Your emotional state and mood patterns</div>
            <div>• Stress factors and triggers</div>
            <div>• Optimal music therapy techniques</div>
            <div>• Personalized Spotify recommendations</div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-center">
        <button 
          onClick={handleSubmit}
          className="btn btn-primary"
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
            color: 'white',
            padding: '18px 36px',
            fontSize: '18px',
            fontWeight: '600',
            minWidth: '280px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          <Brain style={{width: '24px', height: '24px'}} />
          Generate TheraTunes
        </button>
        
        <button 
          onClick={goBack} 
          className="btn btn-secondary"
          style={{
            background: '#6b7280',
            color: 'white',
            padding: '18px 24px',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Back
        </button>
      </div>
    </div>
  );

  // Processing Screen Component
  const ProcessingScreen = () => (
    <div className="space-y-24">
      <div className="card text-center">
        <div className="spinner"></div>
        <h2 style={{fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '16px'}}>
          AI Analysis in Progress
        </h2>
        <div className="space-y-24">
          <div style={{background: '#f3e8ff', padding: '16px', borderRadius: '8px'}}>
            <p style={{color: '#7c3aed', fontWeight: '600'}}>AI is analyzing your emotional state...</p>
          </div>
          <div style={{background: '#f0fdf4', padding: '16px', borderRadius: '8px'}}>
            <p style={{color: '#059669', fontWeight: '600'}}>Searching Spotify for therapeutic tracks...</p>
          </div>
          <div style={{background: '#eff6ff', padding: '16px', borderRadius: '8px'}}>
            <p style={{color: '#2563eb', fontWeight: '600'}}>Applying music therapy principles...</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Results Screen Component
  const ResultsScreen = () => (
    <div className="space-y-24">
      <div className="header">
        <h2 style={{fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: '0'}}>
          TheraTunes
        </h2>
      </div>

      {/* AI Analysis Summary */}
      <div className="card">
        <h3 className="card-header">Your Personalized Therapy Plan</h3>
        {analysisResult && (
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', textAlign: 'left'}}>
            <div>
              <p style={{color: '#6b7280', fontSize: '14px'}}>Primary Emotion:</p>
              <p style={{fontWeight: '600', color: '#7c3aed', textTransform: 'capitalize'}}>
                {analysisResult.primaryEmotion}
              </p>
            </div>
            <div>
              <p style={{color: '#6b7280', fontSize: '14px'}}>Therapy Technique:</p>
              <p style={{fontWeight: '600', color: '#3b82f6'}}>
                {analysisResult.musicTherapy.technique}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Spotify Tracks */}
      <div className="card">
        <h3 className="card-header">Curated Therapeutic Tracks</h3>
        {spotifyTracks.length > 0 ? (
          <div className="track-list">
            {spotifyTracks.map((track) => (
              <div key={track.id} className="track-item">
                <div className="track-image">
                  <img 
                    src={track.image} 
                    alt={`${track.name} cover`}
                  />
                </div>
                
                <div className="track-info">
                  <div className="track-main-info">
                    <div className="track-title-artist">
                      <h4>{track.name}</h4>
                      <p className="artist">by {track.artist}</p>
                    </div>
                  </div>
                  
                  <div className="track-details">
                    <span>Duration: {track.duration_min}min</span>
                    <span>Therapeutic Track</span>
                  </div>
                </div>
                
                <div className="track-actions">
                  <a 
                    href={track.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-small btn-spotify"
                    title="Open in Spotify"
                  >
                    🎵
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{background: '#f3f4f6', padding: '24px', borderRadius: '8px', textAlign: 'center'}}>
            <p style={{color: '#6b7280'}}>No tracks found. Try a different mood description!</p>
          </div>
        )}
      </div>

      <div className="button-container-bottom">
        <button 
          onClick={goBack} 
          className="btn btn-primary"
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
            color: 'white',
            padding: '16px 32px',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Start New Analysis
        </button>
      </div>    
    </div>
  );

  // Main Render
  return (
    <div className="theratunes-container">
      <div className="content-wrapper">
        {currentStep === 'welcome' && <WelcomeScreen />}
        {currentStep === 'assessment' && <AssessmentScreen />}
        {currentStep === 'processing' && <ProcessingScreen />}
        {currentStep === 'results' && <ResultsScreen />}
      </div>
    </div>
  );
};

export default TheraTunes;