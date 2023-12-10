<template>
  <div>
    <!-- หัวข้อ -->
    <v-row>
      <v-col class="mt-6 mb-6" cols="12" sm="8" md="6">
        <h2>จำนวนสินค้าเหลือน้อย</h2>
      </v-col>
    </v-row>
    <!-- Table -->
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
          text: "ประเภทสินค้า",
          align: "center",
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
          text: "MIN",
          align: "center",
          value: "item_min",
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
      search: "",
      total: 0,
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
      this.$axios.get(`/api/stockcards/findOutstockBywh/${this.$auth.user.warehouse}`).then((res) => {
        this.product = res.data.filter((item) => item.input_status === 1 && item.expire_status === 0 );
        console.log(this.product);
        this.total = this.product.length;
      });
    },
    toPage(item) {
      // ส่งข้อมูลไปที่ Component ปลายทาง
      this.$router.push({
        name: "Staff-im_buy",
        params: { yourData: "ข้อมูลสินค้าที่เหลือน้อย", item},
      });
    },
  },
};
</script>

<style scoped>
</style>
