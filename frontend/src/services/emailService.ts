import emailjs from '@emailjs/browser';

// Configuration EmailJS
const EMAILJS_SERVICE_ID = 'service_3ydaemv'; 
const EMAILJS_TEMPLATE_ID = 'template_kkyugah';
const EMAILJS_PUBLIC_KEY = 'XtP4lr8S-hZiyhm-K';

// Initialiser EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  siteReview: string;
  rating: number;
  timestamp: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Préparer les paramètres pour le template EmailJS
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject || 'رسالة من موقع أشعار العشق',
      message: formData.message,
      site_review: formData.siteReview,
      rating: formData.rating,
      rating_text: getRatingText(formData.rating),
      timestamp: formData.timestamp,
      to_email: 'kharmouche95@gmail.com' // Votre email de réception
    };

    // Envoyer l'email via EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email envoyé avec succès:', response);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw error;
  }
};

// Fonction pour obtenir le texte de la note
const getRatingText = (rating: number): string => {
  switch (rating) {
    case 1: return 'ضعيف جداً';
    case 2: return 'ضعيف';
    case 3: return 'متوسط';
    case 4: return 'جيد';
    case 5: return 'ممتاز';
    default: return 'غير محدد';
  }
};

// Fonction de fallback si EmailJS n'est pas configuré
export const sendContactEmailFallback = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Simulation d'envoi d'email
    console.log('=== DONNÉES DU FORMULAIRE ===');
    console.log('Nom:', formData.name);
    console.log('Email:', formData.email);
    console.log('Sujet:', formData.subject);
    console.log('Message:', formData.message);
    console.log('Avis sur le site:', formData.siteReview);
    console.log('Note:', formData.rating, getRatingText(formData.rating));
    console.log('Timestamp:', formData.timestamp);
    console.log('==============================');
    
    // Simuler un délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email (fallback):', error);
    throw error;
  }
};
