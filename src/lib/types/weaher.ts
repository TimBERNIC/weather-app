export interface CurrentCondition {
	FeelsLikeC: string;
	FeelsLikeF: string;
	cloudcover: string;
	humidity: string;
	lang_fr: Array<{ value: string }>;
	localObsDateTime: string;
	observation_time: string;
	precipInches: string;
	precipMM: string;
	pressure: string;
	pressureInches: string;
	temp_C: string;
	temp_F: string;
	uvIndex: string;
	visibility: string;
	visibilityMiles: string;
	weatherCode: string;
	weatherDesc: Array<{ value: string }>;
	weatherIconUrl: Array<{ value: string }>;
	winddir16Point: string;
	winddirDegree: string;
	windspeedKmph: string;
	windspeedMiles: string;
}

export interface WeatherDay {
	astronomy: Array<{
		moon_illumination: string;
		moon_phase: string;
		moonrise: string;
		moonset: string;
		sunrise: string;
		sunset: string;
	}>;
	avgtempC: string;
	avgtempF: string;
	date: string;
	hourly: Array<{
		DewPointC: string;
		DewPointF: string;
		FeelsLikeC: string;
		FeelsLikeF: string;
		HeatIndexC: string;
		HeatIndexF: string;
		WindChillC: string;
		WindChillF: string;
		WindGustKmph: string;
		WindGustMiles: string;
		chanceoffog: string;
		chanceoffrost: string;
		chanceofhightemp: string;
		chanceofovercast: string;
		chanceofrain: string;
		chanceofremdry: string;
		chanceofsnow: string;
		chanceofsunshine: string;
		chanceofthunder: string;
		chanceofwindy: string;
		cloudcover: string;
		diffRad: string;
		humidity: string;
		lang_fr: Array<{ value: string }>;
		precipInches: string;
		precipMM: string;
		pressure: string;
		pressureInches: string;
		shortRad: string;
		tempC: string;
		tempF: string;
		time: string;
		uvIndex: string;
		visibility: string;
		visibilityMiles: string;
		weatherCode: string;
		weatherDesc: Array<{ value: string }>;
		weatherIconUrl: Array<{ value: string }>;
		winddir16Point: string;
		winddirDegree: string;
		windspeedKmph: string;
		windspeedMiles: string;
	}>;
	maxtempC: string;
	maxtempF: string;
	mintempC: string;
	mintempF: string;
	sunHour: string;
	totalSnow_cm: string;
	uvIndex: string;
}

export interface WttrResponse {
	current_condition: CurrentCondition[];
	weather: WeatherDay[];
	nearest_area: Array<{
		areaName: Array<{ value: string }>;
		country: Array<{ value: string }>;
		latitude: string;
		longitude: string;
		population: string;
		region: Array<{ value: string }>;
		weatherUrl: Array<{ value: string }>;
	}>;
}
