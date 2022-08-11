function creationTableau() {
  let Ajouter = document.querySelector("#add");
  let liste = document.querySelector("#liste");
  // let formulaire = document.querySelector("#form");

  let famillyName = document.querySelector("#name");
  let firstName = document.querySelector("#firstname");
  let mail = document.querySelector("#mail");
  let phoneNumber = document.querySelector("#phone");
  let RaisonSociale = document.querySelector("#compagnyName");
  let adresse = document.querySelector("#adresse");
  let tableau1 = []; //arrayContact pr correction

  //recup local storage

  // Recup input

  Ajouter.addEventListener("click", function () {
    // Creation objet
    let coordonnees = {
      nom: famillyName.value,
      prenom: firstName.value,
      mail: mail.value,
      telephone: phoneNumber.value,
      adresse: adresse.value,
      entreprise: RaisonSociale.value,
      direNom: function () {
        return `Je m'appel ${this.prenom} ${this.nom} mon email: ${this.mail} mon numéro de téléphone ${this.telephone}`;
      },
      //  AMODIFIER AVEC LES PARA = NEW
    };
    conditions();
    CarnetPerso();
    CarnetPro();

    function conditions() {
      let coorGenerales;
      let choix;
      let Pro;
      let Perso;

      if (choix == Pro) {
        coorGenerales = new CarnetPro(
          nom,
          prenom,
          mail,
          telephone,
          RaisonSociale
        );
      } else if (choix == Perso) {
        coorGenerales = new CarnetPerso(nom, prenom, mail, telephone, adresse);
      } else {
        alert("annuler");
      }
    }

    let listeDeContact = document.createElement("li");
    listeDeContact.innerText = coordonnees.direNom();
    liste.appendChild(listeDeContact);
    coordonnees.value = "";

    let formData = document.querySelector("#form");

    formData.addEventListener("submit", function (ev) {
      ev.preventDefault();
    });

    tableau1.push(coordonnees);

    let jsonArray = JSON.stringify(liste);
    localStorage.setItem(tableau1, jsonArray);

    showContact();
  });

  function showContact() {
    // Création de la fonction show contact avec la méthode forEach
    // Création d'une variable content
    let content = "";
    tableau1.forEach(function (element) {
      // Ajout à la variable content de mon élément
      content += `<p>${element.direNom()} 
    <button class="deleteButton">Supprimer</button> <button class="modif">Modifier</button></p> <button class="save">Sauvegarder</button></p>`;
    });
    liste.innerHTML = content;
  }
  let deleteButtonArray = document.querySelectorAll(".deleteButton");
  deleteButtonArray.forEach(function (button, index) {
    tableau1.splice(index, 1);
    button.addEventListener("click", function () {
      showContact();
    });
  });

  let ContactPro = new CarnetPro(
    famillyName.value,
    firstName.value,
    mail.value,
    phoneNumber.value,
    RaisonSociale.value
  );
  let contactPerso = new CarnetPerso(
    famillyName.value,
    firstName.value,
    mail.value,
    phoneNumber.value,
    adresse.value
  );
  console.log(ContactPro);
  console.log(contactPerso);
}
creationTableau();

CarnetGeneral();

function CarnetGeneral(nom, prenom, mail, telephone) {
  this.nom = nom;
  this.prenom = prenom;
  this.mail = mail;
  this.telephone = telephone;
}

function CarnetPro(nom, prenom, mail, telephone, RaisonSociale) {
  CarnetGeneral.call(this, nom, prenom, mail, telephone);
  this.compagnyName = RaisonSociale;
}

function CarnetPerso(nom, prenom, mail, telephone, adresse) {
  CarnetGeneral.call(this, nom, prenom, mail, telephone);
  this.adressePostale = adresse;
}
//   sauvegarder.addEventListener("click", function (coordonnees) {
//     p = document.createElement("p");
//     localStorage.setItem("lat", lat);
//     localStorage.setItem("long", long);
//     let latsave = localStorage.getItem("lat");
//     let longsave = localStorage.getItem("long");
