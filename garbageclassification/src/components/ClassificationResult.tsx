import React from 'react';
import { CheckCircle, Lightbulb, TrendingUp, Brain, Recycle } from 'lucide-react';
import { ClassificationResult as ClassificationData } from '../utils/modelLoader';

interface ClassificationResultProps {
  result: ClassificationData;
  imageUrl: string;
}

const ClassificationResult: React.FC<ClassificationResultProps> = ({ 
  result, 
  imageUrl 
}) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'from-green-500 to-emerald-500';
    if (confidence >= 75) return 'from-blue-500 to-cyan-500';
    if (confidence >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 90) return 'Very High Confidence';
    if (confidence >= 75) return 'High Confidence';
    if (confidence >= 60) return 'Medium Confidence';
    return 'Low Confidence';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Image Preview */}
      <div className="relative h-72 bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt="Uploaded waste item"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6" />
              <span className="font-semibold">AI Analysis Complete</span>
            </div>
            <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <Brain className="h-4 w-4" />
              <span className="text-sm font-medium">TensorFlow.js</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Classification Result */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">AI Classification Result</h3>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-600">
                {getConfidenceText(result.confidence)}
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 mb-6 border border-emerald-100">
            <div className="flex items-center space-x-4 mb-6">
              <div className={`w-16 h-16 ${result.color} rounded-full flex items-center justify-center text-white text-2xl shadow-lg`}>
                {result.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-3xl font-bold text-gray-800 mb-1">{result.category}</h4>
                <p className="text-gray-600 text-lg">{result.description}</p>
              </div>
            </div>

            {/* Confidence Score */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <span className="font-medium">AI Confidence Score</span>
                <span className="font-bold">{result.confidence}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${getConfidenceColor(result.confidence)} h-4 rounded-full transition-all duration-1000 ease-out shadow-sm`}
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Based on deep learning analysis using computer vision
              </p>
            </div>
          </div>
        </div>

        {/* Recycling Recommendations */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-800">Smart Recycling Recommendations</h4>
          </div>

          <div className="space-y-4">
            {result.recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed font-medium">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Recycle className="h-6 w-6 text-white" />
            </div>
            <h5 className="text-lg font-bold text-gray-800">Environmental Impact</h5>
          </div>
          <p className="text-gray-700 leading-relaxed">
            By properly recycling this <strong>{result.category.toLowerCase()}</strong> item, you're contributing to 
            waste reduction and environmental conservation. Every correctly sorted item helps create 
            a more sustainable future and reduces the burden on our planet's resources.
          </p>
          <div className="mt-4 flex items-center space-x-4 text-sm text-green-700">
            <span className="bg-green-100 px-3 py-1 rounded-full font-medium">♻️ Recyclable</span>
            <span className="bg-green-100 px-3 py-1 rounded-full font-medium">🌱 Eco-Friendly</span>
            <span className="bg-green-100 px-3 py-1 rounded-full font-medium">🌍 Sustainable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassificationResult;