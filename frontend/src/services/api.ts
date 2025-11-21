// Configuration de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_KEY = import.meta.env.VITE_API_KEY;

const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const headers = new Headers(options.headers || {});

  if (API_KEY && !headers.has('x-api-key')) {
    headers.set('x-api-key', API_KEY);
  }

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    throw new Error('API sécurisée : clé d\'accès manquante ou invalide');
  }

  return response;
};

export interface Poem {
  id: string;
  title: string;
  author: string;
  verses: string[];
  description?: string;
  writtenDate?: string;
  theme?: string;
  audio?: string;
  created_at?: string;
  updated_at?: string;
}

// Récupérer tous les poèmes
export const getAllPoems = async (): Promise<Poem[]> => {
  try {
    const response = await apiFetch('/poems');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des poèmes');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};

// Récupérer un poème par ID
export const getPoemById = async (id: string): Promise<Poem> => {
  try {
    const response = await apiFetch(`/poems/${id}`);
    if (!response.ok) {
      throw new Error('Poème non trouvé');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};

// Ajouter un nouveau poème (optionnel)
export const createPoem = async (poem: Omit<Poem, 'id'>): Promise<{ message: string; id: number }> => {
  try {
    const response = await apiFetch('/poems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(poem),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la création du poème');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};

// Vérifier la santé de l'API
export const checkApiHealth = async (): Promise<{ status: string; message: string }> => {
  try {
    const response = await apiFetch('/health');
    if (!response.ok) {
      throw new Error('API non disponible');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};

// ==================== COMMENTAIRES ====================

export interface Comment {
  id: number;
  author_name: string;
  comment_text: string;
  created_at: string;
}

// Récupérer les commentaires d'un poème
export const getComments = async (poemId: string): Promise<Comment[]> => {
  try {
    const response = await apiFetch(`/poems/${poemId}/comments`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des commentaires');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};

// Ajouter un commentaire
export const addComment = async (poemId: string, authorName: string, commentText: string): Promise<{ message: string; id: number }> => {
  try {
    console.log('Envoi du commentaire:', { poemId, authorName, commentText });
    console.log('URL:', `${API_BASE_URL}/poems/${poemId}/comments`);
    
    const response = await apiFetch(`/poems/${poemId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author_name: authorName,
        comment_text: commentText,
      }),
    });
    
    console.log('Statut de la réponse:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Erreur inconnue' }));
      console.error('Erreur du serveur:', errorData);
      throw new Error(errorData.error || `Erreur ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Commentaire ajouté avec succès:', data);
    return data;
  } catch (error: any) {
    console.error('Erreur API complète:', error);
    console.error('Message:', error.message);
    throw error;
  }
};

// Supprimer un commentaire
export const deleteComment = async (commentId: number): Promise<{ message: string }> => {
  try {
    const response = await apiFetch(`/comments/${commentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du commentaire');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};

// ==================== LIKES ====================

// Récupérer les likes d'un poème
export const getLikes = async (poemId: string): Promise<{ count: number; isLiked: boolean }> => {
  try {
    const response = await apiFetch(`/poems/${poemId}/likes`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des likes');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};

// Ajouter ou retirer un like
export const toggleLike = async (poemId: string): Promise<{ message: string; count: number; isLiked: boolean }> => {
  try {
    const response = await apiFetch(`/poems/${poemId}/likes`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la gestion du like');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};

// ==================== VUES ====================

// Enregistrer une vue
export const recordView = async (poemId: string): Promise<{ message: string; count: number }> => {
  try {
    const response = await apiFetch(`/poems/${poemId}/views`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Erreur lors de l\'enregistrement de la vue');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};

// Récupérer le nombre de vues
export const getViews = async (poemId: string): Promise<{ count: number }> => {
  try {
    const response = await apiFetch(`/poems/${poemId}/views`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des vues');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};
