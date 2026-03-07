const MOCK_DATA = {
  name: "Lagos",
  sys: { country: "NG" },
  weather: [{ id: 804, description: "overcast clouds" }],
  main: { temp: 31, feels_like: 36, temp_min: 28, temp_max: 34, humidity: 78, pressure: 1011 },
  wind: { speed: 4.2 },
  visibility: 8000,
  timezone: 3600,
};

const MOCK_FORECAST = {
  list: [
    { dt: 1700000000, weather: [{ id: 500 }], main: { temp: 28 } },
    { dt: 1700086400, weather: [{ id: 800 }], main: { temp: 32 } },
    { dt: 1700172800, weather: [{ id: 804 }], main: { temp: 30 } },
    { dt: 1700259200, weather: [{ id: 300 }], main: { temp: 27 } },
    { dt: 1700345600, weather: [{ id: 800 }], main: { temp: 33 } },
  ],
  city: { timezone: 3600 },
};

export { MOCK_DATA, MOCK_FORECAST };