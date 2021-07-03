package shop.online.model;


import javax.persistence.*;

@Entity
@Table(name="deliveries")

public class DeliverModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long deliverid;
	
	@Column(name="buyerName")
	private String buyerName;
	@Column(name="buyerEmail")
	private String buyerEmail;	
	@Column(name="buyerAddress")
	private String buyerAddress;
	@Column(name="buyerPhone")
	private String buyerPhone;
	@Column(name="deliverItemName")
	private String deliverItemName;
	@Column(name="deliveryCash")
	private double deliveryCash;
	@Column(name="totalPayment")
	private double totalPayment;
	@Column(name="deliveryOption")
	private String deliveryOption;
	@Column(name="payOption")
	private String payOption;

	public DeliverModel() {
	}


	public DeliverModel( String buyerName,String buyerEmail, String buyerAddress, String buyerPhone, String deliverItemName,
			String deliveryOption,double totalPayment,double deliveryCash,String payOption) {
		super();

		this.buyerName = buyerName;
		this.buyerEmail = buyerEmail;
		this.buyerAddress = buyerAddress;
		this.buyerPhone = buyerPhone;
		this.deliverItemName = deliverItemName;
		this.totalPayment = totalPayment;
		this.deliveryCash = deliveryCash;
		this.deliveryOption = deliveryOption;
		
		this.payOption = payOption;
	}


	public long getDeliverid() {
		return deliverid;
	}


	public void setDeliverid(int deliverid) {
		this.deliverid = deliverid;
	}

	public String getBuyerName() {
		return buyerName;
	}


	public void setBuyerName(String buyerName) {
		this.buyerName = buyerName;
	}


	public String getBuyerEmail() {
		return buyerEmail;
	}


	public void setBuyerEmail(String buyerEmail) {
		this.buyerEmail = buyerEmail;
	}



	public String getBuyerAddress() {
		return buyerAddress;
	}


	public void setBuyerAddress(String buyerAddress) {
		this.buyerAddress = buyerAddress;
	}


	public String getBuyerPhone() {
		return buyerPhone;
	}


	public void setBuyerPhone(String buyerPhone) {
		this.buyerPhone = buyerPhone;
	}


	public String getDeliverItemName() {
		return deliverItemName;
	}


	public void setDeliverItemName(String deliverItemName) {
		this.deliverItemName = deliverItemName;
	}


	public double getTotalPayment() {
		return totalPayment;
	}


	public void setTotalPayment(double totalPayment) {
		this.totalPayment = totalPayment;
	}


	public String getDeliveryOption() {
		return deliveryOption;
	}


	public void setDeliveryOption(String deliveryOption) {
		this.deliveryOption = deliveryOption;
	}	
	
	public double getDeliveryCash() {
		return deliveryCash;
	}

	public void setDeliveryCash(double deliveryCash) {
		this.deliveryCash = deliveryCash;
	}


	public String getPayOption() {
		return payOption;
	}


	public void setPayOption(String payOption) {
		this.payOption = payOption;
	}
	
}
