// ============================================
// CONTACT.JS - Contact form validation
// ============================================
// Features:
// - Validates required fields (name, email, subject, message)
// - Email pattern validation (must contain @ and .)
// - Shows success alert after validation
// - Resets form after submission
// Note: No backend integration - form data not sent to server
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent page reload

            // ========== GET FORM VALUES ==========
            // Trim whitespace from all inputs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();

            // ========== VALIDATION ==========
            
            // Check all required fields are filled
            // (phone is optional, not included in check)
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Validate email format (must have @ and domain)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // ========== SUCCESS ==========
            // Show confirmation message (no actual email sent)
            alert(`Thank you for contacting us, ${name}! We'll get back to you soon.`);
            
            // Clear all form fields
            contactForm.reset();
        });
    }
});
