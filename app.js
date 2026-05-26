// app.js

// L'état global de la session de quiz
let currentQuestionsList = [...quizData];
let currentQuestionIndex = 0;
// Objet de stockage des réponses utilisateur : { id_question: 'correct' | 'wrong' | 'unanswered' }
let userProgress = {};

// Initialisation de l'avancement pour toutes les questions du référentiel
quizData.forEach(q => {
    userProgress[q.id] = 'unanswered';
});

// Sélecteurs DOM
const questionCard = document.getElementById('question-card');
const btnNext = document.getElementById('btn-next');
const btnRestartAll = document.getElementById('btn-restart-all');
const btnFilterErrors = document.getElementById('btn-filter-errors');
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');

// Lancement de l'application au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    renderCurrentQuestion();
    setupGlobalEvents();
});

// Gestion des écouteurs globaux (Navbar et contrôles principaux)
function setupGlobalEvents() {
    btnNext.addEventListener('click', () => {
        currentQuestionIndex++;
        renderCurrentQuestion();
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
    // Masquer le bouton suivant par défaut à chaque nouvelle carte
    btnNext.classList.add('hidden');
    
    // Vérification de la fin de la liste actuelle
    if (currentQuestionIndex >= currentQuestionsList.length) {
        renderEndScreen();
        return;
    }

    const q = currentQuestionsList[currentQuestionIndex];
    updateProgressBar();

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
        q.options.forEach((option, idx) => {
            htmlContent += `
                <button class="option-btn" data-index="${idx}">
                    ${escapeHtml(option)}
                </button>
            `;
        });
        htmlContent += `</div>`;
        
        questionCard.innerHTML = htmlContent;
        setupQcmInteractions(q);
        
    } else if (q.type === 'open') {
        htmlContent += `
            <div class="open-answer-zone">
                <textarea class="answer-input" id="open-input" placeholder="Saisissez votre réponse technique ici..."></textarea>
                <button id="btn-validate-open" class="btn btn-primary">Valider ma réponse</button>
                
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

// Logique d'interaction et de correction instantanée pour les QCM
function setupQcmInteractions(questionObj) {
    const optionButtons = questionCard.querySelectorAll('.option-btn');
    let selectedIndices = [];
    const totalCorrectAnswers = questionObj.correctAnswers.length;

    optionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const indexClicked = parseInt(this.dataset.index, 10);
            
            // Gestion multi-réponses ou réponse unique
            if (totalCorrectAnswers === 1) {
                // Cas standard : un seul choix possible
                selectedIndices.push(indexClicked);
                processQcmEvaluation(questionObj, selectedIndices, optionButtons);
            } else {
                // Cas multi-sélections : on colore temporairement et on attend
                if (!this.classList.contains('primary-selected')) {
                    this.classList.add('primary-selected');
                    this.style.borderColor = "var(--primary)";
                    selectedIndices.push(indexClicked);
                }
                
                // Si l'utilisateur a sélectionné le nombre attendu de bonnes réponses
                if (selectedIndices.length === totalCorrectAnswers) {
                    processQcmEvaluation(questionObj, selectedIndices, optionButtons);
                }
            }
        });
    });
}

function processQcmEvaluation(questionObj, selectedIndices, optionButtons) {
    // Désactiver tous les boutons pour figer le choix
    optionButtons.forEach(b => b.disabled = true);

    // Vérifier si toutes les réponses choisies sont correctes
    const isAllCorrect = selectedIndices.length === questionObj.correctAnswers.length &&
                          selectedIndices.every(val => questionObj.correctAnswers.includes(val));

    // Coloriage dynamique basé sur les index réels
    optionButtons.forEach((btn, idx) => {
        if (questionObj.correctAnswers.includes(idx)) {
            btn.classList.add('correct'); // La bonne réponse s'affiche toujours en vert
        } else if (selectedIndices.includes(idx)) {
            btn.classList.add('wrong'); // Les choix faux de l'utilisateur s'affichent en rouge
        }
    });

    // Enregistrement de l'état
    userProgress[questionObj.id] = isAllCorrect ? 'correct' : 'wrong';
    
    // Affichage du bouton de progression
    btnNext.classList.remove('hidden');
}

// Logique pour les questions ouvertes (Option A)
function setupOpenInteractions(questionObj) {
    const btnValidateOpen = document.getElementById('btn-validate-open');
    const openInput = document.getElementById('open-input');
    const solutionContainer = document.getElementById('solution-container');
    const btnJuste = document.getElementById('eval-juste');
    const btnFaux = document.getElementById('eval-faux');

    btnValidateOpen.addEventListener('click', () => {
        if (!openInput.value.trim()) {
            alert("Veuillez saisir une réponse avant de valider.");
            return;
        }
        openInput.disabled = true;
        btnValidateOpen.classList.add('hidden');
        solutionContainer.classList.remove('hidden');
    });

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
    // Calcul des statistiques sur le pool de la session actuelle
    let sessionCorrect = 0;
    let sessionWrong = 0;
    
    currentQuestionsList.forEach(q => {
        if (userProgress[q.id] === 'correct') sessionCorrect++;
        if (userProgress[q.id] === 'wrong') sessionWrong++;
    });

    progressText.innerText = "Session terminée !";
    progressFill.style.width = "100%";

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

    // Événements de l'écran final
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

// 3. Filtrage ciblé depuis l'écran de fin (uniquement les erreurs de la session)
function filterToErrorsOnly() {
    const filtered = quizData.filter(q => userProgress[q.id] === 'wrong');
    
    // On remet ces erreurs à l'état non répondu pour le nouveau cycle
    filtered.forEach(q => {
        userProgress[q.id] = 'unanswered';
    });

    currentQuestionsList = filtered;
    currentQuestionIndex = 0;
    renderCurrentQuestion();
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