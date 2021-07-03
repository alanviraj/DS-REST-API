package shop.online.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import shop.online.model.OTPSystem;

@CrossOrigin(originPatterns = "http://localhost:3000")
@RestController
public class OTPSystemRESTController {

	private final static String ACCOUNT_SID = "AC0966b9e047313bee0c192d481601d1bd";
	private final static String AUTH_TOKEN = "3d6e26ec859e005ee6260edb36c7826c";
	private Map<String, OTPSystem> otp_data = new HashMap<>();
	private final static String USER_PHONE_NUMBER = "+94767185502";
	private final static String PHONE_NUMBER = "+19705003288";
	
	
	static {
		Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
	}
	
	@RequestMapping(value = "/mobilenumbers/{mobilenumber}/otp", method = RequestMethod.POST)
	public ResponseEntity<Object> sentOTP(@PathVariable("mobilenumber") String mobilenumber){
		OTPSystem otpSystem = new OTPSystem();
		otpSystem.setMobileNumber(mobilenumber);
		otpSystem.setOtp(String.valueOf(((int)(Math.random()*(10000-1000)))+ 1000));
		otpSystem.setExpiryTime(System.currentTimeMillis()+20000);
		otp_data.put(mobilenumber, otpSystem);
		Message.creator(new PhoneNumber(USER_PHONE_NUMBER), new PhoneNumber(PHONE_NUMBER), "Your OTP is :" + otpSystem.getOtp()).create();
		return new ResponseEntity<>("OTP is send successfully",HttpStatus.OK);
	}
	
	@RequestMapping(value = "/mobilenumbers/{mobilenumber}/otps",method = RequestMethod.PUT)
	public ResponseEntity<Object> verifyOTP(@PathVariable("mobilenumber") String mobilenumber,@RequestBody OTPSystem requestBodyOTPSystem){
		
		if(requestBodyOTPSystem.getOtp() == null || requestBodyOTPSystem.getOtp().trim().length() <= 0) {
			return new ResponseEntity<>("Please provide a OTP",HttpStatus.OK);
		}
		
		if(otp_data.containsKey(mobilenumber)) {
			OTPSystem otpSystem = otp_data.get(mobilenumber);
			if(otpSystem != null) {
				if(otpSystem.getExpiryTime() >= System.currentTimeMillis()) {
					if(requestBodyOTPSystem.getOtp().equals(otpSystem.getOtp())) {
						otp_data.remove(mobilenumber);
						return new ResponseEntity<>("OTP verification success !",HttpStatus.OK);
					}
					return new ResponseEntity<>("Invalid OTP !",HttpStatus.OK);
				}
				return new ResponseEntity<>("OTP is expired...!",HttpStatus.OK);
			}
			return new ResponseEntity<>("Something went wrond ...!!", HttpStatus.OK);
		}
		return new ResponseEntity<>("Mobile number not found", HttpStatus.OK);
	}
	
}
