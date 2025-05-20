package db;

import java.sql.*;
import java.io.*;
import org.json.JSONObject;
import java.nio.file.Files;
import java.nio.file.Paths;

public class DatabaseHandler {
    private Connection connection;

    public void connect() {
        try {
            String content = new String(Files.readAllBytes(Paths.get("resources/config.json")));
            JSONObject json = new JSONObject(content);
            String url = json.getString("url");
            String username = json.getString("username");
            String password = json.getString("password");

            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(url, username, password);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean validateUser(String username, String password) {
        String query = "SELECT * FROM users WHERE username=? AND password=?";
        try {
            connect();
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setString(1, username);
            ps.setString(2, password);
            ResultSet rs = ps.executeQuery();
            return rs.next();
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
