// SteerClear Landing Page - JavaScript
// Handles form submission and UPI payment integration

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('roadmap-form');
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            examDate: document.getElementById('exam-date').value,
            dailyHours: document.getElementById('daily-hours').value,
            level: document.getElementById('level').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            timestamp: new Date().toISOString()
        };
        
        // Validate form
        if (!validateForm(formData)) {
            alert('Please fill all fields correctly.');
            return;
        }
        
        // Store data temporarily (we'll send to backend later)
        localStorage.setItem('steerClearFormData', JSON.stringify(formData));
        
        // For now: Alert user (we'll add Razorpay integration next)
        alert(`Form submitted successfully!\n\nNext: We'll integrate Razorpay payment.\n\nYour data:\n- Exam: ${formData.examDate}\n- Hours: ${formData.dailyHours}/day\n- Level: ${formData.level}\n- Email: ${formData.email}`);
        
        // TODO: Redirect to Razorpay payment page
        // initiatePayment(formData);
    });
    
    // Form validation
    function validateForm(data) {
        if (!data.examDate || !data.dailyHours || !data.level || !data.email || !data.phone) {
            return false;
        }
        
        // Validate exam date is in future
        const examDate = new Date(data.examDate);
        const today = new Date();
        if (examDate <= today) {
            alert('Exam date must be in the future.');
            return false;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return false;
        }
        
        // Validate phone format
        const phoneRegex = /^\+91[0-9]{10}$/;
        if (!phoneRegex.test(data.phone)) {
            alert('Please enter a valid WhatsApp number (+91XXXXXXXXXX).');
            return false;
        }
        
        return true;
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(30, 41, 59, 0.7)';
        }
    });
});