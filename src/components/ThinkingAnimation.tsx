import React from 'react';

interface ThinkingStep {
  id: string;
  text: string;
  type: 'research' | 'analysis' | 'generation';
  completed: boolean;
}

interface ThinkingAnimationProps {
  steps: ThinkingStep[];
}

const ThinkingAnimation: React.FC<ThinkingAnimationProps> = ({ steps }) => {
  const getStepIcon = (type: string, completed: boolean) => {
    if (completed) {
      return (
        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      );
    }

    switch (type) {
      case 'research':
        return (
          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'analysis':
        return (
          <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'generation':
        return (
          <div className="w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse"></div>;
    }
  };

  const getStepColor = (type: string, completed: boolean) => {
    if (completed) return 'text-green-600';
    
    switch (type) {
      case 'research': return 'text-blue-600';
      case 'analysis': return 'text-purple-600';
      case 'generation': return 'text-indigo-600';
      default: return 'text-gray-600';
    }
  };

  const getStepDescription = (step: ThinkingStep) => {
    const descriptions: { [key: string]: string } = {
      'Analyzing your question and intent...': 'Understanding what you\'re asking and determining the best approach',
      'Identifying relevant data sources...': 'Finding the most accurate and up-to-date information',
      'Researching current market data for': 'Gathering real-time market information and local conditions',
      'Analyzing labor costs and material prices...': 'Calculating installation and operational costs',
      'Calculating installation and maintenance costs...': 'Estimating setup costs and ongoing requirements',
      'Comparing with project baseline data...': 'Cross-referencing with established project estimates',
      'Factoring in local market conditions...': 'Adjusting estimates based on regional factors',
      'Reviewing technical specifications...': 'Examining system components and capabilities',
      'Analyzing system components and innovations...': 'Evaluating technological advantages',
      'Evaluating performance metrics...': 'Assessing efficiency and operational benefits',
      'Assessing technical advantages...': 'Identifying competitive advantages',
      'Calculating CO2 absorption rates...': 'Measuring environmental impact',
      'Analyzing oxygen generation efficiency...': 'Evaluating air purification capabilities',
      'Comparing with traditional solutions...': 'Benchmarking against conventional solutions',
      'Evaluating energy savings potential...': 'Calculating reduced energy consumption',
      'Assessing space efficiency benefits...': 'Analyzing urban space optimization',
      'Gathering comprehensive project data...': 'Collecting all relevant information',
      'Analyzing market opportunities...': 'Identifying target markets and potential',
      'Structuring investment proposal...': 'Organizing into professional document',
      'Including financial projections...': 'Adding cost-benefit analysis',
      'Adding risk assessment and timeline...': 'Evaluating risks and timeline',
      'Searching relevant information...': 'Finding appropriate data',
      'Analyzing context and requirements...': 'Understanding your specific needs',
      'Structuring response with key insights...': 'Organizing clear response',
      'Finalizing answer with recommendations...': 'Adding actionable advice'
    };

    return descriptions[step.text] || 'Processing your request...';
  };

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className="flex justify-start">
      <div className="bg-white text-gray-800 max-w-md lg:max-w-lg px-6 py-4 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">AI is thinking...</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex flex-col space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="space-y-2">
              <div className="flex items-center space-x-3">
                {getStepIcon(step.type, step.completed)}
                <span className={`text-sm font-medium ${getStepColor(step.type, step.completed)} transition-colors duration-300`}>
                  {step.text}
                </span>
                {step.completed && (
                  <div className="ml-auto">
                    <span className="text-xs text-green-500 font-medium">✓</span>
                  </div>
                )}
              </div>
              {/* Step Description */}
              <div className="ml-7">
                <span className="text-xs text-gray-500 italic">
                  {getStepDescription(step)}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Progress Text */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {completedSteps} of {steps.length} steps completed
            </span>
            <span className="text-xs text-gray-400">
              {Math.round(progressPercentage)}% complete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThinkingAnimation; 