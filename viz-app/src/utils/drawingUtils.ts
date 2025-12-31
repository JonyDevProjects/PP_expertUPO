// Smooth path generator (simple tension)
export const getSmoothPath = (data: number[]) => {
    const w = 800;
    const h = 300;
    const points = data.map((val, i) => [i * (w / (data.length - 1)), h - (val / 100 * h)]);

    if (points.length === 0) return "";

    const d = [`M ${points[0][0]},${points[0][1]}`];

    for (let i = 1; i < points.length; i++) {
        const [x0, y0] = i > 1 ? points[i - 2] : points[i - 1];
        const [x1, y1] = points[i - 1]; // current
        const [x2, y2] = points[i]; // next
        const [x3, y3] = i < points.length - 1 ? points[i + 1] : points[i]; // next next

        const cp1x = x1 + (x2 - x0) * 0.2;
        const cp1y = y1 + (y2 - y0) * 0.2;

        const cp2x = x2 - (x3 - x1) * 0.2;
        const cp2y = y2 - (y3 - y1) * 0.2;

        d.push(`C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`);
    }

    return d.join(" ");
};
