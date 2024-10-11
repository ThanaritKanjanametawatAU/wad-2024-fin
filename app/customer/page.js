"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Link from 'next/link'; // Add this import

export default function Home() {
    const APIBASE = process.env.NEXT_PUBLIC_API_URL;
    const { register: registerCreate, handleSubmit: handleSubmitCreate, reset: resetCreate } = useForm();
    const { register: registerUpdate, handleSubmit: handleSubmitUpdate, reset: resetUpdate } = useForm();
    const [customers, setCustomers] = useState([]);
    const [editingCustomer, setEditingCustomer] = useState(null);

    const startEdit = (customer) => () => {
        setEditingCustomer(customer);
        resetUpdate({
            name: customer.name,
            date_of_birth: customer.date_of_birth,
            member_number: customer.member_number,
            interests: customer.interests
        });
    }

    const cancelEdit = () => {
        setEditingCustomer(null);
        resetUpdate({});
    }

    async function fetchCustomers() {
        const data = await fetch(`${APIBASE}/customer`);
        const c = await data.json();
        setCustomers(c);
    }

    const createCustomer = async (data) => {
        const response = await fetch(`${APIBASE}/customer`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            alert(`Failed to create customer: ${response.status}`);
        } else {
            alert("Customer created successfully");
            fetchCustomers();
            resetCreate();
        }
    }

    const updateCustomer = async (data) => {
        console.log(data);
        const response = await fetch(`${APIBASE}/customer`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: editingCustomer._id,
                updateData: data
            }),
        });

        if (!response.ok) {
            alert(`Failed to update customer: ${response.status}`);
        } else {
            alert("Customer updated successfully");
            fetchCustomers();
            setEditingCustomer(null);
            resetUpdate({});
        }
    }

    const deleteCustomer = async (id) => {
        if (!confirm("Are you sure?")) return;

        const response = await fetch(`${APIBASE}/customer/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            alert(`Failed to delete customer: ${response.status}`);
        } else {
            alert("Customer deleted successfully");
            fetchCustomers();
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className="m-4">
            <h1 className="text-2xl font-bold mb-4">Customers Creation. Enter detail below:</h1>
            
            <form onSubmit={handleSubmitCreate(createCustomer)} className="mb-4">
                <input
                    {...registerCreate("name", { required: true })}
                    placeholder="Customer Name"
                    className="border p-2 mr-2"
                />
                <input
                    {...registerCreate("date_of_birth")}
                    type="date"
                    placeholder="Date of Birth"
                    className="border p-2 mr-2"
                />
                <input
                    {...registerCreate("member_number")}
                    type="number"
                    placeholder="Member Number"
                    className="border p-2 mr-2"
                />
                <input
                    {...registerCreate("interests")}
                    placeholder="Interests"
                    className="border p-2 mr-2"
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Create Customer
                </button>
            </form>

            {editingCustomer && (
                <form onSubmit={handleSubmitUpdate(updateCustomer)} className="mb-4 bg-gray-100 p-4 rounded">
                    <h2 className="text-xl font-bold mb-2">Edit Customer</h2>
                    <input
                        {...registerUpdate("name", { required: true })}
                        placeholder="Customer Name"
                        className="border p-2 mr-2"
                    />
                    <input
                        {...registerUpdate("date_of_birth")}
                        type="date"
                        placeholder="Date of Birth"
                        className="border p-2 mr-2"
                    />
                    <input
                        {...registerUpdate("member_number")}
                        type="number"
                        placeholder="Member Number"
                        className="border p-2 mr-2"
                    />
                    <input
                        {...registerUpdate("interests")}
                        placeholder="Interests"
                        className="border p-2 mr-2"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                        Update Customer
                    </button>
                    <button type="button" onClick={cancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded">
                        Cancel
                    </button>
                </form>
            )}

            <h1 className="text-3xl font-bold mb-4">All Customers List</h1>

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-2 border-b">Name</th>
                        <th className="py-2 px-2 border-b">Date of Birth</th>
                        <th className="py-2 px-2 border-b">Member Number</th>
                        <th className="py-2 px-2 border-b">Interests</th>
                        <th className="py-2 px-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer._id}>
                            <td className="py-2 px-2 border-b">
                                <Link href={`/customer/${customer._id}`} className="text-blue-600 hover:underline">
                                    {customer.name}
                                </Link>
                            </td>
                            <td className="py-2 px-2 border-b">{customer.date_of_birth ? customer.date_of_birth.split('T')[0] : ''}</td>
                            <td className="py-2 px-2 border-b">{customer.member_number}</td>
                            <td className="py-2 px-2 border-b">{customer.interests}</td>
                            <td className="py-2 px-2 border-b">
                                <button
                                    onClick={startEdit(customer)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteCustomer(customer._id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}