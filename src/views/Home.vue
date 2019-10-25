<template>
  <div class="home">
  	<HeaderComponent></HeaderComponent>
    <div class="content">
      <!-- MODAL -->
      <v-btn
        style="margin:10px"
        color="primary"
        dark
        @click.stop="dialog = true"
      >
        New Account
      </v-btn>
      <v-row justify="center">
        
        <v-dialog
          v-model="dialog"
          max-width="500"
        >
          <v-card style="padding:20px">
            <v-card-title class="headline">Create Account</v-card-title>

             <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="name"
                :counter="10"
                :rules="nameRules"
                label="First Name"
                required
              ></v-text-field>

              <v-text-field
                v-model="lastName"
                label="Last Name (opcional)"
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>

              <v-text-field
                v-model="avatarUrl"
                label="Avatar URL"
              ></v-text-field>

              <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
              ></v-checkbox>

              <v-btn
                style="color=black"
                :disabled="!valid"
                
                class="mr-4"
                @click="validate"
              >
                Validate
              </v-btn>

              <v-btn
                style="color:black"
                class="mr-4"
                @click="reset"
              >
                Reset Form
              </v-btn>

              <v-btn
                style="color:black"
                @click="resetValidation"
              >
                Reset Validation
              </v-btn>
            </v-form>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                style="color:black"
                color="green darken-1"
                text
                @click="dialog = false"
              >
                Disagree
              </v-btn>

              <v-btn
                color="green darken-1"
                text
                @click="agree()"
              >
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>      
      <h3 style="margin:10px">Account List</h3>  
    	<Table></Table>
      
    </div>
    <footerComponent>asd</footerComponent>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HeaderComponent from '../components/Header.vue'
import Table from '../components/Table.vue'
import footerComponent from '../components/Footer.vue'
// import newAccount from '../components/newAccount.vue'
import { mapActions } from 'vuex';
import axios from "axios"

const app = document.createElement("div");
app.setAttribute("data-app", true);
document.body.append(app);

export default {
  name: 'home',
  data(){
    return {
      dialog: false,
      valid: true,
      lastName: "",
      avatarUrl: "",
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      checkbox: false,
    }
  },
  components: {
    HeaderComponent,
    Table,
    footerComponent
    // newAccount
  },
  mounted(){
    this.chargeAccounts()
  },
  methods:{
    ...mapActions({chargeAccounts: "GET_ACCOUNTS"}),
    agree(){

       if (this.$refs.form.validate()) {
        this.snackbar = true
        this.dialog = false
        // await axios.post("https://reqres.in/api/register", {
        //   "email": "eve.holt@reqres.in",
        //   "password": "pistol"
        // })
        this.$store.commit('AGREE_SINGLE_ACCOUNT', {first_name: this.name, last_name: this.lastName, email: this.email, avatar: this.avatarUrl})
   
      }
      

    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    // async add(){
    //   let res = await axios.post("https://reqres.in/api/users", {
    //       "name": "jorge",
    //       "job": "cto"
    //   })
    //   console.log(res);
    // },
    // async register(){
    //   let res = await axios.post("https://reqres.in/api/register", {
    //     "email": "eve.holt@reqres.in",
    //     "password": "pistol"
    // })
      // console.log(res);
    // }
  }
}
</script>
<style>

</style>