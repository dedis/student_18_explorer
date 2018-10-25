<template lang="html">
<v-container >
  <v-card height="500px">
    <svg height="500px" />
</v-card>
</v-container>
</template>

<script>
import * as d3 from 'd3'
import { misc } from '@jeannechaverot/cothority'

const BLOCK_SIZE = 20
const BLOCK_SEPARATION = 60
const PADDING_X = 60
const PADDING_Y = 200

export default {
  props: ['blocks'],
  mounted: function () {
    const svg = d3.selectAll('svg')
    this.blocks.forEach(block => {
      const group = svg.append('g')
      group.attr('transform', `translate(${block.index * BLOCK_SEPARATION + PADDING_X}, ${PADDING_Y})`)
      const rect = group.append('rect')
      rect.attr('width', BLOCK_SIZE)
        .attr('height', BLOCK_SIZE * block.height)
        .attr('fill', 'brown')
      rect.on('mouseenter', () => {
        svg.append('text')
          .attr('x', 20)
          .attr('y', 20)
          .attr('class', 'infoText')
          .attr('hash', misc.uint8ArrayToHex(block.hash))
          .html('Block index: ' + block.index + ' Block hash: 0x' + misc.uint8ArrayToHex(block.hash))
      })
      rect.on('mouseleave', () => {
        d3.selectAll('.infoText').remove()
      })
      block.backlinks.forEach(backlink => {
        // for each backlink of each block
        const linkTo = this.blocks.find(b => misc.uint8ArrayCompare(backlink, b.hash))
        if (linkTo) {
          const indexDiff = (block.index - linkTo.index)
          group.append('line')
            .attr('x1', BLOCK_SIZE / 2)
            .attr('y1', BLOCK_SIZE / 2)
            .attr('x2', -indexDiff * BLOCK_SEPARATION + BLOCK_SIZE)
            .attr('y2', BLOCK_SIZE / 2)
            .attr('stroke-width', 2)
            .attr('stroke', 'green')
        }
      })
    })
  }
}
</script>

<style lang="css">
svg {
  width: 100%;
}
.infoText {
  position: relative;
  pointer-events: none;
}
</style>
