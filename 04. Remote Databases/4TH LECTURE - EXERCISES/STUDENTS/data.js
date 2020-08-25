const BASE_URL = 'https://api.backendless.com/3E035CB4-80CB-7C15-FFDC-83FB58A2D500/A3391EA8-0C25-454B-81CC-816201DA6E5B/data/students';

export async function getStudents() {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
}

export async function postStudent(data) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
}