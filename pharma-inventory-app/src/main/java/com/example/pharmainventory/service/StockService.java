package com.example.pharmainventory.service;

import com.example.pharmainventory.model.Stock;
import com.example.pharmainventory.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Stock getStockById(Long id) {
        return stockRepository.findById(id).orElseThrow(() -> new RuntimeException("Stock non trouvé"));
    }

    public Stock createStock(Stock stock) {
        return stockRepository.save(stock);
    }

    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }
}
