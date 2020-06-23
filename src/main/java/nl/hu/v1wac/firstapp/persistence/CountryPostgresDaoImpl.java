package nl.hu.v1wac.firstapp.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import nl.hu.v1wac.firstapp.model.Country;

public class CountryPostgresDaoImpl extends PostgresBaseDao implements CountryDao {

	
	private List<Country> selectCountry(String query) {
		List<Country> results = new ArrayList<Country>();
		try (Connection con = super.getConnection()) {
			PreparedStatement pstmt = con.prepareStatement(query);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				String code = rs.getString("code");
				String name = rs.getString("Name");
				String capital = rs.getString("Capital");
				String continent = rs.getString("continent");
				String region = rs.getString("region");
				double surface = rs.getDouble("surfacearea");
				int population = rs.getInt("population");
				String govermentform = rs.getString("governmentform");
				Country newCountry = new Country(code, name, capital, continent, region, surface, population,
						govermentform);
				results.add(newCountry);
			}
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}
		return results;
	}

	@Override
	public boolean save(Country country) {
		try (Connection connection = super.getConnection()) {
			String query = "insert into country(code, name, capital, continent, region, surfacearea, population, governmentform) values(?, ?, ?, ?, ?, ?, ?, ?)";
			PreparedStatement stmt = connection.prepareStatement(query);
			stmt.setString(1, country.getCode());
			stmt.setString(2, country.getName());
			stmt.setString(3, country.getCapital());
			stmt.setString(4, country.getContinent());
			stmt.setString(5, country.getRegion());
			stmt.setDouble(6, country.getSurface());
			stmt.setInt(7, country.getPopulation());
			stmt.setString(8, country.getGovernment());
			stmt.executeUpdate();
		} catch (Exception e) {
			System.out.println(e);
		}
		return true;
	}
	

	@Override
	public List<Country> findAll() {
		return selectCountry("Select CODE, NAME, CONTINENT, CAPITAL, REGION, SURFACEAREA, POPULATION, GOVERNMENTFORM from Country ORDER BY NAME ASC;");
	}

	@Override
	public Country findByCode(String code) {
		Country ctry = null;

		try (Connection connection = super.getConnection()) {
			Statement stmt = connection.createStatement();
			ResultSet resultset = stmt.executeQuery("select code, name, capital, continent, region, surfacearea, population, governmentform from country where code = '"+ code + "';");

			while (resultset.next()) {
				ctry = new Country(resultset.getString("code"),
						resultset.getString("name"), resultset.getString("capital"), resultset.getString("continent"),
						resultset.getString("region"), resultset.getDouble("surfacearea"),
						resultset.getInt("population"), resultset.getString("governmentform"));
			}
			resultset.close();
			stmt.close();
		} catch (Exception e) {
			System.out.println(e);
		}
		return ctry;
	}

	@Override
	public List<Country> find10LargestPopulations() {
		return selectCountry(
				"select CODE, NAME, CONTINENT, CAPITAL, REGION, SURFACEAREA, POPULATION, GOVERNMENTFORM from country order BY population DESC limit 10;");

	}

	public List<Country> find10LargestSurfaces() {
		return selectCountry(
				"select CODE, NAME, CONTINENT, CAPITAL, REGION, SURFACEAREA, POPULATION, GOVERNMENTFORM from country order BY SURFACEAREA DESC limit 10;");
	}

	public boolean update(Country country) {
		try (Connection connection = super.getConnection()){
			String query = "update  country set name = ?, capital = ?, region = ?, surfacearea = ?, population = ? where code = ?";
			PreparedStatement stmt = connection.prepareStatement(query);
			stmt.setString(6, country.getCode());
			stmt.setString(1, country.getName());
			stmt.setString(2, country.getCapital());
			stmt.setString(3, country.getRegion());
			stmt.setDouble(4, country.getSurface());
			stmt.setInt(5, country.getPopulation());
			stmt.executeUpdate();
				
		} catch (Exception e) {
			System.out.println(e);
		}
		return true;
	}

	public boolean delete(Country country) {
		boolean deleted = false;
        try (Connection connection = super.getConnection()){
            String query = "delete from country where code = ?";
            PreparedStatement stmt = connection.prepareStatement(query);
            stmt.setString(1, country.getCode());

            if(stmt.executeUpdate() == 1) {
                deleted = true;
            }
            stmt.executeUpdate();

        }catch(Exception e) {
            e.getMessage();
        }
        return true;
	}

}
