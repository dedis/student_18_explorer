<template lang="html">
<v-container>
  <v-btn @click="goBottom">
  <v-icon>arrow_downward</v-icon>
   Go to latest Block</v-btn>

  <v-btn
  @click="fetchAll" color="#922B21">Load all blocks </v-btn>
  <!--  <img src="./../assets/fetchAll.png" width="200" height="40"> -->
  <v-btn @click="fetchMost" color="#F5B7B1">Load higher traversal blocks </v-btn>
  <!-- <img src="./../assets/fetchMost.png" width="200" height="40"> -->
  <v-card :height="60*(this.blocks.length+2)" width="1250px">
    <svg :height="60*(this.blocks.length+2) " width="1250px" />
    <defs>
  <marker
    id="arrow"
    markerUnits="strokeWidth"
    markerWidth="12"
    markerHeight="12"
    viewBox="0 0 12 12"
    refX="6"
    refY="6"
    orient="auto">
    <path d="M2,2 L10,6 L2,10 L6,6 L2,2" style="fill: #f00;"></path>
  </marker>
</defs>
</v-card>
<v-btn @click="goTop">
  <v-icon>arrow_upward</v-icon>
   Go to Genesis Block
 </v-btn>
</v-container>
</template>

<script>
import * as d3 from 'd3'
import { misc } from '@dedis/cothority'

const BLOCK_SIZE = 20
const BLOCK_SEPARATION = 60
// const PADDING_X = 500
const PADDING_Y = 100

export default {
  props: ['blocks', 'getBlockByIndex'],
  data: function () {
    return {
      PADDING_Y }
  },

  methods: {
    fetchAll: function () {
      this.blocks.filter(x => !x.loaded).forEach(({ index }) => this.getBlockByIndex(index))
    },
    fetchMost: function () {
      this.blocks.filter(x => (!x.loaded & (x.index % this.blocks[0].baseHeight === 0))).forEach(({ index }) => this.getBlockByIndex(index))
    },
    goBottom: function () {
      document.body.scrollTop = BLOCK_SEPARATION * (this.blocks.length) // For Safari
      document.documentElement.scrollTop = BLOCK_SEPARATION * (this.blocks.length) // For Chrome, Firefox, IE and Opera
    },
    goTop: function () {
      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    },

    goTo: function (there) {
      document.body.scrollTop = there // For Safari
      document.documentElement.scrollTop = there // For Chrome, Firefox, IE and Opera
    }

  },

  mounted: function () {
    const svg = d3.selectAll('svg')
    this.blocks.forEach((block, i) => {
      const group = svg.append('g')
      group.attr('transform', `translate(${(Math.log2(this.blocks[0].maxHeight) + 1) * BLOCK_SIZE * 3}, ${block.index * BLOCK_SEPARATION + PADDING_Y})`)
      const rect = group.append('rect')
      rect.attr('width', BLOCK_SIZE * block.height)
        .attr('height', BLOCK_SIZE)
        .attr('fill', 'brown')

      if (block.loaded) {
        // blocks visual separation
        var j = 1
        while (j < block.height) {
          group.append('line')
            .attr('x1', j * BLOCK_SIZE)
            .attr('y1', 0)
            .attr('x2', j * BLOCK_SIZE)
            .attr('y2', BLOCK_SIZE)
            .attr('stroke-width', 2)
            .attr('stroke', '#bc5a45')
            .attr('stroke-dasharray', '4')
          j = j + 1
        }
        // blocks hash and index display
        rect.on('mouseenter', () => {
          svg.append('text')
            .attr('x', (Math.log2(this.blocks[0].maxHeight) + 1) * BLOCK_SIZE * 3 + this.blocks[0].maxHeight * BLOCK_SIZE + 10)
            .attr('y', PADDING_Y + block.index * BLOCK_SEPARATION + BLOCK_SIZE / 2 - 2)
            .attr('class', 'infoText')
            .attr('hash', misc.uint8ArrayToHex(block.hash))
            .html('Block index: ' + block.index)
        })
        rect.on('mouseleave', () => {
          d3.selectAll('.infoText').remove()
        })

        rect.on('dblclick', r => {
          this.$router.push(`/blocks/0x${misc.uint8ArrayToHex(block.hash)}`)
        })

        // backward links display
        block.backlinks.forEach(backlink => {
          // for each backlink of each block
          const to = this.blocks.find(b => b.hash && misc.uint8ArrayCompare(backlink, b.hash))
          if (to) {
            const indexDiff = (block.index - to.index)
            const minHeight = Math.min(block.height, to.height) + 1
            group.append('line')
              .attr('x1', (minHeight - 1) * BLOCK_SIZE - BLOCK_SIZE / 2)
              .attr('y1', BLOCK_SIZE / 2)
              .attr('x2', (minHeight - 1) * BLOCK_SIZE - BLOCK_SIZE / 2)
              .attr('y2', -indexDiff * BLOCK_SEPARATION + BLOCK_SIZE)
              .attr('stroke-width', 2)
              .attr('stroke', 'green')
            // green arrow
            const [x1, y1] = [BLOCK_SIZE / 2 + (minHeight - 1) * BLOCK_SIZE - BLOCK_SIZE, -indexDiff * BLOCK_SEPARATION + BLOCK_SIZE]
            const [x2, y2] = [BLOCK_SIZE + (minHeight - 1) * BLOCK_SIZE - BLOCK_SIZE - 3, -indexDiff * BLOCK_SEPARATION + 1.5 * BLOCK_SIZE]
            const [x3, y3] = [-0.5 + (minHeight - 1) * BLOCK_SIZE - BLOCK_SIZE + 3, -indexDiff * BLOCK_SEPARATION + 1.5 * BLOCK_SIZE]
            group.append('polygon')
              .attr('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`)
              .attr('fill', 'green')
          }
        })

        // forward links display
        let maxDiff = 0
        block.forward.forEach(forward => {
          const to = this.blocks.find(b => b.hash && misc.uint8ArrayCompare(forward.to, b.hash))
          if (to) {
            const indexDiff = (to.index - block.index)
            maxDiff = indexDiff > maxDiff ? indexDiff : maxDiff
            const [x1, y1] = [-(Math.log2(indexDiff) + 1) * BLOCK_SIZE, BLOCK_SIZE / 2]
            const [x2, y2] = [-(Math.log2(indexDiff) + 1) * BLOCK_SIZE, BLOCK_SIZE / 2 + indexDiff * BLOCK_SEPARATION - (Math.log2(indexDiff) + 1) * BLOCK_SIZE]
            const [x3, y3] = [-BLOCK_SIZE / 2, indexDiff * BLOCK_SEPARATION]
            group.append('polyline')
              .attr('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`)
              .attr('stroke-width', 2)
              .attr('fill', 'none')
              .attr('stroke', 'blue')
            // .on('click', this.goTop()) APPLY THIS BUT ON THE POLYLONE NOT THE GROUP
            // blue arrow
            const [x4, y4] = [-BLOCK_SIZE / 2 - BLOCK_SIZE / 2, indexDiff * BLOCK_SEPARATION + BLOCK_SIZE / 2 - BLOCK_SIZE / 2]
            const [x5, y5] = [-BLOCK_SIZE / 3, indexDiff * BLOCK_SEPARATION + BLOCK_SIZE / 2 - BLOCK_SIZE / 3] // point
            const [x6, y6] = [-BLOCK_SIZE / 2, indexDiff * BLOCK_SEPARATION - BLOCK_SIZE / 2]
            group.append('polygon')
              .attr('points', `${x4},${y4} ${x5},${y5} ${x6},${y6}`)
              .attr('fill', 'blue')
          }
        })
        if (maxDiff) {
          group.append('line')
            .attr('x1', 0)
            .attr('y1', BLOCK_SIZE / 2)
            .attr('x2', -(Math.log2(maxDiff) + 1) * BLOCK_SIZE)
            .attr('y2', BLOCK_SIZE / 2)
            .attr('stroke-dasharray', '5,5')
            .attr('stroke-width', 2)
            .attr('stroke', 'blue')
        }
        // display in another color all blocks that are on higher connection level (fetching them allows faster skipchain traversal)
        // corresponds to all block that have more than one forward link
      } else {
        if (block.index % this.blocks[0].baseHeight === 0) {
          rect.attr('fill', '#F5B7B1')
          rect.on('click', () => this.getBlockByIndex(i))
        } else {
          rect.attr('fill', 'grey')
          rect.on('click', () => this.getBlockByIndex(i))
        }
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
