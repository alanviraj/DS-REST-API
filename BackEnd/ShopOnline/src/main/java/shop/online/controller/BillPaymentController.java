package shop.online.controller;



import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import shop.online.model.BillPayment;
import shop.online.repository.BillPaymentRepo;
import shop.online.service.NotificationService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class BillPaymentController {
	@Autowired
	private BillPaymentRepo billPaymentRepo;
	
	@Autowired
	private NotificationService notificationService;
	
	//add payment
	@RequestMapping("/appPayment")
	@PostMapping("/appPayment")
	public void addPayment(@RequestBody BillPayment billPayment) {
		
		//send notificationService
		try {
			notificationService.sendNotification(billPayment);
		} catch (MailException e) {
			e.printStackTrace();
		}
		
	}
}
