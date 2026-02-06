// Insert text into calculator input
function insert(value) {
  const input = document.getElementById("calc-input");
  input.value += value;
  input.focus();
}

// Calculator logic
function calculate() {
  const input = document.getElementById("calc-input").value;
  const resultDiv = document.getElementById("calc-result");

  try {
    const scope = {
      sin: math.sin,
      cos: math.cos,
      tan: math.tan,
      log: math.log,       // natural log (ln)
      log10: math.log10,   // base-10 log
      sqrt: math.sqrt,
      pi: math.pi,
      e: math.e
    };

    const result = math.evaluate(input, scope);
    resultDiv.innerText = "Result: " + result;
  } catch (e) {
    resultDiv.innerText = "Error: Invalid expression";
  }
}

// Graph plotting
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
    mode: "lines",
    line: { width: 3 }
  }], {
    margin: { t: 10 },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    xaxis: { color: "#fff" },
    yaxis: { color: "#fff" }
  });
}
