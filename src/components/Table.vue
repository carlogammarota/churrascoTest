<template>
	<v-data-table
	    :headers="headers"
	    :items="Accounts"
	    class="elevation-1"
	  >
	    <template style="height:10px !important" v-slot:item.avatar="{ item }">
        <v-avatar >
          <img
            :src="item.avatar"
            alt="John"
          >
        </v-avatar>
	    </template>
  	</v-data-table>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Email',
            align: 'left',
            sortable: false,
            value: 'email',
          },
          { text: 'First Name', value: 'first_name' },
          { text: 'Last Name', value: 'last_name' },
          { text: 'Avatar', value: 'avatar' }
        ],
        desserts: [
          {
            email: 'carlo.gammarota@gmail.com',
            firstName: "Carlo",
            lastName: "Gammarota",
            avatar: 24,
          },
        ],
      }
    },
    methods: {
      getColor (calories) {
        if (calories > 400) return 'red'
        else if (calories > 200) return 'orange'
        else return 'green'
      },
    },
    computed: {
      ...mapGetters({
        Accounts: "getAccounts"
      }),
    },
  }
</script>
<style >
.v-data-table td {
  height: 88px !important; 
}
</style>