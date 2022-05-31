<template>
  <div>
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify
      v-model="content"
      :onchange="getContent()"
      :extensions="extensions"
      placeholder="Write your news here...."
    />
  </div>
</template>

<script>
// import the component and the necessary extensions
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  ListItem,
  BulletList,
  Paragraph,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";

export default {
  components: { TiptapVuetify },
  props: {
    getData: String,
  },
  data: () => ({
    content: "",
    extensions: [
      History,
      Blockquote,
      Link,
      Bold,
      Italic,
      Underline,
      Strike,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      ListItem,
      BulletList,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ],
  }),
  watch: {
    getData(val) {
      this.content = val;
    },
  },
  methods: {
    getContent() {
      this.$emit("getContent", {
        content: this.content,
      });
    },
  },
};
</script>
