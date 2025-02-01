const mongoose = require('mongoose');

const ElectricitySchema = new mongoose.Schema({
    data: {
        id: { type: String },
        type: { type: String },
        attributes: {
            country: { type: String },
            state: { type: String },
            electricity_unit: { type: String },
            electricity_value: { type: String },
            estimated_at: { type: Date },
            carbon_g: { type: Number },
            carbon_lb: { type: Number },
            carbon_kg: { type: Number },
            carbon_mt: { type: Number }
        }
    },
    user_id: { type: String, required: true }
});

module.exports = mongoose.model('ElectricityEstimate', ElectricitySchema);