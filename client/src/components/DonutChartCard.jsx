
import {Chart}  from 'react-google-charts';

// eslint-disable-next-line react/prop-types
function DonutChartCard({title, current, goal}) {

    let remaining = goal - current;

    const data = [
        ['tag', 'amount'],
        ["Current", Number(current)],
        ["Remaining", Number(remaining)],
    ];

    const options = {
        title: title,
        pieHole: 0.4,
        is3D: false,
        backgroundColor: 'transparent',
        slices: [
            {
                color: "#673ab7"
            },
            {
                color: "#e91e63"
            },
            {
                color: "#f8bbd0"
            },
            {
                color: "#7b1fa2"
            },
            {
                color: "#880e4f"
            },
            {
                color: "#1a237e"
            },
            {
                color: "#1565c0"
            },
            {
                color: "#0097a7"
            },
            {
                color: "#e65100"
            },
            {
                color: "#00695c"
            },
        ],
        titleTextStyle: {
            color: "#000",
            fontSize: 30,
            bold: true
        },
        height: 400,
        width: "100%",
        legend:{
            textStyle: {
                color: "#000",
                fontSize: 20
            },
        }
    };

    return(
        <div className="m-8 self-start rounded-lg bg-violet-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] sm:shrink-0 sm:grow sm:basis-0">
            
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
            />
            
        </div>
    )
}

export default DonutChartCard;