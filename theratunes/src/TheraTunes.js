import React, { useState } from 'react';
import { Music, Heart, Sun, Brain, Headphones } from 'lucide-react';
import './TheraTunes.css'; // Import TheraTunes specific styles

const TheraTunes = () => {

    // State variables
    const [currentStep, setCurrentStep] = useState('welcome');
    const [userInput, setUserInput] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [spotifyTracks, setSpotifyTracks] = useState([]);

    //Function to change screens
    const goToAssessment = () => {
        setCurrentStep('assessment');
    };

    const goBack = () => {
        setCurrentStep('welcome');
    };

    const handleSubmit = () => {
        console.log('User input:', userInput);

        if (userInput.trim() == '') {
            alert('Please tell me how you are feeling.');
            return;
        }

        setCurrentStep('processing');

        try {
            //Step 1: Analyze with AI
            console.log('Step 1: Analyzing mood...');
            const aiResult = await analyzewWithAI(userInput);
            setAnalysisResult(aiResult);

            //Step 2: Search Spotify
            console.log('Step 2: Searching Spotify...');
            const tracks = await searchSpotify(aiResult.spotifySearchTerms);
            setSpotifyTracks(tracks);

            console.log('Analysis complete!');
            setCurrentStep('results');
        } catch (error) {
            console.error('Analysis failed:', error);
            alert('Something went wrong. Please try again.');
            setCurrentStep('assessment');
        }
    };

    // Mock AI analysis function
    const analyzewWithAI = async (userText) => {
        console.log('🤖 Analyzing with AI:', userText);

        await new Promise(resolve => setTimeout(resolve, 2000));

        let primaryEmotion = 'neutral';
        let technique = 'Relaxation Therapy';
        let searchTerms = ['calming music', 'meditation sounds'];

        if (userText.toLowerCase().includes('stress')) {
            primaryEmotion = 'stressed';
            technique = 'Progressiive Entrainment';
            searchTerms = ['stress relief music', 'calming piano', 'nature sounds'];

        }
        else if (userText.toLowerCase().includes('anxious')) {
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
            wellnessMessage: `I understand you're feeling ${primaryEmotion}. Music therapy can help.`,
            spotifySearchTerms: searchTerms
        }
    }

    // Mock spotify search function
    const searchSpotify = async (searchTerms) => {
        console.log('🔍 Searching Spotify for:', searchTerms);

        await new Promise(resolve => setTimeout(resolve, 1500));

        const mockTracks = {
            'stress relief music': [
                {
                    id: '1',
                    name: 'Peaceful Piano Flow',
                    artist: 'Calming Sounds',
                    duration_ms: 480000,
                    preview_url: null
                },
                {
                    id: '2',
                    name: 'Ocean Waves Meditation',
                    artist: 'Nature Collective',
                    duration_ms: 600000,
                    preview_url: null
                }
            ],
            'calming piano': [
                {
                    id: '3',
                    name: 'Gentle Keys',
                    artist: 'Piano Therapy',
                    duration_ms: 420000,
                    preview_url: null
                },
                {
                    id: '4',
                    name: 'Soft Melody',
                    artist: 'Relaxation Music',
                    duration_ms: 360000,
                    preview_url: null
                }
            ],
            'anxiety relief': [
                {
                    id: '5',
                    name: 'Breathing Space',
                    artist: 'Mindful Sounds',
                    duration_ms: 540000,
                    preview_url: null
                },
                {
                    id: '6',
                    name: 'Calm Assurance',
                    artist: 'Therapeutic Tunes',
                    duration_ms: 480000,
                    preview_url: null
                },
                
            ]
        };
        
        // Get tracks for each search term
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

    //Assessment Screen component
    const AssessmentScreen = () => (
        <div className="space-y-24">
            <div className="header">
                <Headphones className="icon icon-large icon purple" style={{margin: '0 auto 16px'}} />
                <h2 style={{fonstSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: '0'}}>
                    How are you feeling today?
                </h2>
                <p style={{color: '#6b7280', marginTop: '8px'}}>
                    Share your thoughts and emotions. TheraTunes will analyze your mood.
                </p>
            </div>

            <div className="card">
                <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Tell me about how you're feeling..."
                    className="mood-textarea"
                    style={{height: '160px'}}
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
                    disabled={!userInput.trim()}
                    className="btn btn-primary"
                >
                    Generate TheraTunes
                </button>

                <button onClick={goBack} className="btn btn-secondary">
                    Back
                </button>
            </div>
        </div>
    );

    // Processing screen component
    const ProcessingScreen = () => (
        <div className="space-y-24">
            <div className="card text-center">
                <div className="spinner"></div>
                <h2 style={{fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '16px'}}>
                    Analyzing your mood...
                </h2>
                <div className="space-y-24">
                    <div style={{background: #f3e8ff, padding: '16px', borderRadius: '8px'}}>
                        <p style={{color: '#7c3aed', fontWeight: '600'}}>🤖 OpenAI is analyzing your emotional state...</p>
                    </div>
                    <div style={{background: '#f0fdf4', padding: '16px', borderRadius: '8px'}}>
                        <p style={{color: '#059669', fontWeight: '600'}}>🎵 Spotify is finding the perfect tracks for you...</p>
                    </div>
                    <div style={{background: '#eff6ff', padding: '16px', borderRadius: '8px'}}>
                        <p style={{color: '#2563eb', fontWeight: '600'}}>🧠 Applying music therapy principles...</p>
                    </div>
                </div>
            </div>
        </div>
    );


    // Results screen component
    const ResultsScreen = () => (
        <div className="space-y-24">
            <div className="header">
                <h2 style={{fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: '0'}}>
                    Your Personalized Therapy Plan
                </h2>
            </div>

            <div className="card">
                <h3 className="card-header">Your Mood Analysis</h3>
                { analysisResult && (
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', textAligh: 'left'}}>
                        <div>
                            <p style={{color: '#6b7280', fontSize: '14px'}}>Primary Emotion:</p>
                            <p style={{fontWeight: '600', color: '#7c3aed', textTranform: 'capatalize'}}>
                                {analysisResult.primaryEmotion}
                            </p>
                        </div>
                        <div>
                            <p style={{color: '#6b7280', fontSize: '14px'}}>Music Therapy Technique:</p>
                            <p style={{fontWeight: '600', color: '#3b82f6'}}>
                                {analysisResult.musicTherapy.technique}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            { analysisResult && (
                <div style={{background: '#fef3c7', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #f59e0b'}}>
                    <p style={{color: '#92400e'}}>{analysisResult.wellnessMessage}</p>
                </div>
            )}

            {analysisResult && (
                <div className="card">
                    <h3 className="card-header">🎵 Music Therapy Specifications</h3>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px'}}>\
                        <div>
                            <span style={{color: '#3b82f6'}}>Starting BPM:</span>
                            <span style={{marginLeft: '8px', fontWeight: '600'}}>{analysisResult.musicTherapy.startingBPM}</span>
                        </div>
                        <div>
                            <span style={{color: '#3b82f6'}}>Target BPM:</span>
                            <span style={{marginLeft: '8px', fontWeight: '600'}}>{analysisResult.musicTherapy.targetBPM}</span>
                        </div>
                        <div>
                            <span style={{color: '#3b82f6'}}>Recommended Keys:</span>
                            <span style={{marginLeft: '8px', fontWeight: '600'}}>{analysisResult.musicTherapy.recommendedKeys.join(', ')}</span>
                        </div>
                        <div>
                            <span style={{color: '#3b82f6'}}>Session Duration:</span>
                            <span style={{marginLeft: '8px', fontWeight: '600'}}>{analysisResult.musicTherapy.duration} minutes</span>
                        </div>
                    </div>
                </div>
            )}
            <div className="card">
                <h3 className="card-header">🎧 Spotify Recommendations</h3>
                {spotifyTracks.length > 0 ? (
                    <div className="spotify-track-list">
                        {spotifyTracks.map((track, index) => (
                            <div key={track.id} className="track-item">
                                <div className="track-info">
                                    <h4>{track.name}</h4>
                                    <p>by {track.artist}</p>
                                    <div className="track-details">
                                        <span> Duration: {track.duration_min}min</span>
                                        <span>Therapeutic Track</span>
                                    </div>
                                </div>
                                <div className="track-actions">
                                    <button
                                    className="btn-small btn-play"
                                    onClick={() => console.log('Playing:', track.name)}
                                    title="Play Preview"
                                    >
                                        ▶️
                                    </button>
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
                        <p style={{color: '#6b7280'}}>No tracks found. Try a different mood description.</p>
                    </div>
                )}
            </div>
            <div className="text-center">
                <button onClick={goBack} className="btn btn-primary">
                    Start New Anaysis
                </button>
            </div>
        </div>
    );

    // Welcome screen component
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
                psychology, AI intelligence, and Spotify's vast library.
                </p>

                <div className="text-center">                     
                <button onClick={goToAssessment} className="btn btn-primary">  
                    🎵 Start Your TheraTunes Journey
                </button>
                </div>
            </div>
        </div>
    );

    //Main render
    return (
        <div className="theratunes-container">
            <div className="content-wrapper">
                {currentStep === 'welcome' && <WelcomeScreen />}
                {currentStep === 'asessment' && <AssessmentScreen />}
                {currentStep === 'processing' && <div>Processing...</div>}
            </div>
        </div>
    );
};

export default TheraTunes;