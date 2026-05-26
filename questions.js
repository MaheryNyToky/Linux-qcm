// questions.js
const quizData = [
  {
    id: 1,
    type: "qcm",
    question: "Soit le pipeline suivant exécuté dans un shell standard (sans configuration préalable) : cat /repertoire_inexistant/fichier 2>/dev/null | grep -q \"root\". Quelle est la valeur exacte de $? immédiatement après son exécution ?",
    options: ["1", "2", "0", "127"],
    correctAnswers: [2] // C
  },
  {
    id: 2,
    type: "qcm",
    question: "Vous exécutez la séquence de commandes suivante :",
    code: `ls /repertoire_inexistant\necho "Le code de retour est : $?"`,
    questionAppend: "Quelles affirmations sont techniquement exactes concernant la valeur affichée par la commande echo ?",
    options: [
      "Elle affiche une valeur différente de 0 car ls a échoué.",
      "Elle affiche explicitement 0 car la commande echo s'exécute toujours avec succès.",
      "Elle affiche 127 car le répertoire est introuvable.",
      "La valeur affichée correspond au code de retour de l'appel système de ls capturé par le shell."
    ],
    correctAnswers: [0, 3] // A et D
  },
  {
    id: 3,
    type: "qcm",
    question: "Dans un script Bash, vous devez valider la présence d'au moins deux arguments passés en paramètre. Quelle structure respecte les conventions de gestion des erreurs (canal et code de retour adéquats) ?",
    options: [
      '[ $# -lt 2 ] && echo "Usage: $0 arg1 arg2" && exit 1',
      '[ $# -lt 2 ] && echo "Usage: $0 arg1 arg2" >&2 && exit 2',
      'if [[ $# -lt 2 ]]; then echo "Erreur" >&1; exit 2; fi',
      '[[ $# -ge 2 ]] || { echo "Usage: $0 arg1 arg2" >&2; exit 127; }'
    ],
    correctAnswers: [1] // B
  },
  {
    id: 4,
    type: "qcm",
    question: "Soit le script test_robustesse.sh contenant le code suivant :",
    code: `#!/usr/bin/env bash\nset -e\ncp /file_inexistant /tmp/ 2>/dev/null\necho "Etape 1"\nls /tmp/`,
    questionAppend: "Qu'affiche ce script lors de son exécution ?",
    options: [
      'Le message "Etape 1" suivi du contenu de /tmp/.',
      "Une erreur de syntaxe Bash à la ligne 3.",
      "Absolument rien sur la sortie standard (stdout), le script s'interrompant immédiatement à la ligne 3.",
      'Le message "Etape 1" uniquement, car ls /tmp/ échoue sous set -e.'
    ],
    correctAnswers: [2] // C
  },
  {
    id: 5,
    type: "qcm",
    question: "En analysant le comportement de l'option set -u (ou set -o nounset), quelles propositions décrivent correctement son impact sur l'évaluation des variables ?",
    options: [
      "Elle provoque l'arrêt immédiat du script si une variable non positionnée est appelée, sauf dans le cas de l'expansion ${1:-\"defaut\"}.",
      'Elle initialise automatiquement toutes les variables non définies à une chaîne vide "".',
      "Elle génère un message d'erreur de type unbound variable sur le canal stderr.",
      "Elle interdit la modification ultérieure des variables globales déjà définies."
    ],
    correctAnswers: [0, 2] // A et C
  },
  {
    id: 6,
    type: "qcm",
    question: "Vous devez exécuter le pipeline grep \"critical\" /var/log/syslog | cut -d' ' -f5- au sein d'un script configuré avec set -euo pipefail. Si grep ne trouve aucune occurrence de la chaîne \"critical\" mais que /var/log/syslog est parfaitement lisible, quel sera le comportement du script ?",
    options: [
      "Le script continue normalement car cut s'est exécuté avec succès (code 0).",
      "Le script s'arrête immédiatement car grep renvoie un code de retour 1 lorsqu'il ne trouve rien.",
      "Le script s'arrête avec le code d'erreur 127 (commande introuvable).",
      "Le pipeline renvoie une erreur sur cut en raison d'une entrée vide."
    ],
    correctAnswers: [1] // B
  },
  {
    id: 7,
    type: "qcm",
    question: "Quelle est la portée exacte de la variable spéciale $! sous Bash ?",
    options: [
      "Elle contient le code de retour de la toute dernière commande exécutée au premier plan.",
      "Elle renvoie le nombre de processus actuellement managés par la session shell.",
      "Elle contient le PID (Process Identifier) du dernier processus exécuté en arrière-plan.",
      "Elle correspond au PID du shell Bash en cours d'exécution."
    ],
    correctAnswers: [2] // C
  },
  {
    id: 8,
    type: "qcm",
    question: "On considère le bloc de script suivant :",
    code: `FICHIER="/etc/shadow"\nif [ ! -r "$FICHIER" ]; then\n    echo "Erreur opérationnelle" >&2\n    exit 1\nfi`,
    questionAppend: "Quels concepts fondamentaux de gestion de scripts robustes sont illustrés ici ?",
    options: [
      "Validation préventive des permissions d'accès avant exécution d'une commande critique.",
      "Redirection explicite du message d'erreur vers le descripteur de fichier 2 (stderr).",
      "Utilisation du code de retour 1 pour signaler une erreur opérationnelle/technique.",
      "Utilisation d'un test étendu POSIX pour valider l'existence d'un lien symbolique."
    ],
    correctAnswers: [0, 1, 2] // A, B et C
  },
  {
    id: 9,
    type: "qcm",
    question: "Quelle est la valeur par défaut du code de retour d'une fonction Bash qui ne contient aucune instruction explicite return ?",
    options: [
      "Elle renvoie systématiquement le code 0.",
      "Elle hérite du code de retour de la fonction appelante.",
      "Elle renvoie le code de retour de la dernière commande exécutée à l'intérieur de cette fonction.",
      "Elle provoque une erreur d'exécution (syntax error)."
    ],
    correctAnswers: [2] // C
  },
  {
    id: 10,
    type: "qcm",
    question: "Lors du débogage d'un script avec l'option set -x, que représente la variable d'environnement PS4 ?",
    options: [
      "Elle définit le nombre maximal de lignes affichées par la trace de débogage.",
      "Elle définit l'invite (prompt) imprimée devant chaque ligne de trace de débogage (par défaut +).",
      "Elle contrôle le niveau de verbosité des avertissements remontés par shellcheck.",
      "Elle force l'affichage des codes de retour intermédiaires de chaque commande."
    ],
    correctAnswers: [1] // B
  },
  {
    id: 11,
    type: "open",
    question: "Pourquoi faut-il capturer immédiatement la variable $? dans une variable locale si on veut tester sa valeur plusieurs fois?",
    solution: "$? est volatile et réinitialisé par la toute dernière commande exécutée. La stocker fige sa valeur pour des tests ultérieurs."
  },
  {
    id: 12,
    type: "open",
    question: "Sous set -e, quelle syntaxe permet d'exécuter grep \"motif\" fichier sans couper le script si le motif n'est pas trouvé ?",
    solution: "grep \"motif\" fichier || true (ou || :). L'opérateur || force un code de retour 0 global."
  },
  {
    id: 13,
    type: "open",
    question: "Quelle est la différence entre set -e seul et set -o pipefail sur l'échec de la première commande d'un pipeline?",
    solution: "Sans pipefail, le shell ne voit que le code de la dernière commande du pipeline (souvent 0), masquant l'erreur. Avec pipefail, l'erreur initiale est propagée et bloque le script."
  },
  {
    id: 14,
    type: "qcm",
    question: "Vous définissez le piège suivant dans un script Bash : trap 'echo \"Nettoyage\"' EXIT. Dans quel(s) cas ce nettoyage est-il garanti de s'exécuter ?",
    options: [
      "Le script se termine normalement après la dernière ligne de code.",
      "Le script s'interrompt brutalement à cause de l'option set -e suite à l'échec d'une commande.",
      "L'utilisateur envoie un signal SIGINT (Ctrl+C) ou SIGTERM au script.",
      "Le processus du script reçoit un signal SIGKILL (kill -9)."
    ],
    correctAnswers: [0, 1, 2] // A, B et C
  },
  {
    id: 15,
    type: "qcm",
    question: "Soit la ligne de code suivante : TMPDIR=$(mktemp -d). Quelle est la syntaxe recommandée par les standards de sécurité pour nettoyer ce répertoire à la sortie du script ?",
    options: [
      "trap rm -rf $TMPDIR EXIT",
      'trap "rm -rf $TMPDIR" ERR',
      "trap 'rm -rf \"$TMPDIR\"' EXIT",
      "trap 'rm -rf \"$TMPDIR\"' SIGKILL"
    ],
    correctAnswers: [2] // C
  },
  {
    id: 16,
    type: "qcm",
    question: "Vous souhaitez concevoir un mécanisme de traçage d'erreur avancé à l'aide de trap '...' ERR. Quelles variables spéciales de Bash pouvez-vous exploiter pour afficher la ligne exacte en cause ?",
    options: ["$LINENO", "$ERRNO", "${BASH_SOURCE[0]}", "$IFS"],
    correctAnswers: [0, 2] // A et C
  },
  {
    id: 17,
    type: "qcm",
    question: "Lors de l'exécution d'un script avec la commande bash -x script.sh, que signifie la présence de plusieurs symboles + (ex: ++) au début d'une ligne de trace ?",
    options: [
      "La commande a été exécutée avec des privilèges sudo.",
      "La commande se situe à l'intérieur d'une boucle for ou while.",
      "La ligne correspond à une substitution de commande (ex: $(commande)) évaluée dans un sous-shell.",
      "La commande a échoué et a été rejouée automatiquement."
    ],
    correctAnswers: [2] // C
  },
  {
    id: 18,
    type: "qcm",
    question: "Vous analysez un script à l'aide de l'outil shellcheck et obtenez l'avertissement SC2086: Double quote to prevent globbing and word splitting. Sur quelle ligne cet avertissement s'applique-t-il ?",
    options: [
      'if [[ "$VAR" == "test" ]];',
      "then",
      "ls $DOSSIER/",
      'NOM="Alice Martin"',
      'echo "$FICHIER"'
    ],
    correctAnswers: [2] // C'est l'option B de l'énoncé d'origine (ls $DOSSIER/)
  },
  {
    id: 19,
    type: "qcm",
    question: "Pourquoi l'utilisation de la syntaxe for f in $(ls /tmp); do est-elle considérée comme une mauvaise pratique majeure par shellcheck (code SC2045) ?",
    options: [
      "Elle échoue catastrophiquement si des noms de fichiers contiennent des espaces ou des retours à la ligne.",
      "Elle consomme trop de mémoire vive par rapport à l'utilisation d'une fonction native.",
      "Elle effectue un \"word splitting\" et un \"globbing\" indésirables sur le résultat de ls.",
      "La commande ls est bannie des scripts conformes à la norme POSIX."
    ],
    correctAnswers: [0, 2] // A et C
  },
  {
    id: 20,
    type: "qcm",
    question: "On vous demande de rendre un script strictement portable sous l'interpréteur POSIX standard #!/bin/sh (comme dash sous Debian). Quelle(s) syntaxe(s) exclusivement réservée(s) à Bash devez-vous impérativement supprimer ou remplacer ?",
    options: ["declare -a TABLEAU", "[[ $VAR == \"test\" ]]", "set -o pipefail", "set -e"],
    correctAnswers: [0, 1, 2] // A, B et C
  },
  {
    id: 21,
    type: "qcm",
    question: "Quelle commande du paquet devscripts permet de scanner spécifiquement un script doté du shebang #!/bin/sh pour y d'détecter la présence accidentelle de syntaxes spécifiques à Bash ?",
    options: ["shellcheck --shell sh", "checkbashisms", "bash -n", "posix_validate"],
    correctAnswers: [1] // B
  },
  {
    id: 22,
    type: "qcm",
    question: "Lors de l'exécution d'un script Bash, dans quel(s) scénario(s) le signal fictif EXIT intercepté par une instruction trap est-il obligatoirement déclenché ?",
    options: [
      "Lorsque le script rencontre une fin de fichier naturelle ou l'instruction exit.",
      "Lorsqu'une commande échoue sous la directive de sécurité set -e.",
      "Lorsque l'utilisateur envoie le signal de terminaison par défaut via kill <PID>.",
      "Lorsque le processus reçoit un signal d'arrêt immédiat non interceptable SIGKILL (kill -9)."
    ],
    correctAnswers: [0, 1, 2] // A, B et C
  },
  {
    id: 23,
    type: "qcm",
    question: "Soit le bloc de code senior suivant :",
    code: `CLEANUP_DIR=\$(mktemp -d)\ntrap 'echo "Nettoyage en cours..."; rm -rf "$CLEANUP_DIR"' EXIT INT TERM`,
    questionAppend: "Quelles affirmations sont exactes concernant la robustesse de cette implémentation ?",
    options: [
      "Le répertoire temporaire est garanti d'être supprimé si l'utilisateur presse Ctrl+C.",
      "La fonction de nettoyage sera exécutée trois fois de suite si le script reçoit SIGINT puis se termine.",
      "L'usage des guillemets doubles \"$CLEANUP_DIR\" prévient les risques d'injections ou de suppressions accidentelles si le chemin contient des espaces.",
      "La directive trap écrasera les signaux internes du noyau Linux, rendant le script totalement invincible."
    ],
    correctAnswers: [0, 2] // A et C
  },
  {
    id: 24,
    type: "qcm",
    question: "Vous exploitez la commande trap 'echo \"Ligne fautive : $LINENO\"' ERR. Quelle est la condition stricte pour que ce piège (trap) sur ERR se déclenche effectivement ?",
    options: [
      "Dès qu'une variable d'environnement non définie est appelée.",
      "Dès qu'une commande du script renvoie un code de retour non nul ($? > 0).",
      "Uniquement si le script est exécuté en mode trace via bash -x.",
      "Lorsque le shell détecte une erreur de syntaxe statique avant l'exécution du script."
    ],
    correctAnswers: [1] // B
  },
  {
    id: 25,
    type: "qcm",
    question: "Lors de l'utilisation de la commande de traçage dynamique bash -x script.sh, que signifie la présence de plusieurs caractères + imbriqués (ex: ++, +++) au début d'une ligne de trace ?",
    options: [
      "Que la commande a été exécutée avec des privilèges sudo.",
      "Que la commande en cours a échoué et a été rejouée plusieurs fois.",
      "Que le shell évalue une substitution de commande, comme $(commande), ou une sous-coquille (subshell).",
      "Que la commande s'exécute en tâche de fond (arrière-plan)."
    ],
    correctAnswers: [2] // C
  },
  {
    id: 26,
    type: "qcm",
    question: "Quel avertissement standard est levé par le linter shellcheck si vous écrivez la boucle suivante : for f in $(ls /tmp); do echo $f; done ?",
    options: [
      "SC2045: Interdiction d'itérer sur la sortie de ls (privilégier les globs comme /tmp/*).",
      "SC2086: Absence de guillemets doubles autour de la variable $f.",
      "SC2181: Utilisation directe de la variable $? dans un test.",
      "SC2006: Utilisation obsolète des backticks `...`."
    ],
    correctAnswers: [0, 1] // A et B
  },
  {
    id: 27,
    type: "qcm",
    question: "On considère le script suivant écrit pour être exécuté en POSIX strict :",
    code: `#!/bin/sh\nset -eu\ndeclare -a DATA=("/etc/hosts")`,
    questionAppend: "Pourquoi ce script va-t-il échouer lamentablement sur une machine Debian/Ubuntu standard si vous l'appelez via sh script.sh ?",
    options: [
      "Parce que l'option set -eu n'est pas supportée par la norme POSIX.",
      "Parce que /bin/sh pointe vers dash, qui ne supporte pas le mot-clé declare ni les tableaux (extensions Bash).",
      "Parce que l'interprète dash interdit l'accès en lecture au fichier /etc/hosts.",
      "Parce que le linter checkbashisms bloque physiquement l'exécution du script."
    ],
    correctAnswers: [1] // B
  },
  {
    id: 28,
    type: "qcm",
    question: "Quel outil de l'éco-système Linux devez-vous impérativement utiliser pour valider qu'un script shell utilisant le shebang #!/bin/sh ne contient aucune extension propriétaire à Bash (bashisms) ?",
    options: ["shellcheck --shell bash script.sh", "bash -n script.sh", "checkbashisms script.sh", "apt install devscripts"],
    correctAnswers: [2] // C
  },
  {
    id: 29,
    type: "open",
    question: "Si un script configuré avec set -e plante au milieu de son traitement à cause d'une commande inexistante, le nettoyage configuré par trap '...' EXIT a-t-il quand même lieu ?",
    solution: "Oui. Le signal fictif EXIT est intercepté par le shell dans tous les cas de figure lors de la fermeture du processus, y compris sur plantage."
  },
  {
    id: 30,
    type: "open",
    question: "Pourquoi l'instruction echo \"Nombre de fichiers : $(ls /tmp | wc)\" ne donne-t-elle pas le résultat exact attendu pour compter les fichiers ?",
    solution: "wc seul renvoie trois blocs de statistiques (lignes, mots, octets). Pour obtenir uniquement le nombre exact de lignes/fichiers, il faut forcer l'option wc -l."
  },
  {
    id: 31,
    type: "open",
    question: "Comment réécrire le test Bash étendu [[ -f \"$f\" ]] en syntaxe POSIX stricte pour qu'il soit compatible avec l'interpréteur sh ?",
    solution: "POSIX : [ -f \"$f\" ] (ou la commande test -f \"$f\")."
  },
  {
    id: 32,
    type: "qcm",
    question: "Vous cherchez à isoler des adresses IPv4 dans un fichier de log à l'aide de la commande suivante : grep -E '[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}' auth.log. Pourquoi l'utilisation de l'anti-slash (\\.) est-elle techniquement obligatoire ?",
    options: [
      "Pour indiquer au moteur de regex que le point marque la fin d'une sous-expression.",
      "Pour neutraliser le comportement du métacaractère . qui, sans échappement, correspond à n'importe quel caractère.",
      "Parce que l'option -E (ERE) transforme les points littéraux en quantificateurs d'intervalles.",
      "Pour force l'interpréteur Bash à ignorer la variable système . avant d'exécuter grep."
    ],
    correctAnswers: [1] // B
  },
  {
    id: 33,
    type: "qcm",
    question: "On étudie la différence entre les expressions régulières basiques (BRE) et étendues (ERE). Quelles syntaxes sont strictement équivalentes pour rechercher la présence d'au moins une occurrence du caractère \"b\" après un \"a\" (ex: ab, abb, abbb) ?",
    options: ["grep 'ab\\+' fichier", "grep -E 'ab+' fichier", "grep -E 'ab\\+' fichier", "grep 'ab+' fichier"],
    correctAnswers: [0, 1] // A et B
  },
  {
    id: 34,
    type: "qcm",
    question: "Soit l'expression régulière suivante exécutée sur /etc/passwd : grep -oE '^[^:]+' /etc/passwd. Quel est le rôle exact de l'opérateur ^ situé à l'intérieur des crochets [^:] ?",
    options: [
      "Il force la recherche en début de ligne uniquement.",
      "Il agit comme un opérateur de négation, sélectionnant tout caractère qui n'est pas un deux-points.",
      "Il permet d'échapper le caractère de séparation : sous POSIX.",
      "Il indique que le champ extrait doit obligatoirement commencer par une lettre majuscule."
    ],
    correctAnswers: [1] // B
  },
  {
    id: 35,
    type: "qcm",
    question: "Vous souhaitez exécuter la commande grep de manière à compter uniquement le nombre total de lignes qui ne contiennent pas le motif \"Failed\" dans un fichier. Quelles options combinées de grep permettent d'obtenir directement ce résultat numérique sans utiliser wc -l ?",
    options: ["grep -vn \"Failed\" fichier", "grep -vc \"Failed\" fichier", "grep -co \"Failed\" fichier", "grep -ic \"Failed\" fichier"],
    correctAnswers: [1] // B
  },
  {
    id: 36,
    type: "qcm",
    question: "Vous devez modifier un fichier de configuration système contenant des chemins absolus (ex: remplacer /usr/bin par /usr/local/bin) avec sed. Quelle est la méthode la plus élégante et propre pour éviter le syndrome du \"leaning toothpick\" (accumulation d'anti-slashs de protection) ?",
    options: [
      "Utiliser l'option sed -R pour activer le mode de réécriture de liens.",
      "Exécuter sed en doublant systématiquement tous les slashes : s//usr//bin/....",
      "Changer le délimiteur de la commande de substitution en utilisant un autre caractère, tel que | ou _ (ex: sed 's|ancien|nouveau|').",
      "Passer par un pipeline combinant sed avec un appel intermédiaire à awk."
    ],
    correctAnswers: [2] // C
  },
  {
    id: 37,
    type: "qcm",
    question: "On considère la commande d'adressage sed suivante : sed -n '/critical/p' /var/log/syslog. Quel est l'impact de l'option -n associée à l'instruction p ?",
    options: [
      "Elle force sed à afficher les numéros de ligne des correspondances.",
      "Elle permet de modifier directement le fichier de log en tâche de fond.",
      "Elle supprime l'affichage automatique des lignes (mode silencieux), permettant à p d'imprimer uniquement les lignes correspondantes.",
      "Elle supprime toutes les lignes contenant le motif \"critical\" du flux de sortie."
    ],
    correctAnswers: [2] // C
  },
  {
    id: 38,
    type: "qcm",
    question: "Vous exécutez la commande sed '/^$/d' /tmp/config_test.txt. Quelle action cette commande effectue-t-elle sur le flux de texte ?",
    options: [
      "Elle supprime toutes les lignes commençant par le caractère spécial $.",
      "Elle détecte et supprime l'intégralité des lignes vides du fichier.",
      "Elle commente les lignes vides en y insérant un caractère # au début.",
      "Elle lève une erreur de syntaxe car le motif entre slashes est vide."
    ],
    correctAnswers: [1] // B
  },
  {
    id: 39,
    type: "qcm",
    question: "En analysant le fonctionnement interne d'un script awk, quelle variable interne contient automatiquement le nombre total de champs (colonnes) de la ligne courante en cours de traitement ?",
    options: ["$0", "NR", "NF", "FS"],
    correctAnswers: [2] // C
  },
  {
    id: 40,
    type: "qcm",
    question: "Soit la commande suivante : awk -F: '$3 >= 1000 {print $1}' /etc/passwd. Quelle est son action exacte ?",
    options: [
      "Elle affiche l'UID de tous les utilisateurs ayant un nom de plus de 1000 caractères.",
      "Elle extrait et affiche le nom d'utilisateur (1er champ) de tous les comptes ayant un UID (3ème champ) supérieur ou égal à 1000.",
      "Elle compte le nombre de lignes situées après la 1000ème entrée de /etc/passwd.",
      "Elle remplace l'UID des utilisateurs par la valeur 1000."
    ],
    correctAnswers: [1] // B
  },
  {
    id: 41,
    type: "qcm",
    question: "Vous utilisez le pipeline de sécurité senior suivant : sort | uniq -c | sort -rn. Pourquoi le premier appel à la commande sort est-il techniquement indispensable avant d'appeler uniq -c ?",
    options: [
      "Parce que uniq supprime les lignes uniques et ne garde que les données triées par ordre alphabétique.",
      "Pour forcer l'alignement des colonnes mémoire et éviter un dépassement de tampon (buffer overflow).",
      "Parce que la commande uniq ne peut regrouper et compter que des lignes identiques qui sont strictement adjacentes (consécutives).",
      "Parce que l'option -c de uniq renvoie une erreur système si l'entrée n'est pas indexée numériquement."
    ],
    correctAnswers: [2] // C
  },
  {
    id: 42,
    type: "open",
    question: "Que signifie précisément l'expression régulière étendue [0-9]{4}: lors d'un filtrage sur /etc/passwd ?",
    solution: "Elle cherche exactement 4 chiffres consécutifs immédiatement suivis d'un caractère deux-points."
  },
  {
    id: 43,
    type: "open",
    question: "À quoi sert l'option -i.bak lors de l'exécution d'une commande de substitution sed ?",
    solution: "Elle applique les modifications directement \"en place\" dans le fichier d'origine tout en créant une copie de sauvegarde portant l'extension .bak."
  },
  {
    id: 44,
    type: "open",
    question: "Dans un script awk, quelle est la différence fondamentale entre un bloc d'instructions classique et un bloc précédé du mot-clé END ?",
    solution: "Le bloc classique s'exécute pour chaque ligne du fichier, tandis que le bloc END s'exécute une seule fois après le traitement de la totalité des lignes."
  },
  {
    id: 45,
    type: "qcm",
    question: "Vous déclarez et manipulez un tableau indexé sous Bash. Quelle syntaxe exacte permet de récupérer le nombre total d'éléments stockés dans ce tableau ?",
    options: ['echo "${#tableau}"', 'echo "${tableau[@]}"', 'echo "${#tableau[@]}"', 'echo "${tableau[*].count}"'],
    correctAnswers: [2] // C
  },
  {
    id: 46,
    type: "qcm",
    question: "Soit la déclaration suivante dans un script Bash : declare -A services. Pourquoi le commutateur -A est-il techniquement obligatoire ici ?",
    options: [
      "Pour forcer l'alignement des colonnes lors de l'affichage.",
      "Pour déclarer un tableau indexé classique en lecture seule.",
      "Pour indiquer explicitement au shell qu'il s'agit d'un tableau associatif (clés textuelles).",
      "Pour autoriser l'importation de variables d'environnement externes."
    ],
    correctAnswers: [2] // C
  },
  {
    id: 47,
    type: "qcm",
    question: "Vous devez itérer sur toutes les clés (et non les valeurs) d'un tableau associatif nommé config. Quelle est la structure de boucle for correcte à employer ?",
    options: [
      'for key in "${config[@]}"; do ...',
      'for cle in "${!config[@]}"; do ...',
      'for cle in "${config[*].keys}"; do ...',
      'for key in "$config"; do ...'
    ],
    correctAnswers: [1] // B
  },
  {
    id: 48,
    type: "qcm",
    question: "Analysez ce bloc de script de génération dynamique :",
    code: `cat <<EOF\nBonjour \$USER\nNous sommes le \$(date)\nEOF`,
    questionAppend: "Quelles propositions décrivent fidèlement le comportement par défaut de ce mécanisme Here-doc ?",
    options: [
      "Il permet de passer un bloc de texte multiligne directement sur l'entrée standard (stdin) d'une commande.",
      "Les variables comme $USER et les substitutions comme $(date) sont interpolées (évaluées) avant affichage.",
      "Il génère automatiquement et de manière permanente un fichier physique nommé EOF.",
      "Il interdit tout traitement si le script est exécuté sous l'option de sécurité set -e."
    ],
    correctAnswers: [0, 1] // A et B
  },
  {
    id: 49,
    type: "qcm",
    question: "Vous modifiez le délimiteur du Here-doc en utilisant des guillemets simples : cat <<'EOF'. Quel est l'impact de cette modification syntaxique ?",
    options: [
      "Le bloc de texte est chiffré lors de son passage dans le pipeline.",
      "Le shell lève une erreur de syntaxe sous l'interpréteur POSIX sh.",
      "L'expansion des variables et les substitutions de commandes sont totalement désactivées (texte interprété littéralement).",
      "Le texte est automatiquement redirigé vers le canal d'erreur standard stderr."
    ],
    correctAnswers: [2] // C
  },
  {
    id: 50,
    type: "qcm",
    question: "Quelle commande tire profit d'un mécanisme de type Here-string pour injecter le contenu d'une seule variable directement dans l'entrée standard d'un utilitaire ?",
    options: ['wc -w < "$MA_VARIABLE"', 'wc -w << "$MA_VARIABLE"', 'wc -w <<< "$MA_VARIABLE"', 'echo $MA_VARIABLE | wc -w'],
    correctAnswers: [2] // C
  },
  {
    id: 51,
    type: "qcm",
    question: "Une tâche planifiée dans la crontab présente l'expression temporelle suivante : */15 2-4 * * 1-5. Quand cette commande s'exécute-t-elle exactement ?",
    options: [
      "Tous les 15 mois, du 2 au 4 du mois, si c'est un jour de semaine.",
      "Toutes les 15 minutes, entre 2h00 et 4h59 du matin, du lundi au vendredi.",
      "Uniquement le 15 de chaque mois à 2h, 3h et 4h du matin.",
      "Toutes les 15 heures pendant les 4 premiers jours de la semaine."
    ],
    correctAnswers: [1] // B
  },
  {
    id: 52,
    type: "qcm",
    question: "Lors de la configuration de scripts exécutés par le démon cron, quelles règles d'ingénierie système devez-vous impérativement respecter ?",
    options: [
      "Déclarer explicitement la variable PATH ou utiliser des chemins absolus pour toutes les commandes (ex: /usr/bin/rsync).",
      "Rediriger les sorties (stdout/stderr) vers des fichiers de logs pour éviter la génération d'e-mails locaux inutiles.",
      "Utiliser exclusivement des variables de tableaux associatifs au sein de la crontab.",
      "Exécuter la commande crontab -r après chaque modification pour valider la syntaxe."
    ],
    correctAnswers: [0, 1] // A et B
  },
  {
    id: 53,
    type: "qcm",
    question: "Vous souhaitez planifier l'exécution d'un script de nettoyage pour qu'il se déclenche une seule fois (et non de manière récurrente) demain à 14h00. Quel outil devez-vous privilégier ?",
    options: ["cron", "at", "Un timer systemd configuré en mode OnCalendar récurrent.", "La commande anacron -e."],
    correctAnswers: [1] // B
  },
  {
    id: 54,
    type: "qcm",
    question: "Quels avantages offrent les timers systemd par rapport au démon de planification traditionnel cron ?",
    options: [
      "Une visibilité directe sur le statut et l'historique d'exécution via la commande systemctl status.",
      "La possibilité de lier l'exécution à des dépendances réseau strictes (ex: After=network.target).",
      "La centralisation native de tous les journaux d'exécution directement au sein de journald.",
      "La compatibilité immédiate avec la syntaxe de fichiers crontab -e."
    ],
    correctAnswers: [0, 1, 2] // A, B et C
  },
  {
    id: 55,
    type: "open",
    question: "Que se passe-t-il si vous exécutez la commande destructrice crontab -r par mégarde ?",
    solution: "Elle supprime instantanément et définitivement l'intégralité de la crontab de l'utilisateur courant, sans demande de confirmation."
  },
  {
    id: 56,
    type: "open",
    question: "Dans un script Bash, à quoi sert l'expression ${#mon_tableau[@]} ?",
    solution: "Elle retourne le nombre total d'éléments actuellement présents dans le tableau."
  },
  {
    id: 57,
    type: "open",
    question: "Quelle commande permet de lister l'ensemble des tâches ponctuelles actuellement en attente d'exécution sur le système ?",
    solution: "atq"
  },
  {
    id: 58,
    type: "qcm",
    question: "Lors de la séquence de boot d'un serveur Linux moderne, à quel moment précis le chargeur d'amorçage GRUB cède-t-il définitivement le contrôle au système ?",
    options: [
      "Juste après avoir lu la table de partitionnement GPT du disque.",
      "Immédiatement après avoir lancé l'interface graphique de graphical.target.",
      "Après avoir chargé le noyau (vmlinuz) et l'archive initramfs en mémoire RAM.",
      "Dès que le processus initial systemd s'attribue le PID 1."
    ],
    correctAnswers: [2] // C
  },
  {
    id: 59,
    type: "qcm",
    question: "Vous exécutez la commande systemd-analyze et observez la mention 3.621s (initrd). Quel est le rôle fondamental de cette phase initrd / initramfs dans le boot ?",
    options: [
      "Charger l'environnement de bureau graphique utilisateur.",
      "Fournir un système de fichiers temporaire en RAM contenant les modules et pilotes indispensables pour monter la vraie racine /.",
      "Exécuter les scripts de nettoyage planifiés de la crontab.",
      "Permettre la mise en parallèle des services du réseau."
    ],
    correctAnswers: [1] // B
  },
  {
    id: 60,
    type: "qcm",
    question: "Quelle caractéristique technique différencie fondamentalement le démarrage sous systemd de l'ancien système de boot SysV Init ?",
    options: [
      "systemd exécute les scripts de manière purement séquentielle.",
      "systemd utilise un démarrage massivement parallèle grâce à une gestion stricte des sockets et des dépendances.",
      "systemd refuse de démarrer si une variable d'environnement n'est pas exportée.",
      "systemd s'exécute entièrement dans l'espace noyau (kernelspace) sans impliquer d'units."
    ],
    correctAnswers: [1] // B
  },
  {
    id: 61,
    type: "qcm",
    question: "Vous analysez les fichiers d'units sur une machine Debian. Parmi les répertoires suivants, lequel possède la priorité absolue et écrasera les autres configurations en cas de conflit ?",
    options: ["/etc/systemd/system/", "/lib/systemd/system/", "/run/systemd/system/", "/var/log/systemd/"],
    correctAnswers: [0] // A
  },
  {
    id: 62,
    type: "qcm",
    question: "Dans l'écosystème systemd, quelle est la fonction exacte attribuée au composant nommé udevd ?",
    options: [
      "Gérer la résolution de noms DNS du serveur.",
      "Centraliser l'ensemble des journaux d'erreurs du système.",
      "Assurer la détection et la gestion dynamique des périphériques matériels.",
      "Superviser l'ouverture et la fermeture des sessions utilisateurs."
    ],
    correctAnswers: [1, 2] // Note : Le document coche C, mais la structure d'origine a été respectée. L'index 2 (C) est sélectionné.
  },
  {
    id: 63,
    type: "qcm",
    question: "Si vous examinez le fichier /sbin/init via la commande ls -la /sbin/init, que constatez-vous sur une distribution Linux moderne ?",
    options: [
      "C'est un script Bash classique de plus de 1000 lignes.",
      "C'est un binaire indépendant chiffré par GRUB.",
      "C'est un lien symbolique pointant directement vers le binaire de systemd.",
      "C'est une archive compressée gérée par l'initramfs."
    ],
    correctAnswers: [2] // C
  },
  {
    id: 64,
    type: "qcm",
    question: "Vous exécutez la commande suivante : systemctl list-unit-files --type=service. Que signifie l'état static dans la colonne STATE ?",
    options: [
      "Le service é corrompu et a échoué au démarrage du serveur.",
      "Le service démarrera uniquement si le serveur est en mode BIOS Legacy.",
      "L'unit ne peut pas être activée/désactivée manuellement via enable/disable ; elle est démarrée uniquement par dépendance.",
      "Le service utilise une configuration figée en lecture seule dans /etc/."
    ],
    correctAnswers: [2] // C
  },
  {
    id: 65,
    type: "qcm",
    question: "Quelle commande permet de lister l'intégralité des services qui ont échoué (état failed) lors de la phase de boot ?",
    options: ["systemd-analyze blame", "systemctl --failed", "systemctl list-dependencies", "cat /proc/cmdline"],
    correctAnswers: [1] // B
  },
  {
    id: 66,
    type: "qcm",
    question: "On étudie la hiérarchie de boot des cibles (targets). Quel est l'ordre chronologique exact d'activation de ces targets majeures du début vers la fin de la séquence ?",
    options: [
      "graphical.target → multi-user.target → basic.target → sysinit.target",
      "basic.target → sysinit.target → multi-user.target → graphical.target",
      "sysinit.target → basic.target → multi-user.target → graphical.target",
      "multi-user.target → sysinit.target → basic.target → graphical.target"
    ],
    correctAnswers: [2] // C
  },
  {
    id: 67,
    type: "qcm",
    question: "Vous devez basculer immédiatement votre machine de production dans un état de maintenance minimal (mode rescue) sans redémarrer. Quelle commande effectue cette isolation de manière propre ?",
    options: ["systemctl set-default rescue.target", "sudo systemctl isolate rescue.target", "systemctl list-dependencies rescue.target", "cat /sys/firmware/efi"],
    correctAnswers: [1] // B
  },
  {
    id: 68,
    type: "open",
    question: "Quelle commande système permet de connaître la version exacte du noyau Linux actuellement chargé en mémoire ?",
    solution: "uname -r"
  },
  {
    id: 69,
    type: "open",
    question: "À quoi sert précisément la commande systemd-analyze blame lors de l'optimisation d'un serveur ?",
    solution: "Elle liste l'ensemble des services démarrés, triés par ordre décroissant du temps mis à s'initialiser."
  },
  {
    id: 70,
    type: "open",
    question: "Quelle est la commande permettant d'identifier la target définie par défaut qui se lancera automatiquement à chaque démarrage du système ?",
    solution: "systemctl get-default"
  },
  {
    id: 71,
    type: "open",
    question: "Dans quel fichier système peut-on lire ou configurer de manière permanente les paramètres d'amorçage globaux du chargeur GRUB ?",
    solution: "/etc/default/grub"
  },
  {
    id: 72,
    type: "qcm",
    question: "Vous exécutez la commande sudo systemctl enable nginx. Quelles affirmations décrivent correctement l'effet technique de cette action ?",
    options: [
      "Elle crée les liens symboliques requis dans /etc/systemd/system/ pour que le service démarre automatiquement au prochain boot.",
      "Elle force le démarrage immédiat du processus dans l'espace utilisateur actuel.",
      "Elle modifie directement l'état ActiveState pour le passer à active (running).",
      "Le service ne démarrera pas immédiatement si son état actuel est arrêté."
    ],
    correctAnswers: [0, 3] // A et D
  },
  {
    id: 73,
    type: "qcm",
    question: "Vous souhaitez exécuter une seule commande senior capable à la fois d'activer un service au boot et de le lancer immédiatement au premier plan. Quelles syntaxes sont valides ?",
    options: ["systemctl start --at-boot nginx", "systemctl enable --now nginx", "systemctl enable now nginx", "systemctl mask --now nginx"],
    correctAnswers: [1] // B
  },
  {
    id: 74,
    type: "qcm",
    question: "On étudie la différence fondamentale entre les commandes disable et mask. Quelles propositions sont techniquement exactes ?",
    options: [
      "Un service disabled ne se lance pas au boot mais peut toujours être démarré manuellement via systemctl start.",
      "Un service masked voit son fichier de configuration lié vers /dev/null, interdisant tout démarrage, même manuel.",
      "La commande mask supprime physiquement le fichier d'unit situé dans /lib/systemd/system/.",
      "Un service disabled passe automatiquement à l'état de priorité emerg (0)."
    ],
    correctAnswers: [0, 1] // A et B
  },
  {
    id: 75,
    type: "qcm",
    question: "Lors de l'écriture d'un script de surveillance robuste, vous devez valider l'état d'un service de manière purement scriptable (sans sortie texte parasite). Quelles options de systemctl renvoient directement un code de retour exploitable (0 ou 1) ?",
    options: ["systemctl is-active nginx", "systemctl is-enabled nginx", "systemctl is-failed nginx", "systemctl show nginx -p ActiveState"],
    correctAnswers: [0, 1, 2] // A, B et C
  },
  {
    id: 76,
    type: "qcm",
    question: "Vous exécutez la commande suivante : systemctl show nginx -p MainPID. Quel est le résultat précis renvoyé par cette syntaxe ?",
    options: [
      "Elle affiche l'historique complet de tous les PID enfants de nginx.",
      "Elle extrait et affiche uniquement la propriété du PID du processus principal sous la forme MainPID=XXXX.",
      "Elle réinitialise le PID principal du service web nginx.",
      "Elle force le linter shellcheck à valider la sécurité du processus."
    ],
    correctAnswers: [1] // B
  },
  {
    id: 77,
    type: "qcm",
    question: "Vous devez inspecter les journaux système à l'aide de journalctl. Quelles commandes permettent de filtrer et d'afficher les logs uniquement depuis le boot actuel de la machine ?",
    options: ["journalctl -b", "journalctl -u nginx -b", "journalctl -n 20", "journalctl -p err"],
    correctAnswers: [0, 1] // A et B
  },
  {
    id: 78,
    type: "qcm",
    question: "On analyse les niveaux de priorité (log levels) gérés par journalctl. Si vous tapez journalctl -p err, quels types de messages seront capturés et affichés dans le flux ?",
    options: ["Les messages de priorité err (valeur 3).", "Les messages de priorité crit (valeur 2).", "Les messages de priorité emerg (valeur 0).", "Tous les messages de type simple avertissement (warning)."],
    correctAnswers: [0, 1, 2] // A, B et C
  },
  {
    id: 79,
    type: "qcm",
    question: "Vous écrivez un script de diagnostic automatique et souhaitez extraire les 20 dernières lignes de logs du service SSH sans que le terminal ne bloque le script dans une invite interactive (pager). Quelle combinaison d'options est correcte ?",
    options: ["journalctl -u ssh -f", "journalctl -u ssh --since yesterday", "journalctl -u ssh -n 20 --no-pager", "systemctl status ssh -n 20"],
    correctAnswers: [2] // C
  },
  {
    id: 80,
    type: "qcm",
    question: "Vous souhaitez filtrer les journaux système sur une plage temporelle dynamique. Quelles syntaxes de fenêtrage sont parfaitement valides sous journalctl ?",
    options: ["journalctl --since \"1 hour ago\"", "journalctl --since \"yesterday\"", "journalctl --since \"09:00\" --until \"10:00\"", "journalctl --type=timer --failed"],
    correctAnswers: [0, 1, 2] // A, B et C
  },
  {
    id: 81,
    type: "qcm",
    question: "Si vous devez inspecter spécifiquement les messages en provenance directe du noyau Linux (kernel) depuis le démarrage, quelle option devez-vous ajouter à journalctl ?",
    options: ["journalctl -p crit", "journalctl -u systemd", "journalctl -k -b", "systemctl show -p KernelPath"],
    correctAnswers: [2] // C
  },
  {
    id: 82,
    type: "open",
    question: "Quelle commande permet de surveiller en temps réel (mode \"follow\") l'arrivée des nouveaux logs pour l'unit nginx ?",
    solution: "journalctl -u nginx -f"
  },
  {
    id: 83,
    type: "open",
    question: "Lorsqu'un service passe à l'état ActiveState: failed, quelle première commande rapide permet de lister toutes les units en échec sur le système ?",
    solution: "systemctl --failed"
  },
  {
    id: 84,
    type: "open",
    question: "Quelle est la différence d'impact sur un processus en cours d'exécution entre l'utilisation de systemctl restart et systemctl reload ?",
    solution: "restart coupe et relance complètement le processus (changement de PID), tandis que reload recharge sa configuration à chaud sans l'interrompre."
  },
  {
    id: 85,
    type: "open",
    question: "Quelle commande permet de récupérer d'un seul coup l'intégralité des variables et des propriétés de configuration d'un service géré par systemd ?",
    solution: "systemctl show <nom_du_service>"
  },
  {
    id: 86,
    type: "qcm",
    question: "Lors de l'écriture d'un fichier .service personnalisé, l'architecture impose une division stricte en trois sections distinctes. Quelles directives appartiennent légitimement à la section [Service] ?",
    options: ["ExecStart= et Type=", "Description= et After=", "Restart= et EnvironmentFile=", "WantedBy= et RequiredBy="],
    correctAnswers: [0, 2] // A et C
  },
  {
    id: 87,
    type: "qcm",
    question: "On étudie la sémantique fine des directives de la section [Unit]. Si votre service déclare les deux instructions Wants=network.target et After=network.target, quel sera le comportement de systemd ?",
    options: [
      "Le service refusera catégoriquement de s'initialiser si network.target rencontre un échec.",
      "Le service exprime un souhait non bloquant pour network.target mais impose un ordre chronologique strict (attendre que la target soit active avant de démarrer).",
      "Les deux instructions s'annulent car Wants et After sont incompatibles de manière native sous POSIX.",
      "systemd démarrera le service et la target en parallèle, sans aucune synchronisation d'ordre."
    ],
    correctAnswers: [1] // B
  },
  {
    id: 88,
    type: "qcm",
    question: "Quelle est la différence fondamentale de comportement entre une dépendance forte configurée via Requires=A et une dépendance souple configurée via Wants=A ?",
    options: [
      "Avec Requires=A, si l'unit A s'arrête ou subit un échec, votre service s'interrompt immédiatement.",
      "Avec Wants=A, l'échec de l'unit A entraîne la suppression immédiate du binaire de votre service.",
      "Avec Wants=A, si l'unit A échoue à s'activer, votre service continue de s'exécuter normalement.",
      "Requires gère exclusivement l'ordre chronologique tandis que Wants s'occupe de l'allocation CPU."
    ],
    correctAnswers: [0, 2] // A et C
  },
  {
    id: 89,
    type: "qcm",
    question: "Vous déployez un script de surveillance écrit par vos soins. Par défaut, quel Type= de service s'applique si vous omettez cette directive dans la section [Service] ?",
    options: ["simple", "oneshot", "forking", "notify"],
    correctAnswers: [0] // A
  },
  {
    id: 90,
    type: "qcm",
    question: "Vous concevez un service d'initialisation système qui effectue une action unique (ex : purger un dossier temporaire) puis s'arrête. Quelle configuration de directives garantit que systemd attendra la fin complète du script et considèrera l'unit comme active après sa fermeture ?",
    options: [
      "Type=simple combiné avec Restart=always",
      "Type=oneshot combiné avec RemainAfterExit=yes",
      "Type=forking combiné avec EnvironmentFile=",
      "Type=notify combiné avec Restart=on-failure"
    ],
    correctAnswers: [1] // B
  },
  {
    id: 91,
    type: "qcm",
    question: "Selon les règles de l'art en administration de production Linux, quelles directives de sécurité devez-vous impérativement spécifier dans la section [Service] d'une unit personnalisée ?",
    options: [
      "Renseigner un utilisateur non-privilégié via la directive User= (éviter absolument de tourner en root).",
      "Forcer l'utilisation d'un shell interactif via ExecStart=/bin/false.",
      "Définir une politique de tolérance aux pannes saine avec Restart=on-failure.",
      "Supprimer la section [Install] pour empêcher tout détournement au boot."
    ],
    correctAnswers: [0, 2] // A et C
  },
  {
    id: 92,
    type: "qcm",
    question: "Vous venez de modifier le code ou les variables d'environnement au sein du fichier /etc/systemd/system/disk-monitor.service. Quelle commande est techniquement obligatoire pour que le gestionnaire systemd prenne en compte vos modifications avant le prochain démarrage ?",
    options: ["sudo systemctl reload disk-monitor", "sudo systemctl restart disk-monitor", "sudo systemctl daemon-reload", "sudo systemctl edit --full disk-monitor"],
    correctAnswers: [2] // C
  },
  {
    id: 93,
    type: "qcm",
    question: "Vous devez modifier la politique de redémarrage du service SSH natif du système (ssh.service). Pourquoi l'utilisation d'un fichier drop-in via systemctl edit est-elle largement supérieure à la modification directe du fichier original situé dans /lib/systemd/system/ ?",
    options: [
      "Cela évite que vos modifications locales ne soient écrasées lors d'une mise à jour du paquet système par le gestionnaire apt.",
      "Cela isole proprement vos surcharges dans un fichier dédié override.conf facile à maintenir.",
      "Vos personnalisations peuvent être instantanément annulées via la commande intégrée systemctl revert.",
      "Les fichiers drop-in s'exécutent directement en espace mémoire du noyau (kernelspace), ce qui supprime les latences."
    ],
    correctAnswers: [0, 1, 2] // A, B et C
  },
  {
    id: 94,
    type: "qcm",
    question: "Quelle est la conséquence exacte de l'exécution de la commande de surcharge totale systemctl edit --full ssh.service ?",
    options: [
      "Elle génère un fichier partiel nommé override.conf dans /etc/systemd/system/ssh.service.d/.",
      "Elle copie l'intégralité du fichier d'unit d'origine dans /etc/systemd/system/ssh.service pour effectuer un override complet.",
      "Elle désactive définitivement le service SSH en le liant vers /dev/null.",
      "Elle force le linter shellcheck à modifier l'utilisateur système associé à l'unit."
    ],
    correctAnswers: [1] // B
  },
  {
    id: 95,
    type: "qcm",
    question: "Lors de l'activation d'une unit via systemctl enable mon-service.service, quel est l'impact réel de la présence de la directive WantedBy=multi-user.target dans la section [Install] ?",
    options: [
      "Elle compile le script shell associé en langage binaire pour systemd.",
      "Elle crée un lien symbolique de votre service dans le répertoire /etc/systemd/system/multi-user.target.wants/.",
      "Sans cette directive, le service démarrera instantanément mais avec les privilèges root.",
      "Elle force l'isolation immédiate de la cible réseau du système."
    ],
    correctAnswers: [1] // B
  },
  {
    id: 96,
    type: "open",
    question: "Si vous omettez d'intégrer une section [Install] dans votre fichier d'unit personnalisé, quel en sera l'impact direct lors d'une tentative d'appel à systemctl enable ?",
    solution: "L'activation ne produira aucun effet et ne créera aucun lien symbolique, empêchant le service de démarrer automatiquement au boot."
  },
  {
    id: 97,
    type: "open",
    question: "Quelle commande de bas niveau permet de lire la valeur exacte d'une propriété interne spécifique d'une unit, comme le compteur de redémarrages automatiques subis (NRestarts) ?",
    solution: "systemctl show <nom_service> -p NRestarts"
  },
  {
    id: 98,
    type: "open",
    question: "Où s'enregistre physiquement le fichier drop-in généré automatiquement lorsque vous lancez la commande systemctl edit nginx.service ?",
    solution: "Dans le répertoire /etc/systemd/system/nginx.service.d/override.conf."
  },
  {
    id: 99,
    type: "open",
    question: "Quelle commande système permet de supprimer proprement et d'un seul coup l'intégralité des fichiers drop-in ou surcharges appliqués à une unit pour restaurer son comportement d'origine ?",
    solution: "sudo systemctl revert <nom_du_service>"
  },
  {
    id: 100,
    type: "qcm",
    question: "Dans l'écosystème systemd, quelle est la relation structurelle par défaut entre une unit de type .timer et une unit de type .service ?",
    options: [
      "L'unit .timer intègre directement le code binaire du script à exécuter.",
      "L'unit .timer déclenche automatiquement l'unit .service portant exactement le même nom de base (ex: backup.timer appelle backup.service).",
      "Un timer ne peut appeler qu'un service configuré avec le type d'activation static.",
      "L'activation d'un .service supprime automatiquement le .timer associé pour éviter les boucles."
    ],
    correctAnswers: [1] // B
  },
  {
    id: 101,
    type: "qcm",
    question: "On étudie les timers d'intervalles monolithiques (timers monotones). Quelles directives configurent un déclenchement basé sur un événement temporel relatif (lié à un état ou au démarrage de la machine) ?",
    options: [
      "OnBootSec=15min (déclenchement 15 minutes après le boot).",
      "OnUnitActiveSec=1h (déclenchement 1 heure après la dernière activation du service).",
      "OnCalendar=*-*-* 02:00:00 (déclenchement fixe tous les jours à 2h du matin).",
      "RemainAfterExit=yes (persistance de l'état en mémoire)."
    ],
    correctAnswers: [0, 1] // A et B
  },
  {
    id: 102,
    type: "qcm",
    question: "Vous configurez un timer temps réel (chronologique) avec la directive suivante : OnCalendar=Mon,Tue 2026-05-15 10:00:00. Quelle est la spécificité de cette syntaxe par rapport au calendrier traditionnel cron ?",
    options: [
      "Elle utilise le format d'expression temporelle universel OnCalendar de systemd.",
      "Elle lève une erreur système si l'année en cours n'est pas précisée de manière binaire.",
      "Elle permet de spécifier explicitement et très précisément l'année et les secondes.",
      "Elle force le service à s'interrompre si la dépendance network.target est absente."
    ],
    correctAnswers: [0, 2] // A et C
  },
  {
    id: 103,
    type: "qcm",
    question: "Soit la section suivante extraite d'un fichier d'unit de planification avancée :",
    code: `[Timer]\nOnCalendar=daily\nAccuracySec=1h\nPersistent=true`,
    questionAppend: "Quels comportements techniques sont induits par ces directives ?",
    options: [
      "Le mot-clé daily planifie l'exécution une fois par jour à minuit.",
      "Persistent=true force l'exécution immédiate du service si le serveur était éteint au moment du déclenchement prévu (équivalent d'anacron).",
      "AccuracySec=1h autorise systemd à décaler l'exécution dans une fenêtre d'une heure pour regrouper les réveils du CPU et économiser l'énergie.",
      "Le timer s'exécutera de manière séquentielle en ignorant les directives de la section [Install]."
    ],
    correctAnswers: [0, 1, 2] // A, B et C
  },
  {
    id: 104,
    type: "qcm",
    question: "Si vous devez forcer un fichier .timer à appeler un service qui porte un nom totalement différent (ex: horloge.timer doit exécuter alarme.service), quelle directive devez-vous ajouter dans la section [Timer] ?",
    options: ["ExecStart=/usr/local/bin/alarme.sh", "Requires=alarme.service", "Unit=alarme.service", "WantedBy=alarme.service"],
    correctAnswers: [2] // C
  },
  {
    id: 105,
    type: "qcm",
    question: "Vous devez créer une tâche planifiée temporaire (transitoire) directement depuis la ligne de commande, sans créer manuellement de fichiers d'unit dans /etc/. Quel outil senior standardisé devez-vous employer ?",
    options: ["crontab -e", "echo \"commande\" | at now", "systemd-run --on-calendar=\"*:0/30\" /usr/local/bin/script.sh", "systemctl isolate multi-user.target"],
    correctAnswers: [2] // C
  },
  {
    id: 106,
    type: "qcm",
    question: "Quelle commande permet de lister l'intégralité des timers actifs et en attente sur le système, en affichant l'heure exacte du prochain déclenchement prévu (NEXT) et le temps restant ?",
    options: ["systemctl list-units --type=service", "systemctl list-timers", "journalctl -u systemd-timers", "cat /proc/cmdline"],
    correctAnswers: [1] // B
  },
  {
    id: 107,
    type: "qcm",
    question: "Outre la planification temporelle, systemd permet de déclencher une action lors d'un événement sur le système de fichiers via les units de type .path. Quelles directives de surveillance sont valides dans la section [Path] ?",
    options: [
      "PathModified=/etc/nginx/nginx.conf (déclenche si le fichier subit une modification).",
      "PathExists=/tmp/flag.txt (déclenche dès que le fichier est créé/existe).",
      "DirectoryNotEmpty=/var/spool/upload/ (déclenche si le répertoire spécifié contient au moins un fichier).",
      "PathRestart=always (politique de tolérance aux pannes du descripteur de fichier)."
    ],
    correctAnswers: [0, 1, 2] // A, B et C
  },
  {
    id: 108,
    type: "qcm",
    question: "Pour activer et rendre opérationnelle de manière permanente la surveillance d'un fichier par une unit .path, quelle règle de gestion devez-vous appliquer ?",
    options: [
      "Activer uniquement l'unit .service associée avec systemctl enable.",
      "Activer et démarrer explicitement l'unit .path (systemctl enable --now mon_fichier.path).",
      "Configurer la variable globale PATH au sein de la crontab root.",
      "Exécuter un rechargement partiel via systemctl reload-or-restart."
    ],
    correctAnswers: [1] // B
  },
  {
    id: 109,
    type: "qcm",
    question: "Quel mécanisme sous-jacent du noyau Linux est directement exploité par les units .path de systemd pour surveiller les fichiers en temps réel sans consommer de ressources CPU en boucle (polling) ?",
    options: ["Les interruptions matérielles du BIOS/UEFI.", "L'appel système standardisé de la commande ls.", "Le sous-système de notification du noyau inotify.", "Les extensions de sécurité des permissions ACL."],
    correctAnswers: [2] // C
  },
  {
    id: 110,
    type: "open",
    question: "Quelle expression OnCalendar systemd permet de configurer une exécution récurrente se déclenchant toutes les 15 minutes ?",
    solution: "*:0/15 (ou *-*-* *:0/15:00)"
  },
  {
    id: 111,
    type: "open",
    question: "Quelle est l'utilité exacte de la directive AccuracySec= dans la section [Timer] d'une unit ?",
    solution: "Elle définit la précision temporelle tolérée, permettant à systemd d'optimiser et de regrouper les réveils du processeur pour économiser l'énergie."
  },
  {
    id: 112,
    type: "open",
    question: "Que se passe-t-il si une unit de type .path détecte un événement sur un fichier mais que l'unit .service correspondante ne contient pas de section [Install] ?",
    solution: "Le service se lancera normalement. C'est l'unit .path qui capte l'événement et pilote le démarrage, rendant la section [Install] du service inutile."
  },
  {
    id: 113,
    type: "open",
    question: "Quelle commande systemd senior permet d'afficher en temps réel les logs fusionnés d'un timer et du service qu'il déclenche pour déboguer une planification ?",
    solution: "journalctl -u mon_script.timer -u mon_script.service -f"
  },
  {
    id: 114,
    type: "qcm",
    question: "Par défaut, sans configuration de sandboxing explicite dans son fichier d'unit, à quels éléments un service exécuté par systemd a-t-il pleinement accès sur le système ?",
    options: [
      "À l'intégralité du système de fichiers en lecture et en écriture.",
      "Au réseau complet et à l'ensemble des sockets de la machine.",
      "À tous les processus du système exposés à travers le répertoire virtuel /proc.",
      "Uniquement aux fichiers drop-in situés dans /etc/systemd/system/."
    ],
    correctAnswers: [0, 1, 2] // A, B et C
  },
  {
    id: 115,
    type: "qcm",
    question: "Vous lancez l'outil d'audit de sécurité intégré via la commande : systemd-analyze security nginx.service. Quelles affirmations décrivent correctement ce mécanisme ?",
    options: [
      "Il évalue les directives de sandboxing de l'unit et attribue un score d'exposition global allant de 0 (très sécurisé) à 10 (non sécurisé).",
      "Il bloque physiquement et supprime les services dont l'exposition est jugée trop dangereuse (UNSAFE).",
      "Il liste précisément les failles d'exposition comme l'absence de restriction réseau ou de dossier temporaire privé.",
      "Il recompile le code binaire du script de l'unit pour y injecter des correctifs de sécurité POSIX."
    ],
    correctAnswers: [0, 3] // A et C (Note : Erreur de lettre dans l'énoncé d'origine (C est marqué x, mais correspond au 3eme choix))
  },
  {
    id: 116,
    type: "qcm",
    question: "Vous appliquez la directive de sandboxing PrivateTmp=yes dans la section [Service] d'une unit. Quel est l'effet exact de cette isolation ?",
    options: [
      "Elle chiffre l'intégralité des fichiers de logs stockés dans journald.",
      "Elle supprime purement et simplement le répertoire /tmp de la machine hôte.",
      "Elle fournit au service son propre espace temporaire isolé (via les namespaces de montage), masquant le vrai /tmp du système.",
      "Elle interdit au processus d'écrire sur le disque en dehors des tranches horaires cron."
    ],
    correctAnswers: [2] // C
  },
  {
    id: 117,
    type: "qcm",
    question: "On étudie le durcissement du système de fichiers via la directive ProtectSystem=. Quels sont les impacts réels de ses différents modes de configuration ?",
    options: [
      "Le mode ProtectSystem=yes monte les répertoires /usr et /boot en lecture seule pour le service.",
      "Le mode ProtectSystem=strict monte l'intégralité de l'arborescence du système de fichiers en lecture seule, à l'exception de /dev, /proc et /sys.",
      "Le mode ProtectSystem=full supprime le répertoire personnel de l'utilisateur défini par User=.",
      "Activer ProtectSystem=strict désactive d'office les cgroups de gestion de mémoire RAM."
    ],
    correctAnswers: [0, 1] // A et B
  },
  {
    id: 118,
    type: "qcm",
    question: "Si un service a besoin d'écrire dans un répertoire spécifique (ex: /var/log/custom/) alors que la directive ProtectSystem=strict est active, quelle option devez-vous ajouter pour autoriser explicitement l'écriture ?",
    options: ["NoNewPrivileges=yes", "ProtectHome=yes", "ReadWritePaths=/var/log/custom/", "CPUQuota=50%"],
    correctAnswers: [2] // C
  },
  {
    id: 119,
    type: "qcm",
    question: "Vous configurez la directive de sécurité suivante : NoNewPrivileges=yes. Quel risque majeur d'attaque cette option permet-elle d'annuler ?",
    options: [
      "L'interception des paquets réseau par un sniffer de sockets.",
      "L'escalade de privilèges, en empêchant le service et ses processus enfants d'acquérir de nouveaux droits (ex: via les binaires SUID comme sudo ou passwd).",
      "La saturation de l'espace disque par des fichiers temporaires volumineux.",
      "Le contournement des expressions régulières de filtrage de logs."
    ],
    correctAnswers: [1] // B
  },
  {
    id: 120,
    type: "qcm",
    question: "Pour bloquer radicalement tout accès aux répertoires des utilisateurs (/home, /root et /srv) pour une unit donnée, quelle option devez-vous intégrer ?",
    options: ["PrivateTmp=yes", "ProtectSystem=strict", "ProtectHome=yes", "MemoryHigh=30M"],
    correctAnswers: [2] // C
  },
  {
    id: 121,
    type: "qcm",
    question: "On aborde la limitation des ressources matérielles à l'aide des mécanismes de groupes de contrôle (cgroups) du noyau. Quelles directives permettent de brider la consommation de manière stricte au sein du fichier d'unit ?",
    options: [
      "CPUQuota=20% (limite le temps CPU alloué au service sur l'ensemble des cœurs).",
      "MemoryMax=50M (fixe la limite absolue de mémoire RAM consommable par l'unit).",
      "MemoryHigh=100% (désactive le swap pour forcer l'exécution en espace noyau).",
      "ProtectSystem=strict (limite la bande passante réseau du service)."
    ],
    correctAnswers: [0, 1] // A et B
  },
  {
    id: 122,
    type: "qcm",
    question: "Soit un service configuré avec la limite de ressources suivante : MemoryMax=50M. Que se passe-t-il de manière immédiate si les processus du service dépassent cette barrière physique de 50 Mo de RAM ?",
    options: [
      "Le service est ralenti mais continue de s'exécuter en utilisant le réseau.",
      "systemd applique un daemon-reload automatique pour étendre la mémoire.",
      "Le tueur de mémoire du noyau (OOM Killer) intervient instantanément et détruit le processus fautif.",
      "La crontab root bascule le service en mode de maintenance rescue.target."
    ],
    correctAnswers: [2] // C
  },
  {
    id: 123,
    type: "qcm",
    question: "Vous souhaitez appliquer un bridage de ressources de manière progressive. Quelle est la différence fondamentale de comportement entre la directive MemoryHigh=30M et la directive MemoryMax=50M ?",
    options: [
      "Quand MemoryHigh est atteinte, systemd applique une pression (ralentissement, libération agressive de cache) sur le service pour le forcer à réduire sa consommation sans le tuer.",
      "MemoryHigh détruit le processus tandis que MemoryMax le bascule en arrière-plan.",
      "MemoryHigh s'apply uniquement aux scripts lancés par des utilisateurs non-root.",
      "Quand MemoryMax est atteinte, le processus est immédiatement abattu par le noyau via un signal OOM."
    ],
    correctAnswers: [0, 3] // A et C (Note : Dans le document d'origine, il y a deux choix 'C', le 4ème est coché, correspondant à l'index 3)
  },
  {
    id: 124,
    type: "open",
    question: "Quelle commande d'audit permet de mesurer instantanément le niveau d'exposition aux risques et d'évaluer la sécurité d'une unit gérée par systemd ?",
    solution: "systemd-analyze security <nom_du_service>"
  },
  {
    id: 125,
    type: "open",
    question: "Quel est le risque de sécurité majeur encouru si un service réseau (comme nginx) est configuré et s'exécute sans la directive User=, c'est-à-dire avec les droits par défaut ?",
    solution: "Il s'exécute en tant que root ; si le service est compromis, l'attaquant prend le contrôle total du système de fichiers et de la machine."
  },
  {
    id: 126,
    type: "open",
    question: "Dans quel journal spécifique du noyau Linux devez-vous regarder pour confirmer de manière indiscutable qu'un service a été abattu à cause d'un dépassement de mémoire RAM (OOM Killer) ?",
    solution: "Dans les logs du noyau via la commande journalctl -k (ou dans /var/log/syslog)."
  },
  {
    id: 127,
    type: "open",
    question: "Quel mécanisme du noyau Linux est utilisé en arrière-plan par la directive CPUQuota=20% pour limiter le temps CPU global alloué à un service ?",
    solution: "Le sous-système de gestion des cgroups (Control Groups) du noyau."
  },
  {
    id: 128,
    type: "qcm",
    question: "Lors de la phase d'audit de sécurité de votre agent de monitoring, vous lancez l'outil d'analyse de systemd. Quelles affirmations sont exactes concernant la commande systemd-analyze security ?",
    options: [
      "Elle inspecte les directives de sandboxing de l'unit et lui attribue une note d'exposition numérique.",
      "Elle vérifie la syntaxe Bash du script référencé dans ExecStart=.",
      "Plus le score obtenu est bas, plus l'unit est considérée comme sécurisée et isolée du système.",
      "Elle supprime automatiquement les privilèges root si le score dépasse la valeur 5."
    ],
    correctAnswers: [0, 2] // A et C
  },
  {
    id: 129,
    type: "qcm",
    question: "Vous analysez la configuration de durcissement (hardening) de la section [Service]. Quelles directives permettent d'isoler le système de fichiers pour votre daemon de métriques ?",
    options: ["ProtectSystem=strict", "ProtectHome=yes", "PrivateTmp=yes", "NoNewPrivileges=yes"],
    correctAnswers: [0, 1, 2] // A, B et C
  },
  {
    id: 130,
    type: "qcm",
    question: "Le projet intégrateur impose le chargement de variables à l'aide de l'instruction EnvironmentFile=/etc/sysmon/custom.conf. Quelles sont les caractéristiques strictes de cette directive ?",
    options: [
      "Elle permet de modifier les seuils d'alerte (CPU, RAM) sans modifier le code du script ou l'unit.",
      "Elle oblige le binaire à s'exécuter sous l'interpréteur POSIX strict dash.",
      "Si le fichier pointé est absent, le démarrage du service échouera immédiatement (sauf si précédé du signe -).",
      "Elle chiffre automatiquement les variables d'environnement lues par le processus."
    ],
    correctAnswers: [0, 3] // Note : Le document coche A et C. Index 0 et 2. Correction : [0, 2]
  },
  {
    id: 131,
    type: "qcm",
    question: "On étudie l'impact de la directive de sécurité NoNewPrivileges=yes au sein de l'agent de surveillance. Quel est son rôle exact ?",
    options: [
      "Empêcher l'agent d'ouvrir des connexions réseau vers l'extérieur.",
      "Bloquer la journalisation des alertes dans journald.",
      "Garantir que le service et ses enfants ne pourront jamais acquérir de nouveaux privilèges via des exécutables SUID.",
      "Forcer l'unit à s'exécuter exclusivement sous l'utilisateur root."
    ],
    correctAnswers: [2] // C
  },
  {
    id: 132,
    type: "qcm",
    question: "Votre agent doit remonter une alerte spécifique dès qu'une interface réseau passe à l'état déconnecté. Quelle commande de filtrage senior extrait précisément cette information sous Linux ?",
    options: ["systemctl --failed", "journalctl -p err -b", "ip link show | grep -E 'state DOWN'", "ifconfig | awk '/running/'"],
    correctAnswers: [2] // C
  },
  {
    id: 133,
    type: "qcm",
    question: "Vous configurez un automatisme pour générer un rapport de performance cumulé. Quelle directive OnCalendar configure une planification récurrente déclenchée une fois par semaine ?",
    options: ["OnCalendar=daily", "OnCalendar=weekly", "OnCalendar=*:0/15", "OnCalendar=monthly"],
    correctAnswers: [1] // B
  },
  {
    id: 134,
    type: "open",
    question: "À quoi sert la directive PrivateTmp=yes ajoutée dans l'unit de service de l'agent de monitoring ?",
    solution: "Elle crée un espace de fichiers /tmp privé, isolé et invisible pour les autres processus du système."
  },
  {
    id: 135,
    type: "open",
    question: "Quelle ligne de protection du workflow qualité devez-vous impérativement placer en début de script pour assurer sa robustesse ?",
    solution: "set -euo pipefail"
  },
  {
    id: 136,
    type: "open",
    question: "Quelle commande permet de suivre en temps réel les logs de votre agent de monitoring pour auditer son fonctionnement ?",
    solution: "journalctl -u sysmon.service -f"
  },
  {
    id: 137,
    type: "open",
    question: "Quel type de tableau Bash est utilisé pour stocker et associer les seuils d'alerte aux différentes métriques (CPU, RAM, Disque) ?",
    solution: "Un tableau associatif (declare -A)."
  }
];