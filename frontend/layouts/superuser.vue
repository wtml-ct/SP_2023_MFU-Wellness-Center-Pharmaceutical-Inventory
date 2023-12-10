<template>
  <v-app dark>
    <v-main>
      <v-container>
        <nuxt></nuxt>
      </v-container>
    </v-main>
    <!-- APP BAR -->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      style="background-color: #8ab6d9"
    >
      <!-- <v-app-bar-nav-icon icon @click.stop="miniVariant = !miniVariant" /> -->
      <v-app-bar-nav-icon
        icon
        class="hidden-md-and-down"
        @click.stop="miniVariant = !miniVariant"
      ></v-app-bar-nav-icon>
      <v-btn class="hidden-lg-and-up" icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- <v-avatar size="36" class="mr-2">
            <img src="/icons/user.jpg" alt="John" />
        </v-avatar> -->
      <div class="mr-3">{{ name }}</div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      
      fixed
      app
    >
      <v-list>
        <!-- Logo MFU Wellness -->
        <v-list-item v-for="(item, i) in Logo" :key="'logo-' + i" router exact>
          <v-list-item-action>
            <v-img :src="item.icon" max-height="30" max-width="30"></v-img>
            <!-- <v-icon>{{ item.icon }}</v-icon> -->
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-title>{{ item.subtitle }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Menu section 1 -->
        <v-list-item
          v-for="(item, i) in ProductInfor"
          :key="'product-' + i"
          :to="item.to"
          router
          exact
          link
          @click="changeColor('product-' + i)"
          :class="{ active: selectedproduct === 'product-' + i }"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <!-- Menu group 1 -->
        <v-list-group
          v-for="(item, i) in ImportItem"
          :key="'import-' + i"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
          link
          :class="{ active: selectedimport1 === 'import-' + i }"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            :to="child.to"
            link
            @click="changeColor(child)"
            :class="{ active: selectedimport2 === child }"
          >
            <v-list-item-content>
              <v-list-item-subtitle> {{ child.title }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- Menu section 2 -->
        <v-list-item
          v-for="(item, i) in UpdateInfor"
          :key="'update-' + i"
          :to="item.to"
          router
          exact
          link
          @click="changeColor('update-' + i)"
          :class="{ active: selectedupdate === 'update-' + i }"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-spacer></v-spacer>

        <!-- Menu group 3 -->
        <v-list-group
          v-for="(item, i) in Manage"
          :key="'manage-' + i"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
          link
          :class="{ active: selectedmanage1 === 'manage-' + i }"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            :to="child.to"
            link
            @click="changeColor(child)"
            :class="{ active: selectedmanage2 === child }"
          >
            <v-list-item-content>
              <v-list-item-subtitle> {{ child.title }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

      </v-list>

      <template v-slot:append>
        <v-list-item @click="logout()">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>ออกจากระบบ</v-list-item-subtitle>
        </v-list-item>
      </template>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: true,
      miniVariant: false,
      right: true,
      ProductInfor: [
        {
          icon: "mdi-archive-check-outline",
          title: "รายการสินค้า",
          to: "/Superuser/product_list",
        },
        {
          icon: "mdi-archive-outline",
          title: "สินค้าคงคลัง",
          to: "/Superuser/product",
        },
      ],
      Logo: [
        {
          icon: "/Wellness.png",
          title: "MFU",
          subtitle: "Wellness Center",
        },
      ],
      ImportItem: [
        {
          action: "mdi-archive-arrow-down-outline",
          active: true,
          items: [
            {
              title: "นำเข้าจากการสั่งซื้อ",
              to: "/Superuser/im_buy",
            },
            {
              title: "นำเข้าจากการแลกเปลี่ยน",
              to: "/Superuser/im_exchange",
            },
             {
              title: "นำเข้าจากการโอน",
              to: "/Superuser/receive",
            },
          ],
          title: "นำสินค้าเข้าคลัง",
        },
      ],
      UpdateInfor: [
        {
          icon: "mdi-archive-arrow-up-outline",
          title: "การโอนย้ายสินค้า",
          to: "/Superuser/transfer",
        },
        {
          icon: "mdi-archive-alert-outline",
          title: "จำนวนสินค้าเหลือน้อย",
          to: "/Superuser/low_stock",
        },
        {
          icon: "mdi-archive-clock-outline",
          title: "สินค้าใกล้หมดอายุ",
          to: "/Superuser/product_expire",
        },
        {
          icon: "mdi-receipt-text-clock-outline",
          title: "ประวัติ",
          to: "/Superuser/history",
        },
      ],
      Manage: [
        {
          action: "mdi-account-cog-outline",
          active: true,
          items: [
            {
              title: "ผู้ใช้งาน",
              to: "/Superuser/manageUsers",
            },
            // {
            //   title: "เกี่ยวกับยา",
            //   to: "/Superuser/manageAboutitem",
            // },
          ],
          title: "การจัดการ",
        },
      ],
      title: "Wellness",
      selectedproduct: null,
      selectedimport1: null,
      selectedimport2: null,
      selectedtransaction2: null,
      selectedupdate: null,
      selectedmanage1: null,
      selectedmanage2: null,
    };
  },
  computed: {
    name() {
      return this.$auth.user.name;
    },
  },
  methods: {
    changeColor(i) {
      this.selectedproduct = i;
      this.selectedimport1 = i;
      this.selectedimport2 = i;
      this.selectedtransaction2 = i;
      this.selectedupdate = i;
      this.selectedmanage1 = i;
      this.selectedmanage2 = i;
    },
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.active {
  background-color: #8ab6d9;
  color: #000000;
}
</style>
