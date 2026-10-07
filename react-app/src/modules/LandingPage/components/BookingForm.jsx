// CONTENT + MESSAGE LAYER: appointment request form.
// There is no booking endpoint yet, so the request is confirmed client-side.

import { useState } from 'react';

const EMPTY = { name: '', phone: '', email: '', date: '' };

function BookingForm() {
  const [form, setForm] = useState(EMPTY);
  const today = new Date().toISOString().split('T')[0];

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${form.name}! Your appointment request for ${form.date} has been received.`);
    setForm(EMPTY);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>book appointment</h3>
      <input type="text" placeholder="your name" className="box" value={form.name} onChange={update('name')} required />
      <input type="tel" placeholder="your number" className="box" value={form.phone} onChange={update('phone')} required />
      <input type="email" placeholder="your email" className="box" value={form.email} onChange={update('email')} required />
      <input type="date" className="box" min={today} value={form.date} onChange={update('date')} required />
      <input type="submit" value="book now" className="btn" />
    </form>
  );
}

export default BookingForm;
