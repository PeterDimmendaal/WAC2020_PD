package nl.hu.v1wac.firstapp.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/DynamicServlet.do")

public class DynamicServlet extends HttpServlet {
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		int nummer1 = Integer.parseInt(req.getParameter("nummer1"));
		int nummer2 = Integer.parseInt(req.getParameter("nummer2"));
		String symbol = req.getParameter("symbol");
		int som = 0;
		
		if (symbol.equals("*")) {
			som = nummer1 * nummer2;
		}
		else if (symbol.equals("+")) {
			som = nummer1 + nummer2;
		}
		else if (symbol.equals("-")) {
			som= nummer1 - nummer2;
		}
		else if (symbol.equals("/")) {
			som = nummer1 / nummer2;
		}
		
				
		PrintWriter out = resp.getWriter();
 		resp.setContentType("text/html");
 		out.println("<!DOCTYPE html>");
 		out.println("<html>");
 		out.println(" <title>Rekenmachine </title>");
 		out.println(" <body>");
 		out.println(" <h2>Rekenmachine zegt:</h2>");
 		out.println(" <h2>Het is: " + som + "!</h2>");
 		out.println(" </body>");
 		out.println("</html>");
 }
}