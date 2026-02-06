console.log("script.js loaded");

/* =========================
   INSERT BUTTON FUNCTION
   ========================= */
function insert(value) {
  const input = document.getElementById("calc-input");
  if (!input) return;
  input.value += value;
  input.focus();
}

/* =========================
   SCIENTIFIC CALCULATOR
   ========================= */
function calculate() {
  const inputEl = document.getElementById("calc-input");
  const resultEl = document.getElementById("calc-result");

  if (!inputEl || !resultEl) return;

  const expr = inputEl.value;

  try {
    const scope = {
      sin: math.sin,
      cos: math.cos,
      tan: math.tan,
      log: math.log,       // ln
      log10: math.log10,   // log base 10
      sqrt: math.sqrt,
      pi: math.pi,
      e: math.e
    };

    const result = math.evaluate(expr, scope);
    resultEl.innerText = "Result: " + result;
  } catch (e) {
    resultEl.innerText = "Error: Invalid expression";
  }
}

/* =========================
   GRAPHING (TWO FUNCTIONS)
   ========================= */
function plotGraph() {
  console.log("plotGraph called");

  const input1 = document.getElementById("graph-input-1");
  const input2 = document.getElementById("graph-input-2");

  if (!input1 || !input2) {
    alert("Graph inputs not found. Check HTML IDs.");
    return;
  }

  const expr1 = input1.value.trim();
  const expr2 = input2.value.trim();

  const xValues = [];
  const yValues1 = [];
  const yValues2 = [];

  for (let x = -10; x <= 10; x += 0.1) {
    xValues.push(x);

    // First function
    try {
      yValues1.push(expr1 ? math.evaluate(expr1, { x }) : null);
    } catch {
      yValues1.push(null);
    }

    // Second function
    try {
      yValues2.push(expr2 ? math.evaluate(expr2, { x }) : null);
    } catch {
      yValues2.push(null);
    }
  }

  Plotly.newPlot(
    "graph",
    [
      {
        x: xValues,
        y: yValues1,
        mode: "lines",
        name: "f(x)"
      },
      {
        x: xValues,
        y: yValues2,
        mode: "lines",
        name: "g(x)"
      }
    ],
    {
      margin: { t: 10 },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      xaxis: { color: "#ffffff" },
      yaxis: { color: "#ffffff" }
    }
  );
}
