package nl.hu.v1wac.firstapp.model;

public class Country {
	private String code;
	private String name;
	private String capital;
	private String continent;
	private String region;
	private double surface;
	private int population;
	private String government;
	private double latitude;
	private double longitude;
	
	public Country(String code, String nm, String cap, String ct, String reg, double sur, int pop, String gov) {
		this.code = code; 
		this.name = nm;
		this.capital = cap;
		this.continent = ct;
		this.region = reg;
		this.surface = sur;
		this.population = pop;
		this.government = gov;
	}
	
	public String getCode() {
		return code;
	}
	
	public String getName() {
		return name;
	}
	
	public String getCapital() {
		return capital;
	}
	
	public String getContinent() {
		return continent;
	}
	
	public String getRegion() {
		return region;
	}
	
	public double getSurface() {
		return surface;
	}
	
	public int getPopulation() {
		return population;
	}
	
	public String getGovernment() {
		return government;
	}
	
	public double getLatitude() {
		return latitude;
	}
	
	public double getLongitude() {
		return longitude;
	}
	
	public void setName(String nm) {
		this.name = name;
	}
	
	public void setCapital(String capital) {
		this.capital = capital;
	}
	
	public void setRegion(String capital) {
		this.region = region;
	}
	
	public void setSurface(double surface) {
		this.surface = surface;
	}
	
	public void setPopulation(int population) {
		this.population = population;
	}


}
