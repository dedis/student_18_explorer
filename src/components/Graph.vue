<template lang="html">
  <section>
  </section>
</template>

<script>
import * as d3 from 'd3'

export default {
  mounted: function () {
    const section = d3.selectAll('section')

    section.append('div')
      .html('First!')

    section.append('div')
      .html('Second.')
  }
}
</script>

<style lang="css">
</style>
