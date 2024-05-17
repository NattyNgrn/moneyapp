
import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { useUser } from '@clerk/clerk-react';

function ReportsPage() {

    const {user, isLoaded} = useUser();
    const [categoriesInfo, setCategoriesInfo] = useState({income: [], expense: [], saving: []});

    // const data = [
    //     ["tag", "amount"],
    //     ["House", 11.5],
    //     ["Remaining", 2],
    //     ["Car", 5],
    //     ["Food", 3],
    //     ["Entertainment", 2],
    //     ["Health", 2],
    //     ["Education", 2],
    //     ["Investment", 2],
    //     ["Clothing", 2],
    //     ["Others", 2],
    // ];

    useEffect(() => {
        if (isLoaded && user) {
            fetch(`http://localhost:1287/getCategoryInfo/${user.id}`)
            .then((response) => response.json())
            .then((data) => setCategoriesInfo(data))
            .catch((error) => console.error('Error:', error));
        }
    }, [setCategoriesInfo, isLoaded, user]);

    const incomes = {
        title: "Income",
        pieHole: 0.4,
        is3D: false,
        backgroundColor: 'transparent',
        slices: [
            {
                color: "#e91e63"
            },
            {
                color: "#673ab7"
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
            {
                color: "#f8bbd0"
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

    const expenses = {
        title: "Expense",
        pieHole: 0.4,
        is3D: false,
        backgroundColor: 'transparent',
        slices: [
            {
                color: "#e91e63"
            },
            {
                color: "#673ab7"
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
            {
                color: "#f8bbd0"
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

    const savings = {
        title: "Saving",
        pieHole: 0.4,
        is3D: false,
        backgroundColor: 'transparent',
        slices: [
            {
                color: "#e91e63"
            },
            {
                color: "#673ab7"
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
            {
                color: "#f8bbd0"
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

    return (
        <div>
            <h1 className='text-6xl m-8 text-violet-100'>Reports</h1>

            <div className="m-8 rounded-lg bg-violet-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] sm:shrink-0 sm:grow sm:basis-0">
                <Chart
                    chartType="PieChart"
                    data={categoriesInfo.income}
                    options={incomes}
                />
            </div>

            <div className="m-8 rounded-lg bg-violet-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] sm:shrink-0 sm:grow sm:basis-0">
                <Chart
                    chartType="PieChart"
                    data={categoriesInfo.expense}
                    options={expenses}
                />
            </div>

            <div className="m-8 rounded-lg bg-violet-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] sm:shrink-0 sm:grow sm:basis-0">
                <Chart
                    chartType="PieChart"
                    data={categoriesInfo.saving}
                    options={savings}
                />
            </div>

        </div>
    );
}

export default ReportsPage;
