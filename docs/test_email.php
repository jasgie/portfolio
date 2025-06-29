<?php
// Simple test script for email functionality
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

echo "<h2>Email Test Script</h2>";

try {
    $mail = new PHPMailer(true);
    
    // SMTP configuration
    $mail->isSMTP();
    $mail->Host = $_ENV['SMTP_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['SMTP_USERNAME'];
    $mail->Password = $_ENV['SMTP_PASSWORD'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $_ENV['SMTP_PORT'];
    $mail->CharSet = 'UTF-8';
    
    // Email content
    $mail->setFrom($_ENV['SMTP_FROM_EMAIL'], 'Portfolio Test');
    $mail->addAddress($_ENV['RECIPIENT_EMAIL'], $_ENV['RECIPIENT_NAME']);
    
    $mail->isHTML(true);
    $mail->Subject = 'Contact Form Test - ' . date('Y-m-d H:i:s');
    $mail->Body = '<h3>Email Test Successful!</h3><p>Your contact form email system is working correctly.</p><p>Timestamp: ' . date('F j, Y \a\t g:i A') . '</p>';
    
    $mail->send();
    echo "<div style='color: green; padding: 10px; border: 1px solid green; background: #f0fff0;'>";
    echo "✅ <strong>Success!</strong> Test email sent successfully to " . htmlspecialchars($_ENV['RECIPIENT_EMAIL']);
    echo "</div>";
    
} catch (Exception $e) {
    echo "<div style='color: red; padding: 10px; border: 1px solid red; background: #fff0f0;'>";
    echo "❌ <strong>Error:</strong> " . $e->getMessage();
    echo "</div>";
}

echo "<hr>";
echo "<p><strong>Configuration Details:</strong></p>";
echo "<ul>";
echo "<li>SMTP Server: " . htmlspecialchars($_ENV['SMTP_HOST']) . ":" . htmlspecialchars($_ENV['SMTP_PORT']) . "</li>";
echo "<li>From Email: " . htmlspecialchars($_ENV['SMTP_FROM_EMAIL']) . "</li>";
echo "<li>To Email: " . htmlspecialchars($_ENV['RECIPIENT_EMAIL']) . "</li>";
echo "<li>PHP Version: " . phpversion() . "</li>";
echo "<li>PHPMailer Version: " . PHPMailer::VERSION . "</li>";
echo "</ul>";

echo "<p><a href='index.html'>← Back to Portfolio</a></p>";
?>
