import { afficherEcranSelection,recommenceBtn,afficherEcranFinal,stopBtn,reponseInput,recupererInput,motNeerlandais ,reponseForm,globalBtn,ecranQuiz,afficherQuizGlobal,afficherBtnChapitre, afficherQuestion } from "/js/ui.js";
import fetchElement from "/js/api.js"; 
import { afficherScoreFinal,afficherScore,supprimerFeedback,nextBtn,verifInputVide, afficherFeedback, afficherEchecMessage, afficherSucessMessage } from "/js/ui.js";
import { incrementerQuestionCompteur, questionCompteur,definirMotActuelFrancais, piocherMotSuivant, initMotsRestants, definirMotActuelNeerlandais, motActuelFrancais, verifInputCorrect, incrementerScore, motsRestants } from "/js/utils.js";
import { scoreCompteur } from "/js/utils.js";
let donnees;
document.addEventListener("DOMContentLoaded", async () => {
    donnees = await fetchElement();
    afficherBtnChapitre(donnees);
    
});
globalBtn.addEventListener("click", () => {
    afficherQuizGlobal();
    const newMotsRestants = initMotsRestants(donnees);
    const result = piocherMotSuivant(newMotsRestants);
    afficherQuestion(result);
    afficherScore(motsRestants.length);
});
reponseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputRecup = recupererInput();
    const estVide = verifInputVide(inputRecup);
    if (!estVide)  {
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
    incrementerQuestionCompteur();
    reponseInput.value = "";
    supprimerFeedback();
    const result = piocherMotSuivant(motsRestants);
    afficherQuestion(result);
    afficherScore(motsRestants.length);
});
stopBtn.addEventListener("click", () => {
    afficherEcranFinal();
    afficherScoreFinal(scoreCompteur, questionCompteur);
})
recommenceBtn.addEventListener("click", () => {
    afficherEcranSelection();
})