<template>
<div>
    <!-- หัวข้อ -->
    <v-row>
        <v-col class="mt-6 mb-6" cols="12" sm="8" md="6">
            <h2>นำสินค้าเข้าจากการแลกเปลี่ยน</h2>
        </v-col>
        <v-col>
            <v-btn rounded color="primary" @click="onDialog()" dark class="add d-flex justify-end mb-3 mt-5" style="float: right">
                เพิ่มนำสินค้าเข้าจากการแลกเปลี่ยน
            </v-btn>
        </v-col>
    </v-row>
    <!-- -------------------------------------------------------------------------------------------------------------------------------------- -->
    <!-- ส่วนที่ 1 ยาตัวเดิม -->
    <v-dialog v-model="dialog" persistent>
        <v-form>
            <div>
                <v-app-bar color="#2D4B75" dark>
                    <v-card-title class="text-center justify-center">
                        {{ formTitle }}
                    </v-card-title>
                </v-app-bar>
                <v-card class="pa-5">
                    <v-row no-gutters class="">
                        <h2>ข้อมูลสินค้าตัวเดิม</h2>
                        <h2 style="color: red">*ตัวเดิม</h2>
                    </v-row>

                    <v-row class="mb-5" no-gutters>
                        <!-- แถว 1 -->
                        <!-- 1.1  รหัสสินค้า -->
                        <v-col cols="1">
                            <v-card-text class="ml-1" style="color: black">รหัสสินค้า</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-autocomplete v-model="editedItem.item_old" :rules="rules.validate" @change="onItemIDOld()" :items="itemold" item-text="item_id" item-value="item_id" label="รหัสสินค้า" rounded required outlined dense></v-autocomplete>
                        </v-col>
                        <!-- 1.2  ชื่อสินค้า -->
                        <v-col cols="1">
                            <v-card-text class="ml-1" style="color: black; top: 20px">ชื่อสินค้า</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-autocomplete v-model="form.item_old_name" :rules="rules.validate" :items="itemold" @change="onItemNameOld()" item-text="item_name" item-value="item_name" label="ชื่อสินค้า" rounded required outlined dense></v-autocomplete>
                        </v-col>
                        <!-- 1.3 หน่วยนับ -->
                        <v-col cols="1">
                            <v-card-text class="ml-1" style="color: black; top: 20px">
                                หน่วยนับ</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field v-model="form.unit_old_name" readonly rounded outlined dense></v-text-field>
                        </v-col>

                        <!-- แถว 2 -->
                        <!-- 2.1 ประเภทสินค้า -->
                        <v-col cols="1">
                            <v-card-text class="" style="color: black; top: 20px">
                                ประเภทสินค้า</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field v-model="form.type_old_name" readonly rounded outlined dense></v-text-field>
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
                            <v-card-text class="ml-1" style="color: black; top: 20px">ล็อต</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-autocomplete v-model="editedItem.item_lot_old" :rules="rules.validate" :items="itemlot" @change="onExpByLot()" item-text="sc_lot" item-value="sc_lot" label="เลือกล็อตที่ต้องการเเลกเปลี่ยน" rounded required outlined dense></v-autocomplete>
                        </v-col>

                        <!-- 3.2  วันหมดอายุ -->
                        <v-col cols="1">
                            <v-card-text class="ml-1" style="color: black">วันที่หมดอายุ</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-autocomplete v-model="editedItem.item_exp_old" :rules="rules.validate" @change="onBalancebyExp()" :items="exp" item-text="sc_exp" item-value="sc_exp" label="วันที่หมดอายุ" rounded required outlined dense></v-autocomplete>
                        </v-col>
                        <!-- 3.3 จำนวนที่มีอยู่ตอนนี้ -->
                        <v-col cols="1">
                            <v-card-text class="" style="color: black; top: 20px">
                                จำนวนที่มีอยู่ตอนนี้</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field v-model="editedItem.sc_balance_old" readonly rounded outlined dense></v-text-field>

                        </v-col>

                        <!-- 4.1
                         <v-col cols="1"></v-col>
                        <v-col cols="3"></v-col>
                        4.2 
                        <v-col cols="1"></v-col>
                        <v-col cols="3"></v-col>
                       4.3
                        <v-col cols="1">
                            <v-card-text style="color: black; top: 20px">
                                จำนวน</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field v-model="editedItem.sc_balance_old" type="number" min="0" :rules="numberOnly() && rules.validate" label="จำนวนที่ต้องการนำไปเเลกเปลี่่ยน" rounded required outlined dense></v-text-field>
                        </v-col> -->
                    </v-row>

                    <v-divider></v-divider>

                    <!-- -------------------------------------------------------------------------------------------------------------------------------------- -->

                    <!-- ส่วนที่ 2 -->
                    <v-row no-gutters class="mb-5 mt-5">
                        <h2>กรอกข้อมูลขำเข้าสินค้า</h2>
                        <h2 style="color: red">*ตัวใหม่</h2>
                    </v-row>

                    <v-row no-gutters>
                        <!-- แถว 1 -->
                        <!-- 1.1  รหัสสินค้า -->
                        <v-col cols="1">
                            <v-card-text class="ml-1" style="color: black">รหัสสินค้า</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-autocomplete v-model="editedItem.item_id" :rules="rules.validate" @change="onItemID()" :items="item" item-text="item_id" item-value="item_id" label="รหัสสินค้า" rounded required outlined dense></v-autocomplete>
                        </v-col>
                        <!-- 1.2  ชื่อสินค้า -->
                        <v-col cols="1">
                            <v-card-text class="ml-1" style="color: black; top: 20px">ชื่อสินค้า</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-autocomplete v-model="form.item_name" :rules="rules.validate" :items="item" @change="onItemName()" item-text="item_name" item-value="item_name" label="ชื่อสินค้า" rounded required outlined dense></v-autocomplete>
                        </v-col>
                        <!-- 1.3 หน่วยนับ -->
                        <v-col cols="1">
                            <v-card-text class="ml-1" style="color: black; top: 20px">
                                หน่วยนับ</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field v-model="form.unit_name" readonly rounded outlined dense></v-text-field>
                        </v-col>

                        <!-- แถว 2 -->
                        <!-- 2.1 ประเภทสินค้า -->
                        <v-col cols="1">
                            <v-card-text class="" style="color: black; top: 20px">
                                ประเภทสินค้า</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field v-model="form.type_name" readonly rounded outlined dense></v-text-field>
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
                            <v-card-text class="ml-1" style="color: black; top: 20px">
                                ล็อต</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field v-model="editedItem.sc_lot" label="หมายเลข Lot" type="number" min="0" :rules="numberOnly() && rules.validate" rounded outlined required dense></v-text-field>
                        </v-col>
                        <!-- 3.2 po -->
                        <v-col cols="1">
                            <v-card-text class="ml-1" style="color: black; top: 20px">
                                ใบสั่งซื้อ</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field v-model="editedItem.sc_po" label="หมายเลขใบสั่งซื้อ" type="number" min="0" :rules="numberOnly() && rules.validate" rounded outlined required dense></v-text-field>
                        </v-col>
                        <!-- 3.3 เลขใบส่งของ  -->
                        <v-col cols="1">
                            <v-card-text class="ml-1" style="color: black; top: 20px">
                                เลขใบส่งของ</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field v-model="editedItem.sc_delivery" label="หมายเลขเลขใบส่งของ" type="number" min="0" :rules="numberOnly() && rules.validate" rounded outlined required dense></v-text-field>
                        </v-col>
                        <!-- เเถว 4 -->
                        <!-- 4.1 จำนวน -->
                        <v-col cols="1">
                            <v-card-text class="ml-1" style="color: black; top: 20px">
                                จำนวน</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field v-model="editedItem.sc_balance" type="number" min="0" :rules="numberOnly() && rules.validate" label="ระบุจำนวนที่ต้องการนำเข้า" rounded required outlined dense></v-text-field>
                        </v-col>

                        <!-- 4.2  IMPORT Date -->
                        <v-col cols="1">
                            <v-card-text class="ml-1" style="color: black">วันที่นำเข้า</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-menu ref="menuimport" v-model="menuimport" :close-on-content-click="false" :return-value.sync="editedItem.sc_import" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field :rules="rules.validate" v-model="editedItem.sc_import" label="วันที่นำเข้า" append-icon="mdi-calendar" v-bind="attrs" v-on="on" rounded readonly dense outlined required></v-text-field>
                                </template>
                                <v-date-picker v-model="editedItem.sc_import" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menuimport = false">
                                        ยกเลิก
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.menuimport.save(editedItem.sc_import)">
                                        ยืนยัน
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <!-- 4.3 EXP Date -->
                        <v-col cols="1">
                            <v-card-text class="ml-1" style="color: black; top: 20px">วันหมดอายุ</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-menu ref="menuexp" v-model="menuexp" :close-on-content-click="false" :return-value.sync="editedItem.sc_exp" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field :rules="rules.validate" v-model="editedItem.sc_exp" label="วันที่หมดอายุ" append-icon="mdi-calendar" v-bind="attrs" v-on="on" rounded readonly dense outlined required></v-text-field>
                                </template>
                                <v-date-picker v-model="editedItem.sc_exp" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menuexp = false">
                                        ยกเลิก
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.menuexp.save(editedItem.sc_exp)">
                                        ยืนยัน
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <!-- เเถว 5 -->
                        <!-- 5.1 ราคา -->
                        <v-col cols="1">
                            <v-card-text class="ml-1" style="color: black; top: 20px">
                                ราคา</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field v-model="editedItem.sc_price" type="number" min="0" :rules="numberOnly() && rules.validate" label="ระบุราคา" rounded required outlined dense></v-text-field>
                        </v-col>

                        <!-- 5.2 นำเข้าจาก  -->
                        <v-col cols="1">
                            <v-card-text class="ml-1" style="color: black">นำเข้าจาก</v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-autocomplete v-model="editedItem.from_warehouse" :rules="rules.validate" :items="from_wh" return-object item-text="warehouse_name" item-value="warehouse_id" label="สถานที่นำเข้า" rounded required outlined dense></v-autocomplete>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-card-actions>
                            <v-btn color="primary" rounded text style="width: 100px" @click="dialog = false">ยกเลิก</v-btn>
                            <v-btn color="primary" rounded style="width: 100px" type="submit" @click="submit()">บันทึก</v-btn>
                        </v-card-actions>
                    </v-row>
                </v-card>
            </div>
        </v-form>
    </v-dialog>

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
                    <v-text-field rounded v-model="search" label="ค้นหา" append-icon="mdi-magnify" outlined dense>
                    </v-text-field>
                </v-col>
            </v-row>
        </div>
        <v-data-table :headers="headers" :search="search" :items="product" :items-per-page="10" class="elevation-1">
            <!-- index  -->
            <template slot="item.count" slot-scope="props">
                {{ props.index + 1 }}
            </template>

            <template slot="item.icon" slot-scope="props">
                <!-- view -->
                <v-btn small @click="showItem(props.item)" text color="#ffffff">
                    <v-icon v-model="props.item.icon" disabled>mdi-file-document</v-icon>
                </v-btn>
                <!-- edit  -->
                <v-btn @click="editItem(props.item)" small text color="#ffffff">
                    <v-icon v-model="props.item.icon" disabled>mdi-pencil-outline</v-icon>
                </v-btn>
                <!-- delete -->
                <v-btn small @click="deleteItem(props.item)" text color="#ffffff">
                    <v-icon v-model="props.item.icon" disabled>mdi-delete</v-icon>
                </v-btn>
            </template>

            <template slot="item.status_id" slot-scope="props">
                <v-btn width="100px" small rounded :class="getStatusClass(props.item)" style="color: white" @click="acceptItem(props.item)">
                    {{ getStatusText(props.item) }}
                </v-btn>
            </template>
        </v-data-table>
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
        <!-- Dialog ตกลง -->
        <v-dialog v-model="dialogAccept" max-width="500px">
            <v-card>
                <v-app-bar color="#2D4B75" dark>
                    <v-card-title> ยืนยันการรับเข้า </v-card-title>
                </v-app-bar>
                <v-container>
                    <v-form @submit.prevent="submitAccept()">
                        <v-card-text class="mt-2" style="font-size: 16px">
                            <v-row>
                                <v-col cols="4"> รหัสการนำเข้าสินค้า </v-col>
                                <v-col cols="8">
                                    {{ editedItem.sc_id }}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4"> ชื่อสินค้าตัวใหม่ </v-col>
                                <v-col cols="8">
                                    {{ editedItem.item_name }}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4"> วันที่นำเข้า </v-col>
                                <v-col cols="8">
                                    {{ editedItem.sc_import }}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4"> นำเข้าจาก </v-col>
                                <v-col cols="8">
                                    {{ editedItem.from_warehouse_name }}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4"> จำนวนรับเข้า </v-col>
                                <v-col cols="8">
                                    {{ editedItem.sc_balance }}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4"> หน่วยนับ </v-col>
                                <v-col cols="8">
                                    {{ editedItem.unit_name }}
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions class="mt-2">
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text style="width: 100px" @click="dialogAccept = false">ยกเลิก</v-btn>
                            <v-btn color="primary" rounded style="width: 150px" type="submit" @click="submitAccept()">ยืนยันการรับเข้า</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>
        <!-- Dialog ข้อมูลสินค้าเเลกเปลี่ยน -->
        <v-dialog v-model="dialogView" max-width="600px">
            <v-card>
                <v-app-bar color="#2D4B75" dark>
                    <v-card-title> ข้อมูลสินค้าเเลกเปลี่ยน </v-card-title>
                </v-app-bar>
                <v-container>
                    <v-form>
                        <v-card-text class="mt-2" style="font-size: 16px">
                            <v-row>
                                <v-col cols="4"> รหัสการนำเข้าสินค้า </v-col>
                                <v-col cols="8">
                                    {{ editedItem.sc_id }}
                                </v-col>
                            </v-row>
                            <v-divider class="mt-5 mb-5"></v-divider>
                            <v-row>
                                <v-col cols="4"> รหัสสินค้าตัวเก่า </v-col>
                                <v-col cols="8">
                                    {{ editedItem.item_old }}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4"> ชื่อสินค้าตัวเก่า </v-col>
                                <v-col cols="8">
                                    {{ editedItem.item_old_name }}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4"> lot ตัวเก่า </v-col>
                                <v-col cols="8">
                                    {{ editedItem.item_lot_old }}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4"> exp ตัวเก่า </v-col>
                                <v-col cols="8">
                                    {{ editedItem.item_exp_old }}
                                </v-col>
                            </v-row>
                            <v-divider class="mt-5 mb-5"></v-divider>
                            <v-row>
                                <v-col cols="4"> รหัสสินค้าตัวใหม่ </v-col>
                                <v-col cols="8">
                                    {{ editedItem.item_id }}
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="4"> ชื่อสินค้าตัวใหม่ </v-col>
                                <v-col cols="8">
                                    {{ editedItem.item_name }}
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="4"> lot ตัวใหม่ </v-col>
                                <v-col cols="8">
                                    {{ editedItem.sc_lot }}
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="4"> exp ตัวใหม่ </v-col>
                                <v-col cols="8">
                                    {{ editedItem.sc_exp }}
                                </v-col>
                            </v-row>
                            <v-divider class="mt-5 mb-5"></v-divider>
                            <v-row>
                                <v-col cols="4"> วันที่นำเข้า </v-col>
                                <v-col cols="8">
                                    {{ editedItem.sc_import }}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4"> นำเข้าจาก </v-col>
                                <v-col cols="8">
                                    {{ editedItem.from_warehouse_name }}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4"> จำนวนรับเข้า </v-col>
                                <v-col cols="8">
                                    {{ editedItem.sc_balance }}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4"> หน่วยนับ </v-col>
                                <v-col cols="8">
                                    {{ editedItem.unit_name }}
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions class="mt-2">
                            <v-spacer></v-spacer>
                            <v-btn color="primary" rounded style="width: 150px" type="submit" @click="dialogView = false">ตกลง</v-btn>
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
export default {
    layout: "superuser",
    // middleware: ["auth"],
    data() {
        return {
            ...Validation,
            headers: [{
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
                    text: "รหัสการนำเข้าสินค้า",
                    align: "center",
                    value: "sc_id",
                    class: "blue-grey darken-4 white--text",
                },
                {
                    text: "รหัสสินค้าตัวใหม่",
                    align: "center",
                    value: "item_id",
                    class: "blue-grey darken-4 white--text",
                },
                {
                    align: "center",
                    text: "ชื่อสินค้าตัวใหม่",
                    value: "item_name",
                    class: "blue-grey darken-4 white--text text-center",
                },
                {
                    align: "center",
                    text: "จำนวนรับเข้า",
                    value: "sc_balance",
                    class: "blue-grey darken-4 white--text",
                },
                {
                    text: "รหัสสินค้าตัวเก่า",
                    align: "center",
                    value: "item_old",
                    class: "blue-grey darken-4 white--text",
                },
                {
                    align: "center",
                    text: "ชื่อสินค้าตัวเก่า",
                    value: "item_old_name",
                    class: "blue-grey darken-4 white--text text-center",
                },
                {
                    align: "center",
                    text: "จำนวนนำเเลกเปลี่ยน",
                    value: "sc_balance_old",
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
                    text: "IMPORT",
                    value: "sc_import",
                    class: "blue-grey darken-4 white--text",
                },
                {
                    align: "center",
                    text: "นำเข้าจาก",
                    value: "from_warehouse_name",
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
            dialogView: false,
            dialogAccept: false,
            dialog: false,
            dialogDelete: false,
            product: [],
            menuimport: false,
            menuexp: false,
            item: [],
            itemold: [],
            itemlot: [],
            exp: ["กรุณาเลือกล็อตที่นำไปเเลกเปลี่ยน"],
            unit: [],
            type: [],
            from_wh: [],
            editedIndex: -1,
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
                to_warehouse: "",
                status_id: 0,
                action_id: 0,
                username: "",
                sc_balance: "",
                sc_price: "",
                item_old: "",
                sc_balance_old: 0,
                item_exp_old: "",
                item_lot_old: "",
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
                sc_price: "",
                item_old: "",
                sc_balance_old: 0,
                item_exp_old: "",
                item_lot_old: "",
            },
            form: {
                item_old_name: "",
                type_old_name: "",
                unit_old_name: "",
                balance_old: 0,
                item_name: "",
                type_name: "",
                unit_name: "",
            },
            search: "",
            total: 0,
            rules: {
                validate: [(v) => !!v || "กรุณากรอกข้อมูล"],
            },
        };
    },
    computed: {
        formTitle() {
            return this.editedIndex == -1 ?
                "เพิ่มนำสินค้าเข้าจากการแลกเปลี่ยน" :
                "เเก้ไขนำสินค้าเข้าจากการแลกเปลี่ยน";
        },
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
        dialogAccept(val) {
            val || this.closeAccept();
        },
    },
    created() {
        this.initialize();
    },
    methods: {
        getStatusClass(item) {
            return item.status_id === 1 ? "success" : "warning";
        },
        getStatusText(item) {
            return item.status_id === 1 ? "ตรวจรับสำเร็จ" : "รอการตรวจรับ";
        },
        async initialize() {
            // นำเข้า
            this.$axios.get("/api/stockcards/findByActions/4").then((res) => {
                this.product = res.data.filter(
                    (item) => item.sc_id > "IM20000000" && item.sc_id <= "IM30000000"
                );

                console.log("product", this.product);
                this.total = this.product.length;
            });
            this.$axios.get("/api/stockcards/findByActions/5").then((res) => {
                this.itemold = res.data.filter(
                    (itemold) =>
                    itemold.sc_id > "TF20000000" && itemold.sc_id <= "TF30000000"
                );
                console.log("item_old: " + this.itemold);
            });
            //  warehouses
            this.$axios.get("/api/warehouses/findAll").then((res) => {
                // Assuming res.data is an array of warehouses
                this.from_wh = res.data.filter(
                    (from_wh) =>
                    from_wh.warehouse_id >= "0001" && from_wh.warehouse_id < "1000"
                );
            });
            // item
            this.$axios.get("/api/items/findAll").then((res) => {
                this.item = res.data;
                console.log("item", this.item);
            });
        },
        onDialog() {
            this.dialog = true;
            if (this.product.length != 0) {
                const index = this.product.length - 1;
                const info = this.product[index].sc_id;
                // slice(start, end)
                const numbers = parseInt(info.slice(2, 10)) + 1;
                const numbersString = String(numbers);
                const new_id = info.slice(0, 2) + numbersString.padStart(8, "0");
                console.log(new_id);
                this.editedItem.sc_id = new_id;
            } else {
                this.editedItem.sc_id = "IM20000001";
            }
        },
        onExpByLot() {
            // Find exp
            this.$axios
                .get(
                    `/api/stockcards/findByItemIDandLot/${this.editedItem.item_old}/${this.editedItem.item_lot_old}`
                )
                .then((res) => {
                    this.exp = res.data;
                    console.log("exp", this.exp);
                });
        },
        onBalancebyExp() {
            // Find balance
            this.$axios
                .get(
                    `/api/stockcards/findinBalanceExchange/1008/${this.editedItem.item_old}/${this.editedItem.item_lot_old}/${this.editedItem.item_exp_old}`
                )
                .then((res) => {
                    this.editedItem.sc_balance_old = res.data[0].sc_balance;
                });
        },
        async onItemIDOld() {
            console.log("old");
            await this.$axios
                .get("/api/items/findByItemID/" + this.editedItem.item_old)
                .then((res) => {
                    console.log(res.data);
                    this.form.item_old_name = res.data.item_name;
                    this.form.type_old_name = res.data.type_name;
                    this.form.unit_old_name = res.data.unit_name;
                    // Find lots
                    this.$axios
                        .get("/api/stockcards/findByItemID/" + this.editedItem.item_old)
                        .then((res) => {
                            this.itemlot = res.data.filter(
                                (itemlot) =>
                                itemlot.action_id == "5"
                            );
                            console.log("lot", this.itemlot);
                        }).catch((e) => {
                            this.itemlot = ["ไม่มีล็อต"];
                        });
                });
            this.form.exp_old = "";
            this.form.balance_old = "";
            console.log(this.form);
        },
        async onItemID() {
            console.log("new");
            await this.$axios
                .get("/api/items/findByItemID/" + this.editedItem.item_id)
                .then((res) => {
                    console.log("new", res.data);
                    this.form.item_name = res.data.item_name;
                    this.form.type_name = res.data.type_name;
                    this.form.unit_name = res.data.unit_name;
                });
            console.log(this.form);
        },
        onItemNameOld() {
            console.log(this.form.item_name);
            this.$axios
                .get("/api/items/findByItemName/" + this.form.item_old_name)
                .then((res) => {
                    this.editedItem.item_old = res.data.item_id;
                    this.form.type_old_name = res.data.type_name;
                    this.form.unit_old_name = res.data.unit_name;
                    this.$axios
                        .get("/api/stockcards/findByItemID/" + this.editedItem.item_old)
                        .then((res) => {
                            this.itemlot = res.data.filter(
                                (itemlot) =>
                                itemlot.action_id == "5"
                            );
                            console.log("lot", this.itemlot);
                        }).catch((e) => {
                            this.itemlot = ["ไม่มีล็อต"];
                        });
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
                });
        },
        submitAccept() {
            this.$axios.put("/api/stockcards/", {
                sc_id: this.editedItem.sc_id,
                status_id: 1,
            });
            this.dialogAccept = false;
            this.initialize();
        },
        submit() {
            this.editedItem.username = this.$auth.user.username;
            this.editedItem.to_warehouse = "1003";
            this.editedItem.action_id = 4;
            this.editedItem.status_id = 0;

            console.log(this.editedItem.sc_balance_old);
            console.log(this.editedItem.item_old);

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
                    action_id: 4,
                    sc_delivery: this.editedItem.sc_delivery,
                    from_warehouse: this.editedItem.from_warehouse.warehouse_id,
                    to_warehouse: this.editedItem.to_warehouse,
                    status_id: this.editedItem.status_id,
                    username: this.editedItem.username,
                    sc_balance: this.editedItem.sc_balance,
                    sc_price: this.editedItem.sc_price,
                    sc_balance_old: this.editedItem.sc_balance_old,
                    item_old: this.editedItem.item_old,
                    item_lot_old: this.editedItem.item_lot_old,
                    item_exp_old: this.editedItem.item_exp_old,
                };
                console.log("newdata", Newdata);
                try {
                    if (this.editedIndex > -1) {
                        this.$axios.put("/api/stockcards/", Newdata);
                        this.initialize();
                    } else {
                        this.$axios.post("/api/stockcards/", Newdata);
                        this.initialize();
                    }
                    this.dialog = false;
                } catch (err) {
                    console.log(err);
                }

            } else {
                alert("กรุณากรอกให้ครบถ้วน");
            }
        },
        async showItem(item) {
            this.dialogView = true;
            this.editedItem = Object.assign({}, item);
            console.log(item);
        },
        async deleteItem(item) {
            this.dialogDelete = true;
            this.editedIndex = this.product.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.initialize();
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
        async deleteItemConfirm() {
            this.product.splice(this.editedIndex, 1);
            const sc_id = this.editedItem.sc_id;
            await this.$axios.put("/api/stockcards/delete", {
                sc_id,
            });
            this.closeDelete();
        },
        closeAccept() {
            this.dialogAccept = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
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
            this.form = "";
        },
        async editItem(item) {
            this.editedIndex = this.product.indexOf(item);
            this.form = Object.assign({}, item);
            console.log("form", this.form);
            this.editedItem = Object.assign({}, item);
            this.itemlot[0] = item.item_lot_old;
            this.exp[0] = item.item_exp_old;
            console.log("editedItem", this.editedItem);
            this.dialog = true;
            this.initialize();
        },
    },
};
</script>

<style scoped>
.justify-end {
    justify-content: flex-end;
}
</style>
