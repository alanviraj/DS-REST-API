package shop.online.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import shop.online.model.Category;
import shop.online.repository.CategoryRepository;
import shop.online.service.CategoryService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    private CategoryService categoryService;

    /*For displaying all categories for the buyer-without blob*/
//    @GetMapping("")
//    public List<Category> listAllCategory() {
//        return categoryRepository.findAll();
//    }

    /*For displaying all categories for buyers(viewItemsPage)-WITH BLOB*/
    @GetMapping("/viewCategories")
    public String showCategories(Model model) {
        List<Category> imageObj3 = categoryService.getAllCategories();
        model.addAttribute("categories",imageObj3);
        return "View All Categories";
    }

    @GetMapping("/categories")
    public List<Category> displayCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/categories/{categoryId}")
    public Optional<Category> displayCategories1(@PathVariable int categoryId) {
        return categoryRepository.findById(categoryId);
    }
}
