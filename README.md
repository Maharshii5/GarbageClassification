# GarbageClassification
Week 1: Foundation and Initial Data Work
In the first week, I focused on setting up the groundwork and getting my hands on some data.

Changes/Activities I Made:
Project Initialization: I set up my development environment (e.g., installed Python, relevant libraries like TensorFlow/PyTorch, scikit-learn), created my project folders, and established version control (like Git).
Initial Data Collection & Exploration: A significant change I made was the acquisition of my initial dataset. This involved:
Downloading pre-existing image datasets of different waste types (plastic, paper, organic, metal, glass, etc.).
Beginning the process of collecting my own images because I decided to build a custom dataset.
Performing initial exploratory data analysis (EDA) to understand the number of classes, image dimensions, and data distribution.
Defining Scope & Goals: I refined my project's scope, identifying the specific types of garbage I aimed to classify and the success metrics.
Research & Literature Review: I spent time researching existing garbage classification models, common deep learning architectures (like CNNs), and best practices, which led to decisions about potential model approaches.
Week 2: Data Preprocessing & Model Prototyping
The second week moved into preparing the data for a model and even training a very basic prototype.

Changes/Activities I Made:
Data Preprocessing Pipeline: A major change here was the implementation of my data preprocessing steps. This included:
Image resizing and normalization to a consistent format.
Data splitting (training, validation, and test sets).
Initial data augmentation techniques (e.g., simple rotations, flips) to increase my dataset size and diversity.
Model Architecture Selection/Initial Implementation: I made decisions about, and started implementing, my initial model architecture. This involved:
Choosing a pre-trained model for transfer learning (e.g., VGG16, ResNet, MobileNet) and adapting its final layers.
Building a simple custom Convolutional Neural Network (CNN) from scratch as a baseline.
First Training Run (Prototype): A key change was running my very first training iterations on a small subset of data or with a simple model. This is where I saw if my data pipeline worked and if the model showed any signs of learning, even if accuracy was low.
Evaluation Metrics Setup: I set up the code to track initial performance metrics like accuracy or loss during training.
In essence, the first week was about gathering resources and laying the foundation, while the second week was about cleaning up those resources (data) and starting to build a rough version of my core solution (the model).
