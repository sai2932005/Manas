import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    // User who owns this session
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Session title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Current CBT stage
    currentStep: {
      type: String,
      enum: [
        'thought',
        'analysis',
        'distortion',
        'technique',
        'experiment',
        'reflection',
        'completed',
      ],
      default: 'thought',
    },

    // Session status
    status: {
      type: String,
      enum: ['active', 'completed', 'abandoned'],
      default: 'active',
    },

    // Mood before starting
    moodBefore: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },

    // Mood after completing
    moodAfter: {
      type: Number,
      min: 1,
      max: 10,
      default: null,
    },

    // Session completion time
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model('Session', sessionSchema);

export default Session;