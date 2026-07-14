import fetchElement from "/js/api.js";
export let scoreCompteur = 0;
export let questionCompteur = 0;
export let motsRestants;
export let motActuelNeerlandais;
export let motActuelFrancais;

export function incrementerScore() {
    scoreCompteur += 1;
    return scoreCompteur;
};
export function incrementerQuestionCompteur () {
    questionCompteur += 1;
    return questionCompteur;
}
export function initMotsRestants (tableauToSave) {
    motsRestants = [...tableauToSave];
    return motsRestants;
};
export function piocherMotSuivant () {
    const index = Math.floor(Math.random() * motsRestants.length);
    const motPioche = motsRestants.splice(index, 1);
    return motPioche;
};
export function definirMotActuelFrancais(mot) {
    motActuelFrancais = mot;
    return motActuelFrancais;
}
export function definirMotActuelNeerlandais(mot) {
    motActuelNeerlandais = mot;
    return motActuelNeerlandais;
}
export function verifInputCorrect (motFR, motNDLS, tableauMots) {
    const motRecherche = tableauMots.filter(tm => tm.versionNL === motNDLS).map(tm => tm.versionFR);
    let estCorrect;
    let bonneReponse;
    if (motFR === motRecherche[0]) {
        estCorrect = true;
        bonneReponse = motRecherche[0];
        return {estCorrect, bonneReponse};
    }
    else {
        estCorrect = false;
        bonneReponse = motRecherche[0];
        return {estCorrect, bonneReponse};
    }
}
