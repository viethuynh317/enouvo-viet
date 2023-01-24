import { ChangeEventHandler, useRef, useState } from "react";

interface Cities {
  name: string;
  weather: string;
  status: string[];
}

export default function WeatherFinder() {
  const keySearch = useRef<string>("");
  const [city, setCity] = useState<Cities | null>(null);

  const fetchCities = async (name: string) => {
    const res = await fetch(
      `https://jsonmock.hackerrank.com/api/weather?name=${name}`
    );
    const citiesFromRes = await res.json();
    setCity(citiesFromRes.data?.[0]);
  };

  const handleCityChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    keySearch.current = e.target.value;
  };

  const handleSearchClick = () => {
    keySearch.current ? fetchCities(keySearch.current) : setCity(null);
  };

  return (
    <div className="weather-data w-[90%] items-center mt-50">
      <section className="grid grid-cols-6 gap-1 justify-center items-center">
        <input
          type="text"
          className="col-start-2 col-span-3 p-2 h-[45px] mr-12 bg-slate-100 rounded-sm"
          placeholder="Dallas"
          onChange={handleCityChange}
        />
        <button
          className="bg-green-600 text-white w-[100px] rounded-sm"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </section>
      {!!keySearch.current && (
        <section className="mt-20 layout-row align-items-center justify-content-center">
          <div className="card outlined">
            <div className="weather-details">
              {city ? (
                <>
                  <span className="result-temperature">
                    {Number(city.weather.split(" ")[0]) < 20 ? (
                      <i className="icon-cold"></i>
                    ) : (
                      <i className="icon-sunny"></i>
                    )}
                    <span className="ml-8">{city.weather}</span>
                  </span>
                  <div>
                    {city.status.map((status, index) => (
                      <p key={index} className="text-base my-20">
                        {status}
                      </p>
                    ))}
                  </div>
                </>
              ) : (
                <div className="no-result">No Results Found</div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
