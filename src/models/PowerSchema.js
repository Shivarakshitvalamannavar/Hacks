const mongoose = require('mongoose');

const PowerSchema = new mongoose.Schema({
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
    user_id: { type: String, required: true },
    est_type:{ type: String, required: true },
});

const Powerestimate = mongoose.models.Powerestimate||mongoose.model('Powerestimate', PowerSchema);

module.exports =Powerestimate