const mainController = {
    notFound: (req, res) => {
        res.status(404).json('nope');
    }
}

module.exports = mainController;