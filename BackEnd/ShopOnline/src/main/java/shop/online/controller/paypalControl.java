package shop.online.controller;

import javax.mail.MessagingException;

import com.paypal.api.payments.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.paypal.base.rest.PayPalRESTException;

import shop.online.model.PaymentClass;
import shop.online.service.paypalService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class paypalControl {
	
	@Autowired
    private paypalService service;
	
    public static final String SUCCESS_URL = "pay/paySuccess";
    public static final String FAIL_URL = "pay/payFailed";

    //@GetMapping("/")
    //public String PayInput() {
      //  return "PayInput";
    //}
    
    @PostMapping("/pay")
    public String payment(@RequestBody PaymentClass pay) {
    	try {
			Payment payment = service.createPayment(pay.getPaytype(),pay.getDescription(),pay.getTotal(), pay.getCurrency(),
					pay.getIntent(), "http://localhost:8080/" + FAIL_URL,
					"http://localhost:8080/" + SUCCESS_URL);
			for(Links link:payment.getLinks()) {
				if(link.getRel().equals("approval_url")) {
					return link.getHref();
				}
			}
			
		} catch (PayPalRESTException ex) {
		
			ex.printStackTrace();
		}
    	
    	
    	
        return "redirect:/";
    }

    /*@GetMapping(value = FAIL_URL)
    public String cancelPay() {
        return "payFailed";
    }*/

    /*@GetMapping(value = SUCCESS_URL)
    public String successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) throws MessagingException {
        try {
            Payment payment = service.executePayment(paymentId, payerId);
            String result = emailServ.sendEmail(payment);
            if (payment.getState().equals("approved")) {
            	//return new ModelAndView(new RedirectView(result));
            	return result;
            }
        } catch (PayPalRESTException ex) {
            System.out.println(ex.getMessage());
        }
        return "redirect:/";
    }*/

}
