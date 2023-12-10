<template>
  <div>
    <!-- หัวข้อ -->
    <v-row>
      <v-col class="mt-6 mb-6" cols="12" sm="8" md="6">
        <h2>ประวัติ</h2>
      </v-col>
    </v-row>
    <v-row class="mt-3">
      <v-spacer></v-spacer>
      <v-col cols="3">
        <h3 class="mb-2 text-center" style="color: black">
          กรุณาเลือกสินค้า (รหัสสินค้า)
        </h3>
        <v-autocomplete
          v-model="item"
          :items="itemhave"
          return-object
          item-text="item_id"
          item-value="item_id"
          label="สินค้า"
          rounded
          required
          outlined
          dense
          @change="onItem()"
        ></v-autocomplete>
      </v-col>
      <v-col cols="1" style="text-align: center; align-self: center">
        <h3>OR</h3>
      </v-col>
      <v-col cols="3">
        <h3 class="mb-2 text-center" style="color: black">
          กรุณาเลือกสินค้า (ชื่อสินค้า)
        </h3>
        <v-autocomplete
          v-model="item"
          :items="itemhave"
          return-object
          item-text="item_name"
          item-value="item_id"
          label="สินค้า"
          rounded
          required
          outlined
          dense
          @change="onItem()"
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
        :items-per-page="20"
        class="elevation-1"
      >
        <!-- index  -->
        <template slot="item.count" slot-scope="props">
          {{ props.index + 1 }}
        </template>

        <template slot="item.timestamp" slot-scope="props">
          {{ formatDate(props.item) }}
        </template>

        <template slot="item.sc_balance" slot-scope="props">
          <v-btn
            rounded
            small
            :color="getScBalanceColor(props.item)"
            class="text--center"
            :style="{ width: '50px' }"
          >
            {{ formatScBalance(props.item) }}
          </v-btn>
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
          text: "เวลาทำรายการ",
          align: "center",
          value: "timestamp",
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
          text: "จำนวน",
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
          text: "แหล่งที่มา",
          align: "center",
          value: "from_warehouse_name",
          class: "blue-grey darken-4 white--text",
        },
        {
          text: "ปลายทาง",
          align: "center",
          value: "to_warehouse_name",
          class: "blue-grey darken-4 white--text",
        },
      ],
      product: [],
      search: "",
      total: 0,
      wh: "",
      whdata: [],
      itemhave: [],
      item: "",
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    formatScBalance(item) {
      // Assuming sc_balance contains either "IM" or "TF"
      const info = item.sc_id;
      const id = info.slice(0, 2);
      if (id === "IM") {
        return "+" + item.sc_balance;
      } else if (id === "TF") {
        return "-" + item.sc_balance;
      } else {
        return item.sc_balance; // handle other cases if needed
      }
    },
    getScBalanceColor(item) {
      // Set colors based on sc_balance values
      const info = item.sc_id;
      const id = info.slice(0, 2);
      if (id === "IM") {
        return "success"; // green color
      } else if (id === "TF") {
        return "error"; // red color
      } else {
        return ""; // default color or handle other cases
      }
    },
    formatDate(timestamp) {
      const date = new Date(timestamp.timestamp);
      console.log(date);
      return date.toLocaleString();
    },
    getStatusClass(item) {
      return item.input_status === 0 ? "success" : "warning";
    },
    getStatusText(item) {
      return item.input_status === 0 ? "ตรวจรับสำเร็จ" : "รอการสั่งซื้อ";
    },
    async initialize() {
      this.$axios.get("/api/stockcards/findAll").then((res) => {
        // Assuming res.data is an array of warehouses
        this.product = res.data;
      });
      this.$axios
          .get(`/api/stockcards/findHistotybywh/${this.$auth.user.warehouse}`)
          .then((res) => {
            this.product = res.data;
            console.log(this.product);
            this.total = this.product.length;
          })
          .catch((err) => {
            this.product = [];
          });
      this.$axios.get("/api/items/findAll").then((res) => {
        this.itemhave = res.data;
      });
    },
    onItem() {
      console.log(this.$auth.user.warehouse);
      this.$axios
        .get(
          `/api/stockcards/findHistotybywhanditemid/${this.$auth.user.warehouse}/${this.item.item_id}`
        )
        .then((res) => {
          this.product = res.data;
          console.log(this.product);
          this.total = this.product.length;
        })
        .catch((err) => {
          this.product = [];
        });
    },
  },
};
</script>

<style scoped>
</style>
