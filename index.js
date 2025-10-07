const express = require("express");
const cors = require("cors");
const app = express();
global.__basedir = __dirname;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static("public"));

const db = require("./app/models");
const Role = db.role;
const Categorie = db.categorie;
const dbConfig = require("./app/config/db.config");
db.mongoose
  // .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}?retryWrites=true&w=majority`, {
  .connect( dbConfig.MONGO_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    } )
  .then( () =>
  {
    console.log( "Successfully connected to MongoDB." );
    initial();
    } )
  .catch( ( err ) =>
  {
    console.error( "Connection error", err );
    process.exit();
    } );

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "moderator",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'moderator' to roles collection");
            });
            new Role({
                name: "admin",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to role collection");
            });
        }
    });
    Categorie.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Categorie({
                name: "Jupe",
                picturepath: "/assets/img/jupe.jpg",
                defaultFields: [{
                        name: "tourDeTaille",
                        label: "Tour de taille (cm) *",
                        type: "number",
                        select: false,
                        option: []
                    },
                    {
                        name: "tourDeBassin",
                        label: "Tour de bassin (cm) *",
                        type: "number",
                        select: false,
                        option: []
                    },
                    {
                        name: "longueurBassin",
                        label: "Longueur du bassin (cm) *",
                        type: "number",
                        select: false,
                        option: []
                    },
                    {
                        name: "longueurJupe",
                        label: "Longueur de la Jupe (cm) *",
                        type: "number",
                        select: false,
                        option: []
                    }
                ],
                parent: []
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'Jupe' to categorie collection");
            });
            new Categorie({
                name: "Veste",
                picturepath: "/assets/img/veste.jpg",
                defaultFields: [{ name: 'tourDePoitrine', label: 'Tour de poitrine (cm) *', type: 'number', select: false, option: [] },
                    { name: 'longueurMain', label: 'Longueur Main (cm) *', type: 'number', select: false, option: [] },
                    { name: 'tourDeHanche', label: 'Tour de Hanche (cm) *', type: 'number', select: false, option: [] },
                    { name: 'nombreBouton', label: 'Nombre de bouton *', type: 'number', select: true, option: [2, 3] }
                ],
                parent: []
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'Veste' to categorie collection");
            });
            new Categorie({
                name: "Haut",
                picturepath: "/assets/img/haut.png",
                defaultFields: [{ name: 'longueurEpaule', label: 'Longueur Epaule Haut (cm) *', type: 'number', select: false, option: [] },
                    { name: 'longueurEpauleDs', label: 'Longueur Epaule Dos (cm) *', type: 'number', select: false, option: [] },
                    { name: 'longueurEpauleDv', label: 'Longueur Epaule Devant (cm) *', type: 'number', select: false, option: [] },
                    { name: 'tourDePoitrine', label: 'Tour de poitrine (cm) *', type: 'number', select: false, option: [] },
                    { name: 'tourDeHanche', label: 'Tour de Hanche (cm) *', type: 'number', select: false, option: [] },
                    { name: 'longueurChemise', label: 'Longueur chemise (cm) *', type: 'number', select: false, option: [] },
                    { name: 'longueurDosHanche', label: 'Longueur Dos Hanche (cm) *', type: 'number', select: false, option: [] },
                    { name: 'DifferenceSeinHanche', label: 'Difference Sein Hanche (cm) *', type: 'number', select: false, option: [] },
                    { name: 'HauteurSein', label: 'Hauteur Sein (cm) *', type: 'number', select: false, option: [] },
                    { name: 'DifferenceSein', label: 'Difference Sein (cm) *', type: 'number', select: false, option: [] }
                ],
                parent: []
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'Haut' to categorie collection");
            });
            new Categorie({
                name: "Pantalon",
                picturepath: "/assets/img/pantalon.jpg",
                defaultFields: [{ name: 'tourDeTaille', label: 'Tour de taille (cm) *', type: 'number', select: false, option: [] },
                    { name: 'tourDeBassin', label: 'Tour de bassin (cm) *', type: 'number', select: false, option: [] },
                    { name: 'longueurBassin', label: 'Longueur bassin(cm) *', type: 'number', select: false, option: [] },
                    { name: 'longueurPantalon', label: 'Longueur Pantalon (cm) *', type: 'number', select: false, option: [] },
                    { name: 'tourDePied', label: 'Tour du Pied (cm) *', type: 'number', select: false, option: [] }
                ],
                parent: []
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'Pantalon' to categorie collection");
            });
        }
    });
}

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/profil/downloadFile.routes")(app);
require("./app/routes/history.routes")(app);
require("./app/routes/promo.routes")(app);
require('./app/routes/pack.routes')(app);
require('./app/routes/achat.routes')(app);
require('./app/routes/categorie.routes')(app);
require('./app/routes/produit.routes')(app);
require('./app/routes/catalogue.route')(app);
require('./app/routes/payment.route')(app);
require('./app/routes/mail.route')(app);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to zaitrako.mg application." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${ PORT }.`);
});
