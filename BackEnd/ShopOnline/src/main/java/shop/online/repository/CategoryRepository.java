package shop.online.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import shop.online.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}

