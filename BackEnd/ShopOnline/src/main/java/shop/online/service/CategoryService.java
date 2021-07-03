package shop.online.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shop.online.model.Category;
import shop.online.repository.CategoryRepository;

import java.util.List;

@Service
public class CategoryService {

    private static final Logger logger = LoggerFactory.getLogger("ItemService.class");

    @Autowired
    private CategoryRepository categoryRepository;

    /*For displaying all categories for buyers(viewItemsPage)-WITH BLOB*/
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}