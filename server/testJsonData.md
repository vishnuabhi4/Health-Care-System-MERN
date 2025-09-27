## http://localhost:5000/api/auth/register

{
"username": "drsmith",
"email": "nrwe@example.com",
"password": "StrongPass123",
"role": "" //default patient
}

## http://localhost:5000/api/auth/logout

POST

## http://localhost:5000/api/auth/refresh

POST

## http://localhost:5000/api/auth/login

{
"email": "admin@hospital.com",
"password": "Admin@123"
}

## POST /api/admin/users/doctors

//creating doctor profiles (access - admin only)
{
"username": "Dr. John Doe",
"email": "dr.john@example.com",
"password": "SecurePassword123",
"role": "doctor"
}

## http://localhost:5000/api/admin/doctorinfo/:id (doctor profile info upload/update)
{
  "specialization": "Orthopedics",
  "experience": 8,
  "qualification": "MBBS, MS (Ortho)",
  "licenseNumber": "LIC112233",
  "schedule": {
    "startDate": "2025-10-01",
    "endDate": "2025-10-15",
    "days": ["Tuesday", "Thursday"],
    "startTime": "09:00",
    "endTime": "14:00"
  }
}

