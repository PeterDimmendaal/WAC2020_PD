package nl.hu.v1wac.firstapp.webservices;

import java.util.List;

import nl.hu.v1wac.firstapp.persistence.CountryDao;
import nl.hu.v1wac.firstapp.persistence.CountryPostgresDaoImpl;

public class Main {

	public static void main(String[] args) {
		CountryDao countryDao = new CountryPostgresDaoImpl();
		List<Country> landen = countryDao.findAll();
		for (Country c : landen) {
			System.out.println("hoi");
		}

	}

}
