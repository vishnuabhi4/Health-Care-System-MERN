import Contact from "../models/contactModel.js"

export const submitContactMessage = async (req, res) => {
  try {
  
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await Contact.create({ name, email, message });

    res.status(201).json({ message: "Message submitted successfully!" });
  } catch (error) {
    console.error("Error submitting contact message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
