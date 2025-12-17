const BASE_URL = "https://medicine.mariam04.dk/api/medicineTracker";

async function FetchData(endpoint, method = "GET", body = null) {
  const headers = {
    Accept: "application/json",
  };

  // Bruger token fra localStorage, hvis den findes
  const tokenFromStorage = localStorage.getItem("jwtToken");
  if (tokenFromStorage) {
    headers["Authorization"] = `Bearer ${tokenFromStorage}`;
  }

  if (body) {
    headers["Content-Type"] = "application/json";
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

  if (res.status === 401) {
  localStorage.removeItem("jwtToken");
  window.location.href = "/login?reason=expired";
  return;
}

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  if (res.status === 204) return null;

  return await res.json();
}

export default FetchData;
