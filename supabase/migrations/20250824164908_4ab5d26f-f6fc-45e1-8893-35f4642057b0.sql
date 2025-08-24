-- Ajouter quelques données d'exemple pour les échos des régions
INSERT INTO public.news (
    title, 
    summary, 
    details, 
    category, 
    published_date, 
    published_by, 
    is_visible, 
    reading_time,
    image_url
) VALUES 
(
    'Rencontre mensuelle des membres d''Abidjan',
    'Plus de 30 membres se sont retrouvés pour échanger sur les projets en cours et planifier les activités futures.',
    'La rencontre mensuelle de la délégation d''Abidjan s''est tenue le samedi 25 mars 2024 dans les locaux de la préfecture. Au programme : bilan des actions menées, présentation des nouveaux projets et planification du trimestre à venir.',
    'echo_regions',
    '2024-03-25',
    'Délégation Abidjan',
    true,
    5,
    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop'
),
(
    'Session de formation en leadership',
    'Formation intensive sur le leadership transformationnel organisée pour 15 membres de la région de Bouaké.',
    'Une formation de trois jours sur le leadership transformationnel s''est déroulée du 18 au 20 mars 2024. Cette session a permis aux participants de développer leurs compétences managériales et leur vision stratégique.',
    'echo_regions',
    '2024-03-20',
    'Délégation Bouaké',
    true,
    7,
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop'
),
(
    'Inauguration du bureau régional de San-Pédro',
    'Ouverture officielle du nouveau bureau régional en présence du Préfet et des autorités locales.',
    'Le nouveau bureau régional de San-Pédro a été officiellement inauguré le 15 mars 2024. Cette infrastructure moderne permettra de mieux servir les membres de la région et de renforcer les liens avec les institutions locales.',
    'echo_regions',
    '2024-03-15',
    'Délégation San-Pédro',
    true,
    4,
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
),
(
    'Atelier sur la gestion publique moderne',
    'Workshop sur les innovations en gestion publique locale organisé à Korhogo.',
    'L''atelier de formation sur la gestion publique moderne s''est tenu le 10 mars 2024 à Korhogo. Les participants ont pu découvrir les dernières innovations en matière de gouvernance locale et d''administration numérique.',
    'echo_regions',
    '2024-03-10',
    'Délégation Korhogo',
    false,
    6,
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
);