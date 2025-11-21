import React, { useState } from 'react';
import { ArrowLeft, Send, Mail, MessageCircle, User, Star, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { sendContactEmail, sendContactEmailFallback, ContactFormData } from '@/services/emailService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    siteReview: '',
    rating: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation de la note
    if (formData.rating === 0) {
      toast({
        title: "يرجى تقييم الموقع",
        description: "من فضلك اختر تقييماً للموقع قبل إرسال الرسالة.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Préparer les données pour l'envoi
      const emailData: ContactFormData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'رسالة من موقع أشعار العشق',
        message: formData.message,
        siteReview: formData.siteReview,
        rating: formData.rating,
        timestamp: new Date().toLocaleString('ar-SA')
      };

      // Essayer d'envoyer via EmailJS, sinon utiliser le fallback
      try {
        await sendContactEmail(emailData);
      } catch (emailError) {
        console.warn('EmailJS non configuré, utilisation du mode fallback:', emailError);
        await sendContactEmailFallback(emailData);
      }
      
      toast({
        title: "تم إرسال رسالتك بنجاح!",
        description: "شكراً لك على تواصلك معنا وتقييمك للموقع. سنرد عليك قريباً.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        siteReview: '',
        rating: 0
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast({
        title: "حدث خطأ",
        description: "لم يتم إرسال رسالتك. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة على contact@ashaaral3ishq.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-sunset-gradient">
      <Header />
      
      <main className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="text-primary hover:text-white/80">
                <ArrowLeft className="ml-2 h-4 w-4" />
                العودة إلى الصفحة الرئيسية
              </Button>
            </Link>
          </div>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-decorative text-4xl md:text-5xl text-primary mb-4">
              تواصل معنا
            </h1>
            <div className="ornament-divider text-primary/60 mb-6">❦ ❦ ❦</div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              نحن نحب أن نسمع منك! شاركنا آراءك، اقتراحاتك، أو أي تعليق حول الأشعار
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="poem-container fade-in-up">
              <div className="p-4">
                <div className="flex items-center mb-6">
                  <MessageCircle className="h-6 w-6 text-primary ml-3" />
                  <h2 className="font-decorative text-2xl text-primary">أرسل لنا رسالة</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-right block">
                        الاسم <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="أدخل اسمك"
                          className="pr-10 text-right"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-right block">
                        البريد الإلكتروني <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="example@email.com"
                          className="pr-10 text-right"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-right block">
                      الموضوع
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="موضوع رسالتك"
                      className="text-right"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-right block">
                      الرسالة <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="اكتب رسالتك هنا..."
                      className="min-h-[120px] text-right resize-none"
                      required
                    />
                  </div>

                  {/* Section Avis sur le site */}
                  <div className="border-t pt-6 mt-6">
                    <h3 className="font-decorative text-xl text-primary mb-4 text-center">
                      تقييم الموقع
                    </h3>
                    
                    {/* Système de notation */}
                    <div className="space-y-4">
                      <div className="text-center">
                        <Label className="text-right block mb-3">
                          كيف تقيم موقعنا؟ <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex justify-center space-x-2 space-x-reverse">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleRatingChange(star)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`h-8 w-8 transition-colors ${
                                  star <= formData.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                        {formData.rating > 0 && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {formData.rating === 1 && 'ضعيف جداً'}
                            {formData.rating === 2 && 'ضعيف'}
                            {formData.rating === 3 && 'متوسط'}
                            {formData.rating === 4 && 'جيد'}
                            {formData.rating === 5 && 'ممتاز'}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="siteReview" className="text-right block">
                          اكتب تقييمك للموقع
                        </Label>
                        <Textarea
                          id="siteReview"
                          name="siteReview"
                          value={formData.siteReview}
                          onChange={handleInputChange}
                          placeholder="شاركنا رأيك حول الموقع، الأشعار، التصميم، أو أي اقتراحات..."
                          className="min-h-[100px] text-right resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full font-arabic text-lg py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send className="ml-2 h-4 w-4" />
                        إرسال الرسالة
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </Card>
          
            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="poem-container fade-in-up">
                <div className="p-4">
                  <h3 className="font-decorative text-2xl text-primary mb-6">معلومات التواصل</h3>                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 space-x-reverse">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-arabic text-lg font-semibold mb-1">البريد الإلكتروني</h4>
                        <p className="text-muted-foreground">contact@ashaaral3ishq.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 space-x-reverse">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <MessageCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-arabic text-lg font-semibold mb-1">الاستجابة</h4>
                        <p className="text-muted-foreground">نرد على جميع الرسائل خلال 24 ساعة</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Social Networks */}
              <Card className="poem-container fade-in-up">
                <div className="p-4">
                  <h3 className="font-decorative text-2xl text-primary mb-6">تابعونا على الشبكات الاجتماعية</h3>
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <a
                      href="https://web.facebook.com/people/%D8%A3%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A7%D9%84%D8%B9%D8%B4%D9%82-%D9%88%D8%A7%D9%84%D9%87%D9%8A%D8%A7%D9%85/61582311044226/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border hover:bg-muted/50 transition"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-5 w-5 text-primary" />
                    </a>
                    <a
                      href="https://www.instagram.com/achaar_al_ishq_wa_al_hiyam/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border hover:bg-muted/50 transition"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-5 w-5 text-primary" />
                    </a>                                     
                    <a
                      href="https://www.tiktok.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border hover:bg-muted/50 transition"
                      aria-label="TikTok"
                    >
                      {/* TikTok SVG inline to avoid import issues */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 text-primary"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M21 8.5a6.9 6.9 0 0 1-4.1-1.3v6.5a6.7 6.7 0 1 1-6.7-6.7c.3 0 .6 0 .9.1v3.2a3.5 3.5 0 1 0 2.6 3.4V3h3a6.9 6.9 0 0 0 4.3 4V8.5Z"/>
                      </svg>
                    </a>
                    
                  </div>
                </div>
              </Card>

              <Card className="poem-container fade-in-up">
                <div className="p-4">
                  <h3 className="font-decorative text-2xl text-primary mb-6">شاركنا آراءك</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    نحن نقدر آراءكم وتعليقاتكم حول الأشعار. شاركونا:
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>أي قصيدة أعجبتكم أكثر؟</span>
                    </li>
                    <li className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>اقتراحات لقصائد جديدة</span>
                    </li>
                    <li className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>تقييمكم للموقع</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
