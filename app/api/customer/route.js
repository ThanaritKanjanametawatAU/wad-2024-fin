import Customer from "@/models/Customer";

export async function GET() {
  const customers = await Customer.find()
  return Response.json(customers)
}

export async function POST(request) {
  const body = await request.json()
  const customer = new Customer(body)
  await customer.save()
  return Response.json(customer)
}

export async function PUT(request) {
  const body = await request.json()
  const { _id, updateData } = body;
  const customer = await Customer.findByIdAndUpdate(_id, updateData, { new: true });
  if (!customer) {
    return new Response("Customer not found", { status: 404 });
  }
  return Response.json(customer)
}