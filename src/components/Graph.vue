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
        const to = this.blocks.find(b => misc.uint8ArrayCompare(backlink, b.hash))
        if (to) {
          const indexDiff = (block.index - to.index)
          group.append('line')
            .attr('x1', BLOCK_SIZE / 2)
            .attr('y1', BLOCK_SIZE / 2)
            .attr('x2', - indexDiff * BLOCK_SEPARATION + BLOCK_SIZE)
            .attr('y2', BLOCK_SIZE / 2)
            .attr('stroke-width', 2)
            .attr('stroke', 'green')
        }
      })
      let maxDiff = 0
      block.forward.forEach(forward => {
        const to = this.blocks.find(b => misc.uint8ArrayCompare(forward.to, b.hash))
        if (to) {
          const indexDiff = (to.index - block.index)
          maxDiff = indexDiff > maxDiff ? indexDiff : maxDiff
          const [x1, y1] = [BLOCK_SIZE / 2, - indexDiff * BLOCK_SIZE]
          const [x2, y2] = [BLOCK_SIZE / 2 + indexDiff * BLOCK_SEPARATION - indexDiff * BLOCK_SIZE,  - indexDiff * BLOCK_SIZE]
          const [x3, y3] = [BLOCK_SIZE / 2 + indexDiff * BLOCK_SEPARATION, 0]
          group.append('polyline')
            .attr('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`)
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('stroke', 'blue')
        }
      })
      if (maxDiff) {
        group.append('line')
          .attr('x1', BLOCK_SIZE / 2)
          .attr('y1', 0)
          .attr('x2', BLOCK_SIZE / 2)
          .attr('y2', - maxDiff * BLOCK_SIZE)
          .attr('stroke-dasharray', '5,5')
          .attr('stroke-width', 2)
          .attr('stroke', 'blue')
      }
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
