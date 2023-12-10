<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6"> Admin PAGE </v-col>
    </v-row>
    <div class="add d-flex justify-end mb-3 mr-16 mt-16">
      <v-btn color="primary" to="/newproduct"> เพิ่มสินค้า </v-btn>
    </div>
    <v-tabs fixed-tabs show-arrows>
      <v-tabs-slider color="primary"></v-tabs-slider>
      <v-tab>ทั้งหมด</v-tab>
      <v-tab>เวชภัณฑ์ยา</v-tab>
      <v-tab>เวชสำอาง</v-tab>

      <!-- Tab1 All -->
      <v-tab-item>
        <div class="right">
          <v-row class="mt-5">
            <v-col class="">
              <v-container>
                <div style="margin-left: 50px">
                  สินค้ามีทั้งหมด&nbsp;
                  {{ this.total }}
                  &nbsp; รายการ
                </div>
              </v-container>
            </v-col>
            <v-spacer style="width: 40%"></v-spacer>
            <v-col class="">
              <v-text-field
                rounded
                v-model="search"
                label="ค้นหา"
                style="width: 70%"
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
          :items-per-page="5"
          class="elevation-1 ml-16 mr-16"
        >
          <!-- index  -->
          <template slot="item.count" slot-scope="props">
            {{ props.index + 1 }}
          </template>

          <!-- edit  -->
          <template slot="item.icon" slot-scope="props">
            <v-btn small text class="ma-1 col-3" color="#ffffff">
              <v-icon v-model="props.item.icon" disabled
                >mdi-pencil-outline</v-icon
              >
            </v-btn>
          </template>
        </v-data-table>
      </v-tab-item>

      <!-- Tab2 เวชภัณฑ์ยา -->
      <v-tab-item>
        <div class="right">
          <v-row class="mt-5">
            <v-col class="">
              <v-container>
                <div style="margin-left: 50px">
                  สินค้ามีทั้งหมด&nbsp;
                  {{ this.total2 }}
                  &nbsp; รายการ
                </div>
              </v-container>
            </v-col>
            <v-spacer style="width: 40%"></v-spacer>
            <v-col class="">
              <v-text-field
                rounded
                v-model="search"
                label="ค้นหา"
                style="width: 70%"
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
          :items-per-page="5"
          class="elevation-1 ml-16 mr-16"
        >
          <!-- index  -->
          <template slot="item.count" slot-scope="props">
            {{ props.index + 1 }}
          </template>

          <!-- edit  -->
          <template slot="item.icon" slot-scope="props">
            <v-btn small text class="ma-1 col-3" color="#ffffff">
              <v-icon v-model="props.item.icon" disabled
                >mdi-pencil-outline</v-icon
              >
            </v-btn>
          </template>
        </v-data-table>
      </v-tab-item>

      <!-- Tab3 เวชสำอาง -->
      <v-tab-item>
        <div class="right">
          <v-row class="mt-5">
            <v-col class="">
              <v-container>
                <div style="margin-left: 50px">
                  สินค้ามีทั้งหมด&nbsp;
                  {{ this.total3 }}
                  &nbsp; รายการ
                </div>
              </v-container>
            </v-col>
            <v-spacer style="width: 40%"></v-spacer>
            <v-col class="">
              <v-text-field
                rounded
                v-model="search"
                label="ค้นหา"
                style="width: 70%"
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
          :items-per-page="5"
          class="elevation-1 ml-16 mr-16"
        >
          <!-- index  -->
          <template slot="item.count" slot-scope="props">
            {{ props.index + 1 }}
          </template>

          <!-- edit  -->
          <template slot="item.icon" slot-scope="props">
            <v-btn small text class="ma-1 col-3" color="#ffffff">
              <v-icon v-model="props.item.icon" disabled
                >mdi-pencil-outline</v-icon
              >
            </v-btn>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["auth"],
  data() {
    return {
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
          value: "med_id",
          class: "blue-grey darken-4 white--text",
        },
        {
          align: "center",
          text: "ชื่อสินค้า",
          value: "med_name",
          class: "blue-grey darken-4 white--text text-center",
        },
        {
          text: "หมวดหมู่",
          align: "center",
          value: "type_name",
          class: "blue-grey darken-4 white--text",
        },
        {
          align: "center",
          text: "หน่วย",
          value: "med_unit",
          class: "blue-grey darken-4 white--text",
        },
        {
          align: "center",
          text: "ราคา",
          value: "med_price",
          class: "blue-grey darken-4 white--text",
        },
        {
          align: "center",
          text: "MIN",
          value: "med_min",
          class: "blue-grey darken-4 white--text",
        },
        {
          align: "center",
          text: "MAX",
          value: "med_max",
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
      product: [
        {
          med_id: "2000000001",
          med_name: "Paracetamol",
          type_name: "ยา",
          med_unit: "เม็ด",
          med_price: 10.0,
          med_min: 50,
          med_max: 50,
        },
      ],
      total: 50,
      total2: 50,
      total3: 50,
      search: "",
    };
  },
  created() {
    if (
      this.$router.history.current.name.split("-")[0] !==
      this.$store.getters.loggedInUser.role_name
    ) {
      this.$router.push("/role_denied");
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    },
  },
};
</script>
