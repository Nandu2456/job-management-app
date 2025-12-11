    const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyName: String,
  role: String,
  jobDescription: String,
  jobLink: String,
  applied: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
