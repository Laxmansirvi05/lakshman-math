function show(id){
  document.querySelectorAll("section").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* CALCULATOR */
function calc(){
  try{
    document.getElementById("calcOut").innerText =
      math.evaluate(document.getElementById("calcInput").value);
  }catch{
    document.getElementById("calcOut").innerText = "Error";
  }
}

/* MATRICES */
function matMul(){
  try{
    const A = math.matrix(JSON.parse(matA.value));
    const B = math.matrix(JSON.parse(matB.value));
    matOut.innerText = JSON.stringify(math.multiply(A,B).toArray());
  }catch{ matOut.innerText="Error"; }
}
function matDet(){
  try{ matOut.innerText = math.det(JSON.parse(matA.value)); }
  catch{ matOut.innerText="Error"; }
}
function matInv(){
  try{ matOut.innerText = JSON.stringify(math.inv(JSON.parse(matA.value))); }
  catch{ matOut.innerText="Not invertible"; }
}

/* STATISTICS */
function stats(){
  const d = statsInput.value.split(",").map(Number);
  statsOut.innerHTML =
    "Mean: "+math.mean(d)+
    "<br>Median: "+math.median(d)+
    "<br>Std Dev: "+math.std(d);
}

/* GRAPH */
function plot(){
  const exprs = graphInput.value.split("\n").filter(e=>e);
  const x = [];
  for(let i=-10;i<=10;i+=0.1) x.push(i);
  const traces = exprs.map(e=>({
    x, y: x.map(v=>{try{return math.evaluate(e,{x:v})}catch{return null}}),
    mode:"lines", name:e
  }));
  Plotly.newPlot("plot",traces);
}

/* INTERSECTIONS */
function intersections(){
  interOut.innerText="Intersection finding = numerical (coming next)";
}

/* INTEGRAL (NUMERICAL) */
function integrate(){
  let f = intExpr.value, a=+intA.value, b=+intB.value;
  let n=1000, h=(b-a)/n, sum=0;
  for(let i=0;i<n;i++){
    let x=a+i*h;
    sum+=math.evaluate(f,{x})*h;
  }
  intOut.innerText="≈ "+sum;
}

