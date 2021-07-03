package shop.online.model;
import javax.persistence.*;

@Entity
@Table(name = "category")
public class Category {
    private int categoryId;
    private String categoryName;

    @Lob
    private byte[] catImage;


    public Category() {
    }

    public Category(int categoryId, String categoryName) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }

    public Category(int categoryId, String categoryName, byte[] catImage) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.catImage = catImage;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public byte[] getCatImage() {
        return catImage;
    }

    public void setCatImage(byte[] catImage) {
        this.catImage = catImage;
    }
}

