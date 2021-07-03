package shop.online.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import shop.online.model.Seller;
import shop.online.repository.SellerRepository;
import shop.online.service.SellerService;

import java.util.Optional;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class SellerController {

    @Autowired
    SellerRepository sellerRepository;

    @Autowired
    SellerService sellerService;
/*
    //for displaying all sellers
    @GetMapping("")
    public List<Seller>listAllSeller() {
        return sellerRepository.findAll();
    }
*/
    /*For displaying seller information(seller-profile)*/
    @GetMapping("/seller/{sellerId}")
    public Optional<Seller> findSeller(@PathVariable Integer sellerId) {
        return sellerRepository.findById(sellerId);
    }


    /*For adding sellers to the system(seller-registration)*/
    @PostMapping("/seller")
    public void addSeller(@RequestBody Seller seller) {
        sellerRepository.save(seller);
    }

    /*For updating sellers information in the system(seller-update)*/
    @PutMapping("/seller/{sellerId}")
    public ResponseEntity<?> updateSeller(@RequestBody Seller seller, @PathVariable Integer sellerId){
        try {
            Seller seller1 = sellerRepository.getOne(sellerId);
            seller1.setSellerId(sellerId);
            sellerRepository.save(seller);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/seller/login")
    public Seller login(@RequestBody Seller seller) {
        return sellerService.loginSeller(seller);
    }



}

