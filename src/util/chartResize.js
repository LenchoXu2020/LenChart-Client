export default function(chart) {
  let timer;
  window.addEventListener("resize", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      chart.resize();
    }, 500);
  });
}