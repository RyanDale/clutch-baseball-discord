function getCardUrl(searchText) {
	const fileName = searchText.replace(/[^a-z0-9+]+/gi, '').toLowerCase();
	return `${process.env.CARDS_URL}/${fileName}.png`;
}

function getCardFromSearch(searchText) {
    const cardUrl = getCardUrl(searchText);
    try {
        await axios.get(cardUrl);
        return cardUrl;
    } catch (error) {
        return '';
    }
}

const CARD_WIDTH = 750;
const CARD_HEIGHT = 1050;

module.exports = {
    getCardUrl,
    getCardFromSearch,
    CARD_WIDTH,
    CARD_HEIGHT
};
