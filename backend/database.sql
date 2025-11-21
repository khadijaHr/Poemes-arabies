-- Création de la base de données
CREATE DATABASE IF NOT EXISTS arabic_love_verses CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE arabic_love_verses;


--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `poem_id` int(11) NOT NULL,
  `author_name` varchar(255) NOT NULL,
  `comment_text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `poem_id` int(11) NOT NULL,
  `user_ip` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `poems`
--

CREATE TABLE `poems` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT 'شاعرة الحب — خديجة هرموش',
  `description` text DEFAULT NULL,
  `written_date` varchar(50) DEFAULT NULL,
  `theme` varchar(255) DEFAULT NULL,
  `audio_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Structure de la table `verses`
--

CREATE TABLE `verses` (
  `id` int(11) NOT NULL,
  `poem_id` int(11) NOT NULL,
  `verse_text` text NOT NULL,
  `verse_order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Structure de la table `views`
--

CREATE TABLE `views` (
  `id` int(11) NOT NULL,
  `poem_id` int(11) NOT NULL,
  `user_ip` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `poem_id` (`poem_id`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_like` (`poem_id`,`user_ip`);

--
-- Index pour la table `poems`
--
ALTER TABLE `poems`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `verses`
--
ALTER TABLE `verses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `poem_id` (`poem_id`);

--
-- Index pour la table `views`
--
ALTER TABLE `views`
  ADD PRIMARY KEY (`id`),
  ADD KEY `poem_id` (`poem_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--


--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`poem_id`) REFERENCES `poems` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`poem_id`) REFERENCES `poems` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `verses`
--
ALTER TABLE `verses`
  ADD CONSTRAINT `verses_ibfk_1` FOREIGN KEY (`poem_id`) REFERENCES `poems` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `views`
--
ALTER TABLE `views`
  ADD CONSTRAINT `views_ibfk_1` FOREIGN KEY (`poem_id`) REFERENCES `poems` (`id`) ON DELETE CASCADE;
COMMIT;
