<!-- หน้าการจัดการผู้ใช้งาน -->
<template>
  <div>
    <v-row>
      <v-col class="mt-6 mb-6" cols="12" sm="8" md="6">
        <h2>รายการสินค้า</h2>
      </v-col>
      <v-col>
      
      </v-col>
    </v-row>
    <!-- <div class="add d-flex justify-end mb-3 mt-5">
      <v-btn color="primary" to="/newproduct"> เพิ่มสินค้า </v-btn>
    </div> -->

    <v-tabs fixed-tabs show-arrows>
      <v-tabs-slider class="mt-6" color="primary"></v-tabs-slider>
      <v-tab @click="value = '0'">ทั้งหมด</v-tab>
      <v-tab @click="value = '1'">เวชภัณฑ์ยา</v-tab>
      <v-tab @click="value = '2'">เวชสำอางค์</v-tab>
      <!-- Tab1 All -->
      <v-tab-item>
        <div class="right">
          <v-row class="mt-10">
            <v-col>
              <v-container>
                <!-- <div style="margin-left: 50px"> -->
                <p>สินค้ามีทั้งหมด&nbsp;{{ this.total }}&nbsp;รายการ</p>
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
        </div>

        <v-data-table
          :headers="headers"
          :search="search"
          :items="product"
          :items-per-page="10"
          class="elevation-1"
        >
          <!-- index  -->
          <template slot="item.count" slot-scope="props">
            {{ props.index + 1 }}
          </template>
        </v-data-table>
      </v-tab-item>

      <!-- Tab2 เวชภัณฑ์ยา -->
      <v-tab-item>
        <div class="right">
          <v-row class="mt-10">
            <v-col>
              <v-container>
                <!-- <div style="margin-left: 50px"> -->
                <p>สินค้ามีทั้งหมด&nbsp;{{ this.total1 }}&nbsp;รายการ</p>
                <!-- </div> -->
              </v-container>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-text-field
                rounded
                v-model="search1"
                label="ค้นหา"
                append-icon="mdi-magnify"
                outlined
                dense
              >
              </v-text-field>
            </v-col>
          </v-row>
        </div>

        <v-data-table
          :headers="headers"
          :search="search1"
          :items="product1"
          :items-per-page="10"
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
      </v-tab-item>

      <!-- Tab3 เวชสำอาง -->
      <v-tab-item>
        <div class="right">
          <v-row class="mt-10">
            <v-col>
              <v-container>
                <!-- <div style="margin-left: 50px"> -->
                <p>สินค้ามีทั้งหมด&nbsp;{{ this.total2 }}&nbsp;รายการ</p>
                <!-- </div> -->
              </v-container>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-text-field
                rounded
                v-model="search2"
                label="ค้นหา"
                append-icon="mdi-magnify"
                outlined
                dense
              >
              </v-text-field>
            </v-col>
          </v-row>
        </div>

        <v-data-table
          :headers="headers"
          :search="search2"
          :items="product2"
          :items-per-page="10"
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
      </v-tab-item>
    </v-tabs>
    <!-- Dialog เพิ่ม + เเก้ไข -->
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
                  <v-subheader style="color: black">หมวดหมู่</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-autocomplete
                    :items="typee"
                    item-text="type_name"
                    item-value="type_id"
                    label="หมวดหมู่"
                    class="field"
                    v-model="editedItem.type_id"
                    @change="onType()"
                    outlined
                    required
                  ></v-autocomplete>
                </v-col>

                <v-col cols="2">
                  <v-subheader style="color: black">หน่วยนับ</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-autocomplete
                    :items="unitt"
                    label="หน่วย"
                    class="field"
                    item-text="unit_name"
                    item-value="unit_id"
                    v-model="editedItem.unit_id"
                    outlined
                    required
                  ></v-autocomplete>
                </v-col>

                <v-col cols="2">
                  <v-subheader>รหัสสินค้า</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    class="field"
                    label="รหัสสินค้า"
                    v-model="editedItem.item_id"
                    outlined
                    readonly
                  ></v-text-field>
                </v-col>

                <v-col cols="2">
                  <v-subheader style="color: black">Minimun</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    class="field"
                    v-model="editedItem.item_min"
                    label="Minimun"
                    outlined
                    required
                    type="number"
                    min="0"
                    :rules="[numberOnly()]"
                  ></v-text-field>
                </v-col>

                <v-col cols="2">
                  <v-subheader style="color: black">ชื่อสินค้า</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    append
                    class="field"
                    label="ชื่อสินค้า"
                    v-model="editedItem.item_name"
                    outlined
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="2">
                  <v-subheader style="color: black">Maximum</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    class="field"
                    label="Maximum"
                    v-model="editedItem.item_max"
                    outlined
                    required
                    type="number"
                    min="0"
                    :rules="[numberOnly()]"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-subheader style="color: black">เงื่อนไข</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-autocomplete
                    :items="conn"
                    item-text="condition_name"
                    item-value="condition_id"
                    label="เงื่อนไข"
                    class="field"
                    v-model="editedItem.condition_id"
                    outlined
                    required
                  ></v-autocomplete>
                </v-col>
                <v-col cols="2"> </v-col>
                <v-col class="mt-2" cols="4">
                  <v-btn
                    color="primary"
                    rounded
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
                  {{ editedItem.item_id }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3"> ชื่อสินค้า </v-col>
                <v-col cols="9">
                  {{ editedItem.item_name }}
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
              <v-btn color="primary" rounded style="width: 100px" type="submit"
                >ยืนยันลบ</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Validation from "~/assets/validation.js";
export default {
  layout: "staff",
  middleware: ["auth"],
  data: () => ({
    // data() {
    // return {
    ...Validation,
    headers: [
      {
        text: "#",
        align: "center",
        value: "count",
        sortable: false,
        class: "blue-grey darken-4 white--text",
      },
      {
        text: "รหัสสินค้า",
        align: "center",
        value: "item_id",
        sortable: true,
        class: "blue-grey darken-4 white--text",
      },
      {
        align: "left",
        text: "ชื่อสินค้า",
        value: "item_name",
        class: "blue-grey darken-4 white--text text-center",
      },
      {
        align: "center",
        text: "เงื่อนไขการหมดอายุ",
        value: "condition_name",
        class: "blue-grey darken-4 white--text",
      },
      {
        align: "center",
        text: "หมวดหมู่",
        value: "type_name",
        class: "blue-grey darken-4 white--text",
      },
      {
        align: "center",
        text: "หน่วยนับ",
        value: "unit_name",
        class: "blue-grey darken-4 white--text",
      },
      {
        align: "center",
        text: "MIN",
        value: "item_min",
        class: "blue-grey darken-4 white--text",
      },
      {
        align: "center",
        text: "MAX",
        value: "item_max",
        class: "blue-grey darken-4 white--text",
      },
    ],
    product: [],
    product1: [],
    product2: [],
    typee: [],
    unitt: [],
    conn: [],
    type_idd: [],
    unit_idd: [],
    total: "",
    total1: "",
    total2: "",
    page: 1,
    dialog: false,
    dialogDelete: false,
    search: "",
    search1: "",
    search2: "",
    index: 0,
    value: "0",
    editedIndex: -1,
    editedItem: {
      item_id: "",
      item_name: "",
      item_min: 0,
      item_max: 0,
      type_id: 0,
      unit_id: 0,
      condition_id: 0,
    },
    defaultItem: {
      item_id: "",
      item_name: "",
      item_min: 0,
      item_max: 0,
      type_id: 0,
      unit_id: 0,
      condition_id: 0,
    },
    // };
    // },
  }),
  computed: {
    formTitle() {
      return this.editedIndex == -1 ? "เพิ่มสินค้า" : "เเก้ไขสินค้า";
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
    async onType() {
      if (this.editedItem.type_id == 1) {
        await this.$axios
          .get("/api/items/findByTypeID/1")
          .then((res) => {
            var index = res.data.length - 1;
            var info = res.data[index].item_id;
            var info_1 = parseInt(info);
            var new_1 = info_1 + 1;
            var new_s = new_1.toString();
            this.editedItem.item_id = new_s;
          })
          .catch((err) => {
            this.editedItem.item_id = "200000000";
          });
      } else if (this.editedItem.type_id == 2) {
        await this.$axios
          .get("/api/items/findByTypeID/2")
          .then((res) => {
            var index = res.data.length - 1;
            var info = res.data[index].item_id;
            var info_2 = parseInt(info);
            var new_2 = info_2 + 1;
            var new_s = new_2.toString();
            this.editedItem.item_id = new_s;
          })
          .catch((err) => {
            this.editedItem.item_id = "200000038";
          });
      }
    },

    async initialize() {
      this.$axios.get("/api/items/findAll").then((res) => {
        this.product = res.data;
        this.total = res.data.length;
        console.log(this.product);
      });
      this.$axios.get("/api/items/findByTypeID/1").then((res) => {
        this.product1 = res.data;
        this.total1 = res.data.length;
        console.log(this.product1);
      });
      this.$axios.get("/api/items/findByTypeID/2").then((res) => {
        this.product2 = res.data;
        this.total2 = res.data.length;
        console.log(this.product2);
      });
      this.$axios.get("/api/types/findAll").then((res) => {
        var info = res.data;
        this.typee = info;
        console.log(this.typee);
      });
      this.$axios.get("/api/units/findAll").then((res) => {
        var info = res.data;
        this.unitt = info;
        console.log(this.unitt);
      });
      this.$axios.get("/api/conditions/findAll").then((res) => {
        var info = res.data;
        this.conn = info;
      });
    },

    async editItem(item) {
      console.log("edit");
      console.log(this.editedIndex);
      console.log(this.value);
      if (this.value == "0") {
        this.editedIndex = this.product.indexOf(item);
      } else if (this.value == "1") {
        this.editedIndex = this.product1.indexOf(item);
      } else {
        this.editedIndex = this.product2.indexOf(item);
      }
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.initialize();
    },
    async deleteItem(item) {
      console.log("delete", item.item_id);
      if (this.value == "0") {
        this.editedIndex = this.product.indexOf(item);
      } else if (this.value == "1") {
        this.editedIndex = this.product1.indexOf(item);
      } else {
        this.editedIndex = this.product2.indexOf(item);
      }
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      this.initialize();
    },

    async deleteItemConfirm() {
      if (this.value == "0") {
        this.product.splice(this.editedIndex, 1);
      } else if (this.value == "1") {
        this.product1.splice(this.editedIndex, 1);
      } else {
        this.product2.splice(this.editedIndex, 1);
      }
      delete this.editedItem.type_name;
      delete this.editedItem.condition_name;
      delete this.editedItem.unit_name;
      console.log("delete", this.editedItem);
      await this.$axios.put("/api/items/delete", this.editedItem);
      this.dialogDelete = false;
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (
        parseInt(this.editedItem.item_min) <= parseInt(this.editedItem.item_max)
      ) {
        if (this.editedIndex > -1) {
          if (this.value == "0") {
            Object.assign(this.product[this.editedIndex], this.editedItem);
          } else if (this.value == "1") {
            Object.assign(this.product1[this.editedIndex], this.editedItem);
          } else {
            Object.assign(this.product2[this.editedIndex], this.editedItem);
          }
          delete this.editedItem.type_name;
          delete this.editedItem.condition_name;
          delete this.editedItem.unit_name;
          await this.$axios.put("/api/items", this.editedItem);
          this.close();
        } else {
          if (
            this.editedItem.item_id.length != 0 &&
            this.editedItem.item_name.length != 0 &&
            this.editedItem.condition_id.length != 0
          ) {
            this.$axios.post("/api/items", this.editedItem);
            this.close();
          } else {
            alert("กรุณากรอกให้ครบถ้วน");
          }
        }
        this.initialize();
      } else {
        this.editedItem.item_min = "";
        this.editedItem.item_max = "";
      }
    },
  },
};
</script>

<style scoped>
.field {
  border-radius: 50px;
}
</style>
