package model;

public class Student {
    public String id;
    public double lat, lon, distance;
    public boolean isPresent;
    public Student(String id, double lat, double lon, double distance) {
        this.id = id;
        this.lat = lat;
        this.lon = lon;
        this.distance = distance;
        this.isPresent = false;
    }
}