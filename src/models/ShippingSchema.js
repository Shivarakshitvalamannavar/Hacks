import mongoose from 'mongoose';

const ShippingSchema = new mongoose.Schema({
    data: {
        id: { type: String, required: true },
        type: { type: String, required: true },
        attributes: {
            distance_value: { type: Number, required: true },
            distance_unit: { type: String, required: true },
            weight_value: { type: Number, required: true },
            weight_unit: { type: String, required: true },
            transport_method: { type: String, required: true },
            estimated_at: { type: Date, required: true },
            carbon_g: { type: Number, required: true },
            carbon_lb: { type: Number, required: true },
            carbon_kg: { type: Number, required: true },
            carbon_mt: { type: Number, required: true }
        }
    },
    user_id: { type: String, required: true },
    est_type:{ type: String, required: true },
});

const ShippingEstimate = mongoose.models.ShippingEstimate || mongoose.model('ShippingEstimate', ShippingSchema);

export default ShippingEstimate;