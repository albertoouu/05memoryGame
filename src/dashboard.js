let dataAdmin = [];
let todayVisitors = [];
let weaklyVisitors = [];
let monthVisitors = []
let fechas = []
let moreMonth = []
let msWeek = 604800000;
let msMonth = 2629750000;

const db = firebase.firestore();

const getData = () => db.collection("visitors").get();

window.addEventListener("DOMContentLoaded", async (e) => {

  const querySnapshot = await getData();
  querySnapshot.forEach((doc) => {
    //console.log(doc.data())
    dataAdmin.push(doc.data());
    //console.log(dataAdmin);
  });

  //
  //Ordena los visitantes del más reciente, al más antiguo
  //
  const sortedData = dataAdmin.slice().sort((a, b) => b.date - a.date)//ordena los visitantes del mas reciente al mas antiguo
  //console.log(sortedData)
  //
  //

  today = new Date
  todayString = today.toDateString()
  todayms = today.getTime()
  //console.log(todayms)
  for (let visitor of sortedData) {

    //console.log(visitor.date.toDate())
    if (todayString == visitor.date.toDate().toDateString()) {
      //console.log('Es Hoy ' + visitor.nombre)
      todayVisitors.push(visitor)
    } else {
      if ((todayms - visitor.date.toDate().getTime()) < msWeek) {
        //console.log('Este semana ' + visitor.nombre)
        weaklyVisitors.push(visitor)
      } else {
        if ((todayms - visitor.date.toDate().getTime()) < msMonth) {
          //console.log('Este mes ' + visitor.date.toDate())
          monthVisitors.push(visitor)
        } else {
          //console.log('Este año ' + visitor.date.toDate())
          moreMonth.push(visitor)
        }

      }
    }

  }

  //console.log('visitantes hoy ' + todayVisitors.length)
  //console.log('visitantes semana ' + weaklyVisitors.length)
  //console.log('visitantes mes ' + monthVisitors.length)
  //console.log('visitantes mas de mes ' + moreMonth.length)

  document.getElementById('visitantesDiarios').innerHTML = todayVisitors.length + " V"
  document.getElementById('visitantesSemanales').innerHTML = (weaklyVisitors.length + todayVisitors.length) + " V"
  document.getElementById('visitantesMensuales').innerHTML = (monthVisitors.length + weaklyVisitors.length + todayVisitors.length) + " V"
  document.getElementById('visitantesTotales').innerHTML = sortedData.length + " V"

  console.log(sortedData)

  for (let visitor of sortedData) {
    today = new Date
    today = today.toDateString()
    //console.log(today)
    //console.log(visitor.date.toDate().toDateString())
    fechas.push(visitor.date.toDate().toDateString())
  }

  //console.log(fechas)

  const FechasUnicas = [...new Set(fechas)]
  let numeroVisPorMes = []
  for (let i = 0; i < FechasUnicas.length; i++) {
    numeroVisPorMes[i] = 0;
  }
  //console.log(FechasUnicas)

  for (let i = 0; i < FechasUnicas.length; i++) {
    for (let j = 0; j < fechas.length; j++) {
      if (FechasUnicas[i] == fechas[j]) {
        numeroVisPorMes[i] = numeroVisPorMes[i] + 1;
      }
    }
  }
  //console.log(numeroVisPorMes)

  let fechasGraph = []
  for (let i = 0; i < 15; i++) {
    let date = new Date()
    //console.log(date)
    fechasGraph[i] = new Date(date.getTime() - 24 * 60 * 60 * 1000 * i).toDateString()
  }

  let numeroFechasGraph = []
  for (let i = 0; i < fechasGraph.length; i++) {
    numeroFechasGraph[i] = 0
  }
  for (let i = 0; i < fechasGraph.length; i++) {
    for (let j = 0; j < FechasUnicas.length; j++) {
      //console.log(fechasGraph[i])
      //console.log(FechasUnicas[j])
      if (fechasGraph[i] == FechasUnicas[j]) {
        numeroFechasGraph[i] = numeroVisPorMes[j]
      }
    }
  }

  for (let i = 0; i < fechasGraph.length; i++) {
    let partes = fechasGraph[i].split(' ')
    console.log(partes[1], partes[2])
    fechasGraph[i] = partes[1] + partes[2]
  }

  console.log(numeroFechasGraph)
  console.log(fechasGraph)


  myChart.data.datasets[0].data = numeroFechasGraph.reverse().slice()
  myChart.data.labels = fechasGraph.reverse().slice()
  myChart.update()
});



// Chart.defaults.global.defaultFontFamily = "Poppins";
const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "V Dec 10",
      "S Dec 11",
      "D Dec 12",
      "L Dec 13",
      "M Dec 14",
      "X Dec 15",
      "J Dec 16",
      "V Dec 17",
      "S Dec 18",
      "D Dec 19",
      "L Dec 20",
      "M Dec 21",
      "X Dec 22",
      "J Dec 23",
    ],
    datasets: [
      {
        label: "# of Visitors",
        data: [12, 19, 3, 5, 2, 3, 4, 6, 8, 19, 2, 6, 8, 15],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});