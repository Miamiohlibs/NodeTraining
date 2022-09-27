const WeatherAPI = require('./weather');

const weather = new WeatherAPI();

// test('GetDailyWeather', async () => {
//     let params = {
//         station: '00FAY',
//         start: '2022-09-25',
//         end: '2022-09-26'
//     }
//     let json = await weather.GetDailyWeather(params);
//     var expected = {
//         "meta": {
//             "generated": "2022-09-27 18:39:03"
//           },
//           "data": [
//             {
//               "date": "2022-09-25",
//               "tavg": 12.4,
//               "tmin": 5.8,
//               "tmax": 20,
//               "prcp": 0,
//               "snow": null,
//               "wdir": 243,
//               "wspd": 10.3,
//               "wpgt": null,
//               "pres": 1020.6,
//               "tsun": null
//             },
//             {
//               "date": "2022-09-26",
//               "tavg": 15.4,
//               "tmin": 9.9,
//               "tmax": 21.5,
//               "prcp": 0,
//               "snow": null,
//               "wdir": 236,
//               "wspd": 6.5,
//               "wpgt": null,
//               "pres": 1018.8,
//               "tsun": null
//             }
//           ]
//         };
//     expect(json).toEqual(expected);
// })