 <template>
  <v-app id="inspire">
    <!-- <HeaderComponent></HeaderComponent> -->
    
    <v-content >
      
      <v-container
        fluid
      >
        <v-row
          align="center"
          justify="center"
          class="login"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <!-- {{email}}s -->
                <v-toolbar-title>Login</v-toolbar-title>
                <!-- <v-spacer></v-spacer> -->
               <!--  <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :href="source"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip> -->
            <!--     <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      href="https://codepen.io/johnjleider/pen/pMvGQO"
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-codepen</v-icon>
                    </v-btn>
                  </template>
                  <span>Codepen</span>
                </v-tooltip> -->
              </v-toolbar>
              <v-card-text>
<v-alert
v-if="status === 'error'"
border="top"
color="red lighten-2"
dark
>
Error
</v-alert>

<v-alert
v-if="status === 'loading'"
border="top"
color="orange lighten-2"
dark
>
Loading
</v-alert>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="email"
                    type="text"
                    v-model="user.email"
                  ></v-text-field>
                  <!--  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                  ></v-text-field> -->
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    v-model="user.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
  
  // import HeaderComponent from '../components/Header.vue'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    components: {
      // HeaderComponent
    },
    data(){
      return{
        user: {
          email: "eve.holt@reqres.in",
          password: "cityslicka",
        }
      }
    },
    computed: {
      ...mapGetters({
        status: "getStatus"
      }),
    },
    methods: {
      ...mapActions({
        doLogin: "AUTH_REQUEST"
      }),
      async login() {
        this.doLogin(this.user).then(res => {
          console.log(res);
          this.$router.push("/")
        })
      }
    },
    props: {
      source: String,
    },
  }
</script>
<style>
  .login{
    margin-top: 200px
  }
</style>