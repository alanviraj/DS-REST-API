package shop.online.model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="via_mobile_bill")
public class BillPayment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "custName")
	private String custName;
	
	@Column(name = "custEmail")
	private String custEmail;
	
	@Column(name = "custPhone")
	private String custPhone;
	
	@Column(name = "sellerEmail")
	private String sellerEmail;
	
	@Column(name = "itemName")
	private String itemName;
	
	@Column(name = "itemPrice")
	private double itemPrice;
	
	public BillPayment() {
		
	}

	public BillPayment(String custName, String custEmail, String custPhone, String sellerEmail, String itemName, double itemPrice) {
		this.custName = custName;
		this.custEmail = custEmail;
		this.custPhone = custPhone;
		this.sellerEmail = sellerEmail;
		this.itemName = itemName;
		this.itemPrice = itemPrice;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getCustEmail() {
		return custEmail;
	}

	public void setCustEmail(String custEmail) {
		this.custEmail = custEmail;
	}

	public String getCustPhone() {
		return custPhone;
	}

	public void setCustPhone(String custPhone) {
		this.custPhone = custPhone;
	}

	public String getSellerEmail() {
		return sellerEmail;
	}

	public void setSellerEmail(String sellerEmail) {
		this.sellerEmail = sellerEmail;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public double getItemPrice() {
		return itemPrice;
	}

	public void setItemPrice(double itemPrice) {
		this.itemPrice = itemPrice;
	}
	
	
	
}
