<template>
  <div class="container border-bottom border-left border-right">
    <div class="row">
      <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="logo">
            <a
              v-bind:class="[darkTheme ? 'text-clear': 'text-dark']"
              href="#" v-on:click="toggleTheme()">
              <svg width="2.5em" height="2.5em" viewBox="0 0 528.66 637.82" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M142.07 541.14c5.36-3.06 41.73-24.74 57.52-57.7 17.07-35.62 19.57-57.07 19-68.67-.83-17.08-4.55-38.71-21.62-67.65s-42.86-7.59-65.16-10.27c-33.33-4-3.66-28.73 17.12-58.41s0-65.89 14.67-109.33c10.34-30.53 31.25-53 68.61-68.33-.87-9.31.2-21.91 11.73-24.16 10.34-2 18.08 5.78 22.94 13.14 3.69-.9 7.48-1.76 11.39-2.57 76.18-15.84 124.25 14.13 148 41.59s34.89 50.65 44.91 69.2 87.24 32 78.09 43.14c-10.85 13.28-77 5.83-85.88 6.95s-6.31 9.28-4.82 17.81 16.33 18.18 25.6 27.83 17.44 34.14 20.41 43.78-3.8 10.63-8.53 10.76c-7.39.2-21.89-5.19-26.71 1.48s5.57 26.71 6.92 33-2.1 5.57-.24 11.5-7.42 12.24-8.9 25.6 14.64 32.48-3.71 45.05c-13.45 9.21-13.91 3.37-47.31.59S384.34 469.38 381 495c-2.4 18.38 4.67 48.52 8.85 64.06 1.13.72 2.27 1.43 3.4 2.17 69 45.64 91.27 152.9 91.27 152.9C336.47 575 88.25 581.25 88.25 581.25a259.21 259.21 0 0153.82-40.11z" transform="translate(-88.25 -76.29)"/><path class="cls-1" d="M473.64 386.77s28.94-1.86 37.85 14.1 17.43 54.13 23.74 73.83 11.5 30.42 16.33 28.2 10.39-12.24 6.68-29.68 7-21.15 25.6-20.41 36 .3 32.65 21.52c-3.52 22-5.94 59.74-31.91 67.53s-52.33-10.39-62.71-44.52-11.63-81.22-24.87-92.92c-8.58-7.56-23.31-6.31-23.31-6.31z" transform="translate(-88.25 -76.29)"/></svg>
            </a>
          </h1>
          <div class="btn-toolbar mb-2 mb-md-0">
          </div>
        </div>
        <div class="row no-gutters mb-2 border">
          <div class="col-sm-12 col-lg-9">
            <div class="d-flex align-items-center" style="height: 340px; padding: 0 0 0 25px;">
              <MultiLineChart :data="dataSeries" :height="370" :width="960" :dark-theme="darkTheme"></MultiLineChart>
            </div>
          </div>
          <div class="col-lg-3 d-none d-lg-block">
            <div class="d-flex flex-column border-lg-left h-100" >
              <div class="p-2 flex-fill w-100">
              <pre
                v-bind:class="{'text-clear': darkTheme}">{{eventSummary}}</pre>
              </div>
            </div>
          </div>
          <div class="col-12 border-top pl-1 " v-bind:class="{'player-controls-dark': darkTheme}">
            <div class="btn-toolbar d-flex align-items-center" role="toolbar" aria-label="Toolbar with button groups">
              <div class="btn-group" role="group" aria-label="First group">
                <button v-if="!hidePlay()" v-on:click="play()" type="button" class="btn btn-link btn-play" v-bind:class="{'text-clear': darkTheme}">
                  <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-play-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                  </svg>
                </button>
                <button v-if="!hidePause()" v-on:click="pause()" type="button" class="btn btn-link btn-pause" v-bind:class="{'text-clear': darkTheme}">
                  <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-pause" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                  </svg>
                </button>
              </div>
              <div class="input-group" v-bind:class="{'text-clear': darkTheme}">
                <span class="small duration">{{player.current | duration}}/{{player.duration | duration}}</span>
              </div>
              <div class="flex-grow-1 mx-3">
                <vue-slider
                  :adsorb="true"
                  :value="currentInterval"
                  :min="player.min"
                  :max="player.duration"
                  :lazy="true"
                  :enable-cross="false"
                  :tooltip="'none'"
                  :silent="true"
                  @change="onChange"
                ></vue-slider>
              </div>
              <div class="btn-group" role="group" aria-label="First group">
                <button v-show="player.current > 2" v-on:click="zoomIn()" v-bind:class="{'text-clear': darkTheme}" type="button" class="btn btn-link btn-zoom">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-zoom-in" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                    <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z"/>
                    <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <div class="status-message" v-bind:class="{'text-clear': darkTheme}">
            {{status()}}
          </div>
          <div>
            <div v-show="metrics.length > 1" v-bind:class="{'text-clear': darkTheme}">
              <div v-for="(metric, index) in metrics"
                   v-bind:key="index"
                   class="form-check form-check-inline mr-0 ml-2">
                <input class="form-check-input pointer"
                       type="checkbox"
                       :id="metric"
                       :value="metric" v-model="filters">
                <label class="form-check-label pointer" :for="metric">{{metric}}</label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <virtual-list class="list-infinite scroll-touch border-top"
                        :data-key="'id'"
                        :data-sources="items"
                        :data-component="itemComponent"
                        :estimate-size="79"
                        :item-class="'list-item-infinite'"
                        :footer-class="'loader-wrapper'"
                        v-on:tobottom="onScrollToBottom">
            <div slot="footer" class="loader"></div>
          </virtual-list>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import {
  debounce, pick,
} from 'lodash';
import moment from 'moment';
import horizontalChart from 'ascii-horizontal-barchart';
import { utcParse } from 'd3';
import MultiLineChart from '@/components/dashboard/MultiLineChart.vue';
import pako from 'pako';
import Visibility from 'visibilityjs';
import workerpool from 'workerpool';
import VirtualList from 'vue-virtual-scroll-list';
import VueSlider from 'vue-slider-component';
import Item from './Item.vue';
import 'vue-slider-component/theme/default.css';

const store = {};
let logs = [];
const worker = workerpool.pool();

export default {
  name: 'DashboardV2',
  components: {
    VirtualList,
    MultiLineChart,
    VueSlider,
  },
  data() {
    return {
      items: [],
      itemComponent: Item,
      messageStatus: 'connecting...',
      eventSummary: null,
      dataSeries: {
        y: 'events',
        series: [],
        dates: [],
      },
      dates: [],
      ph: 330,
      pw: 1000,
      darkTheme: false,
      metrics: [],
      filters: [],
      player: {
        current: 0,
        duration: 0,
        min: 0,
        ref: null,
        status: {
          PLAYING: false,
          PAUSED: true,
          LIVE: false,
        },
      },
      zoom: false,
      zoomDomain: [],
    };
  },
  computed: {
    domain() {
      const { dates } = this;
      dates.sort((a, b) => a - b);
      return [dates[0], dates[dates.length - 1]];
    },
    currentInterval() {
      const current = Number(this.player.current);
      if (this.zoom && this.zoomDomain.length) return this.zoomDomain;
      return current;
    },
    datetimeRange() {
      const isRange = Array.isArray(this.currentInterval);
      const current = !isRange ? this.currentInterval : this.currentInterval[1];
      if (!current) return [];

      const [start] = this.domain;
      const range = [start];
      for (let i = 1; i < current; i += 1) {
        range.push(start + i);
      }

      if (isRange) {
        return range.slice(Math.max(this.currentInterval[0] - 1, 0));
      }

      return range;
    },
  },
  watch: {
    darkTheme(darkTheme) {
      if (darkTheme) {
        document.body.className = 'darkTheme';
      } else {
        document.body.removeAttribute('class');
      }
    },
    filters() {
      this.render();
    },
    zoomDomain() {
      this.render();
    },
    'player.current': function currentInt() {
      this.render();
    },
  },
  mounted() {
    this.prepareComponent();
    this.handleResize();
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    // window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    prepareComponent() {
      this.websocket();
      Visibility.change((e, state) => {
        if (state === 'visible' && this.player.duration > 0) window.requestAnimationFrame(this.sync);
      });
    },
    handleResize() {
    },
    get(obj, path, defValue) {
      if (!path) return undefined;
      const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
      return (
        pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj) || defValue
      );
    },
    set(obj, path, value) {
      const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
      pathArray.reduce((acc, key, i) => {
        if (acc[key] === undefined) acc[key] = {};
        if (i === pathArray.length - 1) acc[key] = value;
        return acc[key];
      }, obj);
    },
    omit(obj, props) {
      const o = { ...obj };
      props.forEach((prop) => delete o[prop]);
      return o;
    },
    save(event) {
      if (this.metrics.indexOf(event.name) === -1) {
        this.metrics.push(event.name);
        this.filters.push(event.name);
      }
      this.dates.push(event.timestamp);
      const path = `${event.timestamp}.${event.name}`;
      const collection = this.get(store, path);
      this.set(store, path, Array.isArray(collection) ? collection.concat(event.events) : [].concat(event.events));
    },
    format(batch) {
      return worker.exec((event) => new Promise((resolve) => {
        // eslint-disable-next-line prefer-object-spread
        const events = event.values.map((value) => Object.assign({ metric: event.metric }, event.tags, value));
        resolve({
          name: `${event.metric}${event.tags.type ? `:${event.tags.type}` : ''}`,
          timestamp: event.timestamp,
          events,
        });
      }), [batch])
        .then(this.save);
    },
    websocket() {
      let socket;
      const socketMessageListener = (event) => {
        const metrics = JSON.parse(pako.inflate(event.data, { to: 'string' }));
        Promise.all(metrics.map(this.format))
          .then(() => {
            this.metrics.sort();
            if (this.player.status.PAUSED) {
              window.requestAnimationFrame(this.sync);
            }
          });
      };

      const socketOpenListener = () => {
        this.messageStatus = 'connected';
      };

      const socketCloseListener = () => {
        if (socket) {
          this.messageStatus = 'connecting...';
        }
        socket = new WebSocket(`ws://${window.location.host}`);
        socket.addEventListener('open', socketOpenListener);
        socket.addEventListener('message', socketMessageListener);
        socket.addEventListener('close', debounce(socketCloseListener, 8000));
      };
      socketCloseListener();
    },
    toggleTheme() {
      this.darkTheme = !this.darkTheme;
    },
    zoomIn() {
      this.stopPlayer();
      this.zoom = !this.zoom;
    },
    onChange(domain) {
      if (Array.isArray(domain)) {
        const [start, end] = domain;
        this.zoomDomain = [start, end];
        this.player.current = end;
      } else {
        this.zoomDomain = [0, domain];
        this.player.current = domain;
      }
    },
    status() {
      return this.messageStatus;
    },
    play() {
      if (this.player.current === this.player.duration) return;
      const self = this;
      self.togglePausePlay();
      self.player.ref = setInterval(() => {
        if (self.player.current < self.player.duration) {
          self.player.current = Number(self.player.current) + 1;
        } else {
          self.pause();
        }
      }, 1000);
    },
    // eslint-disable-next-line prefer-arrow-callback
    sync: debounce(function sync() {
      const [start, end] = this.domain;
      const t0 = moment.utc(start, 'X');
      const tf = moment.utc(end, 'X');
      const duration = moment.duration(tf.diff(t0)).asSeconds();
      this.player.duration = (duration + 1);
    }, 500),
    pause() {
      this.togglePausePlay();
      clearInterval(this.player.ref);
    },
    hidePlay() {
      return this.player.status.PLAYING;
    },
    hidePause() {
      return this.player.status.PAUSED;
    },
    togglePausePlay() {
      this.player.status.PLAYING = !this.player.status.PLAYING;
      this.player.status.PAUSED = !this.player.status.PAUSED;
    },
    stopPlayer() {
      if (!this.player.status.PLAYING) return;
      this.player.status.PLAYING = false;
      this.player.status.PAUSED = true;
      clearInterval(this.player.ref);
    },
    getPageData(pageSize) {
      const items = [];
      logs.splice(0, pageSize).forEach((item) => {
        items.push({
          id: (Date.now() + Math.random()),
          datetime: item.datetime,
          event: Object.entries(this.omit(item, ['datetime', 'timestamp'])).map((property) => property.join(': ')).join(' '),
        });
      });
      return items;
    },
    onScrollToBottom() {
      this.items.push(...this.getPageData(20));
    },
    getTimeSeries() {
      if (!this.player.duration) return {};
      const domain = this.datetimeRange;
      const metrics = {};
      const count = {};
      this.items = null;
      this.items = [];
      logs = null;
      logs = [];
      domain.forEach((t, key) => {
        if (!store[t]) return;
        const events = (this.filters.length > 0) ? pick(store[t], this.filters) : {};
        Object.keys(events).forEach((event) => {
          if (!metrics[event]) {
            metrics[event] = { name: event, values: Array(domain.length).fill(0) };
          }
          metrics[event].values[key] = events[event].length;
          logs.push(...events[event]);
        });
      });

      const series = Object.values(metrics);

      series.forEach((item) => {
        count[item.name] = item.values.reduce((a, b) => a + b, 0);
      });

      logs.reverse();
      return {
        domain, series, count,
      };
    },
    // eslint-disable-next-line prefer-arrow-callback
    render: debounce(function render() {
      if (Visibility.state() !== 'hidden') {
        const self = this;
        const metrics = this.getTimeSeries();
        if (Object.keys(metrics).length) {
          const r = () => {
            self.items = self.getPageData(10);
            self.eventSummary = horizontalChart(metrics.count, true, 15);
            self.dataSeries = {
              y: 'events',
              series: metrics.series,
              dates: metrics.domain.map(utcParse('%s')),
            };
          };

          window.requestAnimationFrame(r);
        }
      }
    }, 250),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
body {
  font-size: 1rem !important;
}

$blue: #1b1bff;

.btn-link {
  color: $blue;
  &:focus {
    outline: none;
    box-shadow: none;
  }
}

.vue-slider-process, .vue-slider-dot-tooltip-inner{
  background-color: $blue !important;
  border-color: $blue !important;
}

.text-clear {
  color: #c1bebe;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}

.daterangepicker{
  top:55px;
}

.reportrange-text{
  font-size: inherit;
}

.daterangepicker.ltr {
  margin-right: 16px;
}

.y-axis line {
  opacity:.2;
}
.y-axis path {
  display:none;
}

.overlay {
  fill: none;
  pointer-events: all;
}
.lineHoverText {
  text-shadow:
    -2px -2px 0 #fff,
    2px -2px 0 #fff,
    -2px 2px 0 #fff,
    2px 2px 0 #fff;
}
.hoverCircle {
  opacity: .75;
}

.pointer {
  cursor: pointer !important;
}

.list-infinite {
  width: 100%;
  height: 500px;
  overflow-y: auto;
  border-color: dimgray;
  position: relative;
}
.list-infinite .list-item-infinite {
  display: flex;
  align-items: center;
  border-bottom: 1px solid;
  border-color: lightgray;
}
.list-infinite .loader-wrapper {
  padding: 1em;
}

@media (max-width: 320px) {
  .d-none-xxs {
    display: none;
  }
}
@media (max-width: 575.98px) {
  .d-none-xs {
    display: none;
  }
  .border-xs-top {
    border-top: 1px solid #e3e7eb !important;
  }
  .border-xs-right {
    border-right: 1px solid #e3e7eb !important;
  }
  .border-xs-bottom {
    border-bottom: 1px solid #e3e7eb !important;
  }
  .border-xs-left {
    border-left: 1px solid #e3e7eb !important;
  }
  .border-xs-top-0 {
    border-top: 0 !important;
  }
  .border-xs-right-0 {
    border-right: 0 !important;
  }
  .border-xs-bottom-0 {
    border-bottom: 0 !important;
  }
  .border-xs-left-0 {
    border-left: 0 !important;
  }
  .border-xs-x {
    border-left: 1px solid #e3e7eb !important;
    border-right: 1px solid #e3e7eb !important;
  }
  .border-xs-y {
    border-top: 1px solid #e3e7eb !important;
    border-bottom: 1px solid #e3e7eb !important;
  }
  .border-xs {
    border-top: 1px solid #e3e7eb !important;
    border-bottom: 1px solid #e3e7eb !important;
    border-left: 1px solid #e3e7eb !important;
    border-right: 1px solid #e3e7eb !important;
  }
  .border-xs-0 {
    border-top: 0 !important;
    border-bottom: 0 !important;
    border-left: 0 !important;
    border-right: 0 !important;
  }
}
@media (min-width: 576px) {
  .border-sm-top {
    border-top: 1px solid #e3e7eb !important;
  }
  .border-sm-right {
    border-right: 1px solid #e3e7eb !important;
  }
  .border-sm-bottom {
    border-bottom: 1px solid #e3e7eb !important;
  }
  .border-sm-left {
    border-left: 1px solid #e3e7eb !important;
  }
  .border-sm-top-0 {
    border-top: 0 !important;
  }
  .border-sm-right-0 {
    border-right: 0 !important;
  }
  .border-sm-bottom-0 {
    border-bottom: 0 !important;
  }
  .border-sm-left-0 {
    border-left: 0 !important;
  }
  .border-sm-x {
    border-left: 1px solid #e3e7eb !important;
    border-right: 1px solid #e3e7eb !important;
  }
  .border-sm-y {
    border-top: 1px solid #e3e7eb !important;
    border-bottom: 1px solid #e3e7eb !important;
  }
  .border-sm {
    border-top: 1px solid #e3e7eb !important;
    border-bottom: 1px solid #e3e7eb !important;
    border-left: 1px solid #e3e7eb !important;
    border-right: 1px solid #e3e7eb !important;
  }
  .border-sm-0 {
    border-top: 0 !important;
    border-bottom: 0 !important;
    border-left: 0 !important;
    border-right: 0 !important;
  }
}
@media (min-width: 768px) {
  .border-md-top {
    border-top: 1px solid #e3e7eb !important;
  }
  .border-md-right {
    border-right: 1px solid #e3e7eb !important;
  }
  .border-md-bottom {
    border-bottom: 1px solid #e3e7eb !important;
  }
  .border-md-left {
    border-left: 1px solid #e3e7eb !important;
  }
  .border-md-top-0 {
    border-top: 0 !important;
  }
  .border-md-right-0 {
    border-right: 0 !important;
  }
  .border-md-bottom-0 {
    border-bottom: 0 !important;
  }
  .border-md-left-0 {
    border-left: 0 !important;
  }
  .border-md-x {
    border-left: 1px solid #e3e7eb !important;
    border-right: 1px solid #e3e7eb !important;
  }
  .border-md-y {
    border-top: 1px solid #e3e7eb !important;
    border-bottom: 1px solid #e3e7eb !important;
  }
  .border-md {
    border-top: 1px solid #e3e7eb !important;
    border-bottom: 1px solid #e3e7eb !important;
    border-left: 1px solid #e3e7eb !important;
    border-right: 1px solid #e3e7eb !important;
  }
  .border-md-0 {
    border-top: 0 !important;
    border-bottom: 0 !important;
    border-left: 0 !important;
    border-right: 0 !important;
  }
}
@media (min-width: 992px) {
  .border-lg-top {
    border-top: 1px solid #e3e7eb !important;
  }
  .border-lg-right {
    border-right: 1px solid #e3e7eb !important;
  }
  .border-lg-bottom {
    border-bottom: 1px solid #e3e7eb !important;
  }
  .border-lg-left {
    border-left: 1px solid #e3e7eb !important;
  }
  .border-lg-top-0 {
    border-top: 0 !important;
  }
  .border-lg-right-0 {
    border-right: 0 !important;
  }
  .border-lg-bottom-0 {
    border-bottom: 0 !important;
  }
  .border-lg-left-0 {
    border-left: 0 !important;
  }
  .border-lg-x {
    border-left: 1px solid #e3e7eb !important;
    border-right: 1px solid #e3e7eb !important;
  }
  .border-lg-y {
    border-top: 1px solid #e3e7eb !important;
    border-bottom: 1px solid #e3e7eb !important;
  }
  .border-lg {
    border-top: 1px solid #e3e7eb !important;
    border-bottom: 1px solid #e3e7eb !important;
    border-left: 1px solid #e3e7eb !important;
    border-right: 1px solid #e3e7eb !important;
  }
  .border-lg-0 {
    border-top: 0 !important;
    border-bottom: 0 !important;
    border-left: 0 !important;
    border-right: 0 !important;
  }
}
@media (min-width: 1200px) {
  .border-xl-top {
    border-top: 1px solid #e3e7eb !important;
  }
  .border-xl-right {
    border-right: 1px solid #e3e7eb !important;
  }
  .border-xl-bottom {
    border-bottom: 1px solid #e3e7eb !important;
  }
  .border-xl-left {
    border-left: 1px solid #e3e7eb !important;
  }
  .border-xl-top-0 {
    border-top: 0 !important;
  }
  .border-xl-right-0 {
    border-right: 0 !important;
  }
  .border-xl-bottom-0 {
    border-bottom: 0 !important;
  }
  .border-xl-left-0 {
    border-left: 0 !important;
  }
  .border-xl-x {
    border-left: 1px solid #e3e7eb !important;
    border-right: 1px solid #e3e7eb !important;
  }
  .border-xl-y {
    border-top: 1px solid #e3e7eb !important;
    border-bottom: 1px solid #e3e7eb !important;
  }
  .border-xl {
    border-top: 1px solid #e3e7eb !important;
    border-bottom: 1px solid #e3e7eb !important;
    border-left: 1px solid #e3e7eb !important;
    border-right: 1px solid #e3e7eb !important;
  }
  .border-xl-0 {
    border-top: 0 !important;
    border-bottom: 0 !important;
    border-left: 0 !important;
    border-right: 0 !important;
  }
}
</style>
