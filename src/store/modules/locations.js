import {
  app
} from "../../firebaseConfig";
const state = {
  locations: []
};
const getters = {
  allUsers: state => {
    return state.locations;
  }
};
const actions = {
  async getFirebaseUsers() {
    let ref = app.database().ref("Users");
    ref.on("value", snapshot => {
      state.locations = [];
      snapshot.forEach(snap => {
        console.log(snap.val());
        if (snap.val().typeUser == "Transporteur") {
          state.locations.push({
            key: snap.key,
            name: snap.val().First_Name_LastName,
            email: snap.val().Email,
            phone: snap.val().numeroTelephone,
            permis: snap.val().TypePermis,
            car: snap.val().TypeVehicule,
            img: snap.val().ImageUrl,
            adresse: snap.val().Adresse,
            status: snap.val().statusCompte
          });
        }
      });
    })

  }
};
const mutations = {};

export default {
  state,
  mutations,
  actions,
  getters
};