package nl.hu.v1wac.firstapp.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import nl.hu.v1wac.firstapp.webservices.Country;

public class CountryPostgresDaoImpl extends PostgresBaseDao implements CountryDao{
	
	private List<Country> find(String query) {
		List<Country> landen = new ArrayList<Country>();
		try (Connection con = super.getConnection()) {
			PreparedStatement pstmt = con.prepareStatement(query);
			ResultSet dbResultSet = pstmt.executeQuery();
			while (dbResultSet.next()) {
				String code = dbResultSet.getString("code");
				String iso3 = dbResultSet.getString("iso3");
				String name = dbResultSet.getString("name");
				String capital = dbResultSet.getString("capital");
				String continent = dbResultSet.getString("continent");
				String region = dbResultSet.getString("region");
				double surface = dbResultSet.getDouble("surfacearea");
				int population = dbResultSet.getInt("population");
				String govern = dbResultSet.getString("governmentform");
				double lat = dbResultSet.getDouble("latitude");
				double lng = dbResultSet.getDouble("longitude");
				Country newLand = new Country(code, iso3, name, capital, continent, region, surface, population, govern, lat, lng);
				landen.add(newLand);
			}
		} catch (SQLException sqle) {}
		return landen;
	}
	
	public boolean save(Country country) {
		String query = String.format("INSERT INTO country (code, iso3, name, capital, continent, region, surfacearea, population, governmentform, latitude, longitude) "
				+ "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", country.getCode(), country.getIso3(), country.getName(), country.getCapital(), country.getContinent(),
				country.getRegion(), country.getSurface(), country.getPopulation(), country.getGovernment(), country.getLatitude(), country.getLongitude());
		try (Connection con = super.getConnection()) {
			PreparedStatement pstmt = con.prepareStatement(query);
			int x = pstmt.executeUpdate();
			if (x < 1) {
				return false;
			}
		} catch (SQLException sqle) {return false;}
		return true;
	}
	
	public List<Country> findAll() {
		return find("SELECT * FROM country");
	}
	
	public Country findByCode(String code) {
		List<Country>landen = new ArrayList<Country>(find("SELECT * FROM country WHERE code = '" + code + "'"));
		return landen.get(0);
	}
	
	public List<Country> find10LargestPopulations() {
		return find("SELECT * FROM country ORDER BY population DESC LIMIT 10");
	}
	
	public List<Country> find10LargestSurfaces() {
		return find("SELECT * FROM country ORDER BY surfacearea DESC LIMIT 10");
	}
	
	public boolean update(String code, String naam, String capital, String regio, int opv, int inw) {
		//code, iso3, name, capital, continent, region, surfacearea, population, governmentform, latitude, longitude
		String query = String.format("UPDATE country SET name = '%s', capital = '%s', region = '%s', surfacearea = %d, population = %d WHERE code = '%s'", 
			naam, capital, regio, opv, inw, code);
		System.out.println(query);
		try (Connection con = super.getConnection()) {
			PreparedStatement pstmt = con.prepareStatement(query);
			int x = 0;
			x += pstmt.executeUpdate();
			if (x < 1) {
				return false;
			}
		} catch(SQLException sqle) {return false;}
		return true;
		}	
	
	public boolean delete(String code) {
			String query = String.format("DELETE FROM country WHERE code = '%s'", code);
		try (Connection con = super.getConnection()) {
			PreparedStatement pstmt = con.prepareStatement(query);
			int x = 0;
			x += pstmt.executeUpdate();
			if (x < 1) {
				return false;
			}
		} catch(SQLException sqle) {return false;}
		return true;
		}
}
