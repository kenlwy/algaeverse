import { useState, useRef, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import FileUpload from './components/FileUpload';
import Header from './components/Header';
import ThinkingAnimation from './components/ThinkingAnimation';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'file' | 'proposal';
  hasCurrentData?: boolean;
}

interface FileData {
  fileName: string;
  extractedText: string;
  filePath: string;
}

interface ThinkingStep {
  id: string;
  text: string;
  type: 'research' | 'analysis' | 'generation';
  completed: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AlgaeVerse assistant. I can help you with anything about the smart algae farming system - from costs and technical details to environmental benefits and investment proposals. What would you like to know about? You can ask me about:\n\n• Costs and pricing\n• Technical features and innovations\n• Environmental impact and benefits\n• Investment opportunities\n• Implementation timeline\n• Or anything else about AlgaeVerse!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userCountry, setUserCountry] = useState('');
  const [thinkingSteps, setThinkingSteps] = useState<ThinkingStep[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, thinkingSteps]);

  const startThinkingAnimation = (message: string) => {
    const costKeywords = ['cost', 'price', 'pricing', 'budget', 'investment', 'roi', 'return', 'money', 'expensive', 'cheap', 'afford'];
    const technicalKeywords = ['technical', 'feature', 'innovation', 'system', 'how', 'work', 'function'];
    const environmentalKeywords = ['environment', 'impact', 'co2', 'oxygen', 'green', 'sustainable', 'climate'];
    const proposalKeywords = ['proposal', 'investment', 'business', 'plan', 'comprehensive'];
    
    const isCostQuestion = costKeywords.some(keyword => message.toLowerCase().includes(keyword));
    const isTechnicalQuestion = technicalKeywords.some(keyword => message.toLowerCase().includes(keyword));
    const isEnvironmentalQuestion = environmentalKeywords.some(keyword => message.toLowerCase().includes(keyword));
    const isProposalQuestion = proposalKeywords.some(keyword => message.toLowerCase().includes(keyword));
    
    const steps: ThinkingStep[] = [
      {
        id: '1',
        text: 'Analyzing your question and intent...',
        type: 'analysis',
        completed: false
      },
      {
        id: '2',
        text: 'Identifying relevant data sources...',
        type: 'research',
        completed: false
      }
    ];

    if (isCostQuestion && userCountry) {
      steps.push(
        {
          id: '3',
          text: 'Researching current market data for ' + userCountry + '...',
          type: 'research',
          completed: false
        },
        {
          id: '4',
          text: 'Analyzing labor costs and material prices...',
          type: 'analysis',
          completed: false
        },
        {
          id: '5',
          text: 'Calculating installation and maintenance costs...',
          type: 'analysis',
          completed: false
        },
        {
          id: '6',
          text: 'Comparing with project baseline data...',
          type: 'analysis',
          completed: false
        },
        {
          id: '7',
          text: 'Factoring in local market conditions...',
          type: 'analysis',
          completed: false
        }
      );
    } else if (isTechnicalQuestion) {
      steps.push(
        {
          id: '3',
          text: 'Reviewing technical specifications...',
          type: 'analysis',
          completed: false
        },
        {
          id: '4',
          text: 'Analyzing system components and innovations...',
          type: 'analysis',
          completed: false
        },
        {
          id: '5',
          text: 'Evaluating performance metrics...',
          type: 'analysis',
          completed: false
        },
        {
          id: '6',
          text: 'Assessing technical advantages...',
          type: 'analysis',
          completed: false
        }
      );
    } else if (isEnvironmentalQuestion) {
      steps.push(
        {
          id: '3',
          text: 'Calculating CO2 absorption rates...',
          type: 'analysis',
          completed: false
        },
        {
          id: '4',
          text: 'Analyzing oxygen generation efficiency...',
          type: 'analysis',
          completed: false
        },
        {
          id: '5',
          text: 'Comparing with traditional solutions...',
          type: 'analysis',
          completed: false
        },
        {
          id: '6',
          text: 'Evaluating energy savings potential...',
          type: 'analysis',
          completed: false
        },
        {
          id: '7',
          text: 'Assessing space efficiency benefits...',
          type: 'analysis',
          completed: false
        }
      );
    } else if (isProposalQuestion) {
      steps.push(
        {
          id: '3',
          text: 'Gathering comprehensive project data...',
          type: 'research',
          completed: false
        },
        {
          id: '4',
          text: 'Analyzing market opportunities...',
          type: 'analysis',
          completed: false
        },
        {
          id: '5',
          text: 'Structuring investment proposal...',
          type: 'analysis',
          completed: false
        },
        {
          id: '6',
          text: 'Including financial projections...',
          type: 'analysis',
          completed: false
        },
        {
          id: '7',
          text: 'Adding risk assessment and timeline...',
          type: 'analysis',
          completed: false
        }
      );
    } else {
      // General question
      steps.push(
        {
          id: '3',
          text: 'Searching relevant information...',
          type: 'research',
          completed: false
        },
        {
          id: '4',
          text: 'Analyzing context and requirements...',
          type: 'analysis',
          completed: false
        }
      );
    }

    steps.push(
      {
        id: (steps.length + 1).toString(),
        text: 'Structuring response with key insights...',
        type: 'generation',
        completed: false
      },
      {
        id: (steps.length + 2).toString(),
        text: 'Finalizing answer with recommendations...',
        type: 'generation',
        completed: false
      }
    );

    setThinkingSteps(steps);
    setIsThinking(true);

    // Simulate thinking process with varying delays based on step complexity
    steps.forEach((step, index) => {
      let delay = (index + 1) * 800;
      
      // Research steps take longer
      if (step.type === 'research') {
        delay = (index + 1) * 1200;
      }
      // Analysis steps take medium time
      else if (step.type === 'analysis') {
        delay = (index + 1) * 1000;
      }
      // Generation steps are faster
      else if (step.type === 'generation') {
        delay = (index + 1) * 600;
      }
      
      setTimeout(() => {
        setThinkingSteps(prev => 
          prev.map(s => 
            s.id === step.id ? { ...s, completed: true } : s
          )
        );
      }, delay);
    });
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    startThinkingAnimation(text);

    try {
      const response = await fetch('https://algaeverse.kenn.my/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          fileData,
          userCountry
        }),
      });

      const data = await response.json();

      if (data.success) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: 'bot',
          timestamp: new Date(),
          type: 'proposal',
          hasCurrentData: data.hasCurrentData
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
      setThinkingSteps([]);
    }
  };

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);

    try {
      const response = await fetch('https://algaeverse.kenn.my/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFileData({
          fileName: data.fileName,
          extractedText: data.extractedText,
          filePath: data.filePath
        });

        const fileMessage: Message = {
          id: Date.now().toString(),
          text: `File uploaded: ${file.name}`,
          sender: 'user',
          timestamp: new Date(),
          type: 'file'
        };

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Great! I've processed your file "${file.name}". I can see the additional requirements and I'm ready to help you with any questions about AlgaeVerse. What specific aspect would you like to explore? For example:\n\n• How much would this cost?\n• What are the technical specifications?\n• What's the environmental impact?\n• How long until ROI?\n• Or anything else you'd like to know!`,
          sender: 'bot',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, fileMessage, botMessage]);
      } else {
        throw new Error(data.error || 'File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Sorry, there was an error uploading your file. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            AI-Powered Investment Proposals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate professional investment proposals for the revolutionary AlgaeVerse smart algae farming system. 
            Transform urban spaces into sustainable cooling solutions.
          </p>
        </div>

        {/* Main Chat Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-6 py-3 rounded-2xl shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  {message.hasCurrentData && (
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 font-medium">Current Market Data</span>
                    </div>
                  )}
                  <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 max-w-xs lg:max-w-md px-6 py-3 rounded-2xl shadow-sm border border-gray-200">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            {isThinking && <ThinkingAnimation steps={thinkingSteps} />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="flex items-center space-x-4 mb-4">
              <FileUpload onFileUpload={handleFileUpload} />
              <ChatInterface onSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>
            
            {/* Country Input */}
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Country
                </label>
                <input
                  type="text"
                  placeholder="Enter your country for location-specific proposals..."
                  value={userCountry}
                  onChange={(e) => setUserCountry(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600 text-sm">Advanced AI analyzes your requirements and generates comprehensive investment proposals.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">File Upload Support</h3>
            <p className="text-gray-600 text-sm">Upload PDFs, DOCX files, and images to provide additional context for your proposals.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost Analysis</h3>
            <p className="text-gray-600 text-sm">Get detailed cost estimates, ROI projections, and financial analysis for your investment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
