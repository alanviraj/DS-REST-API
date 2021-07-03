package shop.online.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import shop.online.model.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {

    /*For viewing item(viewItem-of a seller)-without blob*/
    @Query("SELECT i FROM Item i WHERE i.sellerNum = ?1")
    List<Item> findByPhone(String sellerNum);

    /*For displaying items for buyers-without blob*/
    @Query("SELECT i FROM Item i WHERE i.catName = ?1")
    List<Item> findByCatName(String catName);

}

