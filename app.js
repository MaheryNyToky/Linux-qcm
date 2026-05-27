// app.js

// L'état global de la session de quiz
let currentQuestionsList = [...quizData];
let currentQuestionIndex = 0;
// Objet de stockage des réponses utilisateur : { id_question: 'correct' | 'wrong' | 'unanswered' }
let userProgress = {};
// Tableau stockant l'ordre mélangé des index d'options pour la question courante
let currentMappedOptionsOrder = [];

// Initialisation de l'avancement pour toutes les questions du référentiel
quizData.forEach(q => {
    userProgress[q.id] = 'unanswered';
});

// Sélecteurs DOM
const questionCard = document.getElementById('question-card');
const btnAction = document.getElementById('btn-action'); // Bouton unique dynamique (Valider / Suivant)
const btnRestartAll = document.getElementById('btn-restart-all');
const btnFilterErrors = document.getElementById('btn-filter-errors');
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');

// État local de la question : 'selecting' (en cours de choix) ou 'validated' (correction affichée)
let currentQuestionState = 'selecting';

// Lancement de l'application au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    renderCurrentQuestion();
    setupGlobalEvents();
});

// Gestion des écouteurs globaux (Navbar et contrôles principaux)
function setupGlobalEvents() {
    btnAction.addEventListener('click', () => {
        if (currentQuestionState === 'selecting') {
            handleValidation();
        } else {
            currentQuestionIndex++;
            renderCurrentQuestion();
        }
    });

    btnRestartAll.addEventListener('click', () => {
        if (confirm("Voulez-vous vraiment réinitialiser tout le quiz ?")) {
            resetQuizFull();
        }
    });

    btnFilterErrors.addEventListener('click', () => {
        filterToErrorsAndUnanswered();
    });
}

// Fonction maîtresse d'affichage de la question courante
function renderCurrentQuestion() {
    // Vérification de la fin de la liste actuelle
    if (currentQuestionIndex >= currentQuestionsList.length) {
        renderEndScreen();
        return;
    }

    const q = currentQuestionsList[currentQuestionIndex];
    updateProgressBar();
    
    // Réinitialisation de l'état de la question
    currentQuestionState = 'selecting';
    
    // Configuration initiale du bouton d'action pour la phase de sélection
    btnAction.classList.remove('hidden');
    btnAction.className = 'btn btn-primary';
    btnAction.innerText = 'Valider';

    // Construction dynamique du gabarit de la carte
    let htmlContent = `
        <div class="question-text">Q${q.id}. ${escapeHtml(q.question)}</div>
    `;

    if (q.code) {
        htmlContent += `<pre><code>${escapeHtml(q.code)}</code></pre>`;
    }

    if (q.questionAppend) {
        htmlContent += `<div class="question-append">${escapeHtml(q.questionAppend)}</div>`;
    }

    if (q.type === 'qcm') {
        htmlContent += `<div class="options-group">`;
        
        // Génération d'un ordre aléatoire pour les options de cette question
        // On crée un tableau d'index [0, 1, 2, ...] et on le mélange
        currentMappedOptionsOrder = q.options.map((_, idx) => idx);
        shuffleArray(currentMappedOptionsOrder);

        // Rendu des options selon l'ordre mélangé
        currentMappedOptionsOrder.forEach((originalIdx) => {
            htmlContent += `
                <button class="option-btn" data-original-index="${originalIdx}">
                    <span class="checkbox-indicator"></span>
                    <span class="option-text-content">${escapeHtml(q.options[originalIdx])}</span>
                </button>
            `;
        });
        htmlContent += `</div>`;
        
        questionCard.innerHTML = htmlContent;
        setupQcmInteractions();
        
    } else if (q.type === 'open') {
        htmlContent += `
            <div class="open-answer-zone">
                <textarea class="answer-input" id="open-input" placeholder="Saisissez votre réponse technique ici..."></textarea>
                <div id="solution-container" class="hidden">
                    <div class="solution-box">
                        <div class="solution-title">Correction Officielle :</div>
                        <p>${escapeHtml(q.solution)}</p>
                    </div>
                    <div class="self-eval-zone">
                        <span class="self-eval-prompt">S'auto-évaluer :</span>
                        <button class="btn btn-success" id="eval-juste">✓ Juste</button>
                        <button class="btn btn-danger" id="eval-faux">✗ Faux</button>
                    </div>
                </div>
            </div>
        `;
        
        questionCard.innerHTML = htmlContent;
        setupOpenInteractions(q);
    }
}

// Logique de sélection multiple libre (type case à cocher)
function setupQcmInteractions() {
    const optionButtons = questionCard.querySelectorAll('.option-btn');

    optionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (currentQuestionState !== 'selecting') return;

            // Alterne l'état sélectionné au clic
            if (this.classList.contains('primary-selected')) {
                this.classList.remove('primary-selected');
            } else {
                this.classList.add('primary-selected');
            }
        });
    });
}

// Traitement lors du clic sur "Valider"
function handleValidation() {
    const q = currentQuestionsList[currentQuestionIndex];

    if (q.type === 'qcm') {
        const optionButtons = questionCard.querySelectorAll('.option-btn');
        let selectedOriginalIndices = [];

        // Collecte des sélections de l'utilisateur
        optionButtons.forEach(btn => {
            btn.disabled = true; // Fige les choix
            if (btn.classList.contains('primary-selected')) {
                selectedOriginalIndices.push(parseInt(btn.dataset.originalIndex, 10));
            }
        });

        // Validation stricte : exactitude du nombre et des éléments choisis
        const isAllCorrect = selectedOriginalIndices.length === q.correctAnswers.length &&
                              selectedOriginalIndices.every(val => q.correctAnswers.includes(val));

        // Coloriage final basé sur les index réels/originaux du fichier questions.js
        optionButtons.forEach(btn => {
            const idx = parseInt(btn.dataset.originalIndex, 10);
            if (q.correctAnswers.includes(idx)) {
                btn.classList.add('correct'); // La bonne réponse s'affiche toujours en vert
            } else if (btn.classList.contains('primary-selected')) {
                btn.classList.add('wrong'); // Les choix faux sélectionnés passent en rouge
            }
            btn.classList.remove('primary-selected');
        });

        // Enregistrement de la progression
        userProgress[q.id] = isAllCorrect ? 'correct' : 'wrong';

        // Transformation du bouton d'action vers l'état suivant
        currentQuestionState = 'validated';
        btnAction.className = 'btn btn-next-action';
        btnAction.innerText = 'Question suivante →';

    } else if (q.type === 'open') {
        const openInput = document.getElementById('open-input');
        if (!openInput.value.trim()) {
            alert("Veuillez saisir une réponse avant de valider.");
            return;
        }
        openInput.disabled = true;
        
        // Cache le bouton principal temporairement pour forcer l'auto-évaluation
        btnAction.classList.add('hidden');
        document.getElementById('solution-container').classList.remove('hidden');
    }
}

// Logique pour les questions ouvertes (Option A avec auto-évaluation)
function setupOpenInteractions(questionObj) {
    const btnJuste = document.getElementById('eval-juste');
    const btnFaux = document.getElementById('eval-faux');

    btnJuste.addEventListener('click', () => {
        userProgress[questionObj.id] = 'correct';
        goToNextQuestionDirectly();
    });

    btnFaux.addEventListener('click', () => {
        userProgress[questionObj.id] = 'wrong';
        goToNextQuestionDirectly();
    });
}

function goToNextQuestionDirectly() {
    currentQuestionIndex++;
    renderCurrentQuestion();
}

// Mise à jour visuelle des barres de progression
function updateProgressBar() {
    const currentCount = currentQuestionIndex + 1;
    const totalCount = currentQuestionsList.length;
    
    progressText.innerText = `Question ${currentCount} / ${totalCount}`;
    const percentage = (currentCount / totalCount) * 100;
    progressFill.style.width = `${percentage}%`;
}

// Écran de fin personnalisé
function renderEndScreen() {
    let sessionCorrect = 0;
    let sessionWrong = 0;
    
    currentQuestionsList.forEach(q => {
        if (userProgress[q.id] === 'correct') sessionCorrect++;
        if (userProgress[q.id] === 'wrong') sessionWrong++;
    });

    progressText.innerText = "Session terminée !";
    progressFill.style.width = "100%";
    btnAction.classList.add('hidden');

    questionCard.innerHTML = `
        <div class="question-text" style="text-align: center;">Félicitations, vous avez terminé cette session !</div>
        <div class="score-value">${sessionCorrect} / ${currentQuestionsList.length}</div>
        <p style="text-align: center; color: var(--text-muted); margin-bottom: 20px;">
            Réponses correctes : <strong>${sessionCorrect}</strong> | Erreurs : <strong>${sessionWrong}</strong>
        </p>
        <div class="final-actions">
            <button id="btn-final-all" class="btn btn-primary">Recommencer tout</button>
            <button id="btn-final-errors" class="btn btn-danger ${sessionWrong === 0 ? 'hidden' : ''}">
                Recommencer uniquement les erreurs
            </button>
        </div>
    `;

    document.getElementById('btn-final-all').addEventListener('click', resetQuizFull);
    if (sessionWrong > 0) {
        document.getElementById('btn-final-errors').addEventListener('click', filterToErrorsOnly);
    }
}

// STRATÉGIES DE FILTRAGE ET RESTART

// 1. Réinitialisation complète de l'ensemble du référentiel
function resetQuizFull() {
    quizData.forEach(q => {
        userProgress[q.id] = 'unanswered';
    });
    currentQuestionsList = [...quizData];
    currentQuestionIndex = 0;
    renderCurrentQuestion();
}

// 2. Filtrage permanent : Erreurs + Non répondus
function filterToErrorsAndUnanswered() {
    const filtered = quizData.filter(q => userProgress[q.id] === 'wrong' || userProgress[q.id] === 'unanswered');
    
    if (filtered.length === 0) {
        alert("Aucune erreur ni question en suspens pour le moment ! Félicitations.");
        return;
    }
    
    currentQuestionsList = filtered;
    currentQuestionIndex = 0;
    renderCurrentQuestion();
}

// 3. Filtrage ciblé depuis l'écran de fin
function filterToErrorsOnly() {
    const filtered = quizData.filter(q => userProgress[q.id] === 'wrong');
    
    filtered.forEach(q => {
        userProgress[q.id] = 'unanswered';
    });

    currentQuestionsList = filtered;
    currentQuestionIndex = 0;
    renderCurrentQuestion();
}

// Algorithme de mélange aléatoire d'un tableau en place (Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Utilitaire de sécurisation des chaînes de caractères (anti-XSS)
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}