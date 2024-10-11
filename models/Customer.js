import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  date_of_birth: Date,
  member_number: Number,
  interests: String
});

const Customer = mongoose.models.customer || mongoose.model("customer", customerSchema);

export default Customer;