 $(document).ready(function(){
    $("#menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});

//line
var ctxL = document.getElementById("lineChart").getContext('2d');
var myLineChart = new Chart(ctxL, {
  type: 'line',
  data: {
    labels: ["19 Oct", "20 Oct", "21 Oct", "22 Oct", "23 Oct", "24 Oct", "25 Oct"],
    datasets: [{
        label: "Ethereum",
        data: [100, 200, 456, 800, 1000, 1456, 1546],
        backgroundColor: [
          'rgba(105, 0, 132, .2)',
        ],
        borderColor: [
          'rgba(200, 99, 132, .7)',
        ],
        borderWidth: 2
      },
      {
        label: "Investors",
        data: [40, 140, 200, 500, 650, 800, 856],
        backgroundColor: [
          'rgba(0, 137, 132, .2)',
        ],
        borderColor: [
          'rgba(0, 10, 130, .7)',
        ],
        borderWidth: 2
      }
    ]
  },
  options: {
    responsive: true
  }
});

//line percent
var ctxL = document.getElementById("percentChart").getContext('2d');
var myLineChart = new Chart(ctxL, {
  type: 'line',
  data: {
    labels: ["0-1000 ETH", "1000-2500 ETH", "2500-5000 ETH", ">5000 ETH"],
    datasets: [{
        label: "Ethereum",
        data: [0.25, 0.3, 0.35, 0.375],
        backgroundColor: [
          'rgba(40, 167, 69, .2)',
        ],
        borderColor: [
          'rgba(40, 167, 69, .7)',
        ],
        borderWidth: 2
      }
    ]
  },
  options: {
    responsive: true
  }
});

//pie
var ctxP = document.getElementById("pieChart").getContext('2d');
var myPieChart = new Chart(ctxP, {
    type: 'pie',
    data: {
        labels: ["Investors - 90%", "Advertising - 8%", "Administration - 2%"],
        datasets: [
            {
                data: [90, 8, 2],
                backgroundColor: ["#17a2b8", "#20c997", "#28a745", "#949FB1", "#4D5360"],
                hoverBackgroundColor: ["#343a40", "#343a40", "#343a40", "#A8B3C5", "#616774"]
            }
        ]
    },
    options: {
        responsive: true
    }
});



