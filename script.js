// Insert value into calculator input
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

// Graph plotting (two functions)
function plotGraph() {
  const input1 = document.getElementById("graph-input-1");
  const input2 = document.getElementById("graph-input-2");

  if (!input1 || !input2) {
    alert("Graph input boxes not found");
    return;
  }

  const expr1 = input1.value;
  const expr2 = input2.value;

  const xValues = [];
  const yValues1 = [];
  const yValues2 = [];

  for (let x = -10; x <= 10; x += 0.1) {
    xValues.push(x);

    try {
      yValues1.push(expr1 ? math.evaluate(expr1, { x }) : null);
    } catch {
      yValues1.push(null);
    }

    try {
      yValues2.push(expr2 ? math.evaluate(expr2, { x }) : null);
    } catch {
      yValues2.push(null);
    }
  }

  Plotly.newPlot("graph", [
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
  ], {
    margin: { t: 10 },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    xaxis: { color: "#ffffff" },
    yaxis: { color: "#ffffff" }
  });
}
