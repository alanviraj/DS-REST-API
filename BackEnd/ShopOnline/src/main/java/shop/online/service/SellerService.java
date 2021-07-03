package shop.online.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.stereotype.Service;

import shop.online.errorHandler.BadRequestException;
import shop.online.model.Seller;
import shop.online.repository.SellerRepository;

@Service
@EnableJpaAuditing
public class SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    public Seller loginSeller(Seller seller) {
        Seller sellerExists = sellerRepository.findBySellerEmail(seller.getSellerEmail());
        Seller sellerExists1 = sellerRepository.findBySellerPassword(seller.getSellerPassword());

        if (sellerExists == null) {
            throw new BadRequestException("Invalid user name.");
        }

        if (sellerExists1 == null) {
            throw new BadRequestException("Invalid password.");
        }

        String sellerPassword = seller.getSellerPassword();
        if (sellerPassword.isEmpty()) {
            throw new BadRequestException("Invalid user name and password combination.");
        }

        sellerExists.setSellerPassword("");
        sellerExists.setSellerId(0);
        return sellerExists;
    }
}

