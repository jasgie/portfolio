<?php
// Debug script to check environment variables
require 'vendor/autoload.php';

try {
    // Load environment variables
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    
    echo "<h2>Environment Variables Debug</h2>";
    echo "<div style='background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 10px 0;'>";
    
    $envVars = [
        'SMTP_HOST',
        'SMTP_PORT', 
        'SMTP_USERNAME',
        'SMTP_PASSWORD',
        'SMTP_FROM_EMAIL',
        'SMTP_FROM_NAME',
        'RECIPIENT_EMAIL',
        'RECIPIENT_NAME'
    ];
    
    $allLoaded = true;
    
    foreach ($envVars as $var) {
        $value = $_ENV[$var] ?? 'NOT SET';
        $status = ($value !== 'NOT SET') ? '✅' : '❌';
        
        if ($value === 'NOT SET') {
            $allLoaded = false;
        }
        
        // Hide sensitive values partially
        if (in_array($var, ['SMTP_PASSWORD'])) {
            $displayValue = $value !== 'NOT SET' ? str_repeat('*', strlen($value)) : 'NOT SET';
        } elseif (in_array($var, ['SMTP_USERNAME', 'SMTP_FROM_EMAIL', 'RECIPIENT_EMAIL'])) {
            $displayValue = $value !== 'NOT SET' ? substr($value, 0, 3) . str_repeat('*', strlen($value) - 6) . substr($value, -3) : 'NOT SET';
        } else {
            $displayValue = $value;
        }
        
        echo "<p><strong>$var:</strong> $status $displayValue</p>";
    }
    
    echo "</div>";
    
    if ($allLoaded) {
        echo "<div style='color: green; font-weight: bold;'>✅ All environment variables loaded successfully!</div>";
    } else {
        echo "<div style='color: red; font-weight: bold;'>❌ Some environment variables are missing!</div>";
    }
    
} catch (Exception $e) {
    echo "<div style='color: red; padding: 10px; border: 1px solid red; background: #fff0f0;'>";
    echo "<strong>Error loading environment variables:</strong><br>";
    echo htmlspecialchars($e->getMessage());
    echo "</div>";
}

echo "<hr>";
echo "<p><strong>PHP Configuration:</strong></p>";
echo "<ul>";
echo "<li>PHP Version: " . phpversion() . "</li>";
echo "<li>OpenSSL Extension: " . (extension_loaded('openssl') ? '✅ Enabled' : '❌ Disabled') . "</li>";
echo "<li>cURL Extension: " . (extension_loaded('curl') ? '✅ Enabled' : '❌ Disabled') . "</li>";
echo "<li>allow_url_fopen: " . (ini_get('allow_url_fopen') ? '✅ Enabled' : '❌ Disabled') . "</li>";
echo "</ul>";

echo "<p><a href='index.html'>← Back to Portfolio</a> | <a href='test_email.php'>Test Email</a></p>";
?>
