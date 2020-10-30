const mainController = {
    getFront: (req, res) => {
        res.sendFile(`../../dist/index.html`);
    }
}

module.exports = mainController;