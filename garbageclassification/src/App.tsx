import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ModelStatus from './components/ModelStatus';
import UploadSection from './components/UploadSection';
import ClassificationResult from './components/ClassificationResult';
import Statistics from './components/Statistics';
import Education from './components/Education';
import Footer from './components/Footer';
import { ClassificationResult as ClassificationData } from './utils/modelLoader';

function App() {
  const [classificationResult, setClassificationResult] = useState<ClassificationData | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [modelReady, setModelReady] = useState(false);

  const handleClassification = (result: ClassificationData, imageUrl: string) => {
    setClassificationResult(result);
    setUploadedImage(imageUrl);
  };

  const handleReset = () => {
    setClassificationResult(null);
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
  };

  const handleModelReady = (ready: boolean) => {
    setModelReady(ready);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <Navigation />
      
      <main>
        <Hero />
        
        <section id="classify" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                AI-Powered Waste Classification
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Upload an image of your waste item and our TensorFlow.js AI model will identify the proper category
                and provide intelligent recycling recommendations.
              </p>
            </div>

            {/* Model Status */}
            <div className="max-w-2xl mx-auto mb-8">
              <ModelStatus onModelReady={handleModelReady} />
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <UploadSection 
                onClassification={handleClassification}
                onReset={handleReset}
                hasResult={!!classificationResult}
                modelReady={modelReady}
              />
              
              {classificationResult && uploadedImage && (
                <ClassificationResult 
                  result={classificationResult}
                  imageUrl={uploadedImage}
                />
              )}
            </div>
          </div>
        </section>

        <Statistics />
        <Education />
      </main>

      <Footer />
    </div>
  );
}

export default App;