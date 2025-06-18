import React from 'react';
import { Leaf, Recycle, TreePine, Zap, Brain, Cpu } from 'lucide-react';

const Hero: React.FC = () => {
  const features = [
    { icon: Brain, text: 'TensorFlow.js AI' },
    { icon: Recycle, text: 'Smart Classification' },
    { icon: TreePine, text: 'Environmental Impact' },
    { icon: Zap, text: 'Real-time Analysis' },
  ];

  return (
    <section id="home" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Cpu className="h-6 w-6 text-white" />
            </div>
            <span className="text-emerald-600 font-semibold text-lg">Powered by TensorFlow.js</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Intelligent
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Waste Classification
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Revolutionary AI-powered waste management using advanced machine learning. 
            Simply upload an image and get instant categorization with intelligent recycling recommendations.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50"
              >
                <feature.icon className="h-5 w-5 text-emerald-600" />
                <span className="text-gray-700 font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#classify"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-5 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Start AI Classification
            </a>
            <a
              href="#education"
              className="bg-white/90 backdrop-blur-sm text-gray-700 px-10 py-5 rounded-xl font-semibold text-lg hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/50"
            >
              Learn More
            </a>
          </div>

          {/* AI Technology Badge */}
          <div className="mt-12 flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Real-time Processing</span>
            </div>
            <div className="w-1 h-4 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-500"></div>
              <span>Client-side AI</span>
            </div>
            <div className="w-1 h-4 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-1000"></div>
              <span>Privacy Protected</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;