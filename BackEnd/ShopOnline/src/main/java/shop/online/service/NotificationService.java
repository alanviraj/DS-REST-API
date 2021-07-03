package shop.online.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import shop.online.model.BillPayment;



@Service
public class NotificationService {

	private JavaMailSender javaMailSender;
	private static final String ORGANICATOIN_EMAIL = "dhananjayaarw@gmail.com";
	private static final String BUYER_SUBJECT = "Online Shopping buy items";
	private static final String SELLER_SUBJECT = "Online Shopping sell items";	
	
	@Autowired
	public NotificationService(JavaMailSender javaMailSender) throws MailException{
		this.javaMailSender = javaMailSender;
	}
	
	public void sendNotification(BillPayment billPayment) {
		final String  BUYER_CONTENT = "Item name :- "+billPayment.getItemName()+"\n"
				+ "Price :- "+billPayment.getItemPrice()+"\n\n"
						+ "Mobile number :-"+billPayment.getCustPhone()+"\n"
								+ "Thank you for using the service";
		final String SELLER_CONTENT = "Item name :-"+billPayment.getItemName()+"\n"
				+ "Thank you for using the service";
		
		
	
		//send email
		SimpleMailMessage customerMailMessage = new SimpleMailMessage();
		SimpleMailMessage sellerMailMessage = new SimpleMailMessage();
		
		customerMailMessage.setTo(billPayment.getCustEmail());
		customerMailMessage.setFrom(ORGANICATOIN_EMAIL);
		customerMailMessage.setSubject(BUYER_SUBJECT);
		customerMailMessage.setText(BUYER_CONTENT);
		
		sellerMailMessage.setTo(billPayment.getSellerEmail());
		sellerMailMessage.setFrom(ORGANICATOIN_EMAIL);
		sellerMailMessage.setSubject(SELLER_SUBJECT);
		sellerMailMessage.setText(SELLER_CONTENT);
		
		javaMailSender.send(customerMailMessage);
		javaMailSender.send(sellerMailMessage);
	}


}

