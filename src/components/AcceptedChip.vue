<template>

<v-card-title primary-title class="accepted-chip">
  <p v-if="tx.accepted && spawnExists">
    <v-chip color="teal" text-color="white">
      <v-avatar>
        <v-icon>check_circle</v-icon>
      </v-avatar>
      Accepted
    </v-chip>

    Spawn Transaction {{ txi }}
  </p>
  <p v-else-if="tx.accepted && !spawnExists" >
    <v-chip color="teal" text-color="white">
      <v-avatar>
        <v-icon>check_circle</v-icon>
      </v-avatar>
      Accepted
    </v-chip>
    Invoke Transaction {{ txi }}
  </p>
  <p v-else-if="!tx.accepted && spawnExists" >
    <v-chip color="red" text-color="white">
      <v-avatar>
        <v-icon>clear</v-icon>
      </v-avatar>
      Rejected
    </v-chip>
    Spawn Transaction {{ txi }}
  </p>
  <p v-else-if="!tx.accepted && !spawnExists" >
    <v-chip color="red" text-color="white">
      <v-avatar>
        <v-icon>clear</v-icon>
      </v-avatar>
      Rejected
    </v-chip>
    Invoke Transaction {{ txi }}
  </p>
</v-card-title>

</template>

<script>
export default {
  props: ['tx', 'txi', 'spawnExists']
}
</script>

<style lang="css">
.accepted-chip p {
  margin: 0;
}
</style>
