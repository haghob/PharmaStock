package com.example.pharmainventory.controller;

import com.example.pharmainventory.model.InventoryItem;
import com.example.pharmainventory.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    @GetMapping
    public List<InventoryItem> getAllInventoryItems() {
        return inventoryRepository.findAll();
    }

    @PostMapping
    public InventoryItem createInventoryItem(@RequestBody InventoryItem inventoryItem) {
        return inventoryRepository.save(inventoryItem);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryItem> getInventoryItemById(@PathVariable Long id) {
        InventoryItem inventoryItem = inventoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Inventory item not found"));
        return ResponseEntity.ok(inventoryItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventoryItem> updateInventoryItem(@PathVariable Long id, @RequestBody InventoryItem inventoryItemDetails) {
        InventoryItem inventoryItem = inventoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Inventory item not found"));

        inventoryItem.setName(inventoryItemDetails.getName());
        inventoryItem.setQuantity(inventoryItemDetails.getQuantity());
        inventoryItem.setPrice(inventoryItemDetails.getPrice());

        final InventoryItem updatedInventoryItem = inventoryRepository.save(inventoryItem);
        return ResponseEntity.ok(updatedInventoryItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventoryItem(@PathVariable Long id) {
        InventoryItem inventoryItem = inventoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Inventory item not found"));
        inventoryRepository.delete(inventoryItem);
        return ResponseEntity.noContent().build();
    }
}