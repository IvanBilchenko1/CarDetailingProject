<?php
if(isset($_POST['submit'])){
    $to = "bilchenko035@gmail.com"; // recipient's email address
    $from = $_POST['email']; // sender's email address
    $first_name = $_POST['name'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $headers = "From: " . $from;
    
    // Send email to recipient
    mail($to, $subject, $message, $headers);
    
    // Send confirmation email to the sender
    $confirmation_message = "Thank you for your message, " . $first_name . "!\n\nWe have received your message and will get back to you shortly.";
    $confirmation_subject = "Confirmation: " . $subject;
    $confirmation_headers = "From: " . $to;
    mail($from, $confirmation_subject, $confirmation_message, $confirmation_headers);

    echo "Mail Sent. Thank you " . $first_name . ", we will contact you shortly.";
}
?>