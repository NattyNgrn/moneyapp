
import {Chart}  from 'react-google-charts';


function DonutChartCard() {

    const data = [
        ["tag", "amount"],
        ["House", 11.5],
        ["Remaining", 2],
    ];
    const options = {
        title: "Buy a House",
        pieHole: 0.4,
        is3D: true,
        backgroundColor: 'transparent',
        slices: [
            {
                color: "#e91e63"
            },
            {
                color: "#f8bbd0"
            }
        ],
        titleTextStyle: {
            color: "#000",
            fontSize: 20,
            bold: true
        },
        height: 400,
        width: "100%",
        legend:{
            textStyle: {
                color: "#000",
                fontSize: 14
            },
        }
        
    };

    return(
    
            <div className="m-8 w-1/3 flex flex-col self-start rounded-lg bg-violet-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] sm:shrink-0 sm:grow sm:basis-0">
                <div className="card">
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                    />
                </div>
            </div>
    )
}

export default DonutChartCard;