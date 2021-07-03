package shop.online.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import shop.online.model.DeliverModel;


public interface DeliverRepository extends JpaRepository<DeliverModel,Long> {
	
}