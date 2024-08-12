package com.example.pharmainventory.service;

import com.example.pharmainventory.model.Produit;
import com.example.pharmainventory.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    public Produit getProduitById(Long id) {
        return produitRepository.findById(id).orElseThrow(() -> new RuntimeException("Produit non trouvé"));
    }

    public Produit createProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    public void deleteProduit(Long id) {
        produitRepository.deleteById(id);
    }
}
