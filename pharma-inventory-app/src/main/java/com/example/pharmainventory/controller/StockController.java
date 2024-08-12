package com.example.pharmainventory.controller;

import com.example.pharmainventory.model.Stock;
import com.example.pharmainventory.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    @Autowired
    private StockService stockService;

    @GetMapping
    public List<Stock> getAllStocks() {
        return stockService.getAllStocks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Stock> getStockById(@PathVariable Long id) {
        Stock stock = stockService.getStockById(id);
        return ResponseEntity.ok(stock);
    }

    @PostMapping
    public Stock createStock(@RequestBody Stock stock) {
        return stockService.createStock(stock);
    }

    @DeleteMapping("/{id}")
    public void deleteStock(@PathVariable Long id) {
        stockService.deleteStock(id);
    }
}
