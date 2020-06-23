package nl.hu.v1wac.firstapp.model;

import java.util.List;

import nl.hu.v1wac.firstapp.persistence.CountryDao;
import nl.hu.v1wac.firstapp.persistence.CountryPostgresDaoImpl;


public class WorldService {
	private CountryDao countryDaoImpl = new CountryPostgresDaoImpl();
	
	public List<Country> getAllCountries() {
		return countryDaoImpl.findAll();
	}
	 
	public List<Country> get10LargestPopulations() {
			
		return countryDaoImpl.find10LargestPopulations();
	}

	public List<Country> get10LargestSurfaces() {
		return countryDaoImpl.find10LargestSurfaces();
	}
	
	public Country getCountryByCode(String code) {
		return countryDaoImpl.findByCode(code);
	}


	public Country updateLand(String c, String nm, String h, String r, double o, int i) {
		for(Country ctry :getAllCountries()) {
			if(ctry.getCode().equals(c)) {
				ctry.setName(nm);
				ctry.setCapital(h);
				ctry.setPopulation(i);
				ctry.setRegion(r);
				ctry.setSurface(o);
				countryDaoImpl.update(ctry);
				return ctry;
			}
		}
		return null;
	}

	public boolean deleteCountry(String c) {
		for (Country ctry : getAllCountries()) {
			if(ctry.getCode().equals(c)) {
				countryDaoImpl.delete(ctry);
				return true;
			}
		}
		return false;
	}

	public Country saveLand(String code, String naam, String hoofdstad, String regio, double oppervlakte, int inwoners, String continent, String goverment) {
		for(Country ctry :getAllCountries()) {
			if(!(ctry.getCode().equals(code))) {
				
				Country newland = new Country( code,  naam,  hoofdstad,  continent,  regio,  oppervlakte,  inwoners,  goverment);
				countryDaoImpl.save(newland);
				return newland;
			
		}
		
	}
		return null;
}
}
