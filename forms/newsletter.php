<?php
// Inclure l'autoloader de Composer
require '../vendor/autoload.php';

// Importer les classes de PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Adresse email qui recevra les messages du formulaire
$receiving_email_address = 'bhamalah@gmail.com';

// Vérification que la requête est bien en POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Définir l'en-tête pour une réponse JSON
    header('Content-Type: application/json');
    
    // Vérification que tous les champs requis sont remplis
    if(!empty($_POST['email']) ) {
        // Configuration du mail avec PHPMailer
        $mail = new PHPMailer(true);
                
        try {
            // Configuration du serveur
            $mail->isSMTP();
            $mail->Host       = 'smtp.error.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'bhamalah@gmail.com';
            $mail->Password   = 'oqof welh gjci rlxt';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;
            
            // Désactiver le mode debug en production
            $mail->SMTPDebug  = 0;
            
            // Destinataires
            $mail->setFrom($_POST['email']);
            $mail->addAddress($receiving_email_address);
            $mail->addReplyTo($_POST['email']);
            
            // Contenu
            $mail->isHTML(true);
            $mail->Subject = " Demande d'abonnement aux nouvelles publications";
            
            // Corps du message
            $body .= "Email: " . htmlspecialchars($_POST['email']) . "<br><br>";
            $body .= "Message:<br>". htmlspecialchars($_POST['email'] ) . " a envoyé un message via votre formulaire de contact et souhaite s'abonner à vos nouvelles publications.";
            
            $mail->Body = $body;
            
            // Envoi du mail
            $mail->send();
            
            // Réponse en cas de succès
            echo json_encode(['success' => true, 'message' => 'Votre message a été envoyé. Merci !']);
            
        } catch (Exception $e) {
            // Réponse en cas d'erreur et (a ajouter pour debbuger Erreur: {$mail->ErrorInfo})
            echo json_encode(['success' => false, 'message' => "Oups ! Une erreur est survenue. Veuillez réessayer un peu plus tard. "]);
        }
    } else {
        // Si des champs sont manquants
        echo json_encode(['success' => false, 'message' => 'Veuillez remplir tous les champs du formulaire.']);
    }
} else {
    // Si la méthode n'est pas POST
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
}
?>





