package nl.hu.v1wac.firstapp.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserPostgresDaoImpl extends PostgresBaseDao implements UserDao{

	public String findRoleForUser(String name, String pass) {
		String result = "";
		String query = String.format("SELECT role FROM useraccount WHERE username = '%s' AND password = '%s'", name, pass);
		try (Connection con = super.getConnection()) {
			PreparedStatement ps = con.prepareStatement(query);
			ResultSet ds = ps.executeQuery();
			while (ds.next()) {
				result += ds.getString("role");
			}
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}
		return result;
	}
	

}
