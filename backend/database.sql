-- Création de la base de données
CREATE DATABASE IF NOT EXISTS arabic_love_verses CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE arabic_love_verses;

-- Table des poèmes
CREATE TABLE IF NOT EXISTS poems (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) DEFAULT 'شاعرة الحب — خديجة هرموش',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des vers (verses)
CREATE TABLE IF NOT EXISTS verses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  poem_id INT NOT NULL,
  verse_text TEXT NOT NULL,
  verse_order INT NOT NULL,
  FOREIGN KEY (poem_id) REFERENCES poems(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des commentaires
CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  poem_id INT NOT NULL,
  author_name VARCHAR(255) NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (poem_id) REFERENCES poems(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des likes
CREATE TABLE IF NOT EXISTS likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  poem_id INT NOT NULL,
  user_ip VARCHAR(45) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_like (poem_id, user_ip),
  FOREIGN KEY (poem_id) REFERENCES poems(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des vues
CREATE TABLE IF NOT EXISTS views (
  id INT AUTO_INCREMENT PRIMARY KEY,
  poem_id INT NOT NULL,
  user_ip VARCHAR(45) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (poem_id) REFERENCES poems(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertion des poèmes existants
INSERT INTO poems (id, title, author) VALUES
(1, 'رؤية الحبيب', 'شاعرة الحب — خديجة هرموش'),
(2, 'جرحٌ عميق', 'شاعرة الحب — خديجة هرموش'),
(3, 'أسرار بلا عنوان', 'شاعرة الحب — خديجة هرموش'),
(4, 'الحب والرياضيات', 'شاعرة الحب — خديجة هرموش'),
(5, 'أريد أن أكتبَ له رسالةً', 'شاعرة الحب — خديجة هرموش'),
(6, 'سئمتُ الانتظار', 'شاعرة الحب — خديجة هرموش'),
(7, 'سأظل أفكر بالفراق', 'شاعرة الحب — خديجة هرموش'),
(8, 'النسيان', 'شاعرة الحب — خديجة هرموش'),
(9, 'كل إنسان له عيوب', 'شاعرة الحب — خديجة هرموش'),
(10, 'آسفه لن أحب غيره', 'شاعرة الحب — خديجة هرموش'),
(11, 'الوقت الضائع', 'شاعرة الحب — خديجة هرموش'),
(12, 'الشبح', 'شاعرة الحب — خديجة هرموش'),
(13, 'مصير فتاة أحبت ( الفخر)', 'شاعرة الحب — خديجة هرموش');

-- Insertion des vers pour chaque poème
-- Poème 1: رؤية الحبيب
INSERT INTO verses (poem_id, verse_text, verse_order) VALUES
(1, 'رأيته يمشي مثل أميرِ الظلام', 1),
(1, 'رأيته يركض مثل فارسٍ شجاع', 2),
(1, 'حسبتُه شبحًا…', 3),
(1, 'لكنه أعزُّ الناسِ في الوجدان', 4),
(1, 'رأيته يتكلم بأدبٍ واحترام', 5),
(1, 'كأنّه مبتدئٌ في لغةِ الكلام', 6);

-- Poème 2: جرحٌ عميق
INSERT INTO verses (poem_id, verse_text, verse_order) VALUES
(2, 'كلمةٌ جرحت قلبي', 1),
(2, 'كلمةٌ أسكنتني وجعي', 2),
(2, 'كلمةٌ كانت كالسيفِ', 3),
(2, 'شقّت صدرَ الجندي', 4);
(2, 'شقّت صدرَ الجندي', 5);
(2, 'كلمةٌ صدرَ الجندي', 6);

-- Poème 3: أسرار بلا عنوان
INSERT INTO verses (poem_id, verse_text, verse_order) VALUES
(3, 'كلُّ قلبٍ يحملُ أسرارًا', 1),
(3, 'فما ذنبي… وهذا الانتحار؟', 2),
(3, 'كنتُ في انتظارِك', 3),
(3, 'لتقولَ ما يدورُ في بالكَ من أفكار', 4),
(3, 'لتبوحَ بكلامٍ', 5),
(3, 'لا يجرحُ… ولا يُسبّبُ الانهيار', 6);

-- Poème 4: الحب والرياضيات
INSERT INTO verses (poem_id, verse_text, verse_order) VALUES
(4, 'الحبُّ جعلني أفهمُ الرياضيات', 1),
(4, 'حتى صرتُ من العبقريات', 2),
(4, 'لا، بل من أكبرِ الذكيات', 3),
(4, 'لم أدرك أنني بذلتُ كلَّ هذه المجهودات', 4),
(4, 'لأحلَّ تلك النهايات', 5);

-- Poème 5: أريد أن أكتبَ له رسالةً
INSERT INTO verses (poem_id, verse_text, verse_order) VALUES
(5, 'أريد أن أكتبَ فيها أجملَ الكلام', 1),
(5, 'ولو كان ذلك في الأحلام', 2),
(5, 'أريد أن أكتبَ له جملةً تسحره فلا ينام', 3),
(5, 'وذلك من كثرةِ مشاهدةِ الأفلام', 4),
(5, 'أريد أن أكتبَ بجميعِ الأقلام', 5);

-- Poème 6: سئمتُ الانتظار
INSERT INTO verses (poem_id, verse_text, verse_order) VALUES
(6, 'سَئِمتُ الانتظار،', 1),
(6, 'ولم أجدِ الوقتَ لأختار،', 2),
(6, 'فطال صبري ليلًا ونهار،', 3),
(6, 'سَئِمتُ الانتظار،', 4),
(6, 'فوجدتُ نفسي ألعبُ بالنار،', 5);

-- Poème 7: سأظل أفكر بالفراق
INSERT INTO verses (poem_id, verse_text, verse_order) VALUES
(7, 'سأظلّ أفكّرُ بالفِراق،', 1),
(7, 'حتى أقتلَ قلبَهُ بمِطراق،', 2),
(7, 'وأُحلّقَ عاليًا كالأطواق،', 3),
(7, 'سأظلّ أفكّرُ بالفِراق،', 4),
(7, 'أنا التي كان قلبُها في احتراق،', 5);

-- Poème 8: النسيان
INSERT INTO verses (poem_id, verse_text, verse_order) VALUES
(8, 'هبَّت رياحُ النسيان،', 1),
(8, 'على جميعِ الأوطان،', 2),
(8, 'لأنَّ الحبَّ مصدرُ عدوان،', 3),
(8, 'بين عشّاقِ هذا الزمان.', 4),
(8, 'قرأتُ هذا في كتابٍ بلا عنوان،', 5);

-- Poème 9: كل إنسان له عيوب
INSERT INTO verses (poem_id, verse_text, verse_order) VALUES
(9, 'كلُّ إنسانٍ له عُيوب،', 1),
(9, 'فأنا طيّبة، لكن قلبي حَقود،', 2),
(9, 'أبحثُ عن حُبٍّ بلا قُيود،', 3),
(9, 'فالحريةُ شيءٌ غيرُ موجود.', 4),
(9, 'كلُّ إنسانٍ له عُيوب،', 5);

-- Poème 10: آسفه لن أحب غيره
INSERT INTO verses (poem_id, verse_text, verse_order) VALUES
(10, 'آسفة... لن أحبَّ غيره،', 1),
(10, 'راضيةٌ، أُطيعُ أمرَه،', 2),
(10, 'خادمةٌ، ومُنايَ أن يلقى هناه،', 3),
(10, 'قاضيةٌ، حكمي رهنُ رضاه.', 4),
(10, 'آسفة... لن أحبَّ غيره،', 5);
(10, 'آسفة... لن أحبَّ غيره،', 6);
(10, 'آسفة... لن أحبَّ غيره،', 7);
(10, 'آسفة... لن أحبَّ غيره،', 8);

-- Poème 11: الوقت الضائع
INSERT INTO verses (poem_id, verse_text, verse_order) VALUES
(11, 'يمرّ الوقتُ علينا،', 1),
(11, 'ولا زلنا كما كُنّا،', 2),
(11, 'ولا تزال الأبوابُ مُقفلةً أمامنا،', 3),
(11, 'ولا يزال الطريقُ لا يجمعنا.', 4),
(11, 'فحينَ تُمطرُ السماء،', 5);

-- Poème 12: الشبح
INSERT INTO verses (poem_id, verse_text, verse_order) VALUES
(12, 'قلبي يعزف لحن الحب', 1),
(12, 'كلما رأيت طيفك', 2),
(12, 'يرقص على أنغام هواك', 3),
(12, 'ويغني أجمل الأشعار', 4);

-- Poème 13: مصير فتاة أحبت ( الفخر)
INSERT INTO verses (poem_id, verse_text, verse_order) VALUES
(13, 'نظراً لضعف البصر،', 1),
(13, 'صرتُ أرى صورتَك في الخيال أجملَ منظر،', 2),
(13, 'صرتُ أُحسُّ أن حياتي بدونك سيلحقُها الضرر.', 3),
(13, '', 4),
(13, 'بعدما رسمتُ لحياتي طريقاً بوضوح،', 5),
(13, 'هذا القلبُ بسرِّه يريد أن يبوح،', 6);