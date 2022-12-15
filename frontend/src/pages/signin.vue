<template>
  <div>
    <div v-if="type === 'smsCode'">
      <smsCodeForm />
    </div>
    <div v-else-if="type === 'registrationNumber'">
      <registrationNumberForm />
    </div>
    <div v-else>
      <notFound />
    </div>
  </div>
</template>

<script>
import smsCodeForm from "../components/smsCodeForm.vue";
import registrationNumberForm from "../components/registrationNumberForm.vue";
import notFound from "./_notFound.vue";

export default {
  components: {
    smsCodeForm,
    registrationNumberForm,
    notFound,
  },

  computed: {
    type() {
      return this.$route.params.type;
    },
  },
};
</script>
