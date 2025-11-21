import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Trash2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { getComments, addComment, deleteComment, Comment as ApiComment } from '@/services/api';

interface Comment {
  id: number;
  author_name: string;
  comment_text: string;
  created_at: string;
}

interface CommentSectionProps {
  poemId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ poemId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');
  const { toast } = useToast();

  // Charger les commentaires depuis l'API
  useEffect(() => {
    loadComments();

    // Charger le nom de l'utilisateur s'il est sauvegardé
    const savedName = localStorage.getItem('user_name');
    if (savedName) {
      setName(savedName);
    }
  }, [poemId]);

  // Charger les commentaires depuis l'API
  const loadComments = async () => {
    try {
      const data = await getComments(poemId);
      setComments(data);
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires:', error);
      setComments([]);
    }
  };

  // Ajouter un commentaire
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        description: "الرجاء إدخال اسمك",
        variant: "destructive",
      });
      return;
    }

    if (!commentText.trim()) {
      toast({
        description: "الرجاء كتابة تعليق",
        variant: "destructive",
      });
      return;
    }

    try {
      await addComment(poemId, name.trim(), commentText.trim());

      // Sauvegarder le nom de l'utilisateur
      localStorage.setItem('user_name', name.trim());

      // Réinitialiser le champ de commentaire
      setCommentText('');

      // Recharger les commentaires
      await loadComments();

      toast({
        description: "تم إضافة تعليقك بنجاح! ✨",
      });
    } catch (error: any) {
      console.error('Erreur complète:', error);
      console.error('Message:', error.message);
      toast({
        description: `خطأ في إضافة التعليق: ${error.message || 'خطأ غير معروف'}`,
        variant: "destructive",
      });
    }
  };

  // Supprimer un commentaire
  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);

      // Recharger les commentaires
      await loadComments();

      toast({
        description: "تم حذف التعليق",
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        description: "خطأ في حذف التعليق",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-primary/20">
      {/* En-tête de la section */}
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h2 className="font-decorative text-2xl text-primary">
          التعليقات ({comments.length})
        </h2>
      </div>

      {/* Formulaire d'ajout de commentaire */}
      <Card className="p-6 mb-8 bg-white/50 backdrop-blur-sm border-primary/20">
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-arabic text-muted-foreground mb-2">
              الاسم
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسمك"
              className="font-arabic text-right border-primary/30 focus:border-primary"
              maxLength={50}
            />
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-arabic text-muted-foreground mb-2">
              تعليقك
            </label>
            <Textarea
              id="comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="شاركنا رأيك في هذه القصيدة..."
              className="font-arabic text-right min-h-[120px] border-primary/30 focus:border-primary resize-none"
              maxLength={500}
            />
            <div className="text-xs text-muted-foreground text-left mt-1">
              {commentText.length}/500
            </div>
          </div>

          <Button
            type="submit"
            className="w-full font-arabic bg-gradient-to-r from-primary hover:from-primary/90 hover:text-white"
          >
            <Send className="ml-2 h-4 w-4" />
            إرسال التعليق
          </Button>
        </form>
      </Card>

      {/* Liste des commentaires */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="font-arabic">لا توجد تعليقات بعد. كن أول من يعلق!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <Card
              key={comment.id}
              className="p-5 bg-white/40 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* En-tête du commentaire */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-white">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-arabic font-semibold text-primary">
                        {comment.author_name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {new Date(comment.created_at).toLocaleDateString('ar-EG', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Texte du commentaire */}
                  <p className="font-arabic text-foreground leading-relaxed pr-13">
                    {comment.comment_text}
                  </p>
                </div>

                {/* Bouton de suppression */}
                {/* <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  title="حذف التعليق"
                >
                  <Trash2 className="h-4 w-4" />
                </Button> */}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
