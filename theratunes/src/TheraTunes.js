import React, { useState } from 'react';
import { Music, Heart, Sun, Brain, Headphones } from 'lucide-react';
import './TheraTunes.css'; // Import TheraTunes specific styles

const TheraTunes = () => {

    // State variables
    const [currentStep, setCurrentStep] = useState('welcome');
    const [userInput, setUserInput] = useState('');

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

        console.log('Processing input:', userInput);
        setCurrentStep('processing');
    }

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

    //Assessment Screen component
    const AssessmentScreen = () => {
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
    };

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