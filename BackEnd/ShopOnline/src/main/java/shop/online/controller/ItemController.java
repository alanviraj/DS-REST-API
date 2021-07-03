package shop.online.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import shop.online.model.Item;
import shop.online.repository.ItemRepository;
import shop.online.service.ItemService;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RestController
@RequestMapping("/api")
public class ItemController {

    private static final Logger logger = LoggerFactory.getLogger("ItemController.class");

    @Autowired
    private ItemService itemService;

    @Autowired
    ItemRepository itemRepository;

    /*For adding item(addItem)-without blob*/
    @PostMapping("/")
    public void addItem(@RequestBody Item item) {
        itemRepository.save(item);
    }

    /*For viewing item(viewItem-of a seller)-without blob*/
    @GetMapping("/items/{sellerNum}")
    public List<Item> viewSellerItems(@PathVariable String sellerNum) {
        return itemRepository.findByPhone(sellerNum);
    }

    /*For updating item(updateItem-of a seller)*/
    @PutMapping("/items/{itemId}")
    public ResponseEntity<?> updateItem(@RequestBody Item item, @PathVariable Integer itemId) {
        try {
            Item item1 = itemRepository.getOne(itemId);
            item1.setItemId(itemId);
            itemRepository.save(item);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /*For deleting an item(deleteItem-of a seller)*/
    @DeleteMapping("/items/{itemId}")
    public void deleteItem(@PathVariable Integer itemId) {
        itemRepository.deleteById(itemId);
    }

    /*For displaying items for buyers-without blob*/
    @GetMapping("/buyer/{catName}")
    public List<Item> displayItemsBuyer(@PathVariable String catName) {
        return itemRepository.findByCatName(catName);
    }

    /*For displaying single page item for buyers-without blob*/
    @GetMapping("/buyerView/{itemId}")
    public Optional<Item> displaySinglePage(@PathVariable int itemId) {
        return itemRepository.findById(itemId);
    }

    /*For adding item(addItem)-WITH BLOB*/
    @PostMapping("/fileupload")
    public String fileUpload(@RequestParam(required = false, name = "itemName") String itemName,
                             @RequestParam(required = false, name = "itemPrice") String itemPrice,
                             @RequestParam(required = false, name = "itemQuantity") String itemQuantity,
                             @RequestParam(required = false, name = "itemDescription") String itemDescription,
                             @RequestParam(required = false, name = "sellerNum") String sellerNum,
                             @RequestParam(required = false, name = "catName") String catName,
                             @RequestParam(required = false, name = "file") MultipartFile file,
                             @RequestParam(required = false, name = "sellerEmail") String sellerEmail) {
        try {
            byte[] itemImage = file.getBytes();
            Item item = new Item(itemName, itemPrice, itemQuantity, itemDescription, sellerNum, catName, itemImage,sellerEmail);
            int saveImage = itemService.saveImage(item);
            if (saveImage == 1) {
                return "success";
            } else {
                return "error";
            }
        } catch (Exception e) {
            logger.error("ERROR", e);
            return "error";
        }
    }

    /*For displaying single page item(viewSinglePageItem)-WITH BLOB*/
    @GetMapping("/getSingle/{itemId}")
    public String getDBSingle(@PathVariable String itemId, Model model){
        try{
            logger.info("Id= " + itemId);
            Item imagesObj = itemService.getSinglePage(Integer.parseInt(itemId));
            model.addAttribute("id",imagesObj.getItemId());
            model.addAttribute("name",imagesObj.getItemName());
            model.addAttribute("price",imagesObj.getItemPrice());
            model.addAttribute("quantity",imagesObj.getItemQuantity());
            model.addAttribute("description",imagesObj.getItemDescription());
            byte[] encode = java.util.Base64.getEncoder().encode(imagesObj.getItemImage());
            model.addAttribute("image", new String (encode,"UTF-8"));
            model.addAttribute("email",imagesObj.getSellerEmail());
            return "Single Image";
        }catch (Exception e) {
            logger.error("Error", e);
            model.addAttribute("message", "Error in getting image");
            return "redirect:/";
        }
    }

    /*For displaying a sellers items (viewSellerPageItem)-WITH BLOB*/
    @GetMapping("/viewSeller/{sellerNum}")
    String showSellerItems (@PathVariable String sellerNum, Model map) {
        List<Item> imagesObj1 = itemService.getAllSellerItems(sellerNum);
        map.addAttribute("products", imagesObj1);
        return "View Seller Items";
    }

    /*For displaying all items for buyers(viewItemsPage)-WITH BLOB*/
    @GetMapping("/viewItems/{catName}")
    public String showBuyerItems (@PathVariable String catName, Model model1) {
        try {
            logger.info("catName= " + catName);
            List<Item> imagesObj2 = itemService.getBuyerItems(catName);
            model1.addAttribute("All Items", imagesObj2);
//            byte[] encode = java.util.Base64.getEncoder().encode(imagesObj2.get(8));
//            model1.addAttribute("image", new String(encode,"UTF-8"));
            return "View All Items(Buyer)";
        } catch (Exception e) {
            logger.error("Error", e);
            model1.addAttribute("message", "Error in getting image");
            return "redirect:/";

        }
    }
}
