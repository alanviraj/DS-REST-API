package shop.online.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import shop.online.model.BillPayment;

@Repository
public interface BillPaymentRepo extends JpaRepository<BillPayment, Long>{

}
