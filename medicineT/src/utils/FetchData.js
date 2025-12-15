const BASE_URL = "https://medicine.mariam04.dk/api/medicineTracker";

async function FetchData(endpoint, method = "GET", body = null) {
  const headers = {
    Accept: "application/json",
  };

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const token = localStorage.getItem("jwtToken");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  console.log("fetch ->", endpoint, options);

  const res = await fetch(BASE_URL + endpoint, options);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  if (res.status === 204) return null;

  return await res.json();
}

export default FetchData;
