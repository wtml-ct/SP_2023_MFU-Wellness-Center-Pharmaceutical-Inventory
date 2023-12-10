<template>
<v-container fill-height fill-widht grid-list-md text-xs-center>
    <v-flex>
        <v-card class="mx-auto pa-5" max-width="30rem" rounded="xl" flat color="transparent">
            <v-form ref="loginForm" class="pa-md-5">
                <v-card-text>
                    <div class="py-4 d-flex justify-center">
                        <Logo />
                    </div>
                    <div style="text-align: center">
                        <h2>MFU Wellness Center Pharmaceutical Inventory</h2>
                    </div>
                    <div class="mt-6">
                        <span> Username </span>
                        <v-text-field solo dense rounded v-model="form.user_username" :rules="rules.username" placeholder="Username">
                            <template #prepend-inner>
                                <v-icon class="ml-n2 mr-1"> mdi-account </v-icon>
                            </template>
                        </v-text-field>
                        <span> Password </span>
                        <v-text-field solo dense rounded v-model="form.user_password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'" placeholder="Password" @click:append="showPassword = !showPassword" @keydown.enter="login()">
                            <template #prepend-inner>
                                <v-icon class="ml-n2 mr-1"> mdi-lock </v-icon>
                            </template>
                        </v-text-field>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn large rounded @click="loginUser()">
                        <v-responsive width="9rem" style="font-weight: 900">
                            Login
                        </v-responsive>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-flex>
    <v-dialog persistent v-model="dialog" max-width="35rem" rounded-xl content-class="elevation-0">
        <v-card class="dialog_card" rounded="xl">
            <img :src="infomation_dialog.pic" class="mt-3" style="width: 100px; height: auto" />
            <v-card-title style="justify-content: center">
                <h5>{{ infomation_dialog.title }}</h5>
            </v-card-title>
            <v-card-text>
                <h4>{{ infomation_dialog.text }}</h4>
            </v-card-text>

            <!-- Button -->
            <div>
                <v-btn rounded class="white--text" color="primary" @click='dialog = false && this.$router.push("/login")'>Cancel</v-btn>
                <!-- <v-btn rounded class="white--text" color="red darken-1" href="https://www.facebook.com/mfuactivities" target="_blank">Contact us</v-btn> -->
            </div>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
export default {
    name: "IndexPage",
    layout: "login",
    head: {
        title: "Login",
        meta: [{
            hid: "Login page",
            name: "Login page",
            content: "This page for Login about account to home",
        }, ],
    },
    data() {
        return {
            dialog: false,
            infomation_dialog: {
                pic: "",
                title: "",
                text: "",
                btn: "",
            },
            showPassword: false,
            form: {
                user_username: "",
                user_password: "",
            },
            rules: {
                username: [(v) => !!v || "Please enter your username"],
                password: [
                    (v) => !!v || "Please enter your password",
                    (v) =>
                    !!(v.length >= 8) || "Your password must be at least 8 characters",
                ],
            },
        };
    },
    created() {},
    computed: {},
    methods: {
        async logout() {
            await this.$auth.logout();
            this.$router.push("/login");
        },
        async loginUser() {
            await this.$axios
                .post(
                    "/api/users/login", {
                        username: this.form.user_username,
                        password: this.form.user_password,
                    }, {
                        headers: {
                            "content-type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                        },
                    }
                )
                .then(async (response) => {
                    // console.log(response.data)
                    if (response.data.code == "ECONNREFUSED") {
                        console.log("Err1");
                    } else {
                        await this.$auth.loginWith("local", {
                            data: response.data,
                        });
                        this.$router.push("/");
                    }
                })
                .catch((err) => {
                  this.onDialog();
                  // this.$router.push("/login");
                  console.log(err);
                });
        },
        onDialog() {
            this.infomation_dialog = {
                pic: "/icons/error.png",
                title: "Username or password is incorrect",
                text: "Username or Password is not match or incorrect.",
                btn: "confirm",
            };
            this.dialog = true;
        },
    },
};
</script>

<style scoped>
.card {
    background-color: #b6d2e3;
    width: 40%;
    height: 52%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    padding: 10px;
    text-align: center;
    border-radius: 50px;
}

.dialog_card {
    margin: auto;
    padding: 20px;
    border-radius: 50px;
    text-align: center;
    width: fit-content;
}

.btn {
    font-size: 17px;
    color: #003c7e;
    font-weight: 900;
    width: 150px;
    background-color: #ffffff;
}
</style>
