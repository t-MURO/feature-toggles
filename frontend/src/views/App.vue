<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              :to="item.link"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" :to="item.link">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Feature Toggles</span>
      </v-toolbar-title>
      <global-search />
      <v-spacer></v-spacer>
      <v-btn @click="setDarkMode(!$vuetify.theme.dark)" icon>
        <v-icon>brightness_6</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon @click="logout">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <create-dialog></create-dialog>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CreateDialog from "../components/CreateDialog.vue";
import GlobalSearch from "../components/GlobalSearch";

export default {
  components: {
    CreateDialog,
    GlobalSearch
  },
  data: () => ({
    drawer: null,
    dark: false,
    items: [
      // { icon: "work", text: "Playground", link: "/playground" },
      {
        icon: "power_settings_new",
        text: "Feature Toggles",
        link: "/feature-toggles"
      },
      { icon: "phonelink", text: "Environments", link: "/environments" },
      // {
      //   icon: 'keyboard_arrow_up',
      //   'icon-alt': 'keyboard_arrow_down',
      //   text: 'Labels',
      //   model: true,
      //   children: [
      //     { icon: 'add', text: 'Create label' }
      //   ]
      // },

      // { icon: "settings"w, text: "Settings", link: "settings" }
    ]
  }),
  created() {
    this.loadInitialData();
  },
  props: {
    source: String
  },
  methods: {
    ...mapActions(["logout", "setDarkMode"]),
    ...mapActions("api", ["loadInitialData"])
  },
  computed: {
    ...mapGetters(["getDarkMode"])
  }
};
</script>
<style lang="scss" scoped>
.add-btn {
  .v-btn--floating {
    height: initial;
  }
}
</style>
