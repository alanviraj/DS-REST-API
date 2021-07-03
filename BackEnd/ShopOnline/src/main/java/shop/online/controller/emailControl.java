package shop.online.controller;


import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

import shop.online.service.emailService;
import shop.online.service.paypalService;


@Controller
public class emailControl {
	
	@Autowired
    private paypalService service;
    @Autowired
    private emailService emailServ;
	
	public static final String SUCCESS_URL = "pay/paySuccess";
	public static final String FAIL_URL = "pay/payFailed";
	
	@GetMapping(value = FAIL_URL)
    public String cancelPay() {
        return "payFailed";
    }
	
	@GetMapping(value = SUCCESS_URL)
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
    }

}
