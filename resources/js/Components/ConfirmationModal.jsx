import React from 'react';

export default function ConfirmationModal({ show, title, message, onConfirm, onCancel }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
                <p className="text-gray-600 mb-6">{message}</p>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-[#F37D2F] focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm rounded-md bg-gradient-to-r from-[#F37D2F] to-[#FF9C4D] hover:from-[#E56D1F] hover:to-[#FF8B3D] text-white transition focus:outline-none focus:ring-2 focus:ring-[#F37D2F] focus:ring-offset-2"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}   