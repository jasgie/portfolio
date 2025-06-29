<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Set response header
header('Content-Type: application/json');

// Enable error reporting for debugging (remove in production)
if (isset($_GET['debug'])) {
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
}

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$firstName = trim($_POST['firstName'] ?? '');
$lastName = trim($_POST['lastName'] ?? '');
$email = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validate required fields
if (empty($firstName) || empty($lastName) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

try {
    // Load environment variables
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    
    // Verify required environment variables are loaded
    $requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USERNAME', 'SMTP_PASSWORD', 'SMTP_FROM_EMAIL', 'RECIPIENT_EMAIL'];
    foreach ($requiredEnvVars as $var) {
        if (!isset($_ENV[$var]) || empty($_ENV[$var])) {
            throw new Exception("Required environment variable $var is not set");
        }
    }
    
    // Create PHPMailer instances
    $mailToMe = new PHPMailer(true);
    $mailToVisitor = new PHPMailer(true);
    
    // SMTP configuration for both emails
    $smtpConfig = function($mail) {
        $mail->isSMTP();
        $mail->Host = $_ENV['SMTP_HOST'];
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['SMTP_USERNAME'];
        $mail->Password = $_ENV['SMTP_PASSWORD'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $_ENV['SMTP_PORT'];
        $mail->CharSet = 'UTF-8';
    };
    
    // Configure SMTP for both emails
    $smtpConfig($mailToMe);
    $smtpConfig($mailToVisitor);
    
    // Email 1: Send visitor's message to recipient
    $mailToMe->setFrom($_ENV['SMTP_FROM_EMAIL'], $_ENV['SMTP_FROM_NAME']);
    $mailToMe->addAddress($_ENV['RECIPIENT_EMAIL'], $_ENV['RECIPIENT_NAME']);
    $mailToMe->addReplyTo($email, $firstName . ' ' . $lastName);
    
    $mailToMe->isHTML(true);
    $mailToMe->Subject = 'New Contact Form Message: ' . $subject;
    
    $messageToMe = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #667eea; }
            .message-content { background: white; padding: 15px; border-radius: 4px; border: 1px solid #ddd; min-height: 100px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Message</h2>
                <p>You have received a new message from your portfolio website</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>From:</div>
                    <div class='value'>" . htmlspecialchars($firstName . ' ' . $lastName) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'>" . htmlspecialchars($email) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Subject:</div>
                    <div class='value'>" . htmlspecialchars($subject) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Message:</div>
                    <div class='message-content'>" . nl2br(htmlspecialchars($message)) . "</div>
                </div>
                <div style='margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;'>
                    <p>This message was sent from your portfolio contact form on " . date('F j, Y \a\t g:i A') . "</p>
                </div>
            </div>
        </div>
    </body>
    </html>";
    
    $mailToMe->Body = $messageToMe;
    
    // Email 2: Send confirmation to visitor
    $mailToVisitor->setFrom($_ENV['SMTP_FROM_EMAIL'], $_ENV['RECIPIENT_NAME']);
    $mailToVisitor->addAddress($email, $firstName . ' ' . $lastName);
    
    $mailToVisitor->isHTML(true);
    $mailToVisitor->Subject = 'Thank you for contacting me - I\'ll be in touch soon!';
    
    $messageToVisitor = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .profile-img { width: 80px; height: 80px; border-radius: 50%; border: 3px solid white; margin: 0 auto 15px; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
            .message-summary { background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #667eea; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Thank You for Getting in Touch!</h2>
                <p>I've received your message and will respond as soon as possible</p>
            </div>
            <div class='content'>
                <p>Hi " . htmlspecialchars($firstName) . ",</p>
                
                <p>Thank you for reaching out through my portfolio website. I really appreciate you taking the time to contact me!</p>
                
                <div class='message-summary'>
                    <h4>Your Message Summary:</h4>
                    <p><strong>Subject:</strong> " . htmlspecialchars($subject) . "</p>
                    <p><strong>Message:</strong> " . htmlspecialchars(substr($message, 0, 150)) . (strlen($message) > 150 ? '...' : '') . "</p>
                </div>
                
                <p>I'll review your message carefully and get back to you within 24-48 hours. In the meantime, feel free to:</p>
                
                <ul>
                    <li>📱 Call me directly at <strong>+63 907 657 9853</strong> for urgent matters</li>
                    <li>💼 Connect with me on <a href='https://linkedin.com/in/jastine-gatdula-426bb8170' target='_blank'>LinkedIn</a></li>
                    <li>🔗 Check out my other projects on <a href='https://github.com/jasgie' target='_blank'>GitHub</a></li>
                </ul>
                
                <p>I'm excited about the possibility of working together and helping you achieve your goals!</p>
                
                <p>Best regards,<br>
                <strong>Jastine Maderable Gatdula</strong><br>
                IT Professional & College Instructor<br>
                📧 gatdulajastine@gmail.com<br>
                📱 +63 907 657 9853</p>
                
                <a href='mailto:gatdulajastine@gmail.com' class='cta-button'>Reply to this Email</a>
            </div>
            
            <div class='footer'>
                <p>This is an automated response from my portfolio contact form.</p>
                <p>If you didn't send this message, please disregard this email.</p>
            </div>
        </div>
    </body>
    </html>";
    
    $mailToVisitor->Body = $messageToVisitor;
    
    // Send both emails
    $mailToMe->send();
    $mailToVisitor->send();
    
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you for your message! I\'ll get back to you soon. Please check your email for a confirmation.'
    ]);
    
} catch (Exception $e) {
    // Log the detailed error for debugging
    $errorDetails = [
        'timestamp' => date('Y-m-d H:i:s'),
        'error_message' => $e->getMessage(),
        'error_file' => $e->getFile(),
        'error_line' => $e->getLine(),
        'form_data' => [
            'firstName' => $firstName ?? 'N/A',
            'lastName' => $lastName ?? 'N/A',
            'email' => $email ?? 'N/A',
            'subject' => $subject ?? 'N/A'
        ]
    ];
    
    error_log("Contact Form Error: " . json_encode($errorDetails));
    
    http_response_code(500);
    
    // Provide different error messages based on the type of error
    if (strpos($e->getMessage(), 'environment variable') !== false) {
        $errorMessage = 'Server configuration error. Please contact the administrator.';
    } elseif (strpos($e->getMessage(), 'SMTP') !== false) {
        $errorMessage = 'Email service temporarily unavailable. Please try again later or contact me directly.';
    } elseif (strpos($e->getMessage(), 'Authentication') !== false) {
        $errorMessage = 'Email authentication failed. Please contact me directly.';
    } else {
        $errorMessage = 'Sorry, there was an error sending your message. Please try again or contact me directly at +63 907 657 9853.';
    }
    
    echo json_encode([
        'success' => false, 
        'message' => $errorMessage,
        'debug' => (isset($_GET['debug']) && $_GET['debug'] === '1') ? $e->getMessage() : null
    ]);
}
?>
