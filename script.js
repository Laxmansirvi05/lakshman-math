function calculate() {
  const input = document.getElementById("calc-input").value;
  const resultDiv = document.getElementById("calc-result");

  try {
    const result = math.evaluate(input);
    resultDiv.innerText = "Result: " + result;
  } catch (err) {
    resultDiv.innerText = "Error: Invalid expression";
  }
}

function plotGraph() {
  const expr = document.getElementById("graph-input").value;
  const xValues = [];
  const yValues = [];

  for (let x = -10; x <= 10; x += 0.1) {
    try {
      xValues.push(x);
      yValues.push(math.evaluate(expr, { x }));
    } catch {
      yValues.push(null);
    }
  }

  Plotly.newPlot("graph", [{
    x: xValues,
    y: yValues,
    mode: "lines"
  }], {
    margin: { t: 0 },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)"
  });
}
