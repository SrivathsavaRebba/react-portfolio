import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  
  // New states for backend interaction
  const [serverStatus, setServerStatus] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (currentData) => {
    const newErrors = {};
    if (!currentData.name.trim()) newErrors.name = 'Name is required';
    if (!currentData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(currentData.email)) {
      newErrors.email = 'Please enter a valid email format';
    }
    if (!currentData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    validateForm(updatedFormData);
    setServerStatus(null); // Clear previous server messages when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerStatus(null);

    try {
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        // Display backend error if server rejects the payload
        setServerStatus({ type: 'error', text: data.error || 'Submission failed on server' });
      } else {
        // Success
        setServerStatus({ type: 'success', text: 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        setIsFormValid(false);
      }
    } catch (err) {
      setServerStatus({ type: 'error', text: 'Server is currently unreachable.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section" style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Contact Me:</h2>
      
      {serverStatus && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '15px', 
          borderRadius: '4px',
          backgroundColor: serverStatus.type === 'error' ? '#ffebee' : '#e8f5e9',
          color: serverStatus.type === 'error' ? '#c62828' : '#2e7d32',
          border: `1px solid ${serverStatus.type === 'error' ? '#ef9a9a' : '#a5d6a7'}`
        }}>
          {serverStatus.text}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
          {errors.name && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.name}</span>}
        </div>

        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
          {errors.email && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Message:</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
          {errors.message && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.message}</span>}
        </div>

        <button 
          type="submit" 
          disabled={!isFormValid || isSubmitting}
          style={{ padding: '12px 20px', backgroundColor: isFormValid && !isSubmitting ? '#2b6cb0' : '#a0aec0', color: 'white', border: 'none', borderRadius: '4px', cursor: isFormValid && !isSubmitting ? 'pointer' : 'not-allowed', fontWeight: 'bold', marginTop: '10px' }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message!'}
        </button>
      </form>
    </section>
  );
};

export default Contact;