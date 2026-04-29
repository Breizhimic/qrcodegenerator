'use strict';

// ── i18n ───────────────────────────────────────────────────────
const TRANSLATIONS = {
  fr: {
    nav_generator: 'Générateur', nav_batch: 'Batch', nav_history: 'Historique', nav_about: 'À propos',
    ticker_instant: '▸ QR Codes instantanés', ticker_formats: '▸ PNG · SVG · PDF gratuits',
    ticker_logo: '▸ Logo personnalisé', ticker_batch: '▸ Mode batch x10',
    ticker_types: '▸ WiFi · Email · SMS · vCard', ticker_permanent: '▸ QR Codes permanents — sans abonnement',
    label_content_type: 'TYPE DE CONTENU', label_content: 'CONTENU',
    type_text: 'Texte', type_phone: 'Téléphone', type_vcard: 'Contact', type_file: 'Fichier',
    url_label: 'Adresse web', text_label: 'Texte libre',
    email_addr_label: 'Adresse email', email_subject_label: 'Sujet (optionnel)', email_body_label: 'Corps du message (optionnel)',
    phone_label: 'Numéro de téléphone',
    wifi_ssid_label: 'Nom du réseau (SSID)', wifi_pw_label: 'Mot de passe', wifi_enc_label: 'Chiffrement',
    wifi_open: 'Aucun (ouvert)', wifi_hidden: 'Réseau masqué (hidden SSID)',
    sms_msg_label: 'Message (optionnel)',
    vcard_first: 'Prénom', vcard_last: 'Nom', vcard_org: 'Organisation', vcard_title: 'Titre / Poste',
    vcard_phone: 'Téléphone', vcard_website: 'Site web', vcard_address: 'Adresse',
    file_label: 'Lien vers le fichier hébergé', file_hint: 'Hébergez votre fichier sur', file_hint2: 'puis collez le lien de partage ci-dessus.',
    label_custom: 'PERSONNALISATION', color_qr: 'Couleur QR', color_bg: 'Fond',
    size_label: 'Taille (px)', size_label2: 'Taille', ec_label: 'Correction',
    label_logo: 'LOGO AU CENTRE', preset_logos: 'LOGOS PRÉINTÉGRÉS',
    drop_text: 'Glissez une image ou', drop_browse: 'Parcourir',
    logo_size: 'Taille logo', logo_remove: '✕ Supprimer',
    label_tag: 'ÉTIQUETTE POUR HISTORIQUE (optionnel)', tag_placeholder: 'ex: Menu restaurant Été 2025',
    ph_url: 'https://exemple.com',
    ph_text: '-10% sur tout le magasin ! 🛍️',
    ph_email_addr: 'contact@exemple.com',
    ph_email_subject: "Demande d'information",
    ph_email_body: 'Bonjour, je souhaite...',
    ph_phone: '6 12 34 56 78',
    ph_wifi_ssid: 'MonReseau_5G',
    ph_wifi_pw: 'MotDePasse123',
    ph_sms_msg: 'Votre message...',
    ph_vcard_first: 'Jean', ph_vcard_last: 'Dupont',
    ph_vcard_org: 'Mon Entreprise', ph_vcard_title: 'Directeur Commercial',
    ph_vcard_phone: '+33 6 12 34 56 78',
    ph_vcard_email: 'jean.dupont@exemple.com',
    ph_vcard_url: 'https://exemple.com',
    ph_vcard_addr: '1 rue de la Paix, 75001 Paris',
    ph_file_url: 'https://drive.google.com/… ou https://dropbox.com/…',
    ph_contact_name: 'Jean', ph_contact_email: 'jean@exemple.com',
    ph_contact_msg: 'Décrivez votre problème ou suggestion...',
    preview_title: 'APERÇU LIVE', placeholder_text: 'Remplissez le formulaire',
    dl_btn: '↓ Télécharger', save_btn: "⊕ Sauvegarder dans l'historique",
    ad_label: 'Publicité',
    batch_title: 'GÉNÉRATION BATCH', batch_desc: "Entrez jusqu'à 10 URLs ou textes, un par ligne.",
    batch_generate: '▶ GÉNÉRER TOUT', batch_dl_png: '↓ Tout en PNG', batch_dl_pdf: '↓ PDF multi-pages',
    batch_empty: 'Vos QR codes apparaîtront ici',
    history_title: 'HISTORIQUE LOCAL', history_clear: '✕ Tout effacer',
    history_empty: 'Aucun QR code sauvegardé', history_empty_sub: 'Générez un QR code et cliquez sur "Sauvegarder"',
    about_hero_title: 'Le générateur de QR codes<br>simple, rapide et gratuit.',
    about_hero_sub: 'Aucune inscription. Aucun cookie. Aucune donnée collectée. Juste votre QR code.',
    about_why_title: 'Pourquoi utiliser qrcodegenerator.fr ?',
    feat1_title: 'Gratuit et sans limite', feat1_desc: "Générez autant de QR codes que vous voulez, sans abonnement, sans compte, sans carte bancaire. 100% gratuit aujourd'hui et pour toujours.",
    feat2_title: 'Instantané', feat2_desc: "L'aperçu se met à jour en temps réel à chaque frappe. Pas d'attente, pas de bouton Générer à cliquer. Votre QR code est prêt en moins d'une seconde.",
    feat3_title: 'Personnalisation complète', feat3_desc: "Couleurs, taille, logo au centre (Facebook, Instagram, votre propre logo…), niveau de correction d'erreur — maîtrisez chaque détail de votre QR code.",
    feat4_title: 'Flexible et polyvalent', feat4_desc: 'URL, texte libre, WiFi, email, SMS, contact vCard, fichier… 8 types de contenu différents pour couvrir tous les usages professionnels et personnels.',
    feat5_title: 'Aucune donnée collectée', feat5_desc: 'Zéro cookie de tracking. Zéro collecte de données personnelles. Tout se passe dans votre navigateur — vos contenus ne quittent jamais votre appareil.',
    feat6_title: 'Export PNG, SVG & PDF', feat6_desc: "Téléchargez vos QR codes dans le format adapté à votre usage : PNG pour le web, SVG vectoriel pour l'impression, PDF mis en page pour les documents professionnels.",
    feat7_title: 'QR codes permanents', feat7_desc: "Contrairement à d'autres services qui font expirer vos QR codes si vous ne payez pas, les nôtres sont valables à vie. Pas d'abonnement caché, pas de surprise — votre QR code fonctionnera dans 10 ans comme aujourd'hui.",
    about_who_title: 'Qui sommes-nous ?',
    about_who_p1: "QRCodeGenerator.fr a été créé par un jeune développeur passionné par les outils simples et véritablement utiles. Fatigué des générateurs de QR codes surchargés, truffés de publicités intrusives ou qui demandent une inscription juste pour télécharger une image, il a décidé d'en construire un différent.",
    about_who_p2: "Notre conviction : un bon outil doit être accessible à tous, sans friction. Pas d'interface compliquée, pas de compte à créer, pas de données aspirées en arrière-plan. Juste un outil qui fait ce qu'il promet — et qui le fait bien.",
    about_who_p3: "QRCodeGenerator.fr est l'un des rares générateurs qui traite tout localement dans votre navigateur. Votre URL, votre mot de passe WiFi ou votre fiche contact ne transitent par aucun serveur. Ils ne sont jamais stockés, jamais partagés, jamais monétisés.",
    stat1: 'Types de contenu', stat2: "Formats d'export", stat3: 'Cookie traceur', stat4: 'QR codes gratuits',
    contact_title: 'Contact & support', contact_intro: 'Un bug à signaler, une fonctionnalité à suggérer ou juste un retour positif ? Nous lisons tous les messages et répondons dans les meilleurs délais.',
    contact_name_label: 'Votre prénom', contact_email_label: 'Votre email', contact_subject_label: 'Sujet',
    contact_subject_default: '— Choisissez un sujet —', contact_subject_bug: '🐛 Signaler un bug',
    contact_subject_feature: '💡 Suggérer une fonctionnalité', contact_subject_question: '❓ Question générale', contact_subject_other: '💬 Autre',
    contact_msg_label: 'Message', contact_send: '▶ ENVOYER LE MESSAGE', contact_note: 'Nous ne partageons jamais votre adresse email.',
    contact_success_title: 'Message envoyé !', contact_success_msg: 'Merci pour votre retour. Nous vous répondrons dans les 48h si vous avez laissé un email.',
    contact_error: 'Une erreur est survenue. Réessayez.',
    footer_left: '▦ qrcodegenerator.fr — 100% gratuit, 0% cloud', footer_right: 'Vos données restent sur votre appareil',
    toast_logo_selected: '✓ Logo sélectionné — correction H activée',
    toast_logo_added: '✓ Logo ajouté — correction H activée',
    toast_png: '✓ PNG téléchargé', toast_svg: '✓ SVG téléchargé', toast_pdf: '✓ PDF téléchargé',
    toast_saved: "✓ Sauvegardé dans l'historique", toast_loaded: '↗ QR code chargé', toast_deleted: '✓ Supprimé',
    toast_cleared: '✓ Historique effacé', toast_sent: '✓ Message envoyé !',
    toast_batch_empty: '⚠ Entrez au moins une ligne', toast_generate_first: '⚠ Générez d\'abord',
    toast_write_msg: '⚠ Veuillez écrire un message',
    confirm_clear: "Effacer tout l'historique ?",
    sending: '⏳ Envoi en cours…',
    hist_entries: (n) => `${n} entrée${n !== 1 ? 's' : ''}`,
    hist_dl: '↓ PNG', hist_load: '↗ Charger', hist_pdf: '↓ PDF', hist_delete: '✕ Sup.',
    nav_guide: 'Guide QR',
    feat8_title: 'Disponible en français et en anglais',
    feat8_desc: "L'interface est entièrement disponible en français et en anglais. Changez de langue en un clic depuis le bouton en haut à droite.",
    guide_hero_title: 'Comment fonctionne<br>un QR code ?',
    guide_hero_sub: "Tout ce que vous avez toujours voulu savoir sur les QR codes — en clair, sans jargon.",
    guide_what_title: "Qu'est-ce qu'un QR code ?",
    guide_what_p1: "QR signifie <strong>Quick Response</strong> — réponse rapide. Inventé en 1994 par la société japonaise Denso Wave pour tracer des pièces automobiles, le QR code est devenu l'un des formats d'encodage d'information les plus utilisés au monde.",
    guide_what_p2: "Contrairement à un code-barres classique qui ne stocke qu'une ligne de données, un QR code est <strong>bidimensionnel</strong> : il encode l'information à la fois horizontalement et verticalement, ce qui lui permet de contenir beaucoup plus de données dans un espace réduit.",
    guide_anatomy_title: "Anatomie d'un QR code",
    guide_anat1_title: 'Coins de détection', guide_anat1_desc: "Les 3 grands carrés dans les coins servent à indiquer au lecteur l'orientation et la position du code. Sans eux, impossible de savoir dans quel sens lire le QR code.",
    guide_anat2_title: 'Modules de données', guide_anat2_desc: "Les petits carrés noir et blanc au centre encodent l'information réelle — URL, texte, contact… Chaque module représente un bit : noir = 1, blanc = 0.",
    guide_anat3_title: "Correction d'erreur", guide_anat3_desc: "Un QR code contient des données redondantes. Même endommagé ou partiellement caché (par un logo par exemple), il reste lisible. Le niveau H permet jusqu'à 30% de perte.",
    guide_anat4_title: 'Zone silencieuse', guide_anat4_desc: "La bordure blanche autour du QR code est obligatoire. Elle permet au lecteur de distinguer le code de son environnement. Sans cette marge, le code risque de ne pas être reconnu.",
    guide_read_title: 'Comment un smartphone le lit-il ?',
    guide_step1_title: "Capture de l'image", guide_step1_desc: "L'appareil photo détecte les 3 coins de détection et calcule la perspective pour redresser l'image, même si le code est incliné ou photographié en biais.",
    guide_step2_title: 'Décodage binaire', guide_step2_desc: "Chaque module noir/blanc est converti en 0 ou 1. L'algorithme lit ces bits selon un schéma précis défini par la norme ISO 18004 pour reconstituer les données originales.",
    guide_step3_title: 'Correction et vérification', guide_step3_desc: "Le système de correction d'erreur (Reed-Solomon) reconstruit automatiquement les données manquantes ou abîmées avant de délivrer le résultat final.",
    guide_step4_title: 'Action déclenchée', guide_step4_desc: "Le téléphone interprète le contenu : ouvre un navigateur si c'est une URL, propose d'ajouter un contact si c'est une vCard, connecte au WiFi automatiquement, etc.",
    guide_ec_title: "Les niveaux de correction d'erreur",
    guide_ec_intro: "Plus le niveau est élevé, plus le QR code est robuste — mais plus il est dense et complexe. Choisissez selon votre usage.",
    guide_ec_l: "Idéal pour un usage numérique simple où le code ne risque pas d'être abîmé.",
    guide_ec_m: 'Le bon équilibre pour la plupart des usages. Recommandé par défaut.',
    guide_ec_q: "Recommandé pour l'impression sur des surfaces susceptibles d'être rayées ou salies.",
    guide_ec_h: "Obligatoire si vous ajoutez un logo au centre. Compense les modules masqués.",
    guide_capacity_title: "Combien d'informations peut-on stocker ?",
    guide_capacity_p1: "La capacité dépend du type de données et du niveau de correction. En mode alphanumérique, un QR code peut contenir jusqu'à <strong>4 296 caractères</strong>. Pour une simple URL, c'est largement suffisant — une adresse web courte ne dépasse généralement pas 50 à 100 caractères.",
    guide_capacity_p2: "Plus le contenu est long, plus le QR code devient dense et difficile à lire à distance. Pour les vCards ou les textes longs, préférez le niveau de correction L pour maximiser la capacité encodable.",
    guide_tip: "Conseil : utilisez un raccourcisseur d'URL (bit.ly, short.io…) avant de générer votre QR code. Un lien court produit un QR code moins dense, plus facile à scanner — surtout en petite taille.",
    guide_cta_title: 'Prêt à créer votre QR code ?',
    guide_cta_desc: "Maintenant que vous savez tout, passez à la pratique — gratuitement, sans inscription, en quelques secondes.",
    guide_cta_btn: '▶ CRÉER MON QR CODE',
    type_labels: { url: 'URL', text: 'TEXTE LIBRE', email: 'EMAIL', phone: 'TÉLÉPHONE', wifi: 'WIFI', sms: 'SMS', vcard: 'CONTACT / vCARD', file: 'FICHIER' },
  },
  en: {
    nav_generator: 'Generator', nav_batch: 'Batch', nav_history: 'History', nav_about: 'About',
    ticker_instant: '▸ Instant QR Codes', ticker_formats: '▸ Free PNG · SVG · PDF',
    ticker_logo: '▸ Custom logo', ticker_batch: '▸ Batch mode x10',
    ticker_types: '▸ WiFi · Email · SMS · vCard', ticker_permanent: '▸ Permanent QR Codes — no subscription',
    label_content_type: 'CONTENT TYPE', label_content: 'CONTENT',
    type_text: 'Text', type_phone: 'Phone', type_vcard: 'Contact', type_file: 'File',
    url_label: 'Web address', text_label: 'Free text',
    email_addr_label: 'Email address', email_subject_label: 'Subject (optional)', email_body_label: 'Message body (optional)',
    phone_label: 'Phone number',
    wifi_ssid_label: 'Network name (SSID)', wifi_pw_label: 'Password', wifi_enc_label: 'Encryption',
    wifi_open: 'None (open)', wifi_hidden: 'Hidden network (hidden SSID)',
    sms_msg_label: 'Message (optional)',
    vcard_first: 'First name', vcard_last: 'Last name', vcard_org: 'Organization', vcard_title: 'Title / Position',
    vcard_phone: 'Phone', vcard_website: 'Website', vcard_address: 'Address',
    file_label: 'Link to hosted file', file_hint: 'Host your file on', file_hint2: 'then paste the share link above.',
    label_custom: 'CUSTOMIZATION', color_qr: 'QR color', color_bg: 'Background',
    size_label: 'Size (px)', size_label2: 'Size', ec_label: 'Error correction',
    label_logo: 'CENTER LOGO', preset_logos: 'PRESET LOGOS',
    drop_text: 'Drop an image or', drop_browse: 'browse',
    logo_size: 'Logo size', logo_remove: '✕ Remove',
    label_tag: 'HISTORY LABEL (optional)', tag_placeholder: 'e.g. Summer menu 2025',
    ph_url: 'https://example.com',
    ph_text: '-10% off everything! 🛍️',
    ph_email_addr: 'contact@example.com',
    ph_email_subject: 'Information request',
    ph_email_body: 'Hello, I would like to...',
    ph_phone: '6 12 34 56 78',
    ph_wifi_ssid: 'MyNetwork_5G',
    ph_wifi_pw: 'Password123',
    ph_sms_msg: 'Your message...',
    ph_vcard_first: 'John', ph_vcard_last: 'Smith',
    ph_vcard_org: 'My Company', ph_vcard_title: 'Sales Manager',
    ph_vcard_phone: '+44 7911 123456',
    ph_vcard_email: 'john.smith@example.com',
    ph_vcard_url: 'https://example.com',
    ph_vcard_addr: '1 London Road, London SW1A 1AA',
    ph_file_url: 'https://drive.google.com/… or https://dropbox.com/…',
    ph_contact_name: 'John', ph_contact_email: 'john@example.com',
    ph_contact_msg: 'Describe your issue or suggestion...',
    preview_title: 'LIVE PREVIEW', placeholder_text: 'Fill in the form',
    dl_btn: '↓ Download', save_btn: '⊕ Save to history',
    ad_label: 'Advertisement',
    batch_title: 'BATCH GENERATION', batch_desc: 'Enter up to 10 URLs or texts, one per line.',
    batch_generate: '▶ GENERATE ALL', batch_dl_png: '↓ All as PNG', batch_dl_pdf: '↓ Multi-page PDF',
    batch_empty: 'Your QR codes will appear here',
    history_title: 'LOCAL HISTORY', history_clear: '✕ Clear all',
    history_empty: 'No saved QR codes', history_empty_sub: 'Generate a QR code and click "Save"',
    about_hero_title: 'The QR code generator<br>simple, fast and free.',
    about_hero_sub: 'No sign-up. No cookies. No data collected. Just your QR code.',
    about_why_title: 'Why use qrcodegenerator.fr?',
    feat1_title: 'Free and unlimited', feat1_desc: 'Generate as many QR codes as you want — no subscription, no account, no credit card. 100% free today and forever.',
    feat2_title: 'Instant', feat2_desc: 'The preview updates in real time as you type. No waiting, no Generate button to click. Your QR code is ready in under a second.',
    feat3_title: 'Full customization', feat3_desc: 'Colors, size, center logo (Facebook, Instagram, your own logo…), error correction level — control every detail of your QR code.',
    feat4_title: 'Flexible and versatile', feat4_desc: 'URL, free text, WiFi, email, SMS, vCard contact, file… 8 different content types to cover all professional and personal use cases.',
    feat5_title: 'No data collected', feat5_desc: 'Zero tracking cookies. Zero personal data collection. Everything happens in your browser — your content never leaves your device.',
    feat6_title: 'Export PNG, SVG & PDF', feat6_desc: 'Download your QR codes in the format that suits your needs: PNG for the web, vector SVG for print, PDF layout for professional documents.',
    feat7_title: 'Permanent QR codes', feat7_desc: "Unlike other services that expire your QR codes if you don't pay, ours are valid for life. No hidden subscription, no surprises — your QR code will work in 10 years just as it does today.",
    about_who_title: 'Who are we?',
    about_who_p1: 'QRCodeGenerator.fr was built by a young developer passionate about simple, genuinely useful tools. Fed up with bloated QR code generators full of intrusive ads or requiring sign-up just to download an image, he decided to build a different one.',
    about_who_p2: 'Our belief: a good tool should be accessible to everyone, friction-free. No complicated interface, no account to create, no data harvested in the background. Just a tool that does what it promises — and does it well.',
    about_who_p3: 'QRCodeGenerator.fr processes everything locally in your browser. Your URL, WiFi password, or contact card never pass through any server. They are never stored, never shared, never monetized.',
    stat1: 'Content types', stat2: 'Export formats', stat3: 'Tracking cookies', stat4: 'Free QR codes',
    contact_title: 'Contact & support', contact_intro: 'Found a bug, have a feature request, or just want to share feedback? We read every message and reply as soon as possible.',
    contact_name_label: 'Your first name', contact_email_label: 'Your email', contact_subject_label: 'Subject',
    contact_subject_default: '— Choose a subject —', contact_subject_bug: '🐛 Report a bug',
    contact_subject_feature: '💡 Suggest a feature', contact_subject_question: '❓ General question', contact_subject_other: '💬 Other',
    contact_msg_label: 'Message', contact_send: '▶ SEND MESSAGE', contact_note: 'We never share your email address.',
    contact_success_title: 'Message sent!', contact_success_msg: "Thanks for your feedback. We'll reply within 48h if you left an email.",
    contact_error: 'An error occurred. Please try again.',
    footer_left: '▦ qrcodegenerator.fr — 100% free, 0% cloud', footer_right: 'Your data stays on your device',
    toast_logo_selected: '✓ Logo selected — H correction enabled',
    toast_logo_added: '✓ Logo added — H correction enabled',
    toast_png: '✓ PNG downloaded', toast_svg: '✓ SVG downloaded', toast_pdf: '✓ PDF downloaded',
    toast_saved: '✓ Saved to history', toast_loaded: '↗ QR code loaded', toast_deleted: '✓ Deleted',
    toast_cleared: '✓ History cleared', toast_sent: '✓ Message sent!',
    toast_batch_empty: '⚠ Enter at least one line', toast_generate_first: '⚠ Generate first',
    toast_write_msg: '⚠ Please write a message',
    confirm_clear: 'Clear entire history?',
    sending: '⏳ Sending…',
    hist_entries: (n) => `${n} entr${n !== 1 ? 'ies' : 'y'}`,
    hist_dl: '↓ PNG', hist_load: '↗ Load', hist_pdf: '↓ PDF', hist_delete: '✕ Del.',
    nav_guide: 'QR Guide',
    feat8_title: 'Available in French and English',
    feat8_desc: 'The interface is fully available in French and English. Switch languages with one click from the button in the top right.',
    guide_hero_title: 'How does<br>a QR code work?',
    guide_hero_sub: 'Everything you always wanted to know about QR codes — clearly explained, no jargon.',
    guide_what_title: 'What is a QR code?',
    guide_what_p1: 'QR stands for <strong>Quick Response</strong>. Invented in 1994 by the Japanese company Denso Wave to track automotive parts, the QR code has become one of the most widely used information encoding formats in the world.',
    guide_what_p2: 'Unlike a traditional barcode that only stores one line of data, a QR code is <strong>two-dimensional</strong>: it encodes information both horizontally and vertically, allowing it to store far more data in a compact space.',
    guide_anatomy_title: 'Anatomy of a QR code',
    guide_anat1_title: 'Finder patterns', guide_anat1_desc: "The 3 large squares in the corners tell the reader the orientation and position of the code. Without them, it would be impossible to know which way to read the QR code.",
    guide_anat2_title: 'Data modules', guide_anat2_desc: "The small black and white squares in the center encode the actual information — URL, text, contact… Each module represents one bit: black = 1, white = 0.",
    guide_anat3_title: 'Error correction', guide_anat3_desc: "A QR code contains redundant data. Even if damaged or partially hidden (by a logo for example), it remains readable. Level H allows up to 30% data loss.",
    guide_anat4_title: 'Quiet zone', guide_anat4_desc: "The white border around the QR code is mandatory. It helps the reader distinguish the code from its surroundings. Without this margin, the code may not be recognized.",
    guide_read_title: 'How does a smartphone read it?',
    guide_step1_title: 'Image capture', guide_step1_desc: "The camera detects the 3 finder patterns and calculates the perspective to straighten the image, even if the code is tilted or shot at an angle.",
    guide_step2_title: 'Binary decoding', guide_step2_desc: "Each black/white module is converted to 0 or 1. The algorithm reads these bits according to a precise scheme defined by the ISO 18004 standard to reconstruct the original data.",
    guide_step3_title: 'Error correction & verification', guide_step3_desc: "The error correction system (Reed-Solomon) automatically reconstructs missing or damaged data before delivering the final result.",
    guide_step4_title: 'Action triggered', guide_step4_desc: "The phone interprets the content: opens a browser if it is a URL, offers to add a contact if it is a vCard, connects to WiFi automatically, etc.",
    guide_ec_title: 'Error correction levels',
    guide_ec_intro: 'The higher the level, the more robust the QR code — but also the denser and more complex. Choose based on your use case.',
    guide_ec_l: 'Ideal for simple digital use where the code is unlikely to be damaged.',
    guide_ec_m: 'The right balance for most use cases. Recommended by default.',
    guide_ec_q: 'Recommended for printing on surfaces that may be scratched or dirty.',
    guide_ec_h: 'Required if you add a center logo. Compensates for masked modules.',
    guide_capacity_title: 'How much information can be stored?',
    guide_capacity_p1: 'Capacity depends on the data type and correction level. In alphanumeric mode, a QR code can hold up to <strong>4,296 characters</strong>. For a simple URL, this is more than enough — a short web address typically stays under 50 to 100 characters.',
    guide_capacity_p2: 'The longer the content, the denser and harder to scan the QR code becomes at a distance. For vCards or long texts, prefer correction level L to maximize encodable capacity.',
    guide_tip: 'Tip: use a URL shortener (bit.ly, short.io…) before generating your QR code. A shorter link produces a less dense QR code that is easier to scan — especially at small sizes.',
    guide_cta_title: 'Ready to create your QR code?',
    guide_cta_desc: 'Now that you know everything, put it into practice — free, no sign-up, in seconds.',
    guide_cta_btn: '▶ CREATE MY QR CODE',
    type_labels: { url: 'URL', text: 'FREE TEXT', email: 'EMAIL', phone: 'PHONE', wifi: 'WIFI', sms: 'SMS', vcard: 'CONTACT / vCARD', file: 'FILE' },
  }
};

let currentLang = localStorage.getItem('qrcg-lang') || 'fr';

function t(key) {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS['fr'][key] || key;
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = TRANSLATIONS[currentLang][key] || TRANSLATIONS['fr'][key];
    if (val === undefined) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else if (el.tagName === 'BUTTON') {
      el.textContent = val;
    } else if (/<[a-z]/i.test(val)) {
      // La valeur contient du HTML (ex: <br>, <strong>) : utiliser innerHTML
      el.innerHTML = val;
    } else if (el.children.length === 0) {
      // Pas d'enfants, pas de HTML : textContent suffit
      el.textContent = val;
    } else {
      // Élément avec enfants DOM mais valeur sans HTML : mettre à jour le premier text node
      for (const node of el.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          node.textContent = val;
          break;
        }
      }
    }
  });
  // Update placeholders via data-i18n-ph
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.dataset.i18nPh;
    const val = TRANSLATIONS[currentLang][key] || TRANSLATIONS['fr'][key];
    if (val) el.placeholder = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const val = TRANSLATIONS[currentLang][key] || TRANSLATIONS['fr'][key];
    if (val) el.placeholder = val;
  });
  const langLabel = document.getElementById('langLabel');
  if (langLabel) langLabel.textContent = currentLang === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR';
  // Update camera label
  document.querySelectorAll('.preset-logo-btn').forEach(btn => {
    if (btn.dataset.logo === 'camera') {
      const span = btn.querySelector('span:last-child');
      if (span) span.textContent = currentLang === 'en' ? 'Camera' : 'Caméra';
    }
  });
  const contentLabel = document.getElementById('contentLabel');
  if (contentLabel) {
    const activeType = document.querySelector('.type-btn.active');
    if (activeType) contentLabel.textContent = t('type_labels')[activeType.dataset.type] || t('label_content');
  }
}

// ── State ──────────────────────────────────────────────────────
const state = {
  currentType: 'url',
  logoDataURL: null,
  logoSize: 20,
  savedEcLevel: null,
  currentPNG: null,
  currentSVGRaw: null,
  lastText: '',
  lastSize: 300,
  lastFg: '#000000',
  lastBg: '#ffffff',
  lastEc: 'M',
  batchItems: [],
};

// ── DOM helpers ────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

// ── Theme ──────────────────────────────────────────────────────
const html = document.documentElement;
$('themeToggle').addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('qrcg-theme', next);
});
html.setAttribute('data-theme', localStorage.getItem('qrcg-theme') || 'light');

// ── Language toggle ────────────────────────────────────────────
document.getElementById('langToggle').addEventListener('click', () => {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  localStorage.setItem('qrcg-lang', currentLang);
  applyTranslations();
});
applyTranslations();

// ── Tab Navigation ─────────────────────────────────────────────
$$('.nav-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    $$('.nav-tab').forEach(b => b.classList.remove('active'));
    $$('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    $(`tab-${tab}`).classList.add('active');
    if (tab === 'history') renderHistory();

// ── Guide CTA button ───────────────────────────────────────────
const guideCTABtn = document.getElementById('guideCTA');
if (guideCTABtn) {
  guideCTABtn.addEventListener('click', () => {
    document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector('.nav-tab[data-tab="generator"]').classList.add('active');
    document.getElementById('tab-generator').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
  });
});

// ── Toast ──────────────────────────────────────────────────────
let toastTimer;
function showToast(msg, duration = 2800) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), duration);
}

// ── Type selector ──────────────────────────────────────────────
// TYPE_LABELS now via i18n t('type_labels')

$$('.type-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    $$('.type-btn').forEach(b => b.classList.remove('active'));
    $$('.content-form').forEach(f => f.classList.remove('active'));
    btn.classList.add('active');
    $(`form-${type}`).classList.add('active');
    $('contentLabel').textContent = t('type_labels')[type] || t('label_content');
    state.currentType = type;
    scheduleQR();
  });
});

// ── Content builders ───────────────────────────────────────────
function buildQRContent() {
  switch (state.currentType) {
    case 'url': return $('urlInput').value.trim();
    case 'text': return $('textInput').value.trim();
    case 'email': {
      const addr = $('emailAddress').value.trim();
      if (!addr) return '';
      const subj = $('emailSubject').value.trim();
      const body = $('emailBody').value.trim();
      let s = `mailto:${addr}`;
      const p = [];
      if (subj) p.push(`subject=${encodeURIComponent(subj)}`);
      if (body) p.push(`body=${encodeURIComponent(body)}`);
      if (p.length) s += '?' + p.join('&');
      return s;
    }
    case 'phone': {
      const cc = $('phoneCountry').value;
      const num = $('phoneNumber').value.trim().replace(/\s/g, '');
      if (!num) return '';
      const clean = num.startsWith('0') ? num.slice(1) : num;
      return `tel:${cc}${clean}`;
    }
    case 'wifi': {
      const ssid = $('wifiSSID').value.trim();
      if (!ssid) return '';
      const pw     = $('wifiPassword').value;
      const enc    = document.querySelector('input[name="wifiEnc"]:checked')?.value || 'WPA';
      const hidden = $('wifiHidden').checked ? 'true' : 'false';
      if (enc === 'nopass') return `WIFI:T:nopass;S:${ssid};;H:${hidden};`;
      return `WIFI:T:${enc};S:${ssid};P:${pw};;H:${hidden};`;
    }
    case 'sms': {
      const cc  = $('smsCountry').value;
      const num = $('smsNumber').value.trim().replace(/\s/g, '');
      if (!num) return '';
      const clean = num.startsWith('0') ? num.slice(1) : num;
      const msg = $('smsMessage').value.trim();
      return msg ? `sms:${cc}${clean}?body=${encodeURIComponent(msg)}` : `sms:${cc}${clean}`;
    }
    case 'vcard': {
      const first = $('vcardFirst').value.trim();
      const last  = $('vcardLast').value.trim();
      if (!first && !last) return '';
      // Use only filled fields to keep size minimal
      const org   = $('vcardOrg').value.trim();
      const title = $('vcardTitle').value.trim();
      const phone = $('vcardPhone').value.trim();
      const email = $('vcardEmail').value.trim();
      const url   = $('vcardUrl').value.trim();
      const addr  = $('vcardAddress').value.trim();
      let v = `BEGIN:VCARD\nVERSION:3.0\n`;
      v += `N:${last};${first};;;\n`;
      v += `FN:${first}${last ? ' ' + last : ''}\n`;
      if (org)   v += `ORG:${org}\n`;
      if (title) v += `TITLE:${title}\n`;
      if (phone) v += `TEL:${phone}\n`;
      if (email) v += `EMAIL:${email}\n`;
      if (url)   v += `URL:${url}\n`;
      if (addr)  v += `ADR:;;${addr};;;;\n`;
      v += `END:VCARD`;
      // Auto-switch to L correction for max capacity
      if (!state.savedEcLevel) {
        state.savedVcardEc = $('ecLevel').value;
        $('ecLevel').value = 'L';
      }
      return v;
    }
    case 'file': return ($('fileUrlInput') && $('fileUrlInput').value.trim()) || '';
    default: return '';
  }
}

// ── Input listeners ────────────────────────────────────────────
const ALL_INPUTS = [
  'urlInput','textInput','emailAddress','emailSubject','emailBody',
  'phoneCountry','phoneNumber','wifiSSID','wifiPassword','wifiHidden',
  'smsCountry','smsNumber','smsMessage',
  'vcardFirst','vcardLast','vcardOrg','vcardTitle','vcardPhone','vcardEmail','vcardUrl','vcardAddress',
  'fileUrlInput',
  'qrSize','ecLevel','fgColor','bgColor',
];
ALL_INPUTS.forEach(id => {
  const el = $(id);
  if (el) { el.addEventListener('input', scheduleQR); el.addEventListener('change', scheduleQR); }
});
$$('input[name="wifiEnc"]').forEach(r => r.addEventListener('change', scheduleQR));

$('fgColor').addEventListener('input', e => { $('fgColorVal').textContent = e.target.value; });
$('bgColor').addEventListener('input', e => { $('bgColorVal').textContent = e.target.value; });

$('toggleWifiPw').addEventListener('click', () => {
  const pw = $('wifiPassword');
  pw.type = pw.type === 'password' ? 'text' : 'password';
});

// ── Corner style picker ────────────────────────────────────────
// ── Preset logos — render SVG to PNG then inject buttons ────────
const LOGOS = [
  { key: 'facebook',  label: 'Facebook',  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="18" fill="#1877F2"/><path fill="white" d="M67 100V61h13l2-16H67v-9c0-5 1-8 8-8h7V13c-1 0-5-1-11-1-11 0-19 7-19 20v11H39v16h13v39z"/></svg>` },
  { key: 'instagram', label: 'Instagram', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="ig3" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#f09433"/><stop offset="25%" stop-color="#e6683c"/><stop offset="50%" stop-color="#dc2743"/><stop offset="75%" stop-color="#cc2366"/><stop offset="100%" stop-color="#bc1888"/></linearGradient></defs><rect width="100" height="100" rx="22" fill="url(#ig3)"/><rect x="20" y="20" width="60" height="60" rx="16" fill="none" stroke="white" stroke-width="6"/><circle cx="50" cy="50" r="16" fill="none" stroke="white" stroke-width="6"/><circle cx="73" cy="27" r="5" fill="white"/></svg>` },
  { key: 'whatsapp',  label: 'WhatsApp',  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="#25D366"/><path fill="white" d="M50 15C30 15 14 31 14 51c0 7 2 13 6 18L14 86l18-6c5 3 11 5 18 5 20 0 36-16 36-36S70 15 50 15zm21 50c-1 2-4 4-6 4-1 0-4 0-13-4-8-4-13-11-14-12-1-1-5-7-5-13s3-9 4-10c1-2 3-2 4-2h2c1 0 2 0 3 3l4 9c0 1 0 2-1 3l-2 2c-1 1-1 2 0 3 1 2 5 7 9 10 4 2 7 3 8 4 1 0 2 0 3-1l2-3c1-1 2-1 3-1l8 4c1 1 2 1 2 3 0 1-1 4-2 5z"/></svg>` },
  { key: 'youtube',   label: 'YouTube',   svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="18" fill="#FF0000"/><path fill="white" d="M82 35s-1-6-4-8c-3-4-7-4-9-4C58 22 50 22 50 22s-8 0-19 1c-2 0-6 1-9 4-3 2-4 8-4 8S17 41 17 48v6c0 7 1 13 1 13s1 6 4 8c3 4 8 3 10 4C39 80 50 80 50 80s8 0 19-2c2 0 6-1 9-4 3-2 4-8 4-8s1-6 1-13v-6c0-7-1-13-1-13zM42 62V38l24 12-24 12z"/></svg>` },
  { key: 'tiktok',    label: 'TikTok',    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="18" fill="#010101"/><path fill="#69C9D0" d="M72 25c-5-1-9-4-12-8h-9v48c0 5-4 9-9 9s-9-4-9-9 4-9 9-9c1 0 2 0 3 1V48c-1 0-2 0-3 0-10 0-18 8-18 18s8 18 18 18 18-8 18-18V41c4 3 8 4 12 5V37c-2 0-7-2-10-6l10-6z"/><path fill="white" d="M62 35c3 4 7 7 12 8v9c-4-1-8-2-12-5v26c0 10-8 18-18 18s-18-8-18-18 8-18 18-18c1 0 2 0 3 0v9c-1 0-2-1-3-1-5 0-9 4-9 9s4 9 9 9 9-4 9-9V17h9c3 4 7 7 12 8"/></svg>` },
  { key: 'linkedin',  label: 'LinkedIn',  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="18" fill="#0A66C2"/><path fill="white" d="M25 38h15v47H25zm7-5a9 9 0 110-18 9 9 0 010 18zm55 52H72V62c0-4-1-9-7-9s-8 4-8 8v24H42V38h14v6c2-3 6-7 13-7 14 0 18 9 18 21z"/></svg>` },
  { key: 'scan-me',  label: 'Scan Me',   svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="10" fill="#111"/><rect x="5" y="5" width="36" height="36" rx="6" fill="#f5e642"/><rect x="10" y="10" width="26" height="26" rx="3" fill="#111"/><rect x="15" y="15" width="16" height="16" rx="2" fill="#f5e642"/><rect x="59" y="5" width="36" height="36" rx="6" fill="#f5e642"/><rect x="64" y="10" width="26" height="26" rx="3" fill="#111"/><rect x="69" y="15" width="16" height="16" rx="2" fill="#f5e642"/><rect x="5" y="59" width="36" height="36" rx="6" fill="#f5e642"/><rect x="10" y="64" width="26" height="26" rx="3" fill="#111"/><rect x="15" y="69" width="16" height="16" rx="2" fill="#f5e642"/><rect x="46" y="5" width="7" height="7" rx="1" fill="#f5e642"/><rect x="46" y="16" width="7" height="7" rx="1" fill="#f5e642"/><rect x="46" y="27" width="7" height="7" rx="1" fill="#f5e642"/><rect x="59" y="46" width="7" height="7" rx="1" fill="#f5e642"/><rect x="70" y="46" width="7" height="7" rx="1" fill="#f5e642"/><rect x="81" y="46" width="7" height="7" rx="1" fill="#f5e642"/><rect x="59" y="57" width="7" height="7" rx="1" fill="#f5e642"/><rect x="70" y="57" width="7" height="7" rx="1" fill="#f5e642"/><rect x="59" y="68" width="7" height="7" rx="1" fill="#f5e642"/><rect x="70" y="68" width="7" height="7" rx="1" fill="#f5e642"/><rect x="81" y="68" width="7" height="7" rx="1" fill="#f5e642"/><rect x="81" y="57" width="7" height="7" rx="1" fill="#f5e642"/><rect x="46" y="59" width="7" height="7" rx="1" fill="#f5e642"/><rect x="46" y="70" width="7" height="7" rx="1" fill="#f5e642"/><rect x="59" y="79" width="29" height="7" rx="1" fill="#f5e642"/><rect x="46" y="79" width="7" height="7" rx="1" fill="#f5e642"/></svg>` },
  { key: 'camera',   label: currentLang === 'en' ? 'Camera' : 'Caméra',    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="#555"/><path fill="white" d="M80 35H67l-6-9H39l-6 9H20c-4 0-8 4-8 8v35c0 4 4 8 8 8h60c4 0 8-4 8-8V43c0-4-4-8-8-8zM50 76a18 18 0 110-36 18 18 0 010 36zm0-8a10 10 0 100-20 10 10 0 000 20z"/></svg>` },
  { key: 'custom',   label: 'Mon logo',  svg: null },
];

// Render SVG to PNG via blob URL + canvas
function svgToPng(svgStr, size = 100) {
  return new Promise(resolve => {
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);
    const img  = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = c.height = size;
      c.getContext('2d').drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/png'));
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    img.src = url;
  });
}

// Build preset logo buttons with rendered PNG thumbnails
async function initPresetLogos() {
  const grid = $('presetLogosGrid');
  for (const logo of LOGOS) {
    const btn = document.createElement('button');
    btn.className = 'preset-logo-btn';
    btn.dataset.logo = logo.key;
    btn.title = logo.label;

    if (logo.svg) {
      const pngUrl = await svgToPng(logo.svg, 100);
      const imgEl = document.createElement('img');
      imgEl.src = pngUrl || '';
      imgEl.width = 32; imgEl.height = 32;
      imgEl.alt = `Logo ${logo.label}`;
      imgEl.style.borderRadius = '4px';
      btn.appendChild(imgEl);
      // Cache PNG for canvas use
      btn.dataset.pngUrl = pngUrl || '';
    } else {
      const sp = document.createElement('span');
      sp.style.fontSize = '22px';
      sp.textContent = '⊕';
      btn.appendChild(sp);
    }

    const label = document.createElement('span');
    label.textContent = logo.label;
    btn.appendChild(label);

    btn.addEventListener('click', async () => {
      if (logo.key === 'custom') { $('logoFile').click(); return; }
      $$('.preset-logo-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const pngUrl = btn.dataset.pngUrl;
      if (!pngUrl) return;
      state.logoDataURL = pngUrl;
      $('logoPreviewImg').src = pngUrl;
      $('dropContent').style.display = 'none';
      $('logoPreviewWrap').style.display = 'flex';
      if (!state.savedEcLevel) { state.savedEcLevel = $('ecLevel').value; $('ecLevel').value = 'H'; }
      showToast(t('toast_logo_selected'));
      scheduleQR();
    });

    grid.appendChild(btn);
  }
}

initPresetLogos();

// ── Custom logo upload ─────────────────────────────────────────
const logoDropZone = $('logoDropZone');
const logoFile     = $('logoFile');

// Délégation sur logoDropZone pour gérer logoPickBtn même après re-render i18n
$('logoDropZone').addEventListener('click', e => {
  if (e.target.id === 'logoPickBtn' || e.target.closest('#logoPickBtn')) {
    e.stopPropagation();
    logoFile.click();
  }
});
logoDropZone.addEventListener('click', () => { if (!state.logoDataURL) logoFile.click(); });
logoDropZone.addEventListener('dragover', e => { e.preventDefault(); logoDropZone.classList.add('drag-over'); });
logoDropZone.addEventListener('dragleave', () => logoDropZone.classList.remove('drag-over'));
logoDropZone.addEventListener('drop', e => {
  e.preventDefault(); logoDropZone.classList.remove('drag-over');
  const f = e.dataTransfer.files[0];
  if (f && f.type.startsWith('image/')) loadLogo(f);
});
logoFile.addEventListener('change', e => { if (e.target.files[0]) loadLogo(e.target.files[0]); });

function loadLogo(file) {
  const reader = new FileReader();
  reader.onload = evt => {
    state.logoDataURL = evt.target.result;
    $('logoPreviewImg').src = state.logoDataURL;
    $('dropContent').style.display = 'none';
    $('logoPreviewWrap').style.display = 'flex';
    $$('.preset-logo-btn').forEach(b => b.classList.remove('active'));
    state.savedEcLevel = $('ecLevel').value;
    $('ecLevel').value = 'H';
    showToast(t('toast_logo_added'));
    scheduleQR();
  };
  reader.readAsDataURL(file);
}

$('removeLogo').addEventListener('click', e => {
  e.stopPropagation();
  state.logoDataURL = null;
  logoFile.value = '';
  $('dropContent').style.display = 'flex';
  $('logoPreviewWrap').style.display = 'none';
  $$('.preset-logo-btn').forEach(b => b.classList.remove('active'));
  if (state.savedEcLevel) { $('ecLevel').value = state.savedEcLevel; state.savedEcLevel = null; }
  scheduleQR();
});

$('logoSize').addEventListener('input', e => {
  state.logoSize = parseInt(e.target.value);
  $('logoSizeVal').textContent = state.logoSize;
  scheduleQR();
});

// ── QR Generation ──────────────────────────────────────────────
let qrTimer;
function scheduleQR() {
  clearTimeout(qrTimer);
  qrTimer = setTimeout(generateQR, 120);
}

async function generateQR() {
  let text = buildQRContent();
  const size  = parseInt($('qrSize').value) || 300;
  const ec    = $('ecLevel').value;
  const fg    = $('fgColor').value;
  const bg    = $('bgColor').value;

  const output      = $('qrOutput');
  const placeholder = $('qrPlaceholder');
  const meta        = $('qrMeta');

  if (!text) {
    output.innerHTML = '';
    placeholder.style.display = 'flex';
    meta.style.display = 'none';
    setExportEnabled(false);
    return;
  }

  // QRCode.js uses Latin-1 byte mode — accented chars cause "code length overflow".
  // Normalize accents to ASCII equivalents before encoding.
  const safeText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  placeholder.style.display = 'none';
  output.innerHTML = '';

  try {
    // Generate base QR via library (hidden)
    const tempDiv = document.createElement('div');
    tempDiv.style.cssText = 'position:fixed;left:-9999px;top:-9999px;visibility:hidden;pointer-events:none;';
    document.body.appendChild(tempDiv);

    await new Promise(resolve => {
      new QRCode(tempDiv, {
        text: safeText, width: size, height: size,
        colorDark: fg, colorLight: bg,
        correctLevel: QRCode.CorrectLevel[ec],
      });
      setTimeout(resolve, 50);
    });

    const srcCanvas = tempDiv.querySelector('canvas');
    if (!srcCanvas) { document.body.removeChild(tempDiv); throw new Error('No canvas'); }

    // Clone src canvas before removing tempDiv
    const cloned = document.createElement('canvas');
    cloned.width = srcCanvas.width; cloned.height = srcCanvas.height;
    cloned.getContext('2d').drawImage(srcCanvas, 0, 0);
    document.body.removeChild(tempDiv);

    // Composite logo if set
    let finalCanvas = state.logoDataURL
      ? await compositeWithLogo(cloned, state.logoDataURL, state.logoSize)
      : cloned;

    // Display
    const displayCanvas = document.createElement('canvas');
    displayCanvas.width  = finalCanvas.width;
    displayCanvas.height = finalCanvas.height;
    displayCanvas.getContext('2d').drawImage(finalCanvas, 0, 0);
    output.appendChild(displayCanvas);

    // Cache
    state.currentPNG    = finalCanvas.toDataURL('image/png');
    state.currentSVGRaw = buildSVG(finalCanvas, fg, bg, safeText, size);
    state.lastText = safeText; state.lastSize = size;
    state.lastFg = fg; state.lastBg = bg; state.lastEc = ec;

    $('metaChars').textContent = `${text.length} car.`;
    $('metaSize').textContent  = `${size}×${size}px`;
    $('metaLevel').textContent = `EC: ${ec}`;
    meta.style.display = 'flex';
    setExportEnabled(true);

  } catch(err) {
    output.innerHTML = `<div style="color:var(--danger);font-family:var(--font-mono);font-size:12px;padding:20px;text-align:center;">Erreur : ${err.message}</div>`;
    setExportEnabled(false);
  }
}

// ── roundRect helper (used for logo background) ────────────────
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function compositeWithLogo(srcCanvas, logoURL, logoPercent) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = srcCanvas.width; canvas.height = srcCanvas.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(srcCanvas, 0, 0);

      const logoW = Math.round(srcCanvas.width * logoPercent / 100);
      const logoH = Math.round(logoW * img.naturalHeight / img.naturalWidth);
      const x = (canvas.width  - logoW) / 2;
      const y = (canvas.height - logoH) / 2;
      const pad = Math.round(logoW * 0.12);
      const r   = pad * 1.5;

      // White circular/rounded background using our own roundRect helper
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      roundRect(ctx, x - pad, y - pad, logoW + pad * 2, logoH + pad * 2, r);
      ctx.fill();

      ctx.drawImage(img, x, y, logoW, logoH);
      resolve(canvas);
    };
    img.onerror = reject;
    img.src = logoURL;
  });
}

function buildSVG(canvas, fg, bg, text, size) {
  const dataURL = canvas.toDataURL('image/png');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="${bg}"/><image href="${dataURL}" width="${size}" height="${size}"/></svg>`;
}

function setExportEnabled(enabled) {
  ['dlPNG','dlSVG','dlPDF','saveHistory'].forEach(id => { $(id).disabled = !enabled; });
}

// ── Downloads ──────────────────────────────────────────────────
$('dlPNG').addEventListener('click', () => {
  if (!state.currentPNG) return;
  downloadURL(state.currentPNG, `qrcg-${slugify(state.lastText)}.png`);
  showToast(t('toast_png'));
});

$('dlSVG').addEventListener('click', () => {
  if (!state.currentSVGRaw) return;
  const blob = new Blob([state.currentSVGRaw], { type: 'image/svg+xml' });
  downloadURL(URL.createObjectURL(blob), `qrcg-${slugify(state.lastText)}.svg`);
  showToast(t('toast_svg'));
});

$('dlPDF').addEventListener('click', async () => {
  if (!state.currentPNG) return;
  try {
    const { jsPDF } = window.jspdf;
    const mmSize = Math.min(state.lastSize / 3.7795, 180);
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const x = (pageW - mmSize) / 2;
    const y = (pageH - mmSize) / 2 - 15;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(16);
    doc.text('qrcodegenerator.fr', pageW / 2, 20, { align: 'center' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(120);
    doc.text(($('qrLabel').value || state.lastText).substring(0, 80), pageW / 2, 27, { align: 'center' });
    doc.addImage(state.currentPNG, 'PNG', x, y, mmSize, mmSize);
    doc.setFontSize(8); doc.setTextColor(160);
    doc.text('qrcodegenerator.fr', pageW / 2, pageH - 12, { align: 'center' });
    doc.save(`qrcg-${slugify(state.lastText)}.pdf`);
    showToast(t('toast_pdf'));
  } catch(e) { showToast('⚠ Erreur PDF'); }
});

// ── History ────────────────────────────────────────────────────
const HISTORY_KEY = 'qrcg-history';
function getHistory() { try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch { return []; } }

$('saveHistory').addEventListener('click', () => {
  if (!state.currentPNG) return;
  const label = $('qrLabel').value || state.lastText;
  const hist  = getHistory();
  hist.unshift({ id: Date.now(), label, content: state.lastText, png: state.currentPNG,
    date: new Date().toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-GB', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }),
    fg: state.lastFg, bg: state.lastBg });
  if (hist.length > 50) hist.length = 50;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(hist));
  showToast(t('toast_saved'));
});

function renderHistory() {
  const hist  = getHistory();
  const grid  = $('historyGrid');
  const empty = $('historyEmpty');
  $('historyCount').textContent = t('hist_entries')(hist.length);
  if (!hist.length) { grid.innerHTML = ''; grid.appendChild(empty); return; }
  grid.innerHTML = '';
  hist.forEach((entry, idx) => {
    const card = document.createElement('div');
    card.className = 'history-card';
    card.style.animationDelay = `${idx * 30}ms`;
    card.innerHTML = `
      <div class="history-card-img"><img src="${entry.png}" alt="${entry.label}" style="max-width:160px;max-height:160px;" /></div>
      <div class="history-card-body">
        <div class="history-card-label">${entry.label}</div>
        <div class="history-card-content">${entry.content.substring(0, 60)}</div>
        <div class="history-card-date">${entry.date}</div>
        <div class="history-card-actions">
          <button class="hist-action-btn" data-action="download" data-id="${entry.id}">${t('hist_dl')}</button>
          <button class="hist-action-btn" data-action="load" data-id="${entry.id}">${t('hist_load')}</button>
          <button class="hist-action-btn" data-action="pdf" data-id="${entry.id}">${t('hist_pdf')}</button>
          <button class="hist-action-btn delete" data-action="delete" data-id="${entry.id}">${t('hist_delete')}</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  grid.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = parseInt(btn.dataset.id);
    const entry = getHistory().find(h => h.id === id);
    if (!entry) return;
    if (btn.dataset.action === 'download') { downloadURL(entry.png, `qrcg-${slugify(entry.content)}.png`); showToast(t('toast_png')); }
    else if (btn.dataset.action === 'load') {
      $$('.nav-tab')[0].click(); $$('.type-btn')[0].click();
      $('urlInput').value = entry.content; $('qrLabel').value = entry.label;
      $('fgColor').value = entry.fg || '#000000'; $('bgColor').value = entry.bg || '#ffffff';
      $('fgColorVal').textContent = entry.fg || '#000000'; $('bgColorVal').textContent = entry.bg || '#ffffff';
      scheduleQR(); showToast(t('toast_loaded'));
    }
    else if (btn.dataset.action === 'pdf') { exportHistoryPDF(entry); }
    else if (btn.dataset.action === 'delete') {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(getHistory().filter(h => h.id !== id)));
      renderHistory();

// ── Guide CTA button ───────────────────────────────────────────
const guideCTABtn = document.getElementById('guideCTA');
if (guideCTABtn) {
  guideCTABtn.addEventListener('click', () => {
    document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector('.nav-tab[data-tab="generator"]').classList.add('active');
    document.getElementById('tab-generator').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
} showToast(t('toast_deleted'));
    }
  });
}

async function exportHistoryPDF(entry) {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    doc.setFont('helvetica', 'bold'); doc.setFontSize(16);
    doc.text('qrcodegenerator.fr', pageW / 2, 20, { align: 'center' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(120);
    doc.text(entry.label.substring(0, 80), pageW / 2, 27, { align: 'center' });
    doc.addImage(entry.png, 'PNG', (pageW - 100) / 2, 40, 100, 100);
    doc.setFontSize(8); doc.setTextColor(160);
    doc.text('qrcodegenerator.fr', pageW / 2, pageH - 12, { align: 'center' });
    doc.save(`qrcg-${slugify(entry.content)}.pdf`);
    showToast(t('toast_pdf'));
  } catch(e) { showToast('⚠ Erreur PDF'); }
}

$('clearHistory').addEventListener('click', () => {
  if (!confirm(t('confirm_clear'))) return;
  localStorage.removeItem(HISTORY_KEY); renderHistory();

// ── Guide CTA button ───────────────────────────────────────────
const guideCTABtn = document.getElementById('guideCTA');
if (guideCTABtn) {
  guideCTABtn.addEventListener('click', () => {
    document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector('.nav-tab[data-tab="generator"]').classList.add('active');
    document.getElementById('tab-generator').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
} showToast(t('toast_cleared'));
});

// ── Batch ──────────────────────────────────────────────────────
$('generateBatch').addEventListener('click', generateBatch);

async function generateBatch() {
  const raw = $('batchInput').value.trim();
  if (!raw) { showToast(t('toast_batch_empty')); return; }
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean).slice(0, 10);
  const fg = $('batchFg').value, bg = $('batchBg').value;
  const size = parseInt($('batchSize').value) || 200;
  const grid = $('batchGrid');
  grid.innerHTML = ''; state.batchItems = [];
  $('batchCountNum').textContent = lines.length;

  for (let i = 0; i < lines.length; i++) {
    const text = lines[i];
    const item = document.createElement('div');
    item.className = 'batch-item'; item.style.animationDelay = `${i * 60}ms`;
    const canvas = await generateBatchQR(text, size, fg, bg);
    const png = canvas.toDataURL('image/png');
    state.batchItems.push({ text, png, canvas });
    const label = document.createElement('div'); label.className = 'batch-item-label'; label.textContent = text;
    const dlBtn = document.createElement('button'); dlBtn.className = 'batch-dl-btn'; dlBtn.dataset.idx = i; dlBtn.textContent = '↓ PNG';
    item.appendChild(canvas); item.appendChild(label); item.appendChild(dlBtn); grid.appendChild(item);
  }

  grid.addEventListener('click', e => {
    const btn = e.target.closest('.batch-dl-btn');
    if (!btn) return;
    const idx = parseInt(btn.dataset.idx);
    const item = state.batchItems[idx];
    if (item) { downloadURL(item.png, `qrcg-batch-${idx+1}.png`); showToast(`✓ QR #${idx+1} ${t('toast_png').replace('✓ ','')}`); }
  });
  showToast(`✓ ${lines.length} QR codes`);
}

function generateBatchQR(text, size, fg, bg) {
  return new Promise((resolve, reject) => {
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed;left:-9999px;top:-9999px;visibility:hidden;pointer-events:none;';
    document.body.appendChild(div);
    try {
      new QRCode(div, { text, width: size, height: size, colorDark: fg, colorLight: bg, correctLevel: QRCode.CorrectLevel.M });
      setTimeout(() => {
        const canvas = div.querySelector('canvas');
        if (!canvas) { document.body.removeChild(div); reject(new Error('No canvas')); return; }
        const out = document.createElement('canvas');
        out.width = canvas.width; out.height = canvas.height;
        out.getContext('2d').drawImage(canvas, 0, 0);
        document.body.removeChild(div); resolve(out);
      }, 60);
    } catch(e) { document.body.removeChild(div); reject(e); }
  });
}

$('downloadAllPNG').addEventListener('click', async () => {
  if (!state.batchItems.length) { showToast(t('toast_generate_first')); return; }
  for (let i = 0; i < state.batchItems.length; i++) { await sleep(100); downloadURL(state.batchItems[i].png, `qrcg-batch-${i+1}.png`); }
  showToast(`✓ ${state.batchItems.length} ${t('toast_png').replace('✓ ','')}`);
});

$('downloadBatchPDF').addEventListener('click', async () => {
  if (!state.batchItems.length) { showToast(t('toast_generate_first')); return; }
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth(), pageH = doc.internal.pageSize.getHeight();
    const cols = 2, rows = 3, perPage = cols * rows, margin = 15;
    const cellW = (pageW - margin * 2) / cols, cellH = (pageH - margin * 2 - 20) / rows;
    const qrW = Math.min(cellW - 10, cellH - 14);
    state.batchItems.forEach((item, i) => {
      if (i > 0 && i % perPage === 0) doc.addPage();
      const col = i % cols, row = Math.floor((i % perPage) / cols);
      const x = margin + col * cellW + (cellW - qrW) / 2, y = margin + 10 + row * cellH + 5;
      if (i % perPage === 0) { doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(30); doc.text('qrcodegenerator.fr — Batch', pageW/2, 10, {align:'center'}); }
      doc.addImage(item.png, 'PNG', x, y, qrW, qrW);
      doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(100);
      doc.text(item.text.substring(0, 40), x + qrW/2, y + qrW + 4, {align:'center'});
    });
    doc.save('qrcg-batch.pdf'); showToast('✓ PDF batch téléchargé');
  } catch(e) { showToast('⚠ Erreur PDF'); }
});

// ── Utils ──────────────────────────────────────────────────────
function downloadURL(url, filename) { const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); }
function slugify(str) { return (str||'qrcode').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').substring(0,40)||'qrcode'; }
function formatBytes(b) { if (b < 1024) return b+' o'; if (b < 1048576) return (b/1024).toFixed(1)+' Ko'; return (b/1048576).toFixed(1)+' Mo'; }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Init ───────────────────────────────────────────────────────
renderHistory();

// ── Guide CTA button ───────────────────────────────────────────
const guideCTABtn = document.getElementById('guideCTA');
if (guideCTABtn) {
  guideCTABtn.addEventListener('click', () => {
    document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector('.nav-tab[data-tab="generator"]').classList.add('active');
    document.getElementById('tab-generator').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Contact form ────────────────────────────────────────────────
const contactMsg = $('contactMessage');
if (contactMsg) {
  contactMsg.addEventListener('input', () => {
    $('charCount').textContent = `${contactMsg.value.length} / 1000`;
    if (contactMsg.value.length > 1000) contactMsg.value = contactMsg.value.slice(0, 1000);
  });
}

const contactForm = $('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = $('contactSubmit');
    const message = $('contactMessage').value.trim();
    if (!message) { $('contactMessage').focus(); showToast(t('toast_write_msg')); return; }

    btn.disabled = true;
    btn.textContent = t('sending');
    $('contactSuccess').style.display = 'none';
    $('contactError').style.display   = 'none';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' },
      });
      if (res.ok) {
        $('contactSuccess').style.display = 'flex';
        contactForm.reset();
        $('charCount').textContent = '0 / 1000';
        showToast(t('toast_sent'));
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.errors?.map(e => e.message).join(', ') || `Erreur ${res.status}`);
      }
    } catch(err) {
      $('contactErrorMsg').textContent = err.message || 'Erreur réseau. Réessayez.';
      $('contactError').style.display = 'flex';
    } finally {
      btn.disabled = false;
      btn.textContent = t('contact_send');
    }
  });
}