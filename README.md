 README for GitHub Repository

Juice Shop Security Improvements

This project aims to improve the security of the Juice Shop application by implementing best practices such as secure data transmission, input validation, password hashing, and improved logging mechanisms.

Installation

Clone the repository:

git clone https://github.com/sarmadhayat/cybersec_commands.git

Navigate to the project directory:

cd juice-shop

Install dependencies:

npm install

Compile TypeScript files:

tsc

Security Improvements

Input Validation: Using validator to sanitize user inputs.

HTTPS Enforcement: Implemented secure data transmission using helmet.

Password Security: Integrated bcrypt for password hashing and salting.

Logging: Added winston for structured logging with both console and file outputs.

Running the Project

Start the development server:

npm start

Access the application at http://localhost:3000

📄 License

This project is licensed under the MIT License.
