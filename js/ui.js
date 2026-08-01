import { initMotsRestants, piocherMotSuivant, initTableauFeedback } from "/js/utils.js";
import {scoreCompteur, questionCompteur, tableauFeedback} from "/js/utils.js";

export const globalBtn = document.getElementById("bouton-dossier-complet");
const chapitresList = document.getElementById("liste-chapitres");
export const reponseInput = document.getElementById("champ-reponse");
export const ecranQuiz = document.getElementById("ecran-quiz");
const ecranSelection = document.getElementById("ecran-selection");
const divFiche = document.getElementById("fiche");
export const motNeerlandais = document.getElementById("mot-neerlandais");
export const reponseForm = document.getElementById("formulaire-reponse");
const feedBackSection = document.getElementById("zone-feedback");
const reponseAppreciation = document.getElementById("appreciation");
const motTraduit = document.getElementById("mot-traduit");
const reponseUilisateur = document.getElementById("reponse-utilisateur");
export const reponseBtn = document.getElementById("bouton-verifier");
export const nextBtn = document.getElementById("bouton-suivant");
const scoreElement = document.getElementById("compteur-score");
export const stopBtn = document.getElementById("bouton-arreter");
const ecranFin = document.getElementById("ecran-fin");
const scoreFinalElement = document.getElementById("score-final");
const nbQuestionsFinalElement = document.getElementById("nb-questions-final");
export const recommenceBtn = document.getElementById("bouton-recommencer");
const listeHistorique = document.getElementById("liste-historique");

function creerBtnChapitre (chapitreNumero, chapitreName,initialDonnees) {
    const chapBtn = document.createElement("button");
    chapBtn.type = "button";
    chapBtn.classList.add("onglet");
    chapBtn.setAttribute("data-chapitre", chapitreNumero);
    const chapSpan = document.createElement("span");
    chapSpan.classList.add("onglet__numero");
    chapSpan.textContent = chapitreNumero;
    const chapSpanLibelle = document.createElement("span");
    chapSpanLibelle.classList.add("onglet__libelle");
    chapSpanLibelle.textContent = chapitreName;
    chapBtn.appendChild(chapSpan);
    chapBtn.appendChild(chapSpanLibelle);
    chapBtn.addEventListener("click", async (event) => {
        afficherQuizChap()
        const cibleEvent = event.currentTarget;
        const idChapCible = Number(cibleEvent.getAttribute("data-chapitre"));
        const newDonnees = filtrerChap(idChapCible, initialDonnees);
        initMotsRestants(newDonnees);
        initTableauFeedback();
        const resultPioche = piocherMotSuivant();
        console.log(resultPioche);
        afficherQuestion(resultPioche);
        afficherScore();
    })
    return chapBtn;
};
export function filtrerChap (chapId, tableauSansFiltre) {
    const donneesFiltre = tableauSansFiltre.filter(tsf => tsf.numeroChapitre === chapId)
    return donneesFiltre;
}

export async function afficherBtnChapitre (valueFetch) {
    const chapitresMap = new Map(valueFetch.map(item => [item.numeroChapitre, item.libelleChapitre]));
    const tableauReponseUnique = Array.from(chapitresMap, ([numeroChapitre, libelleChapitre]) => ({ numeroChapitre, libelleChapitre }));
    tableauReponseUnique.forEach(tr => {
        chapitresList.appendChild(creerBtnChapitre(tr.numeroChapitre, tr.libelleChapitre, valueFetch));
    })

}
export function recupererInput () {
    const inputRecup = reponseInput.value.toLowerCase().trim().replace(/\u2019/g, "'");
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
    supprimerFeedback();
}
export function afficherQuizChap () {
    afficherEcran();
    supprimerFeedback();
}
export function afficherQuestion (wordToTranslate) {
    motNeerlandais.textContent = wordToTranslate[0].versionNL;
}
export function afficherFeedback () {
    feedBackSection.classList.remove("feedback--cachee");
    divFiche.style.display = "none";
}
export function supprimerFeedback () {
    feedBackSection.classList.add("feedback--cachee");
    divFiche.style.display = "block";
    reponseAppreciation.classList.remove("tampon--succes");
    reponseAppreciation.classList.remove("tampon--echec")
}
export function afficherScore () {
    scoreElement.textContent = `Score : ${scoreCompteur} / ${questionCompteur}`;
    return scoreElement;
}
export function afficherSucessMessage (estCorrect, reponseUser) {
    reponseAppreciation.textContent = "Correct";
    reponseAppreciation.classList.add("tampon--succes")
    motTraduit.textContent = estCorrect;
    reponseUilisateur.textContent = reponseUser;
    return reponseAppreciation;
}
export function afficherEchecMessage (estIncorrect, reponseUser) {
    reponseAppreciation.textContent = "Révisez celui-ci !";
    reponseAppreciation.classList.add("tampon--echec")
    motTraduit.textContent = estIncorrect;
    reponseUilisateur.textContent = reponseUser;
    return reponseAppreciation;
};
export function creerTableauFeedback (elFeedback) {
    const div = document.createElement("div");
    div.classList.add("recapitulatif__ligne");
    const idEl = document.createElement("p");
    const questionEl = document.createElement("p");
    questionEl.classList.add("recapitulatif__mot");
    const reponseUserEl = document.createElement("p");
    reponseUserEl.classList.add("recapitulatif__reponse-user");
    const reponseCorrectEl = document.createElement("p");
    reponseCorrectEl.classList.add("recapitulatif__reponse-correcte");
    if (elFeedback.estCorrecte === false) {
        div.classList.add("recapitulatif__ligne--echec");
    };
    idEl.textContent = elFeedback.id;
    questionEl.textContent = elFeedback.question;
    reponseUserEl.textContent = elFeedback.reponseUser;
    reponseCorrectEl.textContent = elFeedback.reponseCorrect;
    div.appendChild(idEl);
    div.appendChild(questionEl);
    div.appendChild(reponseUserEl);
    div.appendChild(reponseCorrectEl);
    return div;
};

export function afficherTableauFeedback (tableauAffiche) {
    tableauAffiche.forEach(t => {
        listeHistorique.appendChild(creerTableauFeedback(t));
    });
};