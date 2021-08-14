let erd = require("element-resize-detector")();

export default function(chart, chartDom) {
  let timer;
  erd.listenTo(chartDom, function(element) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      chart.resize();
    }, 500);
  });
}