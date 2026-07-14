import fetchElement  from "/js/api.js";
import {scoreCompteur} from "/js/utils.js";

export const globalBtn = document.getElementById("bouton-dossier-complet");
const chapitresList = document.getElementById("liste-chapitres");
export const reponseInput = document.getElementById("champ-reponse");
export const ecranQuiz = document.getElementById("ecran-quiz");
const ecranSelection = document.getElementById("ecran-selection");
export const motNeerlandais = document.getElementById("mot-neerlandais");
export const reponseForm = document.getElementById("formulaire-reponse");
const feedBackSection = document.getElementById("zone-feedback");
const reponseMessage = document.getElementById("reponse-message");
const reponseTampon = document.getElementById("tampon");
export const nextBtn = document.getElementById("bouton-suivant");
const scoreElement = document.getElementById("compteur-score");
export const stopBtn = document.getElementById("bouton-arreter");
const ecranFin = document.getElementById("ecran-fin");
const scoreFinalElement = document.getElementById("score-final");
const nbQuestionsFinalElement = document.getElementById("nb-questions-final");
export const recommenceBtn = document.getElementById("bouton-recommencer")

function creerBtnChapitre (chapitreNumero, chapitreName) {
    const chapBtn = document.createElement("button");
    chapBtn.type = "button";
    chapBtn.classList.add("onglet");
    chapBtn.setAttribute("data-chapitre", chapitreNumero);
    const chapSpan = document.createElement("span");
    chapSpan.classList.add("onglet_numero");
    chapSpan.textContent = chapitreNumero;
    const chapSpanLibelle = document.createElement("span");
    chapSpanLibelle.classList.add("onglet_libelle");
    chapSpanLibelle.textContent = chapitreName;
    chapBtn.appendChild(chapSpan);
    chapBtn.appendChild(chapSpanLibelle);
    chapBtn.addEventListener("click", () => {
        chargerQuizChap();
    })
    return chapBtn;
};

export async function afficherBtnChapitre (valueFetch) {
    const chapitresMap = new Map(valueFetch.map(item => [item.numeroChapitre, item.libelleChapitre]));
    const tableauReponseUnique = Array.from(chapitresMap, ([numeroChapitre, libelleChapitre]) => ({ numeroChapitre, libelleChapitre }));
    tableauReponseUnique.forEach(tr => {
        chapitresList.appendChild(creerBtnChapitre(tr.numeroChapitre, tr.libelleChapitre));
    })

}
export function recupererInput () {
    const inputRecup = reponseInput.value.toLowerCase().trim();
    return inputRecup;
}
export function verifInputVide (inputToVerif) {
    if (inputToVerif === "") {
        return true;
    } else {
        return false;
    }
};
function afficherEcran () {
    ecranQuiz.classList.remove("ecran--cachee");
    ecranSelection.classList.add("ecran--cachee");

};
export function afficherEcranSelection () {
    ecranQuiz.classList.add("ecran--cachee");
    ecranFin.classList.add("ecran--cachee");
    ecranSelection.classList.remove("ecran--cachee")
}
export function afficherEcranFinal () {
    ecranQuiz.classList.add("ecran--cachee");
    ecranFin.classList.remove("ecran--cachee");
}
export function afficherScoreFinal (scoreFinal, questionFinal) {
    scoreFinalElement.textContent = scoreFinal;
    nbQuestionsFinalElement.textContent = questionFinal;
}
export function afficherQuizGlobal () {
    afficherEcran();
}
export function afficherQuizChap () {
    afficherEcran();
}
export function afficherQuestion (wordToTranslate) {
    motNeerlandais.textContent = wordToTranslate[0].versionNL;
}
export function afficherFeedback () {
    feedBackSection.classList.remove("feedback--cachee");
}
export function supprimerFeedback () {
    feedBackSection.classList.add("feedback--cachee");
}
export function afficherScore (questionLength) {
    scoreElement.textContent = `Score : ${scoreCompteur} / ${questionLength}`;
    return scoreElement;
}
export function afficherSucessMessage () {
    reponseTampon.textContent = "VALIDÉ";
    reponseMessage.textContent = "Félicitation, c'est une bonne réponse";
    return reponseMessage;
}
export function afficherEchecMessage (bonneReponse) {
    reponseTampon.textContent = "RATÉ";
    reponseMessage.textContent = `Dommage, la bonne réponse était: ${bonneReponse}`;
    return reponseMessage;
}