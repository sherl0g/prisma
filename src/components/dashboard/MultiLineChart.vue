<template>
  <div id="chart" class="w-100 h-100"></div>
</template>
<script>
import { debounce, get } from 'lodash';
import * as d3 from 'd3';

export default {
  name: 'MultiLineChart',
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
      required: true,
    },
    height: {
      type: Number,
      default: 0,
      required: true,
    },
    width: {
      type: Number,
      default: 0,
      required: true,
    },
    darkTheme: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      x: null,
      y: null,
      line: null,
      focus: null,
      margin: {
        top: 20,
        right: 20,
        bottom: 30,
        left: 30,
      },
    };
  },
  computed: {
    chartWidth() {
      return Math.max(this.width - this.margin.left - this.margin.right, 0);
    },
    chartHeight() {
      return this.height;
    },
  },
  watch: {
    data() {
      d3.select('#chart').selectAll('svg').remove();
      this.x = d3.scaleUtc()
        .domain(d3.extent(this.data.dates)).nice()
        .range([this.margin.left, this.chartWidth - this.margin.right]);
      this.y = d3.scaleLinear()
        .domain([0, d3.max(this.data.series, (d) => d3.max(d.values))]).nice()
        .range([this.chartHeight - this.margin.bottom, this.margin.top]);
      this.line = d3.line()
        // eslint-disable-next-line no-restricted-globals
        .defined((d) => !isNaN(d))
        .x((d, i) => this.x(this.data.dates[i]))
        .y((d) => this.y(d));
      this.chart();
    },
  },
  mounted() {
    this.prepareComponent();
    // console.log(this.data);
    d3.select('#chart').selectAll('svg').remove();
    this.x = d3.scaleUtc()
      .domain(d3.extent(this.data.dates))
      .range([this.margin.left, this.chartWidth - this.margin.right]);
    this.y = d3.scaleLinear()
      .domain([0, d3.max(this.data.series, (d) => d3.max(d.values))]).nice()
      .range([this.chartHeight - this.margin.bottom, this.margin.top]);
    this.line = d3.line()
      // eslint-disable-next-line no-restricted-globals
      .defined((d) => !isNaN(d))
      .x((d, i) => this.x(this.data.dates[i]))
      .y((d) => this.y(d));
    this.chart();
  },
  methods: {
    prepareComponent() {

    },
    xAxis(g) {
      return g.attr('transform', `translate(0,${this.chartHeight - this.margin.bottom})`)
        .call(d3.axisBottom(this.x)
          .ticks(this.chartWidth / 80)
          .tickSizeOuter(0))
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-35)');
    },
    yAxis(g) {
      return g.attr('transform', `translate(${this.margin.left},0)`)
        .call(d3.axisLeft(this.y))
        // eslint-disable-next-line no-shadow
        .call((g) => g.select('.domain').remove())
        // eslint-disable-next-line no-shadow
        .call((g) => g.select('.tick:last-of-type text').clone()
          .attr('x', 3)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .text(this.data.y));
    },
    moved: debounce((event, path, dot, svg) => {
      event.preventDefault();
      const pointer = d3.pointer(event, get(svg, '_groups.0.0'));
      const xm = this.x.invert(pointer[0]);
      const ym = this.y.invert(pointer[1]);
      const i = d3.bisectCenter(this.data.dates, xm);
      const s = d3.least(this.data.series, (d) => Math.abs(d.values[i] - ym));
      path.attr('stroke', (d) => (d === s ? null : '#ddd')).filter((d) => d === s).raise();
      dot.attr('transform', `translate(${this.x(this.data.dates[i])},${this.y(s.values[i])})`);
      dot.select('line.x')
        .attr('x1', 0)
        .attr('x2', -this.x(this.data.dates[i]))
        .attr('y1', 0)
        .attr('y2', 0);
      dot.select('line.y')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', this.chartHeight - this.y(s.values[i]));
      dot.select('text')
        .attr('class', 'chart-tip')
        .text(`${d3.utcFormat('%a %b %e %X %Y')(xm)} | ${s.name} ${s.values[i]}`);
      // .style('fill', 'red').attr('font-weight', 'bold'); // TODO dark mode
    }, 500),
    entered: debounce((path, dot) => {
      path.style('mix-blend-mode', null).attr('stroke', '#ddd');
      dot.attr('display', null);
    }, 500),
    left: debounce((path, dot) => {
      path.style('mix-blend-mode', null).attr('stroke', null);
      dot.attr('display', 'none');
    }, 500),
    hover: debounce((svg, path, dot) => {
      const self = this;
      if ('ontouchstart' in document) {
        svg
          .style('-webkit-tap-highlight-color', 'transparent')
          .on('touchmove', (e) => { self.moved(e, path, dot, svg); })
          .on('touchstart', () => { self.entered(path, dot); })
          .on('touchend', () => { self.left(path, dot); });
      } else {
        svg
          .on('mousemove', (e) => { self.moved(e, path, dot, svg); })
          .on('mouseenter', () => { self.entered(path, dot); })
          .on('mouseover', () => dot.style('display', null))
          .on('mouseleave', () => { self.left(path, dot); });
      }

      d3.selectAll('.focus');

      d3.selectAll('.focus circle')
        .attr('class', 'circle')
        .style('fill', 'none');

      d3.selectAll('.focus line')
        .style('fill', 'none')
        .style('stroke-width', '1.5px')
        .style('stroke-dasharray', '3 3');
    }, 500),
    chart() {
      if (!this.data.series.length) return;
      // console.log('Rendering chart...');
      const svg = d3.select('#chart').append('svg')
        .attr('viewBox', [0, 0, this.chartWidth, this.chartHeight])
        .style('overflow', 'visible');
      svg.append('g')
        .attr('class', 'xAxis')
        .call(this.xAxis);

      svg.append('g')
        .attr('class', 'yAxis')
        .call(this.yAxis);

      const path = svg.append('g')
        .attr('class', 'chart-lines')
        .attr('fill', 'none')
        // .attr('stroke', '#495058') // TODO dark mode
        .attr('stroke-width', 1)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        // .style('stroke-dasharray', ('3, 3'))
        .selectAll('path')
        .data(this.data.series)
        .join('path')
        .attr('d', (d) => this.line(d.values));

      const dot = svg.append('g')
        .attr('class', 'focus')
        .style('display', 'none');

      dot.append('circle')
        .attr('r', 6).attr('font-weight', 'bold');

      dot.append('line')
        .classed('x', true);

      dot.append('line')
        .classed('y', true);

      dot.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', -30);

      svg.call(this.hover, path, dot);
    },
  },
};
</script>
