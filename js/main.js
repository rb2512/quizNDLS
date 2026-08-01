import { reponseBtn,afficherEcranSelection,recommenceBtn,afficherEcranFinal,stopBtn,reponseInput,recupererInput,motNeerlandais ,reponseForm,globalBtn,afficherQuizGlobal,afficherBtnChapitre, afficherQuestion } from "/js/ui.js";
import fetchElement from "/js/api.js"; 
import { afficherScoreFinal,afficherScore,supprimerFeedback,nextBtn,verifInputVide, afficherFeedback, afficherEchecMessage, afficherSucessMessage, creerTableauFeedback } from "/js/ui.js";
import { returnInitialQuestionCompteur, returnInitialScore,incrementerQuestionCompteur, questionCompteur,definirMotActuelFrancais, piocherMotSuivant, initMotsRestants, definirMotActuelNeerlandais, verifInputCorrect, incrementerScore } from "/js/utils.js";
import { scoreCompteur, veriftableauVide, incrementerTableauFeedback, tableauFeedback, initTableauFeedback } from "/js/utils.js";
import { afficherTableauFeedback,listeHistorique } from "/js/ui.js";
let donnees;
document.addEventListener("DOMContentLoaded", async () => {
    donnees = await fetchElement();
    afficherBtnChapitre(donnees);
    
});
globalBtn.addEventListener("click", () => {
    afficherQuizGlobal();
    initMotsRestants(donnees);
    initTableauFeedback();
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
        incrementerTableauFeedback(newMotActuelNdls, inputRecup, bonneReponse, estCorrect);
        if (estCorrect) {
            afficherSucessMessage(bonneReponse, inputRecup);
            incrementerScore();
        } else {
            afficherEchecMessage(bonneReponse, inputRecup);
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
    afficherTableauFeedback(tableauFeedback);
})
recommenceBtn.addEventListener("click", () => {
    reponseBtn.disabled = false;
    reponseInput.value = "";
    returnInitialScore();
    returnInitialQuestionCompteur();
    initTableauFeedback();
    listeHistorique.innerHTML = "";
    afficherEcranSelection();
})