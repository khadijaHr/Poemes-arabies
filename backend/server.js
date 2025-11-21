const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn('⚠️  Aucune API_KEY définie dans l\'environnement. Les requêtes sécurisées échoueront.');
}

// Middleware
app.use(cors());
app.use(express.json());

const requireApiKey = (req, res, next) => {
  if (!API_KEY) {
    return res.status(500).json({ error: 'API non configurée correctement' });
  }

  const providedKey = req.header('x-api-key') || req.query.apiKey;

  if (!providedKey || providedKey !== API_KEY) {
    return res.status(401).json({ error: 'Accès non autorisé' });
  }

  next();
};

// Toutes les routes API nécessitent la clé
app.use('/api', requireApiKey);

// Servir les fichiers audio statiques
app.use('/audio', express.static(path.join(__dirname, 'audio')));

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend API is running!' });
});

// Récupérer tous les poèmes avec leurs vers
app.get('/api/poems', async (req, res) => {
  try {
    const [poems] = await db.query('SELECT * FROM poems ORDER BY id');
    
    // Pour chaque poème, récupérer ses vers
    const poemsWithVerses = await Promise.all(
      poems.map(async (poem) => {
        const [verses] = await db.query(
          'SELECT verse_text FROM verses WHERE poem_id = ? ORDER BY verse_order',
          [poem.id]
        );
        return {
          id: poem.id.toString(),
          title: poem.title,
          author: poem.author,
          description: poem.description || null,
          writtenDate: poem.written_date || null,
          theme: poem.theme || null,
          audio: poem.audio_url || null,
          verses: verses.map(v => v.verse_text),
          created_at: poem.created_at,
          updated_at: poem.updated_at
        };
      })
    );
    
    res.json(poemsWithVerses);
  } catch (error) {
    console.error('Erreur lors de la récupération des poèmes:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des poèmes' });
  }
});

// Récupérer un poème spécifique par ID
app.get('/api/poems/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Récupérer le poème
    const [poems] = await db.query('SELECT * FROM poems WHERE id = ?', [id]);
    
    if (poems.length === 0) {
      return res.status(404).json({ error: 'Poème non trouvé' });
    }
    
    const poem = poems[0];
    
    // Récupérer les vers du poème
    const [verses] = await db.query(
      'SELECT verse_text FROM verses WHERE poem_id = ? ORDER BY verse_order',
      [id]
    );
    
    const poemWithVerses = {
      id: poem.id.toString(),
      title: poem.title,
      author: poem.author,
      description: poem.description || null,
      writtenDate: poem.written_date || null,
      theme: poem.theme || null,
      audio: poem.audio_url || null,
      verses: verses.map(v => v.verse_text),
      created_at: poem.created_at,
      updated_at: poem.updated_at
    };
    
    res.json(poemWithVerses);
  } catch (error) {
    console.error('Erreur lors de la récupération du poème:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération du poème' });
  }
});

// Ajouter un nouveau poème (optionnel)
app.post('/api/poems', async (req, res) => {
  try {
    const { title, author, verses } = req.body;
    
    if (!title || !verses || !Array.isArray(verses) || verses.length === 0) {
      return res.status(400).json({ error: 'Titre et vers requis' });
    }
    
    // Insérer le poème
    const [result] = await db.query(
      'INSERT INTO poems (title, author) VALUES (?, ?)',
      [title, author || 'شاعرة الحب — خديجة هرموش']
    );
    
    const poemId = result.insertId;
    
    // Insérer les vers
    const versePromises = verses.map((verse, index) => 
      db.query(
        'INSERT INTO verses (poem_id, verse_text, verse_order) VALUES (?, ?, ?)',
        [poemId, verse, index + 1]
      )
    );
    
    await Promise.all(versePromises);
    
    res.status(201).json({ 
      message: 'Poème créé avec succès', 
      id: poemId 
    });
  } catch (error) {
    console.error('Erreur lors de la création du poème:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création du poème' });
  }
});

// ==================== ROUTES POUR LES COMMENTAIRES ====================

// Récupérer tous les commentaires d'un poème
app.get('/api/poems/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const [comments] = await db.query(
      'SELECT id, author_name, comment_text, created_at FROM comments WHERE poem_id = ? ORDER BY created_at DESC',
      [id]
    );
    res.json(comments);
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Ajouter un commentaire
app.post('/api/poems/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { author_name, comment_text } = req.body;

    if (!author_name || !comment_text) {
      return res.status(400).json({ error: 'Nom et commentaire requis' });
    }

    const [result] = await db.query(
      'INSERT INTO comments (poem_id, author_name, comment_text) VALUES (?, ?, ?)',
      [id, author_name, comment_text]
    );

    res.status(201).json({
      message: 'Commentaire ajouté avec succès',
      id: result.insertId
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du commentaire:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Supprimer un commentaire
app.delete('/api/comments/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    await db.query('DELETE FROM comments WHERE id = ?', [commentId]);
    res.json({ message: 'Commentaire supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du commentaire:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ==================== ROUTES POUR LES LIKES ====================

// Récupérer le nombre de likes d'un poème
app.get('/api/poems/:id/likes', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId || req.headers['x-user-id'];
    const userIp = req.ip || req.connection.remoteAddress;

    // Compter le nombre total de likes
    const [countResult] = await db.query(
      'SELECT COUNT(*) as count FROM likes WHERE poem_id = ?',
      [id]
    );

    // Vérifier si l'utilisateur a déjà liké (par user_id ou par IP)
    let userLike;
    if (userId) {
      [userLike] = await db.query(
        'SELECT id FROM likes WHERE poem_id = ? AND user_id = ?',
        [id, userId]
      );
    } else {
      [userLike] = await db.query(
        'SELECT id FROM likes WHERE poem_id = ? AND user_ip = ? AND user_id IS NULL',
        [id, userIp]
      );
    }

    res.json({
      count: countResult[0].count,
      isLiked: userLike.length > 0
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des likes:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Ajouter ou retirer un like
app.post('/api/poems/:id/likes', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; // Récupérer userId depuis le body
    const userIp = req.ip || req.connection.remoteAddress;

    // Vérifier si l'utilisateur a déjà liké (par user_id ou par IP)
    let existingLike;
    if (userId) {
      [existingLike] = await db.query(
        'SELECT id FROM likes WHERE poem_id = ? AND user_id = ?',
        [id, userId]
      );
    } else {
      [existingLike] = await db.query(
        'SELECT id FROM likes WHERE poem_id = ? AND user_ip = ? AND user_id IS NULL',
        [id, userIp]
      );
    }

    if (existingLike.length > 0) {
      // Retirer le like
      if (userId) {
        await db.query('DELETE FROM likes WHERE poem_id = ? AND user_id = ?', [id, userId]);
      } else {
        await db.query('DELETE FROM likes WHERE poem_id = ? AND user_ip = ? AND user_id IS NULL', [id, userIp]);
      }
      
      // Récupérer le nouveau compte
      const [countResult] = await db.query(
        'SELECT COUNT(*) as count FROM likes WHERE poem_id = ?',
        [id]
      );

      res.json({
        message: 'Like retiré',
        count: countResult[0].count,
        isLiked: false
      });
    } else {
      // Ajouter le like
      await db.query(
        'INSERT INTO likes (poem_id, user_ip, user_id) VALUES (?, ?, ?)',
        [id, userIp, userId || null]
      );
      
      // Récupérer le nouveau compte
      const [countResult] = await db.query(
        'SELECT COUNT(*) as count FROM likes WHERE poem_id = ?',
        [id]
      );

      res.json({
        message: 'Like ajouté',
        count: countResult[0].count,
        isLiked: true
      });
    }
  } catch (error) {
    console.error('Erreur lors de la gestion du like:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ==================== ROUTES POUR LES VUES ====================

// Enregistrer une vue
app.post('/api/poems/:id/views', async (req, res) => {
  try {
    const { id } = req.params;
    const userIp = req.ip || req.connection.remoteAddress;

    // Vérifier si cette IP a déjà vu ce poème dans les dernières 24 heures
    const [existingView] = await db.query(
      'SELECT id FROM views WHERE poem_id = ? AND user_ip = ? AND created_at > DATE_SUB(NOW(), INTERVAL 1 DAY) LIMIT 1',
      [id, userIp]
    );

    let countResult;
    
    // Si l'IP n'a pas encore vu ce poème aujourd'hui, enregistrer une nouvelle vue
    if (existingView.length === 0) {
      await db.query('INSERT INTO views (poem_id, user_ip) VALUES (?, ?)', [id, userIp]);
    }

    // Compter le nombre total de vues uniques (une seule par IP)
    [countResult] = await db.query(
      'SELECT COUNT(DISTINCT user_ip) as count FROM views WHERE poem_id = ?',
      [id]
    );

    res.json({
      message: 'Vue enregistrée',
      count: countResult[0].count
    });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la vue:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Récupérer le nombre de vues uniques d'un poème (une seule par IP)
app.get('/api/poems/:id/views', async (req, res) => {
  try {
    const { id } = req.params;
    const [countResult] = await db.query(
      'SELECT COUNT(DISTINCT user_ip) as count FROM views WHERE poem_id = ?',
      [id]
    );

    res.json({
      count: countResult[0].count || 0
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des vues:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📚 API disponible sur http://localhost:${PORT}/api/poems`);
});