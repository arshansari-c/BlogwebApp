export const emailTemplate = (otp,category) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
                text-align: center;
            }
            .container {
                max-width: 500px;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                margin: auto;
            }
            .otp-code {
                font-size: 24px;
                font-weight: bold;
                color: #333;
                background-color: #f8f8f8;
                padding: 10px;
                display: inline-block;
                border-radius: 5px;
                margin: 10px 0;
            }
            .footer {
                font-size: 12px;
                color: #888;
                margin-top: 20px;
            }
            .verify-button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #007BFF;
                color: white;
                text-decoration: none;
                font-size: 16px;
                border-radius: 5px;
                margin-top: 15px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>🔐 ${category} OTP Verification</h2>
            <p>Hello,</p>
            <p>Use the following OTP to verify your email:</p>
            <div class="otp-code">${otp}</div>
            <p>This OTP is valid for **5 minutes**. Do not share it with anyone.</p>
            <a href="#" class="verify-button">Verify Now</a>
            <p class="footer">If you did not request this, please ignore this email.</p>
        </div>
    </body>
    </html>
    `;
};
