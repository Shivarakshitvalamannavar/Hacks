import mongoose from 'mongoose';

const FlightSchema = new mongoose.Schema({
    data: {
        id: { type: String, required: true },
        type: { type: String, required: true },
        attributes: {
            passengers: { type: Number, required: true },
            legs: [{
                departure_airport: { type: String, required: true },
                destination_airport: { type: String, required: true }
            }],
            estimated_at: { type: Date, required: true },
            carbon_g: { type: Number, required: true },
            carbon_lb: { type: Number, required: true },
            carbon_kg: { type: Number, required: true },
            carbon_mt: { type: Number, required: true },
            distance_unit: { type: String, required: true },
            distance_value: { type: Number, required: true }
        }
    },
    user_id: { type: String, required: true },
    est_type:{ type: String, required: true },
});

const FlightEstimate = mongoose.models.FlightEstimate || mongoose.model('FlightEstimate', FlightSchema);

export default FlightEstimate;
