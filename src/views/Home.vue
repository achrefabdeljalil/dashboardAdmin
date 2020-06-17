<template>
  <v-app>
    <v-card color="grey lighten-4" tile>
      <v-toolbar>
        <v-spacer></v-spacer>
        <v-btn class="mr-sm-2" color="grey lighten-2" @click="showTabs('users')">All User</v-btn>

        <v-btn
          class="mr-sm-2"
          color="grey lighten-2"
          @click="showTabs('underRevision')"
        >Under Revision</v-btn>

        <v-btn class="mr-sm-2" color="grey lighten-2" @click="showTabs('claims')">Reclamation</v-btn>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text v-if="UserSelected">
        <v-simple-table :dense="dense" :fixed-header="fixedHeader" :height="height">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Email</th>
                <th class="text-left">Phone</th>
                <th class="text-left">license</th>
                <th class="text-left">Car Type</th>
                <th class="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in allUsers" :key="item.key">
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.permis }}</td>
                <td>{{ item.car }}</td>
                <td>
                  <v-btn
                    v-if="item.status == 'underRevision'|| item.status =='blocked'"
                    @click="editStatus(item.status,item.key)"
                  >Activer</v-btn>
                  <v-btn v-else @click="editStatus(item.status,item.key)">Block</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="height"
              class="mx-4"
              label="Height - px"
              max="500"
              min="1"
              step="1"
              style="width: 125px"
              type="number"
              @keydown="false"
            ></v-text-field>
          </v-col>
          <v-col cols="6" md="3">
            <v-switch v-model="dense" label="Toggle dense" class="mx-4"></v-switch>
          </v-col>
          <v-col cols="6" md="3">
            <v-switch v-model="fixedHeader" label="Toggle fixed-header" class="mx-4"></v-switch>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-if="UnderRevisionSelected">
        <v-simple-table :dense="dense" :fixed-header="fixedHeader" :height="height">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Email</th>
                <th class="text-left">Phone</th>
                <th class="text-left">license</th>
                <th class="text-left">Car Type</th>
                <th class="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in usersUnderRevision" :key="item.key">
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.permis }}</td>
                <td>{{ item.car }}</td>
                <td>
                  <v-btn @click="editStatus(item.status,item.key)">Activer</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="height"
              class="mx-4"
              label="Height - px"
              max="500"
              min="1"
              step="1"
              style="width: 125px"
              type="number"
              @keydown="false"
            ></v-text-field>
          </v-col>
          <v-col cols="6" md="3">
            <v-switch v-model="dense" label="Toggle dense" class="mx-4"></v-switch>
          </v-col>
          <v-col cols="6" md="3">
            <v-switch v-model="fixedHeader" label="Toggle fixed-header" class="mx-4"></v-switch>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-if="ClaimSelected">
        <v-simple-table :dense="dense" :fixed-header="fixedHeader" :height="height">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Content</th>
                <th class="text-left">Seen</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in allClaims" :key="item.key">
                <td>{{ item.content }}</td>
                <td>{{ item.seen }}</td>
                <td>
                  <v-btn
                    color="primary"
                    dark
                    @click.stop="getUser(item.transpoter)"
                  >Show Transporter</v-btn>
                </td>
              </tr>
              <v-dialog v-model="dialog" max-width="400">
                <v-card class="mx-auto" max-width="400">
                  <v-img class="white--text align-end" height="200px" :src="transporterInfo.img"></v-img>

                  <v-card-subtitle
                    class="pb-0 pt-2"
                  >{{ transporterInfo.email}} : {{ transporterInfo.phone}}</v-card-subtitle>

                  <v-card-text class="text--primary">
                    <div>{{ transporterInfo.name}}</div>

                    <div>{{ transporterInfo.adresse}}</div>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text @click="editStatus(tmpstatus,tmpkey)">Block</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </tbody>
          </template>
        </v-simple-table>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="height"
              class="mx-4"
              label="Height - px"
              max="500"
              min="1"
              step="1"
              style="width: 125px"
              type="number"
              @keydown="false"
            ></v-text-field>
          </v-col>
          <v-col cols="6" md="3">
            <v-switch v-model="dense" label="Toggle dense" class="mx-4"></v-switch>
          </v-col>
          <v-col cols="6" md="3">
            <v-switch v-model="fixedHeader" label="Toggle fixed-header" class="mx-4"></v-switch>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { app } from "../firebaseConfig";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      tmpkey: "",
      tmpstatus: "",
      userUnderRevision: {},
      transporterInfo: {},
      dialog: false,
      UserSelected: true,
      ClaimSelected: false,
      UnderRevisionSelected: false,
      dense: false,
      fixedHeader: false,
      height: 450
    };
  },
  methods: {
    editStatus(status, key) {
      this.dialog = false;
      if (status == "Active") {
        app
          .database()
          .ref("Users")
          .child(key)
          .on("value", snap => {
            let tmp = snap.val();
            tmp.statusCompte = "blocked";
            app
              .database()
              .ref("Users")
              .child(key)
              .set(tmp);
          });
      } else {
        app
          .database()
          .ref("Users")
          .child(key)
          .on("value", snap => {
            let tmp = snap.val();
            tmp.statusCompte = "Active";
            app
              .database()
              .ref("Users")
              .child(key)
              .set(tmp);
          });
      }
    },
    getUser(trans) {
      this.dialog = true;
      const resultat = this.allUsers.find(i => i.key == trans);
      console.log(resultat);
      this.transporterInfo.name = resultat.name;
      this.transporterInfo.permis = resultat.permis;
      this.transporterInfo.email = resultat.email;
      this.transporterInfo.phone = resultat.phone;
      this.transporterInfo.car = resultat.car;
      this.transporterInfo.status = resultat.status;
      this.transporterInfo.img = resultat.img;
      this.transporterInfo.adresse = resultat.adresse;
      this.tmpkey = resultat.key;
      this.tmpstatus = resultat.status;
    },
    ...mapActions(["getFirebaseUsers", "getFirebaseClaims"]),
    showTabs(tabs) {
      this.UserSelected = false;
      this.ClaimSelected = false;
      this.UnderRevisionSelected = false;
      if (tabs == "users") {
        this.UserSelected = true;
      } else if (tabs == "claims") {
        this.ClaimSelected = true;
      } else {
        this.UnderRevisionSelected = true;
      }
    }
  },
  created() {
    this.getFirebaseUsers();
    this.getFirebaseClaims();
  },
  computed: {
    ...mapGetters(["allUsers", "allClaims"]),
    usersUnderRevision: function() {
      return this.allUsers.filter(i => i.status === "underRevision");
    }
  }
};
</script>
