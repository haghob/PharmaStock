package com.example.pharmainventory.repository;

import com.example.pharmainventory.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProduitRepository extends JpaRepository<Produit, Long> {
}