<template>
  <div>
    <!-- หัวข้อ -->
    <v-row>
      <v-col class="mt-6 mb-6" cols="12" sm="8" md="6">
        <h2>สินค้าคงคลัง</h2>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-spacer></v-spacer>
      <v-col cols="3">
        <h3 class="mb-2 text-center" style="color: black">กรุณาเลือกคลัง</h3>
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
            @click="toPage(props.item)"
          >
            {{ getStatusText(props.item) }}
          </v-btn>
        </template>
      </v-data-table>
    </div>
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
          align: "center",
          text: "หน่วยนับ",
          value: "unit_name",
          class: "blue-grey darken-4 white--text",
        },
         {
          text: "ระยะเวลาที่เหลือ (วัน)",
          align: "center",
          value: "days_until_expire",
          class: "blue-grey darken-4 white--text",
        },
      ],
      product: [],
      search: "",
      total: 0,
      wh: "",
      whdata: [],
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    getStatusClass(item) {
      return item.input_status === 0 ? "success" : "warning";
    },
    getStatusText(item) {
      return item.input_status === 0 ? "ตรวจรับสำเร็จ" : "รอการสั่งซื้อ";
    },
    async initialize() {
      this.$axios.get("/api/warehouses/findAll").then((res) => {
        // Assuming res.data is an array of warehouses
        this.whdata = res.data.filter(
          (whdata) =>
            whdata.warehouse_id >= "1003" && whdata.warehouse_id <= "1008"
        );
      });
    },
    onStock() {
      console.log(this.wh.warehouse_id);
      this.$axios
        .get(`/api/stockcards/findinStock/${this.wh.warehouse_id}`)
        .then((res) => {
          this.product = res.data;
          console.log(this.product);
          this.total = this.product.length;
        })
        .catch((err) => {
          this.product = [];
          this.total = this.product.length;
        });
    },
    toPage(item) {
      // ส่งข้อมูลไปที่ Component ปลายทาง
      this.$router.push({
        name: "im_buy",
        params: { yourData: "ข้อมูลสินค้าที่เหลือน้อย", item },
      });
    },
  },
};
</script>

<style scoped>
</style>
