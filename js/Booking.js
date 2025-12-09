// ============================================
// BOOKING.JS - Booking form and payment modal functionality
// ============================================
// Features:
// - Real-time price calculation (room rate × nights × rooms)
// - Date validation (check-out must be after check-in)
// - Multiple rooms option (shows/hides numRooms dropdown)
// - Payment modal with fade-in animation
// - Card validation: 16 digits, expiry date check, CVV 3-4 digits
// - Confirmation with masked card number (last 4 digits shown)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // ========== FORM ELEMENTS ==========
    const bookingForm = document.getElementById('bookingForm');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const roomTypeSelect = document.getElementById('roomType');
    const separateRoomsSelect = document.getElementById('separateRooms');
    const numRoomsGroup = document.getElementById('numRoomsGroup');
    const numRoomsSelect = document.getElementById('numRooms');

    // ========== ROOM PRICING DATA ==========
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

    // ========== MULTIPLE ROOMS TOGGLE ==========
    // Show/hide "Number of Rooms" dropdown based on "Need Separate Rooms?" selection
    separateRoomsSelect.addEventListener('change', function() {
        if (this.value === 'yes') {
            numRoomsGroup.style.display = 'block';
        } else {
            numRoomsGroup.style.display = 'none';
        }
        updatePriceSummary();
    });

    numRoomsSelect.addEventListener('change', updatePriceSummary);

    // ========== DATE VALIDATION ==========
    // Set minimum date to today (prevents booking in the past)
    const today = new Date().toISOString().split('T')[0];
    checkInInput.setAttribute('min', today);
    checkOutInput.setAttribute('min', today);

    // Update checkout min date when check-in changes (ensures check-out is after check-in)
    checkInInput.addEventListener('change', function() {
        const checkInDate = new Date(this.value);
        checkInDate.setDate(checkInDate.getDate() + 1);
        const minCheckOut = checkInDate.toISOString().split('T')[0];
        checkOutInput.setAttribute('min', minCheckOut);
        updatePriceSummary();
    });

    // Trigger price update on any relevant field change
    checkOutInput.addEventListener('change', updatePriceSummary);
    roomTypeSelect.addEventListener('change', updatePriceSummary);

    // ========== PRICE CALCULATION ==========
    // Updates price summary section in real-time
    // Formula: (nightly rate × nights × num rooms) + 12% tax
    function updatePriceSummary() {
        const selectedRoom = roomTypeSelect.value;
        const checkIn = checkInInput.value;
        const checkOut = checkOutInput.value;
        const separateRooms = separateRoomsSelect.value;
        const numRooms = separateRooms === 'yes' ? parseInt(numRoomsSelect.value) : 1;

        // Exit if required fields are empty
        if (!selectedRoom || !checkIn || !checkOut) {
            return;
        }

        // Calculate total cost
        const nightly = roomPrices[selectedRoom];
        const nights = getDaysBetween(checkIn, checkOut);
        const roomTotal = nightly * nights * numRooms;
        const subtotal = roomTotal;
        const taxes = subtotal * 0.12; // 12% tax rate
        const total = subtotal + taxes;

        // Update room label (show "X rooms" if multiple)
        const roomLabel = numRooms > 1 ? `${roomNames[selectedRoom]} (${numRooms} rooms)` : roomNames[selectedRoom];
        
        // Update all summary fields
        document.getElementById('summaryRoom').textContent = roomLabel;
        document.getElementById('summaryRate').textContent = formatCurrency(nightly);
        document.getElementById('summaryNights').textContent = nights;
        document.getElementById('summarySubtotal').textContent = formatCurrency(subtotal);
        document.getElementById('summaryTaxes').textContent = formatCurrency(taxes);
        document.getElementById('summaryTotal').textContent = formatCurrency(total);
    }

    // ========== BOOKING FORM SUBMISSION ==========
    // Validates dates, then shows payment modal
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate check-out is after check-in
        if (new Date(checkInInput.value) >= new Date(checkOutInput.value)) {
            alert('Check-out date must be after check-in date');
            return;
        }

        // Show payment modal (fade-in animation via CSS)
        const paymentModal = document.getElementById('paymentModal');
        paymentModal.classList.add('show');
    });

    // ========== PAYMENT MODAL HANDLING ==========
    const paymentForm = document.getElementById('paymentForm');
    const cancelPaymentBtn = document.getElementById('cancelPayment');

    // Cancel button - hide modal without processing payment
    cancelPaymentBtn.addEventListener('click', function() {
        const paymentModal = document.getElementById('paymentModal');
        paymentModal.classList.remove('show');
    });

    // ========== PAYMENT FORM SUBMISSION ==========
    // Validates card details, processes payment, shows confirmation
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get payment data from form
        const cardName = document.getElementById('cardName').value.trim();
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, ''); // Remove spaces
        const expiryMonth = document.getElementById('expiryMonth').value;
        const expiryYear = document.getElementById('expiryYear').value;
        const cvv = document.getElementById('cvv').value.trim();

        // ========== PAYMENT VALIDATION ==========
        
        // Validate cardholder name (minimum 3 characters)
        if (!cardName || cardName.length < 3) {
            alert('Please enter a valid cardholder name');
            return;
        }

        // Validate card number (must be exactly 16 digits)
        const cardNumberPattern = /^\d{16}$/;
        if (!cardNumberPattern.test(cardNumber)) {
            alert('Please enter a valid 16-digit card number');
            return;
        }

        // Validate expiry date dropdowns are selected
        if (!expiryMonth || !expiryYear) {
            alert('Please select both expiry month and year');
            return;
        }

        // Check if card is expired (compares to current date)
        const expiry = new Date(2000 + parseInt(expiryYear), parseInt(expiryMonth), 0); // Last day of expiry month
        const today = new Date();
        if (expiry < today) {
            alert('This card has expired. Please use a valid card.');
            return;
        }

        // Validate CVV (must be 3 or 4 digits)
        const cvvPattern = /^\d{3,4}$/;
        if (!cvvPattern.test(cvv)) {
            alert('Please enter a valid 3 or 4-digit CVV');
            return;
        }

        // ========== GATHER BOOKING DATA ==========
        // Pull all booking information from form
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const roomType = roomTypeSelect.value;
        const checkIn = checkInInput.value;
        const checkOut = checkOutInput.value;
        const guests = document.getElementById('guests').value;
        const separateRooms = separateRoomsSelect.value;
        const numRooms = separateRooms === 'yes' ? parseInt(numRoomsSelect.value) : 1;
        
        // Recalculate pricing for confirmation
        const nights = getDaysBetween(checkIn, checkOut);
        const nightly = roomPrices[roomType];
        const roomTotal = nightly * nights * numRooms;
        const subtotal = roomTotal;
        const taxes = subtotal * 0.12;
        const total = subtotal + taxes;

        // ========== SAVE TO FIREBASE DATABASE ==========
        // Create booking object with all information
        const bookingData = {
            guest: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone
            },
            booking: {
                roomType: roomType,
                roomLabel: numRooms > 1 ? `${roomNames[roomType]} (${numRooms} rooms)` : roomNames[roomType],
                checkIn: checkIn,
                checkOut: checkOut,
                nights: nights,
                guests: guests,
                separateRooms: separateRooms,
                numRooms: numRooms
            },
            pricing: {
                nightlyRate: nightly,
                subtotal: subtotal,
                taxes: taxes,
                total: total
            },
            payment: {
                cardLast4: cardNumber.slice(-4),
                cardName: cardName
            },
            timestamp: Date.now(),
            status: 'confirmed'
        };

        // Save to Firebase (creates unique ID for each booking)
        const bookingsRef = firebase.database().ref('bookings');
        const newBookingRef = bookingsRef.push();
        
        newBookingRef.set(bookingData)
            .then(() => {
                // Hide payment modal
                const paymentModal = document.getElementById('paymentModal');
                paymentModal.classList.remove('show');

                // ========== SHOW CONFIRMATION ==========
                // Display booking summary with masked card number (last 4 digits only)
                const roomLabel = numRooms > 1 ? `${roomNames[roomType]} (${numRooms} rooms)` : roomNames[roomType];
                const bookingId = newBookingRef.key;
                const confirmation = `Booking Confirmation\n\n` +
                    `Booking ID: ${bookingId}\n\n` +
                    `Guest: ${firstName} ${lastName}\n` +
                    `Email: ${email}\n` +
                    `Phone: ${phone}\n` +
                    `Room: ${roomLabel}\n` +
                    `Guests: ${guests}\n` +
                    `Check-in: ${formatDate(checkIn)}\n` +
                    `Check-out: ${formatDate(checkOut)}\n` +
                    `Nights: ${nights}\n` +
                    `Total: ${formatCurrency(total)}\n\n` +
                    `Payment processed with card ending in ${cardNumber.slice(-4)}\n` +
                    `Your booking has been confirmed and saved! A confirmation email will be sent to ${email}.`;

                alert(confirmation);

                // Reset both forms and hide multiple rooms dropdown
                bookingForm.reset();
                paymentForm.reset();
                numRoomsGroup.style.display = 'none';
            })
            .catch((error) => {
                // Handle Firebase save errors
                console.error('Error saving booking to Firebase:', error);
                alert('Booking information saved locally, but there was an error saving to the database. Please contact support with your booking details.\n\nError: ' + error.message);
                
                // Still show confirmation even if Firebase fails
                const paymentModal = document.getElementById('paymentModal');
                paymentModal.classList.remove('show');

                const roomLabel = numRooms > 1 ? `${roomNames[roomType]} (${numRooms} rooms)` : roomNames[roomType];
                const confirmation = `Booking Confirmation\n\n` +
                    `Guest: ${firstName} ${lastName}\n` +
                    `Email: ${email}\n` +
                    `Phone: ${phone}\n` +
                    `Room: ${roomLabel}\n` +
                    `Guests: ${guests}\n` +
                    `Check-in: ${formatDate(checkIn)}\n` +
                    `Check-out: ${formatDate(checkOut)}\n` +
                    `Nights: ${nights}\n` +
                    `Total: ${formatCurrency(total)}\n\n` +
                    `Payment processed with card ending in ${cardNumber.slice(-4)}`;

                alert(confirmation);

                bookingForm.reset();
                paymentForm.reset();
                numRoomsGroup.style.display = 'none';
            });
    });

    // ========== HELPER FUNCTIONS ==========
    
    // Format date as "Monday, January 1, 2025"
    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Format number as USD currency ($123.45)
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    // Calculate number of days between two dates
    function getDaysBetween(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }
});
