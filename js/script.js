document.addEventListener('DOMContentLoaded', () => {
    // --- Dashboard Sidebar Toggle ---
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            // For small screens, toggle block/hidden. On larger screens, Tailwind's lg:block will take over.
            if (sidebar.classList.contains('hidden')) {
                sidebar.classList.remove('block');
            } else {
                sidebar.classList.add('block');
            }
        });
    }

    // --- Login Form Submission ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const username = loginForm.elements.username.value;
            const password = loginForm.elements.password.value;

            if (!username || !password) {
                alert('Please fill in all fields.');
                return;
            }

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();

                if (response.ok) { // Check if status is 2xx
                    alert(data.message);
                    // In a real app, store the token (data.token) in localStorage/sessionStorage
                    // and redirect to the dashboard
                    window.location.href = '/dashboard.html';
                } else {
                    alert('Login failed: ' + data.message);
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred during login. Please try again.');
            }
        });
    }

    // --- Register Form Submission ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const username = registerForm.elements.username.value;
            const email = registerForm.elements.email.value;
            const password = registerForm.elements.password.value;
            const confirmPassword = registerForm.elements.confirmPassword.value;

            if (!username || !email || !password || !confirmPassword) {
                alert('Please fill in all fields.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });

                const data = await response.json();

                if (response.ok) { // Check if status is 2xx
                    alert(data.message);
                    // Redirect to login page after successful registration
                    window.location.href = '/login.html';
                } else {
                    alert('Registration failed: ' + data.message);
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alert('An error occurred during registration. Please try again.');
            }
        });
    }
});