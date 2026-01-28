export const welcomeTemplate = (userName: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to Rail Sync</title>
  <style>
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      font-family: Arial, Helvetica, sans-serif;
      color: #333333;
    }
    .header {
      background-color: #0056b3; /* Professional Blue */
      padding: 20px;
      text-align: center;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 24px;
    }
    .content {
      background-color: #f9f9f9; /* Light Grey Background */
      padding: 30px;
      border: 1px solid #dddddd;
      border-top: none;
    }
    .button {
      display: inline-block;
      background-color: #0056b3;
      color: #ffffff;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #888888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>RAIL SYNC </h1>
    </div>

    <div class="content">
      <h2>Welcome aboard, ${userName}!</h2>
      <p style="font-size: 16px; line-height: 1.5;">
        We are thrilled to have you join the <strong>Rail Sync</strong> community. Your account has been successfully created and is ready to go.
      </p>
      <p style="font-size: 16px; line-height: 1.5;">
        Get started by exploring your new dashboard where you can track schedules, manage bookings, and sync your travel plans.
      </p>
      
      <div style="text-align: center;">
       <a
  href="http://localhost:3000/dashboard"
  style="
    display: inline-block;
    background-color: #0056b3;
    color: #ffffff !important;
    padding: 12px 24px;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
  "
>
  Go to Dashboard →
</a>

      </div>

      <p style="margin-top: 30px; font-size: 14px; color: #666;">
        Need help? Just reply to this email!
      </p>
    </div>

    <div class="footer">
      <p>© ${new Date().getFullYear()} Rail Sync App. All rights reserved.</p>
      <p>123 Tech Street, Silicon Valley, CA</p>
    </div>
  </div>
</body>
</html>
`;
