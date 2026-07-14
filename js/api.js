export default async function fetchElement () {

    try {
        const data = await fetch("/data/data.json");
        const response = await data.json();
        return response;
    }
    catch(erreur) {
        console.log(`Oups, il y a eu une erreur: ${erreur}`);
    }
};