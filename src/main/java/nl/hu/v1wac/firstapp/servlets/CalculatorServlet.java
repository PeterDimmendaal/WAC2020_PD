package nl.hu.v1wac.firstapp.servlets;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet(urlPatterns = "/CalculatorServlet.do")
public class CalculatorServlet extends HttpServlet {
	
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
		throws ServletException, IOException {
			String bepaald = null;
			int totaal = 0;
			int waarde1 = Integer.parseInt(req.getParameter("Waarde1"));
			int waarde2 = Integer.parseInt(req.getParameter("Waarde2"));
			String optellen = req.getParameter("Optellen");
			String delen = req.getParameter("Delen");
			String vermenigvuldig = req.getParameter("Vermenigvuldig");
			String aftrekken = req.getParameter("Aftrekken");
			String [] strs = {optellen, delen, vermenigvuldig, aftrekken};
		
			ArrayList<String> submits = new ArrayList<String>();
			submits.addAll(Arrays.asList(strs));
			for (String i : submits) {
				if (i != null) {
					bepaald = i;
				}
			}
			
			if (bepaald.equals("Delen")) {
				totaal = waarde1 / waarde2;
			}
			
			else if (bepaald.equals("Optellen")) {
				totaal = waarde1 + waarde2;
			}
			
			else if (bepaald.equals("Aftrekken")) {
				totaal = waarde1 - waarde2;
			}
			
			else {
				totaal = waarde1 * waarde2;
			}
			
			PrintWriter out = resp.getWriter();
			System.out.println(optellen);
			resp.setContentType("text/html");
			out.println("<!DOCTYPE html>");
			out.println("<html>");
			out.println(" <title>Calculator</title>");
			out.println(" <body>");
			out.println(" <h2>Calculator</h2>");
			out.println(" <h2>" + totaal + "</h2>");
			out.println(" </body>");
			out.println("</html>");
	}
}
