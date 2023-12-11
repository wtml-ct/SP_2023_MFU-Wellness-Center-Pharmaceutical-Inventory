<template>
  <div>
    <!-- หัวข้อ -->
    <v-row>
      <v-col class="mt-6 mb-6" cols="12" sm="8" md="6">
        <h2>การโอนย้ายสินค้า</h2>
      </v-col>
      <v-col>
        <v-btn
          rounded
          color="primary"
          @click="onDialog()"
          dark
          class="add d-flex justify-end mb-3 mt-5"
          style="float: right"
        >
          เพิ่มการโอนย้ายสินค้า
        </v-btn>
      </v-col>
    </v-row>
    <!-- Table -->
    <div>
      <div class="right">
        <v-row class="mt-5">
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
            width="100px"
            small
            rounded
            :class="getStatusClass(props.item)"
            style="color: white"
            @click="acceptItem(props.item)"
          >
            {{ getStatusText(props.item) }}
          </v-btn>
        </template>
      </v-data-table>

      <!-- Dialog ตกลง -->
      <v-dialog v-model="dialogAccept" max-width="500px">
        <v-card>
          <v-app-bar color="#2D4B75" dark>
            <v-card-title> ยืนยันการโอน </v-card-title>
          </v-app-bar>
          <v-container>
            <v-form @submit.prevent="submitAccept()">
              <v-card-text class="mt-2" style="font-size: 16px">
                <v-row>
                  <v-col cols="3"> รหัสสินค้า </v-col>
                  <v-col cols="9">
                    {{ editedItem.sc_id }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3"> ชื่อสินค้า </v-col>
                  <v-col cols="9">
                    {{ editedItem.item_name }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3"> วันที่นำเข้า </v-col>
                  <v-col cols="9">
                    {{ editedItem.sc_import }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3"> นำเข้าจาก </v-col>
                  <v-col cols="9">
                    {{ editedItem.from_warehouse_name }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3"> จำนวน </v-col>
                  <v-col cols="9">
                    {{ editedItem.sc_balance }}
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
                  @click="dialogAccept = false"
                  >ยกเลิก</v-btn
                >
                <v-btn
                  color="primary"
                  rounded
                  style="width: 150px"
                  type="submit"
                  @click="submitAccept()"
                  >ยืนยันการตัดโอน</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog">
        <v-app-bar color="#2D4B75" dark>
          <v-card-title class="text-center justify-center">
            {{ formTitle }}
          </v-card-title>
        </v-app-bar>
        <v-card class="pa-5">
          <v-form>
            <v-card-text style="font-size: 16px">
              <v-row no-gutters class="mb-5">
                <h2>กรอกคลัง</h2>
                <h2 style="color: red">*ที่โอน</h2>
              </v-row>
              <v-row class="mt-5 mb-3">
                <v-spacer></v-spacer>
                <v-col cols="3">
                  <h3 class="mb-2 text-center" style="color: black">โอนจาก</h3>
                  <v-autocomplete
                    readonly
                    v-model="wh_from"
                    :items="whdata"
                    return-object
                    item-text="warehouse_name"
                    item-value="warehouse_id"
                    label="คลังสินค้า"
                    rounded
                    required
                    outlined
                    dense
                  ></v-autocomplete>
                </v-col>

                <v-col cols="3">
                  <h3 class="mb-2 text-center" style="color: black">ไปยัง</h3>
                  <v-autocomplete
                    readonly
                    v-model="wh_to"
                    :items="whdata"
                    return-object
                    item-text="warehouse_name"
                    item-value="warehouse_id"
                    label="คลังสินค้า"
                    rounded
                    required
                    outlined
                    dense
                  ></v-autocomplete>
                </v-col>
                <v-spacer></v-spacer>
              </v-row>
              <v-divider></v-divider>

              <v-row no-gutters class="mb-6 mt-7">
                <h2>ข้อมูลสินค้าที่</h2>
                <h2 style="color: red">*โอน</h2>
              </v-row>

              <v-row class="mb-5" no-gutters>
                <!-- แถว 1 -->
                <!-- 1.1  รหัสสินค้า -->
                <v-col cols="1">
                  <v-card-text class="ml-1" style="color: black"
                    >รหัสสินค้า</v-card-text
                  >
                </v-col>
                <v-col cols="3">
                  <v-autocomplete
                    v-model="editedItem.item_id"
                    :rules="rules.validate"
                    @change="onItemID()"
                    :items="item"
                    item-text="item_id"
                    item-value="item_id"
                    label="รหัสสินค้า"
                    rounded
                    required
                    outlined
                    dense
                  ></v-autocomplete>
                </v-col>
                <!-- 1.2  ชื่อสินค้า -->
                <v-col cols="1">
                  <v-card-text class="ml-1" style="color: black; top: 20px"
                    >ชื่อสินค้า</v-card-text
                  >
                </v-col>
                <v-col cols="3">
                  <v-autocomplete
                    v-model="form.item_name"
                    :rules="rules.validate"
                    :items="item"
                    @change="onItemName()"
                    item-text="item_name"
                    item-value="item_name"
                    label="ชื่อสินค้า"
                    rounded
                    required
                    outlined
                    dense
                  ></v-autocomplete>
                </v-col>
                <!-- 1.3 หน่วยนับ -->
                <v-col cols="1">
                  <v-card-text class="ml-1" style="color: black; top: 20px">
                    หน่วยนับ</v-card-text
                  >
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="form.unit_name"
                    readonly
                    rounded
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <!-- แถว 2 -->
                <!-- 2.1 ประเภทสินค้า -->
                <v-col cols="1">
                  <v-card-text class="" style="color: black; top: 20px">
                    ประเภทสินค้า</v-card-text
                  >
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="form.type_name"
                    readonly
                    rounded
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <!-- 2.2 -->
                <v-col cols="1"></v-col>
                <v-col cols="3"></v-col>
                <!-- 2.3 -->
                <v-col cols="1"></v-col>
                <v-col cols="3"></v-col>

                <!-- เเถว 3 -->
                <!-- 3.1 ล็อต -->
                <v-col cols="1">
                  <v-card-text class="ml-1" style="color: black; top: 20px"
                    >ล็อต</v-card-text
                  >
                </v-col>
                <v-col cols="3">
                  <v-autocomplete
                    v-model="editedItem.sc_lot"
                    :rules="rules.validate"
                    :items="itemlot"
                    @change="onExpByLot()"
                    item-text="sc_lot"
                    item-value="sc_lot"
                    label="เลือกล็อตที่ต้องการเเลกเปลี่ยน"
                    rounded
                    required
                    outlined
                    dense
                  ></v-autocomplete>
                </v-col>

                <!-- 3.2  วันหมดอายุ -->
                <v-col cols="1">
                  <v-card-text class="ml-1" style="color: black"
                    >วันที่หมดอายุ</v-card-text
                  >
                </v-col>
                <v-col cols="3">
                  <v-autocomplete
                    v-model="editedItem.sc_exp"
                    :rules="rules.validate"
                    @change="onBalancebyExp()"
                    :items="exp"
                    item-text="sc_exp"
                    item-value="sc_exp"
                    label="วันที่หมดอายุ"
                    rounded
                    required
                    outlined
                    dense
                  ></v-autocomplete>
                </v-col>
                <!-- 3.3 จำนวนที่มีอยู่ตอนนี้ -->
                <v-col cols="1">
                  <v-card-text class="" style="color: black; top: 20px">
                    จำนวนที่มีอยู่ตอนนี้</v-card-text
                  >
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="form.balance_old"
                    readonly
                    rounded
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <!-- 4.1 -->
                <v-col cols="1"></v-col>
                <v-col cols="3"></v-col>
                <!-- 4.2 -->
                <v-col cols="1"></v-col>
                <v-col cols="3"></v-col>
                <!-- 4.3 -->
                <v-col cols="1">
                  <v-card-text style="color: black; top: 20px">
                    จำนวนที่ต้องการโอน</v-card-text
                  >
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="editedItem.sc_balance"
                    type="number"
                    min="0"
                    :rules="numberOnly() && rules.validate"
                    label="จำนวนที่ต้องการโอน"
                    rounded
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
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
                @click="submit()"
                >บันทึก</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import Validation from "~/assets/validation.js";
export default {
  layout: "staff",
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
          text: "รหัสการโอนสินค้า",
          align: "center",
          value: "sc_id",
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
          text: "หมวดหมู่",
          value: "type_name",
          class: "blue-grey darken-4 white--text",
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
          text: "จำนวนที่โอนย้าย",
          align: "center",
          value: "sc_balance",
          class: "blue-grey darken-4 white--text",
        },
        {
          align: "center",
          text: "หน่วยนับ",
          value: "unit_name",
          class: "blue-grey darken-4 white--text",
        },
        {
          text: "โอนจาก",
          align: "center",
          value: "from_warehouse_name",
          class: "blue-grey darken-4 white--text",
        },
        {
          text: "โอนไปยัง",
          align: "center",
          value: "to_warehouse_name",
          class: "blue-grey darken-4 white--text",
        },
      ],
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
        status_id: "",
        action_id: 0,
        username: "",
        sc_balance: 0,
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
        status_id: 0,
        action_id: 0,
        username: "",
        sc_balance: 0,
        sc_price: 0,
      },
      dialogAccept: false,
      dialog: false,
      product: [],
      search: "",
      total: 0,
      wh_from: "",
      wh_to: "",
      whdata: [],
      receive: [],
      new_sc_id: "",
      rules: {
        validate: [(v) => !!v || "กรุณากรอกข้อมูล"],
      },
      form: {
        balance_old: 0,
        item_name: "",
        type_name: "",
        unit_name: "",
      },
      item: [],
      itemm: [],

      itemlot: [],
      exp: ["กรุณาเลือกล็อตที่นำไปเเลกเปลี่ยน"],
      balance: ["กรุณาเลือกล็อตเเละวันที่หมดอายุ"],
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex == -1
        ? "เพิ่มรายการโอนสินค้า"
        : "เเก้ไขรายการโอนสินค้า";
    },
  },
  created() {
    this.initialize();
  },
  watch: {
    dialogAccept(val) {
      val || this.closeAccept();
    },
  },
  methods: {
    submitAccept() {
      this.$axios.put("/api/stockcards/", {
        sc_id: this.editedItem.sc_id,
        status_id: 1,
      });
      this.postReceive();
      this.dialogAccept = false;
      this.initialize();
    },
    onDialog() {
      this.dialog = true;
      if (this.itemm.length != 0) {
        const index = this.itemm.length - 1;
        const info = this.itemm[index].sc_id;
        // slice(start, end)
        const numbers = parseInt(info.slice(2, 10)) + 1;
        const numbersString = String(numbers);
        const new_id = info.slice(0, 2) + numbersString.padStart(8, "0");
        console.log(new_id);
        this.editedItem.sc_id = new_id;
      } else {
        this.editedItem.sc_id = "TF30000001";
      }
      this.wh_from = this.$auth.user.warehouse;

      console.log(this.wh_from);
      if (this.wh_from != "1003" && this.wh_from != "1008") {
        this.wh_to = "1003";
      } else if (this.wh_from == "1008") {
        this.wh_to = "1008";
      }
      console.log(this.wh_to);
      console.log(this.editedItem.sc_id);
      console.log(this.product);
    },
    async postReceive() {
      this.editedItem.username = this.$auth.user.username;
      this.editedItem.action_id = 3;
      this.editedItem.status_id = 0;
      this.wh_from = this.$auth.user.warehouse;

      console.log(this.wh_from);
      if (this.wh_from != "1003" && this.wh_from != "1008") {
        this.wh_to = "1003";
      } else if (this.wh_from == "1008") {
        this.wh_to = "1008";
      }
      console.log(this.wh_to);

      console.log(this.product);
      this.editedItem.sc_po = this.itemm[0].sc_po;
      this.editedItem.sc_delivery = this.itemm[0].sc_delivery;

      console.log("post", this.editedItem);
      await this.$axios.post("/api/stockcards/", {
        sc_id: this.new_sc_id,
        item_id: this.editedItem.item_id,
        sc_lot: this.editedItem.sc_lot,
        sc_exp: this.editedItem.sc_exp,
        sc_import: this.editedItem.sc_import,
        sc_po: this.editedItem.sc_po,
        action_id: this.editedItem.action_id,
        sc_delivery: this.editedItem.sc_delivery,
        from_warehouse: this.wh_from,
        to_warehouse: this.wh_to,
        status_id: 0,
        username: this.editedItem.username,
        sc_balance: this.editedItem.sc_balance,
        sc_price: this.editedItem.sc_price,
      });
    },
    getStatusClass(item) {
      return item.status_id === 1 ? "success" : "warning";
    },
    getStatusText(item) {
      return item.status_id === 1 ? "ตรวจรับสำเร็จ" : "รอการยืนยัน";
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
        .get("/api/stockcards/findByActions/1")
        .then((res) => {
          // ข้อมูลที่โชว์ในตาราง
          this.itemm = res.data;
          this.product = res.data.filter(
            (product) => product.from_warehouse === this.$auth.user.warehouse
          );
          this.total = this.product.length;
        })
        .catch((err) => {
          this.product = [];
          this.total = this.product.length;
        });

      this.$axios.get("/api/stockcards/findByActions/3").then((res) => {
        this.receive = res.data;
      });

      if (this.receive.length != 0) {
        const index = this.receive.length - 1;
        const info = this.receive[index].sc_id;
        console.log("info", info);
        // slice(start, end)
        const numbers = parseInt(info.slice(2, 10)) + 1;

        console.log("n", numbers);
        const numbersString = String(numbers);
        const new_id = info.slice(0, 2) + numbersString.padStart(8, "0");
        console.log(new_id);
        this.new_sc_id = new_id;
      } else {
        this.new_sc_id = "IM30000001";
      }
      this.$axios
        .get(`/api/stockcards/findinStock/${this.$auth.user.warehouse}`)
        .then((res) => {
          this.item = res.data;
          console.log(this.item);
        })
        .catch((err) => {
          this.item = [];
        });
    },
    async acceptItem(item) {
      if (item.status_id == 0) {
        this.dialogAccept = true;
      } else {
        this.dialogAccept = false;
      }
      this.editedIndex = this.product.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.initialize();
    },
    closeAccept() {
      this.dialogAccept = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    submit() {
      this.editedItem.username = this.$auth.user.username;
      this.editedItem.action_id = 1;
      this.editedItem.status_id = 0;
      this.wh_from = this.$auth.user.warehouse;

      console.log(this.wh_from);
      if (this.wh_from != "1003" && this.wh_from != "1008") {
        this.wh_to = "1003";
      } else if (this.wh_from == "1008") {
        this.wh_to = "1008";
      }
      console.log(this.wh_to);
      console.log(this.wh_to);
      console.log(this.product);
      this.editedItem.sc_po = this.itemm[0].sc_po;
      this.editedItem.sc_delivery = this.itemm[0].sc_delivery;

      const isEmpty = Object.values(this.editedItem).some(
        (value) => value === ""
      );
      console.log(this.editedItem);
      console.log(isEmpty);
      if (!isEmpty) {
        const Newdata = {
          sc_id: this.editedItem.sc_id,
          item_id: this.editedItem.item_id,
          sc_lot: this.editedItem.sc_lot,
          sc_exp: this.editedItem.sc_exp,
          sc_import: this.editedItem.sc_import,
          sc_po: this.editedItem.sc_po,
          action_id: this.editedItem.action_id,
          sc_delivery: this.editedItem.sc_delivery,
          from_warehouse: this.wh_from,
          to_warehouse: this.wh_to,
          status_id: this.editedItem.status_id,
          username: this.editedItem.username,
          sc_balance: this.editedItem.sc_balance,
          sc_price: this.editedItem.sc_price,
        };
        console.log("newdata", Newdata);
        try {
          if (this.editedIndex > -1) {
            this.$axios.put("/api/stockcards/", Newdata);
          } else {
            this.$axios.post("/api/stockcards/", Newdata);
          }
          this.dialog = false;
          this.dialogAccept = false;
        } catch (err) {
          console.log(err);
        }
        this.initialize();
      } else {
        alert("กรุณากรอกให้ครบถ้วน");
      }
      this.initialize();
    },
    onExpByLot() {
      // Find exp
      this.$axios
        .get(
          `/api/stockcards/findByItemIDandLot/${this.editedItem.item_id}/${this.editedItem.sc_lot}`
        )
        .then((res) => {
          this.exp = res.data;
          console.log("exp", this.exp);
        });
    },
    async onItemID() {
      console.log("old");
      await this.$axios
        .get("/api/items/findByItemID/" + this.editedItem.item_id)
        .then((res) => {
          console.log(res.data);
          this.form.item_name = res.data.item_name;
          this.form.type_name = res.data.type_name;
          this.form.unit_name = res.data.unit_name;
          // Find lots

          this.$axios
            .get(`/api/stockcards/findinStock/${this.$auth.user.warehouse}`)
            .then((ress) => {
              this.itemlot = ress.data.filter(
                (lot) =>
                  lot.total_balance != 0 &&
                  lot.item_id === this.editedItem.item_id
              );
              console.log(ress.data);
            })
            .catch((err) => {
              this.itemlot = [];
            });
        });
      this.form.exp_old = "";
      console.log(this.form);
    },
    async onBalancebyExp() {
      // Find balance
      await this.$axios
        .get(
          `/api/stockcards/findinStockBalance/${this.$auth.user.warehouse}/${this.editedItem.item_id}/${this.editedItem.sc_lot}/${this.editedItem.sc_exp}`
        )
        .then((res) => {
          this.form.balance_old = res.data[0].total_balance;

          this.balance = res.data;

          console.log("hyhyh", this.balance[0].total_balance);
        });
    },
    onItemName() {
      console.log(this.form.item_name);
      this.$axios
        .get("/api/items/findByItemName/" + this.form.item_name)
        .then((res) => {
          this.editedItem.item_id = res.data.item_id;
          this.form.type_name = res.data.type_name;
          this.form.unit_name = res.data.unit_name;
          this.$axios
            .get(`/api/stockcards/findinStock/${this.$auth.user.warehouse}`)
            .then((ress) => {
              this.itemlot = ress.data.filter(
                (lot) =>
                  lot.total_balance != 0 &&
                  lot.item_id === this.editedItem.item_id
              );

              console.log(ress.data);
            })
            .catch((err) => {
              this.itemlot = [];
            });
        });
    },
  },
};
</script>

<style scoped>
</style>
