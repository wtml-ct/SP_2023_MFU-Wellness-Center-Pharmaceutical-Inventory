<template>
<div>
    <v-row>
        <v-col class="mt-6 mb-6" cols="12" sm="8" md="6">
            <h2>การจัดการผู้ใช้งาน</h2>
        </v-col>
        <v-col>
            <v-btn rounded color="primary" @click="dialog = true" dark class="add d-flex justify-end mb-3 mt-5" style="float: right">
                เพิ่มผู้ใช้งาน
            </v-btn>
        </v-col>
    </v-row>

    <v-tabs fixed-tabs show-arrows>
        <v-tabs-slider class="mt-6" color="primary"></v-tabs-slider>
        <v-tab @click="value = '0'">ทั้งหมด</v-tab>
        <v-tab @click="value = '2'">Staff</v-tab>
        <v-tab @click="value = '3'">Superuser</v-tab>

        <!-- Tab1 All -->
        <v-tab-item>
            <div class="right">
                <v-row class="mt-10">
                    <v-col>
                        <v-container>
                            <!-- <div style="margin-left: 50px"> -->
                            <p>ผู้ใช้งานมีทั้งหมด&nbsp;{{ this.total }}&nbsp;รายการ</p>
                            <!-- </div> -->
                        </v-container>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col>
                        <v-text-field v-model="search" label="ค้นหา" append-icon="mdi-magnify" rounded outlined dense>
                        </v-text-field>
                    </v-col>
                </v-row>
            </div>

            <v-data-table :headers="headers" :search="search" :items="user" :items-per-page="10" class="elevation-1">
                <!-- index  -->
                <template slot="item.count" slot-scope="props">
                    {{ props.index + 1 }}
                </template>

                <template slot="item.icon" slot-scope="props">
                    <!-- edit  -->
                    <v-btn @click="editItem(props.item)" small text class="col-3" color="#ffffff">
                        <v-icon v-model="props.item.icon" disabled>mdi-pencil-outline</v-icon>
                    </v-btn>
                    <!-- delete -->
                    <v-btn small @click="deleteItem(props.item)" text class="col-3" color="#ffffff">
                        <v-icon v-model="props.item.icon" disabled>mdi-delete</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-tab-item>

        <!-- Tab3  Staff -->
        <v-tab-item>
            <div class="right">
                <v-row class="mt-10">
                    <v-col>
                        <v-container>
                            <!-- <div style="margin-left: 50px"> -->
                            <p>ผู้ใช้งานมีทั้งหมด&nbsp;{{ this.total2 }}&nbsp;รายการ</p>
                            <!-- </div> -->
                        </v-container>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col>
                        <v-text-field rounded v-model="search2" label="ค้นหา" append-icon="mdi-magnify" outlined dense>
                        </v-text-field>
                    </v-col>
                </v-row>
            </div>

            <v-data-table :headers="headers" :search="search2" :items="staff" :items-per-page="10" class="elevation-1">
                <!-- index  -->
                <template slot="item.count" slot-scope="props">
                    {{ props.index + 1 }}
                </template>

                <template slot="item.icon" slot-scope="props">
                    <!-- edit  -->
                    <v-btn @click="editItem(props.item)" small text class="col-3" color="#ffffff">
                        <v-icon v-model="props.item.icon" disabled>mdi-pencil-outline</v-icon>
                    </v-btn>
                    <!-- delete -->
                    <v-btn small @click="deleteItem(props.item)" text class="col-3" color="#ffffff">
                        <v-icon v-model="props.item.icon" disabled>mdi-delete</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-tab-item>

        <!-- Tab4 Superuser -->
        <v-tab-item>
            <div class="right">
                <v-row class="mt-10">
                    <v-col>
                        <v-container>
                            <!-- <div style="margin-left: 50px"> -->
                            <p>ผู้ใช้งานมีทั้งหมด&nbsp;{{ this.total3 }}&nbsp;รายการ</p>
                            <!-- </div> -->
                        </v-container>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col>
                        <v-text-field rounded v-model="search3" label="ค้นหา" append-icon="mdi-magnify" outlined dense>
                        </v-text-field>
                    </v-col>
                </v-row>
            </div>

            <v-data-table :headers="headers" :search="search3" :items="superuser" :items-per-page="10" class="elevation-1">
                <!-- index  -->
                <template slot="item.count" slot-scope="props">
                    {{ props.index + 1 }}
                </template>

                <template slot="item.icon" slot-scope="props">
                    <!-- edit  -->
                    <v-btn @click="editItem(props.item)" small text class="col-3" color="#ffffff">
                        <v-icon v-model="props.item.icon" disabled>mdi-pencil-outline</v-icon>
                    </v-btn>
                    <!-- delete -->
                    <v-btn small @click="deleteItem(props.item)" text class="col-3" color="#ffffff">
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
                                <v-subheader style="color: black">หน้าที่</v-subheader>
                            </v-col>
                            <v-col cols="4">
                                <v-autocomplete :items="roles" item-text="role_name" item-value="role_id" label="หน้าที่" rounded v-model="editedItem.role_id" @change="onType()" outlined required dense></v-autocomplete>
                            </v-col>

                            <v-col cols="2">
                                <v-subheader>รหัสผู้ใช้งาน</v-subheader>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field rounded label="รหัสผู้ใช้งาน" v-model="editedItem.user_id" outlined readonly dense></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-subheader style="color: black">ชื่อผู้ใช้งาน</v-subheader>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field append rounded label="ชื่อผู้ใช้งาน" v-model="editedItem.name" outlined required dense></v-text-field>
                            </v-col>

                            <v-col cols="2">
                                <!-- <v-subheader style="color: black">Minimun</v-subheader> -->
                            </v-col>
                            <v-col cols="4">
                                <!-- <v-text-field rounded v-model="editedItem.item_min" label="Minimun" outlined required type="number" min="0" :rules="[numberOnly()] "></v-text-field> -->
                            </v-col>

                            <v-col cols="2">
                                <v-subheader style="color: black">Username</v-subheader>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field append rounded label="Username" v-model="editedItem.username" outlined required dense></v-text-field>
                            </v-col>

                            <v-col cols="2">
                                <v-subheader style="color: black">Password</v-subheader>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field rounded label="Password" v-model="editedItem.password" outlined required dense></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <!-- <v-col class="mt-2" cols="4"> -->
                <v-card-actions style="top=-10%">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text style="width: 100px" @click="dialog = false">ยกเลิก</v-btn>
                    <v-btn color="primary" rounded style="width: 100px" type="submit">บันทึก</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
                <!-- </v-col> -->
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
                            <v-col cols="3"> รหัสผู้ใช้งาน </v-col>
                            <v-col cols="9">
                                {{ editedItem.user_id }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3"> ชื่อผู้ใช้งาน </v-col>
                            <v-col cols="9">
                                {{ editedItem.name }}
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="mt-2">
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text style="width: 100px" @click="dialogDelete = false">ยกเลิก</v-btn>
                        <v-btn color="primary" rounded style="width: 100px" type="submit">ยืนยันลบ</v-btn>
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
    middleware: ["auth"],
    data: () => ({
        // data() {
        // return {
        ...Validation,
        headers: [{
                text: "#",
                align: "center",
                value: "count",
                sortable: false,
                class: "blue-grey darken-4 white--text",
            },
            {
                text: "รหัสผู้ใช้งาน",
                align: "center",
                value: "user_id",
                sortable: true,
                class: "blue-grey darken-4 white--text",
            },
            {
                align: "left",
                text: "ชื่อผู้ใช้งาน",
                value: "name",
                class: "blue-grey darken-4 white--text text-center",
            },
            {
                align: "center",
                text: "Username",
                value: "username",
                class: "blue-grey darken-4 white--text",
            },
            {
                align: "center",
                text: "หน้าที่",
                value: "role_name",
                class: "blue-grey darken-4 white--text",
            },
              {
                align: "center",
                text: "ประจำ",
                value: "warehouse_name",
                class: "blue-grey darken-4 white--text",
            },
            {
                align: "center",
                text: "ACTION",
                sortable: false,
                value: "icon",
                class: "blue-grey darken-4 white--text",
            },
        ],
        user: [],
        staff: [],
        superuser: [],
        roles: [],
        total: "",
        total1: "",
        total2: "",
        total3: "",
        page: 1,
        dialog: false,
        dialogDelete: false,
        search: "",
        search1: "",
        search2: "",
        search3: "",
        index: 0,
        value: "0",
        editedIndex: -1,
        editedItem: {
            role_id: 0,
            user_id: "",
            name: "",
            username: "",
            password: "",
        },
        defaultItem: {
            role_id: 0,
            user_id: "",
            name: "",
            username: "",
            password: "",
        },
        // };
        // },
    }),
    computed: {
        formTitle() {
            return this.editedIndex == -1 ? "เพิ่มผู้ใช้งาน" : "เเก้ไขผู้ใช้งาน";
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
          
          if (this.editedItem.role_id == 2) {
                // STAFF
                await this.$axios
                    .get("/api/users/findByRoleID/2")
                    .then((res) => {
                        var index = res.data.length - 1;
                        var info = res.data[index].user_id;
                        var info_2 = parseInt(info);
                        var new_2 = info_2 + 1;
                        var new_s = new_2.toString();
                        this.editedItem.user_id = new_s;
                    })
                    .catch((err) => {
                        this.editedItem.user_id = "120000000";
                    });
            } else if (this.editedItem.role_id == 3) {
                await this.$axios
                    .get("/api/users/findByRoleID/3")
                    .then((res) => {
                        var index = res.data.length - 1;
                        var info = res.data[index].user_id;
                        var info_2 = parseInt(info);
                        var new_2 = info_2 + 1;
                        var new_s = new_2.toString();
                        this.editedItem.user_id = new_s;
                    })
                    .catch((err) => {
                        this.editedItem.user_id = "130000000";
                    });
            }
        },

        async initialize() {
            this.$axios.get("/api/users/findAll").then((res) => {
                this.user = res.data;
                this.total = res.data.length;
                console.log(this.user);
            });
            this.$axios.get("/api/users/findByRoleID/3").then((res) => {
                this.superuser = res.data;
                this.total3 = res.data.length;
                console.log(this.superuser);
            });
         
            this.$axios.get("/api/users/findByRoleID/2").then((res) => {
                this.staff = res.data;
                this.total2 = res.data.length;
                console.log(this.staff);
            });
            this.$axios.get("/api/roles/findAll").then((res) => {
                var info = res.data;
                this.roles = info;
                console.log(this.roles);
            });
        },

        async editItem(item) {
            console.log("edit");
            console.log(this.editedIndex);
            console.log(this.value);
            if (this.value == "0") {
                this.editedIndex = this.user.indexOf(item);
            } else if (this.value == "2") {
                this.editedIndex = this.staff.indexOf(item);
            } else {
                this.editedIndex = this.superuser.indexOf(item);
            }
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
            this.initialize();
        },
        async deleteItem(item) {
            console.log("delete", item.user_id);
            if (this.value == "0") {
                this.editedIndex = this.user.indexOf(item);
            } else if (this.value == "2") {
                this.editedIndex = this.staff.indexOf(item);
            } else {
                this.editedIndex = this.superuser.indexOf(item);
            }
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
            this.initialize();
        },

        async deleteItemConfirm() {
            if (this.value == "0") {
                this.user.splice(this.editedIndex, 1);
            }  else if (this.value == "2") {
                this.staff.splice(this.editedIndex, 1);
            } else {
                this.superuser.splice(this.editedIndex, 1);
            }
            console.log("delete", this.editedItem);
            await this.$axios.put("/api/users/delete", this.editedItem);
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

        async save() {
            if (this.editedIndex > -1) {
                if (this.value == "0") {
                    Object.assign(this.user[this.editedIndex], this.editedItem);
                } else if (this.value == "3") {
                    Object.assign(this.staff[this.editedIndex], this.editedItem);
                } else {
                    Object.assign(this.superuser[this.editedIndex], this.editedItem);
                }
                delete this.editedItem.role_name;
                await this.$axios.put("/api/users", this.editedItem);
                this.close();
            } else {
                if (
                    this.editedItem.user_id.length != 0 &&
                    this.editedItem.name.length != 0 &&
                    this.editedItem.username.length != 0 &&
                    this.editedItem.password.length != 0 &&
                    this.editedItem.role_id.length != 0
                ) {
                    console.log("user", this.editedItem);
                    this.$axios.post("/api/users", this.editedItem);
                    this.close();
                } else {
                    alert("กรุณากรอกให้ครบถ้วน");
                }
            }
            this.initialize();
        },
    },
};
</script>

<style scoped>
</style>
