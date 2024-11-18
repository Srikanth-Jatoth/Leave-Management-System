// src/components/LeaveRequestForm.tsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LeaveRequest } from '../types';

export const LeaveRequestForm: React.FC = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        reason: '',
        type: 'ANNUAL'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/leave-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Handle success
            }
        } catch (error) {
            console.error('Error submitting leave request:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Start Date
                </label>
                <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                />
            </div>
            {/* Similar fields for endDate, reason, and type */}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Submit Request
            </button>
        </form>
    );
};
