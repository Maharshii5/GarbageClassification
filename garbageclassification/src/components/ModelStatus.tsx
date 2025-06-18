import React, { useEffect, useState } from 'react';
import { Brain, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { garbageClassifier } from '../utils/modelLoader';

interface ModelStatusProps {
  onModelReady: (ready: boolean) => void;
}

const ModelStatus: React.FC<ModelStatusProps> = ({ onModelReady }) => {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadModel = async () => {
      try {
        setStatus('loading');
        await garbageClassifier.loadModel();
        setStatus('ready');
        onModelReady(true);
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Unknown error');
        onModelReady(false);
      }
    };

    loadModel();
  }, [onModelReady]);

  const getStatusConfig = () => {
    switch (status) {
      case 'loading':
        return {
          icon: Loader,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          title: 'Loading AI Model...',
          description: 'Initializing TensorFlow.js and loading classification model'
        };
      case 'ready':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          title: 'AI Model Ready',
          description: 'Classification system is ready to analyze your waste items'
        };
      case 'error':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          title: 'Model Loading Failed',
          description: error || 'Failed to load the classification model'
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <div className={`${config.bgColor} ${config.borderColor} border rounded-xl p-4 mb-6`}>
      <div className="flex items-center space-x-3">
        <div className={`${config.color} ${status === 'loading' ? 'animate-spin' : ''}`}>
          <IconComponent className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <Brain className="h-4 w-4 text-gray-500" />
            <h4 className={`font-semibold ${config.color}`}>{config.title}</h4>
          </div>
          <p className="text-sm text-gray-600 mt-1">{config.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ModelStatus;