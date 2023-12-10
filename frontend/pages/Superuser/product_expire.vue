<template>
  <div>
    <!-- หัวข้อ -->
    <v-row>
      <v-col class="mt-6 mb-6" cols="12" sm="8" md="6">
        <h2>สินค้าใกล้หมดอายุ เเละ หมดอายุ</h2>
      </v-col>
    </v-row>

    <v-tabs fixed-tabs show-arrows>
      <v-tabs-slider class="mt-6" color="primary"></v-tabs-slider>
      <v-tab @click="value = '0'">สินค้าพร้อมส่งทำลาย</v-tab>
      <v-tab @click="value = '1'">สินค้า**ต่อคลัง</v-tab>
      <!-- Table 1 -->
      <v-tab-item>
        <div>
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

            <template slot="item.status_id" slot-scope="props">
              <v-btn
                width="160px"
                small
                rounded
                :class="getStatusClass(props.item)"
                style="color: white"
              >
                {{ getStatusText(props.item) }}
              </v-btn>
            </template>
          </v-data-table>
        </div>
      </v-tab-item>

      <!-- Table 2 -->
      <v-tab-item>
        <div>
          <!-- หัวข้อ -->
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="3">
              <h3 class="mb-2 mt-2 text-center" style="color: black">
                กรุณาเลือกคลัง
              </h3>
              <v-autocomplete
                v-model="wh"
                :items="whdata"
                return-object
                item-text="warehouse_name"
                item-value="warehouse_id"
                label="คลังสินค้า"
                rounded
                required
                outlined
                dense
                @change="onStock()"
              ></v-autocomplete>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <!-- Table -->
          <div>
            <div class="right">
              <v-row class="mt-5">
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
              :headers="headers2"
              :search="search2"
              :items="product2"
              :items-per-page="10"
              class="elevation-1"
            >
              <!-- index  -->
              <template slot="item.count" slot-scope="props">
                {{ props.index + 1 }}
              </template>

              <template slot="item.status_id" slot-scope="props">
                <v-btn
                  width="160px"
                  small
                  rounded
                  :class="getStatusClass(props.item)"
                  style="color: white"
                  @click="toPage(props.item)"
                >
                  {{ getStatusText(props.item) }}
                </v-btn>
              </template>
            </v-data-table>
          </div>
        </div>
      </v-tab-item>
    </v-tabs>

    <!-- Dialog ทำลาย -->
    <v-dialog v-model="dialogDestroy" max-width="500px">
      <v-card>
        <v-app-bar color="#2D4B75" dark>
          <v-card-title> ยืนยันการส่งไป**คลังทำลาย/เเลกเปลี่ยน** </v-card-title>
        </v-app-bar>
        <v-container>
          <v-form @submit.prevent="submitDestroy()">
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
              <v-row>
                <v-col cols="3"> lot </v-col>
                <v-col cols="9">
                  {{ editedItem.sc_lot }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3"> วันหมดอายุ </v-col>
                <v-col cols="9">
                  {{ editedItem.sc_exp }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3"> จำนวน </v-col>
                <v-col cols="9">
                  {{ editedItem.total_balance }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3"> หน่วย </v-col>
                <v-col cols="9">
                  {{ editedItem.unit_name }}
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="mt-2">
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                style="width: 100px"
                @click="dialogDestroy = false"
                >ยกเลิก</v-btn
              >
              <v-btn
                color="primary"
                rounded
                style="width: 150px"
                type="submit"
                @click="submitDestroy()"
                >ยืนยันการส่ง</v-btn
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
  layout: "superuser",
  // middleware: ["auth"],
  data() {
    return {
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
          text: "สถานะสินค้า",
          align: "center",
          value: "status_id",
          sortable: true,
          class: "blue-grey darken-4 white--text",
        },
        {
          text: "ระยะเวลาที่เหลือ (วัน)",
          align: "center",
          value: "days_until_expire",
          class: "blue-grey darken-4 white--text",
        },
        {
          align: "center",
          text: "เงื่อนไขการหมดอายุ",
          value: "condition_name",
          class: "blue-grey darken-4 white--text",
        },
        {
          text: "รหัสสินค้า",
          align: "center",
          value: "item_id",
          class: "blue-grey darken-4 white--text",
        },
        {
          text: "ชื่อสินค้า",
          align: "center",
          value: "item_name",
          class: "blue-grey darken-4 white--text text-center",
        },
        {
          text: "Lot",
          align: "center",
          value: "sc_lot",
          class: "blue-grey darken-4 white--text",
        },
        {
          text: "EXP",
          align: "center",
          value: "sc_exp",
          class: "blue-grey darken-4 white--text",
        },
        {
          text: "จำนวนที่เหลือทั้งหมด",
          align: "center",
          value: "total_balance",
          class: "blue-grey darken-4 white--text",
        },
        {
          text: "หน่วยนับ",
          align: "center",
          value: "unit_name",
          class: "blue-grey darken-4 white--text",
        },
      ],
      headers2: [
        {
          text: "#",
          align: "center",
          value: "count",
          sortable: false,
          class: "blue-grey darken-4 white--text",
        },
        {
          text: "สถานะสินค้า",
          align: "center",
          value: "status_id",
          sortable: true,
          class: "blue-grey darken-4 white--text",
        },
        {
          text: "ระยะเวลาที่เหลือ (วัน)",
          align: "center",
          value: "days_until_expire",
          class: "blue-grey darken-4 white--text",
        },
        {
          align: "center",
          text: "เงื่อนไขการหมดอายุ",
          value: "condition_name",
          class: "blue-grey darken-4 white--text",
        },
        {
          text: "รหัสสินค้า",
          align: "center",
          value: "item_id",
          class: "blue-grey darken-4 white--text",
        },
        {
          text: "ชื่อสินค้า",
          align: "center",
          value: "item_name",
          class: "blue-grey darken-4 white--text text-center",
        },
        {
          text: "Lot",
          align: "center",
          value: "sc_lot",
          class: "blue-grey darken-4 white--text",
        },
        {
          text: "EXP",
          align: "center",
          value: "sc_exp",
          class: "blue-grey darken-4 white--text",
        },
        {
          text: "จำนวนที่เหลือทั้งหมด",
          align: "center",
          value: "total_balance",
          class: "blue-grey darken-4 white--text",
        },
        {
          text: "หน่วยนับ",
          align: "center",
          value: "unit_name",
          class: "blue-grey darken-4 white--text",
        },
      ],
      product: [],
      product2: [],
      search: "",
      search2: "",
      total: 0,
      total2: 0,
      dialogDestroy: false,
      editedItem: {
        sc_id: "",
        item_id: "",
        sc_lot: "",
        sc_exp: "",
        sc_import: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        sc_po: "",
        sc_delivery: "",
        from_warehouse: "",
        to_warehouse: "1003",
        status_id: "",
        action_id: 0,
        username: "",
        sc_balance: "",
        sc_price: 0,
      },
      defaultItem: {
        sc_id: "",
        item_id: "",
        sc_lot: "",
        sc_exp: "",
        sc_import: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        sc_po: "",
        sc_delivery: "",
        from_warehouse: "",
        to_warehouse: "",
        status_id: 0,
        action_id: 0,
        username: "",
        sc_balance: "",
        sc_price: 0,
      },
      wh: "",
      whdata: [],
      producttran: [],
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    getStatusClass(item) {
      return item.expire_status === 2 ? "error" : "warning";
    },
    getStatusText(item) {
      if (item.expire_status === 2) {
        return "รอส่งทำลาย";
      } else if (
        (item.expire_status === 1 && item.condition_id === 2) ||
        item.condition_id === 3 ||
        item.condition_id === 4
      ) {
        return "สินค้าใกล้หมดอายุ";
      } else {
        return "สินค้าใกล้หมดอายุ";
      }
    },
    async initialize() {
      this.$axios.get("/api/warehouses/findAll").then((res) => {
        // Assuming res.data is an array of warehouses
        this.whdata = res.data.filter(
          (whdata) =>
            whdata.warehouse_id >= "1003" && whdata.warehouse_id <= "1008"
        );
      });
      this.$axios
        .get(`/api/stockcards/findExpirebywh/1008`)
        .then((res) => {
          this.product = res.data.filter((item) => item.expire_status === 2);
          this.total = this.product2.length;
        })
        .catch((err) => {
          this.product = [];
          this.total = this.product2.length;
        });

      this.$axios.get("/api/stockcards/findByActions/1").then((res) => {
        this.producttran = res.data.filter(
          (item) => item.sc_id > "TF30000000" && item.sc_id <= "TF40000000"
        );

        console.log("product", this.product);
        this.total = this.product.length;
      });
      //   this.$axios
      //     .get("/api/stockcards/findExpire")
      //     .then((res) => {
      //       this.product = res.data.filter(
      //         (item) => item.expire_status === 1 || item.expire_status === 2
      //       );
      //       console.log(this.product);
      //       this.total = this.product.length;
      //     })
      //     .catch((err) => {
      //       this.product = [];
      //       this.total = this.product.length;
      //     });
    },
    onStock() {
      this.$axios
        .get(`/api/stockcards/findExpirebywh/${this.wh.warehouse_id}`)
        .then((res) => {
          this.product2 = res.data.filter(
            (item) => item.expire_status === 1 || item.expire_status === 2
          );
          this.total2 = this.product2.length;
        })
        .catch((err) => {
          this.product2 = [];
          this.total2 = this.product2.length;
        });
    },
    toPage(item) {
      // ส่งข้อมูลไปที่ Component ปลายทาง
      const warehouse = this.wh.warehouse_id;
      this.$router.push({
        name: "Superuser-transfer",
        params: { yourData: "ข้อมูลสินค้าใกล้หมดอายุ-ทำลาย", item , warehouse},
      });
    },
  },
};
</script>

<style scoped>
</style>
