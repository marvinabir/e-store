// emailService.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Function to send a registration email
 * @param email 
 * @param name 
 */
export const sendRegistrationEmail = async (email: string, name: string) => {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Set email options
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: 'Welcome to Our Service',
    html:

     ` <div style="max-width: 600px; position: relative; background-image: url('https://i.pinimg.com/474x/a1/3d/6d/a13d6d7b1933920630b6df2c225b86cf.jpg'); background-size: cover; background-position: center; border-radius: 8px; box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4); overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.9);"></div>
    <div style="padding: 20px; color: #ffffff; text-align: center;">
      <h1 style="margin: 0; font-size: 24px;">Hello ${name},</h1>
    </div>
    <div style="padding: 20px; font-family: Arial, sans-serif; font-size: 16px; color: #ffffff;">
      <p style="margin: 0;">Thank you for registering!</p>
      <p style="margin-top: 20px;">We are excited to have you on board.</p>
      <p style="margin-top: 40px;">Best regards,<br><strong>Marvo's Company</strong></p>
    </div>
    <div style="padding: 20px; background-color: rgba(241, 241, 241, 0.9); text-align: center;">
      <p style="margin: 0; font-size: 12px; color: #888;">© 2024 Marvo's Company. All rights reserved.</p>
    </div>
</div> `
};

  // Send email
  await transporter.sendMail(mailOptions);
};

