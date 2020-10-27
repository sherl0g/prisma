<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

$clear: #c1bebe;
$dark: #353535;
$darker: #292929;
$blue: #1b1bff;
$white: #ffffff;
$neon-green: #c7ff00;

* {
  font-family: Menlo,Monaco,Consolas,"Courier New",monospace !important;
  font-size: .87rem !important;
}

body {

  .chart-lines{
    stroke: $dark;
  }

  .chart-tip{
    fill: $blue;
  }

  .focus {
    text {
      text-anchor: start;
      margin: 5px;
      stroke: $blue;
    }

    line{
      stroke:$blue;
    }

    .circle{
      stroke: $blue;
    }
  }

  .yAxis line{
    stroke: $dark;
  }

  .xAxis path{
    stroke: $dark;
  }

  .yAxis text, .xAxis text{
    fill: $dark;
  }
}

.darkTheme {
  background-color: $darker;
}

body.darkTheme {
  .item-inner {
    color: $clear;
  }

  .chart-lines{
    stroke: $white !important;
  }

  .chart-tip{
    fill: $white;
  }

  .focus {
    text {
      text-anchor: start;
      margin: 5px;
      stroke: $white;
    }

    line{
      stroke: $neon-green;
    }

    .circle{
      stroke: $neon-green;
    }
  }

  .yAxis line{
    stroke: $clear;
  }

  .xAxis{
    .tick {
      color: $clear;
    }
  }
  .xAxis path{
    stroke: $clear;
  }

  .yAxis text, .xAxis text{
    fill: $clear;
  }

  hr {
    border-top: 1px solid $clear;
  }
}

.logo {
  a.text-clear {
    &:hover {
      color: $white;
    }
  }
}
</style>
