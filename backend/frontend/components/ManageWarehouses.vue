<template>
    <div>
    <v-row>
      <v-col class="mt-6 mb-6" cols="12" sm="8" md="6">
        <h2>คลังยา</h2>
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
          เพิ่มคลังยา
        </v-btn>
      </v-col>
    </v-row>
    <div class="right">
        <v-row>
          <v-col>
            <v-container>
              <!-- <div style="margin-left: 50px"> -->
              <p>คลังยามีทั้งหมด&nbsp;{{ this.total }}&nbsp;รายการ</p>
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
          :items="warehouses"
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
      </div>
    </div>
  </template>
  
  <script>
  const URL = "http://localhost:8088";
  export default {
    layout: "superuser",
    middleware: ["auth"],
     //change every "units" to "warehouses" 
    data: () => ({
      dialog: false,
      total: 0,
      search: "",
      warehouses: [],
      headers: [
        {
          text: "#",
          align: "center",
          value: "count",
          sortable: false,
          class: "blue-grey darken-4 white--text",
        },
         {
          text: "รหัสคลังยา",
          align: "center",
          value: "warehouse_id",
          sortable: true,
          class: "blue-grey darken-4 white--text",
        },
        {
          text: "คลังยา",
          align: "center",
          value: "warehouse_name",
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
        warehouse_id: "",
        warehouse_name: "",
      },
      defaultItem: {
        warehouse_id: "",
        warehouse_name: "",
      },
    }),
    created() {
      this.initialize();
    },
    methods: {
      async initialize() {
        this.$axios.get(URL + "/api/warehouses/findAll").then((res) => {
          this.warehouses = res.data;
          this.total = res.data.length;
          console.log("warehouses", this.warehouses);
        });
      },
    },
    async editItem(item) {
      this.editedIndex = this.product.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.initialize();
    },
    async deleteItem(item) {
      this.editedIndex = this.product.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      this.initialize();
    },
  
    async deleteItemConfirm() {
      this.product.splice(this.editedIndex, 1);
  
      await this.$axios.put(URL + "/api/warehouses/delete", this.editedItem);
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
  };
  </script>
  
  <style scoped>
  </style>
  