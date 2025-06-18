import * as tf from '@tensorflow/tfjs';

export interface ClassificationResult {
  category: string;
  confidence: number;
  description: string;
  color: string;
  icon: string;
  recommendations: string[];
}

// Waste categories mapping
const WASTE_CATEGORIES = [
  {
    category: 'Organic',
    description: 'Biodegradable food waste and organic materials',
    color: 'bg-green-500',
    icon: '🍃',
    recommendations: [
      'Compost at home or in community bins',
      'Remove any non-organic materials first',
      'Great for creating nutrient-rich soil',
      'Can be used for biogas production'
    ]
  },
  {
    category: 'Plastic',
    description: 'Recyclable plastic containers, bottles, and packaging',
    color: 'bg-blue-500',
    icon: '♻️',
    recommendations: [
      'Clean containers before recycling',
      'Check recycling number (1-7) on bottom',
      'Remove caps and labels if required',
      'Avoid single-use plastics when possible'
    ]
  },
  {
    category: 'Paper',
    description: 'Paper, cardboard, and paper-based materials',
    color: 'bg-orange-500',
    icon: '📄',
    recommendations: [
      'Keep paper clean and dry',
      'Remove any plastic coating or tape',
      'Flatten cardboard boxes to save space',
      'Separate different paper types if required'
    ]
  },
  {
    category: 'Metal',
    description: 'Aluminum cans, steel containers, and metal objects',
    color: 'bg-gray-500',
    icon: '🥫',
    recommendations: [
      'Rinse containers to remove food residue',
      'Aluminum and steel are highly recyclable',
      'Check with local recycling guidelines',
      'Separate ferrous and non-ferrous metals'
    ]
  },
  {
    category: 'Glass',
    description: 'Glass bottles, jars, and containers',
    color: 'bg-emerald-500',
    icon: '🍶',
    recommendations: [
      'Remove caps and lids before recycling',
      'Rinse to remove food or liquid residue',
      'Separate by color if required locally',
      'Handle carefully to avoid breakage'
    ]
  },
  {
    category: 'E-waste',
    description: 'Electronic devices and components',
    color: 'bg-purple-500',
    icon: '💻',
    recommendations: [
      'Take to certified e-waste recycling centers',
      'Remove personal data before disposal',
      'Many components contain valuable materials',
      'Check manufacturer take-back programs'
    ]
  }
];

class GarbageClassificationModel {
  private model: tf.LayersModel | null = null;
  private isLoaded = false;

  async loadModel(): Promise<void> {
    try {
      // Initialize TensorFlow.js backend
      await tf.ready();
      
      // Create a simple CNN model for demonstration
      // In production, you would load a pre-trained model
      this.model = this.createDemoModel();
      this.isLoaded = true;
      
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Error loading model:', error);
      throw new Error('Failed to load classification model');
    }
  }

  private createDemoModel(): tf.LayersModel {
    // Create a simple demo model structure
    // In production, replace this with a real pre-trained model
    const model = tf.sequential({
      layers: [
        tf.layers.conv2d({
          inputShape: [224, 224, 3],
          filters: 32,
          kernelSize: 3,
          activation: 'relu'
        }),
        tf.layers.maxPooling2d({ poolSize: 2 }),
        tf.layers.conv2d({ filters: 64, kernelSize: 3, activation: 'relu' }),
        tf.layers.maxPooling2d({ poolSize: 2 }),
        tf.layers.conv2d({ filters: 64, kernelSize: 3, activation: 'relu' }),
        tf.layers.flatten(),
        tf.layers.dense({ units: 64, activation: 'relu' }),
        tf.layers.dense({ units: 6, activation: 'softmax' }) // 6 categories
      ]
    });

    return model;
  }

  async classifyImage(imageElement: HTMLImageElement): Promise<ClassificationResult> {
    if (!this.isLoaded || !this.model) {
      throw new Error('Model not loaded');
    }

    try {
      // Preprocess the image
      const tensor = tf.browser.fromPixels(imageElement)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .div(255.0)
        .expandDims(0);

      // For demo purposes, we'll simulate classification with some randomness
      // In production, use: const predictions = this.model.predict(tensor) as tf.Tensor;
      const predictions = this.simulateClassification();
      
      // Get the predicted class
      const predictedClassIndex = await predictions.argMax(-1).data();
      const confidenceScores = await predictions.data();
      
      const classIndex = predictedClassIndex[0];
      const confidence = Math.round(confidenceScores[classIndex] * 100);
      
      // Clean up tensors
      tensor.dispose();
      predictions.dispose();
      
      return {
        ...WASTE_CATEGORIES[classIndex],
        confidence
      };
    } catch (error) {
      console.error('Classification error:', error);
      throw new Error('Failed to classify image');
    }
  }

  private simulateClassification(): tf.Tensor {
    // Simulate realistic classification probabilities
    const probabilities = new Array(6).fill(0).map(() => Math.random());
    const sum = probabilities.reduce((a, b) => a + b, 0);
    const normalizedProbs = probabilities.map(p => p / sum);
    
    // Make one class more likely (simulate confident prediction)
    const maxIndex = normalizedProbs.indexOf(Math.max(...normalizedProbs));
    normalizedProbs[maxIndex] = Math.max(0.7, normalizedProbs[maxIndex]);
    
    return tf.tensor2d([normalizedProbs]);
  }

  isModelLoaded(): boolean {
    return this.isLoaded;
  }
}

// Export singleton instance
export const garbageClassifier = new GarbageClassificationModel();