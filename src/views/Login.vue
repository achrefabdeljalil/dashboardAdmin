<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="10" sm="10" md="6">
            <v-card class="elevation-12">
              <v-progress-linear :active="loadActive" indeterminate color="blue"></v-progress-linear>
              <v-card-text>
                <v-row align="center">
                  <v-col cols="10" offset="1" md="6" offset-md="3" sm="8" offset-sm="1">
                    <v-img
                      src="https://firebasestorage.googleapis.com/v0/b/wassalli-84ff0.appspot.com/o/images%2Ffavicon.png?alt=media&token=d0322022-2aa1-4881-990c-cadb356e57e1"
                    ></v-img>
                  </v-col>
                </v-row>
                <v-form ref="form" class="mt-sm-12 px-sm-4">
                  <v-text-field
                    v-model="email"
                    dense
                    outlined
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    dense
                    outlined
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="showPassword ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  class="px-sm-2 me-sm-6 mb-sm-2"
                  elevation="2"
                  color="primary"
                  @click="login"
                >Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      loadActive: false,
      password: "20202020",
      showPassword: false,
      email: "admin@admin.com",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    login() {
      this.loadActive = true;
      //var instance = this;
      // console.log(this);
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("home");
        })
        .catch(() => {
          alert("please be sure that your email and password are true");
          this.reset();
          this.loadActive = false;
        });
    }
  }
};
</script>
