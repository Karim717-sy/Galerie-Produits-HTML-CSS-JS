/* =========================================
   1. RÉCUPÉRATION DES ÉLÉMENTS HTML
========================================= */

// Bouton de changement de thème
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const themeLabel = document.querySelector("#theme-label");

// Fenêtre de détails
const productDialog = document.querySelector("#product-dialog");
const dialogClose = document.querySelector("#dialog-close");
const dialogUnderstood = document.querySelector("#dialog-understood");

// Éléments qui affichent les informations du produit
const dialogImage = document.querySelector("#dialog-image");
const dialogCategory = document.querySelector("#dialog-category");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
const dialogPriceValue = document.querySelector("#dialog-price-value");

// Boutons de découverte
const discoverButtons = document.querySelectorAll(".discover-button");


/* =========================================
   2. DONNÉES DES PRODUITS
========================================= */

// Les informations sont regroupées ici pour
// pouvoir facilement modifier les produits.

const products = {
    headphones: {
        name: "Casque audio sans fil",
        category: "AUDIO",
        description:
            "Profitez d'un son immersif et d'un confort exceptionnel " +
            "pour écouter vos morceaux préférés. Son design moderne " +
            "en fait un compagnon idéal pour vos déplacements, " +
            "vos moments de détente et vos loisirs.",

        price: 35000,

        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",

        alt: "Casque audio sans fil au design moderne"
    },

    smartwatch: {
        name: "Montre connectée",
        category: "CONNECTÉ",
        description:
            "Gardez un œil sur vos notifications et profitez " +
            "d'un accessoire élégant au quotidien. Une montre " +
            "au design moderne pour accompagner votre style " +
            "et faciliter vos activités.",

        price: 45000,

        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",

        alt: "Montre au design élégant avec bracelet moderne"
    },

    earbuds: {
        name: "Écouteurs Bluetooth",
        category: "BLUETOOTH",
        description:
            "Emportez votre musique partout avec des écouteurs " +
            "compacts et pratiques. Leur boîtier permet de les " +
            "ranger facilement et de les transporter au quotidien.",

        price: 18500,

        image:
            "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=85",

        alt:
            "Écouteurs sans fil accompagnés de leur boîtier de recharge"
    }
};


/* =========================================
   3. GESTION DU THÈME
========================================= */

// Applique le thème choisi et actualise le bouton.

function applyTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark-theme", isDark);

    themeIcon.textContent = isDark ? "☀" : "☾";

    themeLabel.textContent = isDark
        ? "Mode clair"
        : "Mode sombre";

    themeToggle.setAttribute(
        "aria-label",
        isDark
            ? "Activer le mode clair"
            : "Activer le mode sombre"
    );

    themeToggle.setAttribute(
        "aria-pressed",
        String(isDark)
    );
}


// Au démarrage, on récupère le thème sauvegardé.
// Si aucun thème n'est enregistré, on utilise le mode clair.

let savedTheme = "light";

try {
    const storedTheme = localStorage.getItem("techstore-theme");

    if (storedTheme === "dark" || storedTheme === "light") {
        savedTheme = storedTheme;
    }
} catch (error) {
    // Le site reste utilisable même si le stockage est bloqué.
}

applyTheme(savedTheme);


// Au clic, on inverse le thème et on mémorise le choix.

themeToggle.addEventListener("click", function () {
    const isDark = document.body.classList.contains("dark-theme");

    const newTheme = isDark ? "light" : "dark";

    applyTheme(newTheme);

    try {
        localStorage.setItem("techstore-theme", newTheme);
    } catch (error) {
        // Le changement de thème fonctionne même sans sauvegarde.
    }
});


/* =========================================
   4. FORMATAGE DES PRIX
========================================= */

// Exemple : 35000 devient 35 000.

function formatPrice(price) {
    return new Intl.NumberFormat("fr-FR").format(price);
}


/* =========================================
   5. OUVERTURE DES DÉTAILS D'UN PRODUIT
========================================= */

// Chaque bouton possède un attribut data-product.
// Cet attribut permet de retrouver le bon produit.

discoverButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const productId = button.dataset.product;

        const product = products[productId];

        // On vérifie que le produit existe.
        if (!product) {
            return;
        }

        // On remplit la fenêtre avec ses informations.
        dialogImage.src = product.image;
        dialogImage.alt = product.alt;

        dialogCategory.textContent = product.category;
        dialogTitle.textContent = product.name;
        dialogDescription.textContent = product.description;

        dialogPriceValue.textContent = formatPrice(product.price);

        // On ouvre la fenêtre de manière accessible.
        if (!productDialog.open) {
            productDialog.showModal();
        }
    });
});


/* =========================================
   6. FERMETURE DE LA FENÊTRE
========================================= */

// Fermeture avec le bouton en haut à droite.

dialogClose.addEventListener("click", function () {
    productDialog.close();
});


// Fermeture avec le bouton situé en bas.

dialogUnderstood.addEventListener("click", function () {
    productDialog.close();
});


// Fermeture en cliquant sur l'arrière-plan.

productDialog.addEventListener("click", function (event) {
    if (event.target === productDialog) {
        productDialog.close();
    }
});

// La touche Échap ferme également la fenêtre.
// Ce comportement est fourni nativement par <dialog>.


/* =========================================
   7. ANNÉE AUTOMATIQUE DANS LE PIED DE PAGE
========================================= */

const currentYear = document.querySelector("#current-year");

currentYear.textContent = new Date().getFullYear();