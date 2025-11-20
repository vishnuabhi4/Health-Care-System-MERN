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

## 
{
  "patient": "652f3a0a8b9c1f12d4a1b234", 
  "doctor": "652f3b5d8b9c1f12d4a1b567",
  "appointment": "652f3c7a8b9c1f12d4a1b890",
  "diagnosis": "Acute Bronchitis",
  "prescription": [
    {
      "medicine": "Amoxicillin 500mg",
      "dosage": "1 capsule every 8 hours",
      "duration": "7 days"
    },
    {
      "medicine": "Paracetamol 500mg",
      "dosage": "1 tablet every 6 hours as needed",
      "duration": "5 days"
    }
  ],
  "labTests": [
    {
      "testName": "CBC (Complete Blood Count)",
      "result": "Normal",
      "normalRange": "WBC 4,000–11,000/mcL"
    },
    {
      "testName": "Chest X-ray",
      "result": "Mild inflammation in bronchi",
      "normalRange": "Clear lungs"
    }
  ],
  "notes": "Patient advised to drink warm fluids and rest adequately."
}
