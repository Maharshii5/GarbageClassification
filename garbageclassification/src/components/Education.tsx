import React from 'react';
import { BookOpen, Target, Recycle, Lightbulb, ExternalLink } from 'lucide-react';

const Education: React.FC = () => {
  const educationalContent = [
    {
      icon: Target,
      title: 'Why Proper Classification Matters',
      description: 'Learn how correct waste sorting can reduce landfill waste by up to 75% and significantly lower carbon emissions.',
      color: 'from-red-500 to-pink-500',
      tips: [
        'Reduces contamination in recycling streams',
        'Increases efficiency of waste processing facilities',
        'Helps create circular economy opportunities'
      ]
    },
    {
      icon: Recycle,
      title: 'Recycling Best Practices',
      description: 'Discover the do\'s and don\'ts of recycling to maximize environmental impact and processing efficiency.',
      color: 'from-green-500 to-emerald-500',
      tips: [
        'Clean containers before recycling',
        'Remove caps and labels when required',
        'Check local recycling guidelines regularly'
      ]
    },
    {
      icon: Lightbulb,
      title: 'Waste Reduction Strategies',
      description: 'Explore practical ways to minimize waste generation at the source through conscious consumption choices.',
      color: 'from-amber-500 to-orange-500',
      tips: [
        'Choose reusable products over disposables',
        'Buy only what you need to reduce food waste',
        'Repair items instead of replacing when possible'
      ]
    }
  ];

  const wasteGuide = [
    {
      category: 'Organic',
      icon: '🍃',
      examples: ['Food scraps', 'Yard waste', 'Paper towels'],
      disposal: 'Compost at home or use organic waste bins'
    },
    {
      category: 'Plastic',
      icon: '♻️',
      examples: ['Bottles', 'Containers', 'Packaging'],
      disposal: 'Clean and sort by recycling number'
    },
    {
      category: 'Paper',
      icon: '📄',
      examples: ['Newspapers', 'Cardboard', 'Office paper'],
      disposal: 'Keep dry and remove any plastic components'
    },
    {
      category: 'Metal',
      icon: '🥫',
      examples: ['Cans', 'Foil', 'Small appliances'],
      disposal: 'Rinse food containers and separate materials'
    },
    {
      category: 'Glass',
      icon: '🍶',
      examples: ['Bottles', 'Jars', 'Containers'],
      disposal: 'Remove lids and rinse before recycling'
    },
    {
      category: 'E-waste',
      icon: '💻',
      examples: ['Phones', 'Computers', 'Batteries'],
      disposal: 'Use certified e-waste recycling centers'
    }
  ];

  return (
    <section id="education" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-8 w-8 text-emerald-600" />
            <h2 className="text-4xl font-bold text-gray-800">
              Learn About Waste Management
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Educate yourself about proper waste classification and sustainable practices 
            to make a positive environmental impact.
          </p>
        </div>

        {/* Educational Content Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {educationalContent.map((content, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1"
            >
              <div className={`h-2 bg-gradient-to-r ${content.color}`}></div>
              <div className="p-8">
                <div className={`w-12 h-12 bg-gradient-to-r ${content.color} rounded-xl flex items-center justify-center mb-6`}>
                  <content.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{content.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{content.description}</p>
                
                <div className="space-y-3">
                  {content.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Waste Classification Guide */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Quick Classification Guide</h3>
            <p className="text-emerald-100">
              Reference guide for common waste items and their proper disposal methods.
            </p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wasteGuide.map((guide, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">{guide.icon}</span>
                    <h4 className="text-lg font-bold text-gray-800">{guide.category}</h4>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Examples:</h5>
                    <div className="flex flex-wrap gap-1">
                      {guide.examples.map((example, exampleIndex) => (
                        <span
                          key={exampleIndex}
                          className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg text-xs font-medium"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Proper Disposal:</h5>
                    <p className="text-sm text-gray-600">{guide.disposal}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Start classifying your waste today and join thousands of users making 
              a positive environmental impact through proper waste management.
            </p>
            <a
              href="#classify"
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300 inline-flex items-center space-x-2"
            >
              <span>Get Started Now</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;