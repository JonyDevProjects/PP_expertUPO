import React from 'react';
import { Card } from '../../../../ui/Card';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const TabCurves: React.FC = () => {
    return (
        <div className="animate-fade-in flex-1 flex flex-col min-h-0">
            <Card className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-900 border-none shadow-none" noPadding>
                <div className="p-2 shrink-0">
                    <h2 className="text-center font-bold text-base mb-0">Curvas de Actividad</h2>
                    <p className="text-center text-[10px] text-text-muted">Nivel de Actividad/Coste vs. Tiempo</p>
                </div>

                {/* Responsive Container Preserving Aspect Ratio */}
                <div className="flex-1 w-full relative flex items-center justify-center p-2 min-h-0 overflow-hidden">
                    <div className="relative w-full max-h-full aspect-[1.8] max-w-6xl shadow-xl bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="absolute inset-0 p-4 pb-16">
                            <Line
                                data={{
                                    labels: ['Inicio', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', 'Fin'],
                                    datasets: [
                                        {
                                            label: 'Iniciación',
                                            data: [5, 40, 20, 5, 0, 0, 0, 0, 0, 0, 0],
                                            borderColor: 'rgba(46, 204, 113, 1)', // Verde
                                            backgroundColor: 'rgba(46, 204, 113, 0.2)',
                                            borderWidth: 2,
                                            tension: 0.4,
                                            fill: true
                                        },
                                        {
                                            label: 'Planificación',
                                            data: [0, 20, 55, 60, 45, 30, 20, 15, 10, 5, 0],
                                            borderColor: 'rgba(52, 152, 219, 1)', // Azul
                                            backgroundColor: 'rgba(52, 152, 219, 0.2)',
                                            borderWidth: 2,
                                            tension: 0.4,
                                            fill: true
                                        },
                                        {
                                            label: 'Ejecución',
                                            data: [0, 5, 15, 30, 70, 95, 90, 70, 40, 10, 0],
                                            borderColor: 'rgba(231, 76, 60, 1)', // Rojo
                                            backgroundColor: 'rgba(231, 76, 60, 0.2)',
                                            borderWidth: 3, // Más grueso
                                            tension: 0.4,
                                            fill: true
                                        },
                                        {
                                            label: 'Monitoreo y Control',
                                            data: [2, 10, 20, 25, 30, 35, 35, 35, 30, 25, 10],
                                            borderColor: 'rgba(241, 196, 15, 1)', // Amarillo
                                            backgroundColor: 'rgba(241, 196, 15, 0.1)',
                                            borderWidth: 2,
                                            borderDash: [5, 5],
                                            tension: 0.4,
                                            fill: false
                                        },
                                        {
                                            label: 'Cierre',
                                            data: [0, 0, 0, 0, 0, 0, 0, 10, 35, 60, 10],
                                            borderColor: 'rgba(142, 68, 173, 1)', // Morado
                                            backgroundColor: 'rgba(142, 68, 173, 0.2)',
                                            borderWidth: 2,
                                            tension: 0.4,
                                            fill: true
                                        }
                                    ]
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    interaction: {
                                        mode: 'index',
                                        intersect: false,
                                    },
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                            labels: {
                                                font: { size: 10, family: "'Segoe UI', sans-serif" },
                                                usePointStyle: true,
                                                boxWidth: 6
                                            }
                                        },
                                        tooltip: {
                                            callbacks: {
                                                label: function (context: any) {
                                                    return context.dataset.label + ': ' + context.parsed.y + '% Actividad';
                                                }
                                            }
                                        }
                                    },
                                    scales: {
                                        x: {
                                            title: { display: true, text: 'Tiempo del Proyecto →', font: { weight: 'bold', size: 10 } },
                                            grid: { display: false },
                                            ticks: { font: { size: 9 } }
                                        },
                                        y: {
                                            title: { display: true, text: 'Nivel de Interacción / Coste', font: { weight: 'bold', size: 10 } },
                                            min: 0,
                                            max: 100,
                                            grid: { color: 'rgba(0,0,0,0.05)' },
                                            ticks: { font: { size: 9 } }
                                        }
                                    },
                                    elements: {
                                        point: {
                                            radius: 0,
                                            hitRadius: 10,
                                            hoverRadius: 5
                                        }
                                    }
                                }}
                            />
                        </div>

                        {/* Overlay Info Box */}
                        <div className="absolute bottom-3 left-3 right-3 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur border-l-4 border-amber-400 p-2.5 text-[9px] md:text-[11px] text-slate-600 dark:text-slate-300 rounded shadow-md z-10 flex gap-2 items-center">
                            <span className="text-xl">💡</span>
                            <div className="leading-snug">
                                <strong className="text-slate-800 dark:text-white">Análisis del Experto:</strong> La curva de <strong className="text-red-500">Ejecución</strong> consume más recursos. <strong className="text-yellow-500">Monitoreo</strong> es constante. No subestimes el <strong className="text-purple-500">Cierre</strong>.
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default TabCurves;
