<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6"> Staff PAGE </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "staff",
  middleware: ["auth"],
  created() {
    if(this.$router.history.current.name.split('-')[0] !== this.$store.getters.loggedInUser.role_name){
        this.$router.push('/role_denied');
    }
  },
};
</script>
