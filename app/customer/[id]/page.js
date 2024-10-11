
export default async function CustomerDetail({ params }) {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    const data = await fetch(`${API_BASE}/customer/${params.id}`);
    const customer = await data.json();

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Customer Details</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4">
                    <DetailItem label="ID" value={customer._id} />
                    <DetailItem label="Name" value={customer.name} />
                    <DetailItem 
                        label="Date of Birth" 
                        value={customer.date_of_birth ? customer.date_of_birth.split('T')[0] : ''} 
                    />
                    <DetailItem label="Member Number" value={customer.member_number} />
                    <DetailItem label="Interests" value={customer.interests} />
                </div>
            </div>
        </div>
    );
}

function DetailItem({ label, value }) {
    return (
        <div className="mb-4">
            <span className="font-semibold text-gray-700">{label}:</span>
            <span className="ml-2 text-gray-600">{value}</span>
        </div>
    );
}