/* =========================
   CALCULATOR
   ========================= */
function insert(value) {
  const input = document.getElementById("calc-input");
  input.value += value;
  input.focus();
}

function calculate() {
  const expr = document.getElementById("calc-input").value;
  const output = document.getElementById("calc-result");

  try {
    const scope = {
      sin: math.sin,
      cos: math.cos,
      tan: math.tan,
      log: math.log,
      log10: math.log10,
      sqrt: math.sqrt,
      pi: math.pi,
      e: math.e
    };

    const result = math.evaluate(expr, scope);
    output.innerText = "Result: " + result;
  } catch {
    output.innerText = "Error: Invalid expression";
  }
}

/* =========================
   MULTIPLE GRAPH PLOTTING
   ========================= */
function plotGraphs() {
  const input = document.getElementById("graph-input").value;
  const expressions = input.split("\n").map(e => e.trim()).filter(e => e);

  const traces = [];
  const xValues = [];

  for (let x = -10; x <= 10; x += 0.1) {
    xValues.push(x);
  }

  expressions.forEach((expr, index) => {
    const yValues = [];

    xValues.forEach(x => {
      try {
        yValues.push(math.evaluate(expr, { x }));
      } catch {
        yValues.push(null);
      }
    });

    traces.push({
      x: xValues,
      y: yValues,
      mode: "lines",
      name: expr
    });
  });

  Plotly.newPlot("graph", traces, {
    margin: { t: 10 },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    xaxis: { color: "#fff" },
    yaxis: { color: "#fff" }
  });
}

function clearGraph() {
  Plotly.purge("graph");
}
