// Hamburger menu toggle

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Multi-select dropdown with checkbox functionality
document.addEventListener('DOMContentLoaded', function() {
    const multiSelect = document.getElementById('activities-select');
    if (!multiSelect) return;

    const toggleBtn = multiSelect.querySelector('.ms-toggle');
    const optionsList = multiSelect.querySelector('.ms-options');
    const checkboxes = multiSelect.querySelectorAll('input[type="checkbox"]');
    const hiddenInput = document.getElementById('activities-input');
    const maxSelection = parseInt(multiSelect.getAttribute('data-max')) || 3;

    // Toggle dropdown open/close
    toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const isHidden = optionsList.hasAttribute('hidden');
        if (isHidden) {
            optionsList.removeAttribute('hidden');
            toggleBtn.setAttribute('aria-expanded', 'true');
        } else {
            optionsList.setAttribute('hidden', '');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!multiSelect.contains(e.target)) {
            optionsList.setAttribute('hidden', '');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle checkbox selection
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedBoxes = multiSelect.querySelectorAll('input[type="checkbox"]:checked');

            // Enforce max selection limit
            if (checkedBoxes.length > maxSelection) {
                this.checked = false;
                alert(`Vous ne pouvez sélectionner que ${maxSelection} activités maximum.`);
                return;
            }

            // Update button text and hidden input
            updateSelection();
        });
    });

    function updateSelection() {
        const checkedBoxes = multiSelect.querySelectorAll('input[type="checkbox"]:checked');
        const selectedValues = [];
        const selectedLabels = [];

        checkedBoxes.forEach(checkbox => {
            selectedValues.push(checkbox.value);
            selectedLabels.push(checkbox.parentElement.textContent.trim());
        });

        // Update hidden input value
        hiddenInput.value = selectedValues.join(',');

        // Update button text
        if (selectedLabels.length === 0) {
            toggleBtn.textContent = 'Sélectionner les activités';
        } else {
            toggleBtn.textContent = selectedLabels.join(', ');
        }
    }

    // Load saved selections from localStorage (optional feature)
    const savedActivities = localStorage.getItem('selectedActivities');
    if (savedActivities) {
        const activities = savedActivities.split(',');
        checkboxes.forEach(checkbox => {
            if (activities.includes(checkbox.value)) {
                checkbox.checked = true;
            }
        });
        updateSelection();
    }

    // Save selections to localStorage when form is submitted (optional)
    const form = multiSelect.closest('form');
    if (form) {
        form.addEventListener('submit', function() {
            const checkedBoxes = multiSelect.querySelectorAll('input[type="checkbox"]:checked');
            const selectedValues = Array.from(checkedBoxes).map(cb => cb.value);
            localStorage.setItem('selectedActivities', selectedValues.join(','));
        });
    }
});