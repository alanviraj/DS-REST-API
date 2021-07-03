package shop.online.model;

import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;

@Entity
@Table(name = "item")
public class Item {

    private int itemId;
    private String itemName;
    private String itemPrice;
    private String itemQuantity;
    private String itemDescription;
    private String sellerNum;
    private String catName;

    @Lob
    private byte[] itemImage;
    private String sellerEmail;

    public Item() {

    }

    public Item(int itemId, String itemName, String itemPrice, String itemQuantity, String itemDescription, String sellerNum, String catName) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.itemQuantity = itemQuantity;
        this.itemDescription = itemDescription;
        this.sellerNum = sellerNum;
        this.catName = catName;
    }

    public Item(String itemName, String itemPrice, String itemQuantity, String itemDescription, String sellerNum, String catName, byte[] itemImage,String sellerEmail) {
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.itemQuantity = itemQuantity;
        this.itemDescription = itemDescription;
        this.sellerNum = sellerNum;
        this.catName = catName;
        this.itemImage = itemImage;
        this.sellerEmail = sellerEmail;
    }


	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(String itemPrice) {
        this.itemPrice = itemPrice;
    }

    public String getItemQuantity() {
        return itemQuantity;
    }

    public void setItemQuantity(String itemQuantity) {
        this.itemQuantity = itemQuantity;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public String getSellerNum() {
        return sellerNum;
    }

    public void setSellerNum(String sellerNum) {
        this.sellerNum = sellerNum;
    }

    public String getCatName() {
        return catName;
    }

    public void setCatName(String catName) {
        this.catName = catName;
    }

    public byte[] getItemImage() {
        return itemImage;
    }

    public void setItemImage(byte[] itemImage) {
        this.itemImage = itemImage;
    }

    public String getSellerEmail() {
		return sellerEmail;
	}

	public void setSellerEmail(String sellerEmail) {
		this.sellerEmail = sellerEmail;
	}

}

