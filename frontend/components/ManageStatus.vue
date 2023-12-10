<template>
  <div>
    <v-row>
      <v-col class="mt-6 mb-6" cols="12" sm="8" md="6">
        <h2>STATUS</h2>
      </v-col>
      <v-col>
        <v-btn
          rounded
          color="primary"
          @click="dialog = true"
          dark
          class="add d-flex justify-end mb-3 mt-5"
          style="float: right"
        >
          เพิ่ม Status
        </v-btn>
      </v-col>
    </v-row>
    <div class="right">
      <v-row>
        <v-col>
          <v-container>
            <!-- <div style="margin-left: 50px"> -->
            <p>Status มีทั้งหมด&nbsp;{{ this.total }}&nbsp;รายการ</p>
            <!-- </div> -->
          </v-container>
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
          <v-text-field
            rounded
            v-model="search"
            label="ค้นหา"
            append-icon="mdi-magnify"
            outlined
            dense
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :search="search"
        :items="status"
        :items-per-page="5"
        class="elevation-1"
      >
        <!-- index  -->
        <template slot="item.count" slot-scope="props">
          {{ props.index + 1 }}
        </template>

        <template slot="item.icon" slot-scope="props">
          <!-- edit  -->
          <v-btn
            @click="editItem(props.item)"
            small
            text
            class="col-3"
            color="#ffffff"
          >
            <v-icon v-model="props.item.icon" disabled
              >mdi-pencil-outline</v-icon
            >
          </v-btn>
          <!-- delete -->
          <v-btn
            small
            @click="deleteItem(props.item)"
            text
            class="col-3"
            color="#ffffff"
          >
            <v-icon v-model="props.item.icon" disabled>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <v-dialog persistent v-model="dialog" max-width="800px">
        <v-card max-height="700px">
          <v-app-bar color="#2D4B75" dark>
            <v-card-title class="text-center justify-center">
              {{ formTitle }}
            </v-card-title>
          </v-app-bar>
          <v-container>
            <v-spacer />
          </v-container>
          <v-form @submit.prevent="save()">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="2">
                    <!-- <v-subheader>รหัส STATUS</v-subheader> -->
                  </v-col>
                  <v-col cols="4">
                    <!-- <v-text-field
                    class="field"
                    label="รหัส STATUS"
                    v-model="editedItem.status_id"
                    outlined
                    readonly
                  ></v-text-field> -->
                  </v-col>

                  <v-col cols="2">
                    <!-- <v-subheader style="color: black">Minimun</v-subheader> -->
                  </v-col>
                  <v-col cols="4">
                    <!-- <v-text-field class="field" v-model="editedItem.item_min" label="Minimun" outlined required type="number" min="0" :rules="[numberOnly()] "></v-text-field> -->
                  </v-col>

                  <v-col cols="2">
                    <v-subheader style="color: black">ชื่อ STATUS</v-subheader>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      class="field"
                      label="ชื่อ STATUS"
                      v-model="editedItem.status_name"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="2">
                    <!-- <v-subheader style="color: black">Maximum</v-subheader> -->
                  </v-col>
                  <v-col cols="4">
                    <!-- <v-text-field class="field" label="Maximum" v-model="editedItem.item_max" outlined required type="number" min="0" :rules="[numberOnly()]"></v-text-field> -->
                  </v-col>
                  <v-col cols="2">
                    <!-- <v-subheader style="color: black">เงื่อนไข</v-subheader> -->
                  </v-col>
                  <v-col cols="4">
                    <!-- <v-autocomplete :items="conn" item-text="condition_name" item-value="condition_id" label="เงื่อนไข" class="field" v-model="editedItem.condition_id" outlined required></v-autocomplete> -->
                  </v-col>
                  <v-col cols="2"> </v-col>
                  <v-col class="mt-2" cols="4">
                    <v-btn
                      color="primary"
                      text
                      style="width: 100px"
                      @click="dialog = false"
                      >ยกเลิก</v-btn
                    >
                    <v-btn
                      color="primary"
                      rounded
                      style="width: 100px"
                      type="submit"
                      >บันทึก</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-form>
        </v-card>
      </v-dialog>
      <!-- Dialog ลบ -->
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-app-bar color="#2D4B75" dark>
            <v-card-title> ยืนยันการลบ </v-card-title>
          </v-app-bar>
          <v-container>
            <v-form @submit.prevent="deleteItemConfirm()">
              <!-- <v-card-title class="text-center justify-center">
                        ยืนยันการลบ
                    </v-card-title> -->
              <v-card-text class="mt-2" style="font-size: 16px">
                <v-row>
                  <v-col cols="3"> รหัสสินค้า </v-col>
                  <v-col cols="9">
                    {{ editedItem.status_id }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3"> ชื่อสินค้า </v-col>
                  <v-col cols="9">
                    {{ editedItem.status_name }}
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="mt-2">
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  style="width: 100px"
                  @click="dialogDelete = false"
                  >ยกเลิก</v-btn
                >
                <v-btn
                  color="primary"
                  rounded
                  style="width: 100px"
                  type="submit"
                  >ยืนยันลบ</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

  
<script>
import Validation from "~/assets/validation.js";
const URL = "http://localhost:8088";
export default {
  // layout: "superuser",
  middleware: ["auth"],
  //change every "units" to "status"
  data: () => ({
    dialogDelete: false,
    dialog: false,
    total: 0,
    search: "",
    status: [],
    headers: [
      {
        text: "#",
        align: "center",
        value: "count",
        sortable: false,
        class: "blue-grey darken-4 white--text",
      },
      {
        text: "Status",
        align: "center",
        value: "status_name",
        sortable: true,
        class: "blue-grey darken-4 white--text",
      },
      {
        align: "center",
        text: "EDIT",
        sortable: false,
        value: "icon",
        class: "blue-grey darken-4 white--text",
      },
    ],
    editedIndex: -1,
    editedItem: {
      status_id: "",
      status_name: "",
    },
    defaultItem: {
      status_id: "",
      status_name: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex == -1 ? "เพิ่ม STATUS" : "เเก้ไข STATUS";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.$axios.get(URL + "/api/status/findAll").then((res) => {
        this.status = res.data;
        this.total = res.data.length;
        console.log("status", this.status);
      });
    },
  },
  async editItem(item) {
    this.editedIndex = this.status.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialog = true;
    this.initialize();
  },
  async deleteItem(item) {
    this.editedIndex = this.status.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialogDelete = true;
    this.initialize();
  },

  async deleteItemConfirm() {
    this.status.splice(this.editedIndex, 1);
    await this.$axios.put(URL + "/api/status/delete", this.editedItem);
    this.dialogDelete = false;
    this.closeDelete();
  },
  closeDelete() {
    this.dialogDelete = false;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
    this.initialize();
  },
  close() {
    this.dialog = false;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  },
  // async save() {
  //   console.log("save");
  //     if (this.editedIndex > -1) {
  //         Object.assign(this.status[this.editedIndex], this.editedItem);
  //         await this.$axios.put(URL + "/api/status", this.editedItem);
  //         this.close();
  //     } else {
  //         if (this.editedItem.status_name.length != 0) {
  //             console.log("statusssssws", this.editedItem);
  //             this.$axios.post(URL + "/api/status", this.editedItem);
  //             this.close();
  //         } else {
  //             alert("กรุณากรอกให้ครบถ้วน");
  //         }
  //     }
  //     this.initialize();
  // },
  async save() {
    console.log("save");
    if (this.editedIndex > -1) {
      try {
        await this.$axios.put(URL + "/api/status", this.editedItem);
        Object.assign(this.status[this.editedIndex], this.editedItem);
        this.close();
      } catch (error) {
        console.error("Error updating data:", error);
      }
    } else {
      if (this.editedItem.status_name.length !== 0) {
        console.log("statusssssws", this.editedItem);
        try {
          await this.$axios.post(URL + "/api/status", this.editedItem);
          this.close();
        } catch (error) {
          console.error("Error creating data:", error);
        }
      } else {
        alert("กรุณากรอกให้ครบถ้วน");
      }
    }
    this.initialize();
  },
};
</script>

  
<style scoped>
.field {
  border-radius: 50px;
}
</style>
