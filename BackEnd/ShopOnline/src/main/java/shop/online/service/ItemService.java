package shop.online.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shop.online.model.Item;
import shop.online.repository.ItemRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class ItemService {

    private static final Logger logger = LoggerFactory.getLogger("ItemService.class");

    @Autowired
    private ItemRepository itemRepository;

    /*For adding item(addItem)-WITH BLOB*/
    public int saveImage(Item item) {
        try{
        	itemRepository.save(item);
            return 1;
        } catch (Exception e) {
            logger.error("Error", e);
            return 0;
        }
    }

    /*For displaying single page item(viewSinglePageItem)-WITH BLOB*/
    public Item getSinglePage(int id) {
        Optional findById = itemRepository.findById(id);
        if (findById.isPresent()) {
            Item getImageDetails = (Item) findById.get();
            logger.info("id= " + getImageDetails.getItemId()
                    + " name= " + getImageDetails.getItemName()
                    + "price= " + getImageDetails.getItemPrice()
                    + "quantity= "+ getImageDetails.getItemQuantity()
                    + "des= "+ getImageDetails.getItemDescription()
                    + "sellerNum= "+ getImageDetails.getSellerNum()
                    + "category= "+ getImageDetails.getCatName()
                    + "image= "+ getImageDetails.getItemImage()
                    + "sellerEmail= "+ getImageDetails.getSellerEmail()
            );
            return getImageDetails;
        } else {
            return null;
        }
    }

    /*For displaying a sellers items (viewSellerPageItem)-WITH BLOB*/
    public List<Item> getAllSellerItems(String sellerNum) {
        return itemRepository.findByPhone(sellerNum);
    }

    /*For displaying all items for buyers(viewItemsPage)-WITH BLOB*/
    public List<Item> getBuyerItems(String catName) {
        return  itemRepository.findByCatName(catName);
    }
}
