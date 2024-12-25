import React, { useState } from 'react';

const Modal = ({ onSubmit }) => {
    const defaultReturnDate = new Date();
    defaultReturnDate.setDate(defaultReturnDate.getDate() + 14);
    const [returnDate, setReturnDate] = useState(defaultReturnDate.toISOString().split('T')[0]);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!returnDate) {
            setError('Return date is required.');
            return;
        }
        setError('');
        onSubmit(returnDate);
    };

    return (
        <div className="modal modal-open">
            <form onSubmit={handleSubmit} className="modal-box">
                <h3 className="text-lg font-bold">Set Return Date</h3>
                <input
                    type="date"
                    className="input input-bordered w-full mt-2"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    required
                    aria-label="Return Date"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <div className="modal-action">
                    <button type="submit" className="btn btn-primary">Confirm</button>
                    <button
                        type="button"
                        className="btn"
                        onClick={() => onSubmit(null)}
                        aria-label="Cancel"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Modal;
