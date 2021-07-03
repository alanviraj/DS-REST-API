package shop.online.model;

import javax.persistence.*;

@Entity
@Table(name = "seller")
public class Seller {
    private int sellerId;
    private String sellerName;
    private String sellerAddress;
    private String sellerPhone;
    private String sellerEmail;
    private String sellerPassword;
    private String sellerZip;
    private String sellerAccNo;

    public Seller() {

    }

    public Seller(int sellerId, String sellerName, String sellerAddress, String sellerPhone, String sellerEmail,String sellerPassword, String sellerZip, String sellerAccNo) {
        this.sellerId = sellerId;
        this.sellerName = sellerName;
        this.sellerAddress = sellerAddress;
        this.sellerPhone = sellerPhone;
        this.sellerEmail = sellerEmail;
        this.sellerPassword = sellerPassword;
        this.sellerZip = sellerZip;
        this.sellerAccNo = sellerAccNo;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getSellerId() {
        return sellerId;
    }

    public void setSellerId(int sellerId) {
        this.sellerId = sellerId;
    }

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }

    public String getSellerAddress() {
        return sellerAddress;
    }

    public void setSellerAddress(String sellerAddress) {
        this.sellerAddress = sellerAddress;
    }

    public String getSellerPhone() {
        return sellerPhone;
    }

    public void setSellerPhone(String sellerPhone) {
        this.sellerPhone = sellerPhone;
    }

    public String getSellerEmail() {
        return sellerEmail;
    }

    public void setSellerEmail(String sellerEmail) {
        this.sellerEmail = sellerEmail;
    }

    public String getSellerPassword() {
        return sellerPassword;
    }

    public void setSellerPassword(String sellerPassword) {
        this.sellerPassword = sellerPassword;
    }

    public String getSellerZip() {
        return sellerZip;
    }

    public void setSellerZip(String sellerZip) {
        this.sellerZip = sellerZip;
    }

    public String getSellerAccNo() {
        return sellerAccNo;
    }

    public void setSellerAccNo(String sellerAccNo) {
        this.sellerAccNo = sellerAccNo;
    }
}

