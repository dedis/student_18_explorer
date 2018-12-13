<template>

<v-card-title primary-title>
  <p v-if="tx.accepted">
    <v-chip color="teal" text-color="white">
      <v-avatar>
        <v-icon>check_circle</v-icon>
      </v-avatar>
      Accepted
    </v-chip>

    Transaction {{ txi }}
  </p>
  <p v-else>
    <v-chip color="red" text-color="white">
      <v-avatar>
        <v-icon>clear</v-icon>
      </v-avatar>
      Rejected
    </v-chip>
    Transaction {{ txi }}
  </p>
</v-card-title>

</template>

<script>
export default {
  props: ['tx', 'txi']
}
</script>

<style lang="css">
</style>
