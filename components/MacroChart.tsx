"use client";

import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface MacroChartProps {
    data: {
        labels: string[];
        grams: number[];
        caloriesFromMacro: number[];
        totalCalories: number;
    };
}

export default function MacroChart({ data }: MacroChartProps) {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.caloriesFromMacro,
                backgroundColor: ["#4f46e5", "#818cf8", "#c7d2fe"],
                borderWidth: 0,
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        cutout: "75%",
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const index = context.dataIndex;
                        const grams = data.grams[index];
                        const kcal = context.raw;
                        return `${context.label}: ${kcal} kcal (${grams}g)`;
                    },
                },
            },
        },
    };

    return (
        <div className="relative flex flex-col justify-center items-center h-full min-h-[300px]">
            <div className="w-full max-w-[250px] aspect-square relative">
                <Doughnut data={chartData} options={options} />

                {/* Center label */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <div className="text-3xl font-bold text-indigo-900 leading-none">
                        {data.totalCalories}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">kcal / total</div>
                </div>
            </div>
        </div>
    );
}
