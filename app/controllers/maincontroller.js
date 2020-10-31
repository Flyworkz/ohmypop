const mainController = {
    notFound: (req, res) => {
        res.status(400).json({
            message: "Cette route n'existe pas !",
            success: false,
            data: false
        });
    }
}

module.exports = mainController;