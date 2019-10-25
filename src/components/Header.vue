<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>vueChurrasco</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        
        <!-- <v-btn text>Carlo Gammarota</v-btn> -->
        <v-btn text>{{user}}</v-btn> 
        <!-- <v-btn text>Link 3</v-btn> -->
      </v-toolbar-items>

      <template v-if="$vuetify.breakpoint.smAndUp">
 <!--        <v-btn icon>
          <v-icon>mdi-export-variant</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-delete-circle</v-icon>
        </v-btn> -->
        <v-btn @click="logout()" icon>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  methods: {
    ...mapActions({doLogout: "AUTH_LOGOUT"}),
    logout(){
      this.doLogout().then(res => {
        this.$router.push("/login")
      })
    }
  },
  computed: {
      ...mapGetters({
        user: "getUser"
      }),
  },
 
}
</script>