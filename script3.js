function creationTableau() {
  let liste = document.querySelector("#liste");
  let famillyName = document.querySelector("#name");
  let firstName = document.querySelector("#firstname");
  let mail = document.querySelector("#mail");
  let phoneNumber = document.querySelector("#phone");
  let RaisonSociale = document.querySelector("#compagnyName");
  let adresse = document.querySelector("#adresse");
  let compagnyName = document.querySelector("#compagnyName");
  let persoPro = document.querySelector(".persoPro");
  let tableau1 = []; //arrayContact pr correction

  // Récupération des élément pour le filtre
  let filtreInput = document.querySelector(".filtreInput");
  let filtreButton = document.querySelector(".filtreButton");
  let renderFiltre = document.querySelector(".renderFiltre");

  // Recup input

  let coorGenerales;
  let choix;
  let Pro;
  let Perso;
  let formData = document.querySelector("#form");

  formData.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (choix == Pro) {
      //création objet
      coorGenerales = new CarnetPro(
        famillyName.value,
        firstName.value,
        mail.value,
        phoneNumber.value,
        RaisonSociale.value
      );
    } else if (choix == Perso) {
      coorGenerales = new CarnetPerso(
        famillyName.value, //(.value si input et .get formulaire)
        firstName.value,
        mail.value,
        phoneNumber.value,
        adresse.value
      );
    } else {
      alert("annuler");
    }
    tableau1.push(coorGenerales); //pusher objet

    let jsonArray = JSON.stringify(liste);
    localStorage.setItem(tableau1, jsonArray); //enregistrer objet
    form.reset();
    showContact(formData); //Appel de la fonction dans laquelle est l'objet
  });

  function showContact() {
    // Création de la fonction show contact avec la méthode forEach
    // Création d'une variable content
    let content = "";
    tableau1.forEach(function (element) {
      // Ajout à la variable content de mon élément
      content += `<p>${element.nom} 
    <button class="deleteButton">Supprimer</button> <button class="modif">Modifier</button></p> <button class="save">Sauvegarder</button></p>`;
    });
    liste.innerHTML = content;

    let deleteButtonArray = document.querySelectorAll(".deleteButton");
    deleteButtonArray.forEach(function (button, index) {
      button.addEventListener("click", function () {
        tableau1.splice(index, 1);
      });
    });
  }
  showContact();

  /*
   * PARTIE FILTRE
   */
  filtreButton.addEventListener("click", function () {
    // FIltrer notre tableau
    let filterArray = tableau1.filter((element) => {
      return (
        element.prenom == filtreInput.value ||
        element.nom == filtreInput.value ||
        element.mail == filtreInput.value ||
        element.type == filtreInput.value
      );
    });

    if (!filterArray.length) {
      alert("Aucun filtre trouvé");
    } else {
      showFilter(filterArray);
    }
  });

  function showFilter(filterArray) {
    let filterContent = "";
    filterArray.forEach((filter) => {
      filterContent += `<p>${filter.nom} ${filter.prenom}</p>`;
    });
    renderFiltre.innerHTML = filterContent;
  }

  // Déclenchement de l'event sur notre formulaire au submit

  persoPro.addEventListener("change", function () {
    if (persoPro.value == "perso") {
      compagnyName.style.display = "none";
      adresse.style.display = "";
    } else {
      compagnyName.style.display = "";
      adresse.style.display = "none";
    }
  });
}

creationTableau();

class CarnetGeneral {
  constructor(nom, prenom, mail, telephone) {
    this.nom = nom;
    this.prenom = prenom;
    this.mail = mail;
    this.telephone = telephone;
  }
}
class CarnetPro extends CarnetGeneral {
  constructor(nom, prenom, mail, telephone, RaisonSociale) {
    super(nom, prenom, mail, telephone);
    this.RaisonSociale = RaisonSociale;
    this.type = "nom entreprise";
  }
}

class CarnetPerso extends CarnetGeneral {
  constructor(nom, prenom, mail, telephone, adresse) {
    super(nom, prenom, mail, telephone);
    this.RaisonSociale = adresse;
  }
}
