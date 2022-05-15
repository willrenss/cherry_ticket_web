<template>
  <div class="container">
    <div class="divide-y-4 divide-cherry">
      <div></div>
      <div></div>
    </div>
    <div class="py-2 w-auto">
      <div class="container">
        <p class="text-cherry text-right text-2xl font-bold">
          {{ title }}
        </p>
      </div>

      <p class="text-cherry text-6xl font-bold py-2">{{ this.value }}</p>
      <p class="text-cherry py-2 mt-5">{{ this.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Value-item",
  data() {
    return {};
  },
  props: ["value", "title", "description"],
};
</script>
