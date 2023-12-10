<template>
  <v-app id="denied">
      <div>
    <v-dialog
      v-model="dialog_error"
      max-width="650"
      persistent
    >
      <v-card>
        <v-card-text>
          <v-col class="d-flex flex-column justify-center align-center text-center">
              <!-- <Error /> -->
            <v-col>
              <!-- <span class="text-bookking-details font-weight-bold">เกิดข้อผิดพลาด</span> -->
              <span class="text-bookking-details font-weight-bold">คุณไม่มีสิทธิเข้าถึงในหน้านี้ ระบบจะนำออกไปหน้าเข้าสู่ระบบ</span>
            </v-col>
          </v-col>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="error" @click="logout()">ปิดหน้าต่าง</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  </v-app>
</template>

<script>
export default {
    layout : "empty",
    data() {
        return {
      dialog_error: true,
    };
    },
    methods: {
    onDialog: function onDialog() {
      this.dialog_error = true;
    },
    async logout() {
      this.dialog_error = false;
        await this.$auth.logout();
        this.$router.push('/login');
      },
  },
}
</script>

<style>

</style>
