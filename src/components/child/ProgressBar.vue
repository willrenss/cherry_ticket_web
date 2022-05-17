<template>
  <v-main>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
      {{ text }}
    </v-snackbar>
    <v-dialog v-model="progress" fullscreen>
      <div class="flex h-screen w-screen bg-black opacity-10">
        <div class="m-auto">
          <v-progress-circular indeterminate color="indigov" />
        </div>
      </div>
    </v-dialog>
  </v-main>
</template>

<script>
export default {
  name: "progressbar",
  data() {
    return {};
  },
  props: {
    color: String,
    snackbar: Boolean,
    progress: Boolean,
    text: String,
  },
};
</script>
