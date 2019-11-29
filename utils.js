const axios = require('axios');

const CARD_WIDTH = 750;
const CARD_HEIGHT = 1050;

function getCardUrl(searchText) {
	const fileName = searchText.replace(/[^a-z0-9+]+/gi, '').toLowerCase();
    return `${process.env.CARDS_URL}/${fileName}.png`;
}

async function getCardFromSearch(searchText) {
    const cardUrl = getCardUrl(searchText);
    try {
        await axios.get(cardUrl);
    } catch (error) {
        return '';
    }
    return cardUrl;
}

module.exports = {
    CARD_WIDTH,
    CARD_HEIGHT,
    getCardUrl,
    getCardFromSearch
};
