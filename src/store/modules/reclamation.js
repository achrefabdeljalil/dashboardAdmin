import {
  app
} from "../../firebaseConfig";
const state = {
  reclamations: []
};
const getters = {
  allClaims: state => {
    return state.reclamations;
  }
};
const actions = {
  async getFirebaseClaims() {
    let ref = app.database().ref("Claim");
    ref.on("value", snapshot => {
      state.reclamations = [];
      console.log(snapshot);
      snapshot.forEach(snap => {

        state.reclamations.push({
          key: snap.key,
          content: snap.val().Content,
          transpoter: snap.val().Uid_Transporteur,
          client: snap.val().Uid_client,
          seen: snap.val().seen
        });

        //this.markerFromFirebase.push({snap.val().latitude,snap.val().latitude });
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