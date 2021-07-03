package shop.online.controller;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.*;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import shop.online.model.DeliverModel;
import shop.online.repository.DeliverRepository;
import shop.online.service.DeliverMail;


@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api")
@Service
public class DeliverController implements ErrorController {	
	
	@Autowired
	DeliverRepository deliverRepository;
	
	@Autowired
	private DeliverMail mail;
	
	
	@PostMapping("/deliveries")
	public DeliverModel createDelivery(@RequestBody DeliverModel deliverModel , HttpServletResponse response)throws URISyntaxException, IOException{


		if(deliverModel.getDeliveryOption().toString().equals("FastDelivery")) {
			   mail.sendEmail("sidathrathnayake96@gmail.com", "You have to send a package to, \n Customer Name : "+ deliverModel.getBuyerName() + ". \n Customer Address : " + deliverModel.getBuyerAddress() + ".\n Customer Contact number : " + deliverModel.getBuyerPhone() , "Package to Deliver");
			   mail.sendEmail(deliverModel.getBuyerEmail(), "We have informed our deliver Service . They will deliver your package very soon. Please contact them if you want with following email address. \n Thank you for choosing our service.\n Deliver Service Email : sidathrathnayake96@gmail.com." , "Informed the Delivery Service");
		   
			   return deliverRepository.save(deliverModel);
		}	
		else {
			
			 return deliverRepository.save(deliverModel);
		}
			  
	}
	

	@Override
	public String getErrorPath() {
		return null;
	}

	
	
	
}
