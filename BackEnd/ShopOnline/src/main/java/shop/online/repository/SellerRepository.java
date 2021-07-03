package shop.online.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import shop.online.model.Seller;

public interface SellerRepository extends JpaRepository<Seller, Integer> {

    Seller findBySellerEmail(String sellerEmail);

    Seller findBySellerPassword(String sellerPassword);

}