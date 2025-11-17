// ============================================
// IMAGINARY INNS - BOOKING PAGE FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const roomTypeSelect = document.getElementById('roomType');

    // Room prices
    const roomPrices = {
        standard: 89,
        deluxe: 149,
        luxury: 299
    };

    const roomNames = {
        standard: 'Standard Room',
        deluxe: 'Deluxe Room',
        luxury: 'Luxury Suite'
    };

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    checkInInput.setAttribute('min', today);
    checkOutInput.setAttribute('min', today);

    // Update checkout min date when checkin changes
    checkInInput.addEventListener('change', function() {
        const checkInDate = new Date(this.value);
        checkInDate.setDate(checkInDate.getDate() + 1);
        const minCheckOut = checkInDate.toISOString().split('T')[0];
        checkOutInput.setAttribute('min', minCheckOut);
        updatePriceSummary();
    });

    checkOutInput.addEventListener('change', updatePriceSummary);
    roomTypeSelect.addEventListener('change', updatePriceSummary);

    // Update price summary
    function updatePriceSummary() {
        const selectedRoom = roomTypeSelect.value;
        const checkIn = checkInInput.value;
        const checkOut = checkOutInput.value;

        if (!selectedRoom || !checkIn || !checkOut) {
            return;
        }

        const nightly = roomPrices[selectedRoom];
        const nights = getDaysBetween(checkIn, checkOut);
        const subtotal = nightly * nights;
        const taxes = subtotal * 0.12;
        const total = subtotal + taxes;

        document.getElementById('summaryRoom').textContent = roomNames[selectedRoom];
        document.getElementById('summaryRate').textContent = formatCurrency(nightly);
        document.getElementById('summaryNights').textContent = nights;
        document.getElementById('summarySubtotal').textContent = formatCurrency(subtotal);
        document.getElementById('summaryTaxes').textContent = formatCurrency(taxes);
        document.getElementById('summaryTotal').textContent = formatCurrency(total);
    }

    // Form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate dates
        if (new Date(checkInInput.value) >= new Date(checkOutInput.value)) {
            alert('Check-out date must be after check-in date');
            return;
        }

        // Get form data
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const roomType = roomTypeSelect.value;
        const checkIn = checkInInput.value;
        const checkOut = checkOutInput.value;
        const guests = document.getElementById('guests').value;
        const nights = getDaysBetween(checkIn, checkOut);
        const nightly = roomPrices[roomType];
        const subtotal = nightly * nights;
        const total = subtotal * 1.12;

        // Show confirmation
        const confirmation = `Booking Confirmation\n\n` +
            `Guest: ${firstName} ${lastName}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone}\n` +
            `Room: ${roomNames[roomType]}\n` +
            `Guests: ${guests}\n` +
            `Check-in: ${formatDate(checkIn)}\n` +
            `Check-out: ${formatDate(checkOut)}\n` +
            `Nights: ${nights}\n` +
            `Total: ${formatCurrency(total)}\n\n` +
            `Your booking has been confirmed! A confirmation email will be sent shortly.`;

        alert(confirmation);

        // Log booking data
        console.log({
            firstName,
            lastName,
            email,
            phone,
            roomType,
            checkIn,
            checkOut,
            guests,
            nights,
            total
        });

        // Reset form
        this.reset();
    });

    // Helper functions
    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    function getDaysBetween(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }
});
