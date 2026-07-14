import { reponseBtn,afficherEcranSelection,recommenceBtn,afficherEcranFinal,stopBtn,reponseInput,recupererInput,motNeerlandais ,reponseForm,globalBtn,ecranQuiz,afficherQuizGlobal,afficherBtnChapitre, afficherQuestion } from "/js/ui.js";
import fetchElement from "/js/api.js"; 
import { afficherScoreFinal,afficherScore,supprimerFeedback,nextBtn,verifInputVide, afficherFeedback, afficherEchecMessage, afficherSucessMessage } from "/js/ui.js";
import { returnInitialQuestionCompteur, returnInitialScore,incrementerQuestionCompteur, questionCompteur,definirMotActuelFrancais, piocherMotSuivant, initMotsRestants, definirMotActuelNeerlandais, verifInputCorrect, incrementerScore } from "/js/utils.js";
import { scoreCompteur, veriftableauVide } from "/js/utils.js";
let donnees;
document.addEventListener("DOMContentLoaded", async () => {
    donnees = await fetchElement();
    afficherBtnChapitre(donnees);
    
});
globalBtn.addEventListener("click", () => {
    afficherQuizGlobal();
    initMotsRestants(donnees);
    const result = piocherMotSuivant();
    afficherQuestion(result);
    afficherScore();
});
reponseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputRecup = recupererInput();
    const estVide = verifInputVide(inputRecup);
    if (!estVide)  {
        reponseBtn.disabled = true;
        const newMotActuelFr = definirMotActuelFrancais(inputRecup);
        const newMotActuelNdls = definirMotActuelNeerlandais(motNeerlandais.textContent);
        const {estCorrect, bonneReponse} = verifInputCorrect(newMotActuelFr, newMotActuelNdls, donnees);
        afficherFeedback();
        if (estCorrect) {
            afficherSucessMessage();
            incrementerScore();
        } else {
            afficherEchecMessage(bonneReponse);
        }

    }
});
nextBtn.addEventListener("click", () => {
    const tableauEstVide = veriftableauVide();
    if (!tableauEstVide) {
        incrementerQuestionCompteur();
        reponseInput.value = "";
        reponseBtn.disabled  = false;
        supprimerFeedback();
        const result = piocherMotSuivant();
        afficherQuestion(result);
        afficherScore();
    }
});
stopBtn.addEventListener("click", () => {
    afficherEcranFinal();
    afficherScoreFinal(scoreCompteur, questionCompteur);
})
recommenceBtn.addEventListener("click", () => {
    reponseInput.value = "";
    returnInitialScore();
    returnInitialQuestionCompteur();
    afficherEcranSelection();
})