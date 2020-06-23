package nl.hu.v1wac.firstapp.persistence;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;


public class UserPostgresDaoImpl extends PostgresBaseDao implements UserDao {

	public String findRoleForUser(String name, String pass) {
		String role = null;

		try (Connection connection = super.getConnection()) {
			Statement stmt = connection.createStatement();
			ResultSet resultset = stmt.executeQuery("Select * from useraccount where username='" + name + "' and password='" + pass + "';");

			while (resultset.next()) {
				role = (resultset.getString("role"));
			}
			resultset.close();
			stmt.close();
		} catch (Exception e) {
			System.out.println(e);
		}
		return role;
	}
}
