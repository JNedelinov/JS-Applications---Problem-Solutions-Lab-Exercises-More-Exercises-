export default function creatingRows(data) {
    const trs = [];
    const tds = Array(5).fill('');
    data.forEach(obj => {
        const tr = document.createElement('tr');
        let filledTds = [];
        tds.forEach((_, index) => {
            const td = document.createElement('td');
            switch (index) {
                case 0: td.textContent = obj['ID']; break;
                case 1: td.textContent = obj.firstName; break;
                case 2: td.textContent = obj.lastName; break;
                case 3: td.textContent = obj.facultyNumber; break;
                case 4: td.textContent = Number(obj.grade).toFixed(2); break;
            }
            filledTds.push(td);
        });
        filledTds.forEach(td => tr.appendChild(td));
        trs.push(tr);
    });

    return trs;
}