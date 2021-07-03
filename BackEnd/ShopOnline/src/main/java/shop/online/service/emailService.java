package shop.online.service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.paypal.api.payments.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.google.gson.JsonObject;

@Service
public class emailService {
	
	@Autowired
    private JavaMailSender javaMailSender;
	
	public String sendEmail(Payment pay) throws MessagingException {
		
		MimeMessage msg = javaMailSender.createMimeMessage();

        // true = multipart message
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        
        Payer payer = pay.getPayer();
        PayerInfo payerInfo = pay.getPayer().getPayerInfo();
        Transaction transaction = pay.getTransactions().get(0);
        String email =payerInfo.getEmail(); 
        helper.setTo(email);

        helper.setSubject("Payment Receipt of Shop Online");
        
        String name = payerInfo.getShippingAddress().getRecipientName();
        String currency=transaction.getAmount().getCurrency();
        String amount=transaction.getAmount().getTotal();
        String item=transaction.getDescription();
        String billAddress=payerInfo.getShippingAddress().getLine1();
        String ccode=payerInfo.getShippingAddress().getCountryCode();
        String pMethod=payer.getPaymentMethod();
        String city=payerInfo.getShippingAddress().getCity();
        RelatedResources rr = transaction.getRelatedResources().get(0);
        String receiptNo = rr.getSale().getReceiptId();
        String tranFee = rr.getSale().getTransactionFee().getValue();
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd-MMM-yyyy");
		LocalDate date = LocalDate.now();
		String curDate = dtf.format(date);
		String status = rr.getSale().getState().toUpperCase();

        helper.setText("<html>\r\n"
        		+ "    <head>\r\n"
        		+ "        <link href=\"https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css\" rel=\"stylesheet\"/>\r\n"
        		+ "        <script src=\"https://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js\"></script>\r\n"
        		+ "        <script src=\"https://code.jquery.com/jquery-1.11.1.min.js\"></script>\r\n"
        		+ "    </head>\r\n"
        		+ "    <body align=\"center\">\r\n"
        		+ "        <div class=\"container\">\r\n"
        		+ "            <div class=\"row\">\r\n"
        		+ "                <div class=\"well col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3\">\r\n"
        		+ "                    <div class=\"row\">\r\n"
        		+ "                        <div class=\"col-xs-6 col-sm-6 col-md-6\">\r\n"
        		+ "                            <address>\r\n"
        		+ "                                <strong>Shop Online</strong><br>\r\n"
        		+ "                                1111 Peradeniya Road,<br>\r\n"
        		+ "                                Kandy, Sri Lanka<br>\r\n"
        		+ "                                Phone No:(+94) 081-2223335\r\n"
        		+ "                            </address>\r\n"
        		+ "                            <br>\r\n"
        		+ "                            <p><em>Date : "+curDate+" </em></p>\r\n"
        		+ "                            <p><em>Receipt ID : "+receiptNo+"</em></p>\r\n"
        		+ "                        </div>\r\n"
        		+ "                    </div>\r\n"
        		+ "                    <div class=\"row\">\r\n"
        		+ "                        <div class=\"text-center\">\r\n"
        		+ "                            <h1>Payment Receipt</h1>\r\n"
        		+ "                        </div>\r\n"
        		+ "                        </span>\r\n"
        		+ "                        <table class=\"table\">\r\n"
        		+ "                            <tbody>\r\n"
        		+ "                                <tr>\r\n"
        		+ "                                    <td class=\"col-md-4\"><b><em>Full Name</em></b></h4></td>\r\n"
        		+ "                                    <td class=\"col-md-6\"> "+name+" </td>\r\n"
        		+ "                                </tr>\r\n"
        		+ "                                <tr>\r\n"
        		+ "                                    <td class=\"col-md-4\"><b><em>Item Description</em></b></h4></td>\r\n"
        		+ "                                    <td class=\"col-md-6\"> "+item+" </td>\r\n"
        		+ "                                </tr>\r\n"
        		+ "                                <tr>\r\n"
        		+ "                                    <td class=\"col-md-4\"><b><em>Payment Method</em></b></h4></td>\r\n"
        		+ "                                    <td class=\"col-md-6\"> "+pMethod+" </td>\r\n"
        		+ "                                </tr>\r\n"
        		+ "                                <tr>\r\n"
        		+ "                                    <td class=\"col-md-4\"><b><em>Total Amount</em></b></h4></td>\r\n"
        		+ "                                    <td class=\"col-md-6\"> "+amount+" </td>\r\n"
        		+ "                                </tr>\r\n"
				+ "								   <tr>\r\n"
				+ "                                    <td class=\"col-md-4\"><b><em>Transaction Fee</em></b></h4></td>\r\n"
				+ "                                    <td class=\"col-md-6\"> "+tranFee+" </td>\r\n"
				+ "                                </tr>\r\n"
        		+ "                                <tr>\r\n"
        		+ "                                    <td class=\"col-md-4\"><b><em>Currency Type</em></b></h4></td>\r\n"
        		+ "                                    <td class=\"col-md-6\"> "+currency+" </td>\r\n"
        		+ "                                </tr>\r\n"
        		+ "                                <tr>\r\n"
        		+ "                                    <td class=\"col-md-4\"><b><em>Billing Address</em></b></h4></td>\r\n"
        		+ "                                    <td class=\"col-md-6\"> "+billAddress+" </td>\r\n"
        		+ "                                </tr>\r\n"
        		+ "                                <tr>\r\n"
        		+ "                                    <td class=\"col-md-4\"><b><em>City</em></b></h4></td>\r\n"
        		+ "                                    <td class=\"col-md-6\"> "+city+" </td>\r\n"
        		+ "                                </tr>\r\n"
        		+ "                                <tr>\r\n"
        		+ "                                    <td class=\"col-md-4\"><b><em>Country Code</em></b></h4></td>\r\n"
        		+ "                                    <td class=\"col-md-6\"> "+ccode+" </td>\r\n"
        		+ "                                </tr>\r\n"
				+ "                                <tr>\r\n"
				+ "                                    <td class=\"col-md-4\"><b><em>Payment Status</em></b></h4></td>\r\n"
				+ "                                    <td class=\"col-md-6\"><strong><b>"+status+"</b></strong></td>\r\n"
				+ "                                </tr>\r\n"
        		+ "                            </tbody>\r\n"
        		+ "                        </table>\r\n"
        		+ "                    </div>\r\n"
        		+ "                </div>\r\n"
        		+ "            </div>\r\n"
        		+ "        </div>    \r\n"
        		+ "    </body>\r\n"
        		+ "</html>", true);

        javaMailSender.send(msg);
        return "paySuccess";
		
	}

}

