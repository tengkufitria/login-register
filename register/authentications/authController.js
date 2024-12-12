const authService = require('./authService'); // Import authService

// Fungsi untuk menangani registrasi user
const registerUser = async (request, h) => {
    const { name, email, password, gender, date_of_birth } = request.payload;

    try {
        // Panggil authService untuk registrasi user
        const result = await authService.registerUser({ name, email, password, gender, date_of_birth });

        if (result.success) {
            return h.response({ message: 'User registered successfully!' }).code(201);
        } else {
            return h.response({ message: result.message }).code(result.code);
        }
    } catch (err) {
        console.error('Error in controller:', err);
        return h.response({ message: 'Registration failed!' }).code(500);
    }
};

module.exports = { registerUser };
