// src/components/Assessment.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Assessment.css';

// Sample questions - replace with your actual AI-powered questions
const QUESTIONS = [
  {
    id: 1,
    text: "What's one thing you could talk about for hours without getting bored?",
    type: "text",
    placeholder: "e.g., video games, psychology, building things..."
  },
  {
    id: 2,
    text: "When you have a free afternoon, what do you usually do?",
    type: "multiple",
    options: [
      "Hang out with friends",
      "Read or watch something",
      "Work on a project or hobby",
      "Exercise or play sports",
      "Something else"
    ]
  },
  {
    id: 3,
    text: "What kind of problems do you enjoy solving?",
    type: "multiple",
    options: [
      "Logical puzzles or math problems",
      "Creative challenges (writing, art, design)",
      "Helping people with their problems",
      "Figuring out how things work",
      "Organizing or planning things"
    ]
  },
  {
    id: 4,
    text: "Imagine your ideal work environment. What does it look like?",
    type: "text",
    placeholder: "e.g., quiet office, outdoors, team setting, remote..."
  },
  {
    id: 5,
    text: "What's a subject in school that you actually look forward to?",
    type: "text",
    placeholder: "e.g., biology, history, computer science, art..."
  }
  // Add 15 more questions to reach 20
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [conversation, setConversation] = useState<Array<{sender: 'ai' | 'user', text: string}>>([
    { sender: 'ai', text: "Hey! I'm here to help you figure out what's next. Let's chat for a bit." }
  ]);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / QUESTIONS.length) * 100;

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    let answer = "";
    
    if (currentQuestion.type === "multiple" && selectedOption) {
      answer = selectedOption;
      setSelectedOption(null);
    } else if (currentQuestion.type === "text" && textInput.trim()) {
      answer = textInput.trim();
      setTextInput("");
    } else {
      return; // Don't proceed if no answer
    }

    // Add user answer to conversation
    setConversation(prev => [...prev, { sender: 'user', text: answer }]);
    
    // Save answer (will be sent to backend)
    console.log('answer saved:', currentQuestion.id, answer);

    // Check if this is the last question
    if (currentQuestionIndex === QUESTIONS.length - 1) {
      setIsComplete(true);
      setConversation(prev => [...prev, { 
        sender: 'ai', 
        text: "Thanks for sharing! I'm analyzing your answers now. This usually takes about 30 seconds." 
      }]);
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      
      // Add next AI question to conversation after a slight delay
      setTimeout(() => {
        const nextQuestion = QUESTIONS[currentQuestionIndex + 1];
        setConversation(prev => [...prev, { sender: 'ai', text: nextQuestion.text }]);
      }, 400);
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex === QUESTIONS.length - 1) {
      setIsComplete(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeout(() => {
        const nextQuestion = QUESTIONS[currentQuestionIndex + 1];
        setConversation(prev => [...prev, { sender: 'ai', text: nextQuestion.text }]);
      }, 400);
    }
  };

  if (isComplete) {
    return (
      <section className="assessment">
        <div className="assessment-container">
          <div className="assessment-complete">
            <h2 className="assessment-complete-title">Got it. Thanks.</h2>
            <p className="assessment-complete-text">
              We're matching your answers with careers and college majors that fit. 
              You'll see your personalized results in just a moment.
            </p>
            <button className="assessment-btn assessment-btn-primary" onClick={() => navigate('/dashboard')}>
              View my results
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="assessment">
      <div className="assessment-container">
        
        {/* Progress Bar */}
        <div className="assessment-progress">
          <div 
            className="assessment-progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="assessment-progress-text">
          Question {currentQuestionIndex + 1} of {QUESTIONS.length}
        </p>

        {/* Chat Area */}
        <div className="chat-area">
          {conversation.map((message, index) => (
            <div 
              key={index} 
              className={`chat-message ${message.sender}`}
            >
              <span className="message-sender">
                {message.sender === 'ai' ? 'Path Finder' : 'You'}
              </span>
              <div className={`message-bubble ${message.sender}`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Answer Input Area */}
        <div className="answer-input-area">
          
          {/* Multiple Choice Options */}
          {currentQuestion.type === "multiple" && (
            <div className="answer-options">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  className={`answer-option ${selectedOption === option ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Text Input */}
          {currentQuestion.type === "text" && (
            <div className="text-input-area">
              <textarea
                className="text-input"
                placeholder={currentQuestion.placeholder}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                rows={4}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="assessment-actions">
            <button 
              className="assessment-btn assessment-btn-secondary"
              onClick={handleSkip}
            >
              Skip
            </button>
            <button 
              className="assessment-btn assessment-btn-primary"
              onClick={handleNext}
              disabled={
                (currentQuestion.type === "multiple" && !selectedOption) ||
                (currentQuestion.type === "text" && !textInput.trim())
              }
            >
              {currentQuestionIndex === QUESTIONS.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Assessment;