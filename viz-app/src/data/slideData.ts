export const tripleConstraintMessages = {
    scope: {
        title: "Si aumentas el ALCANCE…",
        body: "Más funcionalidades, más requisitos o más entregables implican casi siempre más esfuerzo. Si no ajustas el TIEMPO o el COSTE, la calidad real o percibida se resiente.",
        type: "ALCANCE",
        accent: "text-green-400",
        border: "border-green-500/50",
        glow: "shadow-[0_0_20px_rgba(34,197,94,0.3)]"
    },
    time: {
        title: "Si reduces el TIEMPO…",
        body: "Acortar plazos obliga a reducir alcance, incrementar recursos (y por tanto coste) o aceptar más riesgo y deuda técnica. No puedes mantener todo igual sin pagar un precio.",
        type: "TIEMPO",
        accent: "text-orange-400",
        border: "border-orange-500/50",
        glow: "shadow-[0_0_20px_rgba(249,115,22,0.3)]"
    },
    cost: {
        title: "Si recortas el COSTE…",
        body: "Menos presupuesto implica menos personas, menos horas o menos capacidad técnica. Para mantener la calidad, tienes que reducir alcance o ampliar plazos.",
        type: "COSTE",
        accent: "text-rose-500",
        border: "border-rose-500/50",
        glow: "shadow-[0_0_20px_rgba(225,29,72,0.3)]"
    }
};

export const flowData: Record<string, { title: string; desc: string; flow: string; color: string; paths: string[] }> = {
    init: {
        title: "Iniciación",
        desc: "Se define el proyecto a alto nivel y se autoriza formalmente.",
        flow: "OUTPUT ➔ Project Charter (Acta de Constitución) y Registro de Interesados. DESTINO ➔ Planificación.",
        paths: ['path-init-plan'],
        color: '#f1c40f' // yellow-400
    },
    plan: {
        title: "Planificación",
        desc: "Se define el alcance total y el curso de acción (Cómo se hará).",
        flow: "OUTPUT ➔ Plan para la Dirección del Proyecto (Líneas Base). DESTINO ➔ Ejecución.",
        paths: ['path-plan-exec'],
        color: '#3498db' // blue-400
    },
    exec: {
        title: "Ejecución",
        desc: "Se integran personas y recursos para implementar el plan. Aquí se gasta el presupuesto.",
        flow: "OUTPUT ➔ Entregables y Datos de Desempeño. DESTINO ➔ Control.",
        paths: ['path-exec-ctrl'],
        color: '#e74c3c' // red-500
    },
    ctrl: {
        title: "Monitoreo y Control",
        desc: "Se mide el desempeño real vs. planificado. Fase crítica de toma de decisiones.",
        flow: "OUTPUT 1 ➔ Solicitudes de Cambio ➔ Vuelve a PLANIFICACIÓN. OUTPUT 2 ➔ Entregables Verificados ➔ Va a CIERRE.",
        paths: ['path-ctrl-plan', 'path-ctrl-close'],
        color: '#9b59b6' // purple-500
    },
    close: {
        title: "Cierre",
        desc: "Se finalizan todas las actividades y se transfiere el producto.",
        flow: "OUTPUT ➔ Producto/Servicio final, Informe de Cierre, Actualización de Activos. DESTINO ➔ Cliente/Operaciones.",
        paths: [],
        color: '#2ecc71' // green-500
    }
};

export const curveData = {
    init: [5, 40, 20, 5, 0, 0, 0, 0, 0, 0, 0],
    plan: [0, 20, 55, 60, 45, 30, 20, 15, 10, 5, 0],
    exec: [0, 5, 15, 30, 70, 95, 90, 70, 40, 10, 0],
    ctrl: [2, 10, 20, 25, 30, 35, 35, 35, 30, 25, 10],
    close: [0, 0, 0, 0, 0, 0, 0, 10, 35, 60, 10]
};
