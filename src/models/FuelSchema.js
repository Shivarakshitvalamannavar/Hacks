const mongoose =require('mongoose')

const FuelSchema = new mongoose.Schema({
    data: {
        id: { type: String, required: true },
        type: { type: String, required: true },
        attributes: {
            fuel_source_type: { type: String, required: true },
            fuel_source_unit: { type: String, required: true },
            fuel_source_value: { type: Number, required: true },
            estimated_at: { type: Date, required: true },
            carbon_g: { type: Number, required: true },
            carbon_lb: { type: Number, required: true },
            carbon_kg: { type: Number, required: true },
            carbon_mt: { type: Number, required: true },
        },
    },
    user_id: { type: String, required: true },
    est_type:{ type: String, required: true },
});

const FuelEstimate = mongoose.models.FuelEstimate || mongoose.model('FuelEstimate', FuelSchema);

module.exports = FuelEstimate;
