// src/components/FAQ.tsx
import { useState } from 'react';
import './FAQ.css';

const faqs = [
  {
    question: "Is Path Finder actually free?",
    answer: "Yes. The core assessment and your personalized roadmap are completely free for high school students. We do not charge hidden fees or require a credit card to see your results."
  },
  {
    question: "How long does the assessment take?",
    answer: "Most students finish it in about 10 to 15 minutes. It is designed as a quick conversation, not a grueling 3-hour standardized test."
  },
  {
    question: "What if I change my mind about a career later?",
    answer: "That is the point of the tool. If your interests change, you can update your profile and the AI will instantly rebuild your roadmap. You never have to start over from scratch."
  },
  {
    question: "Is my personal data safe?",
    answer: "Yes. We use standard encryption for all data. We do not sell your personal information to third parties, colleges, or recruiters."
  },
  {
    question: "Does this replace my school counselor?",
    answer: "No. Think of Path Finder as a tool to help you prepare for those meetings. We give you the data and the plan so you can have better conversations with your counselor."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq">
      <div className="faq-container">
        <h2 className="faq-title">Frequently asked questions</h2>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              {openIndex === index ? (
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded="true"
                >
                  {faq.question}
                  <svg className="faq-icon" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded="false"
                >
                  {faq.question}
                  <svg className="faq-icon" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              )}
              
              {openIndex === index && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;