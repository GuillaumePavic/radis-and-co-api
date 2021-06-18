module.exports = (res) => {
    res.status(404).json({message: 'Erreur 404 : la ressource demandée n\existe pas.'});
}