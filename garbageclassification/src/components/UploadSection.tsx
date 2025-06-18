import React, { useCallback, useState } from 'react';
import { Upload, Camera, RotateCcw, Loader, AlertTriangle } from 'lucide-react';
import { garbageClassifier } from '../utils/modelLoader';
import { ClassificationResult } from '../utils/modelLoader';

interface UploadSectionProps {
  onClassification: (result: ClassificationResult, imageUrl: string) => void;
  onReset: () => void;
  hasResult: boolean;
  modelReady: boolean;
}

const UploadSection: React.FC<UploadSectionProps> = ({ 
  onClassification, 
  onReset, 
  hasResult,
  modelReady
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  const classifyImage = useCallback(async (file: File) => {
    if (!modelReady) {
      setError('AI model is not ready yet. Please wait for it to load.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Create image element for processing
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      
      img.onload = async () => {
        try {
          const result = await garbageClassifier.classifyImage(img);
          onClassification(result, imageUrl);
        } catch (err) {
          setError('Failed to classify image. Please try again.');
          console.error('Classification error:', err);
        } finally {
          setIsProcessing(false);
        }
      };

      img.onerror = () => {
        setError('Failed to load image. Please try a different file.');
        setIsProcessing(false);
        URL.revokeObjectURL(imageUrl);
      };

      img.src = imageUrl;
    } catch (err) {
      setError('Failed to process image. Please try again.');
      setIsProcessing(false);
    }
  }, [modelReady, onClassification]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        classifyImage(file);
      } else {
        setError('Please upload an image file (PNG, JPG, JPEG)');
      }
    }
  }, [classifyImage]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        classifyImage(file);
      } else {
        setError('Please upload an image file (PNG, JPG, JPEG)');
      }
    }
  }, [classifyImage]);

  if (hasResult) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Classification Complete!</h3>
          <p className="text-gray-600 mb-8">
            Your waste item has been successfully analyzed by our AI model. Check the detailed results below.
          </p>
          <button
            onClick={onReset}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Classify Another Item</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Upload className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">AI-Powered Classification</h3>
        <p className="text-gray-600">
          Upload an image of your waste item for instant AI analysis and recycling recommendations
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-emerald-500 bg-emerald-50'
            : isProcessing
            ? 'border-emerald-300 bg-emerald-25'
            : modelReady
            ? 'border-gray-300 hover:border-emerald-400 hover:bg-emerald-25'
            : 'border-gray-200 bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center">
            <Loader className="h-16 w-16 text-emerald-600 animate-spin mb-6" />
            <p className="text-xl font-semibold text-emerald-600 mb-2">Analyzing Image...</p>
            <p className="text-gray-500">Our AI is processing your waste item using TensorFlow.js</p>
          </div>
        ) : (
          <>
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Camera className="h-12 w-12 text-gray-400" />
            </div>
            <p className="text-xl font-semibold text-gray-700 mb-2">
              {dragActive ? 'Drop your image here' : 'Choose an image to classify'}
            </p>
            <p className="text-gray-500 mb-8">PNG, JPG, JPEG up to 10MB</p>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isProcessing || !modelReady}
            />
            <label
              htmlFor="file-upload"
              className={`inline-block px-8 py-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl ${
                modelReady
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {modelReady ? 'Select Image' : 'Loading AI Model...'}
            </label>
          </>
        )}
      </div>

      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">AI Can Classify:</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { icon: '🍃', name: 'Organic' },
            { icon: '♻️', name: 'Plastic' },
            { icon: '📄', name: 'Paper' },
            { icon: '🥫', name: 'Metal' },
            { icon: '🍶', name: 'Glass' },
            { icon: '💻', name: 'E-waste' }
          ].map((category, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg px-3 py-2 border border-gray-200"
            >
              <span className="text-lg">{category.icon}</span>
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadSection;